/* DOLFIN PROJECTS — enquiry forms (front-end validation + honest delivery handling)
   If DOLFIN_CONFIG.formEndpoint is set, the form POSTs JSON there and reports success
   ONLY when the service answers OK. If not set, the form never claims delivery; it
   offers WhatsApp / email hand-off instead. */
(function () {
  const C = window.DOLFIN_CONFIG || {};
  const PHONE = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setErr(f, name, text) {
    const el = f.elements[name]; if (!el) return;
    el.classList.toggle("invalid", !!text);
    const s = el.parentElement.querySelector(".field-err"); if (s) s.textContent = text || "";
    if (text) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  }

  function validate(f) {
    let ok = true, first = null;
    const v = n => (f.elements[n] ? f.elements[n].value.trim() : "");
    const bad = (n, t) => { setErr(f, n, t); ok = false; if (!first) first = f.elements[n]; };
    ["name", "phone", "email", "city", "requirement"].forEach(n => setErr(f, n, ""));
    if (v("name").length < 2) bad("name", "Please enter your name.");
    const ph = v("phone").replace(/[\s()-]/g, "");
    if (!ph) bad("phone", "Phone number is required."); else if (!PHONE.test(ph)) bad("phone", "Enter a valid 10-digit Indian mobile number.");
    if (!v("email")) bad("email", "Email address is required."); else if (!EMAIL.test(v("email"))) bad("email", "Enter a valid email address.");
    if (!v("city")) bad("city", "Please enter your city.");
    if (!v("requirement")) bad("requirement", "Tell us the product or service you need.");
    if (first) first.focus();
    return ok;
  }

  function summary(f, type) {
    const lines = ["Enquiry type: " + type];
    [["name", "Name"], ["company", "Company"], ["phone", "Phone"], ["email", "Email"], ["city", "City"], ["projectType", "Project type"], ["requirement", "Requirement"], ["quantity", "Quantity / area"], ["message", "Message"]]
      .forEach(([k, l]) => { const e = f.elements[k]; if (e && e.value.trim()) lines.push(l + ": " + e.value.trim()); });
    return lines.join("\n");
  }

  document.querySelectorAll("form.enquiry").forEach(f => {
    const box = f.querySelector(".msg"), type = f.getAttribute("data-type") || "General Enquiry";
    const params = new URLSearchParams(location.search);
    if (f.elements.requirement && params.get("req")) f.elements.requirement.value = params.get("req");
    if (f.elements.enquiryType && params.get("type")) f.elements.enquiryType.value = params.get("type");

    f.addEventListener("submit", async e => {
      e.preventDefault();
      box.className = "msg"; box.textContent = "";
      if (f.elements.website && f.elements.website.value) return; // honeypot
      if (!validate(f)) { box.className = "msg err"; box.textContent = "Please correct the highlighted fields and try again."; return; }
      const t = f.elements.enquiryType ? f.elements.enquiryType.value : type;
      const text = summary(f, t);

      if (C.formEndpoint) {
        const btn = f.querySelector("button[type=submit]"); btn.disabled = true;
        try {
          const data = {}; new FormData(f).forEach((v, k) => { if (k !== "website") data[k] = v; }); data.enquiryType = t;
          const res = await fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) });
          if (res.ok) { box.className = "msg ok"; box.textContent = "Thank you — your enquiry has been submitted. Our team will contact you."; f.reset(); }
          else throw new Error("HTTP " + res.status);
        } catch (err) {
          box.className = "msg err"; box.textContent = "Sorry, we could not submit your enquiry right now. Please use WhatsApp or call us.";
        } finally { btn.disabled = false; }
        return;
      }

      // No backend configured: be transparent, offer hand-off.
      box.className = "msg info"; box.innerHTML = "";
      const p = document.createElement("p"); p.style.margin = "0 0 8px";
      p.textContent = "Your details look good, but this website's enquiry form is not connected to an email/CRM service yet, so nothing has been sent. Send it now using one of the options below:";
      box.appendChild(p);
      const wa = window.dolfinWaLink ? window.dolfinWaLink(text) : "";
      const mail = C.email ? "mailto:" + C.email + "?subject=" + encodeURIComponent("Enquiry — " + t) + "&body=" + encodeURIComponent(text) : "";
      if (wa) { const a = document.createElement("a"); a.className = "btn btn-primary btn-sm"; a.href = wa; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Send via WhatsApp"; box.appendChild(a); box.appendChild(document.createTextNode(" ")); }
      if (mail) { const a = document.createElement("a"); a.className = "btn btn-dark btn-sm"; a.href = mail; a.textContent = "Send via Email"; box.appendChild(a); }
      if (!wa && !mail) { const q = document.createElement("p"); q.style.margin = "0"; q.textContent = "Company WhatsApp/email are not configured yet (see js/config.js)."; box.appendChild(q); }
    });
  });
})();
