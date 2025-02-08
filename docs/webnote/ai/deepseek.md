# deepseek

[魔塔社区](https://modelscope.cn/home)

[AnythingLLM](https://anythingllm.com/)

[DeepSeek-R1-Distill-Qwen-7B-GGUF 模型下载](https://modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-7B-GGUF/files)

[ollama](https://ollama.com/)

### ModelFile文件

myllama2.modelfile

```
FROM ./DeepSeek-R1-Distill-Qwen-1.5B-Q8_0.gguf    
PARAMETER temperature 0.7                       
PARAMETER top_p 0.95
PARAMETER top_k 40
PARAMETER repeat_penalty 1.1
PARAMETER min_p 0.05
PARAMETER num_ctx 1024                 
PARAMETER num_thread 4                  
PARAMETER num_gpu 8                     


# 设置对话终止符
PARAMETER stop "<｜begin▁of▁sentence｜>"
PARAMETER stop "<｜end▁of▁sentence｜>"
PARAMETER stop "<｜User｜>"
PARAMETER stop "<｜Assistant｜>"


SYSTEM """
"""

TEMPLATE """{{- if .System }}{{ .System }}{{ end }} 
{{- range $i, $_ := .Messages }} 
{{- $last := eq (len (slice $.Messages $i)) 1}}
{{- if eq .Role "user" }}<｜User｜>{{ .Content }}
{{- else if eq .Role "assistant" }}<｜Assistant｜>{{ .Content }}{{- if not $last }}<｜end▁of▁sentence｜>{{- end }}
{{- end }}
{{- if and $last (ne .Role "assistant") }}<｜Assistant｜>{{- end }} 
{{- end }}"""

```

### ollama 创建模型

<https://www.huwangyun.cn/blog/custom-llm-models-with-ollama-modelfile>

ollama create myllama2 --file myllama2.modelfile

启动模型

ollama run myllama2

## lm studio  更改 镜像源

<https://www.cnblogs.com/com3/p/18224574>

## ollama命令

ollama run deepseek-r1:7b --verbose

--verbose 启用详细输出模式

回复/bye 退出聊天

ollama ps

## 显存要求

| 参数量  | 显存需求 |
| ---- | ---- |
| 1.5B| 无需GPU |
| 7B| 8GB |
| 8B| 8GB |
| 14B| 16GB |
| 32B| 24GB |
| 70B| 48GB |
| 671B| 480GB |
