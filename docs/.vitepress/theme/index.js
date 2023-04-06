import DefaultTheme from "vitepress/theme";
import "./styles/vars.scss";
import "./styles/style.scss";
// import './styles/flexsearch.css' // flexsearch插件有的版本样式丢失
export default {
  ...DefaultTheme,
  // enhanceApp({ app }) {
  //   app.use(ZIcon);
  // },
};
