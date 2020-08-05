const db = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { isAuth } = require('../middleware/is-auth')

module.exports = {
    Query: {
        getUser: async (_, input, context) => {
            isAuth(context)
            const id = input.id
            return await db('users').where({ id }).first()
        },
        getUsers: async (_, input, context) => {
            isAuth(context)
            return await db('users')
        },
        getPaciente: async (_, input, context) => {
            isAuth(context)
            const id = input.id
            const paciente = await db('pacientes').where({ id }).first()
            if (paciente) {
                return await {
                    id: paciente.id,
                    prontuario: paciente.prontuario,
                    nome: paciente.nome,
                    nivel: paciente.nivel,
                    atendimento: paciente.atendimento,
                    data: paciente.data,
                    sintomas: [{
                        cabeca: paciente.cabeca,
                        braco: paciente.braco,
                        perna: paciente.perna,
                        tosse: paciente.tosse,
                        fraqueza: paciente.fraqueza
                    }]
                }
            } else {
                throw new Error('Usuario nao existe!');
            }
        },
        getPacientes: async (_, input, context) => {
            isAuth(context)
            const pacientes = await db('pacientes')

            if (pacientes) {
                const res = pacientes.map((paciente) => {
                    return {
                        id: paciente.id,
                        prontuario: paciente.prontuario,
                        nome: paciente.nome,
                        nivel: paciente.nivel,
                        atendimento: paciente.atendimento,
                        data: paciente.data,
                        sintomas: [{
                            cabeca: paciente.cabeca,
                            braco: paciente.braco,
                            perna: paciente.perna,
                            tosse: paciente.tosse,
                            fraqueza: paciente.fraqueza
                        }]
                    }
                })
                return await res
            } else {
                throw new Error('Sem usuario cadastrado!');
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await db('users').where({ email }).first()
                if (!user) {
                    throw new Error('Este usuário nao existe!');
                }
                const isEqual = await bcrypt.compare(password, user.password);
                if (!isEqual) {
                    throw new Error('Sua senha esta incorreta!');
                }
                const token = jwt.sign({ userId: user.id, email: user.email }, 'LAURASYSPACIENTE', { expiresIn: '10h' })

                return { userId: user.id, token: token, tokenExpiration: 1 }

            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        createUser: async (_, { input }, context) => {
            isAuth(context)
            const hashedPassword = await bcrypt.hash(input.password, 12)
            try {
                const email = input.email
                const user = await db('users').where({ email }).first()
                if (user) {
                    throw new Error('Este usuário ja existe!');
                }

                const result = await db('users').insert({
                    user: input.user,
                    email: input.email,
                    password: hashedPassword
                }, ['id'])
                const id = result[0]
                return await db('users').where(id).first()
            } catch (err) {
                throw err;
            }
        },
        createPaciente: async (_, input, context) => {
            isAuth(context)
            const getPacientes = await input.pacientes
            const getSintomas = await input.sintomas

            try {
                const result = await db('pacientes').insert({
                    prontuario: getPacientes.prontuario,
                    nome: getPacientes.nome,
                    nivel: getPacientes.nivel,
                    atendimento: getPacientes.atendimento,
                    data: getPacientes.data,
                    cabeca: getSintomas.cabeca,
                    braco: getSintomas.braco,
                    perna: getSintomas.perna,
                    tosse: getSintomas.tosse,
                    fraqueza: getSintomas.fraqueza
                }, ['id'])

                const id = result[0]
                const paciente = await db('pacientes').where(id).first()

                return {
                    id: paciente.id,
                    prontuario: paciente.prontuario,
                    nome: paciente.nome,
                    nivel: paciente.nivel,
                    atendimento: paciente.atendimento,
                    data: paciente.data,
                    sintomas: [{
                        cabeca: paciente.cabeca,
                        braco: paciente.braco,
                        perna: paciente.perna,
                        tosse: paciente.tosse,
                        fraqueza: paciente.fraqueza
                    }]
                }

            } catch (err) {
                throw err;
            }
        }
    }
}