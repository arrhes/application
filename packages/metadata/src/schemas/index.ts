import { accountSchema, accountSchemaReturn } from "./account.js"
import { agentMessageSchema, agentMessageSchemaReturn } from "./agentMessage.js"
import { agentSessionSchema, agentSessionSchemaReturn } from "./agentSession.js"
import { apiKeySchema, apiKeySchemaReturn } from "./apiKey.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "./balanceSheet.js"
import { computationSchema, computationSchemaReturn } from "./computation.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "./computationIncomeStatement.js"
import { entrySchema, entrySchemaReturn } from "./entry.js"
import { entryLineSchema, entryLineSchemaReturn } from "./entryLine.js"
import { entryTagSchema, entryTagSchemaReturn } from "./entryTag.js"
import { fileSchema, fileSchemaReturn } from "./file.js"
import { folderSchema, folderSchemaReturn } from "./folder.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "./incomeStatement.js"
import { invoiceSchema, invoiceSchemaReturn } from "./invoice.js"
import { journalSchema, journalSchemaReturn } from "./journal.js"
import { organizationSchema, organizationSchemaReturn } from "./organization.js"
import { organizationBillingSchema, organizationBillingSchemaReturn } from "./organizationBilling.js"
import { organizationPaymentSchema, organizationPaymentSchemaReturn } from "./organizationPayment.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "./organizationUser.js"
import { tagSchema, tagSchemaReturn } from "./tag.js"
import { ticketSchema, ticketSchemaReturn } from "./ticket.js"
import { ticketMessageSchema, ticketMessageSchemaReturn } from "./ticketMessage.js"
import { userSchema, userSchemaReturn } from "./user.js"
import { userSessionSchema, userSessionSchemaReturn } from "./userSession.js"
import { workerJobSchema, workerJobSchemaReturn } from "./workerJob.js"
import { yearSchema, yearSchemaReturn } from "./year.js"

export const schemas = {
    apiKey: apiKeySchema,
    account: accountSchema,
    agentMessage: agentMessageSchema,
    agentSession: agentSessionSchema,
    entry: entrySchema,
    entryLine: entryLineSchema,
    entryTag: entryTagSchema,
    file: fileSchema,
    folder: folderSchema,
    balanceSheet: balanceSheetSchema,
    computation: computationSchema,
    computationIncomeStatement: computationIncomeStatementSchema,
    incomeStatement: incomeStatementSchema,
    invoice: invoiceSchema,
    journal: journalSchema,
    organization: organizationSchema,
    organizationPayment: organizationPaymentSchema,
    organizationBilling: organizationBillingSchema,
    organizationUser: organizationUserSchema,
    tag: tagSchema,
    ticket: ticketSchema,
    ticketMessage: ticketMessageSchema,
    user: userSchema,
    userSession: userSessionSchema,
    workerJob: workerJobSchema,
    year: yearSchema,
}

export const returnedSchemas = {
    apiKey: apiKeySchemaReturn,
    account: accountSchemaReturn,
    agentMessage: agentMessageSchemaReturn,
    agentSession: agentSessionSchemaReturn,
    entry: entrySchemaReturn,
    entryLine: entryLineSchemaReturn,
    entryTag: entryTagSchemaReturn,
    file: fileSchemaReturn,
    folder: folderSchemaReturn,
    balanceSheet: balanceSheetSchemaReturn,
    computation: computationSchemaReturn,
    computationIncomeStatement: computationIncomeStatementSchemaReturn,
    incomeStatement: incomeStatementSchemaReturn,
    invoice: invoiceSchemaReturn,
    journal: journalSchemaReturn,
    organization: organizationSchemaReturn,
    organizationPayment: organizationPaymentSchemaReturn,
    organizationBilling: organizationBillingSchemaReturn,
    organizationUser: organizationUserSchemaReturn,
    tag: tagSchemaReturn,
    ticket: ticketSchemaReturn,
    ticketMessage: ticketMessageSchemaReturn,
    user: userSchemaReturn,
    userSession: userSessionSchemaReturn,
    workerJob: workerJobSchemaReturn,
    year: yearSchemaReturn,
}
