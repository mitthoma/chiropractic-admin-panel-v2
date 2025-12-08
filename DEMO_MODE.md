# Demo Mode Feature

## Overview

The Chiropractic Admin Panel v2 has been enhanced with a beautiful demo mode feature for client presentations. The application now features a modern, clean medical SaaS design with a professional sky-blue color scheme.

## Features Implemented

### 1. **Demo Mode Login**

- Added a "Start Demo Mode" button on the login screen
- Users can easily switch between regular login and demo mode
- No Firebase authentication required for demo users

### 2. **Comprehensive Demo Data**

Includes complete sample data for all major entities:

- **5 Patients** with full demographics, contact info, and medical details
- **8 Patient Complaints** with pain levels and descriptions
- **5 Treatment Notes** with vitals, room assignments, and doctor observations
- **3 Exam Reports** with comprehensive assessments
- **Settings Data**: 9 rooms, 15 treatment options, 8 treatment methods, 8 treatment plan templates

See [DEMO_DATA.md](./DEMO_DATA.md) for complete details on all sample data.

### 3. **Three Pre-configured Demo Accounts**

The following demo accounts are available:

1. **Dr. Sarah Mitchell**
   - Email: `dr.sarah.mitchell@demo.com`
   - Role: Administrator
2. **Dr. James Anderson**
   - Email: `dr.james.anderson@demo.com`
   - Role: Administrator
3. **Dr. Emily Chen**
   - Email: `dr.emily.chen@demo.com`
   - Role: Administrator

### 3. **Enhanced UI/UX**

- **Login Screen**: Modern gradient background with elegant card design
- **Demo User Selection**: Interactive cards with hover effects and selection states
- **Navigation**: Clean sidebar with smooth transitions
- **App Bar**: Professional header with demo mode indicator chip
- **Color Scheme**: Medical-appropriate sky blue (`#0ea5e9`) as primary color
- **Typography**: Material Design typography with Roboto font family
- **Dark Mode**: Fully functional dark theme with proper color contrast
- **Material Design**: Consistent spacing, elevation, and component styling throughout

### 4. **Demo Mode Indicator**

- A green "Demo Mode" chip appears in the app bar when using a demo account
- Easy visual confirmation that you're in demo mode

### 5. **View-Only Protection**

- **Adding new records is disabled** in demo mode to maintain data integrity
- Forms are visible and explorable but save/add buttons are disabled
- Prominent notices explain the limitation with a "Get a Quote" call-to-action
- Editing existing demo data still works normally
- Perfect for showcasing features without database concerns

## How to Use

### For Clients

1. Open the application
2. Click "Start Demo Mode" button on the login screen
3. Select one of the three demo accounts (Dr. Mitchell, Dr. Anderson, or Dr. Chen)
4. Click "Enter Demo" to access the full application
5. Explore all features with full admin privileges

### For Regular Users

1. Click "Use Regular Login" if demo mode is showing
2. Enter your email and password
3. Sign in normally with Firebase authentication

## Technical Details

### Files Modified

- `app.vue` - Added demo mode UI and logic, improved dark mode support
- `composables/useFirebase.ts` - Added demo users and authentication function
- `plugins/vuetify.ts` - Updated theme with customLight and customDark themes, Material Design defaults
- `layouts/default.vue` - Enhanced navigation and app bar design with proper theme switching
- `pages/index.vue` - Improved dashboard with Material Design layout
- `pages/patient/index.vue` - Enhanced patient list with consistent typography and spacing
- `assets/styles/main.css` - Global Material Design styles (NEW)
- `nuxt.config.ts` - Added global CSS import
- `README.md` - Removed old branding
- `store/user.ts` - Existing user state management (no changes needed)

### Demo User Authentication

Demo users bypass Firebase and directly set user state in the Pinia store. They are identified by their `firebaseUid` starting with `demo-user-`.

### Styling Highlights

**Light Theme:**

- **Primary Color**: `#0ea5e9` (Sky Blue)
- **Secondary Color**: `#06b6d4` (Cyan)
- **Background**: `#f8fafc` (Light slate)
- **Surface**: `#FFFFFF` (White)

**Dark Theme:**

- **Primary Color**: `#38bdf8` (Sky 400 - brighter for dark mode)
- **Secondary Color**: `#22d3ee` (Cyan 400)
- **Background**: `#0f172a` (Dark slate)
- **Surface**: `#1e293b` (Slate 800)

**General:**

- **Gradient**: Sky blue to cyan gradient on login
- **Elevation**: Consistent Material Design elevation
- **Typography**: Roboto font with proper weights and sizes
- **Transitions**: Smooth hover and selection animations
- **Spacing**: 8px grid system following Material Design

## Benefits

✅ **No Setup Required** - Demo accounts work immediately without database configuration
✅ **Safe for Demos** - Adding new records disabled; demo users can only view/edit existing data
✅ **Professional Appearance** - Modern, clean medical industry design with clear CTAs
✅ **Easy Access** - One-click demo mode activation
✅ **Full Features** - All features visible and explorable
✅ **Client-Ready** - Perfect for sales presentations with "Get a Quote" prompts
✅ **Lead Generation** - Strategic mailto links for sales inquiries

## Future Enhancements

Consider these optional improvements:

- Add demo data seeding for patients/notes
- Implement read-only mode for certain actions
- Add a "Reset Demo Data" button
- Create guided tour for demo users
- Add demo session time limits

## Support

For questions or issues with demo mode, check:

1. User has selected a demo account before clicking "Enter Demo"
2. Application has loaded properly without console errors
3. Pinia store is properly initialized

---

**Last Updated**: December 8, 2024
**Version**: 2.0.0-demo
