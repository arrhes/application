import { RouterProvider as Router } from "@tanstack/react-router"
import { adminRouter } from "../../routes/adminRouter.js"

export function RouterProvider() {
    return <Router router={adminRouter} />
}
