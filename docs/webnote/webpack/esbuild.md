![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245722.png)
![0974e2312324264bf64dedb0df8cc4e.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245908.png)

```javascript
let envPlugin = {
    name: "env",
    setup(build) {
        build.onResolve({ filter: /^env$/ }, args => ({
            path: args.path,
            namespace: "env-ns",
        }))

        build.onLoad({ filter: /.*/, namespace: "env-ns" }, () => ({
            contents: JSON.stringify(process.env),
            loader: "json",
        }))
    },
}

require("esbuild")
    .build({
        entryPoints: ["src/index.jsx"],
        bundle: true,
        outfile: "out.js",
        // 应用插件
        plugins: [envPlugin],
    })
    .catch(() => process.exit(1))

```
