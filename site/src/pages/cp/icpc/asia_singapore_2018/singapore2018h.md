---
category: "prob"
code: "ICPC-SINGAPORE-H"
path: "/problem/icpc/asia_singapore_2018/H"
title: "Sliding Blocks"
date: '2019-01-18'
difficulty: 5
description: |
    在一個 $N\times M$ 大小的方格棋盤上，一開始恰好有一個格子上頭有個方塊，而棋盤的其他地方都是空的。現在，你可以逐步把一些方塊從棋盤的邊界，沿著水平或垂直方向**滑入**棋盤中。放入棋盤的方塊會一直滑，直到撞到某個現存於棋盤上的方塊停止。

    現在給你一個盤面，已知第一塊初始的方塊位置。請問能否用滑的滑出這個盤面？保證輸入的盤面所有方塊的位置連接成一棵樹：也就是說，如果我們把方塊當作節點、緊黏著邊的兩個方塊建立一條邊，那麼整個圖會形成一棵樹。

link: "https://open.kattis.com/problems/slidingblocks"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列有三個正整數 $N, M, B$ （$1\le N, M, B\le 4\cdot 10^5$），依序代表棋盤的列數與行數，還有方格總數。

接下來有 $B$ 列，每一列有兩個數字 $r, c$ （$1\le r\le N$; $1\le c\le M$）代表方格的位置。這 $B$ 列中的第一列，包含了初始方塊的位置。

## 輸出說明

如果不存在任何構造棋盤上方塊的方式，請輸出 `impossible`。否則的話，輸出 `possible`，然後從第二列開始輸出 $B-1$ 列，每一列包含一個滑入方塊的指令：首先有一個方向 $c\in\{$ `<`, `>`, `^`, `v` $\}$。然後會跟著滑入方塊的列號($r$) 或行號($c$)。

### 範例輸入 1

```
3 4 6
1 1
1 2
2 2
2 3
3 3
3 4
```

### 範例輸出 1

```
possible
< 1
^ 2
< 2
^ 3
< 3
```

### 範例輸入 2

```
3 4 9
3 1
2 1
1 1
1 2
1 3
1 4
2 4
3 4
3 3
```

### 範例輸出 2

```
impossible
```

## OJ 連結

* [Open Kattis - Sliding Blocks](https://open.kattis.com/problems/slidingblocks)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

因為棋盤上的所有方塊會形成一棵樹，所以我們從初始方塊開始進行 DFS/BFS，就可以得知每一個方塊滑入的方向了。根據這個滑入的方向，同一行或同一列的相鄰方塊，必須有先後順序才行（總不能先把鄰居都放進去，這樣自己就滑不進去了）。

因此，只要準確掌握好先後順序，最後進行一個拓撲排序，就可以把答案找出來啦！請參考落落長的程式碼。

### 參考程式碼

在程式碼中，我們使用了一些小撇步（不見得是必要的，但總之我是這樣寫了...）。比方說，我們把四個方向定義成左右一組、上下一組，這麼一來要存取**反方向**的時候，只要透過 XOR 1 就可以了(比方說 `dir^1`)。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXB = 400005;
int r[MAXB], c[MAXB];

const vector<string> DSTR = {">", "<", "v", "^"};
string s[MAXB];
int face[MAXB];
int visit[MAXB];
int link[MAXB][4];
vector<pair<int, int>> rows[MAXB], cols[MAXB];

// 定義四個方向。
enum {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3
};

inline bool IsNeighbor(int x, int y) {
  return abs(r[x]-r[y]) + abs(c[x]-c[y]) == 1;
}

void dfs(int x) {
  visit[x] = 1;
  for (int dir = 0; dir < 4; dir++) {
    int y = link[x][dir];
    if (IsNeighbor(x, y) && !visit[y]) {
      face[y] = (dir^1);
      s[y] = DSTR[dir] + " " + to_string(dir/2? c[y]: r[y]);
      dfs(y);
    }
  }
}

// 紀錄優先順序 (得先有 y 才能有 x)。
vector<int> deps[MAXB];
inline void AddLink(int x, int y) {
  if (x == -1 || y == -1) return;
  deps[x].push_back(y);
}

// 紀錄解答用的。
vector<int> solution;
bool no_solution = false;
void topological_sort(int x) {
  visit[x] = 1;
  for (auto y : deps[x]) {
    if (visit[y] == 0)
      topological_sort(y);
    else if (visit[y] == 1)
      no_solution = 1;
  }
  solution.push_back(x);
  visit[x] = 2;
}

int main() {
  int N, M, B;
  cin >> N >> M >> B;
  for (int i = 0; i < B; i++) {
    cin >> r[i] >> c[i];
    rows[r[i]].push_back({c[i], i});
    cols[c[i]].push_back({r[i], i});
  }
  for (int i = 1; i < MAXB; i++) {
    sort(rows[i].begin(), rows[i].end());
    sort(cols[i].begin(), cols[i].end());
  }

  memset(link, -1, sizeof(link));
  for (int i = 1; i < MAXB; i++) {
    for (size_t j = 1; j < rows[i].size(); j++) {
      int prev = rows[i][j-1].second;
      int now = rows[i][j].second;
      link[prev][RIGHT] = now;
      link[now][LEFT] = prev;
    }
    for (size_t j = 1; j < cols[i].size(); j++) {
      int prev = cols[i][j-1].second;
      int now = cols[i][j].second;
      link[prev][DOWN] = now;
      link[now][UP] = prev;
    }
  }
  dfs(0);
  for (int x = 1; x < B; x++) {
    AddLink(x, link[x][face[x]]);
    AddLink(link[x][face[x]^1], x);
  }
  memset(visit, 0, sizeof(visit));
  for (int x = 0; x < B; x++) {
    if (!visit[x])
      topological_sort(x);
  }
  if (no_solution) {
    cout << "impossible" << endl;
  } else {
    cout << "possible" << '\n';
    for (auto x : solution)
      if (x != 0)
        cout << s[x] << '\n';
  }
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！