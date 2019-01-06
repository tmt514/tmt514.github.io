---
category: "prob"
code: "ICPC-JAKARTA-2018-J"
path: "/problem/icpc/asia_jakarta_2018/J"
title: "Future Generation"
date: '2019-01-06'
difficulty: 4
description: |
    給你 $N$ ($1\le N\le 15$) 個字串 $S_1, \ldots, S_N$ ($1\le |S_i| \le 15$)。現在請你對於每一個字串 $S_i$，找出一個非空的子序列 $A_i$，使得 $A_1, A_2, \ldots, A_N$ 依照字典順序是嚴格遞增的。

    輸出最大的 $|A_1|+|A_2|+\cdots + |A_N|$ 之值。若無解的話要輸出 `-1`。
    
link: "https://codeforces.com/gym/102001/problem/J"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Jakarta Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含一個正整數 $N$ ($1\le N\le 15$)。第二列開始有 $N$ 列，每一列包含一個僅由大寫字母組成的字串 $S_i$ ($1\le |S_i|\le 15$)
。

## 輸出說明

輸出最大的 $|A_1|+|A_2|+\cdots + |A_N|$ 之值。若無解的話要輸出 `-1`。

### 範例輸入 1

```
3
KARIM
PARBUDI
CHANDRA
```

### 範例輸出 1

```
16
```

### 範例輸入 2

```
2
ZORO
ANDI
```

### 範例輸出 2

```
-1
```

### 範例輸入 3

```
7
HAVE
FUN
IN
ICPC
JAKARTA
TWENTY
EIGHTEEN
```

### 範例輸出 3

```
25
```

## OJ 連結

* [Codeforces Gym 102001 - J](https://codeforces.com/gym/102001/problem/J)


---

## 解法

總之就是很直白的動態規劃囉。

對於所有 $i$，我們可以先把所有 $S_i$ 的子序列列出來，並且排序好。假設這樣的子序列有 $m_i$ 個（不難得知 $m_i < 2^{|S_i|}$），我們令這樣的序列為 $S_i^{(0)} < S_i^{(1)} < \cdots < S_i^{(m_i-1)}$。

定義 $\dp[i][j]$ 為作到第 $i$ 個字串且選取 $A_i \le S_i^{(j)}$ 的時候，$|A_1|+\cdots + |A_i|$ 可能的最大值。此時我們可以列出遞迴式：

$$
\dp[i][j] = \begin{cases}
\max_{k:\ S_{i-1}^{(k)} < S_i^{(j)}} \left\{ \dp[i-1][k] + |S|\right\} \\
\dp[i][j-1] & \text{考慮結束在字典順序更小的情形。}
\end{cases}
$$

注意到此時 $\dp[i][0], \dp[i][1], \ldots$ 這是一個非遞減的序列。因此要讓 $\dp[i-1][k] + |S|$ 的值最大，就等價於讓 $k$ 的值盡量大！

實作上由於 $j$ 變大的時候，對應的 $k$ 也非遞減，我們可以利用 two pointer 的技巧，維護 $j$ 和 $k$ 兩個足標。在 $O(|S_i|\times 2^{|S_i|})$ 的時間更新一整排的 $\dp[i][0, \ldots, m-1]$ 值（在兩個足標追趕的過程中，由於每次都是比較兩個字串，所以需要花 $O(|S_i|)$ 的時間推進一個足標）。因此整體時間複雜度為 $O(\sum_{1\le i\le N} |S_i| 2^{|S_i|}) \approx O(15^2\times 2^{15})$。




### 參考程式碼

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;

string S[15];
vector<string> a[15];
int dp[15][1<<15];

// 產生一個字串的所有子序列。
void GetAllSubstrings(string s, vector<string>& result) {
  result.push_back("");
  for (int i = 0; i < (int)s.size(); i++) {
    int n = result.size();
    for (int j = 0; j < n; j++) {
      result.push_back(result[j]+s[i]);
    }
  }
  // 把找到的子序列依照字典順序排序，注意這邊 result[0] 會是空字串。
  sort(result.begin(), result.end());
}

int main() {
  int N;
  cin >> N;
  for (int i = 0; i < N; i++) cin >> S[i];
  for (int i = 0; i < N; i++) GetAllSubstrings(S[i], a[i]);

  const int INF = 1e5;
  // 初始化動態規劃的首排。
  dp[0][0] = -INF; // 不允許有空字串，所以給他 -INF。
  for (int i = 1; i < (1<<S[0].size()); i++)
    dp[0][i] = max(dp[0][i-1], (int)a[0][i].size());

  // 然後依照遞迴關係計算剩下的部份。
  for (int i = 1; i < N; i++) {
    dp[i][0] = -INF; // 一樣不允許有空字串，所以給他 -INF。
    for (int j = 1, k = 0; j < (1<<S[i].size()); j++) {
        while (k < (1<<S[i-1].size()) && a[i-1][k] < a[i][j]) ++k;
        dp[i][j] = max(dp[i][j-1], dp[i-1][k-1] + (int)a[i][j].size());
    }
  }
  
  int ans = dp[N-1][(1<<S[N-1].size())-1];
  if (ans < 0) cout << "-1" << endl;
  else cout << ans << endl;
  return 0;
}
```

### 備註

如果把所有的字串都預處理產生出來以後，用 Bucket Sort (桶子排序法) 把所有的字串全部排序起來。這麼一來就可以省下硬比較兩字串的時間，可以加速到 $O(15\times 2^{15})$。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！