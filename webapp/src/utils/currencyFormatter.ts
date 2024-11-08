
export default class CurrencyFormatter {
    static formatToBRL(value: number): string {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
}