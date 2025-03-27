# Procurement Users Panel

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Workflows](#workflows)
   - [Authentication Workflow](#authentication-workflow)
   - [Order Management Workflow](#order-management-workflow)
4. [Components](#components)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Styling](#styling)
8. [Development and Build Process](#development-and-build-process)
9. [Environment Variables](#environment-variables)
10. [Testing](#testing)
11. [Future Enhancements](#future-enhancements)

---

## 1. Introduction

The **Procurement Users Panel** is a React-based front-end application designed for users to manage procurement requests. It allows users to create purchase orders, view their request history, and manage their profiles. The application integrates with a Node.js/Express back end for data management and authentication.

---

## 2. Project Structure

src/
├── App.jsx                # Main application entry point
├── components/            # Reusable React components
│   ├── CreateOrder.jsx    # Component for creating purchase orders
│   ├── logout.jsx         # Component for logging 
│   ├── navBar.jsx         # Navigation barcomponent
│   ├── OrderList.jsx      # Component for displaying and managing orders
│   ├── searchbar.jsx      # Search bar component for filtering orders
│   ├── usercontext.jsx    # Context for managing user state
│   └── assets/            # Static assets (e.g., images, icons)
├── js/
│   ├── actions/           # Redux action creators
│   ├── constants/         # Constants for action types
│   ├── reducer/           # Redux reducers
│   └── store/             # Redux store configuration
├── pages/                 # Page-level components
│   ├── add_users.jsx      # Page for adding new users
│   └── ...                # Other pages
├── services/              # API service functions
├── index.js               # Application entry point
├── index.css              # Global CSS styles
└── App.css                # Component-specific styles


---

## 3. Workflows

### 3.1 Authentication Workflow
1. **Login**:
   - Users log in via the `/signin` route.
   - A JWT token is stored in `localStorage` for authentication.
   - The `authservices.jsx` utility and `useUser` context manage authentication state.

2. **Logout**:
   - The `SignOut` component clears the authentication token and redirects the user to the login page.

---

### 3.2 Order Management Workflow
1. **Create Order**:
   - The `CreateOrder.jsx` component allows users to create new purchase orders.
   - Orders are sent to the back end via a POST request to `/api/orders`.

2. **View Dashboard**:
   - The `dashboard.jsx` component displays a welcome message and user details.
   - Users can navigate to other features like creating orders or viewing request history.

3. **Request History**:
   - The `RequestHistory` component fetches and displays the user's past requests.

---

## 4. Components

### 4.1 `CreateOrder.jsx`
- **Purpose**: Allows users to create new purchase orders.
- **Key Features**:
  - Form for entering supplier, products, and remarks.
  - File upload functionality for attaching documents.
  - Animations using `framer-motion`.

### 4.2 `dashboard.jsx`
- **Purpose**: Displays a welcome message and user details.
- **Key Features**:
  - Uses the `useUser` context to fetch and display user information.
  - Provides quick navigation to other features.

### 4.3 `user-navbar.jsx`
- **Purpose**: Provides a navigation bar for the application.
- **Key Features**:
  - Links to dashboard, create order, and request history.
  - Displays the logged-in user's name and profile picture.

### 4.4 `userContext.jsx`
- **Purpose**: Manages user state using React Context.
- **Key Features**:
  - Provides user information (e.g., name, email) to components.

---

## 5. State Management

The application uses **React Context** for state management. Key features include:

1. **User Context**:
   - Defined in `userContext.jsx`.
   - Manages user authentication and profile information.

2. **Local State**:
   - Components like `CreateOrder.jsx` use `useState` for managing form inputs and file uploads.

---

## 6. API Integration

The application communicates with the back end via RESTful APIs. Key endpoints include:

1. **Authentication**:
   - `GET /api/access`: Verifies the user's authentication status.

2. **Orders**:
   - `POST /api/orders`: Creates a new purchase order.
   - `GET /api/orders`: Fetches all orders for the logged-in user.

---

## 7. Styling

The application uses **Tailwind CSS** for styling. Key configuration files include:

- `tailwind.config.js`: Customizes Tailwind's default configuration.
- `postcss.config.js`: Configures PostCSS for processing Tailwind styles.

---

## 8. Development and Build Process

### Development
1. Install dependencies:
   ```bash
   npm install