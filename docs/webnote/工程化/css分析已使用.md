# css

脚本

```
import { PurgeCSS } from "purgecss";
import fs from "fs";
console.log("PurgeCSS: ", PurgeCSS);
const purgeCSSResults = await new PurgeCSS().purge({
  content: ["src/**/*.vue"],
  css: ["src/style/main.css"],
});
console.log(purgeCSSResults[0].css);

fs.writeFileSync("./output.css", purgeCSSResults[0].css);
```
