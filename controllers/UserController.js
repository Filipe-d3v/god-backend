const User = require('../models/User')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-users-tokens')
const getToken = require('../helpers/get-token')

module.exports = class UserController {
    static async create(req, res) {
        const { username, name, surname, email, stack,
            password, confirm_pass } = req.body

        const image = '';

        if (!name) {
            res.status(400).json({ message: 'Informe o nome!' })
            return
        }
        if (!surname) {
            res.status(400).json({ message: 'Informe o sobrenome!' })
            return
        }
        if (!email) {
            res.status(400).json({ message: 'Informe o e-mail!' })
            return
        }
        if (!stack) {
            res.status(422).json({ message: 'Porfavor, informe sua principal stack' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }
        if (!confirm_pass) {
            res.status(422).json({ message: 'Confirme a senha por favor!' })
            return
        }

        if (password !== confirm_pass) {
            res.status(422).json({ message: 'As senhas são diferentes. Tente novamente!' })
        }

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: 'O e-mail já está cadastrado!' })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            username: username,
            surname: surname,
            email: email,
            stack: stack,
            password: passHash,
            image: image,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'Informe o E-mail!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'Informe a senha!' })
            return
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({ message: 'E-mail incorreto!' })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha inválida!' })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = '';
        } else {
            currentUser = null
        }
        res.status(200).send(currentUser)
    }


    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json({ user })

    }

    static async update(req, res) {
        const id = req.params.id;

        const token = getToken(req);
        const decoded = jwt.verify(token, 'secret');

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado!' });
            return;
        }

        const { username, name, surname, email, gender, stack, birth, password, confirm_pass, github, linkedin, instagram } = req.body;

        user.password = undefined;

        if (req.file) {
            user.image = req.file.filename;
        }
        user.name = name;
        user.surname = surname;

        const userExists = await User.findOne({ email: email });

        if (user.email !== email && userExists) {
            res.status(422).json({ message: 'Este e-mail já está em uso!' });
            return;
        }

        user.email = email;
        user.birth = birth;
        user.gender = gender;
        user.github = github;
        user.linkedin = linkedin;
        user.username = username;
        user.stack = stack;
        user.instagram = instagram;

        if (password !== confirm_pass) {
            res.status(422).json({ message: 'As senhas não são iguais!' });
            return;
        } else if (password === confirm_pass && password != null) {
            const salt = await bcrypt.genSalt(12);
            const passHash = await bcrypt.hash(password, salt);

            user.password = passHash;
        }

        try {
            await User.updateOne(
                { _id: user._id },
                { $set: user },
                { new: true }
            );

            res.status(200).json({ message: 'Usuário atualizado!' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    static async getAll(req, res) {
        const users = await User.find()

        res.status(200).json({ users: users })
    }
}