# Cypress Carbon Grid

Cypress Carbon Grid is a comprehensive, real-time dashboard for monitoring and managing carbon emissions and ESG (Environmental, Social, and Governance) performance. It provides a suite of dashboards tailored for different stakeholders, including a global platform overview, a municipal-level dashboard for cities, a corporate ESG dashboard for businesses, and an association management dashboard.

## Features

- **Real-time Carbon Monitoring:** Tracks global and regional carbon emissions with live data visualization.
- **Multiple Dashboard Views:**
    - **Platform Control Dashboard:** A high-level overview of global carbon metrics, active projects, and platform-wide statistics.
    - **Municipal Dashboard:** A detailed view for cities to monitor their carbon footprint, citizen engagement, and policy effectiveness.
    - **Corporate ESG Dashboard:** An in-depth tool for businesses to manage their ESG scores, track carbon scopes, and handle CBAM (Carbon Border Adjustment Mechanism) compliance.
    - **Association Dashboard:** A dashboard for industry associations to manage members, track industry-wide ESG performance, and monitor service utilization.
- **Interactive Charts and Graphs:** Utilizes the `recharts` library to provide a rich, interactive data visualization experience.
- **Realistic Mock Data:** The frontend is populated with realistic mock data to simulate a live environment.
- **Rails Backend:** Built on a robust Ruby on Rails backend.
- **React Frontend:** A modern, responsive frontend built with React.

## Technical Stack

- **Backend:** Ruby on Rails 8.0.2
- **Frontend:** React (Create React App)
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Ruby:** Version 3.2.2 (as specified in `.ruby-version`)
- **Node.js:** A recent version of Node.js and npm.
- **PostgreSQL:** A running PostgreSQL server.
- **Homebrew (macOS):** For managing services like PostgreSQL.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/carbon_grid.git
    cd carbon_grid
    ```

2.  **Install backend dependencies:**

    ```bash
    bundle install
    ```

3.  **Install frontend dependencies:**

    The React application is located in the `samples` directory.

    ```bash
    cd samples
    npm install
    cd ..
    ```

4.  **Set up the database:**

    Make sure your PostgreSQL server is running. If you are using Homebrew on macOS, you can start it with:

    ```bash
    brew services start postgresql@14
    ```

    Then, create and migrate the database:

    ```bash
    ./bin/rails db:create
    ./bin/rails db:migrate
    ```

5.  **Build the React application:**

    ```bash
    cd samples
    npm run build
    cd ..
    ```

6.  **Copy the built frontend to the `public` directory:**

    This allows Rails to serve the React application.

    ```bash
    cp -r samples/build/* public/
    ```

7.  **Start the Rails server:**

    ```bash
    ./bin/dev
    ```

    The application should now be running at `http://127.0.0.1:3000`.

## How to Run the Test Suite

To run the test suite, use the following command:

```bash
./bin/rails test
```

## Deployment

Deployment instructions will be added here in the future.