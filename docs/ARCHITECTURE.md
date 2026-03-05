# Architecture

Ce document decrit l'architecture globale du projet Arrhes, un systeme de comptabilite en partie double pour associations et entreprises francaises.

## Table des matieres

- [Vue d'ensemble](#vue-densemble)
- [Architecture monorepo](#architecture-monorepo)
- [Packages](#packages)
- [Stack technique](#stack-technique)
- [Flux de donnees](#flux-de-données)
- [Authentification](#authentification)
- [Base de donnees](#base-de-données)

## Vue d'ensemble

Arrhes est construit sur une architecture monorepo moderne utilisant **pnpm workspaces**. Le projet est divise en plusieurs packages independants mais interconnectes, chacun ayant une responsabilite specifique.

```
┌─────────────────────────────────────────────────────────┐
│                      Utilisateurs                       │
└────────────────────────────┬────────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │ @arrhes/application  │  (Frontend React)
                  │    -website          │
                  │   Port: 5173        │
                  └──────────┬──────────┘
                             │
                             │ HTTP/REST
                             │
                  ┌──────────▼──────────┐
                  │    @arrhes/         │  (Backend Hono)
                  │   application-api   │
                  │   Port: 3000        │
                  └──────────┬──────────┘
                             │
                 ┌───────────┼───────────┐
                 │           │           │
            ┌────▼────┐  ┌───▼────┐  ┌───▼────┐
            │   DB    │  │   S3   │  │  SMTP  │
            │ (SQL)   │  │ (File) │  │ (Mail) │
            └─────────┘  └────────┘  └────────┘
```

## Architecture monorepo

Le projet utilise **pnpm workspaces** pour gerer plusieurs packages dans un seul repository. Cette approche offre plusieurs avantages :

- **Partage de code** : Les packages peuvent facilement partager du code via `@arrhes/application-metadata` et `@arrhes/ui`
- **Dependances optimisees** : pnpm deduplique les dependances communes
- **Developpement simplifie** : Build et developpement coordonnes entre packages
- **Versioning coherent** : Toutes les parties du projet evoluent ensemble

### Structure du workspace

```
arrhes/
├── packages/
│   ├── api/          # Backend API
│   ├── metadata/     # Schemas et types partages
│   ├── tools/        # Outils de migration DB
│   ├── ui/           # Composants UI partages
│   └── website/      # Interface utilisateur (dashboard + site vitrine + docs)
├── pnpm-workspace.yaml
└── package.json
```

## Packages

### @arrhes/application-api

**Role :** Backend REST API pour toutes les operations metier

**Technologies :**
- **Hono** : Framework web leger et performant
- **TypeScript** : Typage statique
- **Drizzle ORM** : ORM pour PostgreSQL
- **Valibot** : Validation des donnees
- **Nodemailer** : Envoi d'emails
- **AWS SDK** : Stockage de fichiers (S3-compatible)
- **Puppeteer** : Generation de PDF

**Structure :**
```
api/src/
├── api.ts              # Configuration de l'app Hono
├── server.ts           # Point d'entree du serveur
├── clients/            # Clients pour services externes
│   ├── sqlClient.ts
│   ├── emailClient.ts
│   └── storageClient.ts
├── factories/          # Factories Hono avec types
│   ├── apiFactory.ts
│   ├── authFactory.ts
│   └── publicFactory.ts
├── middlewares/        # Middlewares d'authentification
│   ├── authMiddleware.ts
│   ├── publicMiddleware.ts
│   └── userVerificationMiddleware.ts
├── routes/             # Routes de l'API
│   ├── routes.ts       # Enregistrement de toutes les routes
│   ├── auth/           # Routes authentifiees
│   │   ├── authRoute.ts
│   │   ├── organizations/  # Gestion organisations (annees, ecritures, rapports, etc.)
│   │   ├── settings/       # Parametres utilisateur
│   │   └── support/        # Support
│   └── public/         # Routes publiques
│       ├── publicRoute.ts
│       ├── signIn.ts
│       ├── signUp.ts
│       ├── signOut.ts
│       └── sendMagicLink.ts
├── validators/         # Validation des donnees entrantes
│   └── bodyValidator.ts
└── utilities/          # Utilitaires
    ├── email/          # Templates et envoi emails
    ├── sql/            # Helpers SQL (selectOne, selectMany, insertOne, insertMany, deleteOne, deleteMany, updateOne)
    ├── storage/        # Helpers S3 (signed URLs, get/put/delete)
    ├── cookies/        # Gestion cookies securises
    ├── workspace/      # Logique metier (generation donnees exercices)
    ├── getEnv.ts       # Validation des variables d'environnement (Valibot)
    ├── exception.ts    # Gestion des erreurs structurees
    ├── response.ts     # Helpers de reponse HTTP
    ├── validate.ts     # Validation des donnees entrantes
    └── ...             # Autres utilitaires
```

**Points d'entree :**
- `server.ts` : Lance le serveur HTTP
- `api.ts` : Configure l'application Hono avec middlewares et routes

**Responsabilites :**
- Gestion de l'authentification (magic links, sessions)
- CRUD pour toutes les entites (organisations, comptes, ecritures, etc.)
- Validation des ecritures comptables
- Generation des etats financiers
- Gestion des pieces justificatives (upload/download via S3)
- Envoi d'emails transactionnels

### @arrhes/application-website

**Role :** Interface utilisateur web complete incluant le dashboard, le site vitrine et la documentation

**Technologies :**
- **React 19** : Framework UI
- **TanStack Router** : Routing type-safe
- **TanStack Query** : Gestion d'etat serveur et cache
- **TanStack Table** : Tableaux de donnees performants
- **TanStack Virtual** : Virtualisation pour grandes listes
- **Radix UI** : Composants accessibles headless
- **Panda CSS** : Framework CSS utility-first
- **React Hook Form** : Gestion de formulaires
- **Valibot** : Validation cote client
- **cmdk** : Palette de commandes
- **Vite** : Build tool et dev server

**Structure :**
```
website/src/
├── root.tsx            # Point d'entree React
├── index.html          # HTML principal
├── assets/             # Ressources statiques
│   ├── css/
│   ├── images/
│   └── manifest/       # PWA manifest
├── components/         # Composants reutilisables
│   ├── document/       # Composants lies aux documents
│   ├── formats/        # Formatage de donnees
│   ├── forms/          # Formulaires
│   ├── inputs/         # Champs de saisie
│   ├── layouts/        # Layouts, data blocks, tables
│   └── overlays/       # Modals, drawers, dropdowns, tooltips
├── contexts/           # Contexts React
│   ├── data/           # Context de donnees globales (TanStack Query)
│   ├── router/         # Configuration du router
│   └── toasts/         # Notifications
├── features/           # Features par domaine metier
│   ├── dashboard/      # Dashboard (organisations, settings, support)
│   ├── docs/           # Documentation (comptabilite, dashboard, general)
│   ├── website/        # Site vitrine (home, pricing, etc.)
│   ├── signIn/         # Connexion
│   ├── signUp/         # Inscription
│   └── error/          # Page d'erreur
├── routes/             # Definition des routes
│   ├── platformRouter.tsx   # Creation du router TanStack
│   ├── platformTree.ts      # Arbre de routes complet
│   ├── rootLayoutRoute.tsx  # Layout racine
│   ├── catchRoute.tsx       # Route catch-all
│   └── root/                # Routes imbriquees
│       ├── dashboard/       # Routes du dashboard
│       ├── docs/            # Routes de la documentation
│       ├── website/         # Routes du site vitrine
│       ├── signIn/          # Route connexion
│       └── signUp/          # Route inscription
└── utilities/          # Utilitaires
    ├── postAPI.ts      # Client API
    ├── useHTTPData.ts  # Hook pour data fetching
    ├── cookies/        # Gestion cookies
    └── ...             # Autres utilitaires
```

**Responsabilites :**
- Interface utilisateur complete (dashboard)
- Site vitrine avec pages marketing
- Documentation integree (comptabilite, utilisation du dashboard)
- Formulaires de saisie avec validation
- Tableaux de donnees avec tri, filtrage, pagination
- Visualisation des etats financiers
- Gestion des documents et pieces justificatives
- Notifications et retours utilisateur

### @arrhes/application-metadata

**Role :** Package partage contenant tous les schemas, modeles et types utilises par l'API et le frontend

**Technologies :**
- **Drizzle ORM** : Definition des schemas de base de donnees
- **Valibot** : Schemas de validation
- **TypeScript** : Types partages
- **nanoid** : Generation d'identifiants uniques

**Structure :**
```
metadata/src/
├── models/             # Modeles Drizzle ORM
│   ├── _index.ts       # Barrel export
│   ├── account.ts
│   ├── file.ts
│   ├── balanceSheet.ts
│   ├── computation.ts
│   ├── computationIncomeStatement.ts
│   ├── document.ts
│   ├── incomeStatement.ts
│   ├── journal.ts
│   ├── organization.ts
│   ├── organizationUser.ts
│   ├── record.ts       # Ecritures comptables
│   ├── recordLabel.ts  # Labels d'ecritures
│   ├── recordRow.ts    # Lignes d'ecriture
│   ├── user.ts
│   ├── userSession.ts
│   └── year.ts
├── schemas/            # Schemas Valibot pour validation
│   └── [memes fichiers que models/]
├── routes/             # Definitions de routes typees
│   ├── auth/           # Routes authentifiees (organisations, settings, support)
│   └── public/         # Routes publiques (user: signIn, signUp, signOut, sendMagicLink)
├── components/         # Composants metier partages
│   ├── models/
│   ├── schemas/
│   └── values/         # Valeurs par defaut et constantes
└── utilities/          # Utilitaires
    ├── generate.ts
    ├── generateId.ts   # Generation d'IDs (nanoid, 16 chars, alphabet custom)
    └── routeDefinition.ts
```

**Exports (subpath) :**
```typescript
// Utilisable par l'API et le frontend
import { models } from '@arrhes/application-metadata/models'
import { schemas } from '@arrhes/application-metadata/schemas'
import { routes } from '@arrhes/application-metadata/routes'
import { generateId } from '@arrhes/application-metadata/utilities'
import { components } from '@arrhes/application-metadata/components'
```

**Responsabilites :**
- Definition unique des schemas de base de donnees
- Validation coherente des donnees entre frontend et backend
- Types TypeScript partages
- Generation d'IDs uniques (nanoid)
- Definitions de routes type-safe

### @arrhes/ui

**Role :** Composants UI partages et systeme de style

**Technologies :**
- **React** : Framework UI
- **Panda CSS** : Framework CSS utility-first
- **Tabler Icons** : Icones

**Structure :**
```
ui/src/
├── index.ts            # Barrel export
├── components/         # Composants reutilisables
│   ├── buttons/        # Boutons (button, buttonContent, linkContent)
│   └── layouts/        # Layouts (badge, circularLoader, logo, separator)
├── fonts/              # Polices (Monaspace Neon)
├── styles/             # CSS (fonts)
└── utilities/          # Utilitaires
    ├── cn.ts           # Utilitaire CSS (cx, css)
    └── sleep.ts
```

**Exports (subpath) :**
```typescript
import { Button } from '@arrhes/ui'
import { cn } from '@arrhes/ui/utilities/cn.js'
import { css } from '@arrhes/ui/styled-system/css'
```

**Responsabilites :**
- Composants UI reutilisables entre packages
- Systeme de theming et styles partages (Panda CSS)
- Polices et assets partages

### @arrhes/application-tools

**Role :** Outils de gestion de la base de donnees (migrations, seed, maintenance)

**Technologies :**
- **Drizzle Kit** : CLI pour migrations
- **tsx** : Execution TypeScript
- **Postgres** : Client PostgreSQL
- **@ngneat/falso** : Generation de donnees de test

**Scripts disponibles :**
```bash
# Generer les migrations depuis le schema
pnpm --filter tools run generate

# Pousser le schema directement vers la DB
pnpm --filter tools run push

# Introspecter le schema de la DB
pnpm --filter tools run pull

# Appliquer les migrations
pnpm --filter tools run migrate

# Seed avec donnees de demonstration
pnpm --filter tools run seed

# Vider la base de donnees
pnpm --filter tools run clear

# Reset complet (clear + push + seed)
pnpm --filter tools run reset

# Supprimer les migrations
pnpm --filter tools run drop
```

**Structure :**
```
tools/src/
├── env.ts              # Configuration environnement
├── dbClient.ts         # Client de base de donnees
├── schemas.ts          # Import des schemas metadata
├── drizzle.config.ts   # Configuration Drizzle Kit
├── migrate.ts          # Script de migration
├── clearDB.ts          # Script de nettoyage
└── seed/               # Scripts de seed
    ├── seed.ts         # Seed principal
    ├── migration.ts    # Migrations de donnees
    ├── recordRows.ts   # Lignes d'ecritures
    ├── records2022.ts  # Donnees exemple 2022
    └── records2023.ts  # Donnees exemple 2023
```

**Responsabilites :**
- Gestion du schema de base de donnees
- Migrations de structure et de donnees
- Generation de donnees de test
- Maintenance de la base de donnees

## Stack technique

### Backend (API)

| Composant | Technologie | Role |
|-----------|-------------|------|
| Runtime | Node.js 25+ | Environnement d'execution |
| Language | TypeScript 5.9 | Langage de programmation |
| Framework | Hono 4.10 | Framework web minimaliste |
| ORM | Drizzle 0.44 | Mapping objet-relationnel |
| Validation | Valibot 1.2 | Validation de schemas |
| Database | PostgreSQL | Base de donnees relationnelle |
| Storage | AWS S3 SDK | Stockage de fichiers |
| Email | Nodemailer 7.0 | Envoi d'emails |
| PDF | Puppeteer 24 | Generation de PDF |

### Frontend (Website / Dashboard)

| Composant | Technologie | Role |
|-----------|-------------|------|
| Framework | React 19.2 | UI framework |
| Routing | TanStack Router 1.139 | Routing type-safe |
| State | TanStack Query 5.90 | Server state management |
| Tables | TanStack Table 8.21 | Data tables |
| Virtual | TanStack Virtual 3.13 | Virtualisation listes |
| UI | Radix UI | Composants accessibles |
| Styling | Panda CSS | CSS utility-first |
| Forms | React Hook Form 7.66 | Gestion de formulaires |
| Validation | Valibot 1.2 | Validation client-side |
| Icons | Tabler Icons 3.35 | Icones |
| Build | Vite 7.2 | Build tool moderne |

### Tooling

| Outil | Version | Role |
|-------|---------|------|
| pnpm | Latest | Package manager |
| TypeScript | 5.9 | Compilateur TypeScript |
| Biome | 2.3 | Formatter et linter |
| Drizzle Kit | 0.31 | Migrations de base de donnees |
| tsx | 4.20 | Execution TypeScript |

## Flux de donnees

### Authentification par Magic Link

```
1. Utilisateur entre son email
   └─> POST /api/public/sendMagicLink
       └─> Generation token + envoi email
       
2. Utilisateur clique sur le lien
   └─> GET /api/public/signIn?token=xxx
       └─> Validation token
       └─> Creation session
       └─> Cookie securise (httpOnly, signed)
       └─> Redirection vers dashboard
       
3. Requetes authentifiees
   └─> Cookie envoye automatiquement
       └─> authMiddleware verifie session
       └─> Acces aux routes protegees
```

### CRUD standard

```
Website                        API                      Database
────────────────────────────────────────────────────────────
1. User action
   └─> postAPI()
       └─> POST /api/auth/...
           └─> authMiddleware
               └─> Validation donnees (Valibot)
                   └─> Drizzle ORM
                       └─> SQL Query
                           └─> PostgreSQL
                           
2. Response
   ┌─ JSON
   └─ TanStack Query cache
      └─ Invalidation automatique
         └─ Re-fetch et mise a jour UI
```

### Upload de fichiers

```
1. Selection fichier
   └─> Demande URL signee PUT
       └─> POST /api/auth/.../generatePutSignedUrl
           └─> S3 genere URL temporaire (expires 15min)
           
2. Upload direct vers S3
   └─> PUT https://s3.../file
       (pas de passage par l'API)
       
3. Sauvegarde reference
   └─> POST /api/auth/.../file
       └─> Stocke storageKey en DB
```

### Download de fichiers

```
1. Demande URL signee GET
   └─> POST /api/auth/.../generateGetSignedUrl
       └─> S3 genere URL temporaire (expires 1h)
       
2. Download direct depuis S3
   └─> GET https://s3.../file
       (pas de passage par l'API)
```

## Authentification

### Strategie

Arrhes utilise une **authentification par magic link** (lien temporaire envoye par email) combinee a des **sessions persistantes** cote serveur.

### Flow complet

1. **Inscription** (`/api/public/signUp`)
   - Validation email + alias
   - Hash du mot de passe (PBKDF2, 128000 iterations)
   - Creation user
   - Envoi email de verification

2. **Connexion** (`/api/public/sendMagicLink`)
   - Generation token de verification unique
   - Stockage temporaire en DB
   - Envoi email avec lien

3. **Validation** (`/api/public/signIn`)
   - Verification du token
   - Creation d'une session
   - Cookie signe et httpOnly
   - Redirection vers l'application

4. **Requetes authentifiees**
   - Cookie envoye automatiquement
   - `authMiddleware` verifie la session
   - Charge l'utilisateur en contexte
   - Verifie l'appartenance a l'organisation si necessaire

5. **Deconnexion** (`/api/public/signOut`)
   - Suppression de la session en DB
   - Suppression du cookie

### Securite

- **Cookies signes** : Verification de l'integrite avec `COOKIES_KEY`
- **httpOnly** : Protection contre XSS
- **sameSite** : Protection contre CSRF
- **CORS configure** : Origine autorisee uniquement
- **Tokens temporaires** : Expiration des magic links
- **Hashing securise** : PBKDF2 avec salt unique par utilisateur

## Base de donnees

### Schema principal

Le schema PostgreSQL contient les tables suivantes (via Drizzle ORM) :

**Utilisateurs et organisations :**
- `user` : Utilisateurs de l'application
- `organization` : Organisations (entreprises/associations)
- `organizationUser` : Relation many-to-many avec roles
- `userSession` : Sessions actives

**Comptabilite :**
- `year` : Exercices comptables
- `account` : Plan comptable
- `journal` : Journaux comptables
- `record` : Ecritures comptables
- `recordRow` : Lignes d'ecriture (debit/credit)
- `recordLabel` : Labels d'ecritures
- `document` : Documents comptables
- `file` : Pieces justificatives

**Etats financiers :**
- `balanceSheet` : Configuration du bilan
- `incomeStatement` : Configuration du compte de resultat
- `computation` : Calculs personnalises
- `computationIncomeStatement` : Relation calculs/compte de resultat

### Relations cles

```
organization 1──n organizationUser n──1 user
     │
     ├── 1──n year
     ├── 1──n account
     ├── 1──n journal
     └── 1──n document
              │
              └── 1──n record
                       │
                       ├── 1──n recordRow
                       │            │
                       │            └── n──1 account
                       └── n──n recordLabel
```

### Migrations

Les migrations sont gerees par **Drizzle Kit** :
- Le schema source est defini dans `@arrhes/application-metadata`
- Drizzle Kit genere automatiquement les migrations SQL
- Application via `drizzle-kit migrate` ou `push` (dev)

## Diagramme de dependances

```
@arrhes/application-website ──depends on──> @arrhes/application-metadata
          │                                          ▲
          └─depends on──> @arrhes/ui                 │
                                                     │
@arrhes/application-api  ──depends on───────────────┘
                                                     ▲
                                                     │
@arrhes/application-tools ──depends on──────────────┘

@arrhes/ui  (independant de metadata)
```

Les packages API, website et tools dependent tous de `@arrhes/application-metadata` pour partager les schemas, modeles et types. Le package website depend aussi de `@arrhes/ui` pour les composants UI partages. Cette architecture assure une coherence totale entre le frontend et le backend.

---

Pour plus d'informations sur la configuration, consultez [CONFIGURATION.md](CONFIGURATION.md).
