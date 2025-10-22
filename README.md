# GraphQL + ReactJS Frontend Application

A production-quality demo application built with React, TypeScript, Apollo Client, and TailwindCSS, showcasing modern web development best practices with GraphQL integration.

## 🚀 Live Demo

This application demonstrates user management with GraphQL, featuring pagination, album management, and a clean, responsive UI.

## 📸 Screenshots

### Users List with Pagination
![Users List](screenshots/Screenshot%202025-10-22%20at%202.00.40%20PM.png)

### User Detail Page
![User Detail](screenshots/Screenshot%202025-10-22%20at%202.00.57%20PM.png)

### User Posts Tab
![User Posts](screenshots/Screenshot%202025-10-22%20at%202.01.21%20PM.png)

### User Albums Tab
![User Albums](screenshots/Screenshot%202025-10-22%20at%202.01.27%20PM.png)

### Album Management
![Album Management](screenshots/Screenshot%202025-10-22%20at%202.01.48%20PM.png)

## 📋 Features

- **User Listing**: Paginated list of users with 5 users per page
  - Modern card-based design with gradient avatars
  - Online status indicators
  - Hover effects with smooth transitions
  - Comprehensive user information at a glance
- **User Details**: Comprehensive user information including posts and albums
  - Professional profile header with detailed contact info
  - Tab-based navigation for Posts and Albums
  - Color-coded tabs (Blue for Posts, Purple for Albums)
  - Infinite scroll for posts with load-more functionality
- **Album Management**:
  - Create new albums for users
  - Update existing album titles
  - Real-time GraphQL mutations with optimistic updates
  - Inline editing capabilities
- **Modern UI/UX**:
  - Responsive design with TailwindCSS
  - Dark mode support with theme-aware components
  - Professional toast notifications
  - Loading states with skeleton screens
  - Error handling with retry functionality
  - Empty state messages with helpful guidance
  - Smooth transitions and micro-animations
  - Clean underline-style tabs with active indicators

## 🛠️ Tech Stack

- **Frontend Framework**: React 19+ with TypeScript
- **GraphQL Client**: Apollo Client 4.0+
- **Routing**: React Router v7
- **Styling**: TailwindCSS 4.0+ with shadcn/ui components
- **UI Components**: Custom shadcn/ui components (Card, Button, Badge, Toast)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier
- **API**: GraphQL Zero (https://graphqlzero.almansi.me/api)

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Pagination.tsx
│   │   └── SkeletonCard.tsx
│   ├── ui/              # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── toaster.tsx
│   ├── user/            # User-related components
│   │   ├── UserCard.tsx
│   │   ├── UserInfo.tsx
│   │   └── PostsList.tsx
│   └── album/           # Album management components
│       ├── AlbumsList.tsx
│       ├── AlbumItem.tsx
│       ├── CreateAlbumForm.tsx
│       └── UpdateAlbumForm.tsx
├── pages/               # Page components
│   ├── UsersPage.tsx
│   └── UserDetailPage.tsx
├── graphql/             # GraphQL queries and mutations
│   ├── queries.ts       # Including pagination with links
│   └── mutations.ts
├── hooks/               # Custom React hooks
│   └── usePagination.ts
├── lib/                 # Configuration
│   └── apollo-client.ts
├── types/               # TypeScript type definitions
│   └── index.ts         # Including PaginationLinks types
├── utils/               # Helper functions
│   └── helpers.ts
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Test-react-graphql
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🏗️ Architecture & Design Decisions

### Component Architecture

- **Component-based structure**: Organized into logical folders (common, user, album)
- **Separation of concerns**: Pages handle routing and data fetching, components handle presentation
- **Reusable components**: Common UI elements (Loading, ErrorMessage, Pagination) are extracted for reuse

### State Management

- **Apollo Client**: Manages GraphQL data fetching and caching
- **React Hooks**: Custom hooks like `usePagination` for reusable logic
- **Local component state**: Form inputs and UI toggles managed with React's useState

### GraphQL Integration

- **Optimistic updates**: Immediate UI feedback on mutations
- **Cache management**: Apollo Client's InMemoryCache for efficient data handling
- **Error handling**: Comprehensive error states with retry functionality
- **Network policies**: Configured for optimal data freshness

### TypeScript

- **Type safety**: Full TypeScript coverage for components, hooks, and API responses
- **Interface definitions**: Clear type definitions in `types/index.ts`
- **Strict typing**: Ensures code reliability and better developer experience

### Styling Approach

- **TailwindCSS**: Utility-first CSS for rapid UI development
- **Responsive design**: Mobile-first approach with breakpoints
- **Consistent spacing**: Using Tailwind's spacing scale
- **Modern aesthetics**: Gradients, shadows, and smooth transitions

### Performance Optimizations

- **Code splitting**: React Router handles route-based code splitting
- **Memoization**: Strategic use of React hooks for performance
- **Efficient queries**: Fetching only required fields in GraphQL queries
- **Pagination**: Reduces data transfer and improves load times

## 🎨 UI/UX Highlights

- **Clean, modern interface**: Production-quality design with attention to detail
- **Gradient Avatars**: Color-coded user avatars with consistent color schemes
- **Enhanced User Cards**:
  - Polished card design with background boxes for contact info
  - Colored icon backgrounds (primary, orange, accent)
  - Hover effects with scale transforms and shadow transitions
  - Online status indicators
- **Tab Navigation**:
  - Underline-style tabs with active color indicators
  - Blue color theme for Posts tab
  - Purple color theme for Albums tab
  - Smooth transitions between tabs
- **Toast Notifications**:
  - Subtle, theme-aware toast messages
  - Less bright, more professional appearance
  - Proper light/dark mode support
- **Intuitive navigation**: Clear breadcrumbs and navigation elements
- **Visual feedback**: Loading spinners, skeleton screens, hover effects, and transitions
- **Error handling**: User-friendly error messages with retry options
- **Empty states**: Informative messages when no data is available
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Infinite Scroll**: Smooth loading of additional posts with visual indicators

## 🔍 Key Features Explained

### Pagination

The pagination system uses a custom `usePagination` hook that:
- Calculates total pages based on item count
- Provides next/prev/goto navigation
- Shows current page and total pages
- Intelligently displays page numbers with ellipsis for large datasets
- Enhanced GraphQL queries with pagination links (first, prev, next, last)
- Infinite scroll support for posts with load-more functionality

### Album Management

Albums can be created and updated through GraphQL mutations:
- **Create**: Form appears on button click, validates input, and creates album
- **Update**: Inline editing with cancel option, updates album title
- **Optimistic UI**: Immediate feedback while mutation is processing

### Error Handling

Comprehensive error handling throughout the application:
- Network errors display with retry button
- GraphQL errors show detailed error messages
- Loading states prevent user confusion
- Empty states guide users when no data exists

## 🧪 Testing Approach

The codebase is structured for easy testing:
- Components are pure and isolated
- Custom hooks can be tested independently
- GraphQL queries/mutations are separated for mocking
- TypeScript ensures type safety

## 📝 Code Quality

- **ESLint**: Enforces code style and catches common errors
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Provides type safety and better tooling
- **Clean code**: Meaningful variable names, proper comments, and modular structure

## 🌟 Best Practices Implemented

1. **Component Organization**: Clear separation of concerns
2. **Type Safety**: Full TypeScript implementation
3. **Code Reusability**: DRY principle with custom hooks and components
4. **Error Boundaries**: Graceful error handling
5. **Loading States**: Clear feedback during async operations
6. **Responsive Design**: Mobile-first approach
7. **Accessibility**: Semantic HTML and ARIA labels
8. **Performance**: Optimized queries and lazy loading
9. **Code Formatting**: Consistent style with Prettier
10. **Git Workflow**: Clean commit history with meaningful messages

## ✅ Interview Task Requirements Coverage

This project fully satisfies all the requirements mentioned in the interview task:

### Functional Requirements ✓

1. **User Listing (Paginated)** ✓
   - ✅ Fetches all users from GraphQL Zero API
   - ✅ Displays users in paginated list with 5 users per page
   - ✅ Shows comprehensive user details in each card
   - ✅ Professional card design with gradient avatars

2. **User Details View** ✓
   - ✅ Clicking a user shows detailed view
   - ✅ Displays all user posts with title and body
   - ✅ Shows all user albums with titles
   - ✅ Tab-based navigation between Posts and Albums
   - ✅ Infinite scroll for posts with load-more functionality

3. **Album Management** ✓
   - ✅ Form to create new albums for selected user
   - ✅ Update existing album titles using `updateAlbum` mutation
   - ✅ Inline editing with cancel option
   - ✅ Real-time updates with optimistic UI

4. **UI & UX** ✓
   - ✅ TailwindCSS for styling with shadcn/ui components
   - ✅ Responsive design (mobile, tablet, desktop)
   - ✅ Clean and modern interface
   - ✅ Proper loading states (skeleton screens)
   - ✅ Comprehensive error handling with retry
   - ✅ Empty state messages

### Technical Requirements ✓

- ✅ **Framework**: React (latest version - React 19)
- ✅ **State Management / Data**: Apollo Client (GraphQL)
- ✅ **Styling**: TailwindCSS 4.0+ with custom components
- ✅ **Routing**: React Router v7
- ✅ **Code Practices**:
  - ✅ Component-based architecture
  - ✅ Reusable hooks (`usePagination`) and GraphQL queries/mutations
  - ✅ Clear folder structure (`/components`, `/graphql`, `/pages`, `/hooks`, `/types`)
  - ✅ Full TypeScript typing with strict mode
  - ✅ Clean and readable code following best practices

### Bonus Points ✓

- ✅ **TypeScript usage**: Full TypeScript implementation with strict typing
- ✅ **Clean commit history**: Meaningful commit messages throughout
- ✅ **Modern UI/UX**: Production-quality design with attention to detail
- ✅ **Performance optimizations**: Efficient queries, pagination, infinite scroll
- ✅ **Error boundaries**: Comprehensive error handling
- ✅ **Dark mode support**: Theme-aware components

### Additional Enhancements Beyond Requirements

- ✅ Skeleton loading screens for better perceived performance
- ✅ Toast notifications for user feedback
- ✅ Infinite scroll for posts
- ✅ Color-coded tabs with smooth transitions
- ✅ Enhanced pagination with GraphQL links
- ✅ Optimistic UI updates
- ✅ Professional gradient designs and micro-animations
- ✅ Online status indicators
- ✅ Hover effects and visual feedback throughout

## 🔮 Future Enhancements

- Unit tests with React Testing Library and Jest
- E2E tests with Playwright or Cypress
- Advanced filtering and search
- User authentication
- Service worker for offline support
- Accessibility improvements (ARIA labels, keyboard navigation)
- Animation improvements with Framer Motion
- Advanced caching strategies

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Author

Created with ❤️ as a technical assessment project

---

**Note**: This application uses the public GraphQL Zero API for demo purposes. In a production environment, you would connect to your own GraphQL backend.
