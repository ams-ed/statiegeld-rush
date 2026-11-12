// Automated keyboard-only playtest scenario for Statiegeld Rush.
// Reads read-only window.__game.state and drives exclusively via page.keyboard.
export async function play(page, { seconds, t0 }) {
  const k = page.keyboard;
  const state = () => page.evaluate(() => window.__game?.state);
  const end = t0 + seconds * 1000 - 150;

  let heldLeft = false;
  let heldRight = false;
  let heldSpace = false;
  let lastTapMs = 0;
  let lastHopMs = 0;

  async function setSteer(dir) {
    const wantL = dir < -0.14;
    const wantR = dir > 0.14;
    if (wantL !== heldLeft) {
      heldLeft = wantL;
      await (wantL ? k.down('KeyA') : k.up('KeyA'));
    }
    if (wantR !== heldRight) {
      heldRight = wantR;
      await (wantR ? k.down('KeyD') : k.up('KeyD'));
    }
  }

  for (let i = 0; i < 40; i++) {
    const s = await state();
    if (s?.ready) {
      if (s.phase === 'title') await k.press('Enter');
      break;
    }
    await page.waitForTimeout(50);
  }

  while (Date.now() < end) {
    const s = await state();
    if (!s || !s.ready) {
      await page.waitForTimeout(35);
      continue;
    }
    if (s.phase === 'over') {
      if (heldSpace) { heldSpace = false; await k.up('Space'); }
      if (s.shopOpen) {
        if (s.walletCents >= 75) await k.press('Digit2');
        await k.press('KeyR');
      }
      await page.waitForTimeout(80);
      continue;
    }

    const now = Date.now();
    const safeMin = s.canalEdgeX + 1.05;
    const safeMax = s.wallX - 0.26;

    // Check closest BOA Warden distance (both ahead and behind!)
    const nearestWarden = (s.obstacles || []).find(o => o.type === 'warden');
    const wardenDist = nearestWarden ? Math.hypot(nearestWarden.dz, s.laneX - nearestWarden.laneX) : 99;

    // If currently picking a padlock: hold Space unless a pursuing Warden gets within 2.5m (bail!)
    if (s.picking) {
      await setSteer(0);
      if (wardenDist < 2.55) {
        if (heldSpace) {
          heldSpace = false;
          await k.up('Space');
        }
      } else if (!heldSpace) {
        heldSpace = true;
        await k.down('Space');
      }
      await page.waitForTimeout(32);
      continue;
    }

    // 1. Choose primary target lane: Corner Market return slot > upcoming Amsterdam bin (if bag not full) > scenic weave
    let targetLane = -0.75 + Math.sin((now - t0) / 900) * 1.05;
    const mkt = s.returnSlots?.[0];
    const bagFull = s.heldCans >= s.bagCap;
    const nextBin = !bagFull ? s.bins?.find(b => b.dz > -0.6 && b.dz < 22) : null;

    if (mkt && mkt.dz > -1.5 && mkt.dz < 25 && (s.heldCans > 0 || s.buzz < 0.55)) {
      targetLane = Math.min(safeMax, mkt.laneX);
    } else if (nextBin) {
      // Skip locked bin if a Warden is right next to it (< 6.5m)
      const wardenNearBin = nearestWarden && Math.abs(nearestWarden.dz - nextBin.dz) < 6.5;
      if (!(nextBin.locked && wardenNearBin)) {
        targetLane = Math.max(safeMin, Math.min(safeMax, nextBin.laneX - 0.48));
      }
    }

    // 2. Dodge oncoming cyclists, cargo-bikes, and lethal BOA Wardens; hop bollards with W
    for (const o of (s.obstacles || [])) {
      if (o.dz < -1.2 || o.dz > 16.0) continue;
      if (o.hoppable) {
        if (s.grounded && o.dz > 1.2 && o.dz < 3.8 && Math.abs(s.laneX - o.laneX) < 0.76 && now - lastHopMs > 650) {
          lastHopMs = now;
          await k.down('KeyW');
          setTimeout(() => k.up('KeyW').catch(() => {}), 95);
        }
        continue;
      }
      const extraMargin = o.type === 'warden' ? 1.22 : 0.92;
      const clearance = o.radius + extraMargin;
      if (Math.abs(targetLane - o.laneX) < clearance) {
        const goLeft = o.laneX - clearance;
        const goRight = o.laneX + clearance;
        if (o.type === 'warden' && goLeft >= safeMin) {
          // Swing into the brick street lane around sidewalk Wardens!
          targetLane = goLeft;
        } else if (goRight <= safeMax + 0.08) {
          targetLane = goRight;
        } else if (goLeft >= safeMin) {
          targetLane = goLeft;
        } else {
          targetLane = o.laneX < -1.0 ? safeMax : safeMin + 0.35;
        }
      }
    }

    targetLane = Math.max(safeMin, Math.min(safeMax, targetLane));
    await setSteer(targetLane - s.laneX);

    // 3. Bin Actions: Hold Space next to padlocked bin to stop & pick; Tap Space in stride for unlocked bins
    if (nextBin && nextBin.locked && wardenDist > 7.5 && nextBin.dz < 2.35 && nextBin.dz > -0.6 && Math.abs(s.laneX - nextBin.laneX) < 1.48) {
      if (!heldSpace) {
        heldSpace = true;
        await k.down('Space');
      }
    } else {
      if (heldSpace) {
        heldSpace = false;
        await k.up('Space');
      }
      if (nextBin && !nextBin.locked && nextBin.dz < 2.15 && nextBin.dz > -0.5 && Math.abs(s.laneX - nextBin.laneX) < 1.45 && now - lastTapMs > 280) {
        lastTapMs = now;
        await k.down('Space');
        await page.waitForTimeout(45);
        await k.up('Space');
      }
    }

    await page.waitForTimeout(32);
  }

  if (heldLeft) await k.up('KeyA');
  if (heldRight) await k.up('KeyD');
  if (heldSpace) await k.up('Space');
}
