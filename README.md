# member_engagement_tracker_api
### Prerequisites

- Node.js >= 18
- PostgreSQL
- Yarn or npm

### Installation
npm install

### DB setup(config.json)
{
  "development": {
    "username": "your_db_user",
    "password": "your_db_password",
    "database": "gymdb",
    "host": "localhost",
    "dialect": "postgres"
  }
}

### DB extension installation
<!-- need to run the following command in database for installing extension -->
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

### DB migration
<!-- migration -->
npx sequelize-cli db:migrate

### project running
<!-- running the app -->
npm run dev

### unit testing
<!-- running unit tests -->
npm test

### APIS
1. Path: /api/members/batch
Sample input: 
[
  {
    "member_id": "M001",
    "name": "Ali",
    "check_ins": ["2025-04-12", "2025-04-13", "2025-04-14"]
  },
  {
    "member_id": "M002",
    "name": "Zara",
    "check_ins": ["2025-03-20"]
  }
]

2. Path: /api/checkins/new
Sample input: 
{
    "date": "2025-04-17 15:29:13.927+10",
    "member_id": "xxx"
}

3. Path: /api/members/new
Sample input: 
{
    "source_id": "M001",
    "name": "Ali",
    "check_ins": ["2025-04-01", "2025-04-04", "2025-04-08"]
}