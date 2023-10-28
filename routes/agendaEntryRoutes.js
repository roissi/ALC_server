import express from "express";
import * as agendaEntryController from "../controllers/agendaEntryController.js";
import * as suggestionToAgendaController from "../controllers/suggestionToAgendaController.js";

const router = express.Router();

router.get("/", agendaEntryController.getAgendaEntries);
router.post("/", agendaEntryController.createAgendaEntry);
router.put("/:id", agendaEntryController.updateAgendaEntry);
router.delete("/:id", agendaEntryController.deleteAgendaEntry);
router.post(
  "/add-suggestion",
  suggestionToAgendaController.addSuggestionToAgenda,
);

export default router;
