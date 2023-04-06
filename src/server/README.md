# Flick Picker Backend

This project is a TypeScript Express.js API.

## Project Setup

Install the project's packages

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

If you are facing problems when trying to run the above command. Please run the following:
### `npm install -g nodemon ts-node`

## Project Overview

Our API split up into several modules that manage user/group data and allow for the frontend to access these functions through endpoints. We use several folders to manage the architecture of our API.

`server.ts` and `index.ts` manage hosting and execution of the API

`/routes` maps API endpoint routes for various modules

`/controllers` manage the request and response data when endpoints are called

`/services` contain the logic for managing DB records, recommendation algorithm

`/models` contain Typescript data models

`/api-json`, `/classes`, `/generate`, `static` pertain to collection of media data from external APIs

`/tests` contain unit tests written in Jest 

`/functions` is a folder designated for cloud deployment of our API

