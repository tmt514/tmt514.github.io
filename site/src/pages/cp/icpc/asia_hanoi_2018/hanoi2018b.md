---
category: "prob"
code: "ICPC-HANOI-2018-B"
path: "/problem/icpc/asia_hanoi_2018/B"
title: "Bipartite Battle"
date: '2019-01-09'
difficulty: 6
description: |
    Socket 和 Bash 在玩一個叫做「Bipartite Battle」的遊戲。這個遊戲的進行方式如下：
    
    * Socket 在桌上先畫出 $N$ 組二部圖（bipartite graph）。第 $i$ 組二部圖的兩個部份，分別包含 $a_i$ 個點與 $b_i$ 個點。
    * 接下來，由 Bash 和 Socket 輪流進行。每一個回合，玩家必須選擇 $N$ 個之中的其中一個非空的圖、並且要嘛刪掉一條邊，要嘛去掉一個點。去掉點的當下，所有連著該點的邊也全部都會被去除。
    * 沒辦法進行操作的人就輸了（也就是說當所有圖的邊跟點都被刪掉以後，下一個人就輸了）。
    * Bash 是先手。

    當然，Socket 想要畫一些二部圖使得他能夠總是獲勝。請問 Socket 有多少種畫圖的方法？（請輸出答案除以 $10^9+7$ 的餘數。）

    
link: "https://open.kattis.com/problems/amazingadventures"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
    - "game"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列有一個正整數 $N$ ($1\le N\le 10^5$)。

接下來的 $N$ 列每一列有兩個整數 $a_i, b_i$ ($1\le a_i, b_i\le 10^9$)。

## 輸出說明

輸出 Socket 能夠獲勝的二部圖畫法，除以 $10^9+7$ 的餘數。

### 範例輸入 1

```
1
1 1
```

### 範例輸出 1

```
1
```

### 範例輸入 2

```
1
1 2
```

### 範例輸出 2

```
0
```

## OJ 連結

* [Open Kattis - Bipartite Battle](https://open.kattis.com/problems/bipartitebattle)

---

## 解法

這是一道還算經典且有趣的題目～

看到「兩人、對稱式、資訊全揭露、博弈問題」<footnote goto="1" show="備註1"></footnote>，想到的關鍵字大概就是拈遊戲（Nim Game）與 [SG值（Sprague-Grundy Value）](https://zh.wikipedia.org/wiki/%E5%B0%BC%E5%A7%86%E6%95%B0)了！
但這題的數字範圍實在是大到非常誇張，因此可以大膽猜測應該是結論題吧哇哈哈哈。

很用力地嘗試了一些比較小的二分圖以後，首先映入眼簾的是相當不尋常的單一性：所有 $a_i+b_i=n$ 個點的樹的 SG值都相同！而且根據 $n$ 的值，這些 SG 值是交錯進行的：

<display
    array
    min-width='40'
    fixedwidth-ratios='[2]'
    data='["n", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]'></display>
<display
    array
    fixedwidth-ratios='[2]'
    min-width='40'
    data='["SG值", 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]'></display>

為什麼我們注意到樹呢？因為手動計算的時候，前幾小的非樹連通圖只有 cycle 而已啊，其他都是樹。我們多嘗試了一些，發現任何 $a_i+b_i=n$ 個點且恰好有 $m$ 條邊的二部圖，其 SG 值也總是相等的！於是我們可以整理出以下表格。

<display
    grid
    uihelper-content-map='{
        "0": {fill: "#FE8"}
    }' 
    font='12pt Roboto'
    data='[["n\\m", 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10],
            [1,    1, "", "", "", "", "", "", "", "", "", ""],
            [2,  "0",  2, "", "", "", "", "", "", "", "", ""],
            [3,    1,  3,  1, "", "", "", "", "", "", "", ""],
            [4,  "0",  2,"0",  2,"0", "", "", "", "", "", ""],
            [5,    1,  3,  1,  3,  1,  3,  1, "", "", "", ""],
            [6,  "0",  2,"0",  2,"0",  2,"0",  2,"0",  2, ""],
            [7,    1,  3,  1,  3,  1,  3,  1,  3,  1,  3,  1]]'></display>

從表格看起來應該就很明顯了吧！只有在總點數 $\sum(a_i+b_i)$ 是偶數、而且總邊數也是偶數的時候，Socket（後手）才會獲勝。

### 事後諸葛

令 $sg(n, m)$ 表示任何一個 $n$ 個點 $m$ 條邊的二部圖的 SG 值，根據以上規律，不難發現 $sg(n, m) = (n\bmod 2) + 2(m\bmod 2)$。
我們可以利用（萬用的）數學歸納法來證明任何 $n$ 個點、且 $m$ 條邊的二部圖其 SG 值都相等，而且等於該值。首先，根據 SG 值的原則：
$$
sg(當前狀態) = \mathrm{mex}\{ sg(任何下一個狀態) \}
$$

（其中 [mex (minimum excluded value)](https://en.wikipedia.org/wiki/Mex_(mathematics)) 的意思是所有非負整數中**沒有**出現在集合內的最小值。）

現在讓我們來考慮數學歸納法的邊界條件 base case：

當 $m=0$ 的時候，雙方都只有唯一一種方法（每次刪掉一個點），所以
$sg(n, 0) = \begin{cases}
0 & \text{當 $n$ 是偶數，}\\
1 & \text{當 $n$ 是奇數。}
\end{cases}$

當 $m>0$ 的時候，考慮 $n$ 個點的圖 $G$。我們可以根據歸納假設，對於所有 $m'< m$ 或 $n' < n$ 的 $sg(n', m')$ 值都已經是正確的了。
此時玩家有兩種選擇：
* (A) 刪除一條邊、或 
* (B) 刪除一個點。

情形 (A) 很單純，因為我們可以知道此時 SG 值會變成 $sg(n, m-1)$。
情形 (B) 就有點複雜：刪掉的點 $v$ 它的度數 $\deg(v)$ 也必須考慮進來，變成 $sg(n-1, m-\deg(v))$。

接著我們可以按情形討論 mex 的值：

* 如果 $n$ 是偶數、且 $m$ 是偶數：那麼情形 (A) 會給你新的 SG 值 $=2$，情形 (B) 會給你 $1$ 或 $3$（來自前一排），無論如何都不會拿到 $0$，因此可以斷定此時 SG 值 $= 0$。
* 如果 $n$ 是偶數、且 $m$ 是奇數：那麼情形 (A) 會給你新的 SG 值 $=0$、且存在一個奇數度數的點（因為總邊數是奇數、且 $G$ 是二部圖），此時情形 (B) 會給你 $1$，無論如何都不會拿到 $2$，因此可以斷定此時 SG 值 $= 2$。
* 如果 $n$ 是奇數、且 $m$ 是偶數：那麼情形 (A) 會給你新的 SG 值 $=3$、情形 (B) 會給你 $0$ 或 $2$（來自前一排），無論如何都不會拿到 $1$，因此可以斷定此時 SG 值 $= 1$。
* 如果 $n$ 是奇數、且 $m$ 是奇數：那麼情形 (A) 會給你新的 SG 值 $=1$、且
    * 存在一個奇數度數的點（因為總邊數是奇數、且 $G$ 是二部圖），此時情形 (B) 會給你 $0$。
    * 存在一個偶數度數的點（因為總邊數是奇數、且 $G$ 是二部圖，其中一邊一定有偶數個點，每一個點不可能 degree 都為奇數！），此時情形 (B) 會給你 $2$。
    * 綜合以上：無論如何都不會拿到 $3$，因此可以斷定此時 SG 值 $= 3$。

### 計算二部圖的數量

我們先隨便 hold 住一條邊 $e$。然後對於任何生出來的二部圖 $G$，放上這條邊 $G+e$、或不放上這條邊 $G$，它們邊數的奇偶性顯然不同。
於是我們可以得到一個「一對一關係」：從「所有擁有奇數條邊的圖」對應至「所有擁有偶數條邊的圖」。這說明了兩種圖的數量是相等的～

總共有多少種可能的圖呢？對於每一條潛在的邊，可以選、或不選，因此總共的圖的數量是 $2^{\sum_{i} a_ib_i}$。
也就是說，當總點數是偶數時，Socket 能夠獲勝的圖的數量恰好有 $2^{\left(\sum_{i} a_ib_i\right) - 1}$ 個！

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;


typedef long long LL;

LL bigmod(LL a, LL n, LL mod) {
  if (n == 0) return 1%mod;
  if (n == 1) return a%mod;
  LL r = bigmod(a*a%mod, n/2, mod);
  if (n%2) r = r*a%mod;
  return r;
}

int main() {
  const LL mod = 1e9+7;
  LL ret = 1;
  int N, total = 0;
  cin >> N;
  for (int i = 0; i < N; i++) {
    LL ai, bi;
    cin >> ai >> bi;
    total ^= ((ai%2) ^ (bi%2));
    ret = ret * bigmod(2, ai*bi-(i==0), mod) % mod;
  }
  if (total) cout << 0 << endl;
  else cout << ret << endl;
  return 0;
}
```

### 備註 1<footnote here="1"></footnote>

英文是 Two players symmetric impartial game。

### 備註 2

這題有一隊台大的隊伍在現場賽拿到首殺！

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！