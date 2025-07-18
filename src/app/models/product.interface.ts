export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  fullPrice: number;
  discountPercent: number;
  category: string;
  features: Feature[];
}
