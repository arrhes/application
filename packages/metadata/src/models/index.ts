import * as accountModel from "./account.js"
import * as agentMessageModel from "./agentMessage.js"
import * as agentSessionModel from "./agentSession.js"
import * as apiKeyModel from "./apiKey.js"
import * as balanceSheetModel from "./balanceSheet.js"
import * as computationModel from "./computation.js"
import * as computationIncomeStatementModel from "./computationIncomeStatement.js"
import * as entryModel from "./entry.js"
import * as entryLineModel from "./entryLine.js"
import * as entryTagModel from "./entryTag.js"
import * as fileModel from "./file.js"
import * as folderModel from "./folder.js"
import * as incomeStatementModel from "./incomeStatement.js"
import * as invoiceModel from "./invoice.js"
import * as journalModel from "./journal.js"
import * as organizationModel from "./organization.js"
import * as organizationBillingModel from "./organizationBilling.js"
import * as organizationPaymentModel from "./organizationPayment.js"
import * as organizationUserModel from "./organizationUser.js"
import * as tagModel from "./tag.js"
import * as ticketModel from "./ticket.js"
import * as ticketMessageModel from "./ticketMessage.js"
import * as userModel from "./user.js"
import * as userSessionModel from "./userSession.js"
import * as workerJobModel from "./workerJob.js"
import * as yearModel from "./year.js"

export const models = {
    apiKey: apiKeyModel.apiKeyModel,
    account: accountModel.accountModel,
    agentMessage: agentMessageModel.agentMessageModel,
    agentSession: agentSessionModel.agentSessionModel,
    file: fileModel.fileModel,
    folder: folderModel.folderModel,
    balanceSheet: balanceSheetModel.balanceSheetModel,
    computation: computationModel.computationModel,
    computationIncomeStatement: computationIncomeStatementModel.computationIncomeStatementModel,
    entry: entryModel.entryModel,
    entryLine: entryLineModel.entryLineModel,
    entryTag: entryTagModel.entryTagModel,
    incomeStatement: incomeStatementModel.incomeStatementModel,
    invoice: invoiceModel.invoiceModel,
    journal: journalModel.journalModel,
    organization: organizationModel.organizationModel,
    organizationPayment: organizationPaymentModel.organizationPaymentModel,
    organizationBilling: organizationBillingModel.organizationBillingModel,
    organizationUser: organizationUserModel.organizationUserModel,
    tag: tagModel.tagModel,
    ticket: ticketModel.ticketModel,
    ticketMessage: ticketMessageModel.ticketMessageModel,
    user: userModel.userModel,
    userSession: userSessionModel.userSessionModel,
    workerJob: workerJobModel.workerJobModel,
    year: yearModel.yearModel,
}

export const modelSchemas = {
    ...apiKeyModel,
    ...accountModel,
    ...agentMessageModel,
    ...agentSessionModel,
    ...fileModel,
    ...folderModel,
    ...balanceSheetModel,
    ...computationModel,
    ...computationIncomeStatementModel,
    ...entryModel,
    ...entryLineModel,
    ...entryTagModel,
    ...incomeStatementModel,
    ...invoiceModel,
    ...journalModel,
    ...organizationModel,
    ...organizationPaymentModel,
    ...organizationBillingModel,
    ...organizationUserModel,
    ...tagModel,
    ...ticketModel,
    ...ticketMessageModel,
    ...userModel,
    ...userSessionModel,
    ...workerJobModel,
    ...yearModel,
}
