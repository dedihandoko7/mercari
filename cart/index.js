require ('dotenv').config();
const express = require('express');
const cors = require('cors');   
const sequelize = require('./infrastructure/db');
const initCartModels = require('./infrastructure/CartModel');
const cartRouter = require('./presentation/CartRouter');
const jwtMiddleware = require('../shared/jwtMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

initCartModels(sequelize);

sequelize.sync()
    .then(()=>{
        console.log('Cart DB Synced!')
    })
    .catch((err)=>{
        console.error('Cart DB sync error:',err)
    });

app.use('/cart', jwtMiddleware, cartRouter);

app.get('/', (req, res) =>{
    res.send('Mencari Cart service API Running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Cart service running on port ${PORT}`)
});