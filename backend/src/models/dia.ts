import { dbQuery } from "../services/connection"

export type Dia = {
    dia: BigInt,
    mes: BigInt,
    ano: BigInt,
    cpf: String
}

const selectDia = async  (dia: Dia) => {
    const retorno = await dbQuery(`SELECT * FROM dia, noiva WHERE dia.dia == (?) AND dia.mes == (?) AND dia.ano == (?) AND dia.cpf == noiva.cpf`,[dia.dia,dia.mes,dia.ano]);
    return retorno as Dia[];
}

const insertDia = async (dia: Dia) => {
    await dbQuery(`INSERT INTO dia (dia,mes,ano,cpf) VALUES (?,?,?,?)`,[dia.dia,dia.mes,dia.ano,dia.cpf]);
}

const deleteDia = async (dia: Dia) => {
    await dbQuery(`DELETE FROM dia WHERE dia.dia = (?) AND dia.mes = (?) AND dia.ano = (?) AND dia.cpf = (?)`,[dia.dia,dia.mes,dia.ano,dia.cpf]);
}

const showDia = async () => {
    const retorno = await dbQuery(`SELECT * FROM dia`)
    return retorno;
}


export const diaModel = {
    selectDia,
    insertDia,
    deleteDia,
    showDia
}
