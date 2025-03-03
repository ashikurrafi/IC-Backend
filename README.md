# IC-Backend

## Features

- User authentication and authorization
- CRUD operations for products
- Data validation and error handling
- Integration with a database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ashikurrafi/IC-Backend.git
   cd IC-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
    SERVER_PORT = 8000
    MONGODB_URL = mongodb://0.0.0.0:27017
    DATABASE_NAME = Product
    JWT_SECRET = secret
   ```

4. Start the server:
   ```bash
   npm run dev
   # or
   yarn run dev
   ```
