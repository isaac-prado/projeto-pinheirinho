import Customer from "./customer";

export default interface Order {
    cod: string, 
    date: string, 
    customer: Customer,
    totalAmount: number
}