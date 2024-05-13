import prisma from "../config/prisma.js";

class UserCardController {

    async likedCards(req, res) {
        const user = req.user;
        const cards = await prisma.userCards.findMany({
            where: {
                user_id: user.id,
                is_favorite: true
            },
        });
        return res.status(200).send(cards);
    };

    async ownedCards(req, res) {
        const user = req.user;
        const cards = await prisma.userCards.findMany({
            where: {
                user_id: user.id,
                my_card: true
            },
        });
        return res.status(200).send(cards);
    };

    async likeCard(req, res) {
        try{
            const user = req.user;
            const cardId = req.params.id;
            await prisma.userCards.upsert({
                where: {
                    user_id_card_id: {
                        user_id: user.id,
                        card_id: parseInt(cardId)
                    },
                },
                update: {
                    is_favorite: true
                },
                create: {
                    is_favorite: true,
                    card_id: parseInt(cardId),
                    user_id: user.id
                },
            });
            return res.status(200).send(cardId);
        }catch(err) {
            return res.status(500).send(err.message);
        }
    };

    async unlikeCard(req, res) {
        try{
            const user = req.user;
            const cardId = req.params.id;
            await prisma.userCards.upsert({
                where: {
                    user_id_card_id: {
                        user_id: user.id,
                        card_id: parseInt(cardId)
                    },
                },
                update: {
                    is_favorite: false
                },
                create: {
                    is_favorite: false,
                    card_id: parseInt(cardId),
                    user_id: user.id
                },
            });
            return res.status(200).send(cardId);
        }catch(err) {
            return res.status(500).send(err.message);
        }
    };

    async addCard(req, res) {
        try{
            const user = req.user;
            const cardId = req.params.id;
            await prisma.userCards.upsert({
                where: {
                    user_id_card_id: {
                        user_id: user.id,
                        card_id: parseInt(cardId)
                    },
                },
                update: {
                    my_card: true
                },
                create: {
                    my_card: true,
                    card_id: parseInt(cardId),
                    user_id: user.id
                },
            });
            return res.status(200).send(cardId);
        }catch(err) {
            return res.status(500).send(err.message);
        }
    };

    async removeCard(req, res) {
        try{
            const user = req.user;
            const cardId = req.params.id;
            await prisma.userCards.upsert({
                where: {
                    user_id_card_id: {
                        user_id: user.id,
                        card_id: parseInt(cardId)
                    },
                },
                update: {
                    my_card: false
                },
                create: {
                    my_card: false,
                    card_id: parseInt(cardId),
                    user_id: user.id
                },
            });
            return res.status(200).send(cardId);
        }catch(err) {
            return res.status(500).send(err.message);
        }
    };
};

export default new UserCardController();