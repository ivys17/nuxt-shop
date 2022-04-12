module.exports = {
  apps: [
    {
      name: 'app-front',
      exec_mode: 'cluster',
      instances: '1', // max or a number of instances
      script: 'npm',
      args: 'run start',
    },
    {
      name: 'app-front',
      exec_mode: 'cluster',
      instances: '1', // max or a number of instances
      script: './api/app.js',
    },
  ],
};
