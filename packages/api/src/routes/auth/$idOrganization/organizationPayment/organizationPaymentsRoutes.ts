import { cancelOrganizationBillingRoute } from "./cancelOrganizationBilling.js"
import { cancelSubscriptionRoute } from "./cancelSubscription.js"
import { createFirstPaymentRoute } from "./createFirstPayment.js"
import { createPaymentMethodCheckoutRoute } from "./createPaymentMethodCheckout.js"
import { createWalletTopUpCheckoutRoute } from "./createWalletTopUpCheckout.js"
import { createWalletWithdrawalRoute } from "./createWalletWithdrawal.js"
import { generateInvoiceGetSignedUrlRoute } from "./generateInvoiceGetSignedUrl.js"
import { readAllInvoicesRoute } from "./readAllInvoices.js"
import { readAllOrganizationBillingsRoute } from "./readAllOrganizationBillings.js"
import { readAllOrganizationPaymentsRoute } from "./readAllOrganizationPayments.js"
import { readOneInvoiceRoute } from "./readOneInvoice.js"
import { readOrganizationBillingRoute } from "./readOrganizationBilling.js"
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
    readOrganizationBillingRoute,
    cancelSubscriptionRoute,
    readAllOrganizationBillingsRoute,
    updateLicenceSubscriptionRoute,
    updateOcrSubscriptionRoute,
    updateStorageSubscriptionRoute,
    updateTokensSubscriptionRoute,
    cancelOrganizationBillingRoute,
    readAllInvoicesRoute,
    generateInvoiceGetSignedUrlRoute,
    readOneInvoiceRoute,
]
