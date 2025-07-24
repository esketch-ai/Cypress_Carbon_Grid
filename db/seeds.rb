# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# Create sample CarbonData
puts "Creating sample CarbonData..."

10.times do |i|
  CarbonData.create!(
    value: rand(100.0..500.0).round(2),
    recorded_at: Time.now - (10 - i).days
  )
end

puts "Sample CarbonData created successfully!"

# Create sample GlobalMetric
puts "Creating sample GlobalMetric..."
GlobalMetric.find_or_create_by!(id: 1) do |gm|
  gm.reduction_rate = 8.7
  gm.active_projects = 3247
  gm.trading_volume = 156432
  gm.platform_users = 78934
  gm.data_quality = 94.2
  gm.total_emissions = 55000000 # 예시 값
end
puts "Sample GlobalMetric created successfully!"

# Create sample Alerts
puts "Creating sample Alerts..."
Alert.find_or_create_by!(title: 'EU CBAM 보고 마감 임박') do |alert|
  alert.alert_type = 'critical'
  alert.message = '2026년 1월 31일 연간 신고 마감 3일 전'
  alert.created_at = Time.now - 5.minutes
end
Alert.find_or_create_by!(title: 'AI 예측 엔진 부하 증가') do |alert|
  alert.alert_type = 'warning'
  alert.message = '동시 예측 요청 85% 도달, 자동 스케일링 중'
  alert.created_at = Time.now - 12.minutes
end
Alert.find_or_create_by!(title: '서울시 월간 목표 달성') do |alert|
  alert.alert_type = 'success'
  alert.message = '12월 감축 목표 112% 달성 (17,890 tCO2)'
  alert.created_at = Time.now - 1.hour
end
puts "Sample Alerts created successfully!"

# Create sample PolicyEffects
puts "Creating sample PolicyEffects..."
PolicyEffect.find_or_create_by!(name: '친환경차 구매 지원') do |pe|
  pe.budget = '약 850억원'
  pe.reduction = '47,300 tCO2/년'
  pe.efficiency = '180만원/tCO2'
  pe.status = 'success'
  pe.description = '전기차 구매보조금, 충전인프라 구축 등을 통해 수송부문 배출량을 연간 4.7만톤 감축했습니다.'
end
PolicyEffect.find_or_create_by!(name: '건물 에너지효율 개선') do |pe|
  pe.budget = '약 1,240억원'
  pe.reduction = '89,600 tCO2/년'
  pe.efficiency = '138만원/tCO2'
  pe.status = 'success'
  pe.description = 'BRP(건물 리노베이션 사업)을 통해 노후 건물의 에너지효율을 평균 32% 개선했습니다.'
end
PolicyEffect.find_or_create_by!(name: '대중교통 전환 확대') do |pe|
  pe.budget = '약 2,180억원'
  pe.reduction = '156,800 tCO2/년'
  pe.efficiency = '139만원/tCO2'
  pe.status = 'progress'
  pe.description = '지하철 연장, 전기버스 도입, 자전거 도로 확충으로 대중교통 분담률을 68%까지 높였습니다.'
end
puts "Sample PolicyEffects created successfully!"

# Create sample InfrastructureMetrics
puts "Creating sample InfrastructureMetrics..."
InfrastructureMetric.find_or_create_by!(name: '태양광 발전') do |im|
  im.value = '673'
  im.unit = 'MW'
  im.change = '+84 MW vs 2023년'
  im.description = '서울시 전체 태양광 설치 용량입니다. 가정용 미니태양광, 건물일체형(BIPV), 수상태양광을 포함합니다.'
end
InfrastructureMetric.find_or_create_by!(name: '전기버스') do |im|
  im.value = '1,247'
  im.unit = '대'
  im.change = '전체의 15.7%'
  im.description = '서울시 시내버스 중 전기버스 비율입니다. 2026년까지 50% 전환을 목표로 하고 있습니다.'
end
InfrastructureMetric.find_or_create_by!(name: '전기차 충전소') do |im|
  im.value = '4,589'
  im.unit = '기'
  im.change = '이용률 71.3%'
  im.description = '급속충전 2,340기, 완속충전 2,249기로 구성됩니다. 주요 거점과 주거지역을 중심으로 배치되었습니다.'
end
InfrastructureMetric.find_or_create_by!(name: '녹색건물 인증') do |im|
  im.value = '2,847'
  im.unit = '동'
  im.change = 'G-SEED 인증'
  im.description = '녹색건축인증(G-SEED)을 받은 건물 수입니다. 에너지 효율 등급 1등급 이상 건물이 78%를 차지합니다.'
end
puts "Sample InfrastructureMetrics created successfully!"

municipalities_data = [
  {
    name: '서울특별시',
    population: 9400000,
    area: 605,
    carbon_emission: 45000000,
    reduction_target: 40,
    current_reduction: 25.3,
    budget: 1200000000000,
    renewable_energy_rate: 18.5,
    public_transport_rate: 65.2,
    sector_emissions: [
      { name: '건물', value: 55.2 },
      { name: '수송', value: 38.5 },
      { name: '폐기물', value: 12.8 },
      { name: '산업', value: 8.5 },
    ],
    citizen_participation: [
      { name: '강남구', rate: 82.1, rank: 1 },
      { name: '서초구', rate: 80.5, rank: 2 },
      { name: '송파구', rate: 79.8, rank: 3 },
      { name: '종로구', rate: 75.3, rank: 10 },
      { name: '구로구', rate: 72.1, rank: 15 },
    ],
    projects: [
      { name: '공공건물 에너지효율 개선', type: '건물', reduction: '50,000 tCO2', progress: 80 },
      { name: '전기차 40만대 보급', type: '수송', reduction: '120,000 tCO2', progress: 65 },
      { name: '자원회수시설 현대화', type: '폐기물', reduction: '85,000 tCO2', progress: 95 },
    ]
  },
  {
    name: '부산광역시',
    population: 3300000,
    area: 770,
    carbon_emission: 28000000,
    reduction_target: 35,
    current_reduction: 22.1,
    budget: 800000000000,
    renewable_energy_rate: 15.2,
    public_transport_rate: 55.8,
    sector_emissions: [
      { name: '산업', value: 40.1 },
      { name: '수송', value: 35.2 },
      { name: '건물', value: 18.9 },
      { name: '폐기물', value: 5.8 },
    ],
    citizen_participation: [
      { name: '해운대구', rate: 78.5, rank: 1 },
      { name: '부산진구', rate: 75.1, rank: 2 },
      { name: '수영구', rate: 74.9, rank: 3 },
    ],
     projects: [
      { name: '부산항 탄소중립 항만 구축', type: '수송', reduction: '75,000 tCO2', progress: 50 },
      { name: '해상풍력발전단지 조성', type: '에너지', reduction: '150,000 tCO2', progress: 40 },
      { name: '스마트 상수도 시스템 도입', type: '물관리', reduction: '15,000 tCO2', progress: 90 },
    ]
  },
  {
      name: '대구광역시',
      population: 2370000,
      area: 883,
      carbon_emission: 15000000,
      reduction_target: 30,
      current_reduction: 18.9,
      budget: 650000000000,
      renewable_energy_rate: 12.8,
      public_transport_rate: 51.2,
      sector_emissions: [
          { name: '산업', value: 55.2 },
          { name: '건물', value: 22.8 },
          { name: '수송', value: 18.5 },
          { name: '폐기물', value: 3.5 },
      ],
      citizen_participation: [
          { name: '수성구', rate: 80.2, rank: 1 },
          { name: '달서구', rate: 76.8, rank: 2 },
          { name: '중구', rate: 74.1, rank: 3 },
      ],
      projects: [
          { name: '산업단지 에너지 효율화', type: '산업', reduction: '40,000 tCO2', progress: 70 },
          { name: '물산업클러스터 조성', type: '물관리', reduction: '10,000 tCO2', progress: 85 },
      ]
  },
  {
      name: '인천광역시',
      population: 2980000,
      area: 1062,
      carbon_emission: 32000000,
      reduction_target: 33,
      current_reduction: 21.5,
      budget: 900000000000,
      renewable_energy_rate: 14.1,
      public_transport_rate: 53.4,
      sector_emissions: [
          { name: '산업', value: 48.9 },
          { name: '수송', value: 33.1 },
          { name: '건물', value: 15.2 },
          { name: '폐기물', value: 2.8 },
      ],
      citizen_participation: [
          { name: '연수구', rate: 81.5, rank: 1 },
          { name: '남동구', rate: 78.2, rank: 2 },
          { name: '서구', rate: 75.9, rank: 3 },
      ],
      projects: [
          { name: '인천공항 탄소중립 공항 추진', type: '수송', reduction: '100,000 tCO2', progress: 60 },
          { name: '수도권매립지 자원순환', type: '폐기물', reduction: '200,000 tCO2', progress: 75 },
      ]
  },
  {
      name: '광주광역시',
      population: 1430000,
      area: 501,
      carbon_emission: 12000000,
      reduction_target: 32,
      current_reduction: 24.1,
      budget: 500000000000,
      renewable_energy_rate: 19.8,
      public_transport_rate: 49.5,
      sector_emissions: [
          { name: '산업', value: 42.3 },
          { name: '건물', value: 28.9 },
          { name: '수송', value: 22.4 },
          { name: '폐기물', value: 6.4 },
      ],
      citizen_participation: [
          { name: '서구', rate: 79.8, rank: 1 },
          { name: '북구', rate: 77.2, rank: 2 },
          { name: '광산구', rate: 76.5, rank: 3 },
      ],
      projects: [
          { name: 'AI 기반 스마트에너지시티 구축', type: '에너지', reduction: '30,000 tCO2', progress: 65 },
          { name: '친환경 자동차 부품 클러스터', type: '산업', reduction: '25,000 tCO2', progress: 55 },
      ]
  },
  {
      name: '대전광역시',
      population: 1440000,
      area: 539,
      carbon_emission: 11000000,
      reduction_target: 35,
      current_reduction: 26.2,
      budget: 550000000000,
      renewable_energy_rate: 16.5,
      public_transport_rate: 52.1,
      sector_emissions: [
          { name: '건물', value: 45.1 },
          { name: '수송', value: 33.2 },
          { name: '산업', value: 15.8 },
          { name: '폐기물', value: 5.9 },
      ],
      citizen_participation: [
          { name: '유성구', rate: 83.1, rank: 1 },
          { name: '서구', rate: 80.2, rank: 2 },
          { name: '대덕구', rate: 75.8, rank: 3 },
      ],
      projects: [
          { name: '대덕연구단지 제로에너지 빌딩 전환', type: '건물', reduction: '28,000 tCO2', progress: 70 },
          { name: '스마트시티 챌린지 사업', type: '통합', reduction: '40,000 tCO2', progress: 60 },
      ]
  },
  {
      name: '울산광역시',
      population: 1100000,
      area: 1060,
      carbon_emission: 65000000,
      reduction_target: 25,
      current_reduction: 15.8,
      budget: 1100000000000,
      renewable_energy_rate: 10.2,
      public_transport_rate: 45.3,
      sector_emissions: [
          { name: '산업', value: 85.2 },
          { name: '수송', value: 8.1 },
          { name: '건물', value: 4.5 },
          { name: '폐기물', value: 2.2 },
      ],
      citizen_participation: [
          { name: '남구', rate: 72.5, rank: 1 },
          { name: '북구', rate: 70.1, rank: 2 },
          { name: '울주군', rate: 68.9, rank: 3 },
      ],
      projects: [
          { name: '부유식 해상풍력 발전단지', type: '에너지', reduction: '300,000 tCO2', progress: 30 },
          { name: '석유화학단지 CCUS 실증', type: '산업', reduction: '500,000 tCO2', progress: 25 },
          { name: '수소전기트램 도입', type: '수송', reduction: '15,000 tCO2', progress: 40 },
      ]
  },
  {
      name: '세종특별자치시',
      population: 380000,
      area: 465,
      carbon_emission: 2500000,
      reduction_target: 42,
      current_reduction: 31.7,
      budget: 300000000000,
      renewable_energy_rate: 25.1,
      public_transport_rate: 58.9,
      sector_emissions: [
          { name: '건물', value: 50.1 },
          { name: '수송', value: 38.2 },
          { name: '폐기물', value: 7.8 },
          { name: '산업', value: 3.9 },
      ],
      citizen_participation: [
          { name: '한솔동', rate: 85.2, rank: 1 },
          { name: '새롬동', rate: 83.9, rank: 2 },
          { name: '도담동', rate: 82.5, rank: 3 },
      ],
      projects: [
          { name: '중앙공원 탄소흡수원 확충', type: '흡수원', reduction: '5,000 tCO2', progress: 90 },
          { name: '스마트 그린도시 조성', type: '통합', reduction: '20,000 tCO2', progress: 80 },
      ]
  },
  {
      name: '경기도',
      population: 13600000,
      area: 10189,
      carbon_emission: 120000000,
      reduction_target: 38,
      current_reduction: 24.5,
      budget: 2500000000000,
      renewable_energy_rate: 13.7,
      public_transport_rate: 60.1,
      sector_emissions: [
          { name: '산업', value: 52.3 },
          { name: '건물', value: 25.8 },
          { name: '수송', value: 18.4 },
          { name: '폐기물', value: 3.5 },
      ],
      citizen_participation: [
          { name: '수원시', rate: 79.8, rank: 1 },
          { name: '용인시', rate: 78.5, rank: 2 },
          { name: '고양시', rate: 77.9, rank: 3 },
      ],
      projects: [
          { name: 'GTX 노선 확대', type: '수송', reduction: '150,000 tCO2', progress: 50 },
          { name: '반도체 클러스터 저탄소 공정', type: '산업', reduction: '400,000 tCO2', progress: 35 },
          { name: '신도시 제로에너지 타운', type: '건물', reduction: '80,000 tCO2', progress: 60 },
      ]
  },
  {
      name: '강원특별자치도',
      population: 1530000,
      area: 16874,
      carbon_emission: 18000000,
      reduction_target: 40,
      current_reduction: 30.1,
      budget: 700000000000,
      renewable_energy_rate: 29.8,
      public_transport_rate: 40.5,
      sector_emissions: [
          { name: '흡수원', value: -20.5 },
          { name: '에너지', value: 45.1 },
          { name: '산업', value: 30.2 },
          { name: '수송', value: 15.2 },
      ],
      citizen_participation: [
          { name: '춘천시', rate: 75.8, rank: 1 },
          { name: '원주시', rate: 74.2, rank: 2 },
          { name: '강릉시', rate: 73.5, rank: 3 },
      ],
      projects: [
          { name: '산림 탄소흡수 증진 사업', type: '흡수원', reduction: '100,000 tCO2', progress: 85 },
          { name: '수소에너지 클러스터 구축', type: '에너지', reduction: '50,000 tCO2', progress: 45 },
      ]
  },
  {
      name: '충청북도',
      population: 1590000,
      area: 7407,
      carbon_emission: 25000000,
      reduction_target: 30,
      current_reduction: 20.4,
      budget: 600000000000,
      renewable_energy_rate: 17.2,
      public_transport_rate: 46.7,
      sector_emissions: [
          { name: '산업', value: 60.1 },
          { name: '건물', value: 18.9 },
          { name: '수송', value: 15.3 },
          { name: '폐기물', value: 5.7 },
      ],
      citizen_participation: [
          { name: '청주시', rate: 78.1, rank: 1 },
          { name: '충주시', rate: 75.8, rank: 2 },
          { name: '제천시', rate: 73.2, rank: 3 },
      ],
      projects: [
          { name: '오창 이차전지 산업단지 RE100', type: '산업', reduction: '70,000 tCO2', progress: 55 },
          { name: '충주호 수력발전 증설', type: '에너지', reduction: '30,000 tCO2', progress: 65 },
      ]
  },
  {
      name: '충청남도',
      population: 2120000,
      area: 8245,
      carbon_emission: 95000000,
      reduction_target: 30,
      current_reduction: 18.2,
      budget: 1300000000000,
      renewable_energy_rate: 11.5,
      public_transport_rate: 43.8,
      sector_emissions: [
          { name: '에너지', value: 75.3 },
          { name: '산업', value: 15.2 },
          { name: '수송', value: 5.8 },
          { name: '농업', value: 3.7 },
      ],
      citizen_participation: [
          { name: '천안시', rate: 76.5, rank: 1 },
          { name: '아산시', rate: 74.9, rank: 2 },
          { name: '서산시', rate: 72.1, rank: 3 },
      ],
      projects: [
          { name: '보령화력발전소 단계적 폐쇄', type: '에너지', reduction: '1,000,000 tCO2', progress: 30 },
          { name: '서해안 해상풍력 개발', type: '에너지', reduction: '250,000 tCO2', progress: 20 },
          { name: '수소에너지 도시 조성', type: '통합', reduction: '60,000 tCO2', progress: 40 },
      ]
  },
  {
      name: '전북특별자치도',
      population: 1770000,
      area: 8069,
      carbon_emission: 22000000,
      reduction_target: 35,
      current_reduction: 27.6,
      budget: 750000000000,
      renewable_energy_rate: 24.3,
      public_transport_rate: 44.1,
      sector_emissions: [
          { name: '에너지', value: 40.1 },
          { name: '산업', value: 30.5 },
          { name: '농업', value: 15.2 },
          { name: '수송', value: 14.2 },
      ],
      citizen_participation: [
          { name: '전주시', rate: 79.3, rank: 1 },
          { name: '익산시', rate: 76.1, rank: 2 },
          { name: '군산시', rate: 74.8, rank: 3 },
      ],
      projects: [
          { name: '새만금 재생에너지 단지', type: '에너지', reduction: '400,000 tCO2', progress: 60 },
          { name: '농축산 메탄가스 저감 사업', type: '농업', reduction: '50,000 tCO2', progress: 50 },
      ]
  },
  {
      name: '전라남도',
      population: 1820000,
      area: 12342,
      carbon_emission: 75000000,
      reduction_target: 32,
      current_reduction: 21.9,
      budget: 1000000000000,
      renewable_energy_rate: 22.1,
      public_transport_rate: 41.7,
      sector_emissions: [
          { name: '산업', value: 65.4 },
          { name: '에너지', value: 20.1 },
          { name: '농업', value: 8.9 },
          { name: '수송', value: 5.6 },
      ],
      citizen_participation: [
          { name: '목포시', rate: 75.4, rank: 1 },
          { name: '여수시', rate: 73.1, rank: 2 },
          { name: '순천시', rate: 72.8, rank: 3 },
      ],
      projects: [
          { name: '신안 해상풍력발전단지', type: '에너지', reduction: '800,000 tCO2', progress: 35 },
          { name: '여수산단 에너지 효율 개선', type: '산업', reduction: '300,000 tCO2', progress: 45 },
      ]
  },
  {
      name: '경상북도',
      population: 2600000,
      area: 19034,
      carbon_emission: 88000000,
      reduction_target: 28,
      current_reduction: 19.5,
      budget: 1200000000000,
      renewable_energy_rate: 14.8,
      public_transport_rate: 42.3,
      sector_emissions: [
          { name: '산업', value: 78.2 },
          { name: '에너지', value: 12.3 },
          { name: '농업', value: 5.4 },
          { name: '수송', value: 4.1 },
      ],
      citizen_participation: [
          { name: '포항시', rate: 74.3, rank: 1 },
          { name: '구미시', rate: 72.8, rank: 2 },
          { name: '경주시', rate: 71.5, rank: 3 },
      ],
      projects: [
          { name: '포항제철 수소환원제철 전환', type: '산업', reduction: '1,500,000 tCO2', progress: 15 },
          { name: '원자력 활용 수소생산', type: '에너지', reduction: '100,000 tCO2', progress: 25 },
      ]
  },
  {
      name: '경상남도',
      population: 3270000,
      area: 10539,
      carbon_emission: 42000000,
      reduction_target: 33,
      current_reduction: 23.8,
      budget: 950000000000,
      renewable_energy_rate: 16.9,
      public_transport_rate: 48.2,
      sector_emissions: [
          { name: '산업', value: 68.5 },
          { name: '수송', value: 15.1 },
          { name: '건물', value: 12.3 },
          { name: '폐기물', value: 4.1 },
      ],
      citizen_participation: [
          { name: '창원시', rate: 78.9, rank: 1 },
          { name: '김해시', rate: 76.2, rank: 2 },
          { name: '진주시', rate: 75.4, rank: 3 },
      ],
      projects: [
          { name: '창원 스마트산단 구축', type: '산업', reduction: '120,000 tCO2', progress: 65 },
          { name: '거제 해상풍력 및 조선 연계', type: '에너지', reduction: '200,000 tCO2', progress: 30 },
      ]
  },
  {
      name: '제주특별자치도',
      population: 670000,
      area: 1850,
      carbon_emission: 5000000,
      reduction_target: 50,
      current_reduction: 35.8,
      budget: 500000000000,
      renewable_energy_rate: 32.7,
      public_transport_rate: 45.1,
      sector_emissions: [
        { name: '에너지', value: 45.8 },
        { name: '수송', value: 30.2 },
        { name: '폐기물', value: 15.1 },
        { name: '농업', value: 8.9 },
      ],
      citizen_participation: [
        { name: '제주시', rate: 81.2, rank: 1 },
        { name: '서귀포시', rate: 78.9, rank: 2 },
      ],
       projects: [
        { name: 'CFI 2030 (Carbon Free Island)', type: '에너지', reduction: '150,000 tCO2', progress: 75 },
        { name: '전기차 충전 인프라 확대', type: '수송', reduction: '20,000 tCO2', progress: 85 },
        { name: '스마트 그리드 실증단지', type: '에너지', reduction: '30,000 tCO2', progress: 90 },
      ]
  }
]

puts "Creating sample Municipalities..."

municipalities_data.each do |data|
  Municipality.find_or_create_by!(name: data[:name]) do |municipality|
    municipality.population = data[:population]
    municipality.area = data[:area]
    municipality.carbon_emission = data[:carbon_emission]
    municipality.reduction_target = data[:reduction_target]
    municipality.current_reduction = data[:current_reduction]
    municipality.budget = data[:budget]
    municipality.renewable_energy_rate = data[:renewable_energy_rate]
    municipality.public_transport_rate = data[:public_transport_rate]
    municipality.projects = data[:projects]
    municipality.sector_emissions = data[:sector_emissions]
    municipality.citizen_participation = data[:citizen_participation]
  end
end

puts "Sample Municipalities created successfully!"
