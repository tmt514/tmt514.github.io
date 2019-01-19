---
category: "prob"
code: "ICPC-SINGAPORE-L"
path: "/problem/icpc/asia_singapore_2018/L"
title: "Non-Prime Factors"
date: '2019-01-19'
difficulty: 2
description: |
    給你 $Q$ 個正整數，對於每一個正整數 $n$，請你回答 $n$ 有多少個非質數的因數？

link: "https://open.kattis.com/problems/nonprimefactors"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列有一個正整數 $Q$ ($1\le Q\le 3\cdot 10^6$)。接下來的 $Q$ 列每一列有一個正整數 $i$ ($2\le i\le 2\cdot 10^6$)。

## 輸出說明

對每個詢問輸出答案於一行。

### 範例輸入 1

```
4
100
13
12
2018
```

### 範例輸出 1

```
7
1
4
2
```

## OJ 連結

* [Open Kattis - Non-Prime Factors](https://open.kattis.com/problems/nonprimefactors)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

計算總因數個數減去質因數個數就行啦。一般來說直接用篩法是 $O(N\log\log N)$ 時間<footnote goto="1" show="備註1"></footnote>，所以已經很足夠了。

在假設乘除法都是 $O(1)$ 的情形下（但可以證明 bit 數量不固定時，計算乘除必須要 $\omega(1)$ 的時間，所以理論上乘除法不應該被視為常數。）下面程式碼範例使用的是線性時間的篩法 $O(N)$。

### 參考程式碼

快速 I/O 感覺真的滿重要的。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 2000005;
vector<int> primes;
int almost_factors[N];
int prime_factors[N];
int min_power[N];
int min_prime[N];

char s[32];
void ReadInt(int &x) {
  x = 0;
  fgets(s, 32, stdin);
  for (int i=0;s[i] >= '0';i++) {
    x=x*10+s[i]-'0';
  }
}

string output;
void WriteBuffer(int y) {
  if (output.size()) output += '\n';
  output += to_string(y);
}

int main() {
  for (int i = 2; i < N; i++) {
    if (prime_factors[i] == 0) {
      primes.push_back(i);
      almost_factors[i] = 1;
      prime_factors[i] = 1;
      min_power[i] = 1;
      min_prime[i] = i;
    }
    for (int j = 0; i * primes[j] < N; j++) {
      int p = primes[j];
      if (p != min_prime[i]) {
        almost_factors[i * p] = almost_factors[i] * (min_power[i]+1);
        prime_factors[i * p] = prime_factors[i] + 1;
        min_power[i * p] = 1;
        min_prime[i * p] = p;
      } else {
        almost_factors[i * p] = almost_factors[i];
        prime_factors[i * p] = prime_factors[i];
        min_power[i * p] = min_power[i] + 1;
        min_prime[i * p] = min_prime[i];
        break;
      }
    }
  }

  int Q, x;
  //ios_base::sync_with_stdio(false);
  //cin.tie(NULL);
  //cin >> Q;
  ReadInt(Q);
  while (Q--) {
    ReadInt(x);
    WriteBuffer(almost_factors[x] * (min_power[x]+1) - prime_factors[x]);
  }
  puts(output.c_str());
  return 0;
}
```

### 備註 1<footnote here="1"></footnote>

關於篩法的時間複雜度之超單純證明，請容許我自肥一下，請參考以下連結：[https://tmt514.github.io/competitive-programming/2017/11/17/elementary-proof-on-analysis-of-eratosthenes-sieve.html](https://tmt514.github.io/competitive-programming/2017/11/17/elementary-proof-on-analysis-of-eratosthenes-sieve.html)。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！