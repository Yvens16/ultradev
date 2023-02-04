set -e

dotenv -e .env.test npm run build
dotenv -e .env.test npm run start &
dotenv -e .env.test npm run stripe:mock-server & npm run cypress:headless
exit 0