import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { ArchitectureDiagram } from "./ArchitectureDiagram.js"

export function ArchitectureGeneralDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Architecture"
                description="Vue d'ensemble de l'architecture technique de Comptasse et de ses différents services."
            />
            <ArchitectureDiagram />
            <DocSection title="Vue d'ensemble">
                <DocParagraph>
                    Comptasse est organisé en plusieurs services distincts qui travaillent ensemble. Chaque service a un
                    rôle précis : certains sont destinés aux utilisateurs finaux, d'autres aux développeurs qui
                    souhaitent intégrer Comptasse dans leurs outils.
                </DocParagraph>
                <DocParagraph>
                    Tous les services passent par l'API, qui est le cœur du système. C'est elle qui gère les données,
                    les autorisations et la logique métier. Le reste - dashboard, CLI - n'est que la façon dont chacun
                    choisit d'y accéder.
                </DocParagraph>
            </DocSection>
            <DocSection title="Dashboard">
                <DocParagraph>
                    Le dashboard est l'interface web de Comptasse. Il permet de gérer ses organisations, saisir ses
                    écritures comptables, consulter ses documents de synthèse, stocker ses pièces justificatives.
                </DocParagraph>
                <DocParagraph>
                    Pour qui ? Les utilisateurs qui souhaitent gérer leur comptabilité au quotidien depuis un
                    navigateur.
                </DocParagraph>
            </DocSection>
            <DocSection title="CLI">
                <DocParagraph>
                    Le CLI est une interface en ligne de commande qui donne accès aux mêmes fonctionnalités que le
                    dashboard : organisations, exercices, écritures, exports et documents comptables. Il s'utilise
                    directement depuis un terminal, sur Linux ou macOS.
                </DocParagraph>
                <DocParagraph>
                    Pour qui ? Les développeurs et équipes techniques qui souhaitent automatiser des tâches, intégrer
                    Comptasse à différentes interfaces dont les agents IA.
                </DocParagraph>
            </DocSection>
            <DocSection title="API">
                <DocParagraph>
                    L'API est le service central de Comptasse. Elle reçoit toutes les requêtes - qu'elles viennent du
                    dashboard, du CLI ou d'une intégration tierce - et est responsable de l'authentification, des
                    données comptables, du stockage des fichiers et de l'assistant IA.
                </DocParagraph>
                <DocParagraph>
                    Pour qui ? Les développeurs qui souhaitent accéder directement aux données de Comptasse depuis leur
                    propre application, via des clés API.
                </DocParagraph>
            </DocSection>
            <DocSection title="Database">
                <DocParagraph>
                    La base de données stocke l'ensemble des données de Comptasse : utilisateurs, organisations,
                    exercices, écritures comptables, fichiers et sessions. Elle est le seul endroit où les données sont
                    persistées et n'est jamais accessible directement depuis l'extérieur - uniquement via l'API.
                </DocParagraph>
                <DocParagraph>Pour ces données structurées, c'est Postgres qui a été mis en place.</DocParagraph>
                <DocParagraph>
                    Le stockage des fichiers (pièces justificatives, documents exportés) est géré dans un espace dédié,
                    compatible avec le protocole S3.
                </DocParagraph>
            </DocSection>
        </DocRoot>
    )
}
