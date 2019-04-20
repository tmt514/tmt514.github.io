---
category: "research"
path: "/research-notes/random-notes"
date: "2019-04-20"
title: "Random Paper Notes"
css_title_theme: "is-info research"
css_content_theme: "research"
backlink: "/research-notes"
math_font: "Gyre-Pagella"
---

## Single Sourcewise Multiplicative Spanners

> Khuller, Raghavachari and Young. [_Balancing Minimum Spanning Trees and Shortest-Path Trees_](https://link.springer.com/article/10.1007/BF01294129), Algorithmica 1995.

<theorem title='Theorem'>
Given minimum spanning tree $T_M$ and shortest path tree $T_S$ with the same root $r$ and any constant $K>0$.
There is an algorithm in $O(n)$ time producing a tree $T$ that has (1) total weight $\le (1+2/K)|T_M|$ and
(2) for all vertex $v$, the distance from $r$ to $v$ is at most $(1+K)\mathrm{dist}(r, v)$ in $T_S$.
</theorem>

#### Proof Sketch.

The algorithm maintains a subgraph $H$, and runs DFS along minimum spanning tree $T_M$.
Initially the subgraph $H$ is set to $T_M$.
Whenever the algorithm arrives a vertex $v$,
and if the current distance $d[v] > (1+K)\mathrm{dist}(r, v)$,
the algorithm adds the entire shortest path $P(r, v)$ to $H$.

Let paths $P(r, v_1), P(r, v_2), \ldots, P(r, v_k)$ be the shortest path added to $H$
during the execution of the algorithm.
The total increase of the cost is $\sum_{i=1}^k \mathrm{dist}(r, v_i)$.
However, by the time $P(r, v_i)$ is added to $H$ we have that $(1+K)\mathrm{dist}(r, v_i) < d[v_i] \le \mathrm{dist}(r, v_{i-1}) + d_M(v_{i-1}, v_i)$.
By summing both sides from $i=1$ to $k$, we get total increase cost is no more than $\frac{2}{K}|T_M|$.

#### 重點

1. 只有在 DFS 往上或往下爬的時候才 relax edge，這樣就足夠好了，不用每次重算 $H$ 上面的最短路徑。
2. 利用上次加 path 的位置作 telescoping sum，加起來剛好繞 MST（或任何樹）一圈。