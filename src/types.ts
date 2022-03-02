export interface FoodTypes {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export interface RequestFood {
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

export interface CreateFood {
  name: string;
  image: string;
  price: string;
  description: string;
}
