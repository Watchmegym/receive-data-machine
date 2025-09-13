const express = require('express');

const HTTP_PORT = Number(process.env.PORT || 3000);

// HTTP
const app = express();
// Aceita JSON globalmente
app.use(express.json({ limit: '50mb' }));

app.post('/upload', (req, res) => {
  console.log(req.body);
  res.status(200).json({ recode: 2000, remsg: 'success' });
});


app.listen(HTTP_PORT, () => {
  console.log(`Servidor rodando na porta ${HTTP_PORT}`);
});