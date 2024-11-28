import Customer from "./customer";
import Product from "../pages/product";

export default interface Order {
    id: number,
    data: Date,  
    valor: number, 
    produtos: Product[],
    totalAmount: number
}