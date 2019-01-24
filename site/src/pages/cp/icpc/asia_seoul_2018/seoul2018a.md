---
category: "prob"
code: "ICPC-2018-SEOUL-A"
path: "/problem/icpc/asia_seoul_2018/A"
title: "Circuits"
date: '2019-01-24'
difficulty: 4
description: |
    給平面上 $n$ 個矩形，問任意兩條水平線能夠切過的矩形數量的最大值。（切在矩形邊上也算數）。

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含整數 $n$ ($3\le n\le 100000$)。接下來的 $n$ 列每一列包含四個整數 $u_x, u_y, v_x, v_y$ ($u_x < v_x$ 且 $u_y > v_y$) 表示一個矩形的兩個角落座標，其中 $(u_x, u_y)$ 是左上角、而 $(v_x, v_y)$ 是右下角。所有座標範圍都在 $-10^7$ 和 $10^7$ 之間。


## 輸出說明

輸出兩條水平線能切出的最大矩形數量。

### 範例輸入 1

```
5
0 13 4 4
2 14 11 9
7 17 12 12
3 5 16 0
5 2 13 1
```

### 範例輸出 1

```
5
```

### 範例輸入 2

```
5
0 4 4 0
1 3 3 1
5 8 9 4
0 12 4 8
1 11 3 9
```

### 範例輸出 2

```
4
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/101987)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

這題是線段樹/區間樹很直接的應用。由於切割的都是水平線，對於每一個輸入的矩形只要考慮它的 Y-座標區間就可以了。

利用掃描線的概念，考慮其中 Y-座標較低的那條線的位置（比方說讓一個變數 $y_0$ 從下到上慢慢推進）。固定了這條線 $y=y_0$ 以後，問題便轉化為：從所有比這條線還要高的區間中，找出一個 $y$ 值使得戳到的區間數量最大。

隨著 $y_0$ 值變大，比這條線還要高的區間，會一個一個減少。因此我們需要一種動態資料結構，支援把區間移除後，仍可以找出能戳到最多區間的水平線。一個簡單的想法是直接使用區間樹，在 $y_0$ 值變大的時候逐步把踩到的區間移除。

### 參考程式碼

下面的程式碼從另一個方向處理區間樹的操作。我們先對所有區間 $I_0, I_1, \ldots, I_{n-1}$ 依照左界排序（這個順序就是當 $y_0$ 變大的時候，會依序移除區間的順序）。然後我們倒著順序把區間一個一個加入線段樹，並且計算區間們 $I_i, I_{i+1}, \ldots, I_{n-1}$ 的最大重疊數量（儲存在 `localmax[i]` 這個變數裡面）。

預處理完畢以後，我們讓 $y_0$ 沿著離散化後的區間座標一路遞增，紀錄當前 $y=y_0$ 切到的區間數量（`now`），並且找出最小的 $j$ 使得 $I_j$ 左界是嚴格大於 $y_0$ 的。我們的所求就是（`now + localmax[j]`）

```cpp
#include <bits/stdc++.h>
using namespace std;

// 離散化：把所有需要的座標記錄下來，排序以後換成離散化後的座標。
int discretize(vector<pair<int, int>> &a) {
  vector<int> lisan;
  for (auto &it : a) {
    lisan.push_back(it.first);
    lisan.push_back(it.second);
  }
  sort(lisan.begin(), lisan.end());
  lisan.resize(unique(lisan.begin(), lisan.end()) - lisan.begin());
  for (size_t i = 0; i < a.size(); i++) {
    a[i].first =
        lower_bound(lisan.begin(), lisan.end(), a[i].first) - lisan.begin() + 1;
    a[i].second = lower_bound(lisan.begin(), lisan.end(), a[i].second) -
                  lisan.begin() + 1;
  }
  return lisan.size();
}

// 區間樹的節點要存的東西。
struct Node {
  int max, sum;
  Node(int _max = 0, int _sum = 0) : max(_max), sum(_sum) {}
};

int main() {
  // 輸入很大所以要加快讀取輸入的速度。
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  vector<pair<int, int>> a;
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    int ux, uy, vx, vy;
    cin >> ux >> uy >> vx >> vy;
    a.emplace_back(vy, uy);
  }
  // Ranges become [1, m].
  int m = discretize(a);
  sort(a.begin(), a.end());

  // Find best offset for an interval tree.
  int offset = m + 1;
  while ((offset & -offset) != offset)
    offset += (offset & -offset);

  vector<int> localmax(n + 1, 0);
  vector<Node> segtree(2 * offset);
  const auto pull = [&](int x) {
    if (x >= offset) {
      segtree[x].max = segtree[x].sum;
    } else {
      segtree[x].max =
          max(segtree[x * 2].max, segtree[x * 2 + 1].max) + segtree[x].sum;
    }
  };
  auto add_segment = [&](int x, int v) {
    while (x) {
      if (x % 2 == 0) {
        segtree[x].sum += v;
        pull(x);
        --x;
      } else {
        x /= 2;
        pull(x + 1);
      }
    }
  };

  for (int i = n - 1; i >= 0; i--) {
    add_segment(offset + a[i].second, 1);
    add_segment(offset + a[i].first - 1, -1);
    localmax[i] = segtree[1].max;
  }

  vector<int> change(m + 2);
  for (int i = 0; i < n; i++) {
    change[a[i].first]++;
    change[a[i].second + 1]--;
  }
  int ans = 0;
  for (int i = 0, j = 0, now = 0; i <= m; i++) {
    while (j < n && a[j].first <= i)
      ++j;
    now += change[i];
    ans = max(ans, now + localmax[j]);
  }

  cout << ans << endl;
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！