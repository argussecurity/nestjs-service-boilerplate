# NestJS Sample Application

This is a NodeJS & Typescript sample project based on the framework [NestJS](https://docs.nestjs.com/), meant to be used as a boilerplate for any REST API project.  

## Requirements
* NodeJS version 10.0.0 or higher
* (Recommended) NPM package `typeorm` installed globally using: 
```
npm install --global typeorm
```

## Project Structure

The project has 3 main directories:
* test - includes all the test files (integration and unit)
* src - includes all the source code files (.ts)
* migrations - includes the TypeORM migration files (created from the TypeORM CLI)

### Tests Structure

All the tests reside under the `test` directory, which has 2 sub-directories:
* integration - includes all the integration tests (files with `.integration-spec.ts` extension), and the Jest configuration file for the integration tests, called `jest-integration.json`
* unit - includes all the unit tests (files with `.spec.ts` extension), the files pathing of the tested unit should be the same as in the `src` directory (for instance, if we have `src\controllers\cats.ts`, we create a test spec file under `test\unit\controllers\cats.spec.ts`)  

To run the tests, simply run:
* `npm run test` - unit tests
* `npm run test:cov` - unit tests with coverage report (under `coverage` directory)
* `npm run test:integration` - integration tests

### Source Files Structure

The main project entrypoint is the file `src/main.ts`, it is used for bootstrapping the main application module, create and output an OpenAPI definition file and define any global pipes, filters and any other global components.  
All the other sub-directories in `src` split the project to its components (for this project, we split it to 2 components, the `rest-api` and the `database-handler`), where each of them has the following structure:
* `app/<module-name>.module.ts` - the main module which imports all the other modules that we want to expose.
* `controllers` - directory containing all the controller components. Controllers define the application routes and should be split accordingly (each resource with a base route should have its own controller)
* `modules` - directory containing all the module components. Mostly used to connect between controllers and all its required dependencies. any modules that contain controllers need to be imported by the `app.module.ts` module.
* `services` - directory containing all the service components. Services implement the applications business logic, and should be used by the controllers.
* `models` - directory containing all the model components. usually has one of 2 types of models:
  * `dtos` - models used directly by the controller to define the input/output requests structure.
  * `entities` - models used by the repositories defining the data types that the repositories hold.
* `repositories` - directory containing all the repositories definitions and implementations. The definitions should reside under the `interfaces` sub-directory, containing only abstract classes that are used by the other providers. Each repository implementation should implement one of the abstract classes under the `interface` sub-directory.
* `filters` - directory containing all the custom exceptions and filters. The exceptions should reside under the `exceptions` sub-directory.

for more information about NestJS, you can read the [NestJS documentation](https://docs.nestjs.com/)

### Migrations and TypeORM integration

This sample project uses the TypeORM NPM module and NestJS TypeORM support module, to integrate with databases.  
To integrate with a database using TypeORM:
* Create a model (under `src/database-handler/models`) with TypeORM annotated fields.
* Create a repository with the TypeORM `Repository<...>` class as a dependency (under `src/database-handler/repositories`), make sure to annotate it with the `InjectRepository` decorator.
* Add a call to `TypeOrmModule.forFeature(...)` in any module imports that provides the implemented repository.
* Make sure to call `TypeOrmModule.forRoot(...)` in the imports of the module, or any parent module.

The TypeORM configuration is supplied through the relevant [TypeORM Environment Variables](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-environment-variables), the configuration file `ormconfig.json` is only used for development and is ignored when the TypeORM environment variables exist.  
Migrations reside under the `migrations` directory, to create new migration, use the TypeORM CLI and run:
```
typeorm migration:generate -n <migration-name>
```
**Important note regarding migrations**  
Migrations are applied automatically when running the application, but you can apply them manually using the TypeORM CLI, however, since the CLI cannot run on Typescript files, we need to first build the application

for more information about TypeORM integration, please read:
* [NestJS Database Tutorial](https://docs.nestjs.com/techniques/database)
* [TypeORM documentation](https://typeorm.io/#/)

### OpenAPI integration

This sample project has a basic OpenAPI generator.  
The OpenAPI generation code can be found in the `src/main.ts` bootstrap function, which simply creates a OpenAPI Document object and writes it as a YAML file to the `openapi.yaml` when running the application.  
Notice that the NestJS CLI is configured to automatically infer some of the OpenAPI documentation, by using a Swagger plugin configured in the `nest-cli.json` file.  
For more information about OpenAPI integration, you can read the [NestJS OpenAPI tutorial](https://docs.nestjs.com/recipes/swagger)

### Running and Debugging (with VSCode)

To run the application, you can use one of the run scripts that can be found under the `package.json` file.  
Since running the application is done through the NestJS CLI, we cannot run it directly through VSCode, so in order to debug the code, we need to run the application with `--inspect` option and attach the debugger to the process.  
NestJS CLI has an option to run with the `--inspect` option when simply running it with the `--debug` option, the `start:debug` script runs exactly this.  
You can then manually attach the debugger to the process (`.vscode/launch.json` has a configuration for that), or for convenience, you can set VSCode to attach to the process automatically by going to:  
File -> Preferences -> Settings -> Extensions -> Node debug -> Auto Attach set to on.  
Now simply running:
```
npm run start:debug
```
will attach VSCode to the process and you can start debugging.

### Metrics (Prometheus)

The sample project uses [NestJS-Prom](https://github.com/digikare/nestjs-prom) NPM module, to expose Prometheus metrics.  
The `src/rest-api/modules/metrics.module.ts` file uses the module, exposing some basic metrics.  
The following files contain a more advanced/custom usage: 
- `src/rest-api/modules/cars.module.ts`
- `src/rest-api/services/cars.service.ts`
- `src/database-handler/models/car.entity.ts`

### Health Checks

The sample project uses NestJS's health check module based on the [Terminus](https://github.com/nestjs/terminus) module.  
The `src/rest-api/modules/health.module.ts` exports the health endpoints, using the `src/rest-api/services/health.service.ts` for the health check logic implementation.  
The metrics are exposed at the `/metrics` endpoint.  
You can read more about health checks in [NestJS Health checks tutorial](https://docs.nestjs.com/recipes/terminus).

### Logging

The sample project demonstrates a basic custom logger usage.  
The custom logger is written as a service in `src/rest-api/services/logger.service.ts` and is exported through the logger module `src/rest-api/modules/logger.module.ts`.  
It is recommended for the custom logger to implement the NestJS `LoggerService` interface, and set the injection scope to transient as in the example (this is to inject different logger instance for each provider that needs a logger)  
A provider can simply set a logger dependency in its constructor (as in `src/rest-api/services/cars.service.ts`) and the module can import the logger module (as in `src/rest-api/modules/cars.module.ts`).  
Your can read more about logging in [NestJS Logger Tutorial](https://docs.nestjs.com/techniques/logger).

## Docker integration

The sample project has a simple `Dockerfile` that can be used to run the project by building the image and running the container as follows:
```
docker build -t <my-image-name> .

docker run --rm \
    -p <external-port>:<port> \
    -e PORT=<port> \
    -e TYPEORM_CONNECTION=sqlite \
    -e TYPEORM_DATABASE=./cars.sqlite \
    <my-image-name>
``` 

Notice that this run command configures the application to use a local sqlite database, you can supply different TypeORM environment variables to connect to a different database.

## Helm chart

The sample project has a basic helm chart with 2 k8s resources:
* A deployment, that runs the application. It has one container for the app, in each replica
* A basic service to create the needed routing for other apps to find this app once deployed
Configuration for those resources exists in `values.yaml` file.

Note that in order to run the chart, you need to have a secret with the password to mysql.
Example:
```
apiVersion: v1
kind: Secret
metadata:
  name: mysql-pass
data:
  password.txt: <base64 password>
type: Opaque
```
