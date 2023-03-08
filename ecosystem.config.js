module.exports = {
  apps: [
    {
      name: "BotTwitter",
      script: "./bot.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
