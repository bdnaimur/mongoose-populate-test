const express = require('express');
const path = require('path');
require('./db/mongoose')
require('dotenv').config();
const cors = require('cors');

const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const app = express();
const router = require('./routers/router')
const apiYamlFile = YAML.load('api.yaml');

app.get('/', (res, req)=>{
    req.send('<h3 style="margin-top: 50px; text-align: center">Goto <br/> <a href="/api-docs">API DOCS</a><br/>for API documentation</h3>')
})

app.use(cors());
// app.use(compression());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiYamlFile));
app.use('/v1', router)
app.listen(4500, ()=>{
    console.log("app is listiening to"+ " "+ 4500 );
})
