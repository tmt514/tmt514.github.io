---
category: "prob"
code: "ICPC-JAKARTA-2018-C"
path: "/problem/icpc/asia_jakarta_2018/C"
title: "Smart Thief"
date: '2019-01-02'
difficulty: 7
description: |
    Ayu 想要打開一個使用密碼鎖加密的箱子。為了能夠找出正確密碼，Ayu 必須要很遺憾地嘗試所有長度為 $N$ 的密碼組合。
    
    有趣的是，Ayu 發現了這套密碼鎖系統其實相當古板：當你輸入 $N$ 個數字以後，系統會自動判斷你到底輸入正確與否。如果輸入了正確的密碼，那麼箱子的鎖便會打開。反之，如果輸入了錯誤的密碼，那麼系統會很聰明地把你先前輸入的第一個數字（最早的）丟掉，這麼一來，你只要再輸入一個數字就可以讓他變成長度 $N$ 了。
    
    舉例來說，如果 $N=4$，而且 Ayu 依序輸入了 `204320435`，那麼系統實際上會檢測 6 次（共有 5 種不同的 PIN）：

    * `2043`
    * `0432`
    * `4320`
    * `3204`
    * `2043`
    * `0435`

    Ayu 想要在第一天測試 $K$ 種不同的密碼。你能不能找出任何一個長度最短的字串 $S$，使得它可以讓機器檢測到任意 $K$ 個不同的密碼呢？這個古老的系統能夠鍵入的數字種類有限：它們會是 `0` 到 `9` 這些數字中的某 $M$ 個。
    
    
link: "https://codeforces.com/gym/102001/problem/C"
oj: "codeforces-gym"
---

## 題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入包含 3 個整數 $N, M, K$（$1\le N\le 100000, 1\le M\le 10, 1\le K\le \min(M^N, 100000)$），依序代表密碼的長度、能夠鍵入的數字種類、還有第一天想要測試的密碼量。輸入的第二列包含 $M$ 個整數：$A_i (0\le A_i\le 9)$ 表示能夠使用的數字們。

你可以假設輸入的 $N, M, K$ 會使得答案字串不超過 $100000$ 位數。

## 輸出說明

輸出任何一個滿足條件的、最短的字串 $S$。

### 範例輸入 1

```
3 2 5
4 7
```

### 範例輸出 1

```
7477447
```

### 範例輸入 2

```
2 5 9
1 2 3 4 5
```

### 範例輸出 2

```
1234554321
```

### 範例輸入 3

```
6 3 2
9 3 5
```

### 範例輸出 2

```
9353593
```

## OJ 連結

* [Codeforces Gym 102001 - C](https://codeforces.com/gym/102001/problem/C)


---

## 解法

首先，輸入的 $A_i$ 跟答案一點關係也沒有，因此我們總是可以假設這些數字是 $0, 1, \ldots, M-1$。

這題的關鍵字只有一個，就是 [De Bruijn Sequence](https://en.wikipedia.org/wiki/De_Bruijn_sequence)。對於給定的參數 $n, m$ 來說，De Bruijn Sequence $B(n, m)\in [m]^n$ 是一個長度為 $n^m$ 的序列，把他接成一圈以後，任何連續的 $n$ 個字元都不相同。從這個序列的存在性來說，我們就可以斷定本題的答案長度一定是 $|S|=K+N-1$。所以囉，對於輸入的 $N, M, K$，答案之一就可以是 $B(N, M)$ 接成一圈以後的任何長度為 $K+N-1$ 的子字串。

### 第一種解法：一筆畫問題 Eulerian Path

常見的建構 De Bruijn Sequence 有兩種。第一種是將這個題目轉化成[一筆畫問題](https://en.wikipedia.org/wiki/Eulerian_path)，如下圖所示（圖片參考自維基百科）：

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/De_bruijn_graph-for_binary_sequence_of_order_4.svg/800px-De_bruijn_graph-for_binary_sequence_of_order_4.svg.png" style="max-width: 300px"></img>

從任何一點出發，然後走過所有的邊恰好可以接出一個 $B(2, 4)$。我們可以**利用 DFS 解一筆畫問題**。由於這個圖很大（上面會有 $2^{N-1}$ 個節點），所以我們不可能把整張圖生出來再跑一筆畫演算法：

* 在 DFS 過程中，如果深度到達 $K$，那依循 DFS 的路徑就可以找到想要的 sequence。
* 在 DFS 過程中，如果走訪完畢的邊數到達 $K$ 條，那這 $K$ 條邊也可以接成一個理想的 sequence。

由於 DFS 演算法每一步要嘛走訪一條新的邊、或是沿著一條邊回溯（並把這條邊丟進 stack），我們很確定最多只要走訪 $2K$ 條邊就可以中止我們的演算法。判斷一條邊被走過與否，有兩種方式：把每條邊雜湊以後存起來、或是把每個點雜湊以後，映至當前還有哪些邊沒走過（是一個 $0$ 到 $M-1$ 之間的數字）。

所以本題可以在 $O(K)$ 次雜湊存取的時間被解決。

### 第二種解法：利用林登字串 Lyndon Words

[Roger Lyndon](https://en.wikipedia.org/wiki/Roger_Lyndon) 是美國密西根大學的數學系教授，他在 1954 年的時候做了一些最小旋轉字典序字串的相關研究（主要是計數方面）。如果一個字串 $S$，滿足以下兩個特徵：

1. 非循環字串：找不到另一個字串 $P$ 和整數 $k>1$ 使得 $S=\underbrace{PP\cdots P}_k$
2. $S$ 是所有 $S$ 的旋轉字串中字典順序最小的。

那麼該字串 $S$ 就是一個 Lyndon word。

（題外話——說到旋轉字串與字典序，大家可能想到的就是 Burrows-Wheeler 轉換，這類型資料壓縮的技巧與 Lyndon Word 有著密切關聯。）

儘管早在 1934 年，M. H. Martin（我查不到是誰﹍）就用了類似 Lyndon word 的方法做出了 De Bruijn Sequence，但直到 1978 年才由 Harold Fredericksen 和 James Maiorana 兩位發現以下驚人的事實：

<theorem>
把所有長度整除 $n$ 的 Lyndon words，依照字典順序（注意不是長度）排序後，全部接起來，就得到一個 de Bruijn 序列了！
</theorem>

下面這個演算法是使用第二種解法製作的：**依照字典順序**產生所有長度整除 $n$ 的 Lyndon words，直到我們需要的長度為止。為了解釋下面的程式碼，我們利用關於 Lyndon word 旋轉字典序最小的性質：

<theorem>
如果字串 $S$ 是一個 Lyndon word，那麼把他隨意拆成兩個子字串，左半邊的字典序保證小於右半邊。
</theorem>

有了這件事情以後，我們可以利用 DFS 一個一個字元決定。還記得 KMP 字串匹配演算法嗎？我們利用 `last[]` 陣列描述對於所有前綴字串，與之匹配的最長前綴子字串。

<algorithm>
    <generator><pre>
        function*(input, ui) {
            var S = input.S;
            var n = S.length;
            var last = [];
            var i, j;
            last.push(-1);
            ui.setStyleOnce('arr', `0`, {fill: 'yellow'});
              ui.setStyleOnce('S', `0`, {fill: 'yellow'});
            for (i = 1; i < n; i++) {
              yield {S: S, arr: last};
              j = last[i-1]+1;
              while (j > 0 && S[j] !== S[i])
                j = last[j-1]+1;
              last[i] = (S[i]===S[j]? j : -1)
              for (var k = 0; k <= j; k++) {
                ui.setStyleOnce('arr', `${i-k}`, {fill: 'lightyellow'});
                ui.setStyleOnce('S', `${i-k}`, {fill: 'lightyellow'});
              }
              ui.setStyleOnce('arr', `${i}`, {fill: 'yellow'});
              ui.setStyleOnce('S', `${i}`, {fill: 'yellow'});
            }
            return {S: S, arr: last};
        }
        </pre>
    </generator>
    <inputdata
        data='{"S": "aaabaaabaaabaabbaaabaabbb"}'
    ></inputdata>
    <indirectdisplay
        array
        fixedwidth
        minwidth='30'
        highlightdiff
        varname='S'
    ></indirectdisplay>
    <indirectdisplay
        array
        fixedwidth
        n='25'
        minwidth='30'
        highlightdiff
        varname='arr'
    ></indirectdisplay>
</algorithm>

如果輸入的字串是 Lyndon word，那麼我們可以得到兩個觀察：

1. `last[]` 陣列，從左到右一旦有數字變小，永遠是從 $-1$ 開始，不會從中間繼續。
2. Lyndon word 做出來的 `last[]` 陣列，最後一個 last 值永遠是 $-1$。

所以 DFS 就很簡單啦：每次決定到底現在的 `last[i]` 要等於 `last[i-1]+1` 還是等於 `-1`。如果是前者，那麼只有一種選擇，如果是後者，那麼根據「分兩半字典序必須比較大」的原則，下一個值必須是從 `last[i-1]+1` 對應到的字元**的下一個**往後開始跳。

### 參考程式碼

```cpp
#include <iostream>
#include <vector>
using namespace std;

string s;
int N, M, K;
int current[100005] = {-1};
int a[10];

string get_string(int len) {
  string ret = "";
  for (int x = 0; x < len; x++)
    ret += ('0' + a[current[x]]);
  return ret;
}

void generate_lyndon_words(int now, int last) {
  if (now && N%now == 0 && last == -1) {
    s += get_string(now);
  }

  if (s.size() >= K+N-1) return;
  if (now == N) return;

  // 選擇延續 last。
  if (now > 0) {
    current[now] = current[last+1];
    generate_lyndon_words(now+1, last+1);
  }
  // 選擇把 last 換成 -1，但是你的字典序要比原本的還要大。
  for (int x = now? current[last+1]+1 : 0; x < M; x++) {
    current[now] = x;
    generate_lyndon_words(now+1, -1);
  }
}

int main() {
  cin >> N >> M >> K;
  for (int i = 0; i < M; i++) cin >> a[i];
  generate_lyndon_words(0, -1);
  while (s.size() < K+N-1) s += s; // 某種邊界條件...
  s = s.substr(0, K+N-1);
  cout << s << endl;
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！