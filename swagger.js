module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0',
    title: 'Api · Notbadcode',
    description: 'Api for Notbadcode projects',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  security: [{
    Bearer: []
  }],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: 'http://localhost:3000/api/notbadcode',
      description: 'Local server'
    },
    {
      url: 'https://api.notbadcode.xyz/api/notbadcode',
      description: 'Production server'
    }
  ],
  tags: [{
    name: 'App Colors'
  }],
  paths: {
    '/app-colors/palettes': {
      get: {
        tags: ['App Colors'],
        description: 'Get users',
        operationId: 'app-color/getPalettes',
        responses: {}
      }
    }
  }
}