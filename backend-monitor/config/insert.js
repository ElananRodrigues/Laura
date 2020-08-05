const knexfile = require('../knexfile')
const knex = require('knex')(knexfile)
module.exports = knex

knex('users').insert({
    user: "Laura Robo",
    email: "dev@laura.com",
    password: "$2a$12$5Kq2DIRh75hQaVPCx.IWi.17s1vrg81AE.GG3Bnsr7Lby3XVaYYfC"
}).then(data => console.log(data))

knex('pacientes').insert({
    prontuario: "678",
    nome: "Francisco Gaspar",
    nivel: "vermelho",
    atendimento: "Pendente",
    data: "12/06/19 - 16:17",
    cabeca: "5(imensa)",
    braco: "4(moderada)",
    perna: "5(imensa)",
    tosse: "1(fraca)",
    fraqueza: "5(Alta)"
}).then(data => console.log(data))

knex('pacientes').insert({
    prontuario: "324",
    nome: "Joao Rebolsa",
    nivel: "amarelo",
    atendimento: "Pendente",
    data: "12/06/19 - 16:17",
    cabeca: "5(imensa)",
    braco: "4(moderada)",
    perna: "5(imensa)",
    tosse: "1(fraca)",
    fraqueza: "5(Alta)"
}).then(data => console.log(data))

knex('pacientes').insert({
    prontuario: "321",
    nome: "Mario Barbosa",
    nivel: "vermelho",
    atendimento: "Realizado",
    data: "12/06/19 - 16:17",
    cabeca: "5(imensa)",
    braco: "4(moderada)",
    perna: "5(imensa)",
    tosse: "1(fraca)",
    fraqueza: "5(Alta)"
}).then(data => console.log(data))