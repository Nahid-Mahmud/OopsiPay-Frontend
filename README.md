Here's a refined version of the `README.md` for the OopsiPay frontend application. The changes focus on improving clarity, consistency, and organization while maintaining the original structure and content. I've streamlined sections, improved formatting, fixed minor inconsistencies (e.g., numbering in "Key implementation notes"), and enhanced readability with concise language and better headings. I've also ensured the document is professional and developer-friendly.

---

# OopsiPay Frontend

A comprehensive guide for developers working on the OopsiPay frontend, built with **React**, **TypeScript**, and **Vite**. This document covers setup, architecture, development workflows, testing, linting, deployment, troubleshooting, and contribution guidelines.

## Quickstart

### Prerequisites

- **Node.js**: Version 18 or higher
- **pnpm**: Preferred package manager (install via `npm install -g pnpm`)

### Installation

Install dependencies:

```bash
pnpm install
```

### Development Server

Start the Vite development server with hot module replacement (HMR):

```bash
pnpm dev
```

### Build and Type-Check

Run type-checking and build the production bundle:

```bash
pnpm build
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## Project Overview

- **Framework**: React (v19) + TypeScript
- **Bundler**: Vite
- **State & API**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS
- **Form Validation**: Zod + react-hook-form
- **Icons**: lucide-react
- **Notifications**: sonner

## Features Overview

- Cash Out and Send Money for Users
- Cash In for Agents
- Admin Credit for Admin
- Users management
- Transaction management
- Wallet Management
- Secure authentication

## The application is a wallet and payments dashboard featuring:

- **Authentication**: Login, registration, password reset, and email verification
- **Admin Pages**: Transactions, wallets, users, and analytics
- **Public Pages**: Home, About, FAQ, and Contact

## Repository Structure

### Key Files

- `package.json`: Project scripts and dependencies
- `vite.config.ts`: Vite configuration
- `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configurations
- `src/main.tsx`: React entry point
- `src/index.css`: Global styles (Tailwind CSS)

### Major Directories

- **`src/components/`**: Reusable UI and feature components
  - `ui/`: UI primitives (e.g., Button, Input, Select, Table, Pagination, Dialog)
  - `layouts/`: Layout components (e.g., DashboardLayout, CommonLayout, Navbar, Footer)
  - `modules/`: Feature-specific components (e.g., Admin, Home, Wallet, About, FAQ)
- **`src/pages/`**: Route-level pages
  - `auth/`: Login, Register, ForgetPassword, ResetPassword, VerifyEmail
  - `admin/`: AllTransactions, AllWallets, AllUsers, Analytics
  - `common/`: Home, About, Contact, FAQ
- **`src/redux/`**: Redux Toolkit and RTK Query setup
  - `baseApi.ts`: RTK Query base API wrapper
  - `axiosBaseQuery.ts`: Axios-based RTK Query wrapper (handles auth headers and errors)
  - `features/`: API slices (e.g., `auth.api.ts`, `transaction.api.ts`, `wallet.api.ts`, `user.api.ts`, `stats.api.ts`)
- **`src/types/`**: TypeScript interfaces and types for API responses and models
- **`src/validations/`**: Zod schemas for form validation
- **`src/hooks/`**: Custom hooks (e.g., `use-debounce`, `withAuth`, `use-mobile`)
- **`src/lib/`**: Utility libraries (e.g., `axios.ts`, `utils.ts`)

## Key Implementation Details

### 1. API Layer

- **RTK Query** handles data fetching and caching. Feature-specific API files are in `src/redux/features/`.
- `axiosBaseQuery.ts` integrates Axios with RTK Query, managing auth tokens and error handling.

### 2. Authentication

- `auth.api.ts` defines endpoints for login, logout, token refresh, and user profile.
- `withAuth.tsx` is a Higher-Order Component (HOC) for protecting routes.

### 3. Search & Pagination

- Admin pages implement server-side pagination and filtering.
- Search inputs are debounced using `src/hooks/use-debounce.ts` for optimized query param updates.
- Examples: `AllWallets.tsx`, `TransactionsTable.tsx`.

### 4. UI Primitives

- The `src/components/ui/` folder wraps Radix UI primitives with custom Tailwind styling for consistent UI.

### 5. Forms & Validation

- Forms use `react-hook-form` with `zod` for validation. Schemas are defined in `src/validations/`.

## Environment Variables

Create a `.env` file in the project root (gitignored) with the following:

```
VITE_API_BASE_URL=https://api.oopsipay.example.com
VITE_ENV=development
```

Access variables in the app via `import.meta.env.VITE_API_BASE_URL`.

## Scripts

- `pnpm dev`: Starts the Vite development server
- `pnpm build`: Runs `tsc -b` (type-check) and `vite build` (production bundle)
- `pnpm lint`: Runs ESLint
- `pnpm preview`: Previews the production build locally

## Type-Checking and Builds

Before committing changes, ensure no TypeScript or linting errors:

```bash
pnpm build
pnpm lint
```

Fix any errors reported by `tsc -b` before merging.

## Testing

The repository currently has no tests. Recommended additions:

- **Unit Tests**: For `src/hooks/use-debounce.ts` and `src/lib/utils.ts`
- **Component Tests**: For critical UI (e.g., `TransactionsTable`, `TransactionDetailsModal`)
- **Integration Tests**: For authentication flows

**Suggested Tools**: Vitest + React Testing Library

## Continuous Integration (CI)

Set up a GitHub Actions workflow for pull requests with the following jobs:

- `pnpm install`: Install dependencies
- `pnpm build`: Type-check and build
- `pnpm lint`: Run ESLint
- `pnpm test` (optional): Run tests

## Deployment

The app is a static Single Page Application (SPA) deployable to Vercel, Netlify, or any static hosting service.

### Vercel Deployment

- **Environment Variables**: Configure in Vercel project settings
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`

## Troubleshooting

- **TypeScript Errors**: Run `pnpm build` and address errors from `tsc -b`.
- **CORS/Auth API Issues**: Verify `VITE_API_BASE_URL` and check `axiosBaseQuery.ts` for token handling.
- **Missing Environment Variables**: Ensure production environment variables match `.env` keys.

## Recommended Files for New Contributors

1. `src/redux/axiosBaseQuery.ts`: Understand API request handling and auth logic.
2. `src/redux/baseApi.ts`, `src/redux/features/transaction/transaction.api.ts`: Explore transaction endpoints and response shapes.
3. `src/components/ui/*`: Review available UI primitives and their props.
4. `src/pages/admin/AllWallets.tsx`: Study server-side pagination and debounced search.

## Contributing

- Adhere to the coding style: TypeScript, functional components, and hooks.
- Add or update tests for new functionality.
- Update this README for new environment variables or major features.
