export default interface Customer {
    name: string;
    phone: string;
    email?: string;
    cpf: string;
    credit: number;
    isActive: boolean;
}