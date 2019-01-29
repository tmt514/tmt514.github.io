---
category: "prob"
code: "ICPC-2018-NAKHON-PATHOM-H"
path: "/problem/icpc/asia_nakhon_pathom_2018/H"
title: "As Rich as Crassus"
date: '2019-01-29'
difficulty: 5
description: |
    給你三個數字 $N_1, N_2, N_3$ 以及三個餘數 $x^3\bmod N_1, x^3\bmod N_2, x^3\bmod N_3$。已知對於所有 $i=1,2,3$ 皆有 $x^3 > N_i$、而且 $N_1, N_2, N_3$ 兩兩互質。求出滿足條件的最小 $x$。

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

<display input-format
    format='multi-input'>
    <variable type='int' id='T' ge='1' le='10'></variable>
    <repeat times='T'>
        <variable array size='3' type='int' id='N' gt='0' lt='2^{21}'></variable>
        <variable array size='3' type='int' id='x^3\bmod N' ></variable>
    </repeat>
</display>


## 輸出說明

對於每筆測試資料輸出題目所求的 $x$ 值。

### 範例輸入

```
2
6 11 19
5 4 11
25 36 7
16 0 6
```

### 範例輸出

```
5
6
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/102091)

**題目出處**：ICPC 2018 Asia Nakhon Pathom Regional

---

## 解法

對於輸入的三個 $x^3\bmod N_i$ 值來說，如果我們能分別找出所有可能的 $x\bmod N_i$ ($i=1,2,3$)，那麼就可以利用[中國剩餘定理](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%89%A9%E4%BD%99%E5%AE%9A%E7%90%86)，對所有可能的組合，計算出可能的 $x$。

### 參考程式碼

這題的測試資料看起來不太嚴謹。如果有發現可能有錯誤的地方再麻煩跟我說～謝謝！

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;

LL inv(LL x, LL y, LL p = 1, LL q = 0, LL r = 0, LL s = 1) {
  return y ? p : inv(y, x % y, r, s, p - (x / y) * r, q - (x / y) * s);
}

// 使用條件：
// (1) 0 <= x1 < m1; 0 <= x2 < m2
// (2) m2 * m2 不會溢位。
// (3) 2 * m1 * m2 不會溢位。
LL CRT2(LL x1, LL m1, LL x2, LL m2) {
  LL t = inv(m1, m2);
  t %= m2;
  LL z = (t * (x2 - x1) % m2 + m2) % m2;
  return (x1 + z * m1) % (m1 * m2);
}

void solve() {
  int N[3], R[3] = {};
  for (int i = 0; i < 3; i++)
    cin >> N[i];
  for (int i = 0; i < 3; i++)
    cin >> R[i];
  vector<int> candidates[3];
  for (int i = 0; i < 3; i++)
    for (LL x = 0; x < N[i]; x++) {
      if (x * x * x % N[i] == R[i]) {
        candidates[i].push_back(x);
      }
    }
  vector<LL> sol;

  for (auto r1 : candidates[0])
    for (auto r2 : candidates[1])
      for (auto r3 : candidates[2]) {
        LL x = CRT2(r1, N[0], r2, N[1]);
        x = CRT2(x, (LL)N[0] * N[1], r3, N[2]);
        sol.push_back(x);
      }

  sort(sol.begin(), sol.end());
  int maxn = max(N[0], max(N[1], N[2]));
  for (auto s : sol)
    if (s * s > maxn || s * s * s > maxn) {
      cout << s << endl;
      break;
    }
}

int main() {
  int T;
  cin >> T;
  while (T--)
    solve();
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！