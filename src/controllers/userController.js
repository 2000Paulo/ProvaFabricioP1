const {User: UserModel} = require("../models/User");

const userController = {
getAllUsers: async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
},

createUser: async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
},

// exports.efetuaLogin = async(req, res) => {
//     const loginUser = new login(req.body);
//     try {
//         const users = await loginUser.findOne(email)
//     } catch (error){
//         res.status(400).json({ message: error.message })
//     }
// };



efetuaLogin: async (req, res) => {
    const user= req.body; // Extrair email e senha do corpo da requisição
    console.log(user);
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({msg: "Nenhum usuário encontrado!"});
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}
};

module.exports = userController;



