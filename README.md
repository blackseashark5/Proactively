# ProVital - Lifestyle Medicine Landing Page

A modern, responsive landing page for ProVital, a lifestyle medicine platform that connects patients with healthcare experts specializing in evidence-based lifestyle interventions. Built with React, TypeScript, and SCSS following pixel-perfect Figma designs.

![ProVital Landing Page](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🌟 Project Overview

ProVital is a comprehensive healthcare platform that focuses on the six pillars of lifestyle medicine: nutrition, physical activity, restorative sleep, stress management, social connection, and substance abuse prevention. This landing page showcases these pillars through an interactive, accessible, and performance-optimized web experience.

## ✨ Features Implemented

### 🎯 Core Requirements (Figma 1:1 Implementation)

#### **Responsive Design**
- ✅ **Mobile-First Approach**: Breakpoints at 320px, 480px, 768px, 1024px, 1440px
- ✅ **Pixel-Perfect Implementation**: Exact match to Figma designs for both desktop and mobile
- ✅ **Fluid Typography**: Responsive font scaling and spacing

#### **Hero Section**
- ✅ **Desktop Layout**: 3×2 masonry image grid with search functionality
- ✅ **Mobile Carousel**: Infinite scrolling carousel (right-to-left) showing 3 images
- ✅ **Search Interface**: Three-field search (condition, location, insurance) with "Find now" CTA
- ✅ **WebP Image Optimization**: Modern image formats with fallbacks

#### **Header & Navigation**
- ✅ **Desktop Navigation**: Logo left-aligned, navigation items right-aligned
- ✅ **Mobile Menu**: Hamburger menu with full-screen overlay
- ✅ **Login/Signup Dropdown**: Doctor and Patient options linking to respective routes
- ✅ **React Router Integration**: All navigation uses `NavLink` with active states

#### **Six Pillars Section**
- ✅ **Tab Interface**: Horizontal pill-style tabs for each pillar
- ✅ **Card Carousel**: Desktop shows 3 cards with navigation arrows
- ✅ **Mobile Swipe**: Touch-enabled carousel with swipe gestures
- ✅ **Smooth Animations**: 300ms fade transitions and 500ms slide animations

#### **Styling Architecture**
- ✅ **Pure SCSS**: No CSS libraries, modular BEM structure
- ✅ **CSS Custom Properties**: Theme variables for colors and spacing
- ✅ **Responsive Mixins**: Reusable breakpoint mixins

### 🚀 Enhanced Features (Bonus Implementations)

#### **Accessibility (WCAG 2.1 AA Compliant)**
- ✅ **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, `<article>`
- ✅ **ARIA Support**: Complete ARIA roles, states, and properties
- ✅ **Focus Management**: Focus trapping in modals, keyboard navigation
- ✅ **Screen Reader Support**: Live announcements for dynamic content

#### **Dark Mode Toggle**
- ✅ **System Preference Detection**: Respects user's OS theme preference
- ✅ **Manual Toggle**: Theme switcher in header
- ✅ **Persistent Storage**: Remembers user preference across sessions

#### **PWA Support**
- ✅ **Service Worker**: Offline caching for core assets
- ✅ **Web App Manifest**: Installable app experience
- ✅ **Meta Tags**: Complete PWA meta configuration

#### **Performance Optimizations**
- ✅ **Code Splitting**: `React.lazy` and `Suspense` for route-based splitting
- ✅ **Image Optimization**: WebP format with lazy loading
- ✅ **Debounced Events**: Optimized resize and scroll handlers
- ✅ **Bundle Analysis**: Optimized chunk sizes

#### **Internationalization (i18n)**
- ✅ **Multi-Language Support**: English and Spanish translations
- ✅ **React-i18next Integration**: Dynamic language switching
- ✅ **Language Toggle**: Flag-based language selector

#### **Testing Suite**
- ✅ **Unit Tests**: Jest and React Testing Library
- ✅ **Component Testing**: Header, Carousel, Pillars components
- ✅ **Hook Testing**: Custom hooks with comprehensive coverage
- ✅ **Accessibility Testing**: ARIA compliance verification

#### **SEO Optimization**
- ✅ **React Helmet**: Dynamic meta tag management
- ✅ **Open Graph Tags**: Social media sharing optimization
- ✅ **Structured Data**: Semantic markup for search engines

## 🛠️ Technical Implementation

### **Component Architecture**
```
src/
├── components/
│   ├── Header/
│   │   └── Header.tsx           # Navigation with dropdowns
│   ├── Hero/
│   │   ├── Hero.tsx            # Main hero section
│   │   └── ImageCarousel.tsx   # Infinite carousel component
│   ├── Pillars/
│   │   └── Pillars.tsx         # Six pillars with tabs/carousel
│   ├── Auth/
│   │   └── LoginPage.tsx       # Login forms for doctors/patients
│   ├── shared/
│   │   ├── LoadingSpinner.tsx  # Reusable loading component
│   │   ├── ThemeToggle.tsx     # Dark mode switcher
│   │   ├── LanguageToggle.tsx  # i18n language selector
│   │   └── SEOHead.tsx         # Dynamic meta tags
│   └── hooks/
│       ├── useSwipeable.ts     # Touch gesture handling
│       ├── usePillarsCarousel.ts # Carousel state management
│       └── useDebounce.ts      # Performance optimization
```

### **Styling Architecture**
```
src/styles/
├── main.scss                   # Global styles and variables
├── components/
│   ├── _header.scss           # Header-specific styles
│   ├── _hero.scss             # Hero section styles
│   └── _pillars.scss          # Pillars section styles
```

### **Key Features Breakdown**

#### **Infinite Carousel Implementation**
- **Triple Image Array**: Creates seamless infinite loop
- **Touch Gestures**: Swipe left/right with configurable thresholds
- **Auto-advance**: 3-second intervals with pause on hover
- **Accessibility**: ARIA live regions and keyboard navigation

#### **Tab System with Auto-advance**
- **Smooth Transitions**: CSS keyframe animations
- **Auto-rotation**: 5-second intervals through all tabs
- **Pause on Interaction**: Stops auto-advance when user interacts
- **Keyboard Navigation**: Arrow keys for tab switching

#### **Responsive Image Grid**
- **Desktop Masonry**: CSS Grid with custom positioning
- **Mobile Carousel**: Horizontal scroll with snap points
- **Performance**: Lazy loading and WebP optimization

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Modern browser with ES2020 support

### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/provital-landing-page.git
cd provital-landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run test suite
npm run test:coverage # Run tests with coverage report
npm run test:ui      # Run tests with UI interface
```

## 🧪 Testing

### **Test Coverage**
Our comprehensive test suite covers:

- **Component Rendering**: All major components render correctly
- **User Interactions**: Click, hover, keyboard, and touch events
- **Accessibility**: ARIA attributes and keyboard navigation
- **Carousel Logic**: Infinite loop, auto-advance, and swipe gestures
- **Tab Switching**: State management and animations
- **Custom Hooks**: Swipe detection and carousel state

### **Running Tests**
```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### **Coverage Targets**
- **Statements**: 85%+
- **Branches**: 80%+
- **Functions**: 85%+
- **Lines**: 85%+

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score 90+ across all metrics

## 🎨 Design System

### **Color Palette**
- **Primary Teal**: `#4A90A4` - Main brand color
- **Primary Orange**: `#F4A261` - Accent color
- **Text Dark**: `#2D3748` - Primary text
- **Text Light**: `#718096` - Secondary text
- **Success Green**: `#48BB78` - Success states

### **Typography**
- **Font Stack**: System fonts for optimal performance
- **Scale**: Modular scale with responsive sizing
- **Line Heights**: 150% for body, 120% for headings

### **Spacing System**
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Consistent Application**: All spacing uses the scale

## 🔧 Configuration

### **Environment Variables**
```bash
VITE_APP_TITLE=ProVital
VITE_APP_DESCRIPTION=Lifestyle Medicine Experts
```

### **Build Configuration**
- **Vite**: Modern build tool with HMR
- **TypeScript**: Full type safety
- **SCSS**: Advanced styling capabilities
- **ESLint**: Code quality enforcement

## 📈 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 200KB gzipped

## 🌐 Deployment

### **Production Build**
```bash
npm run build
```

### **Deployment Platforms**
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: CloudFront CDN integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design**: Based on Figma designs for ProVital
- **Images**: Courtesy of Pexels photographers
- **Icons**: Lucide React icon library
- **Fonts**: System font stack for performance

---

**Built with ❤️ using React, TypeScript, and SCSS**

For questions or support, please open an issue or contact the development team.