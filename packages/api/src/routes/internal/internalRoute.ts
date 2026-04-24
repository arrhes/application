import { apiFactory } from "../../utilities/apiFactory.js"
import { generateMonthlyInvoicesRoute } from "./generateMonthlyInvoices.js"

export const internalRoute = apiFactory.createApp().route("/", generateMonthlyInvoicesRoute)
