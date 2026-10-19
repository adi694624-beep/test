/* =========================================================
   HAIRX — shared header, footer, cart and helpers
   ========================================================= */
(function () {
  var CFG = window.HAIRX_CONFIG;
  var CART_KEY = "hairx_cart";

  /* ---------- Cart (stored in the visitor's browser) ---------- */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    updateCartCount();
  }

  window.HAIRX_cart = {
    items: readCart,
    add: function (id, qty) {
      var items = readCart();
      var line = items.find(function (l) { return l.id === id; });
      if (line) line.qty += qty || 1; else items.push({ id: id, qty: qty || 1 });
      writeCart(items);
      var p = window.HAIRX_findProduct(id);
      toast((p ? p.name : "Item") + " added to cart", "cart.html", "View cart");
    },
    setQty: function (id, qty) {
      var items = readCart().map(function (l) { if (l.id === id) l.qty = qty; return l; })
        .filter(function (l) { return l.qty > 0; });
      writeCart(items);
    },
    remove: function (id) { writeCart(readCart().filter(function (l) { return l.id !== id; })); },
    clear: function () { writeCart([]); },
    count: function () { return readCart().reduce(function (s, l) { return s + l.qty; }, 0); },
    totals: function (paymentMethod) {
      var lines = readCart().map(function (l) {
        var p = window.HAIRX_findProduct(l.id);
        return p ? { product: p, qty: l.qty, total: p.price * l.qty } : null;
      }).filter(Boolean);
      var subtotal = lines.reduce(function (s, l) { return s + l.total; }, 0);
      var mrp = lines.reduce(function (s, l) { return s + l.product.mrp * l.qty; }, 0);
      var shipping = subtotal === 0 || subtotal >= CFG.freeShippingAbove ? 0 : CFG.shippingFee;
      var cod = paymentMethod === "cod" ? CFG.codFee : 0;
      return { lines: lines, subtotal: subtotal, savings: mrp - subtotal, shipping: shipping, cod: cod, total: subtotal + shipping + cod };
    }
  };

  function updateCartCount() {
    var n = window.HAIRX_cart.count();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  /* ---------- Toast ---------- */
  function toast(msg, href, linkText) {
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = "<span>" + msg + "</span>" + (href ? ' <a href="' + href + '">' + linkText + "</a>" : "");
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("show"); });
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 300); }, 2600);
  }
  window.HAIRX_toast = toast;

  /* ---------- Product card ---------- */
  window.HAIRX_productCard = function (p) {
    var concern = window.HAIRX_CONCERNS[p.concern];
    return '<article class="product-card" style="--accent:' + p.color + '">' +
      '<a class="product-media" href="product.html?id=' + p.id + '">' +
        (p.bestseller ? '<span class="tag">Bestseller</span>' : "") +
        window.HAIRX_bottle(p) +
      "</a>" +
      '<div class="product-body">' +
        '<span class="concern-chip"><i style="background:' + p.color + '"></i>' + concern.label + "</span>" +
        '<h3><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
        '<p class="muted">' + p.short + "</p>" +
        '<div class="rating" aria-label="Rated ' + p.rating + ' out of 5">★ ' + p.rating + ' <span class="muted">(' + p.reviews + ")</span></div>" +
        '<div class="price-row"><span class="price">' + window.HAIRX_formatINR(p.price) + '</span> <s class="muted">' + window.HAIRX_formatINR(p.mrp) + "</s></div>" +
        '<button class="btn btn-dark btn-block" data-add="' + p.id + '">Add to cart</button>' +
      "</div></article>";
  };

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add]");
    if (btn) { e.preventDefault(); window.HAIRX_cart.add(btn.getAttribute("data-add"), 1); }
  });

  /* ---------- Header + footer ---------- */
  var NAV = [
    ["shop.html", "Shop"],
    ["quiz.html", "Hair Quiz"],
    ["about.html", "Our Story"],
    ["index.html#compare", "Why HAIRX"],
    ["lab-reports.html", "Lab Reports"],
    ["contact.html", "Contact"]
  ];

  function header() {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === here ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
    return '<div class="announce">Free shipping above ' + window.HAIRX_formatINR(CFG.freeShippingAbove) + " · Cash on Delivery available · 100% natural formulas</div>" +
      '<header class="site-header"><div class="container header-inner">' +
        '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>' +
        '<a class="logo" href="index.html">' + window.HAIRX_logo() + "</a>" +
        '<nav class="main-nav" aria-label="Main">' + links + "</nav>" +
        '<a class="cart-link" href="cart.html" aria-label="Cart">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>' +
          '<span class="cart-count" data-cart-count hidden>0</span>' +
        "</a>" +
      "</div></header>";
  }

  function footer() {
    var cats = Object.keys(window.HAIRX_CONCERNS).map(function (k) {
      return '<a href="shop.html?concern=' + k + '">' + window.HAIRX_CONCERNS[k].label + "</a>";
    }).join("");
    return '<footer class="site-footer"><div class="container footer-grid">' +
      '<div class="footer-brand">' +
        '<a class="logo" href="index.html">' + window.HAIRX_logo({ ink: "#F4F1E8", leaf: "#9CC5A1" }) + "</a>" +
        "<p>" + CFG.tagline + "</p>" +
        '<p class="small">Natural, colour-coded shampoos made for men\'s scalps. No sulphates, parabens or silicones.</p>' +
      "</div>" +
      '<div><h4>Shop by concern</h4><div class="footer-links">' + cats + "</div></div>" +
      '<div><h4>HAIRX</h4><div class="footer-links">' +
        '<a href="about.html">Our Story</a><a href="quiz.html">Hair Quiz</a><a href="lab-reports.html">Lab Reports</a><a href="contact.html#faq">FAQ</a><a href="contact.html">Contact</a>' +
      "</div></div>" +
      '<div><h4>Talk to us</h4><div class="footer-links">' +
        '<a href="mailto:' + CFG.email + '">' + CFG.email + "</a>" +
        '<a href="tel:' + CFG.phone + '">Call ' + CFG.whatsappDisplay + "</a>" +
        '<a href="https://wa.me/' + CFG.whatsapp + '" target="_blank" rel="noopener">WhatsApp ' + CFG.whatsappDisplay + "</a>" +
      "</div>" +
      '<p class="small pay-note">We accept UPI · Cards · Net Banking · Cash on Delivery</p></div>' +
      '</div><div class="container footer-bottom small">© ' + new Date().getFullYear() + " HAIRX. All rights reserved.</div></footer>" +
      '<a class="wa-float" href="https://wa.me/' + CFG.whatsapp + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
        '<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>' +
      "</a>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    updateCartCount();

    var toggle = document.querySelector(".menu-toggle");
    if (toggle) toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });

    // Fade-in on scroll
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }
  });
})();
