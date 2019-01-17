---
category: "prob"
code: "ICPC-SINGAPORE-G"
path: "/problem/icpc/asia_singapore_2018/G"
title: "Rectangular City"
date: '2019-01-17'
difficulty: 4
description: |
    給你 $N, R, C, K$，請問有多少種長度為 $N$ 的矩形序列，其中每一個矩形的四個頂點座標範圍都是介於 $[0, 0]\times [R, C]$ 之間的整數，而且這 $N$ 個矩形交集面積至少有 $K$ 這麼大。

    對於任兩個序列，只要存在其中一個矩形位置或大小不同，就視為不同的序列。輸出答案除以 $10^9+7$ 之值。

link: "https://open.kattis.com/problems/rectangularcity"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
    - "combinatorics"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入僅有一列包含四個正整數 $N, R, C, K$。（$1\le N\le 10^6; 1\le R, C\le 5000; 1\le K\le R\cdot C$）

## 輸出說明

輸出可能的矩形序列數量除以 $10^9+7$ 的餘數。

### 範例輸入

```
2 2 3 4
```

### 範例輸出

```
7
```

## OJ 連結

* [Open Kattis - Rectangular City](https://asiasg18.kattis.com/problems/rectangularcity)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

今天是個輕巧的組合數學題喔！記分板上看起來解出來的隊伍數量不多，很可能是因為跟題效應的關係，導致後來大家都把時間花在寫起來比較複雜的題目上了。

（記分板排名比較沒那麼前面的部份也有隊伍答對這題。這種跡象出現的時候，通常代表這題會有程式碼較短的解法，或是題目出壞了。這取決於是哪裡辦的比賽...不說了先解題）

我們可以先考慮所有矩形交集的位置。接著，不難發現我們可以把兩個座標軸拆開來。任何 X 座標上交集後長度為 $c$ 的區間們，與任何 Y 座標上交集後長度為 $r$ 的區間們，的任意組合，都可以產生出**不同的**、而且交集面積恰好是 $c\times r$ 的矩形序列。

我們只要枚舉 $r, c$，當 $rc\ge K$ 的時候把兩邊方法數乘起來、加至總和即可。

所以現在問題便轉化成一維上的問題了！而一維的問題也只需要枚舉。考慮 $N$ 個 $[0, R]$ 之間的區間，我們希望最終他們的交集長度恰好為 $r$，那我們可以枚舉交集的位置：可能是 $[0, r], [1, r+1], \ldots, [R-r, R]$。對於位置 $[i, r+i]$，我們再次分離左右界：左界可以選擇 $\set{0, 1, \ldots, i}$ 任何一個、並且至少有一個要踩到 $i$。右界可以選擇 $\set{r+i, r+i+1, \ldots, R}$ 的任何一個，而且至少有一個要踩到 $r+i$。

因此，在限制交集範圍恰好是 $[i, r+i]$ 的情形下，左界的選法數有 $(i+1)^N-i^N$ 種。如法炮製得右界方法數有 $(R-r-i+1)^N-(R-r-i)^N$ 種。

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;

const LL MOD = 1e9 + 7;

LL bigmod(LL a, LL n) {
  LL b = 1;
  while (n) {
    if (n % 2)
      b = b * a % MOD;
    a = a * a % MOD;
    n /= 2;
  }
  return b;
}

LL npower[5005];
LL X[5005], Y[5005];

int main() {
  int N, R, C, K;
  cin >> N >> R >> C >> K;
  for (int i = 1; i <= 5000; i++)
    npower[i] = bigmod(i, N);
  for (int r = 0; r <= R; r++) {
    for (int i = 0; i <= R - r; i++) {
      X[r] += (npower[i + 1] - npower[i]) *
              (npower[R - r - i + 1] - npower[R - r - i]) % MOD;
    }
    X[r] = (X[r] % MOD + MOD) % MOD;
  }
  for (int c = 0; c <= C; c++) {
    for (int i = 0; i <= C - c; i++) {
      Y[c] += (npower[i + 1] - npower[i]) *
              (npower[C - c - i + 1] - npower[C - c - i]) % MOD;
    }
    Y[c] = (Y[c] % MOD + MOD) % MOD;
  }

  LL ans = 0;
  for (int r = 1; r <= R; r++)
    for (int c = 1; c <= C; c++) {
      if (r * c >= K) {
        ans += X[r] * Y[c] % MOD;
      }
    }
  cout << ans % MOD << endl;
  return 0;
}
```

### 題外話

同一場比賽的 Problem A 明明就比這題需要的知識點難一些，為什麼過山過海呀 =口=

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！