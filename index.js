// construir uma REST API

// para fazer import do express dar o comando no git: npm install express
import express from 'express'

import { StatusCodes } from 'http-status-codes'

// chamada da função express
const app = express()
// Porta que vai escutar as requisições e enviar as respostas
const PORT = process.env.PORT || 3000

// lista global de usuários
let users = [
  {
    id: 1,
    name: 'Rafael Ribeiro',
    age: 31
  },
  {
    id: 2,
    name: 'Gabriel Custódio',
    age: 27
  }
]

// criando um middleware, que todos nossos requests estão sendo enviados no formato json
app.use(express.json())

// primeiro parâmetro é a porta e a segunda é a função de callback, quando der certo a função ele vai escutar essa requisição.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

// criar uma rota / recurso que quer disponibilizar
app.get('/', (request, response) => {
  return response.send('<h1>Trabalhando com servidor express</h1>')
})

// Endpoint para pegar a lista de usuários (coleção)
app.get('/users', (request, response) => {
  return response.send(users)
})

// Endpoint para pegar um usuário específico (com base em um parâmetro de rota)
app.get('/users/:userId', (request, response) => {
  const userId = request.params.userId
  // find: encontra o primeiro elemento que retornar e atenda a condição
  const user = users.find(user => {
    return user.id === Number(userId)
  })
  return response.send(user)
})

// Endpoint para criar um usuário
app.post('/users', (request, response) => {
  // recebe o body como sendo um novo usuário
  const newUser = request.body

  // Pegar nossa lista e incluir o newUser
  users.push(newUser)
  return response.status(StatusCodes.CREATED).send(newUser)
})

// endpoint para alterar o usuário
app.put('/users/:userId', (request, response) => {
  // receber o id
  const userId = request.params.userId
  // receber o usuário atualizado
  const updatedUser = request.body

  // atualizar a lista de usuários
  users = users.map(user => {
    // Se o userId for igual ao user.id vai retornar o novo usuário.
    if (Number(userId) === user.id) {
      return updatedUser
    }

    // se não retorna o usuário atual
    return user
  })
  return response.send(updatedUser)
})

// Endpoint deleta usuário
app.delete('/users/:userId', (request, response) => {
  const userId = request.params.userId

  // filtrar os usuários que tiverem id diferente do id que esta sendo deletado
  users = users.filter(user => user.id !== Number(userId))

  return response.status(StatusCodes.NO_CONTENT).send()
})
