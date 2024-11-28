import Customer from "./customer";

export default interface Order {
    id: number,
    data: Date, 
    valor: number, 
    produtos: Produtos[],
    totalAmount: number
}