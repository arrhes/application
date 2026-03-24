import type { AnyRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.tsx"
import { dashboardRootRoute } from "./dashboardRootRoute.tsx"
import { organizationApiKeysRoute } from "./organizations/$idOrganization/organizationApi/organizationApiKeysRoute.tsx"
import { organizationApiLayoutRoute } from "./organizations/$idOrganization/organizationApi/organizationApiLayoutRoute.tsx"
import { organizationApiRoute } from "./organizations/$idOrganization/organizationApi/organizationApiRoute.tsx"
import { organizationLayoutRoute } from "./organizations/$idOrganization/organizationLayoutRoute.tsx"
import { organizationPathRoute } from "./organizations/$idOrganization/organizationPathRoute.tsx"
import { organizationRoute } from "./organizations/$idOrganization/organizationRoute.tsx"
import { organizationSecurityRoute } from "./organizations/$idOrganization/organizationSettings/organizationSecurityRoute.tsx"
import { organizationSettingsLayoutRoute } from "./organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.tsx"
import { organizationSettingsRoute } from "./organizations/$idOrganization/organizationSettings/organizationSettingsRoute.tsx"
import { organizationStorageRoute } from "./organizations/$idOrganization/organizationSettings/organizationStorageRoute.tsx"
import { organizationSubscriptionHistoryRoute } from "./organizations/$idOrganization/organizationSubscription/organizationSubscriptionHistoryRoute.tsx"
import { organizationSubscriptionLayoutRoute } from "./organizations/$idOrganization/organizationSubscription/organizationSubscriptionLayoutRoute.tsx"
import { organizationSubscriptionRoute } from "./organizations/$idOrganization/organizationSubscription/organizationSubscriptionRoute.tsx"
import { organizationUsersLayoutRoute } from "./organizations/$idOrganization/organizationUsers/organizationUsersLayoutRoute.tsx"
import { organizationUsersRoute } from "./organizations/$idOrganization/organizationUsers/organizationUsersRoute.tsx"
import { entryLineLayoutRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineLayoutRoute.tsx"
import { entryLineRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/$idEntryLine/entryLineRoute.tsx"
import { entryLayoutRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryLayoutRoute.tsx"
import { entryRoute } from "./organizations/$idOrganization/years/$idYear/entries/$idEntry/entryRoute.tsx"
import { entriesLayoutRoute } from "./organizations/$idOrganization/years/$idYear/entries/entriesLayoutRoute.tsx"
import { entriesRoute } from "./organizations/$idOrganization/years/$idYear/entries/entriesRoute.tsx"
import { fileLayoutRoute } from "./organizations/$idOrganization/years/$idYear/files/$idFile/fileLayoutRoute.tsx"
import { fileRoute } from "./organizations/$idOrganization/years/$idYear/files/$idFile/fileRoute.tsx"
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
import { accountRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute.tsx"
import { accountsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.tsx"
import { accountsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute.tsx"
import { balanceSheetLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.tsx"
import { balanceSheetRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute.tsx"
import { balanceSheetsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.tsx"
import { balanceSheetsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute.tsx"
import { incomeStatementLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute.tsx"
import { incomeStatementRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementRoute.tsx"
import { computationIncomeStatementLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.tsx"
import { computationIncomeStatementRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementRoute.tsx"
import { computationLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.tsx"
import { computationRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationRoute.tsx"
import { computationsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.tsx"
import { computationsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsRoute.tsx"
import { incomeStatementsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.tsx"
import { incomeStatementsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute.tsx"
import { journalLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalLayoutRoute.tsx"
import { journalRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute.tsx"
import { journalsLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute.tsx"
import { journalsRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute.tsx"
import { tagLayoutRoute } from "./organizations/$idOrganization/years/$idYear/yearSettings/tags/$idTag/tagLayoutRoute.tsx"
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
import { settingsLayoutRoute } from "./settings/settingsLayoutRoute.tsx"
import { settingsRoute } from "./settings/settingsRoute.tsx"
import { supportRoute } from "./support/supportRoute.tsx"

export const dashboardTree: AnyRoute = dashboardLayoutRoute.addChildren([
    dashboardRootRoute,
    organizationsLayoutRoute.addChildren([
        organizationsRoute,
        organizationPathRoute.addChildren([
            organizationLayoutRoute.addChildren([
                organizationRoute,
                yearsLayoutRoute.addChildren([yearsRoute]),
                organizationUsersLayoutRoute.addChildren([organizationUsersRoute]),
                organizationApiLayoutRoute.addChildren([organizationApiRoute, organizationApiKeysRoute]),
                organizationSubscriptionLayoutRoute.addChildren([
                    organizationSubscriptionRoute,
                    organizationSubscriptionHistoryRoute,
                ]),
                organizationSettingsLayoutRoute.addChildren([
                    organizationSettingsRoute,
                    organizationSecurityRoute,
                    organizationStorageRoute,
                ]),
            ]),
            yearsPathRoute.addChildren([
                yearPathRoute.addChildren([
                    yearLayoutRoute.addChildren([
                        yearRoute,
                        entriesLayoutRoute.addChildren([
                            entriesRoute,
                            entryLayoutRoute.addChildren([
                                entryRoute,
                                entryLineLayoutRoute.addChildren([entryLineRoute]),
                            ]),
                        ]),
                        filesLayoutRoute.addChildren([filesRoute, fileLayoutRoute.addChildren([fileRoute])]),
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
                                accountLayoutRoute.addChildren([accountRoute]),
                            ]),
                            journalsLayoutRoute.addChildren([
                                journalsRoute,
                                journalLayoutRoute.addChildren([journalRoute]),
                            ]),
                            tagsLayoutRoute.addChildren([tagsRoute, tagLayoutRoute.addChildren([tagRoute])]),
                            balanceSheetsLayoutRoute.addChildren([
                                balanceSheetsRoute,
                                balanceSheetLayoutRoute.addChildren([balanceSheetRoute]),
                            ]),
                            incomeStatementsLayoutRoute.addChildren([
                                incomeStatementsRoute,
                                incomeStatementLayoutRoute.addChildren([incomeStatementRoute]),
                                computationsLayoutRoute.addChildren([
                                    computationsRoute,
                                    computationLayoutRoute.addChildren([
                                        computationRoute,
                                        computationIncomeStatementLayoutRoute.addChildren([
                                            computationIncomeStatementRoute,
                                        ]),
                                    ]),
                                ]),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ]),
    settingsLayoutRoute.addChildren([settingsRoute]),
    supportRoute,
])
