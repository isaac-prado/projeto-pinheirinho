import Customer from "./customer";

export default interface Order {
    cod: string | undefined, 
    date: string, 
    customer: Customer,
    totalAmount: number
}