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

這個題目很巧妙地利用了在圖上進行 DFS （或 BFS）遍歷的特性。

我們不妨假設整個圖 $G$ 是連通的，考慮從 $G$ 上面任何一個點出發先做一次 DFS。
由於這個圖是無向圖，所有的邊會根據搜索的情形被分成兩種：在 DFS 樹上的邊（我們稱為 tree edge）、以及不在樹上的邊（此時稱為 back edge，因為發現時一定連到 DFS 樹上的祖先）。
我們可以把所有的 back edge「掛在」比較深的點，這麼一來整張圖就會在搜索的過程看起來像是一棵樹（BFS也會有類似的效果）。
對於這樣的樹來說，我們總可以從「葉子」的部份以 Greedy 的方法每次抓相連的兩條 sibling 邊（他們都是從同一個節點出發找到的），然後把它變成迴力標，然後把兩條邊拔掉。
不難發現，這種拔法可以保證 (1) 拔完之後整個圖還是連通的、以及 (2) 剩下的圖用「數學歸納法」，保證可以拔出最大迴力標的數量。

因此，根據以上的演算法，我們也在過程中證明了最大的迴力標數量總是 $\lfloor |E|/2\rfloor$ 組。而實作上也可以達到線性複雜度，很小品吧 😃

<display
  graph
  undirected
  unweighted
  data='{
    "nodes": [1, 2, 3, 4, 5],
    "edges": [[1, 2], [1, 4], [2, 4], [2, 3], [3, 4], [2, 5], [3, 5]],
  }'
  uihelper-id-map='{
        "[1,2]":{stroke: "blue", strokeWidth: "5"},
        "[1,4]":{stroke: "blue", strokeWidth: "5"},
        "[2,4]":{stroke: "green", strokeWidth: "5"},
        "[2,3]":{stroke: "green", strokeWidth: "5"},
        "[3,4]":{stroke: "red", strokeWidth: "5"},
        "[3,5]":{stroke: "red", strokeWidth: "5"},
    }'>
</display>

### 參考程式碼

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

// 如果 dfs 回來以後還有一條邊沒有被配對，那就回傳這條邊，否則回傳 -1。
int dfs(int u, int from=-1) {
  int at_hand = -1;
  // 依序考慮過所有的邊，但是因為 dfs 會經過同一個點很多次，
  // 所以不妨用一個類似 stack 的方式實作，每走過一條邊就把這條邊去掉。
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
  // 對於每個點進行 DFS，如果早就探索完了，那相鄰邊也都會被拔光，所以不用擔心重複搜索。
  for (int i = 1; i <= N; i++) dfs(i);
  
  cout << ans.size() << endl;
  // C++17 Structural Binding 好物，越來越像 python 了。
  for (auto [u, v, w]: ans)
    cout << u << " " << v << " " << w << '\n';
  return 0;
}
```

### 備註 1

其實這題的重點在於把 Graph 透過搜索的過程拆成樹，然後在樹上面做迴力標的分組。大家可以試著用 BFS 寫看看～

### 備註 2

不好意思，今天操作型動畫來不及生出來...如果生出來的圖有點醜的話，大家可以多重新整理幾次喔～

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！