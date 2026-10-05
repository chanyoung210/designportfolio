// Assumption: beer.png excluded (illustration, not a project screenshot).
// Titles for kookmin/gptkorea are placeholders — swap in the real names.
// Case-study detail content for the fullscreen project modal. Only KICC is
// filled in for now (the reference layout) — other projects fall back to a
// title-only modal until their content is written.
const KICC_CASE_STUDY = {
  pageBackground: '#F5F7F8',
  heroStacked: true,
  heroImage: 'portfolio/kicc/img_visual.png',
  heroBar: {
    title: '한국정보통신',
    subtitle: 'Korea Information & Communications Tour Bus & Tax Refund',
    side: ['PLAYING', 'WITH', 'THE', 'DESIGN'],
    sideColor: '#CCD5DE',
  },
  background: {
    split: true,
    title: 'Background',
    body: '방한 외국인을 위한 4개 언어 지원 웹 서비스로,\n투어버스 예매·탑승 정보와 공항 택스리펀드 이용 안내를 제공합니다.\n기존 UI 구조를 유지하며, 1월과 3월 두 차례에 걸쳐 UI 디자인과 웹 퍼블리싱을 담당했습니다.',
    meta: [
      { label: 'Year', value: 'Jan & Mar 2026 · 약 8일' },
      { label: 'Company', value: '(주)한국정보통신' },
      { label: 'Role', value: 'UI Design · Web Publishing' },
    ],
  },
  statement: {
    title: 'Different languages. One recognizable journey.\nFrom booking to boarding.',
    body: '언어가 달라도, 예매부터 탑승까지 하나의 일관된 여정으로 이어지도록',
    image: 'portfolio/kicc/img_statement_lines.png',
  },
  approach: {
    title: 'Design Approach',
    body: '기존 UI 구조 안에서 다국어 정보 전달, 버스 인지, 주요 기능의\n시각적 우선순위에 집중했습니다.',
    columns: ['설계 과제', '디자인 방향'],
    items: [
      {
        task: '4개 언어에서 일관된 정보 전달',
        icon: 'portfolio/kicc/ico_approach_language.png',
        direction: '언어별 문장 길이를 고려한 배치와 공통된 시각적 위계',
      },
      {
        task: '예매 단계에서 탑승할 버스를 미리 인지',
        icon: 'portfolio/kicc/ico_approach_brand.png',
        direction: '실제 차량 이미지와 브랜드 요소로 탑승 대상 안내',
      },
      {
        task: '기존 UI 구조 안에서 주요 기능 강조',
        icon: 'portfolio/kicc/ico_approach_contrast.png',
        direction: '컬러와 대비로 예약 버튼과 운행 정보의 우선순위 구분',
      },
    ],
  },
  goal: {
    title: 'Project Goal',
    heading: '예매 화면에서 시작해,\n현장 탑승까지 이어지는 일관된 경험',
    body: '사용하는 언어에 관계없이 예매와 탑승 정보를 쉽게 이해하고,\n화면에서 확인한 버스를 공항에서도 알아볼 수 있도록 돕습니다.',
    background: 'portfolio/kicc/bg_goal.png',
    phone: 'portfolio/kicc/img_goal_phone.png',
  },
  elements: {
    title: 'Design Elements',
    body: 'KICC의 브랜드 컬러로 주요 기능을 강조하고,\n캐릭터와 실제 차량 이미지로 화면과 현장의 시각적 연결성을 높였습니다.',
    palette: [
      { label: 'HEX E41D39', color: '#E41D39', width: 240 },
      { label: 'HEX F52D46 ~ FE6921', color: 'linear-gradient(90deg, #F52D46, #FE6921)', width: 600 },
      { label: 'HEX FF7A32', color: '#FF7A32', width: 240 },
      { label: 'HEX 222222', color: '#222222', width: 240 },
      { label: 'HEX 353535', color: '#353535', width: 240 },
      { label: 'HEX E7EEF0', color: '#E7EEF0', width: 240, light: true },
      { label: 'HEX EFF5F6', color: '#EFF5F6', width: 240, light: true },
    ],
    assets: [
      { label: 'a. Imagery', image: 'portfolio/kicc/img_elements_imagery.png' },
      { label: 'b. Typography', image: 'portfolio/kicc/img_elements_typography.png' },
      { label: 'c. Brand Assets', image: 'portfolio/kicc/img_elements_character.png', inset: true },
    ],
    showcase: ['portfolio/kicc/img_elements_logo.png', 'portfolio/kicc/img_elements_bus.png'],
  },
  development: {
    title: 'Design\nDevelopment',
    body: '기존 UI 구조를 유지하면서 브랜드 컬러로 예약 버튼을 강조하고,\n차량 이미지와 브랜드 요소로 탑승할 버스를 안내하는 시안을 제안했습니다.',
    background: 'portfolio/kicc/bg_development.png',
    screens: [
      { label: 'Wireframe', image: 'portfolio/kicc/img_development_wireframe.png' },
      { label: 'Design Proposal', image: 'portfolio/kicc/img_development_proposal.png' },
    ],
  },
  finalScreens: {
    title: 'Final Screens',
    body: '브랜드 컬러와 차량 이미지를 적용해,\n투어버스 예약과 운행 정보부터 공항 환급 안내까지 일관된 디자인으로 구성했습니다.',
    left: ['portfolio/kicc/img_final_live_location.png', 'portfolio/kicc/img_final_tax_refund.png'],
    center: {
      image: 'portfolio/kicc/img_final_main.png',
      title: 'Tax Refund',
      body: '공항 환급 서비스의 특징과 이용 절차를 정리하고,\n환급 방식별 차이를 비교하기 쉽게 구성했습니다.',
      mockup: 'portfolio/kicc/img_final_mockup.png',
    },
    right: ['portfolio/kicc/img_final_route.png', 'portfolio/kicc/img_final_faq.png'],
  },
  principles: {
    title: 'UX Principles',
    background: 'portfolio/kicc/bg_principles.png',
    items: [
      {
        title: 'Language',
        heading: '언어가 바뀌어도 일관된 배치',
        body: '언어별 문장 길이를 고려하고,\n주요 정보와 버튼의 위치를 일관되게 유지합니다.',
      },
      {
        title: 'Usability',
        heading: '중요한 행동이 먼저 보이는 위계',
        body: '예약 버튼은 브랜드 컬러로 강조하고,\n운행 정보는 대비와 그룹화로 구분합니다.',
      },
      {
        title: 'Journey',
        heading: '이용 단계에 맞는 정보 안내',
        body: '예약 전에는 노선과 시간표를,\n탑승 전에는 버스 위치와 이용 방법을 확인할 수 있도록 안내합니다.',
      },
      {
        title: 'Brand Recognition',
        heading: '화면과 현장을 연결하는 시각적 단서',
        body: '실제 차량 이미지와 동일한 로고·캐릭터를 활용해\n탑승할 버스를 미리 알아볼 수 있도록 합니다.',
      },
    ],
  },
}

const KOOKMIN_CASE_STUDY = {
  pageBackground: '#F5F7F8',
  heroImage: 'portfolio/kookmin/img_visual.png',
  promo: {
    title: 'Promotion Design',
    body: 'KB국민은행 블랙프라이데이 제안서용으로 제작한 프로모션 디자인입니다. 12개 제휴 브랜드 결제 시 자동 페이백과 럭키드로우 응모까지, 사용자의 행동을 최소화하면서 혜택을 빠르게 인지시킬 수 있도록 배너와 상세 페이지를 구성했습니다.',
    meta: [
      { label: 'Year', value: '2025.12' },
      { label: 'Company', value: '(주)에이아이웹' },
      { label: 'Role', value: 'Design (100%)' },
    ],
    images: ['01', '02', '03'].map((n) => `portfolio/kookmin/img_promo_${n}.png`),
  },
}

const FORCANS_CASE_STUDY = {
  pageBackground: '#F5F7F8',
  heroImage: 'portfolio/forcans/img_visual.png', // full-screen visual, no title bar
  promo: {
    title: 'Promotion Design',
    body: '포켄스 강아지의 날 메가위크 프로모션에서 배너와 이벤트 페이지 디자인을 담당한 개인 작업입니다. 할인 혜택과 웰컴 쿠폰 등\n프로모션 정보를 사용자가 한눈에 파악할 수 있도록 비주얼과 레이아웃을 구성했습니다.',
    meta: [
      { label: 'Year', value: '2026.03' },
      { label: 'Company', value: '(주)포켄스' },
      { label: 'Role', value: 'Design (100%)' },
    ],
    images: ['01', '02', '03', '04'].map((n) => `portfolio/forcans/img_promo_${n}.png`),
  },
}

const ALMOND_CASE_STUDY = {
  pageBackground: '#F5F7F8',
  heroImage: 'portfolio/almond/img_visual.png',
  heroBar: {
    title: 'almond',
    subtitle: 'UI Design & Developer Handoff',
    titleColor: '#ffffff',
    side: ['PLAYING', 'WITH', 'THE', 'DESIGN'],
    sideColor: '#D5DFE9',
  },
  background: {
    center: true,
    maxWidth: 1000,
    title: 'Overview',
    body: '아몬드는 온라인 학습과 오프라인 교재를 연결하는 책나무의 초·중등 교과 개념어 학습 서비스입니다.\n학생용 학습 화면과 지점·본사 관리 UI를 전담하며, 반복 수정과 개발 구현에 대응할 공통 디자인 기준과 화면 구조를 정리했습니다.',
    meta: [
      { label: 'Period', value: '2025. 08 ~ 2026. 05' },
      { label: 'Company', value: '(주)책나무' },
      { label: 'Role', value: 'UI Design · 100%' },
      { label: 'Team', value: '1 Designer · 4 Developers · 1 Planner' },
    ],
  },
  define: {
    label: 'Define',
    title: '늘어나는 화면과 수정,\n한정된 시간에 대응할 디자인 기준',
    problems: [
      {
        label: 'Problem 01',
        heading: '반복 수정으로 줄어드는 신규 UI 제작 시간',
        body: '학생·지점·본사 UI를 단독 담당하며 수정과 QA 추가 화면에 대응했습니다.\n상시 업무까지 병행해 신규 UI 제작에 집중할 수 있는 시간은 주당 1~2일이었습니다.',
        panel: 'portfolio/almond/img_define_schedule.png',
      },
      {
        label: 'Problem 02',
        heading: '혼재된 디자인 기준과 구현을 위한 정리 필요',
        body: '여러 시안의 요소가 결합되면서 색상·컴포넌트의 공통 기준이 필요했습니다.\n전담 퍼블리셔가 없는 환경에서 디자인을 개발 구현으로 연결할 화면 구조와 전달 방식도 정리해야 했습니다.',
        cards: [
          { text: '공통 UI 기준 부재\n시안마다 다른 색상과 컴포넌트 기준', image: 'portfolio/almond/img_define_no_standard.png' },
          { text: '전담 퍼블리셔 부재\n디자인을 구현으로 연결할 방식 필요', image: 'portfolio/almond/img_define_no_publisher.png' },
        ],
      },
    ],
  },
  system: {
    label: 'APPROACH',
    title: '반복 수정에 유연하게,\n구현으로 이어지는 디자인',
    image: 'portfolio/almond/img_approach_mcp.png',
    heading: '01. 공통 디자인 기준 정립',
    body: '색상·서체·여백을 공통 기준으로 정리하고, 반복 UI를 컴포넌트로 구성해\n수정 사항을 여러 화면에 일관되게 반영할 수 있도록 했습니다.',
    logo: 'portfolio/almond/logo_almond.svg',
    colors: ['#2A76F2', '#4C4CEB', '#FB4053', '#14B560', '#774D31', '#222222', '#FFFFFF'],
    icons: [1, 2, 3, 8, 10].map((i) => `portfolio/almond/ico_learning_${String(i).padStart(2, '0')}.svg`),
    // sample data only — just there to show the chart style morphing between views
    charts: [
      { title: '주간 학습 시간', total: '12.4h', labels: ['월', '화', '수', '목', '금', '토'], values: [42, 58, 35, 74, 51, 28] },
      { title: '회차별 정답률', total: '86%', labels: ['1회', '2회', '3회', '4회', '5회', '6회'], values: [62, 70, 68, 79, 84, 91] },
      { title: '어휘 복습 횟수', total: '248회', labels: ['3월', '4월', '5월', '6월', '7월', '8월'], values: [30, 46, 64, 52, 38, 57] },
    ],
    table: 'portfolio/almond/img_system_tokens.png',
    buttons: 'portfolio/almond/img_system_buttons.png',
    iconography: {
      title: 'Iconography',
      body: '투명한 질감과 선명한 색상을 활용한 학습용 아이콘입니다.\n형태와 색상 표현을 통일해 다양한 학습 화면에서 일관된 분위기를 유지했습니다.',
      icons: Array.from({ length: 10 }, (_, i) => `portfolio/almond/ico_learning_${String(i + 1).padStart(2, '0')}.svg`),
    },
    infographic: {
      title: 'Infographic',
      body: '학습 현황과 운영 데이터를 비교하고 파악할 수 있도록,\n차트와 테이블의 색상·표기 방식을 공통 기준으로 정리했습니다.',
      // sample data only — text-free charts showing the shared style across 4 chart types
      charts: [
        { type: 'bar', values: [42, 58, 35, 74, 51, 28] },
        { type: 'rings', values: [78, 62, 41] },
        { type: 'area', values: [38, 52, 46, 68, 61, 82, 74], compare: [30, 36, 42, 40, 50, 55, 58] },
        { type: 'waffle', accent: 38, dark: 24 },
      ],
    },
    structure: {
      heading: '02. 구현을 고려한 구조화',
      body: '오토레이아웃과 역할별 레이어 네이밍을 적용해,\nMCP를 활용한 구현 초안에 화면의 계층과 배치 의도가 반영되도록 정리했습니다.',
      image: 'portfolio/almond/img_structure_figma.png',
      caption: '*구현 테스트에 사용한 Figma 디자인',
    },
    // layer panel on the left card, generated screen on the right
    compare: [
      {
        title: 'AS-IS',
        body: '역할을 파악하기 어려운 레이어 이름과 구조로,\nMCP로 생성한 구현 초안이 원본의 배치와 스타일을 충분히 반영하지 못했습니다.',
        layers: 'portfolio/almond/img_asis_layers.png',
        screen: 'portfolio/almond/img_asis_screen.png',
        background: '#181B1A',
      },
      {
        title: 'TO-BE',
        body: '요소의 역할과 계층에 맞춰 레이어를 정리하고 공통 디자인 기준을 적용해,\n구현 초안이 원본의 배치와 스타일을 더 충실히 반영하도록 보완했습니다.',
        layers: 'portfolio/almond/img_tobe_layers.png',
        screen: 'portfolio/almond/img_tobe_screen.png',
        background: '#0F283A',
      },
    ],
  },
  screens: {
    label: 'APPROACH',
    title: '학습부터 운영까지,\n공통 기준으로 연결한 화면',
    // card.align: 'right' pins the image to the top-right corner; card.wide spans both columns
    groups: [
      {
        label: 'Student',
        body: '집중력 훈련부터 어휘 복습, 문단별 읽기와 문제풀이까지\n학습 순서와 진행 상태를 확인할 수 있도록 구성했습니다.',
        photo: 'portfolio/almond/img_student_photo.png',
        cards: [
          { label: '집중력 훈련', image: 'portfolio/almond/img_student_focus.png' },
          { label: '문제풀이', image: 'portfolio/almond/img_student_quiz.png', align: 'right' },
          { label: '문단별 읽기', image: 'portfolio/almond/img_student_reading.png', wide: true },
        ],
      },
      {
        label: 'HQ Admin',
        body: '지점별 운영 현황과 결제 내역을 확인하고,\n신규 지점 등록과 상세 정보 관리를 이어갈 수 있도록 구성했습니다.',
        photo: 'portfolio/almond/img_hq_photo.png',
        theme: 'light',
        cards: [
          { label: '결제 상세 정보', image: 'portfolio/almond/img_hq_payment_detail.png', tall: true },
          { label: '결제 내역', image: 'portfolio/almond/img_hq_payment_list.png', align: 'right' },
          { label: '신규 문제 등록', image: 'portfolio/almond/img_hq_new_question.png' },
        ],
      },
      {
        label: 'Branch Admin',
        body: '학생별 학습 현황을 확인하고,\n이용권 구매와 배정까지 관리할 수 있도록 구성했습니다.',
        photo: 'portfolio/almond/img_branch_photo.png',
        theme: 'light',
        cards: [
          { label: '이용권 구매', image: 'portfolio/almond/img_branch_voucher.png', wide: true },
          { label: '리포트 생성', image: 'portfolio/almond/img_branch_report.png', align: 'right' },
          { label: '학생별 학습 현황', image: 'portfolio/almond/img_branch_progress.png', align: 'right' },
        ],
      },
    ],
  },
}

const AIWEB_CASE_STUDY = {
  pageBackground: '#F5F7F8',
  heroImage: 'portfolio/aiweb/img_visual.png',
  heroBar: {
    title: 'AIWEB',
    subtitle: 'AIWEB Website Redesign',
    titleColor: '#ffffff',
    side: ['PLAYING', 'WITH', 'THE', 'DESIGN'],
    sideColor: '#D5DFE9',
  },
  background: {
    center: true,
    title: 'Overview',
    body: '광고·마케팅 대행사 에이아이웹의 원페이지 홈페이지를 회사 소개·연혁·포트폴리오·채용 정보를 담은 웹사이트로 확장했습니다. 클라이언트는 서비스와 수행 경험을, 예비 지원자는 조직과 일하는 방식을 확인할 수 있도록 정보를 구성했습니다.',
    meta: [
      { label: 'Year', value: '2026. 03' },
      { label: 'Company', value: '(주)에이아이웹' },
      { label: 'Role', value: 'UI/UX Design (80%) · Web Publishing (100%)' },
    ],
  },
  videoStage: {
    video: 'portfolio/aiweb/video_index.mp4',
    background: 'portfolio/aiweb/bg_video.png',
  },
  problem: {
    label: 'Problem',
    title: '쌓아온 경험과 전문성을\n확인하기 어려운 홈페이지',
    body: '기존 홈페이지는 서비스 소개와 수주 소식 중심으로 구성되어, 실제 수행 사례와 조직 정보가 부족했습니다.\n클라이언트는 협업 가능성을, 예비 지원자는 회사와 일하는 방식을 판단할 정보가 충분하지 않았습니다.',
    background: 'portfolio/aiweb/bg_problem.png',
    image: 'portfolio/aiweb/img_problem_tablet.png',
  },
  stakeholder: {
    label: 'STAKEHOLDER INTERVIEW',
    title: '회사의 경험과 일하는 방식이\n홈페이지에 드러나길 원했습니다.',
    body: '내부 이해관계자 인터뷰를 통해 리뉴얼 요구사항을 정리했습니다.\n서비스와 수행 사례, 연혁으로 회사의 역량을 보여주고,\n조직·채용 정보로 함께 일할 회사에 대한 이해를 돕는 것이 주요 요구였습니다.',
    // first three fill the left column, last three the (raised) right column
    items: [
      { label: '요구사항 01', text: '협업을 믿고 맡길 수 있도록\n회사의 역량을 보여주고 싶어요.' },
      { label: '요구사항 02', text: '예비 지원자가 우리 팀과\n일하는 방식을 알 수 있으면 좋겠어요.' },
      { label: '요구사항 03', text: '광고·마케팅 회사에 어울리는\n세련된 첫인상을 전달하고 싶어요.' },
      { label: '요구사항 04', text: '어떤 서비스를 제공하는 회사인지\n명확하게 보여주고 싶어요.' },
      { label: '요구사항 05', text: '공공기관부터 금융사, 축제까지\n다양한 수행 사례를 보여주고 싶어요.' },
      { label: '요구사항 06', text: '오랜 시간 쌓아온 경험이\n회사의 연혁에 드러나면 좋겠어요.' },
    ],
  },
  audience: {
    label: 'APPROACH',
    title: '서로 다른 방문 목적에 맞춰\n필요한 정보를 구성했습니다.',
    body: '예비 지원자는 조직과 일하는 방식을, 클라이언트는 서비스와\n수행 경험을 확인할 수 있도록 방문 목적에 따라 콘텐츠를 구분했습니다.',
    items: [
      {
        title: 'Applicant',
        lead: '어떤 팀에서, 어떻게 일하게 될까?',
        body: '팀별 역할과 근무 환경, 채용 정보를 통해\n함께 일할 회사를 이해하도록 구성했습니다.',
        image: 'portfolio/aiweb/img_audience_applicant.png',
      },
      {
        title: 'Client',
        lead: '우리의 프로젝트를 맡길 수 있는 회사일까?',
        body: '서비스와 수행 사례, 연혁을 통해\n업무 범위와 관련 경험을 확인하도록 구성했습니다.',
        image: 'portfolio/aiweb/img_audience_client.png',
      },
    ],
  },
  direction: {
    label: 'Direction',
    title: '첫인상부터 정보 탐색까지,\n네 가지 설계 방향을 정했습니다.',
    body: '브랜드 표현을 정돈하고, 서비스·수행 경험·조직 정보를\n구체적으로 보여줄 수 있도록 화면 구성의 기준을 마련했습니다.',
    // col: which of the 3 staggered columns the card sits in
    items: [
      {
        col: 0,
        title: 'IMPRESSION',
        heading: '전문성이 느껴지는 첫인상',
        body: '브랜드 컬러와 시각 표현을 일관되게 적용해\n광고·마케팅 대행사로서의 정체성을 전달합니다.',
      },
      {
        col: 1,
        title: 'EXPLORATION',
        heading: '필요한 정보를 쉽게 찾는 탐색',
        body: '서비스와 수행 사례를 구분하고 분야별로 분류해\n관심 있는 업무와 프로젝트를 쉽게 찾도록 합니다.',
      },
      {
        col: 2,
        title: 'TRUST',
        heading: '수행 경험으로 보여주는 신뢰',
        body: '연혁과 고객사, 실제 수행 결과물을 제시해\n협업 가능성을 판단할 근거를 제공합니다.',
      },
      {
        col: 2,
        title: 'PEOPLE',
        heading: '함께 일할 회사에 대한 이해',
        body: '팀별 역할과 근무 환경, 채용 정보를 제공해\n예비 지원자가 지원 여부를 판단하도록 돕습니다.',
      },
    ],
    concept: {
      label: 'UX/UI CONCEPT',
      title: 'EXPERTISE\nMADE\nVISIBLE',
      image: 'portfolio/aiweb/img_concept_monitor.png',
      phones: 'portfolio/aiweb/img_concept_phones.png',
    },
    diagram: {
      from: 'CLIENT &\nAPPLICANT',
      circles: ['Service', 'Experience', 'People'],
      to: 'AIWEB',
      body: '서비스·수행 경험·조직을 중심으로 회사 정보를 재구성했습니다.\n클라이언트는 협업 가능성을, 예비 지원자는 함께 일할 회사의 모습을 확인할 수 있도록 연결했습니다.',
    },
  },
  // layout: CSS module class for the card grid (uiFeature = 1 tall left + 2 stacked right)
  uiSections: [
    {
      label: 'MAIN',
      title: '브랜드의 첫인상부터\n서비스와 경험을 한눈에',
      body: '브랜드 비주얼로 첫인상을 전달하고, 서비스와 주요 업력을 함께 배치해\n에이아이웹이 하는 일과 쌓아온 경험을 살펴볼 수 있도록 구성했습니다.',
      layout: 'uiFeature',
      cards: [
        { label: 'Brand Intro', image: 'portfolio/aiweb/img_main_brand_intro.png' },
        { label: 'Service Card', image: 'portfolio/aiweb/img_main_service_card.png' },
        { label: 'Experience Card', image: 'portfolio/aiweb/img_main_experience_card.png' },
      ],
      carousel: [1, 2, 3, 4, 5, 6, 7].map((i) => `portfolio/aiweb/img_service_0${i}.png`),
    },
    {
      label: 'WORKS',
      title: '분야별 탐색부터\n실제 수행 결과물까지',
      body: '프로젝트를 분야별로 분류해 관심 있는 사례를 찾고, 상세 화면에서\n수행 업무와 결과물을 확인해 협업 가능성을 판단할 수 있도록 구성했습니다.',
      image: 'portfolio/aiweb/img_works_monitor.png',
      layout: 'uiFeatureReverse',
      cards: [
        { label: 'Project Card', image: 'portfolio/aiweb/img_works_project_card.png' },
        { label: 'Project Detail', image: 'portfolio/aiweb/img_works_project_detail.png' },
        { label: 'Category Filter', image: 'portfolio/aiweb/img_works_category_filter.png' },
      ],
    },
    {
      label: 'CAREER',
      title: '함께 일할 팀을 이해하고\n지원으로 이어지도록',
      body: '팀별 역할과 채용 정보를 정리해 예비 지원자가 회사를 이해하고,\n지원 버튼을 통해 지원 단계로 이동할 수 있도록 구성했습니다.',
      image: 'portfolio/aiweb/img_career_phone.png',
      layout: 'uiPair',
      cards: [
        { label: 'Team Overview', image: 'portfolio/aiweb/img_career_team_overview.png' },
        { label: 'Apply CTA', image: 'portfolio/aiweb/img_career_apply_cta.png' },
      ],
    },
  ],
}

const SLEEFIT_CASE_STUDY = {
  heroImage: 'portfolio/sleefit/img_visual.png',
  heroBar: {
    title: 'SleeFit',
    subtitle: 'SleeFit Workout Tracking App',
    side: ['PLAYING', 'WITH', 'THE', 'DESIGN'],
  },
  background: {
    title: 'Background.',
    body: '400회 이상 웨이트 트레이닝을 기록하며, 광고와 복잡한 화면 구성으로 운동 기록의 흐름이 끊기는 불편을 경험했습니다.\n이를 바탕으로 운동 탐색과 세트 기록에 집중한 iOS 앱, 슬리핏을 기획하고 AI 개발 도구를 활용해 직접 구현했습니다.',
    meta: [
      { label: 'Year', value: '2026. 08 - 09' },
      { label: 'Company', value: '개인 프로젝트' },
      { label: 'Role', value: '기획 · UI/UX 디자인 · AI 도구 활용 개발' },
      { label: 'Platform', value: 'iOS' },
    ],
  },
  interview: {
    title: 'Interview.',
    body: '개인적으로 느낀 불편이 다른 사용자에게도 나타나는지 확인하기 위해, 웨이트 트레이닝 경험이 있는 지인 3명을 인터뷰했습니다. 운동 기록 방식과 사용 중 불편, 다른 앱으로 전환하지 않는 이유를 살펴봤습니다.',
    items: [
      {
        label: '가설',
        value: '광고와 복잡한 화면 구성은 운동 중 필요한 종목을 찾고 기록하는 흐름을 방해할 것이다.',
      },
      {
        label: '대상',
        value: '웨이트 트레이닝 경험이 있는 지인 3명 본인의 앱 사용 경험은 별도로 정리',
      },
    ],
    qa: [
      {
        q: 'Q1. 사용해 본 운동 기록 앱은 몇 개인가요?',
        a: ['주로 ', { bold: '1~2개 앱' }, '을 사용한 경험이 있으며, 플릭·플랜핏·짐워크 등이 언급됐습니다.'],
      },
      {
        q: 'Q2. 운동 기록 외에 커뮤니티나 유료 기능도 사용하나요?',
        a: ['인터뷰 참여자 3명 모두 ', { bold: '기록 외 기능은 거의 사용하지 않는다' }, '고 답했습니다.'],
      },
      {
        q: 'Q3. 운동을 찾거나 세트를 기록할 때 어떤 점이 불편했나요?',
        a: [
          '혼잡한 시간에는 ',
          { bold: '예정된 순서대로 운동하기 어려워' },
          ' 다른 종목을 찾아야 했습니다.\n이 과정이 번거롭고, ',
          { bold: '탐색에 휴식 시간을 소모한 경험' },
          '이 언급됐습니다.',
        ],
      },
      {
        q: 'Q4. 불편함이 있어도 다른 앱으로 바꾸지 않는 이유는 무엇인가요?',
        a: [
          { bold: '기존 기록과 누적 운동 횟수를 이어가지 못하는 부담' },
          '이 컸습니다.\n다른 앱에서도 ',
          { bold: '비슷한 불편' },
          '을 겪어 전환의 필요성을 느끼지 못한다는 의견도 있었습니다.',
        ],
      },
    ],
  },
  insight: {
    title: 'Insight.',
    image: 'portfolio/sleefit/img_insight.png',
    items: [
      {
        title: '운동 순서가 바뀌면 다음 종목을 찾기 번거롭다',
        body: '혼잡한 시간에는 예정된 운동을 다른 종목으로 바꿔야 했습니다. 이때 종목을 찾는 과정에 휴식 시간을 소모한 경험이 언급됐습니다.',
      },
      {
        title: '주로 사용하는 기능은 운동 기록에 집중돼 있다',
        body: '인터뷰 참여자들은 커뮤니티와 유료 기능을 거의 사용하지 않았습니다. 실제 사용은 종목 선택과 세트 기록에 집중돼 있었습니다.',
      },
      {
        title: '쌓아온 운동 이력이 앱 전환을 망설이게 한다',
        body: '불편이 있어도 기존 기록과 누적 운동 횟수를 이어가지 못하는 것이 부담으로 언급됐습니다. 다른 앱에서도 비슷한 불편을 겪었다는 의견이 있었습니다.',
      },
    ],
  },
  problems: {
    title: 'Define.',
    items: [
      {
        video: 'portfolio/sleefit/video_problem.mp4',
        title: '01. 운동 변경 시 길어지는 탐색',
        body: '혼잡한 환경에서는 예정된 운동을 다른 종목으로 바꿔야 합니다.\n필요한 종목을 빠르게 찾기 어려워, 탐색이 운동 사이의 휴식 시간을 차지합니다.',
      },
      {
        images: ['portfolio/sleefit/img_problem_01.png', 'portfolio/sleefit/img_problem_02.png'],
        title: '02. 기록 외 요소가 함께 차지하는 화면',
        body: '운동 기록을 주로 사용하는 참여자들에게 광고와 부가 기능의 우선순위는 낮았습니다.\n기록에 필요한 정보와 조작에 집중할 수 있도록 화면 구성을 정리할 필요가 있습니다.',
      },
      {
        images: ['portfolio/sleefit/img_problem_03.png', 'portfolio/sleefit/img_problem_04.png'],
        title: '03. 누적 횟수를 다시 시작하는 부담',
        body: '쌓아온 운동 횟수를 새 앱에서도 이어가고 싶지만, 처음부터 시작해야 한다는 부담이 있습니다.\n앱을 바꾸더라도 누적 횟수를 반영할 수 있는 방법이 필요합니다.',
      },
    ],
  },
  solution: {
    title: 'Solution.',
    items: [
      { image: 'portfolio/sleefit/img_solution_fleek.png', painPoint: 'Pain Point', label: 'Fleek' },
      { image: 'portfolio/sleefit/img_solution_gymwork.png', painPoint: 'Pain Point', label: 'Gymwork' },
    ],
    detail: {
      background: 'portfolio/sleefit/bg_solution_detail.png',
      left: 'portfolio/sleefit/img_solution_detail_left.png',
      right: 'portfolio/sleefit/img_solution_detail_right.png',
      heading: '다음 운동을 쉽게 찾는 분류 구조',
      body: '운동을 부위와 장비 기준으로 분류하고, 목록에서 여러 종목을 함께 살펴볼 수 있도록 구성했습니다.\n운동 순서가 바뀌어도 필요한 종목을 찾아 기록을 이어갈 수 있도록 설계했습니다.',
    },
  },
  removedFeatures: {
    heading: '운동 기록에 집중한 화면 구성',
    body: '사용 빈도가 낮았던 커뮤니티와 유료 부가 기능을 제외하고, 광고 없이 기록할 수 있도록 구성했습니다.\n세트 입력과 휴식 타이머, 운동 이력 등 기록을 이어가는 데 필요한 기능을 중심으로 정리했습니다.',
    phone1: 'portfolio/sleefit/img_removed_phone_01.png',
    phone2: 'portfolio/sleefit/img_removed_phone_02.png',
    chips: [
      { letter: 'R', color: '#22c55e', label: '랭킹 시스템', top: '35%', left: '0%', scale: 1, faded: true, behind: true, blur: 1 },
      { letter: 'P', color: '#a855f7', label: '각종 유료 기능', top: '26%', left: '84%', scale: 1.2, faded: true, behind: true, blur: 1 },
      { letter: 'C', color: '#3b82f6', label: '커뮤니티', top: '73%', left: '9%', scale: 1.4 },
      { letter: 'A', color: '#ef4444', label: '광고', top: '46%', left: '80%', scale: 1.1, faded: true, blur: 1 },
      { letter: 'R', color: '#f97316', label: '루틴 추천', top: '68%', left: '74%', scale: 1.5 },
    ],
    gallery: {
      video: 'portfolio/sleefit/video_solution.mp4',
      items: [
        { image: 'portfolio/sleefit/img_gallery_01.png' },
        { image: 'portfolio/sleefit/img_gallery_02.png' },
        { image: 'portfolio/sleefit/img_gallery_03.png', caption: '휴식 알림 외에 알림 X' },
        { image: 'portfolio/sleefit/img_gallery_04.png' },
      ],
    },
  },
  workoutCount: {
    heading: '이전 누적 운동 횟수 이어가기',
    body: '새 앱에서 운동 횟수를 0부터 시작하는 부담을 줄이기 위해, 기존 누적 횟수를 직접 입력할 수 있도록 구성했습니다.\n온보딩에서 입력하고 설정에서 수정하며, 슬리핏에서 완료한 운동 횟수를 이어서 쌓을 수 있습니다.',
    phone1: 'portfolio/sleefit/img_workout_count_phone_01.png',
    phone2: 'portfolio/sleefit/img_workout_count_phone_02.png',
  },
  retrospective: {
    title: 'Review & Iteration.',
    items: [
      {
        title: '필요한 운동을 바로 찾아 기록',
        body: '약 3주간 실제 운동에 사용하며, 원하는 종목을 바로 찾아 기록하는 편리함을 확인했습니다. 기존 누적 운동 횟수도 이어갈 수 있어, 직접 느꼈던 탐색과 앱 전환의 불편이 줄었습니다.',
      },
      {
        title: '함께 사용하는 사람들의 긍정적인 반응',
        body: '함께 사용하는 친구들도 전반적인 사용 경험에 만족하고 있습니다. 아직 소수의 사용 경험이지만, 운동 기록에 집중한 방향이 실제 사용에서도 긍정적으로 받아들여지고 있습니다.',
      },
      {
        title: '실사용에서 발견한 버그를 지속적으로 수정',
        body: 'QA 이후에도 실제 사용 중 예상하지 못한 버그가 발견됐습니다. 발생한 문제를 하나씩 확인하고 수정하며, 안정적으로 기록할 수 있도록 개선하고 있습니다.',
      },
    ],
  },
}

export const PROJECTS = [
  {
    id: 'sleefit',
    title: 'SleeFit - 운동일지 앱',
    tags: ['UX/UI', 'Build'],
    image: 'portfolio/thumb_sleefit.png',
    caseStudy: SLEEFIT_CASE_STUDY,
  },
  {
    id: 'almond',
    title: '책나무 아몬드 학습 서비스',
    tags: ['UI Design', 'Design System', 'Handoff'],
    image: 'portfolio/thumb_almond.png',
    caseStudy: ALMOND_CASE_STUDY,
  },
  {
    id: 'aiweb',
    title: 'AIWEB 웹리뉴얼',
    tags: ['UX/UI', 'Publishing'],
    image: 'portfolio/thumb_aiweb.png',
    caseStudy: AIWEB_CASE_STUDY,
  },
  {
    id: 'kicc',
    title: '한국정보통신 투어버스',
    tags: ['UI Design', 'Publishing'],
    image: 'portfolio/thumb_kicc.png',
    caseStudy: KICC_CASE_STUDY,
  },
  {
    id: 'forcans',
    title: '포켄스 메가위크 프로모션',
    tags: ['Promotion', 'Banner', 'Event Page'],
    image: 'portfolio/thumb_forcans.png',
    caseStudy: FORCANS_CASE_STUDY,
  },
  {
    id: 'kookmin',
    title: 'KB 블랙프라이데이',
    tags: ['Promotion', 'Banner', 'Detail Page'],
    image: 'portfolio/thumb_kookmin.png',
    darkText: true, // white thumbnail background
    caseStudy: KOOKMIN_CASE_STUDY,
  },
]
