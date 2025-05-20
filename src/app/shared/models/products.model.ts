export interface Iproduct {
  _id: string;
  title: string;
  product_description: Array<string>;
  rating: number;
  reviews_count: number;
  images: Array<string>;
  tags: Array<string>;
  product_details: string | null;
  return_policy: string | null;
  total_price: string;
  product_specifications: Array<ProductSpecs> | null;
  category: string;
  subcategory: string;
}

export interface ProductSpecs {
  _id: string;
  specification_name: string;
  specification_value: string;
}


export interface ICategoryWithSubcategories {
  category: string;
  subcategories: string[];
}