---
category: "prob"
code: "ICPC-2018-SEOUL-L"
path: "/problem/icpc/asia_seoul_2018/L"
title: "Working Plan"
date: '2019-01-22'
difficulty: 3
description: |
    ICPC manager 要展開一個為期 $n$ 天的企劃。總共有 $m$ 個員工，而第 $j$ 天需要恰好 $d_j$ 位員工出勤工作。此外，對於第 $i$ 位員工，他有希望的工作天數 $w_i$。

    為了讓企劃順利進行，官方規定：

    1. 每一位員工每一次都連續出勤**恰好** $w$ 天，而且
    2. 對於同一位員工，兩次連續出勤日之間，必須要至少間隔 $h$ 天。

    ICPC manager 希望能夠做出一個排班計畫表，讓每個人的工作天數恰好是 $w_i$（$w_i$ 會是 $w$ 的倍數）、出勤人數恰好符合人力需求、而且也滿足上述兩項官方規定。

    請你寫一個程式找出一個可行的排班計畫。

link: "https://codeforces.com/gym/102070"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含四個整數 $m, n, w, h$ ($1\le m\le 2000, 1\le n\le 2000, 1\le w, h\le n$)。第二列包含 $m$ 個整數，第 $i$ 個整數為 $w_i$（保證會是 $w$ 的倍數）。第三列包含 $n$ 個整數，第 $j$ 個整數為 $d_j$ ($0\le d_j\le m$)。

## 輸出說明

如果存在一個可行的排班計畫，輸出 `1`，否則輸出 `-1`。若存在一組排班計畫，那請接著輸出 $m$ 列，第 $i$ 列包含嚴格遞增的 $w_i/w$ 個整數，表示第 $i$ 位員工被安排到這些日子開始他的 $w$ 天工作期。

### 範例輸入

```
4 9 2 1
4 4 6 2
1 3 2 1 2 1 1 3 2
```

### 範例輸出

```
1
1 8
2 7
2 5 8
4
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/102070)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

注意到每一次工作都是連續恰好 $w$ 天，這會讓題目便得非常簡單：我們可以用 Greedy 從最早的時間刷過去。每一次找到一個新的、還沒有人做的工作時段，然後挑一個人做下去連續做 $w$ 天。要挑選誰呢？最直覺的辦法就是挑選目前剩餘工作量最大的那個人。我們可以用一個 priority queue 來維護這件事情。

如此一來時間複雜度便可能達到 $O(nm + \frac{nm}{w}\log m)$，感覺上再用力一點的話，可以把 priority queue 的部份壓掉，變成 $O(nm)$、甚至更好。

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  int m, n, w, h;
  cin >> m >> n >> w >> h;
  vector<int> ws(m), d(n + 1);
  for (int i = 0; i < m; i++) {
    cin >> ws[i];
    ws[i] /= w;
  }
  for (int i = 1; i <= n; i++)
    cin >> d[i];
  vector<int> jobs;
  vector<vector<int>> schedule(m);
  int bad = 0;
  for (int i = 1; !bad && i <= n; i++) {
    if (d[i] > 0 && i + w - 1 > n) {
      bad = 1;
      break;
    }
    while (d[i] > 0) {
      jobs.push_back(i);
      for (int j = 0; j < w; j++) {
        if (--d[i + j] < 0)
          bad = 1;
      }
    }
  }

  priority_queue<pair<int, int>> s;
  for (int i = 0; i < m; i++)
    s.push({ws[i] - schedule.size(), i});
  vector<vector<pair<int, int>>> delay(n + 1);
  int now = 0;

  for (int t : jobs) {
    while (now <= t) {
      for (auto x : delay[now])
        s.push(x);
      now++;
    }
    if (s.empty()) {
      bad = 1;
      break;
    }
    auto [remain, i] = s.top();
    s.pop();
    schedule[i].push_back(t);
    if (t + w + h <= n)
      delay[t + w + h].push_back({remain - 1, i});
  }
  for (int i = 0; i < m; i++) {
    if (schedule[i].size() != ws[i])
      bad = 1;
  }
  if (bad) {
    cout << "-1" << endl;
  } else {
    cout << "1";
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < schedule[i].size(); j++) {
        cout << (j == 0 ? '\n' : ' ');
        cout << schedule[i][j];
      }
    }
    cout << '\n';
  }
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！