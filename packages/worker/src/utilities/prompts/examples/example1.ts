import type { answerArticleAlphaSchema } from "@evidencesystem/schemas/components"
import type * as v from "valibot"

export const example1: v.InferOutput<typeof answerArticleAlphaSchema> = {
    content: [
        {
            type: "section",
            content: {
                header: {
                    level: 2,
                    content: "Diagnostic algorithm (decision‑tree",
                },
                body: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: ["bold"],
                                content: "Suspected superficial vein thrombosis",
                            },
                            {
                                type: "string",
                                emphasis: null,
                                content: " → duplex ultrasound of superficial and deep systems",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "list",
                        order: "unordered",
                        content: [
                            {
                                index: 0,
                                content: {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "string",
                                            emphasis: ["bold"],
                                            content: "If",
                                        },
                                        {
                                            type: "string",
                                            emphasis: null,
                                            content: " axial superficial vein thrombosis confirmed",
                                        },
                                    ],
                                    references: null,
                                },
                            },
                            {
                                index: 1,
                                content: {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "string",
                                            emphasis: null,
                                            content: "measure length and distance from junctions",
                                        },
                                    ],
                                    references: null,
                                },
                            },
                            {
                                index: 2,
                                content: {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "string",
                                            emphasis: null,
                                            content: "assign risk category as above",
                                        },
                                    ],
                                    references: null,
                                },
                            },
                            {
                                index: 3,
                                content: {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "string",
                                            emphasis: ["bold"],
                                            content: "If",
                                        },
                                        {
                                            type: "string",
                                            emphasis: null,
                                            content:
                                                " tributary‑only thrombosis → supportive care, follow‑up ultrasound if symptoms progress.",
                                        },
                                    ],
                                    references: null,
                                },
                            },
                        ],
                    },
                ],
            },
        },
        {
            type: "section",
            content: {
                header: {
                    level: 2,
                    content: "Treatment of intermediate‑risk superficial vein thrombosis",
                },
                body: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: ["bold"],
                                content: "Exact schemes",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "table",
                        content: {
                            headers: [
                                {
                                    xIndex: 0,
                                    content: {
                                        type: "string",
                                        emphasis: null,
                                        content: "Drug",
                                    },
                                },
                                {
                                    xIndex: 1,
                                    content: {
                                        type: "string",
                                        emphasis: null,
                                        content: "Dose",
                                    },
                                },
                                {
                                    xIndex: 2,
                                    content: {
                                        type: "string",
                                        emphasis: null,
                                        content: "Route",
                                    },
                                },
                                {
                                    xIndex: 3,
                                    content: {
                                        type: "string",
                                        emphasis: null,
                                        content: "Frequency",
                                    },
                                },
                                {
                                    xIndex: 4,
                                    content: {
                                        type: "string",
                                        emphasis: null,
                                        content: "Duration",
                                    },
                                },
                            ],
                            body: [
                                [
                                    {
                                        xIndex: 0,
                                        yIndex: 0,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Fondaparinux",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 1,
                                        yIndex: 0,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "2.5 mg",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 2,
                                        yIndex: 0,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Subcutaneous",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 3,
                                        yIndex: 0,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Once daily",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 4,
                                        yIndex: 0,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "45 days",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                ],
                                [
                                    {
                                        xIndex: 0,
                                        yIndex: 1,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Dalteparin",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 1,
                                        yIndex: 1,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "5 000 international units",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 2,
                                        yIndex: 1,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Subcutaneous",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 3,
                                        yIndex: 1,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Every 12 hours",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 4,
                                        yIndex: 1,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "45 days",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                ],
                                [
                                    {
                                        xIndex: 0,
                                        yIndex: 2,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Enoxaparin",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 1,
                                        yIndex: 2,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "40 mg",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 2,
                                        yIndex: 2,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Subcutaneous",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 3,
                                        yIndex: 2,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Once daily",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 4,
                                        yIndex: 2,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "45 days",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                ],
                                [
                                    {
                                        xIndex: 0,
                                        yIndex: 3,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Rivaroxaban",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 1,
                                        yIndex: 3,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "10 mg",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 2,
                                        yIndex: 3,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Oral",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 3,
                                        yIndex: 3,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "Once daily",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                    {
                                        xIndex: 4,
                                        yIndex: 3,
                                        content: {
                                            type: "paragraph",
                                            content: [
                                                {
                                                    type: "string",
                                                    emphasis: null,
                                                    content: "45 days",
                                                },
                                            ],
                                            references: null,
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
        },
        {
            type: "section",
            content: {
                header: {
                    level: 2,
                    content: "Supportive measures",
                },
                body: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content:
                                    "Class II or higher graduated compression stocking covering thrombosed segment.",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content: "Limb elevation to waist level.",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content: "Cool or warm compresses as tolerated.",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content:
                                    "Avoid non‑steroidal anti‑inflammatory drugs once anticoagulation is started to limit bleeding risk.",
                            },
                        ],
                        references: null,
                    },
                ],
            },
        },
        {
            type: "section",
            content: {
                header: {
                    level: 2,
                    content: "Follow‑up",
                },
                body: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content:
                                    "Reassess clinically at 7–10 days; repeat duplex ultrasound if pain, erythema, or cord length increase.",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content:
                                    "At day 45 obtain D‑dimer; persistent elevation suggests residual thrombus and may justify extended prophylaxis.",
                            },
                        ],
                        references: null,
                    },
                ],
            },
        },
        {
            type: "section",
            content: {
                header: {
                    level: 2,
                    content: "Prognosis",
                },
                body: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content:
                                    "With the above regimen the incidence of thrombo‑embolic complications at 47 days falls from ≈ 6 % to < 1 %.",
                            },
                        ],
                        references: null,
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "string",
                                emphasis: null,
                                content:
                                    "Recurrence risk rises if anticoagulation is stopped early; full 45‑day course is therefore recommended.",
                            },
                        ],
                        references: null,
                    },
                ],
            },
        },
    ],
}
