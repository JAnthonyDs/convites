import { dbQuery } from "../services/connection"


export type Noiva = {
    cpf: string,
    nome: string,
    descricao: string
}

const insertNoiva = async (noiva: Noiva) => {
    await dbQuery(`INSERT INTO noiva (cpf,nome,descricao) VALUES(?,?,?)`,[noiva.cpf,noiva.nome,noiva.descricao])
}

const deleteNoiva = async (noiva: Noiva) => {
    await dbQuery(`DELETE FROM noiva WHERE (cpf) == (?)`,[noiva.cpf])
}

const selectNoiva = async (noiva: Noiva) => {
    const retorno = await dbQuery(`SELECT noiva.cpf, noiva.nome, noiva.descricao FROM noiva WHERE noiva.cpf == (?)`,[noiva.cpf])
    return retorno as Noiva[]
}

const updateNoiva = async (noiva: Noiva,cpf_antigo: String) => {
    await dbQuery(`UPDATE noiva SET cpf = (?), nome = (?), descricao = (?) WHERE cpf == (?)`,[noiva.cpf,noiva.nome,noiva.descricao,cpf_antigo])
}


export const noivaModel = {
    insertNoiva,
    deleteNoiva,
    selectNoiva,
    updateNoiva
}