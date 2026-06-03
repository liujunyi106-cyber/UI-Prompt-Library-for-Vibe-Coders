export type Language = 'en' | 'cn';

export const translations = {
  // Header
  'header.title': { en: 'Vibe Coders', cn: 'Vibe Coders' },
  'header.description': { en: 'A curated set of 92 prompts for vibe coding. Copy from the web app or browse prompts for the browser extension. Get your collection of high-quality, pre-written prompts for vibe coders.', cn: '为 vibe 编码策划的 92 个提示词集合。从 Web 应用复制或浏览浏览器扩展的提示词。获取高质量、预先编写的 vibe 编码提示词合集。' },
  'header.prompts': { en: 'Prompts', cn: '提示词' },
  'header.categories': { en: 'Categories', cn: '分类' },
  
  // Sidebar
  'sidebar.all': { en: 'All', cn: '全部' },
  'sidebar.authForms': { en: 'Auth Forms', cn: '认证表单' },
  'sidebar.pricing': { en: 'Pricing', cn: '定价' },
  'sidebar.featuresBento': { en: 'Features / Bento', cn: '功能 / Bento' },
  'sidebar.heroSections': { en: 'Hero Sections', cn: 'Hero 区域' },
  'sidebar.ctaBanners': { en: 'CTA Banners', cn: 'CTA 横幅' },
  'sidebar.statsBars': { en: 'Stats Bars', cn: '统计条' },
  'sidebar.navBars': { en: 'Nav Bars', cn: '导航条' },
  'sidebar.testimonials': { en: 'Testimonials', cn: '推荐语' },
  'sidebar.footer': { en: 'Footer', cn: '页脚' },
  'sidebar.faq': { en: 'FAQ', cn: '常见问题' },
  'sidebar.dashboards': { en: 'Dashboards', cn: '仪表盘' },
  'sidebar.onboarding': { en: 'Onboarding', cn: '引导流程' },
  'sidebar.blogContent': { en: 'Blog / Content', cn: '博客 / 内容' },
  'sidebar.contact': { en: 'Contact', cn: '联系我们' },
  'sidebar.bonus': { en: 'Bonus', cn: '额外奖励' },
  'sidebar.searchPlaceholder': { en: 'Search prompts...', cn: '搜索提示词...' },
  'sidebar.languageLabel': { en: 'EN', cn: '中' },
  
  // MainContent
  'main.allPrompts': { en: 'All Prompts', cn: '所有提示词' },
  'main.promptsCount': { en: 'prompts', cn: '个提示词' },
  'main.results': { en: 'results', cn: '个结果' },
  'main.noResults': { en: 'No prompts found', cn: '未找到提示词' },
  'main.tryDifferent': { en: 'Try a different search term', cn: '尝试不同的搜索词' },
  
  // PromptCard
  'card.copy': { en: 'Copy prompt', cn: '复制提示' },
  'card.copied': { en: 'Copied!', cn: '已复制！' },
  'card.viewAll': { en: 'View all', cn: '查看全部' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, language: Language): string {
  return translations[key][language];
}
