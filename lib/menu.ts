/**
 * MENU DATA — the single file to edit when the restaurant confirms its menu.
 *
 * Ground rules baked into this file:
 *  • `price` is only filled in where the dish price appears on the restaurant's
 *    public Swiggy listing. Those are DELIVERY prices, not dine-in prices.
 *  • Dishes with no published price show "Ask" in the UI instead of a guess.
 *  • `verified: false` means availability has not been confirmed by the
 *    restaurant. The UI marks these discreetly.
 *  • Descriptions are draft marketing copy written for this concept and need
 *    owner sign-off.
 */

export type Diet = "veg" | "non-veg";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price?: number;
  /** Where the number above came from. */
  priceSource?: "swiggy-listing";
  diet: Diet;
  tags?: Array<"signature" | "chef" | "spicy" | "popular">;
  /** false → availability to be confirmed before launch. */
  verified: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  /** Images live under /public/images/<folder>/. */
  image?: { src: string; alt: string };
  dishes: Dish[];
};

const PRICE_NOTE = "Prices shown are from the public delivery listing and may differ in-house.";

export const menu: MenuCategory[] = [
  {
    id: "biryani",
    name: "Biryani & Rice",
    short: "Biryani",
    blurb: "Kaima rice, layered and sealed, finished on dum.",
    image: {
      src: "/images/biryani/biryani-mutton-dum.jpg",
      alt: "Slow-cooked authentic Malabar mutton dum biryani in a copper handi",
    },
    dishes: [
      {
        id: "manavatty-mutton-dum-biryani",
        name: "Manavatty Mutton Dum Biryani",
        description:
          "The house speciality — mutton, kaima rice and a medium-spiced Malabar masala, sealed and slow-finished.",
        price: 540,
        priceSource: "swiggy-listing",
        diet: "non-veg",
        tags: ["signature", "popular"],
        verified: false,
      },
      {
        id: "manavatty-beef-dum-biryani",
        name: "Manavatty Beef Dum Biryani",
        description: "Same dum treatment, slow-cooked beef, deep and peppery.",
        price: 420,
        priceSource: "swiggy-listing",
        diet: "non-veg",
        tags: ["signature"],
        verified: false,
      },
      {
        id: "kozhikodan-chicken-dum-biryani",
        name: "Kozhikodan Chicken Dum Biryani",
        description:
          "The Kozhikode classic — fragrant rice, fried onion, cashew and a gently spiced masala.",
        diet: "non-veg",
        tags: ["signature", "popular"],
        verified: false,
      },
      {
        id: "malabar-beef-biryani",
        name: "Malabar Beef Biryani",
        description: "Nadan-style beef biryani with roasted spices and curry leaf.",
        diet: "non-veg",
        verified: false,
      },
      {
        id: "ghee-rice",
        name: "Ghee Rice",
        description: "Short-grain rice tossed in ghee with onion, cashew and raisin.",
        price: 210,
        priceSource: "swiggy-listing",
        diet: "veg",
        verified: false,
      },
      {
        id: "ghee-rice-beef-curry",
        name: "Ghee Rice & Beef Curry",
        description: "The Thrissur order — ghee rice with a bowl of dark, slow-cooked beef curry.",
        diet: "non-veg",
        tags: ["popular"],
        verified: false,
      },
    ],
  },
  {
    id: "malabar",
    name: "Malabar Specialities",
    short: "Malabar",
    blurb: "Coastal Kozhikode cooking — pepper, coconut, tamarind and curry leaf.",
    image: {
      src: "/images/malabar-specials/beef-porichathu.jpg",
      alt: "Authentic Kerala beef porichathu with fried coconut slices and curry leaves",
    },
    dishes: [
      {
        id: "beef-porichathu",
        name: "Beef Porichathu",
        description: "Beef braised in roasted coconut and pepper, then fried dark and crisp at the edges.",
        diet: "non-veg",
        tags: ["signature", "popular"],
        verified: false,
      },
      {
        id: "kallummakkaya-roast",
        name: "Kallummakkaya Roast",
        description: "Mussels roasted with shallots, chilli and coconut — a Kozhikode shoreline staple.",
        diet: "non-veg",
        tags: ["signature", "spicy"],
        verified: false,
      },
      {
        id: "fish-mango-curry",
        name: "Fish Mango Curry",
        description: "Fish simmered in a tamarind-and-raw-mango curry with coconut milk.",
        diet: "non-veg",
        verified: false,
      },
      {
        id: "kozhi-kurumulagu",
        name: "Kozhi Kurumulagu",
        description: "Chicken in a sharp, clean black-pepper masala.",
        diet: "non-veg",
        tags: ["spicy"],
        verified: false,
      },
      {
        id: "kozhi-malli-peralan",
        name: "Kozhi Malli Peralan",
        description: "Dry chicken peralan built on coriander, coconut and green chilli.",
        diet: "non-veg",
        verified: false,
      },
      {
        id: "pachacurry-korma",
        name: "Pachacurry Korma",
        description: "Creamy coconut-and-yoghurt korma — the cooling counterpoint to a spice-heavy table.",
        diet: "veg",
        verified: false,
      },
    ],
  },
  {
    id: "grills",
    name: "Grills & Starters",
    short: "Grills",
    blurb: "Charcoal, marinades and the in-house Indo-Chinese favourites.",
    image: {
      src: "/images/dishes/chicken-lollipop.jpg",
      alt: "Smoky charcoal-grilled Chicken Alfaham with garlic toum and kubboos",
    },
    dishes: [
      {
        id: "chicken-alfaham",
        name: "Classic Chicken Al Faham",
        description: "Charcoal-grilled chicken in a Malabar marinade, served with kubboos and toum.",
        price: 280,
        priceSource: "swiggy-listing",
        diet: "non-veg",
        tags: ["signature", "popular"],
        verified: false,
      },
      {
        id: "fish-alfaham",
        name: "Signature Fish Al Faham",
        description: "Whole fish, scored and charcoal-grilled the same way.",
        diet: "non-veg",
        tags: ["signature"],
        verified: false,
      },
      {
        id: "dragon-paneer",
        name: "Dragon Paneer",
        description: "In-house favourite — crisp paneer tossed in a sweet-hot dragon sauce.",
        price: 338,
        priceSource: "swiggy-listing",
        diet: "veg",
        tags: ["chef", "popular"],
        verified: false,
      },
      {
        id: "gobhi-manchurian",
        name: "Gobhi Manchurian Dry",
        description: "Cauliflower tossed in a tangy Manchurian glaze.",
        diet: "veg",
        verified: false,
      },
      {
        id: "prawns-bbq",
        name: "Prawns BBQ",
        description: "Prawns off the grill, finished with butter and lime.",
        price: 728,
        priceSource: "swiggy-listing",
        diet: "non-veg",
        verified: false,
      },
    ],
  },
  {
    id: "curries",
    name: "Curries & Mains",
    short: "Curries",
    blurb: "For the table, with bread or rice to mop it up.",
    dishes: [
      {
        id: "nadan-chicken-curry",
        name: "Nadan Chicken Curry",
        description: "Home-style Kerala chicken curry with roasted coconut and shallots.",
        diet: "non-veg",
        verified: false,
      },
      {
        id: "beef-curry",
        name: "Beef Curry",
        description: "Slow-cooked beef in a thick, dark masala.",
        diet: "non-veg",
        verified: false,
      },
      {
        id: "kadala-curry",
        name: "Kadala Curry",
        description: "Black chickpeas in roasted coconut masala — made for puttu and appam.",
        diet: "veg",
        verified: false,
      },
      {
        id: "vegetable-stew",
        name: "Vegetable Stew",
        description: "Coconut-milk stew with vegetables and whole spices.",
        diet: "veg",
        verified: false,
      },
    ],
  },
  {
    id: "breads",
    name: "Kerala Breads",
    short: "Breads",
    blurb: "Made to order. Order early — these do not wait.",
    image: {
      src: "/images/breads/nool-porotta.jpg",
      alt: "Flaky, multilayered Kerala Nool Porotta on fresh banana leaf",
    },
    dishes: [
      {
        id: "nool-porotta",
        name: "Flaky Nool Porotta",
        description: "Layered, stretched and slapped out — crisp outside, soft inside.",
        price: 45,
        priceSource: "swiggy-listing",
        diet: "veg",
        tags: ["signature"],
        verified: false,
      },
      {
        id: "chiratta-puttu",
        name: "Chiratta Puttu",
        description: "Steamed rice-and-coconut puttu, cooked in a coconut shell.",
        diet: "veg",
        verified: false,
      },
      {
        id: "palappam",
        name: "Laced Palappam",
        description: "Fermented rice appam with crisp lace edges and a soft centre.",
        diet: "veg",
        verified: false,
      },
    ],
  },
  {
    id: "rolls",
    name: "Rolls & Quick Bites",
    short: "Rolls",
    blurb: "The takeaway counter's greatest hits.",
    dishes: [
      {
        id: "payyoli-chicken-roll",
        name: "Payyoli Chicken Roll",
        description: "Malabar-style chicken roll with a spiced filling, wrapped and griddled.",
        price: 179,
        priceSource: "swiggy-listing",
        diet: "non-veg",
        tags: ["popular"],
        verified: false,
      },
      {
        id: "beef-roll",
        name: "Beef Roll",
        description: "Beef masala, onion and lime in a soft wrap.",
        diet: "non-veg",
        verified: false,
      },
      {
        id: "paneer-roll",
        name: "Paneer Roll",
        description: "Spiced paneer and salad in a griddled wrap.",
        diet: "veg",
        verified: false,
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    short: "Drinks",
    blurb: "Sulaimani first. Always.",
    image: {
      src: "/images/desserts/sulaimani.jpg",
      alt: "Golden steaming glass of Malabar Sulaimani tea with mint",
    },
    dishes: [
      {
        id: "sulaimani",
        name: "Spiced Malabar Sulaimani",
        description: "Black tea with cardamom, clove and lime — light, hot and endlessly refillable.",
        diet: "veg",
        tags: ["signature"],
        verified: false,
      },
      {
        id: "lemon-tea",
        name: "Fresh Lemon Tea",
        description: "Strong tea, fresh lime, no fuss.",
        diet: "veg",
        verified: false,
      },
      {
        id: "mango-milkshake",
        name: "Mango Milk Shake",
        description: "Thick, cold and sweet — the children's order.",
        price: 195,
        priceSource: "swiggy-listing",
        diet: "veg",
        verified: false,
      },
      {
        id: "apple-juice",
        name: "Fresh Apple Juice",
        description: "Pressed to order.",
        diet: "veg",
        verified: false,
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    short: "Desserts",
    blurb: "Kerala sweets, kept deliberately light.",
    image: {
      src: "/images/dishes/layered-dessert.jpg",
      alt: "Traditional steamed Malabar Vattalappam with cardamom and cashews",
    },
    dishes: [
      {
        id: "vattalappam",
        name: "Traditional Vattalappam",
        description: "Steamed coconut-and-jaggery custard, spiced with cardamom and nutmeg.",
        diet: "veg",
        tags: ["signature"],
        verified: false,
      },
      {
        id: "mango-falooda",
        name: "Mango Falooda",
        description: "Mango, vermicelli, basil seeds and ice cream in a tall glass.",
        diet: "veg",
        verified: false,
      },
      {
        id: "palada-pradhaman",
        name: "Palada Pradhaman",
        description: "Rice-flake payasam simmered in milk and jaggery.",
        diet: "veg",
        verified: false,
      },
    ],
  },
];

export const allDishes: Array<Dish & { categoryId: string; categoryName: string }> = menu.flatMap(
  (category) =>
    category.dishes.map((dish) => ({
      ...dish,
      categoryId: category.id,
      categoryName: category.name,
    })),
);

export const signatureDishes = [
  {
    id: "manavatty-mutton-dum-biryani",
    name: "Manavatty Mutton Dum Biryani",
    kicker: "The house biryani",
    description:
      "Kaima rice and slow-cooked mutton, layered with a medium-spiced Malabar masala and finished sealed on dum.",
    image: "/images/biryani/biryani-mutton-dum.jpg",
    alt: "Signature Manavatty mutton dum biryani",
  },
  {
    id: "beef-porichathu",
    name: "Beef Porichathu",
    kicker: "Nadan classic",
    description: "Roasted coconut, pepper and curry leaf, fried until the edges go dark and crisp.",
    image: "/images/malabar-specials/beef-porichathu.jpg",
    alt: "Slow-roasted Kerala beef porichathu",
  },
  {
    id: "chicken-alfaham",
    name: "Crisp Spiced Chicken Lollipops",
    kicker: "Off the grill",
    description: "Crispy fried chicken drumettes tossed in a spiced Malabar glaze with fresh onion and herb salad.",
    image: "/images/dishes/chicken-lollipop.jpg",
    alt: "Crisp seasoned chicken lollipops with onion salad",
  },
  {
    id: "vattalappam",
    name: "Royal Falooda & Desserts",
    kicker: "How to finish",
    description: "Layered falooda with vanilla ice cream, rose syrup, dry fruits, fresh pomegranate, and sweet basil seeds.",
    image: "/images/dishes/layered-dessert.jpg",
    alt: "Royal layered falooda dessert with fruit and nuts",
  },
] as const;

export const galleryItems = [
  {
    src: "/images/restaurant/calicut-paradise-dining-experience.jpg",
    alt: "Dining feast spread at Calicut Paradise featuring signature dishes and refreshing beverages",
    caption: "The dining table feast",
  },
  {
    src: "/images/dishes/grilled-prawns.jpg",
    alt: "Gourmet grilled prawns platter seasoned with coastal Kerala spices",
    caption: "Grilled coastal prawns",
  },
  {
    src: "/images/dishes/chicken-lollipop.jpg",
    alt: "Crisp spicy chicken lollipops with fresh sliced onion salad",
    caption: "Crisp chicken lollipops",
  },
  {
    src: "/images/dishes/layered-dessert.jpg",
    alt: "Tall layered dessert parfait with fruit, dry fruits and cherry garnish",
    caption: "Layered Falooda dessert",
  },
  {
    src: "/images/ambience/dining-interior.jpg",
    alt: "Interior dining area at Calicut Paradise featuring warm pendant lighting, rattan ceiling details and restaurant seating.",
    caption: "Interior dining room",
  },
  {
    src: "/images/restaurant/calicut-paradise-exterior.jpg",
    alt: "Calicut Paradise restaurant exterior at Confident House, Thrissur with prominent signage",
    caption: "Confident House, Kokkala",
  },
];

export const priceNote = PRICE_NOTE;
