import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/css/root.css"
import { RootProvider } from "./contexts/RootProvider.js"

localStorage.theme = "light"
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RootProvider />
    </StrictMode>,
)
