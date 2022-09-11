# Profile Update

MEAN stack application to handle user sign up and sign in flow, functionality to update a users profile


## Usage


### Installation

Install the NPM Packages in both the frontend and backend directories with the command:

```sh
$ npm install
```

Create a `.env` file in the backend directory and add the following environment variables with your credentials:

```
DB_URL=linktoyourmongodbdatabase
SECRET=secretforjwtandpassport
```

Now you are ready to run the application, navigate to the backend directory in a terminal session and then run the commands:

```sh
$ node app
```

or

```sh
$ nodemon app
```
You can use either nodemon or node to run the server.

Next navigate to the frontend directory in a new terminal session and run the command:

```sh
$ ng serve --open
```

The frontend and backend should now be up and running correctly at localhost:4200 (for the frontend) and localhost:3000 (for the backend)
