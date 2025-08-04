# Pitch Writer AI

**Turn Your Ideas Into Compelling Stories**

## 🚀 Overview

Pitch Writer AI is an intelligent platform that helps entrepreneurs, sales professionals, academics, and marketers create professional, persuasive pitches using AI-powered assistance and expert-crafted templates. Whether you're seeking investment, closing deals, or presenting research, our platform transforms your ideas into compelling stories that get results.

### ✨ Key Features

- **🤖 AI-Powered Content Generation**: Generate compelling pitch content with advanced AI
- **📄 Professional Templates**: Choose from expertly crafted templates for every use case
- **🎨 Tone & Style Control**: Adjust content for different audiences and contexts
- **🎯 Audience Targeting**: Customize pitches for investors, customers, or stakeholders
- **📤 Multiple Export Options**: PDF, PowerPoint, and secure sharing links
- **📊 Analytics & Insights**: Track pitch performance and success rates
- **🔄 Version History**: Keep track of changes and revert when needed
- **🌙 Dark Mode**: Full dark theme support for comfortable usage

## 🎯 Who Is This For?

### Startup Founders
- Secure funding with investor-ready pitches
- Present to accelerators and VCs
- Validate ideas with compelling presentations

### Sales Professionals
- Convert prospects into customers
- Standardize sales presentations
- Improve conversion rates

### Academic Researchers
- Present research effectively
- Secure grants and funding
- Communicate complex ideas simply

### Marketing Teams
- Get campaign approval from stakeholders
- Create compelling proposals
- Align teams around strategies

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database with real-time features
- **MongoDB** - Document database for analytics
- **n8n** - Workflow automation platform

### AI & Integrations
- **Google Gemini Flash** - Advanced language model
- **n8n Workflows** - AI processing automation
- **Supabase Auth** - Magic link authentication
- **Vercel Blob** - File storage and CDN

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Required Accounts & API Keys

1. **Supabase Account** - [supabase.com](https://supabase.com)
2. **MongoDB Atlas** - [mongodb.com](https://mongodb.com)
3. **Google AI Studio** - [aistudio.google.com](https://aistudio.google.com)
4. **n8n Instance** - [n8n.io](https://n8n.io) (optional but recommended)

## 🚀 Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/pitch-writer-ai.git
cd pitch-writer-ai
\`\`\`

### 2. Install Dependencies

\`\`\`bash
# Using npm
npm install

# Using yarn
yarn install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# AI Configuration
GEMINI_API_KEY=your_google_gemini_api_key

# n8n Configuration (Optional)
N8N_WEBHOOK_URL=http://localhost:5678
N8N_API_KEY=your_n8n_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. Set Up Supabase Database

1. Create a new Supabase project
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `scripts/setup-database.sql`
4. Configure authentication settings:
   - Enable email authentication
   - Set up magic link templates
   - Configure redirect URLs

### 5. Set Up MongoDB

1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Whitelist your IP address
4. Get your connection string and add it to `.env.local`

### 6. Configure AI Services

#### Google Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Add the key to your `.env.local` file

### 7. Set Up n8n (Optional)

\`\`\`bash
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start

# Or using Docker
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
\`\`\`

1. Open http://localhost:5678
2. Import workflows from `scripts/n8n-workflows.json`
3. Configure credentials for:
   - Google Gemini API
   - MongoDB connection
   - Email service

### 8. Initialize Shadcn/ui

\`\`\`bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add required components
npx shadcn@latest add button card input label textarea select tabs progress badge avatar dropdown-menu toast separator accordion alert-dialog checkbox dialog tooltip
\`\`\`

## 🏃‍♂️ Running the Application

### Development Mode

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

### Running with Docker

\`\`\`bash
# Build Docker image
docker build -t pitch-writer-ai .

# Run container
docker run -p 3000:3000 pitch-writer-ai
\`\`\`

## 📖 Usage Guide

### Getting Started

1. **Sign Up**: Visit the homepage and click "Get Started"
2. **Magic Link**: Enter your email and check for the magic link
3. **Dashboard**: Access your personal dashboard after authentication
4. **Create Pitch**: Choose "New Pitch" or select a template
5. **AI Assistance**: Use AI features to generate and enhance content
6. **Export**: Download as PDF or share via secure link

### Creating Your First Pitch

1. **Choose Template**: Select from Startup, Product, Sales, Academic, or Marketing templates
2. **Basic Information**: Enter title, description, and target audience
3. **Step-by-Step Builder**: Complete 8 guided steps:
   - Problem Statement
   - Solution Description
   - Market & Audience
   - Business Model
   - Team & Execution
   - The Ask
   - Review & Export
4. **AI Enhancement**: Use AI to generate, improve, and customize content
5. **Export Options**: Download PDF, create share links, or copy text

### AI Features

#### Content Generation
- Click "AI Generate" on any section
- Provide context and prompts
- Review and customize generated content

#### Tone Adjustment
- Select content to modify
- Choose from: Formal, Persuasive, Friendly, Concise, Investor-Friendly
- Apply changes and review results

#### Summary Creation
- Generate one-liners for social media
- Create 30-second elevator pitches
- Develop 1-minute pitch summaries

### Templates

#### Startup Pitch
Perfect for investor presentations and funding rounds.
- Problem identification
- Solution presentation
- Market opportunity
- Business model
- Team introduction
- Funding ask

#### Product Pitch
Ideal for customer-facing presentations.
- Product overview
- Key features and benefits
- Use cases and applications
- Pricing strategy
- Call to action

#### Sales Pitch
Designed for prospect conversion.
- Problem identification
- Solution presentation
- Value proposition
- Social proof
- Objection handling
- Closing strategy

#### Academic Pitch
Tailored for research presentations.
- Research question
- Literature review
- Methodology
- Findings and results
- Implications
- Future work

#### Marketing Proposal
Built for campaign approval.
- Market analysis
- Target audience
- Strategy overview
- Tactics and execution
- Budget requirements
- Expected ROI

## 🔧 Configuration

### Customization

#### Themes
The application supports light and dark themes. Users can toggle between themes using the theme switcher in the header.

#### Templates
Add custom templates by:
1. Creating template definitions in the database
2. Adding template components in `components/templates/`
3. Updating the template library UI

#### AI Prompts
Customize AI prompts by modifying:
- `lib/ai/prompts.ts` - Prompt templates
- `hooks/use-ai.ts` - AI interaction logic
- `app/api/ai/` - API endpoints

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Test Structure

\`\`\`
tests/
├── __mocks__/          # Mock files
├── components/         # Component tests
├── hooks/             # Hook tests
├── pages/             # Page tests
├── utils/             # Utility tests
└── setup.ts           # Test setup
\`\`\`

### Writing Tests

\`\`\`typescript
// Example component test
import { render, screen } from '@testing-library/react'
import { PitchBuilder } from '@/components/pitch-builder'

describe('PitchBuilder', () => {
  it('renders the pitch builder form', () => {
    render(<PitchBuilder />)
    expect(screen.getByText('Create New Pitch')).toBeInTheDocument()
  })
})
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables
3. **Deploy**: Vercel will automatically build and deploy

\`\`\`bash
# Using Vercel CLI
npm install -g vercel
vercel --prod
\`\`\`

### Docker Deployment

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Environment Setup

Ensure all environment variables are properly configured in your deployment platform:

- **Supabase**: Configure production database and auth settings
- **MongoDB**: Use production cluster with proper security
- **AI APIs**: Set up production API keys with appropriate limits
- **n8n**: Deploy n8n instance or use cloud service

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the Repository**
   \`\`\`bash
   git fork https://github.com/yourusername/pitch-writer-ai.git
   \`\`\`

2. **Create a Feature Branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit Your Changes**
   \`\`\`bash
   git commit -m "Add amazing feature"
   \`\`\`

5. **Push to Your Branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

### Development Guidelines

#### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for functions

#### Component Guidelines
\`\`\`typescript
// Example component structure
interface ComponentProps {
  title: string
  onAction: () => void
}

export function Component({ title, onAction }: ComponentProps) {
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  )
}
\`\`\`
