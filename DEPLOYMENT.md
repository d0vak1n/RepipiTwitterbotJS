# 🤖 Repipi Twitter Bot con Supabase

Bot de Twitter que publica palabras del español mediante endpoints de Supabase Edge Functions.

## 📋 Requisitos Previos

1. **Cuenta de Supabase**: Crea una cuenta en [supabase.com](https://supabase.com)
2. **Twitter Developer Account**: Obtén credenciales en [developer.twitter.com](https://developer.twitter.com)
3. **Supabase CLI**: Instala el CLI de Supabase

```powershell
# Instalar Supabase CLI
scoop install supabase

# O con npm
npm install -g supabase
```

## 🚀 Configuración Inicial

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. Copia las credenciales del proyecto (API URL y anon key)

### 2. Configurar Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Edita `.env` y añade tus credenciales:

```env
# Twitter API
API_KEY=tu_api_key
API_SECRET=tu_api_secret
ACCESS_TOKEN=tu_access_token
ACCESS_SECRET=tu_access_secret

# Autenticación del Bot
API_BOT_KEY=una_clave_secreta_segura

# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key
```

### 3. Inicializar Supabase en el Proyecto

```powershell
# Login en Supabase
supabase login

# Enlazar tu proyecto
supabase link --project-ref tu-project-ref
```

El `project-ref` lo encuentras en la URL de tu proyecto: `https://app.supabase.com/project/[project-ref]`

## 📦 Deployment de Edge Functions

### 1. Configurar Secrets en Supabase

Antes de desplegar, configura las variables de entorno en Supabase:

```powershell
# Twitter API credentials
supabase secrets set API_KEY=tu_api_key
supabase secrets set API_SECRET=tu_api_secret
supabase secrets set ACCESS_TOKEN=tu_access_token
supabase secrets set ACCESS_SECRET=tu_access_secret

# Bot authentication key
supabase secrets set API_BOT_KEY=tu_clave_secreta
```

### 2. Desplegar la Edge Function

```powershell
# Desplegar la función tweet-word
supabase functions deploy tweet-word

# Ver logs en tiempo real
supabase functions logs tweet-word --tail
```

## 🎯 Uso del Endpoint

Una vez desplegada, tu Edge Function estará disponible en:

```
https://tu-proyecto.supabase.co/functions/v1/tweet-word
```

### Hacer una petición al endpoint:

**Con curl:**

```powershell
curl -X POST https://tu-proyecto.supabase.co/functions/v1/tweet-word `
  -H "Authorization: Bearer tu_clave_secreta" `
  -H "Content-Type: application/json"
```

**Con JavaScript:**

```javascript
const response = await fetch(
  "https://tu-proyecto.supabase.co/functions/v1/tweet-word",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer tu_clave_secreta",
      "Content-Type": "application/json",
    },
  }
);

const data = await response.json();
console.log(data);
// { success: true, word: "...", tweetId: "...", tweetText: "..." }
```

**Desde el navegador:**

Simplemente visita la URL (aunque es mejor usar POST con autenticación):

```
https://tu-proyecto.supabase.co/functions/v1/tweet-word
```

## 🔄 Actualizar la Edge Function

Si haces cambios en el código:

```powershell
# 1. Modifica el archivo: supabase/functions/tweet-word/index.ts

# 2. Redespliega la función
supabase functions deploy tweet-word

# 3. Verifica los logs
supabase functions logs tweet-word --tail
```

## 📊 Agregar más palabras al Dataset

Por defecto, la Edge Function tiene un dataset limitado. Para usar todas tus palabras:

1. Edita `supabase/functions/tweet-word/index.ts`
2. Reemplaza el array `SPANISH_WORDS` con todas tus palabras
3. O mejor, carga las palabras desde Supabase Storage o Database

### Opción: Cargar palabras desde Supabase Storage

```typescript
// En la Edge Function, carga las palabras desde Storage
const { data, error } = await supabase.storage
  .from("datasets")
  .download("spanish-words.txt");

if (data) {
  const text = await data.text();
  const words = text.split("\n").filter((w) => w.trim());
  // Usar words...
}
```

## 🔧 Comandos Útiles

```powershell
# Ver todas las funciones desplegadas
supabase functions list

# Ver logs de una función
supabase functions logs tweet-word

# Eliminar una función
supabase functions delete tweet-word

# Ejecutar función localmente (desarrollo)
supabase functions serve tweet-word
```

## 🕐 Automatización (Opcional)

Para que el bot twitee automáticamente cada hora, puedes usar:

### Opción 1: Cron Job de Supabase (Recomendado)

Supabase no tiene cron jobs nativos, pero puedes usar servicios externos:

**Con GitHub Actions:**

```yaml
# .github/workflows/tweet-hourly.yml
name: Tweet Hourly
on:
  schedule:
    - cron: "0 * * * *" # Cada hora
  workflow_dispatch:

jobs:
  tweet:
    runs-on: ubuntu-latest
    steps:
      - name: Call Supabase Edge Function
        run: |
          curl -X POST ${{ secrets.SUPABASE_FUNCTION_URL }} \
            -H "Authorization: Bearer ${{ secrets.API_BOT_KEY }}"
```

### Opción 2: Servicio Externo (cron-job.org)

1. Ve a [cron-job.org](https://cron-job.org)
2. Crea una cuenta
3. Crea un nuevo cron job que llame a tu endpoint cada hora

### Opción 3: EasyCron

1. Ve a [easycron.com](https://www.easycron.com)
2. Configura un cron job HTTP que llame a tu endpoint

## 🐛 Troubleshooting

### Error: "Unauthorized"

- Verifica que estás enviando el header `Authorization` correcto
- Confirma que `API_BOT_KEY` está configurado en Supabase secrets

### Error: "Twitter API returned 401"

- Revisa tus credenciales de Twitter API
- Asegúrate de que las variables están correctamente configuradas en Supabase secrets

### Ver logs detallados:

```powershell
supabase functions logs tweet-word --tail
```

## 📝 Notas

- Las Edge Functions de Supabase usan **Deno** (no Node.js)
- Los errores de TypeScript en VS Code son normales (usa Deno)
- El límite de ejecución es de 60 segundos por invocación
- Las funciones se ejecutan en el edge (baja latencia global)

## 🔗 Enlaces Útiles

- [Documentación Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Twitter API v2 Documentation](https://developer.twitter.com/en/docs/twitter-api)
- [Deno Documentation](https://deno.land/manual)

## 📧 Soporte

Si tienes problemas, revisa los logs:

```powershell
supabase functions logs tweet-word --tail
```
