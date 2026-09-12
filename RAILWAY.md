# PODH Backend — Railway sementara

Backend: Laravel + PostgreSQL.

## Railway
Service yang direncanakan:
- `podh-backend`
- `Postgres`

Root directory untuk Laravel:
`/backend`

Healthcheck:
`/api/health`

Pre-deploy:
`chmod +x ./railway/init-app.sh && sh ./railway/init-app.sh`

Start command:
`php artisan serve --host=0.0.0.0 --port=$PORT`

Minimum env production:
- APP_NAME=PODH
- APP_ENV=production
- APP_DEBUG=false
- APP_URL=https://<backend-railway>
- FRONTEND_URL=https://muara-badak-bersatu.vercel.app
- APP_KEY=<generated>
- DB_CONNECTION=pgsql
- DB_URL=${{Postgres.DATABASE_URL}}
- GOOGLE_CLIENT_ID=<secret>
- GOOGLE_CLIENT_SECRET=<secret>
- GOOGLE_REDIRECT_URI=https://<backend-railway>/api/auth/google/callback

Generate APP_KEY:
`php artisan key:generate --show`

## AWS nanti
- Laravel service -> ECS/Fargate atau App Runner
- PostgreSQL -> RDS PostgreSQL
- Private files -> S3
- Queue -> SQS bila diperlukan
- Email -> SES bila dipilih
- Secret -> Secrets Manager / Parameter Store
