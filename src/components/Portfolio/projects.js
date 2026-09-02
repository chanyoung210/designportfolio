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
  mockups: [
    '/protfolio/kicc/asis.png',
    '/protfolio/kicc/tobe00.png',
    '/protfolio/kicc/tobe01.png',
    '/protfolio/kicc/tobe02.png',
    '/protfolio/kicc/tobe03.png',
  ],
  closing: '언어와 국적에 관계없이 누구나 헤매지 않고 탑승할 수 있는 투어버스 경험을 목표로 작업했습니다.',
}

export const PROJECTS = [
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
