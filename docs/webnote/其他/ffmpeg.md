# ffmpeg



mp4 转 m3u8



```
ffmpeg -i test.mp4 -c:v libx264 -c:a aac -f hls -hls_time 10 -hls_list_size 0 output.m3u8
```

- `hls_time`：该选项用于设置每个HLS切片（segment）的时长。HLS切片是媒体内容在传输过程中被分割成的小片段。`hls_time` 指定了每个切片的时长，以秒为单位。例如，`hls_time 10` 表示每个切片的时长为10秒。
- `hls_list_size`：该选项用于设置HLS播放列表（playlist）中保留的切片数量。HLS播放列表是一个索引文件，包含了可用的媒体切片的信息。`hls_list_size 0` 表示播放列表中保留所有的切片。