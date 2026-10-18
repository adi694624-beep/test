# HAIRX: natural shampoos for men

Premium, colour-coded shampoo store. It's a static site (HTML/CSS/JS), so it runs on GitHub Pages with no build step.

## Pages
| Page | What it does |
|---|---|
| `index.html` | Home: hero, shop by concern, bestsellers, benefits, colour story, comparison vs chemical shampoos, testimonials |
| `shop.html` | All products, filtered by concern, hair type and price |
| `product.html?id=…` | Product details, ingredients, how to use, add to cart |
| `quiz.html` | 6-question hair quiz that recommends a shampoo |
| `about.html` | Brand story |
| `lab-reports.html` | Lab test reports per product |
| `contact.html` | Email, WhatsApp, contact form, FAQ |
| `cart.html`, `checkout.html` | Cart and checkout (UPI / card / net banking / COD) |

## Edit before launch
- **`assets/js/config.js`**: your email, WhatsApp number, UPI ID, COD fee and shipping rules.
- **`assets/js/products.js`**: product names, prices, ingredients and colours.
- **Lab reports**: the values in `lab-reports.html` are **samples**. Replace them with your certified lab results and remove the notice.
- **Testimonials, ratings and review counts** are placeholders. Replace them with real customer reviews.

## Payments
- **UPI**: works now. It shows a QR code and an "Open UPI app" link that pays your UPI ID.
- **Cash on Delivery**: works now.
- **Card / net banking**: by default (`paymentMode: "demo"`) the customer places the order and you send them a payment link. To charge cards on the site, create a Razorpay account, set `paymentMode: "razorpay"` and add your `razorpayKey`.
- After every order, the customer gets a **"Confirm on WhatsApp"** button that sends the full order to your WhatsApp.

## Publish on GitHub Pages
Repo → **Settings → Pages** → Source: *Deploy from a branch* → pick the branch and `/ (root)` → Save.
