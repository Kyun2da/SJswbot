module.exports = {
  apps: [
    {
      name: 'app',
      script: './server.js',
      autorestart: true,
      watch: true,
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
