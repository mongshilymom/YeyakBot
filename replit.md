# Overview

YEYAKBOT is a static website MVP for a Korean small business service that converts missed phone calls into appointments. The website serves as a marketing landing page with two primary conversion paths: a 3-minute setup form and a 20-minute demo booking system. The project is built as a performance-optimized, mobile-first static site using pure HTML5, CSS3, and vanilla JavaScript without any frameworks.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Pure Static Approach**: Built entirely with vanilla HTML5, CSS3, and JavaScript without any frameworks (React, Vue, Bootstrap explicitly avoided)
- **Mobile-First Design**: Responsive design prioritizing mobile experience with breakpoints and flexible layouts
- **Performance Optimization**: Focused on Core Web Vitals with target LCP < 2.0s and CLS approaching 0
- **Component Structure**: Modular CSS with system font stack, 1100px max container width, and 3-column responsive grid cards

## Page Structure
- **Landing Page** (`index.html`): Hero section with dual CTAs, benefit cards, customer results section, pricing display, and service sections
- **Booking Page** (`booking.html`): Embedded form (Google Forms/Tally) for 3-minute setup process
- **Demo Page** (`demo.html`): Embedded Calendly widget for 20-minute demo scheduling
- **Error Handling**: Custom 404 page with auto-redirect to home
- **Navigation**: Enhanced header with KakaoTalk channel and phone contact options

## SEO and Meta Architecture
- **Structured Data**: JSON-LD Organization and Product schemas for comprehensive business information
- **Open Graph**: Complete OG tag implementation for social media sharing
- **Canonical URLs**: Proper canonical link structure across all pages
- **Sitemap**: XML sitemap covering all main pages
- **Robots.txt**: Configured for full crawling access

## JavaScript Functionality
- **UTM Tracking**: Persistent UTM parameter management using localStorage
- **Header Effects**: Fixed header with scroll-based shadow effects
- **URL Management**: Automatic UTM parameter preservation across page navigation
- **Form Integration**: Dynamic URL injection for embedded forms with UTM preservation

## Asset Management
- **Vector Graphics**: SVG logo optimized to ~2KB with stroke-based design
- **Favicons**: Placeholder SVG favicon (needs ICO conversion for production)
- **Social Images**: SVG OG image at 1200x630px (needs JPG conversion for production)
- **CSS Architecture**: Single stylesheet with modular sections for maintainability
- **Total Size**: Core files under 64KB (excluding images)

## Accessibility Features
- **ARIA Labels**: Proper labeling for all interactive elements
- **Keyboard Navigation**: Focus styles and keyboard accessibility
- **Color Contrast**: Sufficient contrast ratios throughout the design
- **Semantic HTML**: Proper heading hierarchy and semantic markup

# External Dependencies

## Form Services
- **Google Forms**: Primary option for the 3-minute booking form embedding
- **Tally Forms**: Alternative form service option for booking functionality
- **UTM Integration**: Forms configured to receive and track UTM parameters

## Scheduling Service
- **Calendly**: Embedded scheduling widget for 20-minute demo bookings
- **Widget Script**: External Calendly JavaScript widget loaded asynchronously

## Social Media Integration
- **Kakao Channel**: Placeholder integration for Korean messaging platform (pf.kakao.com/_yeyakbot)
- **Social Sharing**: Open Graph and Twitter Card meta tags for social media sharing

## Analytics and Tracking
- **UTM Parameters**: Support for standard UTM tracking (source, medium, campaign, term, content)
- **localStorage**: Client-side UTM parameter persistence across sessions
- **Google Analytics 4**: Ready-to-configure GA4 implementation with CTA click tracking
- **Site Verification**: Placeholder meta tags for Google Search Console and Naver verification

## CDN and Hosting
- **Static Hosting**: Designed for deployment on static hosting platforms
- **Domain Configuration**: Configured for yeyakbot.com domain with proper canonical URLs
- **Performance**: Optimized for CDN delivery with minimal external dependencies