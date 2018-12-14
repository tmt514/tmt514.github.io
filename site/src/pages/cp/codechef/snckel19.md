---
category: "cp"
path: "/cp/snckel19"
date: "2018-12-08"
title: "SnackDown19 Elimination Round"
link: "https://www.codechef.com/SNCKEL19"
---

唉唉，今天狀況超級不對啊。整個就是撞牆卡在 Suffix Palindrome 完全寫不出來，然後到了快三個半鐘頭才想到 Lighting Rectangle 要怎麼寫，還錯了一次，真是奇慘無比。

## Lighting Rectangle [RECTLIT](https://www.codechef.com/SNCKEL19/problems/RECTLIT)

<theorem c="is-info">
在一個二維座標平面上有一個 $(0, 0)$ 到 $(N-1, N-1)$ 的正方形。在這個正方形區域內有 $K$ 盞燈。對於每一盞燈而言，這盞燈為原點可以把整個平面分成四個象限。而你可以為每一盞燈選擇照亮其中一個象限（在邊界上也算是有被照亮）。現在給你這 $K$ 盞燈的位置，是否存在一種方法，讓它們可以照亮整個正方形的範圍呢？
</theorem>

### 解法

簡單來說就是分 Case 題：

1. 在內部如果有四個點，那麼存在一種方式可以照亮所有區域。
2. 如果角落有一個點，那麼一定可以照亮所有區域。
3. 把邊分成上下、跟左右兩個部份。如果其中一個部份有兩個點，那可以照亮所有區域。
4. 如果邊上有一個點、而且內部有至少兩個點，那麼可以照亮所有區域。
5. 如果邊上有兩個點、而且內部至少有一個點，那麼可以照亮所有區域。
6. 除了以上情形外，其他情形都無法照亮所有區域。

<style>
#outer-rect {
     stroke-width: 4;
}
.blue.quadrant.region {
    fill: rgba(0,0,255,0.3);
}
.blue.quadrant.origin {
    fill: blue;
}
.blue.quadrant.boundary.start,
.blue.quadrant.boundary.end {
    stroke-width: 2;
    stroke: rgba(0,0,255,0.6);
}
.red.quadrant.region {
    fill: rgba(255, 0, 0, 0.3);
}
.red.quadrant.origin {
    fill: darkred;
}
.red.quadrant.boundary.start,
.red.quadrant.boundary.end {
    stroke-width: 2;
    stroke: rgba(200,0,0,0.6);
}
.yellow.quadrant.region {
    fill: rgba(255, 255, 0, 0.3);
}
.yellow.quadrant.origin {
    fill: gold;
}
.yellow.quadrant.boundary.start,
.yellow.quadrant.boundary.end {
    stroke-width: 2;
    stroke: rgba(233,233,0,0.6);
}
</style>

<mysvg width=300 height=200 viewbox="-10 -10 330 230">
<rect x=0 y=0 width=300 height=200 fill="none" stroke="black" id="outer-rect"></rect>
<display-inner
    quadrant
    dot-at-origin
    x=90 y=70 r=600
    angle-start="0" angle-end="90"
    boundary-at-start
    boundary-at-end
    c="blue"
    clip-href="#outer-rect"></display-inner>
<display-inner
    quadrant
    dot-at-origin
    x=160 y=120 r=600
    angle-start="270" angle-end="360"
    boundary-at-start
    boundary-at-end
    c="red"
    clip-href="#outer-rect"></display-inner>
<display-inner
    quadrant
    dot-at-origin
    x=185 y=90 r=600
    angle-start="180" angle-end="270"
    boundary-at-start
    boundary-at-end
    c="yellow"
    clip-href="#outer-rect"></display-inner>
</mysvg>

### 參考程式碼

```cpp
// by tmt514
#include <cstdio>
using namespace std;

void solve() {
  int K, N;
  scanf("%d%d", &K, &N);
  int ncorner = 0;
  int nsidex = 0;
  int nsidey = 0;
  int ninside = 0;
  for(int i=0;i<K;i++) {
    int x, y;
    scanf("%d%d", &x, &y);
    int sx = (x==0 || x==N-1);
    int sy = (y==0 || y==N-1);
    if(sx && sy) { ncorner++; }
    else if(sx) { nsidex++; }
    else if(sy) { nsidey++; }
    else ninside++;
  }
  if (ncorner==0 && nsidex==1 && nsidey==1 && ninside==0) puts("no");
  else
  puts(4*ncorner + 2*nsidex + 2*nsidey + ninside >= 4? "yes": "no");
}

int main(void) {
  int T;
  scanf("%d", &T);
  while(T--) solve();
  return 0;
}
```

## Suffix Palindromes [SFXPAL](https://www.codechef.com/SNCKEL19/problems/SFXPAL)

<theorem c="is-info">
考慮大小恰好為 $S$ 的字母集。請問有多少長度為 $N$ 的字串，其所有後綴字串都不是迴文？輸出答案除以 $M$ 的餘數。($1\le N\le 1000, 1\le S\le M-1 < 2^{30}-1$)
</theorem>

### 解法

這是一道很漂亮的 DP 題。假設 $f(n)$ 是答案，那麼每個字串的最後 $n-1$ 個字元都會被算入 $f(n-1)$。所以我們可以嘗試扣除掉加了一個字元以後會變成迴文的可能情形。而利用迴文的特性，我們可以證明在「加了一個字以後變成迴文」的當下，所有可能的迴文只能是來自 $f(\lceil n/2\rceil)$。所以，可以從 $f(1)=S$ 開始，依序計算 $f(n) = Sf(n-1) - f(\lceil n/2\rceil)$。

<display array 
    data='["S", "---------f(n-1) 之中的答案---------"]' ></display>
<display array 
    data='["--反過來的 f(n/2)--", "------f(n/2)------"]' ></display>    

### 參考程式碼

```cpp
// by tmt514
#include <iostream>
#include <vector>
using namespace std;
typedef long long LL;

int main(void) {
  LL N, S, M;
  cin >> N >> S >> M;
  vector<LL> dp(N+1);
  dp[0] = 1;
  dp[1] = S;
  for (int i = 2; i <= N; i++) {
    dp[i] = S*dp[i-1] - dp[(i+1)/2];
    dp[i] = (dp[i]%M+M)%M;
  }
  cout << dp[N] << endl;
  return 0;
}
```

## Adi and the Tree [ADITREE](https://www.codechef.com/SNCKEL19/problems/ADITREE)

<theorem c="is-info">
在一個有 $N$ 個節點的樹上，進行 $M$ 項操作。一開始所有的節點都是「關燈」的狀態。每一次操作會給你兩個點 $a, b$。然後你把點 $a$ 與點 $b$ 切換其「開/關燈」狀態。接著，每一個操作結束之後，請你幫所有亮著的燈的節點兩兩配成一對，使得配對的節點距離總和最小。每次操作後，都輸出配對後的最小總和。$(1\le N, M\le 250000)$
</theorem>

### 解法

另一個乾淨的漂亮問題。這題的主要觀察點在於：最小的距離總和，恰好等於所有「子樹中有奇數個亮燈」節點的數量。所以我們只需要維護一個資料結構，使得每次更新兩個點後，順便更新節點的奇偶性就行了！

要怎麼動態更新節點的奇偶性呢？我們可以利用樹鍊剖分，把一棵樹分成許多路徑，使得任何一個節點到樹根的路上至多只跨越 $O(\log N)$ 條路徑。我們在每一條路徑上面維護一個線段樹，因此總時間複雜度是 $O(N+M\log^2 N)$。

```cpp
// by tmt514
#include <algorithm>
#include <cstdio>
#include <vector>
using namespace std;

struct SegNode {
  int odd, even;
  bool inverted;
};

class SegmentTree {
  public:
    vector<SegNode> seg;
    void init(int x, int l, int r) {
      if (l == r) seg[x] = (SegNode){0, 1, false};
      else {
        int m = (l+r)/2;
        init(x*2, l, m);
        init(x*2+1, m+1, r);
        seg[x] = (SegNode){0, r-l+1, false};
      }
    }
    void init(int n) {
      seg.resize(4*n);
      init(1, 1, n);
    }
    void push(int x, int l, int r) {
      if (l == r) { seg[x].inverted = false; }
      else if (seg[x].inverted) {
        swap(seg[x*2].odd, seg[x*2].even);
        swap(seg[x*2+1].odd, seg[x*2+1].even);
        seg[x*2].inverted ^= 1;
        seg[x*2+1].inverted ^= 1;
        seg[x].inverted = false;
      }
    }
    void pull(int x) {
      seg[x].odd = seg[x*2].odd + seg[x*2+1].odd;
      seg[x].even = seg[x*2].even + seg[x*2+1].even;
      if (seg[x].inverted) swap(seg[x].odd, seg[x].even);
    }
    void toggle(int x, int l, int r, int target) {
      if (r <= target) {
        swap(seg[x].odd, seg[x].even);
        seg[x].inverted ^= 1;
      } else {
        int m = (l+r)/2;
        push(x, l, r);
        toggle(x*2, l, m, target);
        if (target > m) toggle(x*2+1, m+1, r, target);
        pull(x);
      }
    }
    int ask(int x, int l, int r, int target) {
      if (r <= target) {
        return seg[x].odd;
      } else {
        int m = (l+r)/2;
        push(x, l, r);
        return seg[x*2].odd + ask(x*2+1, m+1, r, target);
      }
    }
};

const int N = 250000;
vector<int> a[N];

int total_odd[N];
int parent[N];
int depth[N];
int child[N];
int segtree_idx[N];
int segtree_seq[N];
SegmentTree t[N];
int segtree_root[N];

void find_depth_dfs(int x, int p=-1) {
  parent[x] = p;
  depth[x] = 1;
  for(auto y : a[x]) {
    if (y != p) {
      find_depth_dfs(y, x);
      if(depth[y]+1 > depth[x]) {
        depth[x] = depth[y]+1;
        child[x] = y;
      }
    }
  }
}

int all_segids = 0;
void build_segment_tree(int x, int segid=0, int d=1) {
  segtree_idx[x] = segid;
  segtree_seq[x] = d;
  if (d == 1) {
    segtree_root[segid] = x;
    t[segid].init(depth[x]);
  }
  for (auto y : a[x]) {
    if (y == parent[x]) continue;
    if (y == child[x]) build_segment_tree(y, segid, d+1);
    else {
      all_segids++;
      build_segment_tree(y, all_segids, 1);
    }
  }
}

// 找出修改狀態時會經過的每一條鍊，我們把每一條鍊的進入點蒐集起來。
void toggle(int x) {
  vector<int> tree_ids;
  int c = x;
  while (c != -1) {
    tree_ids.push_back(c);
    c = parent[segtree_root[segtree_idx[c]]];
  }
  int delta = 0;
  for (auto c : tree_ids) {
    auto& tree = t[segtree_idx[c]];
    delta -= tree.seg[1].odd;
    tree.toggle(1, 1, depth[segtree_root[segtree_idx[c]]], segtree_seq[c]);
    delta += tree.seg[1].odd;
    total_odd[segtree_root[segtree_idx[c]]] += delta;
  }
}

int main(void) {
  int n, m;
  // 處理第一部份的輸入：紀錄整棵樹的訊息。
  scanf("%d", &n);
  for(int i=0;i<n-1;i++) {
    int x, y;
    scanf("%d%d", &x, &y);
    a[x].push_back(y);
    a[y].push_back(x);
  }
  // 用 DFS 連結每個節點至高度最高的子節點。
  find_depth_dfs(1);
  
  // 對於每一條鍊，初始化一個相應大小的線段樹。
  build_segment_tree(1);

  // 處理第二部分輸入：對於一次輸入的兩個點 A, B，改變其燈號狀態。
  scanf("%d", &m);
  while(m--) {
    int A, B;
    scanf("%d%d", &A, &B);
    toggle(A);
    toggle(B);
    printf("%d\n", total_odd[1]);
  }

  return 0;
}
```

### 其他推薦題解

* [cz_xuyixuan 博客](https://blog.csdn.net/qq_39972971/article/details/84922322)


## Recover Square [RECOVER](https://www.codechef.com/SNCKEL19/problems/RECOVER)

<theorem c="is-info">
在一個 $N\times N$ 大小的網格中，每一格恰有一個不同的、介於 $1$ 到 $N\cdot N$ 的數字。如果我們把<b>所有</b>曼哈頓距離是 $1$ 或 $2$ 的格子對寫下來（總共有 $M$ 個這樣的配對），請問你是否能回溯出原本的網格？($1\le N\le 200$，一個輸入檔中有 $1\le T\le 200$ 筆測試資料。)
</theorem>

### 解法

感覺就是從角落用拼拼圖的方式一個一個把它拼起來。可能有點麻煩就是了...

## Adi and the Matrix [ADIMAT](https://www.codechef.com/SNCKEL19/problems/ADIMAT)

<theorem c="is-info">
對於兩個矩陣而言，若重排一些行、然後再重排一些列之後變成相等的矩陣，那我們就說這兩個矩陣同構。請問有多少種大小為 $2^{N\times M}$ 的不同構 0/1-矩陣？輸出答案除以 $10^9+7$ 的餘數。($1\le N\times M\le 550$)
</theorem>

