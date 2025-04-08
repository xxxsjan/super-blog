import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import CustomComponent from "../components/CustomComponent.vue";
import VercelAnalytics from "../components/VercelAnalytics.vue";
import WalineComment from "../components/WalineComment.vue";

import "./styles/vars.scss";
import "./styles/style.scss";
import "./styles/flexsearch.css";

/** @type {import("vitepress/theme")} **/
const config = {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // app.component("CustomComponent", CustomComponent);
    // app.component("VercelAnalytics", VercelAnalytics);
    app.component("WalineComment", WalineComment);
  },
};

export default config;
