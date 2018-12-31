---
category: "prob"
code: "ICPC-JAKARTA-2018-A"
path: "/problem/icpc/asia_jakarta_2018/A"
title: "Edit Distance"
date: '2019-01-01'
difficulty: 3
description: |
    對於兩個給定的字串 $S$ 和 $T$，我們定義 $edit(S, T)$ 為從 $S$ 經過若干插入字元、修改字元、刪除字元等操作後得到 $T$ 所需要的最少步數。
    
    Ayu 有一個二元字串 $S$（$1\le |S|\le 2000$），她想要找到另一個字串 $T_{max}$ 使得 $edit(S, T_{max})$ 最大。即對於所有與 $S$ 等長的 $T$，$edit(S, T_{max})\ge edit(S, T)$。不過呢，為了讓事情變得簡單些，她希望你能夠幫她的忙，找到任何一個與 $S$ 長度相同的字串 $T$，只要 $edit(S, T) > |S|/2$ 即可。
    
    當然，你也可以選擇輸出 $T_{max}$，事實上我們可以證明 $edit(S, T_{max}) > |S|/2$。這也保證了對於任意輸入一定有解。
link: "https://codeforces.com/gym/102001/problem/A"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
---

## 題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入僅有一行包含二元字串 $S$（$1\le |S|\le 2000$）。

## 輸出說明

輸出一個與 $S$ 長度相等的二元字串 $T$，滿足 $edit(S, T) > |S|/2$。

### 範例輸入 1

```
0011
```

### 範例輸出 1

```
1100
```

### 範例輸入 2

```
1100101
```

### 範例輸出 2

```
0011010
```


## OJ 連結

* [Codeforces Gym 102001 - A](https://codeforces.com/gym/102001/problem/A)


---

## 解法

如果單純把所有數字都反過來，可能不太行。比方說以下的反例：`01010101`，反過來就變成 `10101010`，顯然我們只要刪掉第一個字元並且補到後面去就行了。

換一個想法想，如果字串長度 $n$ 是奇數，那麼根據 $edit({\tt{000\cdots 0}}, S) + edit(S, {\tt{111\cdots 1}}) \ge edit({\tt{000\cdots 0}}, {\tt{111\cdots 1}}) = n$，我們知道其中一個一定會超過 $n/2$，因為 $n$ 是奇數，所以一定有一個會嚴格大於 $n/2$。換句話說，$n$ 是奇數的時候很好解決！

那 $n$ 是偶數的時候怎麼辦？考慮 $S$ 的前 $n-1$ 個 bit（此時 $n-1$ 是奇數）我們稱這個前綴為 $S_0$。根據前一段的論述，我們可以找出一個**等長的** $T_0$ 滿足 $edit(S_0, {T_0})\ge \lceil \frac{n-1}{2}\rceil = n/2$。此時顯然有 $edit(S, {T_0}), edit(S_0, \red{T_0{\tt{0}}}), edit(S_0, \red{T_0{\tt{1}}}) \ge n/2$。還記得計算 edit distance 的動態規劃嗎？無論我們在 $T_0$ 後面補哪個字元 $x$，總能夠有

$$ 
    edit(S, \red{T_0x}) = \min \begin{cases}
    edit(S_0, T_0) + (S[n-1] {\tt{==}} x) & \text{修改字元}\\
    edit(S_0, \red{T_0x}) + 1 & \text{刪除字元}\\
    edit(S, T_0) + 1 & \text{插入字元}
    \end{cases}
$$

這時候注意到：如果我們選定 $x\neq S[n-1]$，無論是哪種 case 都至少保證此時 $edit(S, \red{T_0x}) > n/2$，達到目標！

### 參考程式碼

為了實作方便，我們考慮的是 $S$ 的末 $n-1$ 個字元，然後找到 $T$ 以後再根據 $S[0]$ 把相對應的字元放到前面。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s, t;
  cin >> s;
  
  // 計算字串中 0 和 1 出現的個數。
  int b[2] = {};
  for (int i = 1; i < s.size(); i++) b[s[i]=='1']++;
  
  // 構造出距離比較遠的全 0 或全 1 字串。
  t = string(s.size(), '0' + (b[0] > b[1]));
  
  // 然後把第一個字元改成與 s[0] 不同的字元，並且輸出。
  t[0] = '0' + '1' - s[0];
  cout << t << endl;
  return 0;
}
```

### 備註 1

Edit Distance 好像又被稱為 [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)，是一種衡量兩個字串是否有多接近的指標（metric，不是 pointer XD）。

### 備註 2

Edit Distance 滿足三角不等式：$edit(A, B)+edit(B, C) \ge edit(A, C)$，白話文解釋就是從 $A$ 換到 $C$ 的方法，至少有先從 $A$ 變成 $B$ 再從 $B$ 變成 $C$ 來得好。

<theorem title='演算法豆知識' c='is-primary'>
在[強指數時間假說](/algo/strong-exponential-time-hypothesis)為真的前提之下，計算兩個長度為 $n$ 字串的 Edit Distance (exact) 至少得花 $\Omega(n^{2-\epsilon})$ 的時間。但是就近似演算法 (Approximation Algorithms) 而言， 2018 年 FOCS 的一篇最佳論文 [_Approximating Edit Distance Within Constant Factor in Truly Sub-Quadratic Time_](https://arxiv.org/abs/1810.03664)，在 $\tilde{O}(n^{12/7})$ 時間內保證得到 $1680$-approxmation 的近似解，是為近期的一個重大突破。（作者們相信稍微用他們的方法再努力一下就可以做到 $(3+\epsilon)$-approximation）
</theorem>

### 備註 3

解答上面有一句話：此時顯然有 $edit(S, {T_0}), edit(S_0, \red{T_0{\tt{0}}}), edit(S_0, \red{T_0{\tt{1}}}) \ge n/2$。這句話必須在 $|S_0|= |T_0|$ 的時候才成立。當 $|S_0|\neq|T_0|$ 的時候，你能找到反例嗎？

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！