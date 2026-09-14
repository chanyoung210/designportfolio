// Assumption: beer.png excluded (illustration, not a project screenshot).
// Titles for kookmin/gptkorea are placeholders — swap in the real names.
// Case-study detail content for the fullscreen project modal. Only KICC is
// filled in for now (the reference layout) — other projects fall back to a
// title-only modal until their content is written.
const KICC_CASE_STUDY = {
  eyebrow: 'Tour Bus service\n& Tax Refund',
  heroImage: '/protfolio/kicc/visual.png',
  heroTitle: '한국정보통신 투어버스 서비스',
  intro:
    '방한 외국인을 대상으로 한 4개국어 대응 웹 서비스입니다. 투어버스 예매부터 공항에서의 스캔 택스리펀드까지, 하나의 플로우 안에서 처리할 수 있도록 기획되었습니다. 저는 이 프로젝트에서 5일이라는 짧은 기간 안에, 기존 UI 구조는 유지한 상태로 방한 외국인 사용자에 맞춘 비주얼 디자인과 퍼블리싱을 담당했습니다.',
  meta: [
    { label: 'Year', value: '2026. 01' },
    { label: 'Company', value: '(주)한국정보통신' },
    { label: 'Role', value: 'UX(30%) · UI(100%) · Web Publisging(100%)' },
  ],
  gallery: ['/protfolio/kicc/since01.png', '/protfolio/kicc/since02.png'],
  wideImage: '/protfolio/kicc/since03.png',
  comparisons: [
    {
      label: 'Problem',
      image: '/protfolio/kicc/asis.png',
      title: '텍스트 중심 설계의 한계',
      body: '텍스트 위주의 화면은 사용자가 예매과정엔 문제가 없지만, 복잡한 공항에서 버스를 찾는 여정에 문제가 생길 수 있다고 판단했습니다.',
      bullets: ['탑승 버스 시각 정보 부족', '브랜드 아이덴티티 부족', 'UI 구조 수정 제한'],
    },
    {
      label: '시안작업',
      image: '/protfolio/kicc/tobe00.png',
      title: '브랜드 캐릭터로 완성한 탑승 인지',
      body: '버스와 브랜드 캐릭터를 예약 화면과 실물 버스에 함께 노출해, 예매 과정에서 자연스럽게 탑승할 버스를 인식할 수 있도록 유도하고 브랜드 아이덴티티를 적용하였습니다.',
      icons: ['/protfolio/kicc/character.png', '/protfolio/kicc/bus.png'],
    },
  ],
  colors: [
    { name: 'COLOR SYSTEM', hexLabel: 'HEX F52D46 ~ FE6921', value: 'linear-gradient(90deg, #F52D46 0%, #FE6921 100%)', text: '#ffffff' },
    { hexLabel: 'HEX E41D39', value: '#E41D39', text: '#ffffff' },
    { hexLabel: 'HEX FF7A32', value: '#FF7A32', text: '#ffffff' },
    { hexLabel: 'HEX 222222', value: '#222222', text: '#ffffff' },
    { hexLabel: 'HEX E7EEF0', value: '#E7EEF0', text: '#020202' },
    { hexLabel: 'HEX EFF5F6', value: '#EFF5F6', text: '#020202' },
    { hexLabel: 'HEX FFFFFF', value: '#FFFFFF', text: '#020202' },
  ],
  typography: [
    { label: 'Noto Sans KR', sample: '한글' },
    { label: 'Noto Sans', sample: 'Aa' },
    { label: 'Noto Sans JP', sample: 'あ' },
    { label: 'Noto Sans SC', sample: '汉' },
  ],
  logo: '/protfolio/kicc/logo00.svg',
  logoFiles: ['/protfolio/kicc/logo01.svg', '/protfolio/kicc/logo02.svg'],
  mockups: [
    '/protfolio/kicc/asis.png',
    '/protfolio/kicc/tobe00.png',
    '/protfolio/kicc/tobe01.png',
    '/protfolio/kicc/tobe02.png',
    '/protfolio/kicc/tobe03.png',
  ],
  closing: '언어와 국적에 관계없이 누구나 헤매지 않고 탑승할 수 있는 투어버스 경험을 목표로 작업했습니다.',
}

const SLEEFIT_CASE_STUDY = {
  heroImage: '/protfolio/gym/visual.png',
  heroTitle: 'SleeFit',
  heroTitleSize: 100,
  heroSubtitle: '운동 기록 앱을 400회 넘게 쓰면서 느낀 불편을, 인터뷰로 검증하고 직접 개선해본 프로젝트.',
  background: {
    title: 'Background.',
    body: '개인 웨이트 트레이닝 기록을 위해 여러 운동 앱을 400회 이상 사용해왔습니다. 그 과정에서 광고, 리워드 알림, 불필요한 기능으로 인한 불편을 반복적으로 겪었지만, 이런 요소들이 수익화를 위한 합리적인\n선택이라는 점도 이해하고 있었습니다. 그래서 단순히 불만을 제기하는 대신, AI 기반 개발(바이브 코딩) 방식을 활용해 문제의 원인을 직접 분석하고, 주변 사용자들도 같은 불편을 겪는지 인터뷰로 검증한 뒤,\n실제로 개선된 버전을 만들어보기로 했습니다.',
    meta: [
      { label: 'Year', value: '2026. 08 - 09' },
      { label: 'Company', value: '개인 프로젝트' },
      { label: 'Role', value: 'All 100%' },
      { label: 'Store', value: 'App Store' },
    ],
  },
  approach: {
    title: 'Project Approach.',
    image: '/protfolio/gym/item01.png',
    englishBold: 'Subtraction over addition.',
    englishBody: 'Every feature was cut until logging\na set became the only thing left.',
    label: 'Approach.',
    koreanBody: '기능을 더하는 대신, 운동에만 집중할 수 있도록\n불필요함을 전부 걷어냈다.',
  },
  interview: {
    title: 'Interview.',
    body: '지금까지의 문제 인식은 어디까지나 제 개인 경험에서 나온 가설이었습니다.\n이 가설만 믿고 바로 디자인에 들어가면, 저만의 불편함을 기준으로 방향을 잡을\n위험이 있다고 판단했습니다. 그래서 본격적인 디자인에 앞서,\n실제로 다른 사용자들도 같은 지점에서 불편을 느끼는지\n확인하기 위해 소규모 인터뷰를 진행했습니다.',
    items: [
      {
        label: '가설',
        value:
          '운동 기록 앱에서 광고와 불필요한 UI가 화면을 차지해 운동 종목을 찾는 흐름을 방해하는 것은,\n나만의 경험이 아니라 이 카테고리 앱들이 공통으로 가진 구조적 문제일 것이다.',
      },
      {
        label: '대상',
        value: '웨이트 트레이닝 앱 사용 경험이 있는 지인 3명 + 본인, 총 4명.',
      },
    ],
    qa: [
      {
        q: 'Q1. 운동 앱을 몇 개 정도 써봤나요?',
        a: [{ bold: '보통 1~2개' }, ' (플릭, 플랜핏, 짐워크 등)'],
      },
      {
        q: 'Q2. 운동 기록 외에 앱에서 제공하는 커뮤니티나 유료 기능을 사용하나요?',
        a: [{ bold: '4명 전원 "아니요."' }, ' 기록 기능 외 다른 기능은 거의 쓰지 않는다.'],
      },
      {
        q: 'Q3. 주요 기능(세트 체크) 사용 중 불편했던 점이 있나요?',
        a: [
          '퇴근 후처럼 사람이 몰리는 시간대엔 ',
          { bold: '루틴 순서대로 운동하기 어렵다.' },
          ' 그때마다 등록해둔 ',
          { bold: '운동 종목을 찾는 게' },
          '\n',
          { bold: '어렵고 답답했다' },
          '. ',
          { bold: '휴식 시간에 다음 운동을 찾다가 시간을 다 쓴 적도 있었다.' },
        ],
      },
      {
        q: 'Q4. 불편함을 느끼면서도 다른 앱으로 바꾸지 않는 이유는?',
        a: [
          '쌓아온 기록과 ',
          { bold: '카운트를 다시 시작해야 한다는 부담이 가장 크다.' },
          ' 게다가 여러 앱을 써봐도\n',
          '결국 비슷한 불편함을 겪다 보니 "그게 그거"라는 인식이 생겼다.',
        ],
      },
    ],
  },
  insight: {
    title: 'Insight.',
    image: '/protfolio/gym/item02.png',
    items: [
      {
        title: '부가 기능은 잘 쓰지 않는다',
        body: '응답자 전원이 커뮤니티나 유료 기능을 전혀 사용하지 않는다고 답했다.\n운동 앱에 흔히 들어가는 부가 기능들이 실제로는 핵심 사용자에게 거의 가치를 주지 못한다는 뜻이었다.',
      },
      {
        title: '떠나지 못하는 건 기능이 아니라\n락인 때문이다',
        body: '불편해도 앱을 안 바꾸는 이유는 새 기능 부재가 아니라, 쌓아온 기록을 잃는 두려움이었다.\n앱을 옮겨도 결국 똑같은 불편을 겪는다는 인식까지 있어, 이는 카테고리 전체의 락인 구조 문제였다.',
      },
    ],
  },
  problems: {
    title: 'Problems',
    titleSuffix: ' - Define.',
    video: '/protfolio/gym/problem-mp4.mp4',
    number: '01',
    body: '광고와 불필요한 UI가 화면을 차지해,\n운동 중 다음 종목을 찾는 흐름이\n반복적으로 끊긴다.',
    grid: [
      {
        type: 'text',
        number: '02',
        body: '커뮤니티·유료 기능처럼 라이트 사용자는\n쓰지 않는 기능이 앱의 무게 (성능·복잡도)만\n늘리고 있다.',
      },
      { type: 'image', image: '/protfolio/gym/item03.png' },
      { type: 'image', image: '/protfolio/gym/item04.png' },
      { type: 'image', image: '/protfolio/gym/item05.png' },
      { type: 'image', image: '/protfolio/gym/item06.png' },
      {
        type: 'text',
        number: '03',
        body: '사용자를 붙잡는 건 앱의 완성도가 아니라\n기록을 잃는다는 두려움이다. 오히려\n더 나은 대안으로도 옮기지 못하게 만든다.',
      },
    ],
  },
  solution: {
    title: 'Solution.',
    items: [
      { image: '/protfolio/gym/item07.png', painPoint: 'Pain Point', label: 'Fleek' },
      { image: '/protfolio/gym/item08.png', painPoint: 'Pain Point', label: 'Gymwork' },
    ],
    detail: {
      background: '/protfolio/gym/bg01.png',
      left: '/protfolio/gym/item09.png',
      right: '/protfolio/gym/item10.png',
      heading: '카테고리화 및 UI 사이즈 조절',
      body: '광고와 불필요하게 큰 UI 요소를 걷어내고, 운동을 주 부위별로 카테고리화해 가독성을 높였습니다.\n검색 기능까지 더해 운동 중 순서가 바뀌어도 원하는 종목을 바로 찾을 수 있게 했습니다.',
    },
  },
  removedFeatures: {
    heading: '부가 기능 제거',
    body: '인터뷰에서 응답자 전원이 커뮤니티·랭킹·유료 기능을 전혀 사용하지 않는다고 답했습니다.\n이 기능들은 기록이라는 핵심 가치와 무관하게 앱의 무게만 늘린다고 판단해, 처음부터 만들지 않기로 결정했습니다.',
    phone1: '/protfolio/gym/phone01.png',
    phone2: '/protfolio/gym/phone02.png',
    chips: [
      { letter: 'R', color: '#22c55e', label: '랭킹 시스템', top: '35%', left: '0%', scale: 1, faded: true, behind: true, blur: 1 },
      { letter: 'P', color: '#a855f7', label: '각종 유료 기능', top: '26%', left: '84%', scale: 1.2, faded: true, behind: true, blur: 1 },
      { letter: 'C', color: '#3b82f6', label: '커뮤니티', top: '73%', left: '9%', scale: 1.4 },
      { letter: 'A', color: '#ef4444', label: '광고', top: '46%', left: '80%', scale: 1.1, faded: true, blur: 1 },
      { letter: 'R', color: '#f97316', label: '루틴 추천', top: '68%', left: '74%', scale: 1.5 },
    ],
    gallery: {
      video: '/protfolio/gym/solution.mp4',
      items: [
        { image: '/protfolio/gym/item11.png' },
        { image: '/protfolio/gym/item12.png' },
        { image: '/protfolio/gym/item13.png', caption: '휴식 알림 외에 알림 X' },
        { image: '/protfolio/gym/item14.png' },
      ],
    },
  },
  workoutCount: {
    heading: '운동 완료 카운트 제공',
    body: '쌓아온 기록을 잃는 두려움이 이탈을 막는 가장 큰 이유였기에, 온보딩과 설정에서 이전에 쓰던 앱의 누적 운동 횟수를\n그대로 입력받아 이어가게 했습니다. 새로 시작해도 카운트가 0으로 리셋되지 않습니다.',
    phone1: '/protfolio/gym/phone03.png',
    phone2: '/protfolio/gym/phone04.png',
  },
  retrospective: {
    title: '프로젝트 회고',
    body: '이 프로젝트의 목표는 하나였습니다. 운동 외엔 아무것도 신경 쓸 필요 없는 환경. 인터뷰에서 확인한 두 가지,\n부가 기능은 안 쓴다는 것과 이탈을 막는 건 완성도가 아니라 기록을 잃는 두려움이라는 것을 근거로, 계속 덜어내는 방향으로 결정했습니다.\n혼자 리서치부터 배포까지 이어가며 배운 건, 더하는 결정보다 빼는 결정에 오히려 더 많은 근거가 필요하다는 것이었습니다.\n아직 실사용 데이터는 없지만, 확인하는 건 다음 과제로 남겨둡니다.',
  },
}

export const PROJECTS = [
  {
    id: 'sleefit',
    title: 'SleeFit - 운동일지 앱',
    tags: ['UX/UI', 'Build'],
    image: '/protfolio/gym.png',
    caseStudy: SLEEFIT_CASE_STUDY,
  },
  {
    id: 'kicc',
    title: '한국정보통신 투어버스',
    tags: ['UX/UI', 'Publishing', 'Content'],
    image: '/protfolio/kicc.png',
    caseStudy: KICC_CASE_STUDY,
  },
  { id: 'aiweb', title: 'AIWEB 웹리뉴얼', tags: ['UX/UI', 'Publishing', 'Content'], image: '/protfolio/aiweb.png' },
  { id: 'almond', title: '책나무 서비스', tags: ['UX/UI', 'Publishing', 'Content'], image: '/protfolio/almond.png' },
  { id: 'forcans', title: '포켄스', tags: ['UX/UI', 'Publishing', 'Content'], image: '/protfolio/forcans.png' },
  { id: 'kookmin', title: 'KB 블랙프라이데이', tags: ['UX/UI', 'Publishing', 'Content'], image: '/protfolio/kookmin.png' },
  { id: 'gptkorea', title: '지피티코리아', tags: ['UX/UI', 'Publishing', 'Content'], image: '/protfolio/gptkorea.png' },
]
