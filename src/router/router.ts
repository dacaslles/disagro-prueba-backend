import express from "express";
import EventController from "../controllers/EventController";
import ComercialItemController from "../controllers/ComercialItemController";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import AuthenticationController from "../controllers/AuthenticationController";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "El servidor se encuentra disponible." });
});

// Login
router.post("/auth/login", AuthenticationController.login);

// Eventos
router.get("/event/:event_id", authenticationMiddleware, EventController.getEvent);
router.get("/events", authenticationMiddleware, EventController.getEvents);
router.get("/events/promotions/:event_id", authenticationMiddleware, EventController.getEventPromotions);
router.post("/events/register", authenticationMiddleware, EventController.registerToEvent);

// Items comerciales
router.get("/comercialItems", authenticationMiddleware, ComercialItemController.getComercialItems);

export default router;