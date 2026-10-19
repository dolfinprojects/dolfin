/* DOLFIN PROJECTS — shared behaviour: nav, contact links, reveal, FAQ-friendly helpers */
(function () {
  const C = window.DOLFIN_CONFIG || {};

  /* ---------- contact detail injection (single source: config.js) ---------- */
  document.querySelectorAll("[data-cfg]").forEach(el => {
    const k = el.getAttribute("data-cfg");
    if (k === "phone") el.textContent = C.phoneDisplay;
    if (k === "email") el.textContent = C.email || "Email — to be added";
    if (k === "address") el.innerHTML = (C.addressLines || []).join("<br>");
    if (k === "hours" && C.hours) el.textContent = C.hours; else if (k === "hours") el.parentElement && el.parentElement.remove();
  });

  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast"; t.setAttribute("role", "status");
      t.style.cssText = "position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:#23272e;color:#fff;padding:12px 18px;border-radius:8px;z-index:300;max-width:90vw;font-size:.92rem;box-shadow:0 6px 18px rgba(0,0,0,.3)";
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.display = "block";
    clearTimeout(t._h); t._h = setTimeout(() => t.style.display = "none", 4500);
  }
  window.dolfinToast = toast;

  window.dolfinWaLink = function (text) {
    return C.whatsappNumber ? "https://wa.me/" + C.whatsappNumber + "?text=" + encodeURIComponent(text || "Hello DOLFIN PROJECTS, I would like to make an enquiry.") : "";
  };

  document.querySelectorAll("[data-link]").forEach(a => {
    const k = a.getAttribute("data-link");
    let href = "", missing = "";
    if (k === "tel") { href = C.phoneTel ? "tel:" + C.phoneTel : ""; missing = "Phone number not configured yet — set it in js/config.js."; }
    if (k === "wa") { href = window.dolfinWaLink(a.getAttribute("data-text")); missing = "WhatsApp number not configured yet — set it in js/config.js."; }
    if (k === "mail") { href = C.email ? "mailto:" + C.email : ""; missing = "Email address not configured yet — set it in js/config.js."; }
    if (href) { a.setAttribute("href", href); if (k === "wa") { a.target = "_blank"; a.rel = "noopener"; } }
    else { a.setAttribute("href", "contact.html"); a.addEventListener("click", e => { e.preventDefault(); toast(missing); }); }
  });

  /* ---------- navigation ---------- */
  const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("show");
      burger.setAttribute("aria-expanded", open);
    });
  }
  document.querySelectorAll(".menu li.has-dd > button.top").forEach(btn => {
    btn.addEventListener("click", () => {
      const li = btn.parentElement, was = li.classList.contains("open");
      document.querySelectorAll(".menu li.open").forEach(x => { x.classList.remove("open"); x.querySelector("button").setAttribute("aria-expanded", "false"); });
      if (!was) { li.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") document.querySelectorAll(".menu li.open").forEach(x => x.classList.remove("open"));
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".menu") && !e.target.closest(".burger")) document.querySelectorAll(".menu li.open").forEach(x => x.classList.remove("open"));
  });

  /* ---------- active nav link ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a.top").forEach(a => { if (a.getAttribute("href") === here) a.classList.add("active"); });

  /* ---------- scroll reveal ---------- */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    items.forEach(i => io.observe(i));
  } else items.forEach(i => i.classList.add("in"));

  /* ---------- project filters (projects.html) ---------- */
  const pf = document.querySelectorAll("[data-pfilter]");
  pf.forEach(b => b.addEventListener("click", () => {
    pf.forEach(x => x.classList.remove("on")); b.classList.add("on");
    const f = b.getAttribute("data-pfilter");
    document.querySelectorAll("[data-ptype]").forEach(c => c.style.display = (f === "all" || c.getAttribute("data-ptype") === f) ? "" : "none");
  }));
})();
