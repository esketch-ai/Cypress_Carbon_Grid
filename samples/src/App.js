import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// 아이콘 컴포넌트 정의: 대시보드 전반에 사용되는 다양한 아이콘들
const Icons = {
  Globe: () => <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">🌍</div>,
  Leaf: () => <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">🌿</div>,
  Building: () => <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">🏢</div>,
  Users: () => <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">👥</div>,
  TrendUp: () => <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">📈</div>,
  TrendDown: () => <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">📉</div>,
  Shield: () => <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">🛡️</div>,
  Zap: () => <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">⚡</div>,
  Award: () => <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">🏆</div>,
  Map: () => <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs">🗺️</div>,
  Factory: () => <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">🏭</div>,
  Truck: () => <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">🚛</div>
};

// 현실적인 Mock 데이터 생성기: 실시간 탄소 배출량 및 감축량 데이터를 생성합니다.
const generateRealisticData = () => {
  const now = new Date();
  const hours = Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    // 한국 전체 일일 배출량 기준 (약 1.8백만톤/일)
    const baseEmission = 1800000 + Math.sin(i * Math.PI / 12) * 200000; // 시간대별 변동
    const noise = (Math.random() - 0.5) * 100000;
    
    return {
      time: time.getHours() + ':00',
      emissions: Math.floor(baseEmission + noise),
      reductions: Math.floor(baseEmission * 0.08 + Math.random() * baseEmission * 0.02), // 8-10% 감축
      trading: Math.floor(Math.random() * 50000) + 20000, // 2-7만톤 거래
      price: (42.5 + Math.sin(i * Math.PI / 8) * 5 + (Math.random() - 0.5) * 3).toFixed(2)
    };
  });
  return hours;
};

// 커스텀 툴팁 컴포넌트: 차트 데이터에 마우스를 올렸을 때 표시되는 정보창입니다.
const CustomTooltip = ({ active, payload, label, description }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg max-w-xs">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-300 text-sm">
              {entry.name}: <span className="text-white font-medium">{entry.value?.toLocaleString()}</span>
            </span>
          </div>
        ))}
        {description && (
          <div className="mt-2 pt-2 border-t border-gray-600">
            <p className="text-gray-400 text-xs">{description}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// 공통 컴포넌트들

// MetricCard: 대시보드의 핵심 지표를 표시하는 카드 컴포넌트입니다.
// 제목, 값, 단위, 추세, 아이콘, 설명 등을 포함합니다.
const MetricCard = ({ title, value, unit, trend, icon, color = "blue", subtitle = "", description = "", comparison = null, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const trendIcon = trend === "up" ? <Icons.TrendUp /> : trend === "down" ? <Icons.TrendDown /> : null;
  
  return (
    <div 
      className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 relative cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick} // 클릭 이벤트 핸들러 추가
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        </div>
        {trendIcon}
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{value?.toLocaleString() || 0}</span>
          {unit && <span className="text-lg text-gray-400">{unit}</span>}
        </div>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        {comparison && (
          <p className="text-xs text-emerald-400">
            {comparison.type === 'better' ? '↗' : '↘'} {comparison.text}
          </p>
        )}
      </div>
      
      {/* 툴팁: MetricCard에 대한 상세 설명을 표시합니다. */}
      {showTooltip && description && (
        <div className="absolute bottom-full left-1/2 mb-2 w-80 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg z-[9999] transform -translate-x-1/2">
          <h4 className="text-white font-medium mb-2">{title} 상세 정보</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
};

// RealTimeAlert: 실시간 알림 목록을 표시하는 컴포넌트입니다.
const RealTimeAlert = ({ alerts = [] }) => (
  <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
    <h3 className="text-lg font-semibold text-white mb-4">실시간 알림</h3>
    <div className="space-y-3 overflow-y-auto">
      {alerts.length > 0 ? alerts.map((alert, index) => (
        <div key={index} className={`p-3 rounded-lg border-l-4 ${
          alert.type === 'critical' ? 'border-red-500 bg-red-500/10' :
          alert.type === 'warning' ? 'border-yellow-500 bg-yellow-500/10' :
          'border-green-500 bg-green-500/10'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-white">{alert.title}</p>
              <p className="text-xs text-gray-400 mt-1">{alert.message}</p>
            </div>
            <span className="text-xs text-gray-500">{alert.time}</span>
          </div>
        </div>
      )) : (
        <p className="text-gray-400 text-center py-4">알림이 없습니다</p>
      )}
    </div>
  </div>
);

// ProjectListModal: 완료된 프로젝트 목록을 보여주는 모달 팝업 컴포넌트입니다.
const ProjectListModal = ({ isOpen, onClose, projects, title }) => {
  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않습니다.

  return (
    // 모달 오버레이: 배경을 어둡게 하고 모달을 중앙에 배치합니다.
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      {/* 모달 내용 컨테이너 */}
      <div className="glass-card p-8 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/70 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
        {/* 프로젝트 목록 */}
        <div className="space-y-4">
          {projects.length > 0 ? projects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-white">{project.name}</h4>
                <p className="text-sm text-gray-400">기간: {project.startDate} ~ {project.endDate}</p>
                <p className="text-sm text-gray-300 mt-1">{project.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                project.status === '완료' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {project.status}
              </span>
            </div>
          )) : (
            <p className="text-gray-400 text-center py-8">프로젝트가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// 1. 플랫폼 통합 관제 대시보드 컴포넌트
// 글로벌 탄소 배출량, 감축률, 활성 프로젝트 등 주요 지표를 실시간으로 모니터링합니다.
const PlatformControlDashboard = () => {
  const [realTimeData, setRealTimeData] = useState(generateRealisticData()); // 실시간 데이터
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간

  // 5초마다 데이터를 업데이트하는 효과 훅
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(generateRealisticData());
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  // 현실적인 글로벌 지표 (한국 + 연동국가 기준)
  const globalMetrics = {
    totalEmissions: 6547329, // 한국 일일 배출량 약 1.8백만톤 + 연동국가
    reductionRate: 8.7, // 현실적인 감축률
    activeProjects: 3247, // 전세계 탄소 프로젝트 수
    tradingVolume: 156432, // 일일 탄소 거래량 (톤)
    platformUsers: 78934, // 플랫폼 사용자 수
    dataQuality: 94.2 // 데이터 품질 점수
  };

  // 실시간 알림 데이터
  const alerts = [
    { 
      type: 'critical', 
      title: 'EU CBAM 보고 마감 임박', 
      message: '2026년 1월 31일 연간 신고 마감 3일 전', 
      time: '5분 전' 
    },
    { 
      type: 'warning', 
      title: 'AI 예측 엔진 부하 증가', 
      message: '동시 예측 요청 85% 도달, 자동 스케일링 중', 
      time: '12분 전' 
    },
    { 
      type: 'success', 
      title: '서울시 월간 목표 달성', 
      message: '12월 감축 목표 112% 달성 (17,890 tCO2)', 
      time: '1시간 전' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더: 대시보드 제목 및 실시간 시간 표시 */}
        <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-r from-gray-800/50 to-blue-800/50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Cypress Carbon Grid</h1>
              <p className="text-blue-300 mt-1">글로벌 탄소중립 통합 관제센터</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-white">{currentTime.toLocaleTimeString()}</div>
              <div className="text-sm text-gray-300">실시간 모니터링 중 • 34개국 연동</div>
            </div>
          </div>
        </div>

        {/* 핵심 지표 섹션: MetricCard 컴포넌트를 사용하여 다양한 지표를 표시합니다. */}
        <div className="grid grid-cols-6 gap-4">
          <MetricCard
            title="총 배출량 (24시간)"
            value={globalMetrics.totalEmissions}
            unit="tCO2"
            trend="down"
            icon={<Icons.Globe />}
            subtitle="전일 대비 -5.2%"
            description="한국, 일본, 싱가포르 등 연동국가의 24시간 누적 탄소 배출량입니다. 실시간 IoT 센서와 위성 데이터를 통해 수집되며, AI 알고리즘으로 검증됩니다."
            comparison={{ type: 'better', text: '2023년 동기 대비 12.3% 감소' }}
          />
          <MetricCard
            title="실질 감축률"
            value={globalMetrics.reductionRate}
            unit="%"
            trend="up"
            icon={<Icons.TrendDown />}
            subtitle="2030 목표 대비 +1.2%"
            description="BAU(Business As Usual) 대비 실제 달성한 감축률입니다. UNFCCC 방법론을 따라 계산되며, 국가별 NDC 목표와 연계됩니다."
            comparison={{ type: 'better', text: 'OECD 평균 6.8% 대비 우수' }}
          />
          <MetricCard
            title="활성 프로젝트"
            value={globalMetrics.activeProjects}
            unit="개"
            icon={<Icons.Building />}
            subtitle="신규 189개"
            description="현재 진행 중인 탄소 감축 프로젝트 수입니다. 재생에너지, 에너지효율, 산림보전, 기술기반 제거 등 모든 유형을 포함합니다."
            comparison={{ type: 'better', text: '월평균 증가율 15.7%' }}
          />
          <MetricCard
            title="거래량 (24시간)"
            value={globalMetrics.tradingVolume}
            unit="tCO2"
            trend="up"
            icon={<Icons.TrendUp />}
            subtitle="평균 가격 ₩47,300/톤"
            description="플랫폼에서 거래된 탄소 크레딧 총량입니다. VCM(자발적 탄소시장), Article 6 메커니즘, 지역 ETS 거래를 모두 포함합니다."
            comparison={{ type: 'better', text: '전월 대비 거래량 23% 증가' }}
          />
          <MetricCard
            title="플랫폼 사용자"
            value={globalMetrics.platformUsers}
            unit="명"
            icon={<Icons.Users />}
            subtitle="실시간 접속 12,847명"
            description="정부기관, 기업, 시민 등 모든 사용자를 포함합니다. 지자체 관리자, 기업 ESG 담당자, 협회 회원사가 주요 사용자입니다."
          />
          <MetricCard
            title="데이터 정확도"
            value={globalMetrics.dataQuality}
            unit="%"
            icon={<Icons.Shield />}
            subtitle="ISO 14064 인증"
            description="AI 기반 데이터 검증 시스템을 통한 품질 점수입니다. 센서 오류, 이상치, 누락 데이터를 실시간으로 감지하고 보정합니다."
            comparison={{ type: 'better', text: '글로벌 표준 92% 대비 우수' }}
          />
        </div>

        {/* 차트 및 알림 영역 */}
        <div className="grid grid-cols-3 gap-6">
          {/* 실시간 글로벌 탄소 현황 차트 */}
          <div className="col-span-2 glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <h3 className="text-lg font-semibold text-white mb-4">실시간 글로벌 탄소 현황</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip description="시간대별 배출량과 감축량을 실시간으로 보여줍니다. 데이터는 IoT 센서, 위성 관측, AI 예측 모델을 종합하여 생성됩니다." />} />
                <Legend />
                <Area type="monotone" dataKey="emissions" stackId="1" stroke="#EF4444" fill="#EF444440" name="배출량 (tCO2)" />
                <Area type="monotone" dataKey="reductions" stackId="1" stroke="#10B981" fill="#10B98140" name="감축량 (tCO2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* 실시간 알림 컴포넌트 */}
          <RealTimeAlert alerts={alerts} />
        </div>

        {/* 정책 효과 및 스마트 그린 인프라 섹션 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 주요 정책 효과 */}
          <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <h3 className="text-lg font-semibold text-white mb-4">주요 정책 효과 (2024년 기준)</h3>
            <div className="space-y-4">
              {[
                { 
                  name: '친환경차 구매 지원', 
                  budget: '약 850억원', 
                  reduction: '47,300 tCO2/년', 
                  efficiency: '180만원/tCO2', 
                  status: 'success',
                  description: '전기차 구매보조금, 충전인프라 구축 등을 통해 수송부문 배출량을 연간 4.7만톤 감축했습니다.'
                },
                { 
                  name: '건물 에너지효율 개선', 
                  budget: '약 1,240억원', 
                  reduction: '89,600 tCO2/년', 
                  efficiency: '138만원/tCO2', 
                  status: 'success',
                  description: 'BRP(건물 리노베이션 사업)을 통해 노후 건물의 에너지효율을 평균 32% 개선했습니다.'
                },
                { 
                  name: '대중교통 전환 확대', 
                  budget: '약 2,180억원', 
                  reduction: '156,800 tCO2/년', 
                  efficiency: '139만원/tCO2', 
                  status: 'progress',
                  description: '지하철 연장, 전기버스 도입, 자전거 도로 확충으로 대중교통 분담률을 68%까지 높였습니다.'
                }
              ].map((policy, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{policy.name}</h4>
                    <div className={`px-2 py-1 rounded text-xs ${
                      policy.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {policy.status === 'success' ? '목표 초과달성' : '순조 진행'}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">총 예산</div>
                      <div className="text-white">{policy.budget}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">연간 감축량</div>
                      <div className="text-white">{policy.reduction}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">감축 단가</div>
                      <div className="text-white">{policy.efficiency}</div>
                    </div>
                  </div>
                  
                  {/* 정책 상세 설명 툴팁 */}
                  <div className="absolute left-0 bottom-full mb-2 w-80 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <h4 className="text-white font-medium mb-2">{policy.name}</h4>
                    <p className="text-gray-300 text-sm">{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 스마트 그린 인프라 현황 */}
          <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <h3 className="text-lg font-semibold text-white mb-4">스마트 그린 인프라</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
                  <div className="text-sm text-gray-400">태양광 발전</div>
                  <div className="text-xl text-white font-bold">673 MW</div>
                  <div className="text-xs text-green-400">+84 MW vs 2023년</div>
                  
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <p className="text-gray-300 text-xs">서울시 전체 태양광 설치 용량입니다. 가정용 미니태양광, 건물일체형(BIPV), 수상태양광을 포함합니다.</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
                  <div className="text-sm text-gray-400">전기버스</div>
                  <div className="text-xl text-white font-bold">1,247 대</div>
                  <div className="text-xs text-green-400">전체의 15.7%</div>
                  
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <p className="text-gray-300 text-xs">서울시 시내버스 중 전기버스 비율입니다. 2026년까지 50% 전환을 목표로 하고 있습니다.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
                  <div className="text-sm text-gray-400">전기차 충전소</div>
                  <div className="text-xl text-white font-bold">4,589 기</div>
                  <div className="text-xs text-blue-400">이용률 71.3%</div>
                  
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <p className="text-gray-300 text-xs">급속충전 2,340기, 완속충전 2,249기로 구성됩니다. 주요 거점과 주거지역을 중심으로 배치되었습니다.</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
                  <div className="text-sm text-gray-400">녹색건물 인증</div>
                  <div className="text-xl text-white font-bold">2,847 동</div>
                  <div className="text-xs text-green-400">G-SEED 인증</div>
                  
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <p className="text-gray-300 text-xs">녹색건축인증(G-SEED)을 받은 건물 수입니다. 에너지 효율 등급 1등급 이상 건물이 78%를 차지합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 프로젝트 리스트 모달: '완료 프로젝트' MetricCard 클릭 시 표시됩니다. */}
        <ProjectListModal
          isOpen={showProjectsModal}
          onClose={() => setShowProjectsModal(false)}
          projects={completedProjects}
          title="완료 프로젝트 목록"
        />
      </div>
    </div>
  );
};

// 3. 기업 ESG 대시보드 컴포넌트
// 기업의 ESG 성과, 탄소 배출량, CBAM 대응 현황, 공급망 ESG 리스크 등을 관리합니다.
const CorporateESGDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview'); // 현재 선택된 탭

  // 새미전자 ESG 점수 (전자업체 평균 기준)
  const esgScores = {
    overall: 78.4, // B+ 등급
    environmental: 81.2,
    social: 74.1,
    governance: 79.9
  };

  // 전자업체 현실적인 탄소 배출량 (Scope별)
  const carbonScope = [
    { name: 'Scope 1 (직접배출)', value: 23450, color: '#EF4444', description: '사업장 연료 연소, 제조공정 등 직접 배출' },
    { name: 'Scope 2 (간접배출)', value: 89360, color: '#F59E0B', description: '구매 전력 및 스팀 사용으로 인한 간접 배출' },
    { name: 'Scope 3 (가치사슬)', value: 387240, color: '#10B981', description: '원자재 조달, 제품 사용, 폐기 등 가치사슬 배출' }
  ];

  // CBAM 수출 데이터 (전자 부품 기준)
  const cbamData = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      month: `${7 + i}월`,
      exports: Math.floor(Math.random() * 2000) + 1500, // 전자부품 월 수출량 (톤)
      emissions: Math.floor(Math.random() * 400) + 300, // 내재배출량 (tCO2)
      certificates: Math.floor(Math.random() * 350) + 280 // 필요 인증서 (tCO2)
    })), []
  );

  // 공급망 ESG 데이터
  const supplyChainData = {
    totalSuppliers: 847,
    assessedSuppliers: 731,
    highRiskSuppliers: [
      { name: '대성부품', location: '중국 상하이', riskLevel: 'high', esgScore: 42.3, issues: ['환경규제 위반', '근로자 안전'] },
      { name: '글로벌소재', location: '베트남 하노이', riskLevel: 'medium', esgScore: 61.8, issues: ['탄소공시 부족'] },
      { name: '스마트칩스', location: '말레이시아 KL', riskLevel: 'medium', esgScore: 67.2, issues: ['재생에너지 전환 지연'] },
      { name: '퓨처메탈', location: '태국 방콕', riskLevel: 'low', esgScore: 73.4, issues: ['소규모 개선사항'] }
    ],
    categoryRisks: [
      { category: '반도체', suppliers: 89, avgRisk: 'medium', mainIssues: '탄소집약적 제조공정' },
      { category: '디스플레이', suppliers: 67, avgRisk: 'high', mainIssues: '희토류 사용, 폐수 처리' },
      { category: '배터리', suppliers: 45, avgRisk: 'high', mainIssues: '리튬 채굴, 재활용' },
      { category: '플라스틱', suppliers: 156, avgRisk: 'medium', mainIssues: '재활용률, 바이오 소재 전환' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더: 기업명, ESG 등급, 업계 순위 등 주요 정보 표시 */}
        <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-r from-purple-800/50 to-indigo-800/50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">새미전자 ESG 대시보드</h1>
              <p className="text-purple-300 mt-1">통합 ESG 성과 관리 시스템</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">B+</div>
                <div className="text-sm text-gray-300">ESG 등급</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">#{67}</div>
                <div className="text-sm text-gray-300">업계 순위/342사</div>
              </div>
              <div className="text-right">
                <div className="text-lg text-white">매출 8.7조원</div>
                <div className="text-sm text-gray-300">직원 28,450명</div>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션: ESG 총괄, 탄소 관리, CBAM 대응, 공급망 ESG 탭 전환 */}
        <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
          {[
            { id: 'overview', name: 'ESG 총괄' },
            { id: 'carbon', name: '탄소 관리' },
            { id: 'cbam', name: 'CBAM 대응' },
            { id: 'supply', name: '공급망 ESG' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                selectedView === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* ESG 총괄 탭 내용 */}
        {selectedView === 'overview' && (
          <>
            {/* ESG 스코어카드: ESG 각 영역별 점수 및 설명 */}
            <div className="grid grid-cols-4 gap-4">
              <MetricCard
                title="ESG 총점"
                value={esgScores.overall}
                unit="/100"
                trend="up"
                icon={<Icons.Award />}
                subtitle="전년 대비 +3.8점"
                description="MSCI ESG 방법론 기준 통합 점수입니다. Environmental(30%), Social(30%), Governance(40%) 가중평균으로 계산됩니다. 전자업계 평균 74.2점 대비 4.2점 높습니다."
                comparison={{ type: 'better', text: '전자업계 상위 19%' }}
              />
              <MetricCard
                title="Environmental"
                value={esgScores.environmental}
                unit="/100"
                trend="up"
                icon={<Icons.Leaf />}
                subtitle="탄소중립 로드맵 수립"
                description="환경 성과 점수입니다. 탄소배출량, 에너지효율, 물 사용량, 폐기물 관리, 제품 환경성을 종합 평가합니다. 2030년 RE100 달성 목표로 재생에너지 전환을 가속화하고 있습니다."
                comparison={{ type: 'better', text: '글로벌 평균 대비 +12점' }}
              />
              <MetricCard
                title="Social"
                value={esgScores.social}
                unit="/100"
                icon={<Icons.Users />}
                subtitle="DEI 프로그램 강화"
                description="사회적 책임 점수입니다. 직원 안전보건, 다양성 포용, 지역사회 기여, 공급망 관리를 평가합니다. 여성 임원 비율 23%로 증가, 산업재해율 0.12%로 업계 최저 수준입니다."
                comparison={{ type: 'better', text: '개선 필요 영역: 공급망 ESG' }}
              />
              <MetricCard
                title="Governance"
                value={esgScores.governance}
                unit="/100"
                trend="up"
                icon={<Icons.Shield />}
                subtitle="독립이사 비율 45%"
                description="지배구조 점수입니다. 이사회 독립성, 투명성, 위험관리, 주주권익 보호를 평가합니다. ESG 전담 위원회 설치, 임원 보수와 ESG 성과 연동(30%) 등으로 거버넌스를 강화했습니다."
                comparison={{ type: 'better', text: 'KOSPI 평균 대비 +15점' }}
              />
            </div>

            {/* ESG 상세 분석: 점수 트렌드 및 업계 벤치마킹 차트 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-lg font-semibold text-white mb-4">ESG 점수 트렌드 (최근 24개월)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={Array.from({ length: 24 }, (_, i) => ({
                    month: `${Math.floor(i/12) + 2023}-${String((i%12) + 1).padStart(2, '0')}`,
                    environmental: 78.2 + Math.sin(i * 0.3) * 2 + i * 0.13,
                    social: 71.8 + Math.sin(i * 0.4) * 1.5 + i * 0.09,
                    governance: 77.1 + Math.sin(i * 0.2) * 1.8 + i * 0.12
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" interval={3} />
                    <YAxis domain={[65, 85]} stroke="#9CA3AF" />
                    <Tooltip content={<CustomTooltip description="월별 ESG 점수 변화 추이입니다. 지속적인 개선을 통해 모든 영역에서 상승 추세를 보이고 있습니다." />} />
                    <Legend />
                    <Line type="monotone" dataKey="environmental" stroke="#10B981" strokeWidth={2} name="Environmental" />
                    <Line type="monotone" dataKey="social" stroke="#3B82F6" strokeWidth={2} name="Social" />
                    <Line type="monotone" dataKey="governance" stroke="#8B5CF6" strokeWidth={2} name="Governance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-lg font-semibold text-white mb-4">업계 벤치마킹 (전자업계 기준)</h3>
                <div className="space-y-4">
                  {[
                    { 
                      metric: 'ESG 통합 점수', 
                      our: 78.4, 
                      industry: 74.2, 
                      global: 71.8, 
                      rank: '상위 19%',
                      description: '글로벌 전자업체 342개사 대비 순위입니다.'
                    },
                    { 
                      metric: '탄소 집약도', 
                      our: 2.8, 
                      industry: 4.1, 
                      global: 4.7, 
                      rank: '상위 12%',
                      description: '매출 10억원당 탄소 배출량(tCO2e)입니다.'
                    },
                    { 
                      metric: '재생에너지 비율', 
                      our: 37, 
                      industry: 22, 
                      global: 28, 
                      rank: '상위 8%',
                      description: '전체 전력 사용량 중 재생에너지 비율(%)입니다.'
                    },
                    { 
                      metric: '여성 임원 비율', 
                      our: 23, 
                      industry: 16, 
                      global: 19, 
                      rank: '상위 15%',
                      description: '전체 임원(상무급 이상) 중 여성 비율(%)입니다.'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative"
                    >
                      <div className="flex-1">
                        <div className="text-white font-medium">{item.metric}</div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-400">당사: <span className="text-emerald-400 font-medium">{item.our}</span></span>
                          <span className="text-sm text-gray-400">업계: <span className="text-gray-300">{item.industry}</span></span>
                          <span className="text-sm text-gray-400">글로벌: <span className="text-gray-300">{item.global}</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">{item.rank}</span>
                      </div>
                      
                      {/* 상세 설명 툴팁 */}
                      <div className="absolute left-0 bottom-full mb-2 w-80 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <h4 className="text-white font-medium mb-1">{item.metric}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 탄소 관리 탭 내용 */}
        {selectedView === 'carbon' && (
          <>
            {/* 탄소 배출량 현황: Scope별 배출량 파이 차트 및 로드맵 진행률 */}
            <div className="grid grid-cols-3 gap-6">
              <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-lg font-semibold text-white mb-4">Scope별 배출량 (2024년, tCO2e)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={carbonScope}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {carbonScope.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip description="GHG 프로토콜 기준으로 분류한 Scope별 탄소 배출량입니다. Scope 3가 전체의 77%를 차지하여 공급망 관리가 핵심입니다." />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {carbonScope.map((scope, index) => (
                    <div key={index} className="flex justify-between items-center hover:bg-gray-800/30 p-2 rounded cursor-pointer group relative">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scope.color }}></div>
                        <span className="text-sm text-gray-300">{scope.name}</span>
                      </div>
                      <span className="text-white font-medium">{scope.value.toLocaleString()}</span>
                      
                      {/* Scope별 설명 툴팁 */}
                      <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <h4 className="text-white font-medium mb-1">{scope.name}</h4>
                        <p className="text-gray-300 text-sm">{scope.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-lg font-semibold text-white mb-4">탄소중립 로드맵 진행률</h3>
                <div className="space-y-6">
                  {[
                    { 
                      year: 2025, 
                      target: 15, 
                      actual: 18.3, 
                      status: 'ahead',
                      description: '단기 목표: RE100 가입, 에너지효율 개선, 친환경 공정 도입'
                    },
                    { 
                      year: 2030, 
                      target: 42, 
                      projected: 44.7, 
                      status: 'on_track',
                      description: '중기 목표: 재생에너지 100%, Scope 1,2 탄소중립, 친환경 제품 70%'
                    },
                    { 
                      year: 2050, 
                      target: 100, 
                      projected: 97.8, 
                      status: 'at_risk',
                      description: '장기 목표: 전 가치사슬 탄소중립, Scope 3 포함 완전 탄소중립'
                    }
                  ].map((target, index) => (
                    <div key={index} className="space-y-2 group cursor-pointer relative">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{target.year}년 목표</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">{target.target}% 감축</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            target.status === 'ahead' ? 'bg-green-500/20 text-green-400' :
                            target.status === 'on_track' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {target.status === 'ahead' ? '목표 초과' :
                             target.status === 'on_track' ? '순조' : '주의 필요'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            target.status === 'ahead' ? 'bg-green-500' :
                            target.status === 'on_track' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min((target.actual || target.projected) / target.target * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-400">
                        현재/예상: {target.actual || target.projected}% 감축
                      </div>
                      
                      {/* 목표별 상세 설명 */}
                      <div className="absolute left-0 top-full mt-2 w-96 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <h4 className="text-white font-medium mb-2">{target.year}년 목표 상세</h4>
                        <p className="text-gray-300 text-sm">{target.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CBAM 대응 탭 내용 */}
        {selectedView === 'cbam' && (
          <div className="grid grid-cols-2 gap-6">
            {/* EU 수출 현황 차트 */}
            <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <h3 className="text-lg font-semibold text-white mb-4">EU 수출 현황 (전자부품)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={cbamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip description="EU로 수출하는 전자부품의 월별 현황입니다. CBAM 규정에 따라 2026년부터 탄소 인증서 구매가 의무화됩니다." />} />
                  <Area type="monotone" dataKey="exports" stroke="#3B82F6" fill="#3B82F640" name="수출량 (톤)" />
                  <Area type="monotone" dataKey="emissions" stroke="#EF4444" fill="#EF444440" name="내재배출량 (tCO2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* CBAM 인증서 관리 */}
            <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <h3 className="text-lg font-semibold text-white mb-4">CBAM 인증서 관리</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
                    <div className="text-2xl font-bold text-white">8,947</div>
                    <div className="text-sm text-gray-400">보유 인증서 (tCO2)</div>
                    
                    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                      <p className="text-gray-300 text-sm">현재 보유한 CBAM 인증서입니다. EU ETS 가격과 연동되어 평균 €47.3/톤으로 구매했습니다.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
                    <div className="text-2xl font-bold text-orange-400">6,234</div>
                    <div className="text-sm text-gray-400">필요 인증서 (tCO2)</div>
                    
                    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                      <p className="text-gray-300 text-sm">향후 6개월간 EU 수출에 필요한 예상 인증서량입니다. AI 예측 모델로 계산됩니다.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 font-medium">여유분</span>
                    <span className="text-emerald-400 font-bold">2,713 tCO2</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">거래 가능 • 예상 수익 ₩1.28억</div>
                </div>
                <div className="space-y-3">
                  <div className="text-white font-medium">공급업체 데이터 품질</div>
                  {[
                    { name: '1차 공급업체', completed: 89, total: 94, rate: 94.7 },
                    { name: '2차 공급업체', completed: 234, total: 312, rate: 75.0 },
                    { name: '검증 완료', completed: 198, total: 234, rate: 84.6 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1 hover:bg-gray-800/30 p-2 rounded cursor-pointer group relative">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.name}</span>
                        <span className="text-white">{item.completed}/{item.total} ({item.rate}%)</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.rate > 90 ? 'bg-green-500' : 
                            item.rate > 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${item.rate}%` }}
                        ></div>
                      </div>
                      
                      <div className="absolute left-0 bottom-full mb-2 w-72 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <p className="text-gray-300 text-sm">
                          {item.name === '1차 공급업체' && 'Tier 1 공급업체의 배출량 데이터 수집 현황입니다.'}
                          {item.name === '2차 공급업체' && 'Tier 2 공급업체의 배출량 데이터 수집 현황입니다.'}
                          {item.name === '검증 완료' && '제3자 검증기관을 통한 데이터 검증 완료 현황입니다.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 공급망 ESG 탭 내용 */}
        {selectedView === 'supply' && (
          <div className="space-y-6">
            {/* 공급망 개요 */}
            <div className="grid grid-cols-4 gap-4">
              <MetricCard
                title="총 공급업체"
                value={supplyChainData.totalSuppliers}
                unit="개사"
                icon={<Icons.Factory />}
                subtitle="34개국"
                description="새미전자와 거래하는 모든 공급업체입니다. 1차 공급업체 147개사, 2차 공급업체 312개사, 기타 388개사로 구성됩니다."
              />
              <MetricCard
                title="ESG 평가 완료"
                value={supplyChainData.assessedSuppliers}
                unit="개사"
                icon={<Icons.Shield />}
                subtitle="평가율 86.3%"
                description="ESG 리스크 평가를 완료한 공급업체 수입니다. 환경, 사회, 지배구조 3개 영역 67개 항목을 평가합니다."
                comparison={{ type: 'better', text: '업계 평균 73% 대비 우수' }}
              />
              <MetricCard
                title="고위험 공급업체"
                value={47}
                unit="개사"
                trend="down"
                icon={<Icons.TrendDown />}
                subtitle="전체의 5.5%"
                description="ESG 리스크가 높은 공급업체입니다. 집중 관리를 통해 개선 계획을 수립하고 정기 모니터링을 실시합니다."
                comparison={{ type: 'better', text: '전년 대비 12개사 감소' }}
              />
              <MetricCard
                title="평균 ESG 점수"
                value={67.8}
                unit="/100"
                trend="up"
                icon={<Icons.Award />}
                subtitle="목표 70점"
                description="공급업체 ESG 평균 점수입니다. 가중평균으로 계산하며, 거래 규모가 클수록 높은 가중치를 적용합니다."
                comparison={{ type: 'better', text: '연간 목표 97% 달성' }}
              />
            </div>

            {/* 공급망 리스크 현황 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-lg font-semibold text-white mb-4">고위험 공급업체 현황</h3>
                <div className="space-y-3">
                  {supplyChainData.highRiskSuppliers.map((supplier, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">{supplier.name}</h4>
                          <p className="text-sm text-gray-400">{supplier.location}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-300">ESG: {supplier.esgScore}</span>
                          <div className={`w-3 h-3 rounded-full ${
                            supplier.riskLevel === 'high' ? 'bg-red-500' :
                            supplier.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {supplier.issues.map((issue, idx) => (
                          <span key={idx} className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                            {issue}
                          </span>
                        ))}
                      </div>
                      
                      {/* 공급업체 상세 정보 */}
                      <div className="absolute left-full ml-2 top-0 w-80 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <h4 className="text-white font-medium mb-2">{supplier.name} 상세 정보</h4>
                        <div className="space-y-2 text-sm">
                          <div className="text-gray-300">위치: {supplier.location}</div>
                          <div className="text-gray-300">ESG 점수: {supplier.esgScore}/100</div>
                          <div className="text-gray-300">리스크 레벨: 
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              supplier.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' :
                              supplier.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {supplier.riskLevel.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-gray-300">
                            주요 이슈: {supplier.issues.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <h3 className="text-lg font-semibold text-white mb-4">카테고리별 리스크 분석</h3>
                <div className="space-y-4">
                  {supplyChainData.categoryRisks.map((category, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{category.category}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">{category.suppliers}개사</span>
                          <div className={`w-3 h-3 rounded-full ${
                            category.avgRisk === 'high' ? 'bg-red-500' :
                            category.avgRisk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{category.mainIssues}</p>
                      
                      {/* 카테고리 상세 설명 */}
                      <div className="absolute left-0 bottom-full mb-2 w-96 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <h4 className="text-white font-medium mb-2">{category.category} 카테고리 분석</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <div>공급업체 수: {category.suppliers}개사</div>
                          <div>평균 리스크: {category.avgRisk.toUpperCase()}</div>
                          <div>주요 ESG 이슈: {category.mainIssues}</div>
                          {category.category === '반도체' && <div>추가 정보: 에너지 집약적 공정으로 인한 높은 탄소 배출량이 주요 관리 포인트입니다.</div>}
                          {category.category === '디스플레이' && <div>추가 정보: 희토류 사용과 제조 과정의 화학물질 관리가 핵심 이슈입니다.</div>}
                          {category.category === '배터리' && <div>추가 정보: 리튬 채굴의 환경 영향과 폐배터리 재활용 체계 구축이 중요합니다.</div>}
                          {category.category === '플라스틱' && <div>추가 정보: 바이오 플라스틱 전환과 순환경제 체계 구축이 핵심 과제입니다.</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 공급망 개선 계획 */}
            <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <h3 className="text-lg font-semibold text-white mb-4">공급망 ESG 개선 로드맵</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-emerald-400 font-medium">2025년 1분기</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <div className="text-white font-medium mb-1">전 공급업체 ESG 평가 완료</div>
                      <div className="text-sm text-gray-400">현재 86.3% → 목표 100%</div>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="text-white font-medium mb-1">고위험 업체 개선계획 수립</div>
                      <div className="text-sm text-gray-400">47개사 대상 맞춤형 계획</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-blue-400 font-medium">2025년 상반기</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="text-white font-medium mb-1">재생에너지 전환 지원</div>
                      <div className="text-sm text-gray-400">주요 공급업체 50% 전환</div>
                    </div>
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <div className="text-white font-medium mb-1">ESG 교육 프로그램 운영</div>
                      <div className="text-sm text-gray-400">500개사 대상 온라인 교육</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-purple-400 font-medium">2025년 하반기</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="text-white font-medium mb-1">순환경제 모델 도입</div>
                      <div className="text-sm text-gray-400">폐기물 30% 감축 목표</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="text-white font-medium mb-1">ESG 성과 인센티브 도입</div>
                      <div className="text-sm text-gray-400">우수 업체 거래 우대</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 4. 새마을중앙회 대시보드 컴포넌트
// 새마을운동의 탄소중립 실천 현황, 회원 수, 지역별 성과 등을 보여줍니다.
const AssociationDashboard = () => {
  // 월별 회원 데이터
  const memberData = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      month: `${i + 1}월`,
      totalMembers: 4870000 + i * 15000 + Math.floor(Math.random() * 8000),
      activeMembers: 3980000 + i * 12000 + Math.floor(Math.random() * 5000),
      newMembers: Math.floor(Math.random() * 20000) + 5000
    })), []
  );

  // 지역별 새마을 운동 현황 데이터
  const regionalPerformance = [
    {
      region: '서울/경기',
      members: 1250000,
      energySavingRate: 12.5,
      recyclingRate: 85.2,
      description: '수도권 지역은 인구 밀도가 높아 1인당 에너지 절약 성과가 높게 나타납니다.'
    },
    {
      region: '강원/충청',
      members: 890000,
      energySavingRate: 15.2,
      recyclingRate: 89.1,
      description: '농촌 지역의 적극적인 참여로 재활용 및 자원순환 활동이 활발합니다.'
    },
    {
      region: '전라/제주',
      members: 780000,
      energySavingRate: 14.8,
      recyclingRate: 91.3,
      description: '청정 지역 특성을 살린 친환경 캠페인이 높은 참여율을 보입니다.'
    },
    {
      region: '경상',
      members: 1150000,
      energySavingRate: 13.1,
      recyclingRate: 87.5,
      description: '새마을 운동 발상지로서, 조직적인 활동을 통해 높은 성과를 유지하고 있습니다.'
    },
  ];

  // 주요 활동 참여율 및 만족도 데이터
  const activityUtilization = [
    { name: '새마을의 날 기념행사', usage: 88.2, satisfaction: 4.8, participants: 120500 },
    { name: '에너지 절약 교육', usage: 65.4, satisfaction: 4.5, participants: 897000 },
    { name: '재활용 캠페인', usage: 92.1, satisfaction: 4.7, participants: 1543000 },
    { name: '지역사회 봉사', usage: 78.9, satisfaction: 4.6, participants: 1125000 },
    { name: '탄소중립 실천 인증', usage: 45.3, satisfaction: 4.3, participants: 458000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-yellow-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더: 새마을중앙회 대시보드 제목 및 회원 정보 */}
        <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-r from-green-800/50 to-yellow-800/50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">새마을중앙회 탄소중립 실천</h1>
              <p className="text-yellow-200 mt-1">국민과 함께하는 탄소중립 운동</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">4,875,321명</div>
              <div className="text-sm text-gray-300">활성 회원 3,981,456명 (81.7%)</div>
            </div>
          </div>
        </div>

        {/* 핵심 지표 섹션 */}
        <div className="grid grid-cols-5 gap-4">
          <MetricCard
            title="총 회원"
            value={4875321}
            unit="명"
            trend="up"
            icon={<Icons.Users />}
            subtitle="신규 가입 +18,432명"
            description="새마을운동에 동참하는 전국 회원 수입니다."
          />
          <MetricCard
            title="탄소중립 실천 서약"
            value={3981456}
            unit="명"
            icon={<Icons.Leaf />}
            subtitle="서약률 81.7%"
            description="탄소중립 생활 실천을 서약한 회원 수입니다."
            comparison={{ type: 'better', text: '전년 대비 15% 증가' }}
          />
          <MetricCard
            title="에너지 절약 캠페인"
            value={2154890}
            unit="명 참여"
            icon={<Icons.Zap />}
            subtitle="참여율 54.1%"
            description="가정, 직장에서의 에너지 절약 캠페인에 참여한 회원 수입니다."
            comparison={{ type: 'better', text: '전년 대비 22% 증가' }}
          />
          <MetricCard
            title="재활용/자원순환 활동"
            value={3543210}
            unit="명 참여"
            icon={<Icons.Shield />}
            subtitle="참여율 89.0%"
            description="재활용 분리배출, 자원순환 캠페인 등 관련 활동 참여 회원 수입니다."
            comparison={{ type: 'better', text: '가장 활발한 활동' }}
          />
          <MetricCard
            title="새마을 교육 이수"
            value={1876543}
            unit="명"
            icon={<Icons.Award />}
            subtitle="이수율 47.1%"
            description="새마을 정신과 탄소중립 관련 교육을 이수한 회원 수입니다."
            comparison={{ type: 'better', text: '온라인 교육 만족도 4.6/5.0' }}
          />
        </div>

        {/* 월별 회원 현황 차트 */}
        <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
          <h3 className="text-lg font-semibold text-white mb-4">월별 회원 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memberData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip description="월별 총 회원, 활성 회원, 신규 회원 현황입니다." />} />
              <Legend />
              <Line type="monotone" dataKey="totalMembers" stroke="#8884d8" name="총 회원" />
              <Line type="monotone" dataKey="activeMembers" stroke="#82ca9d" name="활성 회원" />
              <Line type="monotone" dataKey="newMembers" stroke="#ffc658" name="신규 회원" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 지역별 새마을 운동 현황 */}
        <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
          <h3 className="text-lg font-semibold text-white mb-4">지역별 새마을 운동 현황</h3>
          <div className="space-y-4">
            {regionalPerformance.map((region, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{region.region}</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">회원: {region.members.toLocaleString()}명</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">에너지 절약률</div>
                    <div className="text-white">{region.energySavingRate}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">재활용 실천율</div>
                    <div className="text-white">{region.recyclingRate}%</div>
                  </div>
                </div>

                <div className="absolute left-0 bottom-full mb-2 w-96 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  <h4 className="text-white font-medium mb-2">{region.region} 지역 분석</h4>
                  <p className="text-gray-300 text-sm">{region.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주요 활동 참여율 및 만족도 차트 */}
        <div className="glass-card p-6 border border-gray-700/50 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50">
          <h3 className="text-lg font-semibold text-white mb-4">주요 활동 참여율 및 만족도</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityUtilization}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis />
              <Tooltip content={<CustomTooltip description="주요 활동별 참여율과 만족도입니다." />} wrapperStyle={{ zIndex: 9999 }} />
              <Legend />
              <Bar dataKey="usage" fill="#3B82F6" name="참여율 (%)" />
              <Bar dataKey="satisfaction" fill="#10B981" name="만족도 (5점 만점)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트: 대시보드 네비게이션 및 현재 대시보드 컴포넌트를 렌더링합니다.
const App = () => {
  // 현재 활성화된 대시보드를 관리하는 상태 (기본값: 플랫폼 관제실)
  const [currentDashboard, setCurrentDashboard] = useState('platform'); 

  // 사용 가능한 대시보드 목록
  const dashboards = [
    { id: 'platform', name: '플랫폼 관제실', component: PlatformControlDashboard },
    { id: 'municipal', name: '지자체 대시보드', component: MunicipalDashboard },
    { id: 'corporate', name: '기업 ESG', component: CorporateESGDashboard },
    { id: 'association', name: '새마을중앙회', component: AssociationDashboard },
  ];

  // 현재 선택된 대시보드 컴포넌트를 찾거나 기본값(PlatformControlDashboard)을 사용합니다.
  const CurrentComponent = dashboards.find(d => d.id === currentDashboard)?.component || PlatformControlDashboard;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 네비게이션 바 */}
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/namuplanet_logo_1571904598.webp" alt="Namuplanet Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-white">Cypress Carbon Grid</span>
          </div>
          {/* 대시보드 선택 버튼 목록 */}
          <div className="flex space-x-1">
            {dashboards.map((dashboard) => (
              <button key={dashboard.id} onClick={() => setCurrentDashboard(dashboard.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${currentDashboard === dashboard.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
                {dashboard.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* 현재 선택된 대시보드 컴포넌트를 렌더링합니다. */}
      <CurrentComponent />
      {/* 전역 스타일 정의 */}
      <style jsx global>{`
        .glass-card {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
                }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
      `}</style>
    </div>
  );
};

export default App;
