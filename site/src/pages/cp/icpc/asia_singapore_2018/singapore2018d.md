---
category: "prob"
code: "ICPC-SINGAPORE-D"
path: "/problem/icpc/asia_singapore_2018/D"
title: "Bitwise"
date: '2019-01-16'
difficulty: 4
description: |
    給你 $N$ 個數字 $A_1, A_2, \ldots, A_N$ **圍成一圈**。你的任務是要把這些數字分成 $K$ 個連續的區段（長度任意），使得每一個區段 OR 起來的值，其 AND 起來的值最大。

link: "https://open.kattis.com/problems/bitwise"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列有兩個正整數 $N, K$ （$1\le K\le N\le 5\cdot 10^5$）。
第二列包含 $N$ 個整數，第 $i$ 個整數為 $A_i$（$0\le A_i\le 10^9$）。

## 輸出說明

輸出一個整數。

### 範例輸入 1

```
4 2
2 3 4 1
```

### 範例輸出 1

```
3
```

### 範例輸入 2

```
6 3
2 2 2 4 4 4
```

### 範例輸出 2

```
4
```

### 範例輸入 3

```
4 1
0 1 2 3
```

### 範例輸出 3

```
3
```

## OJ 連結

* [Open Kattis - Bitwise](https://open.kattis.com/problems/bitwise)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

如果沒有第一筆範例測資，可能就會誤以為整個序列不是接成一圈。所以有這樣一筆範例測資是很好的。

這題是要求最大化 ${\tt AND}_{\text{所有區間}}({\tt OR}_{x\in {\text{區間}}} x)$。如果題目的目標函數改成：最大化 ${\min}_{\text{所有區間}}(\sum_{x\in {\text{區間}}} x)$，而且把接成一圈改成一般的直線序列，那就會變成一纇很經典的經典題<footnote goto="1" show="備註1"></footnote>。

### 直線版的解法

對於經典題來說，一個作法是可以對答案做二分搜尋法：假設我們猜測答案是 $\ge v$，那麼我們可以使用貪心的方法，從左邊刷過去，只要恰好累積到總和 $\ge v$ 的區間，就可以把它切斷，然後開始累積下一個新的區間。如果最後能夠蒐集到至少 $K$ 個區間，那就存在一種分區間的方法滿足答案 $\ge v$ 了。

當我們從 MIN-SUM 函數換成 AND-OR 函數的時候，也可以如法炮製。不過呢，因為每一個位元實際上是分開的，我們的二分搜尋法可以寫成以下的等價描述：逐步判斷第 $29, 28, \ldots, 1$ 個 bit 能否出現在答案中；如果可以的話，就把它加進目前搜尋到的目標答案。

### 變成環狀

現在有個問題，就是不知道該從哪裡開始第一個區間。

我們可以注意到，對於這個問題來說，如果存在一個用上述 greedy 方式切出來的區間切法，那麼區間的結束點，都會出現在 **初獲得新的 bit** 的那個位置。因為每一個數字都只有至多 30 個 bit，所有可能的區間開頭，至多只有 30 種。

時間複雜度是 $O(30\times 30\times N)$。不曉得有沒有快一點的作法？

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;

int N, K;
vector<int> A;

bool Test(int mask) {
  int seeking = 0;
  for (int start = 0; start < N; start++) {
    if ((mask&(seeking|A[start])) != (mask&seeking)) {
      int now = 0, groups = 0;
      for (int i = start+1; i <= start+N; i++) {
        now |= A[i];
        if ((now&mask) == mask) {
          groups++;
          now = 0;
        }
      }
      groups += ((now&mask) == mask);
      if (groups >= K) return true;
    }
    seeking |= A[start];
  }
  return false;
}

int main() {
  cin >> N >> K;
  A.resize(N*2);
  for (int i = 0; i < N; i++) cin >> A[i];
  for (int i = 0; i < N; i++) A[N+i] = A[i];
  int mask = 0;
  for (int bit = 29; bit >= 0; bit--) {
    if (Test(mask + (1<<bit))) {
      mask += (1<<bit);
    }
  }
  cout << mask << endl;
  return 0;
}
```

### 經典題蒐集<footnote here="1"></footnote>

筆者是在古早的TOI選訓營遇到這個問題的，但現在資料似乎已不可考。以下類似題的目標函數都是：最小化 $\max_{\text{所有區間}}(\sum_{x\in \text{區間}} x)$

* [TIOJ 1432 - 骨牌遊戲](https://tioj.ck.tp.edu.tw/problems/1432)
* [TIOJ 1465 - H遊戲密笈 - EXTREME](https://tioj.ck.tp.edu.tw/problems/1465)
* [UVa 11299 - Separating Rods](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2274) (感謝夢月提供)

如果輸入的數字並不總是正數，那麼題目就會變難了（因為沒有了貪心法該有的性質：如果 $[i, j]$ 是一個超過總和的區間，$\Longrightarrow [\le i, \ge j]$ 也都超過總和）。大家有興趣可以挑戰一下以下的題目：

* [SPOJ SEQPAR - Partion the sequence](https://www.spoj.com/problems/SEQPAR/)

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！