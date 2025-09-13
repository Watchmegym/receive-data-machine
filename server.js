const express = require('express');

const HTTP_PORT = Number(process.env.PORT || 3000);

// HTTP
const app = express();
// Aceita JSON globalmente
app.use(express.json({ limit: '50mb' }));

app.get('/test', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servidor Funcionando</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            .status {
                color: #4CAF50;
                font-size: 48px;
                margin-bottom: 20px;
            }
            h1 {
                color: #333;
                margin-bottom: 10px;
                font-size: 28px;
            }
            p {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                border-left: 4px solid #4CAF50;
            }
            .endpoint {
                background: #e3f2fd;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                color: #1976d2;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="status">✅</div>
            <h1>Servidor Funcionando!</h1>
            <p>Seu servidor Node.js está rodando perfeitamente.</p>
            
            <div class="info">
                <h3>Endpoints Disponíveis:</h3>
                <div class="endpoint">GET /test - Esta página</div>
                <div class="endpoint">POST /upload - Receber dados</div>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.post('/upload', (req, res) => {
  console.log(req.body);
  res.status(200).json({ recode: 2000, remsg: 'success' });
});


app.listen(HTTP_PORT, () => {
  console.log(`Servidor rodando na porta ${HTTP_PORT}`);
});