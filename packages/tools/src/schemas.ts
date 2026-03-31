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
export { adminUserModel, adminUserRelations } from "../../metadata/src/models/adminUser.ts"
export {
    agentMessageModel,
    agentMessageRelations,
    agentMessageRoleEnum,
    agentMessageStateEnum,
} from "../../metadata/src/models/agentMessage.ts"
export { agentSessionModel, agentSessionRelations } from "../../metadata/src/models/agentSession.ts"
export { adminUserSessionModel, adminUserSessionRelations } from "../../metadata/src/models/adminUserSession.ts"
export { apiKeyModel, apiKeyRelations } from "../../metadata/src/models/apiKey.ts"
export { balanceSheetModel, balanceSheetRelations } from "../../metadata/src/models/balanceSheet.ts"
export { computationModel, computationRelations } from "../../metadata/src/models/computation.ts"
export {
    computationIncomeStatementModel,
    computationIncomeStatementRelations,
} from "../../metadata/src/models/computationIncomeStatement.ts"
export { dashboardUserModel, dashboardUserRelations } from "../../metadata/src/models/dashboardUser.ts"
export {
    dashboardUserSessionModel,
    dashboardUserSessionsRelations,
} from "../../metadata/src/models/dashboardUserSession.ts"
export { documentModel, documentRelations, documentTypeEnum } from "../../metadata/src/models/document.ts"
export { entryModel, entryRelations } from "../../metadata/src/models/entry.ts"
export { entryLineModel, entryLineOperationEnum, entryLineRelations } from "../../metadata/src/models/entryLine.ts"
export { entryTagModel, entryTagRelations } from "../../metadata/src/models/entryTag.ts"
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
export { tagModel, tagRelations } from "../../metadata/src/models/tag.ts"
export { ticketModel, ticketRelations, ticketStatusEnum, ticketTypeEnum } from "../../metadata/src/models/ticket.ts"
export { ticketMessageModel, ticketMessageRelations } from "../../metadata/src/models/ticketMessage.ts"
export { yearModel, yearRelations, yearStateEnum } from "../../metadata/src/models/year.ts"
