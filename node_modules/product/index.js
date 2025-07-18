const express = require('express');
const cors = require('cors');


const sequelize = require('./infrastructure/db');
const initProductModel = require('./infrastructure/ProductModel');
const productRouter = require('./presentation/ProductRouter');

const Product = initProductModel(sequelize);

sequelize.sync()
.then(()=>{
    console.log('Database synced!')
})
.catch(err =>{
    console.error('Database sync error!',err)
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.get('/', (req, res) =>{
    res.send('Mencari Product service API Running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Product service listening on port ${PORT}`)
});