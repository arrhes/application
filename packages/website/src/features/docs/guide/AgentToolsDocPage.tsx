import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocSection } from "../../../components/document/DocSection.js"

const apiKeyDocLink = "/documentation/guide/référence-api"
const paperasseRepo = "https://github.com/romainsimon/paperasse"

export function AgentToolsDocPage() {
    return (
        <>
            <DocHeader
                title="Outils et exemples de code"
                description="Exemples concrets en TypeScript et Python pour interagir avec l'API Arrhes depuis votre agent."
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Cette page fournit des exemples de code que votre agent IA peut utiliser pour interagir avec l'API
                    REST d'Arrhes. Les exemples sont donnés en TypeScript (compatible avec les agents basés sur Node.js)
                    et en Python.
                </DocParagraph>
                <DocParagraph>
                    Les skills Paperasse (<DocLink to={paperasseRepo}>github.com/romainsimon/paperasse</DocLink>)
                    peuvent être combinés avec ces exemples pour donner à votre agent une compréhension approfondie de
                    la comptabilité française tout en interagissant directement avec vos données Arrhes.
                </DocParagraph>
            </DocSection>

            <DocSection title="TypeScript avec fetch">
                <DocBlock
                    code={`// Contexte : votre agent utilise des outils (tool calling)
// pour interagir avec l'API Arrhes.

// Outil : lister les écritures d'un exercice
async function listEntries(
  apiKey: string,
  idOrganization: string,
  idYear: string
): Promise<Entry[]> {
  const response = await fetch(
    \`https://api.arrhes.com/v1/organizations/\${idOrganization}/years/\${idYear}/entries\`,
    {
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        "Content-Type": "application/json",
      },
    }
  )
  const data = await response.json()
  return data
}

// Outil : créer une écriture comptable
async function createEntry(
  apiKey: string,
  idOrganization: string,
  idYear: string,
  entry: {
    date: string
    idJournal: string
    label: string
    lines: Array<{
      idAccount: string
      debit?: string
      credit?: string
    }>
  }
): Promise<Entry> {
  const response = await fetch(
    \`https://api.arrhes.com/v1/organizations/\${idOrganization}/years/\${idYear}/entries\`,
    {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    }
  )
  return response.json()
}

// Outil : OCR d'un fichier
async function ocrFile(
  apiKey: string,
  idOrganization: string,
  idYear: string,
  idFile: string
): Promise<{ file: File }> {
  const response = await fetch(
    \`https://api.arrhes.com/v1/organizations/\${idOrganization}/years/\${idYear}/files/\${idFile}/ocr\`,
    {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idFile }),
    }
  )
  return response.json()
}`}
                />
            </DocSection>

            <DocSection title="Python avec httpx">
                <DocBlock
                    code={`# Contexte : votre agent utilise des appels API REST
# pour interagir avec les donnees Arrhes.

import httpx
from typing import Any

API_BASE = "https://api.arrhes.com"

class ArrhesClient:
    def __init__(self, api_key: str, org_id: str):
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        self.org_id = org_id

    def list_entries(self, year_id: str) -> list[dict[str, Any]]:
        """Lister les ecritures d'un exercice."""
        url = f"{API_BASE}/v1/organizations/{self.org_id}/years/{year_id}/entries"
        response = httpx.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def create_entry(
        self,
        year_id: str,
        date: str,
        journal_id: str,
        label: str,
        lines: list[dict[str, Any]],
    ) -> dict[str, Any]:
        """Creer une ecriture comptable en partie double."""
        url = f"{API_BASE}/v1/organizations/{self.org_id}/years/{year_id}/entries"
        payload = {
            "date": date,
            "idJournal": journal_id,
            "label": label,
            "lines": lines,
        }
        response = httpx.post(url, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.json()

    def get_balance(self, year_id: str) -> list[dict[str, Any]]:
        """Obtenir la balance des comptes."""
        url = f"{API_BASE}/v1/organizations/{self.org_id}/years/{year_id}/balance-sheets"
        response = httpx.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def upload_file(self, year_id: str, name: str, content: bytes, ocr: bool = False) -> dict[str, Any]:
        """Uploader un fichier avec option OCR."""
        # 1. Creer l'entree fichier
        from hashlib import sha256
        file_hash = sha256(content).hexdigest()
        create_resp = httpx.post(
            f"{API_BASE}/v1/organizations/{self.org_id}/years/{year_id}/files",
            headers=self.headers,
            json={"name": name, "reference": name, "hash": file_hash},
        )
        file_data = create_resp.json()

        # 2. Obtenir l'URL de telechargement
        upload_resp = httpx.post(
            f"{API_BASE}/v1/organizations/{self.org_id}/years/{year_id}/files/{file_data['id']}/upload-url",
            headers=self.headers,
            json={"idFile": file_data["id"], "type": "application/pdf", "size": len(content)},
        )
        upload_data = upload_resp.json()

        # 3. Uploader le fichier
        httpx.put(upload_data["url"], content=content)

        # 4. Finaliser avec OCR si demande
        finalize_resp = httpx.post(
            f"{API_BASE}/v1/organizations/{self.org_id}/years/{year_id}/files/{file_data['id']}/finalize",
            headers=self.headers,
            json={"idFile": file_data["id"], "ocr": ocr},
        )

        return finalize_resp.json()}`}
                />
            </DocSection>

            <DocSection title="Outils utiles pour l'agent">
                <DocParagraph>
                    Au-delà des appels API de base, votre agent peut utiliser des outils plus avancés pour analyser et
                    manipuler les données :
                </DocParagraph>

                <DocSection title="Tri et filtrage (process_array)">
                    <DocParagraph>
                        Après avoir récupéré une liste d'écritures ou de comptes, vous pouvez trier, filtrer et agréger
                        les résultats avec l'outil <DocCode>{"process_array"}</DocCode> :
                    </DocParagraph>
                    <DocList
                        items={[
                            "Trier les écritures par date ou par montant",
                            "Filtrer les comptes dont le solde dépasse un seuil",
                            "Additionner les montants d'un journal spécifique",
                            "Trouver les valeurs uniques dans une colonne",
                        ]}
                    />
                </DocSection>

                <DocSection title="Recherche documentaire">
                    <DocParagraph>
                        L'outil de recherche documentaire permet de trouver des informations dans la documentation
                        d'Arrhes, le glossaire comptable et le plan comptable général.
                    </DocParagraph>
                </DocSection>

                <DocSection title="OCR">
                    <DocParagraph>
                        L'OCR d'Arrhes extrait le texte de fichiers PDF ou d'images en utilisant vos propres
                        identifiants (BYOK). Les documents OCRisés sont stockés au format Markdown.
                    </DocParagraph>
                </DocSection>
            </DocSection>

            <DocSection title="Paperasse + Arrhes">
                <DocParagraph>
                    Pour une expérience complète, combinez les skills Paperasse avec l'API Arrhes :
                </DocParagraph>
                <DocList
                    items={[
                        "Paperasse fournit l'expertise comptable (PCG, TVA, IS, clôture)",
                        "L'API Arrhes permet d'exécuter les opérations directement sur vos données",
                        "Votre agent orchestre : Paperasse pour le savoir-faire, Arrhes pour le faire",
                    ]}
                />
                <DocParagraph>
                    Découvrez Paperasse sur <DocLink to={paperasseRepo}>github.com/romainsimon/paperasse</DocLink>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Référence API">
                <DocParagraph>
                    Consultez la <DocLink to={apiKeyDocLink}>référence API complète</DocLink> pour la liste exhaustive
                    des endpoints disponibles et leurs paramètres.
                </DocParagraph>
            </DocSection>
        </>
    )
}

function DocBlock({ code }: { code: string }) {
    return (
        <div>
            <DocCodeBlock>{code}</DocCodeBlock>
        </div>
    )
}
