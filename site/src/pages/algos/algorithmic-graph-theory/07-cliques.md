---
category: "algo"
path: "/algo/algorithmic-graph-theory/cliques"
date: "2019-02-28"
title: "圖論演算法 7 - 完全子圖 Cliques"
---

如果一個簡單圖的任兩個點之間都有一條邊相連，那麼這個圖被稱為**完全圖**（Complete Graph）。通常我們會用 $K_n$ 來表示有 $n$ 個點的完全圖。而完全子圖（Clique）則是指給定一個簡單圖當中，任兩點之間都有連邊的一個子圖。如果一個圖 $G$ 上的完全子圖，不存在任何其他點連到這個子圖上的所有點（也就是說不存在更大的完全子圖包含它），那我們就稱這個子圖為**極大完全子圖**（Maximal Clique）。

如果這個完全子圖在圖上擁有最大的點數，那我們稱它為**最大完全子圖**（Maximum Clique），通常我們將最大完全子圖的點數以 $\alpha(G)$ 表示之。找出最大完全子圖的大小在計算上是困難的，這是一個 $\mathsf{NP}$-完全問題。

## §7.1 極大完全子圖

Moon 跟 Moser 在 1965 年證明了任何一個有 $n$ 個點的圖 $G$，上面的極大完全子圖數量不超過 $O(3^{n/3})$ 個。

### 枚舉極大完全子圖


| 演算法 | 複雜度 | 備註 |
|-------|-------|------|
| Bron-Kerbosch [1973] | $O(3^{n/3})$ | 由 Tomita et al. 證明 |
| Eppstein at al. [2006] | $O(dn3^{d/3})$ | $d$ 是 degeneracy |
| Tsukiyama [1977] | $O(nm\mu)$ | $\mu$ 是輸出的 maximal clique 數量。 |
| Chiba and Nishizeki [1985] | $O(a(G)m\mu)$ | $a(G)$ 是 arboricity of $G$。 |
| Makino and Uno [2004] | $O(\Delta^4\mu)$ | $\Delta=\Delta(G)$。 |


## §7.2 Bron–Kerbosch 演算法


## §7.3 找出一個最大完全子圖


| 演算法 | 複雜度 | 備註 |
|-------|-------|------|
| Bron-Kerbosch [1973] | $O(1.4422^n)$ | 列出所有極大完全子圖 |
| Tarjan & Trojanowski [1977] | $O(1.2599^n)$ |  |
| Jian [1986] | $O(1.2346^n)$ |  |
| Robson [1986] | $O(1.2108^n)$ |  |
| Robson [2001] | $O(1.1888^n)$ |  |



## 參考資料

* http://users.monash.edu.au/~davidwo/MoonMoser65.pdf
* https://www.sciencedirect.com/science/article/pii/S0304397506003586?via%3Dihub
* https://arxiv.org/pdf/1006.5440.pdf