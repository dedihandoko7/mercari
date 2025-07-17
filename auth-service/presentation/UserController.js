const AuthService = require('../application/UserService');

async function register(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({message:'Email dan password wajib di isi!'});
        }            
        const user = await AuthService.register({email, password});
        res.status(201).json({message:'Registrasi Sukses', user: {id: user.id, email: user.email}});
        
    } catch (err) {
        res.status(400).json({message:err.message});
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({message:'Email dan password wajib di isi!'});
        }            
        const {token, user} = await AuthService.login({email, password});
        res.status(200).json({message:'Login Sukses', token, user: {id: user.id, email: user.email}});
        
    } catch (err) {
        res.status(400).json({message:err.message});
    }
}

module.exports = {register, login};