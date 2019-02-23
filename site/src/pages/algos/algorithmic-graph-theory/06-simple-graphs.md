---
category: "algo"
path: "/algo/algorithmic-graph-theory/simple-grpahs"
date: "2019-02-21"
title: "圖論演算法 6 - 簡單圖 Simple Graphs"
---

簡單圖大概是所有定義裡頭最簡單的了。所謂的簡單圖，就是沒有包含重邊（multi-edge）和自環（self-loop）的圖。利用前一節我們介紹的度序列，我們可以透過給定一個合法的度序列來生成簡單圖。

## §6.1 合法的簡單圖

Havel 以及 Hakimi 分別在 1955、1962 年發表了藉由給定度序列構造簡單圖的演算法。我們說一個序列 $(d_1, d_2, \ldots, d_n)$ 是 **可製圖的（graphical）** 若且唯若這個序列是某個簡單圖的度序列。而在 1960 年 Erdős 與 Gallai 發表了非構造性的數學論述。

<theorem title='Erdős-Gallai 定理 [1960]'>
一個非遞增非負整數序列 $d_1\ge d_2\ge \cdots \ge d_n$ 是可製圖的，若且唯若以下兩條件成立：
* $d_1+\cdots + d_n$ 是偶數。
* 對於所有 $1\le k\le n$，皆有：$$ \sum_{i=1}^k d_i \le k(k-1) + \sum_{i=k+1}^n \min(d_i, k).$$
</theorem>

有了 E-G 定理以後，我們可以用很開心的角度重新檢視 H-H 定理：

<theorem title='Havel-Hakimi 定理 [1955, 1962]'>
一個非遞增非負整數序列 $d_1\ge d_2\ge \cdots \ge d_n$ 是可製圖的，若且唯若少了一個點的序列 $(\underbrace{d_2-1, d_3-1, \ldots, d_{d_1+1}-1}_{\text{總共} d_1 \text{個}}, d_{d_1+2}, \ldots, d_n)$ 也是可製圖的。
</theorem>

## §6.2 樹的度序列

我們知道 $n$ 個點的樹是一個恰好有 $n-1$ 條邊的連通圖。如果 $d_1\ge \cdots \ge d_n$ 是這個樹的度序列，顯然必須有 $d_1+\cdots + d_n = 2(n-1)$。

## §6.3 簡單連通圖



## 習題

1. <span class='tag is-danger'>程設題</span> 幼稚園吃午餐問題？

### 參考資料

* http://szhorvat.net/pelican/hh-connected-graphs.html