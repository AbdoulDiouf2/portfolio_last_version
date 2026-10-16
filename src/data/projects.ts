// Contenu des fiches projets (section 05 — Projets).
// Chaque fiche a été rédigée à partir du code source du dépôt correspondant :
// les chiffres sont comptés dans le code, pas estimés.

export interface Localized {
  fr: string;
  en: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  id: string;
  kind: 'mission' | 'academic';
  title: string;
  context: Localized;
  pitch: Localized;
  problem: Localized;
  features: { fr: string[]; en: string[] };
  architecture: Localized;
  stack: string[];
  metrics?: { value: string; label: Localized }[];
  dataAngle?: Localized;
  status: Localized;
  period?: string;
  links?: ProjectLink[];
}

export interface Mission extends CaseStudy {
  kind: 'mission';
  number: string;
}

export interface AcademicSummary {
  kind: 'academic';
  id: string;
  title: string;
  organization: string;
  date: string;
  stack: string[];
}

export type AcademicProject = AcademicSummary | (AcademicSummary & CaseStudy & { kind: 'academic' });

export const missions: Mission[] = [
  {
    kind: 'mission',
    number: '01',
    id: 'toppal',
    title: 'TOPPAL — Data Lineage & Data Catalog',
    context: { fr: 'Stage Data Engineer — Pôle Data, Orange / Sonatel (Dakar)', en: 'Data Engineer internship — Data Division, Orange / Sonatel (Dakar)' },
    pitch: {
      fr: 'Application qui reconstruit le lignage des tables du datalake dans un graphe Neo4j à partir des logs d’ingestion, et permet de l’interroger en langage naturel.',
      en: 'App that rebuilds data-lake table lineage into a Neo4j graph from ingestion logs, and lets users query it in natural language.',
    },
    problem: {
      fr: "Dans un datalake Hadoop de centaines de tables réparties sur plusieurs bases et zones, personne n'avait de vue d'ensemble sur « qui alimente quoi ». Mesurer l'impact d'un flux en échec, suivre les ingestions quotidiennes ou documenter la qualité des tables demandait de croiser fichiers Excel, logs et connaissance des équipes.",
      en: 'In a Hadoop data lake with hundreds of tables across several databases and zones, nobody had an overall view of “what feeds what”. Assessing the impact of a failed flow, tracking daily ingestions or documenting table quality meant cross-checking Excel files, logs and team knowledge.',
    },
    features: {
      fr: [
        'Synchronisation automatique du lignage depuis les logs d’ingestion Elasticsearch vers des relations (:Table)-[:ALIMENTE]->(:Table) dans Neo4j, avec prévisualisation avant écriture.',
        'Catalogue de tables : CRUD, import Excel/CSV validé ligne par ligne, typage source/cible recalculé depuis le graphe, 7 indicateurs de qualité par table.',
        'Graphe interactif (Vis.js) avec plusieurs layouts, vue centrée sur une table et mini-graphe de dépendances sur chaque fiche.',
        'Analyse de réseau (SNA) dans un Web Worker : centralités de degré, d’intermédiarité et de proximité, PageRank, communautés, hubs et ponts, simulation d’impact.',
        'Assistant RAG : embeddings stockés dans un index vectoriel Neo4j, récupération des tables proches enrichie de leur lignage amont/aval, réponse par Gemini ou un LLM local (Ollama).',
        'Suivi opérationnel : météo des flux et récapitulatif horaire des ingestions, configuration des flux Oozie avec alertes e-mail, tickets d’incident.',
      ],
      en: [
        'Automatic lineage sync from Elasticsearch ingestion logs into Neo4j (:Table)-[:FEEDS]->(:Table) relationships, with a preview before writing.',
        'Table catalog: CRUD, Excel/CSV import validated row by row, source/target typing recomputed from the graph, 7 quality indicators per table.',
        'Interactive graph (Vis.js) with several layouts, a table-focused view and a dependency mini-graph on every table page.',
        'Network analysis (SNA) in a Web Worker: degree, betweenness and closeness centrality, PageRank, communities, hubs and bridges, impact simulation.',
        'RAG assistant: embeddings stored in a Neo4j vector index, retrieval of the closest tables enriched with upstream/downstream lineage, answers from Gemini or a local LLM (Ollama).',
        'Operations monitoring: flow “weather” and hourly ingestion recap, Oozie flow configuration with e-mail alerts, incident tickets.',
      ],
    },
    architecture: {
      fr: "Front React + TypeScript (Vite, Ant Design, Recharts, Vis.js), avec les calculs SNA dans des Web Workers. Deux back-ends : une API Node/Express pour Neo4j, Elasticsearch et le RAG, et une API FastAPI pour PostgreSQL (authentification, configuration des flux, tickets). L'ensemble tourne sous Docker Compose, et une CI GitHub Actions publie les images à chaque push.",
      en: 'React + TypeScript frontend (Vite, Ant Design, Recharts, Vis.js), with SNA computations in Web Workers. Two back ends: a Node/Express API for Neo4j, Elasticsearch and RAG, and a FastAPI API for PostgreSQL (auth, flow configuration, tickets). Everything runs under Docker Compose, and a GitHub Actions CI publishes the images on every push.',
    },
    stack: ['Neo4j', 'Elasticsearch', 'Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'React', 'RAG (Gemini / Ollama)', 'Docker', 'Oozie / HDFS'],
    metrics: [
      { value: '935', label: { fr: 'tables cartographiées en production', en: 'tables mapped in production' } },
      { value: '781', label: { fr: 'relations de lignage', en: 'lineage relationships' } },
      { value: '69', label: { fr: 'endpoints sur 2 API', en: 'endpoints across 2 APIs' } },
      { value: '5', label: { fr: 'métriques SNA par table', en: 'SNA metrics per table' } },
    ],
    dataAngle: {
      fr: 'Le lignage n’est pas saisi à la main : il est reconstruit à partir des logs d’exécution des ingestions (parsing des chemins HDFS, MERGE idempotents dans Neo4j, chaque synchronisation tracée). Le graphe sert ensuite de socle à l’analyse d’impact et à un RAG ancré dans les métadonnées réelles.',
      en: 'Lineage is not entered by hand: it is rebuilt from ingestion run logs (HDFS path parsing, idempotent MERGEs into Neo4j, every sync tracked). The graph then underpins impact analysis and a RAG grounded in real metadata.',
    },
    status: { fr: 'Livré et utilisé en interne pendant le stage.', en: 'Delivered and used internally during the internship.' },
    period: 'Mai — Sept. 2025',
  },
  {
    kind: 'mission',
    number: '02',
    id: 'cockpit',
    title: 'Cockpit — BI Sage 100 pour DAF',
    context: { fr: 'Mission freelance — startup SaaS B2B', en: 'Freelance mission — B2B SaaS startup' },
    pitch: {
      fr: 'Les données comptables Sage 100 vont du serveur du client à des tableaux de bord KPI, sans port entrant ouvert et sans modifier l’ERP.',
      en: 'Sage 100 accounting data flows from the client’s on-prem server to KPI dashboards, with no inbound port and no change to the ERP.',
    },
    problem: {
      fr: "Les DAF de PME sous Sage 100 n'ont pas de vue consolidée sur leur chiffre d'affaires, leur trésorerie et leurs risques clients. Leurs données restent dans un SQL Server sur site, souvent derrière un pare-feu, et le schéma change selon la version de Sage.",
      en: 'CFOs of SMEs running Sage 100 lack a consolidated view of revenue, cash and customer risk. Their data sits in an on-prem SQL Server, often behind a firewall, and the schema changes with the Sage version.',
    },
    features: {
      fr: [
        'Agent on-premise Node.js en service Windows : synchronisation incrémentale des vues Sage vers l’API d’ingestion, curseur watermark et lots de 5 000 lignes.',
        'Vues BI en T-SQL (finance, grand livre, trésorerie, clients, stocks, immobilisations, paie…) déclinées par version de Sage, détectée automatiquement.',
        'Installeur Electron + React en 6 étapes (NSIS x64) : test SQL, détection de Sage, déploiement des vues, activation, installation du service.',
        'Sécurité de l’agent : jeton chiffré AES-256-GCM, mot de passe SQL dans le Windows Credential Manager, garde-fou SQL en lecture seule avec liste blanche de tables.',
        'Canal temps réel Socket.IO : requêtes SQL à la demande pour les questions en langage naturel, renouvellement de jeton, commandes distantes.',
        'Console d’administration React/TypeScript : organisations, RBAC, supervision des agents, KPI Store, NLQ Store, abonnements et logs d’audit.',
      ],
      en: [
        'On-prem Node.js agent running as a Windows service: incremental sync of Sage views to the ingest API, watermark cursor and 5,000-row batches.',
        'T-SQL BI views (finance, general ledger, cash, customers, stock, fixed assets, payroll…) with variants per Sage version, detected automatically.',
        '6-step Electron + React installer (NSIS x64): SQL test, Sage detection, view deployment, activation, service install.',
        'Agent security: AES-256-GCM encrypted token, SQL password in Windows Credential Manager, read-only SQL guard with a table whitelist.',
        'Real-time Socket.IO channel: on-demand SQL for natural-language questions, token renewal, remote commands.',
        'React/TypeScript admin console: organizations, RBAC, agent monitoring, KPI Store, NLQ Store, subscriptions and audit logs.',
      ],
    },
    architecture: {
      fr: "Un agent Node.js installé chez le client lit SQL Server / Sage 100 via des vues BI qu'il déploie lui-même, pousse les données en HTTPS sortant vers un backend NestJS et garde une connexion Socket.IO pour les requêtes à la demande. Le backend gère l'authentification, le RBAC multi-tenant, le catalogue de KPI et le moteur de questions en langage naturel, et sert deux fronts React : la console d'administration et l'application client des DAF.",
      en: 'A Node.js agent installed at the client site reads SQL Server / Sage 100 through BI views it deploys itself, pushes data over outbound HTTPS to a NestJS backend and keeps a Socket.IO connection for on-demand queries. The backend handles auth, multi-tenant RBAC, the KPI catalog and the natural-language query engine, and serves two React front ends: the admin console and the CFO client app.',
    },
    stack: ['Node.js', 'SQL Server / T-SQL', 'Sage 100', 'Electron', 'NestJS', 'Socket.IO', 'React', 'TypeScript'],
    metrics: [
      { value: '15', label: { fr: 'vues SQL BI', en: 'BI SQL views' } },
      { value: '126', label: { fr: 'KPI au catalogue', en: 'KPIs in the catalog' } },
      { value: '4', label: { fr: 'variantes de schéma Sage', en: 'Sage schema variants' } },
      { value: '~96', label: { fr: 'tests automatisés', en: 'automated tests' } },
    ],
    dataAngle: {
      fr: 'Pipeline ETL ERP → SaaS : vues T-SQL qui modélisent les tables brutes de Sage en jeux de données métier, extraction incrémentale par watermark (le curseur n’avance qu’après accusé de réception), normalisation des types et campagnes de certification qui comparent les sommes source par période.',
      en: 'ERP → SaaS ETL pipeline: T-SQL views modelling raw Sage tables into business datasets, watermark-based incremental extraction (the cursor only advances after server acknowledgement), type normalisation and certification campaigns comparing source totals per period.',
    },
    status: { fr: 'Mission en cours — développement actif.', en: 'Ongoing mission — under active development.' },
    period: '2026 →',
  },
  {
    kind: 'mission',
    number: '03',
    id: 'jamora',
    title: 'Jamora — Logiciel de gestion d’officine',
    context: { fr: 'Co-fondateur technique — startup Bastion-AZ (Sénégal)', en: 'Technical co-founder — Bastion-AZ startup (Senegal)' },
    pitch: {
      fr: 'SaaS de gestion d’officine : stock par lots, caisse, tiers-payant, commandes grossistes et finances, avec une base isolée par pharmacie.',
      en: 'Pharmacy management SaaS: batch-level stock, POS, insurance billing, wholesaler orders and finances, with one isolated database per pharmacy.',
    },
    problem: {
      fr: "Au Sénégal, les officines indépendantes travaillent avec des logiciels anciens installés sur un seul poste, ou sur papier : stock et péremptions mal suivis, crédits clients et créances des assurances difficiles à recouvrer, commandes passées à la main chez chaque grossiste. Jamora regroupe tout dans une application web, avec une isolation forte des données de santé et un mode qui continue de fonctionner quand la connexion coupe.",
      en: 'In Senegal, independent pharmacies run on legacy single-workstation software or on paper: stock and expiry dates are poorly tracked, customer credit and insurer receivables are hard to collect, and orders are placed by hand with each wholesaler. Jamora brings it all into one web app, with strong isolation of health data and a mode that keeps working when the connection drops.',
    },
    features: {
      fr: [
        'Architecture multi-tenant avec un schéma PostgreSQL par pharmacie (django-tenants), pharmacie identifiée par le sous-domaine et référentiel national de médicaments partagé.',
        'RBAC fin : 7 rôles et un moteur de permissions à 3 niveaux (exception utilisateur, droits du rôle, valeurs par défaut) sur une cinquantaine de pages et d’actions.',
        'Caisse avec scanner code-barres, vente à crédit, tiers-payant avec bordereaux et recouvrement, devis, avoirs ; mode hors ligne en PWA avec file d’opérations synchronisée au retour du réseau.',
        'Stock par lots avec dates de péremption, inventaires, alertes et relances via 14 tâches Celery planifiées, notifications WhatsApp.',
        'Commandes vers 4 grossistes sénégalais et pipeline de migration qui reprend l’historique de l’ancien logiciel des officines.',
        'Agent d’impression Windows en Go : factures A4 et tickets de caisse imprimés sans boîte de dialogue.',
      ],
      en: [
        'Multi-tenant architecture with one PostgreSQL schema per pharmacy (django-tenants), pharmacy identified by subdomain and a shared national drug catalogue.',
        'Fine-grained RBAC: 7 roles and a 3-level permission engine (user exception, role rights, defaults) over about fifty pages and actions.',
        'POS with barcode scanning, credit sales, insurance billing with claim batches and collections, quotes, credit notes; offline PWA mode with an operation queue synced when the network returns.',
        'Batch-level stock with expiry dates, inventories, alerts and reminders through 14 scheduled Celery tasks, WhatsApp notifications.',
        'Orders to 4 Senegalese wholesalers and a migration pipeline that brings over the history from the pharmacies’ legacy software.',
        'Windows print agent in Go: A4 invoices and POS receipts printed with no print dialog.',
      ],
    },
    architecture: {
      fr: "Monorepo : API Django 5 + DRF (22 apps métier) en multi-tenant schema-per-tenant sur PostgreSQL, workers Celery et Celery Beat sur Redis, et une SPA React 18 / TypeScript / Vite installable en PWA. En production, Docker Compose tourne sur un VPS derrière Nginx et Cloudflare, avec déploiement automatique par GitHub Actions et supervision Sentry, Prometheus et Grafana.",
      en: 'Monorepo: a Django 5 + DRF API (22 domain apps), multi-tenant with one schema per tenant on PostgreSQL, Celery workers and Celery Beat on Redis, and a React 18 / TypeScript / Vite SPA installable as a PWA. In production, Docker Compose runs on a VPS behind Nginx and Cloudflare, with automatic deployment via GitHub Actions and monitoring with Sentry, Prometheus and Grafana.',
    },
    stack: ['Python', 'Django', 'django-tenants', 'PostgreSQL', 'Celery', 'Redis', 'React', 'TypeScript', 'Docker', 'Go'],
    metrics: [
      { value: '22', label: { fr: 'apps Django métier', en: 'Django domain apps' } },
      { value: '~4 200', label: { fr: 'tests pytest', en: 'pytest tests' } },
      { value: '83', label: { fr: 'pages React', en: 'React pages' } },
      { value: '14', label: { fr: 'tâches planifiées', en: 'scheduled jobs' } },
    ],
    dataAngle: {
      fr: 'Pipeline de migration (API + Celery, idempotent, avec réconciliation des ventes et des lots) qui reprend l’historique de l’ancien logiciel dans chaque schéma de pharmacie, sur un modèle de données isolé par tenant avec un référentiel partagé.',
      en: 'Migration pipeline (API + Celery, idempotent, with sales and batch reconciliation) that loads the legacy software’s history into each pharmacy schema, on a per-tenant data model with a shared reference catalogue.',
    },
    status: { fr: 'En production chez des pharmacies pilotes — développement actif.', en: 'Live with pilot pharmacies — under active development.' },
    period: '2026 →',
    links: [{ label: 'jamora.sn', href: 'https://www.jamora.sn' }],
  },
  {
    kind: 'mission',
    number: '04',
    id: 'jobtracker',
    title: 'JobTracker',
    context: { fr: 'Projet personnel — SaaS en production', en: 'Personal project — SaaS in production' },
    pitch: {
      fr: "SaaS de suivi de recherche d'emploi où des agents IA (ChatGPT, Claude) alimentent une boîte d'opportunités via un serveur MCP sécurisé par OAuth 2.1.",
      en: 'Job-search tracking SaaS where AI agents (ChatGPT, Claude) feed an opportunity inbox through an OAuth 2.1-secured MCP server.',
    },
    problem: {
      fr: "Une recherche d'emploi éparpille candidatures, entretiens et offres entre tableurs, e-mails et job boards. JobTracker centralise ce suivi et automatise la veille : des agents IA externes cherchent les offres selon les critères de l'utilisateur, JobTracker les valide, les déduplique et les enregistre.",
      en: 'A job search scatters applications, interviews and offers across spreadsheets, emails and job boards. JobTracker centralises this tracking and automates job watching: external AI agents search for offers based on the user’s criteria, and JobTracker validates, deduplicates and stores them.',
    },
    features: {
      fr: [
        'Serveur MCP (SDK officiel, transport HTTP streamable) exposant 16 outils : veille, CRUD candidatures et entretiens, diagnostic.',
        "Serveur d'autorisation OAuth 2.1 maison : PKCE, clients confidentiels et publics, Client ID Metadata Documents, jetons opaques hachés, interrupteur d'urgence.",
        "Pipeline d'ingestion idempotent des offres envoyées par les agents : validation, normalisation des URL, déduplication, quotas par exécution et par jour.",
        'Application React 19 : tableau de bord, statistiques, boîte d’opportunités avec filtres et facettes calculés côté serveur, interface FR/EN.',
        'Conseiller IA multi-fournisseurs (Gemini, OpenAI, Groq) pour l’analyse de CV et d’offres, avec clés personnelles chiffrées.',
        'Extension Chrome « JobTracker Clipper » (Manifest V3) publiée sur le Chrome Web Store : capture d’offres par extraction IA ou JSON-LD.',
      ],
      en: [
        'MCP server (official SDK, streamable HTTP transport) exposing 16 tools: job watching, CRUD on applications and interviews, diagnostics.',
        'In-house OAuth 2.1 authorization server: PKCE, confidential and public clients, Client ID Metadata Documents, hashed opaque tokens, kill switch.',
        'Idempotent ingestion pipeline for agent-submitted offers: validation, URL normalisation, deduplication, per-run and daily quotas.',
        'React 19 app: dashboard, statistics, opportunity inbox with server-side filters and facets, FR/EN interface.',
        'Multi-provider AI advisor (Gemini, OpenAI, Groq) for CV and job-offer analysis, with encrypted personal keys.',
        '“JobTracker Clipper” Chrome extension (Manifest V3) published on the Chrome Web Store: captures offers via AI extraction or JSON-LD.',
      ],
    },
    architecture: {
      fr: "Un frontend React 19 (Tailwind, shadcn/ui, TanStack Query) et une API FastAPI asynchrone (Pydantic v2, Motor) s'appuient sur MongoDB Atlas. Les agents externes s'authentifient en OAuth 2.1 puis appellent /api/mcp, une application ASGI montée dans FastAPI. Déploiement Docker Compose auto-hébergé derrière Caddy, livré par GitHub Actions.",
      en: 'A React 19 frontend (Tailwind, shadcn/ui, TanStack Query) and an async FastAPI API (Pydantic v2, Motor) run on MongoDB Atlas. External agents authenticate with OAuth 2.1, then call /api/mcp, an ASGI app mounted in FastAPI. Self-hosted Docker Compose deployment behind Caddy, shipped by GitHub Actions.',
    },
    stack: ['Python', 'FastAPI', 'MongoDB', 'React 19', 'MCP', 'OAuth 2.1', 'Gemini / OpenAI / Groq', 'Docker', 'GitHub Actions'],
    metrics: [
      { value: '16', label: { fr: 'outils MCP', en: 'MCP tools' } },
      { value: '195', label: { fr: 'endpoints REST', en: 'REST endpoints' } },
      { value: '~600', label: { fr: 'tests pytest', en: 'pytest tests' } },
      { value: '28', label: { fr: 'pages (dont 5 admin)', en: 'pages (5 admin)' } },
    ],
    dataAngle: {
      fr: "Pipeline d'ingestion idempotent : validation de schéma Pydantic, normalisation des URL (suppression des paramètres de tracking), déduplication, run_id déterministe et historique d'exécutions rejouable, sur une modélisation MongoDB indexée.",
      en: 'Idempotent ingestion pipeline: Pydantic schema validation, URL normalisation (tracking-parameter removal), deduplication, deterministic run_id and a replayable run history, on an indexed MongoDB model.',
    },
    status: { fr: 'En production — développement actif.', en: 'In production — under active development.' },
    period: '2026',
    links: [
      { label: 'jobtracker.maadec.com', href: 'https://jobtracker.maadec.com' },
      { label: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/jobtracker-clipper/ephlbjlapgadbjjpongcmniokflciidl' },
      { label: 'GitHub', href: 'https://github.com/AbdoulDiouf2/jobtracker' },
    ],
  },
  {
    kind: 'mission',
    number: '05',
    id: 'jangat',
    title: 'Jàngat — Analyse des Q&R de la DG',
    context: { fr: 'Stage Data Engineer — Sonatel, co-développé en binôme', en: 'Data Engineer internship — Sonatel, co-built in a pair' },
    pitch: {
      fr: 'Tableau de bord qui importe les questions des collaborateurs à la Direction Générale et les enrichit par LLM : catégorie, mots-clés et sentiment.',
      en: 'Dashboard that ingests employee questions to top management and enriches them with an LLM: category, keywords and sentiment.',
    },
    problem: {
      fr: 'Lors des rencontres avec la Direction Générale, les collaborateurs posent des centaines de questions. Les trier à la main par thème et mesurer le ressenti général prend beaucoup de temps ; Jàngat automatise ce tri et rend les tendances visibles.',
      en: 'During town-hall meetings with top management, employees submit hundreds of questions. Sorting them by theme and gauging overall sentiment by hand is slow; Jàngat automates the sorting and makes trends visible.',
    },
    features: {
      fr: [
        'Pipeline d’enrichissement LLM en 2 passes : déduction d’une taxonomie par lots de 100 questions, puis classification de chaque question (catégorie, 3 à 5 mots-clés, sentiment).',
        'Fournisseur LLM interchangeable : Ollama en local, Groq (Llama 3.3 70B), OpenAI ou Gemini, avec repli en cas d’erreur.',
        'Import CSV par glisser-déposer avec détection automatique des colonnes, et mode d’import direct sans IA.',
        'API Express + SQLite : insertion en lot transactionnelle, recherche plein texte, statistiques par catégorie et par sentiment.',
        'Reporting : graphiques par catégorie et engagement, chronologie, nuage de mots, page dédiée à l’analyse de sentiment, export CSV filtré.',
      ],
      en: [
        'Two-pass LLM enrichment pipeline: taxonomy inferred from batches of 100 questions, then each question classified (category, 3-5 keywords, sentiment).',
        'Swappable LLM provider: local Ollama, Groq (Llama 3.3 70B), OpenAI or Gemini, with fallback on error.',
        'Drag-and-drop CSV import with automatic column detection, plus a direct import mode that skips the AI step.',
        'Express + SQLite API: transactional bulk insert, full-text search, per-category and per-sentiment statistics.',
        'Reporting: charts by category and engagement, timeline, word cloud, dedicated sentiment page, filtered CSV export.',
      ],
    },
    architecture: {
      fr: 'SPA React + TypeScript (Vite, Tailwind, 7 pages) qui appelle une API Express adossée à SQLite. L’enrichissement LLM envoie chaque question au fournisseur choisi, puis les résultats sont chargés en lot dans la base pour les agrégations du reporting.',
      en: 'React + TypeScript SPA (Vite, Tailwind, 7 pages) calling an Express API backed by SQLite. LLM enrichment sends each question to the chosen provider, then results are bulk-loaded into the database for reporting aggregations.',
    },
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'SQLite', 'Groq / Llama', 'Ollama', 'Recharts / D3'],
    metrics: [
      { value: '4', label: { fr: 'fournisseurs LLM', en: 'LLM providers' } },
      { value: '267', label: { fr: 'questions traitées par session', en: 'questions processed per session' } },
      { value: '11', label: { fr: 'endpoints REST', en: 'REST endpoints' } },
      { value: '7', label: { fr: 'pages', en: 'pages' } },
    ],
    dataAngle: {
      fr: 'Pipeline ingestion CSV → enrichissement LLM par lots (taxonomie, classification, extraction de mots-clés, sentiment) → chargement transactionnel → agrégations SQL, avec un moteur LLM interchangeable entre modèles locaux et API cloud.',
      en: 'CSV ingestion → batched LLM enrichment (taxonomy, classification, keyword extraction, sentiment) → transactional load → SQL aggregations, with an LLM engine swappable between local models and cloud APIs.',
    },
    status: { fr: 'Prototype interne livré pendant le stage.', en: 'Internal prototype delivered during the internship.' },
    period: 'Juil. — Août 2025',
  },
  {
    kind: 'mission',
    number: '06',
    id: 'maad-sphere',
    title: 'MAAD Sphere',
    context: { fr: 'Projet fondateur — SaaS de gestion d’activité (MAADEC)', en: 'Founder project — business-management SaaS (MAADEC)' },
    pitch: {
      fr: 'SaaS multi-tenant qui regroupe CRM, projets, devis, factures, paiements, contrats signés en ligne et portail client.',
      en: 'Multi-tenant SaaS bringing together CRM, projects, quotes, invoices, payments, e-signed contracts and a client portal.',
    },
    problem: {
      fr: "Un consultant freelance jongle entre un tableur clients, un logiciel de facturation, des contrats PDF envoyés par e-mail et des relances manuelles. MAAD Sphere couvre tout le cycle, du lead au paiement encaissé, et offre au client final un portail pour suivre ses projets, documents et paiements.",
      en: 'A freelance consultant juggles a client spreadsheet, invoicing software, contract PDFs sent by email and manual reminders. MAAD Sphere covers the whole cycle, from lead to collected payment, and gives end clients a portal to follow their projects, documents and payments.',
    },
    features: {
      fr: [
        'Cycle commercial complet : leads, clients, projets, tâches avec suivi du temps, devis (dont génération assistée par IA), contrats, avenants et factures PDF.',
        'Paiement en ligne via Stripe et PayDunya (mobile money, Afrique de l’Ouest), avec webhooks de rapprochement.',
        'Signature électronique des contrats via une instance Documenso auto-hébergée.',
        'Portail client sécurisé (19 pages) : projets, documents, avenants, paiements et messagerie.',
        'Tâches planifiées : relances de factures en retard, abonnements, sauvegardes, plus un bot Telegram de reporting.',
        'Pilotage : tableau de bord financier, bilan, analytics et questions en langage naturel sur les données.',
      ],
      en: [
        'Full sales cycle: leads, clients, projects, tasks with time tracking, quotes (including AI-assisted generation), contracts, amendments and PDF invoices.',
        'Online payment via Stripe and PayDunya (mobile money, West Africa), with reconciliation webhooks.',
        'Contract e-signature through a self-hosted Documenso instance.',
        'Secure client portal (19 pages): projects, documents, amendments, payments and messaging.',
        'Scheduled jobs: overdue-invoice reminders, subscriptions, backups, plus a Telegram reporting bot.',
        'Business steering: financial dashboard, balance sheet, analytics and natural-language questions over the data.',
      ],
    },
    architecture: {
      fr: "Monorepo avec une API Fastify 5 en TypeScript (Prisma, Zod, JWT + refresh token, Argon2) et un front React 19 / Vite / shadcn/ui. L'isolation multi-tenant repose sur une clé tenantId portée par 27 modèles et contrôlée par un middleware. Production en Docker Compose sur VPS derrière Caddy, PostgreSQL sur Neon, fichiers sur Cloudflare R2.",
      en: 'Monorepo with a Fastify 5 TypeScript API (Prisma, Zod, JWT + refresh token, Argon2) and a React 19 / Vite / shadcn/ui frontend. Multi-tenant isolation relies on a tenantId key carried by 27 models and enforced by a middleware. Production runs in Docker Compose on a VPS behind Caddy, with PostgreSQL on Neon and files on Cloudflare R2.',
    },
    stack: ['TypeScript', 'React 19', 'Fastify', 'Prisma', 'PostgreSQL', 'Stripe', 'Documenso', 'Docker', 'Cloudflare R2'],
    metrics: [
      { value: '42', label: { fr: 'modèles Prisma', en: 'Prisma models' } },
      { value: '~157', label: { fr: 'endpoints HTTP', en: 'HTTP endpoints' } },
      { value: '75', label: { fr: 'pages React', en: 'React pages' } },
      { value: '175+', label: { fr: 'versions publiées', en: 'releases shipped' } },
    ],
    dataAngle: {
      fr: 'Modélisation relationnelle de 42 entités (CRM, facturation, finances, portail) avec isolation multi-tenant, ERD et DBML générés depuis Prisma ; évolutions du schéma de production encadrées par un diff en lecture seule et une branche de sauvegarde Neon.',
      en: 'Relational model of 42 entities (CRM, billing, finance, portal) with multi-tenant isolation, ERD and DBML generated from Prisma; production schema changes gated by a read-only diff and a Neon backup branch.',
    },
    status: { fr: 'En production — utilisé pour l’activité MAADEC.', en: 'In production — used to run MAADEC.' },
    period: '2025 →',
    links: [{ label: 'sphere.maadec.com', href: 'https://sphere.maadec.com' }],
  },
  {
    kind: 'mission',
    number: '07',
    id: 'touba-aviation',
    title: 'Touba Aviation & Tours',
    context: { fr: 'Mission freelance — agence de voyages (Sénégal)', en: 'Freelance mission — travel agency (Senegal)' },
    pitch: {
      fr: "Plateforme sur mesure où les clients de l'agence demandent un service, paient en ligne (carte ou mobile money) et suivent leur dossier, avec un back-office complet.",
      en: 'Custom platform where agency customers request a service, pay online (card or mobile money) and track their file, backed by a full back-office.',
    },
    problem: {
      fr: "L'agence propose une dizaine de services (vols, hôtels, visas et études, transfert d'argent, immobilier…) et recevait ses demandes par des canaux dispersés, sans suivi ni paiement en ligne. Ses clients, au Sénégal comme dans la diaspora, devaient pouvoir payer par carte ou par mobile money, et l'équipe avait besoin d'un outil unique pour traiter et analyser les demandes.",
      en: 'The agency offers about ten services (flights, hotels, visas and studies, money transfer, real estate…) and received requests through scattered channels, with no tracking or online payment. Its customers, in Senegal and in the diaspora, needed to pay by card or mobile money, and staff needed a single tool to process and analyse requests.',
    },
    features: {
      fr: [
        '9 parcours de demande typés (vol, hôtel, voyage organisé, location, transfert, excursion, études/visa, transfert d’argent, immobilier), chacun avec référence et page de suivi.',
        'Double paiement Stripe (carte) et PayDunya (mobile money) : checkout, webhooks, vérification et historique des transactions.',
        'Expiration automatique des demandes via des fonctions PL/pgSQL (date de voyage extraite d’un JSONB) et une tâche planifiée quotidienne.',
        'Module de réclamations : tickets, messagerie client/admin en temps réel (Supabase Realtime), pièces jointes par URL signées.',
        'Back-office React/shadcn : tableau de bord, CRM clients, rapports PDF/Excel, analytics GA4, rôles admin/conseiller/lecteur.',
        'Déploiement continu par GitHub Actions vers l’hébergement de production.',
      ],
      en: [
        '9 typed request flows (flight, hotel, organised trip, car rental, transfer, excursion, studies/visa, money transfer, real estate), each with a reference and a tracking page.',
        'Dual payments, Stripe (card) and PayDunya (mobile money): checkout, webhooks, verification and transaction history.',
        'Automatic request expiry through PL/pgSQL functions (travel date parsed from JSONB) and a daily scheduled job.',
        'Complaints module: tickets, real-time customer/admin messaging (Supabase Realtime), attachments via signed URLs.',
        'React/shadcn back-office: dashboard, customer CRM, PDF/Excel reports, GA4 analytics, admin/advisor/viewer roles.',
        'Continuous deployment with GitHub Actions to production hosting.',
      ],
    },
    architecture: {
      fr: "Deux SPA React/TypeScript (site client et back-office) s'appuient sur Supabase (PostgreSQL avec RLS, Auth, Storage, Realtime). Les opérations sensibles (paiements, webhooks, e-mails, réclamations, tâche d'expiration) passent par des Netlify Functions, et une API Express gère l'administration des utilisateurs et les rapports Google Analytics 4.",
      en: 'Two React/TypeScript SPAs (public site and back-office) run on Supabase (PostgreSQL with RLS, Auth, Storage, Realtime). Sensitive operations (payments, webhooks, email, complaints, expiry job) run as Netlify Functions, and an Express API handles user administration and Google Analytics 4 reporting.',
    },
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Netlify Functions', 'Stripe', 'PayDunya', 'Express', 'GA4 API'],
    metrics: [
      { value: '9', label: { fr: 'parcours de demande', en: 'request flows' } },
      { value: '14', label: { fr: 'fonctions serverless', en: 'serverless functions' } },
      { value: '10', label: { fr: 'fonctions PL/pgSQL', en: 'PL/pgSQL functions' } },
      { value: '16', label: { fr: 'modules back-office', en: 'back-office modules' } },
    ],
    dataAngle: {
      fr: 'Modélisation PostgreSQL avec RLS, logique métier poussée dans la base (PL/pgSQL sur du JSONB), job batch quotidien et reporting (métriques GA4 extraites par API, exports PDF/Excel).',
      en: 'PostgreSQL modelling with RLS, business logic pushed into the database (PL/pgSQL over JSONB), a daily batch job and reporting (GA4 metrics pulled via API, PDF/Excel exports).',
    },
    status: { fr: 'En production.', en: 'In production.' },
    period: '2025 – 2026',
  },
  {
    kind: 'mission',
    number: '08',
    id: 'cps-connect',
    title: 'CPS Connect',
    context: { fr: 'Projet associatif — réseau CPS Dakar × ESIGELEC', en: 'Community project — CPS Dakar × ESIGELEC network' },
    pitch: {
      fr: "Plateforme qui guide les étudiants des Classes Préparatoires Scientifiques de Dakar jusqu'à l'ESIGELEC et fait vivre leur réseau alumni.",
      en: 'Platform guiding Dakar Scientific Preparatory Classes students to ESIGELEC and powering their alumni network.',
    },
    problem: {
      fr: "Entre l'admission et l'arrivée à Rouen (visa, logement, démarches), l'information circulait par le bouche-à-oreille et des groupes de messagerie. Il n'existait aucun espace central pour suivre son avancement ni pour relier les nouvelles promotions aux anciens.",
      en: 'Between admission and arrival in Rouen (visa, housing, paperwork), information travelled by word of mouth and messaging groups. There was no central place to track progress or to connect new cohorts with alumni.',
    },
    features: {
      fr: [
        'Parcours guidé en 3 phases (post-CPS, démarches, pré-arrivée) avec checklists interactives, sauvegarde automatique et suivi de progression.',
        'Annuaire alumni avec workflow de validation, recherche, filtres et statistiques exportables (CSV, XLSX, JSON, PDF).',
        'Contrôle d’accès par permissions : 7 rôles et surcharges par utilisateur.',
        'Forum, FAQ modérée, webinaires mis à jour par une Cloud Function planifiée, chat avec l’admin et notifications push.',
        'Migration du stockage de Dropbox vers Cloudflare R2, servi par un Worker qui vérifie le jeton Firebase avant chaque écriture.',
      ],
      en: [
        '3-phase guided journey (post-CPS, paperwork, pre-arrival) with interactive checklists, auto-save and progress tracking.',
        'Alumni directory with a validation workflow, search, filters and exportable statistics (CSV, XLSX, JSON, PDF).',
        'Permission-based access control: 7 roles plus per-user overrides.',
        'Forum, moderated FAQ, webinars updated by a scheduled Cloud Function, admin chat and push notifications.',
        'Storage migrated from Dropbox to Cloudflare R2, served by a Worker that checks the Firebase token before every write.',
      ],
    },
    architecture: {
      fr: "SPA React 18 + TypeScript (Vite, Tailwind, Ant Design) sur Firebase : Auth, Firestore, Cloud Messaging et Cloud Functions v2 (planification, suppression de compte, intégrations externes). Les fichiers sont dans Cloudflare R2, exposé par un Worker authentifié ; le front est publié sur GitHub Pages.",
      en: 'React 18 + TypeScript SPA (Vite, Tailwind, Ant Design) on Firebase: Auth, Firestore, Cloud Messaging and Cloud Functions v2 (scheduling, account deletion, external integrations). Files live in Cloudflare R2, exposed through an authenticated Worker; the frontend is published on GitHub Pages.',
    },
    stack: ['React', 'TypeScript', 'Firebase', 'Cloud Functions', 'Cloudflare Workers', 'Cloudflare R2', 'Tailwind CSS'],
    metrics: [
      { value: '82', label: { fr: 'routes', en: 'routes' } },
      { value: '64', label: { fr: 'pages', en: 'pages' } },
      { value: '7', label: { fr: 'rôles', en: 'roles' } },
      { value: '5', label: { fr: 'Cloud Functions', en: 'Cloud Functions' } },
    ],
    dataAngle: {
      fr: 'Migration scriptée du stockage de Dropbox vers Cloudflare R2, import d’alumni en masse et exports statistiques multi-formats.',
      en: 'Scripted storage migration from Dropbox to Cloudflare R2, bulk alumni import and multi-format statistics exports.',
    },
    status: { fr: 'En production — maintenu bénévolement.', en: 'In production — maintained on a volunteer basis.' },
    period: '2025 →',
    links: [
      { label: 'Application', href: 'https://abdouldiouf2.github.io/Esig-prep-guide/' },
      { label: 'GitHub', href: 'https://github.com/AbdoulDiouf2/esig-prep-guide' },
    ],
  },
];

export const hasDetails = (p: Mission | AcademicProject): p is Mission | (AcademicSummary & CaseStudy & { kind: 'academic' }) =>
  'features' in p && p.features.fr.length > 0;

export const academicProjects: AcademicProject[] = [
  {
    kind: 'academic',
    id: 'mikana',
    title: "Hackathon Med'ING Hack — MIKANA",
    organization: 'ESIGELEC — équipe de 6',
    date: 'Oct. 2024 — Févr. 2025',
    stack: ['FastAPI', 'Prophet', 'XGBoost', 'SARIMAX', 'MySQL', 'React', 'Docker'],
    context: {
      fr: "Hackathon Med'ING Hack (ESIGELEC), prolongé en projet ingénieur — équipe de 6",
      en: "Med'ING Hack hackathon (ESIGELEC), extended into an engineering project — team of 6",
    },
    pitch: {
      fr: 'Plateforme IA qui prévoit les commandes de linge, les livraisons et les effectifs d’une blanchisserie hospitalière.',
      en: 'AI platform forecasting linen orders, deliveries and staffing for a hospital laundry.',
    },
    problem: {
      fr: 'Une blanchisserie industrielle au service d’établissements de santé planifiait ses volumes, ses tournées et ses effectifs de façon empirique. Il fallait anticiper la demande par établissement et par type de linge, dimensionner les livraisons et prévoir les présences du personnel.',
      en: 'An industrial laundry serving healthcare facilities planned volumes, delivery rounds and staffing empirically. The goal was to anticipate demand per facility and linen type, size deliveries and forecast staff attendance.',
    },
    features: {
      fr: [
        'Prévision des commandes de linge par établissement et type d’article avec Prophet (R² test 0,90).',
        'Planification des livraisons avec XGBoost (R² test 0,966).',
        'Prévision hebdomadaire des présences avec SARIMAX, intervalles de confiance inclus (R² test 0,89).',
        'API FastAPI de 18 endpoints : prédictions, historique, tendances, exports PDF/Excel.',
        'Centre de performance : import de nouvelles données, réentraînement à la demande et historique des métriques dans MySQL.',
      ],
      en: [
        'Linen order forecasting per facility and item type with Prophet (test R² 0.90).',
        'Delivery planning with XGBoost (test R² 0.966).',
        'Weekly attendance forecasting with SARIMAX, including confidence intervals (test R² 0.89).',
        'FastAPI API with 18 endpoints: predictions, history, trends, PDF/Excel exports.',
        'Performance centre: upload new data, retrain on demand and keep a metrics history in MySQL.',
      ],
    },
    architecture: {
      fr: 'Front React + TypeScript (Recharts, Tailwind, MUI) qui appelle deux services FastAPI. Ces services chargent les modèles sérialisés (Prophet, XGBoost, SARIMAX) et persistent l’historique dans MySQL via SQLAlchemy. Docker Compose orchestre 6 services, dont Redis pour le cache et une sauvegarde automatique de la base.',
      en: 'React + TypeScript frontend (Recharts, Tailwind, MUI) calling two FastAPI services. These load the serialised models (Prophet, XGBoost, SARIMAX) and persist history to MySQL via SQLAlchemy. Docker Compose runs 6 services, including Redis for caching and an automatic database backup.',
    },
    metrics: [
      { value: '0,966', label: { fr: 'R² livraisons (XGBoost)', en: 'delivery R² (XGBoost)' } },
      { value: '3', label: { fr: 'modèles de prévision', en: 'forecasting models' } },
      { value: '18', label: { fr: 'endpoints FastAPI', en: 'FastAPI endpoints' } },
      { value: '6', label: { fr: 'services Docker', en: 'Docker services' } },
    ],
    dataAngle: {
      fr: 'Transformation d’exports logistiques et de fichiers de présences 2022-2024 en séries temporelles, migration SQLite → MySQL, puis réentraînement et suivi des métriques des modèles dans le temps.',
      en: 'Turned logistics exports and 2022-2024 attendance files into time series, migrated SQLite → MySQL, then retrained the models and tracked their metrics over time.',
    },
    status: { fr: 'Prototype fonctionnel livré.', en: 'Working prototype delivered.' },
    period: 'Oct. 2024 — Févr. 2025',
    links: [{ label: 'GitHub', href: 'https://github.com/AbdoulDiouf2/mikana' }],
  },
  {
    kind: 'academic',
    id: 'price-scraper',
    title: 'Comparateur de prix — Docker & Web Scraping',
    organization: 'ESIGELEC — équipe de 3',
    date: 'Janv. 2025',
    stack: ['Scrapy', 'Selenium', 'MySQL', 'Flask', 'Docker Compose'],
    context: {
      fr: 'Projet ESIGELEC — cours Docker & Web Scraping, équipe de 3',
      en: 'ESIGELEC project — Docker & Web Scraping course, team of 3',
    },
    pitch: {
      fr: 'Pipeline conteneurisé qui collecte des casques audio sur Boulanger, Cdiscount et eBay, les stocke dans MySQL et affiche le site le moins cher.',
      en: 'Containerised pipeline that collects headphones from Boulanger, Cdiscount and eBay, stores them in MySQL and shows the cheapest retailer.',
    },
    problem: {
      fr: 'Le même produit est vendu à des prix différents selon les e-commerçants, et comparer les sites à la main prend du temps. Le sujet : scraper plusieurs sites, centraliser les offres dans une base conteneurisée et indiquer pour chaque article le site le moins cher.',
      en: 'The same product sells at different prices across retailers, and comparing sites by hand is slow. The brief: scrape several sites, centralise offers in a containerised database and show the cheapest site for each item.',
    },
    features: {
      fr: [
        '3 spiders : Boulanger en Scrapy/XPath, Cdiscount et eBay pilotés par Selenium headless pour les pages rendues en JavaScript.',
        'Gestion anti-bot : en-têtes personnalisés, délai entre requêtes, sélecteurs XPath de secours.',
        'Pipeline MySQL : upsert sur l’URL produit, nettoyage, dédoublonnage SQL et compteurs insertions/mises à jour/erreurs.',
        'Application Flask : catalogue paginé, badge « meilleur prix » (CTE) et recherche top 30 par site (fonction de fenêtre ROW_NUMBER).',
      ],
      en: [
        '3 spiders: Boulanger in Scrapy/XPath, Cdiscount and eBay driven by headless Selenium for JavaScript-rendered pages.',
        'Anti-bot handling: custom headers, request delay, fallback XPath selectors.',
        'MySQL pipeline: upsert on product URL, cleaning, SQL deduplication and insert/update/error counters.',
        'Flask app: paginated catalogue, “best price” badge (CTE) and top-30-per-site search (ROW_NUMBER window function).',
      ],
    },
    architecture: {
      fr: 'Un conteneur scraper (Python + Chrome) lance les 3 spiders dans un même processus ; les items passent par un pipeline vers MySQL 8. Une application Flask interroge la base pour comparer les offres, et PHPMyAdmin sert à l’administrer — 4 services dans un seul docker-compose.',
      en: 'A scraper container (Python + Chrome) runs the 3 spiders in one process; items flow through a pipeline into MySQL 8. A Flask app queries the database to compare offers, and PHPMyAdmin administers it — 4 services in a single docker-compose.',
    },
    metrics: [
      { value: '3', label: { fr: 'sites scrapés', en: 'sites scraped' } },
      { value: '4', label: { fr: 'services Docker', en: 'Docker services' } },
      { value: '7', label: { fr: 'champs par produit', en: 'fields per product' } },
    ],
    dataAngle: {
      fr: 'Pipeline ETL complet en conteneurs : extraction hétérogène (HTML statique et pages JavaScript), nettoyage et dédoublonnage, chargement idempotent par upsert, puis requêtes analytiques (CTE, fonctions de fenêtre).',
      en: 'End-to-end containerised ETL: heterogeneous extraction (static HTML and JavaScript pages), cleaning and deduplication, idempotent upsert loading, then analytical queries (CTEs, window functions).',
    },
    status: { fr: 'Terminé et livré.', en: 'Completed and delivered.' },
    period: 'Janv. 2025',
    links: [{ label: 'GitHub', href: 'https://github.com/AbdoulDiouf2/projet_docker_web_scrapping' }],
  },
  {
    kind: 'academic',
    id: 'approche-metier',
    title: 'Approche Métier — Ingénieur R&D',
    organization: 'ESIGELEC',
    date: 'Nov. 2024',
    stack: ['Analyse vidéo', "Traitement d'images", 'Python'],
  },
  {
    kind: 'academic',
    id: 'csw',
    title: 'Site de gestion de jeux de plateau',
    organization: 'ESIGELEC — binôme',
    date: 'Oct. — Nov. 2023',
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript'],
    context: { fr: 'Projet du module Web ESIGELEC — en binôme', en: 'ESIGELEC web module project — pair work' },
    pitch: {
      fr: 'Site PHP/MySQL où les membres d’un club consultent les jeux et s’inscrivent aux parties, et où les admins planifient et modèrent.',
      en: 'PHP/MySQL site where club members browse games and join sessions, while admins schedule and moderate them.',
    },
    problem: {
      fr: 'Un club de jeux de plateau a besoin d’un endroit unique pour son catalogue et l’organisation de ses parties, à la place d’une coordination informelle.',
      en: 'A board-game club needs one place for its catalogue and for organising sessions, instead of informal coordination.',
    },
    features: {
      fr: [
        'Authentification à deux rôles (membre/admin), mots de passe hachés, réinitialisation.',
        'CRUD admin sur les jeux et les créneaux ; promotion/rétrogradation des membres.',
        'Cycle de vie d’une partie : inscription, validation ou refus par l’admin, clôture ou relance.',
        'Messagerie interne avec notifications automatiques, « j’aime » et historique des parties.',
      ],
      en: [
        'Two-role authentication (member/admin), hashed passwords, password reset.',
        'Admin CRUD for games and time slots; member promotion/demotion.',
        'Session lifecycle: sign-up, admin approval or rejection, closing or reopening.',
        'Internal messaging with automatic notifications, likes and session history.',
      ],
    },
    architecture: {
      fr: 'Application PHP procédurale multi-pages, menus selon le rôle et scripts de traitement séparés. Accès MySQL par requêtes préparées (mysqli), interface Bootstrap 5.',
      en: 'Procedural multi-page PHP app with role-based menus and separate handler scripts. MySQL access through prepared statements (mysqli), Bootstrap 5 UI.',
    },
    metrics: [
      { value: '7', label: { fr: 'tables MySQL', en: 'MySQL tables' } },
      { value: '11', label: { fr: 'versions de schéma', en: 'schema versions' } },
      { value: '64', label: { fr: 'pages PHP', en: 'PHP pages' } },
    ],
    status: { fr: 'Terminé — projet de cours rendu.', en: 'Completed — course project submitted.' },
    period: 'Oct. — Nov. 2023',
    links: [{ label: 'GitHub', href: 'https://github.com/AbdoulDiouf2/csw' }],
  },
  {
    kind: 'academic',
    id: 'absences',
    title: 'Outil de gestion des absences',
    organization: 'ESIGELEC',
    date: 'Mars — Mai 2023',
    stack: ['Java', 'SQL', 'Eclipse'],
  },
  {
    kind: 'academic',
    id: 'pic',
    title: 'Projet Initiative et Créativité (PIC)',
    organization: 'ESIGELEC',
    date: 'Nov. 2022 — Mai 2023',
    stack: ['Gestion de projet', 'Travail en équipe'],
  },
  {
    kind: 'academic',
    id: 'psc1',
    title: 'Prévention et Secours Civique de Niveau 1 (PSC1)',
    organization: 'ESIGELEC — FNMNS',
    date: 'Déc. 2022',
    stack: ['Premiers secours', "Gestion d'urgence"],
  },
];
