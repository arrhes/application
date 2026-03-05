# Configuration

Ce document decrit toutes les variables d'environnement et les configurations necessaires pour faire fonctionner Arrhes en developpement local.

## Table des matieres

- [Vue d'ensemble](#vue-densemble)
- [Variables d'environnement - API](#variables-denvironnement---api)
- [Variables d'environnement - Tools](#variables-denvironnement---tools)
- [Configuration PostgreSQL](#configuration-postgresql)
- [Configuration S3 (Stockage)](#configuration-s3-stockage)
- [Configuration SMTP (Email)](#configuration-smtp-email)
- [Exemples de configuration](#exemples-de-configuration)
- [Securite](#sécurité)

## Vue d'ensemble

Arrhes necessite deux fichiers de configuration `.env` :

1. **`packages/api/.env`** : Configuration du backend API
2. **`packages/tools/.env`** : Configuration des outils de base de donnees

Ces fichiers ne sont **pas versionnes** (`.gitignore`) pour des raisons de securite.

### Approches de configuration

**Option 1 : Avec Docker Compose (Recommande)**

Le fichier `.workflows/.dev/compose.yml` lance automatiquement PostgreSQL, RustFS et Mailpit avec des valeurs par defaut pretes a l'emploi. Cette option simplifie la configuration.

**Option 2 : Installation native**

Vous installez et configurez manuellement chaque service sur votre machine.

Ce document couvre les deux approches.

## Variables d'environnement - API

Fichier : `packages/api/.env`

### Environnement general

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `ENV` | `"development"` \| `"production"` | Environnement d'execution | `development` |
| `VERBOSE` | `"true"` \| `"false"` | Mode verbeux (logs detailles) | `true` |
| `PORT` | `string` | Port d'ecoute du serveur | `3000` |

### CORS et Cookies

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `CORS_ORIGIN` | `string` | Origines autorisees (separees par virgule) | `http://localhost:5173` |
| `COOKIES_DOMAIN` | `string` | Domaine des cookies | `localhost` |
| `COOKIES_KEY` | `string` | Cle secrete pour signer les cookies (min 32 chars) | `your-super-secret-key-min-32-characters-long` |

### URLs des services

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `API_BASE_URL` | `string` | URL de base de l'API | `http://localhost:3000` |
| `APPLICATION_BASE_URL` | `string` | URL du frontend (dashboard) | `http://localhost:5173` |
| `WEBSITE_BASE_URL` | `string` | URL du site vitrine | `http://localhost:5173` |

### Base de donnees

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `SQL_DATABASE_URL` | `string` | URL de connexion PostgreSQL | `postgres://postgres:admin@localhost:5432/default` |

### Stockage S3

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `STORAGE_ENDPOINT` | `string` | Endpoint S3 (ou compatible) | `http://localhost:9000` (RustFS) |
| `STORAGE_BUCKET_NAME` | `string` | Nom du bucket S3 | `arrhes-files` |
| `STORAGE_ACCESS_KEY` | `string` | Cle d'acces S3 | `rustfsadmin` |
| `STORAGE_SECRET_KEY` | `string` | Cle secrete S3 | `rustfsadmin` |

### Email SMTP

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `EMAIL_ENDPOINT` | `string` | Serveur SMTP | `smtp.gmail.com` |
| `EMAIL_USER` | `string` | Utilisateur SMTP | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | `string` | Mot de passe ou app password SMTP | `your-app-password` |

## Variables d'environnement - Tools

Fichier : `packages/tools/.env`

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `DATABASE_URL` | `string` | URL de connexion PostgreSQL | `postgres://postgres:admin@localhost:5432/default` |

**Note :** Cette variable doit pointer vers la meme base de donnees que `SQL_DATABASE_URL` de l'API.

## Configuration PostgreSQL

### Option 1 : Avec Docker Compose (Recommande)

Aucune installation manuelle requise ! Le fichier `.workflows/.dev/compose.yml` configure automatiquement PostgreSQL.

**Lancer PostgreSQL :**
```bash
docker compose -f .workflows/.dev/compose.yml up -d postgres
```

**Configuration par defaut :**
- **Host** : `localhost`
- **Port** : `5432`
- **Database** : `default`
- **User** : `postgres`
- **Password** : `admin`
- **URL** : `postgres://postgres:admin@localhost:5432/default`

**Verification de la connexion :**
```bash
psql postgres://postgres:admin@localhost:5432/default
```

**Commandes utiles :**
```bash
# Voir les logs
docker compose -f .workflows/.dev/compose.yml logs postgres

# Redemarrer
docker compose -f .workflows/.dev/compose.yml restart postgres

# Arreter
docker compose -f .workflows/.dev/compose.yml stop postgres
```

### Option 2 : Installation native

**Ubuntu/Debian :**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS (Homebrew) :**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Windows :**
Telecharger l'installeur depuis [postgresql.org](https://www.postgresql.org/download/windows/)

**Creation de la base de donnees :**
```bash
# Se connecter a PostgreSQL
sudo -u postgres psql

# Creer un utilisateur
CREATE USER arrhes_user WITH PASSWORD 'your-secure-password';

# Creer la base de donnees
CREATE DATABASE arrhes OWNER arrhes_user;

# Donner tous les privileges
GRANT ALL PRIVILEGES ON DATABASE arrhes TO arrhes_user;

# Quitter
\q
```

**URL de connexion :**

Format : `postgres://[user]:[password]@[host]:[port]/[database]`

Exemple : `postgres://arrhes_user:your-secure-password@localhost:5432/arrhes`

**Verification de la connexion :**
```bash
psql postgres://arrhes_user:your-secure-password@localhost:5432/arrhes
```

## Configuration S3 (Stockage)

Le systeme de stockage utilise l'API AWS S3 mais fonctionne avec n'importe quel service compatible S3.

### Option 1 : Avec Docker Compose (Recommande)

Le fichier `.workflows/.dev/compose.yml` lance automatiquement RustFS.

**Lancer RustFS :**
```bash
docker compose -f .workflows/.dev/compose.yml up -d rustfs
```

**Configuration par defaut :**
- **Endpoint** : `http://localhost:9000`
- **Web Console** : http://localhost:9001
- **Access Key** : `rustfsadmin`
- **Secret Key** : `rustfsadmin`
- **Bucket** : `arrhes-files` (a creer)

**Variables d'environnement :**
```env
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_BUCKET_NAME=arrhes-files
STORAGE_ACCESS_KEY=rustfsadmin
STORAGE_SECRET_KEY=rustfsadmin
```

**Creation du bucket :**

Via l'interface web :
1. Acceder a http://localhost:9001
2. Se connecter avec `rustfsadmin` / `rustfsadmin`
3. Cliquer sur "Buckets" > "Create Bucket"
4. Nommer le bucket `arrhes-files`

**Commandes utiles :**
```bash
# Voir les logs
docker compose -f .workflows/.dev/compose.yml logs rustfs

# Redemarrer
docker compose -f .workflows/.dev/compose.yml restart rustfs
```

### Option 2 : RustFS standalone (sans Docker Compose)

**Installation avec Docker :**
```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name rustfs \
  -e "RUSTFS_ACCESS_KEY=rustfsadmin" \
  -e "RUSTFS_SECRET_KEY=rustfsadmin" \
  -e "RUSTFS_CONSOLE_ENABLE=true" \
  -e "RUSTFS_VOLUMES=/data" \
  -v ~/rustfs/data:/data \
  rustfs/rustfs:latest
```

Suivez ensuite les memes etapes de creation de bucket que ci-dessus.

### Option 3 : AWS S3 (Production)

**Configuration :**
```env
STORAGE_ENDPOINT=https://s3.eu-west-3.amazonaws.com
STORAGE_BUCKET_NAME=your-bucket-name
STORAGE_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
STORAGE_SECRET_KEY=YOUR_AWS_SECRET_KEY
```

**Prerequis :**
- Creer un bucket S3 dans votre region
- Creer un utilisateur IAM avec les permissions S3 appropriees
- Generer des cles d'acces pour cet utilisateur

### Option 4 : Autre service compatible S3

Cloudflare R2, DigitalOcean Spaces, Scaleway Object Storage, etc. sont egalement compatibles.

## Configuration SMTP (Email)

L'application envoie des emails pour :
- Magic links d'authentification
- Notifications importantes
- Invitations d'utilisateurs

### Option 1 : Avec Docker Compose (Recommande pour le developpement)

Le fichier `.workflows/.dev/compose.yml` lance automatiquement Mailpit, un serveur SMTP de test.

**Lancer Mailpit :**
```bash
docker compose -f .workflows/.dev/compose.yml up -d mailpit
```

**Configuration par defaut :**
- **SMTP** : `localhost:1025`
- **Interface web** : http://localhost:8025

**Variables d'environnement :**
```env
EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
```

**Interface web :**
Accedez a http://localhost:8025 pour voir tous les emails envoyes par l'application.

**Avantages :**
- Aucun email reel n'est envoye
- Visualisation de tous les emails
- Ideal pour le developpement et les tests

**Commandes utiles :**
```bash
# Voir les logs
docker compose -f .workflows/.dev/compose.yml logs mailpit

# Redemarrer
docker compose -f .workflows/.dev/compose.yml restart mailpit
```

### Option 2 : Mailpit standalone (sans Docker Compose)

```bash
docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit
```

Utilisez la meme configuration que ci-dessus.

### Option 3 : Gmail (Test avec vrais emails)

**Configuration :**
```env
EMAIL_ENDPOINT=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**Etapes :**
1. Activer l'authentification a deux facteurs sur votre compte Google
2. Generer un "mot de passe d'application" : https://myaccount.google.com/apppasswords
3. Utiliser ce mot de passe dans `EMAIL_PASSWORD`

### Option 4 : Services SMTP dedies (Production)

**Brevo (ex-Sendinblue) :**
```env
EMAIL_ENDPOINT=smtp-relay.brevo.com
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-smtp-key
```

**SendGrid :**
```env
EMAIL_ENDPOINT=smtp.sendgrid.net
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

**Mailgun :**
```env
EMAIL_ENDPOINT=smtp.mailgun.org
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASSWORD=your-smtp-password
```

## Exemples de configuration

### Configuration avec Docker Compose (Recommande)

Cette configuration utilise tous les services lances par `.workflows/.dev/compose.yml`.

**Etape 1 : Lancer les services**
```bash
docker compose -f .workflows/.dev/compose.yml up -d
```

**Etape 2 : `packages/api/.env`**
```env
# Environnement
ENV=development
VERBOSE=true
PORT=3000

# CORS et Cookies
CORS_ORIGIN=http://localhost:5173
COOKIES_DOMAIN=localhost
COOKIES_KEY=development-secret-key-change-in-production-min-32-chars

# URLs
API_BASE_URL=http://localhost:3000
APPLICATION_BASE_URL=http://localhost:5173
WEBSITE_BASE_URL=http://localhost:5173

# Base de donnees (Docker Compose)
SQL_DATABASE_URL=postgres://postgres:admin@localhost:5432/default

# Stockage RustFS (Docker Compose)
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_BUCKET_NAME=arrhes-files
STORAGE_ACCESS_KEY=rustfsadmin
STORAGE_SECRET_KEY=rustfsadmin

# Email Mailpit (Docker Compose)
EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
```

**`packages/tools/.env` :**
```env
DATABASE_URL=postgres://postgres:admin@localhost:5432/default
```

### Configuration avec services externes (Production)

**`packages/api/.env` :**
```env
# Environnement
ENV=production
VERBOSE=false
PORT=3000

# CORS et Cookies
CORS_ORIGIN=https://your-domain.com
COOKIES_DOMAIN=your-domain.com
COOKIES_KEY=generate-a-strong-random-key-here-minimum-32-characters

# URLs
API_BASE_URL=https://api.your-domain.com
APPLICATION_BASE_URL=https://app.your-domain.com
WEBSITE_BASE_URL=https://your-domain.com

# Base de donnees (PostgreSQL heberge)
SQL_DATABASE_URL=postgres://user:pass@db.provider.com:5432/arrhes?sslmode=require

# Stockage AWS S3
STORAGE_ENDPOINT=https://s3.eu-west-3.amazonaws.com
STORAGE_BUCKET_NAME=my-arrhes-bucket
STORAGE_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
STORAGE_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Email (service SMTP dedie)
EMAIL_ENDPOINT=smtp-relay.brevo.com
EMAIL_USER=myemail@example.com
EMAIL_PASSWORD=your-smtp-key
```

## Securite

### Bonnes pratiques

1. **Ne jamais commiter les fichiers `.env`**
   - Verifiez que `.env` est dans `.gitignore`
   - Utilisez des templates `.env.example` sans valeurs sensibles

2. **Generer des secrets forts**
   ```bash
   # Generer une cle aleatoire pour COOKIES_KEY
   openssl rand -base64 32
   ```

3. **Permissions de fichiers**
   ```bash
   # Restreindre l'acces aux fichiers .env
   chmod 600 packages/api/.env
   chmod 600 packages/tools/.env
   ```

4. **Variables separees par environnement**
   - Dev : `.env` (dans `packages/api/` et `packages/tools/`)
   - Production : variables d'environnement systeme ou secrets manager
   - Ne jamais melanger les credentials

5. **Rotation des secrets**
   - Changez regulierement `COOKIES_KEY`
   - Renouvelez les cles API et mots de passe
   - Revoquez les acces inutilises

### Verification de la configuration

Pour verifier que toutes les variables sont correctement definies, l'API affichera une erreur au demarrage si des variables sont manquantes ou invalides (validation via Valibot dans `getEnv.ts`).

### Valeurs recommandees

| Variable | Recommandation |
|----------|----------------|
| `COOKIES_KEY` | Minimum 32 caracteres aleatoires |
| `SQL_DATABASE_URL` | Connexion SSL en production (`?sslmode=require`) |
| `STORAGE_*` | Credentials avec permissions minimales (lecture/ecriture bucket uniquement) |
| `EMAIL_*` | Utiliser des app passwords, pas le mot de passe principal |

---

Pour poursuivre l'installation, consultez [DEVELOPMENT.md](DEVELOPMENT.md).
