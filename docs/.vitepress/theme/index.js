import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import CustomComponent from "../components/CustomComponent.vue";

import "./styles/vars.scss";
import "./styles/style.scss";

/** @type {import("vitepress/theme")} **/
const config = {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // app.component('CustomComponent', CustomComponent);
  },
};

export default config;