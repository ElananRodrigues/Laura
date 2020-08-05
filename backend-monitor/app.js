const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const schema = require('./api/schema')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { isAuth: (req.get('Authorization')) ? req.get('Authorization') : false }
})))

app.listen(4000, () => console.log(
    {
        success: true,
        host: "http://localhost:4000/graphql",
        message: 'Servidor Online !!!',
        data: new Date()
    }
))