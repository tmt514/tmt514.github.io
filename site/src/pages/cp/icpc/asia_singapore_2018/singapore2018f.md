---
category: "prob"
code: "ICPC-SINGAPORE-F"
path: "/problem/icpc/asia_singapore_2018/F"
title: "Wi Know" 
date: '2019-01-15'
difficulty: 4
description: |
    給你一個長度為 $N$ 的序列 $S_1, S_2, \ldots, S_N$，請找出字典順序最小的 $(A, B)$ 配對，使得 $A\neq B$ 而且這個序列包含至少一個子序列 $A, B, A, B$。

link: "https://open.kattis.com/problems/wiknow"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含一個正整數 $N$ ($1\le N\le 400000$)。
第二列開始有 $N$ 列，每一列包含一個正整數 $S_i$ ($1\le S_i\le N$)。

## 輸出說明

若存在答案，請輸出 $A, B$ 之值。若不存在形如 $A, B, A, B$ 的子序列，輸出 `-1`。

### 範例輸入 1

```
8
1
3
2
4
1
5
2
4
```

### 範例輸出 1

```
1 2
```

### 範例輸入 2

```
8
1
2
3
4
5
6
7
1
```

### 範例輸出 2

```
-1
```

### 範例輸入 3

```
4
2
1
2
1
```

### 範例輸出 3

```
2 1
```

## OJ 連結

* [Open Kattis - Wi Know](https://open.kattis.com/problems/wiknow)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

我們可以先做出以下觀察：如果存在至少一組交錯的子序列 A, B, A, B，那麼可以選取接連出現的某兩個 A、以及接連出現的某兩個 B，他們仍然是一個交錯出現的子序列。

於是，對於每個數字 X 我們可以把所有 X 出現的位置表達成許多區間。這個題目便轉化為找字典順序最小的兩個相交的區間。

我們可以利用「掃描線」的概念，從右到左，維護目前跨過這條掃描線的區間們。如果現在有一個區間緊貼著掃描線，如下圖黑色部份：

<mysvg width="400" height="200" viewbox="0 0 400 200">
<line x1="200" x2="200" y1="0" y2="200" stroke="black" stroke-dasharray="3"></line>
<text x="200" y="16">A</text>
<text x="100" y="16">A</text>
<line x1="200" x2="100" y1="20" y2="20" stroke-width="4pt"  stroke="black"></line>
<text x="150" y="46" fill="red">B</text>
<text x="230" y="46" fill="red">B</text>
<line x1="150" x2="230" y1="50" y2="50" stroke-width="4pt"  stroke="red"></line>
<circle cy="50" cx="350" r="10" fill="none" stroke-width="4pt"  stroke="red"></circle>
<text x="170" y="76" fill="gold">C</text>
<text x="260" y="76" fill="gold">C</text>
<line x1="170" x2="260" y1="80" y2="80" stroke-width="4pt"  stroke="gold"></line>
<circle cy="80" cx="350" r="10" fill="none" stroke-width="4pt"  stroke="gold"></circle>
<text x="270" y="106" fill="green">D</text>
<text x="60" y="106" fill="green">D</text>
<line x1="270" x2="60" y1="110" y2="110" stroke-width="4pt"  stroke="green"></line>
<path d="M 340,100 L 360,120 M 340,120 L 360,100" stroke-width="4pt"  stroke="green"></path>
<text x="120" y="136" fill="blue">E</text>
<text x="240" y="136" fill="blue">E</text>
<line x1="120" x2="240" y1="140" y2="140" stroke-width="4pt"  stroke="blue"></line>
<circle cy="140" cx="350" r="10" fill="none" stroke-width="4pt"  stroke="blue"></circle>
</mysvg>

那麼我們只要找出與黑色區間相交的「最小編號」區間就可以了！實作上我們維護一個區間樹，當掃描線從右掃到左的時候，先將「離開的區間」刪掉，然後再依據當前區間 $[\ell, r]$，查詢現在「左界 $>\ell$」的區間編號最小值。然後再將當前區間左界加入區間樹。

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;

// 關於區間樹的操作：依序為插入、刪除、詢問。
const int LEAF_OFFSET = (1<<19);
int tree[(1<<20)];
inline int GetMinLabel(int l, int r) {
  if (l == 0 || r == 0) return l+r;
  return min(l, r);
}
void Insert(int x, int label) {
  x += LEAF_OFFSET;
  tree[x] = label;
  for (x/=2; x; x/=2)
    tree[x] = GetMinLabel(tree[x*2], tree[x*2+1]);
}
void Remove(int x) {
  x += LEAF_OFFSET;
  tree[x] = 0;
  for (x/=2; x; x/=2)
    tree[x] = GetMinLabel(tree[x*2], tree[x*2+1]);
}
int Query(int l) {
  l += LEAF_OFFSET;
  int ans = tree[l];
  while (l) {
    if (l%2==0)
      ans = GetMinLabel(ans, tree[l+1]);
    l/=2;
  }
  return ans;
}


// 紀錄輸入的序列。
int S[400005];
vector<int> positions[400005];

pair<int, int> best = {-1, -1};
void UpdateSolution(int A, int B) {
  if (best.first == -1 || best > make_pair(A, B)) {
    best = {A, B};
  }
}

void OutputAnswer() {
  if (best.first == -1) cout << "-1" << endl;
  else cout << best.first << " " << best.second << endl;
}

int main() {
  int N;
  cin >> N;
  for (int i = 0; i < N; i++) {
    cin >> S[i];
    positions[S[i]].push_back(i);
  }
  for (int i = N-1; i >= 0; i--) {
    int A = S[i];
    positions[A].pop_back();
    Remove(i);
    if (!positions[A].empty()) {
      int B = Query(positions[A].back());
      if (B > 0) UpdateSolution(A, B);
      Insert(positions[A].back(), A);
    }
  }
  OutputAnswer();
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！