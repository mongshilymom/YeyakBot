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
- **URL Structure Enhancement**: Added /booking and /demo redirect folders for cleaner URLs
- **Form Integration**: Updated placeholder URLs to clear deployment format with Korean instructions
- **Navigation Optimization**: All CTA links updated to use /booking and /demo short URLs
- **JavaScript Tracking**: Updated analytics and UTM tracking to support both long and short URL formats  
- **Booking System Enhancement**: Implemented dual booking system - brand version (iframe embed) and lite version (new window)
- **GA4 Tracking Variants**: Added differentiated tracking - brand_backup, lite variants for conversion analysis
- **Cloudflare Rules**: Prepared priority redirect rules for /booking?lite=1 and /booking-lite routing optimization
- **404 Issue Resolution**: Comprehensive fix for all booking/demo/thank-you routes with proper GA4 tracking
- **Static File Routing**: All pages now work with static files only, Cloudflare rules optional for optimization
- **Booking Lite Optimization**: Implemented ultra-clean 4-line booking-lite.html with addEventListener tracking
- **Backend Service Config**: Environment variables documented for SMTP, Slack, admin authentication integration
- **Backend Implementation**: Express.js server with SQLite database, webhook endpoints, SMTP/Slack notifications
- **Production Ready**: Cloudflare priority rules finalized, backend API running on port 3000 (August 17, 2025)
- **Native Form Implementation**: Replaced Google Forms iframe with responsive native HTML form connected to /api/lead endpoint
- **Complete Form Processing**: Full form submission with loading states, success/error handling, and GA4 conversion tracking
- **Backend API Testing**: Verified /api/lead endpoint with SQLite data storage and proper JSON responses
- **Google Forms Integration**: Added real Google Forms URLs to booking-lite.html and booking-iframe.html
- **Multi-approach Booking**: Created three booking variants - native form (booking.html), iframe embed (booking-iframe.html), lite version (booking-lite.html)
- **GA4 Standardization**: Unified GA4 snippet format across all 8 pages with clear TODO markers for deployment
- **Google Apps Script Integration**: Complete form automation setup with email notifications, backend API, GA4 Measurement Protocol, and Slack alerts
- **Backend API Enhancement**: Updated /api/lead endpoint to handle both native forms and Google Forms webhook data
- **GA4 Event Tracking Comprehensive**: Implemented complete place/variant parameter system across all CTA buttons and interactions
- **Event Tracking System**: Complete GA4 analytics with place parameters (hero/nav/floating) and variant parameters (brand/lite/iframe_backup/open_form)
- **Booking Page Ultra-Optimization**: Complete rewrite to minimal, fast-loading design with embedded Google Forms and optimized CSS
- **Homepage Hero Enhancement**: Integrated ultra-optimized Hero+Deposit+FAQ sections with inline CSS and advanced GA4 tracking
- **Demo Page Advanced Analytics**: Comprehensive GA4 event tracking for Calendly interactions (view, time selection, booking completion)
- **GA4 Lead Tracking Enhancement**: Enhanced lead_submit event tracking with page_location parameter for precise conversion attribution

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

## Backend Services (Optional Integration)
- **SMTP Email**: Gmail SMTP for automated booking notifications (founder@yeyakbot.com)
- **Slack Webhooks**: Real-time team notifications for new bookings and demos
- **Admin Authentication**: Token-based access control for management dashboard
- **Environment Variables**: Comprehensive configuration for production deployment

## Social Media Integration
- **Kakao Channel**: Placeholder integration for Korean messaging platform (pf.kakao.com/_yeyakbot)
- **Social Sharing**: Open Graph and Twitter Card meta tags for social media sharing

## Analytics and Tracking
- **UTM Parameters**: Support for standard UTM tracking (source, medium, campaign, term, content)
- **localStorage**: Client-side UTM parameter persistence across sessions
- **Google Analytics 4**: Ready-to-configure GA4 implementation with comprehensive CTA click tracking (booking, demo, KakaoTalk, phone calls)
- **Site Verification**: Placeholder meta tags for Google Search Console and Naver verification

## CDN and Hosting
- **Static Hosting**: Designed for deployment on static hosting platforms with optional backend integration
- **Domain Configuration**: Configured for yeyakbot.com domain with proper canonical URLs
- **Cloudflare Integration**: Priority redirect rules for optimal routing and caching
- **Performance**: Optimized for CDN delivery with minimal external dependencies