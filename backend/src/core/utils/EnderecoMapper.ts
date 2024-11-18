import Endereco from "../dominio/objetosDeValor/endereco";

export class EnderecoMapper {
    static toDomain(enderecoOrm: any): Endereco {
        return new Endereco(
            enderecoOrm.logradouro,
            enderecoOrm.numero,
            enderecoOrm.complemento,
            enderecoOrm.bairro,
            enderecoOrm.cidade,
            enderecoOrm.estado,
            enderecoOrm.cep
        );
    }

    static toPersistence(endereco: Endereco): object {
        return {
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
            cep: endereco.cep
        };
    }
}
