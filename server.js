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

// Função para mapear dados do JSON para colunas da tabela
function mapDataToTable(data, deviceInfo) {
  const mapped = {};
  
  // Campos do dispositivo
  if (deviceInfo.deviceModel) mapped.device_model = deviceInfo.deviceModel;
  if (deviceInfo.unitName) mapped.unit_name = deviceInfo.unitName;
  if (deviceInfo.unitNo) mapped.unit_no = deviceInfo.unitNo;
  if (deviceInfo.macAddr) mapped.mac_addr = deviceInfo.macAddr;
  if (deviceInfo.deviceNo) mapped.device_no = deviceInfo.deviceNo;
  
  // Campos do usuário
  if (data.name) mapped.name = data.name;
  if (data.userID) mapped.user_id = data.userID;
  if (data.loginType) mapped.login_type = data.loginType;
  if (data.measureTime) mapped.measure_time = data.measureTime;
  if (data.address) mapped.address = data.address;
  if (data.birthday) mapped.birthday = data.birthday;
  if (data.age) mapped.age = parseInt(data.age);
  if (data.sex) mapped.sex = parseInt(data.sex);
  if (data.recordNo) mapped.record_no = data.recordNo;
  
  // Dados básicos
  if (data.bmiType) mapped.bmi_type = data.bmiType;
  if (data.bmi) mapped.bmi = parseFloat(data.bmi);
  if (data.bmi_s) mapped.bmi_s = parseInt(data.bmi_s);
  if (data.bmi_n) mapped.bmi_n = data.bmi_n;
  if (data.height) mapped.height = parseFloat(data.height);
  if (data.weight) mapped.weight = parseFloat(data.weight);
  if (data.weight_n) mapped.weight_n = data.weight_n;
  if (data.weight_s) mapped.weight_s = parseInt(data.weight_s);
  
  // Dados detalhados
  if (data.waterECW) mapped.water_ecw = parseFloat(data.waterECW);
  if (data.waterECW_n) mapped.water_ecw_n = data.waterECW_n;
  if (data.waterECW_s) mapped.water_ecw_s = parseInt(data.waterECW_s);
  if (data.waterICW) mapped.water_icw = parseFloat(data.waterICW);
  if (data.waterICW_n) mapped.water_icw_n = data.waterICW_n;
  if (data.waterICW_s) mapped.water_icw_s = parseInt(data.waterICW_s);
  if (data.waterRate) mapped.water_rate = parseFloat(data.waterRate);
  if (data.waterRate_n) mapped.water_rate_n = data.waterRate_n;
  if (data.waterRate_s) mapped.water_rate_s = parseInt(data.waterRate_s);
  
  if (data.protein) mapped.protein = parseFloat(data.protein);
  if (data.protein_n) mapped.protein_n = data.protein_n;
  if (data.protein_s) mapped.protein_s = parseInt(data.protein_s);
  
  if (data.bone) mapped.bone = parseFloat(data.bone);
  if (data.bone_n) mapped.bone_n = data.bone_n;
  if (data.bone_s) mapped.bone_s = parseInt(data.bone_s);
  
  if (data.bodyShape) mapped.body_shape = data.bodyShape;
  if (data.bodyScore) mapped.body_score = parseInt(data.bodyScore);
  if (data.bodyAge) mapped.body_age = parseInt(data.bodyAge);
  
  if (data.fatFree) mapped.fat_free = parseFloat(data.fatFree);
  if (data.fatFree_n) mapped.fat_free_n = data.fatFree_n;
  if (data.fatFree_s) mapped.fat_free_s = parseInt(data.fatFree_s);
  
  if (data.fat) mapped.fat = parseFloat(data.fat);
  if (data.fatRate) mapped.fat_rate = parseFloat(data.fatRate);
  if (data.fatRate_n) mapped.fat_rate_n = data.fatRate_n;
  if (data.fatRate_s) mapped.fat_rate_s = parseInt(data.fatRate_s);
  
  if (data.fatLeftLeg) mapped.fat_left_leg = parseFloat(data.fatLeftLeg);
  if (data.fatRightLeg) mapped.fat_right_leg = parseFloat(data.fatRightLeg);
  if (data.fatLeftArm) mapped.fat_left_arm = parseFloat(data.fatLeftArm);
  if (data.fatRightArm) mapped.fat_right_arm = parseFloat(data.fatRightArm);
  if (data.fatTrunk) mapped.fat_trunk = parseFloat(data.fatTrunk);
  
  if (data.muscleRate) mapped.muscle_rate = parseFloat(data.muscleRate);
  if (data.muscleRate_n) mapped.muscle_rate_n = data.muscleRate_n;
  if (data.muscleRate_s) mapped.muscle_rate_s = parseInt(data.muscleRate_s);
  
  if (data.muscleLeftLeg) mapped.muscle_left_leg = parseFloat(data.muscleLeftLeg);
  if (data.muscleRightLeg) mapped.muscle_right_leg = parseFloat(data.muscleRightLeg);
  if (data.muscleLeftArm) mapped.muscle_left_arm = parseFloat(data.muscleLeftArm);
  if (data.muscleRightArm) mapped.muscle_right_arm = parseFloat(data.muscleRightArm);
  if (data.muscleTrunk) mapped.muscle_trunk = parseFloat(data.muscleTrunk);
  
  if (data.skeletalMuscle) mapped.skeletal_muscle = parseFloat(data.skeletalMuscle);
  
  if (data.mineral) mapped.mineral = parseFloat(data.mineral);
  if (data.mineral_n) mapped.mineral_n = data.mineral_n;
  if (data.mineral_s) mapped.mineral_s = parseInt(data.mineral_s);
  
  if (data.bmr) mapped.bmr = parseInt(data.bmr);
  if (data.bmr_n) mapped.bmr_n = data.bmr_n;
  if (data.bmr_s) mapped.bmr_s = parseInt(data.bmr_s);
  
  if (data.dci) mapped.dci = parseInt(data.dci);
  
  if (data.vfal) mapped.vfal = parseInt(data.vfal);
  if (data.vfal_n) mapped.vfal_n = data.vfal_n;
  if (data.vfal_s) mapped.vfal_s = parseInt(data.vfal_s);
  
  if (data.fatSubCutRate) mapped.fat_sub_cut_rate = parseFloat(data.fatSubCutRate);
  if (data.fatSubCutRate_n) mapped.fat_sub_cut_rate_n = data.fatSubCutRate_n;
  if (data.fatSubCutRate_s) mapped.fat_sub_cut_rate_s = parseInt(data.fatSubCutRate_s);
  
  // Ajustes
  if (data.weAdjus) mapped.we_adjus = parseFloat(data.weAdjus);
  if (data.muAdjus) mapped.mu_adjus = parseFloat(data.muAdjus);
  if (data.faAdjus) mapped.fa_adjus = parseFloat(data.faAdjus);
  
  // Atividades
  if (data.swim) mapped.swim = parseInt(data.swim);
  if (data.walking) mapped.walking = parseInt(data.walking);
  if (data.jogging) mapped.jogging = parseInt(data.jogging);
  if (data.aerobic) mapped.aerobic = parseInt(data.aerobic);
  
  return mapped;
}

app.post('/upload', async (req, res) => {
  console.log('📥 Dados recebidos:', JSON.stringify(req.body, null, 2));
  
  try {
    const { deviceModel, unitName, unitNo, macAddr, deviceNo, datas } = req.body;
    
    if (!datas || !Array.isArray(datas) || datas.length === 0) {
      return res.status(400).json({ recode: 4000, remsg: 'No data provided' });
    }
    
    const deviceInfo = { deviceModel, unitName, unitNo, macAddr, deviceNo };
    
    for (const data of datas) {
      if (!data.userID || !data.measureTime) {
        console.log('⚠️ Dados incompletos - userID ou measureTime ausente');
        continue;
      }
      
      const mappedData = mapDataToTable(data, deviceInfo);
      
      // Verificar se já existe registro com mesmo userID e measureTime
      const { data: existingRecord, error: selectError } = await supabase
        .from('balanca_data')
        .select('id')
        .eq('user_id', data.userID)
        .eq('measure_time', data.measureTime)
        .single();
      
      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError;
      }
      
      if (existingRecord) {
        // UPDATE - registro existe, atualizar
        const { error: updateError } = await supabase
          .from('balanca_data')
          .update(mappedData)
          .eq('id', existingRecord.id);
        
        if (updateError) throw updateError;
        
        console.log(`✅ Registro atualizado - ID: ${existingRecord.id}, UserID: ${data.userID}, MeasureTime: ${data.measureTime}`);
      } else {
        // INSERT - registro não existe, criar novo
        const { data: newRecord, error: insertError } = await supabase
          .from('balanca_data')
          .insert(mappedData)
          .select('id')
          .single();
        
        if (insertError) throw insertError;
        
        console.log(`✅ Novo registro criado - ID: ${newRecord.id}, UserID: ${data.userID}, MeasureTime: ${data.measureTime}`);
      }
    }
    
    res.status(200).json({ recode: 2000, remsg: 'success' });
  } catch (error) {
    console.error('❌ Erro no processamento:', error.message);
    res.status(500).json({ recode: 5000, remsg: 'processing error' });
  }
});


app.listen(HTTP_PORT, () => {
  console.log(`Servidor rodando na porta ${HTTP_PORT}`);
});