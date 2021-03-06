---
category: "algo"
path: "/algo/algorithmic-graph-theory/degree-sequence"
date: "2019-02-20"
title: "圖論演算法 4 - 度序列 Degree Sequences"
---

## §4.1 度序列的定義

對於一個無向圖 $G$ 來說，我們可以把所有點的度數 $\deg(v)$ 蒐集起來，而這樣的序列被稱為**度序列**(degree sequence)。

從演算法的角度來說，許多與次線性時間演算法（sublinear time algorithms）相關的研究，其計算模型都會假設：我們總是可以在 $O(1)$ 時間查詢一個點的度數。這對於一些估計與近似演算法具有相當的幫助。

## §4.2 握手定理

握手定理精確地描述了邊數與度數之間的關聯。為什麼叫做握手定理呢？如果我們把一次聚會上任何兩個人握手的情形都畫一條邊把這兩個人連起來，那麼總握手次數的兩倍就會恰好等於每個人握手次數總和。

<theorem title='定理（握手定理）'>
$\sum_{v\in V} \deg(v) = 2|E|$.
</theorem>

**備註**：在已知 $\sum \deg(v)$ 為定值的情形下，考慮 $\sum (\deg(v))^2$ 的最大值和最小值是個很經典的代數問題呢。

## §4.3 圖上的三角形

我們定義圖上的**三角形**為圖 $G$ 的 $K_3$ 子圖。

Triangle Detection/Counting 是計算理論一個有趣且還算重要的問題。判斷一個圖是不是二分圖僅需要線性時間，但判斷這個圖是否存在三角形、或計算這個圖有多少三角形，卻出乎意料地**不好算**。（或者是，大家普遍相信如果有線性時間演算法可以算出三角形的數量，那就會有超高效率演算法計算兩個矩陣的相乘。）

該問題與 List Intersection、以及資料庫的 join 實作演算法有著密切相關。有趣的是，一些圖上三角形的基本性質，我們可以透過度序列來瞭解他們。

<theorem title='定理'>
對於任意有 $m$ 條邊的簡單圖 $G$，圖上三角形的數量至多為 $O(m^{3/2})$ 個。
</theorem>

#### 證明

不妨假設 $G$ 的度序列為 $d_1 \ge d_2 \ge \cdots \ge d_n$。那麼根據握手定理 $d_1+d_2+\cdots + d_n = 2m$。此時有 $d_i \le 2m/i$。
現在對於圖中的每一個三角形 $\{a, b, c\}$ 使得 $v_a \ge v_b \ge v_c$，我們把它標記在編號最大的點 $v_c$ 上。於是，對於每一個點 $c$，可能掛在 $c$ 這個點上的三角形數量就至多有 $\min\set{{c-1\choose 2}, {d_c-1\choose 2}}$ 個。

所以三角形的數量不超過

$$
\begin{align*}
\sum_{c=1}^n \min\set{{c-1\choose 2}, {d_c-1\choose 2}} &\le \sum_{c=1}^{\sqrt{m}}{c-1\choose 2} + \sum_{c=\sqrt{m}+1}^{n} {d_c-1\choose 2} \\
&= O(m^{3/2}) 
\end{align*}
$$

-----

## §4.4 沒有三角形的圖

那麼，什麼樣的圖不包含三角形呢？顯然任意的二分圖都不會有三角形的存在。Mantel 在 1907 年證明了，其實完全二分圖會給出邊數最多的不含三角形的圖。

<theorem title='Mantel 定理'>
不含三角形的 $n$ 個點、$m$ 條邊的圖滿足 $m\le n^2/4$。
</theorem>

#### 證明

由於圖上不存在三角形，所以對於任何一條邊 $(u, v)$ 來說，必須有 $\deg(u) + \deg(v) \le n$。
我們可以把 $nm$ 展開得到：

$$
\begin{align*}
nm = n|E| & = \sum_{(u, v)\in E} n\\
&\ge \sum_{(u, v)\in E} \left(\deg(u) + \deg(v)\right)\\
& = \sum_{u\in V} \left(\deg(u)\right)^2\\
& \ge \left(\frac{\sum_{u\in V} \deg(u)}{n}\right)^2 \tag{Cauchy-Schwarz 不等式}\\
& = n\left(\frac{2m}{n}\right)^2 \tag{握手定理}\\
& = 4m^2/n.
\end{align*}
$$

因此推得 $m \le n^2/4$。

-----


而匈牙利數學家 Turán 在 1941 年推廣了 Mantel 的定理，說明不含 $K_r$ 子圖的圖邊數最多只出現在完全 $(r-1)$-分圖上面。

<theorem title='Turán 定理'>
對於任意有 $n$ 個點的圖 $G$。若 $G$ 沒有 $K_r$ 子圖，那麼 $G$ 的邊數至多為 $$
  m\le \left(1-\frac{1}{r-1}\right)\frac{n^2}{2}$$
</theorem>

## 習題

0. <span class='tag is-dark'>證明題</span> 試證明：對於任意一個簡單圖，至少有兩個點度數一樣。
1. <span class='tag is-dark'>證明題</span> 試證明：對於任意圖 $G$，上面的 $k$ 個點的子圖數量至多為 $O(m^{k/2})$ 個。
2. <span class='tag is-link'>演算法</span> 請給出一個列舉圖上所有三角形的 $O(m^{3/2})$ 時間演算法。