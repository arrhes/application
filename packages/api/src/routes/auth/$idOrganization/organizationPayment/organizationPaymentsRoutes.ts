import { cancelOrganizationSubscriptionRoute } from "./cancelOrganizationSubscription.js"
import { cancelSubscriptionRoute } from "./cancelSubscription.js"
import { createFirstPaymentRoute } from "./createFirstPayment.js"
import { createPaymentMethodCheckoutRoute } from "./createPaymentMethodCheckout.js"
import { createWalletTopUpCheckoutRoute } from "./createWalletTopUpCheckout.js"
import { createWalletWithdrawalRoute } from "./createWalletWithdrawal.js"
import { generateInvoiceGetSignedUrlRoute } from "./generateInvoiceGetSignedUrl.js"
import { readAllInvoicesRoute } from "./readAllInvoices.js"
import { readAllOrganizationPaymentsRoute } from "./readAllOrganizationPayments.js"
import { readAllOrganizationSubscriptionsRoute } from "./readAllOrganizationSubscriptions.js"
import { readOrganizationSubscriptionRoute } from "./readOrganizationSubscription.js"
import { updateLicenceSubscriptionRoute } from "./updateLicenceSubscription.js"
import { updateOcrSubscriptionRoute } from "./updateOcrSubscription.js"
import { updateStorageSubscriptionRoute } from "./updateStorageSubscription.js"
import { updateTokensSubscriptionRoute } from "./updateTokensSubscription.js"

export const organizationPaymentsRoutes = [
    readAllOrganizationPaymentsRoute,
    createFirstPaymentRoute,
    createPaymentMethodCheckoutRoute,
    createWalletTopUpCheckoutRoute,
    createWalletWithdrawalRoute,
    readOrganizationSubscriptionRoute,
    cancelSubscriptionRoute,
    readAllOrganizationSubscriptionsRoute,
    updateLicenceSubscriptionRoute,
    updateOcrSubscriptionRoute,
    updateStorageSubscriptionRoute,
    updateTokensSubscriptionRoute,
    cancelOrganizationSubscriptionRoute,
    readAllInvoicesRoute,
    generateInvoiceGetSignedUrlRoute,
]
