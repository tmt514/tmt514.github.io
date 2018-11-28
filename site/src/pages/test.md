---
category: "algo"
path: "/hello-world"
date: "2018-11-09"
title: "測試文章"
---

# This is a test

$f(x) = x^2$

額外的測試嗎XD

這樣就可以一邊寫文章一邊寫數學式子了！

$$ax+by=\frac{z^2}{y} what$$

程式碼

`test`

```
test123 
```

```cpp

#include <cstdio>
using namespace std;

int main(void) {
    // 中文也可以
    printf("Hello! World!\n");
    return 0;
}
```


<display array
    data='[1, 2, "tdest123\n456"]'></display>


<algorithm>
    <generator><pre>
        function*(input) {
            var n = input.n;
            var i;
            var s = [];
            for (i = 0; i < n; i++) {
                s.push(i);
                yield {arr: s};
            }
            return {arr: s};
        }
        </pre>
    </generator>
    <inputdata
        data='{"n": 10}'
    ></inputdata>
    <indirectdisplay
        array
        n='10'
        highlightdiff
        varname='arr'
    ></indirectdisplay>
</algorithm>