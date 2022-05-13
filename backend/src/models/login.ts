import { dbQuery } from "../services/connection"

export type Login ={
    login: String,
    senha: String
}

const verifica = async (login: Login) =>{
    await dbQuery(`SELECT user.login, user.senha FROM user WHERE user.login == (?) AND user.senha == (?)`,[login.login,login.senha]);
}

const cadastra = async (login: Login) => {
    await dbQuery(`INSERT INTO user (login,senha) VALUES(?,?)`,[login.login,login.senha])
}

export const loginModel = {
    verifica,
    cadastra
}