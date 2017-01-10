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
    "mock": {
      "type": "list",
      "message": "Use real backend server or mock server",
      "choices": [{
        "name": "Backend server",
        "value": "backend",
        "short": "Backend"
      }, {
        "name": "Mock server",
        "value": "mock",
        "short": "Mock"
      }]
    },
    "backendPort": {
      "type": "string",
      "when": "mock==='backend'",
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
      "when": "mock==='backend'",
      "message": "MongoDB uri, '-dev' will be appended in development, default is local uri"
    },
    "mockPort": {
      "type": "string",
      "when": "mock==='mock'",
      "message": "Port that mock server listen at",
      "default": 7878
    },
    "i18n": {
      "type": "confirm",
      "message": "Need vue-i18n?"
    }
  },
  "filters": {
    "tasks/replaceI18n.js": "!i18n",
    "tasks/mock.js": "mock==='mock'",
    "tasks/remove.js": "!i18n||mock==='mock'",
    "mock/**/*": "mock==='mock'"
  },
  "skipInterpolation": "{client/**/*.vue,tasks/**/*.*}",
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n{{#if_eq mock 'mock'}}  npm run remove:mock\n{{/if_eq}}{{#unless i18n}}  npm run remove:i18n\n{{/unless}}{{#if_eq mock 'backend'}}  npm run server\n{{/if_eq}}{{#if_eq mock 'mock'}}  npm run mock\n{{/if_eq}}  npm run client"
};
