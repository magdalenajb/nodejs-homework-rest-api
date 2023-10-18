const userService = require("../service/usersService");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

require("dotenv").config();
const secret = process.env.SECRET;

const listUsers = async (req, res) => {
    try {
        const result = await userService.listUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signUp = async (req, res, next) => {
    const { password, email, subscription, token } = req.body
    const user = await userService.userSignUp({ email });

    if (user) {
        return res.status(409).json({
            status: 'Error',
            message: 'Email is already in use',
            data: 'Conflict',
        });
    }

    try {
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        await userService.userSignUp({ 
            password: hashPassword, 
            email, 
            subscription, 
            token 
        });
        res.status(201).json({
            status: 'success',
            data: {
                    user: {
                        email,
                        subscription
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userService.userLogIn({ email });

    if (!user || user.validPassword(password)) {
        return res.status(400).json({
            status: 'Error',
            message: 'Incorrect email or password',
            data: 'Bad request',
        });
    }

    try {
        const payload = {
            id: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, secret, {
            expiresIn: '1h',
        });

        await userService.updateStatusUser(
            { _id: user._id },
            { token }
        );

        res.status(200).json({
            status: 'Success',
            data: {
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const logOut = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await userService.updateStatusUser(
            _id, { token: null }
        );
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        res.status(200).json({
            status: 'Success',
            data: {
                email: email,
                subscription: subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};


const updateStatusUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { subscription } = req.body;
        const updatedUser = await userService.updateSubscriptionUser(
                _id, 
                subscription,
            );

        if (!updatedUser) {
            return res.status(404).json({ 
                error: 'Not found' 
            });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listUsers,
    signUp,
    logIn,
    logOut,
    getCurrent,
    updateStatusUser,
};