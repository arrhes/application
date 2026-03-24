import * as accountModel from "./account.js"
import * as apiKeyModel from "./apiKey.js"
import * as balanceSheetModel from "./balanceSheet.js"
import * as computationModel from "./computation.js"
import * as computationIncomeStatementModel from "./computationIncomeStatement.js"
import * as documentModel from "./document.js"
import * as entryModel from "./entry.js"
import * as entryLineModel from "./entryLine.js"
import * as entryTagModel from "./entryTag.js"
import * as fileModel from "./file.js"
import * as folderModel from "./folder.js"
import * as incomeStatementModel from "./incomeStatement.js"
import * as journalModel from "./journal.js"
import * as organizationModel from "./organization.js"
import * as organizationPaymentModel from "./organizationPayment.js"
import * as organizationUserModel from "./organizationUser.js"
import * as tagModel from "./tag.js"
import * as userModel from "./user.js"
import * as userSessionModel from "./userSession.js"
import * as yearModel from "./year.js"

export const models = {
    apiKey: apiKeyModel.apiKeyModel,
    account: accountModel.accountModel,
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
    journal: journalModel.journalModel,
    organization: organizationModel.organizationModel,
    organizationPayment: organizationPaymentModel.organizationPaymentModel,
    organizationUser: organizationUserModel.organizationUserModel,
    tag: tagModel.tagModel,
    user: userModel.userModel,
    userSession: userSessionModel.userSessionModel,
    year: yearModel.yearModel,
}

export const modelSchemas = {
    ...apiKeyModel,
    ...accountModel,
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
    ...journalModel,
    ...organizationModel,
    ...organizationPaymentModel,
    ...organizationUserModel,
    ...tagModel,
    ...userModel,
    ...userSessionModel,
    ...yearModel,
}
