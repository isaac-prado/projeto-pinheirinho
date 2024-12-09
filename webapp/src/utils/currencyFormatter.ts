
export default class CurrencyFormatter {
    static formatToBRL(value: number): string {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    static parseCurrencyToNumber(currency: string): number{
        const numericString = currency
          .replace(/[^\d,-]/g, '') 
          .replaceAll(',', '.'); 
        return parseFloat(numericString);
      }
}