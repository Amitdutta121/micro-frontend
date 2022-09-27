import { Product } from '../../products';
export declare class ProductsController {
    constructor();
    index(): Promise<Product[]>;
    show(id: string): Promise<Product>;
}
