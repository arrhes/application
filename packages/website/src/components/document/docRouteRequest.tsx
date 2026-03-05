import type { routeDefinition } from "@arrhes/application-metadata/utilities"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useState } from "react"

type SchemaLike = {
    type: string
    entries?: Readonly<Record<string, SchemaLike>>
    wrapped?: SchemaLike
    pipe?: readonly SchemaLike[]
    item?: SchemaLike
    options?: readonly string[]
}

function getBaseType(schema: SchemaLike): string {
    if (schema.type === "optional" || schema.type === "nullable" || schema.type === "non_nullable") {
        return getBaseType(schema.wrapped!)
    }
    if (schema.type === "pipe") {
        return getBaseType(schema.pipe![0]!)
    }
    if (schema.type === "array") {
        const itemType = getBaseType(schema.item!)
        return `${itemType}[]`
    }
    if (schema.type === "object") {
        return "object"
    }
    if (schema.type === "picklist") {
        return schema.options?.join(" | ") ?? "string"
    }
    return schema.type
}

function isOptional(schema: SchemaLike): boolean {
    if (schema.type === "optional") return true
    if (schema.type === "nullable") return true
    if (schema.type === "non_nullable" || schema.type === "pipe") return false
    return false
}

function extractFields(schema: SchemaLike): { name: string; type: string; required: boolean }[] {
    if (schema.type !== "object" || !schema.entries) return []

    return Object.entries(schema.entries).map(([name, fieldSchema]) => ({
        name,
        type: getBaseType(fieldSchema),
        required: !isOptional(fieldSchema),
    }))
}

function extractReturnFields(
    schema: SchemaLike,
): { name: string; type: string }[] | { isArray: true; fields: { name: string; type: string }[] } {
    if (schema.type === "array" && schema.item) {
        const fields = extractFields(schema.item).map(({ name, type }) => ({ name, type }))
        return { isArray: true, fields }
    }
    return extractFields(schema).map(({ name, type }) => ({ name, type }))
}

function FieldTable(props: { fields: { name: string; type: string; required?: boolean }[]; showRequired: boolean }) {
    if (props.fields.length === 0) {
        return (
            <div
                className={css({
                    fontSize: "sm",
                    color: "neutral/50",
                    fontStyle: "italic",
                    padding: "1rem",
                })}
            >
                Aucun champ requis
            </div>
        )
    }

    return (
        <table
            className={css({
                width: "100%",
                borderCollapse: "collapse",
            })}
        >
            <thead>
                <tr
                    className={css({
                        backgroundColor: "neutral/5",
                        borderBottom: "1px solid",
                        borderColor: "neutral/10",
                    })}
                >
                    <th
                        className={css({
                            padding: "0.5rem 0.75rem",
                            textAlign: "left",
                            fontSize: "xs",
                            fontWeight: "semibold",
                            color: "neutral/60",
                            textTransform: "uppercase",
                            letterSpacing: "wider",
                        })}
                    >
                        Champ
                    </th>
                    <th
                        className={css({
                            padding: "0.5rem 0.75rem",
                            textAlign: "left",
                            fontSize: "xs",
                            fontWeight: "semibold",
                            color: "neutral/60",
                            textTransform: "uppercase",
                            letterSpacing: "wider",
                        })}
                    >
                        Type
                    </th>
                    {props.showRequired && (
                        <th
                            className={css({
                                padding: "0.5rem 0.75rem",
                                textAlign: "left",
                                fontSize: "xs",
                                fontWeight: "semibold",
                                color: "neutral/60",
                                textTransform: "uppercase",
                                letterSpacing: "wider",
                            })}
                        >
                            Requis
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {props.fields.map((field) => (
                    <tr
                        key={field.name}
                        className={css({
                            borderBottom: "1px solid",
                            borderColor: "neutral/10",
                            _last: { borderBottom: "none" },
                            _hover: { backgroundColor: "neutral/3" },
                            transition: "colors",
                        })}
                    >
                        <td
                            className={css({
                                padding: "0.5rem 0.75rem",
                                fontSize: "sm",
                                color: "neutral",
                                fontFamily: "mono",
                            })}
                        >
                            {field.name}
                        </td>
                        <td
                            className={css({
                                padding: "0.5rem 0.75rem",
                                fontSize: "sm",
                                color: "neutral/70",
                                fontFamily: "mono",
                            })}
                        >
                            {field.type}
                        </td>
                        {props.showRequired && (
                            <td
                                className={css({
                                    padding: "0.5rem 0.75rem",
                                    fontSize: "sm",
                                    color: field.required ? "primary" : "neutral/50",
                                })}
                            >
                                {field.required ? "oui" : "non"}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

type Tab = "body" | "response"

export function DocRouteRequest(props: { routeDefinition: ReturnType<typeof routeDefinition>; description?: string }) {
    const [activeTab, setActiveTab] = useState<Tab>("body")

    const bodyFields = extractFields(props.routeDefinition.schemas.body as SchemaLike)
    const returnData = extractReturnFields(props.routeDefinition.schemas.return as SchemaLike)
    const isArrayReturn = !Array.isArray(returnData) && returnData.isArray
    const returnFields = isArrayReturn ? returnData.fields : (returnData as { name: string; type: string }[])

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
            {/* Header: method + path + headers */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    backgroundColor: "neutral/3",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "xs",
                            fontWeight: "bold",
                            paddingX: "0.5rem",
                            paddingY: "0.15rem",
                            borderRadius: "sm",
                            backgroundColor: "primary/10",
                            color: "primary",
                            textTransform: "uppercase",
                            letterSpacing: "wider",
                        })}
                    >
                        POST
                    </span>
                    <code
                        className={css({
                            fontSize: "sm",
                            fontFamily: "mono",
                            color: "neutral",
                            fontWeight: "semibold",
                        })}
                    >
                        {props.routeDefinition.path}
                    </code>
                </div>
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.15rem",
                    })}
                >
                    <span className={css({ fontSize: "xs", color: "neutral/50", fontFamily: "mono" })}>
                        Content-Type: application/json
                    </span>
                    <span className={css({ fontSize: "xs", color: "neutral/50", fontFamily: "mono" })}>
                        Authorization: Bearer {"<clé>"}
                    </span>
                </div>
            </div>

            {/* Description */}
            {props.description && (
                <div
                    className={css({
                        padding: "0.5rem 0.75rem",
                        fontSize: "sm",
                        color: "neutral/70",
                        lineHeight: "1.75",
                        borderBottom: "1px solid",
                        borderColor: "neutral/10",
                    })}
                >
                    {props.description}
                </div>
            )}

            {/* Tabs */}
            <div
                className={css({
                    display: "flex",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10",
                })}
            >
                <button
                    type="button"
                    onClick={() => setActiveTab("body")}
                    className={css({
                        padding: "0.5rem 0.75rem",
                        fontSize: "xs",
                        fontWeight: "semibold",
                        color: activeTab === "body" ? "primary" : "neutral/50",
                        borderBottom: "2px solid",
                        borderColor: activeTab === "body" ? "primary" : "transparent",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        _hover: { color: activeTab === "body" ? "primary" : "neutral/70" },
                    })}
                >
                    Requête{bodyFields.length > 0 ? ` (${bodyFields.length})` : ""}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("response")}
                    className={css({
                        padding: "0.5rem 0.75rem",
                        fontSize: "xs",
                        fontWeight: "semibold",
                        color: activeTab === "response" ? "primary" : "neutral/50",
                        borderBottom: "2px solid",
                        borderColor: activeTab === "response" ? "primary" : "transparent",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        _hover: { color: activeTab === "response" ? "primary" : "neutral/70" },
                    })}
                >
                    Réponse{isArrayReturn ? " (tableau)" : returnFields.length > 0 ? ` (${returnFields.length})` : ""}
                </button>
            </div>

            {/* Tab content */}
            <div className={css({ overflowX: "auto" })}>
                {activeTab === "body" && <FieldTable fields={bodyFields} showRequired={true} />}
                {activeTab === "response" && <FieldTable fields={returnFields} showRequired={false} />}
            </div>
        </div>
    )
}
