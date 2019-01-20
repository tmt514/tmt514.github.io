---
category: "prob"
code: "ICPC-SINGAPORE-K"
path: "/problem/icpc/asia_singapore_2018/K"
title: "Conveyor Belts"
date: '2019-01-20'
difficulty: 5
description: |
    有 $N$ 個貨品集散地，以及 $M$ 條連接機器與機器之間的輸送帶。每個輸送帶每分鐘可以運送 $1$ 個貨品。恰好有 $K$ 個生產貨品的機器正在運作當中，他們的位置剛好分別在第 $1, 2, \ldots, K$ 個貨品集散地。他們每 $K$ 分鐘就會做好一份貨品：對任意非負整數 $x\ge 0$，編號為 $j$ 的機器會恰好在第 $xK+j$ 分鐘產出一份貨品。

    貨品可以經過任意事先指定的路線被送往編號為 $N$ 的貨品集散地。兩個以上的貨物可以同時被輸送至任一個集散地，上頭的機器手臂會以可忽略（即時）的速度將貨物轉送至其他輸送帶上面。

    請問至多可以保留多少運作中的生產機器，才能夠保證貨物輸送順暢？

link: "https://open.kattis.com/problems/conveyorbelts"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入第一列包含三個整數 $N, K, M$ ($1\le N, K\le 300; 0\le M\le 1000$)，代表貨物集散地、生產機器、以及輸送帶的數量。
接下來的 $M$ 列每一列有兩個正整數 $a, b$ ($1\le a, b\le N$)，代表有一條輸送帶可將貨物從編號 $a$ 的集散地送往編號為 $b$ 的集散地。

## 輸出說明

請輸出最多可保留的生產機器數量。

### 範例輸入 1

```
4 2 3
1 3
2 3
3 4
```

### 範例輸出 1

```
2
```

### 範例輸入 2

```
5 2 4
1 3
3 4
2 4
4 5
```

### 範例輸出 2

```
1
```

### 範例輸入 3

```
5 2 6
1 4
2 3
3 4
4 5
2 4
3 3
```

### 範例輸出 3

```
2
```

## OJ 連結

* [Open Kattis - Conveyor Belts](https://open.kattis.com/problems/conveyorbelts)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

注意到每固定 $K$ 分鐘就會有個循環，如果某條輸送帶在第 $x$ 分鐘是有東西的，那麼它在第 $x+K, x+2K, \ldots$ 分鐘也會有東西。因此，我們可以把整張圖複製 $K$ 份，原本的圖上的點 $i$ 會變成 $i_0, i_1, \ldots, i_{K-1}$，而原本圖上的邊 $(i, j)$ 會變成 $K$ 條邊：經過了這條輸送帶以後，時間會從模 $K$ 餘 $r$ 變成模 $K$ 餘 $(r+1)\%K$。

剩下就交給 flow 啦～正確的找出每個貨品產生的起點 $i_i$，然後試圖找出一條增廣路徑到任何一個原本編號是 $N$ 的節點 $N_r$。最大流量就是能夠生產的貨品數。

### 參考程式碼

由於我們構造出來的圖上所有邊都是單位流量，因此使用 Dinitz 演算法時間複雜度會是 $O(\text{邊數}\cdot \min\left(\sqrt{\text{邊數}}, \text{點數}^{2/3}\right)) = O((MK)^{1.5}) \approx 1.6\times 10^8$。在以下的程式碼中，我稍微偷懶了一下直接用類似二分圖匹配的方法 DFS 找出增廣路徑（在沒找到增廣路徑時不更新現有 DFS 標記），似乎跑起來滿快的，不小心就變成當下最快的上傳紀錄了 (0.06s)。

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge {
  int to, cap, rev;
  Edge(int _to, int _cap, int _rev): to(_to), cap(_cap), rev(_rev) {}
};

class FlowNetwork {
  public:
    int n, sink;
    vector<vector<Edge>> adj;
    int mark;
    vector<int> marks;
    FlowNetwork(int _n, int _sink): n(_n), sink(_sink) {
      adj.resize(n);
      marks.resize(n, 0);
      mark = 1;
    }
    void AddEdge(int x, int y, int c = 1) {
      adj[x].emplace_back(y, c, adj[y].size());
      adj[y].emplace_back(x, 0, adj[x].size()-1);
    }
    bool _DFS(int x) {
      marks[x] = mark;
      if (x == sink) return true;
      for (auto& e: adj[x]) {
        if (marks[e.to] != mark && e.cap > 0 && _DFS(e.to)) {
          adj[e.to][e.rev].cap++;
          e.cap--;
          return true;
        }
      }
      return false;
    }
    bool DFS(int s) {
      if (_DFS(s)) {
        mark++;
        return true;
      }
      return false;
    }
};

int main() {
  int N, K, M;
  cin >> N >> K >> M;
  FlowNetwork g(N*K+1, N*K);
  auto enc = [&](int i, int j) {
    return (i-1)*K+j;
  };
  for (int j = 0; j < K; j++)
    g.AddEdge(enc(N, j), g.sink, K);
  while (M--) {
    int x, y;
    cin >> x >> y;
    for (int j = 0; j < K; j++)
      g.AddEdge(enc(x, j), enc(y, (j+1)%K));
  }
  int ans = 0;
  for (int i = 1; i <= K; i++) {
    if (g.DFS(enc(i, i%K)))
      ++ans;
  }
  cout << ans << endl;
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！