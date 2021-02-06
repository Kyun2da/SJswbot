module.exports = {
  apps: [
    {
      name: 'app',
      script: './server.js',
      autorestart: true,
      watch: true,
      instances: 'max',
      ignore_watch: ['node_modules', 'uploads'],
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
