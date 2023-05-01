import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import "./styles/vars.scss";
import "./styles/style.scss";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  // enhanceApp({ app }) {
  //   app.use(ZIcon);
  // },
};
