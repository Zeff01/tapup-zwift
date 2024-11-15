# app - File Directory Guide

This document provides an overview of the file structure within the `app` folder of the TAPU-ZWIFT project. It includes descriptions of each subfolder and its contents, helping you understand the organization of this part of the app and its components.

---

## public

This folder contains static assets and pages that are publicly accessible, including user authentication pages, feature-related pages, and user-specific dynamic content.

### authpages

Contains all pages related to user authentication.

- **password**: Contains pages related to password management.

  - `forgotPassword`: The page where users can initiate the password recovery process.
  - `passwordResetComplete`: The page displayed after a successful password reset.
  - `resetPassword`: The page where users can set a new password.

- **login**: The login page where users can sign in.
- **signup**: The page where new users can create an account.
- **\_components**: Shared components used across authentication pages.

### about

The page that provides information about the app or the company.

### features

The page that outlines the key features of the app.

### testimonials

The page that displays testimonials from users.

### user

This folder contains user-specific pages.

- `[id]`: A dynamic folder that contains the profile page for each user.

---

## secured

This folder contains pages and components accessible only to authenticated users.

### admin

This folder holds pages related to the admin dashboard and user management.

- **users**: A section for managing users within the admin dashboard.
  - `components`: Components specific to user management.

### user

Contains pages for regular authenticated users.

- **boarded**: The section for users who have completed their onboarding.

  - `action`: Components that allow users to take actions.
  - `card`: User cards with dynamic data.

    - `[userCode]`: User-specific card data.

  - **dashboard**: The user's main dashboard.

    - `_components`: Components specific to the dashboard.

  - **update**: A section for users to update their information.
    - `[id]`: Pages for updating user data.

- **boarding**: Pages related to the user onboarding process.
  - `onboarding`: Contains pages that guide users through onboarding.
  - `template`: Template pages for onboarding.
    - `[id]`: Dynamic template pages for onboarding.

---

## edit

This folder contains components related to editing user information.

- **\_components**: Components for editing functionality.
