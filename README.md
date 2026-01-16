# LendNova

**AI-Powered Creditworthiness Prediction for First-Time Borrowers**

LendNova is an intelligent credit scoring platform that leverages alternative data sources and explainable ML models to provide fair, transparent credit decisions for first-time borrowers with limited credit history.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## Features

- **Alternative Data Credit Scoring** — Analyze non-traditional data sources including digital footprint, transaction patterns, and behavioral signals
- **OCR-Based Fraud Detection** — Advanced document verification using optical character recognition to detect forged documents
- **Explainable AI (XAI)** — Every credit decision comes with detailed explanation of contributing factors
- **Model Comparison** — Compare predictions across Logistic Regression, Random Forest, and Gradient Boosting models
- **Real-Time Processing** — Sub-second credit decisions powered by optimized ML inference

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4 with glassmorphism design
- **Backend Integration:** REST API endpoints for ML model inference
- **Workflow Orchestration:** Kestra flows for automated pipelines

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── chat/          # AI Risk Assistant chat interface
│   ├── page.tsx       # Landing page
│   └── globals.css    # Global styles & theme
├── components/
│   ├── chat/          # Chat UI components
│   │   ├── ChatArea.tsx
│   │   ├── ChatSidebar.tsx
│   │   ├── RiskResultCard.tsx
│   │   ├── FraudResultCard.tsx
│   │   ├── ExplainabilityCard.tsx
│   │   └── ModelComparisonCard.tsx
│   ├── Hero.tsx       # Landing page hero
│   ├── Features.tsx   # Feature showcase
│   ├── AIPipeline.tsx # ML pipeline visualization
│   └── ...
└── kestra-flows/      # Workflow automation configs
```

## Design System

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#0A0F1F` | Background |
| AI Blue | `#4F7FFF` | Primary accent |
| ML Purple | `#9B6BFF` | Secondary accent |
| Success | `#2EE59D` | Positive indicators |
| Risk | `#FF5C5C` | Alerts & warnings |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Run credit risk prediction |
| `/ocr-extract` | POST | Extract data from documents |
| `/fraud-check` | POST | Verify document authenticity |

## License

MIT
