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
      "message": "MongoDB uri, '-dev' will be appended in development, default is local uri"
    },
    "i18n": {
      "type": "confirm",
      "message": "Need vue-i18n?"
    }
  },
  "filters": {
    "tasks/**/*.*": "!i18n"
  },
  "skipInterpolation": "{client/**/*.vue,tasks/**/*.*}",
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n{{#unless i18n}}  npm run remove:i18n\n{{/unless}}  npm run server\n  npm run client"
};
