# TAPU-ZWIFT - File Directory Guide

This document provides an overview of the file structure within the TAPU-ZWIFT project. It includes descriptions of each folder and its contents, helping you understand the organization of the app and its components.

---

## `app/`

The main directory of the application, containing all the core files and components.

### `public/`

This folder contains static assets and pages that are publicly accessible.

- **`authpages/`**  
  Contains pages related to user authentication (e.g., login, signup, password management).

  - **`password/`**  
    Pages related to password management.
    - **`forgotPassword/`**: Page for users to request a password reset link.
    - **`passwordResetComplete/`**: Confirmation page shown after a successful password reset.
    - **`resetPassword/`**: Page where users can reset their password.
  - **`login/`**: The login page for user authentication.
  - **`signup/`**: The signup page for new user registration.
  - **`_components/`**: Shared components used across all authentication pages.

- **`about/`**: The About page, providing information about the app and its features.
- **`features/`**: The Features page, highlighting the core functionalities of the app.
- **`testimonials/`**: Page showcasing user testimonials and feedback.
- **`user/`**: User-specific pages.
  - **`[id]/`**: Dynamic user profile pages, where `[id]` represents the unique identifier for each user.

### `secured/`

Pages and components for authenticated users, ensuring that content is only accessible to logged-in users.

- **`admin/`**: Admin dashboard and management pages.

  - **`users/`**: User management section in the admin interface.
  - **`components/`**: Components specific to user management in the admin panel.

- **`user/`**: Pages and components for regular users.

  - **`boarded/`**: Section for users who have completed the onboarding process.

    - **`action/`**: Components for user actions (e.g., card creation, updates).
    - **`card/`**: Components for displaying user cards with dynamic data.
      - **`[userCode]/`**: User-specific card data, where `[userCode]` refers to a unique identifier for the user.
    - **`dashboard/`**: User dashboard displaying key information.
      - **`_components/`**: Components specific to the user dashboard.

  - **`update/`**: Pages where users can update their profile or settings.
    - **`[id]/`**: User-specific update pages, where `[id]` refers to the unique identifier for the user.

- **`boarding/`**: Pages for users going through the onboarding process.
  - **`onboarding/`**: Pages that guide users through the onboarding steps.
  - **`template/`**: Template pages used during onboarding.
    - **`[id]/`**: Dynamic onboarding template pages, where `[id]` represents a unique template identifier.

### `edit/`

Components related to editing functionality across the app.

- **`_components/`**: Shared components used for editing user data or settings.

---

## Conclusion

This file structure allows for clear separation of concerns within the app, making it easier to maintain, expand, and scale the application. Each folder is organized based on the type of pages and features, ensuring that all components are easy to find and understand.
