# AppLogger usage
AppLogger is general wrapper that is compliant with other logging frameworks, such as Pino, Winston, NestJs logger. 
It supports other types of loggers. Currently standard logger is used as default.

The default logger can be overridden with the setLogger method.

The following log levels are used:
 
* info - shall be used for communication of the most general messages. 
* warn - to communicate warnings.
* error - to communicate errors.
* debug - for debugging purposes -- this level is generally not available in production mode.
* verbose - very detailed debugging messages -- this level is generally not available in production mode.


All application code shall use AppLogger for logging.

# Db connection manager
To provide uniform way to connect to database, as DbConnectionManager class shall be used. The in general provides primary and secondary database connection.
As it is singleton pattern it will always return just one instance, which make it perfect for proper connection pooling. 
Based on the environment variable setting, the connection is returned. Different strategies are used. The strategy defines how we handle connections:
- Local pool, AWS RDS, ...

The manager also provides connection to the test database, when the `APP_ENV='testing'˙` is set. In this case the env variables with `_TEST` will be used(ex. `MYSQL_HOST_TEST`).

#### Example of getting the connection
Setting the connection type in .env `PRIMARY_DB=mysql`.

Getting the primary connection:
`await DbConnectionManager.getInstance().getConnection()`

Getting the secondary connection:
`await DbConnectionManager.getInstance().getSecondaryConnection()`

The connection is promise based MySql or Mongo (DB).

For sync connections to MySql use:
`DbConnectionManager.getInstance().getConnectionSync()`

This is currently supported only as primary connection to MySql. 

### Mongo and MySql utils
The `MySqlUtil` and `MonoUtil` shall be used for proper database usage. 

Example calling the param query  `MySqlUtil`
```typescript
await (new MySqlUtil(await DbConnectionManager.getInstance().getConnection() as Pool)).paramQuery(
      `SELECT COUNT(*) AS 'COUNT' FROM ${DbCollections.ROLE_PERMISSIONS};`,
    );`
```

# Auth API usage

In theory, only the Auth model should be needed, acting like a sort of "authentication and authorization black box" - hiding its logic and exposing the implementation's same functionality.  

Check the [architecture](ARCHITECTURE.md) for more details.


## Auth API
To use the API, make an instance of the [auth.ts](src/modules/user/models/auth.ts) class. Interface methods are available in the class.

### Example of creating a permission:
```typescript
const auth = new Auth();

await auth.createPermission('WRITE_COMMENTS');
```


### Example of creating a role:
```typescript
const auth = new Auth();

await auth.createRole('Commenter');
```


### Example of creating a role with a parent role:
```typescript
const auth = new Auth();

await auth.createRole('Commenter', 'User');
```
where user is a parent, meaning they have all the permissions of the commenter in addition to their own permissions. Do note that the parent role must already exist for this to work. Take care not to introduce loops into the structure!


### Example of assigning permissions to a role:
```typescript
const auth = new Auth();

await auth.addPermissionsToRole('Commenter', ["READ_COMMENTS", "WRITE_COMMENTS"]);
```
do note that the permissions and role must already exist for this to work.

### Example of removing permissions from a role:
```typescript
const auth = new Auth();

await auth.addPermissionsToRole('Commenter', ["READ_COMMENTS", "WRITE_COMMENTS"]);
```
do note that you should provide at least 1 valid, existing and present permission in the array, else the function returns `false` indicating a failure.


### Example of granting roles to a user:
```typescript
const auth = new Auth();

await auth.grantRoles(["Commenter", "Gardener"]);
// or
await auth.grantRoles(["Mayor", "Director"], userId);
```
where `userId` is the ID of the user you wish to provide the roles to.
If no ID is provided to the function, it attempts to use the user attached to the context, provided there is one. Keep in mind the roles need to exist for them to be grantable to the user.


### Example of checking whether a user has access to a resource:
```typescript
const auth = new Auth();

// auth.canAccessResource(resourceId, actions, userId?): Promise<boolean>
await auth.canAccessResource('COMMENTS.ALL', ['c', 'r']);
// or
await auth.canAccessResource('COMMENTS.UPDATE', ['u'], 123);
```
Returns `true` if user has a role with a permission that can access the provided resource with the required actions. If no userId is provided to the function, it attempts to use the user attached to the context, provided there is one. Actions should be members of the enum `ResourcePermissions`, available in the [types.ts](src/config/types.ts) file.


### Example of generating a JWT token
```typescript
const auth = new Auth();

const token = await auth.generateToken(payload, subject, userId?, exp?);
```
Generates a JWT token. `payload` is the data you want it to contain, `subject` should be a value from `JwtTokenType`, which can be found in [auth-mysql.ts](src/models/auth-mysql.ts). `userId` is optional and indicates which user a token pertains to, and `exp` is the time to expiration, which defaults to `'1d'`.

### Example of validating a JWT token
```typescript
const auth = new Auth();

const isValid = await auth.validateToken(token);
```
Checks whether a token can be successfully decoded, is present in the database, has not yet been invalidated and has not yet expired. Returns `true` if all these conditions are met.

### TODO: More examples