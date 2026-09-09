<script setup>
import { ref, onMounted, computed } from "vue";
import { withBase } from "vitepress";
import FlexSearch from "flexsearch";

// Vite 走 module 入口时 default 就是 Index；Node/bundle 则是 { Index }
const Index = typeof FlexSearch === "function" ? FlexSearch : FlexSearch.Index;

const open = ref(false);
const searchTerm = ref("");
const input = ref(null);
const searchIndex = ref(null);
const loadError = ref("");
const PREVIEW_LOOKUP = ref({});
const buttonLabel = ref("搜索");
const placeholder = ref("请输入关键词");
const origin = ref("");
const isMac = ref(false);

/** 必须与 localFlexSearch 插件建索引时一致 */
function tokenize(text) {
  if (!text) return [];
  const s = String(text).toLowerCase();
  const tokens = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/[a-z0-9_]/.test(ch)) {
      let j = i + 1;
      while (j < s.length && /[a-z0-9_]/.test(s[j])) j++;
      tokens.push(s.slice(i, j));
      i = j;
      continue;
    }
    if (/[\u4e00-\u9fff]/.test(ch)) {
      let j = i + 1;
      while (j < s.length && /[\u4e00-\u9fff]/.test(s[j])) j++;
      const run = s.slice(i, j);
      if (run.length === 1) {
        tokens.push(run);
      } else {
        for (let k = 0; k < run.length - 1; k++) {
          tokens.push(run.slice(k, k + 2));
        }
      }
      i = j;
      continue;
    }
    i++;
  }
  return tokens;
}

const result = computed(() => {
  if (!searchTerm.value || !searchIndex.value) return [];
  const ids = searchIndex.value.search(searchTerm.value, { limit: 30 }) || [];
  const list = [];
  for (const id of ids) {
    const item = PREVIEW_LOOKUP.value[id];
    if (!item) continue;
    list.push({
      id,
      link: String(item.l || "").split(" ").join("-"),
      title: item.t,
      preview: item.p,
      anchor: item.a,
    });
  }
  return list;
});

function groupBy(array, fn) {
  if (!array?.length) return {};
  return array.reduce((acc, value) => {
    const key = fn(value) || "Home";
    (acc[key] ||= []).push(value);
    return acc;
  }, {});
}

const grouped = computed(() =>
  groupBy(result.value, (x) => x.link.split("/").slice(0, -1).join("/") || "Home")
);

function openSearch() {
  open.value = true;
  searchTerm.value = "";
  setTimeout(() => input.value?.focus(), 50);
}

function closeSearch() {
  open.value = false;
  searchTerm.value = "";
}

onMounted(async () => {
  isMac.value = /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  try {
    const data = (await import("virtual:search-data")).default;
    PREVIEW_LOOKUP.value = data.PREVIEW_LOOKUP;
    buttonLabel.value = data.Options?.buttonLabel || buttonLabel.value;
    placeholder.value = data.Options?.placeholder || placeholder.value;
    origin.value = window.location.origin + withBase("/");

    const index = new Index({
      encode: (str) => tokenize(str),
      tokenize: "forward",
    });
    index.import("reg", data.INDEX_DATA.reg);
    index.import("map", data.INDEX_DATA.map);
    index.import("ctx", data.INDEX_DATA.ctx);
    searchIndex.value = index;
  } catch (e) {
    console.error("[local-search] init failed", e);
    loadError.value = "搜索索引加载失败，请刷新重试";
  }

  const onKey = (e) => {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape" && open.value) closeSearch();
  };
  window.addEventListener("keydown", onKey);
});
</script>

<template>
  <div class="VPNavBarSearch">
    <Teleport to="body">
      <div v-show="open" class="local-search-modal-back" @click="closeSearch">
        <div class="local-search-modal" @click.stop>
          <form class="local-search-form" @submit.prevent>
            <input
              ref="input"
              v-model="searchTerm"
              class="local-search-input"
              type="search"
              :placeholder="placeholder"
              maxlength="64"
              autocomplete="off"
            />
          </form>
          <div class="local-search-list">
            <p v-if="loadError" class="local-search-empty">{{ loadError }}</p>
            <div v-for="(group, groupKey) in grouped" :key="groupKey">
              <div class="local-search-group">{{ groupKey }}</div>
              <a
                v-for="item in group"
                :key="item.id"
                class="local-search-item"
                :href="origin + item.link"
                @click="closeSearch"
              >
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.preview }}</p>
                </div>
              </a>
            </div>
            <p
              v-if="!loadError && searchTerm && searchIndex && !result.length"
              class="local-search-empty"
            >
              无结果
            </p>
            <p
              v-else-if="!loadError && searchTerm && !searchIndex"
              class="local-search-empty"
            >
              索引加载中…
            </p>
          </div>
        </div>
      </div>
    </Teleport>

    <div id="docsearch" @click="openSearch">
      <button type="button" class="DocSearch DocSearch-Button" aria-label="Search">
        <span class="DocSearch-Button-Container">
          <svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20">
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="DocSearch-Button-Placeholder">{{ buttonLabel }}</span>
        </span>
        <span class="DocSearch-Button-Keys">
          <kbd class="DocSearch-Button-Key">{{ isMac ? "⌘" : "Ctrl" }}</kbd>
          <kbd class="DocSearch-Button-Key">K</kbd>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.local-search-modal-back {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  padding-top: 60px;
}
.local-search-modal {
  width: min(640px, 92vw);
  max-height: min(70vh, 560px);
  overflow: hidden;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}
.local-search-form {
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.local-search-input {
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  font-size: 16px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  outline: none;
}
.local-search-list {
  overflow: auto;
  padding: 8px 12px 16px;
}
.local-search-group {
  margin: 10px 0 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.local-search-item {
  display: block;
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg-soft);
}
.local-search-item:hover {
  background: var(--vp-c-brand-soft);
}
.local-search-item h3 {
  margin: 0 0 4px;
  font-size: 14px;
}
.local-search-item p {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.local-search-empty {
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 24px 0;
}
.VPNavBarSearch {
  display: flex;
  align-items: center;
}
</style>
