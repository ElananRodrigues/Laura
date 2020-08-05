const Login = (email, password) => {
  return `
    query{
        login(email:"${email}",password:"${password}"){
        userId
        token
        tokenExpiration
        }
    }`
}

const Pacientes = () => {
  return `
  query{
    getPacientes{
      id
      prontuario
      nome
      nivel
      atendimento
      data
      sintomas{
        cabeca
        braco
        perna
        tosse
        fraqueza
      }
    }
  }`
}

const Paciente = (id) => {
  return `
  query{
    getPacientes{
      id
      prontuario
      nome
      nivel
      atendimento
      data
      sintomas{
        cabeca
        braco
        perna
        tosse
        fraqueza
      }
    }
  }`
}

export { Login, Pacientes, Paciente }