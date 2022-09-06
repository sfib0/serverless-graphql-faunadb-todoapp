// TODO: Complete README.md file
#  Todo App

## [Live]()
<img src="./preview.gif" />

## Introduction 
Todo App on Gatsby, fetching data from GraphQL server deployed on Netlify Functions with @apollo/client, the GraphQL server gets data from FaunaDB Database, all with TypeScript.

## Setup
- Clone repository
```bash
git clone https://github.com/SaadFarhanIdress/serverless-graphql-faunadb-todoapp
```
- Go to the project directory and install dependencies
```bash
cd serverless-graphql-faunadb-todoapp && npm i && cd functions/graphql/ && npm i
```

- Create `.env` file in `functions/graphql` with the following format:
```env
FAUNADB_SERVER_SECRET={yourFaunaDBKeyHere}
```
