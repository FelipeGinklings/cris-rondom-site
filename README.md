# Cris Rondon - Website & Management System

A professional website and client management system built with React, TypeScript, and Supabase. This application combines a public-facing portfolio with a private administrative dashboard for managing clients, consultations, and anamnesis records.

## 🚀 Features

### Public Website

-   **Portfolio Homepage**: Professional presentation with sections for:
    -   About
    -   Services
    -   Location
    -   Additional information
-   **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

### Administrative Dashboard (Protected)

-   **Authentication**: Secure login system powered by Supabase
-   **Client Management**: Add, edit, and view client information
-   **Calendar System**:
    -   Visual calendar interface for scheduling
    -   Daily consultation tracking
    -   Detailed day views with consultation history
-   **Anamnesis Records**: Create and view detailed client anamnesis
-   **PDF Generation**: Export consultation and anamnesis data to PDF format

## 🛠️ Tech Stack

-   **Frontend Framework**: React 18.3.1
-   **Language**: TypeScript 5.5.3
-   **Build Tool**: Vite 5.4.2
-   **Routing**: React Router DOM 7.9.5
-   **Backend/Database**: Supabase 2.57.4
-   **Styling**: Tailwind CSS 3.4.1
-   **PDF Generation**: jsPDF 3.0.4 + html2canvas 1.4.1
-   **Icons**: Lucide React 0.344.0

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/FelipeGinklings/cris-rondom-site
    cd cris-rondon-site
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure Supabase**

    - Create a `.env` file in the root directory
    - Add your Supabase credentials:
        ```env
        VITE_SUPABASE_URL=your_supabase_url
        VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```

4. **Run database migrations**
    - Apply the migrations in the `supabase/migrations/` folder to your Supabase project

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
cris-rondon-site/
├── src/
│   ├── components/          # React components
│   │   ├── portifolio/     # Public website components
│   │   └── *.tsx           # Dialog components for admin features
│   ├── constants/          # App constants (colors, paths)
│   ├── contexts/           # React contexts (Auth)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries (Supabase, PDF)
│   └── pages/              # Page components
├── supabase/
│   └── migrations/         # Database migration files
└── public/                 # Static assets
```

## 🔐 Authentication

The application uses Supabase Authentication. Protected routes include:

-   `/calendar` - Calendar view
-   `/clients` - Client management
-   `/calendar/:date` - Day details view

Public routes:

-   `/home` - Portfolio homepage
-   `/login` - Login page

## 📄 Database Schema

The application uses the following main tables:

-   `clients` - Client information
-   `day_entries` - Daily consultation entries
-   `anamnesis` - Client anamnesis records

## 🎨 Customization

Color schemes and styling can be customized in:

-   `src/constants/colors.ts` - Application color palette
-   `tailwind.config.js` - Tailwind CSS configuration
-   `src/index.css` - Global styles

## 📝 License

Private project for Cris Rondon.

## 👥 Contributors

-   Developed as part of Univali Web Development coursework (Fase 4)

## 🔗 Deployment

The project is configured for deployment on Vercel (see `vercel.json`).

To deploy:

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel
```

## 📞 Support

For questions or issues, please contact the development team.
