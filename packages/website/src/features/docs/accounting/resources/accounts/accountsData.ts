export interface CounterpartInfo {
    number: string
    label: string
}

export interface JournalExample {
    description: string
    rows: string[][]
}

export interface AccountEntry {
    number: string
    slug: string
    label: string
    description?: string
    classNumber: number
    className: string
    type: "bilan" | "résultat"
    side: "actif" | "passif" | "actif ou passif" | "charge" | "produit"
    isOptional: boolean
    parent: string | null
    usageTips: string[]
    counterpart: CounterpartInfo
    debitMeaning: string
    creditMeaning: string
    journalExample: JournalExample
}

function toSlug(number: string): string {
    return number
}

function defineAccount(
    number: string,
    label: string,
    options: {
        description?: string
        classNumber: number
        className: string
        type: "bilan" | "résultat"
        side: "actif" | "passif" | "actif ou passif" | "charge" | "produit"
        isOptional: boolean
        parent: string | null
        counterpart: CounterpartInfo
        usageTips: string[]
        debitMeaning: string
        creditMeaning: string
        journalExample: JournalExample
    },
): AccountEntry {
    return {
        number,
        slug: toSlug(number),
        label,
        description: options.description,
        classNumber: options.classNumber,
        className: options.className,
        type: options.type,
        side: options.side,
        isOptional: options.isOptional,
        parent: options.parent,
        counterpart: options.counterpart,
        usageTips: options.usageTips,
        debitMeaning: options.debitMeaning,
        creditMeaning: options.creditMeaning,
        journalExample: options.journalExample,
    }
}

export const accountEntries: AccountEntry[] = [
    // Classe 1 - Comptes de capitaux
    defineAccount("1", "Comptes de capitaux", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: null,
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de comptes de capitaux",
        creditMeaning: "Augmentation de comptes de capitaux",
        journalExample: {
            description: "Écriture type pour le compte 1 - Comptes de capitaux",
            rows: [
                ["512", "Banques", "X", ""],
                ["1", "Comptes de capitaux", "", "X"],
            ],
        },
    }),
    defineAccount("10", "Capital et réserves", {
        description: "Apports des associés et bénéfices accumulés conservés dans l'entité.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital et réserves",
        creditMeaning: "Augmentation de capital et réserves",
        journalExample: {
            description: "Écriture type pour le compte 10 - Capital et réserves",
            rows: [
                ["512", "Banques", "X", ""],
                ["10", "Capital et réserves", "", "X"],
            ],
        },
    }),
    defineAccount("101", "Capital", {
        description: "Capital social ou individuel de l'organisation.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital",
        creditMeaning: "Augmentation de capital",
        journalExample: {
            description: "Écriture type pour le compte 101 - Capital",
            rows: [
                ["512", "Banques", "X", ""],
                ["101", "Capital", "", "X"],
            ],
        },
    }),
    defineAccount("1011", "Capital souscrit - non appelé", {
        description: "Part du capital souscrit par les associés mais non encore appelée par la société.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "101",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital souscrit - non appelé",
        creditMeaning: "Augmentation de capital souscrit - non appelé",
        journalExample: {
            description: "Écriture type pour le compte 1011 - Capital souscrit - non appelé",
            rows: [
                ["512", "Banques", "X", ""],
                ["1011", "Capital souscrit - non appelé", "", "X"],
            ],
        },
    }),
    defineAccount("1012", "Capital souscrit - appelé, non versé", {
        description: "Part du capital appelée par la société mais non encore versée par les associés.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "101",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital souscrit - appelé, non versé",
        creditMeaning: "Augmentation de capital souscrit - appelé, non versé",
        journalExample: {
            description: "Écriture type pour le compte 1012 - Capital souscrit - appelé, non versé",
            rows: [
                ["512", "Banques", "X", ""],
                ["1012", "Capital souscrit - appelé, non versé", "", "X"],
            ],
        },
    }),
    defineAccount("1013", "Capital souscrit - appelé, versé", {
        description: "Part du capital appelée et effectivement versée par les associés.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "101",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital souscrit - appelé, versé",
        creditMeaning: "Augmentation de capital souscrit - appelé, versé",
        journalExample: {
            description: "Écriture type pour le compte 1013 - Capital souscrit - appelé, versé",
            rows: [
                ["512", "Banques", "X", ""],
                ["1013", "Capital souscrit - appelé, versé", "", "X"],
            ],
        },
    }),
    defineAccount("10131", "Capital non amorti", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1013",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital non amorti",
        creditMeaning: "Augmentation de capital non amorti",
        journalExample: {
            description: "Écriture type pour le compte 10131 - Capital non amorti",
            rows: [
                ["512", "Banques", "X", ""],
                ["10131", "Capital non amorti", "", "X"],
            ],
        },
    }),
    defineAccount("10132", "Capital amorti", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1013",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital amorti",
        creditMeaning: "Augmentation de capital amorti",
        journalExample: {
            description: "Écriture type pour le compte 10132 - Capital amorti",
            rows: [
                ["512", "Banques", "X", ""],
                ["10132", "Capital amorti", "", "X"],
            ],
        },
    }),
    defineAccount("1018", "Capital souscrit soumis à des réglementations particulières", {
        description:
            "Capital provenant d'opérations particulières isolées en application de dispositions législatives et réglementaires.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "101",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de capital souscrit soumis à des réglementations particulières",
        creditMeaning: "Augmentation de capital souscrit soumis à des réglementations particulières",
        journalExample: {
            description:
                "Écriture type pour le compte 1018 - Capital souscrit soumis à des réglementations particulières",
            rows: [
                ["512", "Banques", "X", ""],
                ["1018", "Capital souscrit soumis à des réglementations particulières", "", "X"],
            ],
        },
    }),
    defineAccount("102", "Fonds fiduciaires", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de fonds fiduciaires",
        creditMeaning: "Augmentation de fonds fiduciaires",
        journalExample: {
            description: "Écriture type pour le compte 102 - Fonds fiduciaires",
            rows: [
                ["512", "Banques", "X", ""],
                ["102", "Fonds fiduciaires", "", "X"],
            ],
        },
    }),
    defineAccount("104", "Primes liées au capital", {
        description: "Primes d'émission, de fusion, d'apport et de conversion d'obligations en actions.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de primes liées au capital",
        creditMeaning: "Augmentation de primes liées au capital",
        journalExample: {
            description: "Écriture type pour le compte 104 - Primes liées au capital",
            rows: [
                ["512", "Banques", "X", ""],
                ["104", "Primes liées au capital", "", "X"],
            ],
        },
    }),
    defineAccount("1041", "Primes d'émission", {
        description:
            "Différence entre le prix d'émission et la valeur nominale des actions lors d'une augmentation de capital.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "104",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de primes d'émission",
        creditMeaning: "Augmentation de primes d'émission",
        journalExample: {
            description: "Écriture type pour le compte 1041 - Primes d'émission",
            rows: [
                ["512", "Banques", "X", ""],
                ["1041", "Primes d'émission", "", "X"],
            ],
        },
    }),
    defineAccount("1042", "Primes de fusion", {
        description:
            "Différence entre la valeur des titres remis et la valeur nominale des actions émises lors d'une fusion.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "104",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de primes de fusion",
        creditMeaning: "Augmentation de primes de fusion",
        journalExample: {
            description: "Écriture type pour le compte 1042 - Primes de fusion",
            rows: [
                ["512", "Banques", "X", ""],
                ["1042", "Primes de fusion", "", "X"],
            ],
        },
    }),
    defineAccount("1043", "Primes d'apport", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "104",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de primes d'apport",
        creditMeaning: "Augmentation de primes d'apport",
        journalExample: {
            description: "Écriture type pour le compte 1043 - Primes d'apport",
            rows: [
                ["512", "Banques", "X", ""],
                ["1043", "Primes d'apport", "", "X"],
            ],
        },
    }),
    defineAccount("1044", "Primes de conversion d'obligations en actions", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "104",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de primes de conversion d'obligations en actions",
        creditMeaning: "Augmentation de primes de conversion d'obligations en actions",
        journalExample: {
            description: "Écriture type pour le compte 1044 - Primes de conversion d'obligations en actions",
            rows: [
                ["512", "Banques", "X", ""],
                ["1044", "Primes de conversion d'obligations en actions", "", "X"],
            ],
        },
    }),
    defineAccount("1045", "Bons de souscription de titres en capital", {
        description:
            "Un bon de souscription est un instrument financier dérivé permettant de souscrire pendant une période déterminée à un autre titre financier à un prix fixé à l'avance. Il est émis par la société et peut porter sur de nouvelles actions (augmentation de capital) ou obligations.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "104",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de bons de souscription de titres en capital",
        creditMeaning: "Augmentation de bons de souscription de titres en capital",
        journalExample: {
            description: "Écriture type pour le compte 1045 - Bons de souscription de titres en capital",
            rows: [
                ["512", "Banques", "X", ""],
                ["1045", "Bons de souscription de titres en capital", "", "X"],
            ],
        },
    }),
    defineAccount("105", "Écarts de réévaluation", {
        description:
            "Écarts constatés à l'occasion d'opérations de réévaluation des actifs, pouvant être incorporés au capital.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de écarts de réévaluation",
        creditMeaning: "Augmentation de écarts de réévaluation",
        journalExample: {
            description: "Écriture type pour le compte 105 - Écarts de réévaluation",
            rows: [
                ["512", "Banques", "X", ""],
                ["105", "Écarts de réévaluation", "", "X"],
            ],
        },
    }),
    defineAccount("106", "Réserves", {
        description: "Bénéfices antérieurs conservés dans l'organisation.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de réserves",
        creditMeaning: "Augmentation de réserves",
        journalExample: {
            description: "Écriture type pour le compte 106 - Réserves",
            rows: [
                ["512", "Banques", "X", ""],
                ["106", "Réserves", "", "X"],
            ],
        },
    }),
    defineAccount("1061", "Réserve légale", {
        description: "Fraction du bénéfice affectée obligatoirement à la réserve en application de la loi.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "106",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de réserve légale",
        creditMeaning: "Augmentation de réserve légale",
        journalExample: {
            description: "Écriture type pour le compte 1061 - Réserve légale",
            rows: [
                ["512", "Banques", "X", ""],
                ["1061", "Réserve légale", "", "X"],
            ],
        },
    }),
    defineAccount("1062", "Réserves indisponibles", {
        description: "Réserves dont la distribution est interdite, par exemple les réserves pour actions propres.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "106",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de réserves indisponibles",
        creditMeaning: "Augmentation de réserves indisponibles",
        journalExample: {
            description: "Écriture type pour le compte 1062 - Réserves indisponibles",
            rows: [
                ["512", "Banques", "X", ""],
                ["1062", "Réserves indisponibles", "", "X"],
            ],
        },
    }),
    defineAccount("1063", "Réserves statutaires ou contractuelles", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "106",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de réserves statutaires ou contractuelles",
        creditMeaning: "Augmentation de réserves statutaires ou contractuelles",
        journalExample: {
            description: "Écriture type pour le compte 1063 - Réserves statutaires ou contractuelles",
            rows: [
                ["512", "Banques", "X", ""],
                ["1063", "Réserves statutaires ou contractuelles", "", "X"],
            ],
        },
    }),
    defineAccount("1064", "Réserves réglementées", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "106",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de réserves réglementées",
        creditMeaning: "Augmentation de réserves réglementées",
        journalExample: {
            description: "Écriture type pour le compte 1064 - Réserves réglementées",
            rows: [
                ["512", "Banques", "X", ""],
                ["1064", "Réserves réglementées", "", "X"],
            ],
        },
    }),
    defineAccount("1068", "Autres réserves", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "106",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres réserves",
        creditMeaning: "Augmentation de autres réserves",
        journalExample: {
            description: "Écriture type pour le compte 1068 - Autres réserves",
            rows: [
                ["512", "Banques", "X", ""],
                ["1068", "Autres réserves", "", "X"],
            ],
        },
    }),
    defineAccount("107", "Écart d'équivalence", {
        description:
            "Écart constaté lorsque la valeur globale des titres évalués par équivalence est supérieure à leur coût d'acquisition.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de écart d'équivalence",
        creditMeaning: "Augmentation de écart d'équivalence",
        journalExample: {
            description: "Écriture type pour le compte 107 - Écart d'équivalence",
            rows: [
                ["512", "Banques", "X", ""],
                ["107", "Écart d'équivalence", "", "X"],
            ],
        },
    }),
    defineAccount("108", "Compte de l'exploitant", {
        description: "Mouvements entre le patrimoine professionnel et personnel de l'exploitant individuel.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de compte de l'exploitant",
        creditMeaning: "Augmentation de compte de l'exploitant",
        journalExample: {
            description: "Écriture type pour le compte 108 - Compte de l'exploitant",
            rows: [
                ["512", "Banques", "X", ""],
                ["108", "Compte de l'exploitant", "", "X"],
            ],
        },
    }),
    defineAccount("109", "Actionnaires : capital souscrit - non appelé", {
        description: "Créance de la société sur ses actionnaires pour la part du capital souscrit non encore appelée.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "10",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de actionnaires : capital souscrit - non appelé",
        creditMeaning: "Augmentation de actionnaires : capital souscrit - non appelé",
        journalExample: {
            description: "Écriture type pour le compte 109 - Actionnaires : capital souscrit - non appelé",
            rows: [
                ["512", "Banques", "X", ""],
                ["109", "Actionnaires : capital souscrit - non appelé", "", "X"],
            ],
        },
    }),
    defineAccount("11", "Report à nouveau", {
        description: "Bénéfices ou pertes des exercices antérieurs non encore affectés.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de report à nouveau",
        creditMeaning: "Augmentation de report à nouveau",
        journalExample: {
            description: "Écriture type pour le compte 11 - Report à nouveau",
            rows: [
                ["512", "Banques", "X", ""],
                ["11", "Report à nouveau", "", "X"],
            ],
        },
    }),
    defineAccount("110", "Report à nouveau - solde créditeur", {
        description: "Bénéfices antérieurs non distribués et non affectés à un compte de réserves.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "11",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de report à nouveau - solde créditeur",
        creditMeaning: "Augmentation de report à nouveau - solde créditeur",
        journalExample: {
            description: "Écriture type pour le compte 110 - Report à nouveau - solde créditeur",
            rows: [
                ["512", "Banques", "X", ""],
                ["110", "Report à nouveau - solde créditeur", "", "X"],
            ],
        },
    }),
    defineAccount("119", "Report à nouveau - solde débiteur", {
        description: "Pertes antérieures non encore absorbées.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "11",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de report à nouveau - solde débiteur",
        creditMeaning: "Augmentation de report à nouveau - solde débiteur",
        journalExample: {
            description: "Écriture type pour le compte 119 - Report à nouveau - solde débiteur",
            rows: [
                ["512", "Banques", "X", ""],
                ["119", "Report à nouveau - solde débiteur", "", "X"],
            ],
        },
    }),
    defineAccount("12", "Résultat de l'exercice", {
        description: "Bénéfice ou perte de l'exercice en cours.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de résultat de l'exercice",
        creditMeaning: "Augmentation de résultat de l'exercice",
        journalExample: {
            description: "Écriture type pour le compte 12 - Résultat de l'exercice",
            rows: [
                ["512", "Banques", "X", ""],
                ["12", "Résultat de l'exercice", "", "X"],
            ],
        },
    }),
    defineAccount("120", "Résultat de l'exercice - bénéfice", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "12",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de résultat de l'exercice - bénéfice",
        creditMeaning: "Augmentation de résultat de l'exercice - bénéfice",
        journalExample: {
            description: "Écriture type pour le compte 120 - Résultat de l'exercice - bénéfice",
            rows: [
                ["512", "Banques", "X", ""],
                ["120", "Résultat de l'exercice - bénéfice", "", "X"],
            ],
        },
    }),
    defineAccount("1209", "Acomptes sur dividendes", {
        description: "Acomptes de dividendes versés avant l'approbation des comptes de l'exercice.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "120",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de acomptes sur dividendes",
        creditMeaning: "Augmentation de acomptes sur dividendes",
        journalExample: {
            description: "Écriture type pour le compte 1209 - Acomptes sur dividendes",
            rows: [
                ["512", "Banques", "X", ""],
                ["1209", "Acomptes sur dividendes", "", "X"],
            ],
        },
    }),
    defineAccount("129", "Résultat de l'exercice – perte", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "12",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de résultat de l'exercice – perte",
        creditMeaning: "Augmentation de résultat de l'exercice – perte",
        journalExample: {
            description: "Écriture type pour le compte 129 - Résultat de l'exercice – perte",
            rows: [
                ["512", "Banques", "X", ""],
                ["129", "Résultat de l'exercice – perte", "", "X"],
            ],
        },
    }),
    defineAccount("13", "Subventions d'investissement", {
        description: "Subventions reçues pour acquérir ou créer des immobilisations.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de subventions d'investissement",
        creditMeaning: "Augmentation de subventions d'investissement",
        journalExample: {
            description: "Écriture type pour le compte 13 - Subventions d'investissement",
            rows: [
                ["512", "Banques", "X", ""],
                ["13", "Subventions d'investissement", "", "X"],
            ],
        },
    }),
    defineAccount("131", "Subventions d'investissement octroyées", {
        description: "Montant des subventions d'investissement accordées à l'entité.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "13",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de subventions d'investissement octroyées",
        creditMeaning: "Augmentation de subventions d'investissement octroyées",
        journalExample: {
            description: "Écriture type pour le compte 131 - Subventions d'investissement octroyées",
            rows: [
                ["512", "Banques", "X", ""],
                ["131", "Subventions d'investissement octroyées", "", "X"],
            ],
        },
    }),
    defineAccount("139", "Subventions d'investissement inscrites au compte de résultat", {
        description: "Quote-part des subventions d'investissement virée au résultat de l'exercice.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "13",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de subventions d'investissement inscrites au compte de résultat",
        creditMeaning: "Augmentation de subventions d'investissement inscrites au compte de résultat",
        journalExample: {
            description:
                "Écriture type pour le compte 139 - Subventions d'investissement inscrites au compte de résultat",
            rows: [
                ["512", "Banques", "X", ""],
                ["139", "Subventions d'investissement inscrites au compte de résultat", "", "X"],
            ],
        },
    }),
    defineAccount("14", "Provisions réglementées", {
        description:
            "Provisions constituées en application de dispositions légales, dont le fonctionnement est identique aux provisions classiques.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions réglementées",
        creditMeaning: "Augmentation de provisions réglementées",
        journalExample: {
            description: "Écriture type pour le compte 14 - Provisions réglementées",
            rows: [
                ["512", "Banques", "X", ""],
                ["14", "Provisions réglementées", "", "X"],
            ],
        },
    }),
    defineAccount("143", "Provisions réglementées pour hausse de prix", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "14",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions réglementées pour hausse de prix",
        creditMeaning: "Augmentation de provisions réglementées pour hausse de prix",
        journalExample: {
            description: "Écriture type pour le compte 143 - Provisions réglementées pour hausse de prix",
            rows: [
                ["512", "Banques", "X", ""],
                ["143", "Provisions réglementées pour hausse de prix", "", "X"],
            ],
        },
    }),
    defineAccount("145", "Amortissements dérogatoires", {
        description:
            "Amortissements excédentaires par rapport à l'amortissement comptable, comptabilisés en application de textes particuliers.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "14",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de amortissements dérogatoires",
        creditMeaning: "Augmentation de amortissements dérogatoires",
        journalExample: {
            description: "Écriture type pour le compte 145 - Amortissements dérogatoires",
            rows: [
                ["512", "Banques", "X", ""],
                ["145", "Amortissements dérogatoires", "", "X"],
            ],
        },
    }),
    defineAccount("148", "Autres provisions réglementées", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "14",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres provisions réglementées",
        creditMeaning: "Augmentation de autres provisions réglementées",
        journalExample: {
            description: "Écriture type pour le compte 148 - Autres provisions réglementées",
            rows: [
                ["512", "Banques", "X", ""],
                ["148", "Autres provisions réglementées", "", "X"],
            ],
        },
    }),
    defineAccount("15", "Provisions", {
        description:
            "Passifs dont l'échéance ou le montant n'est pas fixé de façon précise, constitués pour couvrir des risques et charges probables.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions",
        creditMeaning: "Augmentation de provisions",
        journalExample: {
            description: "Écriture type pour le compte 15 - Provisions",
            rows: [
                ["512", "Banques", "X", ""],
                ["15", "Provisions", "", "X"],
            ],
        },
    }),
    defineAccount("151", "Provisions pour risques", {
        description:
            "Provisions destinées à couvrir des risques identifiés liés à l'exploitation, aux finances ou à des événements exceptionnels.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "15",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour risques",
        creditMeaning: "Augmentation de provisions pour risques",
        journalExample: {
            description: "Écriture type pour le compte 151 - Provisions pour risques",
            rows: [
                ["512", "Banques", "X", ""],
                ["151", "Provisions pour risques", "", "X"],
            ],
        },
    }),
    defineAccount("1511", "Provisions pour litiges", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "151",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour litiges",
        creditMeaning: "Augmentation de provisions pour litiges",
        journalExample: {
            description: "Écriture type pour le compte 1511 - Provisions pour litiges",
            rows: [
                ["512", "Banques", "X", ""],
                ["1511", "Provisions pour litiges", "", "X"],
            ],
        },
    }),
    defineAccount("1512", "Provisions pour garanties données aux clients", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "151",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour garanties données aux clients",
        creditMeaning: "Augmentation de provisions pour garanties données aux clients",
        journalExample: {
            description: "Écriture type pour le compte 1512 - Provisions pour garanties données aux clients",
            rows: [
                ["512", "Banques", "X", ""],
                ["1512", "Provisions pour garanties données aux clients", "", "X"],
            ],
        },
    }),
    defineAccount("1514", "Provisions pour amendes et pénalités", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "151",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour amendes et pénalités",
        creditMeaning: "Augmentation de provisions pour amendes et pénalités",
        journalExample: {
            description: "Écriture type pour le compte 1514 - Provisions pour amendes et pénalités",
            rows: [
                ["512", "Banques", "X", ""],
                ["1514", "Provisions pour amendes et pénalités", "", "X"],
            ],
        },
    }),
    defineAccount("1515", "Provisions pour pertes de change", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "151",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour pertes de change",
        creditMeaning: "Augmentation de provisions pour pertes de change",
        journalExample: {
            description: "Écriture type pour le compte 1515 - Provisions pour pertes de change",
            rows: [
                ["512", "Banques", "X", ""],
                ["1515", "Provisions pour pertes de change", "", "X"],
            ],
        },
    }),
    defineAccount("1516", "Provisions pour pertes sur contrats", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "151",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour pertes sur contrats",
        creditMeaning: "Augmentation de provisions pour pertes sur contrats",
        journalExample: {
            description: "Écriture type pour le compte 1516 - Provisions pour pertes sur contrats",
            rows: [
                ["512", "Banques", "X", ""],
                ["1516", "Provisions pour pertes sur contrats", "", "X"],
            ],
        },
    }),
    defineAccount("1518", "Autres provisions pour risques", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "151",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres provisions pour risques",
        creditMeaning: "Augmentation de autres provisions pour risques",
        journalExample: {
            description: "Écriture type pour le compte 1518 - Autres provisions pour risques",
            rows: [
                ["512", "Banques", "X", ""],
                ["1518", "Autres provisions pour risques", "", "X"],
            ],
        },
    }),
    defineAccount("152", "Provisions pour charges", {
        description:
            "Provisions destinées à couvrir des charges futures probables comme les pensions, restructurations ou gros entretien.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "15",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour charges",
        creditMeaning: "Augmentation de provisions pour charges",
        journalExample: {
            description: "Écriture type pour le compte 152 - Provisions pour charges",
            rows: [
                ["512", "Banques", "X", ""],
                ["152", "Provisions pour charges", "", "X"],
            ],
        },
    }),
    defineAccount("1521", "Provisions pour pensions et obligations similaires", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour pensions et obligations similaires",
        creditMeaning: "Augmentation de provisions pour pensions et obligations similaires",
        journalExample: {
            description: "Écriture type pour le compte 1521 - Provisions pour pensions et obligations similaires",
            rows: [
                ["512", "Banques", "X", ""],
                ["1521", "Provisions pour pensions et obligations similaires", "", "X"],
            ],
        },
    }),
    defineAccount("1522", "Provisions pour restructurations", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour restructurations",
        creditMeaning: "Augmentation de provisions pour restructurations",
        journalExample: {
            description: "Écriture type pour le compte 1522 - Provisions pour restructurations",
            rows: [
                ["512", "Banques", "X", ""],
                ["1522", "Provisions pour restructurations", "", "X"],
            ],
        },
    }),
    defineAccount("1523", "Provisions pour impôts", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour impôts",
        creditMeaning: "Augmentation de provisions pour impôts",
        journalExample: {
            description: "Écriture type pour le compte 1523 - Provisions pour impôts",
            rows: [
                ["512", "Banques", "X", ""],
                ["1523", "Provisions pour impôts", "", "X"],
            ],
        },
    }),
    defineAccount("1524", "Provisions pour renouvellement des immobilisations - entreprises concessionnaires", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour renouvellement des immobilisations - entreprises concessionnaires",
        creditMeaning:
            "Augmentation de provisions pour renouvellement des immobilisations - entreprises concessionnaires",
        journalExample: {
            description:
                "Écriture type pour le compte 1524 - Provisions pour renouvellement des immobilisations - entreprises concessionnaires",
            rows: [
                ["512", "Banques", "X", ""],
                ["1524", "Provisions pour renouvellement des immobilisations - entreprises concessionnaires", "", "X"],
            ],
        },
    }),
    defineAccount("1525", "Provisions pour gros entretien ou grandes révisions", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour gros entretien ou grandes révisions",
        creditMeaning: "Augmentation de provisions pour gros entretien ou grandes révisions",
        journalExample: {
            description: "Écriture type pour le compte 1525 - Provisions pour gros entretien ou grandes révisions",
            rows: [
                ["512", "Banques", "X", ""],
                ["1525", "Provisions pour gros entretien ou grandes révisions", "", "X"],
            ],
        },
    }),
    defineAccount("1526", "Provisions pour remise en état", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de provisions pour remise en état",
        creditMeaning: "Augmentation de provisions pour remise en état",
        journalExample: {
            description: "Écriture type pour le compte 1526 - Provisions pour remise en état",
            rows: [
                ["512", "Banques", "X", ""],
                ["1526", "Provisions pour remise en état", "", "X"],
            ],
        },
    }),
    defineAccount("1527", "Autres provisions pour charges", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "152",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres provisions pour charges",
        creditMeaning: "Augmentation de autres provisions pour charges",
        journalExample: {
            description: "Écriture type pour le compte 1527 - Autres provisions pour charges",
            rows: [
                ["512", "Banques", "X", ""],
                ["1527", "Autres provisions pour charges", "", "X"],
            ],
        },
    }),
    defineAccount("16", "Emprunts et dettes assimilées, fonds non remboursables et avances conditionnées", {
        description: "Emprunts bancaires et autres dettes à long terme.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de emprunts et dettes assimilées, fonds non remboursables et avances conditionnées",
        creditMeaning:
            "Augmentation de emprunts et dettes assimilées, fonds non remboursables et avances conditionnées",
        journalExample: {
            description:
                "Écriture type pour le compte 16 - Emprunts et dettes assimilées, fonds non remboursables et avances conditionnées",
            rows: [
                ["512", "Banques", "X", ""],
                ["16", "Emprunts et dettes assimilées, fonds non remboursables et avances conditionnées", "", "X"],
            ],
        },
    }),
    defineAccount("161", "Emprunts obligataires convertibles si non-inscrits dans le compte 167", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de emprunts obligataires convertibles si non-inscrits dans le compte 167",
        creditMeaning: "Augmentation de emprunts obligataires convertibles si non-inscrits dans le compte 167",
        journalExample: {
            description:
                "Écriture type pour le compte 161 - Emprunts obligataires convertibles si non-inscrits dans le compte 167",
            rows: [
                ["512", "Banques", "X", ""],
                ["161", "Emprunts obligataires convertibles si non-inscrits dans le compte 167", "", "X"],
            ],
        },
    }),
    defineAccount("1618", "Intérêts courus sur emprunts obligataires convertibles", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "161",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur emprunts obligataires convertibles",
        creditMeaning: "Augmentation de intérêts courus sur emprunts obligataires convertibles",
        journalExample: {
            description: "Écriture type pour le compte 1618 - Intérêts courus sur emprunts obligataires convertibles",
            rows: [
                ["512", "Banques", "X", ""],
                ["1618", "Intérêts courus sur emprunts obligataires convertibles", "", "X"],
            ],
        },
    }),
    defineAccount(
        "162",
        "Obligations représentatives de passifs nets remis en fiducie si non-inscrites dans le compte 167",
        {
            classNumber: 1,
            className: "Comptes de capitaux",
            type: "bilan",
            side: "passif",
            isOptional: false,
            parent: "16",
            counterpart: { number: "512", label: "Banques" },
            usageTips: [
                "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
            ],
            debitMeaning:
                "Diminution de obligations représentatives de passifs nets remis en fiducie si non-inscrites dans le compte 167",
            creditMeaning:
                "Augmentation de obligations représentatives de passifs nets remis en fiducie si non-inscrites dans le compte 167",
            journalExample: {
                description:
                    "Écriture type pour le compte 162 - Obligations représentatives de passifs nets remis en fiducie si non-inscrites dans le compte 167",
                rows: [
                    ["512", "Banques", "X", ""],
                    [
                        "162",
                        "Obligations représentatives de passifs nets remis en fiducie si non-inscrites dans le compte 167",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("163", "Autres emprunts obligataires si non-inscrits dans le compte 167", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres emprunts obligataires si non-inscrits dans le compte 167",
        creditMeaning: "Augmentation de autres emprunts obligataires si non-inscrits dans le compte 167",
        journalExample: {
            description:
                "Écriture type pour le compte 163 - Autres emprunts obligataires si non-inscrits dans le compte 167",
            rows: [
                ["512", "Banques", "X", ""],
                ["163", "Autres emprunts obligataires si non-inscrits dans le compte 167", "", "X"],
            ],
        },
    }),
    defineAccount("1638", "Intérêts courus sur autres emprunts obligataires", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "163",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur autres emprunts obligataires",
        creditMeaning: "Augmentation de intérêts courus sur autres emprunts obligataires",
        journalExample: {
            description: "Écriture type pour le compte 1638 - Intérêts courus sur autres emprunts obligataires",
            rows: [
                ["512", "Banques", "X", ""],
                ["1638", "Intérêts courus sur autres emprunts obligataires", "", "X"],
            ],
        },
    }),
    defineAccount("164", "Emprunts auprès des établissements de crédit si non-inscrits dans le compte 167", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de emprunts auprès des établissements de crédit si non-inscrits dans le compte 167",
        creditMeaning:
            "Augmentation de emprunts auprès des établissements de crédit si non-inscrits dans le compte 167",
        journalExample: {
            description:
                "Écriture type pour le compte 164 - Emprunts auprès des établissements de crédit si non-inscrits dans le compte 167",
            rows: [
                ["512", "Banques", "X", ""],
                ["164", "Emprunts auprès des établissements de crédit si non-inscrits dans le compte 167", "", "X"],
            ],
        },
    }),
    defineAccount("1648", "Intérêts courus sur emprunts auprès des établissements de crédit", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "164",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur emprunts auprès des établissements de crédit",
        creditMeaning: "Augmentation de intérêts courus sur emprunts auprès des établissements de crédit",
        journalExample: {
            description:
                "Écriture type pour le compte 1648 - Intérêts courus sur emprunts auprès des établissements de crédit",
            rows: [
                ["512", "Banques", "X", ""],
                ["1648", "Intérêts courus sur emprunts auprès des établissements de crédit", "", "X"],
            ],
        },
    }),
    defineAccount("165", "Dépôts et cautionnements reçus", {
        description: "Sommes reçues de tiers à titre de garantie ou de caution.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de dépôts et cautionnements reçus",
        creditMeaning: "Augmentation de dépôts et cautionnements reçus",
        journalExample: {
            description: "Écriture type pour le compte 165 - Dépôts et cautionnements reçus",
            rows: [
                ["512", "Banques", "X", ""],
                ["165", "Dépôts et cautionnements reçus", "", "X"],
            ],
        },
    }),
    defineAccount("1651", "Dépôts", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "165",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de dépôts",
        creditMeaning: "Augmentation de dépôts",
        journalExample: {
            description: "Écriture type pour le compte 1651 - Dépôts",
            rows: [
                ["512", "Banques", "X", ""],
                ["1651", "Dépôts", "", "X"],
            ],
        },
    }),
    defineAccount("1655", "Cautionnements", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "165",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de cautionnements",
        creditMeaning: "Augmentation de cautionnements",
        journalExample: {
            description: "Écriture type pour le compte 1655 - Cautionnements",
            rows: [
                ["512", "Banques", "X", ""],
                ["1655", "Cautionnements", "", "X"],
            ],
        },
    }),
    defineAccount("1658", "Intérêts courus sur dépôts et cautionnements reçus", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "165",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur dépôts et cautionnements reçus",
        creditMeaning: "Augmentation de intérêts courus sur dépôts et cautionnements reçus",
        journalExample: {
            description: "Écriture type pour le compte 1658 - Intérêts courus sur dépôts et cautionnements reçus",
            rows: [
                ["512", "Banques", "X", ""],
                ["1658", "Intérêts courus sur dépôts et cautionnements reçus", "", "X"],
            ],
        },
    }),
    defineAccount("166", "Participation des salariés aux résultats", {
        description:
            "Fonds relatifs à la participation des salariés, incluant les comptes bloqués et les fonds de participation.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de participation des salariés aux résultats",
        creditMeaning: "Augmentation de participation des salariés aux résultats",
        journalExample: {
            description: "Écriture type pour le compte 166 - Participation des salariés aux résultats",
            rows: [
                ["512", "Banques", "X", ""],
                ["166", "Participation des salariés aux résultats", "", "X"],
            ],
        },
    }),
    defineAccount("1661", "Comptes bloqués", {
        description: "Fonds de participation non utilisés par suite d'absence d'accord entre employeurs et salariés.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "166",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de comptes bloqués",
        creditMeaning: "Augmentation de comptes bloqués",
        journalExample: {
            description: "Écriture type pour le compte 1661 - Comptes bloqués",
            rows: [
                ["512", "Banques", "X", ""],
                ["1661", "Comptes bloqués", "", "X"],
            ],
        },
    }),
    defineAccount("1662", "Fonds de participation", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "166",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de fonds de participation",
        creditMeaning: "Augmentation de fonds de participation",
        journalExample: {
            description: "Écriture type pour le compte 1662 - Fonds de participation",
            rows: [
                ["512", "Banques", "X", ""],
                ["1662", "Fonds de participation", "", "X"],
            ],
        },
    }),
    defineAccount("1668", "Intérêts courus sur participation des salariés aux résultats", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "166",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur participation des salariés aux résultats",
        creditMeaning: "Augmentation de intérêts courus sur participation des salariés aux résultats",
        journalExample: {
            description:
                "Écriture type pour le compte 1668 - Intérêts courus sur participation des salariés aux résultats",
            rows: [
                ["512", "Banques", "X", ""],
                ["1668", "Intérêts courus sur participation des salariés aux résultats", "", "X"],
            ],
        },
    }),
    defineAccount("167", "Fonds non remboursables et avances conditionnées", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de fonds non remboursables et avances conditionnées",
        creditMeaning: "Augmentation de fonds non remboursables et avances conditionnées",
        journalExample: {
            description: "Écriture type pour le compte 167 - Fonds non remboursables et avances conditionnées",
            rows: [
                ["512", "Banques", "X", ""],
                ["167", "Fonds non remboursables et avances conditionnées", "", "X"],
            ],
        },
    }),
    defineAccount("1671", "Fonds non remboursables montant principal", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "167",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de fonds non remboursables montant principal",
        creditMeaning: "Augmentation de fonds non remboursables montant principal",
        journalExample: {
            description: "Écriture type pour le compte 1671 - Fonds non remboursables montant principal",
            rows: [
                ["512", "Banques", "X", ""],
                ["1671", "Fonds non remboursables montant principal", "", "X"],
            ],
        },
    }),
    defineAccount("16711", "Titres participatifs montant principal", {
        description:
            "Nouveau compte du PCG 2026. Le titre participatif est une valeur mobilière créée par la loi du 3 janvier 1983, émise principalement par les coopératives et les sociétés du secteur public. Il ne confère ni droit de vote ni part dans le capital, mais donne droit à une rémunération fixe et variable. Il est assimilé aux fonds propres et n'est remboursable qu'après un délai minimal de 7 ans.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1671",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de titres participatifs montant principal",
        creditMeaning: "Augmentation de titres participatifs montant principal",
        journalExample: {
            description: "Écriture type pour le compte 16711 - Titres participatifs montant principal",
            rows: [
                ["512", "Banques", "X", ""],
                ["16711", "Titres participatifs montant principal", "", "X"],
            ],
        },
    }),
    defineAccount("16712", "Autres fonds non remboursables montant principal", {
        description:
            "Nouveau compte du PCG 2026. Ce compte enregistre le montant principal des fonds non remboursables autres que les titres participatifs, reçus par l'entité.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1671",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres fonds non remboursables montant principal",
        creditMeaning: "Augmentation de autres fonds non remboursables montant principal",
        journalExample: {
            description: "Écriture type pour le compte 16712 - Autres fonds non remboursables montant principal",
            rows: [
                ["512", "Banques", "X", ""],
                ["16712", "Autres fonds non remboursables montant principal", "", "X"],
            ],
        },
    }),
    defineAccount("16718", "Intérêts courus sur titres participatifs", {
        description:
            "Ancien compte du PCG 2025, supprimé dans le PCG 2026. Il enregistrait les intérêts courus sur les titres participatifs émis par l'entité.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1671",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur titres participatifs",
        creditMeaning: "Augmentation de intérêts courus sur titres participatifs",
        journalExample: {
            description: "Écriture type pour le compte 16718 - Intérêts courus sur titres participatifs",
            rows: [
                ["512", "Banques", "X", ""],
                ["16718", "Intérêts courus sur titres participatifs", "", "X"],
            ],
        },
    }),
    defineAccount("1673", "Avances conditionnées montant principal", {
        description:
            "Nouveau compte du PCG 2026. Ce compte enregistre le montant principal des avances conditionnées reçues par l'entité, c'est-à-dire des avances dont le remboursement dépend de la réalisation de certaines conditions (par exemple, le succès commercial d'un projet de recherche).",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "167",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de avances conditionnées montant principal",
        creditMeaning: "Augmentation de avances conditionnées montant principal",
        journalExample: {
            description: "Écriture type pour le compte 1673 - Avances conditionnées montant principal",
            rows: [
                ["512", "Banques", "X", ""],
                ["1673", "Avances conditionnées montant principal", "", "X"],
            ],
        },
    }),
    defineAccount("1674", "Avances conditionnées intérêts courus", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "167",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de avances conditionnées intérêts courus",
        creditMeaning: "Augmentation de avances conditionnées intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 1674 - Avances conditionnées intérêts courus",
            rows: [
                ["512", "Banques", "X", ""],
                ["1674", "Avances conditionnées intérêts courus", "", "X"],
            ],
        },
    }),
    defineAccount("16748", "Intérêts courus sur avances conditionnées", {
        description:
            "Ancien compte du PCG 2025, supprimé dans le PCG 2026. Il enregistrait les intérêts courus non échus sur les avances conditionnées reçues par l'entité.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1674",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur avances conditionnées",
        creditMeaning: "Augmentation de intérêts courus sur avances conditionnées",
        journalExample: {
            description: "Écriture type pour le compte 16748 - Intérêts courus sur avances conditionnées",
            rows: [
                ["512", "Banques", "X", ""],
                ["16748", "Intérêts courus sur avances conditionnées", "", "X"],
            ],
        },
    }),
    defineAccount("1675", "Emprunts participatifs", {
        description:
            "Ancien compte du PCG 2025, supprimé dans le PCG 2026. Un emprunt participatif est un prêt dont la rémunération comporte une partie fixe et une partie variable indexée sur le résultat de l'entreprise. Il est assimilé à des quasi-fonds propres dans l'analyse financière.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "167",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de emprunts participatifs",
        creditMeaning: "Augmentation de emprunts participatifs",
        journalExample: {
            description: "Écriture type pour le compte 1675 - Emprunts participatifs",
            rows: [
                ["512", "Banques", "X", ""],
                ["1675", "Emprunts participatifs", "", "X"],
            ],
        },
    }),
    defineAccount("16758", "Intérêts courus sur emprunts participatifs", {
        description:
            "Ancien compte du PCG 2025, supprimé dans le PCG 2026. Il enregistrait les intérêts courus non échus sur les emprunts participatifs contractés par l'entité.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "1675",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur emprunts participatifs",
        creditMeaning: "Augmentation de intérêts courus sur emprunts participatifs",
        journalExample: {
            description: "Écriture type pour le compte 16758 - Intérêts courus sur emprunts participatifs",
            rows: [
                ["512", "Banques", "X", ""],
                ["16758", "Intérêts courus sur emprunts participatifs", "", "X"],
            ],
        },
    }),
    defineAccount("168", "Autres emprunts et dettes assimilées", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres emprunts et dettes assimilées",
        creditMeaning: "Augmentation de autres emprunts et dettes assimilées",
        journalExample: {
            description: "Écriture type pour le compte 168 - Autres emprunts et dettes assimilées",
            rows: [
                ["512", "Banques", "X", ""],
                ["168", "Autres emprunts et dettes assimilées", "", "X"],
            ],
        },
    }),
    defineAccount("1681", "Autres emprunts", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "168",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres emprunts",
        creditMeaning: "Augmentation de autres emprunts",
        journalExample: {
            description: "Écriture type pour le compte 1681 - Autres emprunts",
            rows: [
                ["512", "Banques", "X", ""],
                ["1681", "Autres emprunts", "", "X"],
            ],
        },
    }),
    defineAccount("1682", "Emprunts participatifs", {
        description:
            "Nouveau compte du PCG 2026. Un emprunt participatif est un prêt dont la rémunération comporte une partie fixe et une partie variable indexée sur le résultat ou le chiffre d'affaires de l'entreprise. Il est assimilé à des quasi-fonds propres dans l'analyse financière. Ce compte remplace l'ancien compte 1675 du PCG 2025.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "168",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de emprunts participatifs",
        creditMeaning: "Augmentation de emprunts participatifs",
        journalExample: {
            description: "Écriture type pour le compte 1682 - Emprunts participatifs",
            rows: [
                ["512", "Banques", "X", ""],
                ["1682", "Emprunts participatifs", "", "X"],
            ],
        },
    }),
    defineAccount("1685", "Rentes viagères capitalisées", {
        description:
            "Contrepartie d'un bien acquis contre paiement de rentes viagères, apuré au fur et à mesure des arrérages versés.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "168",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de rentes viagères capitalisées",
        creditMeaning: "Augmentation de rentes viagères capitalisées",
        journalExample: {
            description: "Écriture type pour le compte 1685 - Rentes viagères capitalisées",
            rows: [
                ["512", "Banques", "X", ""],
                ["1685", "Rentes viagères capitalisées", "", "X"],
            ],
        },
    }),
    defineAccount("1687", "Autres dettes", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "168",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de autres dettes",
        creditMeaning: "Augmentation de autres dettes",
        journalExample: {
            description: "Écriture type pour le compte 1687 - Autres dettes",
            rows: [
                ["512", "Banques", "X", ""],
                ["1687", "Autres dettes", "", "X"],
            ],
        },
    }),
    defineAccount("1688", "Intérêts courus sur autres emprunts et dettes assimilées", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "168",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de intérêts courus sur autres emprunts et dettes assimilées",
        creditMeaning: "Augmentation de intérêts courus sur autres emprunts et dettes assimilées",
        journalExample: {
            description: "Écriture type pour le compte 1688 - Intérêts courus sur autres emprunts et dettes assimilées",
            rows: [
                ["512", "Banques", "X", ""],
                ["1688", "Intérêts courus sur autres emprunts et dettes assimilées", "", "X"],
            ],
        },
    }),
    defineAccount("169", "Primes de remboursement des emprunts", {
        description: "Différence entre la valeur de remboursement et la valeur d'émission des emprunts obligataires.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "16",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de primes de remboursement des emprunts",
        creditMeaning: "Augmentation de primes de remboursement des emprunts",
        journalExample: {
            description: "Écriture type pour le compte 169 - Primes de remboursement des emprunts",
            rows: [
                ["512", "Banques", "X", ""],
                ["169", "Primes de remboursement des emprunts", "", "X"],
            ],
        },
    }),
    defineAccount("17", "Dettes rattachées à des participations", {
        description: "Dettes financières envers des entités dans lesquelles l'organisation détient une participation.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de dettes rattachées à des participations",
        creditMeaning: "Augmentation de dettes rattachées à des participations",
        journalExample: {
            description: "Écriture type pour le compte 17 - Dettes rattachées à des participations",
            rows: [
                ["512", "Banques", "X", ""],
                ["17", "Dettes rattachées à des participations", "", "X"],
            ],
        },
    }),
    defineAccount("171", "Dettes rattachées à des participations - groupe", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "17",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de dettes rattachées à des participations - groupe",
        creditMeaning: "Augmentation de dettes rattachées à des participations - groupe",
        journalExample: {
            description: "Écriture type pour le compte 171 - Dettes rattachées à des participations - groupe",
            rows: [
                ["512", "Banques", "X", ""],
                ["171", "Dettes rattachées à des participations - groupe", "", "X"],
            ],
        },
    }),
    defineAccount("174", "Dettes rattachées à des participations - hors groupe", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "17",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de dettes rattachées à des participations - hors groupe",
        creditMeaning: "Augmentation de dettes rattachées à des participations - hors groupe",
        journalExample: {
            description: "Écriture type pour le compte 174 - Dettes rattachées à des participations - hors groupe",
            rows: [
                ["512", "Banques", "X", ""],
                ["174", "Dettes rattachées à des participations - hors groupe", "", "X"],
            ],
        },
    }),
    defineAccount("178", "Dettes rattachées à des sociétés en participation", {
        description:
            "Droits des coparticipants non gérants sur les biens acquis ou créés dans le cadre d'une société en participation.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "17",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de dettes rattachées à des sociétés en participation",
        creditMeaning: "Augmentation de dettes rattachées à des sociétés en participation",
        journalExample: {
            description: "Écriture type pour le compte 178 - Dettes rattachées à des sociétés en participation",
            rows: [
                ["512", "Banques", "X", ""],
                ["178", "Dettes rattachées à des sociétés en participation", "", "X"],
            ],
        },
    }),
    defineAccount("18", "Comptes de liaison des établissements et sociétés en participation", {
        description:
            "Comptes utilisés pour comptabiliser les cessions entre établissements d'une même entité tenant des comptabilités autonomes.",
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "1",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de comptes de liaison des établissements et sociétés en participation",
        creditMeaning: "Augmentation de comptes de liaison des établissements et sociétés en participation",
        journalExample: {
            description:
                "Écriture type pour le compte 18 - Comptes de liaison des établissements et sociétés en participation",
            rows: [
                ["512", "Banques", "X", ""],
                ["18", "Comptes de liaison des établissements et sociétés en participation", "", "X"],
            ],
        },
    }),
    defineAccount("181", "Comptes de liaison des établissements", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "18",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de comptes de liaison des établissements",
        creditMeaning: "Augmentation de comptes de liaison des établissements",
        journalExample: {
            description: "Écriture type pour le compte 181 - Comptes de liaison des établissements",
            rows: [
                ["512", "Banques", "X", ""],
                ["181", "Comptes de liaison des établissements", "", "X"],
            ],
        },
    }),
    defineAccount("186", "Biens et prestations de services échangés entre établissements - charges", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "18",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de biens et prestations de services échangés entre établissements - charges",
        creditMeaning: "Augmentation de biens et prestations de services échangés entre établissements - charges",
        journalExample: {
            description:
                "Écriture type pour le compte 186 - Biens et prestations de services échangés entre établissements - charges",
            rows: [
                ["512", "Banques", "X", ""],
                ["186", "Biens et prestations de services échangés entre établissements - charges", "", "X"],
            ],
        },
    }),
    defineAccount("187", "Biens et prestations de services échangés entre établissements - produits", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "18",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de biens et prestations de services échangés entre établissements - produits",
        creditMeaning: "Augmentation de biens et prestations de services échangés entre établissements - produits",
        journalExample: {
            description:
                "Écriture type pour le compte 187 - Biens et prestations de services échangés entre établissements - produits",
            rows: [
                ["512", "Banques", "X", ""],
                ["187", "Biens et prestations de services échangés entre établissements - produits", "", "X"],
            ],
        },
    }),
    defineAccount("188", "Comptes de liaison des sociétés en participation", {
        classNumber: 1,
        className: "Comptes de capitaux",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "18",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        ],
        debitMeaning: "Diminution de comptes de liaison des sociétés en participation",
        creditMeaning: "Augmentation de comptes de liaison des sociétés en participation",
        journalExample: {
            description: "Écriture type pour le compte 188 - Comptes de liaison des sociétés en participation",
            rows: [
                ["512", "Banques", "X", ""],
                ["188", "Comptes de liaison des sociétés en participation", "", "X"],
            ],
        },
    }),

    // Classe 2 - Comptes d'immobilisations
    defineAccount("2", "Comptes d'immobilisations", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: null,
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de comptes d'immobilisations",
        creditMeaning: "Diminution de comptes d'immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 2 - Comptes d'immobilisations",
            rows: [
                ["2", "Comptes d'immobilisations", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("20", "Immobilisations incorporelles et frais d’établissement", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de immobilisations incorporelles et frais d’établissement",
        creditMeaning: "Diminution de immobilisations incorporelles et frais d’établissement",
        journalExample: {
            description: "Écriture type pour le compte 20 - Immobilisations incorporelles et frais d’établissement",
            rows: [
                ["20", "Immobilisations incorporelles et frais d’établissement", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("201", "Frais d'établissement", {
        description: "Frais de constitution, de premier établissement et d'augmentation de capital de l'entité.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "20",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de frais d'établissement",
        creditMeaning: "Diminution de frais d'établissement",
        journalExample: {
            description: "Écriture type pour le compte 201 - Frais d'établissement",
            rows: [
                ["201", "Frais d'établissement", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2011", "Frais de constitution", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "201",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de frais de constitution",
        creditMeaning: "Diminution de frais de constitution",
        journalExample: {
            description: "Écriture type pour le compte 2011 - Frais de constitution",
            rows: [
                ["2011", "Frais de constitution", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2012", "Frais de premier établissement", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "201",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de frais de premier établissement",
        creditMeaning: "Diminution de frais de premier établissement",
        journalExample: {
            description: "Écriture type pour le compte 2012 - Frais de premier établissement",
            rows: [
                ["2012", "Frais de premier établissement", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("20121", "Frais de prospection", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2012",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de frais de prospection",
        creditMeaning: "Diminution de frais de prospection",
        journalExample: {
            description: "Écriture type pour le compte 20121 - Frais de prospection",
            rows: [
                ["20121", "Frais de prospection", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("20122", "Frais de publicité", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2012",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de frais de publicité",
        creditMeaning: "Diminution de frais de publicité",
        journalExample: {
            description: "Écriture type pour le compte 20122 - Frais de publicité",
            rows: [
                ["20122", "Frais de publicité", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "2013",
        "Frais d'augmentation de capital et d'opérations diverses - fusions, scissions, transformations",
        {
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: true,
            parent: "201",
            counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
            usageTips: [
                "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            ],
            debitMeaning:
                "Augmentation de frais d'augmentation de capital et d'opérations diverses - fusions, scissions, transformations",
            creditMeaning:
                "Diminution de frais d'augmentation de capital et d'opérations diverses - fusions, scissions, transformations",
            journalExample: {
                description:
                    "Écriture type pour le compte 2013 - Frais d'augmentation de capital et d'opérations diverses - fusions, scissions, transformations",
                rows: [
                    [
                        "2013",
                        "Frais d'augmentation de capital et d'opérations diverses - fusions, scissions, transformations",
                        "X",
                        "",
                    ],
                    ["404", "Fournisseurs d'immobilisations", "", "X"],
                ],
            },
        },
    ),
    defineAccount("203", "Frais de développement", {
        description: "Frais de développement inscrits en immobilisations incorporelles.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "20",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de frais de développement",
        creditMeaning: "Diminution de frais de développement",
        journalExample: {
            description: "Écriture type pour le compte 203 - Frais de développement",
            rows: [
                ["203", "Frais de développement", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "205",
        "Concessions et droits similaires, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
        {
            description: "Logiciels, brevets, licences.",
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "20",
            counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            ],
            debitMeaning:
                "Augmentation de concessions et droits similaires, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
            creditMeaning:
                "Diminution de concessions et droits similaires, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
            journalExample: {
                description:
                    "Écriture type pour le compte 205 - Concessions et droits similaires, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
                rows: [
                    [
                        "205",
                        "Concessions et droits similaires, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
                        "X",
                        "",
                    ],
                    ["404", "Fournisseurs d'immobilisations", "", "X"],
                ],
            },
        },
    ),
    defineAccount("206", "Droit au bail", {
        description:
            "Montant versé au locataire précédent pour le transfert des droits liés à la propriété commerciale.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "20",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de droit au bail",
        creditMeaning: "Diminution de droit au bail",
        journalExample: {
            description: "Écriture type pour le compte 206 - Droit au bail",
            rows: [
                ["206", "Droit au bail", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("207", "Fonds commercial", {
        description:
            "Éléments incorporels du fonds de commerce acquis qui ne font pas l'objet d'une évaluation séparée.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "20",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de fonds commercial",
        creditMeaning: "Diminution de fonds commercial",
        journalExample: {
            description: "Écriture type pour le compte 207 - Fonds commercial",
            rows: [
                ["207", "Fonds commercial", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("208", "Autres immobilisations incorporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "20",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres immobilisations incorporelles",
        creditMeaning: "Diminution de autres immobilisations incorporelles",
        journalExample: {
            description: "Écriture type pour le compte 208 - Autres immobilisations incorporelles",
            rows: [
                ["208", "Autres immobilisations incorporelles", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2081", "Mali de fusion sur actifs incorporels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "208",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de mali de fusion sur actifs incorporels",
        creditMeaning: "Diminution de mali de fusion sur actifs incorporels",
        journalExample: {
            description: "Écriture type pour le compte 2081 - Mali de fusion sur actifs incorporels",
            rows: [
                ["2081", "Mali de fusion sur actifs incorporels", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("21", "Immobilisations corporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de immobilisations corporelles",
        creditMeaning: "Diminution de immobilisations corporelles",
        journalExample: {
            description: "Écriture type pour le compte 21 - Immobilisations corporelles",
            rows: [
                ["21", "Immobilisations corporelles", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("211", "Terrains", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "21",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de terrains",
        creditMeaning: "Diminution de terrains",
        journalExample: {
            description: "Écriture type pour le compte 211 - Terrains",
            rows: [
                ["211", "Terrains", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2111", "Terrains nus", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "211",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de terrains nus",
        creditMeaning: "Diminution de terrains nus",
        journalExample: {
            description: "Écriture type pour le compte 2111 - Terrains nus",
            rows: [
                ["2111", "Terrains nus", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2112", "Terrains aménagés", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "211",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de terrains aménagés",
        creditMeaning: "Diminution de terrains aménagés",
        journalExample: {
            description: "Écriture type pour le compte 2112 - Terrains aménagés",
            rows: [
                ["2112", "Terrains aménagés", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2113", "Sous-sols et sur-sols", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "211",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de sous-sols et sur-sols",
        creditMeaning: "Diminution de sous-sols et sur-sols",
        journalExample: {
            description: "Écriture type pour le compte 2113 - Sous-sols et sur-sols",
            rows: [
                ["2113", "Sous-sols et sur-sols", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2114", "Terrains de carrières (Tréfonds)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "211",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de terrains de carrières (tréfonds)",
        creditMeaning: "Diminution de terrains de carrières (tréfonds)",
        journalExample: {
            description: "Écriture type pour le compte 2114 - Terrains de carrières (Tréfonds)",
            rows: [
                ["2114", "Terrains de carrières (Tréfonds)", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2115", "Terrains bâtis", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "211",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de terrains bâtis",
        creditMeaning: "Diminution de terrains bâtis",
        journalExample: {
            description: "Écriture type pour le compte 2115 - Terrains bâtis",
            rows: [
                ["2115", "Terrains bâtis", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("212", "Agencements et aménagements de terrains (même ventilation que celle du compte 211)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "21",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning:
            "Augmentation de agencements et aménagements de terrains (même ventilation que celle du compte 211)",
        creditMeaning:
            "Diminution de agencements et aménagements de terrains (même ventilation que celle du compte 211)",
        journalExample: {
            description:
                "Écriture type pour le compte 212 - Agencements et aménagements de terrains (même ventilation que celle du compte 211)",
            rows: [
                ["212", "Agencements et aménagements de terrains (même ventilation que celle du compte 211)", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("213", "Constructions", {
        description: "Bâtiments et aménagements.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "21",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de constructions",
        creditMeaning: "Diminution de constructions",
        journalExample: {
            description: "Écriture type pour le compte 213 - Constructions",
            rows: [
                ["213", "Constructions", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2131", "Bâtiments", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "213",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de bâtiments",
        creditMeaning: "Diminution de bâtiments",
        journalExample: {
            description: "Écriture type pour le compte 2131 - Bâtiments",
            rows: [
                ["2131", "Bâtiments", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2135", "Installations générales - agencements - aménagements des constructions", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "213",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations générales - agencements - aménagements des constructions",
        creditMeaning: "Diminution de installations générales - agencements - aménagements des constructions",
        journalExample: {
            description:
                "Écriture type pour le compte 2135 - Installations générales - agencements - aménagements des constructions",
            rows: [
                ["2135", "Installations générales - agencements - aménagements des constructions", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2138", "Ouvrages d'infrastructure", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "213",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de ouvrages d'infrastructure",
        creditMeaning: "Diminution de ouvrages d'infrastructure",
        journalExample: {
            description: "Écriture type pour le compte 2138 - Ouvrages d'infrastructure",
            rows: [
                ["2138", "Ouvrages d'infrastructure", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("214", "Constructions sur sol d'autrui (même ventilation que celle du compte 213)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "21",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de constructions sur sol d'autrui (même ventilation que celle du compte 213)",
        creditMeaning: "Diminution de constructions sur sol d'autrui (même ventilation que celle du compte 213)",
        journalExample: {
            description:
                "Écriture type pour le compte 214 - Constructions sur sol d'autrui (même ventilation que celle du compte 213)",
            rows: [
                ["214", "Constructions sur sol d'autrui (même ventilation que celle du compte 213)", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("215", "Installations techniques, matériels et outillages industriels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "21",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations techniques, matériels et outillages industriels",
        creditMeaning: "Diminution de installations techniques, matériels et outillages industriels",
        journalExample: {
            description:
                "Écriture type pour le compte 215 - Installations techniques, matériels et outillages industriels",
            rows: [
                ["215", "Installations techniques, matériels et outillages industriels", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2151", "Installations complexes spécialisées", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "215",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations complexes spécialisées",
        creditMeaning: "Diminution de installations complexes spécialisées",
        journalExample: {
            description: "Écriture type pour le compte 2151 - Installations complexes spécialisées",
            rows: [
                ["2151", "Installations complexes spécialisées", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("21511", "Installations complexes spécialisées sur sol propre", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2151",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations complexes spécialisées sur sol propre",
        creditMeaning: "Diminution de installations complexes spécialisées sur sol propre",
        journalExample: {
            description: "Écriture type pour le compte 21511 - Installations complexes spécialisées sur sol propre",
            rows: [
                ["21511", "Installations complexes spécialisées sur sol propre", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("21514", "Installations complexes spécialisées sur sol d'autrui", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2151",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations complexes spécialisées sur sol d'autrui",
        creditMeaning: "Diminution de installations complexes spécialisées sur sol d'autrui",
        journalExample: {
            description: "Écriture type pour le compte 21514 - Installations complexes spécialisées sur sol d'autrui",
            rows: [
                ["21514", "Installations complexes spécialisées sur sol d'autrui", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2153", "Installations à caractère spécifique", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "215",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations à caractère spécifique",
        creditMeaning: "Diminution de installations à caractère spécifique",
        journalExample: {
            description: "Écriture type pour le compte 2153 - Installations à caractère spécifique",
            rows: [
                ["2153", "Installations à caractère spécifique", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("21531", "Installations à caractère spécifique sur sol propre", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2153",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations à caractère spécifique sur sol propre",
        creditMeaning: "Diminution de installations à caractère spécifique sur sol propre",
        journalExample: {
            description: "Écriture type pour le compte 21531 - Installations à caractère spécifique sur sol propre",
            rows: [
                ["21531", "Installations à caractère spécifique sur sol propre", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("21534", "Installations à caractère spécifique sur sol d'autrui", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2153",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations à caractère spécifique sur sol d'autrui",
        creditMeaning: "Diminution de installations à caractère spécifique sur sol d'autrui",
        journalExample: {
            description: "Écriture type pour le compte 21534 - Installations à caractère spécifique sur sol d'autrui",
            rows: [
                ["21534", "Installations à caractère spécifique sur sol d'autrui", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2154", "Matériels industriels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "215",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de matériels industriels",
        creditMeaning: "Diminution de matériels industriels",
        journalExample: {
            description: "Écriture type pour le compte 2154 - Matériels industriels",
            rows: [
                ["2154", "Matériels industriels", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2155", "Outillages industriels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "215",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de outillages industriels",
        creditMeaning: "Diminution de outillages industriels",
        journalExample: {
            description: "Écriture type pour le compte 2155 - Outillages industriels",
            rows: [
                ["2155", "Outillages industriels", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2157", "Agencements et aménagements des matériels et outillages industriels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "215",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de agencements et aménagements des matériels et outillages industriels",
        creditMeaning: "Diminution de agencements et aménagements des matériels et outillages industriels",
        journalExample: {
            description:
                "Écriture type pour le compte 2157 - Agencements et aménagements des matériels et outillages industriels",
            rows: [
                ["2157", "Agencements et aménagements des matériels et outillages industriels", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("218", "Autres immobilisations corporelles", {
        description: "Mobilier, matériel de bureau, matériel informatique.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "21",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres immobilisations corporelles",
        creditMeaning: "Diminution de autres immobilisations corporelles",
        journalExample: {
            description: "Écriture type pour le compte 218 - Autres immobilisations corporelles",
            rows: [
                ["218", "Autres immobilisations corporelles", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2181", "Installations générales, agencements, aménagements divers", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de installations générales, agencements, aménagements divers",
        creditMeaning: "Diminution de installations générales, agencements, aménagements divers",
        journalExample: {
            description:
                "Écriture type pour le compte 2181 - Installations générales, agencements, aménagements divers",
            rows: [
                ["2181", "Installations générales, agencements, aménagements divers", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2182", "Matériel de transport", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de matériel de transport",
        creditMeaning: "Diminution de matériel de transport",
        journalExample: {
            description: "Écriture type pour le compte 2182 - Matériel de transport",
            rows: [
                ["2182", "Matériel de transport", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2183", "Matériel de bureau et matériel informatique", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de matériel de bureau et matériel informatique",
        creditMeaning: "Diminution de matériel de bureau et matériel informatique",
        journalExample: {
            description: "Écriture type pour le compte 2183 - Matériel de bureau et matériel informatique",
            rows: [
                ["2183", "Matériel de bureau et matériel informatique", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2184", "Mobilier", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de mobilier",
        creditMeaning: "Diminution de mobilier",
        journalExample: {
            description: "Écriture type pour le compte 2184 - Mobilier",
            rows: [
                ["2184", "Mobilier", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2185", "Cheptel", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de cheptel",
        creditMeaning: "Diminution de cheptel",
        journalExample: {
            description: "Écriture type pour le compte 2185 - Cheptel",
            rows: [
                ["2185", "Cheptel", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2186", "Emballages récupérables", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de emballages récupérables",
        creditMeaning: "Diminution de emballages récupérables",
        journalExample: {
            description: "Écriture type pour le compte 2186 - Emballages récupérables",
            rows: [
                ["2186", "Emballages récupérables", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2187", "Mali de fusion sur actifs corporels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "218",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de mali de fusion sur actifs corporels",
        creditMeaning: "Diminution de mali de fusion sur actifs corporels",
        journalExample: {
            description: "Écriture type pour le compte 2187 - Mali de fusion sur actifs corporels",
            rows: [
                ["2187", "Mali de fusion sur actifs corporels", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("22", "Immobilisations mises en concession", {
        description:
            "Immobilisations incorporelles ou corporelles mises en concession par le concédant ou le concessionnaire.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de immobilisations mises en concession",
        creditMeaning: "Diminution de immobilisations mises en concession",
        journalExample: {
            description: "Écriture type pour le compte 22 - Immobilisations mises en concession",
            rows: [
                ["22", "Immobilisations mises en concession", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("229", "Droits du concédant (présentés dans la rubrique autres fonds propres)", {
        description: "Contrepartie de la valeur des biens mis gratuitement dans la concession par le concédant.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "22",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de droits du concédant (présentés dans la rubrique autres fonds propres)",
        creditMeaning: "Diminution de droits du concédant (présentés dans la rubrique autres fonds propres)",
        journalExample: {
            description:
                "Écriture type pour le compte 229 - Droits du concédant (présentés dans la rubrique autres fonds propres)",
            rows: [
                ["229", "Droits du concédant (présentés dans la rubrique autres fonds propres)", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("23", "Immobilisations en cours, avances et acomptes", {
        description: "Valeur des immobilisations non terminées à la fin de chaque exercice.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de immobilisations en cours, avances et acomptes",
        creditMeaning: "Diminution de immobilisations en cours, avances et acomptes",
        journalExample: {
            description: "Écriture type pour le compte 23 - Immobilisations en cours, avances et acomptes",
            rows: [
                ["23", "Immobilisations en cours, avances et acomptes", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("231", "Immobilisations corporelles en cours", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "23",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de immobilisations corporelles en cours",
        creditMeaning: "Diminution de immobilisations corporelles en cours",
        journalExample: {
            description: "Écriture type pour le compte 231 - Immobilisations corporelles en cours",
            rows: [
                ["231", "Immobilisations corporelles en cours", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("232", "Immobilisations incorporelles en cours", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "23",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de immobilisations incorporelles en cours",
        creditMeaning: "Diminution de immobilisations incorporelles en cours",
        journalExample: {
            description: "Écriture type pour le compte 232 - Immobilisations incorporelles en cours",
            rows: [
                ["232", "Immobilisations incorporelles en cours", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("237", "Avances et acomptes versés sur commandes d'immobilisations incorporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "23",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de avances et acomptes versés sur commandes d'immobilisations incorporelles",
        creditMeaning: "Diminution de avances et acomptes versés sur commandes d'immobilisations incorporelles",
        journalExample: {
            description:
                "Écriture type pour le compte 237 - Avances et acomptes versés sur commandes d'immobilisations incorporelles",
            rows: [
                ["237", "Avances et acomptes versés sur commandes d'immobilisations incorporelles", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("238", "Avances et acomptes versés sur commandes d'immobilisations corporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "23",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de avances et acomptes versés sur commandes d'immobilisations corporelles",
        creditMeaning: "Diminution de avances et acomptes versés sur commandes d'immobilisations corporelles",
        journalExample: {
            description:
                "Écriture type pour le compte 238 - Avances et acomptes versés sur commandes d'immobilisations corporelles",
            rows: [
                ["238", "Avances et acomptes versés sur commandes d'immobilisations corporelles", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("26", "Participations et créances rattachées à des participations", {
        description:
            "Titres de participation et créances liées à des entités dans lesquelles l'entreprise détient une participation.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de participations et créances rattachées à des participations",
        creditMeaning: "Diminution de participations et créances rattachées à des participations",
        journalExample: {
            description: "Écriture type pour le compte 26 - Participations et créances rattachées à des participations",
            rows: [
                ["26", "Participations et créances rattachées à des participations", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("261", "Titres de participation", {
        description: "Actions et parts détenues durablement dans d'autres entités pour en influencer la gestion.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "26",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de titres de participation",
        creditMeaning: "Diminution de titres de participation",
        journalExample: {
            description: "Écriture type pour le compte 261 - Titres de participation",
            rows: [
                ["261", "Titres de participation", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2611", "Actions", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "261",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de actions",
        creditMeaning: "Diminution de actions",
        journalExample: {
            description: "Écriture type pour le compte 2611 - Actions",
            rows: [
                ["2611", "Actions", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2618", "Autres titres", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "261",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres titres",
        creditMeaning: "Diminution de autres titres",
        journalExample: {
            description: "Écriture type pour le compte 2618 - Autres titres",
            rows: [
                ["2618", "Autres titres", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("262", "Titres évalués par équivalence", {
        description: "Titres de sociétés contrôlées de manière exclusive évalués par équivalence.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "26",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de titres évalués par équivalence",
        creditMeaning: "Diminution de titres évalués par équivalence",
        journalExample: {
            description: "Écriture type pour le compte 262 - Titres évalués par équivalence",
            rows: [
                ["262", "Titres évalués par équivalence", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("266", "Autres formes de participation", {
        description:
            "Parts de GIE et autres formes de participation ne relevant pas des titres de participation classiques.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "26",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres formes de participation",
        creditMeaning: "Diminution de autres formes de participation",
        journalExample: {
            description: "Écriture type pour le compte 266 - Autres formes de participation",
            rows: [
                ["266", "Autres formes de participation", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2661", "Droits représentatifs d'actifs nets remis en fiducie", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "266",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de droits représentatifs d'actifs nets remis en fiducie",
        creditMeaning: "Diminution de droits représentatifs d'actifs nets remis en fiducie",
        journalExample: {
            description: "Écriture type pour le compte 2661 - Droits représentatifs d'actifs nets remis en fiducie",
            rows: [
                ["2661", "Droits représentatifs d'actifs nets remis en fiducie", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("267", "Créances rattachées à des participations", {
        description:
            "Créances nées de prêts octroyés à des entités dans lesquelles le prêteur détient une participation.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "26",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de créances rattachées à des participations",
        creditMeaning: "Diminution de créances rattachées à des participations",
        journalExample: {
            description: "Écriture type pour le compte 267 - Créances rattachées à des participations",
            rows: [
                ["267", "Créances rattachées à des participations", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2671", "Créances rattachées à des participations - groupe", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "267",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de créances rattachées à des participations - groupe",
        creditMeaning: "Diminution de créances rattachées à des participations - groupe",
        journalExample: {
            description: "Écriture type pour le compte 2671 - Créances rattachées à des participations - groupe",
            rows: [
                ["2671", "Créances rattachées à des participations - groupe", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2674", "Créances rattachées à des participations - hors groupe", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "267",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de créances rattachées à des participations - hors groupe",
        creditMeaning: "Diminution de créances rattachées à des participations - hors groupe",
        journalExample: {
            description: "Écriture type pour le compte 2674 - Créances rattachées à des participations - hors groupe",
            rows: [
                ["2674", "Créances rattachées à des participations - hors groupe", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2675", "Versements représentatifs d'apports non capitalisés - appel de fonds", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "267",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de versements représentatifs d'apports non capitalisés - appel de fonds",
        creditMeaning: "Diminution de versements représentatifs d'apports non capitalisés - appel de fonds",
        journalExample: {
            description:
                "Écriture type pour le compte 2675 - Versements représentatifs d'apports non capitalisés - appel de fonds",
            rows: [
                ["2675", "Versements représentatifs d'apports non capitalisés - appel de fonds", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2676", "Avances consolidables", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "267",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de avances consolidables",
        creditMeaning: "Diminution de avances consolidables",
        journalExample: {
            description: "Écriture type pour le compte 2676 - Avances consolidables",
            rows: [
                ["2676", "Avances consolidables", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2677", "Autres créances rattachées à des participations", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "267",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres créances rattachées à des participations",
        creditMeaning: "Diminution de autres créances rattachées à des participations",
        journalExample: {
            description: "Écriture type pour le compte 2677 - Autres créances rattachées à des participations",
            rows: [
                ["2677", "Autres créances rattachées à des participations", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2678", "Intérêts courus", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "267",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus",
        creditMeaning: "Diminution de intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 2678 - Intérêts courus",
            rows: [
                ["2678", "Intérêts courus", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("268", "Créances rattachées à des sociétés en participation", {
        description:
            "Droits détenus par l'entité coparticipante sur les biens acquis ou créés par le gérant de la société en participation.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "26",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de créances rattachées à des sociétés en participation",
        creditMeaning: "Diminution de créances rattachées à des sociétés en participation",
        journalExample: {
            description: "Écriture type pour le compte 268 - Créances rattachées à des sociétés en participation",
            rows: [
                ["268", "Créances rattachées à des sociétés en participation", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2681", "Principal", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "268",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de principal",
        creditMeaning: "Diminution de principal",
        journalExample: {
            description: "Écriture type pour le compte 2681 - Principal",
            rows: [
                ["2681", "Principal", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2688", "Intérêts courus", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "268",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus",
        creditMeaning: "Diminution de intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 2688 - Intérêts courus",
            rows: [
                ["2688", "Intérêts courus", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("269", "Versements restant à effectuer sur titres de participation non libérés", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "26",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de versements restant à effectuer sur titres de participation non libérés",
        creditMeaning: "Diminution de versements restant à effectuer sur titres de participation non libérés",
        journalExample: {
            description:
                "Écriture type pour le compte 269 - Versements restant à effectuer sur titres de participation non libérés",
            rows: [
                ["269", "Versements restant à effectuer sur titres de participation non libérés", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("27", "Autres immobilisations financières", {
        description:
            "Titres immobilisés, prêts, dépôts et cautionnements, et autres créances financières à long terme.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres immobilisations financières",
        creditMeaning: "Diminution de autres immobilisations financières",
        journalExample: {
            description: "Écriture type pour le compte 27 - Autres immobilisations financières",
            rows: [
                ["27", "Autres immobilisations financières", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "271",
        "Titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
        {
            description: "Titres conférant un droit de propriété, nantis ou bloqués pour une durée supérieure à un an.",
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "27",
            counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            ],
            debitMeaning:
                "Augmentation de titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
            creditMeaning:
                "Diminution de titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
            journalExample: {
                description:
                    "Écriture type pour le compte 271 - Titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
                rows: [
                    [
                        "271",
                        "Titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
                        "X",
                        "",
                    ],
                    ["404", "Fournisseurs d'immobilisations", "", "X"],
                ],
            },
        },
    ),
    defineAccount("2711", "Actions", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "271",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de actions",
        creditMeaning: "Diminution de actions",
        journalExample: {
            description: "Écriture type pour le compte 2711 - Actions",
            rows: [
                ["2711", "Actions", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2718", "Autres titres", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "271",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres titres",
        creditMeaning: "Diminution de autres titres",
        journalExample: {
            description: "Écriture type pour le compte 2718 - Autres titres",
            rows: [
                ["2718", "Autres titres", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("272", "Titres immobilisés (droit de créance)", {
        description: "Obligations, bons et autres titres de créance détenus durablement.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de titres immobilisés (droit de créance)",
        creditMeaning: "Diminution de titres immobilisés (droit de créance)",
        journalExample: {
            description: "Écriture type pour le compte 272 - Titres immobilisés (droit de créance)",
            rows: [
                ["272", "Titres immobilisés (droit de créance)", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2721", "Obligations", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "272",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de obligations",
        creditMeaning: "Diminution de obligations",
        journalExample: {
            description: "Écriture type pour le compte 2721 - Obligations",
            rows: [
                ["2721", "Obligations", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2722", "Bons", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "272",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de bons",
        creditMeaning: "Diminution de bons",
        journalExample: {
            description: "Écriture type pour le compte 2722 - Bons",
            rows: [
                ["2722", "Bons", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("273", "Titres immobilisés de l'activité de portefeuille", {
        description:
            "Titres détenus dans le cadre d'une activité de portefeuille visant à en tirer un revenu à long terme.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de titres immobilisés de l'activité de portefeuille",
        creditMeaning: "Diminution de titres immobilisés de l'activité de portefeuille",
        journalExample: {
            description: "Écriture type pour le compte 273 - Titres immobilisés de l'activité de portefeuille",
            rows: [
                ["273", "Titres immobilisés de l'activité de portefeuille", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("274", "Prêts", {
        description: "Prêts accordés par l'entité à des tiers (participatifs, aux associés, au personnel, etc.).",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de prêts",
        creditMeaning: "Diminution de prêts",
        journalExample: {
            description: "Écriture type pour le compte 274 - Prêts",
            rows: [
                ["274", "Prêts", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2741", "Prêts participatifs", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "274",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de prêts participatifs",
        creditMeaning: "Diminution de prêts participatifs",
        journalExample: {
            description: "Écriture type pour le compte 2741 - Prêts participatifs",
            rows: [
                ["2741", "Prêts participatifs", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2742", "Prêts aux associés", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "274",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de prêts aux associés",
        creditMeaning: "Diminution de prêts aux associés",
        journalExample: {
            description: "Écriture type pour le compte 2742 - Prêts aux associés",
            rows: [
                ["2742", "Prêts aux associés", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2743", "Prêts au personnel", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "274",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de prêts au personnel",
        creditMeaning: "Diminution de prêts au personnel",
        journalExample: {
            description: "Écriture type pour le compte 2743 - Prêts au personnel",
            rows: [
                ["2743", "Prêts au personnel", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2748", "Autres prêts", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "274",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres prêts",
        creditMeaning: "Diminution de autres prêts",
        journalExample: {
            description: "Écriture type pour le compte 2748 - Autres prêts",
            rows: [
                ["2748", "Autres prêts", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("275", "Dépôts et cautionnements versés", {
        description: "Sommes versées à des tiers à titre de garantie ou de caution.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de dépôts et cautionnements versés",
        creditMeaning: "Diminution de dépôts et cautionnements versés",
        journalExample: {
            description: "Écriture type pour le compte 275 - Dépôts et cautionnements versés",
            rows: [
                ["275", "Dépôts et cautionnements versés", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2751", "Dépôts", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "275",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de dépôts",
        creditMeaning: "Diminution de dépôts",
        journalExample: {
            description: "Écriture type pour le compte 2751 - Dépôts",
            rows: [
                ["2751", "Dépôts", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2755", "Cautionnements", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "275",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de cautionnements",
        creditMeaning: "Diminution de cautionnements",
        journalExample: {
            description: "Écriture type pour le compte 2755 - Cautionnements",
            rows: [
                ["2755", "Cautionnements", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("276", "Autres créances immobilisées", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de autres créances immobilisées",
        creditMeaning: "Diminution de autres créances immobilisées",
        journalExample: {
            description: "Écriture type pour le compte 276 - Autres créances immobilisées",
            rows: [
                ["276", "Autres créances immobilisées", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2761", "Créances diverses", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "276",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de créances diverses",
        creditMeaning: "Diminution de créances diverses",
        journalExample: {
            description: "Écriture type pour le compte 2761 - Créances diverses",
            rows: [
                ["2761", "Créances diverses", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2768", "Intérêts courus", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "276",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus",
        creditMeaning: "Diminution de intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 2768 - Intérêts courus",
            rows: [
                ["2768", "Intérêts courus", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("27682", "Intérêts courus sur titres immobilisés (droit de créance)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2768",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus sur titres immobilisés (droit de créance)",
        creditMeaning: "Diminution de intérêts courus sur titres immobilisés (droit de créance)",
        journalExample: {
            description:
                "Écriture type pour le compte 27682 - Intérêts courus sur titres immobilisés (droit de créance)",
            rows: [
                ["27682", "Intérêts courus sur titres immobilisés (droit de créance)", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("27684", "Intérêts courus sur prêts", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2768",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus sur prêts",
        creditMeaning: "Diminution de intérêts courus sur prêts",
        journalExample: {
            description: "Écriture type pour le compte 27684 - Intérêts courus sur prêts",
            rows: [
                ["27684", "Intérêts courus sur prêts", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("27685", "Intérêts courus sur dépôts et cautionnements", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2768",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus sur dépôts et cautionnements",
        creditMeaning: "Diminution de intérêts courus sur dépôts et cautionnements",
        journalExample: {
            description: "Écriture type pour le compte 27685 - Intérêts courus sur dépôts et cautionnements",
            rows: [
                ["27685", "Intérêts courus sur dépôts et cautionnements", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("27688", "Intérêts courus sur créances diverses", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2768",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de intérêts courus sur créances diverses",
        creditMeaning: "Diminution de intérêts courus sur créances diverses",
        journalExample: {
            description: "Écriture type pour le compte 27688 - Intérêts courus sur créances diverses",
            rows: [
                ["27688", "Intérêts courus sur créances diverses", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("277", "Actions propres ou parts propres", {
        description: "Actions ou parts de l'entité rachetées par elle-même.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de actions propres ou parts propres",
        creditMeaning: "Diminution de actions propres ou parts propres",
        journalExample: {
            description: "Écriture type pour le compte 277 - Actions propres ou parts propres",
            rows: [
                ["277", "Actions propres ou parts propres", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2771", "Actions propres ou parts propres", {
        description: "Actions ou parts propres détenues sans intention d'annulation.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "277",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de actions propres ou parts propres",
        creditMeaning: "Diminution de actions propres ou parts propres",
        journalExample: {
            description: "Écriture type pour le compte 2771 - Actions propres ou parts propres",
            rows: [
                ["2771", "Actions propres ou parts propres", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("2772", "Actions propres ou parts propres en voie d’annulation", {
        description: "Titres rachetés explicitement en vue de leur annulation et de la réduction du capital.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "277",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de actions propres ou parts propres en voie d’annulation",
        creditMeaning: "Diminution de actions propres ou parts propres en voie d’annulation",
        journalExample: {
            description: "Écriture type pour le compte 2772 - Actions propres ou parts propres en voie d’annulation",
            rows: [
                ["2772", "Actions propres ou parts propres en voie d’annulation", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("278", "Mali de fusion sur actifs financiers", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de mali de fusion sur actifs financiers",
        creditMeaning: "Diminution de mali de fusion sur actifs financiers",
        journalExample: {
            description: "Écriture type pour le compte 278 - Mali de fusion sur actifs financiers",
            rows: [
                ["278", "Mali de fusion sur actifs financiers", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("279", "Versements restant à effectuer sur titres immobilisés non libérés", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "27",
        counterpart: { number: "404", label: "Fournisseurs d'immobilisations" },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        ],
        debitMeaning: "Augmentation de versements restant à effectuer sur titres immobilisés non libérés",
        creditMeaning: "Diminution de versements restant à effectuer sur titres immobilisés non libérés",
        journalExample: {
            description:
                "Écriture type pour le compte 279 - Versements restant à effectuer sur titres immobilisés non libérés",
            rows: [
                ["279", "Versements restant à effectuer sur titres immobilisés non libérés", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("28", "Amortissements des immobilisations", {
        description: "Cumul des dépréciations constatées sur les immobilisations.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 28 - Amortissements des immobilisations",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "280",
        "Amortissements des immobilisations incorporelles et des frais d’établissement (même ventilation que celle du compte 20)",
        {
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "28",
            counterpart: {
                number: "6811",
                label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
            },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
                "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
            ],
            debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
            creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
            journalExample: {
                description:
                    "Écriture type pour le compte 280 - Amortissements des immobilisations incorporelles et des frais d’établissement (même ventilation que celle du compte 20)",
                rows: [
                    ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                    [
                        "280",
                        "Amortissements des immobilisations incorporelles et des frais d’établissement (même ventilation que celle du compte 20)",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("2801", "Frais d'établissement (même ventilation que celle du compte 201)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "280",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description:
                "Écriture type pour le compte 2801 - Frais d'établissement (même ventilation que celle du compte 201)",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2801", "Frais d'établissement (même ventilation que celle du compte 201)", "", "X"],
            ],
        },
    }),
    defineAccount("2803", "Frais de développement", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "280",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 2803 - Frais de développement",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2803", "Frais de développement", "", "X"],
            ],
        },
    }),
    defineAccount(
        "2805",
        "Concessions et droits similaires, brevets, licences, solutions informatiques, droits et valeurs similaires",
        {
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "280",
            counterpart: {
                number: "6811",
                label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
            },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
                "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
            ],
            debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
            creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
            journalExample: {
                description:
                    "Écriture type pour le compte 2805 - Concessions et droits similaires, brevets, licences, solutions informatiques, droits et valeurs similaires",
                rows: [
                    ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                    [
                        "2805",
                        "Concessions et droits similaires, brevets, licences, solutions informatiques, droits et valeurs similaires",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("2806", "Droit au bail", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "280",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 2806 - Droit au bail",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2806", "Droit au bail", "", "X"],
            ],
        },
    }),
    defineAccount("2807", "Fonds commercial", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "280",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 2807 - Fonds commercial",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2807", "Fonds commercial", "", "X"],
            ],
        },
    }),
    defineAccount("2808", "Autres immobilisations incorporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "280",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 2808 - Autres immobilisations incorporelles",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2808", "Autres immobilisations incorporelles", "", "X"],
            ],
        },
    }),
    defineAccount("281", "Amortissements des immobilisations corporelles (même ventilation que celle du compte 21)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "28",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description:
                "Écriture type pour le compte 281 - Amortissements des immobilisations corporelles (même ventilation que celle du compte 21)",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                [
                    "281",
                    "Amortissements des immobilisations corporelles (même ventilation que celle du compte 21)",
                    "",
                    "X",
                ],
            ],
        },
    }),
    defineAccount("2812", "Agencements, aménagements de terrains (même ventilation que celle du compte 212)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "281",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description:
                "Écriture type pour le compte 2812 - Agencements, aménagements de terrains (même ventilation que celle du compte 212)",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2812", "Agencements, aménagements de terrains (même ventilation que celle du compte 212)", "", "X"],
            ],
        },
    }),
    defineAccount("2813", "Constructions (même ventilation que celle du compte 213)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "281",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 2813 - Constructions (même ventilation que celle du compte 213)",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2813", "Constructions (même ventilation que celle du compte 213)", "", "X"],
            ],
        },
    }),
    defineAccount("2814", "Constructions sur sol d'autrui (même ventilation que celle du compte 214)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "281",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description:
                "Écriture type pour le compte 2814 - Constructions sur sol d'autrui (même ventilation que celle du compte 214)",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2814", "Constructions sur sol d'autrui (même ventilation que celle du compte 214)", "", "X"],
            ],
        },
    }),
    defineAccount(
        "2815",
        "Installations, matériel et outillage industriels (même ventilation que celle du compte 215)",
        {
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "281",
            counterpart: {
                number: "6811",
                label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
            },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
                "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
            ],
            debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
            creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
            journalExample: {
                description:
                    "Écriture type pour le compte 2815 - Installations, matériel et outillage industriels (même ventilation que celle du compte 215)",
                rows: [
                    ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                    [
                        "2815",
                        "Installations, matériel et outillage industriels (même ventilation que celle du compte 215)",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("2818", "Autres immobilisations corporelles (même ventilation que celle du compte 218)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "281",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description:
                "Écriture type pour le compte 2818 - Autres immobilisations corporelles (même ventilation que celle du compte 218)",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["2818", "Autres immobilisations corporelles (même ventilation que celle du compte 218)", "", "X"],
            ],
        },
    }),
    defineAccount("28187", "Amortissement du mali de fusion sur actifs corporels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2818",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 28187 - Amortissement du mali de fusion sur actifs corporels",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["28187", "Amortissement du mali de fusion sur actifs corporels", "", "X"],
            ],
        },
    }),
    defineAccount("282", "Amortissements des immobilisations mises en concession", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "28",
        counterpart: {
            number: "6811",
            label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par amortissement. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des amortissements (sortie d'immobilisation, correction)",
        creditMeaning: "Augmentation des amortissements (dotation aux amortissements)",
        journalExample: {
            description: "Écriture type pour le compte 282 - Amortissements des immobilisations mises en concession",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["282", "Amortissements des immobilisations mises en concession", "", "X"],
            ],
        },
    }),
    defineAccount("29", "Dépréciations des immobilisations", {
        description: "Pertes de valeur réversibles constatées sur les immobilisations.",
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "2",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 29 - Dépréciations des immobilisations",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["29", "Dépréciations des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("290", "Dépréciations des immobilisations incorporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "29",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 290 - Dépréciations des immobilisations incorporelles",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["290", "Dépréciations des immobilisations incorporelles", "", "X"],
            ],
        },
    }),
    defineAccount("2901", "Frais d’établissement", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "290",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2901 - Frais d’établissement",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2901", "Frais d’établissement", "", "X"],
            ],
        },
    }),
    defineAccount("2903", "Frais de développement", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "290",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2903 - Frais de développement",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2903", "Frais de développement", "", "X"],
            ],
        },
    }),
    defineAccount("2905", "Marques, procédés, droits et valeurs similaires", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "290",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2905 - Marques, procédés, droits et valeurs similaires",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2905", "Marques, procédés, droits et valeurs similaires", "", "X"],
            ],
        },
    }),
    defineAccount("2906", "Droit au bail", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "290",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2906 - Droit au bail",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2906", "Droit au bail", "", "X"],
            ],
        },
    }),
    defineAccount("2907", "Fonds commercial", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "290",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2907 - Fonds commercial",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2907", "Fonds commercial", "", "X"],
            ],
        },
    }),
    defineAccount("2908", "Autres immobilisations incorporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "290",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2908 - Autres immobilisations incorporelles",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2908", "Autres immobilisations incorporelles", "", "X"],
            ],
        },
    }),
    defineAccount("29081", "Dépréciation du mali de fusion sur actifs incorporels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2908",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 29081 - Dépréciation du mali de fusion sur actifs incorporels",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["29081", "Dépréciation du mali de fusion sur actifs incorporels", "", "X"],
            ],
        },
    }),
    defineAccount("291", "Dépréciations des immobilisations corporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "29",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 291 - Dépréciations des immobilisations corporelles",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["291", "Dépréciations des immobilisations corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("2911", "Terrains", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "291",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2911 - Terrains",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2911", "Terrains", "", "X"],
            ],
        },
    }),
    defineAccount("2912", "Agencements et aménagements de terrains", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "291",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2912 - Agencements et aménagements de terrains",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2912", "Agencements et aménagements de terrains", "", "X"],
            ],
        },
    }),
    defineAccount("2913", "Constructions", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "291",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2913 - Constructions",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2913", "Constructions", "", "X"],
            ],
        },
    }),
    defineAccount("2914", "Constructions sur sol d'autrui", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "291",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2914 - Constructions sur sol d'autrui",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2914", "Constructions sur sol d'autrui", "", "X"],
            ],
        },
    }),
    defineAccount("2915", "Installations techniques, matériels et outillages industriels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "291",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description:
                "Écriture type pour le compte 2915 - Installations techniques, matériels et outillages industriels",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2915", "Installations techniques, matériels et outillages industriels", "", "X"],
            ],
        },
    }),
    defineAccount("2918", "Autres immobilisations corporelles", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "291",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2918 - Autres immobilisations corporelles",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2918", "Autres immobilisations corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("29187", "Dépréciation du mali de fusion sur actifs corporels", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "2918",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 29187 - Dépréciation du mali de fusion sur actifs corporels",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["29187", "Dépréciation du mali de fusion sur actifs corporels", "", "X"],
            ],
        },
    }),
    defineAccount("292", "Dépréciations des immobilisations mises en concession", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "29",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 292 - Dépréciations des immobilisations mises en concession",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["292", "Dépréciations des immobilisations mises en concession", "", "X"],
            ],
        },
    }),
    defineAccount("293", "Dépréciations des immobilisations en cours", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "29",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 293 - Dépréciations des immobilisations en cours",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["293", "Dépréciations des immobilisations en cours", "", "X"],
            ],
        },
    }),
    defineAccount("2931", "Immobilisations corporelles en cours", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "293",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2931 - Immobilisations corporelles en cours",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2931", "Immobilisations corporelles en cours", "", "X"],
            ],
        },
    }),
    defineAccount("2932", "Immobilisations incorporelles en cours", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "293",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2932 - Immobilisations incorporelles en cours",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2932", "Immobilisations incorporelles en cours", "", "X"],
            ],
        },
    }),
    defineAccount("296", "Dépréciations des participations et créances rattachées à des participations", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "29",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description:
                "Écriture type pour le compte 296 - Dépréciations des participations et créances rattachées à des participations",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["296", "Dépréciations des participations et créances rattachées à des participations", "", "X"],
            ],
        },
    }),
    defineAccount("2961", "Titres de participation", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "296",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2961 - Titres de participation",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2961", "Titres de participation", "", "X"],
            ],
        },
    }),
    defineAccount("2962", "Titres évalués par équivalence", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "296",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2962 - Titres évalués par équivalence",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2962", "Titres évalués par équivalence", "", "X"],
            ],
        },
    }),
    defineAccount("2966", "Autres formes de participation", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "296",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2966 - Autres formes de participation",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2966", "Autres formes de participation", "", "X"],
            ],
        },
    }),
    defineAccount("2967", "Créances rattachées à des participations (même ventilation que celle du compte 267)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "296",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description:
                "Écriture type pour le compte 2967 - Créances rattachées à des participations (même ventilation que celle du compte 267)",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                [
                    "2967",
                    "Créances rattachées à des participations (même ventilation que celle du compte 267)",
                    "",
                    "X",
                ],
            ],
        },
    }),
    defineAccount(
        "2968",
        "Créances rattachées à des sociétés en participation (même ventilation que celle du compte 268)",
        {
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "296",
            counterpart: {
                number: "6816",
                label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
            },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
                "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
            ],
            debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
            creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
            journalExample: {
                description:
                    "Écriture type pour le compte 2968 - Créances rattachées à des sociétés en participation (même ventilation que celle du compte 268)",
                rows: [
                    ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                    [
                        "2968",
                        "Créances rattachées à des sociétés en participation (même ventilation que celle du compte 268)",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("297", "Dépréciations des autres immobilisations financières", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "29",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 297 - Dépréciations des autres immobilisations financières",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["297", "Dépréciations des autres immobilisations financières", "", "X"],
            ],
        },
    }),
    defineAccount(
        "2971",
        "Titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
        {
            classNumber: 2,
            className: "Comptes d'immobilisations",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "297",
            counterpart: {
                number: "6816",
                label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
            },
            usageTips: [
                "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
                "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
            ],
            debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
            creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
            journalExample: {
                description:
                    "Écriture type pour le compte 2971 - Titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
                rows: [
                    ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                    [
                        "2971",
                        "Titres immobilisés autres que les titres immobilisés de l'activité de portefeuille (droit de propriété)",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("2972", "Titres immobilisés (droit de créance)", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "297",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2972 - Titres immobilisés (droit de créance)",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2972", "Titres immobilisés (droit de créance)", "", "X"],
            ],
        },
    }),
    defineAccount("2973", "Titres immobilisés de l'activité de portefeuille", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "297",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2973 - Titres immobilisés de l'activité de portefeuille",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2973", "Titres immobilisés de l'activité de portefeuille", "", "X"],
            ],
        },
    }),
    defineAccount("2974", "Prêts", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "297",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2974 - Prêts",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2974", "Prêts", "", "X"],
            ],
        },
    }),
    defineAccount("2975", "Dépôts et cautionnements versés", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "297",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2975 - Dépôts et cautionnements versés",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2975", "Dépôts et cautionnements versés", "", "X"],
            ],
        },
    }),
    defineAccount("2976", "Autres créances immobilisées", {
        classNumber: 2,
        className: "Comptes d'immobilisations",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "297",
        counterpart: {
            number: "6816",
            label: "Dotations pour dépréciations des immobilisations incorporelles et corporelles",
        },
        usageTips: [
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations (reprise de dépréciation)",
        creditMeaning: "Augmentation des dépréciations (dotation aux dépréciations)",
        journalExample: {
            description: "Écriture type pour le compte 2976 - Autres créances immobilisées",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["2976", "Autres créances immobilisées", "", "X"],
            ],
        },
    }),

    // Classe 3 - Comptes de stocks et en-cours
    defineAccount("3", "Comptes de stocks et en-cours", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: null,
        counterpart: { number: "603", label: "Variation des stocks d'approvisionnements et de marchandises" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de comptes de stocks et en-cours",
        creditMeaning: "Diminution de comptes de stocks et en-cours",
        journalExample: {
            description: "Écriture type pour le compte 3 - Comptes de stocks et en-cours",
            rows: [
                ["3", "Comptes de stocks et en-cours", "X", ""],
                ["603", "Variation des stocks d'approvisionnements et de marchandises", "", "X"],
            ],
        },
    }),
    defineAccount("31", "Matières premières et fournitures", {
        description:
            "Stocks de matières premières et fournitures destinées à être transformées ou consommées dans le processus de production.",
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de matières premières et fournitures",
        creditMeaning: "Diminution de matières premières et fournitures",
        journalExample: {
            description: "Écriture type pour le compte 31 - Matières premières et fournitures",
            rows: [
                ["31", "Matières premières et fournitures", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("32", "Autres approvisionnements", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de autres approvisionnements",
        creditMeaning: "Diminution de autres approvisionnements",
        journalExample: {
            description: "Écriture type pour le compte 32 - Autres approvisionnements",
            rows: [
                ["32", "Autres approvisionnements", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("321", "Matières consommables", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "32",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de matières consommables",
        creditMeaning: "Diminution de matières consommables",
        journalExample: {
            description: "Écriture type pour le compte 321 - Matières consommables",
            rows: [
                ["321", "Matières consommables", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("322", "Fournitures consommables", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "32",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de fournitures consommables",
        creditMeaning: "Diminution de fournitures consommables",
        journalExample: {
            description: "Écriture type pour le compte 322 - Fournitures consommables",
            rows: [
                ["322", "Fournitures consommables", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3221", "Combustibles", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "322",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de combustibles",
        creditMeaning: "Diminution de combustibles",
        journalExample: {
            description: "Écriture type pour le compte 3221 - Combustibles",
            rows: [
                ["3221", "Combustibles", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3222", "Produits d'entretien", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "322",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de produits d'entretien",
        creditMeaning: "Diminution de produits d'entretien",
        journalExample: {
            description: "Écriture type pour le compte 3222 - Produits d'entretien",
            rows: [
                ["3222", "Produits d'entretien", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3223", "Fournitures d'atelier et d'usine", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "322",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de fournitures d'atelier et d'usine",
        creditMeaning: "Diminution de fournitures d'atelier et d'usine",
        journalExample: {
            description: "Écriture type pour le compte 3223 - Fournitures d'atelier et d'usine",
            rows: [
                ["3223", "Fournitures d'atelier et d'usine", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3224", "Fournitures de magasin", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "322",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de fournitures de magasin",
        creditMeaning: "Diminution de fournitures de magasin",
        journalExample: {
            description: "Écriture type pour le compte 3224 - Fournitures de magasin",
            rows: [
                ["3224", "Fournitures de magasin", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3225", "Fournitures de bureau", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "322",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de fournitures de bureau",
        creditMeaning: "Diminution de fournitures de bureau",
        journalExample: {
            description: "Écriture type pour le compte 3225 - Fournitures de bureau",
            rows: [
                ["3225", "Fournitures de bureau", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("326", "Emballages", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "32",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de emballages",
        creditMeaning: "Diminution de emballages",
        journalExample: {
            description: "Écriture type pour le compte 326 - Emballages",
            rows: [
                ["326", "Emballages", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3261", "Emballages perdus", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "326",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de emballages perdus",
        creditMeaning: "Diminution de emballages perdus",
        journalExample: {
            description: "Écriture type pour le compte 3261 - Emballages perdus",
            rows: [
                ["3261", "Emballages perdus", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3265", "Emballages récupérables non identifiables", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "326",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de emballages récupérables non identifiables",
        creditMeaning: "Diminution de emballages récupérables non identifiables",
        journalExample: {
            description: "Écriture type pour le compte 3265 - Emballages récupérables non identifiables",
            rows: [
                ["3265", "Emballages récupérables non identifiables", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("3267", "Emballages à usage mixte", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "326",
        counterpart: { number: "6032", label: "Variation des stocks des autres approvisionnements" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de emballages à usage mixte",
        creditMeaning: "Diminution de emballages à usage mixte",
        journalExample: {
            description: "Écriture type pour le compte 3267 - Emballages à usage mixte",
            rows: [
                ["3267", "Emballages à usage mixte", "X", ""],
                ["6032", "Variation des stocks des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("33", "En-cours de production de biens", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "7133", label: "Variation des en-cours de production de biens" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de en-cours de production de biens",
        creditMeaning: "Diminution de en-cours de production de biens",
        journalExample: {
            description: "Écriture type pour le compte 33 - En-cours de production de biens",
            rows: [
                ["33", "En-cours de production de biens", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("331", "Produits en cours", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "33",
        counterpart: { number: "7133", label: "Variation des en-cours de production de biens" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de produits en cours",
        creditMeaning: "Diminution de produits en cours",
        journalExample: {
            description: "Écriture type pour le compte 331 - Produits en cours",
            rows: [
                ["331", "Produits en cours", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("335", "Travaux en cours", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "33",
        counterpart: { number: "7133", label: "Variation des en-cours de production de biens" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de travaux en cours",
        creditMeaning: "Diminution de travaux en cours",
        journalExample: {
            description: "Écriture type pour le compte 335 - Travaux en cours",
            rows: [
                ["335", "Travaux en cours", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("34", "En-cours de production de services", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "7133", label: "Variation des en-cours de production de biens" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de en-cours de production de services",
        creditMeaning: "Diminution de en-cours de production de services",
        journalExample: {
            description: "Écriture type pour le compte 34 - En-cours de production de services",
            rows: [
                ["34", "En-cours de production de services", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("341", "Études en cours", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "34",
        counterpart: { number: "7133", label: "Variation des en-cours de production de biens" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de études en cours",
        creditMeaning: "Diminution de études en cours",
        journalExample: {
            description: "Écriture type pour le compte 341 - Études en cours",
            rows: [
                ["341", "Études en cours", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("345", "Prestations de services en cours", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "34",
        counterpart: { number: "7133", label: "Variation des en-cours de production de biens" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de prestations de services en cours",
        creditMeaning: "Diminution de prestations de services en cours",
        journalExample: {
            description: "Écriture type pour le compte 345 - Prestations de services en cours",
            rows: [
                ["345", "Prestations de services en cours", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("35", "Stocks de produits", {
        description: "Produits intermédiaires, finis et résiduels en stock.",
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de stocks de produits",
        creditMeaning: "Diminution de stocks de produits",
        journalExample: {
            description: "Écriture type pour le compte 35 - Stocks de produits",
            rows: [
                ["35", "Stocks de produits", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("351", "Produits intermédiaires", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "35",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de produits intermédiaires",
        creditMeaning: "Diminution de produits intermédiaires",
        journalExample: {
            description: "Écriture type pour le compte 351 - Produits intermédiaires",
            rows: [
                ["351", "Produits intermédiaires", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("355", "Produits finis", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "35",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de produits finis",
        creditMeaning: "Diminution de produits finis",
        journalExample: {
            description: "Écriture type pour le compte 355 - Produits finis",
            rows: [
                ["355", "Produits finis", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("358", "Produits résiduels ou matières de récupération", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "35",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de produits résiduels ou matières de récupération",
        creditMeaning: "Diminution de produits résiduels ou matières de récupération",
        journalExample: {
            description: "Écriture type pour le compte 358 - Produits résiduels ou matières de récupération",
            rows: [
                ["358", "Produits résiduels ou matières de récupération", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("3581", "Déchets", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "358",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de déchets",
        creditMeaning: "Diminution de déchets",
        journalExample: {
            description: "Écriture type pour le compte 3581 - Déchets",
            rows: [
                ["3581", "Déchets", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("3585", "Rebuts", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "358",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de rebuts",
        creditMeaning: "Diminution de rebuts",
        journalExample: {
            description: "Écriture type pour le compte 3585 - Rebuts",
            rows: [
                ["3585", "Rebuts", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("3586", "Matières de récupération", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "358",
        counterpart: { number: "6031", label: "Variation des stocks de matières premières et fournitures" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de matières de récupération",
        creditMeaning: "Diminution de matières de récupération",
        journalExample: {
            description: "Écriture type pour le compte 3586 - Matières de récupération",
            rows: [
                ["3586", "Matières de récupération", "X", ""],
                ["6031", "Variation des stocks de matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("36", "(Compte à ouvrir, le cas échéant, sous l'intitulé « Stocks provenant d'immobilisations »)", {
        description: "Éléments démontés ou récupérés sur des immobilisations corporelles, entrés en stock.",
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "603", label: "Variation des stocks d'approvisionnements et de marchandises" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning:
            "Augmentation de (compte à ouvrir, le cas échéant, sous l'intitulé « stocks provenant d'immobilisations »)",
        creditMeaning:
            "Diminution de (compte à ouvrir, le cas échéant, sous l'intitulé « stocks provenant d'immobilisations »)",
        journalExample: {
            description:
                "Écriture type pour le compte 36 - (Compte à ouvrir, le cas échéant, sous l'intitulé « Stocks provenant d'immobilisations »)",
            rows: [
                [
                    "36",
                    "(Compte à ouvrir, le cas échéant, sous l'intitulé « Stocks provenant d'immobilisations »)",
                    "X",
                    "",
                ],
                ["603", "Variation des stocks d'approvisionnements et de marchandises", "", "X"],
            ],
        },
    }),
    defineAccount("37", "Stocks de marchandises", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "6037", label: "Variation des stocks de marchandises 61/62 Autres charges externes" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        ],
        debitMeaning: "Augmentation de stocks de marchandises",
        creditMeaning: "Diminution de stocks de marchandises",
        journalExample: {
            description: "Écriture type pour le compte 37 - Stocks de marchandises",
            rows: [
                ["37", "Stocks de marchandises", "X", ""],
                ["6037", "Variation des stocks de marchandises 61/62 Autres charges externes", "", "X"],
            ],
        },
    }),
    defineAccount(
        "38",
        "(Le compte 38 peut être utilisé pour comptabiliser les stocks en voie d'acheminement, mis en dépôt ou donnés en consignation)",
        {
            classNumber: 3,
            className: "Comptes de stocks et en-cours",
            type: "bilan",
            side: "actif",
            isOptional: false,
            parent: "3",
            counterpart: { number: "603", label: "Variation des stocks d'approvisionnements et de marchandises" },
            usageTips: [
                "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            ],
            debitMeaning:
                "Augmentation de (le compte 38 peut être utilisé pour comptabiliser les stocks en voie d'acheminement, mis en dépôt ou donnés en consignation)",
            creditMeaning:
                "Diminution de (le compte 38 peut être utilisé pour comptabiliser les stocks en voie d'acheminement, mis en dépôt ou donnés en consignation)",
            journalExample: {
                description:
                    "Écriture type pour le compte 38 - (Le compte 38 peut être utilisé pour comptabiliser les stocks en voie d'acheminement, mis en dépôt ou donnés en consignation)",
                rows: [
                    [
                        "38",
                        "(Le compte 38 peut être utilisé pour comptabiliser les stocks en voie d'acheminement, mis en dépôt ou donnés en consignation)",
                        "X",
                        "",
                    ],
                    ["603", "Variation des stocks d'approvisionnements et de marchandises", "", "X"],
                ],
            },
        },
    ),
    defineAccount("39", "Dépréciations des stocks et en-cours", {
        description: "Pertes de valeur réversibles constatées sur les stocks et en-cours de production.",
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "3",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 39 - Dépréciations des stocks et en-cours",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["39", "Dépréciations des stocks et en-cours", "", "X"],
            ],
        },
    }),
    defineAccount("391", "Dépréciations des matières premières et fournitures", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "39",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 391 - Dépréciations des matières premières et fournitures",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["391", "Dépréciations des matières premières et fournitures", "", "X"],
            ],
        },
    }),
    defineAccount("392", "Dépréciations des autres approvisionnements", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "39",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 392 - Dépréciations des autres approvisionnements",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["392", "Dépréciations des autres approvisionnements", "", "X"],
            ],
        },
    }),
    defineAccount("393", "Dépréciations des en-cours de production de biens", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "39",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 393 - Dépréciations des en-cours de production de biens",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["393", "Dépréciations des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("394", "Dépréciations des en-cours de production de services", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "39",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 394 - Dépréciations des en-cours de production de services",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["394", "Dépréciations des en-cours de production de services", "", "X"],
            ],
        },
    }),
    defineAccount("395", "Dépréciations des stocks de produits", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "39",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 395 - Dépréciations des stocks de produits",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["395", "Dépréciations des stocks de produits", "", "X"],
            ],
        },
    }),
    defineAccount("397", "Dépréciations des stocks de marchandises", {
        classNumber: 3,
        className: "Comptes de stocks et en-cours",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "39",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
            "Ce compte enregistre la perte de valeur par dépréciation. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.",
        ],
        debitMeaning: "Diminution des dépréciations de stocks (reprise)",
        creditMeaning: "Augmentation des dépréciations de stocks (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 397 - Dépréciations des stocks de marchandises",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["397", "Dépréciations des stocks de marchandises", "", "X"],
            ],
        },
    }),

    // Classe 4 - Comptes de tiers
    defineAccount("4", "Comptes de tiers", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: null,
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes de tiers",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes de tiers",
        journalExample: {
            description: "Écriture type pour le compte 4 - Comptes de tiers",
            rows: [
                ["4", "Comptes de tiers", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("40", "Fournisseurs et comptes rattachés", {
        description: "Dettes et avances liées à l'acquisition de biens ou de services.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs et comptes rattachés",
        creditMeaning: "Augmentation de fournisseurs et comptes rattachés",
        journalExample: {
            description: "Écriture type pour le compte 40 - Fournisseurs et comptes rattachés",
            rows: [
                ["512", "Banques", "X", ""],
                ["40", "Fournisseurs et comptes rattachés", "", "X"],
            ],
        },
    }),
    defineAccount("401", "Fournisseurs", {
        description: "Dettes envers les fournisseurs de biens et services.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "40",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs",
        creditMeaning: "Augmentation de fournisseurs",
        journalExample: {
            description: "Écriture type pour le compte 401 - Fournisseurs",
            rows: [
                ["512", "Banques", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("4011", "Fournisseurs - Achats de biens et prestations de services", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "401",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs - achats de biens et prestations de services",
        creditMeaning: "Augmentation de fournisseurs - achats de biens et prestations de services",
        journalExample: {
            description:
                "Écriture type pour le compte 4011 - Fournisseurs - Achats de biens et prestations de services",
            rows: [
                ["512", "Banques", "X", ""],
                ["4011", "Fournisseurs - Achats de biens et prestations de services", "", "X"],
            ],
        },
    }),
    defineAccount("4017", "Fournisseurs - Retenues de garantie", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "401",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs - retenues de garantie",
        creditMeaning: "Augmentation de fournisseurs - retenues de garantie",
        journalExample: {
            description: "Écriture type pour le compte 4017 - Fournisseurs - Retenues de garantie",
            rows: [
                ["512", "Banques", "X", ""],
                ["4017", "Fournisseurs - Retenues de garantie", "", "X"],
            ],
        },
    }),
    defineAccount("403", "Fournisseurs - Effets à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "40",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs - effets à payer",
        creditMeaning: "Augmentation de fournisseurs - effets à payer",
        journalExample: {
            description: "Écriture type pour le compte 403 - Fournisseurs - Effets à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["403", "Fournisseurs - Effets à payer", "", "X"],
            ],
        },
    }),
    defineAccount("404", "Fournisseurs d'immobilisations", {
        description: "Dettes envers les fournisseurs d'immobilisations incorporelles et corporelles.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "40",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs d'immobilisations",
        creditMeaning: "Augmentation de fournisseurs d'immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 404 - Fournisseurs d'immobilisations",
            rows: [
                ["512", "Banques", "X", ""],
                ["404", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("4041", "Fournisseurs - Achats d'immobilisations", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "404",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs - achats d'immobilisations",
        creditMeaning: "Augmentation de fournisseurs - achats d'immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 4041 - Fournisseurs - Achats d'immobilisations",
            rows: [
                ["512", "Banques", "X", ""],
                ["4041", "Fournisseurs - Achats d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("4047", "Fournisseurs d'immobilisations - Retenues de garantie", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "404",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs d'immobilisations - retenues de garantie",
        creditMeaning: "Augmentation de fournisseurs d'immobilisations - retenues de garantie",
        journalExample: {
            description: "Écriture type pour le compte 4047 - Fournisseurs d'immobilisations - Retenues de garantie",
            rows: [
                ["512", "Banques", "X", ""],
                ["4047", "Fournisseurs d'immobilisations - Retenues de garantie", "", "X"],
            ],
        },
    }),
    defineAccount("405", "Fournisseurs d'immobilisations - Effets à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "40",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs d'immobilisations - effets à payer",
        creditMeaning: "Augmentation de fournisseurs d'immobilisations - effets à payer",
        journalExample: {
            description: "Écriture type pour le compte 405 - Fournisseurs d'immobilisations - Effets à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["405", "Fournisseurs d'immobilisations - Effets à payer", "", "X"],
            ],
        },
    }),
    defineAccount("408", "Fournisseurs - Factures non parvenues", {
        description: "Dettes fournisseurs dont les factures ne sont pas encore parvenues à la clôture de l'exercice.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "40",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs - factures non parvenues",
        creditMeaning: "Augmentation de fournisseurs - factures non parvenues",
        journalExample: {
            description: "Écriture type pour le compte 408 - Fournisseurs - Factures non parvenues",
            rows: [
                ["512", "Banques", "X", ""],
                ["408", "Fournisseurs - Factures non parvenues", "", "X"],
            ],
        },
    }),
    defineAccount("4081", "Fournisseurs", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "408",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs",
        creditMeaning: "Augmentation de fournisseurs",
        journalExample: {
            description: "Écriture type pour le compte 4081 - Fournisseurs",
            rows: [
                ["512", "Banques", "X", ""],
                ["4081", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("4084", "Fournisseurs d'immobilisations", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "408",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs d'immobilisations",
        creditMeaning: "Augmentation de fournisseurs d'immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 4084 - Fournisseurs d'immobilisations",
            rows: [
                ["512", "Banques", "X", ""],
                ["4084", "Fournisseurs d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("4088", "Fournisseurs - Intérêts courus", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "408",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de fournisseurs - intérêts courus",
        creditMeaning: "Augmentation de fournisseurs - intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 4088 - Fournisseurs - Intérêts courus",
            rows: [
                ["512", "Banques", "X", ""],
                ["4088", "Fournisseurs - Intérêts courus", "", "X"],
            ],
        },
    }),
    defineAccount("409", "Fournisseurs débiteurs", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "40",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de fournisseurs débiteurs",
        creditMeaning: "Diminution de fournisseurs débiteurs",
        journalExample: {
            description: "Écriture type pour le compte 409 - Fournisseurs débiteurs",
            rows: [
                ["409", "Fournisseurs débiteurs", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4091", "Fournisseurs - Avances et acomptes versés sur commandes", {
        description: "Avances et acomptes versés aux fournisseurs sur commandes d'exploitation.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "409",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de fournisseurs - avances et acomptes versés sur commandes",
        creditMeaning: "Diminution de fournisseurs - avances et acomptes versés sur commandes",
        journalExample: {
            description: "Écriture type pour le compte 4091 - Fournisseurs - Avances et acomptes versés sur commandes",
            rows: [
                ["4091", "Fournisseurs - Avances et acomptes versés sur commandes", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4096", "Fournisseurs - Créances pour emballages et matériel à rendre", {
        description: "Créances correspondant aux emballages ou matériels consignés par les fournisseurs.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "409",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de fournisseurs - créances pour emballages et matériel à rendre",
        creditMeaning: "Diminution de fournisseurs - créances pour emballages et matériel à rendre",
        journalExample: {
            description:
                "Écriture type pour le compte 4096 - Fournisseurs - Créances pour emballages et matériel à rendre",
            rows: [
                ["4096", "Fournisseurs - Créances pour emballages et matériel à rendre", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4097", "Fournisseurs - Autres avoirs", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "409",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de fournisseurs - autres avoirs",
        creditMeaning: "Diminution de fournisseurs - autres avoirs",
        journalExample: {
            description: "Écriture type pour le compte 4097 - Fournisseurs - Autres avoirs",
            rows: [
                ["4097", "Fournisseurs - Autres avoirs", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("40971", "Fournisseurs d'exploitation", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4097",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de fournisseurs d'exploitation",
        creditMeaning: "Diminution de fournisseurs d'exploitation",
        journalExample: {
            description: "Écriture type pour le compte 40971 - Fournisseurs d'exploitation",
            rows: [
                ["40971", "Fournisseurs d'exploitation", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("40974", "Fournisseurs d'immobilisations", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4097",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de fournisseurs d'immobilisations",
        creditMeaning: "Diminution de fournisseurs d'immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 40974 - Fournisseurs d'immobilisations",
            rows: [
                ["40974", "Fournisseurs d'immobilisations", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4098", "Rabais, remises, ristournes à obtenir et autres avoirs non encore reçus", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "409",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de rabais, remises, ristournes à obtenir et autres avoirs non encore reçus",
        creditMeaning: "Diminution de rabais, remises, ristournes à obtenir et autres avoirs non encore reçus",
        journalExample: {
            description:
                "Écriture type pour le compte 4098 - Rabais, remises, ristournes à obtenir et autres avoirs non encore reçus",
            rows: [
                ["4098", "Rabais, remises, ristournes à obtenir et autres avoirs non encore reçus", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("41", "Clients et comptes rattachés", {
        description: "Créances liées à la vente de biens ou services rattachés au cycle d'exploitation.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de clients et comptes rattachés",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de clients et comptes rattachés",
        journalExample: {
            description: "Écriture type pour le compte 41 - Clients et comptes rattachés",
            rows: [
                ["41", "Clients et comptes rattachés", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("411", "Clients", {
        description: "Créances envers les clients pour les ventes réalisées.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "41",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients",
        creditMeaning: "Diminution de clients",
        journalExample: {
            description: "Écriture type pour le compte 411 - Clients",
            rows: [
                ["411", "Clients", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4111", "Clients - Ventes de biens ou de prestations de services", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "411",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients - ventes de biens ou de prestations de services",
        creditMeaning: "Diminution de clients - ventes de biens ou de prestations de services",
        journalExample: {
            description: "Écriture type pour le compte 4111 - Clients - Ventes de biens ou de prestations de services",
            rows: [
                ["4111", "Clients - Ventes de biens ou de prestations de services", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4117", "Clients - Retenues de garantie", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "411",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients - retenues de garantie",
        creditMeaning: "Diminution de clients - retenues de garantie",
        journalExample: {
            description: "Écriture type pour le compte 4117 - Clients - Retenues de garantie",
            rows: [
                ["4117", "Clients - Retenues de garantie", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("413", "Clients - Effets à recevoir", {
        description: "Lettres de change acceptées ou billets à ordre reçus des clients.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "41",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients - effets à recevoir",
        creditMeaning: "Diminution de clients - effets à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 413 - Clients - Effets à recevoir",
            rows: [
                ["413", "Clients - Effets à recevoir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("416", "Clients douteux ou litigieux", {
        description: "Créances clients dont le recouvrement est incertain ou fait l'objet d'un litige.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "41",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients douteux ou litigieux",
        creditMeaning: "Diminution de clients douteux ou litigieux",
        journalExample: {
            description: "Écriture type pour le compte 416 - Clients douteux ou litigieux",
            rows: [
                ["416", "Clients douteux ou litigieux", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("418", "Clients - Produits non encore facturés", {
        description:
            "Créances imputables à la période close pour lesquelles les factures n'ont pas encore été établies.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "41",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients - produits non encore facturés",
        creditMeaning: "Diminution de clients - produits non encore facturés",
        journalExample: {
            description: "Écriture type pour le compte 418 - Clients - Produits non encore facturés",
            rows: [
                ["418", "Clients - Produits non encore facturés", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4181", "Clients - Factures à établir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "418",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients - factures à établir",
        creditMeaning: "Diminution de clients - factures à établir",
        journalExample: {
            description: "Écriture type pour le compte 4181 - Clients - Factures à établir",
            rows: [
                ["4181", "Clients - Factures à établir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4188", "Clients - Intérêts courus", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "418",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de clients - intérêts courus",
        creditMeaning: "Diminution de clients - intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 4188 - Clients - Intérêts courus",
            rows: [
                ["4188", "Clients - Intérêts courus", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("419", "Clients créditeurs", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "41",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de clients créditeurs",
        creditMeaning: "Augmentation de clients créditeurs",
        journalExample: {
            description: "Écriture type pour le compte 419 - Clients créditeurs",
            rows: [
                ["512", "Banques", "X", ""],
                ["419", "Clients créditeurs", "", "X"],
            ],
        },
    }),
    defineAccount("4191", "Clients - Avances et acomptes reçus sur commandes", {
        description: "Avances et acomptes reçus des clients sur commandes à livrer ou services à rendre.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "419",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de clients - avances et acomptes reçus sur commandes",
        creditMeaning: "Augmentation de clients - avances et acomptes reçus sur commandes",
        journalExample: {
            description: "Écriture type pour le compte 4191 - Clients - Avances et acomptes reçus sur commandes",
            rows: [
                ["512", "Banques", "X", ""],
                ["4191", "Clients - Avances et acomptes reçus sur commandes", "", "X"],
            ],
        },
    }),
    defineAccount("4196", "Clients - Dettes sur emballages et matériels consignés", {
        description: "Sommes facturées aux clients au titre des consignations d'emballages ou de matériel.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "419",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de clients - dettes sur emballages et matériels consignés",
        creditMeaning: "Augmentation de clients - dettes sur emballages et matériels consignés",
        journalExample: {
            description: "Écriture type pour le compte 4196 - Clients - Dettes sur emballages et matériels consignés",
            rows: [
                ["512", "Banques", "X", ""],
                ["4196", "Clients - Dettes sur emballages et matériels consignés", "", "X"],
            ],
        },
    }),
    defineAccount("4197", "Clients - Autres avoirs", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "419",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de clients - autres avoirs",
        creditMeaning: "Augmentation de clients - autres avoirs",
        journalExample: {
            description: "Écriture type pour le compte 4197 - Clients - Autres avoirs",
            rows: [
                ["512", "Banques", "X", ""],
                ["4197", "Clients - Autres avoirs", "", "X"],
            ],
        },
    }),
    defineAccount("4198", "Rabais, remises, ristournes à accorder et autres avoirs à établir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "419",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de rabais, remises, ristournes à accorder et autres avoirs à établir",
        creditMeaning: "Augmentation de rabais, remises, ristournes à accorder et autres avoirs à établir",
        journalExample: {
            description:
                "Écriture type pour le compte 4198 - Rabais, remises, ristournes à accorder et autres avoirs à établir",
            rows: [
                ["512", "Banques", "X", ""],
                ["4198", "Rabais, remises, ristournes à accorder et autres avoirs à établir", "", "X"],
            ],
        },
    }),
    defineAccount("42", "Personnel et comptes rattachés", {
        description: "Dettes et créances liées aux rémunérations du personnel et charges sociales associées.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de personnel et comptes rattachés",
        creditMeaning: "Augmentation de personnel et comptes rattachés",
        journalExample: {
            description: "Écriture type pour le compte 42 - Personnel et comptes rattachés",
            rows: [
                ["512", "Banques", "X", ""],
                ["42", "Personnel et comptes rattachés", "", "X"],
            ],
        },
    }),
    defineAccount("421", "Personnel - Rémunérations dues", {
        description: "Salaires nets à payer aux employés.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de personnel - rémunérations dues",
        creditMeaning: "Augmentation de personnel - rémunérations dues",
        journalExample: {
            description: "Écriture type pour le compte 421 - Personnel - Rémunérations dues",
            rows: [
                ["512", "Banques", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("422", "Comité social et économique", {
        description: "Sommes mises à disposition du comité social et économique de l'entité.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de comité social et économique",
        creditMeaning: "Augmentation de comité social et économique",
        journalExample: {
            description: "Écriture type pour le compte 422 - Comité social et économique",
            rows: [
                ["512", "Banques", "X", ""],
                ["422", "Comité social et économique", "", "X"],
            ],
        },
    }),
    defineAccount("424", "Participation des salariés aux résultats", {
        description: "Sommes attribuées aux salariés au titre de la participation aux résultats de l'entité.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de participation des salariés aux résultats",
        creditMeaning: "Augmentation de participation des salariés aux résultats",
        journalExample: {
            description: "Écriture type pour le compte 424 - Participation des salariés aux résultats",
            rows: [
                ["512", "Banques", "X", ""],
                ["424", "Participation des salariés aux résultats", "", "X"],
            ],
        },
    }),
    defineAccount("4246", "Réserve spéciale", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "424",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de réserve spéciale",
        creditMeaning: "Augmentation de réserve spéciale",
        journalExample: {
            description: "Écriture type pour le compte 4246 - Réserve spéciale",
            rows: [
                ["512", "Banques", "X", ""],
                ["4246", "Réserve spéciale", "", "X"],
            ],
        },
    }),
    defineAccount("4248", "Comptes courants", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "424",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de comptes courants",
        creditMeaning: "Augmentation de comptes courants",
        journalExample: {
            description: "Écriture type pour le compte 4248 - Comptes courants",
            rows: [
                ["512", "Banques", "X", ""],
                ["4248", "Comptes courants", "", "X"],
            ],
        },
    }),
    defineAccount("425", "Personnel - Avances et acomptes et autres comptes débiteurs", {
        description: "Avances et acomptes versés au personnel et autres créances liées aux charges de personnel.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de personnel - avances et acomptes et autres comptes débiteurs",
        creditMeaning: "Diminution de personnel - avances et acomptes et autres comptes débiteurs",
        journalExample: {
            description:
                "Écriture type pour le compte 425 - Personnel - Avances et acomptes et autres comptes débiteurs",
            rows: [
                ["425", "Personnel - Avances et acomptes et autres comptes débiteurs", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("426", "Personnel - Dépôts", {
        description: "Sommes confiées en dépôt à l'entité par les membres de son personnel.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de personnel - dépôts",
        creditMeaning: "Augmentation de personnel - dépôts",
        journalExample: {
            description: "Écriture type pour le compte 426 - Personnel - Dépôts",
            rows: [
                ["512", "Banques", "X", ""],
                ["426", "Personnel - Dépôts", "", "X"],
            ],
        },
    }),
    defineAccount("427", "Personnel - Oppositions", {
        description: "Sommes faisant l'objet d'oppositions obtenues par des tiers à l'encontre du personnel.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de personnel - oppositions",
        creditMeaning: "Augmentation de personnel - oppositions",
        journalExample: {
            description: "Écriture type pour le compte 427 - Personnel - Oppositions",
            rows: [
                ["512", "Banques", "X", ""],
                ["427", "Personnel - Oppositions", "", "X"],
            ],
        },
    }),
    defineAccount("428", "Personnel - Charges à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "42",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de personnel - charges à payer",
        creditMeaning: "Augmentation de personnel - charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 428 - Personnel - Charges à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["428", "Personnel - Charges à payer", "", "X"],
            ],
        },
    }),
    defineAccount("4282", "Dettes provisionnées pour congés à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "428",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de dettes provisionnées pour congés à payer",
        creditMeaning: "Augmentation de dettes provisionnées pour congés à payer",
        journalExample: {
            description: "Écriture type pour le compte 4282 - Dettes provisionnées pour congés à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["4282", "Dettes provisionnées pour congés à payer", "", "X"],
            ],
        },
    }),
    defineAccount("4284", "Dettes provisionnées pour participation des salariés aux résultats", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "428",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de dettes provisionnées pour participation des salariés aux résultats",
        creditMeaning: "Augmentation de dettes provisionnées pour participation des salariés aux résultats",
        journalExample: {
            description:
                "Écriture type pour le compte 4284 - Dettes provisionnées pour participation des salariés aux résultats",
            rows: [
                ["512", "Banques", "X", ""],
                ["4284", "Dettes provisionnées pour participation des salariés aux résultats", "", "X"],
            ],
        },
    }),
    defineAccount("4286", "Autres charges à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "428",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de autres charges à payer",
        creditMeaning: "Augmentation de autres charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 4286 - Autres charges à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["4286", "Autres charges à payer", "", "X"],
            ],
        },
    }),
    defineAccount("43", "Sécurité sociale et autres organismes sociaux", {
        description: "Cotisations sociales dues à la Sécurité sociale et aux organismes sociaux.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de sécurité sociale et autres organismes sociaux",
        creditMeaning: "Augmentation de sécurité sociale et autres organismes sociaux",
        journalExample: {
            description: "Écriture type pour le compte 43 - Sécurité sociale et autres organismes sociaux",
            rows: [
                ["512", "Banques", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("431", "Sécurité sociale", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "43",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de sécurité sociale",
        creditMeaning: "Augmentation de sécurité sociale",
        journalExample: {
            description: "Écriture type pour le compte 431 - Sécurité sociale",
            rows: [
                ["512", "Banques", "X", ""],
                ["431", "Sécurité sociale", "", "X"],
            ],
        },
    }),
    defineAccount("437", "Autres organismes sociaux", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "43",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de autres organismes sociaux",
        creditMeaning: "Augmentation de autres organismes sociaux",
        journalExample: {
            description: "Écriture type pour le compte 437 - Autres organismes sociaux",
            rows: [
                ["512", "Banques", "X", ""],
                ["437", "Autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("438", "Organismes sociaux - Charges à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "43",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de organismes sociaux - charges à payer",
        creditMeaning: "Augmentation de organismes sociaux - charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 438 - Organismes sociaux - Charges à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["438", "Organismes sociaux - Charges à payer", "", "X"],
            ],
        },
    }),
    defineAccount("4382", "Charges sociales sur congés à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "438",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de charges sociales sur congés à payer",
        creditMeaning: "Augmentation de charges sociales sur congés à payer",
        journalExample: {
            description: "Écriture type pour le compte 4382 - Charges sociales sur congés à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["4382", "Charges sociales sur congés à payer", "", "X"],
            ],
        },
    }),
    defineAccount("4386", "Autres charges à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "438",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de autres charges à payer",
        creditMeaning: "Augmentation de autres charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 4386 - Autres charges à payer",
            rows: [
                ["512", "Banques", "X", ""],
                ["4386", "Autres charges à payer", "", "X"],
            ],
        },
    }),
    defineAccount("439", "Organismes sociaux - Produits à recevoir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "43",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation de organismes sociaux - produits à recevoir",
        creditMeaning: "Diminution de organismes sociaux - produits à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 439 - Organismes sociaux - Produits à recevoir",
            rows: [
                ["439", "Organismes sociaux - Produits à recevoir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44", "État et autres collectivités publiques", {
        description: "Opérations avec l'État et les collectivités publiques (impôts, taxes, subventions).",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de état et autres collectivités publiques",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de état et autres collectivités publiques",
        journalExample: {
            description: "Écriture type pour le compte 44 - État et autres collectivités publiques",
            rows: [
                ["44", "État et autres collectivités publiques", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("441", "État - Subventions et aides à recevoir", {
        description: "Subventions d'investissement, d'exploitation ou d'équilibre accordées mais non encore perçues.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de état - subventions et aides à recevoir",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de état - subventions et aides à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 441 - État - Subventions et aides à recevoir",
            rows: [
                ["441", "État - Subventions et aides à recevoir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("442", "Contributions, impôts et taxes recouvrés pour le compte de l'État", {
        description: "Retenues effectuées par l'entité pour le compte de l'État (prélèvement à la source, etc.).",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de contributions, impôts et taxes recouvrés pour le compte de l'état",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de contributions, impôts et taxes recouvrés pour le compte de l'état",
        journalExample: {
            description:
                "Écriture type pour le compte 442 - Contributions, impôts et taxes recouvrés pour le compte de l'État",
            rows: [
                ["442", "Contributions, impôts et taxes recouvrés pour le compte de l'État", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4421", "Prélèvements à la source (Impôt sur le revenu)", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "442",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de prélèvements à la source (impôt sur le revenu)",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de prélèvements à la source (impôt sur le revenu)",
        journalExample: {
            description: "Écriture type pour le compte 4421 - Prélèvements à la source (Impôt sur le revenu)",
            rows: [
                ["4421", "Prélèvements à la source (Impôt sur le revenu)", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4422", "Prélèvements forfaitaires non libératoires", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "442",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de prélèvements forfaitaires non libératoires",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de prélèvements forfaitaires non libératoires",
        journalExample: {
            description: "Écriture type pour le compte 4422 - Prélèvements forfaitaires non libératoires",
            rows: [
                ["4422", "Prélèvements forfaitaires non libératoires", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4423", "Retenues et prélèvements sur les distributions", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "442",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de retenues et prélèvements sur les distributions",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de retenues et prélèvements sur les distributions",
        journalExample: {
            description: "Écriture type pour le compte 4423 - Retenues et prélèvements sur les distributions",
            rows: [
                ["4423", "Retenues et prélèvements sur les distributions", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("444", "État - Impôts sur les bénéfices", {
        description: "Impôt sur les sociétés ou impôt sur le revenu dû au titre des bénéfices de l'entité.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de état - impôts sur les bénéfices",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de état - impôts sur les bénéfices",
        journalExample: {
            description: "Écriture type pour le compte 444 - État - Impôts sur les bénéfices",
            rows: [
                ["444", "État - Impôts sur les bénéfices", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("445", "État - Taxes sur le chiffre d'affaires", {
        description: "TVA collectée pour le compte de l'État et TVA déductible à récupérer.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de état - taxes sur le chiffre d'affaires",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de état - taxes sur le chiffre d'affaires",
        journalExample: {
            description: "Écriture type pour le compte 445 - État - Taxes sur le chiffre d'affaires",
            rows: [
                ["445", "État - Taxes sur le chiffre d'affaires", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4452", "TVA due intracommunautaire", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "445",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de tva due intracommunautaire",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de tva due intracommunautaire",
        journalExample: {
            description: "Écriture type pour le compte 4452 - TVA due intracommunautaire",
            rows: [
                ["4452", "TVA due intracommunautaire", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4455", "Taxes sur le chiffre d'affaires à décaisser", {
        description: "TVA nette à verser au Trésor public au titre de la période.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "445",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de taxes sur le chiffre d'affaires à décaisser",
        creditMeaning: "Augmentation de taxes sur le chiffre d'affaires à décaisser",
        journalExample: {
            description: "Écriture type pour le compte 4455 - Taxes sur le chiffre d'affaires à décaisser",
            rows: [
                ["512", "Banques", "X", ""],
                ["4455", "Taxes sur le chiffre d'affaires à décaisser", "", "X"],
            ],
        },
    }),
    defineAccount("44551", "TVA à décaisser", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "4455",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de tva à décaisser",
        creditMeaning: "Augmentation de tva à décaisser",
        journalExample: {
            description: "Écriture type pour le compte 44551 - TVA à décaisser",
            rows: [
                ["512", "Banques", "X", ""],
                ["44551", "TVA à décaisser", "", "X"],
            ],
        },
    }),
    defineAccount("44558", "Taxes assimilées à la TVA", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "4455",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution de taxes assimilées à la tva",
        creditMeaning: "Augmentation de taxes assimilées à la tva",
        journalExample: {
            description: "Écriture type pour le compte 44558 - Taxes assimilées à la TVA",
            rows: [
                ["512", "Banques", "X", ""],
                ["44558", "Taxes assimilées à la TVA", "", "X"],
            ],
        },
    }),
    defineAccount("4456", "Taxes sur le chiffre d'affaires déductibles", {
        description: "TVA payée sur les achats, que l'État vous doit ou que vous pouvez déduire de la TVA collectée.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "445",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Augmentation de taxes sur le chiffre d'affaires déductibles",
        creditMeaning: "Diminution de taxes sur le chiffre d'affaires déductibles",
        journalExample: {
            description: "Écriture type pour le compte 4456 - Taxes sur le chiffre d'affaires déductibles",
            rows: [
                ["4456", "Taxes sur le chiffre d'affaires déductibles", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("44562", "TVA sur immobilisations", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4456",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Augmentation de tva sur immobilisations",
        creditMeaning: "Diminution de tva sur immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 44562 - TVA sur immobilisations",
            rows: [
                ["44562", "TVA sur immobilisations", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("44563", "TVA transférée par d'autres entités", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4456",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Augmentation de tva transférée par d'autres entités",
        creditMeaning: "Diminution de tva transférée par d'autres entités",
        journalExample: {
            description: "Écriture type pour le compte 44563 - TVA transférée par d'autres entités",
            rows: [
                ["44563", "TVA transférée par d'autres entités", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("44566", "TVA sur autres biens et services", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4456",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Augmentation de tva sur autres biens et services",
        creditMeaning: "Diminution de tva sur autres biens et services",
        journalExample: {
            description: "Écriture type pour le compte 44566 - TVA sur autres biens et services",
            rows: [
                ["44566", "TVA sur autres biens et services", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("44567", "Crédit de TVA à reporter", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4456",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Augmentation de crédit de tva à reporter",
        creditMeaning: "Diminution de crédit de tva à reporter",
        journalExample: {
            description: "Écriture type pour le compte 44567 - Crédit de TVA à reporter",
            rows: [
                ["44567", "Crédit de TVA à reporter", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("44568", "Taxes assimilées à la TVA", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "4456",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Augmentation de taxes assimilées à la tva",
        creditMeaning: "Diminution de taxes assimilées à la tva",
        journalExample: {
            description: "Écriture type pour le compte 44568 - Taxes assimilées à la TVA",
            rows: [
                ["44568", "Taxes assimilées à la TVA", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("4457", "Taxes sur le chiffre d'affaires collectées", {
        description: "TVA facturée sur les ventes, que vous devez reverser à l'État.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: false,
        parent: "445",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Diminution de taxes sur le chiffre d'affaires collectées",
        creditMeaning: "Augmentation de taxes sur le chiffre d'affaires collectées",
        journalExample: {
            description: "Écriture type pour le compte 4457 - Taxes sur le chiffre d'affaires collectées",
            rows: [
                ["411", "Clients", "X", ""],
                ["4457", "Taxes sur le chiffre d'affaires collectées", "", "X"],
            ],
        },
    }),
    defineAccount("44571", "TVA collectée", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "4457",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Diminution de tva collectée",
        creditMeaning: "Augmentation de tva collectée",
        journalExample: {
            description: "Écriture type pour le compte 44571 - TVA collectée",
            rows: [
                ["411", "Clients", "X", ""],
                ["44571", "TVA collectée", "", "X"],
            ],
        },
    }),
    defineAccount("44578", "Taxes assimilées à la TVA", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "passif",
        isOptional: true,
        parent: "4457",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        ],
        debitMeaning: "Diminution de taxes assimilées à la tva",
        creditMeaning: "Augmentation de taxes assimilées à la tva",
        journalExample: {
            description: "Écriture type pour le compte 44578 - Taxes assimilées à la TVA",
            rows: [
                ["411", "Clients", "X", ""],
                ["44578", "Taxes assimilées à la TVA", "", "X"],
            ],
        },
    }),
    defineAccount("4458", "Taxes sur le chiffre d'affaires à régulariser ou en attente", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "445",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de taxes sur le chiffre d'affaires à régulariser ou en attente",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de taxes sur le chiffre d'affaires à régulariser ou en attente",
        journalExample: {
            description:
                "Écriture type pour le compte 4458 - Taxes sur le chiffre d'affaires à régulariser ou en attente",
            rows: [
                ["4458", "Taxes sur le chiffre d'affaires à régulariser ou en attente", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44581", "Acomptes - Régime simplifié d'imposition", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de acomptes - régime simplifié d'imposition",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de acomptes - régime simplifié d'imposition",
        journalExample: {
            description: "Écriture type pour le compte 44581 - Acomptes - Régime simplifié d'imposition",
            rows: [
                ["44581", "Acomptes - Régime simplifié d'imposition", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44583", "Remboursement de taxes sur le chiffre d'affaires demandé", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de remboursement de taxes sur le chiffre d'affaires demandé",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de remboursement de taxes sur le chiffre d'affaires demandé",
        journalExample: {
            description:
                "Écriture type pour le compte 44583 - Remboursement de taxes sur le chiffre d'affaires demandé",
            rows: [
                ["44583", "Remboursement de taxes sur le chiffre d'affaires demandé", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44584", "TVA récupérée d’avance", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de tva récupérée d’avance",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de tva récupérée d’avance",
        journalExample: {
            description: "Écriture type pour le compte 44584 - TVA récupérée d’avance",
            rows: [
                ["44584", "TVA récupérée d’avance", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44586", "Taxes sur le chiffre d’affaires sur factures non parvenues", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de taxes sur le chiffre d’affaires sur factures non parvenues",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de taxes sur le chiffre d’affaires sur factures non parvenues",
        journalExample: {
            description:
                "Écriture type pour le compte 44586 - Taxes sur le chiffre d’affaires sur factures non parvenues",
            rows: [
                ["44586", "Taxes sur le chiffre d’affaires sur factures non parvenues", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44587", "Taxes sur le chiffre d’affaires sur factures à établir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de taxes sur le chiffre d’affaires sur factures à établir",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de taxes sur le chiffre d’affaires sur factures à établir",
        journalExample: {
            description: "Écriture type pour le compte 44587 - Taxes sur le chiffre d’affaires sur factures à établir",
            rows: [
                ["44587", "Taxes sur le chiffre d’affaires sur factures à établir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("446", "Obligations cautionnées", {
        description: "Obligations cautionnées souscrites en règlement de taxes.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de obligations cautionnées",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de obligations cautionnées",
        journalExample: {
            description: "Écriture type pour le compte 446 - Obligations cautionnées",
            rows: [
                ["446", "Obligations cautionnées", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("447", "Autres impôts, taxes et versements assimilés", {
        description: "Tous impôts et taxes dus par l'entité autres que l'impôt sur les bénéfices et la TVA.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de autres impôts, taxes et versements assimilés",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de autres impôts, taxes et versements assimilés",
        journalExample: {
            description: "Écriture type pour le compte 447 - Autres impôts, taxes et versements assimilés",
            rows: [
                ["447", "Autres impôts, taxes et versements assimilés", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("448", "État - Charges à payer et produits à recevoir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de état - charges à payer et produits à recevoir",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de état - charges à payer et produits à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 448 - État - Charges à payer et produits à recevoir",
            rows: [
                ["448", "État - Charges à payer et produits à recevoir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4481", "État - Charges à Payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "448",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de état - charges à payer",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de état - charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 4481 - État - Charges à Payer",
            rows: [
                ["4481", "État - Charges à Payer", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44811", "Charges fiscales sur congés à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4481",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de charges fiscales sur congés à payer",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de charges fiscales sur congés à payer",
        journalExample: {
            description: "Écriture type pour le compte 44811 - Charges fiscales sur congés à payer",
            rows: [
                ["44811", "Charges fiscales sur congés à payer", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("44812", "Charges à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4481",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de charges à payer",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 44812 - Charges à payer",
            rows: [
                ["44812", "Charges à payer", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4482", "État - Produits à recevoir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "448",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de état - produits à recevoir",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de état - produits à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 4482 - État - Produits à recevoir",
            rows: [
                ["4482", "État - Produits à recevoir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("449", "Quotas d’émission à acquérir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "44",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de quotas d’émission à acquérir",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de quotas d’émission à acquérir",
        journalExample: {
            description: "Écriture type pour le compte 449 - Quotas d’émission à acquérir",
            rows: [
                ["449", "Quotas d’émission à acquérir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("45", "Groupe et associés", {
        description: "Opérations financières avec les sociétés du groupe et les associés.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de groupe et associés",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de groupe et associés",
        journalExample: {
            description: "Écriture type pour le compte 45 - Groupe et associés",
            rows: [
                ["45", "Groupe et associés", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("451", "Groupe", {
        description: "Fonds avancés ou reçus temporairement entre l'entité et les sociétés du groupe.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "45",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de groupe",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de groupe",
        journalExample: {
            description: "Écriture type pour le compte 451 - Groupe",
            rows: [
                ["451", "Groupe", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("455", "Associés - Comptes courants", {
        description: "Fonds mis ou laissés temporairement à la disposition de l'entité par les associés.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "45",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - comptes courants",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - comptes courants",
        journalExample: {
            description: "Écriture type pour le compte 455 - Associés - Comptes courants",
            rows: [
                ["455", "Associés - Comptes courants", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4551", "Principal", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "455",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de principal",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de principal",
        journalExample: {
            description: "Écriture type pour le compte 4551 - Principal",
            rows: [
                ["4551", "Principal", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4558", "Intérêts courus", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "455",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de intérêts courus",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 4558 - Intérêts courus",
            rows: [
                ["4558", "Intérêts courus", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("456", "Associés - Opérations sur le capital", {
        description: "Opérations relatives à la création de l'entité ou à la modification de son capital.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "45",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - opérations sur le capital",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - opérations sur le capital",
        journalExample: {
            description: "Écriture type pour le compte 456 - Associés - Opérations sur le capital",
            rows: [
                ["456", "Associés - Opérations sur le capital", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4561", "Associés - Comptes d'apport en société", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "456",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - comptes d'apport en société",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - comptes d'apport en société",
        journalExample: {
            description: "Écriture type pour le compte 4561 - Associés - Comptes d'apport en société",
            rows: [
                ["4561", "Associés - Comptes d'apport en société", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("45611", "Apports en nature", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4561",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de apports en nature",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de apports en nature",
        journalExample: {
            description: "Écriture type pour le compte 45611 - Apports en nature",
            rows: [
                ["45611", "Apports en nature", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("45615", "Apports en numéraire", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4561",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de apports en numéraire",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de apports en numéraire",
        journalExample: {
            description: "Écriture type pour le compte 45615 - Apports en numéraire",
            rows: [
                ["45615", "Apports en numéraire", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4562", "Apporteurs - Capital appelé, non versé", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "456",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de apporteurs - capital appelé, non versé",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de apporteurs - capital appelé, non versé",
        journalExample: {
            description: "Écriture type pour le compte 4562 - Apporteurs - Capital appelé, non versé",
            rows: [
                ["4562", "Apporteurs - Capital appelé, non versé", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("45621", "Actionnaires - Capital souscrit et appelé, non versé", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4562",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de actionnaires - capital souscrit et appelé, non versé",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de actionnaires - capital souscrit et appelé, non versé",
        journalExample: {
            description: "Écriture type pour le compte 45621 - Actionnaires - Capital souscrit et appelé, non versé",
            rows: [
                ["45621", "Actionnaires - Capital souscrit et appelé, non versé", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("45625", "Associés - Capital appelé, non versé", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "4562",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - capital appelé, non versé",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - capital appelé, non versé",
        journalExample: {
            description: "Écriture type pour le compte 45625 - Associés - Capital appelé, non versé",
            rows: [
                ["45625", "Associés - Capital appelé, non versé", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4563", "Associés - Versements reçus sur augmentation de capital", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "456",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de associés - versements reçus sur augmentation de capital",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de associés - versements reçus sur augmentation de capital",
        journalExample: {
            description: "Écriture type pour le compte 4563 - Associés - Versements reçus sur augmentation de capital",
            rows: [
                ["4563", "Associés - Versements reçus sur augmentation de capital", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4564", "Associés - Versements anticipés", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "456",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - versements anticipés",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - versements anticipés",
        journalExample: {
            description: "Écriture type pour le compte 4564 - Associés - Versements anticipés",
            rows: [
                ["4564", "Associés - Versements anticipés", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4566", "Actionnaires défaillants", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "456",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de actionnaires défaillants",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de actionnaires défaillants",
        journalExample: {
            description: "Écriture type pour le compte 4566 - Actionnaires défaillants",
            rows: [
                ["4566", "Actionnaires défaillants", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4567", "Associés - Capital à rembourser", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "456",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - capital à rembourser",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - capital à rembourser",
        journalExample: {
            description: "Écriture type pour le compte 4567 - Associés - Capital à rembourser",
            rows: [
                ["4567", "Associés - Capital à rembourser", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("457", "Associés - Dividendes à payer", {
        description: "Dividendes dont la distribution a été décidée par les organes compétents.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "45",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de associés - dividendes à payer",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de associés - dividendes à payer",
        journalExample: {
            description: "Écriture type pour le compte 457 - Associés - Dividendes à payer",
            rows: [
                ["457", "Associés - Dividendes à payer", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("458", "Associés - Opérations faites en commun et en GIE", {
        description:
            "Mises de fonds et opérations courantes entre coparticipants d'une société en participation ou d'un GIE.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "45",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de associés - opérations faites en commun et en gie",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de associés - opérations faites en commun et en gie",
        journalExample: {
            description: "Écriture type pour le compte 458 - Associés - Opérations faites en commun et en GIE",
            rows: [
                ["458", "Associés - Opérations faites en commun et en GIE", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4581", "Opérations courantes", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de opérations courantes",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de opérations courantes",
        journalExample: {
            description: "Écriture type pour le compte 4581 - Opérations courantes",
            rows: [
                ["4581", "Opérations courantes", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4588", "Intérêts courus", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "458",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de intérêts courus",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 4588 - Intérêts courus",
            rows: [
                ["4588", "Intérêts courus", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("46", "Débiteurs divers et créditeurs divers", {
        description: "Créances et dettes diverses ne relevant pas des comptes fournisseurs, clients ou personnel.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de débiteurs divers et créditeurs divers",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de débiteurs divers et créditeurs divers",
        journalExample: {
            description: "Écriture type pour le compte 46 - Débiteurs divers et créditeurs divers",
            rows: [
                ["46", "Débiteurs divers et créditeurs divers", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("462", "Créances sur cessions d'immobilisations", {
        description: "Prix de cession des immobilisations cédées, en attente de règlement.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "46",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de créances sur cessions d'immobilisations",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de créances sur cessions d'immobilisations",
        journalExample: {
            description: "Écriture type pour le compte 462 - Créances sur cessions d'immobilisations",
            rows: [
                ["462", "Créances sur cessions d'immobilisations", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("464", "Dettes sur acquisitions de valeurs mobilières de placement", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "46",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de dettes sur acquisitions de valeurs mobilières de placement",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de dettes sur acquisitions de valeurs mobilières de placement",
        journalExample: {
            description:
                "Écriture type pour le compte 464 - Dettes sur acquisitions de valeurs mobilières de placement",
            rows: [
                ["464", "Dettes sur acquisitions de valeurs mobilières de placement", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("465", "Créances sur cessions de valeurs mobilières de placement", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "46",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de créances sur cessions de valeurs mobilières de placement",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de créances sur cessions de valeurs mobilières de placement",
        journalExample: {
            description: "Écriture type pour le compte 465 - Créances sur cessions de valeurs mobilières de placement",
            rows: [
                ["465", "Créances sur cessions de valeurs mobilières de placement", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("467", "Divers comptes débiteurs et produits à recevoir", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "46",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de divers comptes débiteurs et produits à recevoir",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de divers comptes débiteurs et produits à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 467 - Divers comptes débiteurs et produits à recevoir",
            rows: [
                ["467", "Divers comptes débiteurs et produits à recevoir", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("468", "Divers comptes créditeurs et charges à payer", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "46",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de divers comptes créditeurs et charges à payer",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de divers comptes créditeurs et charges à payer",
        journalExample: {
            description: "Écriture type pour le compte 468 - Divers comptes créditeurs et charges à payer",
            rows: [
                ["468", "Divers comptes créditeurs et charges à payer", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("47", "Comptes transitoires ou d'attente", {
        description: "Opérations en attente d'imputation définitive à un compte déterminé.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes transitoires ou d'attente",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes transitoires ou d'attente",
        journalExample: {
            description: "Écriture type pour le compte 47 - Comptes transitoires ou d'attente",
            rows: [
                ["47", "Comptes transitoires ou d'attente", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("471", "Comptes d'attente", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes d'attente",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes d'attente",
        journalExample: {
            description: "Écriture type pour le compte 471 - Comptes d'attente",
            rows: [
                ["471", "Comptes d'attente", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("472", "Comptes d'attente", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes d'attente",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes d'attente",
        journalExample: {
            description: "Écriture type pour le compte 472 - Comptes d'attente",
            rows: [
                ["472", "Comptes d'attente", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("473", "Comptes d'attente", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes d'attente",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes d'attente",
        journalExample: {
            description: "Écriture type pour le compte 473 - Comptes d'attente",
            rows: [
                ["473", "Comptes d'attente", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("474", "Différences d’évaluation – Actif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de différences d’évaluation – actif",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de différences d’évaluation – actif",
        journalExample: {
            description: "Écriture type pour le compte 474 - Différences d’évaluation – Actif",
            rows: [
                ["474", "Différences d’évaluation – Actif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4741", "Différences d'évaluation sur instruments financiers à terme - Actif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "474",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences d'évaluation sur instruments financiers à terme - actif",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences d'évaluation sur instruments financiers à terme - actif",
        journalExample: {
            description:
                "Écriture type pour le compte 4741 - Différences d'évaluation sur instruments financiers à terme - Actif",
            rows: [
                ["4741", "Différences d'évaluation sur instruments financiers à terme - Actif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4742", "Différences d'évaluation sur jetons détenus - Actif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "474",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences d'évaluation sur jetons détenus - actif",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences d'évaluation sur jetons détenus - actif",
        journalExample: {
            description: "Écriture type pour le compte 4742 - Différences d'évaluation sur jetons détenus - Actif",
            rows: [
                ["4742", "Différences d'évaluation sur jetons détenus - Actif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4746", "Différences d’évaluation de jetons sur des passifs - Actif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "474",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences d’évaluation de jetons sur des passifs - actif",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences d’évaluation de jetons sur des passifs - actif",
        journalExample: {
            description:
                "Écriture type pour le compte 4746 - Différences d’évaluation de jetons sur des passifs - Actif",
            rows: [
                ["4746", "Différences d’évaluation de jetons sur des passifs - Actif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("475", "Différences d’évaluation – Passif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de différences d’évaluation – passif",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de différences d’évaluation – passif",
        journalExample: {
            description: "Écriture type pour le compte 475 - Différences d’évaluation – Passif",
            rows: [
                ["475", "Différences d’évaluation – Passif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4751", "Différences d'évaluation sur instruments financiers à terme - Passif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "475",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences d'évaluation sur instruments financiers à terme - passif",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences d'évaluation sur instruments financiers à terme - passif",
        journalExample: {
            description:
                "Écriture type pour le compte 4751 - Différences d'évaluation sur instruments financiers à terme - Passif",
            rows: [
                ["4751", "Différences d'évaluation sur instruments financiers à terme - Passif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4752", "Différences d'évaluation sur jetons détenus - Passif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "475",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences d'évaluation sur jetons détenus - passif",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences d'évaluation sur jetons détenus - passif",
        journalExample: {
            description: "Écriture type pour le compte 4752 - Différences d'évaluation sur jetons détenus - Passif",
            rows: [
                ["4752", "Différences d'évaluation sur jetons détenus - Passif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4756", "Différences d’évaluation de jetons sur des passifs - Passif", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "475",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences d’évaluation de jetons sur des passifs - passif",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences d’évaluation de jetons sur des passifs - passif",
        journalExample: {
            description:
                "Écriture type pour le compte 4756 - Différences d’évaluation de jetons sur des passifs - Passif",
            rows: [
                ["4756", "Différences d’évaluation de jetons sur des passifs - Passif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("476", "Différence de conversion - Actif", {
        description: "Pertes latentes de change sur créances et dettes en devises à la clôture de l'exercice.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de différence de conversion - actif",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de différence de conversion - actif",
        journalExample: {
            description: "Écriture type pour le compte 476 - Différence de conversion - Actif",
            rows: [
                ["476", "Différence de conversion - Actif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4761", "Diminution des créances", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "476",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de diminution des créances",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de diminution des créances",
        journalExample: {
            description: "Écriture type pour le compte 4761 - Diminution des créances",
            rows: [
                ["4761", "Diminution des créances", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4762", "Augmentation des dettes", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "476",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de augmentation des dettes",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de augmentation des dettes",
        journalExample: {
            description: "Écriture type pour le compte 4762 - Augmentation des dettes",
            rows: [
                ["4762", "Augmentation des dettes", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4768", "Différences compensées par couverture de change", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "476",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences compensées par couverture de change",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences compensées par couverture de change",
        journalExample: {
            description: "Écriture type pour le compte 4768 - Différences compensées par couverture de change",
            rows: [
                ["4768", "Différences compensées par couverture de change", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("477", "Différences de conversion - Passif", {
        description: "Gains latents de change sur créances et dettes en devises à la clôture de l'exercice.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de différences de conversion - passif",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de différences de conversion - passif",
        journalExample: {
            description: "Écriture type pour le compte 477 - Différences de conversion - Passif",
            rows: [
                ["477", "Différences de conversion - Passif", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4771", "Augmentation des créances", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "477",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de augmentation des créances",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de augmentation des créances",
        journalExample: {
            description: "Écriture type pour le compte 4771 - Augmentation des créances",
            rows: [
                ["4771", "Augmentation des créances", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4772", "Diminution des dettes", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "477",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de diminution des dettes",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de diminution des dettes",
        journalExample: {
            description: "Écriture type pour le compte 4772 - Diminution des dettes",
            rows: [
                ["4772", "Diminution des dettes", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4778", "Différences compensées par couverture de change", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "477",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de différences compensées par couverture de change",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de différences compensées par couverture de change",
        journalExample: {
            description: "Écriture type pour le compte 4778 - Différences compensées par couverture de change",
            rows: [
                ["4778", "Différences compensées par couverture de change", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("478", "Autres comptes transitoires", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "47",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de autres comptes transitoires",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de autres comptes transitoires",
        journalExample: {
            description: "Écriture type pour le compte 478 - Autres comptes transitoires",
            rows: [
                ["478", "Autres comptes transitoires", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4781", "Mali de fusion sur actif circulant", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "478",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de mali de fusion sur actif circulant",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de mali de fusion sur actif circulant",
        journalExample: {
            description: "Écriture type pour le compte 4781 - Mali de fusion sur actif circulant",
            rows: [
                ["4781", "Mali de fusion sur actif circulant", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("48", "Comptes de régularisation", {
        description: "Charges et produits constatés d'avance, frais d'émission d'emprunts et répartitions périodiques.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes de régularisation",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes de régularisation",
        journalExample: {
            description: "Écriture type pour le compte 48 - Comptes de régularisation",
            rows: [
                ["48", "Comptes de régularisation", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("481", "Frais d’émission des emprunts", {
        description: "Frais engagés lors de l’émission d’emprunts, amortis sur la durée de l’emprunt.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "48",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de frais d’émission des emprunts",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de frais d’émission des emprunts",
        journalExample: {
            description: "Écriture type pour le compte 481 - Frais d’émission des emprunts",
            rows: [
                ["481", "Frais d’émission des emprunts", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("486", "Charges constatées d'avance", {
        description:
            "Charges correspondant à des achats de biens ou services dont la fourniture interviendra ultérieurement.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "48",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de charges constatées d'avance",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de charges constatées d'avance",
        journalExample: {
            description: "Écriture type pour le compte 486 - Charges constatées d'avance",
            rows: [
                ["486", "Charges constatées d'avance", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("487", "Produits constatés d'avance", {
        description:
            "Produits perçus ou comptabilisés avant que les prestations ou fournitures les justifiant aient été effectuées.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: false,
        parent: "48",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de produits constatés d'avance",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de produits constatés d'avance",
        journalExample: {
            description: "Écriture type pour le compte 487 - Produits constatés d'avance",
            rows: [
                ["487", "Produits constatés d'avance", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4871", "Produits constatés d’avance sur jetons émis", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "487",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de produits constatés d’avance sur jetons émis",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de produits constatés d’avance sur jetons émis",
        journalExample: {
            description: "Écriture type pour le compte 4871 - Produits constatés d’avance sur jetons émis",
            rows: [
                ["4871", "Produits constatés d’avance sur jetons émis", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("488", "Comptes de répartition périodique des charges et des produits", {
        description:
            "Charges et produits répartis par fractions égales entre les périodes comptables de l'exercice (système de l'abonnement).",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "48",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de comptes de répartition périodique des charges et des produits",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de comptes de répartition périodique des charges et des produits",
        journalExample: {
            description:
                "Écriture type pour le compte 488 - Comptes de répartition périodique des charges et des produits",
            rows: [
                ["488", "Comptes de répartition périodique des charges et des produits", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4886", "Charges", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "488",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de charges",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de charges",
        journalExample: {
            description: "Écriture type pour le compte 4886 - Charges",
            rows: [
                ["4886", "Charges", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("4887", "Produits", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "488",
        counterpart: { number: "512", label: "Banques" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de produits",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de produits",
        journalExample: {
            description: "Écriture type pour le compte 4887 - Produits",
            rows: [
                ["4887", "Produits", "X", ""],
                ["512", "Banques", "", "X"],
            ],
        },
    }),
    defineAccount("49", "Dépréciations des comptes de tiers", {
        description: "Pertes de valeur réversibles constatées sur les créances de tiers.",
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "4",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 49 - Dépréciations des comptes de tiers",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["49", "Dépréciations des comptes de tiers", "", "X"],
            ],
        },
    }),
    defineAccount("491", "Dépréciations des comptes de clients", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "49",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 491 - Dépréciations des comptes de clients",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["491", "Dépréciations des comptes de clients", "", "X"],
            ],
        },
    }),
    defineAccount("495", "Dépréciations des comptes du groupe et des associés", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "49",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 495 - Dépréciations des comptes du groupe et des associés",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["495", "Dépréciations des comptes du groupe et des associés", "", "X"],
            ],
        },
    }),
    defineAccount("4951", "Comptes du groupe", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "495",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 4951 - Comptes du groupe",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["4951", "Comptes du groupe", "", "X"],
            ],
        },
    }),
    defineAccount("4955", "Comptes courants des associés", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "495",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 4955 - Comptes courants des associés",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["4955", "Comptes courants des associés", "", "X"],
            ],
        },
    }),
    defineAccount("4958", "Opérations faites en commun et en GIE", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "495",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 4958 - Opérations faites en commun et en GIE",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["4958", "Opérations faites en commun et en GIE", "", "X"],
            ],
        },
    }),
    defineAccount("496", "Dépréciations des comptes de débiteurs divers", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "49",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 496 - Dépréciations des comptes de débiteurs divers",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["496", "Dépréciations des comptes de débiteurs divers", "", "X"],
            ],
        },
    }),
    defineAccount("4962", "Créances sur cessions d'immobilisations", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "496",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 4962 - Créances sur cessions d'immobilisations",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["4962", "Créances sur cessions d'immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("4965", "Créances sur cessions de valeurs mobilières de placement", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "496",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 4965 - Créances sur cessions de valeurs mobilières de placement",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["4965", "Créances sur cessions de valeurs mobilières de placement", "", "X"],
            ],
        },
    }),
    defineAccount("4967", "Autres comptes débiteurs", {
        classNumber: 4,
        className: "Comptes de tiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "496",
        counterpart: { number: "6817", label: "Dotations pour dépréciations des actifs circulants" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        ],
        debitMeaning: "Diminution des dépréciations de comptes de tiers (reprise)",
        creditMeaning: "Augmentation des dépréciations de comptes de tiers (dotation)",
        journalExample: {
            description: "Écriture type pour le compte 4967 - Autres comptes débiteurs",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["4967", "Autres comptes débiteurs", "", "X"],
            ],
        },
    }),

    // Classe 5 - Comptes financiers
    defineAccount("5", "Comptes financiers", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: null,
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de comptes financiers",
        creditMeaning: "Diminution de comptes financiers",
        journalExample: {
            description: "Écriture type pour le compte 5 - Comptes financiers",
            rows: [
                ["5", "Comptes financiers", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("50", "Valeurs mobilières de placement", {
        description: "Titres acquis en vue de réaliser un gain à brève échéance.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "5",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de valeurs mobilières de placement",
        creditMeaning: "Diminution de valeurs mobilières de placement",
        journalExample: {
            description: "Écriture type pour le compte 50 - Valeurs mobilières de placement",
            rows: [
                ["50", "Valeurs mobilières de placement", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("502", "Actions propres", {
        description:
            "Actions de la société rachetées par elle-même, pour régularisation des cours ou attribution aux salariés.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de actions propres",
        creditMeaning: "Diminution de actions propres",
        journalExample: {
            description: "Écriture type pour le compte 502 - Actions propres",
            rows: [
                ["502", "Actions propres", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5021", "Actions destinées à être attribuées aux employés et affectées à des plans déterminés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "502",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning:
            "Augmentation de actions destinées à être attribuées aux employés et affectées à des plans déterminés",
        creditMeaning:
            "Diminution de actions destinées à être attribuées aux employés et affectées à des plans déterminés",
        journalExample: {
            description:
                "Écriture type pour le compte 5021 - Actions destinées à être attribuées aux employés et affectées à des plans déterminés",
            rows: [
                [
                    "5021",
                    "Actions destinées à être attribuées aux employés et affectées à des plans déterminés",
                    "X",
                    "",
                ],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount(
        "5022",
        "Actions disponibles pour être attribuées aux employés ou pour la régularisation des cours de bourse",
        {
            classNumber: 5,
            className: "Comptes financiers",
            type: "bilan",
            side: "actif",
            isOptional: true,
            parent: "502",
            counterpart: { number: "411", label: "Clients" },
            usageTips: [
                "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
                "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
            ],
            debitMeaning:
                "Augmentation de actions disponibles pour être attribuées aux employés ou pour la régularisation des cours de bourse",
            creditMeaning:
                "Diminution de actions disponibles pour être attribuées aux employés ou pour la régularisation des cours de bourse",
            journalExample: {
                description:
                    "Écriture type pour le compte 5022 - Actions disponibles pour être attribuées aux employés ou pour la régularisation des cours de bourse",
                rows: [
                    [
                        "5022",
                        "Actions disponibles pour être attribuées aux employés ou pour la régularisation des cours de bourse",
                        "X",
                        "",
                    ],
                    ["411", "Clients", "", "X"],
                ],
            },
        },
    ),
    defineAccount("503", "Actions", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de actions",
        creditMeaning: "Diminution de actions",
        journalExample: {
            description: "Écriture type pour le compte 503 - Actions",
            rows: [
                ["503", "Actions", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5031", "Titres cotés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "503",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de titres cotés",
        creditMeaning: "Diminution de titres cotés",
        journalExample: {
            description: "Écriture type pour le compte 5031 - Titres cotés",
            rows: [
                ["5031", "Titres cotés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5035", "Titres non cotés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "503",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de titres non cotés",
        creditMeaning: "Diminution de titres non cotés",
        journalExample: {
            description: "Écriture type pour le compte 5035 - Titres non cotés",
            rows: [
                ["5035", "Titres non cotés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("504", "Autres titres conférant un droit de propriété", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de autres titres conférant un droit de propriété",
        creditMeaning: "Diminution de autres titres conférant un droit de propriété",
        journalExample: {
            description: "Écriture type pour le compte 504 - Autres titres conférant un droit de propriété",
            rows: [
                ["504", "Autres titres conférant un droit de propriété", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("505", "Obligations et bons émis par la société et rachetés par elle", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de obligations et bons émis par la société et rachetés par elle",
        creditMeaning: "Diminution de obligations et bons émis par la société et rachetés par elle",
        journalExample: {
            description:
                "Écriture type pour le compte 505 - Obligations et bons émis par la société et rachetés par elle",
            rows: [
                ["505", "Obligations et bons émis par la société et rachetés par elle", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("506", "Obligations", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de obligations",
        creditMeaning: "Diminution de obligations",
        journalExample: {
            description: "Écriture type pour le compte 506 - Obligations",
            rows: [
                ["506", "Obligations", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5061", "Titres cotés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "506",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de titres cotés",
        creditMeaning: "Diminution de titres cotés",
        journalExample: {
            description: "Écriture type pour le compte 5061 - Titres cotés",
            rows: [
                ["5061", "Titres cotés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5065", "Titres non cotés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "506",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de titres non cotés",
        creditMeaning: "Diminution de titres non cotés",
        journalExample: {
            description: "Écriture type pour le compte 5065 - Titres non cotés",
            rows: [
                ["5065", "Titres non cotés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("507", "Bons du Trésor et bons de caisse à court terme", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de bons du trésor et bons de caisse à court terme",
        creditMeaning: "Diminution de bons du trésor et bons de caisse à court terme",
        journalExample: {
            description: "Écriture type pour le compte 507 - Bons du Trésor et bons de caisse à court terme",
            rows: [
                ["507", "Bons du Trésor et bons de caisse à court terme", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("508", "Autres valeurs mobilières de placement et autres créances assimilées", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de autres valeurs mobilières de placement et autres créances assimilées",
        creditMeaning: "Diminution de autres valeurs mobilières de placement et autres créances assimilées",
        journalExample: {
            description:
                "Écriture type pour le compte 508 - Autres valeurs mobilières de placement et autres créances assimilées",
            rows: [
                ["508", "Autres valeurs mobilières de placement et autres créances assimilées", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5081", "Autres valeurs mobilières", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "508",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de autres valeurs mobilières",
        creditMeaning: "Diminution de autres valeurs mobilières",
        journalExample: {
            description: "Écriture type pour le compte 5081 - Autres valeurs mobilières",
            rows: [
                ["5081", "Autres valeurs mobilières", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5082", "Bons de souscription", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "508",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de bons de souscription",
        creditMeaning: "Diminution de bons de souscription",
        journalExample: {
            description: "Écriture type pour le compte 5082 - Bons de souscription",
            rows: [
                ["5082", "Bons de souscription", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5088", "Intérêts courus sur obligations, bons et valeurs assimilés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "508",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de intérêts courus sur obligations, bons et valeurs assimilés",
        creditMeaning: "Diminution de intérêts courus sur obligations, bons et valeurs assimilés",
        journalExample: {
            description:
                "Écriture type pour le compte 5088 - Intérêts courus sur obligations, bons et valeurs assimilés",
            rows: [
                ["5088", "Intérêts courus sur obligations, bons et valeurs assimilés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("509", "Versements restant à effectuer sur valeurs mobilières de placement non libérées", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "50",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de versements restant à effectuer sur valeurs mobilières de placement non libérées",
        creditMeaning: "Diminution de versements restant à effectuer sur valeurs mobilières de placement non libérées",
        journalExample: {
            description:
                "Écriture type pour le compte 509 - Versements restant à effectuer sur valeurs mobilières de placement non libérées",
            rows: [
                ["509", "Versements restant à effectuer sur valeurs mobilières de placement non libérées", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("51", "Banques, établissements financiers et assimilés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "5",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de banques, établissements financiers et assimilés",
        creditMeaning: "Diminution de banques, établissements financiers et assimilés",
        journalExample: {
            description: "Écriture type pour le compte 51 - Banques, établissements financiers et assimilés",
            rows: [
                ["51", "Banques, établissements financiers et assimilés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("511", "Valeurs à l'encaissement", {
        description: "Coupons, chèques et effets remis à l'encaissement ou à l'escompte.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "51",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de valeurs à l'encaissement",
        creditMeaning: "Diminution de valeurs à l'encaissement",
        journalExample: {
            description: "Écriture type pour le compte 511 - Valeurs à l'encaissement",
            rows: [
                ["511", "Valeurs à l'encaissement", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5111", "Coupons échus à l'encaissement", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "511",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de coupons échus à l'encaissement",
        creditMeaning: "Diminution de coupons échus à l'encaissement",
        journalExample: {
            description: "Écriture type pour le compte 5111 - Coupons échus à l'encaissement",
            rows: [
                ["5111", "Coupons échus à l'encaissement", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5112", "Chèques à encaisser", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "511",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de chèques à encaisser",
        creditMeaning: "Diminution de chèques à encaisser",
        journalExample: {
            description: "Écriture type pour le compte 5112 - Chèques à encaisser",
            rows: [
                ["5112", "Chèques à encaisser", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5113", "Effets à l'encaissement", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "511",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de effets à l'encaissement",
        creditMeaning: "Diminution de effets à l'encaissement",
        journalExample: {
            description: "Écriture type pour le compte 5113 - Effets à l'encaissement",
            rows: [
                ["5113", "Effets à l'encaissement", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5114", "Effets à l'escompte", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "511",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de effets à l'escompte",
        creditMeaning: "Diminution de effets à l'escompte",
        journalExample: {
            description: "Écriture type pour le compte 5114 - Effets à l'escompte",
            rows: [
                ["5114", "Effets à l'escompte", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("512", "Banques", {
        description: "Compte courant bancaire de l'organisation.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "51",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
            "Le compte 512 est l'un des plus utilisés en comptabilité. Il est débité lors des encaissements (recettes) et crédité lors des décaissements (dépenses). Il doit être rapproché du relevé bancaire à chaque réception.",
        ],
        debitMeaning: "Augmentation de banques",
        creditMeaning: "Diminution de banques",
        journalExample: {
            description: "Écriture type pour le compte 512 - Banques",
            rows: [
                ["512", "Banques", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5121", "Comptes en euros", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "512",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de comptes en euros",
        creditMeaning: "Diminution de comptes en euros",
        journalExample: {
            description: "Écriture type pour le compte 5121 - Comptes en euros",
            rows: [
                ["5121", "Comptes en euros", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5124", "Comptes en devises", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "512",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de comptes en devises",
        creditMeaning: "Diminution de comptes en devises",
        journalExample: {
            description: "Écriture type pour le compte 5124 - Comptes en devises",
            rows: [
                ["5124", "Comptes en devises", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("517", "Autres organismes financiers", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "51",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de autres organismes financiers",
        creditMeaning: "Diminution de autres organismes financiers",
        journalExample: {
            description: "Écriture type pour le compte 517 - Autres organismes financiers",
            rows: [
                ["517", "Autres organismes financiers", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("518", "Intérêts courus", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "51",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de intérêts courus",
        creditMeaning: "Diminution de intérêts courus",
        journalExample: {
            description: "Écriture type pour le compte 518 - Intérêts courus",
            rows: [
                ["518", "Intérêts courus", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5181", "Intérêts courus à payer", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "518",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de intérêts courus à payer",
        creditMeaning: "Diminution de intérêts courus à payer",
        journalExample: {
            description: "Écriture type pour le compte 5181 - Intérêts courus à payer",
            rows: [
                ["5181", "Intérêts courus à payer", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5188", "Intérêts courus à recevoir", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "518",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de intérêts courus à recevoir",
        creditMeaning: "Diminution de intérêts courus à recevoir",
        journalExample: {
            description: "Écriture type pour le compte 5188 - Intérêts courus à recevoir",
            rows: [
                ["5188", "Intérêts courus à recevoir", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("519", "Concours bancaires courants", {
        description:
            "Crédits de trésorerie à court terme consentis par les banques, y compris mobilisation de créances.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "51",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de concours bancaires courants",
        creditMeaning: "Diminution de concours bancaires courants",
        journalExample: {
            description: "Écriture type pour le compte 519 - Concours bancaires courants",
            rows: [
                ["519", "Concours bancaires courants", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5191", "Crédit de mobilisation de créances commerciales", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "519",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de crédit de mobilisation de créances commerciales",
        creditMeaning: "Diminution de crédit de mobilisation de créances commerciales",
        journalExample: {
            description: "Écriture type pour le compte 5191 - Crédit de mobilisation de créances commerciales",
            rows: [
                ["5191", "Crédit de mobilisation de créances commerciales", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5193", "Mobilisation de créances nées à l'étranger", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "519",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de mobilisation de créances nées à l'étranger",
        creditMeaning: "Diminution de mobilisation de créances nées à l'étranger",
        journalExample: {
            description: "Écriture type pour le compte 5193 - Mobilisation de créances nées à l'étranger",
            rows: [
                ["5193", "Mobilisation de créances nées à l'étranger", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5198", "Intérêts courus sur concours bancaires courants", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "519",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de intérêts courus sur concours bancaires courants",
        creditMeaning: "Diminution de intérêts courus sur concours bancaires courants",
        journalExample: {
            description: "Écriture type pour le compte 5198 - Intérêts courus sur concours bancaires courants",
            rows: [
                ["5198", "Intérêts courus sur concours bancaires courants", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("52", "Instruments financiers à terme et jetons détenus", {
        description:
            "Opérations sur instruments financiers à terme et jetons numériques détenus, auto-détenus ou empruntés.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "5",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de instruments financiers à terme et jetons détenus",
        creditMeaning: "Diminution de instruments financiers à terme et jetons détenus",
        journalExample: {
            description: "Écriture type pour le compte 52 - Instruments financiers à terme et jetons détenus",
            rows: [
                ["52", "Instruments financiers à terme et jetons détenus", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("521", "Instruments financiers à terme", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "52",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de instruments financiers à terme",
        creditMeaning: "Diminution de instruments financiers à terme",
        journalExample: {
            description: "Écriture type pour le compte 521 - Instruments financiers à terme",
            rows: [
                ["521", "Instruments financiers à terme", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("522", "Jetons détenus", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "52",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de jetons détenus",
        creditMeaning: "Diminution de jetons détenus",
        journalExample: {
            description: "Écriture type pour le compte 522 - Jetons détenus",
            rows: [
                ["522", "Jetons détenus", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("523", "Jetons auto-détenus", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "52",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de jetons auto-détenus",
        creditMeaning: "Diminution de jetons auto-détenus",
        journalExample: {
            description: "Écriture type pour le compte 523 - Jetons auto-détenus",
            rows: [
                ["523", "Jetons auto-détenus", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("524", "Jetons empruntés", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "52",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de jetons empruntés",
        creditMeaning: "Diminution de jetons empruntés",
        journalExample: {
            description: "Écriture type pour le compte 524 - Jetons empruntés",
            rows: [
                ["524", "Jetons empruntés", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("53", "Caisse", {
        description: "Espèces détenues par l'organisation.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "5",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de caisse",
        creditMeaning: "Diminution de caisse",
        journalExample: {
            description: "Écriture type pour le compte 53 - Caisse",
            rows: [
                ["53", "Caisse", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("58", "Virements internes", {
        description:
            "Comptes de passage utilisés pour les virements de fonds entre comptes de banque ou de caisse, soldés en fin d'opération.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "5",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de virements internes",
        creditMeaning: "Diminution de virements internes",
        journalExample: {
            description: "Écriture type pour le compte 58 - Virements internes",
            rows: [
                ["58", "Virements internes", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("59", "Dépréciations des comptes financiers", {
        description: "Pertes de valeur réversibles constatées sur les valeurs mobilières de placement.",
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "5",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de dépréciations des comptes financiers",
        creditMeaning: "Diminution de dépréciations des comptes financiers",
        journalExample: {
            description: "Écriture type pour le compte 59 - Dépréciations des comptes financiers",
            rows: [
                ["59", "Dépréciations des comptes financiers", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("590", "Dépréciations des valeurs mobilières de placement", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: false,
        parent: "59",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de dépréciations des valeurs mobilières de placement",
        creditMeaning: "Diminution de dépréciations des valeurs mobilières de placement",
        journalExample: {
            description: "Écriture type pour le compte 590 - Dépréciations des valeurs mobilières de placement",
            rows: [
                ["590", "Dépréciations des valeurs mobilières de placement", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5903", "Actions", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "590",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de actions",
        creditMeaning: "Diminution de actions",
        journalExample: {
            description: "Écriture type pour le compte 5903 - Actions",
            rows: [
                ["5903", "Actions", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5904", "Autres titres conférant un droit de propriété", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "590",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de autres titres conférant un droit de propriété",
        creditMeaning: "Diminution de autres titres conférant un droit de propriété",
        journalExample: {
            description: "Écriture type pour le compte 5904 - Autres titres conférant un droit de propriété",
            rows: [
                ["5904", "Autres titres conférant un droit de propriété", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5906", "Obligations", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "590",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de obligations",
        creditMeaning: "Diminution de obligations",
        journalExample: {
            description: "Écriture type pour le compte 5906 - Obligations",
            rows: [
                ["5906", "Obligations", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),
    defineAccount("5908", "Autres valeurs mobilières de placement et créances assimilées", {
        classNumber: 5,
        className: "Comptes financiers",
        type: "bilan",
        side: "actif",
        isOptional: true,
        parent: "590",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        ],
        debitMeaning: "Augmentation de autres valeurs mobilières de placement et créances assimilées",
        creditMeaning: "Diminution de autres valeurs mobilières de placement et créances assimilées",
        journalExample: {
            description:
                "Écriture type pour le compte 5908 - Autres valeurs mobilières de placement et créances assimilées",
            rows: [
                ["5908", "Autres valeurs mobilières de placement et créances assimilées", "X", ""],
                ["411", "Clients", "", "X"],
            ],
        },
    }),

    // Classe 6 - Comptes de charges
    defineAccount("6", "Comptes de charges", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: null,
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6 - Comptes de charges",
            rows: [
                ["6", "Comptes de charges", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60", "Achats (sauf 603)", {
        description:
            "Achats de matières, marchandises, études et prestations de services intégrés au cycle de production.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60 - Achats (sauf 603)",
            rows: [
                ["60", "Achats (sauf 603)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("601", "Achats stockés - Matières premières et fournitures", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 601 - Achats stockés - Matières premières et fournitures",
            rows: [
                ["601", "Achats stockés - Matières premières et fournitures", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("602", "Achats stockés - Autres approvisionnements", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 602 - Achats stockés - Autres approvisionnements",
            rows: [
                ["602", "Achats stockés - Autres approvisionnements", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6021", "Matières consommables", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "602",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6021 - Matières consommables",
            rows: [
                ["6021", "Matières consommables", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6022", "Fournitures consommables", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "602",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6022 - Fournitures consommables",
            rows: [
                ["6022", "Fournitures consommables", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60221", "Combustibles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6022",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60221 - Combustibles",
            rows: [
                ["60221", "Combustibles", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60222", "Produits d'entretien", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6022",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60222 - Produits d'entretien",
            rows: [
                ["60222", "Produits d'entretien", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60223", "Fournitures d'atelier et d'usine", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6022",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60223 - Fournitures d'atelier et d'usine",
            rows: [
                ["60223", "Fournitures d'atelier et d'usine", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60224", "Fournitures de magasin", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6022",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60224 - Fournitures de magasin",
            rows: [
                ["60224", "Fournitures de magasin", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60225", "Fourniture de bureau", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6022",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60225 - Fourniture de bureau",
            rows: [
                ["60225", "Fourniture de bureau", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6026", "Emballages", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "602",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6026 - Emballages",
            rows: [
                ["6026", "Emballages", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60261", "Emballages perdus", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6026",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60261 - Emballages perdus",
            rows: [
                ["60261", "Emballages perdus", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60262", "Malis sur emballage", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6026",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60262 - Malis sur emballage",
            rows: [
                ["60262", "Malis sur emballage", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60265", "Emballages récupérables non identifiables", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6026",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60265 - Emballages récupérables non identifiables",
            rows: [
                ["60265", "Emballages récupérables non identifiables", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("60267", "Emballages à usage mixte", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6026",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 60267 - Emballages à usage mixte",
            rows: [
                ["60267", "Emballages à usage mixte", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("604", "Achats d'études et prestations de services", {
        description: "Études et prestations sous-traitées s'intégrant directement dans le cycle de production.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 604 - Achats d'études et prestations de services",
            rows: [
                ["604", "Achats d'études et prestations de services", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("605", "Achats de matériel, équipements et travaux", {
        description:
            "Matériel, équipements et travaux sous-traités s'intégrant directement dans le cycle de production.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 605 - Achats de matériel, équipements et travaux",
            rows: [
                ["605", "Achats de matériel, équipements et travaux", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("606", "Achats non stockés de matière et fournitures", {
        description: "Fournitures de bureau, petites fournitures consommables.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 606 - Achats non stockés de matière et fournitures",
            rows: [
                ["606", "Achats non stockés de matière et fournitures", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6061", "Fournitures non stockables (eau, énergie, etc.)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "606",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6061 - Fournitures non stockables (eau, énergie, etc.)",
            rows: [
                ["6061", "Fournitures non stockables (eau, énergie, etc.)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6063", "Fournitures d'entretien et de petit équipement", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "606",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6063 - Fournitures d'entretien et de petit équipement",
            rows: [
                ["6063", "Fournitures d'entretien et de petit équipement", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6064", "Fournitures administratives", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "606",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6064 - Fournitures administratives",
            rows: [
                ["6064", "Fournitures administratives", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6068", "Autres matières et fournitures", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "606",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6068 - Autres matières et fournitures",
            rows: [
                ["6068", "Autres matières et fournitures", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("607", "Achats de marchandises", {
        description: "Achats de biens destinés à être revendus en l'état.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 607 - Achats de marchandises",
            rows: [
                ["607", "Achats de marchandises", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount(
        "608",
        "(Compte réservé, le cas échéant, au regroupement des frais accessoires incorporés aux achats)",
        {
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: false,
            parent: "60",
            counterpart: { number: "401", label: "Fournisseurs" },
            usageTips: [
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 608 - (Compte réservé, le cas échéant, au regroupement des frais accessoires incorporés aux achats)",
                rows: [
                    [
                        "608",
                        "(Compte réservé, le cas échéant, au regroupement des frais accessoires incorporés aux achats)",
                        "X",
                        "",
                    ],
                    ["401", "Fournisseurs", "", "X"],
                ],
            },
        },
    ),
    defineAccount("609", "Rabais, remises et ristournes obtenus sur achats (même ventilation que celle du compte 60)", {
        description: "Réductions obtenues des fournisseurs, non déduites des factures d'achats initiales.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 609 - Rabais, remises et ristournes obtenus sur achats (même ventilation que celle du compte 60)",
            rows: [
                [
                    "609",
                    "Rabais, remises et ristournes obtenus sur achats (même ventilation que celle du compte 60)",
                    "X",
                    "",
                ],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6098", "Rabais, remises et ristournes non affectés", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "609",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6098 - Rabais, remises et ristournes non affectés",
            rows: [
                ["6098", "Rabais, remises et ristournes non affectés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("603", "Variation des stocks d'approvisionnements et de marchandises", {
        description:
            "Différence entre la valeur du stock final et du stock initial d'approvisionnements et de marchandises.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "60",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 603 - Variation des stocks d'approvisionnements et de marchandises",
            rows: [
                ["603", "Variation des stocks d'approvisionnements et de marchandises", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6031", "Variation des stocks de matières premières et fournitures", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "603",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6031 - Variation des stocks de matières premières et fournitures",
            rows: [
                ["6031", "Variation des stocks de matières premières et fournitures", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6032", "Variation des stocks des autres approvisionnements", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "603",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6032 - Variation des stocks des autres approvisionnements",
            rows: [
                ["6032", "Variation des stocks des autres approvisionnements", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6037", "Variation des stocks de marchandises 61/62 Autres charges externes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "603",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6037 - Variation des stocks de marchandises 61/62 Autres charges externes",
            rows: [
                ["6037", "Variation des stocks de marchandises 61/62 Autres charges externes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("61", "Services extérieurs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 61 - Services extérieurs",
            rows: [
                ["61", "Services extérieurs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("611", "Sous-traitance générale", {
        description: "Sous-traitance autre que celle inscrite aux comptes 604 et 605.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 611 - Sous-traitance générale",
            rows: [
                ["611", "Sous-traitance générale", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("612", "Redevances de crédit-bail", {
        description: "Loyers versés dans le cadre de contrats de crédit-bail mobilier ou immobilier.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 612 - Redevances de crédit-bail",
            rows: [
                ["612", "Redevances de crédit-bail", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6122", "Crédit-bail mobilier", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "612",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6122 - Crédit-bail mobilier",
            rows: [
                ["6122", "Crédit-bail mobilier", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6125", "Crédit-bail immobilier", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "612",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6125 - Crédit-bail immobilier",
            rows: [
                ["6125", "Crédit-bail immobilier", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("613", "Locations", {
        description: "Loyers et charges locatives.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 613 - Locations",
            rows: [
                ["613", "Locations", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6132", "Locations immobilières", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "613",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6132 - Locations immobilières",
            rows: [
                ["6132", "Locations immobilières", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6135", "Locations mobilières", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "613",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6135 - Locations mobilières",
            rows: [
                ["6135", "Locations mobilières", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("614", "Charges locatives et de copropriété", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 614 - Charges locatives et de copropriété",
            rows: [
                ["614", "Charges locatives et de copropriété", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("615", "Entretien et réparation", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 615 - Entretien et réparation",
            rows: [
                ["615", "Entretien et réparation", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6152", "Entretien et réparation sur biens immobiliers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "615",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6152 - Entretien et réparation sur biens immobiliers",
            rows: [
                ["6152", "Entretien et réparation sur biens immobiliers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6155", "Entretien et réparation sur biens mobiliers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "615",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6155 - Entretien et réparation sur biens mobiliers",
            rows: [
                ["6155", "Entretien et réparation sur biens mobiliers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6156", "Maintenance", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "615",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6156 - Maintenance",
            rows: [
                ["6156", "Maintenance", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("616", "Primes d'assurances", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 616 - Primes d'assurances",
            rows: [
                ["616", "Primes d'assurances", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6161", "Multirisques", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "616",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6161 - Multirisques",
            rows: [
                ["6161", "Multirisques", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6162", "Assurance obligatoire dommage construction", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "616",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6162 - Assurance obligatoire dommage construction",
            rows: [
                ["6162", "Assurance obligatoire dommage construction", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6163", "Assurance - transport", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "616",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6163 - Assurance - transport",
            rows: [
                ["6163", "Assurance - transport", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("61636", "sur achats", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6163",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 61636 - sur achats",
            rows: [
                ["61636", "sur achats", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("61637", "sur ventes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6163",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 61637 - sur ventes",
            rows: [
                ["61637", "sur ventes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("61638", "sur autres biens", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6163",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 61638 - sur autres biens",
            rows: [
                ["61638", "sur autres biens", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6164", "Risques d'exploitation", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "616",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6164 - Risques d'exploitation",
            rows: [
                ["6164", "Risques d'exploitation", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6165", "Insolvabilité clients", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "616",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6165 - Insolvabilité clients",
            rows: [
                ["6165", "Insolvabilité clients", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("617", "Études et recherches", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 617 - Études et recherches",
            rows: [
                ["617", "Études et recherches", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("618", "Divers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 618 - Divers",
            rows: [
                ["618", "Divers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6181", "Documentation générale", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "618",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6181 - Documentation générale",
            rows: [
                ["6181", "Documentation générale", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6183", "Documentation technique", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "618",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6183 - Documentation technique",
            rows: [
                ["6183", "Documentation technique", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6185", "Frais de colloques, séminaires, conférences", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "618",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6185 - Frais de colloques, séminaires, conférences",
            rows: [
                ["6185", "Frais de colloques, séminaires, conférences", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("619", "Rabais, remises et ristournes obtenus sur services extérieurs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "61",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 619 - Rabais, remises et ristournes obtenus sur services extérieurs",
            rows: [
                ["619", "Rabais, remises et ristournes obtenus sur services extérieurs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("62", "Autres services extérieurs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 62 - Autres services extérieurs",
            rows: [
                ["62", "Autres services extérieurs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("621", "Personnel extérieur à l'entité", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 621 - Personnel extérieur à l'entité",
            rows: [
                ["621", "Personnel extérieur à l'entité", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6211", "Personnel intérimaire", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "621",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6211 - Personnel intérimaire",
            rows: [
                ["6211", "Personnel intérimaire", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6214", "Personnel détaché ou prêté à l'entité", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "621",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6214 - Personnel détaché ou prêté à l'entité",
            rows: [
                ["6214", "Personnel détaché ou prêté à l'entité", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("622", "Rémunérations d'intermédiaires et honoraires", {
        description: "Commissions, courtages, honoraires et rémunérations d'affacturage versés à des tiers.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 622 - Rémunérations d'intermédiaires et honoraires",
            rows: [
                ["622", "Rémunérations d'intermédiaires et honoraires", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6221", "Commissions et courtages sur achats", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6221 - Commissions et courtages sur achats",
            rows: [
                ["6221", "Commissions et courtages sur achats", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6222", "Commissions et courtages sur ventes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6222 - Commissions et courtages sur ventes",
            rows: [
                ["6222", "Commissions et courtages sur ventes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6224", "Rémunérations des transitaires", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6224 - Rémunérations des transitaires",
            rows: [
                ["6224", "Rémunérations des transitaires", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6225", "Rémunérations d'affacturage", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6225 - Rémunérations d'affacturage",
            rows: [
                ["6225", "Rémunérations d'affacturage", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6226", "Honoraires", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6226 - Honoraires",
            rows: [
                ["6226", "Honoraires", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6227", "Frais d'actes et de contentieux", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6227 - Frais d'actes et de contentieux",
            rows: [
                ["6227", "Frais d'actes et de contentieux", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6228", "Divers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "622",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6228 - Divers",
            rows: [
                ["6228", "Divers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("623", "Publicité, publications, relations publiques", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 623 - Publicité, publications, relations publiques",
            rows: [
                ["623", "Publicité, publications, relations publiques", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6231", "Annonces et insertions", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6231 - Annonces et insertions",
            rows: [
                ["6231", "Annonces et insertions", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6232", "Échantillons", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6232 - Échantillons",
            rows: [
                ["6232", "Échantillons", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6233", "Foires et expositions", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6233 - Foires et expositions",
            rows: [
                ["6233", "Foires et expositions", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6234", "Cadeaux à la clientèle", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6234 - Cadeaux à la clientèle",
            rows: [
                ["6234", "Cadeaux à la clientèle", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6235", "Primes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6235 - Primes",
            rows: [
                ["6235", "Primes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6236", "Catalogues et imprimés", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6236 - Catalogues et imprimés",
            rows: [
                ["6236", "Catalogues et imprimés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6237", "Publications", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6237 - Publications",
            rows: [
                ["6237", "Publications", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6238", "Divers (pourboires, dons courants)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "623",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6238 - Divers (pourboires, dons courants)",
            rows: [
                ["6238", "Divers (pourboires, dons courants)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("624", "Transports de biens et transports collectifs du personnel", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 624 - Transports de biens et transports collectifs du personnel",
            rows: [
                ["624", "Transports de biens et transports collectifs du personnel", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6241", "Transports sur achats", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "624",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6241 - Transports sur achats",
            rows: [
                ["6241", "Transports sur achats", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6242", "Transports sur ventes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "624",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6242 - Transports sur ventes",
            rows: [
                ["6242", "Transports sur ventes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6243", "Transports entre établissements ou chantiers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "624",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6243 - Transports entre établissements ou chantiers",
            rows: [
                ["6243", "Transports entre établissements ou chantiers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6244", "Transports administratifs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "624",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6244 - Transports administratifs",
            rows: [
                ["6244", "Transports administratifs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6247", "Transports collectifs du personnel", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "624",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6247 - Transports collectifs du personnel",
            rows: [
                ["6247", "Transports collectifs du personnel", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6248", "Divers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "624",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6248 - Divers",
            rows: [
                ["6248", "Divers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("625", "Déplacements, missions et réceptions", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 625 - Déplacements, missions et réceptions",
            rows: [
                ["625", "Déplacements, missions et réceptions", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6251", "Voyages et déplacements", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "625",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6251 - Voyages et déplacements",
            rows: [
                ["6251", "Voyages et déplacements", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6255", "Frais de déménagement", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "625",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6255 - Frais de déménagement",
            rows: [
                ["6255", "Frais de déménagement", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6256", "Missions", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "625",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6256 - Missions",
            rows: [
                ["6256", "Missions", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6257", "Réceptions", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "625",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6257 - Réceptions",
            rows: [
                ["6257", "Réceptions", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("626", "Frais postaux et de télécommunications", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 626 - Frais postaux et de télécommunications",
            rows: [
                ["626", "Frais postaux et de télécommunications", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("627", "Services bancaires et assimilés", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 627 - Services bancaires et assimilés",
            rows: [
                ["627", "Services bancaires et assimilés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6271", "Frais sur titres (achat, vente, garde)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "627",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6271 - Frais sur titres (achat, vente, garde)",
            rows: [
                ["6271", "Frais sur titres (achat, vente, garde)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6272", "Commissions et frais sur émission d'emprunts", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "627",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6272 - Commissions et frais sur émission d'emprunts",
            rows: [
                ["6272", "Commissions et frais sur émission d'emprunts", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6275", "Frais sur effets", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "627",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6275 - Frais sur effets",
            rows: [
                ["6275", "Frais sur effets", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6276", "Location de coffres", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "627",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6276 - Location de coffres",
            rows: [
                ["6276", "Location de coffres", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6278", "Autres frais et commissions sur prestations de services", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "627",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6278 - Autres frais et commissions sur prestations de services",
            rows: [
                ["6278", "Autres frais et commissions sur prestations de services", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("628", "Divers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 628 - Divers",
            rows: [
                ["628", "Divers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6281", "Concours divers (cotisations)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "628",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6281 - Concours divers (cotisations)",
            rows: [
                ["6281", "Concours divers (cotisations)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6284", "Frais de recrutement de personnel", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "628",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6284 - Frais de recrutement de personnel",
            rows: [
                ["6284", "Frais de recrutement de personnel", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("629", "Rabais, remises et ristournes obtenus sur autres services extérieurs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "62",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 629 - Rabais, remises et ristournes obtenus sur autres services extérieurs",
            rows: [
                ["629", "Rabais, remises et ristournes obtenus sur autres services extérieurs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("63", "Impôts, taxes et versements assimilés", {
        description: "Impôts et taxes à la charge de l'entité, hors impôts sur les bénéfices.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 63 - Impôts, taxes et versements assimilés",
            rows: [
                ["63", "Impôts, taxes et versements assimilés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("631", "Impôts, taxes et versements assimilés sur rémunérations (administrations des impôts)", {
        description:
            "Taxes et participations assises sur les salaires versées au Trésor (taxe sur les salaires, etc.).",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "63",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 631 - Impôts, taxes et versements assimilés sur rémunérations (administrations des impôts)",
            rows: [
                [
                    "631",
                    "Impôts, taxes et versements assimilés sur rémunérations (administrations des impôts)",
                    "X",
                    "",
                ],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6311", "Taxe sur les salaires", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "631",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6311 - Taxe sur les salaires",
            rows: [
                ["6311", "Taxe sur les salaires", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6314", "Cotisation pour défaut d'investissement obligatoire dans la construction", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "631",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6314 - Cotisation pour défaut d'investissement obligatoire dans la construction",
            rows: [
                ["6314", "Cotisation pour défaut d'investissement obligatoire dans la construction", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6318", "Autres", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "631",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6318 - Autres",
            rows: [
                ["6318", "Autres", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("633", "Impôts, taxes et versements assimilés sur rémunérations (autres organismes)", {
        description:
            "Versements à fonds perdus ou subventions liés aux taxes assises sur les salaires (formation, apprentissage, construction).",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "63",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 633 - Impôts, taxes et versements assimilés sur rémunérations (autres organismes)",
            rows: [
                ["633", "Impôts, taxes et versements assimilés sur rémunérations (autres organismes)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6331", "Versement de transport", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "633",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6331 - Versement de transport",
            rows: [
                ["6331", "Versement de transport", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6332", "Allocations logement", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "633",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6332 - Allocations logement",
            rows: [
                ["6332", "Allocations logement", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6333", "Contribution unique des employeurs à la formation professionnelle", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "633",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6333 - Contribution unique des employeurs à la formation professionnelle",
            rows: [
                ["6333", "Contribution unique des employeurs à la formation professionnelle", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6334", "Participation des employeurs à l'effort de construction", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "633",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6334 - Participation des employeurs à l'effort de construction",
            rows: [
                ["6334", "Participation des employeurs à l'effort de construction", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6335", "Versements libératoires ouvrant droit à l'exonération de la taxe d'apprentissage", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "633",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6335 - Versements libératoires ouvrant droit à l'exonération de la taxe d'apprentissage",
            rows: [
                ["6335", "Versements libératoires ouvrant droit à l'exonération de la taxe d'apprentissage", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6338", "Autres", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "633",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6338 - Autres",
            rows: [
                ["6338", "Autres", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("635", "Autres impôts, taxes et versements assimilés (administrations des impôts)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "63",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 635 - Autres impôts, taxes et versements assimilés (administrations des impôts)",
            rows: [
                ["635", "Autres impôts, taxes et versements assimilés (administrations des impôts)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6351", "Impôts directs (sauf impôts sur les bénéfices)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "635",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6351 - Impôts directs (sauf impôts sur les bénéfices)",
            rows: [
                ["6351", "Impôts directs (sauf impôts sur les bénéfices)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("63511", "Contribution économique territoriale", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6351",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 63511 - Contribution économique territoriale",
            rows: [
                ["63511", "Contribution économique territoriale", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("63512", "Taxes foncières", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6351",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 63512 - Taxes foncières",
            rows: [
                ["63512", "Taxes foncières", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("63513", "Autres impôts locaux", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6351",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 63513 - Autres impôts locaux",
            rows: [
                ["63513", "Autres impôts locaux", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("63514", "Taxe sur les véhicules des sociétés", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6351",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 63514 - Taxe sur les véhicules des sociétés",
            rows: [
                ["63514", "Taxe sur les véhicules des sociétés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6352", "Taxe sur le chiffre d'affaires non récupérables", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "635",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6352 - Taxe sur le chiffre d'affaires non récupérables",
            rows: [
                ["6352", "Taxe sur le chiffre d'affaires non récupérables", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6353", "Impôts indirects", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "635",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6353 - Impôts indirects",
            rows: [
                ["6353", "Impôts indirects", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6354", "Droits d'enregistrement et de timbre", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "635",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6354 - Droits d'enregistrement et de timbre",
            rows: [
                ["6354", "Droits d'enregistrement et de timbre", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("63541", "Droits de mutation", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6354",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 63541 - Droits de mutation",
            rows: [
                ["63541", "Droits de mutation", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6358", "Autres droits", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "635",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6358 - Autres droits",
            rows: [
                ["6358", "Autres droits", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("637", "Autres impôts, taxes et versements assimilés (autres organismes)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "63",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 637 - Autres impôts, taxes et versements assimilés (autres organismes)",
            rows: [
                ["637", "Autres impôts, taxes et versements assimilés (autres organismes)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6371", "Contribution sociale de solidarité à la charge des sociétés", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "637",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6371 - Contribution sociale de solidarité à la charge des sociétés",
            rows: [
                ["6371", "Contribution sociale de solidarité à la charge des sociétés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6372", "Taxes perçues par les organismes publics internationaux", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "637",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6372 - Taxes perçues par les organismes publics internationaux",
            rows: [
                ["6372", "Taxes perçues par les organismes publics internationaux", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6374", "Impôts et taxes exigibles à l'étranger", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "637",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6374 - Impôts et taxes exigibles à l'étranger",
            rows: [
                ["6374", "Impôts et taxes exigibles à l'étranger", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6378", "Taxes diverses", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "637",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6378 - Taxes diverses",
            rows: [
                ["6378", "Taxes diverses", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("638", "Rappel d’impôts (autres qu’impôts sur les bénéfices)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "63",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 638 - Rappel d’impôts (autres qu’impôts sur les bénéfices)",
            rows: [
                ["638", "Rappel d’impôts (autres qu’impôts sur les bénéfices)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("64", "Charges de personnel", {
        description: "Rémunérations et charges sociales du personnel de l'entité.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 64 - Charges de personnel",
            rows: [
                ["64", "Charges de personnel", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("641", "Rémunérations du personnel", {
        description: "Salaires bruts versés aux employés.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "64",
        counterpart: { number: "421", label: "Personnel - Rémunérations dues" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 641 - Rémunérations du personnel",
            rows: [
                ["641", "Rémunérations du personnel", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("6411", "Salaires, appointements", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "641",
        counterpart: { number: "421", label: "Personnel - Rémunérations dues" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6411 - Salaires, appointements",
            rows: [
                ["6411", "Salaires, appointements", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("6412", "Congés payés", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "641",
        counterpart: { number: "421", label: "Personnel - Rémunérations dues" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6412 - Congés payés",
            rows: [
                ["6412", "Congés payés", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("6413", "Primes et gratifications", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "641",
        counterpart: { number: "421", label: "Personnel - Rémunérations dues" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6413 - Primes et gratifications",
            rows: [
                ["6413", "Primes et gratifications", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("6414", "Indemnités et avantages divers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "641",
        counterpart: { number: "421", label: "Personnel - Rémunérations dues" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6414 - Indemnités et avantages divers",
            rows: [
                ["6414", "Indemnités et avantages divers", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("6415", "Supplément familial", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "641",
        counterpart: { number: "421", label: "Personnel - Rémunérations dues" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6415 - Supplément familial",
            rows: [
                ["6415", "Supplément familial", "X", ""],
                ["421", "Personnel - Rémunérations dues", "", "X"],
            ],
        },
    }),
    defineAccount("644", "Rémunération du travail de l'exploitant", {
        description: "Rémunération et cotisations sociales de l'exploitant individuel et de sa famille.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "64",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 644 - Rémunération du travail de l'exploitant",
            rows: [
                ["644", "Rémunération du travail de l'exploitant", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("645", "Cotisations de sécurité sociale et de prévoyance", {
        description: "Cotisations patronales.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "64",
        counterpart: { number: "43", label: "Sécurité sociale et autres organismes sociaux" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 645 - Cotisations de sécurité sociale et de prévoyance",
            rows: [
                ["645", "Cotisations de sécurité sociale et de prévoyance", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("6451", "Cotisations à l'Urssaf", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "645",
        counterpart: { number: "43", label: "Sécurité sociale et autres organismes sociaux" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6451 - Cotisations à l'Urssaf",
            rows: [
                ["6451", "Cotisations à l'Urssaf", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("6452", "Cotisations aux mutuelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "645",
        counterpart: { number: "43", label: "Sécurité sociale et autres organismes sociaux" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6452 - Cotisations aux mutuelles",
            rows: [
                ["6452", "Cotisations aux mutuelles", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("6453", "Cotisations aux caisses de retraites", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "645",
        counterpart: { number: "43", label: "Sécurité sociale et autres organismes sociaux" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6453 - Cotisations aux caisses de retraites",
            rows: [
                ["6453", "Cotisations aux caisses de retraites", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("6454", "Cotisations à Pôle emploi", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "645",
        counterpart: { number: "43", label: "Sécurité sociale et autres organismes sociaux" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6454 - Cotisations à Pôle emploi",
            rows: [
                ["6454", "Cotisations à Pôle emploi", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("6458", "Cotisations aux autres organismes sociaux", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "645",
        counterpart: { number: "43", label: "Sécurité sociale et autres organismes sociaux" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6458 - Cotisations aux autres organismes sociaux",
            rows: [
                ["6458", "Cotisations aux autres organismes sociaux", "X", ""],
                ["43", "Sécurité sociale et autres organismes sociaux", "", "X"],
            ],
        },
    }),
    defineAccount("646", "Cotisations sociales personnelles de l'exploitant", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "64",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 646 - Cotisations sociales personnelles de l'exploitant",
            rows: [
                ["646", "Cotisations sociales personnelles de l'exploitant", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("647", "Autres cotisations sociales", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "64",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 647 - Autres cotisations sociales",
            rows: [
                ["647", "Autres cotisations sociales", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6471", "Prestations directes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "647",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6471 - Prestations directes",
            rows: [
                ["6471", "Prestations directes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6472", "Versements au comité social et économique", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "647",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6472 - Versements au comité social et économique",
            rows: [
                ["6472", "Versements au comité social et économique", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6474", "Versements aux autres œuvres sociales", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "647",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6474 - Versements aux autres œuvres sociales",
            rows: [
                ["6474", "Versements aux autres œuvres sociales", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6475", "Médecine du travail, pharmacie", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "647",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6475 - Médecine du travail, pharmacie",
            rows: [
                ["6475", "Médecine du travail, pharmacie", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("648", "Autres charges de personnel", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "64",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 648 - Autres charges de personnel",
            rows: [
                ["648", "Autres charges de personnel", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("649", "Remboursements de charges de personnel", {
        description: "Remboursements reçus en compensation directe de charges de personnel.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "64",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 649 - Remboursements de charges de personnel",
            rows: [
                ["649", "Remboursements de charges de personnel", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("65", "Autres charges de gestion courante", {
        description:
            "Charges de gestion courante autres que les achats, services extérieurs, impôts et charges de personnel.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 65 - Autres charges de gestion courante",
            rows: [
                ["65", "Autres charges de gestion courante", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount(
        "651",
        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
        {
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: false,
            parent: "65",
            counterpart: { number: "401", label: "Fournisseurs" },
            usageTips: [
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 651 - Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
                rows: [
                    [
                        "651",
                        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
                        "X",
                        "",
                    ],
                    ["401", "Fournisseurs", "", "X"],
                ],
            },
        },
    ),
    defineAccount(
        "6511",
        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques",
        {
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: true,
            parent: "651",
            counterpart: { number: "401", label: "Fournisseurs" },
            usageTips: [
                "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 6511 - Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques",
                rows: [
                    [
                        "6511",
                        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques",
                        "X",
                        "",
                    ],
                    ["401", "Fournisseurs", "", "X"],
                ],
            },
        },
    ),
    defineAccount("6516", "Droits d'auteur et de reproduction", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "651",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6516 - Droits d'auteur et de reproduction",
            rows: [
                ["6516", "Droits d'auteur et de reproduction", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6518", "Autres droits et valeurs similaires", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "651",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6518 - Autres droits et valeurs similaires",
            rows: [
                ["6518", "Autres droits et valeurs similaires", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("653", "Rémunérations de l’activité des administrateurs et des gérants", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "65",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 653 - Rémunérations de l’activité des administrateurs et des gérants",
            rows: [
                ["653", "Rémunérations de l’activité des administrateurs et des gérants", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("654", "Pertes sur créances irrécouvrables", {
        description: "Créances définitivement perdues, de caractère habituel eu égard à l'activité.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "65",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 654 - Pertes sur créances irrécouvrables",
            rows: [
                ["654", "Pertes sur créances irrécouvrables", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6541", "Créances de l'exercice", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "654",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6541 - Créances de l'exercice",
            rows: [
                ["6541", "Créances de l'exercice", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6544", "Créances des exercices antérieurs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "654",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6544 - Créances des exercices antérieurs",
            rows: [
                ["6544", "Créances des exercices antérieurs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("655", "Quote-part de résultat sur opérations faites en commun", {
        description:
            "Part de pertes supportée (non-gérant) ou de bénéfices répartis aux associés (gérant) sur opérations en commun.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "65",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 655 - Quote-part de résultat sur opérations faites en commun",
            rows: [
                ["655", "Quote-part de résultat sur opérations faites en commun", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6551", "Quote-part de bénéfice transférée - comptabilité du gérant", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "655",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6551 - Quote-part de bénéfice transférée - comptabilité du gérant",
            rows: [
                ["6551", "Quote-part de bénéfice transférée - comptabilité du gérant", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6555", "Quote-part de perte supportée - comptabilité des associés non gérants", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "655",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6555 - Quote-part de perte supportée - comptabilité des associés non gérants",
            rows: [
                ["6555", "Quote-part de perte supportée - comptabilité des associés non gérants", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("656", "Pertes de change sur créances et dettes commerciales", {
        description: "Pertes de change réalisées sur des opérations commerciales.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "65",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 656 - Pertes de change sur créances et dettes commerciales",
            rows: [
                ["656", "Pertes de change sur créances et dettes commerciales", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("657", "Valeurs comptables des immobilisations incorporelles et corporelles cédées", {
        description:
            "Valeur nette comptable des immobilisations incorporelles et corporelles sorties de l'actif lors d'une cession.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "65",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 657 - Valeurs comptables des immobilisations incorporelles et corporelles cédées",
            rows: [
                ["657", "Valeurs comptables des immobilisations incorporelles et corporelles cédées", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("658", "Pénalités et autres charges", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "65",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 658 - Pénalités et autres charges",
            rows: [
                ["658", "Pénalités et autres charges", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6581", "Pénalités sur marchés (et dédits payés sur achats et ventes)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "658",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6581 - Pénalités sur marchés (et dédits payés sur achats et ventes)",
            rows: [
                ["6581", "Pénalités sur marchés (et dédits payés sur achats et ventes)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6582", "Pénalités, amendes fiscales et pénales", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "658",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6582 - Pénalités, amendes fiscales et pénales",
            rows: [
                ["6582", "Pénalités, amendes fiscales et pénales", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6583", "Malis provenant de clauses d’indexation", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "658",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6583 - Malis provenant de clauses d’indexation",
            rows: [
                ["6583", "Malis provenant de clauses d’indexation", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6584", "Lots", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "658",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6584 - Lots",
            rows: [
                ["6584", "Lots", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6588", "Opérations de constitution ou liquidation des fiducies", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "658",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6588 - Opérations de constitution ou liquidation des fiducies",
            rows: [
                ["6588", "Opérations de constitution ou liquidation des fiducies", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("66", "Charges financières", {
        description: "Charges rattachées à la gestion financière de l'entité.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 66 - Charges financières",
            rows: [
                ["66", "Charges financières", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("661", "Charges d'intérêts", {
        description: "Intérêts payés sur les emprunts.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "66",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 661 - Charges d'intérêts",
            rows: [
                ["661", "Charges d'intérêts", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6611", "Intérêts des emprunts et dettes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "661",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6611 - Intérêts des emprunts et dettes",
            rows: [
                ["6611", "Intérêts des emprunts et dettes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("66116", "Intérêts des emprunts et dettes assimilées", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6611",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 66116 - Intérêts des emprunts et dettes assimilées",
            rows: [
                ["66116", "Intérêts des emprunts et dettes assimilées", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("66117", "Intérêts des dettes rattachées à des participations", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6611",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 66117 - Intérêts des dettes rattachées à des participations",
            rows: [
                ["66117", "Intérêts des dettes rattachées à des participations", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6612", "Charges de la fiducie, résultat de la période", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "661",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6612 - Charges de la fiducie, résultat de la période",
            rows: [
                ["6612", "Charges de la fiducie, résultat de la période", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6615", "Intérêts des comptes courants et des dépôts créditeurs", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "661",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6615 - Intérêts des comptes courants et des dépôts créditeurs",
            rows: [
                ["6615", "Intérêts des comptes courants et des dépôts créditeurs", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6616", "Intérêts bancaires et sur opérations de financement (escompte…)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "661",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6616 - Intérêts bancaires et sur opérations de financement (escompte…)",
            rows: [
                ["6616", "Intérêts bancaires et sur opérations de financement (escompte…)", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6617", "Intérêts des obligations cautionnées", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "661",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6617 - Intérêts des obligations cautionnées",
            rows: [
                ["6617", "Intérêts des obligations cautionnées", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6618", "Intérêts des autres dettes", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "661",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6618 - Intérêts des autres dettes",
            rows: [
                ["6618", "Intérêts des autres dettes", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("66181", "Intérêts des dettes commerciales", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6618",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 66181 - Intérêts des dettes commerciales",
            rows: [
                ["66181", "Intérêts des dettes commerciales", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("66188", "Intérêts des dettes diverses", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6618",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 66188 - Intérêts des dettes diverses",
            rows: [
                ["66188", "Intérêts des dettes diverses", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("664", "Pertes sur créances liées à des participations", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "66",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 664 - Pertes sur créances liées à des participations",
            rows: [
                ["664", "Pertes sur créances liées à des participations", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("665", "Escomptes accordés", {
        description: "Escomptes de règlement accordés aux clients pour paiement anticipé.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "66",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 665 - Escomptes accordés",
            rows: [
                ["665", "Escomptes accordés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("666", "Pertes de change financières", {
        description: "Pertes de change sur des opérations de nature financière.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "66",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 666 - Pertes de change financières",
            rows: [
                ["666", "Pertes de change financières", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("667", "Charges sur cession d’éléments financiers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "66",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 667 - Charges sur cession d’éléments financiers",
            rows: [
                ["667", "Charges sur cession d’éléments financiers", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6671", "Valeurs comptables des immobilisations financières cédées", {
        description:
            "Valeur comptable des immobilisations financières cédées, hors titres de l'activité de portefeuille.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "667",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6671 - Valeurs comptables des immobilisations financières cédées",
            rows: [
                ["6671", "Valeurs comptables des immobilisations financières cédées", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6672", "Charges nettes sur cessions de titres immobilisés de l’activité de portefeuille", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "667",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6672 - Charges nettes sur cessions de titres immobilisés de l’activité de portefeuille",
            rows: [
                ["6672", "Charges nettes sur cessions de titres immobilisés de l’activité de portefeuille", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6673", "Charges nettes sur cessions de valeurs mobilières de placement", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "667",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6673 - Charges nettes sur cessions de valeurs mobilières de placement",
            rows: [
                ["6673", "Charges nettes sur cessions de valeurs mobilières de placement", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6674", "Charges nettes sur cessions de jetons", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "667",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6674 - Charges nettes sur cessions de jetons",
            rows: [
                ["6674", "Charges nettes sur cessions de jetons", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("668", "Autres charges financières", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "66",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 668 - Autres charges financières",
            rows: [
                ["668", "Autres charges financières", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6683", "Mali provenant du rachat par l’entité d’actions et obligations émises par elle- même", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "668",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6683 - Mali provenant du rachat par l’entité d’actions et obligations émises par elle- même",
            rows: [
                [
                    "6683",
                    "Mali provenant du rachat par l’entité d’actions et obligations émises par elle- même",
                    "X",
                    "",
                ],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("67", "Charges exceptionnelles", {
        description: "Charges ne se rapportant pas à la gestion courante ou financière de l'entité.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 67 - Charges exceptionnelles",
            rows: [
                ["67", "Charges exceptionnelles", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount(
        "672",
        "(Compte à la disposition des entités pour enregistrer, en cours d'exercice, les charges sur exercices antérieurs)",
        {
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: false,
            parent: "67",
            counterpart: { number: "401", label: "Fournisseurs" },
            usageTips: [
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 672 - (Compte à la disposition des entités pour enregistrer, en cours d'exercice, les charges sur exercices antérieurs)",
                rows: [
                    [
                        "672",
                        "(Compte à la disposition des entités pour enregistrer, en cours d'exercice, les charges sur exercices antérieurs)",
                        "X",
                        "",
                    ],
                    ["401", "Fournisseurs", "", "X"],
                ],
            },
        },
    ),
    defineAccount("678", "Autres charges exceptionnelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "67",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 678 - Autres charges exceptionnelles",
            rows: [
                ["678", "Autres charges exceptionnelles", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("68", "Dotations aux amortissements, aux dépréciations et aux provisions", {
        description: "Charges calculées constatant la dépréciation des actifs ou les risques et charges prévisibles.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 68 - Dotations aux amortissements, aux dépréciations et aux provisions",
            rows: [
                ["68", "Dotations aux amortissements, aux dépréciations et aux provisions", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "681",
        "Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges d'exploitation)",
        {
            description: "Amortissement annuel des immobilisations.",
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: false,
            parent: "68",
            counterpart: { number: "28", label: "Amortissements des immobilisations" },
            usageTips: [
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 681 - Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges d'exploitation)",
                rows: [
                    [
                        "681",
                        "Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges d'exploitation)",
                        "X",
                        "",
                    ],
                    ["28", "Amortissements des immobilisations", "", "X"],
                ],
            },
        },
    ),
    defineAccount("6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "681",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6811 - Dotations aux amortissements sur immobilisations incorporelles et corporelles",
            rows: [
                ["6811", "Dotations aux amortissements sur immobilisations incorporelles et corporelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68111", "Immobilisations incorporelles et frais d’établissement", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6811",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68111 - Immobilisations incorporelles et frais d’établissement",
            rows: [
                ["68111", "Immobilisations incorporelles et frais d’établissement", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68112", "Immobilisations corporelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6811",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68112 - Immobilisations corporelles",
            rows: [
                ["68112", "Immobilisations corporelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6815", "Dotations aux provisions d'exploitation", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "681",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6815 - Dotations aux provisions d'exploitation",
            rows: [
                ["6815", "Dotations aux provisions d'exploitation", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "681",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6816 - Dotations pour dépréciations des immobilisations incorporelles et corporelles",
            rows: [
                ["6816", "Dotations pour dépréciations des immobilisations incorporelles et corporelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68161", "Immobilisations incorporelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6816",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68161 - Immobilisations incorporelles",
            rows: [
                ["68161", "Immobilisations incorporelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68162", "Immobilisations corporelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6816",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68162 - Immobilisations corporelles",
            rows: [
                ["68162", "Immobilisations corporelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6817", "Dotations pour dépréciations des actifs circulants", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "681",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6817 - Dotations pour dépréciations des actifs circulants",
            rows: [
                ["6817", "Dotations pour dépréciations des actifs circulants", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68173", "Stocks et en-cours", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6817",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68173 - Stocks et en-cours",
            rows: [
                ["68173", "Stocks et en-cours", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68174", "Créances", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6817",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68174 - Créances",
            rows: [
                ["68174", "Créances", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "686",
        "Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges financières)",
        {
            description: "Dotations aux amortissements et dépréciations relatives aux éléments financiers.",
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: false,
            parent: "68",
            counterpart: { number: "28", label: "Amortissements des immobilisations" },
            usageTips: [
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 686 - Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges financières)",
                rows: [
                    [
                        "686",
                        "Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges financières)",
                        "X",
                        "",
                    ],
                    ["28", "Amortissements des immobilisations", "", "X"],
                ],
            },
        },
    ),
    defineAccount("6861", "Dotations aux amortissements des primes de remboursement des emprunts", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "686",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6861 - Dotations aux amortissements des primes de remboursement des emprunts",
            rows: [
                ["6861", "Dotations aux amortissements des primes de remboursement des emprunts", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6862", "Dotations aux amortissements des frais d'émission des emprunts", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "686",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6862 - Dotations aux amortissements des frais d'émission des emprunts",
            rows: [
                ["6862", "Dotations aux amortissements des frais d'émission des emprunts", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6865", "Dotations aux provisions financières", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "686",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6865 - Dotations aux provisions financières",
            rows: [
                ["6865", "Dotations aux provisions financières", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6866", "Dotations pour dépréciation des éléments financiers", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "686",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6866 - Dotations pour dépréciation des éléments financiers",
            rows: [
                ["6866", "Dotations pour dépréciation des éléments financiers", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68662", "Immobilisations financières", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6866",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68662 - Immobilisations financières",
            rows: [
                ["68662", "Immobilisations financières", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68665", "Valeurs mobilières de placement", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6866",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68665 - Valeurs mobilières de placement",
            rows: [
                ["68665", "Valeurs mobilières de placement", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount(
        "687",
        "Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges exceptionnelles)",
        {
            description: "Dotations aux amortissements dérogatoires et provisions réglementées ou exceptionnelles.",
            classNumber: 6,
            className: "Comptes de charges",
            type: "résultat",
            side: "charge",
            isOptional: false,
            parent: "68",
            counterpart: { number: "28", label: "Amortissements des immobilisations" },
            usageTips: [
                "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Constatation ou augmentation de la charge",
            creditMeaning: "Annulation ou diminution de la charge",
            journalExample: {
                description:
                    "Écriture type pour le compte 687 - Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges exceptionnelles)",
                rows: [
                    [
                        "687",
                        "Dotations aux amortissements, aux dépréciations et aux provisions (à inscrire dans les charges exceptionnelles)",
                        "X",
                        "",
                    ],
                    ["28", "Amortissements des immobilisations", "", "X"],
                ],
            },
        },
    ),
    defineAccount("6871", "Dotations aux amortissements exceptionnels des immobilisations", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "687",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 6871 - Dotations aux amortissements exceptionnels des immobilisations",
            rows: [
                ["6871", "Dotations aux amortissements exceptionnels des immobilisations", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6872", "Dotations aux provisions réglementées (immobilisations)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "687",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6872 - Dotations aux provisions réglementées (immobilisations)",
            rows: [
                ["6872", "Dotations aux provisions réglementées (immobilisations)", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("68725", "Amortissements dérogatoires", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "6872",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 68725 - Amortissements dérogatoires",
            rows: [
                ["68725", "Amortissements dérogatoires", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6873", "Dotations aux provisions réglementées (stocks)", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "687",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6873 - Dotations aux provisions réglementées (stocks)",
            rows: [
                ["6873", "Dotations aux provisions réglementées (stocks)", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6874", "Dotations aux autres provisions réglementées", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "687",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6874 - Dotations aux autres provisions réglementées",
            rows: [
                ["6874", "Dotations aux autres provisions réglementées", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6875", "Dotations aux provisions exceptionnelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "687",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6875 - Dotations aux provisions exceptionnelles",
            rows: [
                ["6875", "Dotations aux provisions exceptionnelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("6876", "Dotations pour dépréciations exceptionnelles", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "687",
        counterpart: { number: "28", label: "Amortissements des immobilisations" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6876 - Dotations pour dépréciations exceptionnelles",
            rows: [
                ["6876", "Dotations pour dépréciations exceptionnelles", "X", ""],
                ["28", "Amortissements des immobilisations", "", "X"],
            ],
        },
    }),
    defineAccount("69", "Participation des salariés - Impôts sur les bénéfices et assimilés", {
        description: "Participation des salariés aux résultats et impôts sur les bénéfices de l'entité.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "6",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 69 - Participation des salariés - Impôts sur les bénéfices et assimilés",
            rows: [
                ["69", "Participation des salariés - Impôts sur les bénéfices et assimilés", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("691", "Participation des salariés aux résultats", {
        description: "Droits des salariés sur les résultats de l'exercice, provisionnés à la clôture.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "69",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 691 - Participation des salariés aux résultats",
            rows: [
                ["691", "Participation des salariés aux résultats", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("695", "Impôts sur les bénéfices", {
        description: "Montant dû au titre des bénéfices imposables en France et à l'étranger.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "69",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 695 - Impôts sur les bénéfices",
            rows: [
                ["695", "Impôts sur les bénéfices", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6951", "Impôts dus en France", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "695",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6951 - Impôts dus en France",
            rows: [
                ["6951", "Impôts dus en France", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6952", "Contribution additionnelle à l'impôt sur les bénéfices", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "695",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6952 - Contribution additionnelle à l'impôt sur les bénéfices",
            rows: [
                ["6952", "Contribution additionnelle à l'impôt sur les bénéfices", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6954", "Impôts dus à l'étranger", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: true,
        parent: "695",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6954 - Impôts dus à l'étranger",
            rows: [
                ["6954", "Impôts dus à l'étranger", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("696", "Suppléments d'impôt sur les sociétés liés aux distributions", {
        description: "Supplément d'impôt sur les sociétés dû en raison des distributions de dividendes.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "69",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description:
                "Écriture type pour le compte 696 - Suppléments d'impôt sur les sociétés liés aux distributions",
            rows: [
                ["696", "Suppléments d'impôt sur les sociétés liés aux distributions", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("698", "Intégration fiscale", {
        description: "Charges et produits afférents au régime d'intégration fiscale.",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "69",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 698 - Intégration fiscale",
            rows: [
                ["698", "Intégration fiscale", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6981", "Intégration fiscale - Charges", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "698",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6981 - Intégration fiscale - Charges",
            rows: [
                ["6981", "Intégration fiscale - Charges", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("6989", "Intégration fiscale - Produits", {
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "698",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 6989 - Intégration fiscale - Produits",
            rows: [
                ["6989", "Intégration fiscale - Produits", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),
    defineAccount("699", "Produits - Reports en arrière des déficits", {
        description: "Produit résultant du report en arrière de déficits fiscaux (carry-back).",
        classNumber: 6,
        className: "Comptes de charges",
        type: "résultat",
        side: "charge",
        isOptional: false,
        parent: "69",
        counterpart: { number: "401", label: "Fournisseurs" },
        usageTips: [
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Constatation ou augmentation de la charge",
        creditMeaning: "Annulation ou diminution de la charge",
        journalExample: {
            description: "Écriture type pour le compte 699 - Produits - Reports en arrière des déficits",
            rows: [
                ["699", "Produits - Reports en arrière des déficits", "X", ""],
                ["401", "Fournisseurs", "", "X"],
            ],
        },
    }),

    // Classe 7 - Comptes de produits
    defineAccount("7", "Comptes de produits", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: null,
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7 - Comptes de produits",
            rows: [
                ["411", "Clients", "X", ""],
                ["7", "Comptes de produits", "", "X"],
            ],
        },
    }),
    defineAccount("70", "Ventes de produits fabriqués, prestations de services, marchandises", {
        description: "Chiffre d'affaires de l'entité : ventes de produits, prestations de services et marchandises.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 70 - Ventes de produits fabriqués, prestations de services, marchandises",
            rows: [
                ["411", "Clients", "X", ""],
                ["70", "Ventes de produits fabriqués, prestations de services, marchandises", "", "X"],
            ],
        },
    }),
    defineAccount("701", "Ventes de produits finis", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 701 - Ventes de produits finis",
            rows: [
                ["411", "Clients", "X", ""],
                ["701", "Ventes de produits finis", "", "X"],
            ],
        },
    }),
    defineAccount("702", "Ventes de produits intermédiaires", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 702 - Ventes de produits intermédiaires",
            rows: [
                ["411", "Clients", "X", ""],
                ["702", "Ventes de produits intermédiaires", "", "X"],
            ],
        },
    }),
    defineAccount("703", "Ventes de produits résiduels", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 703 - Ventes de produits résiduels",
            rows: [
                ["411", "Clients", "X", ""],
                ["703", "Ventes de produits résiduels", "", "X"],
            ],
        },
    }),
    defineAccount("704", "Travaux", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 704 - Travaux",
            rows: [
                ["411", "Clients", "X", ""],
                ["704", "Travaux", "", "X"],
            ],
        },
    }),
    defineAccount("705", "Études", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 705 - Études",
            rows: [
                ["411", "Clients", "X", ""],
                ["705", "Études", "", "X"],
            ],
        },
    }),
    defineAccount("706", "Prestations de services", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 706 - Prestations de services",
            rows: [
                ["411", "Clients", "X", ""],
                ["706", "Prestations de services", "", "X"],
            ],
        },
    }),
    defineAccount("707", "Ventes de marchandises", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 707 - Ventes de marchandises",
            rows: [
                ["411", "Clients", "X", ""],
                ["707", "Ventes de marchandises", "", "X"],
            ],
        },
    }),
    defineAccount("708", "Produits des activités annexes", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 708 - Produits des activités annexes",
            rows: [
                ["411", "Clients", "X", ""],
                ["708", "Produits des activités annexes", "", "X"],
            ],
        },
    }),
    defineAccount("7081", "Produits des services exploités dans l'intérêt du personnel", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7081 - Produits des services exploités dans l'intérêt du personnel",
            rows: [
                ["411", "Clients", "X", ""],
                ["7081", "Produits des services exploités dans l'intérêt du personnel", "", "X"],
            ],
        },
    }),
    defineAccount("7082", "Commissions et courtages", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7082 - Commissions et courtages",
            rows: [
                ["411", "Clients", "X", ""],
                ["7082", "Commissions et courtages", "", "X"],
            ],
        },
    }),
    defineAccount("7083", "Locations diverses", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7083 - Locations diverses",
            rows: [
                ["411", "Clients", "X", ""],
                ["7083", "Locations diverses", "", "X"],
            ],
        },
    }),
    defineAccount("7084", "Mise à disposition de personnel facturée", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7084 - Mise à disposition de personnel facturée",
            rows: [
                ["411", "Clients", "X", ""],
                ["7084", "Mise à disposition de personnel facturée", "", "X"],
            ],
        },
    }),
    defineAccount("7085", "Ports et frais accessoires facturés", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7085 - Ports et frais accessoires facturés",
            rows: [
                ["411", "Clients", "X", ""],
                ["7085", "Ports et frais accessoires facturés", "", "X"],
            ],
        },
    }),
    defineAccount("7086", "Bonis sur reprises d'emballages consignés", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7086 - Bonis sur reprises d'emballages consignés",
            rows: [
                ["411", "Clients", "X", ""],
                ["7086", "Bonis sur reprises d'emballages consignés", "", "X"],
            ],
        },
    }),
    defineAccount("7087", "Bonifications obtenues des clients et primes sur ventes", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7087 - Bonifications obtenues des clients et primes sur ventes",
            rows: [
                ["411", "Clients", "X", ""],
                ["7087", "Bonifications obtenues des clients et primes sur ventes", "", "X"],
            ],
        },
    }),
    defineAccount("7088", "Autres produits d'activités annexes (cessions d'approvisionnements)", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "708",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7088 - Autres produits d'activités annexes (cessions d'approvisionnements)",
            rows: [
                ["411", "Clients", "X", ""],
                ["7088", "Autres produits d'activités annexes (cessions d'approvisionnements)", "", "X"],
            ],
        },
    }),
    defineAccount("709", "Rabais, remises et ristournes accordés", {
        description: "Réductions accordées aux clients, non déduites des factures de vente initiales.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "70",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 709 - Rabais, remises et ristournes accordés",
            rows: [
                ["411", "Clients", "X", ""],
                ["709", "Rabais, remises et ristournes accordés", "", "X"],
            ],
        },
    }),
    defineAccount("7091", "Rabais, remises et ristournes accordés sur ventes de produits finis", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7091 - Rabais, remises et ristournes accordés sur ventes de produits finis",
            rows: [
                ["411", "Clients", "X", ""],
                ["7091", "Rabais, remises et ristournes accordés sur ventes de produits finis", "", "X"],
            ],
        },
    }),
    defineAccount("7092", "Rabais, remises et ristournes accordés sur ventes de produits intermédiaires", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7092 - Rabais, remises et ristournes accordés sur ventes de produits intermédiaires",
            rows: [
                ["411", "Clients", "X", ""],
                ["7092", "Rabais, remises et ristournes accordés sur ventes de produits intermédiaires", "", "X"],
            ],
        },
    }),
    defineAccount("7094", "Rabais, remises et ristournes accordés sur travaux", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7094 - Rabais, remises et ristournes accordés sur travaux",
            rows: [
                ["411", "Clients", "X", ""],
                ["7094", "Rabais, remises et ristournes accordés sur travaux", "", "X"],
            ],
        },
    }),
    defineAccount("7095", "Rabais, remises et ristournes accordés sur études", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7095 - Rabais, remises et ristournes accordés sur études",
            rows: [
                ["411", "Clients", "X", ""],
                ["7095", "Rabais, remises et ristournes accordés sur études", "", "X"],
            ],
        },
    }),
    defineAccount("7096", "Rabais, remises et ristournes accordés sur prestations de services", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7096 - Rabais, remises et ristournes accordés sur prestations de services",
            rows: [
                ["411", "Clients", "X", ""],
                ["7096", "Rabais, remises et ristournes accordés sur prestations de services", "", "X"],
            ],
        },
    }),
    defineAccount("7097", "Rabais, remises et ristournes accordés sur ventes de marchandises", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7097 - Rabais, remises et ristournes accordés sur ventes de marchandises",
            rows: [
                ["411", "Clients", "X", ""],
                ["7097", "Rabais, remises et ristournes accordés sur ventes de marchandises", "", "X"],
            ],
        },
    }),
    defineAccount("7098", "Rabais, remises et ristournes accordés sur produits des activités annexes", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "709",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7098 - Rabais, remises et ristournes accordés sur produits des activités annexes",
            rows: [
                ["411", "Clients", "X", ""],
                ["7098", "Rabais, remises et ristournes accordés sur produits des activités annexes", "", "X"],
            ],
        },
    }),
    defineAccount("71", "Production stockée (ou déstockage)", {
        description: "Variation globale de la valeur de la production stockée entre le début et la fin de l'exercice.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71 - Production stockée (ou déstockage)",
            rows: [
                ["411", "Clients", "X", ""],
                ["71", "Production stockée (ou déstockage)", "", "X"],
            ],
        },
    }),
    defineAccount("713", "Variation des stocks des en-cours de production et de produits", {
        description: "Différence entre la valeur de la production stockée en fin et en début d'exercice.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "71",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 713 - Variation des stocks des en-cours de production et de produits",
            rows: [
                ["411", "Clients", "X", ""],
                ["713", "Variation des stocks des en-cours de production et de produits", "", "X"],
            ],
        },
    }),
    defineAccount("7133", "Variation des en-cours de production de biens", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "713",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7133 - Variation des en-cours de production de biens",
            rows: [
                ["411", "Clients", "X", ""],
                ["7133", "Variation des en-cours de production de biens", "", "X"],
            ],
        },
    }),
    defineAccount("71331", "Produits en cours", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7133",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71331 - Produits en cours",
            rows: [
                ["411", "Clients", "X", ""],
                ["71331", "Produits en cours", "", "X"],
            ],
        },
    }),
    defineAccount("71335", "Travaux en cours", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7133",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71335 - Travaux en cours",
            rows: [
                ["411", "Clients", "X", ""],
                ["71335", "Travaux en cours", "", "X"],
            ],
        },
    }),
    defineAccount("7134", "Variation des en-cours de production de services", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "713",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7134 - Variation des en-cours de production de services",
            rows: [
                ["411", "Clients", "X", ""],
                ["7134", "Variation des en-cours de production de services", "", "X"],
            ],
        },
    }),
    defineAccount("71341", "Études en cours", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7134",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71341 - Études en cours",
            rows: [
                ["411", "Clients", "X", ""],
                ["71341", "Études en cours", "", "X"],
            ],
        },
    }),
    defineAccount("71345", "Prestations de services en cours", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7134",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71345 - Prestations de services en cours",
            rows: [
                ["411", "Clients", "X", ""],
                ["71345", "Prestations de services en cours", "", "X"],
            ],
        },
    }),
    defineAccount("7135", "Variation des stocks de produits", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "713",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7135 - Variation des stocks de produits",
            rows: [
                ["411", "Clients", "X", ""],
                ["7135", "Variation des stocks de produits", "", "X"],
            ],
        },
    }),
    defineAccount("71351", "Produits intermédiaires", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7135",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71351 - Produits intermédiaires",
            rows: [
                ["411", "Clients", "X", ""],
                ["71351", "Produits intermédiaires", "", "X"],
            ],
        },
    }),
    defineAccount("71355", "Produits finis", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7135",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71355 - Produits finis",
            rows: [
                ["411", "Clients", "X", ""],
                ["71355", "Produits finis", "", "X"],
            ],
        },
    }),
    defineAccount("71358", "Produits résiduels", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7135",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 71358 - Produits résiduels",
            rows: [
                ["411", "Clients", "X", ""],
                ["71358", "Produits résiduels", "", "X"],
            ],
        },
    }),
    defineAccount("72", "Production immobilisée", {
        description: "Coût des travaux réalisés par l'entité pour elle-même et inscrits à l'actif immobilisé.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 72 - Production immobilisée",
            rows: [
                ["411", "Clients", "X", ""],
                ["72", "Production immobilisée", "", "X"],
            ],
        },
    }),
    defineAccount("721", "Immobilisations incorporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "72",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 721 - Immobilisations incorporelles",
            rows: [
                ["411", "Clients", "X", ""],
                ["721", "Immobilisations incorporelles", "", "X"],
            ],
        },
    }),
    defineAccount("722", "Immobilisations corporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "72",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 722 - Immobilisations corporelles",
            rows: [
                ["411", "Clients", "X", ""],
                ["722", "Immobilisations corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("74", "Subventions", {
        description:
            "Subventions d'exploitation, d'équilibre et quote-part des subventions d'investissement virée au résultat.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 74 - Subventions",
            rows: [
                ["411", "Clients", "X", ""],
                ["74", "Subventions", "", "X"],
            ],
        },
    }),
    defineAccount("741", "Subventions d’exploitation", {
        description: "Subventions reçues pour compenser des charges d'exploitation ou un niveau de prix insuffisant.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "74",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 741 - Subventions d’exploitation",
            rows: [
                ["411", "Clients", "X", ""],
                ["741", "Subventions d’exploitation", "", "X"],
            ],
        },
    }),
    defineAccount("742", "Subventions d’équilibre", {
        description: "Subventions destinées à compenser un déficit d'exploitation.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "74",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 742 - Subventions d’équilibre",
            rows: [
                ["411", "Clients", "X", ""],
                ["742", "Subventions d’équilibre", "", "X"],
            ],
        },
    }),
    defineAccount("747", "Quote-part des subventions d’investissement virée au résultat de l’exercice", {
        description: "Part des subventions d'investissement rapportée au résultat de l'exercice.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "74",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 747 - Quote-part des subventions d’investissement virée au résultat de l’exercice",
            rows: [
                ["411", "Clients", "X", ""],
                ["747", "Quote-part des subventions d’investissement virée au résultat de l’exercice", "", "X"],
            ],
        },
    }),
    defineAccount("75", "Autres produits de gestion courante", {
        description:
            "Produits de gestion courante autres que les ventes, la production stockée ou immobilisée et les subventions.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 75 - Autres produits de gestion courante",
            rows: [
                ["411", "Clients", "X", ""],
                ["75", "Autres produits de gestion courante", "", "X"],
            ],
        },
    }),
    defineAccount(
        "751",
        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
        {
            description:
                "Redevances acquises pour l'utilisation de concessions, brevets, licences, marques et droits similaires.",
            classNumber: 7,
            className: "Comptes de produits",
            type: "résultat",
            side: "produit",
            isOptional: false,
            parent: "75",
            counterpart: { number: "411", label: "Clients" },
            usageTips: [
                "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Annulation ou diminution du produit",
            creditMeaning: "Constatation ou augmentation du produit",
            journalExample: {
                description:
                    "Écriture type pour le compte 751 - Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
                rows: [
                    ["411", "Clients", "X", ""],
                    [
                        "751",
                        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount(
        "7511",
        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques",
        {
            classNumber: 7,
            className: "Comptes de produits",
            type: "résultat",
            side: "produit",
            isOptional: true,
            parent: "751",
            counterpart: { number: "411", label: "Clients" },
            usageTips: [
                "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
                "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Annulation ou diminution du produit",
            creditMeaning: "Constatation ou augmentation du produit",
            journalExample: {
                description:
                    "Écriture type pour le compte 7511 - Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques",
                rows: [
                    ["411", "Clients", "X", ""],
                    [
                        "7511",
                        "Redevances pour concessions, brevets, licences, marques, procédés, solutions informatiques",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("7516", "Droits d'auteur et de reproduction", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "751",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7516 - Droits d'auteur et de reproduction",
            rows: [
                ["411", "Clients", "X", ""],
                ["7516", "Droits d'auteur et de reproduction", "", "X"],
            ],
        },
    }),
    defineAccount("7518", "Autres droits et valeurs similaires", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "751",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7518 - Autres droits et valeurs similaires",
            rows: [
                ["411", "Clients", "X", ""],
                ["7518", "Autres droits et valeurs similaires", "", "X"],
            ],
        },
    }),
    defineAccount("752", "Revenus des immeubles non affectés à des activités professionnelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 752 - Revenus des immeubles non affectés à des activités professionnelles",
            rows: [
                ["411", "Clients", "X", ""],
                ["752", "Revenus des immeubles non affectés à des activités professionnelles", "", "X"],
            ],
        },
    }),
    defineAccount("753", "Rémunérations de l’activité des administrateurs et des gérants", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 753 - Rémunérations de l’activité des administrateurs et des gérants",
            rows: [
                ["411", "Clients", "X", ""],
                ["753", "Rémunérations de l’activité des administrateurs et des gérants", "", "X"],
            ],
        },
    }),
    defineAccount("754", "Ristournes perçues des coopératives provenant des excédents", {
        description: "Quote-part des excédents de coopératives répartis entre les associés coopérateurs.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 754 - Ristournes perçues des coopératives provenant des excédents",
            rows: [
                ["411", "Clients", "X", ""],
                ["754", "Ristournes perçues des coopératives provenant des excédents", "", "X"],
            ],
        },
    }),
    defineAccount("755", "Quote-part de résultat sur opérations faites en commun", {
        description:
            "Part de bénéfices reçue (non-gérant) ou de pertes imputées aux associés (gérant) sur opérations en commun.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 755 - Quote-part de résultat sur opérations faites en commun",
            rows: [
                ["411", "Clients", "X", ""],
                ["755", "Quote-part de résultat sur opérations faites en commun", "", "X"],
            ],
        },
    }),
    defineAccount("7551", "Quote-part de perte transférée - comptabilité du gérant", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "755",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7551 - Quote-part de perte transférée - comptabilité du gérant",
            rows: [
                ["411", "Clients", "X", ""],
                ["7551", "Quote-part de perte transférée - comptabilité du gérant", "", "X"],
            ],
        },
    }),
    defineAccount("7555", "Quote-part de bénéfice attribuée - comptabilité des associés non-gérants", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "755",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7555 - Quote-part de bénéfice attribuée - comptabilité des associés non-gérants",
            rows: [
                ["411", "Clients", "X", ""],
                ["7555", "Quote-part de bénéfice attribuée - comptabilité des associés non-gérants", "", "X"],
            ],
        },
    }),
    defineAccount("756", "Gains de change sur créances et dettes commerciales", {
        description: "Cotisations des membres (pour les associations).",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 756 - Gains de change sur créances et dettes commerciales",
            rows: [
                ["411", "Clients", "X", ""],
                ["756", "Gains de change sur créances et dettes commerciales", "", "X"],
            ],
        },
    }),
    defineAccount("757", "Produits des cessions d’immobilisations incorporelles et corporelles", {
        description: "Prix de cession des immobilisations incorporelles et corporelles sorties de l'actif.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 757 - Produits des cessions d’immobilisations incorporelles et corporelles",
            rows: [
                ["411", "Clients", "X", ""],
                ["757", "Produits des cessions d’immobilisations incorporelles et corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("758", "Indemnités et autres produits", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "75",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 758 - Indemnités et autres produits",
            rows: [
                ["411", "Clients", "X", ""],
                ["758", "Indemnités et autres produits", "", "X"],
            ],
        },
    }),
    defineAccount("7581", "Dédits et pénalités perçus sur achats et ventes", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7581 - Dédits et pénalités perçus sur achats et ventes",
            rows: [
                ["411", "Clients", "X", ""],
                ["7581", "Dédits et pénalités perçus sur achats et ventes", "", "X"],
            ],
        },
    }),
    defineAccount("7582", "Libéralités reçues", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7582 - Libéralités reçues",
            rows: [
                ["411", "Clients", "X", ""],
                ["7582", "Libéralités reçues", "", "X"],
            ],
        },
    }),
    defineAccount("7583", "Rentrées sur créances amorties", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7583 - Rentrées sur créances amorties",
            rows: [
                ["411", "Clients", "X", ""],
                ["7583", "Rentrées sur créances amorties", "", "X"],
            ],
        },
    }),
    defineAccount("7584", "Dégrèvements d’impôts autres qu’impôts sur les bénéfices", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7584 - Dégrèvements d’impôts autres qu’impôts sur les bénéfices",
            rows: [
                ["411", "Clients", "X", ""],
                ["7584", "Dégrèvements d’impôts autres qu’impôts sur les bénéfices", "", "X"],
            ],
        },
    }),
    defineAccount("7585", "Bonis provenant de clauses d’indexation", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7585 - Bonis provenant de clauses d’indexation",
            rows: [
                ["411", "Clients", "X", ""],
                ["7585", "Bonis provenant de clauses d’indexation", "", "X"],
            ],
        },
    }),
    defineAccount("7586", "Lots", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7586 - Lots",
            rows: [
                ["411", "Clients", "X", ""],
                ["7586", "Lots", "", "X"],
            ],
        },
    }),
    defineAccount("7587", "Indemnités d’assurance", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7587 - Indemnités d’assurance",
            rows: [
                ["411", "Clients", "X", ""],
                ["7587", "Indemnités d’assurance", "", "X"],
            ],
        },
    }),
    defineAccount("7588", "Opérations de constitution ou liquidation des fiducies", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "758",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7588 - Opérations de constitution ou liquidation des fiducies",
            rows: [
                ["411", "Clients", "X", ""],
                ["7588", "Opérations de constitution ou liquidation des fiducies", "", "X"],
            ],
        },
    }),
    defineAccount("76", "Produits financiers", {
        description: "Produits rattachés à la gestion financière de l'entité.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 76 - Produits financiers",
            rows: [
                ["411", "Clients", "X", ""],
                ["76", "Produits financiers", "", "X"],
            ],
        },
    }),
    defineAccount("761", "Produits de participations", {
        description: "Dividendes et revenus tirés des titres de participation et créances rattachées.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 761 - Produits de participations",
            rows: [
                ["411", "Clients", "X", ""],
                ["761", "Produits de participations", "", "X"],
            ],
        },
    }),
    defineAccount("7611", "Revenus des titres de participation", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "761",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7611 - Revenus des titres de participation",
            rows: [
                ["411", "Clients", "X", ""],
                ["7611", "Revenus des titres de participation", "", "X"],
            ],
        },
    }),
    defineAccount("7612", "Produits de la fiducie, résultat de la période", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "761",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7612 - Produits de la fiducie, résultat de la période",
            rows: [
                ["411", "Clients", "X", ""],
                ["7612", "Produits de la fiducie, résultat de la période", "", "X"],
            ],
        },
    }),
    defineAccount("7616", "Revenus sur autres formes de participation", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "761",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7616 - Revenus sur autres formes de participation",
            rows: [
                ["411", "Clients", "X", ""],
                ["7616", "Revenus sur autres formes de participation", "", "X"],
            ],
        },
    }),
    defineAccount("7617", "Revenus des créances rattachées à des participations", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "761",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7617 - Revenus des créances rattachées à des participations",
            rows: [
                ["411", "Clients", "X", ""],
                ["7617", "Revenus des créances rattachées à des participations", "", "X"],
            ],
        },
    }),
    defineAccount("762", "Produits des autres immobilisations financières", {
        description: "Revenus des titres immobilisés, prêts et créances immobilisées.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 762 - Produits des autres immobilisations financières",
            rows: [
                ["411", "Clients", "X", ""],
                ["762", "Produits des autres immobilisations financières", "", "X"],
            ],
        },
    }),
    defineAccount("7621", "Revenus des titres immobilisés", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "762",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7621 - Revenus des titres immobilisés",
            rows: [
                ["411", "Clients", "X", ""],
                ["7621", "Revenus des titres immobilisés", "", "X"],
            ],
        },
    }),
    defineAccount("7626", "Revenus des prêts", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "762",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7626 - Revenus des prêts",
            rows: [
                ["411", "Clients", "X", ""],
                ["7626", "Revenus des prêts", "", "X"],
            ],
        },
    }),
    defineAccount("7627", "Revenus des créances immobilisées", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "762",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7627 - Revenus des créances immobilisées",
            rows: [
                ["411", "Clients", "X", ""],
                ["7627", "Revenus des créances immobilisées", "", "X"],
            ],
        },
    }),
    defineAccount("763", "Revenus des autres créances", {
        description: "Intérêts et revenus des créances commerciales et diverses.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 763 - Revenus des autres créances",
            rows: [
                ["411", "Clients", "X", ""],
                ["763", "Revenus des autres créances", "", "X"],
            ],
        },
    }),
    defineAccount("7631", "Revenus des créances commerciales", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "763",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7631 - Revenus des créances commerciales",
            rows: [
                ["411", "Clients", "X", ""],
                ["7631", "Revenus des créances commerciales", "", "X"],
            ],
        },
    }),
    defineAccount("7638", "Revenus des créances diverses", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "763",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7638 - Revenus des créances diverses",
            rows: [
                ["411", "Clients", "X", ""],
                ["7638", "Revenus des créances diverses", "", "X"],
            ],
        },
    }),
    defineAccount("764", "Revenus des valeurs mobilières de placement", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 764 - Revenus des valeurs mobilières de placement",
            rows: [
                ["411", "Clients", "X", ""],
                ["764", "Revenus des valeurs mobilières de placement", "", "X"],
            ],
        },
    }),
    defineAccount("765", "Escomptes obtenus", {
        description: "Escomptes de règlement obtenus des fournisseurs pour paiement anticipé.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 765 - Escomptes obtenus",
            rows: [
                ["411", "Clients", "X", ""],
                ["765", "Escomptes obtenus", "", "X"],
            ],
        },
    }),
    defineAccount("766", "Gains de change financiers", {
        description: "Gains de change sur des opérations de nature financière.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 766 - Gains de change financiers",
            rows: [
                ["411", "Clients", "X", ""],
                ["766", "Gains de change financiers", "", "X"],
            ],
        },
    }),
    defineAccount("767", "Produits sur cession d’éléments financiers", {
        description: "Produits des cessions d'immobilisations financières et de valeurs mobilières de placement.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 767 - Produits sur cession d’éléments financiers",
            rows: [
                ["411", "Clients", "X", ""],
                ["767", "Produits sur cession d’éléments financiers", "", "X"],
            ],
        },
    }),
    defineAccount("7671", "Produits des cessions d’immobilisations financières", {
        description: "Prix de cession des immobilisations financières, hors titres de l'activité de portefeuille.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "767",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7671 - Produits des cessions d’immobilisations financières",
            rows: [
                ["411", "Clients", "X", ""],
                ["7671", "Produits des cessions d’immobilisations financières", "", "X"],
            ],
        },
    }),
    defineAccount("7672", "Produits nets sur cessions de titres immobilisés de l’activité de portefeuille", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "767",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7672 - Produits nets sur cessions de titres immobilisés de l’activité de portefeuille",
            rows: [
                ["411", "Clients", "X", ""],
                ["7672", "Produits nets sur cessions de titres immobilisés de l’activité de portefeuille", "", "X"],
            ],
        },
    }),
    defineAccount("7673", "Produits nets sur cessions de valeurs mobilières de placement", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "767",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7673 - Produits nets sur cessions de valeurs mobilières de placement",
            rows: [
                ["411", "Clients", "X", ""],
                ["7673", "Produits nets sur cessions de valeurs mobilières de placement", "", "X"],
            ],
        },
    }),
    defineAccount("7674", "Produits nets sur cessions de jetons", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "767",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7674 - Produits nets sur cessions de jetons",
            rows: [
                ["411", "Clients", "X", ""],
                ["7674", "Produits nets sur cessions de jetons", "", "X"],
            ],
        },
    }),
    defineAccount("768", "Autres produits financiers", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "76",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 768 - Autres produits financiers",
            rows: [
                ["411", "Clients", "X", ""],
                ["768", "Autres produits financiers", "", "X"],
            ],
        },
    }),
    defineAccount(
        "7683",
        "Bonis provenant du rachat par l’entreprise d’actions et d’obligations émises par elle-même",
        {
            classNumber: 7,
            className: "Comptes de produits",
            type: "résultat",
            side: "produit",
            isOptional: true,
            parent: "768",
            counterpart: { number: "411", label: "Clients" },
            usageTips: [
                "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
                "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Annulation ou diminution du produit",
            creditMeaning: "Constatation ou augmentation du produit",
            journalExample: {
                description:
                    "Écriture type pour le compte 7683 - Bonis provenant du rachat par l’entreprise d’actions et d’obligations émises par elle-même",
                rows: [
                    ["411", "Clients", "X", ""],
                    [
                        "7683",
                        "Bonis provenant du rachat par l’entreprise d’actions et d’obligations émises par elle-même",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("77", "Produits exceptionnels", {
        description: "Produits ne se rapportant pas à la gestion courante ou financière de l'entité.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 77 - Produits exceptionnels",
            rows: [
                ["411", "Clients", "X", ""],
                ["77", "Produits exceptionnels", "", "X"],
            ],
        },
    }),
    defineAccount(
        "772",
        "(Compte à la disposition des entités pour enregistrer, en cours d'exercice, les produits sur exercices antérieurs)",
        {
            classNumber: 7,
            className: "Comptes de produits",
            type: "résultat",
            side: "produit",
            isOptional: false,
            parent: "77",
            counterpart: { number: "411", label: "Clients" },
            usageTips: [
                "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Annulation ou diminution du produit",
            creditMeaning: "Constatation ou augmentation du produit",
            journalExample: {
                description:
                    "Écriture type pour le compte 772 - (Compte à la disposition des entités pour enregistrer, en cours d'exercice, les produits sur exercices antérieurs)",
                rows: [
                    ["411", "Clients", "X", ""],
                    [
                        "772",
                        "(Compte à la disposition des entités pour enregistrer, en cours d'exercice, les produits sur exercices antérieurs)",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("778", "Autres produits exceptionnels", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "77",
        counterpart: { number: "411", label: "Clients" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 778 - Autres produits exceptionnels",
            rows: [
                ["411", "Clients", "X", ""],
                ["778", "Autres produits exceptionnels", "", "X"],
            ],
        },
    }),
    defineAccount("78", "Reprises sur amortissements, dépréciations et provisions", {
        description:
            "Reprises de charges calculées antérieurement, distinguées par nature (exploitation, financier, exceptionnel).",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "7",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78 - Reprises sur amortissements, dépréciations et provisions",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78", "Reprises sur amortissements, dépréciations et provisions", "", "X"],
            ],
        },
    }),
    defineAccount(
        "781",
        "Reprises sur amortissements, dépréciations et provisions (à inscrire dans les produits d'exploitation)",
        {
            description: "Reprises sur charges calculées relatives à l'exploitation.",
            classNumber: 7,
            className: "Comptes de produits",
            type: "résultat",
            side: "produit",
            isOptional: false,
            parent: "78",
            counterpart: { number: "29", label: "Dépréciations des immobilisations" },
            usageTips: [
                "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
            ],
            debitMeaning: "Annulation ou diminution du produit",
            creditMeaning: "Constatation ou augmentation du produit",
            journalExample: {
                description:
                    "Écriture type pour le compte 781 - Reprises sur amortissements, dépréciations et provisions (à inscrire dans les produits d'exploitation)",
                rows: [
                    ["29", "Dépréciations des immobilisations", "X", ""],
                    [
                        "781",
                        "Reprises sur amortissements, dépréciations et provisions (à inscrire dans les produits d'exploitation)",
                        "",
                        "X",
                    ],
                ],
            },
        },
    ),
    defineAccount("7811", "Reprises sur amortissements des immobilisations incorporelles et corporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "781",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7811 - Reprises sur amortissements des immobilisations incorporelles et corporelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7811", "Reprises sur amortissements des immobilisations incorporelles et corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("78111", "Immobilisations incorporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7811",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78111 - Immobilisations incorporelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78111", "Immobilisations incorporelles", "", "X"],
            ],
        },
    }),
    defineAccount("78112", "Immobilisations corporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7811",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78112 - Immobilisations corporelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78112", "Immobilisations corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("7815", "Reprises sur provisions d'exploitation", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "781",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7815 - Reprises sur provisions d'exploitation",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7815", "Reprises sur provisions d'exploitation", "", "X"],
            ],
        },
    }),
    defineAccount("7816", "Reprises sur dépréciations des immobilisations incorporelles et corporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "781",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 7816 - Reprises sur dépréciations des immobilisations incorporelles et corporelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7816", "Reprises sur dépréciations des immobilisations incorporelles et corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("78161", "Immobilisations incorporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7816",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78161 - Immobilisations incorporelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78161", "Immobilisations incorporelles", "", "X"],
            ],
        },
    }),
    defineAccount("78162", "Immobilisations corporelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7816",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78162 - Immobilisations corporelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78162", "Immobilisations corporelles", "", "X"],
            ],
        },
    }),
    defineAccount("7817", "Reprises sur dépréciations des actifs circulants", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "781",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7817 - Reprises sur dépréciations des actifs circulants",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7817", "Reprises sur dépréciations des actifs circulants", "", "X"],
            ],
        },
    }),
    defineAccount("78173", "Stocks et en-cours", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7817",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78173 - Stocks et en-cours",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78173", "Stocks et en-cours", "", "X"],
            ],
        },
    }),
    defineAccount("78174", "Créances", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7817",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78174 - Créances",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78174", "Créances", "", "X"],
            ],
        },
    }),
    defineAccount("786", "Reprises sur dépréciations et provisions (à inscrire dans les produits financiers)", {
        description: "Reprises sur dépréciations et provisions relatives aux éléments financiers.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "78",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 786 - Reprises sur dépréciations et provisions (à inscrire dans les produits financiers)",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["786", "Reprises sur dépréciations et provisions (à inscrire dans les produits financiers)", "", "X"],
            ],
        },
    }),
    defineAccount("7865", "Reprises sur provisions financières", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "786",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7865 - Reprises sur provisions financières",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7865", "Reprises sur provisions financières", "", "X"],
            ],
        },
    }),
    defineAccount("7866", "Reprises sur dépréciations des éléments financiers", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "786",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7866 - Reprises sur dépréciations des éléments financiers",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7866", "Reprises sur dépréciations des éléments financiers", "", "X"],
            ],
        },
    }),
    defineAccount("78662", "Immobilisations financières", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7866",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78662 - Immobilisations financières",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78662", "Immobilisations financières", "", "X"],
            ],
        },
    }),
    defineAccount("78665", "Valeurs mobilières de placement", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7866",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78665 - Valeurs mobilières de placement",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78665", "Valeurs mobilières de placement", "", "X"],
            ],
        },
    }),
    defineAccount("787", "Reprises sur dépréciations et provisions (à inscrire dans les produits exceptionnels)", {
        description:
            "Reprises sur dépréciations et provisions de nature exceptionnelle, y compris provisions réglementées.",
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "78",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description:
                "Écriture type pour le compte 787 - Reprises sur dépréciations et provisions (à inscrire dans les produits exceptionnels)",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                [
                    "787",
                    "Reprises sur dépréciations et provisions (à inscrire dans les produits exceptionnels)",
                    "",
                    "X",
                ],
            ],
        },
    }),
    defineAccount("7872", "Reprises sur provisions réglementées (immobilisations)", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "787",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7872 - Reprises sur provisions réglementées (immobilisations)",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7872", "Reprises sur provisions réglementées (immobilisations)", "", "X"],
            ],
        },
    }),
    defineAccount("78725", "Amortissements dérogatoires", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: true,
        parent: "7872",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 78725 - Amortissements dérogatoires",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["78725", "Amortissements dérogatoires", "", "X"],
            ],
        },
    }),
    defineAccount("7873", "Reprises sur provisions réglementées (stocks)", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "787",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7873 - Reprises sur provisions réglementées (stocks)",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7873", "Reprises sur provisions réglementées (stocks)", "", "X"],
            ],
        },
    }),
    defineAccount("7874", "Reprises sur autres provisions réglementées", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "787",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7874 - Reprises sur autres provisions réglementées",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7874", "Reprises sur autres provisions réglementées", "", "X"],
            ],
        },
    }),
    defineAccount("7875", "Reprises sur provisions exceptionnelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "787",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7875 - Reprises sur provisions exceptionnelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7875", "Reprises sur provisions exceptionnelles", "", "X"],
            ],
        },
    }),
    defineAccount("7876", "Reprises sur dépréciations exceptionnelles", {
        classNumber: 7,
        className: "Comptes de produits",
        type: "résultat",
        side: "produit",
        isOptional: false,
        parent: "787",
        counterpart: { number: "29", label: "Dépréciations des immobilisations" },
        usageTips: [
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        ],
        debitMeaning: "Annulation ou diminution du produit",
        creditMeaning: "Constatation ou augmentation du produit",
        journalExample: {
            description: "Écriture type pour le compte 7876 - Reprises sur dépréciations exceptionnelles",
            rows: [
                ["29", "Dépréciations des immobilisations", "X", ""],
                ["7876", "Reprises sur dépréciations exceptionnelles", "", "X"],
            ],
        },
    }),

    // Classe 8 - Comptes spéciaux
    defineAccount("8", "Comptes spéciaux", {
        description:
            "Les comptes spéciaux enregistrent les engagements hors bilan et les opérations particulières qui ne figurent pas directement dans le bilan ou le compte de résultat.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: null,
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de comptes spéciaux",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de comptes spéciaux",
        journalExample: {
            description: "Écriture type pour le compte 8 - Comptes spéciaux",
            rows: [
                ["8", "Comptes spéciaux", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("80", "Engagements donnés et reçus", {
        description:
            "Comptes retraçant les engagements hors bilan, c'est-à-dire les droits et obligations qui n'entraînent pas immédiatement de flux financiers mais qui peuvent en générer à l'avenir.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "8",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de engagements donnés et reçus",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de engagements donnés et reçus",
        journalExample: {
            description: "Écriture type pour le compte 80 - Engagements donnés et reçus",
            rows: [
                ["80", "Engagements donnés et reçus", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("801", "Engagements donnés par l'entité", {
        description:
            "Engagements que l'entité a accordés à des tiers : cautions, avals, garanties et autres promesses pouvant entraîner une sortie de ressources.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "80",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de engagements donnés par l'entité",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de engagements donnés par l'entité",
        journalExample: {
            description: "Écriture type pour le compte 801 - Engagements donnés par l'entité",
            rows: [
                ["801", "Engagements donnés par l'entité", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8011", "Avals, cautions et garanties donnés", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "801",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de avals, cautions et garanties donnés",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de avals, cautions et garanties donnés",
        journalExample: {
            description: "Écriture type pour le compte 8011 - Avals, cautions et garanties donnés",
            rows: [
                ["8011", "Avals, cautions et garanties donnés", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8014", "Effets circulant sous l'endos de l'entité", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "801",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de effets circulant sous l'endos de l'entité",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de effets circulant sous l'endos de l'entité",
        journalExample: {
            description: "Écriture type pour le compte 8014 - Effets circulant sous l'endos de l'entité",
            rows: [
                ["8014", "Effets circulant sous l'endos de l'entité", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8016", "Redevances crédit-bail restant à courir", {
        description: "Montant des redevances de crédit-bail restant à payer sur la durée résiduelle du contrat.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "801",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de redevances crédit-bail restant à courir",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de redevances crédit-bail restant à courir",
        journalExample: {
            description: "Écriture type pour le compte 8016 - Redevances crédit-bail restant à courir",
            rows: [
                ["8016", "Redevances crédit-bail restant à courir", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8017", "Dettes garanties par des sûretés réelles", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "801",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de dettes garanties par des sûretés réelles",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de dettes garanties par des sûretés réelles",
        journalExample: {
            description: "Écriture type pour le compte 8017 - Dettes garanties par des sûretés réelles",
            rows: [
                ["8017", "Dettes garanties par des sûretés réelles", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8018", "Autres engagements donnés", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "801",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de autres engagements donnés",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de autres engagements donnés",
        journalExample: {
            description: "Écriture type pour le compte 8018 - Autres engagements donnés",
            rows: [
                ["8018", "Autres engagements donnés", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("802", "Engagements reçus par l'entité", {
        description:
            "Engagements que des tiers ont accordés à l'entité : garanties reçues, avals et cautions dont l'entité bénéficie.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "80",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de engagements reçus par l'entité",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de engagements reçus par l'entité",
        journalExample: {
            description: "Écriture type pour le compte 802 - Engagements reçus par l'entité",
            rows: [
                ["802", "Engagements reçus par l'entité", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8021", "Avals, cautions et garanties reçus", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "802",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de avals, cautions et garanties reçus",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de avals, cautions et garanties reçus",
        journalExample: {
            description: "Écriture type pour le compte 8021 - Avals, cautions et garanties reçus",
            rows: [
                ["8021", "Avals, cautions et garanties reçus", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8024", "Créances escomptées non échues", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "802",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de créances escomptées non échues",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de créances escomptées non échues",
        journalExample: {
            description: "Écriture type pour le compte 8024 - Créances escomptées non échues",
            rows: [
                ["8024", "Créances escomptées non échues", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8026", "Engagements reçus pour utilisation en crédit-bail", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "802",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de engagements reçus pour utilisation en crédit-bail",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de engagements reçus pour utilisation en crédit-bail",
        journalExample: {
            description: "Écriture type pour le compte 8026 - Engagements reçus pour utilisation en crédit-bail",
            rows: [
                ["8026", "Engagements reçus pour utilisation en crédit-bail", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("8028", "Autres engagements reçus", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "802",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de autres engagements reçus",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de autres engagements reçus",
        journalExample: {
            description: "Écriture type pour le compte 8028 - Autres engagements reçus",
            rows: [
                ["8028", "Autres engagements reçus", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("803", "Engagements réciproques", {
        description:
            "Engagements mutuels liant l'entité et un tiers, tels que les commandes fermes passées ou reçues et les contrats à exécution successive.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "80",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de engagements réciproques",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de engagements réciproques",
        journalExample: {
            description: "Écriture type pour le compte 803 - Engagements réciproques",
            rows: [
                ["803", "Engagements réciproques", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("809", "Contrepartie des engagements", {
        description:
            "Compte de contrepartie technique utilisé pour équilibrer les écritures d'engagements hors bilan en partie double.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "80",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de contrepartie des engagements",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de contrepartie des engagements",
        journalExample: {
            description: "Écriture type pour le compte 809 - Contrepartie des engagements",
            rows: [
                ["809", "Contrepartie des engagements", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("86", "Emplois des contributions volontaires en nature", {
        description:
            "Comptes utilisés par les associations pour valoriser les contributions volontaires (bénévolat, dons en nature, mises à disposition gratuites) dans leurs comptes.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "8",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning:
            "Augmentation (si actif) ou diminution (si passif) de emplois des contributions volontaires en nature",
        creditMeaning:
            "Diminution (si actif) ou augmentation (si passif) de emplois des contributions volontaires en nature",
        journalExample: {
            description: "Écriture type pour le compte 86 - Emplois des contributions volontaires en nature",
            rows: [
                ["86", "Emplois des contributions volontaires en nature", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("860", "Secours en nature", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "86",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de secours en nature",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de secours en nature",
        journalExample: {
            description: "Écriture type pour le compte 860 - Secours en nature",
            rows: [
                ["860", "Secours en nature", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("861", "Mise à disposition gratuite de biens", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "86",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de mise à disposition gratuite de biens",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de mise à disposition gratuite de biens",
        journalExample: {
            description: "Écriture type pour le compte 861 - Mise à disposition gratuite de biens",
            rows: [
                ["861", "Mise à disposition gratuite de biens", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("862", "Prestations", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "86",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de prestations",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de prestations",
        journalExample: {
            description: "Écriture type pour le compte 862 - Prestations",
            rows: [
                ["862", "Prestations", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("864", "Personnel bénévole", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "86",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de personnel bénévole",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de personnel bénévole",
        journalExample: {
            description: "Écriture type pour le compte 864 - Personnel bénévole",
            rows: [
                ["864", "Personnel bénévole", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("87", "Contributions volontaires en nature", {
        description:
            "Contrepartie des emplois des contributions volontaires, enregistrant la source des contributions reçues par les associations.",
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "8",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de contributions volontaires en nature",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de contributions volontaires en nature",
        journalExample: {
            description: "Écriture type pour le compte 87 - Contributions volontaires en nature",
            rows: [
                ["87", "Contributions volontaires en nature", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("870", "Bénévolat", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "87",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de bénévolat",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de bénévolat",
        journalExample: {
            description: "Écriture type pour le compte 870 - Bénévolat",
            rows: [
                ["870", "Bénévolat", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("871", "Prestations en nature", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "87",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de prestations en nature",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de prestations en nature",
        journalExample: {
            description: "Écriture type pour le compte 871 - Prestations en nature",
            rows: [
                ["871", "Prestations en nature", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
    defineAccount("875", "Dons en nature", {
        classNumber: 8,
        className: "Comptes spéciaux",
        type: "bilan",
        side: "actif ou passif",
        isOptional: true,
        parent: "87",
        counterpart: { number: "8", label: "Comptes spéciaux (contrepartie)" },
        usageTips: [
            "Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.",
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        ],
        debitMeaning: "Augmentation (si actif) ou diminution (si passif) de dons en nature",
        creditMeaning: "Diminution (si actif) ou augmentation (si passif) de dons en nature",
        journalExample: {
            description: "Écriture type pour le compte 875 - Dons en nature",
            rows: [
                ["875", "Dons en nature", "X", ""],
                ["8", "Comptes spéciaux (contrepartie)", "", "X"],
            ],
        },
    }),
]

export const accountClasses = [
    { number: 1, label: "Comptes de capitaux", type: "Bilan (passif)" as const },
    { number: 2, label: "Comptes d'immobilisations", type: "Bilan (actif)" as const },
    { number: 3, label: "Comptes de stocks et en-cours", type: "Bilan (actif)" as const },
    { number: 4, label: "Comptes de tiers", type: "Bilan (actif ou passif)" as const },
    { number: 5, label: "Comptes financiers", type: "Bilan (actif)" as const },
    { number: 6, label: "Comptes de charges", type: "Résultat" as const },
    { number: 7, label: "Comptes de produits", type: "Résultat" as const },
    { number: 8, label: "Comptes spéciaux", type: "Hors bilan" as const },
]

export function getAccountBySlug(slug: string): AccountEntry | undefined {
    return accountEntries.find((a) => a.slug === slug)
}

export function getAccountsByClass(): Map<number, AccountEntry[]> {
    const grouped = new Map<number, AccountEntry[]>()
    for (const account of accountEntries) {
        const existing = grouped.get(account.classNumber)
        if (existing) {
            existing.push(account)
        } else {
            grouped.set(account.classNumber, [account])
        }
    }
    return grouped
}

export function searchAccounts(query: string): AccountEntry[] {
    if (!query.trim()) return accountEntries
    const normalized = query
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    return accountEntries.filter((a) => {
        const numberMatch = a.number.includes(normalized)
        const labelNormalized = a.label
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        const descNormalized = (a.description ?? "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        return numberMatch || labelNormalized.includes(normalized) || descNormalized.includes(normalized)
    })
}

export function getDirectChildren(parentNumber: string): AccountEntry[] {
    return accountEntries.filter((a) => a.parent === parentNumber)
}

export function getAccount(number: string): AccountEntry | undefined {
    return accountEntries.find((a) => a.number === number)
}
