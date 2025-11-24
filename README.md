# CodePairArena Frontend 🎨

A modern, feature-rich frontend for a competitive programming platform built with Next.js 15. Features a Monaco-based code editor, real-time code execution, problem browsing, user authentication, and a beautiful UI powered by Tailwind CSS and shadcn/ui.

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-installation--setup">Installation</a> •
  <a href="#-key-pages">Key Pages</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

<div id="-features">

## 🚀 Features

### Code Editor Experience
-   **Monaco Editor Integration**: Full-featured code editor (VS Code engine)
    -   Syntax highlighting for Python, JavaScript, Java, C++
    -   IntelliSense and auto-completion
    -   Customizable themes (including custom "Chai" theme)
    -   Line numbers, code folding, and smooth cursor animations
-   **Multi-Language Support**: Switch between languages with preserved code snippets
-   **Resizable Panels**: Drag-to-resize problem description, editor, and test results
-   **Real-Time Execution**: Run code against test cases with instant feedback

### Problem Solving Interface
-   **Split-View Layout**: 
    -   Left: Problem description, editorial, submissions, solutions
    -   Right: Code editor and test results
-   **Interactive Test Cases**: 
    -   View and edit test case inputs/outputs
    -   Run code against visible test cases
    -   See detailed results (pass/fail, execution time, memory usage)
-   **Submission System**:
    -   Submit solutions with real-time status updates
    -   View submission history with filtering
    -   Detailed submission results dialog

### User Experience
-   **Authentication**: 
    -   Email/Password login and registration
    -   OAuth support (Google, GitHub) via Clerk
    -   Protected routes and session management
-   **Responsive Design**: Mobile-first, works seamlessly on all devices
-   **Dark Mode**: Beautiful dark theme optimized for coding
-   **Animations**: Smooth transitions with Framer Motion
-   **Loading States**: Custom loaders for better UX

### UI Components
-   **shadcn/ui Library**: 28+ pre-built, accessible components
-   **Custom Components**:
    -   Resizable panels for flexible layouts
    -   Code block with syntax highlighting
    -   Custom loaders and sparkle effects
    -   Tabs, dialogs, dropdowns, and more

</div>

<div id="-tech-stack">

## 🛠️ Tech Stack

### Core Framework
-   **[Next.js 15](https://nextjs.org/)**: React framework with App Router
-   **[React 19](https://react.dev/)**: Latest React with concurrent features
-   **[Turbopack](https://turbo.build/)**: Ultra-fast bundler for development

### Code Editor
-   **[@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)**: Monaco Editor wrapper
-   **[monaco-editor](https://microsoft.github.io/monaco-editor/)**: VS Code's editor engine

### UI & Styling
-   **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework
-   **[shadcn/ui](https://ui.shadcn.com/)**: Re-usable component library
-   **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible component primitives
-   **[Framer Motion](https://www.framer.com/motion/)**: Animation library
-   **[Lucide React](https://lucide.dev/)**: Beautiful icon library
-   **[@tabler/icons-react](https://tabler.io/icons)**: Additional icon set

### State Management & Forms
-   **[Zustand](https://zustand-demo.pmnd.rs/)**: Lightweight state management
-   **[React Hook Form](https://react-hook-form.com/)**: Performant form handling
-   **[Zod](https://zod.dev/)**: TypeScript-first schema validation

### Authentication
-   **[@clerk/nextjs](https://clerk.com/)**: Complete authentication solution

### Additional Libraries
-   **[Axios](https://axios-http.com/)**: HTTP client for API calls
-   **[Sonner](https://sonner.emilkowal.ski/)**: Toast notifications
-   **[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)**: Resizable panel groups
-   **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)**: Code syntax highlighting
-   **[tsparticles](https://particles.js.org/)**: Particle effects

</div>

<div id="-project-structure">

## 📂 Project Structure

```
CodePairArena-Frontend/
├── src/
│   ├── app/
│   │   ├── (with-navbar)/          # Routes with navbar layout
│   │   ├── components/             # App-specific components
│   │   │   └── Navbar.jsx
│   │   ├── login/                  # Login page
│   │   ├── register/               # Registration page
│   │   ├── profile/                # User profile page
│   │   ├── problems/
│   │   │   └── [id]/               # Dynamic problem page
│   │   │       ├── page.js         # Main problem solver interface
│   │   │       ├── Description.jsx # Problem description component
│   │   │       ├── RunCodeResults.jsx # Test results display
│   │   │       ├── Submission.jsx  # Submission history
│   │   │       └── chaiTheme.json  # Custom Monaco theme
│   │   ├── store/                  # Zustand stores
│   │   │   ├── useAuthStore.js     # Authentication state
│   │   │   └── useProblemStore.js  # Problem & execution state
│   │   ├── providers/              # Context providers
│   │   ├── globals.css             # Global styles
│   │   ├── layout.js               # Root layout
│   │   └── page.js                 # Landing page
│   ├── components/
│   │   └── ui/                     # shadcn/ui components (28 components)
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── resizable.jsx
│   │       ├── tabs.jsx
│   │       ├── loader.jsx
│   │       └── ... (23 more)
│   └── lib/
│       └── utils.js                # Utility functions
├── public/                         # Static assets
│   ├── main_logo.jpeg
│   ├── defaultUser.svg
│   └── ... (icons and images)
├── components.json                 # shadcn/ui configuration
├── tailwind.config.js              # Tailwind configuration
├── next.config.mjs                 # Next.js configuration
└── package.json                    # Dependencies
```

</div>

<div id="-installation--setup">

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arush73/CodePairArena-Frontend.git
    cd CodePairArena-Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

<!-- 3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    # Backend API
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
    
    # Clerk Authentication (Optional)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    
    # Clerk URLs
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/problems
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/problems
    ``` -->

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`

4.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

</div>

<div id="-key-pages">

## 📄 Key Pages & Routes

### Landing Page (`/`)
-   Hero section with animated elements
-   Platform statistics (3.5k+ problems, 120k+ users)
-   Feature highlights (Real-time Editor, Contests, Collaborative Rooms)
-   Testimonials and call-to-action
-   Responsive navbar with authentication links

### Problem Solver (`/problems/[id]`)
-   **Three-panel layout**:
    1. **Left Panel**: Tabs for Description, Editorial, Submissions, Solutions
    2. **Top-Right Panel**: Monaco code editor with language selector
    3. **Bottom-Right Panel**: Test cases and execution results
-   **Features**:
    -   Run code against test cases
    -   Submit solutions
    -   View detailed results (time, memory, pass/fail)
    -   Switch between programming languages
    -   Resizable panels for custom layout

### Authentication
-   `/login`: User login page
-   `/register`: User registration page
-   `/profile`: User profile management

### Other Routes
-   `/problems`: Problem listing (with navbar)
-   `/pricing`: Pricing information
-   `/contact`: Contact form

</div>

<div id="-contributing">

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

</div>

## 📄 License

This project is licensed under the MIT License.

---

## 🎨 Design Highlights

-   **Modern Dark Theme**: Optimized for long coding sessions
-   **Gradient Accents**: Indigo and pink gradients for visual appeal
-   **Smooth Animations**: Framer Motion for delightful interactions
-   **Responsive Layout**: Mobile-first design that scales beautifully
-   **Accessible Components**: Built on Radix UI primitives
-   **Custom Monaco Theme**: "Chai" theme for unique editor experience

## 🔗 Related Projects

-   **Backend**: [CodePairArena-Backend](https://github.com/arush73/CodePairArena-Backend)

Built with ❤️ by [Arush Choudhary](https://github.com/arush73)
