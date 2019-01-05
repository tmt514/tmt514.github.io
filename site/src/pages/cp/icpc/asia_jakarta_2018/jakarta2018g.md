---
category: "prob"
code: "ICPC-JAKARTA-2018-G"
path: "/problem/icpc/asia_jakarta_2018/G"
title: "Go Make It Complete"
date: '2019-01-04'
difficulty: 5
description: |
    給定一個無向簡單圖 $G$，找出最大的整數 $k$，使得存在一個包含所有尚未被加入 $G$ 的邊的序列 $L$，使得依序把這些邊 $(x, y)$ 加入圖 $G$ 的當下，$\delta_x+\delta_y \ge k$。其中 $\delta_x, \delta_y$ 是當下點 $x$ 和點 $y$ 在圖 $G$ 上的度數。
    
link: "https://codeforces.com/gym/102001/problem/G"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入的第一列包含兩個整數 $N, M$ ($2\le N\le 500; 0\le M < \frac{N\times (N-1)}{2}$) 代表點的數量與現存的邊數。接下來的 $M$ 列每一列包含兩個正整數 $a_i, b_i$ ($1\le a_i < b_i \le N$) 表示一條現存的邊。輸入保證任何配對 $(a_i, b_i)$ 只會出現至多一次。

## 輸出說明

輸出所求的整數 $k$ 值。

### 範例輸入 1

```
4 3
1 2
2 3
3 4
```

### 範例輸出 1

```
3
```

### 範例輸入 2

```
5 0
```

### 範例輸出 2

```
0
```

### 範例輸入 3

```
5 2
1 2
3 4
```

### 範例輸出 3

```
2
```

## OJ 連結

* [Codeforces Gym 102001 - G](https://codeforces.com/gym/102001/problem/G)


---

## 解法

這題可以用枚舉法的概念，對於每一個 $k$ 值判斷是否存在一個加入邊的序列滿足條件。演算法如下：

1. 把所有滿足 $\delta_x+\delta_y\ge k$ 但不在圖上的邊蒐集起來，加入一個佇列 $Q$。
2. 只要佇列非空，抓一條佇列中的邊 $(x, y)$，把它加入圖中；掃過一次所有與點 $x$ 和點 $y$ 相鄰的所有不在圖上的邊，並判斷是否能夠把它們加入佇列。
3. 如果最終所有的邊都被加入了佇列，就代表這個 $k$ 值是個成功的 $k$ 值。反之則不行：在任意時刻加不進佇列的邊永遠度數和小於 $k$。

以上的演算法的第一步會花 $O(N^2)$ 時間掃過所有點對。
第二步可能會考慮 $O(N^2)$ 個點對、而每一條邊加入後會花 $O(N)$ 時間掃過相鄰的不在圖上的邊，因此第二步所花時間是 $O(N^3)$。

不難發現只要 $k$ 是答案，$k-1$ 也會是答案。於是我們可以對 $k$ 進行二分搜尋法，找到滿足條件的最大 $k$ 值。時間複雜度 $O(N^3\log N)$。

但事實上二分搜尋法是不必要的。對於某個 $k$，若第二步完成後，還有邊沒有被加入圖上，那麼我們把 $k\gets k-1$ 時，剛才那些已經加入的邊，顯然可以依照同樣順序被加入圖上。因此，我們只需要重新對剩下的邊跑過上述演算法即可。注意到最大可能的 $k$ 為 $(N-2)+(N-2)$，第一步可能要重新跑 $O(N)$ 次，因此總花費時間是 $O(N^3)$，第二步每一條邊仍然只會被加入到佇列至多一次，所以也還是 $O(N^3)$。我們就得到一個 $O(N^3)$ 的乾淨算法啦～

### 參考程式碼

```cpp
#include <algorithm>
#include <iostream>
#include <queue>
using namespace std;

int a[505][505];
int deg[505];

int main() {
  int n, m;
  cin >> n >> m;
  for (int i = 0; i < m; i++) {
    int x, y;
    cin >> x >> y;
    a[x][y] = a[y][x] = 1;
    deg[x]++;
    deg[y]++;
  }
  int k;
  for (k = 2 * (n - 2); k >= 0; k--) {
    queue<pair<int, int>> q;
    // 第一步
    for (int x = 1; x <= n; x++)
      for (int y = x + 1; y <= n; y++)
        if (!a[x][y] && deg[x] + deg[y] >= k) {
          q.push({x, y});
        }
    // 第二步
    while (!q.empty()) {
      auto [x, y] = q.front();
      q.pop();
      if (a[x][y]) continue;
      m++;
      a[x][y] = a[y][x] = 1;
      deg[x]++;
      deg[y]++;
      for (int z = 1; z <= n; z++) {
        if (x != z && !a[x][z] && deg[x] + deg[z] >= k) q.push({x, z});
        if (y != z && !a[y][z] && deg[y] + deg[z] >= k) q.push({y, z});
      }
    }
    // 第三步
    if (m >= n * (n - 1) / 2) break;
  }
  cout << k << endl;
  return 0;
}
```

## 備註

如果要再快個常數倍的話（大約兩倍），可以把第一步很多不必要的檢查節省起來：事先把所有沒在圖上的邊依照 $\delta_x+\delta_y$ 的值放到某個陣列裡面。在第二步更新的當下，可以順便更新 $(x, z)$ 和 $(y, z)$ 的度數和。

## Open Question

這題如果把 Queue 拿掉，變成以下的 code 會變得更快。不曉得有沒有辦法證明下面的 while loop 只會跑 $O(N)$ 次？

```cpp
#include <algorithm>
#include <iostream>
#include <queue>
using namespace std;

int a[505][505];
int deg[505];

int main() {
  int n, m;
  cin >> n >> m;
  
  auto addedge = [&](int x, int y) {
    a[x][y] = a[y][x] = 1;
    deg[x]++;
    deg[y]++;
  };
  for (int i = 0; i < m; i++) {
    int x, y;
    cin >> x >> y;
    addedge(x, y);
  }
  int k = 2 * (n - 2);
  while (m < n * (n - 1) / 2) {
    int v = 0;
    for (int x = 1; x <= n; x++)
      for (int y = x + 1; y <= n; y++)
        if (!a[x][y])
            v = max(v, deg[x] + deg[y]);
    k = min(k, v);
    for (int x = 1; x <= n; x++)
      for (int y = x + 1; y <= n; y++)
        if (!a[x][y] && deg[x] + deg[y] >= k) {
          m++;
          addedge(x, y);
        }
  }
  cout << k << endl;
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！