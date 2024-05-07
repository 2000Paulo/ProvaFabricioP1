const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User' );

const app = express();
app.use(cors());
app.use(router);

//Efetuando a conexão com o banco
mongoose.connect("mongodb://localhost:27017/")
  .then(() => {console.log("Banco de dados conectado!");
}).catch(() => {
    console.error("Erro ao conectar ao banco de dados!");
});
app.listen(3000, () => console.log("Servidor escutando na porta 3000!"));
//Efetuado a conexão...


router.get("/users", async (req, res) => {
  try {
      const email = req.query.email;
      const senha = req.query.senha;

      const usuarioEncontrado = await User.findOne({email }); // Encontra usuário pelo email
      if (!usuarioEncontrado) {
          // console.log(email);
          return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(usuarioEncontrado);
  } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ message: "Erro interno do servidor. Tente novamente mais tarde." });
  }
});



  router.post("/users", async (req, res) => {
    try {
        const email = req.body.email;
        const senha = req.body.email; // Create a new User instance
        const newuser = new User(req.body); // Criar novo objeto User a partir do corpo da requisição
        await newuser.save(); // Salvar o novo usuário no MongoDB
        res.status(201).json({ message: 'Usuário criado com sucesso!' }); // Retornar mensagem de sucesso
      } catch (error) {
        res.status(400).json({ message: error.message }); // Lidar com erros de validação
      }
  });
  
  // Obter todos os usuários (GET /users) (Consider security implications before public retrieval)



//fim do trecho de request response
module.exports = router;

