import { accountSchema, accountSchemaReturn } from "./account.js"
import { apiKeySchema, apiKeySchemaReturn } from "./apiKey.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "./balanceSheet.js"
import { computationSchema, computationSchemaReturn } from "./computation.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "./computationIncomeStatement.js"
import { fileSchema, fileSchemaReturn } from "./file.js"
import { folderSchema, folderSchemaReturn } from "./folder.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "./incomeStatement.js"
import { journalSchema, journalSchemaReturn } from "./journal.js"
import { organizationSchema, organizationSchemaReturn } from "./organization.js"
import { organizationPaymentSchema, organizationPaymentSchemaReturn } from "./organizationPayment.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "./organizationUser.js"
import { recordSchema, recordSchemaReturn } from "./record.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "./recordLabel.js"
import { recordRowSchema, recordRowSchemaReturn } from "./recordRow.js"
import { userSchema, userSchemaReturn } from "./user.js"
import { userSessionSchema, userSessionSchemaReturn } from "./userSession.js"
import { yearSchema, yearSchemaReturn } from "./year.js"

export const schemas = {
    apiKey: apiKeySchema,
    account: accountSchema,
    file: fileSchema,
    folder: folderSchema,
    balanceSheet: balanceSheetSchema,
    computation: computationSchema,
    computationIncomeStatement: computationIncomeStatementSchema,
    incomeStatement: incomeStatementSchema,
    journal: journalSchema,
    organization: organizationSchema,
    organizationPayment: organizationPaymentSchema,
    organizationUser: organizationUserSchema,
    record: recordSchema,
    recordLabel: recordLabelSchema,
    recordRow: recordRowSchema,
    user: userSchema,
    userSession: userSessionSchema,
    year: yearSchema,
}

export const returnedSchemas = {
    apiKey: apiKeySchemaReturn,
    account: accountSchemaReturn,
    file: fileSchemaReturn,
    folder: folderSchemaReturn,
    balanceSheet: balanceSheetSchemaReturn,
    computation: computationSchemaReturn,
    computationIncomeStatement: computationIncomeStatementSchemaReturn,
    incomeStatement: incomeStatementSchemaReturn,
    journal: journalSchemaReturn,
    organization: organizationSchemaReturn,
    organizationPayment: organizationPaymentSchemaReturn,
    organizationUser: organizationUserSchemaReturn,
    record: recordSchemaReturn,
    recordLabel: recordLabelSchemaReturn,
    recordRow: recordRowSchemaReturn,
    user: userSchemaReturn,
    userSession: userSessionSchemaReturn,
    year: yearSchemaReturn,
}
