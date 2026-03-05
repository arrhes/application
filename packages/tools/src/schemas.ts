// Drizzle-kit schema file
// =============================================================================
// Drizzle-kit uses CJS module resolution internally, which cannot resolve .js
// extension imports to .ts files. The metadata package uses ESM-style .js
// extensions in imports. To work around this, we directly import each model
// file using relative paths that drizzle-kit's resolver can handle.
// =============================================================================

export {
    accountBalanceSheetColumnEnum,
    accountBalanceSheetFlowEnum,
    accountModel,
    accountRelations,
    accountTypeEnum,
} from "../../metadata/src/models/account.ts"
export { apiKeyModel, apiKeyRelations } from "../../metadata/src/models/apiKey.ts"
export { balanceSheetModel, balanceSheetRelations } from "../../metadata/src/models/balanceSheet.ts"
export { computationModel, computationRelations } from "../../metadata/src/models/computation.ts"
export {
    computationIncomeStatementModel,
    computationIncomeStatementRelations,
} from "../../metadata/src/models/computationIncomeStatement.ts"
export { documentModel, documentRelations, documentTypeEnum } from "../../metadata/src/models/document.ts"
export { fileModel } from "../../metadata/src/models/file.ts"
export { folderModel } from "../../metadata/src/models/folder.ts"
export { incomeStatementModel, incomeStatementRelations } from "../../metadata/src/models/incomeStatement.ts"
export { journalModel, journalRelations } from "../../metadata/src/models/journal.ts"
export { organizationModel, organizationRelations } from "../../metadata/src/models/organization.ts"
export {
    organizationPaymentModel,
    organizationPaymentRelations,
    organizationPaymentStatusEnum,
} from "../../metadata/src/models/organizationPayment.ts"
export {
    organizationUserModel,
    organizationUserRelations,
    organizationUserStatusEnum,
} from "../../metadata/src/models/organizationUser.ts"
export { recordModel, recordRelations } from "../../metadata/src/models/record.ts"
export { recordLabelModel, recordLabelRelations } from "../../metadata/src/models/recordLabel.ts"
export { recordRowModel, recordRowOperationEnum, recordRowRelations } from "../../metadata/src/models/recordRow.ts"
export { userModel, userRelations } from "../../metadata/src/models/user.ts"
export { userSessionModel, userSessionRelations } from "../../metadata/src/models/userSession.ts"
export { yearModel, yearRelations, yearStateEnum } from "../../metadata/src/models/year.ts"
