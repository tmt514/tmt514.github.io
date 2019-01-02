---
category: "prob"
code: "ICPC-JAKARTA-2018-H"
path: "/problem/icpc/asia_jakarta_2018/H"
title: "Lexical Sign Sequence"
date: '2019-01-05'
difficulty: 5
description: |
    給你一個包含 $0, 1, -1$ 的序列 $P$，你的任務是要把所有 $0$ 換成 $\pm 1$，並同時滿足以下 $K$ 個條件：每一個條件由三個整數 $A_i, B_i, C_i$ 描述之，表示從第 $A_i$ 個數加至第 $B_i$ 個數的總和，必須要 $\ge C_i$。

    若有解，請輸出字典順序最小的序列。否則的話輸出 `Impossible`。
    
link: "https://codeforces.com/gym/102001/problem/H"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Jakarta Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入的第一列包含兩個整數 $N, K$ ($1\le N\le 100000; 0\le K \le 100000$) 代表序列的長度與條件的數量。第二列包含 $N$ 個整數 $P_i$ ($-1\le P_i\le 1$)，若 $P_i=0$ 代表第 $i$ 個位置還沒有決定是 $-1$ 還是 $1$，否則的話 $P_i$ 的值已經固定了。接下來的 $K$ 列每一列包含三個整數 $A_i, B_i, C_i$ ($1\le A_i \le B_i\le N; -N\le C_i\le N$)。

## 輸出說明

若這樣的序列存在，輸出 $N$ 個以空白隔開的整數。否則輸出 `Impossible`。

### 範例輸入 1

```
3 2
0 0 0
1 2 2
2 3 -1
```

### 範例輸出 1

```
1 1 -1
```

### 範例輸入 2

```
3 2
0 -1 0
1 2 2
2 3 -1
```

### 範例輸出 2

```
Impossible
```

## OJ 連結

* [Codeforces Gym 102001 - H](https://codeforces.com/gym/102001/problem/H)


---

## 解法

通常要找出最小的字典順序的題目，絕對與 Greedy 演算法脫不了干係。

### 從前面填過去

這題一個直接的想法就是從最前面開始，依序在空格（$P_i=0$ 處）填上 $-1$，並看看是否違反任何一個條件。但直接做要花 $O(NK)$ 的時間，所以實際上

### 從後面改回來



### 參考程式碼

```cpp
#include <iostream>
#include <vector>
using namespace std;

int input[100005];
int now[100005];
int bit[100005];
vector<pair<int, int>> hook[100005];
vector<int> stack;
int N, K;

void add(int x, int v) {
  while (x<=N) {
    bit[x]+=v;
    x += (x&-x);
  }
}

int ask(int x) {
  int ret = 0;
  while (x) {
    ret += bit[x];
    x -= (x&-x);
  }
  return ret;
}

int ask(int l, int r) {
  return ask(r) - ask(l-1);
}

int main() {
  cin >> N >> K;
  for (int i = 1; i <= N; i++) cin >> input[i];
  for (int i=1;i<=N;i++) now[i] = (input[i]!=0? input[i]: -1);
  for (int i=1;i<=N;i++) add(i, now[i]);
  for (int i = 0; i < K; i++) {
    int l, r, c;
    cin >> l >> r >> c;
    hook[r].push_back({l, c});
  }
  for (int i = 1; i <= N; i++) {
    if (input[i] == 0) stack.push_back(i);
    for (auto [l, c]: hook[i]) {
      int v = ask(l, i);
      while (v < c) {
        if (stack.empty() || stack.back() < l) {
          puts("Impossible");
          return 0;
        }
        v += 2;
        now[stack.back()] = 1;
        add(stack.back(), 2);
        stack.pop_back();
      }
    }
  }
  for (int i = 1; i <= N; i++) {
    cout << now[i] << ' ';
  }
  cout << endl;
  return 0;
}
```

### 備註

稍微多想一下下，這題其實可以做到 $O(N+K)$。不過以比賽而言，$O((N+K)\log N)$ 很夠了。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！