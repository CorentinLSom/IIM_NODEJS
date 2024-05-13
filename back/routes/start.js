import express from "express";
import UsersController from "../controllers/UsersController.js";
import AuthentificationController from "../controllers/AuthentificationController.js";
import UserCardController from "../controllers/UserCardController.js";
import AuthentificationMiddleware from "../middlewares/AuthentificationMiddleware.js";
import { getIot, house } from "../controllers/IotController.js"

const router = express.Router();

router.get("/users", UsersController.index); // LISTE DES UTILISATEURS
router.post("/users", UsersController.store); // AJOUTER UN UTILISATEUR
router.get("/users/:id", UsersController.show); // AFFICHER UN UTILISATEUR
router.put("/users/:id", UsersController.update); // MODIFIER UN UTILISATEUR
router.delete("/users/:id", UsersController.destroy); // SUPPRIMER UN UTILISATEUR
router.get("/getMyProfile", AuthentificationMiddleware.authentification, UsersController.getMyProfile);
router.post("/login", AuthentificationController.login);
router.get("/iot/iot", getIot);
router.post("/iot/house", house);
router.get("/likedCards", AuthentificationMiddleware.authentification, UserCardController.likedCards);
router.get("/ownedCards", AuthentificationMiddleware.authentification, UserCardController.ownedCards);
router.post("/likeCard/:id", AuthentificationMiddleware.authentification, UserCardController.likeCard);
router.post("/unlikeCard/:id", AuthentificationMiddleware.authentification, UserCardController.unlikeCard);
router.post("/addCard/:id", AuthentificationMiddleware.authentification, UserCardController.addCard);
router.post("/removeCard/:id", AuthentificationMiddleware.authentification, UserCardController.removeCard);

export default router;