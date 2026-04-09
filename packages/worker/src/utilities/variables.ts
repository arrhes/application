export const aiModels = <const>{
    "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
    "DeepSeek-R1-Distill-Llama-70B": "DeepSeek-R1-Distill-Llama-70B",
    "Qwen3-32B": "Qwen3-32B",
    "gpt-4o-mini": "gpt-4o-mini",
    "gpt-4o": "gpt-4o",
    "o4-mini": "o4-mini",
}
export const tokenLimit = 75000

export const steps = <const>{
    "processing-the-query": {
        id: "processing-the-query",
        label: "Processing the query",
    },
    "retrieving-context": {
        id: "retrieving-context",
        label: "Retrieving the scientific context",
    },
    "generating-answer": {
        id: "generating-answer",
        label: "Generating the answer",
    },
    "retrieving-papers": {
        id: "retrieving-papers",
        label: "Retrieving the most accurate papers",
    },
    "structuring-answer": {
        id: "structuring-answer",
        label: "Structuring the answer",
    },
}
