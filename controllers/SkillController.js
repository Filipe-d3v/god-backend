const Skill = require('../models/Skill');
const Project = require('../models/Project');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class SkillController {
    static async create(req, res) {
        const { name, type } = req.body;

        if (!req.file) {
            res.status(422).json({ message: 'Escola um ícone!' });
            return
        }

        const icon = req.file.filename

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return
        }
        if (!type) {
            res.status(422).json({ message: 'Informe o tipo!' });
            return
        }

        const skill = new Skill({
            name: name,
            type: type,
            icon: icon
        });

        try {
            const newSkill = await skill.save();
            res.status(201).json({ message: 'Skill adicionada!', newSkill });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getAll(req, res) {
        const skills = await Skill.find();

        res.status(200).json({ skills: skills, });
    }

    static async getById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(200).json({ message: 'ID inválido!' });
            return
        }

        const skill = await Skill.findOne({ _id: id });

        if (!skill) {
            res.status(404).json({ message: 'Skill não encontrada!' });
        }

        res.status(200).json({ skill: skill, });
    }

    static async update(req, res) {
        const id = req.params.id;

        const { name, level, type } = req.body;

        const skill = await Skill.findOne({ _id: id });

        const updatedData = {}


        if (!skill) {
            res.status(422).json({ message: 'Skill não encontrada!' });
            return
        }

        if (req.file) {
            updatedData.icon = req.file.filename;
        }

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return
        }
        updatedData.name = name;


        if (!level) {
            res.status(422).json({ message: 'O nível é obrigatório!' });
            return
        }
        updatedData.level = level;

        if (!type) {
            res.status(422).json({ message: 'O tipo é obrigatório!' });
            return
        }
        updatedData.type = type

        await Skill.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: 'Skill Atualizada!', updatedData });
    }

    static async delete(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(200).json({ message: 'ID inválido!' });
            return
        }

        const skill = await Skill.findOne({ _id: id });

        if (!skill) {
            res.status(404).json({ message: 'Skill não encontrada!' });
            return
        }

        await Skill.findByIdAndDelete(id);

        res.status(200).json({ message: 'Sill removida!' });
    }
}

