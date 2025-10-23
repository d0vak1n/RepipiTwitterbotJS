import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getRandomWord } from "./wordSelector.ts";

interface TweetV2PostTweetResult {
  data: {
    id: string;
    text: string;
  };
}

serve(async (req) => {
  // Manejo de CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Verificar autenticación
    const authHeader = req.headers.get("Authorization");
    const API_BOT_KEY = Deno.env.get("API_BOT_KEY");

    if (!authHeader || !authHeader.includes(API_BOT_KEY || "")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Get a random word from a random dataset file
    const { word, country } = await getRandomWord();
    const tweetText = `Que te pasa, ${word}?`;

    console.log(`Tweeting word: ${word} from ${country}`);

    // Configurar credenciales de Twitter
    const apiKey = Deno.env.get("API_KEY");
    const apiSecret = Deno.env.get("API_SECRET");
    const accessToken = Deno.env.get("ACCESS_TOKEN");
    const accessSecret = Deno.env.get("ACCESS_SECRET");

    if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
      throw new Error("Missing Twitter API credentials");
    }

    // Crear OAuth 1.0a signature para Twitter API v2
    const oauthNonce = generateNonce();
    const oauthTimestamp = Math.floor(Date.now() / 1000).toString();

    const oauthParams = {
      oauth_consumer_key: apiKey,
      oauth_nonce: oauthNonce,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: oauthTimestamp,
      oauth_token: accessToken,
      oauth_version: "1.0",
    };

    // Generar firma OAuth
    const signature = await generateOAuthSignature(
      "POST",
      "https://api.twitter.com/2/tweets",
      oauthParams,
      apiSecret,
      accessSecret
    );

    const authorizationHeader = `OAuth ${Object.entries({
      ...oauthParams,
      oauth_signature: signature,
    })
      .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
      .join(", ")}`;

    // Hacer el tweet usando Twitter API v2
    const twitterResponse = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: tweetText,
      }),
    });

    if (!twitterResponse.ok) {
      const errorText = await twitterResponse.text();
      console.error("Twitter API Error:", errorText);
      throw new Error(
        `Twitter API returned ${twitterResponse.status}: ${errorText}`
      );
    }

    const tweetData: TweetV2PostTweetResult = await twitterResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        word: word,
        country: country,
        tweetId: tweetData.data.id,
        tweetText: tweetData.data.text,
        message: "Tweet posted successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        success: false,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

// Función para generar nonce aleatorio
function generateNonce(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Función para generar la firma OAuth 1.0a
async function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): Promise<string> {
  // Ordenar parámetros alfabéticamente
  const sortedParams = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  // Crear signature base string
  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(sortedParams),
  ].join("&");

  // Crear signing key
  const signingKey = `${encodeURIComponent(
    consumerSecret
  )}&${encodeURIComponent(tokenSecret)}`;

  // Generar HMAC-SHA1 signature
  const encoder = new TextEncoder();
  const keyData = encoder.encode(signingKey);
  const messageData = encoder.encode(signatureBaseString);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);

  // Convertir a base64
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
