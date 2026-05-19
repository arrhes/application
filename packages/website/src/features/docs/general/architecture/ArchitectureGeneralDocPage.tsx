import { css } from "@arrhes/ui/utilities/cn.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocTextSection } from "../../../../components/document/DocTextSection.js"
import { ArchitectureDiagram } from "./ArchitectureDiagram.js"

export function ArchitectureGeneralDocPage() {
    return (
        <DocRoot>
            {/* Page header */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                <h1
                    className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}
                >
                    Architecture
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Vue d'ensemble de l'architecture technique d'Arrhes et de ses différents services.
                </p>
            </div>

            {/* Infogram */}
            <ArchitectureDiagram />

            {/* Sections */}
            <DocTextSection title="Vue d'ensemble">
                <p>
                    Arrhes est organisé en plusieurs services distincts qui travaillent ensemble. Chaque service a
                    un rôle précis : certains sont destinés aux utilisateurs finaux, d'autres aux développeurs qui
                    souhaitent intégrer Arrhes dans leurs outils.
                </p>
                <p>
                    Tous les services passent par l'<strong>API</strong>, qui est le cœur du système. C'est elle
                    qui gère les données, les autorisations et la logique métier. Le reste — dashboard, CLI, agent IA
                    — n'est que la façon dont chacun choisit d'y accéder.
                </p>
            </DocTextSection>

            <DocTextSection title="Dashboard">
                <p>
                    Le dashboard est l'interface web d'Arrhes. Il permet de gérer ses organisations, saisir ses
                    écritures comptables, consulter ses documents de synthèse, stocker ses pièces justificatives et
                    discuter avec l'assistant IA.
                </p>
                <p>
                    <strong>Pour qui ?</strong> Les utilisateurs qui souhaitent gérer leur comptabilité au
                    quotidien depuis un navigateur, sans installation ni configuration.
                </p>
            </DocTextSection>

            <DocTextSection title="CLI">
                <p>
                    Le CLI est une interface en ligne de commande qui donne accès aux mêmes fonctionnalités que le
                    dashboard : organisations, exercices, écritures, exports et documents comptables. Il s'utilise
                    directement depuis un terminal, sur Linux ou macOS.
                </p>
                <p>
                    <strong>Pour qui ?</strong> Les développeurs et équipes techniques qui souhaitent automatiser
                    des tâches, intégrer Arrhes dans des scripts ou des pipelines CI/CD.
                </p>
            </DocTextSection>

            <DocTextSection title="API">
                <p>
                    L'API est le service central d'Arrhes. Elle reçoit toutes les requêtes — qu'elles viennent du
                    dashboard, du CLI ou d'une intégration tierce — et est responsable de l'authentification, des
                    données comptables, du stockage des fichiers et de l'assistant IA.
                </p>
                <p>
                    <strong>Pour qui ?</strong> Les développeurs qui souhaitent accéder directement aux données
                    d'Arrhes depuis leur propre application, via des clés API.
                </p>
            </DocTextSection>

            <DocTextSection title="Database">
                <p>
                    La base de données stocke l'ensemble des données d'Arrhes : utilisateurs, organisations,
                    exercices, écritures comptables, fichiers et sessions. Elle est le seul endroit où les données
                    sont persistées et n'est jamais accessible directement depuis l'extérieur — uniquement via l'API.
                </p>
                <p>
                    Le stockage des fichiers (pièces justificatives, documents exportés) est géré séparément, dans
                    un espace dédié compatible avec le protocole S3. Les emails transactionnels — comme les liens
                    de connexion — sont envoyés via un service SMTP.
                </p>
                <p>
                    <strong>Pour qui ?</strong> Ce service est entièrement géré par Arrhes. Les utilisateurs et
                    développeurs n'ont pas à interagir avec lui directement.
                </p>
            </DocTextSection>
        </DocRoot>
    )
}
