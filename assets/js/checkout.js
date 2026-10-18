/* =========================================================
   HAIRX — checkout
   Payment methods: UPI, card, net banking, Cash on Delivery.
   In "demo" mode the order is confirmed on screen and the customer
   sends it to the store on WhatsApp. Card / net banking orders get a
   secure payment link from the store. Set paymentMode to "razorpay"
   in config.js to take card / net banking payments online.
   ========================================================= */
(function () {
  var CFG = HAIRX_CONFIG, fmt = HAIRX_formatINR;
  var el = document.getElementById("checkout");
  var method = "upi";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  var STATES = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

  function field(id, label, opts) {
    opts = opts || {};
    return '<div class="field' + (opts.full ? " full" : "") + '"><label for="' + id + '">' + label + "</label>" +
      '<input id="' + id + '" name="' + id + '"' + (opts.type ? ' type="' + opts.type + '"' : "") + (opts.ac ? ' autocomplete="' + opts.ac + '"' : "") +
      (opts.mode ? ' inputmode="' + opts.mode + '"' : "") + (opts.max ? ' maxlength="' + opts.max + '"' : "") + (opts.optional ? "" : " required") + ">" +
      '<div class="err">' + (opts.err || "This field is required") + "</div></div>";
  }

  function upiLink(amount, orderId) {
    return "upi://pay?pa=" + encodeURIComponent(CFG.upiId) + "&pn=" + encodeURIComponent(CFG.upiPayeeName) +
      "&am=" + amount.toFixed(2) + "&cu=INR&tn=" + encodeURIComponent("HAIRX order " + orderId);
  }

  var orderId = "HX" + Date.now().toString().slice(-8);

  function render() {
    var t = HAIRX_cart.totals(method);
    if (!t.lines.length) {
      el.innerHTML = '<div class="empty-state" style="margin-bottom:96px"><h3>Your cart is empty</h3><p class="muted">Add a shampoo to check out.</p><a class="btn btn-dark" href="shop.html">Shop shampoos</a></div>';
      return;
    }
    el.innerHTML =
      '<form class="cart-layout" id="co-form" novalidate><div>' +
        '<div class="form-card checkout-step"><h3><span>1</span>Contact</h3><div class="form-grid">' +
          field("name", "Full name", { ac: "name", err: "Please enter your name" }) +
          field("phone", "Mobile number", { type: "tel", ac: "tel", mode: "numeric", max: 10, err: "Enter a valid 10-digit mobile number" }) +
          field("email", "Email", { type: "email", ac: "email", full: true, err: "Enter a valid email" }) +
        "</div></div>" +
        '<div class="form-card checkout-step"><h3><span>2</span>Delivery address</h3><div class="form-grid">' +
          field("address", "House no., building, street", { full: true, ac: "street-address" }) +
          field("landmark", "Landmark (optional)", { full: true, optional: true }) +
          field("city", "City", { ac: "address-level2" }) +
          field("pincode", "PIN code", { mode: "numeric", max: 6, ac: "postal-code", err: "Enter a valid 6-digit PIN code" }) +
          '<div class="field full"><label for="state">State</label><select id="state" required><option value="">Select state</option>' +
            STATES.map(function (s) { return "<option>" + s + "</option>"; }).join("") +
          '</select><div class="err">Please select your state</div></div>' +
        "</div></div>" +
        '<div class="form-card checkout-step"><h3><span>3</span>Payment</h3><div class="pay-options">' +
          payOption("upi", "UPI", "Google Pay, PhonePe, Paytm, BHIM or any UPI app", ["GPay", "PhonePe", "Paytm", "BHIM"]) +
          '<div class="pay-detail' + (method === "upi" ? " show" : "") + '" id="upi-detail"><div class="upi-box">' +
            '<div id="upi-qr" aria-label="UPI QR code"></div>' +
            '<div><p style="margin:0 0 6px"><b>Scan with any UPI app</b> or tap below on your phone.</p>' +
            '<p class="small muted" style="margin:0 0 10px">Pay to <b>' + esc(CFG.upiId) + "</b> · Amount <b>" + fmt(t.total) + "</b></p>" +
            '<a class="btn btn-outline" style="padding:10px 18px" href="' + upiLink(t.total, orderId) + '">Open UPI app</a>' +
            '<div class="field" style="margin-top:12px"><label for="utr">UPI transaction ID (after paying)</label><input id="utr" inputmode="numeric" placeholder="12-digit UTR / reference no."></div></div>' +
          "</div></div>" +
          payOption("card", "Credit / Debit card", "Visa, Mastercard, RuPay, Amex", ["VISA", "Mastercard", "RuPay"]) +
          payOption("netbanking", "Net banking", "All major Indian banks", ["SBI", "HDFC", "ICICI", "Axis"]) +
          '<div class="pay-detail' + (method === "card" || method === "netbanking" ? " show" : "") + '">' +
            (CFG.paymentMode === "razorpay" && CFG.razorpayKey
              ? '<p class="small" style="margin:0">You\'ll be taken to our secure payment partner to complete payment.</p>'
              : '<p class="small" style="margin:0">After you place the order, we\'ll send a <b>secure payment link</b> to your WhatsApp and email. Your order ships as soon as payment is done.</p>') +
          "</div>" +
          payOption("cod", "Cash on Delivery", "Pay in cash or UPI when your order arrives" + (CFG.codFee ? " · +" + fmt(CFG.codFee) + " COD fee" : ""), []) +
        "</div></div>" +
      "</div>" +
      '<aside class="summary"><h3>Your order</h3>' +
        t.lines.map(function (l) {
          return '<div class="mini-line">' + HAIRX_bottle(l.product) + "<div><b>" + l.product.name + '</b><br><span class="muted small">Qty ' + l.qty + "</span></div><span>" + fmt(l.total) + "</span></div>";
        }).join("") +
        '<div class="sum-row" style="margin-top:10px"><span>Subtotal</span><span>' + fmt(t.subtotal) + "</span></div>" +
        '<div class="sum-row save"><span>You save</span><span>−' + fmt(t.savings) + "</span></div>" +
        '<div class="sum-row"><span>Shipping</span><span>' + (t.shipping ? fmt(t.shipping) : "FREE") + "</span></div>" +
        (t.cod ? '<div class="sum-row"><span>COD fee</span><span>' + fmt(t.cod) + "</span></div>" : "") +
        '<div class="sum-row total"><span>Total</span><span>' + fmt(t.total) + "</span></div>" +
        '<button class="btn btn-dark btn-block" type="submit" style="margin-top:18px">' + (method === "cod" ? "Place order" : "Place order · " + fmt(t.total)) + "</button>" +
        '<p class="small muted" style="text-align:center;margin:14px 0 0">🔒 Your details are only used to deliver your order.</p>' +
      "</aside></form>";

    drawQR(t.total);
  }

  function payOption(value, title, sub, logos) {
    return '<label class="pay-option"><input type="radio" name="pay" value="' + value + '"' + (method === value ? " checked" : "") + ">" +
      "<div><b>" + title + "</b><span>" + sub + "</span>" +
      (logos.length ? '<div class="pay-logos">' + logos.map(function (l) { return "<em>" + l + "</em>"; }).join("") + "</div>" : "") +
      "</div></label>";
  }

  function drawQR(amount) {
    var box = document.getElementById("upi-qr");
    if (!box) return;
    if (window.QRCode) {
      new QRCode(box, { text: upiLink(amount, orderId), width: 140, height: 140, colorDark: "#141A16", colorLight: "#ffffff" });
    } else {
      box.innerHTML = '<p class="small muted">Pay to ' + esc(CFG.upiId) + "</p>";
    }
  }

  // Keep typed values when re-rendering for a payment method change
  function snapshot() {
    var v = {};
    el.querySelectorAll("input:not([type=radio]), select").forEach(function (i) { v[i.id] = i.value; });
    return v;
  }
  function restore(v) {
    Object.keys(v).forEach(function (k) { var i = document.getElementById(k); if (i) i.value = v[k]; });
  }

  el.addEventListener("change", function (e) {
    if (e.target.name === "pay") {
      var v = snapshot();
      method = e.target.value;
      render();
      restore(v);
    }
  });

  function validate() {
    var ok = true;
    var rules = {
      name: function (x) { return x.trim().length > 1; },
      phone: function (x) { return /^[6-9]\d{9}$/.test(x.trim()); },
      email: function (x) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim()); },
      address: function (x) { return x.trim().length > 4; },
      city: function (x) { return x.trim().length > 1; },
      pincode: function (x) { return /^[1-9]\d{5}$/.test(x.trim()); },
      state: function (x) { return !!x; }
    };
    var first = null;
    Object.keys(rules).forEach(function (id) {
      var input = document.getElementById(id), good = rules[id](input.value);
      input.closest(".field").classList.toggle("invalid", !good);
      if (!good) { ok = false; if (!first) first = input; }
    });
    if (first) first.focus();
    return ok;
  }

  el.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var v = snapshot(), t = HAIRX_cart.totals(method);
    var order = {
      id: orderId, date: new Date().toISOString(), method: method, utr: v.utr || "",
      customer: { name: v.name, phone: v.phone, email: v.email, address: v.address, landmark: v.landmark, city: v.city, pincode: v.pincode, state: v.state },
      lines: t.lines.map(function (l) { return { id: l.product.id, name: l.product.name, qty: l.qty, total: l.total }; }),
      subtotal: t.subtotal, shipping: t.shipping, cod: t.cod, total: t.total
    };

    if ((method === "card" || method === "netbanking") && CFG.paymentMode === "razorpay" && CFG.razorpayKey) {
      payWithRazorpay(order);
    } else {
      complete(order);
    }
  });

  function payWithRazorpay(order) {
    var s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = function () {
      new window.Razorpay({
        key: CFG.razorpayKey, amount: order.total * 100, currency: "INR", name: "HAIRX",
        description: "Order " + order.id,
        prefill: { name: order.customer.name, email: order.customer.email, contact: order.customer.phone },
        theme: { color: "#1F3A2C" },
        handler: function (res) { order.paymentId = res.razorpay_payment_id; complete(order); }
      }).open();
    };
    document.head.appendChild(s);
  }

  var METHOD_LABEL = { upi: "UPI", card: "Credit / Debit card", netbanking: "Net banking", cod: "Cash on Delivery" };

  function complete(order) {
    try { localStorage.setItem("hairx_last_order", JSON.stringify(order)); } catch (e) {}
    HAIRX_cart.clear();

    var c = order.customer;
    var msg = "New HAIRX order " + order.id + "\n\n" +
      order.lines.map(function (l) { return "• " + l.name + " x" + l.qty + " = " + fmt(l.total); }).join("\n") +
      "\n\nTotal: " + fmt(order.total) + "\nPayment: " + METHOD_LABEL[order.method] +
      (order.utr ? " (UTR " + order.utr + ")" : "") + (order.paymentId ? " (paid, " + order.paymentId + ")" : "") +
      "\n\n" + c.name + "\n" + c.phone + " · " + c.email + "\n" + c.address + (c.landmark ? ", " + c.landmark : "") +
      "\n" + c.city + ", " + c.state + " - " + c.pincode;

    var status = {
      cod: "Pay " + fmt(order.total) + " in cash or UPI when your order arrives.",
      upi: order.utr ? "We'll verify your UPI payment and ship your order right away." : "If you haven't paid yet, pay " + fmt(order.total) + " to " + esc(CFG.upiId) + " and share the transaction ID with us on WhatsApp.",
      card: order.paymentId ? "Payment received. Thank you!" : "We'll send a secure payment link to your WhatsApp and email shortly.",
      netbanking: order.paymentId ? "Payment received. Thank you!" : "We'll send a secure payment link to your WhatsApp and email shortly."
    }[order.method];

    el.innerHTML = '<div class="success">' +
      '<div class="success-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>' +
      '<span class="eyebrow">Order placed</span>' +
      "<h2>Thank you, " + esc(c.name.split(" ")[0]) + "!</h2>" +
      '<p class="muted">Your order <b>' + order.id + "</b> has been received. " + status + "</p>" +
      '<div class="order-box">' +
        order.lines.map(function (l) { return '<div class="sum-row"><span>' + esc(l.name) + " × " + l.qty + "</span><span>" + fmt(l.total) + "</span></div>"; }).join("") +
        '<div class="sum-row total"><span>Total · ' + METHOD_LABEL[order.method] + "</span><span>" + fmt(order.total) + "</span></div>" +
        '<p class="small muted" style="margin:14px 0 0">Delivering to ' + esc(c.address) + ", " + esc(c.city) + ", " + esc(c.state) + " " + esc(c.pincode) + "</p>" +
      "</div>" +
      '<p class="small"><b>One last step:</b> send your order to us on WhatsApp so we can confirm it quickly.</p>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<a class="btn btn-dark" target="_blank" rel="noopener" href="https://wa.me/' + CFG.whatsapp + "?text=" + encodeURIComponent(msg) + '">Confirm on WhatsApp</a>' +
        '<a class="btn btn-outline" href="mailto:' + CFG.email + "?subject=" + encodeURIComponent("Order " + order.id) + "&body=" + encodeURIComponent(msg) + '">Email order</a>' +
      "</div>" +
      '<p style="margin-top:28px"><a class="link-btn" href="shop.html">Continue shopping</a></p>' +
    "</div>";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render();
})();
