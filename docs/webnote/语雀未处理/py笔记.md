# py笔记

### print打印占位符的使用

```
list = ["1","2","3","4","5"]
print("%s" %'--'.join(list))
输出：1--2--3--4--5
#分割字符串
str.split("|")
```

### urllib.request的使用

```
import urllib.request
# response = urllib.request.urlopen("http://www.baidu.com")

# print(response.read().decode("utf-8"))

#解析器
import urllib.parse

data = bytes(urllib.parse.urlencode({"hello":"word"}),encoding="utf-8")

response = urllib.request.urlopen("http://www.httpbin.org/post",data=data)

print(response.read().decode())

# 包装请求头，伪装
req = urllib.request.Request(url, headers=header)
try:
 res = urllib.request.urlopen(req)
 html = res.read().decode("utf-8")
 # print(html)
 return html
except urllib.error.URLError as e:
  if hasattr(e, "code"):
   print(e.code)
  if hasattr(e, "reason"):
   print(e.reason)
```

### beautifulsoup使用

```python
#引入
from bs4 import BeautifulSoup
import bs4
import re
#解析
soup = BeautifulSoup(html_doc, 'html.parser', from_encoding='utf-8')
#查找所有div
soup.find_all("div", class_="item")
#选择标签
soup.seclet("#id > .class>a") 
#a标签里的属性可以通过["href"]获取
for link in xxx:
  print('link[href]')
#.text可以获取标签里的内容，不需要括号
for pText in jobInfo:
    print(pText.text.strip())
#正则处理数据
for item in soup.find_all("div", class_="item"):
   # 获取电影信息
   data = []
   item = str(item)
   # 0
   link = re.findall(findRE, item)[0]
   data.append(link)
```

### sqlite3使用

```
import sqlite3
# 连接数据库
con = sqlite3.connect("movie.db")
# 建立游标
cur = con.cursor()
# sql命令
sql = '''select * from movieTop250'''
# 执行语句
data = cur.execute(sql)

# 关闭连接
cur.close()
con.close()
```

### xlwt xlrd使用

```javascript
# 创建一个workbook 设置编码
workbook = xlwt.Workbook(encoding='utf-8')
# 创建一个worksheet  第二参数 单元格可重写
worksheet = workbook.add_sheet('My Worksheet',cell_overwrite_ok=True)  


# 写入excel
# 参数对应 行, 列, 值
worksheet.write(0, 0, label='日期')
worksheet.write(0, 1, label='微博')

# 保存
workbook.save('Excel_test.xls')
xlwt
引入xlwt，import xlwt

新建工作簿，xlsx = xlwt.Workbook( encoding="utf-8" )，参数：设置编码为utf-8

添加工作表，sheet = xlsx.add_sheet( "sheet1", True )，参数：工作表名称；是否允许覆盖写入，默认为False，如果为False，则覆盖写入时会报错

设置单元格宽度，sheet.col(0).width = 256 * num，设置第一列的宽度，num为字符的个数，256为单个字符的宽度

写入单元格，sheet.write( i, j, content, style )，参数：写入第i行第j列的单元格（从0开始计数），style为单元格样式

合并单元格写入，sheet.write_merge( topRow, bottomRow, leftCol, rightCol, content, style )

保存工作簿，xlsx.save( path )，注意，写入的内容必须与工作簿的编码一致，否则在保存的时候会报错，比如，设置编码为utf-8，那么所有写入的内容都必须是utf-8的编码

样式设置
新建alignment：alignment = xlwt.Alignment()

设置行居中，alignment.horz = xlwt.Alignment.HORZ_CENTER

设置列居中，alignment.vert = xlwt.Alignment.VERT_CENTER

设置自动换行，alignment.wrap = xlwt.Alignment.WRAP_AT_RIGHT

新建font，font = xlwt.Font()

字体加粗，font.bold = True

设置字体大小，font.height = 12 * 20，12号的字体

设置为宋体，font.name = "SimSun"

新建borders，borders = xlwt.Borders()

设置表格宽度，borders.left = xlwt.Borders.THIN

新建style，style = xlwt.XFStyle()

为style设置alignment，style.alignment = alignment

为style设置font，style.font = font

为style设置borders，style.borders = borders

最后在写入单元格时使用style就可以了，更多样式设置详见参考文章

超链接
新建link，link = 'HYPERLINK("%s";"%s")' % ( str1, str2 )，str1为链接地址，可以是文件路径（记得将斜杠变成双斜杠）也可以是url地址，str2为在单元格中显示的文本

写入单元格，sheet.write(i, j, xlwt.Formula(link), style)，写入第i行第j列，style样式可选

#读取数据
import xlrd
```

### 报错汇总

安装wordCloud时

```
执行：import pip; print(pip.pep425tags.get_supported())
报错：module 'pip' has no attribute 'pep425tags'
解决：现在的电脑大多数都是64位的。pip 老的查看方法前段时间更新后就不能用了。
   64位的要在后面pip后面加上._internal.pep425tags，才可以。
>>> import pip._internal.pep425tags
>>>print(pip._internal.pep425tags.get_supported())
如果报错：No module named 'pip._internal.pep425tags'
方法“
用pip debug --verbose 命令即可看 pip 支持。

安装报错：WARNING: Retrying (Retry(total=1, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', timeout('_ssl.c:1106: The handshake operation timed out'))': /simple/matplotlib/
原因：网络问题
```

### re使用

```
re.sub('/', " ", bd) #把/替换为空格，作用于bd这个对象
re.compile 函数
compile 函数用于编译正则表达式，生成一个正则表达式（ Pattern ）对象，供 match() 和 search() 这两个函数使用。
re.match与re.search的区别
re.match只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回None；而re.search匹配整个字符串，直到找到一个匹配。
```

| 修饰符 | 描述 |
| --- | --- |
| re.I | 使匹配对大小写不敏感 |
| re.L | 做本地化识别（locale-aware）匹配 |
| re.M | 多行匹配，影响 ^ 和 $ |
| re.S | 使 . 匹配包括换行在内的所有字符 |
| re.U | 根据Unicode字符集解析字符。这个标志影响 \\w, \\W, \\b, \\B. |
| re.X | 该标志通过给予你更灵活的格式以便你将正则表达式写得更易于理解。 |

#### pycharm下载插件慢

清华: [https://pypi.tuna.tsinghua.edu.cn/simple](https://pypi.tuna.tsinghua.edu.cn/simple)

豆瓣: [http://pypi.douban.com/simple/](http://pypi.douban.com/simple/)

阿里: [http://mirrors.aliyun.com/pypi/simple/](http://mirrors.aliyun.com/pypi/simple/)

官方：[https://pypi.python.org/simple](https://pypi.python.org/simple)

#### 图片读取-两种方法

```
pip install pillow
from PIL import Image

pip install opencv-python
import cv2
```
