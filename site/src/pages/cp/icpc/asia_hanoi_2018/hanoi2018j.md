---
category: "prob"
code: "ICPC-HANOI-2018-J"
path: "/problem/icpc/asia_hanoi_2018/J"
title: "Jurassic Jungle"
date: '2019-01-10'
difficulty: 6
description: |
    給你 $N$ ($3\le N\le 30$) 與 $M$ 的值，請問是否存在一個恰好有 $N$ 個點與 $M$ 條邊的無向簡單圖，滿足條件：從**任意**一個節點出發、每次隨意挑選新的節點走訪、而走出來的 DFS 樹都是一條鍊（path），而且那個唯一的葉子與樹根有邊相連。

    如果存在這樣的圖，請輸出 `YES` 以後輸出任意一個答案。否則的話輸出 `NO`。

link: "https://open.kattis.com/problems/jurassicjungle"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入可能包含多組測試資料。每一組測試資料包含兩個正整數 $N, M$（$3\le N\le 30, 0\le M\le \frac{N(N-1)}{2}$）。測試資料以 `-1 -1` 作為結束。

## 輸出說明

如果存在滿足題目要求的圖，請輸出 `YES` 以後輸出任意一個答案的 $M$ 條邊（點的編號為 $1, 2, \ldots, N$）。否則的話輸出 `NO`。

### 範例輸入

```
3 3
5 4
-1 -1
```

### 範例輸出

```
YES
1 2
1 3
3 2
NO
```

## OJ 連結

* [Open Kattis - Jurassic Jungle](https://open.kattis.com/problems/jurassicjungle)

**題目出處**：ICPC 2018 Asia Hanoi Regional

---

## 解法

看到數字範圍，你可能會覺得或許是 DP、或許是爆搜。但很遺憾地這題是個扎扎實實的圖論數學題。不過好消息是我們不需要會證明，只要全憑直覺就可以通過這題。（這到底是好消息還是壞消息...這代表題目品質很不穩定啊。）

對於這個題目，一開始很容易想到的是 Cycle 跟 Complete Graph。除了這兩種圖以外，似乎其他種類的圖都不太可能存在解。快速拿到一個 Wrong Answer 以後便開始細細思索到底還缺了什麼樣的圖。

思考許久以後，便會發現完全二分圖 Complete Bipartite Graphs，只要兩邊的點數一樣多，那麼從任何一個點隨意出發也可以隨意走出一個 Hamiltonian Cycle。

然後我就 AC 了（當時的心情是：囧）

### 事後諸葛

要給出一個優雅的證明其實還滿有挑戰性的。在此我節錄了一段關鍵的引理<footnote goto="1" show="備註1"></footnote>。假設存在一個滿足條件的圖 $G=(V, E)$，那麼我們可以隨意先畫出一個漢米爾頓圈，其頂點順序依序編號為 $v_1, v_2, \ldots, v_n$。

如果除了這個 cycle 以外沒有其他弦（chord，橫越圈內兩點的邊）那麼顯然這是個滿足條件的圖（研究圖論的人會習慣把這樣的 cycle 寫作 $C_n$）。引理來了：

<theorem>
如果這個 cycle 上面有一根弦 $(v_j, v_k)\in E$，那麼必定有 $(v_{j+1}, v_{k+1})\in E$（不妨令 $v_{n+1}=v_1$ 避免足標溢位的問題。）
</theorem>

引理的證明很簡單：考慮以下的 Hamiltonian Path 產生方法（原題指的是恐龍的走法）—— $v_{j+1}, \ldots, v_{k}, v_{j}, v_{j-1}, \ldots, v_{1}, v_{n}, \ldots, v_{k+1}$。根據題意，此時必須保證 $(v_{j+1}, v_{k+1})\in E$。

有了這個引理以後，就可以如法炮製證明說：如果長度為 $\ell$ 的弦存在的話，那麼長度為 $\ell\pm 2$ 的弦（如果長度在範圍內的話）一定也必須存在。所以最小弦長一定是橫跨兩條或三條邊。接下來要證明的是：

* 如果最小弦長橫跨兩條邊而已，那這個圖必須要是完全圖 $K_n$。
* 如果最小弦長橫跨了三條邊，那麼點數 $n$ 必須是偶數、而且這個圖會變成完全二分圖 $K_{n/2, n/2}$。

證明的細節實在是太細節了（不斷地找一條路徑然後說，這裡必須有邊這樣）。我們就此打住吧～

### 參考程式碼


```cpp
#include <bits/stdc++.h>
using namespace std;

bool solve() {
  int N, M;
  cin >> N >> M;
  if (N == -1 && M == -1) return false;

  if (M == N) { // Cycle
    cout << "YES" << '\n';
    for (int i=1;i<=N;i++)
      cout << i << " " << (i==N?1: i+1) << '\n';
  } else if (M == N*(N-1)/2) { // Complete Graph
    cout << "YES" << '\n';
    for (int i=1;i<=N;i++)
      for(int j=i+1;j<=N;j++)
        cout << i << " " << j << '\n';
  } else if (N%2==0 && M==(N/2)*(N/2)) { // Complete Bipartite Graph
    cout << "YES" << '\n';
    for (int i=1;i<=N/2;i++)
      for(int j=N/2+1;j<=N;j++)
        cout << i << " " << j << '\n';
  } else {
    cout << "NO" << '\n';
  }

  return true;
}

int main() {
  while(solve());
  return 0;
}
```

### 備註 1<footnote here="1"></footnote>

這要追溯到 1968 年的一篇論文 [Randomly Traceable Graphs](https://epubs.siam.org/doi/abs/10.1137/0116056?journalCode=smjmap)，裡面關鍵的引理 3 就是上面這個引理。而定理6 就是這整題要問的結論。很 666666 吧。

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！