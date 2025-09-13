CREATE TABLE balanca_data (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Campos comuns do dispositivo
    device_model VARCHAR(50),
    unit_name VARCHAR(50),
    unit_no VARCHAR(50),
    mac_addr VARCHAR(50),
    device_no VARCHAR(50),
    
    -- Dados comuns do usuário
    name VARCHAR(100),
    user_id VARCHAR(50),
    login_type VARCHAR(10),
    measure_time TIMESTAMP,
    address VARCHAR(200),
    birthday DATE,
    age INTEGER,
    sex INTEGER,
    record_no VARCHAR(50),

    -- Dados básicos (primeiro objeto)
    bmi_type VARCHAR(10),
    bmi DECIMAL(4,1),
    bmi_s INTEGER,
    bmi_n VARCHAR(20),
    height DECIMAL(5,1),
    weight DECIMAL(5,1),
    weight_n VARCHAR(20),
    weight_s INTEGER,

    -- Dados detalhados (segundo objeto)
    water_ecw DECIMAL(4,1),
    water_ecw_n VARCHAR(20),
    water_ecw_s INTEGER,
    water_icw DECIMAL(4,1),
    water_icw_n VARCHAR(20),
    water_icw_s INTEGER,
    water_rate DECIMAL(4,1),
    water_rate_n VARCHAR(20),
    water_rate_s INTEGER,
    
    protein DECIMAL(4,1),
    protein_n VARCHAR(20),
    protein_s INTEGER,
    
    bone DECIMAL(4,1),
    bone_n VARCHAR(20),
    bone_s INTEGER,
    
    body_shape VARCHAR(50),
    body_score INTEGER,
    body_age INTEGER,
    
    fat_free DECIMAL(4,1),
    fat_free_n VARCHAR(20),
    fat_free_s INTEGER,
    
    fat DECIMAL(4,1),
    fat_rate DECIMAL(4,1),
    fat_rate_n VARCHAR(20),
    fat_rate_s INTEGER,
    
    fat_left_leg DECIMAL(4,1),
    fat_right_leg DECIMAL(4,1),
    fat_left_arm DECIMAL(4,1),
    fat_right_arm DECIMAL(4,1),
    fat_trunk DECIMAL(4,1),
    
    muscle_rate DECIMAL(4,1),
    muscle_rate_n VARCHAR(20),
    muscle_rate_s INTEGER,
    
    muscle_left_leg DECIMAL(4,1),
    muscle_right_leg DECIMAL(4,1),
    muscle_left_arm DECIMAL(4,1),
    muscle_right_arm DECIMAL(4,1),
    muscle_trunk DECIMAL(4,1),
    
    skeletal_muscle DECIMAL(4,1),
    
    mineral DECIMAL(4,1),
    mineral_n VARCHAR(20),
    mineral_s INTEGER,
    
    bmr INTEGER,
    bmr_n VARCHAR(20),
    bmr_s INTEGER,
    
    dci INTEGER,
    
    vfal INTEGER,
    vfal_n VARCHAR(20),
    vfal_s INTEGER,
    
    fat_sub_cut_rate DECIMAL(4,1),
    fat_sub_cut_rate_n VARCHAR(20),
    fat_sub_cut_rate_s INTEGER,
    
    -- Ajustes
    we_adjus DECIMAL(4,1),
    mu_adjus DECIMAL(4,1),
    fa_adjus DECIMAL(4,1),
    
    -- Atividades
    swim INTEGER,
    walking INTEGER,
    jogging INTEGER,
    aerobic INTEGER
  );

  -- Índices para otimização
  CREATE INDEX idx_balanca_data_user_id ON balanca_data(user_id);
  CREATE INDEX idx_balanca_data_measure_time ON balanca_data(measure_time);
  CREATE INDEX idx_balanca_data_device_no ON balanca_data(device_no);
