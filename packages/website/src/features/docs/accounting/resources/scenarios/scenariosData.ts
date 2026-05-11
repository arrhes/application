import { type AccountEntry, getAccount } from "../accounts/accountsData.js"

export interface ScenarioExample {
    description: string
    entry: {
        rows: string[][]
    }
}

export interface ScenarioEntry {
    id: string
    path: string
    title: string
    description: string
    examples: ScenarioExample[]
    accountNumbers: string[]
}

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

function defineScenario(data: ScenarioEntry): ScenarioEntry {
    return data
}

export const scenarioEntries: ScenarioEntry[] = [
    defineScenario({
        id: "constitution-capital",
        path: "/documentation/comptabilité/scénarios/constitution-capital",
        title: "Constitution du capital social",
        description:
            "À la création d'une société (SARL, SAS, SA…), les associés ou actionnaires souscrivent le capital social. Pour une SARL et une SAS, le capital peut être libéré en deux temps : au moins 20 % à la constitution pour une SARL (50 % pour une SAS), le solde dans les cinq ans. Les fonds sont déposés sur un compte bancaire bloqué jusqu'à l'immatriculation, puis virés sur le compte courant de la société.",
        examples: [
            {
                description:
                    "Étape 1 — Souscription : les associés s'engagent à apporter 10 000 € (SARL, capital intégralement libéré dès la constitution)",
                entry: {
                    rows: [
                        [
                            "4561",
                            "Associés - Comptes d'apport en société",
                            "10 000,00",
                            "",
                        ],
                        [
                            "101",
                            "Capital",
                            "",
                            "10 000,00",
                        ],
                    ],
                },
            },
            {
                description: "Étape 2 — Libération : les fonds sont versés sur le compte bancaire de la société",
                entry: {
                    rows: [
                        [
                            "512",
                            "Banques",
                            "10 000,00",
                            "",
                        ],
                        [
                            "4561",
                            "Associés - Comptes d'apport en société",
                            "",
                            "10 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "4561",
            "101",
            "512",
        ],
    }),
    defineScenario({
        id: "augmentation-capital",
        path: "/documentation/comptabilité/scénarios/augmentation-capital",
        title: "Augmentation de capital",
        description:
            "Le capital social peut être augmenté soit par apport en numéraire (les actionnaires versent de l'argent frais), soit par incorporation de réserves (conversion de bénéfices mis en réserve en capital, sans flux de trésorerie). Dans le premier cas, une prime d'émission est souvent demandée pour compenser le droit d'entrée des nouveaux actionnaires. La décision relève d'une assemblée générale extraordinaire.",
        examples: [
            {
                description:
                    "Augmentation par apport en numéraire : 20 000 € de capital nouveau + 5 000 € de prime d'émission — les souscripteurs versent 25 000 € en banque",
                entry: {
                    rows: [
                        [
                            "512",
                            "Banques",
                            "25 000,00",
                            "",
                        ],
                        [
                            "101",
                            "Capital",
                            "",
                            "20 000,00",
                        ],
                        [
                            "1041",
                            "Primes d'émission",
                            "",
                            "5 000,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Augmentation par incorporation de réserves : 10 000 € de réserves légales transformées en capital (aucun flux de trésorerie)",
                entry: {
                    rows: [
                        [
                            "1061",
                            "Réserve légale",
                            "10 000,00",
                            "",
                        ],
                        [
                            "101",
                            "Capital",
                            "",
                            "10 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "512",
            "101",
            "1041",
            "1061",
        ],
    }),
    defineScenario({
        id: "achat-marchandises-fournisseur",
        path: "/documentation/comptabilité/scénarios/achat-marchandises-fournisseur",
        title: "Achat de marchandises à crédit",
        description:
            "L'achat de marchandises destinées à la revente est enregistré dès la réception de la facture (et non à la livraison ou au paiement). La TVA déductible sur les biens est récupérable immédiatement. Le compte 401 Fournisseurs enregistre la dette jusqu'au règlement ; le compte 607 Achats de marchandises est soldé en fin d'exercice lors du calcul de la variation de stock.",
        examples: [
            {
                description: "Facture d'achat de marchandises reçue : 1 000 € HT, TVA 20 % — règlement sous 30 jours",
                entry: {
                    rows: [
                        [
                            "607",
                            "Achats de marchandises",
                            "1 000,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA sur autres biens et services",
                            "200,00",
                            "",
                        ],
                        [
                            "401",
                            "Fournisseurs",
                            "",
                            "1 200,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Achat de marchandises payé comptant par virement : 500 € HT, TVA 20 % (pas de dette fournisseur)",
                entry: {
                    rows: [
                        [
                            "607",
                            "Achats de marchandises",
                            "500,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA sur autres biens et services",
                            "100,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "600,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "607",
            "44566",
            "401",
            "512",
        ],
    }),
    defineScenario({
        id: "reglement-fournisseur",
        path: "/documentation/comptabilité/scénarios/reglement-fournisseur",
        title: "Règlement d'un fournisseur",
        description:
            "Le paiement d'une facture fournisseur solde le compte 401 (ou 404 pour les immobilisations). Si le règlement intervient avant l'échéance, le fournisseur peut accorder un escompte de règlement (compte 765 Escomptes obtenus), qui représente un produit financier pour l'acheteur et réduit son décaissement effectif.",
        examples: [
            {
                description: "Règlement par virement bancaire de la facture fournisseur de 1 200 € à l'échéance",
                entry: {
                    rows: [
                        [
                            "401",
                            "Fournisseurs",
                            "1 200,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "1 200,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Règlement anticipé avec escompte de 2 % obtenu : facture 1 200 €, escompte 24 €, virement de 1 176 €",
                entry: {
                    rows: [
                        [
                            "401",
                            "Fournisseurs",
                            "1 200,00",
                            "",
                        ],
                        [
                            "765",
                            "Escomptes obtenus",
                            "",
                            "24,00",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "1 176,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "401",
            "512",
            "765",
        ],
    }),
    defineScenario({
        id: "vente-marchandises-client",
        path: "/documentation/comptabilité/scénarios/vente-marchandises-client",
        title: "Vente de marchandises à crédit",
        description:
            "Le chiffre d'affaires est enregistré à la date de transfert de propriété des biens (généralement la livraison), indépendamment de la date d'encaissement. La TVA collectée constitue une dette envers l'État. La créance sur le client (compte 411) est soldée lors de l'encaissement.",
        examples: [
            {
                description: "Facture de vente émise : 2 000 € HT, TVA 20 % — paiement attendu à 30 jours",
                entry: {
                    rows: [
                        [
                            "411",
                            "Clients",
                            "2 400,00",
                            "",
                        ],
                        [
                            "707",
                            "Ventes de marchandises",
                            "",
                            "2 000,00",
                        ],
                        [
                            "44571",
                            "TVA collectée",
                            "",
                            "400,00",
                        ],
                    ],
                },
            },
            {
                description: "Vente de marchandises au comptant : 800 € HT, TVA 20 % — encaissement immédiat en banque",
                entry: {
                    rows: [
                        [
                            "512",
                            "Banques",
                            "960,00",
                            "",
                        ],
                        [
                            "707",
                            "Ventes de marchandises",
                            "",
                            "800,00",
                        ],
                        [
                            "44571",
                            "TVA collectée",
                            "",
                            "160,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "411",
            "707",
            "44571",
            "512",
        ],
    }),
    defineScenario({
        id: "encaissement-client",
        path: "/documentation/comptabilité/scénarios/encaissement-client",
        title: "Encaissement d'un client",
        description:
            "Le règlement d'une créance client solde le compte 411 et crédite le compte bancaire. Si le client règle avant l'échéance et que l'entreprise lui a accordé un escompte de règlement, la différence est portée au débit du compte 665 Escomptes accordés, qui constitue une charge financière.",
        examples: [
            {
                description: "Virement reçu du client en règlement intégral de sa facture de 2 400 €",
                entry: {
                    rows: [
                        [
                            "512",
                            "Banques",
                            "2 400,00",
                            "",
                        ],
                        [
                            "411",
                            "Clients",
                            "",
                            "2 400,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "512",
            "411",
        ],
    }),
    defineScenario({
        id: "vente-prestation-services",
        path: "/documentation/comptabilité/scénarios/vente-prestation-services",
        title: "Vente d'une prestation de services",
        description:
            "Le produit d'une prestation de services est comptabilisé au compte 706 à la date d'achèvement ou, pour les prestations continues, de manière proratisée sur la durée. Si la facture est émise avant la réalisation complète, la partie non encore réalisée est inscrite en produit constaté d'avance (compte 487). La TVA sur services est déductible chez le client dès le paiement.",
        examples: [
            {
                description: "Facture de prestation de conseil émise : 5 000 € HT, TVA 20 % — client à 30 jours",
                entry: {
                    rows: [
                        [
                            "411",
                            "Clients",
                            "6 000,00",
                            "",
                        ],
                        [
                            "706",
                            "Prestations de services",
                            "",
                            "5 000,00",
                        ],
                        [
                            "44571",
                            "TVA collectée",
                            "",
                            "1 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "411",
            "706",
            "44571",
        ],
    }),
    defineScenario({
        id: "achat-immobilisation-corporelle",
        path: "/documentation/comptabilité/scénarios/achat-immobilisation-corporelle",
        title: "Acquisition d'une immobilisation corporelle",
        description:
            "Un bien est immobilisé (inscrit en classe 2) lorsqu'il est destiné à être utilisé durablement par l'entreprise (plus d'un exercice) et que son coût dépasse le seuil d'usage en vigueur (généralement 500 € HT). Le coût d'entrée comprend le prix d'achat, les droits de douane et les frais directement attribuables à l'acquisition. La TVA sur immobilisations (44562) est déductible dès la réception de la facture.",
        examples: [
            {
                description:
                    "Achat d'un ordinateur 800 € HT, TVA 20 % — facture du fournisseur d'immobilisations, règlement à 30 jours",
                entry: {
                    rows: [
                        [
                            "2183",
                            "Matériel de bureau et matériel informatique",
                            "800,00",
                            "",
                        ],
                        [
                            "44562",
                            "TVA sur immobilisations",
                            "160,00",
                            "",
                        ],
                        [
                            "404",
                            "Fournisseurs d'immobilisations",
                            "",
                            "960,00",
                        ],
                    ],
                },
            },
            {
                description: "Achat d'une machine industrielle 15 000 € HT, TVA 20 % — payée comptant par virement",
                entry: {
                    rows: [
                        [
                            "2154",
                            "Matériels industriels",
                            "15 000,00",
                            "",
                        ],
                        [
                            "44562",
                            "TVA sur immobilisations",
                            "3 000,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "18 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "2183",
            "44562",
            "404",
            "2154",
            "512",
        ],
    }),
    defineScenario({
        id: "dotation-amortissement",
        path: "/documentation/comptabilité/scénarios/dotation-amortissement",
        title: "Dotation aux amortissements",
        description:
            "L'amortissement répartit le coût d'une immobilisation sur sa durée d'utilisation (durée de vie économique). La méthode linéaire applique un taux constant chaque année ; la méthode dégressive fiscale applique un taux plus élevé les premières années (coefficient 1,25 à 2,25 selon la durée). Les dotations sont une charge non décaissable, enregistrée en fin d'exercice au débit du compte 6811.",
        examples: [
            {
                description:
                    "Dotation annuelle à l'amortissement linéaire d'un ordinateur (2183) de 800 € sur 3 ans : 800 / 3 = 266,67 €",
                entry: {
                    rows: [
                        [
                            "6811",
                            "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
                            "266,67",
                            "",
                        ],
                        [
                            "281",
                            "Amortissements des immobilisations corporelles",
                            "",
                            "266,67",
                        ],
                    ],
                },
            },
            {
                description:
                    "Dotation en 1ʳᵉ année à l'amortissement dégressif d'une machine (2154) de 15 000 € sur 5 ans (taux linéaire 20 % × coefficient 1,75 = 35 %) : 15 000 × 35 % = 5 250 €",
                entry: {
                    rows: [
                        [
                            "6811",
                            "Dotations aux amortissements sur immobilisations incorporelles et corporelles",
                            "5 250,00",
                            "",
                        ],
                        [
                            "281",
                            "Amortissements des immobilisations corporelles",
                            "",
                            "5 250,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "6811",
            "281",
        ],
    }),
    defineScenario({
        id: "paiement-salaires",
        path: "/documentation/comptabilité/scénarios/paiement-salaires",
        title: "Paiement des salaires",
        description:
            "La paie se comptabilise en deux étapes distinctes. Premièrement, la constatation de la charge : le salaire brut est débité au compte 641, tandis que les cotisations salariales (part prélevée sur le salaire brut) sont créditées sur les comptes de dette sociale (431, 437) et le net à payer au compte 421. Deuxièmement, le paiement effectif du net au salarié sur son compte bancaire.",
        examples: [
            {
                description:
                    "Constatation du bulletin de paie : salaire brut 3 000 €, cotisations salariales 600 € (SS) + 150 € (autres organismes), net à payer 2 250 €",
                entry: {
                    rows: [
                        [
                            "641",
                            "Rémunérations du personnel",
                            "3 000,00",
                            "",
                        ],
                        [
                            "421",
                            "Personnel - Rémunérations dues",
                            "",
                            "2 250,00",
                        ],
                        [
                            "431",
                            "Sécurité sociale",
                            "",
                            "600,00",
                        ],
                        [
                            "437",
                            "Autres organismes sociaux",
                            "",
                            "150,00",
                        ],
                    ],
                },
            },
            {
                description: "Paiement du salaire net de 2 250 € par virement bancaire le dernier jour du mois",
                entry: {
                    rows: [
                        [
                            "421",
                            "Personnel - Rémunérations dues",
                            "2 250,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "2 250,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "641",
            "421",
            "431",
            "437",
            "512",
        ],
    }),
    defineScenario({
        id: "charges-sociales-patronales",
        path: "/documentation/comptabilité/scénarios/charges-sociales-patronales",
        title: "Charges sociales patronales",
        description:
            "Les cotisations patronales s'ajoutent au salaire brut et constituent la part de l'employeur dans le financement de la protection sociale. Elles sont enregistrées au compte 645 lors de la constatation du bulletin de paie, et soldées lors du paiement à l'URSSAF (compte 431) et aux organismes de prévoyance/retraite complémentaire (compte 437). Le paiement intervient le mois suivant, généralement le 15.",
        examples: [
            {
                description:
                    "Constatation des cotisations patronales sur salaire brut de 3 000 € : SS 900 € + autres organismes 450 € (soit 45 % total)",
                entry: {
                    rows: [
                        [
                            "645",
                            "Cotisations de sécurité sociale et de prévoyance",
                            "1 350,00",
                            "",
                        ],
                        [
                            "431",
                            "Sécurité sociale",
                            "",
                            "900,00",
                        ],
                        [
                            "437",
                            "Autres organismes sociaux",
                            "",
                            "450,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Paiement des cotisations sociales le mois suivant : virement URSSAF 1 500 € (patronales 900 + salariales 600)",
                entry: {
                    rows: [
                        [
                            "431",
                            "Sécurité sociale",
                            "1 500,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "1 500,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "645",
            "431",
            "437",
            "512",
        ],
    }),
    defineScenario({
        id: "emprunt-bancaire",
        path: "/documentation/comptabilité/scénarios/emprunt-bancaire",
        title: "Contraction d'un emprunt bancaire",
        description:
            "Lorsqu'une entreprise contracte un emprunt auprès d'un établissement de crédit, les fonds reçus sont portés au crédit du compte 164 (ou 163 pour les emprunts obligataires). Le montant total de l'emprunt figure au passif du bilan. Des frais de dossier ou de garantie peuvent être engagés et sont comptabilisés en charges ou étalés selon leur nature. Les intérêts courus mais non échus en fin d'exercice sont provisionnés au compte 1688.",
        examples: [
            {
                description:
                    "Réception des fonds d'un emprunt bancaire de 50 000 € à 4 % sur 5 ans — virement sur le compte courant",
                entry: {
                    rows: [
                        [
                            "512",
                            "Banques",
                            "50 000,00",
                            "",
                        ],
                        [
                            "164",
                            "Emprunts auprès des établissements de crédit",
                            "",
                            "50 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "512",
            "164",
        ],
    }),
    defineScenario({
        id: "remboursement-echeance-emprunt",
        path: "/documentation/comptabilité/scénarios/remboursement-echeance-emprunt",
        title: "Remboursement d'une échéance d'emprunt",
        description:
            "Chaque mensualité comprend une part de remboursement du capital (débit compte 164, qui diminue la dette au bilan) et une part d'intérêts (débit compte 6611, charge financière déductible fiscalement). Un tableau d'amortissement du prêt détaille la décomposition de chaque échéance. Les intérêts payés diminuent le résultat imposable.",
        examples: [
            {
                description:
                    "Prélèvement mensuel de 1 000 € : 800 € en remboursement du capital et 200 € d'intérêts (taux 4 % sur capital restant dû)",
                entry: {
                    rows: [
                        [
                            "164",
                            "Emprunts auprès des établissements de crédit",
                            "800,00",
                            "",
                        ],
                        [
                            "6611",
                            "Intérêts des emprunts et dettes",
                            "200,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "1 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "164",
            "6611",
            "512",
        ],
    }),
    defineScenario({
        id: "tva-declaration-mensuelle",
        path: "/documentation/comptabilité/scénarios/tva-declaration-mensuelle",
        title: "Déclaration de TVA mensuelle",
        description:
            "Les entreprises soumises au régime réel normal déposent une déclaration CA3 chaque mois (généralement entre le 15 et le 25). La TVA à décaisser est égale à la TVA collectée (44571) diminuée de la TVA déductible (44566, 44562). Si la TVA déductible est supérieure, un crédit de TVA apparaît, report sur la déclaration suivante ou demande de remboursement.",
        examples: [
            {
                description:
                    "Liquidation mensuelle : TVA collectée 400 €, TVA déductible sur achats courants 200 € — solde à décaisser 200 €",
                entry: {
                    rows: [
                        [
                            "44571",
                            "TVA collectée",
                            "400,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA sur autres biens et services",
                            "",
                            "200,00",
                        ],
                        [
                            "44551",
                            "TVA à décaisser",
                            "",
                            "200,00",
                        ],
                    ],
                },
            },
            {
                description: "Paiement de la TVA à décaisser de 200 € au Trésor Public par prélèvement bancaire",
                entry: {
                    rows: [
                        [
                            "44551",
                            "TVA à décaisser",
                            "200,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "200,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "44571",
            "44566",
            "44551",
            "512",
        ],
    }),
    defineScenario({
        id: "paiement-loyer",
        path: "/documentation/comptabilité/scénarios/paiement-loyer",
        title: "Paiement d'un loyer",
        description:
            "Le loyer professionnel est comptabilisé au compte 613 Locations, charge déductible du résultat. Pour les locaux commerciaux, le bailleur peut opter pour l'assujettissement à la TVA (option de l'article 260-2° du CGI) : le loyer est alors facturé HT + TVA 20 %, récupérable par le locataire assujetti. Par défaut, les loyers d'habitation sont exonérés de TVA.",
        examples: [
            {
                description: "Loyer mensuel de locaux professionnels hors TVA : 1 500 € payés par virement",
                entry: {
                    rows: [
                        [
                            "613",
                            "Locations",
                            "1 500,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "1 500,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Loyer mensuel de locaux commerciaux avec option TVA : 1 500 € HT + TVA 20 % = 1 800 € TTC payés à réception de la quittance",
                entry: {
                    rows: [
                        [
                            "613",
                            "Locations",
                            "1 500,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA sur autres biens et services",
                            "300,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "1 800,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "613",
            "512",
            "44566",
        ],
    }),
    defineScenario({
        id: "provision-risques-charges",
        path: "/documentation/comptabilité/scénarios/provision-risques-charges",
        title: "Dotation aux provisions pour risques et charges",
        description:
            "Une provision est constituée lorsqu'il existe, à la clôture de l'exercice, une obligation probable envers un tiers, résultant d'un événement passé, dont le montant peut être estimé de manière fiable (principe de prudence, article L. 123-20 du Code de commerce). Si le risque ne se matérialise pas, la provision doit être reprise au crédit du compte 7815. Une provision non reprise à tort constitue une réserve occulte.",
        examples: [
            {
                description:
                    "Constitution d'une provision pour litige commercial en cours d'instance : risque estimé à 5 000 € par le conseil juridique",
                entry: {
                    rows: [
                        [
                            "6815",
                            "Dotations aux provisions d'exploitation",
                            "5 000,00",
                            "",
                        ],
                        [
                            "151",
                            "Provisions pour risques",
                            "",
                            "5 000,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Reprise de la provision l'exercice suivant : le litige est clôturé sans condamnation — la provision devient sans objet",
                entry: {
                    rows: [
                        [
                            "151",
                            "Provisions pour risques",
                            "5 000,00",
                            "",
                        ],
                        [
                            "7815",
                            "Reprises sur provisions d'exploitation",
                            "",
                            "5 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "6815",
            "151",
            "7815",
        ],
    }),
    defineScenario({
        id: "affectation-resultat-benefice",
        path: "/documentation/comptabilité/scénarios/affectation-resultat-benefice",
        title: "Affectation du résultat : bénéfice",
        description:
            "L'assemblée générale ordinaire annuelle décide de l'affectation du bénéfice de l'exercice (compte 120). La loi impose de doter la réserve légale de 5 % du bénéfice annuel jusqu'à ce qu'elle atteigne 10 % du capital social (SARL, SAS, SA). Le solde peut être distribué en dividendes (compte 457), reporté à nouveau (compte 110) ou affecté en réserves facultatives (compte 106).",
        examples: [
            {
                description:
                    "Affectation du bénéfice de 20 000 € : 5 % en réserve légale (1 000 €), 19 000 € en dividendes à distribuer",
                entry: {
                    rows: [
                        [
                            "120",
                            "Résultat de l'exercice - bénéfice",
                            "20 000,00",
                            "",
                        ],
                        [
                            "1061",
                            "Réserve légale",
                            "",
                            "1 000,00",
                        ],
                        [
                            "457",
                            "Associés - Dividendes à payer",
                            "",
                            "19 000,00",
                        ],
                    ],
                },
            },
            {
                description: "Paiement des dividendes de 19 000 € aux associés par virement bancaire",
                entry: {
                    rows: [
                        [
                            "457",
                            "Associés - Dividendes à payer",
                            "19 000,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "19 000,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "120",
            "1061",
            "457",
            "512",
        ],
    }),
    defineScenario({
        id: "cession-immobilisation",
        path: "/documentation/comptabilité/scénarios/cession-immobilisation",
        title: "Cession d'une immobilisation",
        description:
            "La sortie d'une immobilisation du bilan lors de sa vente génère deux opérations distinctes : l'enregistrement du produit de cession (compte 775 ou 77) et la sortie nette de l'actif (solde du compte d'immobilisation par son amortissement cumulé et la valeur nette comptable résiduelle en charge au compte 675 ou 67). La plus ou moins-value comptable est la différence entre le prix de cession et la valeur nette comptable.",
        examples: [
            {
                description:
                    "Encaissement du prix de cession de l'ordinateur (800 € d'origine, revendu 400 €) par virement bancaire",
                entry: {
                    rows: [
                        [
                            "512",
                            "Banques",
                            "400,00",
                            "",
                        ],
                        [
                            "77",
                            "Produits exceptionnels",
                            "",
                            "400,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Sortie de l'actif : valeur d'origine 800 €, amortissements cumulés 533 €, valeur nette comptable résiduelle de 267 € portée en charges",
                entry: {
                    rows: [
                        [
                            "281",
                            "Amortissements des immobilisations corporelles",
                            "533,00",
                            "",
                        ],
                        [
                            "67",
                            "Charges exceptionnelles",
                            "267,00",
                            "",
                        ],
                        [
                            "2183",
                            "Matériel de bureau et matériel informatique",
                            "",
                            "800,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "512",
            "77",
            "281",
            "67",
            "2183",
        ],
    }),
    defineScenario({
        id: "note-de-frais",
        path: "/documentation/comptabilité/scénarios/note-de-frais",
        title: "Remboursement de note de frais",
        description:
            "Les frais professionnels avancés par un salarié (transport, repas, hébergement) sont remboursés sur présentation de justificatifs. Ils sont comptabilisés dans les comptes de charges correspondants (625, 6251, 6256…) avec la TVA récupérable le cas échéant. La dette envers le salarié transite par le compte 421 jusqu'au virement de remboursement. Les remboursements au réel sont exonérés de cotisations sociales si les justificatifs sont produits.",
        examples: [
            {
                description:
                    "Enregistrement de la note de frais : déplacements professionnels 150 € (billets de train, justificatifs fournis)",
                entry: {
                    rows: [
                        [
                            "625",
                            "Déplacements, missions et réceptions",
                            "150,00",
                            "",
                        ],
                        [
                            "421",
                            "Personnel - Rémunérations dues",
                            "",
                            "150,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Remboursement de la note de frais au salarié : virement de 150 € sur son compte personnel",
                entry: {
                    rows: [
                        [
                            "421",
                            "Personnel - Rémunérations dues",
                            "150,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "150,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "625",
            "421",
            "512",
        ],
    }),
    defineScenario({
        id: "achat-fournitures-consommables",
        path: "/documentation/comptabilité/scénarios/achat-fournitures-consommables",
        title: "Achat de fournitures et consommables",
        description:
            "Les achats non stockés (fournitures de bureau, cartouches, petits consommables) sont comptabilisés directement en charges au compte 606, sans passer par un compte de stock. Ce traitement simplifié est approprié pour les articles de faible valeur à rotation rapide. Si l'entreprise choisit de les passer en stock, elle utiliserait le compte 321 avec variation de stock en fin d'exercice.",
        examples: [
            {
                description: "Facture de fournitures de bureau : 200 € HT, TVA 20 % — règlement fournisseur à 30 jours",
                entry: {
                    rows: [
                        [
                            "606",
                            "Achats non stockés de matière et fournitures",
                            "200,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA sur autres biens et services",
                            "40,00",
                            "",
                        ],
                        [
                            "401",
                            "Fournisseurs",
                            "",
                            "240,00",
                        ],
                    ],
                },
            },
            {
                description:
                    "Achat de consommables informatiques 80 € HT, TVA 20 % — payés immédiatement par carte bancaire",
                entry: {
                    rows: [
                        [
                            "606",
                            "Achats non stockés de matière et fournitures",
                            "80,00",
                            "",
                        ],
                        [
                            "44566",
                            "TVA sur autres biens et services",
                            "16,00",
                            "",
                        ],
                        [
                            "512",
                            "Banques",
                            "",
                            "96,00",
                        ],
                    ],
                },
            },
        ],
        accountNumbers: [
            "606",
            "44566",
            "401",
            "512",
        ],
    }),
]

export function getScenarioById(id: string): ScenarioEntry | undefined {
    return scenarioEntries.find((entry) => entry.id === id)
}

export function getScenariosByAccountNumber(accountNumber: string): ScenarioEntry[] {
    return scenarioEntries.filter((entry) => entry.accountNumbers.includes(accountNumber))
}

export function getScenarioAccounts(entry: ScenarioEntry): AccountEntry[] {
    return entry.accountNumbers
        .map((number) => getAccount(number))
        .filter((account): account is AccountEntry => Boolean(account))
        .sort((a, b) => a.number.localeCompare(b.number))
}

export function searchScenarios(query: string): ScenarioEntry[] {
    if (!query.trim()) return scenarioEntries

    const normalizedQuery = normalize(query)

    return scenarioEntries.filter((entry) => {
        const titleMatch = normalize(entry.title).includes(normalizedQuery)
        const descriptionMatch = normalize(entry.description).includes(normalizedQuery)
        const exampleDescriptionMatch = entry.examples.some((ex) => normalize(ex.description).includes(normalizedQuery))
        const accountNumberMatch = entry.accountNumbers.some((n) => n.includes(query))
        const accountLabelMatch = normalize(
            entry.accountNumbers.map((number) => getAccount(number)?.label ?? "").join(" "),
        ).includes(normalizedQuery)

        return titleMatch || descriptionMatch || exampleDescriptionMatch || accountNumberMatch || accountLabelMatch
    })
}
