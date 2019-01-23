---
category: "prob"
code: "ICPC-2018-SEOUL-K"
path: "/problem/icpc/asia_seoul_2018/K"
title: "TV Show Game"
date: '2019-01-23'
difficulty: 5
description: |
    舞台上有 $k$ （$k\ge 3$）盞燈，每一盞燈可以設定成紅色 `R` 或藍色 `B`。現在有 $n$ 個要求：每一個要求內容都包含三個條件，每個條件都以 $(l, c)$ 表示，代表第 $l$ 盞燈設定為顏色 $c$。只要滿足兩個以上的條件，就算滿足了該要求。

    若存在一組設定燈的顏色的方法，請輸出任何一組解。否則輸出 `-1`。

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含兩個正整數 $k, n$ ($3 < k\le 5000, 1\le n\le 10000$)。第二列開始每一列包含三個形如 $(l, c)$ 的條件，皆以空白隔開。（$1\le l \le k, c\in \set{{\tt R}, {\tt B}}$）

## 輸出說明

如果存在一個可行解，請輸出一個長度為 $k$ 的字串，其中第 $i$ 個字元代表了第 $i$ 盞燈的顏色。若不存在解的話請輸出 `-1`。

### 範例輸入 1

```
7 5
3 R 5 R 6 B
1 B 2 B 3 R
4 R 5 B 6 B
5 R 6 B 7 B
1 R 2 R 4 R
```

### 範例輸出 1

```
BRRRBBB
```

### 範例輸入 2

```
5 6
1 B 3 R 4 B
2 B 3 R 4 R
1 B 2 R 3 R
3 R 4 B 5 B
3 B 4 B 5 B
1 R 2 R 4 R
```

### 範例輸出 2

```
-1
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/101987)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

這個問題乍看之下非常的 [3-SAT](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem)，但是多了「至少要滿足兩個以上」這個條件後，這個問題變成了 MAJ-3-SAT。而加強了條件的 MAJ-3-SAT 問題可以輕鬆轉化成 [2-SAT](https://en.wikipedia.org/wiki/2-satisfiability) 的問題，於是能在多項式（線性）時間內解掉。

（廣義版的 MAJ-SAT，即不限定每一個要求內含的條件數量。這個問題是 **PP**-complete 的。按照 [**PP**](https://en.wikipedia.org/wiki/PP_(complexity)) 的定義來看，它同時包含了 **NP** 以及 **co-NP**，因此難度看起來比一般的 **SAT** 還高。但意外有趣的是，MAX-3-SAT 簡單很多。）

對於每一個要求 $(\text{條件一} \lor \text{條件二}\lor\text{條件三})$，如果得滿足至少兩個條件的話，就會完全等價於拆成三個至少滿足一個條件的要求：
$$
(\text{條件一} \lor \text{條件二})\land (\text{條件二}\lor\text{條件三}) \land (\text{條件三}\lor\text{條件一})
$$

於是，我們就可以利用一般解決 [2-SAT](https://en.wikipedia.org/wiki/2-satisfiability) 的演算法（建立一個[關聯圖 Implication Graph](https://en.wikipedia.org/wiki/Implication_graph)，然後計算[強連通元件 Strongly Connected Component](https://en.wikipedia.org/wiki/Strongly_connected_component)，然後再用貪求法找出一組解。


### 參考程式碼

下面我們使用 [Kosaraju 演算法](https://en.wikipedia.org/wiki/Kosaraju%27s_algorithm) 計算強連通元件<footnote goto="1" show="備註1"></footnote>。

```cpp
#include <bits/stdc++.h>
using namespace std;

class Graph {
public:
  int n;
  vector<vector<int>> adj;
  vector<vector<int>> rev;
  vector<int> scc;
  vector<int> visited;
  vector<vector<int>> groups;
  int nscc;
  Graph(int _n) : n(_n) {
    adj.resize(n);
    rev.resize(n);
    visited.resize(n, 0);
    scc.resize(n, 0);
    groups.resize(n+1);
    nscc = 0;
  }
  void AddEdge(int x, int y) {
    adj[x].push_back(y);
    rev[y].push_back(x);
  }
  void ComputeSCC() {
    vector<int> stack;
    for (int i = 0; i < n; i++)
      if (visited[i] == 0)
        _dfs1(stack, i);
    while (!stack.empty()) {
      int x = stack.back();
      stack.pop_back();
      if (visited[x] == 1) {
        ++nscc;
        _dfs2(x);
      }
    }
  }

private:
  void _dfs1(vector<int> &stack, int x) {
    visited[x] = 1;
    for (int y : adj[x])
      if (visited[y] == 0)
        _dfs1(stack, y);
    stack.push_back(x);
  }
  void _dfs2(int x) {
    visited[x] = 2;
    scc[x] = nscc;
    groups[nscc].push_back(x);
    for (int y : rev[x])
      if (visited[y] == 1)
        _dfs2(y);
  }
};

int ReadNode() {
  int l;
  string c;
  cin >> l >> c;
  return l * 2 + (c[0] == 'R');
}

int main() {
  int k, n;
  cin >> k >> n;
  Graph g(k * 2 + 10);
  for (int i = 0; i < n; i++) {
    int x[4];
    for (int j = 0; j < 3; j++)
      x[j] = ReadNode();
    x[3] = x[0];
    for (int j = 0; j < 3; j++) {
      g.AddEdge(x[j] ^ 1, x[j + 1]);
      g.AddEdge(x[j + 1] ^ 1, x[j]);
    }
  }
  g.ComputeSCC();

  // 判斷是否無解。
  for (int i = 1; i <= k; i++) {
    if (g.scc[i * 2] == g.scc[i * 2 + 1]) {
      cout << "-1" << endl;
      return 0;
    }
  }

  // 從縮圖之後從相依順序末端開始，以貪求法找出一組 2-SAT 解。
  vector<bool> taken(g.n, false);
  for (int scc = g.nscc; scc > 0; scc--) {
    bool ok = true;
    for (int x : g.groups[scc])
      if (taken[x ^ 1])
        ok = false;
    if (ok) {
      for (int x : g.groups[scc])
        taken[x] = true;
    }
  }

  // 把解答輸出。
  string ret = "";
  for (int i = 1; i <= k; i++) {
    if (taken[i * 2] == true) {
      ret += "B";
    } else {
      ret += "R";
    }
  }

  cout << ret << endl;
  return 0;
}
```

### 備註 1<footnote here="1"></footnote>

教育部的雙語對照辭典把 Strongly Connected Component 翻譯成[強連接組件](http://terms.naer.edu.tw/detail/2426323/?index=2)，真的很工程噎。我一直在思考到底是強連通元件、強連通分量、還是強連通分支，原來還漏了強連接系列呀（嘆）

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！