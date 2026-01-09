
export type Category = 'Embroidery' | 'Printing' | 'Laser Engraving';

export interface User {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  basePrice: number;
  image: string;
  description: string;
  colors: string[];
  sizes?: string[];
  material?: string;
  productionTime?: string;
}

export type PlacementSide = 'Front' | 'Back' | 'Left' | 'Right' | 'Top' | 'Bottom';
export type PositionPreset = 'Center' | 'Left Chest' | 'Right Chest' | 'Large Front' | 'Large Back';

export interface Customization {
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  image?: string;
  side: PlacementSide;
  posX: number; // percentage from left
  posY: number; // percentage from top
  scale: number;
  printType: Category;
  productColor: string;
  size?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customization: Customization;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  date: string;
  deliveryDate: string;
  deliveryTime: string;
  status: 'Order Placed' | 'Design Approved' | 'In Production' | 'Ready' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  total: number;
  items: CartItem[];
  deliveryMethod: 'Pickup' | 'Delivery';
  paymentMethod: string;
}
