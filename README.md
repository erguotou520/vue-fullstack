# Vue fullstack template
This project's target is to helper people to create a **Reactivity, Realtime, User friendly** backend system.

## Requirement
- `Mongodb` This project require `mongodb` as the db store, you can follow [it's tutorial](https://docs.mongodb.com/manual/administration/install-community/) to install if you do not installed.
- Base `vue` skills

## Usage
This is a project template for vue-cli. It is recommended to use npm 3+ for a more efficient dependency tree.
```shell
# cli version must greater than 2.5.0
$ npm install -g vue-cli
$ vue init erguotou520/vue-fullstack my-project
$ cd my-project
$ npm install
# This runs a express server
$ npm run server
# Open other terminal and cd into my-project
# This runs a frontend dev server
$ npm run client
```

## What's Included
- `vue`
- `vue-router`
- `vuex`
- `vue-i18n`
- `vue-resource`
- `element-ui`
- `express`
- `mongoose`
- `socket.io`

## Demo app
Here is a [demo](https://vue-fullstack-demo.herokuapp.com) and the demo repo is [here](https://github.com/erguotou520/vue-fullstack-demo)  
This is [other one](http://meals.erguotou.me)  
```
username: admin
password: admin
```

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

## At the end
I am very glad to receive your suggestions and pull request.
