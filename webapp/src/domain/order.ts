import Customer from "./customer";

export default interface Order {
    cod: string, 
    date: string, 
    name: string,
    totalAmount: number
}