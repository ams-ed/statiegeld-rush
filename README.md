# Statiegeld Rush

**[Play Live on Vercel](https://statiegeld-rush.vercel.app/)** · **[Play on GitHub Pages](https://ams-ed.github.io/statiegeld-rush/)**

A cel-shaded, comic-inked 3D WebGL arcade game built in Three.js (`three@0.160.0`) from the generated gameplay reference clip `video/gameplay.mp4`, with **100% of 3D models, character rigs/animations, tileable textures, sky backdrops, particle sprites, sound effects, and music generated on fal** via `fal_asset.py`.

---

## Concept & Core Loop ("Statiegeld Heist & Gear Shop")

Sprint at a steady, tactical **`11.0 m/s`** down an endless curving Amsterdam *gracht* (canal street) on a rainy night, bashing open authentic olive-taupe **Amsterdam `XXX` street bins** to pack `€0.15` silver and `€0.25` tallboy `statiegeld` (deposit-return) cans into your bright-blue reusable shopping bag:

- **Constant Street Pacing (Zero Speed-Boost Blur):** Speed stays readable and grounded throughout the run; waves escalate through street density—more padlocked bins, patrolling yellow-vested Street Wardens (`BOA`s), oncoming Dutch cyclists & `bakfiets` cargo-bikes, and unfenced canal drop-offs.
- **Stop-and-Pick Padlocked Bins & Warden Agro ("Commit or Bail"):**
  - **Unlocked bins:** Tap `Space` in stride to smash open (`3–5+` cans).
  - **Padlocked bins:** Hold `Space` alongside a locked bin to **plant your feet (`0 m/s`)** and pick the brass padlock (`1.70s` base down to `0.65s` with upgrades) with a diegetic radial progress ring right on the lock.
  - **Active BOA Pursuit:** Starting a lockpick (or bashing a bin) within `22 m` of a Street Warden triggers their **whistle (`!`)** and makes them sprint directly toward you (`5.8 m/s`). **Release `Space` early to bail** and sprint away, or risk getting touched (`BUSTED BY BOA!` — immediate run end, losing unbanked cans in your bag!).
- **Euro (`€`) Cash-In & `0.5s` Deposit Beat:** Gliding past a glowing sky-blue (`#0ec3da`) Corner Market return slot eases your stride for `0.5s` while cans physically zip **out of your shrinking bag into the machine**, golden coins erupt, **Buzz** refills to `100%`, and your haul converts into **persistent Euros (`€`)** (`1.25x` bulk bonus at `10+` cans, `1.50x` mega haul at `20+` cans).
- **Persistent 5-Track Between-Run Upgrade Shop (`localStorage`):** Banked `€` stays across runs to upgrade **Hairpin → Pro Lockpick**, **Bigger & Tougher Bag** (`12 → 52` max cans, reduced turn drag & bike spill), **Grippy Sneakers**, **Warm Hoodie & Thermos**, and **Scavenger's Eye** (`[1]`–`[5]` or click between runs, `[Tab]` on title).

---

## Controls & Running Locally

- **Keyboard:** `A` / `D` or `Left` / `Right` weave · `W` / `Up` hop low bollards · **Tap `Space`** bash unlocked bin · **Hold `Space`** stop & pick padlocked bin (release early to bail!) · `Tab` open Gear Shop on title · `1`–`5` buy upgrades in shop · `R` / `Enter` start or run again
- **Gamepad:** Left Stick weave · `B` / `Y` hop · `A` / `X` bash / hold to pick lock · `Start` begin / restart
- **URL Parameters:**
  - `?autostart` — skips title overlay directly into live play
  - `?seed=7` — deterministic PRNG seed for street curve, townhouses, bins, traffic, and Corner Markets
  - `?x=<meters>` — starts at longitudinal street distance `<meters>` (`&freeze` holds frame for deterministic look checks)
  - `?fresh=1` — runs with a clean temporary wallet/upgrade state without modifying saved `localStorage` progress

Serve locally from this directory with any static HTTP server:

```bash
python3 -m http.server 8000
# Open http://127.0.0.1:8000/
```

---

## Verification Summary (Side-by-Side Look & Real-FPS Playtest)

### 1. Side-by-Side Look Checks (`pairs/`)
Verified across 4 iterative rounds with `side_by_side.py` (`video/gameplay.mp4` on left, live Three.js WebGL game in Metal-accelerated headless Chrome `1920x1080` on right):

- `pairs/pair_000.25.jpg` (`t = 0.25 s` vs `?autostart&seed=7&x=0&freeze`): Opening rainy-night canal sprint — hero screen scale, bright-blue shopper bag silhouette, wet russet herringbone brick reflections, warm townhouse window glow, cast-iron streetlamps, canal elm trees, and overcast `#586170` night haze.
- `pairs/pair_006.25.jpg` (`t = 6.25 s` vs `?autostart&seed=7&x=78.2&freeze`): Mid-stride Amsterdam `XXX` bin bash — left-hinged curved `XXX` front service door swung open, spilled light-blue liner + comic litter across the wet bricks, silver `statiegeld` cans arcing overhead into the bulging blue bag, padlocked bin ahead, and the sky-blue Corner Market glowing down the block.
- `pairs/pair_009.00.jpg` (`t = 9.00 s` vs `?autostart&seed=7&x=97.4&freeze`): Corner Market return-slot slam — golden star-embossed coins erupting above the runner against the `#0ec3da` cyan facade as held cans bank into the corner counter.
- `pairs/pair_010.00.jpg` (`t = 10.00 s` vs `?autostart&seed=7&x=101.0&freeze`): Neon Turbo Rush payoff — FOV kick and electric magenta (`#fa62fb`) + cyan (`#7be7fc`) speed-blur ribbon streaming behind the runner down the wet cobblestones.

### 2. Automated Keyboard Playtest (`play.mjs` → `playtest_take.mp4` & `playtest_best.mp4`)
Recorded with `record_play.mjs` using system Chrome (`--use-angle=metal`, `1920x1080`) driven exclusively via `page.keyboard` reading `window.__game.state`:

- **Full Recording (`playtest_take.mp4`):** `1,179 frames`, `19.9 s`, **`59.4 fps`**, **`0` console errors / warnings**.
- **Best 10-Second Window (`playtest_best.mp4`, selected by `best_window.py`):** `5.00 s → 15.00 s` (`60.0 fps`, extracted frames visually inspected). Shows constant `11.0 m/s` tactical weaving, stop-and-pick padlock cracking with the radial dial while a whistled BOA Street Warden (`!`) sprints down the sidewalk, `12/12` bag fill, the `0.5s` Corner Market deposit beat converting cans into `+€2.50` (`1.25x BULK BONUS!`) with cans arcing into the wall slot, bollard hops, and cargo-bike dodges.

---

## fal Asset Log & Cost Summary

Every asset call is logged with full arguments, prompts, and durations in `video/fal_log.json` (1 call) and `assets/fal_log.json` (81 calls) — **82 fal calls total**:

| Endpoint | Role | Calls | Total Gen Time | Est. Cost (USD) |
|---|---|---:|---:|---:|
| `minimax/h3-max/text-to-video` | Reference `10s` `1080P` gameplay video (`video/gameplay.mp4`) | 1 | 17.9 s | `~$1.50` |
| `fal-ai/nano-banana-pro/edit` | Video-referenced character/prop concepts, tileable WebP textures, sky, sprites | 27 | 704.8 s | `~$4.50` |
| `fal-ai/birefnet/v2` | Clean alpha cutouts for 3D conversion & particle/foliage sprites | 19 | 49.8 s | `~$0.19` |
| `fal-ai/hunyuan-3d/v3.1/pro/image-to-3d` | Detailed architectural & vehicle GLBs (Amsterdam bin body/door, bikes, townhouses, market) | 8 | 1,463.9 s | `~$3.00` |
| `meshy/v7.1/image-to-3d` | Character & prop GLBs (hero, warden, liner, statiegeld can, padlock, streetlamp, bollard) | 7 | 816.5 s | `~$2.10` |
| `tripo3d/h3.1/image-to-3d` | Woven cobalt-blue reusable shopper bag GLB (`assets/blue_bag_0.glb`) | 1 | 171.3 s | `~$0.30` |
| `fal-ai/meshy/rigging/multi-animation` | Auto-rigging & multi-clip animations for Hero (6 clips) & Street Warden (4 clips) | 2 | 673.0 s | `~$0.70` |
| `fal-ai/elevenlabs/sound-effects/v2` | Looping rainy canal ambience + 14 arcade gameplay/heist/shop SFX (`.mp3`) | 16 | 75.5 s | `~$0.64` |
| `elevenlabs/music/v2.5` | `60 s` instrumental synth-funk night-chase soundtrack (`assets/music_chase.mp3`) | 1 | 10.6 s | `~$0.50` |
| **Total** | **All video, 3D, 2D, and audio assets** | **82** | **3,983.3 s** | **`~$13.43`** |

*(Note: includes iterative regenerations during 1-by-1 quality inspection plus 4 heist/economy SFX for padlock picking, supermarket deposit register, BOA bust, and shop upgrades.)*

### Primary Shipped Assets in `assets/`
- **Characters & Rigs:** `hero_rig_{8,12,14,16,18,20}.glb` (RunFast, Jump_Run, Quick Bash, Heavy Bash, Hit Stumble, Idle), `warden_rig_{8,7}.glb` (Casual Walk, Run Pursuit), `blue_bag_0.glb`
- **Authentic Amsterdam Bins & Collectibles:** `amsterdam_bin_body_0.glb`, `amsterdam_bin_door_0.glb`, `spilled_blue_liner_0.glb`, `statiegeld_can_0.glb`, `padlock_0.glb`
- **Vehicles & Street Furniture:** `dutch_bike_0.glb`, `dutch_cyclist_0.glb`, `cargo_bike_0.glb`, `streetlamp_0.glb`, `bollard_0.glb`
- **Architecture:** `townhouse_a_0.glb` (bell gable *klokgevel*), `townhouse_b_0.glb` (stepped gable *trapgevel*), `return_market_0.glb` (sky-blue corner market with recessed wall return slot)
- **Textures, Sky & Sprites:** `tex_wet_brick.webp` (2K), `tex_quay_stone.webp` (1K), `tex_water_normal.webp` (1K), `sky_amsterdam_night.webp` (2K), `canal_tree_cutout.webp`, `sprite_coin_cutout.webp`, `sprite_litter_cutout.webp`, `tex_neon_streak.webp`, `icon_can.png`
- **Audio:** `sfx_rain_ambience.mp3`, `sfx_footstep.mp3`, `sfx_hop.mp3`, `sfx_bin_bash.mp3`, `sfx_charge_hum.mp3`, `sfx_lockpick.mp3`, `sfx_padlock_break.mp3`, `sfx_can_pickup.mp3`, `sfx_bike_bell.mp3`, `sfx_warden_whistle.mp3`, `sfx_busted.mp3`, `sfx_cash_register.mp3`, `sfx_upgrade_buy.mp3`, `sfx_cashin_turbo.mp3`, `sfx_canal_splash.mp3`, `music_chase.mp3`

---

## Honest Differences Between `video/gameplay.mp4` and the Playable Game

1. **Intentional Authentic Amsterdam Bin Upgrade:** In `video/gameplay.mp4`, the video model generated generic dark cylindrical bins with round pop-off top lids. Using two real Amsterdam street reference photographs, the game upgrades these to authentic curved olive-taupe **Amsterdam Bammens street bins** with sloped hoods, street stickers, recessed throw-in mouths, and a **left-hinged vertical `XXX` front service door** that swings open on impact to spill a 3D light-blue plastic trash bag liner alongside comic litter.
2. **Tactical Pacing, Stop-and-Pick Lockpicking & Persistent Euro Shop:** Rather than launching a disorienting speed boost at the Corner Market (`f_041.jpg`), the playable game keeps a grounded `11.0 m/s` street sprint, slows briefly alongside the return slot (`0.5s`) to convert cans into persistent **`€` Euros**, adds **stop-and-pick padlocked bins** with pursuing BOA Street Wardens (`BUSTED BY BOA!`), and includes a between-run **5-Track Upgrade Shop**.
3. **Minimal Corner HUD:** While the reference video has zero UI, the playable game adds a clean corner Buzz stamina pill, bag capacity counter (`8/12`), and persistent Euro wallet (`€4.35`).
4. **Real-Time WebGL Shading vs Video Diffusion:** Wet brick reflections in Three.js use bump-mapped PBR specular highlights from pooled point lights and selective window/sign shader emissives rather than full ray-traced screen-space planar reflections, and cyclists use rigid oncoming 3D meshes rather than skeletal pedaling leg cycles.
