---
category: "cp"
path: "/cp/snckel19"
date: "2018-12-08"
title: "SnackDown19 Elimination Round"
link: "https://www.codechef.com/SNCKEL19"
---

唉唉，今天狀況超級不對啊。整個就是撞牆卡在 Suffix Palindrome，到了快三個辦鐘頭才想到 Lighting Rectangle 要怎麼寫，還錯了一次，真是奇慘無比。

## Lighting Rectangle [RECTLIT](https://www.codechef.com/SNCKEL19/problems/RECTLIT)

<theorem c="is-info">
在一個二維座標平面上有一個 $(0, 0)$ 到 $(N-1, N-1)$ 的正方形。在這個正方形區域內有 $K$ 盞燈。對於每一盞燈而言，這盞燈為原點可以把整個平面分成四個象限。而你可以為每一盞燈選擇照亮其中一個象限（在邊界上也算是有被照亮）。現在給你這 $K$ 盞燈的位置，是否存在一種方法，讓它們可以照亮整個正方形的範圍呢？
</theorem>

### 我的解法

我們可以

<svg width=300 height=200>
<rect x=0 y=0 width=300 height=200 fill="none" stroke="black" stroke-width=4 />
<rect x=90 y=70 width=210 height=130 fill="rgba(0,0,255,0.3)" />
<circle cx=90 cy=70 r=5 fill="blue" />
</svg>