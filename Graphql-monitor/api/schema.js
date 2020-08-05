const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const usersAttribs = `
    id: ID
    user: String!
    email: String!
    password: String!
`
const sintomasAttribs = `
    cabeca: String!
    braco: String!
    perna: String!
    tosse: String!
    fraqueza: String!
`
const pacientesAttribs = `
    id: ID
    prontuario: String!
    nome: String!
    nivel: String!
    atendimento: String!
    data: String!
`

const typeDefs = `
    type User {
       ${usersAttribs}
    }
    type Sintomas {
        ${sintomasAttribs}
    }
    type Paciente {
        ${pacientesAttribs}
        sintomas: [Sintomas!]
     }
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input SintomasInput {
       ${sintomasAttribs}
    }
    input PacienteInput {
        ${pacientesAttribs}
     }
    input UserInput {
        ${usersAttribs}
    }

    type Query {
        getUser(id: ID!): User
        getUsers: [User!]!
        getPaciente(id: ID!): Paciente
        getPacientes: [Paciente!]!
        login(email: String!, password: String!): AuthData!
    }
    type Mutation {
        createUser(input: UserInput): User
        createPaciente(pacientes: PacienteInput,sintomas:SintomasInput): Paciente
    }
`

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});