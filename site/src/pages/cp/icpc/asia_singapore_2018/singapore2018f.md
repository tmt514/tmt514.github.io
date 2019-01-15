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

**題目出處**：ICPC 2018 Asia Hanoi Regional

---

## 解法

<display
    binary-tree
    complete
    numbered
    depth='5'
    data='{
        structure: [[1, 2], [3, 4], [5, 6], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],
        value: ["0", "1", "2", "3", "4", "5", "6"],
    }'></display>

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