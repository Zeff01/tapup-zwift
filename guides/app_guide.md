# app - File Directory Guide

This document provides an overview of the file structure within the `app` folder of the TAPU-ZWIFT project. It helps you understand the organization of the app and its components.

---

## public

The `public` folder contains the static files and assets for the app. These files are accessible to users directly.

- **layout.tsx**: The main layout component for the public-facing pages.
- **page.tsx**: The entry point for the public-facing pages.

### authpages

Contains all pages related to user authentication, including login, signup, and password-related actions.

- **password**
  - **layout.tsx**: The layout for password-related pages.
  - **forgotPassword/page.tsx**: Page for the forgot password process.
  - **passwordResetComplete/page.tsx**: Page shown after a successful password reset.
  - **resetPassword/page.tsx**: Page for resetting the password.
- **login/page.tsx**: The login page for user authentication.
- **signup/page.tsx**: The signup page for new users.

### \_components

Contains shared components used throughout the auth-related pages.

- **auth-background.tsx**: Background component for the authentication pages.
- **auth-logout.tsx**: Logout component used in authentication.
- **auth-separator.tsx**: A separator component used in auth forms.
- **forgot-password-form.tsx**: Form component for the forgot password process.
- **login-form.tsx**: Form component for logging in users.
- **onboard-indicator.tsx**: Onboarding step indicator.
- **reset-password-form.tsx**: Form component for resetting passwords.
- **signup-form.tsx**: Form component for signing up users.
- **social-buttons.tsx**: Social media authentication buttons.

### about

About the app page.

- **page.tsx**: Displays information about the app.

### features

Shows the features of the app.

- **page.tsx**: Displays the key features of the app.

### testimonials

A page displaying user testimonials.

- **page.tsx**: Displays customer feedback and testimonials.

### user

User-specific pages, generally showing user profiles.

- **[id]**
  - **loading.tsx**: The loading state for user profiles.
  - **page.tsx**: The user profile page.

---

## secured

This folder contains secured pages and sections for authenticated users only.

### admin

Admin section for managing the app's backend.

- **layout.tsx**: Layout for the admin dashboard.

#### users

Manages the users section within the admin dashboard.

- **loading.tsx**: The loading state for user management.
- **page.tsx**: Displays the user management page.

#### components

Components used for managing users in the admin section.

- **columns.tsx**: Defines the columns for user data tables.
- **data-table.tsx**: A table component displaying user data.
- **TableComponent.tsx**: A reusable table component.

### user

Pages for regular users, displaying user dashboards and other actions.

#### boarded

The section for users who have completed onboarding.

- **layout.tsx**: The layout for the boarded user section.

##### action

Displays the actions available to boarded users.

- **loading.tsx**: The loading state for user actions.
- **page.tsx**: Displays available actions for boarded users.

##### card

Displays individual user cards.

- **[userCode]**
  - **loading.tsx**: The loading state for a user card.
  - **page.tsx**: Displays the individual user card.

##### dashboard

User dashboard section.

- **page.tsx**: Displays the user's dashboard.

#### \_components

Reusable components for the user dashboard.

- **dashboard.tsx**: The component for displaying the user dashboard.

##### update

Pages for updating user information.

- **[id]**
  - **loading.tsx**: The loading state for updating user data.
  - **page.tsx**: The page for updating user information.
  - **UpdateComponent.tsx**: A component for updating user data.

#### boarding

Pages related to the onboarding process for new users.

- **layout.tsx**: The layout for the onboarding section.

##### onboarding

The actual onboarding page for new users.

- **loading.tsx**: The loading state for onboarding.
- **page.tsx**: Displays the onboarding page.

##### template

Template for onboarding steps.

- **[id]**
  - **page.tsx**: Displays the onboarding template page.

---

## edit

This section contains pages and components for editing user data or settings.

- **page.tsx**: The main edit page for user data.

### \_components

Components for the editing page.

- **editor-sidebar.tsx**: Sidebar for the editor page.
- **settings.tsx**: Settings component for configuring user preferences.
