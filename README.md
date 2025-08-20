# Zero Barriers Growth Accelerator

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> AI-powered marketing optimization platform that systematically analyzes content to identify growth barriers and provide actionable recommendations.

## 🚀 Project Overview

The Zero Barriers Growth Accelerator is a comprehensive web application that combines established marketing frameworks with AI-powered analysis to eliminate guesswork in marketing optimization and drive measurable revenue growth.

### Core Objectives

- **Rapid Growth Identification**: Analyze content in under 60 seconds to identify revenue-blocking gaps
- **Substantial Impact Delivery**: Provide recommendations that drive 25-50% improvements in conversion rates
- **Sustainable Growth Engineering**: Create systematic, repeatable optimization processes
- **Barrier Elimination**: Remove friction between insight and implementation
- **Revenue Acceleration**: Enable clients to achieve measurable revenue growth within 90 days

### Analytical Frameworks

1. **Simon Sinek's Golden Circle Analysis** - WHY, HOW, WHAT framework
2. **Consumer Elements of Value** - 30 value elements across functional, emotional, life-changing, and social impact categories
3. **B2B Elements of Value** - 40 elements specific to business-to-business value creation
4. **CliftonStrengths Domains** - 34 themes across executing, influencing, relationship building, and strategic thinking domains

## 🛠️ Technology Stack

### Frontend

- **Next.js 14** with App Router for server-side rendering and optimal performance
- **TypeScript** for type safety and developer experience
- **Tailwind CSS** with custom design system for rapid UI development
- **Radix UI** components for accessible, unstyled UI primitives
- **Framer Motion** for smooth animations and micro-interactions
- **React Hook Form + Zod** for type-safe form validation

### Backend

- **tRPC** for end-to-end type safety from frontend to database
- **PostgreSQL** with Prisma ORM for robust data management
- **NextAuth.js v5** for authentication and authorization
- **Redis** for caching and session management

### AI/ML

- **OpenAI GPT-4 Turbo** for advanced content analysis
- **Pinecone** for vector database and semantic search
- **Custom NLP pipeline** for framework-specific analysis

### Development Tools

- **ESLint + Prettier** for code quality and formatting
- **Vitest + React Testing Library** for comprehensive testing
- **Playwright** for end-to-end testing
- **Turborepo** for monorepo management

## 📁 Project Structure

```
zero-barriers-growth-accelerator/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Global styles
│   │   ├── (auth)/            # Authentication routes
│   │   ├── dashboard/         # Dashboard routes
│   │   ├── analysis/          # Analysis routes
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── sections/         # Page sections
│   │   └── forms/            # Form components
│   ├── lib/                  # Utility libraries
│   ├── types/                # TypeScript type definitions
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Helper functions
│   ├── server/               # Server-side utilities
│   ├── trpc/                 # tRPC configuration
│   ├── auth/                 # Authentication configuration
│   └── ai/                   # AI analysis services
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
├── tests/                    # Test files
├── docs/                     # Documentation
└── scripts/                  # Build and deployment scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- PostgreSQL 14 or higher
- Redis 6 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ShayneIsMagic/zero-barriers-growth-accelerator.git
   cd zero-barriers-growth-accelerator
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/zero_barriers_growth"
   DIRECT_URL="postgresql://username:password@localhost:5432/zero_barriers_growth"

   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # AI Services
   OPENAI_API_KEY="your-openai-api-key"
   PINECONE_API_KEY="your-pinecone-api-key"
   PINECONE_ENVIRONMENT="your-pinecone-environment"

   # Redis
   REDIS_URL="redis://localhost:6379"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed database with initial data
   npm run db:seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

1. **Create PostgreSQL database**

   ```sql
   CREATE DATABASE zero_barriers_growth;
   ```

2. **Run Prisma migrations**

   ```bash
   npm run db:migrate
   ```

3. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

### Redis Setup

1. **Install Redis** (macOS)

   ```bash
   brew install redis
   brew services start redis
   ```

2. **Install Redis** (Ubuntu/Debian)
   ```bash
   sudo apt update
   sudo apt install redis-server
   sudo systemctl start redis-server
   ```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
npm run test

# Test with UI
npm run test:ui

# Test coverage
npm run test:coverage

# End-to-end tests
npm run e2e
```

### Test Structure

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint and database interaction testing
- **E2E Tests**: User flow and critical path testing
- **Visual Regression**: Component visual consistency testing

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Docker

```bash
# Build image
docker build -t zero-barriers-growth .

# Run container
docker run -p 3000:3000 zero-barriers-growth
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
REDIS_URL="your-production-redis-url"
NEXTAUTH_SECRET="your-production-secret"
OPENAI_API_KEY="your-production-openai-key"
PINECONE_API_KEY="your-production-pinecone-key"
```

## 📚 API Documentation

### Core Endpoints

- `POST /api/analysis` - Create new content analysis
- `GET /api/analysis/:id` - Retrieve analysis results
- `GET /api/analysis` - List analyses with filtering
- `POST /api/recommendations` - Generate optimization recommendations
- `GET /api/dashboard/stats` - Dashboard statistics

### Authentication

All protected endpoints require valid authentication via NextAuth.js. Include the session token in the Authorization header:

```
Authorization: Bearer <session-token>
```

## 🔧 Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Use conventional commits format

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow accessibility best practices
- Write comprehensive JSDoc comments

### Testing Guidelines

- Maintain 80%+ test coverage
- Write tests for all new features
- Use meaningful test descriptions
- Mock external dependencies

### Performance Guidelines

- Implement proper loading states
- Use React.memo for expensive components
- Optimize images and assets
- Implement proper caching strategies

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check the [docs/](docs/) folder
- **Issues**: Create a [GitHub issue](https://github.com/ShayneIsMagic/zero-barriers-growth-accelerator/issues)
- **Discussions**: Join [GitHub discussions](https://github.com/ShayneIsMagic/zero-barriers-growth-accelerator/discussions)
- **Email**: hello@zerobarriers.com

### Common Issues

- **Database connection errors**: Check DATABASE_URL and ensure PostgreSQL is running
- **Redis connection errors**: Verify Redis is running and REDIS_URL is correct
- **Authentication issues**: Check NEXTAUTH_SECRET and OAuth provider configuration
- **AI analysis failures**: Verify OpenAI API key and Pinecone configuration

## 🗺️ Roadmap

### Phase 1: Core Platform (Q1 2024)

- [x] Project setup and architecture
- [x] Basic authentication system
- [x] Core analysis framework
- [ ] AI integration
- [ ] Basic dashboard

### Phase 2: Advanced Features (Q2 2024)

- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] API access
- [ ] Integration marketplace

### Phase 3: Enterprise Features (Q3 2024)

- [ ] Advanced security
- [ ] Compliance features
- [ ] Enterprise SSO
- [ ] Advanced reporting

### Phase 4: AI Enhancement (Q4 2024)

- [ ] Custom AI models
- [ ] Predictive analytics
- [ ] Automated optimization
- [ ] Industry-specific insights

## 🙏 Acknowledgments

- **Simon Sinek** for the Golden Circle framework
- **Bain & Company** for Consumer Elements of Value
- **Gallup** for CliftonStrengths framework
- **OpenAI** for GPT-4 technology
- **Vercel** for Next.js and hosting platform

---

**Built with ❤️ by the Zero Barriers team**

For questions, support, or collaboration, reach out to us at [hello@zerobarriers.com](mailto:hello@zerobarriers.com)
