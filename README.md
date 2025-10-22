# 🤖 Repipi Twitter Bot - Versión Supabase

Bot de Twitter que publica palabras del español mediante Supabase Edge Functions.

## 🌟 Características

- ✅ **Serverless**: Usando Supabase Edge Functions (Deno runtime)
- ✅ **API Endpoint**: Llama al endpoint para publicar un tweet
- ✅ **Autenticación**: Protegido con API key
- ✅ **Dataset Español**: Más de 20 países hispanohablantes
- ✅ **Twitter API v2**: Usando la última versión de la API

## 🏗️ Arquitectura

```
┌─────────────┐      HTTP POST      ┌──────────────────┐      OAuth 1.0a     ┌─────────────┐
│   Cliente   │ ──────────────────> │ Supabase Edge    │ ──────────────────> │ Twitter API │
│ (Browser/   │  Bearer Token Auth  │    Function      │   Firma HMAC-SHA1   │     v2      │
│  Cron Job)  │ <────────────────── │   (Deno)         │ <────────────────── │             │
└─────────────┘   JSON Response     └──────────────────┘   Tweet Response    └─────────────┘
```

## 🚀 Quick Start

### 1. Clonar e Instalar

```powershell
git clone <tu-repo>
cd RepipiTwitterbotJS
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env` y completa tus credenciales:

```env
API_KEY=tu_twitter_api_key
API_SECRET=tu_twitter_api_secret
ACCESS_TOKEN=tu_twitter_access_token
ACCESS_SECRET=tu_twitter_access_secret
API_BOT_KEY=tu_clave_secreta_para_autenticacion
```

### 3. Instalar Supabase CLI

```powershell
# Con Scoop
scoop install supabase

# O con npm
npm install -g supabase
```

### 4. Desplegar a Supabase

Sigue las instrucciones completas en [DEPLOYMENT.md](./DEPLOYMENT.md)

```powershell
# Login y enlazar proyecto
supabase login
supabase link --project-ref tu-project-ref

# Configurar secrets
supabase secrets set API_KEY=tu_api_key
supabase secrets set API_SECRET=tu_api_secret
supabase secrets set ACCESS_TOKEN=tu_access_token
supabase secrets set ACCESS_SECRET=tu_access_secret
supabase secrets set API_BOT_KEY=tu_clave_secreta

# Desplegar
supabase functions deploy tweet-word
```

## 🎯 Uso

### Llamar al endpoint para publicar un tweet

```powershell
# Con curl
curl -X POST https://tu-proyecto.supabase.co/functions/v1/tweet-word `
  -H "Authorization: Bearer tu_clave_secreta"
```

```javascript
// Con JavaScript
const response = await fetch(
  'https://tu-proyecto.supabase.co/functions/v1/tweet-word',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer tu_clave_secreta'
    }
  }
);

const data = await response.json();
console.log(data);
// { success: true, word: "...", tweetId: "...", tweetText: "..." }
```

### Probar localmente

```powershell
# Ejecutar función localmente
supabase functions serve tweet-word

# En otra terminal, probar el endpoint
node -r ts-node/register scripts/test-endpoint.ts
```

## 📁 Estructura del Proyecto

```
RepipiTwitterbotJS/
├── supabase/
│   └── functions/
│       └── tweet-word/           # Edge Function principal
│           ├── index.ts          # Código de la función
│           ├── deno.json         # Configuración Deno
│           └── import_map.json   # Imports de Deno
├── dataset/                      # Archivos de palabras por país
│   ├── ESP.txt
│   ├── MEX.txt
│   └── ...
├── scripts/
│   ├── test-endpoint.ts         # Script para probar endpoint
│   └── generate-dataset.ts      # Generador de dataset
├── src/                         # Código legacy (Express)
│   ├── index.ts
│   └── job.ts
├── .env.example                 # Ejemplo de variables
├── DEPLOYMENT.md               # Guía de deployment
└── README.md                   # Este archivo
```

## 🔄 Actualizar el Dataset

La Edge Function tiene un dataset limitado por defecto. Para usar todas tus palabras:

**Opción 1: Editar directamente en la función**

Edita `supabase/functions/tweet-word/index.ts` y actualiza el array `SPANISH_WORDS`.

**Opción 2: Usar Supabase Storage**

Sube tu dataset a Supabase Storage y cárgalo dinámicamente.

**Opción 3: Usar Supabase Database**

Crea una tabla en Supabase y carga las palabras desde allí.

## 🕐 Automatización

Para que el bot twitee automáticamente:

### GitHub Actions (Recomendado)

Crea `.github/workflows/tweet-hourly.yml`:

```yaml
name: Tweet Hourly
on:
  schedule:
    - cron: '0 * * * *'  # Cada hora
  workflow_dispatch:

jobs:
  tweet:
    runs-on: ubuntu-latest
    steps:
      - name: Tweet
        run: |
          curl -X POST ${{ secrets.SUPABASE_FUNCTION_URL }} \
            -H "Authorization: Bearer ${{ secrets.API_BOT_KEY }}"
```

### Servicios de Cron External

- [cron-job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)
- [Uptime Robot](https://uptimerobot.com) (monitoring + cron)

## 📊 Monitoreo

```powershell
# Ver logs en tiempo real
supabase functions logs tweet-word --tail

# Ver últimos logs
supabase functions logs tweet-word
```

## 🐛 Troubleshooting

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para soluciones comunes.

## 📚 Documentación

- [Deployment Guide](./DEPLOYMENT.md) - Guía completa de despliegue
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)

## 🛠️ Tecnologías

- **Runtime**: Deno (Supabase Edge Functions)
- **API**: Twitter API v2
- **Autenticación**: OAuth 1.0a (Twitter) + Bearer Token (Endpoint)
- **Hosting**: Supabase Edge Functions (Global CDN)

## 📝 Notas

- La versión anterior con Express sigue disponible en `src/`
- Las Edge Functions tienen un límite de 60 segundos por invocación
- Las funciones se ejecutan en el edge (baja latencia global)

## 📧 Autor

Creado con Twitter-api-v2 por Raul

## 📄 Licencia

[Tu licencia aquí]
