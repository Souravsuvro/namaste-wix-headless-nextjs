export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: MenuCategory;
  spiceLevel: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSignature: boolean;
  slug: string;
}

export type MenuCategory =
  | "entrees"
  | "plats"
  | "tandoori"
  | "biryani"
  | "desserts"
  | "cocktails";

export interface MenuCollection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export type DietaryFilter = "vegetarian" | "vegan" | "gluten_free" | "spicy";

export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    _id: "1",
    name: "Samosa de Canard Confit",
    description:
      "Samosa croustillant garni de canard confit effiloché, chutney de tamarin et micro-pousses",
    price: 9,
    image: "/images/food-samosa-starter.png",
    category: "entrees",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isSignature: true,
    slug: "samosa-canard-confit",
  },
  {
    _id: "2",
    name: "Pakora de Légumes du Jardin",
    description:
      "Beignets croustillants de légumes de saison, sauce yaourt à la menthe",
    price: 7,
    image: "/images/food-samosa-starter.png",
    category: "entrees",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isSignature: false,
    slug: "pakora-legumes",
  },
  {
    _id: "3",
    name: "Soupe Mulligatawny à la Truffe",
    description:
      "Soupe traditionnelle aux lentilles et épices, relevée d'huile de truffe noire du Périgord",
    price: 11,
    image: "/images/food-samosa-starter.png",
    category: "entrees",
    spiceLevel: 2,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isSignature: true,
    slug: "soupe-mulligatawny-truffe",
  },
  {
    _id: "4",
    name: "Butter Chicken du Chef",
    description:
      "Poulet tandoori mijoté dans une sauce tomate crémeuse au beurre et fenugrec, naan artisanal",
    price: 18,
    image: "/images/food-butter-chicken.png",
    category: "plats",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isSignature: true,
    slug: "butter-chicken",
  },
  {
    _id: "5",
    name: "Agneau Rogan Josh",
    description:
      "Agneau braisé longuement aux épices du Cachemire, riz basmati safran",
    price: 22,
    image: "/images/food-tandoori-grill.png",
    category: "plats",
    spiceLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSignature: false,
    slug: "agneau-rogan-josh",
  },
  {
    _id: "6",
    name: "Palak Paneer Fermier",
    description:
      "Épinards frais et fromage paneer fermier, épices douces et crème",
    price: 16,
    image: "/images/food-butter-chicken.png",
    category: "plats",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSignature: false,
    slug: "palak-paneer",
  },
  {
    _id: "7",
    name: "Crevettes Malabar",
    description:
      "Crevettes géantes sautées dans une sauce coco-curry du Kerala, riz pilaf",
    price: 24,
    image: "/images/food-tandoori-grill.png",
    category: "plats",
    spiceLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSignature: true,
    slug: "crevettes-malabar",
  },
  {
    _id: "8",
    name: "Tandoori Mixed Grill",
    description:
      "Assortiment de viandes marinées et grillées au tandoor : poulet tikka, agneau seekh, crevettes",
    price: 28,
    image: "/images/food-tandoori-grill.png",
    category: "tandoori",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSignature: true,
    slug: "tandoori-mixed-grill",
  },
  {
    _id: "9",
    name: "Paneer Tikka",
    description:
      "Brochettes de paneer marinées aux épices tandoori, poivrons et oignons grillés",
    price: 14,
    image: "/images/food-tandoori-grill.png",
    category: "tandoori",
    spiceLevel: 2,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSignature: false,
    slug: "paneer-tikka",
  },
  {
    _id: "10",
    name: "Biryani Royal à l'Agneau",
    description:
      "Riz basmati parfumé aux épices royales, agneau tendre, oignons caramélisés et raita",
    price: 20,
    image: "/images/food-biryani-royal.png",
    category: "biryani",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isSignature: true,
    slug: "biryani-royal-agneau",
  },
  {
    _id: "11",
    name: "Biryani Végétarien",
    description:
      "Riz basmati aux légumes de saison, fruits secs et épices douces",
    price: 16,
    image: "/images/food-biryani-royal.png",
    category: "biryani",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isSignature: false,
    slug: "biryani-vegetarien",
  },
  {
    _id: "12",
    name: "Gulab Jamun au Cognac",
    description:
      "Beignets de lait confits dans un sirop au Cognac et cardamome, glace vanille",
    price: 9,
    image: "/images/food-gulab-jamun.png",
    category: "desserts",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isSignature: true,
    slug: "gulab-jamun-cognac",
  },
  {
    _id: "13",
    name: "Kulfi à la Lavande",
    description:
      "Glace indienne traditionnelle parfumée à la lavande de Provence et pistaches",
    price: 8,
    image: "/images/food-gulab-jamun.png",
    category: "desserts",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSignature: false,
    slug: "kulfi-lavande",
  },
  {
    _id: "14",
    name: "Crème Brûlée au Cardamome",
    description:
      "Crème brûlée classique infusée à la cardamome verte et eau de rose",
    price: 10,
    image: "/images/food-gulab-jamun.png",
    category: "desserts",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSignature: true,
    slug: "creme-brulee-cardamome",
  },
  {
    _id: "15",
    name: "Mango Lassi Royale",
    description:
      "Lassi onctueux à la mangue Alphonso, safran et pistaches concassées",
    price: 12,
    image: "/images/hero-bar-interior.png",
    category: "cocktails",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isSignature: false,
    slug: "mango-lassi-royale",
  },
  {
    _id: "16",
    name: "Loire Sunset",
    description:
      "Gin, jus de mangue, liqueur de rose, tonic artisanal et zeste de combava",
    price: 14,
    image: "/images/hero-bar-interior.png",
    category: "cocktails",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isSignature: true,
    slug: "loire-sunset",
  },
  {
    _id: "17",
    name: "Masala Old Fashioned",
    description:
      "Bourbon infusé aux épices chai, sirop de jaggery, Angostura, zeste d'orange",
    price: 15,
    image: "/images/hero-bar-interior.png",
    category: "cocktails",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isSignature: true,
    slug: "masala-old-fashioned",
  },
  {
    _id: "18",
    name: "Chai Espresso Martini",
    description:
      "Vodka, espresso, liqueur de café, sirop de chai maison et cardamome",
    price: 14,
    image: "/images/hero-bar-interior.png",
    category: "cocktails",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isSignature: false,
    slug: "chai-espresso-martini",
  },
];
