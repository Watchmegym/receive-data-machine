const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const HTTP_PORT = Number(process.env.PORT || 3000);

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://tojadluvjldjwmvuuern.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvamFkbHV2amxkandtdnV1ZXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDU2NzUsImV4cCI6MjA2NDIyMTY3NX0.CRGa-eotkOrAh7Jz0MnFA4bVG-anqUG77QP5HYg49fM';

const supabase = createClient(supabaseUrl, supabaseKey);

// HTTP
const app = express();
// Aceita JSON globalmente
app.use(express.json({ limit: '50mb' }));

app.get('/db-status', async (req, res) => {
  try {
    // Teste de conexão com Supabase
    const { data, error } = await supabase
      .from('balanca_data')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    
    const dbInfo = {
      status: 'connected',
      message: 'Conexão com Supabase OK',
      timestamp: new Date().toISOString(),
      database: 'Supabase PostgreSQL'
    };
    
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Status do Banco - Supabase</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
                  color: #10b981;
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
                  background: #f0fdf4;
                  padding: 20px;
                  border-radius: 10px;
                  border-left: 4px solid #10b981;
                  text-align: left;
              }
              .info-item {
                  margin: 10px 0;
                  padding: 8px 0;
                  border-bottom: 1px solid #e5e7eb;
              }
              .info-item:last-child {
                  border-bottom: none;
              }
              .label {
                  font-weight: bold;
                  color: #374151;
              }
              .value {
                  color: #6b7280;
                  font-family: monospace;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="status">✅</div>
              <h1>Banco Conectado!</h1>
              <p>Conexão com Supabase estabelecida com sucesso.</p>
              
              <div class="info">
                  <div class="info-item">
                      <span class="label">Status:</span>
                      <span class="value">${dbInfo.status}</span>
                  </div>
                  <div class="info-item">
                      <span class="label">Mensagem:</span>
                      <span class="value">${dbInfo.message}</span>
                  </div>
                  <div class="info-item">
                      <span class="label">Database:</span>
                      <span class="value">${dbInfo.database}</span>
                  </div>
                  <div class="info-item">
                      <span class="label">Timestamp:</span>
                      <span class="value">${new Date(dbInfo.timestamp).toLocaleString('pt-BR')}</span>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erro de Conexão - Supabase</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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
                  color: #ef4444;
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
              .error {
                  background: #fef2f2;
                  padding: 20px;
                  border-radius: 10px;
                  border-left: 4px solid #ef4444;
                  text-align: left;
              }
              .error-item {
                  margin: 10px 0;
                  padding: 8px 0;
              }
              .label {
                  font-weight: bold;
                  color: #374151;
              }
              .value {
                  color: #6b7280;
                  font-family: monospace;
                  word-break: break-all;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="status">❌</div>
              <h1>Erro de Conexão!</h1>
              <p>Não foi possível conectar com o Supabase.</p>
              
              <div class="error">
                  <div class="error-item">
                      <span class="label">Status:</span>
                      <span class="value">error</span>
                  </div>
                  <div class="error-item">
                      <span class="label">Mensagem:</span>
                      <span class="value">Erro na conexão com Supabase</span>
                  </div>
                  <div class="error-item">
                      <span class="label">Detalhes:</span>
                      <span class="value">${error.message}</span>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `);
  }
});

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

app.post('/upload', async (req, res) => {
  console.log(req.body);
  
  try {
    // Teste de conexão com Supabase
    const { data, error } = await supabase
      .from('balanca_data')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    
    console.log('✅ Conexão com Supabase estabelecida!');
    res.status(200).json({ recode: 2000, remsg: 'success' });
  } catch (error) {
    console.error('❌ Erro na conexão com Supabase:', error.message);
    res.status(500).json({ recode: 5000, remsg: 'database error' });
  }
});


app.listen(HTTP_PORT, () => {
  console.log(`Servidor rodando na porta ${HTTP_PORT}`);
});