export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  image?: ProductImage;
}

export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: ProductVariant[];
  availableForSale: boolean;
  collections: string[];
  rating: number;
  condition: string;
  year: number;
  specs: { name: string; value: string }[];
  options?: { name: string; values: string[] }[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  imageUrl: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: "gid://shopify/Collection/111",
    title: "Timepieces",
    handle: "timepieces",
    description: "Curated vintage mechanical watches from Rolex, OMEGA, Cartier, and Heuer. Restored to perfection.",
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "gid://shopify/Collection/222",
    title: "Leather Goods",
    handle: "leather-goods",
    description: "Vintage travel cases, messenger bags, and heritage luggage made from full-grain vegetable-tanned leather.",
    imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "gid://shopify/Collection/333",
    title: "Accessories",
    handle: "accessories",
    description: "Original designer sunglasses, vintage brass fountain pens, sterling silver links, and optical wear.",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/1",
    title: "1978 Rolex Submariner 'Matte Dial' Ref. 5513",
    handle: "1978-rolex-submariner-5513",
    description: "An exceptional and highly sought-after vintage Rolex Submariner Ref. 5513 from 1978. Featuring a beautiful, unpolished case and a pristine original matte dial with gorgeous warm creamy-patina hour markers. Powered by the reliable caliber 1520 automatic movement. Fully serviced and verified for authenticity.",
    descriptionHtml: "<p>An exceptional and highly sought-after vintage Rolex Submariner Ref. 5513 from 1978.</p><p>Featuring a beautiful, unpolished case and a pristine original matte dial with gorgeous warm creamy-patina hour markers. Powered by the reliable caliber 1520 automatic movement. Fully serviced and verified for authenticity.</p>",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop",
        altText: "1978 Rolex Submariner Ref. 5513 Front View"
      },
      {
        url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
        altText: "Rolex Submariner Dial Detail"
      }
    ],
    priceRange: {
      minVariantPrice: {
        amount: "14500.00",
        currencyCode: "USD"
      }
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/101",
        title: "Oyster Bracelet / Steel",
        price: { amount: "14500.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [
          { name: "Straps", value: "Oyster Bracelet" },
          { name: "Material", value: "Steel" }
        ]
      },
      {
        id: "gid://shopify/ProductVariant/102",
        title: "Vintage Leather Strap / Steel",
        price: { amount: "14200.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [
          { name: "Straps", value: "Vintage Leather Strap" },
          { name: "Material", value: "Steel" }
        ]
      }
    ],
    availableForSale: true,
    collections: ["timepieces", "bestsellers"],
    rating: 4.9,
    condition: "Excellent (Grade A)",
    year: 1978,
    specs: [
      { name: "Reference", value: "5513" },
      { name: "Movement", value: "Automatic Cal. 1520" },
      { name: "Case Size", value: "40mm" },
      { name: "Power Reserve", value: "42 Hours" },
      { name: "Crystal", value: "Acrylic Dome" }
    ]
  },
  {
    id: "gid://shopify/Product/2",
    title: "1969 OMEGA Speedmaster Professional 'Pre-Moon'",
    handle: "1969-omega-speedmaster-professional",
    description: "This 1969 OMEGA Speedmaster Ref. 145.022-69 features the legendary manual-wind Caliber 861. A beautiful vintage specimen with a step dial, dark tritium markers, and the iconic Dot Over Ninety (DON) bezel. Regarded by enthusiasts as the ultimate transitional Moonwatch.",
    priceRange: {
      minVariantPrice: {
        amount: "9200.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
        altText: "1969 OMEGA Speedmaster Professional"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/201",
        title: "Steel Bracelet",
        price: { amount: "9200.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Straps", value: "Steel Bracelet" }]
      }
    ],
    availableForSale: true,
    collections: ["timepieces"],
    rating: 4.8,
    condition: "Collector Grade (Grade S)",
    year: 1969,
    specs: [
      { name: "Reference", value: "145.022-69" },
      { name: "Movement", value: "Manual Cal. 861" },
      { name: "Case Size", value: "42mm" },
      { name: "Lug Width", value: "20mm" }
    ]
  },
  {
    id: "gid://shopify/Product/3",
    title: "1980 Cartier Tank Louis Yellow Gold",
    handle: "1980-cartier-tank-louis-gold",
    description: "The epitome of dress-watch elegance. This 1980 Cartier Tank Louis features an 18K yellow gold case, hand-wound Parisian movement, classic Roman numeral white dial, and blue cabochon sapphire crown. Paired with a premium brown alligator strap.",
    priceRange: {
      minVariantPrice: {
        amount: "7800.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop",
        altText: "1980 Cartier Tank Louis watch"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/301",
        title: "Alligator Strap / 18k Yellow Gold",
        price: { amount: "7800.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Material", value: "Gold" }]
      }
    ],
    availableForSale: true,
    collections: ["timepieces", "bestsellers"],
    rating: 5.0,
    condition: "Near Mint (Grade A+)",
    year: 1980,
    specs: [
      { name: "Material", value: "18K Yellow Gold" },
      { name: "Movement", value: "Manual Wind" },
      { name: "Dimensions", value: "23mm x 30mm" },
      { name: "Crown", value: "Sapphire Cabochon" }
    ]
  },
  {
    id: "gid://shopify/Product/4",
    title: "1970s Heritage Leather Duffle Bag",
    handle: "1970s-heritage-leather-duffle",
    description: "A gorgeous, well-patinated 1970s weekender duffle bag crafted from robust vegetable-tanned Italian leather. Featuring heavy-duty brass zippers, padded shoulder straps, and a spacious linen-lined main compartment. An ideal companion for short travels or weekends away.",
    priceRange: {
      minVariantPrice: {
        amount: "680.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
        altText: "Heritage Leather Duffle Bag"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/401",
        title: "Chestnut Brown",
        price: { amount: "680.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Chestnut Brown" }]
      },
      {
        id: "gid://shopify/ProductVariant/402",
        title: "Charcoal Black",
        price: { amount: "720.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Charcoal Black" }]
      }
    ],
    availableForSale: true,
    collections: ["leather-goods", "bestsellers"],
    rating: 4.7,
    condition: "Excellent (Grade A)",
    year: 1974,
    specs: [
      { name: "Material", value: "Full-Grain Italian Leather" },
      { name: "Hardware", value: "Solid Cast Brass" },
      { name: "Dimensions", value: "22\" L x 11\" W x 10\" H" },
      { name: "Capacity", value: "40 Liters" }
    ]
  },
  {
    id: "gid://shopify/Product/5",
    title: "Vintage Italian Florentine Leather Portfolio",
    handle: "vintage-florentine-leather-portfolio",
    description: "Handcrafted document folder and zip portfolio from Florence, Italy, circa 1985. Features gorgeous dark cognac hand-burnished details, suede interior, expandable tablet/document partitions, and slots for fine vintage writing instruments.",
    priceRange: {
      minVariantPrice: {
        amount: "340.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        altText: "Florentine Leather Portfolio"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/501",
        title: "Cognac Leather",
        price: { amount: "340.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Cognac" }]
      }
    ],
    availableForSale: true,
    collections: ["leather-goods"],
    rating: 4.6,
    condition: "Good - Gentle Age (Grade B+)",
    year: 1985,
    specs: [
      { name: "Origin", value: "Florence, Italy" },
      { name: "Lining", value: "Raw Pigskin Suede" },
      { name: "Closed size", value: "10\" x 14\"" }
    ]
  },
  {
    id: "gid://shopify/Product/6",
    title: "1960s Tortoise Shell Keyhole Sunglasses",
    handle: "1960s-tortoise-shell-sunglasses",
    description: "Original 1960s Italian handmade optical sunglasses with thick tortoise acetate and keyhole nose bridge. Upgraded with high-grade hand-tinted dark green UV protection lenses. Features classic silver double-pin hinges on the temples.",
    priceRange: {
      minVariantPrice: {
        amount: "290.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
        altText: "1960s Tortoise Sunglasses"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/601",
        title: "Standard / Forest Green Lens",
        price: { amount: "290.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Frame", value: "Tortoise Shell" }]
      },
      {
        id: "gid://shopify/ProductVariant/602",
        title: "Standard / Dark Amber Lens",
        price: { amount: "290.00", currencyCode: "USD" },
        availableForSale: false,
        selectedOptions: [{ name: "Frame", value: "Tortoise Shell" }]
      }
    ],
    availableForSale: true,
    collections: ["accessories"],
    rating: 4.7,
    condition: "Mint (Grade S)",
    year: 1965,
    specs: [
      { name: "Material", value: "Cellulose Acetate" },
      { name: "Lenses", value: "CR-39 Green Tint" },
      { name: "Width", value: "140mm" },
      { name: "Bridge", value: "21mm" }
    ]
  },
  {
    id: "gid://shopify/Product/7",
    title: "Montblanc Meisterstück No. 149 Fountain Pen (1975)",
    handle: "montblanc-meisterstueck-149-1975",
    description: "The legendary 'Diplomat' - a vintage Montblanc Meisterstück 149 fountain pen from the mid-1970s. Equipped with a hand-ground 14C bi-color gold nib, split ebonite feeder, and smooth piston filling mechanism. A true writing icon preserved in collector quality.",
    priceRange: {
      minVariantPrice: {
        amount: "580.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
        altText: "Montblanc 149 Pen close-up"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/701",
        title: "Fine (F) Gold Nib",
        price: { amount: "580.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Nib Size", value: "Fine (F)" }]
      },
      {
        id: "gid://shopify/ProductVariant/702",
        title: "Medium (M) Gold Nib",
        price: { amount: "580.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Nib Size", value: "Medium (M)" }]
      }
    ],
    availableForSale: true,
    collections: ["accessories", "bestsellers"],
    rating: 4.9,
    condition: "Near Mint (Grade A+)",
    year: 1975,
    specs: [
      { name: "Nib", value: "14C Solid Gold" },
      { name: "Materials", value: "Precious Resin & Gold Accents" },
      { name: "System", value: "Piston Converter" }
    ]
  },
  {
    id: "gid://shopify/Product/8",
    title: "1982 Leica M6 Rangefinder Camera + 50mm Summicron",
    handle: "1982-leica-m6-summicron",
    description: "The holy grail of analog photography. This early 1982 Leica M6 'Classic' has been fully tested, light meter calibrated, and paired with the razor-sharp 50mm Summicron-M f/2 lens. Exhibits clean optics, crisp rangefinder patch, and immaculate mechanical operation.",
    priceRange: {
      minVariantPrice: {
        amount: "4850.00",
        currencyCode: "USD"
      }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=800&auto=format&fit=crop",
        altText: "1982 Leica M6 classic film camera"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/801",
        title: "Black Anodized Frame / 50mm f/2 Lens",
        price: { amount: "4850.00", currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Finish", value: "Black" }]
      }
    ],
    availableForSale: true,
    collections: ["accessories"],
    rating: 5.0,
    condition: "Collector Grade (Grade S)",
    year: 1982,
    specs: [
      { name: "Lens Compatibility", value: "Leica M Mount" },
      { name: "Shutter", value: "Mechanical cloth, horizontal focal plane" },
      { name: "Rangefinder", value: "0.72x Magnification" },
      { name: "Weight", value: "585g" }
    ]
  }
];
