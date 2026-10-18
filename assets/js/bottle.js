/* =========================================================
   HAIRX — brand marks and product bottles (inline SVG)
   ========================================================= */
(function () {
  var uid = 0;

  // The "X" is two crossed leaves.
  function leafX(cx, cy, size, color) {
    var h = size / 2, w = size * 0.2;
    var leaf = "M0," + (-h) + " C" + w + "," + (-h / 2) + " " + w + "," + (h / 2) + " 0," + h +
               " C" + (-w) + "," + (h / 2) + " " + (-w) + "," + (-h / 2) + " 0," + (-h) + " Z";
    var vein = "M0," + (-h * 0.8) + " L0," + (h * 0.8);
    return '<g transform="translate(' + cx + ' ' + cy + ')" fill="' + color + '">' +
      '<path d="' + leaf + '" transform="rotate(42)"/>' +
      '<path d="' + leaf + '" transform="rotate(-42)" opacity="0.85"/>' +
      '<path d="' + vein + '" transform="rotate(42)" stroke="rgba(255,255,255,.45)" stroke-width="' + (size * 0.025) + '" fill="none"/>' +
      '<path d="' + vein + '" transform="rotate(-42)" stroke="rgba(255,255,255,.45)" stroke-width="' + (size * 0.025) + '" fill="none"/>' +
      '</g>';
  }

  // Wordmark: HAIR + leaf X (HTML text so the X always sits right after the letters)
  window.HAIRX_logo = function (opts) {
    opts = opts || {};
    var ink = opts.ink || "currentColor";
    var leaf = opts.leaf || "#3E7A4F";
    return '<span class="logo-mark" role="img" aria-label="HAIRX" style="color:' + ink + '">' +
      '<span aria-hidden="true">HAIR</span>' +
      '<svg viewBox="0 0 40 40" aria-hidden="true">' + leafX(20, 20, 36, leaf) + '</svg>' +
      '</span>';
  };

  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Product bottle. p = product object from products.js
  window.HAIRX_bottle = function (p, opts) {
    opts = opts || {};
    var id = "b" + (++uid);
    var c = p.color, dark = shade(c, -45), light = shade(c, 40);
    var concern = (window.HAIRX_CONCERNS[p.concern] || {}).label || "";
    return '<svg class="bottle-svg" viewBox="0 0 200 420" role="img" aria-label="HAIRX ' + p.name + ' shampoo bottle">' +
      '<defs>' +
        '<linearGradient id="' + id + 'body" x1="0" x2="1">' +
          '<stop offset="0" stop-color="' + dark + '"/>' +
          '<stop offset=".35" stop-color="' + light + '"/>' +
          '<stop offset=".6" stop-color="' + c + '"/>' +
          '<stop offset="1" stop-color="' + dark + '"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + id + 'cap" x1="0" x2="1">' +
          '<stop offset="0" stop-color="#0f1411"/><stop offset=".4" stop-color="#3a433d"/><stop offset="1" stop-color="#0f1411"/>' +
        '</linearGradient>' +
        '<radialGradient id="' + id + 'shadow" cx=".5" cy=".5" r=".5">' +
          '<stop offset="0" stop-color="rgba(0,0,0,.28)"/><stop offset="1" stop-color="rgba(0,0,0,0)"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="100" cy="404" rx="78" ry="10" fill="url(#' + id + 'shadow)"/>' +
      // cap
      '<rect x="66" y="14" width="68" height="74" rx="10" fill="url(#' + id + 'cap)"/>' +
      '<rect x="66" y="80" width="68" height="6" fill="rgba(255,255,255,.08)"/>' +
      '<rect x="76" y="22" width="5" height="56" rx="2.5" fill="rgba(255,255,255,.12)"/>' +
      // shoulder + body
      '<path d="M72 88 H128 Q160 96 164 128 V370 Q164 398 136 398 H64 Q36 398 36 370 V128 Q40 96 72 88 Z" fill="url(#' + id + 'body)"/>' +
      // glass highlight
      '<path d="M52 130 Q54 112 68 104 V380 Q52 378 52 362 Z" fill="rgba(255,255,255,.22)"/>' +
      '<rect x="146" y="140" width="5" height="220" rx="2.5" fill="rgba(255,255,255,.12)"/>' +
      // label
      '<rect x="50" y="168" width="100" height="176" rx="6" fill="#F7F4EC"/>' +
      '<rect x="50" y="168" width="100" height="176" rx="6" fill="none" stroke="rgba(0,0,0,.06)"/>' +
      '<text x="93" y="206" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="600" font-size="19" letter-spacing="3" fill="#18211C">HAIR</text>' +
      leafX(127, 200, 17, "#3E7A4F") +
      '<line x1="70" y1="220" x2="130" y2="220" stroke="' + c + '" stroke-width="1.5"/>' +
      '<text x="100" y="243" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="10" letter-spacing=".8" fill="#18211C"' +
        (p.name.length > 11 ? ' textLength="88" lengthAdjust="spacingAndGlyphs"' : '') + '>' + p.name.toUpperCase() + '</text>' +
      '<text x="100" y="258" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="7" letter-spacing=".8" fill="#5b6560">FOR ' + concern.toUpperCase() + '</text>' +
      '<rect x="80" y="276" width="40" height="14" rx="7" fill="' + c + '"/>' +
      '<text x="100" y="286" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="6.5" font-weight="600" letter-spacing=".8" fill="#fff">NATURAL</text>' +
      '<text x="100" y="316" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="6.5" letter-spacing=".8" fill="#5b6560">SHAMPOO</text>' +
      '<text x="100" y="328" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="6.5" fill="#5b6560">' + p.size + ' · FOR MEN</text>' +
      '</svg>';
  };
})();
