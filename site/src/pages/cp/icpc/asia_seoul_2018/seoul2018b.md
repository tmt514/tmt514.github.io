---
category: "prob"
code: "ICPC-2018-SEOUL-B"
path: "/problem/icpc/asia_seoul_2018/B"
title: "Cosmetic Survey"
date: '2019-01-27'
difficulty: 4
description: |
    現在有 $m$ 種化妝品，讓 $n$ 個人來評分。每一個人都會給你一張列表，描述他們有多偏好這個化妝品。寫 1 表示最喜歡、寫 2 表示次喜歡，以此類推。如果是 0 表示都不喜歡（是在列表的最末端）。偏好順序允許重複。

    對於任兩種化妝品，我們可以定義 $d(X, Y)$ 為有多少人喜歡 $X$ 嚴格勝過 $Y$。如果 $d(X, Y) > d(Y, X)$，那麼我們可以在圖上定義一條邊、權重為 $d(X, Y)$。而任何從 $X$ 到 $Y$ 的路徑上，其最小的邊權重，的最大可能值，就被我們定義為 $S(X, Y)$。如果 $X$ 到 $Y$ 之間不存在任何路徑，就定義 $S(X, Y) = 0$。

    請找出所有可能的優勝化妝品 $X$：滿足對所有 $Y$ 都有 $S(X, Y) \ge S(Y, X)$。

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含兩個正整數 $m, n$ ($1\le m, n\le 500$)。第二列開始有 $n$ 列，每一列恰好有 $m$ 個介於 $0$ 到 $10^6$ 之間的整數，代表一個人依序對編號 $1$ 到 $m$ 的化妝品的偏好順序。

## 輸出說明

請由小到大輸出所有可能的優勝化妝品編號。可以證明至少存在一個這樣的化妝品。

### 範例輸入 1

```
3 4
1 1 1
0 0 0
2 2 2
3 3 3
```

### 範例輸出 1

```
1 2 3
```

### 範例輸入 2

```
4 5
1 0 1 1
1 1 5 2
2 1 3 6
0 1 0 1
1 2 2 2
```

### 範例輸出 2

```
1 2
```


### 範例輸入 3

```
5 4
0 1 0 2 1
1 7 2 1 0
4 5 2 3 3
1 2 9 0 2
```

### 範例輸出 2

```
5
```


## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/101987)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

直接按照定義找出每一個配對 $(X, Y)$ 之間的距離就可以了。[最大瓶頸距離](https://en.wikipedia.org/wiki/Widest_path_problem)可以使用 Floyd-Warshall 演算法迅速解決。這樣的話時間複雜度是 $O(m^3+m^2n)$。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int g[505][505];

int main() {
  const int INF = 1e9;
  int m, n;
  cin >> m >> n;
  for (int i = 1; i <= n; i++) {
    vector<int> preference(m + 1);
    for (int j = 1; j <= m; j++) {
      cin >> preference[j];
      if (preference[j] == 0)
        preference[j] = INF;
    }
    for (int j = 1; j <= m; j++)
      for (int k = j + 1; k <= m; k++)
        if (preference[j] < preference[k]) {
          g[j][k]++;
        } else if (preference[j] > preference[k]) {
          g[k][j]++;
        }
  }

  for (int i = 1; i <= m; i++)
    for (int j = i + 1; j <= m; j++)
      if (g[i][j] == g[j][i])
        g[i][j] = g[j][i] = 0;
      else if (g[i][j] < g[j][i])
        g[i][j] = 0;
      else
        g[j][i] = 0;

  for (int k = 1; k <= m; k++)
    for (int i = 1; i <= m; i++)
      for (int j = 1; j <= m; j++)
        if (i != j)
          g[i][j] = max(g[i][j], min(g[i][k], g[k][j]));

  vector<int> sol;
  for (int i = 1; i <= m; i++) {
    bool ok = true;
    for (int j = 1; j <= m; j++)
      if (g[i][j] < g[j][i])
        ok = false;
    if (ok)
      sol.push_back(i);
  }
  for (auto x : sol)
    cout << x << ' ';
  cout << endl;
  return 0;
}
```

### 備註

這道題目的模型其實是來自於 [Schulze method](https://en.wikipedia.org/wiki/Schulze_method)，是一種透過提交偏好順序選出最佳若干選擇（可以不只選出一個）的選舉模型。從維基百科上面看起來，這個方法被廣泛地運用在[各種組織](https://en.wikipedia.org/wiki/Schulze_method#Users)裡面。

而最大瓶頸路徑問題可以在 $O(n^{(3+\omega)/2})\le O(n^{2.688})$ 時間內被[求出](https://dl.acm.org/citation.cfm?id=1496813)。其中 $\omega$ 是所有矩陣相乘演算法能夠做到的最小指數。（目前的紀錄是 2.373）。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！