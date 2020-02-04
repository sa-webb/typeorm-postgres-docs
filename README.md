# Awesome Project Build with [TypeORM](https://typeorm.io/#/)

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Basic Structure

├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── **.ts    // entity base
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options

## [Franchise](https://franchise.cloud/app/) Postgres GUI

Start
`npx franchise-client@0.2.7`
