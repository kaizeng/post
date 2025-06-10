@reboot cd /home/ubuntu/app-root && pm2 start ecosystem.config.js --env development

0 4 * * * pm2 restart ecosystem.config.js --env development