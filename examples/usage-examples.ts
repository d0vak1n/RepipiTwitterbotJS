// Ejemplos de cómo llamar al endpoint desde diferentes plataformas

// ============================================
// 1. JAVASCRIPT/TYPESCRIPT (Node.js o Browser)
// ============================================

async function tweetFromEndpoint() {
  const SUPABASE_FUNCTION_URL =
    "https://tu-proyecto.supabase.co/functions/v1/tweet-word";
  const API_BOT_KEY = "tu_clave_secreta";

  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_BOT_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log("✅ Tweet publicado!");
      console.log("Palabra:", data.word);
      console.log("Tweet ID:", data.tweetId);
      console.log(
        "Ver tweet:",
        `https://twitter.com/user/status/${data.tweetId}`
      );
    } else {
      console.error("❌ Error:", data.error);
    }
  } catch (error) {
    console.error("❌ Error de red:", error);
  }
}

// ============================================
// 2. JQUERY
// ============================================

$.ajax({
  url: "https://tu-proyecto.supabase.co/functions/v1/tweet-word",
  type: "POST",
  headers: {
    Authorization: "Bearer tu_clave_secreta",
  },
  success: function (data) {
    console.log("Tweet publicado:", data);
  },
  error: function (error) {
    console.error("Error:", error);
  },
});

// ============================================
// 3. AXIOS
// ============================================

import axios from "axios";

async function tweetWithAxios() {
  try {
    const response = await axios.post(
      "https://tu-proyecto.supabase.co/functions/v1/tweet-word",
      {},
      {
        headers: {
          Authorization: "Bearer tu_clave_secreta",
        },
      }
    );
    console.log("Tweet publicado:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

// ============================================
// 4. PYTHON
// ============================================

/*
import requests

def tweet_from_endpoint():
    url = 'https://tu-proyecto.supabase.co/functions/v1/tweet-word'
    headers = {
        'Authorization': 'Bearer tu_clave_secreta',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, headers=headers)
    
    if response.ok:
        data = response.json()
        print(f"✅ Tweet publicado: {data['word']}")
        print(f"Tweet ID: {data['tweetId']}")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)

tweet_from_endpoint()
*/

// ============================================
// 5. CURL (PowerShell)
// ============================================

/*
curl -X POST https://tu-proyecto.supabase.co/functions/v1/tweet-word `
  -H "Authorization: Bearer tu_clave_secreta" `
  -H "Content-Type: application/json"
*/

// ============================================
// 6. CURL (Bash/Linux)
// ============================================

/*
curl -X POST https://tu-proyecto.supabase.co/functions/v1/tweet-word \
  -H "Authorization: Bearer tu_clave_secreta" \
  -H "Content-Type: application/json"
*/

// ============================================
// 7. PHP
// ============================================

/*
<?php
$url = 'https://tu-proyecto.supabase.co/functions/v1/tweet-word';
$headers = [
    'Authorization: Bearer tu_clave_secreta',
    'Content-Type: application/json'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    echo "✅ Tweet publicado: " . $data['word'] . "\n";
} else {
    echo "❌ Error: " . $httpCode . "\n";
}
?>
*/

// ============================================
// 8. HTML + JAVASCRIPT (Botón en página web)
// ============================================

/*
<!DOCTYPE html>
<html>
<head>
    <title>Bot Tweet</title>
</head>
<body>
    <button id="tweetBtn">🐦 Publicar Tweet</button>
    <div id="result"></div>

    <script>
        document.getElementById('tweetBtn').addEventListener('click', async () => {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'Publicando...';

            try {
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
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        ✅ Tweet publicado!<br>
                        Palabra: ${data.word}<br>
                        <a href="https://twitter.com/user/status/${data.tweetId}" 
                           target="_blank">Ver tweet</a>
                    `;
                } else {
                    resultDiv.textContent = `❌ Error: ${data.error}`;
                }
            } catch (error) {
                resultDiv.textContent = `❌ Error: ${error.message}`;
            }
        });
    </script>
</body>
</html>
*/

// ============================================
// 9. REACT
// ============================================

/*
import React, { useState } from 'react';

function TweetButton() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTweet = async () => {
    setLoading(true);
    setStatus('Publicando...');

    try {
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
      
      if (data.success) {
        setStatus(`✅ Tweet publicado: ${data.word}`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleTweet} disabled={loading}>
        {loading ? 'Publicando...' : '🐦 Publicar Tweet'}
      </button>
      <p>{status}</p>
    </div>
  );
}
*/

// ============================================
// 10. GOOGLE APPS SCRIPT (Sheets, Calendar, etc)
// ============================================

/*
function tweetFromGoogleSheets() {
  var url = 'https://tu-proyecto.supabase.co/functions/v1/tweet-word';
  var options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer tu_clave_secreta',
      'Content-Type': 'application/json'
    }
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var data = JSON.parse(response.getContentText());
    Logger.log('Tweet publicado: ' + data.word);
  } catch (error) {
    Logger.log('Error: ' + error);
  }
}
*/

// ============================================
// 11. ZAPIER / MAKE.COM / N8N
// ============================================

/*
Webhook Configuration:
- URL: https://tu-proyecto.supabase.co/functions/v1/tweet-word
- Method: POST
- Headers: 
  - Authorization: Bearer tu_clave_secreta
  - Content-Type: application/json
- Body: {} (vacío)
*/

// ============================================
// 12. POSTMAN
// ============================================

/*
1. Abre Postman
2. New Request → POST
3. URL: https://tu-proyecto.supabase.co/functions/v1/tweet-word
4. Headers:
   - Authorization: Bearer tu_clave_secreta
   - Content-Type: application/json
5. Body: raw JSON {}
6. Click Send
*/

export { tweetFromEndpoint };
