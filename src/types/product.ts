export interface ProductVariant {
  id: number;
  name: string;
  value: string;
  colorCode?: string;
}

export interface ProductOption {
  id: number;
  name: string;
  variants: ProductVariant[];
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  isMain: boolean;
}

export interface RelatedProduct {
  id: number;
  name: string;
  imageUrl: string;
  sPrice: number;
  cPrice?: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  sPrice: number;
  cPrice?: number;
  images: ProductImage[];
  options: ProductOption[];
  relatedProducts: RelatedProduct[];
}
