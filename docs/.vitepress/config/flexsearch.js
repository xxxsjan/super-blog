const FlexSearch = require("flexsearch");
const fg = require("fast-glob");
const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const dayjs = require("dayjs");

const pageIndex = new FlexSearch.Document({
  tokenize: "full",
  cache: 100,
  document: {
    id: "id",
    index: "content",
    store: ["title", "content"],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
});

const sectionIndex = new FlexSearch.Document({
  cache: 100,
  tokenize: "full",
  document: {
    id: "id",
    index: "content",
    pageId: "pageId",
    store: ["title", "content", "display"],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
});

let pageId = 0;

const createIndex = async ({ documents }) => {
  let pageContent = "";
  ++pageId;

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];

    const { title, content } = doc;
    const paragraphs = content.split("\n");
    console.log(title, paragraphs.length);
    const pageIdText = `page_${pageId}`;

    sectionIndex.add({
      id: title,
      title,
      pageId: pageIdText,
      content: title,

      ...(paragraphs[0]
        ? {
            display: paragraphs[0],
          }
        : {}),
    });

    for (let j = 0; j < paragraphs.length; j++) {
      if (paragraphs[j]) {
        sectionIndex.add({
          id: `${title}_${j}`,
          title,
          pageId: pageIdText,
          content: stripMarkdown(paragraphs[j]),
        });
      }
    }

    pageContent += `${title} ${content}`;

    pageIndex.add({
      id: pageId,
      title: doc.title,
      content: stripMarkdown(pageContent),
    });
  }

  sectionIndex.export((key, data) => {
    console.log("key, data: ", key);
    //     localStorage.setItem(key, data)
  });
};

const doSearch = async (value) => {
  if (!value) {
    return [];
  }

  const results = await sectionIndex.search(value, {
    enrich: true,
    suggest: true,
  });

  const transformedResults = transformResults(results);

  return transformedResults;
};

const transformResults = (data) => {
  if (!data) {
    return [];
  }
  // 将所有 result 数组合并成一个数组

  const mergedResults = data.flatMap((item) => item.result);
  // const sortedResults = mergedResults.sort((a, b) => a.id.localeCompare(b.id));

  return mergedResults;
};

const stripMarkdown = (text) => {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, "") // 移除图片 Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // 移除链接 Remove links
    .replace(/`{1,3}.*?`{1,3}/g, "") // 移除代码 Remove code blocks
    .replace(/#{1,6} /g, "") // 移除标题标记 Remove heading markers
    .replace(/[*_~]+.*?[*_~]+/g, "") // 移除强调标记 Remove emphasis markers
    .replace(/>\s.*/g, "") // 移除引用 Remove blockquotes
    .replace(/-{3,}/g, "") // 移除分隔线 Remove horizontal rules
    .replace(/\n+/g, " "); // 替换换行符为空格 Replace newline characters with spaces
};

console.time("createDocument");
const documents = await createDocument();
console.log("documents: ", documents.length);
console.timeEnd("createDocument");

console.time("createIndex");
createIndex({ documents: documents });
console.timeEnd("createIndex");

doSearch("压缩文件").then((res) => {
  console.log(res.length);
});

function createDocument() {
  const docPath = path.resolve(process.cwd(), "../../");
  const mdPathList = fg
    .sync("**/*.md", {
      onlyFiles: false,
      cwd: docPath,
      deep: 3,
      ignore: ["index.md", "tags.md"],
    })
    .slice(0, 1);

  return Promise.all(
    mdPathList.map((p) => {
      const fullP = path.resolve(docPath, p);
      return new Promise((resolve) => {
        fs.readFile(fullP, "utf-8", (err, fileContent) => {
          const { data, content } = matter(fileContent);
          const stats = fs.statSync(fullP);
          const lastModified = dayjs(stats.mtime).format("YYYY-MM-DD hh:mm:ss");
          const name = path.parse(fullP).name;

          resolve({
            title: name,
            metadata: { ...data, lastModified },
            content,
          });
        });
      });
    })
  );
}
