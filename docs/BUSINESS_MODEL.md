# Business Model Strategy

This document outlines the business model strategy for Arrhes, an open-source double-entry accounting application for French associations and SMEs.

## Goals

- Maximum adoption among indie hackers, solofounders, and community growth
- Sustainable revenue from businesses (and accountants later)
- AI agent as core differentiator

## Model: Open-Core SaaS with Community Focus

### Tier Structure

| Tier | Price | Target | Features |
|------|-------|--------|----------|
| **Self-hosted** | Free forever | Developers, tech-savvy users | Full core app, deploy yourself |
| **Cloud Free** | 0 EUR/month | Micro-associations, testing | 1 org, 1 user, 100 ecritures/month, no agent |
| **Cloud Pro** | 9-15 EUR/month | Associations, solopreneurs | Unlimited ecritures, 3 users, basic agent features |
| **Cloud Business** | 29-49 EUR/month | SMEs, accountants | Unlimited users, full AI agent, priority support, API access |

### Free Features (Open-Source Core)

- Full double-entry accounting
- All journals, accounts, records
- Balance sheet & income statement
- Document/file management
- Multi-organization support
- Self-hosting with Docker

### Paid Features (Premium/Agent)

**AI Agent (core differentiator):**
- Auto-categorization of transactions
- Anomaly detection
- Natural language queries
- Automated reconciliation suggestions
- FEC generation assistance

**Cloud conveniences:**
- Automatic backups
- SSL/security managed
- No maintenance burden

**Business features:**
- Advanced exports (FEC, Excel, custom PDF reports)
- Bank synchronization (future)
- Multi-user with granular permissions
- API access for integrations

## Community Growth Strategy

1. **Make self-hosting simple**
   - One-click deploy buttons (Railway, Render, Coolify, Dokploy)
   - Docker Compose setup
   - Clear documentation

2. **Developer-first marketing**
   - Hacker News, Reddit (r/selfhosted, r/SideProject, r/France)
   - Indie Hackers community
   - Product Hunt launch
   - French tech communities

3. **Open development**
   - Public roadmap (GitHub Projects)
   - Transparent changelog
   - Accept contributions

4. **Content marketing**
   - Blog posts on French accounting
   - Self-hosting tutorials
   - Comparison guides

## Revenue Streams

| Stream | Priority | Notes |
|--------|----------|-------|
| Cloud subscriptions | Primary | Recurring, predictable |
| AI agent add-on | High | Differentiator, high perceived value |
| Annual plans | Medium | Cash flow + retention |
| Accountant partnerships | Later | Volume deals, requires sales effort |

**Initial target:** 100 paying customers at 15 EUR/mo avg = 1,500 EUR/mo MRR

## Competitive Positioning

| Competitor | Their Position | Arrhes Advantage |
|------------|----------------|------------------|
| Dolibarr | ERP, complex, old UI | Modern UX, accounting-focused |
| OpenConcerto | Desktop-first | Cloud-native, modern stack |
| Pennylane | VC-funded, expensive | Open-source, self-hostable, affordable |
| Tiime | Free but limited | More control, no lock-in |

**Positioning statement:** *"The open-source accounting tool for French associations and small businesses, with an AI assistant that actually understands your books."*

## Open Questions

- **Pricing model:** Per-organization vs per-user vs usage-based?
- **Agent positioning:** Separate add-on or bundled into higher tiers?
- **Free tier limits:** Balance between adoption and conversion
- **Launch timing:** Core product first, or wait for agent to differentiate?
