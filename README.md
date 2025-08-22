# Auth Micro-Service

## Project Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/DipakNanecha2005/Auth-Service.git

# Navigate into the folder
cd Auth-Service

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```ini
# Node environment
NODE_ENV=development #production

# port
PORT=5001

# jwt key
JWT_KEY=YOUR_JWT_KEY

# Database Sync
SYNC_DB=false # true
```

> 💡 You can adjust the values as needed for your local setup.

> **Tip:** Run the following command to generate a secure JWT key:
>
> ```bash
> openssl rand -base64 10
> ```
>
> Copy the output and paste it as the value for `JWT_KEY`. (No need to use quotes if the generated key contains only standard characters including `=`. However, if the key includes special characters like `@`, `$`, `\`, `+`, `spaces`, or any other `whitespaces`, wrap the value in quotes.)

### 3. Configure sequelize for MySQL

Create a `config.json` file in `src/config/` directory

```json
{
  "development": {
    "username": "YOUR_DATABASE_LOGIN_NAME",
    "password": "YOUR_DATABASE_PASSWORD",
    "database": "Auth_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

> 💡 Tip: The default MySQL username is usually "root" and the password may be empty on local setups if not set.

### 4. Create the Database

Once your `config.json` is set up, run the following command inside the `src/` directory to create the development database:

```bash
npx sequelize db:create
```

### 5. Run Migrations

Run Sequelize migrations to create the necessary tables:

```bash
npx sequelize db:migrate
```

### 6. Seed the Database

Populate the database with initial data:

```bash
npx sequelize db:seed:all
```

### 7. Start the service

Now start the server:

```bash
npm start
```
