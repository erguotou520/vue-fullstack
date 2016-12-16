# {{name}}
This is a NodeJs fullstack project using `express`, `mongodb`, `passport`, `vue`, `vue-router`, `vuex`, etc.

## Feature
- Separate for backend and frontend when development
- Configurable
- Restfull api

## Before dev
1. Install `mongodb` follow [official manual](https://docs.mongodb.com/manual/installation/). It's recommend to use [MongoChef](3t.io/mongochef/) as the db client.
2. NodeJs installed.

## Dev step
1. Open terminal and run `npm install`, if you don't choose i18n when initialization, you need to run `npm run remove:i18n` here manually
2. Run `npm run server`, this will initial the db and `User` document if not exists
3. Open other terminal and run `npm run client`, you can combine the two command with `npm run dev`
4. Open browser and nav to `localhost:9001` (the default port is 9001, if you change this, change the port)

## Build
Run `npm run build`

## App structure
```
├─client               # frontend source folder
│  ├─build             # frontend dev scripts
│  ├─src               # frontend src
│  │  ├─assets
│  │  │  ├─css
│  │  │  ├─fonts
│  │  │  └─images
│  │  ├─components     # vue components
│  │  ├─http           # vue-resource configuration
│  │  ├─locale         # vue-i18n configuration
│  │  ├─router         # vue-router configuration
│  │  ├─socket         # socket.io configuration
│  │  ├─storage        # web storage api
│  │  ├─store          # vuex store
│  │  │  └─modules
│  │  └─view           # app pages
│  │     └─auth
│  └─static            # static folder
└─server               # backend server folder
    ├─api              # backend api list
    │  ├─thing
    │  └─user
    ├─auth             # user auth logical
    │  └─local
    ├─components       # server components
    │  └─errors
    ├─config           # server configs, contains express socket.io, etc.
    └─views            # server servered pages
```

## Configuration
Most of the configuration is concentrated in the `config.js` file, and most of them have explicit comments, you need to take a look at it first.

Here is some important/frequently-used configuration:
- `frontend.port` port that frontend server listens at
- `backend.port` port that backend server listen at
- `backend.secrets.session` secret for session, important when you deploy your app, make sure it's complex enough
- `backend.mongo.uri` change this if your mongodb uri is not matched
- `backend.serverFrontend` whether to server the frontend code. If set to `true` the express server servers the frontend code, otherwise you may need a http server like nginx to server frontend code and there is a nginx configuration at `nginx.example.conf` (default true)

## Environment variable
When you deploy your app to you cloud server, it's easy to config you app with `environment variable`, here is the supported:  
- `APP_port` or `PORT`: set to `backend.port`
- `APP_HOST` or `APP_IP` or `HOST` or `IP`: set to `backend.ip`
- `MONGODB_URI` or `MONGOHQ_URI`: set to `backend.mongo.uri`
- `SECRET`: set to `backend.secrets.session`

## Notice
The generated app is just a template to build your app system fast, maybe it can't meet your needs, so you need to do some change at this issue.

## License
Under [MIT license](./LICENSE)
