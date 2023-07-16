export default [
  [
    "link",
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
  ],
  [
    "link",
    {
      rel: "preload stylesheet",
      href: "/css/scroll.css",
    },
  ],
  // [
  //   "style",
  //   {
  //     rel: "icon",
  //     href: "/book.png",
  //   },
  // ],
  // would render: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  [
    "script",
    {},
    `
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?ac950a16c76b9b6cf9a4e5de56dfee51";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
`,
  ],
  [
    "script",
    {
      defer: true,
      src: "/_vercel/insights/script.js",
    },
  ],
];
