import { Profiler, StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/css/root.css"
import { RootProvider } from "./contexts/rootProvider.js"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    localStorage.theme = "light"
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <Profiler id="website" onRender={() => {}}>
                <RootProvider />
            </Profiler>
        </StrictMode>,
    )
}
