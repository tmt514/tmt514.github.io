---
category: "prob"
code: "ICPC-HANOI-2018-I"
path: "/problem/icpc/asia_hanoi_2018/I"
title: "Insider's Identity"
date: '2019-01-14'
difficulty: 6
description: |
    在一個遙遠的星球上，一個情報單位打算派遣一些間諜到地球上進行偵查任務。
    為了確保偵查任務能夠在極為機密的情形下進行，情報單位打算指派每一個間諜一個秘密 ID。
    
    每一個 ID 由一個長度為 $n$ 的 01-字串 (binary string) 組成。
    為了避免敵人的滲透，情報單位選擇了一個由 `1` 和 `*` 組成的模版 $P$，如果這個模版能夠成功與 ID 進行配對，那麼就可以判斷這個 ID 為真。
    
    對於一個字串 $S=s_1s_2\cdots s_n$ 以及一個模版 $P=p_1\cdots p_m$ 成功配對的定義如下：
    
    * 若 $m = n$，而且對所有 $i$，要嘛 $s_i=$`1` 或 $p_i=$`*`。
    * 若 $m < n$，而且在 $S$ 內部存在一個長度為 $m$ 的子字串成功與 $P$ 配對。
    
    請幫助情報單位計算總共有多少 ID 可以使用。

link: "https://open.kattis.com/problems/insidersidentity"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入的第一列包含一個正整數 $n$ $(1\le n\le 50)$ 表示 ID 的長度。
第二列有一個由 `1` 和 `*` 組成的模版字串 $P$ $(1\le |P|\le 30)$，

## 輸出說明

輸出一個正整數表示長度為 $n$ 且滿足條件 $P$ 的字串數量。

### 範例輸入 1

```
10 
1
```

### 範例輸出 1

```
1023
```

### 範例輸入 2

```
3
1*1
```

### 範例輸出 2

```
2
```

## OJ 連結

* [Open Kattis - Insider's Indentity](https://open.kattis.com/problems/insidersidentity)

**題目出處**：ICPC 2018 Asia Hanoi Regional

---

## 解法

這題一臉就是動態規劃囉。

首先，我們可以注意到由於輸入模版的 `*` 不超過 15 個，因此全部把他們枚舉出來數量大概不會太多。
考慮一個字串集合 $\mathcal{S}$，我們想要知道有多少字串，使得至少有一個子字串出現在 $\mathcal{S}$ 中，這是一個『試著不要重複計數』的技術問題。

定義 $\dp(i, \mathit{suffix})$ 表示長度為 $i$ 的字串、其後綴字串為 $\mathit{suffix}$、而且 $\mathit{suffix}$ 是所有該字串後綴字串之中，出現在 $\mathrm{prefix}(\mathcal{S})$ 集合裡面**最長**的那一個。其中 $\mathrm{prefix}(\mathcal{S})$ 是所有 $\mathcal{S}$ 前綴字串所形成的集合。於是，對於每一個 $\dp(i, \mathit{suffix})$ 我們可以考慮把該狀態**推**(push)到下一個狀態去<footnote goto="1" show="備註1"></footnote>：

$\dp(i+1, \delta(\mathit{suffix} + \texttt{"0"})) {\texttt{ += }} \dp(i, \mathit{suffix})$  
$\dp(i+1, \delta(\mathit{suffix} + \texttt{"1"})) {\texttt{ += }} \dp(i, \mathit{suffix})$

而事實上，$\mathit{suffix} + \texttt{"0"}$ 很可能不復存在於前綴集合 $\mathrm{prefix}(\mathcal{S})$ 了。
因此我們需要一個轉移函數 $\delta$，它可以幫我們不斷把字串的頭去掉，直到剩下來的字串出現在前綴集合，而此時我們不難證明這個剩下來的字串會是整個長度為 $i+1$ 字串中，最長出現在前綴集合的後綴字串（好拗口|||）

最後，如果 $\mathit{suffix} + \texttt{"0"}$ (或 $\mathit{suffix} + \texttt{"1"}$) 真的出現在 $\mathcal{S}$ 裡面了，那麼代表所有落到 $\dp(i+1, \mathit{suffix} + \texttt{"0"})$ 的字串都滿足題目要求，我們就直接把這個數量（乘上後面隨意補滿的 01-字串方法數）加到答案裡面，而不用轉移它了。

### 參考程式碼

為了加快查找的速度，我們可以一開始就把用得到的所有**狀態**與**狀態轉移**儲存下來，並且直接給他們一個編號。如此一來，實際計算動態規劃的轉移部分，可以完全使用陣列處理，提升了不少效率。

由於每一個 suffix 都是長度不超過 30 的二元字串，我們可以用 $\left(2^{\text{suffix 長度}} + \mathit{suffix}\right)$ 這個整數來儲存。而轉移、匹配都可以用位元運算來處理。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;


int main() {
  int n;
  string S;
  cin >> n >> S;

  // 枚舉所有可能的前綴集合。
  vector<int> state_space;
  function<void(int, int)> dfs = [&](int now, int i) {
    state_space.push_back(now + (1<<i));
    if (i + 1 < S.size()) {
      if (S[i] == '*') dfs(now*2, i+1);
      dfs(now*2+1, i+1);
    }
  };
  dfs(0, 0);
  sort(state_space.begin(), state_space.end());
  state_space.resize(unique(state_space.begin(), state_space.end()) - state_space.begin());


  // 產生不同長度的模版，用來比對。
  vector<int> patterns = {0};
  for (int i = 0, p = 0; i < (int)S.size(); i++) {
    p = p * 2 + (S[i] == '1');
    patterns.push_back(p);
  }
  
  // 計算下一個狀態轉移。
  const int DONE = -1;
  auto GetNextValidState = [&](int state) -> int {
    int len = 31 - __builtin_clz(state);
    for (int i = len; i >= 0; i--) {
      if ((state&patterns[i]) == patterns[i]) {
        if (i == S.size()) {
          // 如果已匹配整個字串，就可以停下來了。
          return DONE;
        } else {
          // 取得離散化後的狀態編號。
          int nxt = (1<<i) + (state & ((1<<i)-1));
          return lower_bound(state_space.begin(), state_space.end(), nxt) - state_space.begin();
        }
      }
    }
    return 1;
  };

  // 對所有狀態，列出下一個狀態的編號。
  vector<int> add0(state_space.size()), add1(state_space.size());
  for (int i = 0; i < state_space.size(); i++) {
    int state = state_space[i];
    add0[i] = GetNextValidState(state*2);
    add1[i] = GetNextValidState(state*2+1);
  }
  
  // 開始跑動態規劃。
  LL ans = 0;
  vector<LL> dp(state_space.size(), 0);
  dp[0] = 1;

  for (int i = 1; i <= n; i++) {
    vector<LL> dp_next(state_space.size(), 0);
    for (int j = 0; j < state_space.size(); j++) {
      if (add0[j] == DONE)
        ans += dp[j] * (1LL<<(n-i));
      else
        dp_next[add0[j]] += dp[j];
      if (add1[j] == DONE)
        ans += dp[j] * (1LL<<(n-i));
      else
        dp_next[add1[j]] += dp[j];
    }
    dp.swap(dp_next);
  }
  cout << ans << endl;
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！