不知道是什么。先记录一下
![image.png](https://cdn.nlark.com/yuque/0/2023/png/28823371/1678112526475-f9b79595-b70c-467a-a8a9-390cd0d88b05.png#averageHue=%23f4f0ef&clientId=u1c68a3d6-58d7-4&from=paste&height=373&id=u5cdda166&originHeight=466&originWidth=427&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=92242&status=done&style=none&taskId=u4f62f732-14f9-46cf-8ef1-2fa61c1a9c9&title=&width=341.6)
![0974e2312324264bf64dedb0df8cc4e.png](https://cdn.nlark.com/yuque/0/2023/png/28823371/1678112506820-9401d7b2-4fc1-4e61-a176-5ab2c592304d.png#averageHue=%23feecea&clientId=u1c68a3d6-58d7-4&from=paste&height=555&id=HMm0W&originHeight=694&originWidth=740&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=51261&status=done&style=none&taskId=u57769cf7-0653-4a44-9374-eb1bb826af4&title=&width=592)
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
