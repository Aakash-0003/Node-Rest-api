const express = require('express');
const User = require('../db/models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { auth, secret } = require('../middleware/app');
//Routes

/**
 * @swagger
 * /user/viewData:
 *      get:
 *         summary: use to get all the records
 *         responses:
 *              201:
 *                description: 'user fetched successfully'
 *                          
 * */
router.get('/viewData', auth, async(req, res) => {
    try {
        const userData = await (User.find());
        res.json(userData);
    } catch (err) {
        res.json({ message: err })
    }

})


/**
 * @swagger
 * /user/search/{userName}:
 *      get:
 *         summary: use to get data by searching for a specific name
 *         requestBody:
 *                content:
 *                  application/json:
 *                      schema:
 *         parameters:
 *              - in: path
 *                name: userName
 *                schema: 
 *                  type: string
 *                required: true
 *                description: username 
 *         responses:
 *              201:
 *                description: 'user fetched successfully'
 *                          
 * */
router.get('/search/:userName', async(req, res) => {
    try {
        // console.log(req.params.userName);
        const name = await User.find({ name: req.params.userName });
        res.json(name);
    } catch (err) {
        res.json({ message: err });
    }
})

/**
 * @swagger
 * /user/:
 *      post:
 *         summary: use to post data on mongoDB
 *         consumes:
 *              - application/json
 *         parameters:
 *              - in: body
 *                name: user
 *                description: user to create
 *                schema: 
 *                  type: object
 *                properties:
 *                  name:
 *                      type: string
 *                  age:
 *                      type:number
 *                  location:
 *                      type:string
 *                  roll:
 *                      type:number                   
 *         responses:
 *              201:
 *                description: 'user fetched successfully'
 *                          
 * */
router.post('/', (req, res) => {
    const user = User({
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        roll: req.body.roll
    })
    const token = jwt.sign(req.body.name, secret);
    console.log(token);

    user.save() //save the above document/record  to the databases
        .then((data) => {
            res.json(data); //sends the json response to client
        }).catch(err => {
            res.json({ message: err })
        })

})

/**
 * @swagger
 * /user/delete/{userName}:
 *      delete:
 *         summary: use to delete data by searching for a specific name
 *         requestBody:
 *                content:
 *                  application/json:
 *                      schema:
 *         parameters:
 *              - in: path
 *                name: userName
 *                schema: 
 *                  type: string
 *                required: true
 *                description: username 
 *         responses:
 *              201:
 *                description: 'user fetched successfully'
 *                          
 * */
router.delete('/delete/:userName', async(req, res) => {
    try {
        const removedName = await User.deleteOne({ name: req.params.userName });
        res.json(removedName);
    } catch (err) {
        res.json({ message: err });
    }
})

/**
 * @swagger
 * /user/update/{userName}:
 *      patch:
 *         summary: use to update data by searching for a specific name
 *         requestBody:
 *                content:
 *                  application/json:
 *                      schema:
 *         parameters:
 *              - in: path
 *                name: userName
 *                schema: 
 *                  type: string
 *                required: true
 *                description: username 
 *              - in: body
 *                name: user
 *                description: user to create
 *                schema: 
 *                  type: object
 *                properties:
 *                  name:
 *                      type: string
 *                  age:
 *                      type:number
 *                  location:
 *                      type:string
 *                  roll:
 *                      type:number            
 *         responses:
 *              201:
 *                description: 'user fetched successfully'
 *                          
 * */
router.patch('/update/:userName', async(req, res) => {
    try {
        const updatedName = await User.updateOne({ name: req.params.userName }, { location: req.body.location });
        res.json(updatedName);
    } catch (err) {
        res.json({ message: err });
    }
})

router.post('/login', (req, res) => {

    const token = jwt.sign(req.body.name, secret);
    console.log(token);
    res.json(`SUCCESS ${token}`);

})

module.exports = router;