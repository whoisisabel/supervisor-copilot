# Shamiri Supervisor Copilot

A mini-product designed to help Shamiri Supervisors review group therapy sessions more efficiently using AI-assisted insights, while keeping humans firmly in the loop for all final decisions.

This project was built by **lebasi** - https://isabelmgendi.com/.

---

## Problem Context

Shamiri delivers evidence-based mental health interventions to young people using a Tiered Care Model. As the program scales, Tier 2 Supervisors face a quality assurance bottleneck: they cannot manually review every recorded therapy session.

This application explores how **Generative AI can responsibly amplify Supervisor capacity** by summarizing sessions, evaluating protocol adherence and flagging potential safety risks — without replacing human judgment.

---

## Product Overview

**Shamiri Supervisor Copilot** is a web-based dashboard that allows a Supervisor to:

- Log in and view completed therapy sessions
- Review AI-generated session insights:
  - 3-sentence summary
  - Quality scores based on Shamiri’s rubric
  - Safety risk detection with extracted quotes
- Override or validate AI findings
- Leave supervisor notes for accountability

AI insights are **advisory only**. Supervisors always make the final call.

---

## Architecture Overview

The application is built using **Next.js (App Router)** for both frontend and backend logic.

### Architecture summary:

- Frontend: React (Next.js)
- Backend: Next.js Route Handlers (API routes)
- Database: PostgreSQL
- AI: LLM-based analysis with strict schema validation


### Why Next.js for both frontend and backend?

- Reduces deployment and infrastructure complexity
- Enables strong type safety across the stack
- Keeps business logic and AI orchestration on the server
- Appropriate tradeoff for a focused, single-product system

All AI calls and database access occur server-side only.

---

## Key Features

### 1. Supervisor Login (Simplified)
- Email-only login
- Session stored via HTTP-only cookies

### 2. Sessions Dashboard
- List of completed sessions
- Metadata: Fellow name, date, group ID
- Status indicators:
  - `UNPROCESSED`
  - `SAFE`
  - `RISK`

### 3. AI Session Analysis
For each session transcript, the AI produces structured output:

- **Session Summary**
  - Exactly 3 sentences
- **Quality Evaluation**
  - Content Coverage (Growth Mindset)
  - Facilitation Quality
  - Protocol Safety
  - Each scored on a 1–3 scale with justification
- **Risk Detection**
  - Binary flag: `SAFE` or `RISK`
  - Exact quote extracted if risk is detected

### 4. Human-in-the-Loop Review
- Supervisors can override AI conclusions
- Final status and notes are stored separately
- Raw transcripts remain immutable and auditable

---

## AI Engineering Approach

The AI analysis engine is designed defensively and intentionally.

### Structured Output Enforcement
- AI responses must conform to a strict JSON schema
- **Zod** is used to validate outputs at runtime
- Invalid responses fail safely and do not corrupt data

### Prompt Design
- Explicit rubric instructions
- Clear definition of Growth Mindset
- Conservative risk detection rules
- JSON-only output requirement

### Error Handling
- JSON parsing and schema validation errors are caught
- Failures are logged and surfaced gracefully in the UI

AI insights are treated as **derived data**, never as authoritative truth.

---

## Data Model (Simplified)

- `supervisors` – logged-in reviewers
- `sessions` – immutable session records with transcripts
- `session_analysis` – AI-generated insights (JSON)
- `reviews` – supervisor overrides and notes

Transcripts are seeded into the database and never modified.

---

## Seeding Realistic Transcripts

The database is seeded with mock therapy transcripts that:

- Simulate 40–60 minute group sessions
- Include multiple speakers (Fellow + Students)
- Demonstrate Growth Mindset teaching
- Include empathy and facilitation language
- Occasionally inject safety-edge cases for testing

This allows meaningful AI evaluation without using real mental health data.

---

## Running the Project Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Groq API key

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=your_postgres_url
GROQ_API_KEY=your_qroq_key

---

### Install Dependencies
npm install

---

### Seed the Database
npm run seed

---

### Run the Application
npm run dev

Open http://localhost:3000 in your browser.

---

Thank you for reviewing this submission.

