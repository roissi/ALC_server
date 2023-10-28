import express from "express";
import * as interestController from "../controllers/interestController.js";

const router = express.Router();

router.get("/", interestController.getInterests);
router.post("/", interestController.createInterest);
router.put("/:id", interestController.updateInterest);
router.delete("/:id", interestController.deleteInterest);

export default router;
