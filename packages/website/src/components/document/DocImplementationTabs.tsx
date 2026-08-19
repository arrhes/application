import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBrowser, IconCode, IconTerminal2 } from "@tabler/icons-react"
import { useState } from "react"

type Tab = "dashboard" | "api" | "cli"

export function DocImplementationTabs(props: {
    dashboard: React.ReactNode
    api: React.ReactNode
    cli: React.ReactNode
}) {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard")

    const tabButtonClassName = (tab: Tab) =>
        css({
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1rem",
            fontSize: "sm",
            fontWeight: "semibold",
            color: activeTab === tab ? "primary" : "neutral/50",
            borderBottom: "2px solid",
            borderBottomColor: activeTab === tab ? "primary" : "transparent",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "all 0.15s",
            _hover: {
                color: activeTab === tab ? "primary" : "neutral/70",
            },
        })

    return (
        <div
            className={css({
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                overflow: "hidden",
                backgroundColor: "white",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    backgroundColor: "neutral/3",
                })}
            >
                <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className={tabButtonClassName("dashboard")}
                >
                    <IconBrowser size={18} />
                    Dashboard
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("api")}
                    className={tabButtonClassName("api")}
                >
                    <IconCode size={18} />
                    API
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("cli")}
                    className={tabButtonClassName("cli")}
                >
                    <IconTerminal2 size={18} />
                    CLI
                </button>
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    padding: "1rem",
                })}
            >
                {activeTab === "dashboard" && props.dashboard}
                {activeTab === "api" && props.api}
                {activeTab === "cli" && props.cli}
            </div>
        </div>
    )
}
