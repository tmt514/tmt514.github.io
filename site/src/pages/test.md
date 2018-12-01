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

## My Algorithm Displayer

### 1. Static Data Display.

<display array
    data='[1, 2, "test123\n456"]'></display>

```html
<display array
    data='[1, 2, "test123\n456"]'></display>
```

### 2. A simple looping algorithm.

<algorithm>
    <generator><pre>
        function*(input, ui) {
            var n = input.n;
            var i;
            var s = [];
            for (i = 0; i < n; i++) {
                s.push(i);
                ui.setStyleOnce('arr', `${i}`, {fill: 'yellow'});
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
        fixedwidth
        highlightdiff
        varname='arr'
    ></indirectdisplay>
</algorithm>

```html
<algorithm>
    <generator><pre>
```
```javascript
        function*(input, ui) {
            var n = input.n;
            var i;
            var s = [];
            for (i = 0; i < n; i++) {
                s.push(i);
                ui.setStyleOnce('arr', `${i}`, {fill: 'yellow'});
                yield {arr: s};
            }
            return {arr: s};
        }
```
```html
        </pre>
    </generator>
    <inputdata
        data='{"n": 10}'
    ></inputdata>
    <indirectdisplay
        array
        n='10'
        fixedwidth
        highlightdiff
        varname='arr'
    ></indirectdisplay>
</algorithm>
```

### 3. A simple grid.

<display grid
    data='["...#.#","..###.","#...#."]'
    ></display>

```html
<display grid
    data='["...#.#","..###.","#...#."]'
    ></display>
```

<display grid
    notext
    uistore="{
        styleRules: {
            ruleZZ: {
                apply_to: 'node',
                pure_predicate_fn: (nodeProps) => { return nodeProps.content === '#'; },
                options: { fill: 'black' },
            }
        }
    }"
    data='["...#.#","..###.","#...#."]'
    ></display>

```html
<display grid
    notext
    uistore="{
        styleRules: {
            ruleZZ: {
                apply_to: 'node',
                pure_predicate_fn: (nodeProps) => { return nodeProps.content === '#'; },
                options: { fill: 'black' },
            }
        }
    }"
    data='["...#.#","..###.","#...#."]'
    ></display>
```

### 4. Random walk on a grid.

<algorithm>
    <generator><pre>
        function*(input, ui) {
            var n = input.n;
            var s = [];
            var i, j;
            var x = Math.floor(Math.random()*n);
            var y = Math.floor(Math.random()*n);
            for (i = 0; i < n; i++) {
                var t = [];
                for (j = 0; j < n; j++) {
                    if (Math.floor(Math.random()*10) !== 0)
                        t.push('.');
                    else
                        t.push('#');
                }
                s.push(t);
            }
            s[x][y] = '*';
            ui.setStyle('arr', JSON.stringify([x, y]), {fill: '#FFEE33'});
            ui.setStyleOnce('arr', JSON.stringify([x, y]), {fill: 'blue'});
            yield { arr: s };
            //
            while (true) {
                var d = Math.floor(Math.random()*4);
                if (d === 0 && x+1 < n && s[x+1][y] === '.') {
                    s[x][y] = '.'
                    s[x+1][y] = '*'
                    x += 1
                } else if (d === 1 && x > 0 && s[x-1][y] === '.') {
                    s[x][y] = '.'
                    s[x-1][y] = '*'
                    x -= 1
                } else if (d === 2 && y+1 < n && s[x][y+1] === '.') {
                    s[x][y] = '.'
                    s[x][y+1] = '*'
                    y += 1
                } else if (d === 3 && y > 0 && s[x][y-1] === '.') {
                    s[x][y] = '.'
                    s[x][y-1] = '*'
                    y -= 1
                }
                ui.setStyle('arr', JSON.stringify([x, y]), {fill: '#FFEE33'});
                ui.setStyleOnce('arr', JSON.stringify([x, y]), {fill: 'blue'});
                yield { arr: s };
            }
        }
        </pre>
    </generator>
    <inputdata
        data='{"n": 10}'
    ></inputdata>
    <indirectdisplay
        grid
        uistore="{
            styleRules: {
                ruleZZ: {
                    apply_to: 'node',
                    pure_predicate_fn: (nodeProps) => { return nodeProps.content === '#'; },
                    options: { fill: 'black', fontColor: 'white' },
                }
            }
        }"
        varname='arr'
    ></indirectdisplay>
</algorithm>


```javascript
function*(input, ui) {
            var n = input.n;
            var s = [];
            var i, j;
            var x = Math.floor(Math.random()*n);
            var y = Math.floor(Math.random()*n);
            for (i = 0; i < n; i++) {
                var t = [];
                for (j = 0; j < n; j++) {
                    if (Math.floor(Math.random()*10) !== 0)
                        t.push('.');
                    else
                        t.push('#');
                }
                s.push(t);
            }
            s[x][y] = '*';
            ui.setStyle('arr', JSON.stringify([x, y]), {fill: '#FFEE33'});
            ui.setStyleOnce('arr', JSON.stringify([x, y]), {fill: 'blue'});
            yield { arr: s };
            //
            while (true) {
                var d = Math.floor(Math.random()*4);
                if (d === 0 && x+1 < n && s[x+1][y] === '.') {
                    s[x][y] = '.'
                    s[x+1][y] = '*'
                    x += 1
                } else if (d === 1 && x > 0 && s[x-1][y] === '.') {
                    s[x][y] = '.'
                    s[x-1][y] = '*'
                    x -= 1
                } else if (d === 2 && y+1 < n && s[x][y+1] === '.') {
                    s[x][y] = '.'
                    s[x][y+1] = '*'
                    y += 1
                } else if (d === 3 && y > 0 && s[x][y-1] === '.') {
                    s[x][y] = '.'
                    s[x][y-1] = '*'
                    y -= 1
                }
                ui.setStyle('arr', JSON.stringify([x, y]), {fill: '#FFEE33'});
                ui.setStyleOnce('arr', JSON.stringify([x, y]), {fill: 'blue'});
                yield { arr: s };
            }
        }
```