# MyFlix App

MyFlix is a web application for browsing and managing movies. Users can sign up, log in, view details of movies, search by genre, and manage their profiles, including a list of favorite movies.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Movie Catalog**: A collection of movies fetched from an API.
- **Search by Genre**: Filter movies using a search bar on the homepage.
- **Responsive Design**: Built with React and Bootstrap for modern UI and responsiveness.
- **User Profile**: Manage user data and favorite movies.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (includes npm)
- **Parcel** (Install Parcel globally if not already installed):

    ```bash
    npm install -g parcel
    ```

## Getting Started

### 1. Clone the Repository

Clone the project to your local machine:

    ```bash
    git clone https://github.com/lorondo/myflix-client.git
    cd myflix-client
    ```

### 2. Install Dependencies

Install all required dependencies:

    ```bash
    npm install
    ```

### 3. Start the Application

Run the application using Parcel:

    ```bash
    parcel src/index.html
    ```

Parcel will bundle the app and serve it on a development server. You can open the app in your browser at the URL shown in the terminal, typically `http://localhost:1234`.

## Folder Structure

    ```plaintext
    src/
    ├── components/
    │   ├── movie-card/
    │   │   └── movie-card.jsx
    │   ├── movie-view/
    │   │   └── movie-view.jsx
    │   ├── login-view/
    │   │   └── login-view.jsx
    │   ├── signup-view/
    │   │   └── signup-view.jsx
    │   ├── navigation-bar/
    │   │   └── navigation-bar.jsx
    │   ├── profile-view/
    │   │   └── profile-view.jsx
    │   └── main-view/
    │       └── main-view.jsx
    ├── index.html
    └── index.jsx
    ```

## Technologies Used

- **Frontend**: React, React Router
- **Styling**: React Bootstrap
- **Bundler**: Parcel
- **API**: A RESTful API providing movie data

## API Setup

The app connects to an external API for movie data. Replace the `urlAPI` variable in `MainView` with the URL of your API if using a custom backend.

    ```javascript
    const urlAPI = "https://your-api-url.com";
    ```

## Development

### Hot Module Reloading

Parcel provides hot module reloading, so changes made to your code will automatically reflect in the browser without restarting the server.

## License

This project is licensed under the MIT License.
