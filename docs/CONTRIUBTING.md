# Contributing example

The logic for this backend project is contained in `/src` directory. Code is split into modules. Every module has it's own set of tests.
On the `/src` level the following directory structure shall be used:


| Directory         | Description                                              |
| ----------------- | -------------------------------------------------------- |
| config            | Configuration of environment, enums, error messages etc. |
| migration-scripts | Database migration files. (migration and seed filesF).   |
| modules           | Modules - each module is a set of functionality.         |


Directory structure for modules is as follows: 

| Directory | Description                     |
| --------- | ------------------------------- |
| /         | Module code files               |
| tests     | Module tests                    |
| models    | Data models used in the module. |


When coding, avoid global functions. All function, except explicit really global ones as `isPlainObject` should be wrapped in it's own class. 
All commonly used functions shall be put into `common` module. The model base classes shall be put into the `model-base` module.


## Modules 
Structure of every package is separated into modules. Module also contains tests for that module. One module should represent one closed functionally. For example all things concerning logging shall be in the logging module. 
The common module shall contain all the common helper functions, common errors (exceptions), common tools.

## Raw model
Raw model shall be used for model definition. The models shall be database agnostic, so we can easily switch from one database to another.
More about the raw model can be read [here](https://rawmodel.github.io/framework/), or on [github](https://github.com/rawmodel/framework). 
Along with other raw model functions, population and serialization strategies are to be used. The population strategy defines which properties shall be filled when the populate() method is called.Populate usually means getting the values from the database. 

Serialization returns the model in one object. Again the strategies define which fields shall be filled in the serialized object. 


## Logging 
AppLogger module is provided. The logger module is agnostic and can be used on any provided logger implementation. Use `setLogger` method to override default console logger.

when using log methods, first 2 parameters must contain filename and method name. The following parameters can be arbitrary log arguments. 

Logger supports additional env variable settings:
- `LOG_TARGET` - supports 2 options: 
  - color - express output in color. 
  - console - a console adjusted log format.

- `LOG_OUT_LEVEL` - level to which the output will be displayed. The `verbose` level will output all the data. Default is `info`.


## Sample files
Sample configuration files are located in the `config-samples` directory. All configuration samples (either project env or visual studio setting and lunch samples) 
shall be put in this directory.

## Dev environnement

- VS Code with installed plugins: ESLint, Prettier Formatter for Visual Studio Code.
- Nodejs 16+
- Docker (or a running instance of MySQL somewhere else, only needed for running tests)

### Setup vscode prettier

It is recommended to use prettier as the code formatter. Setup your Visual studio code accordingly.
The config file `.prettierrc.` contains the settings for the prettier. 
This will turn on automatic prettier formatting in vscode. 

## Linter
Project uses ES lint with the typescript plugins for code linting. Visual studio code will warn you about every lint problem. 
It is recommended to run:
```
npm run lint
#or
npm run lintFix
```
from time to time and fix the lint errors on the spot. 

No errors and minimal warnings should be reported from te linter.

## Linking the package dependencies
Local dependencies can be linked directly from the git repos. In case we want to link to specific version git tagging shall be used.
```typescript
"@kalmia/kalmia-auth-api": "git+ssh://git@bitbucket.org/kalmiadevs/kalmia-auth-api.git#0.0.20",

```
When direct GIT repo links are used, the authentication to the module is needed.
For local usage create a ssh key in the Bitbucket and [use it](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/).  

For general access, eq. from docker -- a ro access key must be added.
Package contains two keys, that can be used to access the repo. Private key must be copied to local account `./ssh/id_dsa` - [kalmia-dev-ro-access.key](./../kalmia-dev-ro-access.key) or other proper location. The public key shall be entered to the repo RO access keys - [kalmia-dev-ro-access-pub.key](./../kalmia-dev-ro-access-pub.key).


#### Windows credential settings for linking the packages
Create git config file C:/Users/<username>/.ssh/config with entry

```
Host bitbucket.org
     IdentityFile ~/.ssh/bitbucket_key
     IdentitiesOnly yes
```

Save openssh private key in C:/Users/<username>/.ssh/bitbucket_key

To prevent opening a popup asking credentials, I had to edit git config file C:/Users/<username>/.gitconfig like this

```
[credential]
    helper = manager
    interactive = false
    modalPrompt = false
```

This solution also works in VS Code console, but you have to cancel the credential popups when they appear (I didn't find the way to disable them yet).






## Environment setup

We use `.env` file for setting up the environment. File needs to be placed in the root of the project (outside `/src` directory) with contents: 
This project uses MYSQL as primary database. 

The `config-samples/.env.example` shall be used as an example. Put all env variables into this file.


**VS Code settings**
On all the projects also .vscode foder shall be commited to git.

In Visual Studio Code, menu File → Preferences → Settings → User Settings,

"typescript.preferences.importModuleSpecifier": "relative"

**Install dependencies**

```
npm i
```

**Running tests**

```
npm run test
```


### Git structure

| Branch  | Description                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| master  | Production branch. No one can directly commit. Only PRs allowed. Should be merged from staging or development. |
| develop | Main development branch. Only PRs allowed. Branch of master.                                                   |
| staging | Staging deployment branch. Only PRs allowed. Branch of development.                                            |

Pull develop branch and create your own branch for each feature from it.

Use [this](https://nvie.com/posts/a-successful-git-branching-model/) guide for proper branch naming.

#### Pull requests

Code can only be merged to `develop` through pull requests. When developing a new feature. Create a branch from `develop` when finished open a pull request in BitBucket with reviewer as specified in README file.

## Deploying on NPM
To do this, you will need an account on the kalmia npm repo (contact one of the team leads, repo accessible on [npm.kalmia.si](https://npm.kalmia.si)).

In your CLI you will have to be authenticated with an authorized account for the Kalmia npm registry. You can achieve this by running the following commands:

```bash
npm set registry https://npm.kalmia.si
npm adduser --registry https://npm.kalmia.si
```
and following the login procedure.
Afterwards you should be able to perform the command
```bash
npm run publish-kalmia
```
which builds the project and deploys it to the registry.
`Keep in mind that every new publish requires an increase in the project version!`

#### Deploying new packages
To deploy a new package to the Kalmia registry, one needs to be authenticated in their CLI and navigated to the project directory and then run the command
```bash
npm publish --registry https://npm.kalmia.si
```
