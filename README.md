# Taskify - Task Manager Frontend

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing tasks with features like drag-and-drop functionality, real-time updates, analytics, and calendar integration.

## 🚀 Live Demo

**Frontend Application:** [https://task.greenhacker.tech](https://task.greenhacker.tech)

**GitHub Repository:** [https://github.com/GreenHacker420/task-manager-frontend](https://github.com/GreenHacker420/task-manager-frontend)

## ✨ Features

- **Task Management**: Create, edit, delete, and organize tasks with priorities and categories
- **Drag & Drop**: Intuitive drag-and-drop interface for task status updates
- **Real-time Updates**: Live synchronization with backend API
- **Analytics Dashboard**: Visual insights into task completion and productivity
- **Calendar Integration**: Calendar view for deadline management
- **User Authentication**: Secure login/registration with Google OAuth support
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Advanced Filtering**: Filter tasks by status, priority, category, and tags
- **Search Functionality**: Quick search across all tasks
- **Profile Management**: User profile and settings customization

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Drag & Drop**: React DnD
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Deployment**: Netlify (Frontend) + Railway (Backend)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/GreenHacker420/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.development` file in the root directory:

```bash
cp .env.example .env.development
```

Update the environment variables in `.env.development`:

```env
# API Configuration
VITE_API_URL=http://localhost:5001/api

# Google OAuth (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm start` - Start preview server

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── dashboard/      # Dashboard-specific components
│   └── sidebar/        # Sidebar components
├── contexts/           # React contexts (Auth, Theme)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## 🚀 Deployment

### Netlify Deployment (Recommended)

This project is configured for automatic deployment on Netlify:

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Set production environment variables in Netlify dashboard
4. **Deploy**: Automatic deployment on every push to main branch

### Docker Deployment

Build and run with Docker:

```bash
# Build Docker image
docker build -t task-manager-frontend .

# Run container
docker run -p 80:80 task-manager-frontend
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5001/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `VITE_DEBUG_MODE` | Enable debug mode | `false` |

**Note**: For production deployment, create a `.env.production` file with your production values. This file should never be committed to version control.

### Backend Integration

This frontend is designed to work with the Task Manager Backend API. Make sure the backend is running and accessible at the URL specified in `VITE_API_URL`.

**Backend Repository**: [https://github.com/GreenHacker420/task-manager-server](https://github.com/GreenHacker420/task-manager-server)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**GreenHacker**
- GitHub: [@GreenHacker420](https://github.com/GreenHacker420)
- Website: [https://task.greenhacker.tech](https://task.greenhacker.tech)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
