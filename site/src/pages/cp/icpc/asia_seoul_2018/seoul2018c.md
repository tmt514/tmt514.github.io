---
category: "prob"
code: "ICPC-2018-SEOUL-C"
path: "/problem/icpc/asia_seoul_2018/C"
title: "Disks Arrangement"
date: '2019-01-25'
difficulty: 7
description: |
    給你 $n$ 個圓盤，他們半徑分別是 $r_1, r_2, \ldots, r_n$。已知這些圓盤中最大半徑與最小半徑的比值嚴格小於 $4$。這麼做有什麼好處呢？這麼做可以保證對於任意的圓盤排列 $\sigma(1), \sigma(2), \ldots, \sigma(n)$ 來說，若依照該排列將所有圓盤立直靠攏，那麼必定只會有相鄰的兩個圓盤碰到（如下圖 Figure C.1），而不會有如下圖 Figure C.2 的情形。

    ![Imgur](https://i.imgur.com/BcifK4v.png)

    請找出在任意排列中，靠攏之後的圓盤寬度之最小值。
    

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
    - "graph"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入的第一列包含一個正整數 $n$ ($1\le n\le 1000$)，第二列包含 $n$ 個正整數代表圓盤的半徑，所有半徑都介於 $1$ 到 $10^6$ 之間。最大半徑與最小半徑的比值小於 $4$。

## 輸出說明

請輸出一個浮點數 $z$，表示圓盤擺放後的最小寬度，如果正確答案是 $OPT$，那麼你的輸出 $z$ 必須滿足 $OPT-10^{-5} < z < OPT + 10^{-5}$。

### 範例輸入 1

```
4
4 2 7 6
```

### 範例輸出 1

```
34.99452
```

### 範例輸入 2

```
5
13 7 4 15 10
```

### 範例輸出 2

```
90.14124
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/101987)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

不妨假設所有的半徑是由小到大排好順序的：$r_1\le r_2\le\cdots\le r_n$。

假設有兩個圓盤半徑分別為 $r_i$ 與 $r_j$。把這兩個圓盤緊靠的時候，其圓心之間的距離是 $2\sqrt{r_ir_j}$。我們構造一個有 $n+1$ 個點的**加權無向完全圖**，其頂點編號為 $\set{0, 1, \ldots, n}$。對於所有的 $1\le i, j\le n$，定義 $(i, j)$ 這條邊的權重 $w(i, j) = 2\sqrt{r_ir_j}$。此外，對於所有的 $1\le j\le n$，定義 $w(0, j)=r_j$。

定義完畢以後，我們會不小心發現所求的值就**恰恰好**是這個圖上計算[旅行銷售員問題（Travelling Salesman Problem, TSP）](https://zh.wikipedia.org/wiki/%E6%97%85%E8%A1%8C%E6%8E%A8%E9%94%80%E5%91%98%E9%97%AE%E9%A2%98)的解。

如果大家有聽過 TSP 問題的話，應該會知道在一般情形下這個問題是 NP-完備的。如果出在比賽中，$n$ 又大成這樣，想必事有蹊蹺。推敲至此，不難判斷——這題定是個結論題！

因此對於該題最一般的通解就是：隨意生出一些小測資，並觀察解的規律。然後就可以構造答案了。

依稀記得在 [TOI 2018 選訓營](https://www.facebook.com/notes/%E8%B3%87%E8%A8%8A%E7%AB%B6%E8%B3%BD%E9%81%B8%E6%89%8B%E6%96%B0%E6%89%8B%E6%9D%91/toi-2018-%E9%A1%8C%E7%9B%AE%E6%87%B6%E4%BA%BA%E5%8C%85/2083123898642973/) 有一道奇怪的佔總分只有 3 分的子題，就是在滿足[四邊形不等式](https://en.wikipedia.org/wiki/Monge_array)（不管他是凹還是凸）的對稱矩陣<footnote goto="1" show="備註1"></footnote>（對應到無向圖）中，解決 TSP 問題。

遺憾的是，我們構造的圖不完全滿足四邊形不等式。好消息是，把 $0$ 那點移除以後，剩下的矩陣（不妨讓對角線就等於 $2r_i$）會滿足四邊形不等式。

從 [這篇文章](http://alexandria.tue.nl/openaccess/Metis211810.pdf) 當中可以看出一些端倪～如果我們要在剩下的矩陣中找 TSP，那麼正確答案的**環狀排列**總是以下兩個其中一種：

$$
\begin{cases}
\sigma_1 = \langle 1, 3, 5, 7, 9, 11, 13, \ldots, 14, 12, 10, 8, 6, 4, 2\rangle\\
\sigma_2 = \langle n, 2, n-2, 4, n-4, 6, \ldots, 5, n-3, 3, n-1, 1\rangle
\end{cases}
$$

這裡要強調的是環狀排列。這題的答案會是把 $\sigma_2$ 旋轉至中間（$n/2$ 附近），原因是因為加上兩邊的圓盤邊邊以後，我們建構的圖上，真正的 TSP 會等於「拿掉 $0$ 這個點以後，剩下圖的 TSP」 額外加上一個 $(\sqrt{r_x} - \sqrt{r_y})^2$，而總覺得可以透過某些證明（這裡空間不夠了我應該寫不出來（說不定可能是錯的？））保證選取旋轉至中間的 $\sigma_2$ 會是答案。


### 參考程式碼

我的程式碼有點偷懶，沒有旋轉到中間，乾脆每個地方都轉一轉，看看找出來的值誰最小。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<double> a(n);
  for (int i = 0; i < n; i++)
    cin >> a[i];
  sort(a.begin(), a.end());

  // 構造我們要的 sigma_2
  vector<int> p(n + 1);
  for (int i = 0; i < n; i++)
    p[i] = i;
  for (int i = 1, j = n - 2; i < j; i += 2, j -= 2)
    swap(p[i], p[j]);
  p[n] = p[0];

  // 計算 TSP 的結果。
  long double sum = 0;
  for (int i = 0; i < n; i++) {
    sum += 2 * sqrtl(a[p[i]] * a[p[i + 1]]);
  }

  // 然後遍歷相鄰的邊，加上額外的 cost，找出最小值。
  long double best =
      a[p[0]] + a[p[n - 1]] + sum - 2 * sqrtl(a[p[0]] * a[p[n - 1]]);
  for (int i = 0; i + 1 < n; i++) {
    best = min(best,
               a[p[i]] + a[p[i + 1]] + sum - 2 * sqrtl(a[p[i]] * a[p[i + 1]]));
  }
  cout << fixed << setprecision(9) << best << endl;
  return 0;
}
```

### 備註 1<footnote here="1"></footnote>

滿足四邊形不等式的矩陣叫做 Monge Array。如果它剛好是個**對稱**的方陣的話，那就叫做 [Supnick Matrix](https://en.wikipedia.org/wiki/Supnick_matrix)。要注意的是我們這題的不等式符號是反的。

### 備註 2

有空來介紹 [100種你所不知道的 TSP](https://openaccess.nhh.no/nhh-xmlui/bitstream/handle/11250/164224/Halskau_2000.pdf?sequence=1&isAllowed=y) 好了XD~

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！