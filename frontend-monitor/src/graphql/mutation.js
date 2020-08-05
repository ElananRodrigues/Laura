const User = (name, email, password) => {
  return `
    mutation{
        createUser(input:{
          nome: "${name}"
          email: "${email}"
          password: "${password}"
        }) {
          id
          nome
          email
        }
      }`
}

const Paciente = (protuario, nome, nivel, atendimento, data) => {
  return `
    mutation{
      createPaciente(input:{ 
        protuario: "123",
        nome: "Manuel",
        nivel: "vermelho",
        atendimento: "realizado",
        data: "04/08/2020 18:38"
      }){
        protuario
        nome
        nivel
        atendimento
        data
      }
    }`
}

export { User }
