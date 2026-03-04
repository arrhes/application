import { cancelSubscriptionRoute } from "./cancelSubscription.js"
import { createFirstPaymentRoute } from "./createFirstPayment.js"
import { readAllOrganizationPaymentsRoute } from "./readAllOrganizationPayments.js"
import { readOrganizationSubscriptionRoute } from "./readOrganizationSubscription.js"

export const organizationPaymentsRoutes = [
    readAllOrganizationPaymentsRoute,
    createFirstPaymentRoute,
    readOrganizationSubscriptionRoute,
    cancelSubscriptionRoute,
]
