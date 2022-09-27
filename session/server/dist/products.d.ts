export interface Rating {
    rate: number;
    count: number;
}
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}
declare const products: Product[];
export default products;
