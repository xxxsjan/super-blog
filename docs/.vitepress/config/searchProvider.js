/**
 * 搜索方案开关（themeConfig 与 vite.config 共用）
 * - flexsearch：本地 FlexSearch（推荐，中文可用）
 * - local：VitePress 内置 MiniSearch（当前 beta 对中文分词较弱）
 * - algolia：Algolia DocSearch（需有效 key / 爬虫）
 * @type {'flexsearch' | 'local' | 'algolia'}
 */
export const searchProvider = "flexsearch";
