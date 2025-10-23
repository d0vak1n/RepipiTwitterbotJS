// Script para probar el endpoint localmente

const SUPABASE_FUNCTION_URL = process.env.SUPABASE_URL
  ? `${process.env.SUPABASE_URL}/functions/v1/tweet-word`
  : "http://localhost:54321/functions/v1/tweet-word"; // URL local por defecto

const API_BOT_KEY = process.env.API_BOT_KEY;

async function testEndpoint() {
  console.log("🚀 Probando endpoint:", SUPABASE_FUNCTION_URL);
  console.log(
    "🔑 Usando API_BOT_KEY:",
    API_BOT_KEY ? "✅ Configurada" : "❌ No configurada"
  );

  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_BOT_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log("\n📊 Respuesta:");
    console.log("Status:", response.status, response.statusText);
    console.log("Data:", data);

    if (response.ok) {
      console.log("\n✅ ¡Tweet publicado exitosamente!");
      if (typeof data === "object" && data.tweetId) {
        console.log(
          `🐦 Ver tweet: https://twitter.com/user/status/${data.tweetId}`
        );
      }
    } else {
      console.log("\n❌ Error al publicar tweet");
    }
  } catch (error) {
    console.error("\n❌ Error:", error);
    console.log("\nVerifica que:");
    console.log("1. La Edge Function está desplegada");
    console.log("2. Las variables de entorno están configuradas");
    console.log("3. La URL del endpoint es correcta");
  }
}

// Ejecutar test
testEndpoint();
