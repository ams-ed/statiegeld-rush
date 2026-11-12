# Statiegeld Rush — Game Design & Look Specification (`SPEC.md`)

Source video: `video/gameplay.mp4` (`1920x1080`, `24.0 fps`, `10.144 s`, `0` cuts — single continuous chase shot).
Study output: `study/study.json`, `study/sheet.jpg`, frames `study/f_001.jpg` – `study/f_041.jpg`.

---

## 1. Camera (`f_001.jpg`, `f_016.jpg`, `f_030.jpg`, `f_041.jpg`)

- **Type:** Steady low third-person chase camera directly behind the runner along the brick sidewalk (`stoep`) and canal roadway.
- **Distance & Height:** `3.9 m` behind the hero (`~2.2` hero heights for a `1.78 m` runner), height `1.52 m` (roughly shoulder / shopper-bag level), lateral offset `-0.18 m` (slightly toward the canal road so both oncoming cyclists on the left and townhouse bins/return slots on the right frame cleanly, as seen in `f_001.jpg` and `f_030.jpg`).
- **Hero Screen Scale:** Hero spans `~42%–45%` of vertical frame height (sneakers near `y = 90%`, hood crest near `y = 46%` in `f_001.jpg` and `f_016.jpg`), centered horizontally (`x ≈ 48%–52%`).
- **Pitch & Look-Ahead:** Looks at `(hero.x * 0.75, hero.y + 1.32 m, hero.z - 6.5 m)` — a slight downward-forward pitch so glossy wet brick reflections fill the lower third while canal gables, elm trees, streetlamps, and the misty bridge fill the upper two-thirds.
- **Lens (FOV):** `52°` base vertical FOV (`f_001.jpg` – `f_035.jpg`), kicking smoothly up to `65°` with radial speed-blur streaks during Neon Turbo Rush (`f_041.jpg`).
- **Follow Motion:** Exponential damping `1 - exp(-8 * dt)` laterally, `1 - exp(-5 * dt)` vertically (so hops read cleanly against the ground), plus subtle bank/roll (`±2.2°`) when weaving across the lane and camera punch on bin bashes and return-slot slams.

---

## 2. Hero (`f_001.jpg`, `f_016.jpg`, `f_037.jpg`, `f_039.jpg`)

- **Proportions & Silhouette:** Wiry, lanky sprinter (`1.78 m` tall) with narrow legs in fitted dark slate-charcoal jeans (`#1f2328`), dark low-top sneakers with tan/grey rubber soles flashing on every back-kick (`f_001.jpg`, `f_030.jpg`), and an oversized dark olive-charcoal hooded parka/hoodie (`#252822` / `#1c1e1b`) with hood pulled up (`f_037.jpg`, `f_039.jpg`) and hem flaring as he runs.
- **100-px Readability Feature:** Enormous **bright cobalt-cyan reusable shopping bag** (`#0193d9` lit / `#014789` shaded) with twin vertical royal-blue webbing straps (`#162d9c`) slung squarely over his shoulders/back (`f_001.jpg`, `f_016.jpg`, `f_037.jpg`), with shiny silver aluminum cans (`#d8dfe6`) peeking out the top opening (`f_016.jpg`, `f_033.jpg`). Against the warm russet-brown bricks, this electric blue rectangle makes the runner unmistakable at any scale.
- **Dynamic Bag Feedback:** Separate 3D shopper-bag mesh attached to the hero's upper-back/spine socket; scales up (`1.0x` -> `1.65x`) and wobbles with spring physics as held cans accumulate, visually telegraphing increased turn inertia.

---

## 3. Core Mechanic ("Buzz & Bag") & Authentic Amsterdam Bin Upgrade

- **The Verb:** Sprint at a constant, tactical `11.0 m/s` down a curving rainy-night Amsterdam canal street, bash open unlocked street bins in stride or **plant your feet and hold `Space` to pick padlocked bins** while watching out for pursuing yellow-vested Street Wardens (`BOA`s), stack `€0.15` silver and `€0.25` gold-rimmed deposit cans up to your blue shopper bag's capacity, and glide alongside glowing sky-blue Corner Market return slots for a `0.5s` deposit beat that converts cans into persistent **`€` Euros** for between-run gear upgrades.
- **Authentic Amsterdam Street Bin Upgrade (`f_004.jpg`, `f_011.jpg`, `f_026.jpg` + Real Reference Photos):**
  - Instead of the video's generic top-lid cylindrical bins, we build the iconic **Amsterdam Bammens street bin** from the two real reference photos (`media_1794484066181_8c8f2d52.jpg` closed, `media_1794484082281_38256d84.jpg` busted open) styled in the video's cel-shaded ink-outlined palette:
    - Matte olive-taupe/grey (`#5e5d56`) curved column (`~1.15 m` tall), sloped hooded cap with recessed front throw-in mouth and small street stickers, and curved front door embossed vertically with Amsterdam's three `XXX` crosses.
    - **Unlocked bin bash:** Tapping `Space` in stride swings the curved `XXX` front door open on its **left hinge** with a metallic clang, spills a **3D light-blue plastic trash bag liner** (`#4aa3df`) onto the wet bricks, bursts colorful comic litter particles across the pavement (`f_004.jpg`, `f_011.jpg`), and arcs spinning aluminum cans overhead into the hero's blue shopper bag (`f_026.jpg`).
    - **Padlocked bins & Warden agro ("Commit or Bail"):** Marked with a gleaming brass padlock (`#ffdc48`). Holding `Space` snaps the scavenger beside the door (`0 m/s`) with a diegetic 3D-projected radial progress dial (`1.70s` base -> `0.65s` upgraded) and metallic lockpick ratcheting. Any BOA Street Warden within `22 m` blows their whistle (`!`) and sprints straight toward the player (`5.8 m/s`). Releasing `Space` early aborts the pick and resumes sprinting immediately; touching a Warden at any time ends the run (`BUSTED BY BOA!`, losing unbanked bag cans while keeping previously banked `€`).
- **Buzz, Bag Capacity & Meta-Progression:**
  - **Buzz** drains continuously in the cold night rain (shown via a slim corner pill bar + screen vignette/desaturation) and refills at bins and Corner Markets.
  - **5-Track Persistent Upgrade Shop (`localStorage`):** Banked `€` unlocks 5 tiers each of *Hairpin -> Pro Lockpick*, *Bigger & Tougher Bag* (`12 -> 52` max cans, less turn weight & bike spill), *Grippy Sneakers*, *Warm Hoodie & Thermos*, and *Scavenger's Eye* (`+1–3` bonus cans & higher `€0.25` tallboy chance).

---

## 4. Key Moment (`f_030.jpg` -> `f_037.jpg` -> `f_041.jpg`)

1. **Setup (`f_026.jpg` – `f_030.jpg`):** Silver cans arc high into the hero's bulging blue bag under warm lantern light as he swerves right around a cyclist (`f_030.jpg`) toward the glowing sky-cyan corner market ahead.
2. **Impact & Jackpot (`f_035.jpg` – `f_039.jpg`):** The runner slams his stacked cans into the recessed wall return slot on the `#0ec3da` sky-blue market wall; dozens of bright golden coins (`#d5b620` / `#ffdd33`) erupt in an upward comic fountain (`f_037.jpg`).
3. **Neon Turbo Rush (`f_040.jpg` – `f_041.jpg`):** The combo cash-in refills Buzz to `100%`, kicks camera FOV out, pulses bloom, and rockets the runner past the glowing market window trailing a blazing electric magenta (`#fa62fb`) and cyan (`#7be7fc`) speed-blur ribbon down the wet brick street (`f_041.jpg`).

---

## 5. World Layout & Cross-Section (`f_001.jpg`, `f_016.jpg`, `f_026.jpg`, `f_030.jpg`, `f_035.jpg`)

 Gently curving endless Amsterdam *gracht* corridor (`~28 m` total visual width, playable surface `x ∈ [-5.4 m, +1.9 m]` relative to curve centerline):

- **Far Canal Bank (`x = -24 m` to `-15.5 m`):** Continuous silhouette row of narrow crooked 4-story brick canal houses with step/bell/spout gables, warm lit windows, streetlamps, moored low canal boat, and misty arched stone canal bridges spanning the water ahead (`f_001.jpg`, `f_016.jpg`).
- **Canal Water (`x = -15.5 m` to `-5.4 m`):** Deep dark umber-slate canal water (`#17140f`) with animated rain ripples and stretched vertical reflections of warm amber windows and sky-cyan neon.
- **Quay Edge (`x = -5.4 m`):** Stone coping stones alternating between **open unfenced drop-offs right into the canal water** (the core hazard!) and short picturesque stretches of low dark-green cast-iron bollards/railings, wooden benches (`f_004.jpg`), locked Dutch bikes (`f_026.jpg`), slender canal elm trees, and cast-iron lantern posts (`f_004.jpg`, `f_026.jpg`).
- **Brick Canal Roadway (`x = -5.4 m` to `-1.5 m`):** Wet russet-brown clinker brick lane (`#574638` / `#8a4928` under warm light) used by oncoming upright Dutch cyclists with glowing headlights/red taillights (`f_030.jpg`) and wide cargo-bikes (`bakfietsen`).
- **Granite Curb (`x = -1.5 m`):** Beveled grey granite curb strip (`#5a5e60`) with scattered wet yellow-green elm leaves (`f_016.jpg`, `f_030.jpg`).
- **Townhouse Sidewalk / `Stoep` (`x = -1.5 m` to `+2.1 m`):** Glossy wet dark herringbone brick pavement where Amsterdam `XXX` bins, padlocked bins, low stoep steps/planters (hoppable with `W`/`Up`), and patrolling yellow-vested street wardens (`handhaving`) appear.
- **Right Facade Wall (`x = +2.2 m`):** Modular crooked 4-story Amsterdam townhouses (dark brown/red brick, grey stone basement plinths with sunken windows, cream window trim, dark green doors `#203a2b`, warm glowing sconces), punctuated every `~150 m` (closer on Wave 1 so players and playtests reach it briskly!) by the **Glowing Sky-Blue Corner Market (`#0ec3da`)** with its illuminated cyan sign (`#8ef4ff`), warm grocery window, and recessed wall return slot (`f_033.jpg` – `f_040.jpg`).

---

## 6. Palette, Lighting, Materials & Post-Processing (`study/study.json` + Frame Samples)

### Sampled Hex Palette
| Role | Hex | Source Frame / Measurement |
|---|---|---|
| Overcast Night-Rain Sky | `#586170` | `f_001.jpg` upper sky clouds (slate-blue dusk/night overcast, never pure black) |
| Canal Mist / Distance Fog | `#58585c` | `f_001.jpg` canal bridge horizon haze |
| Deep Shadow / Ink Outline | `#060403` / `#140b07` | `study.json` #1 (`7.8%`) & #5 (`3.4%`) |
| Canal Water Base | `#17140f` | `f_001.jpg` left canal surface |
| Wet Clinker Brick (Shadow -> Lit) | `#261a15` -> `#473529` -> `#8a4928` | `study.json` #2, #7 + `f_016.jpg` lantern pool |
| Townhouse Brick & Stone Plinth | `#362419`, `#574638`, `#4d5358` | `study.json` #8, #9 + `f_016.jpg` plinth |
| Warm Streetlamp & Window Glow | `#fbe8c5` / `#eca967` | `f_026.jpg` lantern core & `f_016.jpg` warm facade |
| Hero Shopper Bag (Lit / Shade / Strap) | `#0193d9` / `#014789` / `#162d9c` | `f_001.jpg` & `f_037.jpg` |
| Corner Market Return Wall & Sign | `#0ec3da` / `#8ef4ff` | `f_035.jpg` cyan wall & `f_033.jpg` glowing sign |
| Jackpot Gold Coins | `#d5b620` / `#ffdf38` | `f_037.jpg` coin fountain |
| Neon Turbo Rush Trail | `#fa62fb` / `#7be7fc` | `f_041.jpg` magenta-cyan speed ribbon |

### Lighting & Materials
- **Sky & Fog:** Slate-blue overcast sky dome (`#586170`) blending into warm-slate exponential/linear mist (`#525156`, `THREE.Fog(0x525156, 28, 135)`) so distant canal houses and bridges melt softly into rainy haze exactly like `f_001.jpg` and `f_026.jpg`.
- **Lights:** Cool slate-blue hemisphere fill (`#6b778c` sky / `#2b1d14` ground), soft moon/cloud directional key casting a crisp runner shadow onto the bricks (`f_016.jpg`, `f_030.jpg`), warm amber point/spot pools from streetlamps and townhouse sconces (`#ffb866`), and intense cyan point light (`#0ec3da`) at each Corner Market return machine (`f_030.jpg`, `f_033.jpg`).
- **Cel-Shaded & Inked Shader Style:** Characters, bins, bikes, and facades use stepped toon/cel shading (`onBeforeCompile` / ramp shading) paired with **punchy dark ink outlines** (`#060403` inverted-hull outlines on 3D characters/props + screen-space normal/depth edge accent in the post pass) while keeping low-roughness glossy wet normal-mapped specular reflections on the brick street and canal water.

### Post-Processing Stack (Scene 1 Baseline)
1. **Renderer:** `THREE.ACESFilmicToneMapping`, exposure `1.05`.
2. **Bloom (`UnrealBloomPass`):** High threshold (`0.82`), strength `0.38` (`0.85` during Turbo Rush), radius `0.55` — isolates lantern cores, bicycle lights, the `#8ef4ff` market sign, `#ffdf38` coins, and the `#fa62fb`/`#7be7fc` Turbo Rush ribbon without washing out brick or skin/cloth.
3. **Unified Grade + Edge Ink + Buzz Vignette + Grain (`ShaderPass`):**
   - Subtle screen-space depth/luma ink line reinforcement;
   - Warm amber mid-highlight gain + cool slate shadow lift matching `f_001.jpg`–`f_035.jpg`;
   - Dynamic Buzz feedback: as Buzz drops below `35%`, edge vignette tightens and saturation dips gently; during Turbo Rush, chromatic cyan/magenta radial edge streak kicks in (`f_041.jpg`);
   - Fine animated film grain (`0.028`) gluing all generated textures together.

---

## 7. Players, Controls & Verification Contract

- **Players:** Single-player arcade runner.
- **Controls (1-line):** `A`/`D` or `Left`/`Right` weave · `W`/`Up` hop · `Space` bash bin (hold for heavy bash) · `R` restart (Gamepad: Left Stick weave, `B`/`Y` hop, `A` bash/hold, `Start` begin/restart).
- **UI Rule:** Zero HUD bars or boxes. Minimal title + 1-line controls on title overlay (`?autostart` skips immediately); corner counter uses only tiny clean silver-can & gold-banked icons + digits.
- **Playtest State Contract (`window.__game`):** Read-only `state` exposing `phase`, `x`, `y`, `z`, `laneX`, `canalEdgeX`, `wallX`, `speed`, `grounded`, `heldCans`, `bankedCans`, `buzz`, `turbo`, `charging`, `wave`, and arrays of upcoming `bins`, `obstacles` (cyclists, cargo-bikes, wardens, low props), and `returnSlots`, plus URL params `?autostart`, `?seed=N`, and `?x=` (distance offset along street) for deterministic 3-spot side-by-side verification:
  1. **Spot 1 (`t = 0.0 s` / `f_001.jpg`):** Opening sprint down the wet canal street with townhouse row, streetlamp, parked bike, and canal water on the left.
  2. **Spot 2 (`t = 6.25 s` / `f_026.jpg` & `t = 2.5 s` / `f_011.jpg`):** Bashing open an authentic Amsterdam `XXX` bin on the right — hinged door swung open, light-blue liner + litter spilled on wet bricks, silver cans arcing overhead into the bright-blue bag while a cyclist approaches.
  3. **Spot 3 (`t = 9.0 s` / `f_037.jpg` & `t = 10.0 s` / `f_041.jpg`):** Slamming cans into the glowing sky-blue Corner Market return slot with golden coins erupting and Neon Turbo Rush launching forward.
