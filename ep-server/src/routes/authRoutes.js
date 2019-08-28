const express = require('express');
const User_Model = require('../database/models/user')
const List_Model = require('../database/models/list')
const jwt = require('jsonwebtoken')


const router = express.Router();
/*  requests comes from client API*/
router.post('/signup', async (req, res) => {
    const { firmName, username, password, rep } = req.body;
    try {
        if (!firmName || !username || !password || !rep) {
            return res.status(422).send({ error: 'Must provide input data.' })
        }
        const role = await List_Model.findOne({ name: 'Customer' });
        const status = await List_Model.findOne({ name: 'Active' });
        const user = new User_Model({
            firmName,
            username,
            password,
            role: role,
            createdBy: rep,
            status: status
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        // console.log('authUser:',user,token);
        res.send({ authUser: { token, username, role: role.name } });
    } catch (err) {
        return res.status(422).send({ error: 'User already exist' })
    }
});


router.post('/signin', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(422).send({ error: 'Must provide username and password' })
    }
    // const user = await authUser(username); // TO DO :fix this
    const user = await User_Model.findOne({ username });
    // console.log('authUser:',user);

    if (!user) {
        return res.status(422).send({ error: 'Invalid username or password' })
    }
    // password comparison
    try {
        const roleData = await List_Model.findOne({ _id: user.role });
        const role = roleData.name
        await user.comparePassword(password);
        // generate jwt send back to user
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ authUser: { token, username, role } });

    } catch (err) {
        return res.status(422).send({ error: 'Invalid username or password' })
    }


})



module.exports = router;










