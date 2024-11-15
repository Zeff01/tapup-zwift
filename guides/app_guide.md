app/
├── public/ # Static assets and public-facing pages
│ ├── authpages/ # Pages related to user authentication
│ │ ├── password/ # Password-related pages
│ │ │ ├── forgotPassword/ # Forgot password page
│ │ │ ├── passwordResetComplete/ # After password reset is completed
│ │ │ └── resetPassword/ # Reset password page
│ │ ├── login/ # Login page
│ │ ├── signup/ # Signup page
│ │ └── \_components/ # Shared components used across auth pages
│ ├── about/ # About page
│ ├── features/ # Features page
│ ├── testimonials/ # Testimonials page
│ └── user/ # User-specific pages
│ └── [id]/ # Dynamic user profile pages
├── secured/ # Pages and components for authenticated users
│ ├── admin/ # Admin dashboard and management pages
│ │ └── users/ # User management in the admin section
│ │ └── components/ # Components specific to user management
│ └── user/ # Regular user pages
│ ├── boarded/ # Boarded users' section
│ │ ├── action/ # User action components
│ │ ├── card/ # User cards with dynamic data
│ │ │ └── [userCode]/ # User-specific card data
│ │ ├── dashboard/ # User dashboard
│ │ │ └── \_components/ # Components specific to the dashboard
│ │ └── update/ # User update section
│ │ └── [id]/ # User-specific update pages
│ └── boarding/ # Boarding process pages for users
│ └── onboarding/ # Onboarding pages
│ └── template/ # Template pages for onboarding
│ └── [id]/ # Dynamic onboarding template pages
└── edit/ # Edit-related components
└── \_components/ # Components for edit functionality
