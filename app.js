const express = require('express');
const mongoose = require('mongoose');
//importing route
const userRoute = require('./route/user');
const SwaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
    definition: {
        info: {
            title: 'User API',
            description: 'Users API Data '

        },
        servers: [
            { url: "http://localhost:3000" }
        ]


    },
    apis: ['./route/user.js'],
};

const swaggerJSDoc = SwaggerJSDoc(swaggerOptions); // TO ENTER OUR CREATED ABOVE CONFIG. INTO THE JSDOCS MODULE
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc)); // TO USE THIS ENDPOINT FOR SERVING THESE DOCS


const port = 3000 || process.env.port;

app.use(express.json()); // to parse the json req body
app.use('/user', userRoute);

//connecting database to express via mongoose
mongoose.connect('mongodb://localhost:27017/user', () => {
    console.log("connected to db...");
});

app.listen(port, () => {
    console.log("listening");
});