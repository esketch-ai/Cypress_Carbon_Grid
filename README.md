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
- **Database-Driven Data:** Data for municipal dashboards is now fetched from a database, providing dynamic content.
- **Rails Backend:** Built on a robust Ruby on Rails backend.
- **React Frontend:** A modern, responsive frontend built with React.

## Technical Stack

- **Backend:** Ruby on Rails 8.0.2
- **Frontend:** React (Create React App)
- **Database:** SQLite3
- **Styling:** Tailwind CSS
- **Containerization:** Docker, Docker Compose

## Running on Replit

This project is configured to run directly on Replit.

1.  **Import from GitHub:** Create a new Replit workspace by importing this repository directly from GitHub (`https://github.com/esketch-ai/Cypress_Carbon_Grid.git`).
2.  **Click "Run":** Once the workspace is loaded, click the "Run" button. Replit will automatically execute the `bin/replit-start` script.
3.  **Automatic Setup:** The `bin/replit-start` script will:
    - Install Ruby gems (`bundle install`).
    - Run database migrations (`rails db:migrate`).
    - Seed the database with initial data (`rails db:seed`).
    - Start the Rails backend server on port 3000.
    - Navigate to the `carbon_grid` directory.
    - Install Node.js dependencies (`npm install`).
    - Start the React development server on port 3001 (exposed via Replit's webview).
4.  **Access the Application:** The application will be accessible via the public URL provided by Replit in the webview panel (e.g., `https://[repl-name].[username].replit.dev`).

## Getting Started (Local Development with Docker)

This project is configured to run in a Docker container, which simplifies setup and ensures a consistent development environment.

### Prerequisites

- **Docker:** [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose:** [Install Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/esketch-ai/Cypress_Carbon_Grid.git
    cd Cypress_Carbon_Grid
    ```

2.  **Build and start the Docker containers:**

    This command will build the Docker image for the application and start the `app` and `db` services.

    ```bash
    docker-compose up --build
    ```

3.  **Set up the database:**

    In a separate terminal window, run the following command to create and migrate the database:

    ```bash
    docker-compose exec app ./bin/rails db:create db:migrate db:seed
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

---

# Cypress Carbon Grid

Cypress Carbon Grid는 탄소 배출량 및 ESG(환경, 사회, 지배구조) 성과를 실시간으로 모니터링하고 관리하기 위한 포괄적인 대시보드입니다. 글로벌 플랫폼 개요, 지자체 대시보드, 기업 ESG 대시보드, 새마을중앙회 대시보드 등 다양한 이해관계자를 위한 맞춤형 대시보드를 제공합니다.

## 주요 기능

- **실시간 탄소 모니터링:** 실시간 데이터 시각화를 통해 글로벌 및 지역 탄소 배출량을 추적합니다.
- **다중 대시보드 뷰:**
    - **플랫폼 관제실:** 글로벌 탄소 지표, 활성 프로젝트 및 플랫폼 전체 통계에 대한 개요를 제공합니다.
    - **지자체 대시보드:** 도시의 탄소 발자국, 시민 참여 및 정책 효과를 모니터링하기 위한 상세 뷰를 제공합니다.
    - **기업 ESG 대시보드:** 기업이 ESG 점수를 관리하고, 탄소 스코프를 추적하며, CBAM(탄소국경조정제도) 규정 준수를 처리하기 위한 심층 도구입니다.
    - **새마을중앙회 대시보드:** 산업 협회가 회원을 관리하고, 산업 전반의 ESG 성과를 추적하며, 서비스 활용도를 모니터링하기 위한 대시보드입니다.
- **대화형 차트 및 그래프:** `recharts` 라이브러리를 활용하여 풍부하고 대화형 데이터 시각화 경험을 제공합니다.
- **데이터베이스 기반 데이터:** 지자체 대시보드 데이터는 이제 데이터베이스에서 가져와 동적인 콘텐츠를 제공합니다.
- **Rails 백엔드:** 견고한 Ruby on Rails 백엔드로 구축되었습니다.
- **React 프론트엔드:** React로 구축된 현대적이고 반응형 프론트엔드입니다.

## 기술 스택

- **백엔드:** Ruby on Rails 8.0.2
- **프론트엔드:** React (Create React App)
- **데이터베이스:** SQLite3
- **스타일링:** Tailwind CSS
- **컨테이너화:** Docker, Docker Compose

## Replit에서 실행하기

이 프로젝트는 Replit에서 직접 실행되도록 구성되어 있습니다.

1.  **GitHub에서 가져오기:** 이 저장소(`https://github.com/esketch-ai/Cypress_Carbon_Grid.git`)를 GitHub에서 직접 가져와 새 Replit 워크스페이스를 생성합니다.
2.  **"Run" 버튼 클릭:** 워크스페이스가 로드되면 "Run" 버튼을 클릭합니다. Replit은 `bin/replit-start` 스크립트를 자동으로 실행합니다.
3.  **자동 설정:** `bin/replit-start` 스크립트는 다음을 수행합니다:
    - Ruby 젬 설치 (`bundle install`).
    - 데이터베이스 마이그레이션 실행 (`rails db:migrate`).
    - 초기 데이터로 데이터베이스 시딩 (`rails db:seed`).
    - 3000번 포트에서 Rails 백엔드 서버 시작.
    - `carbon_grid` 디렉토리로 이동.
    - Node.js 의존성 설치 (`npm install`).
    - 3001번 포트에서 React 개발 서버 시작 (Replit 웹뷰를 통해 노출).
4.  **애플리케이션 접근:** 애플리케이션은 Replit 웹뷰 패널에서 제공하는 공개 URL(예: `https://[repl-name].[username].replit.dev`)을 통해 접근할 수 있습니다.

## 시작하기 (Docker를 이용한 로컬 개발)

이 프로젝트는 Docker 컨테이너에서 실행되도록 구성되어 있어, 설정이 간편하고 일관된 개발 환경을 보장합니다.

### 필수 조건

- **Docker:** [Docker 설치](https://docs.docker.com/get-docker/)
- **Docker Compose:** [Docker Compose 설치](https://docs.docker.com/compose/install/) (일반적으로 Docker Desktop에 포함되어 있습니다)

### 설치 및 설정

1.  **저장소 클론:**

    ```bash
    git clone https://github.com/esketch-ai/Cypress_Carbon_Grid.git
    cd Cypress_Carbon_Grid
    ```

2.  **Docker 컨테이너 빌드 및 시작:**

    이 명령은 애플리케이션용 Docker 이미지를 빌드하고 `app` 및 `db` 서비스를 시작합니다.

    ```bash
    docker-compose up --build
    ```

3.  **데이터베이스 설정:**

    별도의 터미널 창에서 다음 명령을 실행하여 데이터베이스를 생성하고 마이그레이션합니다:

    ```bash
    docker-compose exec app ./bin/rails db:create db:migrate db:seed
    ```

    이제 애플리케이션은 `http://localhost:3000`에서 실행될 것입니다.

### 일반적인 Docker 명령어

- **애플리케이션 시작:** `docker-compose up`
- **애플리케이션 중지:** `docker-compose down`
- **앱 컨테이너에서 명령 실행:** `docker-compose exec app <command>` (예: `docker-compose exec app ./bin/rails c`)
- **로그 보기:** `docker-compose logs -f app`

## 테스트 스위트 실행 방법

테스트 스위트를 실행하려면 다음 명령을 사용하십시오:

```bash
docker-compose exec app ./bin/rails test
```

## 배포

이 프로젝트는 [Kamal](https://kamal-deploy.org/)을 사용하여 배포하도록 구성되어 있습니다. 배포 구성은 `config/deploy.yml`에서 찾을 수 있습니다.