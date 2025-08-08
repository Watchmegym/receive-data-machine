'use strict';

const fs = require('fs');
const path = require('path');
const net = require('net');
const dgram = require('dgram');
const express = require('express');

// Configurações (sem necessidade de .env). Ajuste as portas se necessário.
const HTTP_PORT = Number(process.env.HTTP_PORT || 3000);
const TCP_PORT = Number(process.env.TCP_PORT || 4000);
const UDP_PORT = Number(process.env.UDP_PORT || 5000);
const LOG_FILE = process.env.LOG_FILE || path.join(__dirname, 'received.log');

function timestamp() {
  return new Date().toISOString();
}

function toHexPreview(buffer, maxBytes = 64) {
  if (!Buffer.isBuffer(buffer)) return '';
  if (buffer.length <= maxBytes) return buffer.toString('hex');
  return buffer.subarray(0, maxBytes).toString('hex') + '...';
}

function appendLog(line) {
  fs.appendFile(LOG_FILE, line + '\n', (err) => {
    if (err) {
      console.error(`[${timestamp()}] ERRO ao gravar log:`, err.message);
    }
  });
}

function logReceived(source, info, buffer) {
  const meta = `${source}${info ? ' ' + info : ''}`.trim();
  const hex = toHexPreview(buffer);
  const len = Buffer.isBuffer(buffer) ? buffer.length : 0;
  const line = `[${timestamp()}] ${meta} bytes=${len} hex=${hex}`;
  console.log(line);
  appendLog(line);
}

// HTTP
const app = express();
// Aceita JSON globalmente
app.use(express.json({ limit: '50mb' }));

// Endpoint genérico existente (usa raw apenas aqui)
app.post('/data', express.raw({ type: '*/*', limit: '50mb' }), (req, res) => {
  const buffer = Buffer.isBuffer(req.body)
    ? req.body
    : Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {}));
  logReceived('HTTP', `${req.ip || ''} ${req.headers['content-type'] || ''}`.trim(), buffer);
  res.status(200).send('OK');
});

// Conforme protocolo: POST /upload com JSON contendo campos do anexo
app.post('/upload', (req, res) => {
  try {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const jsonStr = JSON.stringify(body);
    logReceived('HTTP/UPLOAD', req.ip || '', Buffer.from(jsonStr));
    // Resposta conforme documento
    res.status(200).json({ recode: 2000, remsg: 'success' });
  } catch (err) {
    console.error(`[${timestamp()}] Erro /upload: ${err.message}`);
    res.status(200).json({ recode: 5000, remsg: 'parsing error' });
  }
});

// Rota de teste/saúde do serviço
app.get('/test', (req, res) => {
  res.status(200).json({ status: 'ok', time: timestamp() });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor ativo. Envie POST /upload (JSON) ou POST /data (qualquer payload).',
    httpPort: HTTP_PORT,
    tcpPort: TCP_PORT,
    udpPort: UDP_PORT,
  });
});

const httpServer = app.listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`[${timestamp()}] HTTP ouvindo em 0.0.0.0:${HTTP_PORT}`);
});

// TCP
const tcpServer = net.createServer((socket) => {
  const peer = `${socket.remoteAddress || ''}:${socket.remotePort || ''}`;
  console.log(`[${timestamp()}] TCP conexão de ${peer}`);

  socket.on('data', (chunk) => {
    logReceived('TCP', peer, chunk);
  });

  socket.on('error', (err) => {
    console.error(`[${timestamp()}] TCP erro de ${peer}: ${err.message}`);
  });

  socket.on('close', () => {
    console.log(`[${timestamp()}] TCP conexão encerrada ${peer}`);
  });
});

tcpServer.listen(TCP_PORT, '0.0.0.0', () => {
  console.log(`[${timestamp()}] TCP ouvindo em 0.0.0.0:${TCP_PORT}`);
});

// UDP
const udpServer = dgram.createSocket('udp4');

udpServer.on('message', (msg, rinfo) => {
  const info = `${rinfo.address}:${rinfo.port}`;
  logReceived('UDP', info, msg);
});

udpServer.on('listening', () => {
  const addr = udpServer.address();
  console.log(`[${timestamp()}] UDP ouvindo em ${addr.address}:${addr.port}`);
});

udpServer.on('error', (err) => {
  console.error(`[${timestamp()}] UDP erro: ${err.message}`);
});

udpServer.bind(UDP_PORT, '0.0.0.0');

// Encerramento gracioso
function shutdown() {
  console.log(`[${timestamp()}] Encerrando...`);
  httpServer.close(() => console.log(`[${timestamp()}] HTTP fechado`));
  tcpServer.close(() => console.log(`[${timestamp()}] TCP fechado`));
  try { udpServer.close(); console.log(`[${timestamp()}] UDP fechado`); } catch (_) {}
  // Aguarda um pouco para fechar arquivos de log
  setTimeout(() => process.exit(0), 500);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);