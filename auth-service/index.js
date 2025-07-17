const express = require('express'); 
const sequelize = require('./infrastructure/db');
const initUserModels = require('./infrastructure/UserModel');
const authRouter = require('./presentation/UserRouter');

const app = express();
app.use(express.json());
initUserModels(sequelize);

sequelize.sync()
    .then(()=>{
        console.log('DB Synced!')
    })
    .catch((err)=>{
        console.error('DB sync error:',err)
    });

app.use('/auth', authRouter);

app.get('/', (req, res) =>{
    res.send('Auth service is Running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Auth listening running on port ${PORT}`)
});