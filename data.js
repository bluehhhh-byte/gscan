// ── G-Scan 샘플 데이터 ──

// 대시보드 메트릭 카드
const DASHBOARD_METRICS = [
  { label: '지자체', value: 245 },
  { label: '본청 실국', value: 2077 },
  { label: '과·담당관', value: 16068 },
  { label: '직속기관', value: 1993 },
  { label: '읍·면·동', value: 3575 },
];

// 부서 수 Top 20 (가로 막대 차트)
const DEPT_TOP20 = [
  { name: '서울특별시', count: 870 },
  { name: '경기도', count: 620 },
  { name: '부산광역시', count: 460 },
  { name: '경상북도', count: 420 },
  { name: '전라남도', count: 400 },
  { name: '충청남도', count: 395 },
  { name: '경상남도', count: 385 },
  { name: '인천광역시', count: 370 },
  { name: '강원특별자치도', count: 340 },
  { name: '대구광역시', count: 310 },
  { name: '충청북도', count: 300 },
  { name: '전북특별자치도', count: 290 },
  { name: '광주광역시', count: 270 },
  { name: '제주특별자치도', count: 255 },
  { name: '경상남도 창원시', count: 240 },
  { name: '대전광역시', count: 230 },
  { name: '경기도 화성시', count: 220 },
  { name: '울산광역시', count: 215 },
  { name: '세종특별자치시', count: 200 },
  { name: '경기도 수원시', count: 190 },
];

// 조직 유형 분포 (도넛 차트)
const ORG_TYPE_DIST = [
  { type: '과', count: 16068, color: '#2563eb' },
  { type: '실·국', count: 2077, color: '#16a34a' },
  { type: '읍·면·동', count: 3575, color: '#dc2626' },
  { type: '직속기관', count: 1993, color: '#ca8a04' },
  { type: '사업소', count: 980, color: '#9333ea' },
  { type: '담당관', count: 650, color: '#0891b2' },
];

// 인구 vs 부서 수 산점도
const POP_VS_DEPT = [
  { name: '서울특별시', pop: 950, dept: 870, color: '#2563eb' },
  { name: '부산광역시', pop: 330, dept: 460, color: '#16a34a' },
  { name: '대구광역시', pop: 240, dept: 310, color: '#ca8a04' },
  { name: '인천광역시', pop: 295, dept: 370, color: '#dc2626' },
  { name: '광주광역시', pop: 145, dept: 270, color: '#9333ea' },
  { name: '대전광역시', pop: 145, dept: 230, color: '#0891b2' },
  { name: '울산광역시', pop: 112, dept: 215, color: '#f97316' },
  { name: '세종특별자치시', pop: 38, dept: 200, color: '#ec4899' },
  { name: '경기도', pop: 1350, dept: 620, color: '#22c55e' },
  { name: '강원특별자치도', pop: 155, dept: 340, color: '#3b82f6' },
  { name: '충청북도', pop: 160, dept: 300, color: '#a855f7' },
  { name: '충청남도', pop: 215, dept: 395, color: '#14b8a6' },
  { name: '전북특별자치도', pop: 180, dept: 290, color: '#f43f5e' },
  { name: '전라남도', pop: 185, dept: 400, color: '#8b5cf6' },
  { name: '경상북도', pop: 260, dept: 420, color: '#06b6d4' },
  { name: '경상남도', pop: 330, dept: 385, color: '#10b981' },
  { name: '제주특별자치도', pop: 68, dept: 255, color: '#f59e0b' },
];

// 17개 시·도 → 하위 시·군·구 목록
const LOCAL_GOVS = {
  '강원특별자치도': {
    count: 18,
    children: ['춘천시','원주시','강릉시','동해시','태백시','속초시','삼척시','홍천군','횡성군','영월군','평창군','정선군','철원군','화천군','양구군','인제군','고성군','양양군']
  },
  '경기도': {
    count: 31,
    children: ['수원시','성남시','의정부시','안양시','부천시','광명시','평택시','동두천시','안산시','고양시','과천시','구리시','남양주시','오산시','시흥시','군포시','의왕시','하남시','용인시','파주시','이천시','안성시','김포시','화성시','광주시','양주시','포천시','여주시','연천군','가평군','양평군']
  },
  '경상남도': {
    count: 18,
    children: ['창원시','진주시','통영시','사천시','김해시','밀양시','거제시','양산시','의령군','함안군','창녕군','고성군','남해군','하동군','산청군','함양군','거창군','합천군']
  },
  '경상북도': {
    count: 22,
    children: ['포항시','경주시','김천시','안동시','구미시','영주시','영천시','상주시','문경시','경산시','의성군','청송군','영양군','영덕군','청도군','고령군','성주군','칠곡군','예천군','봉화군','울진군','울릉군']
  },
  '광주광역시': {
    count: 5,
    children: ['동구','서구','남구','북구','광산구']
  },
  '대구광역시': {
    count: 9,
    children: ['중구','동구','서구','남구','북구','수성구','달서구','달성군','군위군']
  },
  '대전광역시': {
    count: 5,
    children: ['동구','중구','서구','유성구','대덕구']
  },
  '부산광역시': {
    count: 16,
    children: ['중구','서구','동구','영도구','부산진구','동래구','남구','북구','해운대구','사하구','금정구','강서구','연제구','수영구','사상구','기장군']
  },
  '서울특별시': {
    count: 25,
    children: ['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구']
  },
  '세종특별자치시': {
    count: 0,
    children: []
  },
  '울산광역시': {
    count: 5,
    children: ['중구','남구','동구','북구','울주군']
  },
  '인천광역시': {
    count: 10,
    children: ['중구','동구','미추홀구','연수구','남동구','부평구','계양구','서구','강화군','옹진군']
  },
  '전라남도': {
    count: 22,
    children: ['목포시','여수시','순천시','나주시','광양시','담양군','곡성군','구례군','고흥군','보성군','화순군','장흥군','강진군','해남군','영암군','무안군','함평군','영광군','장성군','완도군','진도군','신안군']
  },
  '전북특별자치도': {
    count: 14,
    children: ['전주시','군산시','익산시','정읍시','남원시','김제시','완주군','진안군','무주군','장수군','임실군','순창군','고창군','부안군']
  },
  '제주특별자치도': {
    count: 2,
    children: ['제주시','서귀포시']
  },
  '충청남도': {
    count: 15,
    children: ['천안시','공주시','보령시','아산시','서산시','논산시','계룡시','당진시','금산군','부여군','서천군','청양군','홍성군','예산군','태안군']
  },
  '충청북도': {
    count: 11,
    children: ['청주시','충주시','제천시','보은군','옥천군','영동군','증평군','진천군','괴산군','음성군','단양군']
  },
};

// 지자체 비교 데이터
const COMPARISON_BASE = '김해시';
const COMPARISON_TARGETS = ['파주시', '시흥시', '안양시', '포항시', '김포시'];

const COMPARISON_DATA = {
  '김해시':  { pop: 532407, area: 463.6, density: 1148, avgAge: 41.9, aging: 106.1, budget: 21626, genRatio: 82.7, fiscal: 27.3, perCapita: 4061951, officers: 2047, officerPer: 260.1 },
  '파주시':  { pop: 530201, area: 674.5, density: 786, avgAge: 42.1, aging: 116.4, budget: 21247, genRatio: 78.6, fiscal: 28.5, perCapita: 4007433, officers: 1979, officerPer: 267.9 },
  '시흥시':  { pop: 514501, area: 140.0, density: 3676, avgAge: 40.7, aging: 86.5, budget: 17001, genRatio: 84.0, fiscal: 34.1, perCapita: 3304450, officers: 1854, officerPer: 277.5 },
  '안양시':  { pop: 562866, area: 58.5, density: 9618, avgAge: 43.6, aging: 161.7, budget: 22923, genRatio: 66.8, fiscal: 35.8, perCapita: 4073928, officers: 2015, officerPer: 279.2 },
  '포항시':  { pop: 487769, area: 1130.7, density: 431, avgAge: 45.5, aging: 186.9, budget: 26717, genRatio: 87.1, fiscal: 21.0, perCapita: 5477297, officers: 2299, officerPer: 212.2 },
  '김포시':  { pop: 498320, area: 276.6, density: 1802, avgAge: 39.8, aging: 72.3, budget: 19850, genRatio: 81.5, fiscal: 32.1, perCapita: 3983210, officers: 1780, officerPer: 279.9 },
};

// 자료관리 탭 — 부서 목록 (샘플)
const DEPT_CRAWL_LIST = [
  { name: '총무과', region: '강원특별자치도', type: '4_advisor' },
  { name: '경제정책과', region: '강원특별자치도', type: '4_advisor' },
  { name: '전략산업과', region: '강원특별자치도', type: '4_advisor' },
  { name: '총무과', region: '강원특별자치도', type: '4_advisor' },
  { name: '연구협력과', region: '강원특별자치도', type: '4_advisor' },
  { name: '지원기획과', region: '강원특별자치도', type: '4_advisor' },
  { name: '총무과', region: '강원특별자치도', type: '4_advisor' },
  { name: '감염병진단과', region: '강원특별자치도', type: '4_advisor' },
  { name: '수계조사과', region: '강원특별자치도', type: '4_advisor' },
  { name: '청정대기과', region: '강원특별자치도', type: '4_advisor' },
  { name: '교육지원과', region: '강원특별자치도', type: '4_advisor' },
  { name: '소방행정과', region: '강원특별자치도', type: '4_advisor' },
  { name: '소방행정과', region: '전라남도', type: '4_advisor' },
  { name: '환경정책과', region: '경기도', type: '4_advisor' },
  { name: '도시계획과', region: '부산광역시', type: '4_advisor' },
];

// 챗봇 추천 질문
const CHAT_SUGGESTIONS = [
  '강남구 환경 담당 부서는?',
  '수원시 인구·세출예산 알려줘',
  '경기도 재정자립도와 공무원 현원',
  '도시계획 담당 과 검색',
];
