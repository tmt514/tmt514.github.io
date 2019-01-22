---
category: "prob"
code: "ICPC-SINGAPORE-A"
path: "/problem/icpc/asia_singapore_2018/A"
title: "Largest Triangle"
date: '2019-01-21'
difficulty: 4
description: |
    給你平面上 $N$ 個整數點，求任三個點構成的三角形之最大面積。

link: "https://open.kattis.com/problems/largesttriangle"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列有一個正整數 $N$ ($3\le N\le 5000$)，接下來的 $N$ 列每一列有兩個整數 $x, y$ ($0\le x, y\le 4\cdot 10^7$)。輸入的點可能會重複、也可能會有三點共線。

## 輸出說明

輸出最大三角形面積，答案的絕對誤差必須在 $10^{-5}$ 以內。

### 範例輸入

```
7
0 0
0 5
7 7
0 10
0 0
20 0
10 10
```

### 範例輸出

```
100.00000
```

## OJ 連結

* [Open Kattis - Largest Triangle](https://open.kattis.com/problems/largesttriangle)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

首先，我們可以證明面積最大的三角形，其三個頂點一定會出現在凸包上。
於是，在求出凸包以後，我們依序枚舉每一個點，再利用 two pointers 的單調性跑過另外兩個點，從而得到一個 $O(N^2)$ 時間的演算法。根據 [這篇論文](https://arxiv.org/abs/1705.11035) 指出，有一個 $O(n\log n)$ 時間複雜度的分而治之演算法能夠找出答案。

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;

class Point {
public:
  LL x, y;
  Point(LL _x = 0, LL _y = 0) : x(_x), y(_y) {}
  Point operator+(const Point &p) const { return Point(x + p.x, y + p.y); }
  Point operator-(const Point &p) const { return Point(x - p.x, y - p.y); }
  bool operator<(const Point &p) const {
    if (x != p.x)
      return x < p.x;
    return y < p.y;
  }
  bool operator==(const Point &p) const { return x == p.x && y == p.y; }
  friend istream &operator>>(istream &cin, Point &p) {
    cin >> p.x >> p.y;
    return cin;
  }
};

LL cross(const Point &p, const Point &q) { return p.x * q.y - p.y * q.x; }

LL seen_largest_area;
LL Triangle(Point A, Point B, Point C) {
  LL v = cross(A, B) + cross(B, C) + cross(C, A);
  v = v > 0 ? v : -v;
  seen_largest_area = max(seen_largest_area, v);
  return v;
}

void ComputeConvexHull(vector<Point> &hull, const vector<Point> &points) {
  hull.clear();
  for (auto &p : points) {
    while (hull.size() >= 2 &&
           cross(hull.back() - hull[hull.size() - 2], p - hull.back()) <= 0)
      hull.pop_back();
    hull.push_back(p);
  }
}

int main() {
  int N;
  cin >> N;
  vector<Point> p(N);
  for (int i = 0; i < N; i++)
    cin >> p[i];
  sort(p.begin(), p.end());
  p.resize(unique(p.begin(), p.end()) - p.begin());
  vector<Point> upper_hull, lower_hull;
  ComputeConvexHull(lower_hull, p);
  reverse(p.begin(), p.end());
  ComputeConvexHull(upper_hull, p);
  for (size_t i = 1; i + 1 < upper_hull.size(); i++)
    lower_hull.push_back(upper_hull[i]);

  size_t M = lower_hull.size();
  for (size_t i = 0; i < M; i++)
    lower_hull.push_back(lower_hull[i]);

  seen_largest_area = 0;
  for (size_t i = 0; i < M; i++)
    for (size_t j = i + 1, k = j; j < i + M; j++) {
      while (k < i + M &&
             Triangle(lower_hull[i], lower_hull[j], lower_hull[k + 1]) >
                 Triangle(lower_hull[i], lower_hull[j], lower_hull[k]))
        ++k;
    }
  printf("%.9f\n", (double)seen_largest_area / 2.0);
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！