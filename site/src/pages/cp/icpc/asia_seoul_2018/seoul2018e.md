---
category: "prob"
code: "ICPC-2018-SEOUL-E"
path: "/problem/icpc/asia_seoul_2018/E"
title: "LED"
date: '2019-01-26'
difficulty: 4
description: |
    給你 $n$ 筆資料點 $(v_i, l_i)$。你的目標是要找出一個由參數 $0< V_1< V_2$ 以及 $0\le L_1 \le L_2$ 定義出來的三階段函數 $F(v) = \begin{cases}
    0 & \text{if } 0\le v < V_1\\
    L_1 & \text{if } V_1\le v < V_2\\
    L_2 & \text{if } v\ge V_2
    \end{cases}$，使得這個函數引出的誤差值最小。誤差的定義如下：
    $ \text{error}(F) = \max_{1\le i\le n}|l_i - F(v_i)|\text{。}
    $

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列有一個正整數 $n$ （$1\le n\le 300000$）。接下來的 $n$ 列每一列有兩個整數 $v_i, l_i$，這些數字都介於 $0$ 到 $10^9$ 之間。輸入保證所有 $v_i$ 都不重複。

## 輸出說明

輸出最小誤差值，精確到小數點以下第一位。

### 範例輸入 1

```
5
0 0
2 1
3 5
6 7
7 11
```

### 範例輸出 1

```
1.0
```

### 範例輸入 2

```
10
5 9
8 9
0 0
23 18
26 18
2 0
3 0
13 9
18 9
21 18
```

### 範例輸出 2

```
0.0
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/101987)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

可以對答案做二分搜：如果存在一個誤差 $\le  x$ 的函數，那就會存在一個誤差 $\le x'$ 的函數（$x \le x'$）。於是只要有個方法判斷對於給定誤差值 $x$，是否存在一個函數 $F$ 其誤差值 $\le x$ 就行了。

固定好誤差值以後，我們可以試圖把序列分成連續的三段。顯然第一段可以盡可能地把 $\le x$ 的那些數字吃掉。接下來得要判斷能否將剩下的數字分成兩段，並決定 $L_1$ 與 $L_2$ 的值並使得兩段的誤差值皆 $\le x$。

若存在一個誤差值不超過 $x$ 的函數，那麼指定 $L_1= (\text{第二段的最大值})-x$、以及 $L_2=(\text{第二與第三段的最大值})-x$ 也得是一個誤差不超過 $x$ 的函數。我們可以用線性時間預處理這兩個值，並且判斷它們是否滿足題目要求。

### 參考程式碼

下面程式碼有很多地方可以省略不算，但是為了保持結構的完整性我還是把他們都寫下來了。

有個很心機的地方，要注意到當輸入的 $(v, l)$ 數對裡面的 $v=0$ 的時候，不能把 $l$ 算入第二段或第三段。為了避免它影響二分搜的實作，這種情形出現時，不妨就直接定為二分搜的值 $x$ 的下界吧。

```cpp
#include <bits/stdc++.h>
using namespace std;

bool test(const vector<int> &a, int twice_x) {
  int n = a.size();
  vector<int> lmax(n), rmax(n), lmin(n), rmin(n);

  // 找出第一段。
  int start = 0;
  while (start < n && a[start] * 2 <= twice_x)
    start++;
  if (start >= n - 1)
    return true;

  // 處理第二段與第三段。
  lmax[start] = a[start];
  lmin[start] = a[start];
  rmax[n - 1] = a[n - 1];
  rmin[n - 1] = a[n - 1];

  for (int i = start + 1; i < n; i++) {
    lmax[i] = max(lmax[i - 1], a[i]);
    lmin[i] = min(lmin[i - 1], a[i]);
  }
  for (int i = n - 2; i >= start; i--) {
    rmax[i] = max(rmax[i + 1], a[i]);
    rmin[i] = min(rmin[i + 1], a[i]);
  }

  // 枚舉可能的分界點。
  for (int i = start; i + 1 < n; i++) {
    int L1_minus_x = lmax[i] - twice_x;
    int L2_minus_x = rmax[start] - twice_x;
    if (L1_minus_x <= lmin[i] && L2_minus_x <= rmin[i + 1])
      return true;
  }

  return false;
}

int main() {
  // 輸入檔比較大，所以要用較快的輸入方式。
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int n;
  cin >> n;
  vector<pair<int, int>> input;
  for (int i = 0; i < n; i++) {
    int x, y;
    cin >> x >> y;
    input.emplace_back(x, y);
  }
  sort(input.begin(), input.end());

  // 把輸入轉存到陣列裡面，v值排好序以後就不需要了。
  vector<int> a;
  for (auto it : input)
    a.push_back(it.second);

  // 定義二分搜的左右界。
  long long l = (input[0].first == 0 ? a[0] * 2 : 0), r = 2e9, ans = 2e9;
  while (l <= r) {
    long long m = (l + r) / 2;
    if (test(a, m)) {
      ans = m;
      r = m - 1;
    } else {
      l = m + 1;
    }
  }

  cout << ans / 2 << "." << (ans % 2 * 5) << endl;
  return 0;
}
```

### 備註

這題畢竟只是一連串的「連續片段最大值、最小值查詢」。因此如果我們使用 [RMQ問題](https://en.wikipedia.org/wiki/Range_minimum_query) 的相關演算法——包含 $O(n)-O(1)$ 的預處理（+/-1 RMQ、建立最大值與最小值的稀疏表格 Sparse Table），再加上使用三分搜找出第二與第三段之間的分界，整題的時間複雜度可以變成 $O(n+\log C\log n)$。再用力一點的話可以把二分搜的部份離散化，作到 $O(n+\log^2 n) = O(n)$。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！