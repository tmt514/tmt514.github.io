---
category: "algo"
path: "/algo/algorithmic-graph-theory/split-graph"
date: "2019-03-10"
title: "圖論演算法 9 - 分割圖 Split Graph"
---

若圖 $G$ 上面的點集合存在一種方法被拆成一個（可能為空的）完全子圖與一個（可能為空）的獨立集，那麼我們說圖 $G$ 是一個**分割圖**（split graph）。

## §9.1 分割圖的辨認

<theorem>
Split graph can be recognized in linear time.
</theorem>

這件事情可以透過觀察度序列來得知：

<theorem>
一個簡單圖 $G$ 是一個 split graph 若且唯若對於其度序列 $d_1\ge d_2 \ge \cdots \ge d_n$，存在一個正整數 $m$ 使得
 $$ \sum_{i=1}^m d_i = m(m-1) + \sum_{i=m+1}^n d_i $$
這樣。
</theorem>

換句話說，度數大的點都會屬於完全子圖、而度數小的點都會屬於獨立集。

## §9.2 分割圖的性質

<theorem>
分割圖的補圖也是分割圖。
</theorem>

| 演算法問題 | On Split Graphs |
|---|---|
| Clique Number / 找出所有極大完全子圖 | 簡單 |
| Chromatic Number / 圖著色 | 簡單 | 
| HamiltonianCycle | $\textsf{NP}$-complete |
| MinimumDominatingSet | $\textsf{NP}$-complete (從 SetCover reduce) |

## §9.3 分割圖的計數

有標號的分割圖很簡單，這個大家自己算就可以了。

### 無標號的分割圖 (non-isomorphic)

無標號分割圖的數量，在 2000 年由 UWA 西澳大學數學統計系的 Gordon Royle 教授提出了一個「$n$ 個點的分割圖」與「$n$ 個物件的非同構極小覆蓋集合」之間的一對一對應關係。所謂的極小覆蓋集合，就是考慮若干非空集合 $S_1, \ldots, S_k \subseteq [n]$，它們聯集包含所有 $[n]=\{1, 2, \ldots, n\}$，但拿掉任何一個集合都湊不齊 $[n]$。

關於將 $n$ 個物件使用 $k$ 個集合最小覆蓋的方法數，已由當年在阿德萊德大學現在在澳洲伍倫貢大學的 Rodney J. Clarke 教授在 [1990](https://www.sciencedirect.com/science/article/pii/0012365X90901469) 年寫下其公式：

$$
t(n, k) = \frac{1}{n!k!}\sum_{\alpha\in \mathcal{P}_n, \beta\in\mathcal{P}_k} {n\choose \alpha}{k\choose \beta} \prod_i \left(\left(
    \prod_{j} 2^{\gcd(\alpha_i, \beta_j)}\right) - 1
    \right)
$$

有興趣的朋友可以直接從 [OEIS A048194](https://oeis.org/A048194) 查看 Split Graph 的計數。

## 練習題

1. <span class='tag is-danger'>程設題</span> [[UOJ 1974] Into Darkness](https://www.urionlinejudge.com.br/repository/UOJ_1974_en.html)
2. <span class='tag is-danger'>程設題</span> [[POI 18 Stage 1] Conspiracy](https://main.mimuw.edu.pl/en/archive/oi/18/kon)
3. <span class='tag is-danger'>程設題</span> [[NAIPC 2018 pB] Double Clique](https://naipc18.kattis.com/problems/doubleclique)
4. <span class='tag is-dark'>證明題</span> 證明圖 $G$ 是分割圖若且唯若 $G$ 與 $\overline{G}$ 都是弦圖(Chordal)。


### 參考資料

* https://arxiv.org/pdf/1805.03405.pdf
* http://www.emis.ams.org/journals/JIS/VOL3/ROYLE/royle.pdf
* [Bertossi, _Dominating sets for split and bipartite graphs_, IPL 1984.](https://www.sciencedirect.com/science/article/pii/0020019084901261)