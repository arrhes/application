import * as accountModel from "./account.js"
import * as apiKeyModel from "./apiKey.js"
import * as balanceSheetModel from "./balanceSheet.js"
import * as computationModel from "./computation.js"
import * as computationIncomeStatementModel from "./computationIncomeStatement.js"
import * as documentModel from "./document.js"
import * as fileModel from "./file.js"
import * as folderModel from "./folder.js"
import * as incomeStatementModel from "./incomeStatement.js"
import * as journalModel from "./journal.js"
import * as organizationModel from "./organization.js"
import * as organizationPaymentModel from "./organizationPayment.js"
import * as organizationUserModel from "./organizationUser.js"
import * as recordModel from "./record.js"
import * as recordLabelModel from "./recordLabel.js"
import * as recordRowModel from "./recordRow.js"
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
    incomeStatement: incomeStatementModel.incomeStatementModel,
    journal: journalModel.journalModel,
    organization: organizationModel.organizationModel,
    organizationPayment: organizationPaymentModel.organizationPaymentModel,
    organizationUser: organizationUserModel.organizationUserModel,
    record: recordModel.recordModel,
    recordLabel: recordLabelModel.recordLabelModel,
    recordRow: recordRowModel.recordRowModel,
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
    ...incomeStatementModel,
    ...journalModel,
    ...organizationModel,
    ...organizationPaymentModel,
    ...organizationUserModel,
    ...recordModel,
    ...recordLabelModel,
    ...recordRowModel,
    ...userModel,
    ...userSessionModel,
    ...yearModel,
}
