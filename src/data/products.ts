import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 3299,
    image: "https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg",
    category: "Indoor",
    description: "The Swiss Cheese Plant, known for its unique leaf holes and splits, is a popular tropical houseplant that adds a jungle vibe to any room.",
    care: "Allow soil to dry between waterings. Enjoys bright, indirect light and humid conditions.",
    light: "medium",
    water: "medium",
    featured: true,
    stock: 15
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 1999,
    image: "https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg",
    category: "Indoor",
    description: "The Snake Plant is nearly indestructible and perfect for beginners. Its striking upright leaves purify air and add modern style.",
    care: "Water sparingly, allowing soil to dry completely. Tolerates low light but thrives in bright indirect light.",
    light: "low",
    water: "low",
    featured: true,
    stock: 20
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: 4199,
    image: "https://images.pexels.com/photos/6969338/pexels-photo-6969338.jpeg",
    category: "Indoor",
    description: "With its large, violin-shaped leaves, the Fiddle Leaf Fig makes a dramatic statement in any space.",
    care: "Keep soil consistently moist but not soggy. Prefers bright, indirect light and stable conditions.",
    light: "high",
    water: "medium",
    featured: true,
    stock: 8
  },
  {
    id: 4,
    name: "Peace Lily",
    price: 2499,
    image: "https://images.pexels.com/photos/12516235/pexels-photo-12516235.jpeg",
    category: "Indoor",
    description: "The Peace Lily features elegant white flowers and glossy leaves. It's known for its air-purifying qualities.",
    care: "Keep soil lightly moist. Drooping leaves indicate when it's thirsty. Prefers low to medium light.",
    light: "low",
    water: "medium",
    featured: false,
    stock: 12
  },
  {
    id: 5,
    name: "Aloe Vera",
    price: 1599,
    image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg",
    category: "Succulents",
    description: "This medicinal plant has thick, gel-filled leaves that can be used to soothe burns and skin irritations.",
    care: "Allow soil to dry completely between waterings. Thrives in bright, direct light.",
    light: "high",
    water: "low",
    featured: false,
    stock: 25
  },
  {
    id: 6,
    name: "Pothos",
    price: 1899,
    image: "https://images.pexels.com/photos/7728007/pexels-photo-7728007.jpeg",
    category: "Indoor",
    description: "This trailing vine is known for its heart-shaped leaves and air-purifying abilities. Perfect for hanging baskets or shelves.",
    care: "Allow top inch of soil to dry between waterings. Adaptable to various light conditions.",
    light: "low",
    water: "medium",
    featured: false,
    stock: 18
  },
  {
    id: 7,
    name: "Rubber Plant",
    price: 2899,
    image: "https://images.pexels.com/photos/7728007/pexels-photo-7728007.jpeg",
    category: "Indoor",
    description: "With large, glossy leaves, the Rubber Plant is a striking addition to any room and is known for its air-purifying qualities.",
    care: "Allow top inch of soil to dry between waterings. Prefers bright, indirect light.",
    light: "medium",
    water: "medium",
    featured: false,
    stock: 10
  },
  {
    id: 8,
    name: "ZZ Plant",
    price: 2299,
    image: "https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg",
    category: "Indoor",
    description: "With its glossy, dark green leaves, the ZZ Plant is a hardy, low-maintenance choice that thrives on neglect.",
    care: "Allow soil to dry completely between waterings. Tolerates low light conditions.",
    light: "low",
    water: "low",
    featured: true,
    stock: 16
  }
];

export const categories = [
  "All",
  "Indoor",
  "Outdoor",
  "Succulents",
  "Herbs",
  "Fruit Trees"
];