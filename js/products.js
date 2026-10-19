/* DOLFIN PROJECTS — product catalogue (search, filters, sort, detail view)
   Reads window.DOLFIN_PRODUCTS / DOLFIN_BRANDS / DOLFIN_CATEGORIES from data/products.js */
(function () {
  const P = window.DOLFIN_PRODUCTS || [], BR = window.DOLFIN_BRANDS || [], CAT = window.DOLFIN_CATEGORIES || [], APPS = window.DOLFIN_APPLICATIONS || [];
  const brandName = id => (BR.find(b => b.id === id) || {}).name || id;
  const catName = id => (CAT.find(c => c.id === id) || {}).name || id;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const phClass = p => ["", "c2", "c3", "c4"][(CAT.findIndex(c => c.id === p.category) + 4) % 4];

  function imageBlock(p, tall) {
    if (p.image) return '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' product image" loading="lazy">';
    return '<div class="ph ' + phClass(p) + (tall ? " tall" : "") + '" data-img="assets/images/products/' + esc(p.id) + '" role="img" aria-label="Placeholder image for ' + esc(p.name) + '"><span>' + esc(brandName(p.brand)) + ' · ' + esc(p.type) + '</span></div>';
  }

  function card(p) {
    return '<article class="card">' + imageBlock(p) +
      '<div><span class="badge">' + esc(brandName(p.brand)) + '</span><span class="badge gray">' + esc(catName(p.category)) + '</span>' +
      (p.demo ? '<span class="badge demo">Sample listing</span>' : p.status === "reference" ? '<span class="badge">Manufacturer range</span>' : "") + '</div>' +
      '<h3>' + esc(p.name) + '</h3><p>' + esc(p.description) + '</p>' +
      '<p class="demo-note">Price: Contact for Price</p>' +
      '<div class="btn-row" style="margin-top:auto"><a class="btn btn-dark btn-sm" href="product.html?id=' + encodeURIComponent(p.id) + '">View Details</a>' +
      '<a class="btn btn-ghost btn-sm" href="contact.html?type=' + encodeURIComponent("Product Price Enquiry") + '&req=' + encodeURIComponent(p.name) + '#enquiry">Request Price</a></div></article>';
  }

  /* ---------- catalogue ---------- */
  const root = document.getElementById("catalogue");
  if (root) {
    const fixedCat = root.getAttribute("data-category") || "";
    const q = new URLSearchParams(location.search);
    const el = id => document.getElementById(id);
    const sBrand = el("f-brand"), sCat = el("f-cat"), sApp = el("f-app"), sSort = el("f-sort"), sQ = el("f-q");
    const used = new Set(P.map(p => p.brand));
    sBrand.innerHTML = '<option value="">All brands</option>' + BR.filter(b => used.has(b.id)).map(b => '<option value="' + b.id + '">' + esc(b.name) + '</option>').join("");
    if (sCat) sCat.innerHTML = '<option value="">All categories</option>' + CAT.map(c => '<option value="' + c.id + '">' + esc(c.name) + '</option>').join("");
    sApp.innerHTML = '<option value="">All applications</option>' + APPS.map(a => '<option>' + esc(a) + '</option>').join("");
    if (q.get("brand")) sBrand.value = q.get("brand");
    if (sCat && q.get("cat")) sCat.value = q.get("cat");
    if (q.get("q")) sQ.value = q.get("q");

    function render() {
      const term = sQ.value.trim().toLowerCase(), cat = fixedCat || (sCat ? sCat.value : "");
      let list = P.filter(p =>
        (!sBrand.value || p.brand === sBrand.value) && (!cat || p.category === cat) &&
        (!sApp.value || p.applications.indexOf(sApp.value) > -1) &&
        (!term || [p.name, brandName(p.brand), catName(p.category), p.type, p.description, p.applications.join(" ")].join(" ").toLowerCase().indexOf(term) > -1));
      list.sort((a, b) => a.name.localeCompare(b.name) * (sSort.value === "za" ? -1 : 1));
      el("count").textContent = list.length + (list.length === 1 ? " product" : " products") + " found";
      el("results").innerHTML = list.length ? list.map(card).join("") :
        '<div class="empty" style="grid-column:1/-1"><h3>No products match your search</h3><p>Try fewer keywords or clear the filters. Can\'t find what you need? <a href="contact.html?type=Product%20Price%20Enquiry#enquiry">Send us your requirement</a> and we will help with product selection.</p><button class="btn btn-dark btn-sm" id="empty-clear">Clear all filters</button></div>';
      const ec = el("empty-clear"); if (ec) ec.addEventListener("click", clear);
      if (window.dolfinLoadImages) window.dolfinLoadImages(el("results"));
    }
    function clear() { sQ.value = ""; sBrand.value = ""; if (sCat) sCat.value = ""; sApp.value = ""; sSort.value = "az"; render(); }
    [sQ].forEach(x => x.addEventListener("input", render));
    [sBrand, sCat, sApp, sSort].forEach(x => x && x.addEventListener("change", render));
    el("f-clear").addEventListener("click", clear);
    render();
  }

  /* ---------- featured products (home) ---------- */
  const feat = document.getElementById("featured");
  if (feat) { feat.innerHTML = ["fosroc-renderoc-range", "fosroc-conplast-range", "normet-tamrez-220", "kerakoll-geolite", "myk-laticrete-waterproofing-range", "chryso-chryso-quad"].map(id => P.find(p => p.id === id)).filter(Boolean).map(card).join(""); if (window.dolfinLoadImages) window.dolfinLoadImages(feat); }

  /* ---------- brand page related products ---------- */
  document.querySelectorAll("[data-brand-products]").forEach(box => {
    const id = box.getAttribute("data-brand-products"), n = P.filter(p => p.brand === id).length;
    box.innerHTML = '<a class="btn btn-ghost btn-sm" href="products.html?brand=' + id + '">View ' + n + ' related listing' + (n === 1 ? "" : "s") + '</a>';
  });

  /* ---------- product detail ---------- */
  const det = document.getElementById("product-detail");
  if (det) {
    const id = new URLSearchParams(location.search).get("id"), p = P.find(x => x.id === id);
    if (!p) { det.innerHTML = '<div class="empty"><h2>Product not found</h2><p><a href="products.html">Back to all products</a></p></div>'; return; }
    document.title = p.name + " | DOLFIN PROJECTS";
    const NA = "Specifications available on request";
    const specRows = Object.keys(p.specs || {}).map(k => '<tr><th>' + esc(k) + '</th><td>' + esc(p.specs[k]) + '</td></tr>').join("");
    det.innerHTML =
      '<div class="two"><div>' +
      '<p><span class="badge">' + esc(brandName(p.brand)) + '</span><span class="badge gray">' + esc(catName(p.category)) + '</span>' + (p.demo ? '<span class="badge demo">Sample listing</span>' : p.status === "reference" ? '<span class="badge">Manufacturer range</span>' : "") + '</p>' +
      '<h1>' + esc(p.name) + '</h1><p class="lead">' + esc(p.description) + '</p>' +
      (p.status === "reference" ? '<div class="warn"><strong>Manufacturer range listing.</strong> This product name is listed on the manufacturer\'s public website' + (p.source ? ' (<a href="' + esc(p.source) + '" target="_blank" rel="noopener">official page</a>)' : "") + '. DOLFIN PROJECTS stock, availability, pack sizes and price must be confirmed with us, and the official datasheet should be used for all technical values. The description here is general category information, not the manufacturer\'s text.</div>' : "") +
      (p.demo ? '<div class="warn"><strong>Placeholder.</strong> Not a verified product record. Exact products, specifications and availability must be confirmed with DOLFIN PROJECTS.</div>' : "") +
      '<h2>Applications</h2><ul class="ticks">' + (p.applications.length ? p.applications.map(a => '<li>' + esc(a) + '</li>').join("") : "<li>" + NA + "</li>") + '</ul>' +
      '<h2>Key features</h2>' + (p.features.length ? '<ul class="ticks">' + p.features.map(a => '<li>' + esc(a) + '</li>').join("") + '</ul>' : '<p>Refer to Technical Datasheet.</p>') +
      '<h2>Technical information</h2><div class="table-scroll"><table class="specs">' + (specRows || '<tr><th>Technical specifications</th><td>' + NA + '</td></tr>') +
      '<tr><th>Packaging</th><td>' + esc(p.packaging || NA) + '</td></tr><tr><th>Coverage / consumption</th><td>' + esc(p.coverage || "Refer to Technical Datasheet") + '</td></tr>' +
      '<tr><th>Price</th><td>Contact for Price</td></tr></table></div>' +
      '<div class="btn-row">' + (p.datasheet ? '<a class="btn btn-ghost" href="' + esc(p.datasheet) + '" target="_blank" rel="noopener">Technical Datasheet</a>' : '<a class="btn btn-ghost" href="contact.html?type=Technical%20Assistance&req=' + encodeURIComponent("Datasheet request: " + p.name) + '#enquiry">Request Datasheet</a>') +
      (p.source ? '<a class="btn btn-ghost" href="' + esc(p.source) + '" target="_blank" rel="noopener">Manufacturer page ↗</a>' : "") + (p.sds ? '<a class="btn btn-ghost" href="' + esc(p.sds) + '" target="_blank" rel="noopener">Safety Datasheet</a>' : "") + '</div>' +
      '</div><aside class="side">' + imageBlock(p, true) +
      '<div class="form" style="margin-top:18px"><h3>Enquire about this product</h3>' + enquiryMini(p) + '</div></aside></div>';
    if (window.dolfinLoadImages) window.dolfinLoadImages(det);
  }
  function enquiryMini(p) {
    return '<p>Request price, availability or technical guidance.</p><div class="btn-row"><a class="btn btn-primary btn-sm" href="contact.html?type=Product%20Price%20Enquiry&req=' + encodeURIComponent(p.name) + '#enquiry">Request Price</a><a class="btn btn-ghost btn-sm" data-link="wa" data-text="' + esc("Hello DOLFIN PROJECTS, I would like a price/availability for: " + p.name) + '" href="#">WhatsApp</a></div>';
  }
})();
