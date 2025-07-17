require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');   

const app = express();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const CART_SERVICE_URL = process.env.CART_SERVICE_URL;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const PORT = process.env.PORT || 8080;

//middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


async function forwardRequest(serviceUrl, req, customPath = '') {
    const targetUrl = serviceUrl + (customPath ? customPath : req.originalUrl.replace(/^\/api\/[a-z]+/, ''));
    const headers ={
        'Content-Type' : 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization}),
    };

    const fetchOptions ={
        method: req.method,
        headers,
    };

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)){
        fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')){
        data = await response.json();
    }else{
        data = await response.text();
    }

    return {status: response.status, data};
}

app.get('/', (req, res) =>{
    res.json({message:'Gateway service running!'});
});

/*
app.get('/api/products', async (req, res, next) =>{
    try {
        const response = await fetch(`${PRODUCT_SERVICE_URL}/products`);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        next(error);
    }
});
*/

/*
app.get('/api/login', async (req, res, next) =>{
    try {
        const result = await forwardRequest(AUTH_SERVICE_URL, req , '/auth/login');
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
});

*/

/*
app.post('/api/cart', async (req, res, next) =>{
    try {
        //const result = await forwardRequest(AUTH_SERVICE_URL, req , '/auth/register');
        //res.status(result.status).json(result.data);

        const path = req.originalUrl.replace('/cart', '');
        const result = await forwardRequest(CART_SERVICE_URL, req, path);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
});
*/

app.use('/api/products', async (req, res, next) =>{
    try {
        const path = req.originalUrl.replace('/api/', '/');
        const result = await forwardRequest(PRODUCT_SERVICE_URL,req, path);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
});

app.use('/api/cart', async (req, res, next) =>{
    try {
        const path = req.originalUrl.replace('/api/', '/');
        const result = await forwardRequest(CART_SERVICE_URL, req, path);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
});

app.post('/api/register', async (req, res, next) =>{
    try {
        const result = await forwardRequest(AUTH_SERVICE_URL, req , '/auth/register');
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
});

app.post('/api/login', async (req, res, next) =>{
     try {
         const response = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
             method: 'POST',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify(req.body)
         });
         const data = await response.json();
         res.status(response.status).json(data);
     } catch (error) {
         next(error);
     }
 });

app.use((err, req, res, next) =>{
    console.error('Gateway error:', err);
    res.status(503).json({error:'Service Unavailable. Please try again later.'})
});

app.listen(PORT, ()=>{
    console.log(`Gateway listening at http://localhost:${PORT}`)
});
