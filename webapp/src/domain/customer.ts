export default interface Customer {
    name: string;
    cpf: string;
    address: string;
    phone: string;
    credit: number;
    email?: string;
    isActive: boolean;
}