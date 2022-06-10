import { Product } from "./app.product";

export interface CartItem {
    product: Product;
    quantity: number;
}