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

這題一個直接的想法就是從最前面開始，依序在空格（$P_i=0$ 處）填上 $-1$，並看看是否違反任何一個條件。但直接做要花 $O(NK)$ 的時間，所以實際上我們需要對每個條件 $j$ 維護一個值 ${\mathit{remain}}=$「再補幾個 $-1$ 就不夠了」。

假設我們現在填到第 $i$ 個位置了。令 $S$ 為目前與這個位置有關的所有條件形成的集合。我們考慮 $S$ 內所有條件的 ${\mathit{remain}}$ 值。如果當前有某個 ${\mathit{remain}} < 0$，代表沒救了；如果當前有某個 ${\mathit{remain}}=0$，代表這格一定要填上 $1$，否則的話，我們總是可以貪婪地把這格填上 $-1$、並且把所有 $S$ 內條件的 ${\mathit{remain}}$ 值通通減 $1$。（這一步可以透過宣告並維護一個全域變數 ${\mathit{offset}}$，在常數時間內辦到把所有條件 ${\mathit{remain}}$ 值通通 $-1$）。判斷是否存在 ${\mathit{remain}}=0$ 就相當於判斷集合 $S$ 裡面的最小值是否 $=0$，這個可以透過一個 heap 辦到。

於是，整個演算法就可以在 $O(N + K\log K)$ 時間內完成。

### 從後面改回來

另一個我覺得在演算法上面很實用的方法——拖延法（Lazy Evaluation，總是拖到最後一刻才作必要的改變），也可以用在這題當中。

我們先把所有能夠填數字的地方全部填上 $-1$，然後逐一檢視每個條件 $(A_i, B_i, C_i)$，如果這個條件沒有被滿足，那我們便貪心地從 $B_i$ 往回查看，把所有能改的 $-1$ 依序改成 $1$，直到條件被滿足為止。如果按照**右界** $B_i$ 由小到大依序把條件加進去的話，每一次把 $-1$ 改成 $1$ 的過程，都保證會造福未來的條件，因此感情上我們可以得到字典順序最小的解。

檢查一個條件需要計算一段連續和，如果不想花太多力氣的話，一個簡單的 [Fenwick Tree(BIT)](https://zh.wikipedia.org/wiki/%E6%A0%91%E7%8A%B6%E6%95%B0%E7%BB%84) 就可以達到目標。

我們注意到，當我們決定要把一個 $-1$ 改成 $1$ 的時候，這個數字就再也不會更改了。按照右界順序考慮條件還有第二個好處：可以把「仍然可改」的位置丟進一個**堆疊**裡面，這個堆疊最上面的索引就恰好是距離當前右界最接近的一個。每一次需要把一個 $-1$ 變成 $1$ 就從這個堆疊上面拿 index 就好。

堆疊的部分時間複雜度是 $O(N)$，對於每一個條件來說，除了修改 $-1$ 以外，其餘要花的時間只有一開始計算區間和所需的時間，因此整體時間複雜度為 $O(N+K\log N)$。

### 參考程式碼

```cpp
#include <iostream>
#include <vector>
using namespace std;

int input[100005];
int now[100005];
vector<pair<int, int>> hook[100005];
vector<int> stack;
int N, K;

// 一個活生生、跳脫框架（好像不太應該）的 Fenwick Tree。
int bit[100005];

// 把 x 這格的值加上 v。
void add(int x, int v) {
  while (x <= N) {
    bit[x] += v;
    x += (x & -x);
  }
}

// 計算序列前 x 項的總和。
int ask(int x) {
  int ret = 0;
  while (x) {
    ret += bit[x];
    x -= (x & -x);
  }
  return ret;
}

// 計算序列從第 l 項到第 r 項的總和。
int ask(int l, int r) { return ask(r) - ask(l - 1); }

int main() {
  cin >> N >> K;
  for (int i = 1; i <= N; i++) cin >> input[i];
  for (int i = 1; i <= N; i++) now[i] = (input[i] != 0 ? input[i] : -1);
  for (int i = 1; i <= N; i++) add(i, now[i]);
  // 把所有條件依照右界的順序
  for (int i = 0; i < K; i++) {
    int l, r, c;
    cin >> l >> r >> c;
    hook[r].push_back({l, c});
  }
  for (int i = 1; i <= N; i++) {
    // 如果現在這格是空的，就把註標塞進堆疊裡備用。
    if (input[i] == 0) stack.push_back(i);
    
    // 逐一掃過所有右界在 i 的條件，並試圖滿足他們。
    for (auto [l, c] : hook[i]) {
      int v = ask(l, i);
      // 如果當前總和仍不達 c，就必須把最接近的 -1 改成 1。
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

稍微多想一下下，這題其實可以做到 $O(N+K)$。不過以這題的範圍而言，$O(N+K\log N)$ 或 $O(N+K\log K)$ 都相當足夠了。大致作法如下：首先經過線性時間預處理，把已經固定數值的地方全部處理掉。因此題目可以轉化為在一個空的序列上指定 $\pm 1$ 的數值。接下來，我們可以利用 Disjoint Set，維護已經被改成 $1$ 的所有位置（以區間的方式儲存，如果相鄰兩個位置都是 $1$，那麼這兩個位置同屬一個 Set。）

<display
  array
  min-width='32'
  fixedwidth
  uihelper-content-map='{
        "1":{fill: "#FA8"},
    }'
  data='["-1", "-1", "-1", "1", "1", "-1", "1", "1", "-1", "-1", "-1", "1", "1", "1", "-1"]'>
</display>
  
因此計算連續和的任務就等價於紀錄當前區間「左方」（包含自己）的區間長度總和。這個「左方區間長度總和」的值，很幸運地不會頻繁地被更新（因為更新只會從已考慮過的位置最右邊開始，也就是當前的最右邊的區間。）

<display
  array
  min-width='32'
  fixedwidth-ratios='[1,1,1,2,1,2,1,1,1,3,1]'
  data='[0, 0, 0, "2", 2, "4", 4, 4, 4, "7", 7]'>
</display>

Disjoint Set Union 的演算法在這個情形下（每一次只 Union 相鄰兩個區間）是可以做到 worst-case $O(1)$ 的。

### 關於 Greedy 演算法的正確性證明

這真的真的很恐怖。不要問。

Greedy 演算法是一類，通常直覺上很對，證明起來卻很崩潰的一類演算法（一淚眼算法）。可以參考 [Stack Exchange](https://cs.stackexchange.com/questions/59964/how-to-prove-greedy-algorithm-is-correct)、[康乃爾大學講義](http://www.cs.cornell.edu/courses/cs482/2007su/exchange.pdf)、[史丹佛大學講義](https://web.stanford.edu/class/archive/cs/cs161/cs161.1138/handouts/120%20Guide%20to%20Greedy%20Algorithms.pdf)對於證明貪婪演算法的正確性所下的註解。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！