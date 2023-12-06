# Football Data

This project is an API that provides detailed information about football matches, including statistics, lineups, scorers, cards and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:
```bash
   git clone git@github.com:cardozoalani/football.git
```
2. Install dependencies:
```bash
   cd backend && npm install
```
## Usage

1. Create .env file:
```
DB_USER=usuario
DB_PASSWORD=contraseña123
DB_HOST=localhost
DB_NAME=football
DB_PORT=5432
API_KEY=[Get here](https://apifootball.com/admin/)
```
2. Create pg database with [docker-compose](https://docs.docker.com/compose/install/):
```bash
docker compose up -d
```
3. Create tables db:
```bash
npm run create-tables
```
4. Start backend:
```bash
npm run start
```
## Project Structure
```
.
├── client/               # Client React
├── backend/   
│   ├── src/              # Application source code
|      ├── application/   # Application services
|      ├── domains/       # Entities
|      ├── infrastructure/# Conections db, external api, crons, repositories
|      ├── presentation/  # presentation controllers
│
├── Dockerfile         # Container config
├── docker-compose.yml # Docker compose config
├── README.md          # Main project documentation
├── .gitignore         # Files/directories ignored by Git
├── tsconfig.json      # Typescript config
└── package.json       # npm configuration file
```