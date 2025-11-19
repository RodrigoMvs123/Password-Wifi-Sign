export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem extends Product {
  customPassword: string;
  quantity: number;
  createdAt: number;
  wasAIGenerated: boolean;
  businessContext?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}