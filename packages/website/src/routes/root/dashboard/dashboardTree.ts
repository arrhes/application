import type { AnyRoute } from "@tanstack/react-router"
import { adminLayoutRoute } from "./admin/adminLayoutRoute.tsx"
import { adminRoute } from "./admin/adminRoute.tsx"
import { $idTicketLayoutRoute } from "./admin/tickets/$idTicket/$idTicketLayoutRoute.tsx"
import { $idTicketRoute } from "./admin/tickets/$idTicket/$idTicketRoute.tsx"
import { adminTicketsLayoutRoute } from "./admin/tickets/ticketsLayoutRoute.tsx"
import { adminTicketsRoute } from "./admin/tickets/ticketsRoute.tsx"
import { agentLayoutRoute } from "./agent/agentLayoutRoute.tsx"
import { agentRoute } from "./agent/agentRoute.tsx"
import { agentSessionRoute } from "./agent/agentSessionRoute.tsx"
import { agentSessionsLayoutRoute } from "./agent/agentSessionsLayoutRoute.tsx"
import { dashboardCatchRoute } from "./dashboardCatchRoute.tsx"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.tsx"
import { dashboardRootRoute } from "./dashboardRootRoute.tsx"
import { organizationApiKeysRoute } from "./organizations/$idOrganization/organizationApi/organizationApiKeysRoute.tsx"
import { organizationApiLayoutRoute } from "./organizations/$idOrganization/organizationApi/organizationApiLayoutRoute.tsx"
import { organizationApiRoute } from "./organizations/$idOrganization/organizationApi/organizationApiRoute.tsx"
import { organizationBillingHistoryRoute } from "./organizations/$idOrganization/organizationBilling/organizationBillingHistoryRoute.tsx"
import { organizationBillingLayoutRoute } from "./organizations/$idOrganization/organizationBilling/organizationBillingLayoutRoute.tsx"
import { organizationBillingRoute } from "./organizations/$idOrganization/organizationBilling/organizationBillingRoute.tsx"
import { organizationServicesRoute } from "./organizations/$idOrganization/organizationBilling/organizationBillingsRoute.tsx"
import { organizationInvoicesRoute } from "./organizations/$idOrganization/organizationBilling/organizationInvoicesRoute.tsx"
import { organizationInvoiceUblRoute } from "./organizations/$idOrganization/organizationBilling/organizationInvoiceUblRoute.tsx"
import { organizationLayoutRoute } from "./organizations/$idOrganization/organizationLayoutRoute.tsx"
import { organizationPathRoute } from "./organizations/$idOrganization/organizationPathRoute.tsx"
import { organizationRoute } from "./organizations/$idOrganization/organizationRoute.tsx"
import { organizationSecurityRoute } from "./organizations/$idOrganization/organizationSettings/organizationSecurityRoute.tsx"
import { organizationSettingsLayoutRoute } from "./organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.tsx"
import { organizationSettingsRoute } from "./organizations/$idOrganization/organizationSettings/organizationSettingsRoute.tsx"
import { organizationUsersLayoutRoute } from "./organizations/$idOrganization/organizationUsers/organizationUsersLayoutRoute.tsx"
import { organizationUsersRoute } from "./organizations/$idOrganization/organizationUsers/organizationUsersRoute.tsx"
import { entryLineLayoutRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineLayoutRoute.tsx"
import { entryLineMetadataRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineMetadataRoute.tsx"
import { entryLineRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineRoute.tsx"
import { entryCategoriesRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryCategoriesRoute.tsx"
import { entryLayoutRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryLayoutRoute.tsx"
import { entryLinesRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryLinesRoute.tsx"
import { entryMetadataRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryMetadataRoute.tsx"
import { entryRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryRoute.tsx"
import { entriesLayoutRoute } from "./organizations/$idOrganization/years/$idYear/entries/entriesLayoutRoute.tsx"
import { entriesRoute } from "./organizations/$idOrganization/years/$idYear/entries/entriesRoute.tsx"
import { fileLayoutRoute } from "./organizations/$idOrganization/years/$idYear/files/$idFile/fileLayoutRoute.tsx"
import { fileMetadataRoute } from "./organizations/$idOrganization/years/$idYear/files/$idFile/fileMetadataRoute.tsx"
import { fileRoute } from "./organizations/$idOrganization/years/$idYear/files/$idFile/fileRoute.tsx"
import { fileVisualisationRoute } from "./organizations/$idOrganization/years/$idYear/files/$idFile/fileVisualisationRoute.tsx"
import { filesLayoutRoute } from "./organizations/$idOrganization/years/$idYear/files/filesLayoutRoute.tsx"
import { filesRoute } from "./organizations/$idOrganization/years/$idYear/files/filesRoute.tsx"
import { balanceReportRoute } from "./organizations/$idOrganization/years/$idYear/reports/balanceReportRoute.tsx"
import { balanceSheetReportRoute } from "./organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.tsx"
import { incomeStatementReportRoute } from "./organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute.tsx"
import { journalReportRoute } from "./organizations/$idOrganization/years/$idYear/reports/journalReportRoute.tsx"
import { ledgerReportRoute } from "./organizations/$idOrganization/years/$idYear/reports/ledgerReportRoute.tsx"
import { reportsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.tsx"
import { reportsRoute } from "./organizations/$idOrganization/years/$idYear/reports/reportsRoute.tsx"
import { yearLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearLayoutRoute.tsx"
import { yearPathRoute } from "./organizations/$idOrganization/years/$idYear/yearPathRoute.tsx"
import { yearRoute } from "./organizations/$idOrganization/years/$idYear/yearRoute.tsx"
import { accountLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.tsx"
import { accountMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountMetadataRoute.tsx"
import { accountRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute.tsx"
import { accountsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.tsx"
import { accountsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute.tsx"
import { balanceSheetLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.tsx"
import { balanceSheetMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetMetadataRoute.tsx"
import { balanceSheetRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute.tsx"
import { actifLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/actif/actifLayoutRoute.tsx"
import { actifRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/actif/actifRoute.tsx"
import { balanceSheetsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.tsx"
import { balanceSheetsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute.tsx"
import { passifLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/passif/passifLayoutRoute.tsx"
import { passifRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/passif/passifRoute.tsx"
import { incomeStatementLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute.tsx"
import { incomeStatementMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementMetadataRoute.tsx"
import { incomeStatementRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementRoute.tsx"
import { computationIncomeStatementLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.tsx"
import { computationIncomeStatementMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementMetadataRoute.tsx"
import { computationIncomeStatementRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementRoute.tsx"
import { computationLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.tsx"
import { computationMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationMetadataRoute.tsx"
import { computationPostesRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationPostesRoute.tsx"
import { computationRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationRoute.tsx"
import { computationsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.tsx"
import { computationsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsRoute.tsx"
import { incomeStatementsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.tsx"
import { incomeStatementsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute.tsx"
import { journalLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalLayoutRoute.tsx"
import { journalMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalMetadataRoute.tsx"
import { journalRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute.tsx"
import { journalsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute.tsx"
import { journalsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute.tsx"
import { tagLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/tags/$idTag/tagLayoutRoute.tsx"
import { tagMetadataRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/tags/$idTag/tagMetadataRoute.tsx"
import { tagRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/tags/$idTag/tagRoute.tsx"
import { tagsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/tags/tagsLayoutRoute.tsx"
import { tagsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/tags/tagsRoute.tsx"
import { yearSettingsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.tsx"
import { yearSettingsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.tsx"
import { yearsLayoutRoute } from "./organizations/$idOrganization/years/yearsLayoutRoute.tsx"
import { yearsPathRoute } from "./organizations/$idOrganization/years/yearsPathRoute.tsx"
import { yearsRoute } from "./organizations/$idOrganization/years/yearsRoute.tsx"
import { organizationsLayoutRoute } from "./organizations/organizationsLayoutRoute.tsx"
import { organizationsRoute } from "./organizations/organizationsRoute.tsx"
import { userProfileLayoutRoute } from "./profile/userProfileLayoutRoute.tsx"
import { userProfileRoute } from "./profile/userProfileRoute.tsx"
import { settingsLayoutRoute } from "./settings/settingsLayoutRoute.tsx"
import { settingsRoute } from "./settings/settingsRoute.tsx"
import { supportLayoutRoute } from "./support/supportLayoutRoute.tsx"
import { supportRoute } from "./support/supportRoute.tsx"
import { ticketLayoutRoute } from "./support/ticketLayoutRoute.tsx"
import { ticketRoute } from "./support/ticketRoute.tsx"

export const dashboardTree: AnyRoute = dashboardLayoutRoute.addChildren([
    dashboardRootRoute,
    adminLayoutRoute.addChildren([
        adminRoute,
        adminTicketsLayoutRoute.addChildren([adminTicketsRoute, $idTicketLayoutRoute.addChildren([$idTicketRoute])]),
    ]),
    organizationsLayoutRoute.addChildren([
        organizationsRoute,
        organizationPathRoute.addChildren([
            organizationLayoutRoute.addChildren([
                organizationRoute,
                yearsLayoutRoute.addChildren([yearsRoute]),
                organizationUsersLayoutRoute.addChildren([organizationUsersRoute]),
                organizationApiLayoutRoute.addChildren([organizationApiRoute, organizationApiKeysRoute]),
                organizationBillingLayoutRoute.addChildren([
                    organizationBillingRoute,
                    organizationServicesRoute,
                    organizationBillingHistoryRoute,
                    organizationInvoicesRoute,
                    organizationInvoiceUblRoute,
                ]),
                organizationSettingsLayoutRoute.addChildren([organizationSettingsRoute, organizationSecurityRoute]),
                agentLayoutRoute.addChildren([agentRoute, agentSessionsLayoutRoute.addChildren([agentSessionRoute])]),
            ]),
            yearsPathRoute.addChildren([
                yearPathRoute.addChildren([
                    yearLayoutRoute.addChildren([
                        yearRoute,
                        entriesLayoutRoute.addChildren([
                            entriesRoute,
                            entryLayoutRoute.addChildren([
                                entryRoute,
                                entryLinesRoute,
                                entryCategoriesRoute,
                                entryMetadataRoute,
                            ]),
                            entryLineLayoutRoute.addChildren([entryLineRoute, entryLineMetadataRoute]),
                        ]),
                        filesLayoutRoute.addChildren([
                            filesRoute,
                            fileLayoutRoute.addChildren([fileRoute, fileMetadataRoute, fileVisualisationRoute]),
                        ]),
                        reportsLayoutRoute.addChildren([
                            reportsRoute,
                            journalReportRoute,
                            ledgerReportRoute,
                            balanceReportRoute,
                            balanceSheetReportRoute,
                            incomeStatementReportRoute,
                        ]),
                        yearSettingsLayoutRoute.addChildren([
                            yearSettingsRoute,
                            accountsLayoutRoute.addChildren([
                                accountsRoute,
                                accountLayoutRoute.addChildren([accountRoute, accountMetadataRoute]),
                            ]),
                            journalsLayoutRoute.addChildren([
                                journalsRoute,
                                journalLayoutRoute.addChildren([journalRoute, journalMetadataRoute]),
                            ]),
                            tagsLayoutRoute.addChildren([
                                tagsRoute,
                                tagLayoutRoute.addChildren([tagRoute, tagMetadataRoute]),
                            ]),
                            balanceSheetsLayoutRoute.addChildren([
                                balanceSheetsRoute,
                                actifLayoutRoute.addChildren([actifRoute]),
                                passifLayoutRoute.addChildren([passifRoute]),
                                balanceSheetLayoutRoute.addChildren([balanceSheetRoute, balanceSheetMetadataRoute]),
                            ]),
                            incomeStatementsLayoutRoute.addChildren([
                                incomeStatementsRoute,
                                incomeStatementLayoutRoute.addChildren([
                                    incomeStatementRoute,
                                    incomeStatementMetadataRoute,
                                ]),
                                computationsLayoutRoute.addChildren([
                                    computationsRoute,
                                    computationLayoutRoute.addChildren([
                                        computationRoute,
                                        computationPostesRoute,
                                        computationMetadataRoute,
                                    ]),
                                    computationIncomeStatementLayoutRoute.addChildren([
                                        computationIncomeStatementRoute,
                                        computationIncomeStatementMetadataRoute,
                                    ]),
                                ]),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ]),
    userProfileLayoutRoute.addChildren([userProfileRoute]),
    settingsLayoutRoute.addChildren([settingsRoute]),
    supportLayoutRoute.addChildren([supportRoute, ticketLayoutRoute.addChildren([ticketRoute])]),
    dashboardCatchRoute,
])
