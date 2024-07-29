const allCategoryBrands = [
  {
    Category: "Beauty",
    Brand: "Parachute Advansed Body Lotion",
  },
  {
    Category: "Beauty",
    Brand: "PureSense",
  },
  {
    Category: "Beauty",
    Brand: "Coco Soul Beauty",
  },
  {
    Category: "Beauty",
    Brand: "Bio Oil",
  },
  {
    Category: "Beauty",
    Brand: "Livon",
  },
  {
    Category: "Foods",
    Brand: "Immuniveda - Rest of the portfolio",
  },
  {
    Category: "Foods",
    Brand: "Saffola Fittify",
  },
  {
    Category: "Foods",
    Brand: "Saffola Aura",
  },
  {
    Category: "Foods",
    Brand: "Saffola Oodles",
  },
  {
    Category: "Foods",
    Brand: "Saffola Oil",
  },
  {
    Category: "Foods",
    Brand: "Saffola Honey",
  },
  {
    Category: "Foods",
    Brand: "Saffola Oats",
  },
  {
    Category: "Foods",
    Brand: "Immuniveda - Chyawanprash",
  },
  {
    Category: "Foods",
    Brand: "Saffola Mealmaker Soya",
  },
  {
    Category: "Foods",
    Brand: "Saffola Peanut Butter",
  },
  {
    Category: "Foods",
    Brand: "Saffola Mayo",
  },
  {
    Category: "Hair Care",
    Brand: "Parachute Advansed Coconut Oil Gold",
  },
  {
    Category: "Hair Care",
    Brand: "Parachute Advansed Jasmine",
  },
  {
    Category: "Hair Care",
    Brand: "Parachute Advansed Ayurvedic",
  },
  {
    Category: "Hair Care",
    Brand: "Parachute Advansed Aloe vera",
  },
  {
    Category: "Hair Care",
    Brand: "Parachute Advansed Hot Oil",
  },
  {
    Category: "Hair Care",
    Brand: "Hair & Care",
  },
  {
    Category: "Hair Care",
    Brand: "Nihar Naturals Hair Oil",
  },
  {
    Category: "Hair Care",
    Brand: "Nihar Shanti Amla",
  },
  {
    Category: "Hair Care",
    Brand: "Parachute Advansed Onion",
  },
  {
    Category: "Hair Care",
    Brand: "Jataa",
  },
  {
    Category: "Male Grooming",
    Brand: "Beardo",
  },
  {
    Category: "Male Grooming",
    Brand: "Parachute Advansed Men",
  },
  {
    Category: "Male Grooming",
    Brand: "Set Wet",
  },
  {
    Category: "Beauty",
    Brand: "Colourbar",
  },
  {
    Category: "Beauty",
    Brand: "Wow",
  },
  {
    Category: "Beauty",
    Brand: "Mama Earth",
  },
  {
    Category: "Beauty",
    Brand: "Lakme",
  },
  {
    Category: "Beauty",
    Brand: "Maybelline",
  },
  {
    Category: "Beauty",
    Brand: "Plum",
  },
  {
    Category: "Beauty",
    Brand: "Bella Vita",
  },
  {
    Category: "Beauty",
    Brand: "Neutrogena",
  },
  {
    Category: "Beauty",
    Brand: "Revlon",
  },
  {
    Category: "Beauty",
    Brand: "Nivea",
  },
  {
    Category: "Beauty",
    Brand: "Love Beauty",
  },
  {
    Category: "Beauty",
    Brand: "Faces",
  },
  {
    Category: "Beauty",
    Brand: "Vaseline",
  },
  {
    Category: "Beauty",
    Brand: "Forest Essentials",
  },
  {
    Category: "Beauty",
    Brand: "Himalaya",
  },
  {
    Category: "Beauty",
    Brand: "Biotique",
  },
  {
    Category: "Beauty",
    Brand: "Dot & Key",
  },
  {
    Category: "Beauty",
    Brand: "The Body Shop",
  },
  {
    Category: "Beauty",
    Brand: "The Derma Co",
  },
  {
    Category: "Beauty",
    Brand: "UrbanBoitanics",
  },
  {
    Category: "Beauty",
    Brand: "Kama Ayurveda",
  },
  {
    Category: "Beauty",
    Brand: "Moms Co",
  },
  {
    Category: "Beauty",
    Brand: "Olay India",
  },
  {
    Category: "Beauty",
    Brand: "L'Oreal",
  },
  {
    Category: "Beauty",
    Brand: "Streax",
  },
  {
    Category: "Beauty",
    Brand: "Khadi",
  },
  {
    Category: "Beauty",
    Brand: "Mcaffeine",
  },
  {
    Category: "Beauty",
    Brand: "Tresseme",
  },
  {
    Category: "Beauty",
    Brand: "Medimix",
  },
  {
    Category: "Beauty",
    Brand: "Juicy Chemistry",
  },
  {
    Category: "Beauty",
    Brand: "Garnier",
  },
  {
    Category: "Beauty",
    Brand: "Reequil",
  },
  {
    Category: "Beauty",
    Brand: "Kaya Clinic",
  },
  {
    Category: "Beauty",
    Brand: "Dr Sheth's",
  },
  {
    Category: "Beauty",
    Brand: "Ponds",
  },
  {
    Category: "Beauty",
    Brand: "Fiama",
  },
  {
    Category: "Beauty",
    Brand: "Santoor",
  },
  {
    Category: "Beauty",
    Brand: "SoulTree",
  },
  {
    Category: "Beauty",
    Brand: "Pears",
  },
  {
    Category: "Beauty",
    Brand: "Just Herbs",
  },
  {
    Category: "Beauty",
    Brand: "Arata",
  },
  {
    Category: "Beauty",
    Brand: "Dove",
  },
  {
    Category: "Beauty",
    Brand: "Yardley",
  },
  {
    Category: "Beauty",
    Brand: "Rexona",
  },
  {
    Category: "Beauty",
    Brand: "BBLUNT",
  },
  {
    Category: "Beauty",
    Brand: "StBotanica",
  },
  {
    Category: "Beauty",
    Brand: "Herbal Essence",
  },
  {
    Category: "Beauty",
    Brand: "Palmolive",
  },
  {
    Category: "Beauty",
    Brand: "Organic Riot",
  },
  {
    Category: "Beauty",
    Brand: "Cinthol",
  },
  {
    Category: "Beauty",
    Brand: "Hamam",
  },
  {
    Category: "Beauty",
    Brand: "Liril",
  },
  {
    Category: "Beauty",
    Brand: "Rey Naturals",
  },
  {
    Category: "Beauty",
    Brand: "Lux",
  },
  {
    Category: "Beauty",
    Brand: "Dettol",
  },
  {
    Category: "Beauty",
    Brand: "Pears",
  },
  {
    Category: "Beauty",
    Brand: "Sugar Cosmetics",
  },
  {
    Category: "Beauty",
    Brand: "Earth Rhythm",
  },
  {
    Category: "Beauty",
    Brand: "Bare Anatomy",
  },
  {
    Category: "Beauty",
    Brand: "The Beauty Co.",
  },
  {
    Category: "Beauty",
    Brand: "Pilgrim",
  },
  {
    Category: "Beauty",
    Brand: "Renee Cosmetics",
  },
  {
    Category: "Beauty",
    Brand: "Minimalist",
  },
  {
    Category: "Beauty",
    Brand: "Deconstruct",
  },
  {
    Category: "Beauty",
    Brand: "Skinkraft",
  },
  {
    Category: "Beauty",
    Brand: "Chemist At Play",
  },
  {
    Category: "Beauty",
    Brand: "Traya",
  },
  {
    Category: "Beauty",
    Brand: "Vedix",
  },
  {
    Category: "Foods",
    Brand: "Tata",
  },
  {
    Category: "Foods",
    Brand: "Nutrela",
  },
  {
    Category: "Foods",
    Brand: "Herbalife",
  },
  {
    Category: "Foods",
    Brand: "Nescafe",
  },
  {
    Category: "Foods",
    Brand: "Fast&Up",
  },
  {
    Category: "Foods",
    Brand: "Organic India",
  },
  {
    Category: "Foods",
    Brand: "Oziva",
  },
  {
    Category: "Foods",
    Brand: "Dabur Immunity",
  },
  {
    Category: "Foods",
    Brand: "Yippee Noodles",
  },
  {
    Category: "Foods",
    Brand: "Vahdam",
  },
  {
    Category: "Foods",
    Brand: "Oreo",
  },
  {
    Category: "Foods",
    Brand: "Baidyanath",
  },
  {
    Category: "Foods",
    Brand: "Sunfeast",
  },
  {
    Category: "Foods",
    Brand: "Neuherbs",
  },
  {
    Category: "Foods",
    Brand: "Maggi",
  },
  {
    Category: "Foods",
    Brand: "PediaSure",
  },
  {
    Category: "Foods",
    Brand: "Veeba",
  },
  {
    Category: "Foods",
    Brand: "Society Tea",
  },
  {
    Category: "Foods",
    Brand: "Cadbury Dairy Milk Silk",
  },
  {
    Category: "Foods",
    Brand: "Quaker oats",
  },
  {
    Category: "Foods",
    Brand: "Knorr",
  },
  {
    Category: "Foods",
    Brand: "Kapiva",
  },
  {
    Category: "Foods",
    Brand: "Aashirvaad",
  },
  {
    Category: "Foods",
    Brand: "Fortune",
  },
  {
    Category: "Foods",
    Brand: "Cureveda",
  },
  {
    Category: "Foods",
    Brand: "Raw Pressery",
  },
  {
    Category: "Foods",
    Brand: "Dr Vaidya's",
  },
  {
    Category: "Foods",
    Brand: "Wingreen",
  },
  {
    Category: "Foods",
    Brand: "Zandu",
  },
  {
    Category: "Foods",
    Brand: "Kellogg's",
  },
  {
    Category: "Foods",
    Brand: "Too Yumm",
  },
  {
    Category: "Foods",
    Brand: "Max Care",
  },
  {
    Category: "Foods",
    Brand: "SunDrop Oil",
  },
  {
    Category: "Foods",
    Brand: "Yogabar",
  },
  {
    Category: "Foods",
    Brand: "True Elements",
  },
  {
    Category: "Foods",
    Brand: "Slurrp Farm",
  },
  {
    Category: "Foods",
    Brand: "Happilo",
  },
  {
    Category: "Foods",
    Brand: "Open Secret",
  },
  {
    Category: "Foods",
    Brand: "Wellbeing Nutrition",
  },
  {
    Category: "Foods",
    Brand: "Himlayan Organics",
  },
  {
    Category: "Foods",
    Brand: "Habbit Health",
  },
  {
    Category: "Foods",
    Brand: "Gynoveda",
  },
  {
    Category: "Hair Care",
    Brand: "Sunsilk",
  },
  {
    Category: "Hair Care",
    Brand: "Clinic Plus",
  },
  {
    Category: "Hair Care",
    Brand: "Dabur Vatika",
  },
  {
    Category: "Hair Care",
    Brand: "Godrej",
  },
  {
    Category: "Hair Care",
    Brand: "Dabur Amla",
  },
  {
    Category: "Hair Care",
    Brand: "Emami 7",
  },
  {
    Category: "Hair Care",
    Brand: "Pantene",
  },
  {
    Category: "Hair Care",
    Brand: "Navratna",
  },
  {
    Category: "Hair Care",
    Brand: "Kesh King",
  },
  {
    Category: "Hair Care",
    Brand: "Bajaj Almond",
  },
  {
    Category: "Hair Care",
    Brand: "Head & Shoulders",
  },
  {
    Category: "Hair Care",
    Brand: "Indulekha",
  },
  {
    Category: "Hair Care",
    Brand: "Vegetal",
  },
  {
    Category: "Hair Care",
    Brand: "Dabur Almond",
  },
  {
    Category: "Hair Care",
    Brand: "Vasmol",
  },
  {
    Category: "Hair Care",
    Brand: "VVD",
  },
  {
    Category: "Male Grooming",
    Brand: "The Man Company",
  },
  {
    Category: "Male Grooming",
    Brand: "Engage",
  },
  {
    Category: "Male Grooming",
    Brand: "Bombay Shaving",
  },
  {
    Category: "Male Grooming",
    Brand: "Wild Stone",
  },
  {
    Category: "Male Grooming",
    Brand: "Park Avenue",
  },
  {
    Category: "Male Grooming",
    Brand: "Gatsby",
  },
  {
    Category: "Male Grooming",
    Brand: "UrbanGabru",
  },
  {
    Category: "Male Grooming",
    Brand: "Ustraa",
  },
  {
    Category: "Male Grooming",
    Brand: "Fogg",
  },
  {
    Category: "Male Grooming",
    Brand: "Fair and Handsome",
  },
  {
    Category: "Male Grooming",
    Brand: "Gillette",
  },
  {
    Category: "Male Grooming",
    Brand: "Axe",
  },
  {
    Category: "Male Grooming",
    Brand: "Phillips",
  },
  {
    Category: "Male Grooming",
    Brand: "Man Matters",
  },
];

export function getAllBrands() {
  return al;
  lCategoryBrands;
}
