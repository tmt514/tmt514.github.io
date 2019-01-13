---
category: "prob"
code: "ICPC-HANOI-2018-D"
path: "/problem/icpc/asia_hanoi_2018/D"
title: "Divide Doughnut"
date: '2019-01-12'
difficulty: 3
description: |
    **這是一個互動題。**
    
    ![](https://open.kattis.com/problems/dividedoughnut/file/statement/en/img-0001.png)

    Khue 與 Hanh 獲得了一個上面灑了一些五彩巧克力米的甜甜圈。他們想要把一個甜甜圈切成公平的一半，使得兩邊的巧克力米的數量相等。

    甜甜圈可以視為由 $10^9$ 個單位組成，每一個單位的甜甜圈範圍內至多只會有一顆巧克力米。已知甜甜圈上總共有 $N$ 顆巧克力米（$N$ 是偶數）。你的目標是要協助 Khue 與 Hanh 找出正確的切法，使得兩個人分別擁有連續的 $5\times 10^8$ 單位甜甜圈，而且上面巧克力米的數量恰好有 $N/2$ 個。
    
    ### 互動的部份
    
    你的任務是透過互動式詢問找出一個滿足題目條件的切法。
    
    你的程式會首先讀入一個正整數 $N$。輸入保證 $N$ 是偶數。接下來：
    * 你的程式會輸出以下三種形式之一：
        * `QUERY u v` ($0\le u, v < 10^9$)，詢問有多少巧克力米位於第 $u$ 單位與第 $v$ 單位之間。請注意：當 $u>v$ 時表示要計算的巧克力米是從第 $u$ 單位到第 $10^9-1$ 單位、以及第 $0$ 單位到第 $v$ 單位之間。
        * `YES x` ($0\le x < 10^9$)，告訴 Khue 可以拿到第 $x$ 單位到第 $(x+5\cdot 10^8-1)\bmod 10^9$ 單位的甜甜圈。
        * `NO`，回答不可能切成公平的兩部份。
    * 你的程式如果問了一個 `QUERY`，那麼接下來你可以從 standard input 讀入一個整數 $S$，表示得到的答案。
    * 否則的話，你的答案會被檢查。**而你必須立刻結束程式**。

    對於輸入的 $N$，你的程式至多只能詢問 $30+\lfloor\log_2\sqrt{N}\rfloor$ 次。
    

link: "https://open.kattis.com/problems/dividedoughnut"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
    - "interactive"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## OJ 連結

* [Open Kattis - Divide Doughnut](https://open.kattis.com/problems/dividedoughnut)

**題目出處**：ICPC 2018 Asia Hanoi Regional

---

## 解法

這題是個很棒的二分搜尋法練習題：關鍵在於每一個單位甜甜圈上頭至多只能有一顆巧克力米。

如果我們繪製一個函數 $f$，對於每一個 $x$ 值計算區間 $[x, (x+5\cdot 10^8-1)\bmod 10^9]$ 裡面的巧克力米數量，那麼這個函數 $f$ 的相鄰兩個值只會差 $-1, 0, 1$。注意到 $f(0) + f(5\cdot 10^8) = N$，如果其中一個 $< N/2$ 另一個就會 $ > N/2$。

於是我們可以根據 $f(a) < N/2, f(b) > N/2 \implies \text{存在} c\in [a, b] \text{使得} f(c) = N/2$。然後就可以用[勘根定理](/algo/binary-search-applications)進行二分搜尋法囉！

要特別注意的是，這題的範圍很嚴格，所以一旦範圍縮小到 $l=r$ 的時候就不需要再詢問就可以直接輸出答案了。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

const int WINDOW = 500000000;
const int FULL = 1e9;
int MakeQuery(int x) {
  cout << "QUERY " << x << " " << (x + WINDOW-1)%FULL << endl;
  int ret;
  cin >> ret;
  return ret;
}

int main() {
  int N;
  cin >> N;
  
  int v0 = MakeQuery(0);
  int l = 0, r = WINDOW;

  if (v == N/2) {
    cout << "YES " << 0 << endl;
    return 0;
  }
  
  while (l < r) {
    int m = (l + r) / 2;
    int v = MakeQuery(m);
    if (v == N/2) {
      cout << "YES " << m << endl;
      return 0;
    } else if ((v > N/2) != (v0 > N/2)) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  cout << "YES " << m << endl;
  return 0;
}
```

### 夢月說

這題跟 Codeforces 的一個互動題非常相似 [Codeforces 1019B - The hat](https://codeforces.com/contest/1019/problem/B)。該場比賽舉辦的時間是 2018/08/11，其實是相當新的題目。不過該題要求的詢問次數條件相對寬鬆許多，只要不超過 60 次就可以了。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！