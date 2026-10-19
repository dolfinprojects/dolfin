/* ==========================================================
   PRODUCT & BRAND DATA  (centralised, presentation-free)
   ----------------------------------------------------------
   IMPORTANT — listing status:
   * status:"reference"  = product NAME taken from the manufacturer's public website
     (see `source`). It shows a "Manufacturer range" badge. Whether DOLFIN PROJECTS
     stocks / is authorised for it is NOT verified — confirm, then set status:"stocked".
   * demo:true           = category-level placeholder with no verified product name.
   Descriptions are generic category text written for this site; they are NOT the
   manufacturer's copy and make no performance claims. Datasheets: use `datasheet`.

   Fields: id, name, brand (brand id), category (category id), type, description,
   applications[], features[], specs{}, packaging, coverage, datasheet, sds,
   image, demo.
   Unknown values MUST be left empty — the site then shows
   "Specifications available on request" / "Refer to Technical Datasheet".
   ========================================================== */

window.DOLFIN_CATEGORIES = [
  { id: "admixtures",    name: "Concrete Admixtures",                  page: "concrete-admixtures.html" },
  { id: "repair-grouts", name: "Repair Mortars, Grouts & Anchoring",   page: "repair-grouts.html" },
  { id: "waterproofing", name: "Waterproofing Chemicals",              page: "waterproofing-products.html" },
  { id: "tile-adhesives",name: "Tile Adhesives & Installation",        page: "tile-adhesives.html" },
  { id: "speciality",    name: "Sealants, Bonding Agents & Speciality",page: "speciality-chemicals.html" }
];

window.DOLFIN_APPLICATIONS = [
  "Waterproofing", "Concrete Repair", "Structural Rehabilitation", "Injection Grouting",
  "Flooring", "Tile Installation", "Joint Sealing", "Ready-Mix Concrete",
  "Protective Coatings", "Anchoring & Grouting"
];

window.DOLFIN_BRANDS = [
  { id: "fosroc", name: "Fosroc", status: "listed",
    overview: "Global construction chemicals manufacturer with ranges across admixtures, repair, grouting, flooring, sealants, injection and waterproofing.",
    categories: ["Concrete admixtures","Repair mortars","Grouts","Waterproofing products","Injection materials","Bonding agents","Sealants","Protective coatings"] },
  { id: "chryso", name: "Chryso", status: "listed",
    overview: "Concrete admixtures and related solutions for ready-mix, precast, underground, jobsite and cement applications.",
    categories: ["Concrete admixtures","Integral waterproofing","Curing agents","Demoulding agents","Cement additives"] },
  { id: "cac", name: "CAC", status: "listed",
    overview: "Concrete admixtures (PCE and SNF series), underground construction products, curing compounds, cement additives, integral waterproofing, sealants and densified microsilica.",
    categories: ["PCE & SNF admixtures","Underground construction","Curing compounds","Cement additives","Integral waterproofing","Sealants","Densified microsilica"] },
  { id: "normet", name: "Normet", status: "listed",
    overview: "Construction chemicals for concrete repair, epoxy injection and grouting, bonding, waterproofing plugs and sprayed-concrete essentials (TamRez / TamCrete ranges), alongside tunnelling equipment.",
    categories: ["Repair mortars & grouts","Epoxy injection resins","Bonding agents","Waterproofing plugs","Chemical-resistant coatings"] },
  { id: "kerakoll", name: "Kerakoll", status: "listed",
    overview: "Italian building-solutions brand: substrate preparation, waterproofing, tile and stone laying, repair and structural strengthening, sealants and adhesives.",
    categories: ["Tile & stone adhesives","Waterproofing","Repair & strengthening","Substrate preparation","Sealants & adhesives"] },
  { id: "myk-laticrete", name: "MYK Laticrete", status: "listed",
    overview: "Tile and stone adhesives, tile-joint grouts and waterproofing membranes.",
    categories: ["Tile adhesives","Tile grouts","Waterproofing systems","Tile installation solutions"] },
  { id: "myk-arment", name: "MYK Arment", status: "listed",
    overview: "Waterproofing, repair and construction chemical products. Portfolio to be verified.",
    categories: ["Waterproofing","Repair","Construction chemicals"] },
  { id: "asian-paints", name: "Asian Paints", status: "verify",
    overview: "Allied construction chemical / waterproofing products — category to be verified before publishing.",
    categories: ["Waterproofing (to be verified)","Allied products (to be verified)"] }
];


/* Helper: add(brand, category, name, type, description, applications, source, opts) */
(function () {
  const P = [];
  function add(brand, cat, name, type, desc, apps, source, o) {
    o = o || {};
    const id = (brand + "-" + name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (P.some(x => x.id === id)) return;
    P.push({ id: id, name: name, brand: brand, category: cat, type: type, description: desc,
      applications: apps, features: [], specs: {}, packaging: "", coverage: "", datasheet: "", sds: "",
      image: "", source: source || "", status: o.demo ? "placeholder" : "reference", demo: !!o.demo });
  }

  /* ---------------- FOSROC (families from fosroc.com/products) ---------------- */
  const FS = "https://www.fosroc.com/products";
  add("fosroc","repair-grouts","Renderoc range","Repair mortars","Family of cementitious repair mortars (e.g. Renderoc HB30, SP40). Select by repair depth and application method.",["Concrete Repair","Structural Rehabilitation"],FS);
  add("fosroc","repair-grouts","Nitomortar range","Repair mortars","Family of repair mortars (e.g. Nitomortar EN, TS) for concrete and masonry repair, per datasheet.",["Concrete Repair"],FS);
  add("fosroc","repair-grouts","Patchroc range","Patch repair mortars","Patch-repair mortars (e.g. Patchroc Super, HW) for local concrete repairs.",["Concrete Repair"],FS);
  add("fosroc","repair-grouts","Conbextra range","Non-shrink / precision grouts","Family of grouts (e.g. Conbextra GP1, EP10, Cable Grout) for base plates, machinery and anchoring.",["Anchoring & Grouting","Structural Rehabilitation"],FS);
  add("fosroc","repair-grouts","Cebex range","Grouts","Grout family (e.g. Cebex 300, Cable Grout) for grouting applications; confirm suitability per datasheet.",["Anchoring & Grouting"],FS);
  add("fosroc","repair-grouts","Supercast range","Injection resins","Injection resin family (e.g. Supercast SW10, Acrylate 100) for leak sealing and crack treatment.",["Injection Grouting","Waterproofing"],FS);
  add("fosroc","repair-grouts","Lokfix range","Anchoring systems","Anchoring and fixing systems (e.g. Lokfix E45T, S25); confirm load and substrate suitability.",["Anchoring & Grouting"],FS);
  add("fosroc","admixtures","Conplast range","Concrete admixtures","Admixture family (e.g. Conplast SP430, WP100) for workability and water reduction. Dosage depends on mix design and trials.",["Ready-Mix Concrete"],FS);
  add("fosroc","admixtures","Auramix range","Concrete admixtures","High-performance admixture family (e.g. Auramix 300, 400). Confirm suitability through trial mixes.",["Ready-Mix Concrete"],FS);
  add("fosroc","waterproofing","Nitoproof range","Waterproofing membranes","Waterproofing membrane family (e.g. Nitoproof 600, 800HT); select by substrate, exposure and movement.",["Waterproofing"],FS);
  add("fosroc","waterproofing","Brushbond range","Waterproofing coatings","Brush-applied waterproofing coatings (e.g. Brushbond Roofguard, UltraFlex) for roofs and similar areas.",["Waterproofing"],FS);
  add("fosroc","waterproofing","Dekguard range","Deck waterproofing","Deck and surface waterproofing / protective systems (e.g. Dekguard E2000, Primer).",["Waterproofing","Protective Coatings"],FS);
  add("fosroc","speciality","Nitoseal range","Sealants","Sealant family (e.g. Nitoseal PU40, MS300) for movement joints; choose by movement, joint size and substrate.",["Joint Sealing"],FS);
  add("fosroc","speciality","Nitoflor range","Flooring systems","Resin flooring family (e.g. Nitoflor SL2000, Hardtop, EPU100) for industrial floors.",["Flooring"],FS);
  add("fosroc","speciality","Nitocote range","Protective coatings","Protective coating family (e.g. Nitocote EP140, SN522); confirm suitability for the exposure.",["Protective Coatings"],FS);
  add("fosroc","speciality","Galvashield range","Corrosion protection","Reinforcement corrosion-protection products (e.g. Galvashield XP2) used in concrete repair.",["Concrete Repair","Structural Rehabilitation"],FS);
  add("fosroc","tile-adhesives","Nitotile range","Tile adhesives / epoxy grout","Tile-fixing and epoxy tile-grout products (e.g. Nitotile GP, Epoxy Grout).",["Tile Installation"],FS);

  /* ---------------- MYK LATICRETE (categories from myklaticrete.com) ---------------- */
  const ML = "https://myklaticrete.com/products/";
  add("myk-laticrete","tile-adhesives","Tile Adhesive range","Tile adhesives","MYK Laticrete tile adhesive category; confirm exact grade for tile type, size and substrate.",["Tile Installation"],ML+"tile-adhesive/");
  add("myk-laticrete","tile-adhesives","Stone Adhesive range","Stone adhesives","Adhesives for natural stone installation; confirm suitability for the stone type.",["Tile Installation"],ML+"stone-adhesives/");
  add("myk-laticrete","tile-adhesives","Specialty Adhesive range","Specialty adhesives","Specialty adhesive category for demanding installations.",["Tile Installation"],ML+"specialty-adhesive/");
  add("myk-laticrete","tile-adhesives","Tile Joint (Epoxy Grout) range","Tile grouts","Tile joint and epoxy grout category.",["Tile Installation"],ML+"epoxy-tile-grout/");
  add("myk-laticrete","tile-adhesives","AAC Block Adhesive range","Block adhesive","Thin-bed adhesive category for AAC block masonry.",["Tile Installation"],ML+"aac-block-adhesive/");
  add("myk-laticrete","tile-adhesives","Stone Care range","Stone care","Care and protection products for tile and stone.",["Tile Installation"],ML+"tile-and-stone-care/");
  add("myk-laticrete","waterproofing","Waterproofing range","Waterproofing systems","MYK Laticrete waterproofing category, including wet-area systems.",["Waterproofing","Tile Installation"],ML+"waterproofing/");
  add("myk-laticrete","speciality","Screed range","Screeds","Screed and concrete products category.",["Flooring"],ML+"screed-concrete/");
  add("myk-laticrete","speciality","Cement Additive range","Cement additives","Cement additive category.",["Ready-Mix Concrete"],ML+"cement-additive/");

  /* ---------------- KERAKOLL (int.kerakoll.com) ---------------- */
  const KK = "https://int.kerakoll.com/";
  add("kerakoll","repair-grouts","Geolite","Geo-mortar for concrete repair","Geo-mortar listed by Kerakoll for monolithic concrete repair.",["Concrete Repair"],KK+"p/geolite");
  add("kerakoll","repair-grouts","Repair, structural & anti-seismic strengthening range","Repair & strengthening","Kerakoll category for repair and strengthening; structural use requires an engineer's design.",["Concrete Repair","Structural Rehabilitation"],KK+"c/repair-structural-and-anti-seismic-strengthening");
  add("kerakoll","tile-adhesives","H40 Gel-Technology adhesives","Gel tile adhesives","Gel adhesive range for ceramic tile and natural stone laying.",["Tile Installation"],KK+"s/gel-adhesives");
  add("kerakoll","tile-adhesives","Laying ceramic tiles and natural stone range","Tile & stone laying","Kerakoll category for ceramic tile and natural stone installation.",["Tile Installation"],KK+"c/laying-ceramic-tiles-and-natural-stone");
  add("kerakoll","tile-adhesives","Planogel Rheo","Self-levelling gel","Self-levelling gel for substrate preparation before laying.",["Tile Installation","Flooring"],KK+"p/planogel-rheo");
  add("kerakoll","waterproofing","Waterproofing range","Waterproofing","Kerakoll waterproofing category.",["Waterproofing","Tile Installation"],KK+"c/waterproofing");
  add("kerakoll","speciality","Sealants and adhesives range","Sealants & adhesives","Kerakoll sealants and adhesives category.",["Joint Sealing"],KK+"c/sealants-and-adhesives");
  add("kerakoll","speciality","Substrates preparation range","Substrate preparation","Products for preparing substrates before finishing.",["Flooring","Tile Installation"],KK+"c/substrates-preparation");

  /* ---------------- NORMET (normet.com construction chemicals) ---------------- */
  const NB = "https://www.normet.com/en/products-and-services/construction-chemicals/construction-and-concrete-repair/";
  [["TamRez 200FS","concrete-repair-epoxy-injection-grouts/tamrez-200-fs","Ultra-low viscosity epoxy injection resin"],
   ["TamRez 210","concrete-repair-epoxy-injection-grouts/tamrez-210","Extra-low viscosity epoxy injection grout"],
   ["TamRez 220","concrete-repair-epoxy-injection-grouts/tamrez-220","High-performance epoxy injection resin"],
   ["TamRez 220U","concrete-repair-epoxy-injection-grouts/tamrez-220-u","Underwater epoxy injection resin"],
   ["TamRez 240","concrete-repair-epoxy-injection-grouts/tamrez-240","All-weather epoxy injection resin"],
   ["TamRez 440","concrete-repair-epoxy-injection-grouts/tamrez-440","Flexible epoxy sealant / injection"]
  ].forEach(r => add("normet","repair-grouts",r[0],r[2],r[2]+" for crack and void treatment. Suitability depends on crack, moisture and structural requirement.",["Injection Grouting","Concrete Repair"],NB+r[1]));
  add("normet","repair-grouts","TamRez 405","Extended epoxy grout (anchoring)","Epoxy grout for anchoring and similar fixing applications.",["Anchoring & Grouting"],NB+"concrete-repair-epoxy-injection-grouts/tamrez-405");
  add("normet","repair-grouts","TamRez 90","High-build epoxy repair mortar","High-build epoxy mortar for concrete repair.",["Concrete Repair"],NB+"concrete-repair-epoxy-mortar/tamrez-90");
  [["TamCrete 40HB","tamcrete-40-hb","High-build cementitious repair mortar"],["TamCrete FM","tamcrete-fm","Fibre-modified repair mortar"],["TamCrete 46","tamcrete-46","Polymer-cement repair additive"],["TamCrete TP","tamcrete-tp","Repair compound for tunnel segment points"]]
    .forEach(r => add("normet","repair-grouts",r[0],r[2],r[2]+".",["Concrete Repair"],NB+"cementitious-repair-mortars-and-grouts/"+r[1]));
  add("normet","repair-grouts","TamCrete GP","General-purpose grout","General-purpose grout for anchoring and pressure grouting.",["Anchoring & Grouting"],NB+"cementitious-repair-mortars-and-grouts/tamcrete-gp");
  add("normet","repair-grouts","TamCrete HF","High-flow grout","High-flow cementitious grout.",["Anchoring & Grouting"],NB+"cementitious-repair-mortars-and-grouts/tamcrete-hf");
  add("normet","repair-grouts","TamCrete TopShot","Pre-bagged dry-spray repair mortar","Pre-bagged dry-spray mortar for sprayed repair work.",["Concrete Repair"],"https://www.normet.com/en/products-and-services/construction-chemicals/sprayed-concrete-essentials/dry-spray-mortars/tamcrete-topshot");
  const NW = "https://www.normet.com/en/products-and-services/construction-chemicals/waterproofing-coating-and-additives/water-plugging/";
  add("normet","waterproofing","TamCrete Plug","Rapid-setting water plug","Rapid-setting cementitious plug for stopping water ingress.",["Waterproofing"],NW+"tamcrete-plug");
  add("normet","waterproofing","TamCrete PolyPlug","Rapid-setting modified water plug","Rapid-setting polymer-modified plug for water ingress.",["Waterproofing"],NW+"tamcrete-polyplug");
  [["TamRez 310","concrete-repair-bonding-agents/tamrez-310","Universal epoxy putty / bonding agent"],["TamRez Primer","concrete-repair-bonding-agents/tamrez-primer","Epoxy primer / binder"],["TamRez Zinc Rich Primer","concrete-repair-bonding-agents/tamrez-zinc-rich-primer","Zinc-rich epoxy primer"],["TamCrete Bond & Seal","concrete-repair-bonding-agents/tamcrete-bond-and-seal","Acrylic bonding agent and sealer"]]
    .forEach(r => add("normet","speciality",r[0],r[2],r[2]+".",["Concrete Repair"],NB+r[1]));
  add("normet","speciality","TamRez 220EC","Chemical-resistant epoxy coating","Epoxy coating for wet or dry concrete; confirm chemical resistance for the actual exposure.",["Protective Coatings"],NB+"chemical-resistant-epoxy-coating/tamrez-220-ec");
  add("normet","speciality","TamRez 530","Water-based epoxy coating","Two-component water-based epoxy coating.",["Protective Coatings"],NB+"chemical-resistant-epoxy-coating/tamrez-530");
  add("normet","speciality","TamCrete K1","Silicate-based concrete sealer","Silicate-based sealer / floor hardener.",["Flooring","Protective Coatings"],NB+"silicate-based-concrete-sealer/tamcrete-k-1");

  /* ---------------- CHRYSO (chryso.in catalogue) ---------------- */
  const CH = "https://www.chryso.in/";
  [["Ready-Mix Concrete admixtures","ready-mix-concrete","Plasticizers, superplasticizers, set activators and set retarders for ready-mix concrete.",["Ready-Mix Concrete"]],
   ["High Flow Concrete admixtures","high-flow-concrete","Superplasticizers and rheology modifiers for high-flow concrete.",["Ready-Mix Concrete"]],
   ["Self Compacting Concrete (SCC) admixtures","self-compacting-concrete-scc","Superplasticizer solutions for self-compacting concrete.",["Ready-Mix Concrete"]],
   ["Low Carbon Concrete admixtures","low-carbon-concrete","Plasticizers and activators for low-carbon concrete.",["Ready-Mix Concrete"]],
   ["Challenging Aggregate Solutions","challenging-aggregate-solution","Admixture solutions for gap-graded or clay-contaminated aggregates.",["Ready-Mix Concrete"]],
   ["Underground Construction products","underground-construction","Admixtures, fibre, micro silica and accelerators for underground construction.",["Ready-Mix Concrete"]],
   ["Precast (Wet/Dry) admixtures","precast-wet-dry","Superplasticizers and activators for precast concrete.",["Ready-Mix Concrete"]],
   ["Jobsite admixtures","jobsite","Plasticizers, retarders, activators and corrosion inhibitors for site use.",["Ready-Mix Concrete"]],
   ["Light Weight Concrete (air entrainers)","light-weight-concrete","Air-entraining admixtures for lightweight concrete.",["Ready-Mix Concrete"]]
  ].forEach(r => add("chryso","admixtures",r[0],"Concrete admixtures",r[2]+" Dosage depends on mix design and trials.",r[3],CH+"catalog/"+r[1]+"/"));
  add("chryso","admixtures","CHRYSO Quad","Concrete admixture","Featured Chryso product; confirm applications on the manufacturer page.",["Ready-Mix Concrete"],CH+"solutions/chrysoquad/");
  add("chryso","admixtures","CHRYSO Optima 1000","Concrete admixture","Featured Chryso product; confirm applications on the manufacturer page.",["Ready-Mix Concrete"],CH+"solutions/chrysooptima-1000/");
  add("chryso","waterproofing","Integral Waterproofing admixtures","Integral waterproofing","Liquid pore filler and powder crystalline waterproofing admixtures for concrete.",["Waterproofing","Ready-Mix Concrete"],CH+"catalog/integral-waterproofing/");
  add("chryso","speciality","Curing Agents","Curing compounds","Acrylic, resin and wax-based curing agents.",["Ready-Mix Concrete"],CH+"catalog/curing-agents/");
  add("chryso","speciality","CHRYSO CWA10","Concrete product","Featured Chryso product; confirm details on the manufacturer page.",["Ready-Mix Concrete"],CH+"products/chryso-cwa-10/");
  add("chryso","speciality","Demoulding Agents","Demoulding agents","Emulsion- and oil-based release agents for formwork.",["Ready-Mix Concrete"],CH+"catalog/demoulding-agent/");

  /* ---------------- CAC (cac-admixtures.com) ---------------- */
  const CC = "https://cac-admixtures.com/product-category/";
  add("cac","admixtures","CAC PCE Series admixtures","Polycarboxylate admixtures","PCE-based concrete admixture series.",["Ready-Mix Concrete"],CC+"pce-series/");
  add("cac","admixtures","CAC SNF Series admixtures","Naphthalene-based admixtures","SNF-based concrete admixture series.",["Ready-Mix Concrete"],CC+"snf-series/");
  add("cac","admixtures","CAC Hyperfluid range","Concrete admixtures","Hyperfluid range (e.g. R50, R100, R250, HES 40/45, Plus series) named on CAC project pages.",["Ready-Mix Concrete"],"https://cac-admixtures.com/");
  add("cac","admixtures","CAC Underground Construction products (UGC)","Underground construction","Products for underground construction (e.g. shotcrete AFA).",["Ready-Mix Concrete"],CC+"underground-construction/");
  add("cac","admixtures","CAC Cement Additives","Cement additives","Cement additive category.",["Ready-Mix Concrete"],CC+"cement-additives/");
  add("cac","admixtures","CAC Densified Microsilica","Densified microsilica","Densified microsilica for high-performance concrete.",["Ready-Mix Concrete"],CC+"densified-microsilica/");
  add("cac","waterproofing","CAC Integral / Crystalline Waterproofing","Integral waterproofing","Integral crystalline waterproofing admixtures.",["Waterproofing"],CC+"integral-crystalline-waterproofing/");
  add("cac","speciality","CAC Curing Compound","Curing compounds","Curing compound category.",["Ready-Mix Concrete"],CC+"curing-compound/");
  add("cac","speciality","CAC Sealants","Sealants","CAC sealant category.",["Joint Sealing"],CC+"sealants/");
  add("cac","speciality","CAC-CORROBIT OCI Plus","Bipolar corrosion inhibitor","Bipolar corrosion inhibitor for reinforced concrete.",["Concrete Repair","Ready-Mix Concrete"],"https://cac-admixtures.com/corrobit-oci-plus-bipolar-corrosion-inhibitor-for-reinforced-concrete/");

  /* ---------------- MYK LATICRETE — individual products (myklaticrete.com product pages) ---------------- */
  const MP = (n, cat, type, d, apps, path) => add("myk-laticrete", cat, n, type, d, apps, ML + path);
  const TLI = ["Tile Installation"];
  MP("LATICRETE 111 + LATICRETE 73","tile-adhesives","Latex-fortified thin-set system","Latex admixture plus powder system for large-format tiles and stone, indoors and outdoors.",TLI,"tile-adhesive/latex-fortified-thin-set-adhesives/myk-laticrete-111-73/");
  MP("LATICRETE 111 + LATICRETE 4237","tile-adhesives","Latex-fortified thin-set system","Thin-set system for large-format tiles and stone on various surfaces, indoors and outdoors.",TLI,"tile-adhesive/latex-fortified-thin-set-adhesives/myk-laticrete-111-4237/");
  MP("LATICRETE 345 Super Flex","tile-adhesives","Polymer-modified thin-set adhesive","Highly flexible adhesive for large-format tiles and natural stone, with longer working time.",TLI,"tile-adhesive/polymer-modified-thin-set-adhesives/myk-laticrete-345-super-flex/");
  MP("LATICRETE 335 Maxi","tile-adhesives","Polymer-modified thin-set adhesive","Flexible adhesive for large-format and slim tiles on various surfaces.",TLI,"tile-adhesive/polymer-modified-thin-set-adhesives/myk-laticrete-335-maxi/");
  MP("LATICRETE 335 Super Flex","tile-adhesives","Polymer-modified thin-set adhesive","High-strength thin-set for large-format tiles and natural stone.",TLI,"tile-adhesive/polymer-modified-thin-set-adhesives/myk-laticrete-335-super-flex/");
  MP("LATICRETE 325 High Flex","tile-adhesives","Polymer-modified thin-set adhesive","High-polymer, high-strength adhesive for a range of tile and stone installations.",TLI,"tile-adhesive/polymer-modified-thin-set-adhesives/myk-laticrete-325-high-flex/");
  MP("LATICRETE 325 Shear Wall Adhesive","tile-adhesives","Polymer-modified adhesive","For small-format tiles and stone on interior walls and floors and exterior floors.",TLI,"tile-adhesive/polymer-modified-thin-set-adhesives/myk-laticrete-325-shear-wall-adhesive/");
  MP("LATICRETE 315 Plus","tile-adhesives","Polymer-modified thin-set adhesive","Premium adhesive for interior and exterior floors and walls, also tile-on-tile work.",TLI,"tile-adhesive/thin-set-adhesives/myk-laticrete-315-plus/");
  MP("LATICRETE 313","tile-adhesives","Polymer-based adhesive","For small to medium ceramic/vitrified tiles and natural stone on floors and interior walls.",TLI,"tile-adhesive/polymer-based-adhesives/laticrete-313-polymer-adhesive/");
  MP("LATICRETE 307","tile-adhesives","Polymer-based adhesive","For small to medium ceramic and vitrified tiles and small natural stone on floors and walls.",TLI,"tile-adhesive/thin-set-adhesives/myk-laticrete-307/");
  MP("LATAFIX 305","tile-adhesives","Polymer-based adhesive","For ceramic tiles and small natural stone on dry interior floors.",TLI,"tile-adhesive/thin-set-adhesives/myk-latafix-305/");
  MP("LATICRETE 303","tile-adhesives","Polymer-based adhesive","Economy adhesive for ceramic tiles and small natural stone on dry interior floors and walls.",TLI,"tile-adhesive/polymer-based-adhesives/myk-laticrete-303/");
  MP("LATICRETE 320 Stone Adhesive","tile-adhesives","Thick-bed stone adhesive","Polymer-modified thick-bed adhesive for setting small to large stones on indoor and outdoor floors.",TLI,"stone-adhesives/myk-laticrete-320-thick-bed-adhesive/");
  MP("LATICRETE 340 High Performance Stone Adhesive","tile-adhesives","Medium-bed stone adhesive","Heavily polymer-modified medium-bed adhesive for stone on indoor and outdoor walls.",TLI,"stone-adhesives/myk-laticrete-340-medium-bed-adhesive/");
  MP("LATAPOXY Fast & Clear","tile-adhesives","Two-part epoxy adhesive","Quick-curing two-part epoxy that dries transparent.",TLI,"specialty-adhesive/latapoxy-fast-and-clear/");
  MP("LATAPOXY Standard","tile-adhesives","Two-part epoxy adhesive","Very high bond strength epoxy with longer working time, from stone cladding to repairs.",TLI,"specialty-adhesive/latapoxy-standard/");
  MP("LATAPOXY 300","tile-adhesives","Epoxy adhesive","High-strength, chemical-resistant epoxy for fixing tiles and stone in demanding environments.",TLI,"specialty-adhesive/latapoxy-300/");
  MP("LATAPOXY 270","tile-adhesives","Two-component epoxy adhesive","High-strength epoxy for stone veneers, wood and metals on various substrates.",TLI,"specialty-adhesive/latapoxy-270/");
  MP("LATAPOXY 310","tile-adhesives","Non-sag epoxy adhesive","Non-sag epoxy for spot bonding tiles and stone on ceilings and vertical surfaces.",TLI,"specialty-adhesive/myk-laticrete-latapoxy-310/");
  MP("DWA 215 Plus","tile-adhesives","Two-part hybrid thin-set","Large-format tiles and stone on drywall, cement board, concrete and plaster.",TLI,"specialty-adhesive/myk-laticrete-dwa-215-plus/");
  MP("DWA 215","tile-adhesives","Single-component polyurethane adhesive","Ready-to-use adhesive for bonding ceramic, semi-vitrified tile and natural stone to drywall.",TLI,"specialty-adhesive/myk-laticrete-dwa-215/");
  MP("PUA 212","tile-adhesives","Polyurethane adhesive","High-strength non-sag polyurethane adhesive for tile or stone on various surfaces.",TLI,"specialty-adhesive/myk-laticrete-pua-212/");
  MP("SP-100 Tile Joint","tile-adhesives","Epoxy grout","Stain-, germ- and moisture-resistant epoxy grout for easy-to-clean joints.",TLI,"epoxy-tile-grout/stainfree/myk-laticrete-sp-100-tile-joint/");
  MP("SP-100 DUO","tile-adhesives","Two-part epoxy grout","Stain-resistant epoxy grout for indoor and outdoor tile and stone.",TLI,"epoxy-tile-grout/stainfree/myk-laticrete-sp-100-duo/");
  MP("SP-100 UNO","tile-adhesives","One-part grout","Ready-to-use stain-resistant grout for indoor tile and stone joints.",TLI,"epoxy-tile-grout/stainfree/myk-laticrete-sp-100-uno/");
  MP("Dazzle","tile-adhesives","Decorative epoxy grout","Epoxy grout in bright colours and metallic finishes.",TLI,"epoxy-tile-grout/specialty-grout/latapoxy-dazzle/");
  MP("STELLAR Grout","tile-adhesives","One-part hybrid grout","UV-tolerant hybrid grout for indoor or outdoor use.",TLI,"epoxy-tile-grout/stainfree/myk-laticrete-stellar-grout/");
  MP("LATAPOXY 2000","tile-adhesives","Industrial epoxy grout","Heavy-duty epoxy grout for harsh, corrosive settings.",TLI,"epoxy-tile-grout/specialty-grout/latapoxy-2000/");
  MP("LATICRETE 600","tile-adhesives","Cement grout (unsanded)","Polymer-modified cement grout without sand for tile joints, indoors and outdoors.",TLI,"epoxy-tile-grout/cementitious/myk-laticrete-600/");
  MP("LATICRETE 500","tile-adhesives","Cement grout (sanded)","Polymer-modified cement grout containing sand for tile joints, indoors and outdoors.",TLI,"epoxy-tile-grout/cementitious/myk-laticrete-500/");
  MP("LATICRETE 1776","tile-adhesives","Grout additive","Polymer additive that boosts the performance of cement-based grouts.",TLI,"epoxy-tile-grout/grout-admix/myk-laticrete-1776/");
  MP("LATICRETE Hydro Ban","waterproofing","Self-setting liquid waterproofing membrane","Liquid membrane that waterproofs surfaces and helps block cracks passing through, per the manufacturer.",["Waterproofing","Tile Installation"],"waterproofing/myk-laticrete-hydro-ban/");
  MP("LATICRETE 9237","waterproofing","Roller-applied fluid barrier","Roller-applied waterproofing barrier suited to many tile and stone installations.",["Waterproofing","Tile Installation"],"waterproofing/laticrete-9237/");

  /* ---------------- CHRYSO / CAC — individual named products ---------------- */
  add("chryso","admixtures","CHRYSO Set Retarders","Retarding admixtures","Set-retarding admixtures listed in the Chryso India ready-mix and jobsite catalogue.",["Ready-Mix Concrete"],CH+"catalog/set-retarders-ready-mix-concrete/");
  add("chryso","admixtures","CHRYSO New Generation Super Plasticizer","Superplasticizer","New-generation superplasticizer category in the Chryso India catalogue.",["Ready-Mix Concrete"],CH+"catalog/new-generation-super-plasticizer-ready-mix-concrete/");
  add("chryso","admixtures","CHRYSO Rheology Modifiers","Rheology modifiers","Rheology modifiers for high-flow concrete.",["Ready-Mix Concrete"],CH+"catalog/rheology-modifers/");
  add("chryso","admixtures","CHRYSO Corrosion Inhibitor","Corrosion inhibitor","Corrosion-inhibiting admixture listed under jobsite products.",["Ready-Mix Concrete","Concrete Repair"],CH+"catalog/corrosion-inhibitor/");
  add("chryso","admixtures","CHRYSO Micro Silica","Micro silica","Micro silica listed under underground construction.",["Ready-Mix Concrete"],CH+"catalog/micro-silica/");
  ["R250","R100","R50","HES 40","HES 45","Plus H2","Plus H3","Plus H5","Plus G","Plus N"].forEach(n => add("cac","admixtures","CAC Hyperfluid " + n,"Concrete admixture (Hyperfluid range)","Product name published on CAC project pages; confirm exact type and use on the manufacturer site.",["Ready-Mix Concrete"],"https://cac-admixtures.com/"));
  add("cac","admixtures","CAC Shotcrete AFA","Shotcrete admixture (name as published)","Name published on CAC project pages; confirm on the manufacturer site.",["Ready-Mix Concrete"],"https://cac-admixtures.com/");

  /* ---------------- To be verified (no source consulted) ---------------- */
  add("myk-arment","waterproofing","MYK Arment waterproofing (to be verified)","Waterproofing","Placeholder: portfolio to be verified by DOLFIN PROJECTS.",["Waterproofing"],"",{demo:true});
  add("myk-arment","repair-grouts","MYK Arment repair (to be verified)","Repair","Placeholder: portfolio to be verified by DOLFIN PROJECTS.",["Concrete Repair"],"",{demo:true});
  add("asian-paints","waterproofing","Asian Paints waterproofing (to be verified)","Waterproofing","Placeholder: category to be verified before publishing.",["Waterproofing"],"",{demo:true});

  window.DOLFIN_PRODUCTS = P;
})();
