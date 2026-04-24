import { accountSchema, accountSchemaReturn } from "./account.js"
import { adminUserSchema, adminUserSchemaReturn } from "./adminUser.js"
import { adminUserSessionSchema, adminUserSessionSchemaReturn } from "./adminUserSession.js"
import { agentMessageSchema, agentMessageSchemaReturn } from "./agentMessage.js"
import { agentSessionSchema, agentSessionSchemaReturn } from "./agentSession.js"
import { apiKeySchema, apiKeySchemaReturn } from "./apiKey.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "./balanceSheet.js"
import { computationSchema, computationSchemaReturn } from "./computation.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "./computationIncomeStatement.js"
import { dashboardUserSchema, dashboardUserSchemaReturn } from "./dashboardUser.js"
import { dashboardUserSessionSchema, dashboardUserSessionSchemaReturn } from "./dashboardUserSession.js"
import { entrySchema, entrySchemaReturn } from "./entry.js"
import { entryLineSchema, entryLineSchemaReturn } from "./entryLine.js"
import { entryTagSchema, entryTagSchemaReturn } from "./entryTag.js"
import { fileSchema, fileSchemaReturn } from "./file.js"
import { folderSchema, folderSchemaReturn } from "./folder.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "./incomeStatement.js"
import { invoiceSchema, invoiceSchemaReturn } from "./invoice.js"
import { journalSchema, journalSchemaReturn } from "./journal.js"
import { organizationSchema, organizationSchemaReturn } from "./organization.js"
import { organizationPaymentSchema, organizationPaymentSchemaReturn } from "./organizationPayment.js"
import { organizationSubscriptionSchema, organizationSubscriptionSchemaReturn } from "./organizationSubscription.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "./organizationUser.js"
import { tagSchema, tagSchemaReturn } from "./tag.js"
import { ticketSchema, ticketSchemaReturn } from "./ticket.js"
import { ticketMessageSchema, ticketMessageSchemaReturn } from "./ticketMessage.js"
import { workerJobSchema, workerJobSchemaReturn } from "./workerJob.js"
import { yearSchema, yearSchemaReturn } from "./year.js"

export const schemas = {
    adminUser: adminUserSchema,
    adminUserSession: adminUserSessionSchema,
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
    organizationSubscription: organizationSubscriptionSchema,
    organizationUser: organizationUserSchema,
    tag: tagSchema,
    ticket: ticketSchema,
    ticketMessage: ticketMessageSchema,
    dashboardUser: dashboardUserSchema,
    dashboardUserSession: dashboardUserSessionSchema,
    workerJob: workerJobSchema,
    year: yearSchema,
}

export const returnedSchemas = {
    adminUser: adminUserSchemaReturn,
    adminUserSession: adminUserSessionSchemaReturn,
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
    organizationSubscription: organizationSubscriptionSchemaReturn,
    organizationUser: organizationUserSchemaReturn,
    tag: tagSchemaReturn,
    ticket: ticketSchemaReturn,
    ticketMessage: ticketMessageSchemaReturn,
    dashboardUser: dashboardUserSchemaReturn,
    dashboardUserSession: dashboardUserSessionSchemaReturn,
    workerJob: workerJobSchemaReturn,
    year: yearSchemaReturn,
}
