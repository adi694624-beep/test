/* =========================================================
   HAIRX — store settings
   Edit these values to go live. Everything else reads from here.
   ========================================================= */
window.HAIRX_CONFIG = {
  brand: "HAIRX",
  tagline: "Rooted in Nature. Engineered for Men.",

  // Contact
  email: "care@hairx.in",
  whatsapp: "919999999999",          // country code + number, digits only
  whatsappDisplay: "+91 99999 99999",

  // Payments
  upiId: "hairx@upi",                // your UPI VPA, used for the UPI pay link + QR
  upiPayeeName: "HAIRX",
  codFee: 49,                         // extra charge for Cash on Delivery (0 to disable)
  freeShippingAbove: 1999,
  shippingFee: 99,

  // "demo" = orders are confirmed on screen + sent to you on WhatsApp, no card is charged.
  // To accept cards / net banking, connect a gateway (e.g. Razorpay) and set mode to "razorpay".
  paymentMode: "demo",
  razorpayKey: ""                     // e.g. "rzp_live_xxxxx" (needs a small backend to create orders)
};
