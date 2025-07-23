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
- **Containerization:** Docker, Docker Compose

## Running on Replit

This project can be run directly on Replit. 

1.  **Import from GitHub:** Create a new Replit workspace by importing this repository directly from GitHub.
2.  **Click "Run":** Once the workspace is loaded, click the "Run" button. Replit will execute the `bin/replit-start` script, which will wait for Docker to be ready, then build and start the application using `docker-compose`.
3.  **Set up the database:** When the application is running, open a new shell tab and run the following command to set up the database:

    ```bash
    docker-compose exec app ./bin/rails db:create db:migrate
    ```

    The application will be available at the URL provided by Replit.

## Getting Started

This project is configured to run in a Docker container, which simplifies setup and ensures a consistent development environment.

### Prerequisites

- **Docker:** [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose:** [Install Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/carbon_grid.git
    cd carbon_grid
    ```

2.  **Build and start the Docker containers:**

    This command will build the Docker image for the application and start the `app` and `db` services.

    ```bash
    docker-compose up --build
    ```

3.  **Set up the database:**

    In a separate terminal window, run the following command to create and migrate the database:

    ```bash
    docker-compose exec app ./bin/rails db:create db:migrate
    ```

    The application should now be running at `http://localhost:3000`.

### Common Docker Commands

- **Start the application:** `docker-compose up`
- **Stop the application:** `docker-compose down`
- **Run a command in the app container:** `docker-compose exec app <command>` (e.g., `docker-compose exec app ./bin/rails c`)
- **View logs:** `docker-compose logs -f app`

## How to Run the Test Suite

To run the test suite, use the following command:

```bash
docker-compose exec app ./bin/rails test
```

## Deployment

This project is configured for deployment using [Kamal](https://kamal-deploy.org/). The deployment configuration can be found in `config/deploy.yml`.
