const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../routes/verifyToken');

//REGISTER
router.post('/register', async (req, res) => {
    //VALIDATE USER
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already in the database
    const nameExist = await User.findOne({ name: req.body.name });
    if(nameExist) return res.status(400).send('Usuario ya existe');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        name: req.body.name,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req,res) => {
    //VALIDATE USER
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already in the database
    const user = await User.findOne({ name: req.body.name });
    if(!user) return res.status(400).send('Usuario no existe');
    //Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Contraseña incorrecta');

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
    res.header('auth-token', token).send(token);

    //res.send('Login exitoso!');
});