**Example REST api in nodejs using express and passport (with JWT)**

Provided endpints are

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

Should be easily modifiable to add database connection / change authentication method as it is separated in mostly independent modules

.http files are for example usage (see vscode Rest client extension for how this works)
.env file provided on repo to provide example of enviroment variables

Note: Database objects are not yet persisted as they are stored in memory.

**Future extensions:**

- Mongoose or similar system to persist objects
- Better validation
