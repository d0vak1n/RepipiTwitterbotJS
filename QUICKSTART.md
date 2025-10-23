# 🚀 QUICK START - Despliegue Rápido

## Pasos para tener tu bot funcionando en 10 minutos

### 1. Instalar Supabase CLI (1 minuto)

```powershell
scoop install supabase
# O: npm install -g supabase
```

### 2. Crear proyecto en Supabase (2 minutos)

1. Ve a https://supabase.com
2. Crea cuenta / Login
3. Click "New Project"
4. Copia el "Project Reference ID" (está en la URL)

### 3. Login y Enlazar (1 minuto)

```powershell
supabase login
supabase link --project-ref TU_PROJECT_REF
```

### 4. Configurar Secrets (2 minutos)

```powershell
supabase secrets set API_KEY=tu_twitter_api_key
supabase secrets set API_SECRET=tu_twitter_api_secret
supabase secrets set ACCESS_TOKEN=tu_twitter_access_token
supabase secrets set ACCESS_SECRET=tu_twitter_access_secret
supabase secrets set API_BOT_KEY=tu_clave_secreta
```

### 5. Desplegar (1 minuto)

```powershell
supabase functions deploy tweet-word
```

### 6. Probar (1 minuto)

```powershell
# Obtén la URL de tu función
# https://TU_PROJECT_REF.supabase.co/functions/v1/tweet-word

curl -X POST https://TU_PROJECT_REF.supabase.co/functions/v1/tweet-word `
  -H "Authorization: Bearer tu_clave_secreta"
```

## ✅ ¡Listo!

Tu endpoint está funcionando. Cada vez que lo visites, se publicará un tweet.

## 🕐 Automatizar (Opcional)

### Con GitHub Actions

1. Ve a tu repo en GitHub
2. Settings → Secrets → Actions
3. Agrega: `SUPABASE_FUNCTION_URL` y `API_BOT_KEY`
4. Crea `.github/workflows/tweet.yml`:

```yaml
name: Tweet Hourly
on:
  schedule:
    - cron: "0 * * * *"
jobs:
  tweet:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST ${{ secrets.SUPABASE_FUNCTION_URL }} \
            -H "Authorization: Bearer ${{ secrets.API_BOT_KEY }}"
```

### Con cron-job.org

1. Ve a https://cron-job.org
2. Crea cuenta
3. New Cron Job
4. URL: `https://TU_PROJECT_REF.supabase.co/functions/v1/tweet-word`
5. Frecuencia: Cada hora
6. Headers: `Authorization: Bearer tu_clave_secreta`

## 📊 Ver Logs

```powershell
supabase functions logs tweet-word --tail
```

## 🆘 ¿Problemas?

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para troubleshooting completo.
