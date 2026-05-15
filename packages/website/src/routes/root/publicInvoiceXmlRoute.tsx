import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { rootLayoutRoute } from "../rootLayoutRoute.js"

export const publicInvoiceXmlRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/invoices/$invoiceNumber/xml",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: ({ params }) => ({
        title: `Facture XML ${params.invoiceNumber}`,
        description: "Visualisation publique de la facture UBL XML.",
        robots: "noindex, nofollow",
    }),
    component: lazyRouteComponent(
        () => import("../../features/public/invoiceXml/PublicInvoiceXmlPage.js"),
        "PublicInvoiceXmlPage",
    ),
})
