module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name",
      "default": "vue-fullstack"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A vue-fullstack project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "backendPort": {
      "type": "string",
      "message": "Port that backend server listen at development environment",
      "default": 9000
    },
    "frontendPort": {
      "type": "string",
      "message": "Port that frontend server listen at development environment",
      "default": 9001
    },
    "mongoUri": {
      "type": "string",
      "message": "MongoDB uri, '-dev' will append to the uri in development"
    },
    "i18n": {
      "type": "confirm",
      "message": "Need vue-i18n?"
    }
  },
  "filters": {
    "client/src/locale/**/*.*": "i18n"
  },
  "skipInterpolation": "client/**/*.vue",
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run server\n  npm run client"
};
