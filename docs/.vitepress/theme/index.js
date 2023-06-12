import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import CustomComponent from "../components/CustomComponent.vue";
console.log("CustomComponent: ", CustomComponent);

import "./styles/vars.scss";
import "./styles/style.scss";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // app.component('CustomComponent', CustomComponent);
  },
};
