# EventSphere - Event Management Platform

A modern, responsive event management platform built with React.js, featuring dark theme UI/UX, glass morphism effects, and professional 3D animations.

## 🌟 Features

### Core Functionality

- **Event Discovery**: Browse and search through various events
- **Event Categories**: Filter events by Technology, Music, Business, Food & Drink, Arts & Culture, Health & Fitness
- **Event Details**: Comprehensive event information with location maps, registration, and sharing
- **Search & Filter**: Advanced search with category filters, price ranges, and sorting options
- **Registration System**: Complete event registration with form validation
- **Contact System**: Contact form with FAQ section and support information

### Design & UI/UX

- **Dark Theme**: Professional dark theme throughout the application
- **Glass Morphism**: Modern glass effects with backdrop blur
- **3D Elements**: Card hover effects, floating animations, and parallax scrolling
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Modern Typography**: Google Fonts (Poppins, Inter, Roboto)
- **Professional Icons**: Font Awesome icons integration
- **Smooth Animations**: Framer Motion and CSS animations
- **Color Palette**: Beautiful ColorHunt.co palette (Mint, Blue, Cream, Peach)

### Technical Features

- **React Router**: Client-side routing for seamless navigation
- **Component Architecture**: Modular, reusable components
- **State Management**: Local state with React hooks
- **Form Handling**: Controlled forms with validation
- **Loading States**: Professional loading animations
- **Error Handling**: User-friendly error messages
- **SEO Optimized**: Meta tags and semantic HTML

## 🛠️ Technologies Used

- **React.js 19.1.1** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Vite 7.1.2** - Build tool and dev server
- **Font Awesome** - Icons library
- **Google Fonts** - Typography (Poppins, Inter, Roboto)

## 📱 Pages & Components

### Pages

1. **Home** (`/`)

   - Hero section with animated background
   - Featured events showcase
   - Search functionality
   - Features section
   - Testimonials
   - Call-to-action sections

2. **Events** (`/events`)

   - Complete events listing
   - Advanced search and filtering
   - Sorting options (date, name, price, popularity)
   - Category filtering
   - Price range filtering
   - Results pagination and loading states

3. **Event Detail** (`/event/:id`)

   - Full event information
   - Image gallery and venue details
   - Google Maps integration
   - Registration modal
   - Social sharing
   - Organizer information
   - Related events

4. **Contact** (`/contact`)
   - Contact form with validation
   - FAQ section
   - Quick support options
   - Office location map
   - Business hours and contact info

### Components

- **Navbar** - Responsive navigation with glass morphism
- **Footer** - Comprehensive footer with links and newsletter
- **Hero** - Animated hero section with statistics
- **EventCard** - 3D event cards with hover effects
- **SearchBar** - Advanced search with filters
- **LoadingSpinner** - Professional loading animations

## 🎨 Design System

### Color Palette (ColorHunt.co)

- **Mint**: #B1F0F7 - Accent highlights
- **Blue**: #81BFDA - Secondary actions
- **Cream**: #F5F0CD - Warm accents
- **Peach**: #FADA7A - Call-to-action elements
- **Primary Green**: #22c55e - Main brand color
- **Dark Grays**: Slate-900, Slate-800, Gray-900 for backgrounds

### Typography

- **Poppins**: Headings and brand text
- **Inter**: Body text and UI elements
- **Roboto**: Alternative text styling

### Effects & Animations

- **Glass Morphism**: Backdrop blur with transparency
- **3D Transforms**: Card rotations and elevations
- **Floating Elements**: Continuous Y-axis animations
- **Parallax**: Mouse-responsive background movements
- **Glow Effects**: Colored shadows and highlights
- **Smooth Transitions**: 300ms duration for interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd event-management-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Hero.jsx        # Hero section
│   ├── EventCard.jsx   # Event display card
│   ├── SearchBar.jsx   # Search and filter component
│   └── LoadingSpinner.jsx # Loading animation
├── pages/              # Main page components
│   ├── Home.jsx        # Homepage
│   ├── Events.jsx      # Events listing page
│   ├── EventDetail.jsx # Individual event page
│   └── Contact.jsx     # Contact page
├── data/               # Static data and configurations
│   └── events.js       # Event data and categories
├── utils/              # Utility functions
├── assets/             # Static assets
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles and utilities
```

## 🎯 Event Data Structure

Each event includes:

- **Basic Info**: ID, name, date, time, venue, location
- **Details**: Short/full descriptions, category, price
- **Media**: Featured image, gallery
- **Registration**: Capacity, registered count, organizer
- **Location**: Google Maps integration
- **Metadata**: Tags, rating, featured status

## 🔧 Configuration

### Tailwind CSS

- Custom color palette
- Extended animations and keyframes
- Glass morphism utilities
- Responsive breakpoints
- Typography scale

### Vite Configuration

- React plugin setup
- Tailwind CSS integration
- Development server configuration
- Build optimization

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Enhanced layout for medium screens
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Large click targets and gesture support
- **Accessibility**: ARIA labels and keyboard navigation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Performance Features

- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: Responsive images with proper sizing
- **CSS Optimization**: Purged unused styles
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **ColorHunt.co** for the beautiful color palette
- **Unsplash** for high-quality event images
- **Font Awesome** for comprehensive icon library
- **Google Fonts** for typography
- **Tailwind CSS** for utility-first styling

## 📞 Support

For support and questions:

- Email: hello@eventsphere.com
- Phone: +1 (555) 123-4567
- Website: [EventSphere](http://localhost:5173)

---

**EventSphere** - Discover Your Next Experience 🎉+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
