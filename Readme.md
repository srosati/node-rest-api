## Example REST api in nodejs using express, mongoose and passport (with JWT)

### Run

1. ensure mongodb database is running and add its url at .env file
2. run npm start to start api

### Provided endpints

GET /todos => list todos

GET /todos/:id => get todo of id

POST /todos => create todo

PUT /todos/:id => modify todo of id

DELETE /todos/:id => delete todo of id

GET /users => list users

GET /users/:id => get user of id

POST /users => create user

PUT /users/:id => modify user of id

DELETE /users/:id => delete user of id

POST /auth/login => login with username and password

### Notes

- Should be easily modifiable to change database or authentication method as it is separated in mostly independent modules
- .http files are for example usage (see vscode Rest client extension for how this works)
- .env file provided on repo to provide example of enviroment variables

### Future extensions:

- Better validation
- Propper logging
- Port over to TypeScript
