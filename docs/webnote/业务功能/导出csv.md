# js导出csv





```js
   function exportToCSV(title, header, data) {
            const csvContent = [header.join(','), ...data.map(row => row.toString())].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

            const link = document.createElement('a');

            // 使用blob
            link.href = window.URL.createObjectURL(blob);

            // const encodedUri = encodeURI("data:text/csv;charset=utf-8," + str);
            // link.setAttribute("href", encodedUri); // 使用uri


            link.download = `${title}.csv`;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }

function btnClick() {
            const title = 'MyData';
            const header = ['Name', 'Age', 'Gender'];
            const data = [
                ['Alice', '25', 'Female'],
                ['Bob', '30', 'Male'],
                ['Charlie', '28', 'Male']
            ];
            exportToCSV(title, header, data);
}
```

