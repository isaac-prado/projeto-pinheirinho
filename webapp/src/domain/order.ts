import Customer from "./customer";

export default interface Order {
    cod: string, 
    status: string,
    lista: string,
    pref: string,
    date: string, 
    name: string,
    totalAmount: number
}