---
category: "cp"
path: "/cp/snckel19"
date: "2018-12-08"
title: "SnackDown19 Elimination Round"
link: "https://www.codechef.com/SNCKEL19"
---

唉唉，今天狀況超級不對啊。整個就是撞牆卡在 Suffix Palindrome 完全寫不出來，然後到了快三個半鐘頭才想到 Lighting Rectangle 要怎麼寫，還錯了一次，真是奇慘無比。

## Lighting Rectangle [RECTLIT](https://www.codechef.com/SNCKEL19/problems/RECTLIT)

<theorem c="is-info">
在一個二維座標平面上有一個 $(0, 0)$ 到 $(N-1, N-1)$ 的正方形。在這個正方形區域內有 $K$ 盞燈。對於每一盞燈而言，這盞燈為原點可以把整個平面分成四個象限。而你可以為每一盞燈選擇照亮其中一個象限（在邊界上也算是有被照亮）。現在給你這 $K$ 盞燈的位置，是否存在一種方法，讓它們可以照亮整個正方形的範圍呢？
</theorem>

### 解法

簡單來說就是分 Case 題：

1. 在內部如果有四個點，那麼存在一種方式可以照亮所有區域。
2. 如果角落有一個點，那麼一定可以照亮所有區域。
3. 把邊分成上下、跟左右兩個部份。如果其中一個部份有兩個點，那可以照亮所有區域。
4. 如果邊上有一個點、而且內部有至少兩個點，那麼可以照亮所有區域。
5. 如果邊上有兩個點、而且內部至少有一個點，那麼可以照亮所有區域。
6. 除了以上情形外，其他情形都無法照亮所有區域。

<style>
#outer-rect {
     stroke-width: 4;
}
.blue.quadrant.region {
    fill: rgba(0,0,255,0.3);
}
.blue.quadrant.origin {
    fill: blue;
}
.blue.quadrant.boundary.start,
.blue.quadrant.boundary.end {
    stroke-width: 2;
    stroke: rgba(0,0,255,0.6);
}
.red.quadrant.region {
    fill: rgba(255, 0, 0, 0.3);
}
.red.quadrant.origin {
    fill: darkred;
}
.red.quadrant.boundary.start,
.red.quadrant.boundary.end {
    stroke-width: 2;
    stroke: rgba(200,0,0,0.6);
}
.yellow.quadrant.region {
    fill: rgba(255, 255, 0, 0.3);
}
.yellow.quadrant.origin {
    fill: gold;
}
.yellow.quadrant.boundary.start,
.yellow.quadrant.boundary.end {
    stroke-width: 2;
    stroke: rgba(233,233,0,0.6);
}
</style>

<mysvg width=300 height=200 viewbox="-10 -10 330 230">
<rect x=0 y=0 width=300 height=200 fill="none" stroke="black" id="outer-rect"></rect>
<display-inner
    quadrant
    dot-at-origin
    x=90 y=70 r=600
    angle-start="0" angle-end="90"
    boundary-at-start
    boundary-at-end
    c="blue"
    clip-href="#outer-rect"></display-inner>
<display-inner
    quadrant
    dot-at-origin
    x=160 y=120 r=600
    angle-start="270" angle-end="360"
    boundary-at-start
    boundary-at-end
    c="red"
    clip-href="#outer-rect"></display-inner>
<display-inner
    quadrant
    dot-at-origin
    x=185 y=90 r=600
    angle-start="180" angle-end="270"
    boundary-at-start
    boundary-at-end
    c="yellow"
    clip-href="#outer-rect"></display-inner>
</mysvg>

### 參考程式碼

```cpp
// by tmt514
#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <string>
#include <vector>
#define SZ(x) ((int)(x).size())
#define FOR(it, c) for(__typeof((c).begin()) it = (c).begin(); it != (c).end(); ++it)
using namespace std;
typedef long long LL;

void solve() {
  int K, N;
  scanf("%d%d", &K, &N);
  int ncorner = 0;
  int nsidex = 0;
  int nsidey = 0;
  int ninside = 0;
  for(int i=0;i<K;i++) {
    int x, y;
    scanf("%d%d", &x, &y);
    int sx = (x==0 || x==N-1);
    int sy = (y==0 || y==N-1);
    if(sx && sy) { ncorner++; }
    else if(sx) { nsidex++; }
    else if(sy) { nsidey++; }
    else ninside++;
  }
  if (ncorner==0 && nsidex==1 && nsidey==1 && ninside==0) puts("no");
  else
  puts(4*ncorner + 2*nsidex + 2*nsidey + ninside >= 4? "yes": "no");
}

int main(void) {
  int T;
  scanf("%d", &T);
  while(T--) solve();
  return 0;
}
```

## Suffix Palindromes [SFXPAL](https://www.codechef.com/SNCKEL19/problems/SFXPAL)

<theorem c="is-info">
考慮大小恰好為 $S$ 的字母集。請問有多少長度為 $N$ 的字串，其所有後綴字串都不是迴文？輸出答案除以 $M$ 的餘數。($1\le N\le 1000, 1\le S\le M-1 < 2^{30}-1$)
</theorem>

這是一道很漂亮的 DP 題。
