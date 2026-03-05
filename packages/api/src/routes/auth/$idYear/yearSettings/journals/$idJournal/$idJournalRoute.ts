import { deleteOneJournalRoute } from "./deleteOneJournal.js"
import { readOneJournalRoute } from "./readOneJournal.js"
import { updateOneJournalRoute } from "./updateOneJournal.js"

export const $idJournalRoutes = [deleteOneJournalRoute, readOneJournalRoute, updateOneJournalRoute]
