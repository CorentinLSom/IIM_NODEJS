import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/bcrypt.js";

class UsersController {
    async getMyProfile(req, res) {
        const user = req.user;
        return res.status(200).send(user);
    }

    async index(req, res) {
        const users = await prisma.user.findMany();
        return res.status(200).send(users);
    };

    async store(req, res) {
        try {
            const body = req.body;

            const existingUser = await prisma.user.findFirst({
                where: {
                    email: body.email
                },
            });

            if (existingUser === null) {
                const user = await prisma.user.create({
                    data:  {
                        name: body.name,
                        email: body.email,
                        password: await hashPassword(body.password),
                    },
                });
                return res.status(201).send(user);
            }

            return res.status(409).send("User already exists");
        }catch(err) {
            return res.status(500).send(err.message)
        }
    };

    async show(req, res) {
        try {
            const id = req.params.id;

            const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id),
                },
            });
    
            if (user === null) {
                return res.status(404).send("User not found");
            }
    
            return res.status(200).send(user);
        }catch(err) {
            return res.status(500).send(err.message);
        }
    };

    async update(req, res) {
        try{
            const id = req.params.id;
            const body = req.body;
        
            let user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id),
                },
            });
    
            if (user === null) {
                return res.status(404).send("User not found");
            }
        
            user = await prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: body,
            });
        
            return res.status(200).send(user);
        }catch(err) {
            return res.status(500).send(err.message);
        }
    };

    async destroy(req, res) {
        try {
            const id = req.params.id;
            let user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id),
                },
            });
            
            if(user === null) {
                return res.status(404).send("User not found");
            }

            await prisma.user.delete({
                where: {
                    id: parseInt(id),
                },
            });
        
            return res.status(204).send();
        }catch (err) {
            return res.status(500).send(err.message);
        }
    };
};

// /users en GET = liste d'utilisateurs
// /users en POST = ajouter un utilisateur
// /users/:id en GET = afficher un utilisateur
// /users/:id en PUT = modifier un utilisateur
// /users/:id en DELETE = supprimer un utilisateur

export default new UsersController();