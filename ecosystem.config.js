// ecosystem.config.js - PM2 config for dev mode with CRA dev server
module.exports = {
    apps: [
      {
        name: "example-api",
        script: "example-api-app.js",
        cwd: "./example-app",
        watch: false,
        env: {
          NODE_ENV: "development"
        }
      },
      {
        name: "server",
        script: "server.js",
        cwd: "./",
        watch: ["server.js", "worker.js", "apps_config.json"],
        env: {
          NODE_ENV: "development"
        }
      },
      {
        name: "client",
        cwd: "./client",
        script: "npm",
        args: "start",
        interpreter: "bash",
        watch: false,
        env: {
          NODE_ENV: "development",
          PORT: 3001,
          HOST: "127.0.0.1"
        }
      }
    ]
  };
  