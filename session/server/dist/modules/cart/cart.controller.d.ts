import { Product } from '../../products';
interface CartItem extends Product {
    quantity: number;
}
interface Cart {
    cartItems: CartItem[];
}
export declare class CartController {
    private carts;
    constructor();
    index(req: any): Promise<Cart>;
    create(req: any, { id }: {
        id: string;
    }): Promise<Cart>;
    destroy(req: any): Promise<Cart>;
}
export {};
