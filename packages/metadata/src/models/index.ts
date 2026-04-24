import * as accountModel from "./account.js"
import * as adminUserModel from "./adminUser.js"
import * as adminUserSessionModel from "./adminUserSession.js"
import * as agentMessageModel from "./agentMessage.js"
import * as agentSessionModel from "./agentSession.js"
import * as apiKeyModel from "./apiKey.js"
import * as balanceSheetModel from "./balanceSheet.js"
import * as computationModel from "./computation.js"
import * as computationIncomeStatementModel from "./computationIncomeStatement.js"
import * as dashboardUserModel from "./dashboardUser.js"
import * as dashboardUserSessionModel from "./dashboardUserSession.js"
import * as documentModel from "./document.js"
import * as entryModel from "./entry.js"
import * as entryLineModel from "./entryLine.js"
import * as entryTagModel from "./entryTag.js"
import * as fileModel from "./file.js"
import * as folderModel from "./folder.js"
import * as incomeStatementModel from "./incomeStatement.js"
import * as invoiceModel from "./invoice.js"
import * as journalModel from "./journal.js"
import * as organizationModel from "./organization.js"
import * as organizationPaymentModel from "./organizationPayment.js"
import * as organizationSubscriptionModel from "./organizationSubscription.js"
import * as organizationUserModel from "./organizationUser.js"
import * as tagModel from "./tag.js"
import * as ticketModel from "./ticket.js"
import * as ticketMessageModel from "./ticketMessage.js"
import * as workerJobModel from "./workerJob.js"
import * as yearModel from "./year.js"

export const models = {
    adminUser: adminUserModel.adminUserModel,
    adminUserSession: adminUserSessionModel.adminUserSessionModel,
    apiKey: apiKeyModel.apiKeyModel,
    account: accountModel.accountModel,
    agentMessage: agentMessageModel.agentMessageModel,
    agentSession: agentSessionModel.agentSessionModel,
    file: fileModel.fileModel,
    folder: folderModel.folderModel,
    balanceSheet: balanceSheetModel.balanceSheetModel,
    computation: computationModel.computationModel,
    computationIncomeStatement: computationIncomeStatementModel.computationIncomeStatementModel,
    document: documentModel.documentModel,
    entry: entryModel.entryModel,
    entryLine: entryLineModel.entryLineModel,
    entryTag: entryTagModel.entryTagModel,
    incomeStatement: incomeStatementModel.incomeStatementModel,
    invoice: invoiceModel.invoiceModel,
    journal: journalModel.journalModel,
    organization: organizationModel.organizationModel,
    organizationPayment: organizationPaymentModel.organizationPaymentModel,
    organizationSubscription: organizationSubscriptionModel.organizationSubscriptionModel,
    organizationUser: organizationUserModel.organizationUserModel,
    tag: tagModel.tagModel,
    ticket: ticketModel.ticketModel,
    ticketMessage: ticketMessageModel.ticketMessageModel,
    dashboardUser: dashboardUserModel.dashboardUserModel,
    dashboardUserSession: dashboardUserSessionModel.dashboardUserSessionModel,
    workerJob: workerJobModel.workerJobModel,
    year: yearModel.yearModel,
}

export const modelSchemas = {
    ...adminUserModel,
    ...adminUserSessionModel,
    ...apiKeyModel,
    ...accountModel,
    ...agentMessageModel,
    ...agentSessionModel,
    ...fileModel,
    ...folderModel,
    ...balanceSheetModel,
    ...computationModel,
    ...computationIncomeStatementModel,
    ...documentModel,
    ...entryModel,
    ...entryLineModel,
    ...entryTagModel,
    ...incomeStatementModel,
    ...invoiceModel,
    ...journalModel,
    ...organizationModel,
    ...organizationPaymentModel,
    ...organizationSubscriptionModel,
    ...organizationUserModel,
    ...tagModel,
    ...ticketModel,
    ...ticketMessageModel,
    ...dashboardUserModel,
    ...dashboardUserSessionModel,
    ...workerJobModel,
    ...yearModel,
}
