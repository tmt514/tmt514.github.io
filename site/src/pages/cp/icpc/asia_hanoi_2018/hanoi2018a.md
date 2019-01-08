---
category: "prob"
code: "ICPC-HANOI-2018-A"
path: "/problem/icpc/asia_hanoi_2018/A"
title: "Amazing Adventures"
date: '2019-01-08'
difficulty: 7
description: |
    在一個有 $N$ 列、$M$ 行的方格上，有四個英文字母 `B`, `C`, `G`, `U`。請你找出最短的、從 `B` 經過 `C` 到 `G` 但是不包括 `U` 的路徑，使得每一個格子（包含起點與終點）都不能重複經過。輸出這個路徑。
    
link: "https://open.kattis.com/problems/amazingadventures"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
    - "graph modeling"
    - "min-cost max-flow"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入包含多組測試資料，並以 `0 0` 作結束。每一筆測試資料包含 6 列：

* 第一列有兩個正整數 $N, M$ （$1\le M, N\le 100$）
* 第二列有兩個正整數 $r_B, c_B$，表示英文字母 `B` 的位置。
* 第三列有兩個正整數 $r_C, c_C$，表示英文字母 `C` 的位置。
* 第四列有兩個正整數 $r_G, c_G$，表示英文字母 `G` 的位置。
* 第五列有兩個正整數 $r_U, c_U$，表示英文字母 `U` 的位置。
* 第六列為空白列。

輸入保證 $1\le r_B, r_C, r_G, r_U \le N$ 且 $1\le c_B, c_C, c_G, c_U\le M$ 而且四個英文字母的位置不會重疊。
所有輸入的 $N\times M$ 加起來不會超過 $10^5$。

* 請注意：列的編號**從下往上**編號為 1 到 $N$；行的編號**從左往右**編號為 1 到 $M$。

## 輸出說明

對於每一筆測試資料輸出 1 或 2 列。
首先輸出是否存在滿足題目要求的路徑（`YES` 或 `NO`）。如果答案是 `YES`，在第二列輸出任何一個滿足條件的最短路徑。

### 範例輸入

```
3 3
1 1
3 3
2 1
2 2

3 4
1 1
3 4
2 1
1 2

2 2
2 1
2 2
1 2
1 1

0 0
```

### 範例輸出

```
YES
RRUULLD
NO
YES
RD
```

## OJ 連結

* [Open Kattis - Amazing Adventures](https://open.kattis.com/problems/amazingadventures)


---

## 解法

好一陣子沒有這麼痛苦地寫一個理論上有模板很好寫的東西了（淚）

這題的關鍵是[最小費用流](https://tmt514.github.io/algo/min-cost-max-flow)<footnote goto="1" show="備註 1"></footnote>（或者，你可以說貪心地做兩次最短路徑。）
每個格子不能經過超過一次這個條件，給我們一個很大的提示：要嘛這題是網路流、要嘛這是爆搜或連通性DP。
我們可以令中繼的 `C` 作為 sink，而開頭與結束的 `B` 與 `G` 作為 source，並建立網路流的圖：對於每一個格子 $(i, j)$ 我們都把他變成兩個點 $(i, j)_{in}$ 跟 $(i, j)_{out}$，然後有一條邊從 in 連到 out，cost=1。此外，對於相鄰的兩個格子，比方說 $(i, j)$ 和 $(i, j+1)$。我們也建立兩條邊 $(i, j)_{out}\to (i, j+1)_{in}$ 以及 $(i, j+1)_{out}\to (i, j)_{in}$（請注意都是從 out 連到 in），cost=0。

在這樣的圖上面找兩條「點不重複的路徑」 `B`$\to$`C`、`G`$\to$`C`，而且讓總 cost 最小，就等價於找出最短的從 `B`$\to$`C`$\to$`G` 路徑。


### 參考程式碼

有模板會好很多很多很多！
如果沒有的話，寫起來大概繪像我這樣慘慘的。有一些實作上的偷懶細節在這邊：

* 每一次都用 priority queue 版本的 SPFA 找最短路徑。
* 每一條邊還自帶輸出字元，這樣在找解的時候就不需要思考這條邊到底要給他 `U`, `D`, `L` 還是 `R` 了。
* 下面程式碼裡面的逆向邊通通標記 `#`，這樣可以順便得知這條邊的 cost 到底是 $1$ 還是 $-1$（如果沿著逆向邊流，那 cost 就是 $-1$，反之為 $1$）。

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge {
  int to;
  int capacity;
  int reversed_index;
  char ch;
  Edge(int _to, int _c, int _r, char _ch): to(_to), capacity(_c), reversed_index(_r), ch(_ch) {}
};

class FlowNetwork {
  public:
    int nid, sink;
    vector<vector<Edge>> edges;
    FlowNetwork() : nid(0) {
      edges.clear();
    }
    void SetSink(int _sink) { sink = _sink; }
    int AddNode() {
      edges.push_back(vector<Edge>());
      return nid++;
    }
    // 每加入一條邊，同時加上一條逆向邊，到時候增廣的時候我們必須在剩餘圖上的反向邊同步操作，
    // 因此很需要能夠從一條邊跳到另一條。
    void AddEdge(int from, int to, char mark) {
      edges[from].emplace_back(to, 1, (int)edges[to].size(), mark);
      edges[to].emplace_back(from, 0, (int)edges[from].size()-1, '#');
    }

    // 給定源點 x，找一條 cost 最小的路徑從 x 到 sink。如果找到了，順便把這條路徑增廣一下。
    bool SPFA(int x) {
      priority_queue<pair<int, int>> Q;
      vector<int> dist(nid, 1e9);
      vector<Edge> last(nid, Edge(-1,-1,-1,'X'));
      dist[x] = 0;
      Q.push({0, x});

      while (!Q.empty()) {
        auto it = Q.top(); Q.pop();
        int d = -it.first;
        int x = it.second;
        if (d != dist[x]) continue;

        for (auto&& e : edges[x]) {
          if (e.capacity) {
            int nd = d + (e.ch == '#' ? -1 : 1);
            if (dist[e.to] > nd) {
              dist[e.to] = nd;
              last[e.to] = edges[e.to][e.reversed_index];
              Q.push({ -nd, e.to });
            }
          }
        }
      }
      if (last[sink].to == -1) return false;
      x = sink;
      while (last[x].to != -1) {
        Edge& e = edges[last[x].to][last[x].reversed_index];
        e.capacity--;
        edges[e.to][e.reversed_index].capacity++;
        x = last[x].to;
      }
      return true;
    }

    // 逆向追蹤還原路徑。
    string Trace(int x) {
      string ret = "";
      while (x != sink) {
        for (auto&& e : edges[x]) {
          if (e.ch != '#' && e.capacity == 0) {
            x = e.to;
            if (e.ch != 'X') ret += e.ch;
          }
        }
      }
      return ret;
    }
};

///////////////////////////////////////////////////////////////////////////////
// 你看有模板的話上面都省下來了耶。

int ids[105][105][2];

bool solve() {
  int M, N;
  // 請不要讀反輸入，這樣會 debug 很久（淚）。
  cin >> N >> M;

  if (M == 0 && N == 0) return false;
  FlowNetwork g;

  // 先定義這個圖上的點。
  for (int i = 1; i <= N; i++) {
    for (int j = 1; j <= M; j++) {
      ids[i][j][0] = g.AddNode();
      ids[i][j][1] = g.AddNode();
    }
  }

  int rB, cB, rC, cC, rG, cG, rU, cU;
  cin >> rB >> cB >> rC >> cC >> rG >> cG >> rU >> cU;

  // 把圖上的邊建立起來，記得要跳過 (rU, cU) 這格。
  for (int x = 1; x <= N; x++) {
    for (int y = 1; y <= M; y++) {
      if (x == rU && y == cU) continue;
      g.AddEdge(ids[x][y][0], ids[x][y][1], 'X');
      const int dx[4] = {0, 1, 0, -1};
      const int dy[4] = {1, 0, -1, 0};
      const string dir = "RULD";
      for (int f = 0; f < 4; f++) {
        int nx = x + dx[f], ny = y + dy[f];
        if (nx == rU && ny == cU) continue;
        if (nx >= 1 && nx <= N && ny >= 1 && ny <= M) {
          g.AddEdge(ids[x][y][1], ids[nx][ny][0], dir[f]);
        }
      }
    }
  }

  g.SetSink(ids[rC][cC][0]);
  if (g.SPFA(ids[rB][cB][0]) && g.SPFA(ids[rG][cG][0])) {
    auto A = g.Trace(ids[rB][cB][0]);
    auto B = g.Trace(ids[rG][cG][0]);
    reverse(B.begin(), B.end());
    for (auto&& x : B) {
      if (x == 'U') x = 'D';
      else if (x == 'D') x = 'U';
      else if (x == 'L') x = 'R';
      else if (x == 'R') x = 'L';
    }
    cout << "YES" << '\n';
    cout << A << B << '\n';
  } else {
    cout << "NO" << '\n';
  }
  
  return true;
}

int main() {
  while (solve());
  return 0;
}
```

### 備註 1<footnote here="1"></footnote>

需要關於這題更詳盡的資源請參考 [Stackoverflow - Shortest two disjoint paths between two specified vertices](https://stackoverflow.com/questions/11880738/shortest-two-disjoint-paths-between-two-specified-vertices)。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！