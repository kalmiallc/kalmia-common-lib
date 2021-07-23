# Testing
Default testing framework for this project is [Jest](https://jestjs.io/docs/en/getting-started). Test are written in `/src/tests` directory. 
Every module shall have tests for the module in the tests directory.

## Testing specifications
Test suites (in some cases) tests must be wrapped in closed context independent from other tests. This means that before the test suite, we setup the test dependencies(in most cases database). We must not forget to clean up after the tests. 


Tests are ran in a different database than the development or production. The variables with suffix `_TEST` are used for testing.

Needed test variables for MySql:
* MYSQL_HOST_TEST
* MYSQL_PORT_TEST
* MYSQL_USER_TEST
* MYSQL_PASSWORD_TEST
* MYSQL_DB_TEST


The environment variable `APP_ENV=testing` must be set, to properly initialize testing environment.

## Migrations
Migrations are used to prepare SQL database for tests. The [ts-mysql-migrate] (https://www.npmjs.com/package/ts-mysql-migrate) package is used. 
The migration files shall be stored under the `src/migrations`. 

### Models
Tests should cover every custom written function on our interface implementations and models.

## VS Code debugging
To enable VS Code debugging you can add these two configurations into [launch.json](https://code.visualstudio.com/docs/editor/debugging) file:
These can also be found in the `config-samples/launch.json.sample`. 
```
{
  "type": "node",
  "request": "launch",
  "name": "Jest Test All",
  "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
  "args": ["--runInBand", "--config=${workspaceFolder}/jest.config.ts", "--detectOpenHandles"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
},
{
  "type": "node",
  "request": "launch",
  "name": "Jest Test Current file",
  "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
  "args": ["--runInBand", "--config=${workspaceFolder}/jest.config.ts", "--detectOpenHandles", "${fileBasename}" ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```
