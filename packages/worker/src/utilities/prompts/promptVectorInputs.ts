export function promptVectorInputs() {
    const jsonPrompt = {
        role: "You are an expert in biomedical information retrieval generating query expansion for a semantic search engine.",
        task: "Your task is to analyze the query issued by the user of an evidence-based clinical decision support system and break it down into a list of paraphrases which, once vectorized, will enable to retrieve relevant, factual, clear, diverse and precise information in the medical literature, to answer the query as accurately as possible.",
        constraints: [
            "Generate an exact total of 5 paraphrases.",
            "Paraphrases must be in the english language even if the query is in another language.",
            "Be sure each of the 5 paraphrases are diverse, avoid redundancy.",
            "Each paraphrase must contain at least 10 very specific keywords.",
            "Ensure all paraphrases and keywords within are relevant, clear, precise, and optimized for specific effective vectorized literature retrieval.",
        ],
        examples: [
            {
                input: "What is the initial treatment of advanced (stage III-IV) classic Hodgkin lymphoma ?",
                output: {
                    inputs: [
                        "Initial management of advanced Hodgkin lymphoma addresses escalated BEACOPP, ABVD backbone, B symptoms, prognostic index, PET imaging, Reed-Sternberg cells, bulky mediastinal disease, therapy-induced neutropenia, supportive growth factors, and remission consolidation.",
                        "Recommended treatment protocols for stage III-IV classical Hodgkin lymphoma involve combination chemotherapy, immunomodulatory agents, precise CT staging, FDG-PET criteria, bleomycin toxicity assessment, radiation field planning, fertility preservation strategies, differential diagnosis of lymphadenopathy, prognostic scoring, and salvage autologous transplantation.",
                        "Standard frontline therapy for advanced Hodgkin lymphoma enacompasses doxorubicin-based regimens, Deauville score evaluation, bulky nodal burden, escalated-dose intensity, PET-adapted cycles, second-line high-dose rescue, immunotherapy-based consolidation, older patient comorbidities, prechemotherapy pulmonary function tests, and follow-up intervals.",
                        "Mitigation of bleomycin-induced pulmonary injury in Hodgkin lymphoma includes baseline spirometry, cumulative dose monitoring, forced vital capacity measurement, early symptom identification, high-resolution CT evaluation, alternative anthracycline regimens, supportive oxygen therapy, steroid interventions, alveolar toxicity prevention, and vigilant follow-up scans.",
                        "Preserving fertility among advanced Hodgkin lymphoma patients receiving alkylating chemotherapy necessitates sperm banking options, oocyte cryopreservation, gonadotropin-releasing hormone analogs, ovarian shielding techniques, fertility counseling sessions, hormonal reserve evaluations, assisted reproductive technologies, oncofertility programs, prophylactic hormone therapy, and future pregnancy planning.",
                    ],
                },
            },
            {
                input: "I want to know about the management and prognosis of bullous pemphigoid.",
                output: {
                    inputs: [
                        [
                            "Management of bullous pemphigoid involves potent topical corticosteroids, systemic immunomodulators, subepidermal blister stabilization, pruritus attenuation, dermal basement membrane autoantibodies, anti-inflammatory dosing strategies, cutaneous wound surveillance, hyperkeratotic plaque reduction, chronic relapse prevention, and geriatric comorbidity management.",
                            "Therapeutic approaches to bullous pemphigoid emphasize oral glucocorticoid therapy, nicotinamide augmentation, antibiotic adjuncts like doxycycline, mucosal lesion surveillance, immunosuppressive regimens, long-term remission monitoring, comprehensive skin examination, biopsy confirmation of pathology, patient adherence challenges, and adverse event minimization.",
                            "Prognosis of bullous pemphigoid incorporates morbidity factors, functional assessments, mortality correlation in elderly populations, autoantibody titer monitoring, prognostic scoring indices, systemic steroid taper schedules, risk-based follow-up intervals, preventive infection control, subepidermal blister remodeling, and comorbidity impact evaluations.",
                            "Bullous pemphigoid clinical care involves clarifying differential diagnoses, immunofluorescence-based confirmation, careful transition to steroid-sparing agents, blister fluid management, localized versus generalized involvement decisions, topical clobetasol protocols, geriatric polypharmacy considerations, potential biologic interventions, supportive emollient usage, and remission-induction timing.",
                            "Long-term disease control for bullous pemphigoid relies on high-potency topical regimens, vigilant infection surveillance, therapeutic dose adjustments, histopathologic subepidermal cleavage identification, predisposing medication cessation, immunoglobulin E modulation, allergic hypersensitivity caution, geriatric fall risk assessment, healing rate tracking, and psychosocial support frameworks.",
                        ],
                    ],
                },
            },
        ],
    }
    return JSON.stringify(jsonPrompt)
}
