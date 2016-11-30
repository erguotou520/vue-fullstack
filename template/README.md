# {{name}}
This is a NodeJs fullstack project using `express`, `mongodb`, `passport`, `vue`, `vue-router`, `vuex`.

## Feature
- Separate for backend and frontend when development
- Configurable
- Restfull api

## Before dev
1. Install `mongodb` follow [official manual](https://docs.mongodb.com/manual/installation/). It's recommend to use [MongoChef](3t.io/mongochef/) as the db client.
2. NodeJs installed.
3. Clone this repo locally and `cd` in

## Dev step
1. Open terminal and run `npm install`
2. Run `npm run server`, this will initial the db and `User` document if not exists
3. Open other terminal and run `npm run client`, you can combine the two command with `npm run dev`
4. Open browser and nav to `localhost:8080` (the default port is 8080, if you change this, change the port)

## Build
Run `npm run build`
