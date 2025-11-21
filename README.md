# WakeWatch

A comprehensive cross-platform mobile app for sleep tracking and wellness monitoring, built with Expo and React Native.

## 🏗️ Architecture Overview

This project follows a modular, scalable architecture designed for phase-by-phase development:

### 📁 Project Structure

```
WakeWatch/
├── app.json                    # Expo app configuration
├── src/                        # Source code
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Generic components (Button, Input)
│   │   └── auth/               # Auth-specific components
│   │
│   ├── screens/                # Full page components
│   │   ├── auth/               # Authentication screens
│   │   │   ├── SignupScreen/   # ✅ PHASE 1: Complete signup flow
│   │   │   ├── LoginScreen/    # 🔄 PHASE 2: Login implementation
│   │   │   └── ForgotPassword/ # 🔄 PHASE 2: Password reset
│   │   │
│   │   ├── main/               # 🔄 FUTURE: Main app screens
│   │   └── common/             # Shared screens (Loading, Error)
│   │
│   ├── services/               # External service integrations
│   │   ├── supabase/           # Supabase client & config
│   │   └── auth/               # Authentication services
│   │
│   ├── contexts/               # React context providers
│   │   ├── AuthContext.tsx     # Global auth state
│   │   └── ThemeContext.tsx    # Theme management
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.ts          # Authentication hook
│   │
│   ├── utils/                  # Utility functions
│   │   └── validation/         # Form validation logic
│   │
│   └── navigation/             # App navigation
│       ├── AppNavigator.tsx    # Main navigation
│       └── AuthNavigator.tsx   # Auth flow navigation
│
├── public/                     # Public assets
└── docs/                       # Documentation
```

## 🎯 Phase 1: Authentication Foundation

**Status: ✅ Complete**

### Features Implemented
- **Signup Screen**: Complete email/password signup flow
- **Form Validation**: Real-time validation with password strength indicator
- **Social Login**: Google and Facebook OAuth integration (UI ready)
- **Component Library**: Reusable Button, Input, and auth components
- **Navigation**: Authentication flow navigation structure
- **State Management**: Auth context with Supabase integration
- **Theme System**: Light/dark theme support

### Key Components
- `SignupScreen`: Main signup page with form validation
- `SignupForm`: Reusable form component with validation
- `SocialLogin`: Social authentication buttons
- `PasswordStrengthIndicator`: Real-time password validation
- `AuthContext`: Global authentication state management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

1. **Clone and setup**:
   ```bash
   cd wakewatch
   npm install
   ```

2. **Environment Setup**:
   Create `.env` file:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start Development**:
   ```bash
   npm start
   # or for web specifically
   npm run web
   ```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Email authentication
3. Configure OAuth providers (Google, Facebook)
4. Update environment variables

### Expo Configuration
- Cross-platform builds (iOS, Android, Web)
- Automatic PWA generation for web builds
- Responsive design for all devices

## 📱 Current Features

### ✅ Implemented (Phase 1)
- User registration with email/password
- Real-time form validation
- Password strength indicator
- Social login UI (Google, Facebook)
- Responsive design
- Loading states and error handling
- Theme system (light/dark)

### 🔄 Coming Next (Phase 2)
- Login screen implementation
- Password reset functionality
- Email verification flow
- Dashboard and main app screens
- User profile management

## 🏛️ Architecture Principles

### Component Design
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Common components are abstracted and reusable
- **Type Safety**: Full TypeScript support with proper typing
- **Accessibility**: ARIA labels and accessibility features

### State Management
- **Context API**: Global state management for auth and theme
- **Local State**: Component-level state for forms and UI
- **Hooks**: Custom hooks for business logic abstraction

### Validation Strategy
- **Client-side Validation**: Real-time feedback for better UX
- **Server-side Validation**: Supabase handles backend validation
- **Type Safety**: TypeScript ensures type-safe validation

## 🔐 Security

- Password strength requirements enforced
- Input sanitization and validation
- Secure authentication with Supabase
- OAuth integration for social login
- Environment variable protection

## 🎨 Design System

### Colors
- Primary: `#007AFF` (iOS Blue)
- Secondary: `#5856D6` (Purple)
- Success: `#34C759` (Green)
- Error: `#FF3B30` (Red)
- Warning: `#FF9500` (Orange)

### Typography
- System fonts for platform consistency
- Responsive font sizes
- Consistent font weights

### Spacing
- 4px base unit system
- Consistent margins and padding
- Responsive spacing

## 📈 Development Roadmap

### Phase 1: ✅ Authentication Foundation
- Signup screen with validation
- Component library
- Navigation structure
- Theme system

### Phase 2: 🔄 Core Authentication
- Login screen
- Password reset
- Email verification
- Error handling improvements

### Phase 3: 🔄 Main Application
- Dashboard implementation
- User profile
- Settings screen
- Navigation improvements

### Phase 4: 🔄 Advanced Features
- Sleep tracking features
- Data visualization
- Notifications
- Offline support

## 🧪 Testing Strategy

### Unit Testing
- Component testing with Jest
- Utility function testing
- Validation logic testing

### Integration Testing
- Authentication flow testing
- Navigation testing
- API integration testing

### E2E Testing
- User flow testing
- Cross-browser testing
- Mobile responsiveness testing

## 📚 Documentation

- **Architecture**: Detailed system design documentation
- **Components**: Component API documentation
- **Development**: Setup and development guides
- **Deployment**: Production deployment instructions

## 🤝 Contributing

1. Follow the established architecture patterns
2. Maintain component separation of concerns
3. Add proper TypeScript typing
4. Include comprehensive comments
5. Test new features thoroughly

## 📄 License

MIT License - see LICENSE file for details

---

**Built with**: React Native, Expo, TypeScript, Supabase, React Navigation
