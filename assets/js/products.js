/* =========================================================
   HAIRX — product catalogue
   Each concern has its own signature colour. The colour comes
   from a natural pigment listed in `pigment`.
   ========================================================= */
window.HAIRX_CONCERNS = {
  "dry-scalp":  { label: "Dry Scalp",       color: "#2F6FB5" },
  "oily-scalp": { label: "Oily Scalp",      color: "#7BA428" },
  "frizzy":     { label: "Frizzy Hair",     color: "#C98A1E" },
  "dandruff":   { label: "Dandruff",        color: "#14877C" },
  "hair-fall":  { label: "Hair Fall",       color: "#9E2F3A" },
  "thinning":   { label: "Thinning Hair",   color: "#5E4596" },
  "sensitive":  { label: "Sensitive Scalp", color: "#B98E64" },
  "sweat":      { label: "Sweat & Gym",     color: "#3C4248" }
};

window.HAIRX_HAIR_TYPES = {
  "straight": "Straight",
  "wavy":     "Wavy",
  "curly":    "Curly",
  "thick":    "Thick / Coarse",
  "fine":     "Fine / Thin"
};

window.HAIRX_PRODUCTS = [
  {
    id: "hydra-calm",
    name: "Hydra Calm",
    concern: "dry-scalp",
    hairTypes: ["straight", "wavy", "curly", "thick", "fine"],
    color: "#2F6FB5",
    pigment: "Blue spirulina",
    size: "250 ml",
    price: 2299,
    mrp: 2699,
    rating: 4.8, reviews: 412,
    short: "Deep-moisture cleanse for tight, itchy, flaking dry scalps.",
    description: "Hydra Calm restores the scalp's moisture barrier with plant-derived hyaluronic acid and cold-pressed aloe. It cleanses without stripping, so the tight, itchy feeling after a wash stops — and stays stopped.",
    ingredients: [
      { name: "Aloe Vera (cold-pressed)", role: "Soothes and hydrates the scalp" },
      { name: "Plant Hyaluronic Acid", role: "Holds up to 1000x its weight in water" },
      { name: "Colloidal Oat", role: "Calms itch and redness" },
      { name: "Blue Spirulina", role: "Antioxidant and natural blue colour" }
    ],
    benefits: ["Ends post-wash tightness", "Reduces dry flakes", "Softer hair from root to tip"],
    bestseller: true
  },
  {
    id: "clarify-balance",
    name: "Clarify Balance",
    concern: "oily-scalp",
    hairTypes: ["straight", "wavy", "fine"],
    color: "#7BA428",
    pigment: "Chlorophyll from wheatgrass",
    size: "250 ml",
    price: 2199,
    mrp: 2599,
    rating: 4.7, reviews: 538,
    short: "Controls excess oil for up to 48 hours without drying hair out.",
    description: "Clarify Balance lifts excess sebum and build-up with green clay and neem, then rebalances oil production with tea tree. Hair stays fresh and full for longer between washes.",
    ingredients: [
      { name: "Green French Clay", role: "Absorbs excess oil and impurities" },
      { name: "Neem Leaf Extract", role: "Purifies and balances the scalp" },
      { name: "Tea Tree Oil", role: "Regulates sebum production" },
      { name: "Lemon Peel Extract", role: "Clarifies and refreshes" }
    ],
    benefits: ["Up to 48h oil control", "No greasy roots by evening", "More volume, less flat hair"],
    bestseller: true
  },
  {
    id: "smooth-tame",
    name: "Smooth Tame",
    concern: "frizzy",
    hairTypes: ["wavy", "curly", "thick"],
    color: "#C98A1E",
    pigment: "Turmeric root",
    size: "250 ml",
    price: 2499,
    mrp: 2899,
    rating: 4.8, reviews: 296,
    short: "Smooths frizz and flyaways for hair that stays in place.",
    description: "Smooth Tame seals the hair cuticle with Moroccan argan oil and flaxseed gel, so humidity can't puff hair up. You get controlled, healthy shine without silicones or a heavy feel.",
    ingredients: [
      { name: "Moroccan Argan Oil", role: "Seals cuticles and adds shine" },
      { name: "Flaxseed Extract", role: "Natural hold, controls frizz" },
      { name: "Shea Butter", role: "Deep nourishment for coarse hair" },
      { name: "Turmeric Root", role: "Antioxidant and natural amber colour" }
    ],
    benefits: ["Humidity-proof smoothness", "Silicone-free shine", "Easier to style"],
    bestseller: false
  },
  {
    id: "flake-defense",
    name: "Flake Defense",
    concern: "dandruff",
    hairTypes: ["straight", "wavy", "curly", "thick", "fine"],
    color: "#14877C",
    pigment: "Spirulina and chlorophyll blend",
    size: "250 ml",
    price: 2399,
    mrp: 2799,
    rating: 4.9, reviews: 721,
    short: "Clears visible dandruff and stops it from coming back.",
    description: "Flake Defense targets the root cause of dandruff — the yeast that overgrows on the scalp. Willow bark gently lifts flakes while tea tree and rosemary keep the scalp clear, wash after wash.",
    ingredients: [
      { name: "Willow Bark (natural salicylic)", role: "Gently lifts flakes" },
      { name: "Tea Tree Oil", role: "Fights dandruff-causing yeast" },
      { name: "Rosemary Extract", role: "Calms and protects the scalp" },
      { name: "Apple Cider Vinegar", role: "Restores healthy scalp pH" }
    ],
    benefits: ["Visibly fewer flakes in 2 weeks", "Itch relief from the first wash", "Keeps dandruff away"],
    bestseller: true
  },
  {
    id: "root-strength",
    name: "Root Strength",
    concern: "hair-fall",
    hairTypes: ["straight", "wavy", "curly", "thick", "fine"],
    color: "#9E2F3A",
    pigment: "Beetroot",
    size: "250 ml",
    price: 2799,
    mrp: 3199,
    rating: 4.8, reviews: 655,
    short: "Strengthens roots and reduces hair fall from breakage.",
    description: "Root Strength combines red onion and bhringraj — trusted in Ayurveda for centuries — with green-coffee caffeine to energise follicles. Hair grows stronger at the root and breaks less.",
    ingredients: [
      { name: "Red Onion Extract", role: "Sulphur to strengthen hair" },
      { name: "Bhringraj", role: "Ayurvedic root nourishment" },
      { name: "Green Coffee Caffeine", role: "Energises hair follicles" },
      { name: "Plant Biotin", role: "Supports keratin structure" }
    ],
    benefits: ["Less hair fall in the shower", "Stronger, thicker strands", "Healthier scalp circulation"],
    bestseller: true
  },
  {
    id: "volume-rise",
    name: "Volume Rise",
    concern: "thinning",
    hairTypes: ["straight", "wavy", "fine"],
    color: "#5E4596",
    pigment: "Butterfly pea flower",
    size: "250 ml",
    price: 2899,
    mrp: 3299,
    rating: 4.7, reviews: 318,
    short: "Lifts and thickens fine, thinning hair for a fuller look.",
    description: "Volume Rise coats every strand with rice protein to make it thicker, while Korean ginseng and saw palmetto support the scalp. Thinning areas look fuller from the first wash.",
    ingredients: [
      { name: "Rice Protein", role: "Thickens each strand" },
      { name: "Korean Ginseng", role: "Revitalises the scalp" },
      { name: "Saw Palmetto", role: "Supports healthy growth" },
      { name: "Butterfly Pea Flower", role: "Antioxidant and natural violet colour" }
    ],
    benefits: ["Instantly fuller look", "Lift at the roots", "Lightweight, no residue"],
    bestseller: false
  },
  {
    id: "pure-soothe",
    name: "Pure Soothe",
    concern: "sensitive",
    hairTypes: ["straight", "wavy", "curly", "thick", "fine"],
    color: "#B98E64",
    pigment: "Natural cocoa extract",
    size: "250 ml",
    price: 2099,
    mrp: 2499,
    rating: 4.8, reviews: 204,
    short: "Fragrance-free, ultra-gentle cleanse for reactive scalps.",
    description: "Pure Soothe is made for scalps that react to everything. It has no added fragrance, only 9 ingredients, and chamomile and calendula to calm redness and burning.",
    ingredients: [
      { name: "Chamomile Extract", role: "Calms redness" },
      { name: "Calendula Flower", role: "Repairs irritated skin" },
      { name: "Colloidal Oat", role: "Relieves itch" },
      { name: "Coconut-derived Cleansers", role: "Ultra-mild cleansing" }
    ],
    benefits: ["Fragrance-free", "Only 9 ingredients", "Safe for daily use"],
    bestseller: false
  },
  {
    id: "daily-fresh",
    name: "Daily Fresh",
    concern: "sweat",
    hairTypes: ["straight", "wavy", "curly", "thick", "fine"],
    color: "#3C4248",
    pigment: "Activated bamboo charcoal",
    size: "250 ml",
    price: 1999,
    mrp: 2399,
    rating: 4.7, reviews: 467,
    short: "Post-gym detox that clears sweat, odour and build-up.",
    description: "Daily Fresh pulls sweat, salt and pollution out of hair with bamboo charcoal, then leaves a cooling peppermint finish. It is gentle enough to use every day, even twice after a workout.",
    ingredients: [
      { name: "Bamboo Charcoal", role: "Draws out sweat and pollutants" },
      { name: "Peppermint Oil", role: "Cooling, long-lasting freshness" },
      { name: "Eucalyptus", role: "Neutralises odour" },
      { name: "Pro-Vitamin B5", role: "Keeps daily-washed hair soft" }
    ],
    benefits: ["Removes sweat and odour", "Cooling scalp feel", "Gentle for daily use"],
    bestseller: false
  },
  {
    id: "curl-define",
    name: "Curl Define",
    concern: "frizzy",
    hairTypes: ["curly", "thick", "wavy"],
    color: "#C4612D",
    pigment: "Annatto seed",
    size: "250 ml",
    price: 2599,
    mrp: 2999,
    rating: 4.6, reviews: 158,
    short: "Defines curls and waves with moisture, not crunch.",
    description: "Curl Define gives curly and coarse hair the moisture it is always missing. Coconut milk and marshmallow root form clean, bouncy curls with no sulphates to dry them out.",
    ingredients: [
      { name: "Coconut Milk", role: "Rich moisture for curls" },
      { name: "Marshmallow Root", role: "Slip for easy detangling" },
      { name: "Hibiscus", role: "Natural curl definition" },
      { name: "Annatto Seed", role: "Antioxidant and natural copper colour" }
    ],
    benefits: ["Defined, bouncy curls", "Less tangling", "Moisture without weight"],
    bestseller: false
  }
];

window.HAIRX_findProduct = function (id) {
  return window.HAIRX_PRODUCTS.find(function (p) { return p.id === id; });
};

window.HAIRX_formatINR = function (n) {
  return "₹" + Number(n).toLocaleString("en-IN");
};
