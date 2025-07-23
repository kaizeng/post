@reboot cd /home/ubuntu/app-root && pm2 start ecosystem.config.js --env development
0 4 * * * pm2 restart ecosystem.config.js --env development

# Deploy editor assets
Run `npm run deploy-editor` to copy PHP, JavaScript and CSS files
from `/home3/kzenginf/git/editor` to
`/home3/kzenginf/public_html/book/editor`.
