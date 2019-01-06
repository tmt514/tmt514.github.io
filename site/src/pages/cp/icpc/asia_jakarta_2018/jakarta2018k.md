---
category: "prob"
code: "ICPC-JAKARTA-2018-K"
path: "/problem/icpc/asia_jakarta_2018/K"
title: "Boomerangs"
date: '2019-01-07'
difficulty: 4
description: |
    給定一個有 $N$ 個點和 $M$ 條邊的簡單圖 $G=(V, E)$。我們定義圖 $G$ 上的三元數對 $\langle u, v, w\rangle$ 被稱為「迴力標」若且唯若 $\set{(u, v), (v, w)}\subseteq E$ 而且 $u\neq w$。

    給你圖 $G$，請找出最大的邊不重複「迴力標集合」。也就是說，你要輸出盡量多的迴力標三元數對，而且沒有一條邊出現在兩個你輸出的迴力標裡面。若有多組解的話，輸出任何一組都可以。
    
link: "https://codeforces.com/gym/102001/problem/K"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Jakarta Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含兩個正整數 $N, M$ ($1\le N, M\le 100000$)。第二列開始有 $M$ 列，每一列包含兩個整數 $u_i, v_i$ ($1\le u_i < v_i \le N$) 代表一條圖上的邊，你可以假設圖上的邊不會重複在輸入出現。

## 輸出說明

第一列輸出一個整數 $K$ 表示最大的迴力標集合大小。接下來的 $K$ 列，每一列請輸出三個由單一空白間隔開的整數，代表一個迴力標 $\langle u, v, w\rangle$。

### 範例輸入 1

```
5 7
1 2
1 4
2 3
2 4
2 5
3 4
3 5
```

### 範例輸出 1

```
3
4 1 2
4 3 2
2 5 3
```

### 範例輸入 2

```
4 6
1 2
1 3
1 4
2 3
2 4
3 4
```

### 範例輸出 2

```
3
1 2 3
1 3 4
1 4 2
```

### 範例輸入 3

```
3 3
1 2
1 3
2 3
```

### 範例輸出 3

```
1
2 1 3
```

## OJ 連結

* [Codeforces Gym 102001 - K](https://codeforces.com/gym/102001/problem/K)


---

## 解法


### 參考程式碼

為了實作方便，我們在儲存邊的 ID 的時候

```cpp
#include <iostream>
#include <tuple>
#include <vector>
using namespace std;

int N, M;
vector<int> a[100005];
int x[100005], y[100005];
int used[100005];
vector<tuple<int, int, int>> ans;

int neighbor(int eid, int u) { return x[eid] + y[eid] - u; }

// Returns and edge id or -1 indicating that all edges were used up.
int dfs(int u, int from=-1) {
  int at_hand = -1;
  while (!a[u].empty()) {
    int eid = a[u].back();
    a[u].pop_back();
    if (used[eid]) continue;
    used[eid] = true;
    int v = neighbor(eid, u);
    int ret = dfs(v, eid);
    if (ret == -1) continue;
    if (at_hand == -1) {
      at_hand = ret;
    } else {
      ans.emplace_back(v, u, neighbor(at_hand, u));
      at_hand = -1;
    }
  }
  if (at_hand != -1 && from != -1) {
    ans.emplace_back(neighbor(at_hand, u), u, neighbor(from, u));
    return -1;
  } else if (from != -1) {
    return from;
  }
  return -1;
}

int main() {
  cin >> N >> M;
  for (int i = 0; i < M; i++) {
    cin >> x[i] >> y[i];
    a[x[i]].push_back(i);
    a[y[i]].push_back(i);
  }
  for (int i = 1; i <= N; i++) dfs(i);
  cout << ans.size() << endl;
  for (auto [u, v, w]: ans) cout << u << " " << v << " " << w << '\n';
  return 0;
}
```

### 備註

如果把所有的字串都預處理產生出來以後，用 Bucket Sort (桶子排序法) 把所有的字串全部排序起來。這麼一來就可以省下硬比較兩字串的時間，可以加速到 $O(15\times 2^{15})$。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！