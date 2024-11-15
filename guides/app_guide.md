# app - File Directory Guide

This document provides an overview of the file structure within the `app` folder of the TAPU-ZWIFT project. It includes descriptions of each folder and its contents, helping you understand the organization of the app and its components.

---

## public

This folder contains static assets and pages that are publicly accessible.

### layout.tsx

Main layout component for public-facing pages.

### page.tsx

Main entry point for public-facing pages.

### authpages

Contains pages related to user authentication.

#### password

Pages related to password management.

- **layout.tsx**: Layout for the password-related pages.
- **forgotPassword**
  - **page.tsx**: Forgot password page.
- **passwordResetComplete**
  - **page.tsx**: Password reset completion page.
- **resetPassword**
  - **page.tsx**: Reset password page.

#### login

Login page for user authentication.

- **page.tsx**: Login page.

#### signup

User registration page.

- **page.tsx**: Signup page.

#### \_components

Shared components used across authentication pages.

- **auth-background.tsx**: Background component for auth pages.
- **auth-logout.tsx**: Logout component for authentication.
- **auth-separator.tsx**: Separator component for authentication forms.
- **forgot-password-form.tsx**: Form for requesting a password reset.
- **login-form.tsx**: Login form component.
- **onboard-indicator.tsx**: Onboarding indicator component.
- **reset-password-form.tsx**: Form for resetting the password.
- **signup-form.tsx**: Signup form component.
- **social-buttons.tsx**: Social media authentication buttons.

### about

About page.

- **page.tsx**: About page content.

### features

Features page describing the app’s key functionalities.

- **page.tsx**: Features page content.

### testimonials

Testimonials page displaying user feedback.

- **page.tsx**: Testimonials content.

### user

User-specific pages.

- **[id]**
  - **loading.tsx**: Loading state for user profile.
  - **page.tsx**: User profile page content.

---

## secured

This folder contains pages and components for authenticated users only.

### admin

Admin section for managing the app’s backend.

- **layout.tsx**: Layout for the admin dashboard.

#### users

User management section in the admin dashboard.

- **loading.tsx**: Loading state for user management.
- **page.tsx**: User management page.

#### components

Components specific to the user management section.

- **columns.tsx**: Table column components.
- **data-table.tsx**: Table displaying user data.
- **TableComponent.tsx**: Generic table component.

### user

Regular user pages.

#### boarded

Section for boarded users.

- **layout.tsx**: Layout for boarded users' section.

##### action

Components for user actions.

- **loading.tsx**: Loading state for user actions.
- **page.tsx**: Page displaying user actions.

##### card

User cards with dynamic data.

- **[userCode]**
  - **loading.tsx**: Loading state for user card.
  - **page.tsx**: User card page content.

##### dashboard

Dashboard for the user.

- **page.tsx**: User dashboard content.

#### \_components

Components used within the user dashboard.

- **dashboard.tsx**: Dashboard component.

##### update

Section for updating user information.

- **[id]**
  - **loading.tsx**: Loading state for update page.
  - **page.tsx**: User update page content.
  - **UpdateComponent.tsx**: Component for updating user data.

#### boarding

Boarding process for users.

- **layout.tsx**: Layout for the onboarding section.

##### onboarding

Onboarding page for new users.

- **loading.tsx**: Loading state for onboarding page.
- **page.tsx**: Onboarding page content.

##### template

Template pages for onboarding.

- **[id]**
  - **page.tsx**: Template page content.

---

## edit

This folder contains components related to the editing functionality.

### page.tsx

Edit page for making changes to user data or settings.

### \_components

Components used in the edit section.

- **editor-sidebar.tsx**: Sidebar component for editing.
- **settings.tsx**: Settings component for configuring user preferences.
