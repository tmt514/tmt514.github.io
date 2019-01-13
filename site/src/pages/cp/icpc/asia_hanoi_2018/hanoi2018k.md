---
category: "prob"
code: "ICPC-HANOI-2018-K"
path: "/problem/icpc/asia_hanoi_2018/K"
title: "Kingdom of Kittens"
date: '2019-01-11'
difficulty: 8
description: |
    給定平面上 $n$ ($1\le n\le 10^5$) 個點，判斷是否存在一個三角形，使得所有點都在這個三角形的邊界或頂點上？

link: "https://open.kattis.com/problems/kingdomofkittens"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
    - 'geometry'
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入可能包含多組測試資料。每一組測試資料第一列包含一個正整數 $n$，接下來有 $n$ 列分別包含兩個整數 $x_i, y_i$ （$-10^9\le x_i, y_i\le 10^9$）。

## 輸出說明


### 範例輸入

```
4
0 0
0 2
2 0
2 2
5
0 0
0 2
2 0
2 2
1 1
0
```

### 範例輸出

```
YES
NO
```

## OJ 連結

* [Open Kattis - Kingdom of Kittens](https://open.kattis.com/problems/kingdomofkittens)

**題目出處**：ICPC 2018 Asia Hanoi Regional

---

## 解法

唉。這種痛苦的計算幾何題好像似曾相識（遠目）

這題的難點在於特別的 case 也太多了，尤其是，三角形可以有某個邊上面只包含一個點的情況。

比我的作法簡單的方法應該有很多很多種。今天就獻醜了。**如果有更好的解法歡迎提供！**

我的作法是：先計算一個凸包（這個凸包上的點如果 $>6$ 個那就沒救了），然後找出哪些凸包上的邊「一定要出現在三角形裡面」。可能有 0~3 條。然後依據剩下的、沒有被這些邊蓋到的點，分成幾種情形討論。

* 假定答案三角形的三條邊都來自凸包上面邊的延伸，那麼需要一個方法判斷：是否真的把這三條邊延伸以後可以圍住所有點。
* 假定答案三角形的兩條邊來自凸包上的邊，那麼把邊上的點去掉以後，最多只會剩下一個點，我們需要另一個方法，判斷這種情形是否存在解。
* 假定答案三角形的一條邊來自凸包上的邊，那麼凸包大小 $\le 4$，此時保證有解。

### 一些好用的測資

```
7
2 0
1 1
0 2
8 0
9 1
10 2
5 3
7
0 0
0 1
0 2
1 0
2 0
3 1
4 3
8
0 0
0 1
0 2
1 2
2 2
2 1
2 0
1 0
5
1 0
2 0
3 0
1 6
2 6
7
0 0
0 0
0 0
0 0
0 0
0 0
0 0
6
1 0
2 0
3 0
2 6
3 6
4 6
7
1 0
2 0
3 0
3 3
0 1
0 2
0 3
7
0 2
1 1
2 0
7 0
8 1
9 2
5 -1
7
0 2
1 1
2 0
3 0
4 0
5 1
6 2
7
0 2
1 0
2 0
3 0
4 1
5 2
7 8
7
0 2
1 0
2 0
3 0
4 1
5 2
7 10
7
0 2
1 0
2 0
3 0
4 1
5 2
7 9
8
0 0
0 1
0 2
1 0
1 4
2 0
2 1
2 2
7
0 0
0 1
0 2
1 0
2 0
1 3
2 3
6
0 0
0 1
5 0
5 10
1 9
4 10
6
0 0
0 1
0 2
6 0
2 0
5 0
5
0 0
0 1
0 2
0 3
0 4
6
0 0
0 1
1 0
2 3
3 2
3 3
4
0 0
0 2
2 0
1 1
4
0 0
0 2
2 0
2 2
5
0 0
0 2
2 0
2 2
1 1
0
```

答案應該要是

```
YES
NO
NO
YES
YES
NO
YES
NO
NO
YES
NO
NO
NO
NO
NO
YES
YES
YES
YES
YES
NO
```

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long double Double;

class Point {
  public:
    long long x, y;
    
    Point(long long _x=0, long long _y=0): x(_x), y(_y) {}
    Point operator+(const Point &q) const {
      return Point(x + q.x, y + q.y);
    }
    Point operator-(const Point &q) const {
      return Point(x - q.x, y - q.y);
    }
    bool operator<(const Point &q) const {
      if (x != q.x) return x < q.x;
      return y < q.y;
    }
    bool operator==(const Point &q) const {
      return x == q.x && y == q.y;
    }
    Double length() const {
      return sqrtl(x*x+y*y);
    }
  friend istream& operator>>(istream& in, Point& p) {
    in >> p.x >> p.y;
    return in;
  }
    
};


long long cross(const Point &p, const Point &q) {
  return p.x * q.y - p.y * q.x;
}
long long dot(const Point &p, const Point &q) {
  return p.x * q.x + p.y * q.y;
}

Double GetAngle(const Point &u, const Point &v) {
  Double t = ((Double)dot(u, v) / u.length() / v.length());
  return acosl(t);
}

bool CheckInvalid(const vector<Point> &angles) {
  for (size_t i=0;i<angles.size();i++)
    for(size_t j=i+1;j<angles.size();j++)
      if(cross(angles[i], angles[j]) == 0)
        return true;

// 這邊判斷逆時針的三個方向是否真的可以湊成一個涵蓋凸包範圍的三角形。
  if (angles.size() == 3) {
    bool f0 = (cross(angles[0], angles[1]) < 0)^(cross(angles[0], angles[2]) < 0);
    bool f1 = (cross(angles[1], angles[0]) < 0)^(cross(angles[1], angles[2]) < 0);
    bool f2 = (cross(angles[2], angles[0]) < 0)^(cross(angles[2], angles[1]) < 0);
    if (!f0 || !f1 || !f2)
      return true;
  }
  return false;
}

vector<Point> p;

bool IsRightTurn(int A, int B, int C) {
  return cross(p[B]-p[A], p[C]-p[B]) <= 0;
}

bool solve() {
  int N;
  cin >> N;
  if (N == 0) return false;

  p.resize(N);
  for (int i = 0; i < N; i++) cin >> p[i];
  sort(p.begin(), p.end());
  
  N = unique(p.begin(), p.end()) - p.begin();
  p.resize(N);

  if (N <= 3) {
    cout << "YES" << '\n';
    return true;
  }

  deque<int> cvx, cvx_upper;
  for(int i=0;i<N;i++) {
    while (cvx.size() >= 2 &&
        IsRightTurn(cvx[cvx.size()-2], cvx[cvx.size()-1], i)) {
      cvx.pop_back();
    }
    cvx.push_back(i);
  }
  for(int i=N-1;i>=0;i--) {
    while (cvx_upper.size() >= 2 &&
        IsRightTurn(cvx_upper[cvx_upper.size()-2], cvx_upper[cvx_upper.size()-1], i)) {
      cvx_upper.pop_back();
    }
    cvx_upper.push_back(i);
  }
  for(size_t i=1;i+1<cvx_upper.size();i++) cvx.push_back(cvx_upper[i]);
  
  while (cvx.size() >= 3 &&
      IsRightTurn(cvx[cvx.size()-1], cvx[0], cvx[1])) {
    cvx.pop_front();
  }

  // 超過六條邊就一定是 NO 了。
  if (cvx.size() > 6) {
    cout << "NO" << endl;
    return true;
  }
  

  
  // 所有點都要在凸包上，並紀錄哪些凸包上的邊有點。
  vector<bool> has_edge(cvx.size(), false);
  cvx.push_back(cvx[0]);
  for (int i = 0; i < N; i++) {
    int ok = false;
    for (size_t j = 0; j+1 < cvx.size(); j++) {
      if (cross(p[cvx[j]]-p[i], p[i]-p[cvx[j+1]]) == 0) {
        if (cvx[j] != i && cvx[j+1] != i) {
          has_edge[j] = true;
        }
        ok = true;
      }
    }
    if (!ok) {
      cout << "NO" << '\n';
      return true;
    }
  }
  
  // 如果是共線或三角形的情形，就一定是 YES 了。
  if (has_edge.size() <= 3) {
    cout << "YES" << endl;
    return true;
  }
  

  // 檢查必須擁有的邊是否都不平行。
  int cnt = 0;
  vector<Point> angles;
  for (size_t i = 0; i+1 < cvx.size(); i++) {
    if (has_edge[i]) {
      angles.push_back(p[cvx[i+1]]-p[cvx[i]]);
      ++cnt;
    }
  }
  if (cnt > 3 || CheckInvalid(angles)) {
    cout << "NO" << endl;
    return true;
  }

  
  // 少於五條邊不一定是 YES。
  // 如果兩條邊固定了，看看是否還有兩個以上還沒蓋到的點。
  vector<int> empty_point;
  if(!has_edge[0] && !has_edge.back()) empty_point.push_back(0);
  for (size_t i=1;i+1<cvx.size();i++) {
    if(!has_edge[i] && !has_edge[i-1]) {
      empty_point.push_back(i);
    }
  }

  if (empty_point.empty()) {
    cout << "YES" << endl;
    return true;
  }


  if (cnt == 3 && !empty_point.empty()) {
    cout << "NO" << endl;
    return true;
  }

  // Case #9 有這個
  if (has_edge.size() == 5 && cnt == 2) {
    if (empty_point.size() == 2) {
      if (empty_point[1] != empty_point[0]+1 &&
          (empty_point[0] != 0 ||
           empty_point[1] != (int)has_edge.size()-1)) {
        cout << "NO" << endl;
        return true;
      }
      if (empty_point[1] == (int)has_edge.size()-1 && empty_point[0] == 0)
        swap(empty_point[0], empty_point[1]);
      angles.push_back(p[cvx[empty_point[1]]]-p[cvx[empty_point[0]]]);
      if (CheckInvalid(angles)) {
        cout << "NO" << endl;
        return true;
      } else {
        cout << "YES" << endl;
        return true;
      }
    }
  }


  // 如果兩條邊固定了，取決於剩下那個點出現在那一邊。
  if (cnt == 2 && empty_point.size() == 1 && has_edge.size() == 5) {
    
    int i = empty_point[0];
    Point first = p[cvx[(i+2)%5]] - p[cvx[(i+1)%5]];
    Point second = p[cvx[(i+4)%5]] - p[cvx[(i+3)%5]];
    
    if (cross(first, second) <= 0) {
      cout << "NO" << endl;
      return true;
    }
    
  }



  // 剩下的情況，少於五條邊一定是 YES。
  if (has_edge.size() <= 5) {
    cout << "YES" << endl;
    return true;
  }




  // 只剩下兩種可能。
  // 1. 考慮偶數位置的邊。
  vector<Point> odds = { p[cvx[1]]-p[cvx[0]],
    p[cvx[3]]-p[cvx[2]],
    p[cvx[5]]-p[cvx[4]]};

  if (CheckInvalid(odds) == false) {
    bool alleven = (!has_edge[1] && !has_edge[3] && !has_edge[5]);
    if (alleven) {
      cout << "YES" << '\n';
      return true;
    }
  }
  
  
  // 2. 考慮奇數位置的邊。
  vector<Point> evens = { p[cvx[2]]-p[cvx[1]],
    p[cvx[4]]-p[cvx[3]],
    p[cvx[0]]-p[cvx[5]]};
  
  
  if (CheckInvalid(evens) == false) {
    bool allodd = (!has_edge[0] && !has_edge[2] && !has_edge[4]);
    if (allodd) {
      cout << "YES" << '\n';
      return true;
    }
  }
  cout << "NO" << '\n';
  return true;
}

int main() {
  while (solve());
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！