# Overview

YEYAKBOT is a static website MVP for a Korean small business service that converts missed phone calls into appointments. The website serves as a marketing landing page with two primary conversion paths: a 3-minute setup form and a 20-minute demo booking system. The project is built as a performance-optimized, mobile-first static site using pure HTML5, CSS3, and vanilla JavaScript without any frameworks.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes (August 2025)

- **Performance Optimization Complete**: All legal documents simplified to lightweight 6-section format
- **Analytics Enhancement**: GA4 tracking code minified with dynamic URL configuration for easy deployment 
- **Mobile CTA Optimization**: Sticky mobile conversion bar implemented for enhanced mobile user experience
- **Fallback Links Updated**: Simplified Korean text format ("안 보이면 여기에서 열기") across all forms
- **404 Page Optimized**: Ultra-minimal 5-line format for improved performance
- **User Satisfaction**: User expressed satisfaction with results (August 16, 2025) - project ready for production deployment

# System Architecture

## Frontend Architecture
- **Pure Static Approach**: Built entirely with vanilla HTML5, CSS3, and JavaScript without any frameworks (React, Vue, Bootstrap explicitly avoided)
- **Mobile-First Design**: Responsive design prioritizing mobile experience with breakpoints, flexible layouts, and sticky mobile CTA bar
- **Performance Optimization**: Focused on Core Web Vitals with target LCP < 2.0s and CLS approaching 0
- **Component Structure**: Modular CSS with optimized system font stack (no external fonts), 1100px max container width, and 3-column responsive grid cards

## Page Structure
- **Landing Page** (`index.html`): Hero section with dual CTAs, benefit cards, customer results section, pricing display, FAQ section, and service sections
- **Booking Page** (`booking.html`): Enhanced Google Forms integration with loading states and error handling
- **Demo Page** (`demo.html`): Enhanced Calendly widget integration with loading states and fallback contact options
- **Legal Pages** (`privacy.html`, `terms.html`): Comprehensive privacy policy and terms of service with guarantee clauses
- **Error Handling**: Custom 404 page with auto-redirect to home
- **Navigation**: Enhanced header with KakaoTalk channel and phone contact options, plus sticky mobile CTA bar for conversions

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
- **Logo Graphics**: Professional PNG logo with Korean typography
- **Favicons**: High-quality PNG favicon for all browsers
- **Social Images**: PNG OG image optimized for social media sharing
- **Icons**: SVG icons for optimal performance and scalability
- **CSS Architecture**: Single stylesheet with modular sections for maintainability
- **Total Size**: Core files under 64KB (excluding images)

## Accessibility Features
- **ARIA Labels**: Proper labeling for all interactive elements
- **Keyboard Navigation**: Focus styles and keyboard accessibility
- **Color Contrast**: Sufficient contrast ratios throughout the design
- **Semantic HTML**: Proper heading hierarchy and semantic markup

# External Dependencies

## Form Services
- **Google Forms**: 8-field booking form with Korean business-specific questions (name, contact, business type, location, inquiry type, budget, call time, notes)
- **Form Error Handling**: Professional loading states with fallback contact options (KakaoTalk/phone)
- **UTM Integration**: Forms configured to receive and track UTM parameters

## Scheduling Service
- **Calendly**: 20-minute demo booking with Google Meet integration
- **Custom Questions**: Business-specific intake (company, industry, monthly inquiries, missed time periods)
- **Error Handling**: Loading states with fallback contact options
- **Confirmation**: Redirect to yeyakbot.com homepage after booking

## Social Media Integration
- **Kakao Channel**: Placeholder integration for Korean messaging platform (pf.kakao.com/_yeyakbot)
- **Social Sharing**: Open Graph and Twitter Card meta tags for social media sharing

## Analytics and Tracking
- **UTM Parameters**: Support for standard UTM tracking (source, medium, campaign, term, content)
- **localStorage**: Client-side UTM parameter persistence across sessions
- **Google Analytics 4**: Ready-to-configure GA4 implementation with comprehensive CTA click tracking (booking, demo, KakaoTalk, phone calls)
- **Site Verification**: Placeholder meta tags for Google Search Console and Naver verification

## CDN and Hosting
- **Static Hosting**: Designed for deployment on static hosting platforms
- **Domain Configuration**: Configured for yeyakbot.com domain with proper canonical URLs
- **Performance**: Optimized for CDN delivery with minimal external dependencies