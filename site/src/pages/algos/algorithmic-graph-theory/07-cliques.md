---
category: "algo"
path: "/algo/algorithmic-graph-theory/cliques"
date: "2019-02-28"
title: "圖論演算法 7 - 完全子圖 Cliques"
---

如果一個簡單圖的任兩個點之間都有一條邊相連，那麼這個圖被稱為**完全圖**（Complete Graph）。通常我們會用 $K_n$ 來表示有 $n$ 個點的完全圖。而完全子圖（Clique）則是指給定一個簡單圖當中，任兩點之間都有連邊的一個子圖。如果一個圖 $G$ 上的完全子圖，不存在任何其他點連到這個子圖上的所有點（也就是說不存在更大的完全子圖包含它），那我們就稱這個子圖為**極大完全子圖**（Maximal Clique）。

如果這個完全子圖在圖上擁有最大的點數，那我們稱它為**最大完全子圖**（Maximum Clique），通常我們將最大完全子圖的點數以 $\omega(G)$ 表示之。找出最大完全子圖的大小在計算上是困難的，這是一個 $\mathsf{NP}$-完全問題。那要怎麼找出最大完全子圖呢？我們可以先從極大完全子圖下手，如果能夠找出所有極大完全子圖，那最大的一個自然就是最大完全子圖了。

## §7.1 極大完全子圖

Moon 跟 Moser 在 1965 年證明了任何一個有 $n$ 個點的圖 $G$，上面的極大完全子圖數量不超過 $O(3^{n/3})$ 個。

<theorem title='極大完全子圖的數量上界 [Moon-Moser 1965]'>
任何一個有 $n$ 個點的圖 $G$，其極大完全子圖的數量至多為：
$$
\begin{cases}
3^{n/3}, & \text{if $n\equiv 0 \pmod 3$,}\\
4\times 3^{\lfloor n/3\rfloor}-1, & \text{if $n\equiv 1 \pmod 3$,}\\
2\times 3^{\lfloor n/3\rfloor}, & \text{if $n\equiv 2 \pmod 3$,}\\
\end{cases}
$$
</theorem>

#### 證明

我們可以用逐步調整的方法，找出擁有最多極大完全子圖的圖。對於圖 $G$ 而言，考慮任兩個沒有相鄰的點 $x, y$。顯然任何的極大完全子圖，無法同時包含 $x$ 和 $y$ 兩者。我們查看圖 $G$ 上面，分別有多少個包含 $x$ 與包含 $y$ 的極大完全子圖數量。令這兩個數值為 $C_x$ 和 $C_y$。不妨假設 $C_x \le C_y$。此時，我們將 $x$ 所有鄰邊砍掉、並且與所有 $y$ 的鄰居連邊（也就是說，$G_{\text{新}}\gets G_{\text{舊}} -\set{(x, x') \ |\ x'\in \Gamma(x)} \cup \set{(x, y') \ |\ y'\in \Gamma(y)}$）。

這個動作並不會減少極大完全子圖的數量。失去的極大完全子圖都是那些圖 $G_{\text{舊}}$ 上面原本包含 $x$ 的極大完全子圖。而新增的極大完全子圖包含兩類：

1. 原圖上包含 $y$ 的極大完全子圖，只不過把 $y$ 換成 $x$。
2. 「原本包含 $x$ 的極大完全子圖」的子圖，因為 $x$ 被去掉了所以變成了真正的極大完全子圖。

但第一類至少有 $C_y$ 種，第二類至少有 $0$ 種。因此極大完全子圖的數量並不會減少。經過一連串調整之後，最後的圖會變成 $p$-分圖：整個點集合 $V$ 會被拆成若干集合 $V_1, V_2, \ldots, V_p$，而每一個部份 $V_i$ 都是獨立集；除此之外對於任意 $i\neq j$，$x\in V_i, y\in V_j$ 必定有連邊 $(x, y)\in E$。不難得知這種時候的極大完全圖的數量是 $\prod_i |V_i|$。而這個值在儘量分配每個部份都是 $3$ 個點的時候得到最大值（除了最後一部分可以是 2 個或 4 個點）。

### 枚舉極大完全子圖


| 演算法 | 複雜度 | 備註 |
|-------|-------|------|
| Bron-Kerbosch [1973] | 很糟 | 會找到很多非極大完全子圖。 |
| Tomita et al. [2006] | $O(3^{n/3})$ | Bron-Kerbosch with pivot |
| Eppstein at al. [2010] | $O(dn3^{d/3})$ | $d$ 是 degeneracy |
| Tsukiyama [1977] | $O(n(n^2-m)\mu)$ | $\mu$ 是輸出的 maximal clique 數量。 |
| Chiba and Nishizeki [1985] | $O(a(G)m\mu)$ | $a(G)$ 是 arboricity of $G$。 |
| Makino and Uno [2004] | $O(\Delta^4\mu)$ | $\Delta=\Delta(G)$。 |


## §7.2 Bron–Kerbosch 演算法

基本上就是個 DFS，只是在搜索過程中，我們維護三個點集合：$P, R, X$，代表我們目前欲探索的極大完全子圖，必須包含 $R$ 當中的所有點、可能包含 $P$ 當中的某些點、以及**不能**包含 $X$ 中的任何一點。



### Bron-Kerbosch with Pivot

<theorem title='時間複雜度分析 [Tomita et al. 2006, Eppstein et al. 2010]'>
使用 Pivot 的 B-K 演算法滿足遞迴式 $$
T(n) = \max_k\set{ kT(n-k) } + O(n^2), $$
其中 $n=|P|$。
</theorem>

#### 證明

令 $k=|P\setminus \Gamma(u)|$。
如果挑選的 $u = \arg\max_{v\in P\cup X} |P\cap \Gamma(v)|$，那麼每一次遞迴呼叫保證有 $|P\cap \Gamma(v)|\le n-k$。因此最壞情況下遞迴所需要的時間是 $\max_k\set{kT(n-k)}$。找出 Pivot 可以在 $O(n^2)$ 時間內完成。

上面這個遞迴式解得 $T(n) = O(3^{n/3})$，剛好等於一個圖中可能的極大完全子圖的數量，非常湊巧。


## §7.3 找出一個最大完全子圖

列舉出所有極大完全子圖，就可以理所當然地找出最大的一個。但為了找出最大的完全子圖，不盡然需要列出所有極大完全子圖。也就是說，可能存在 worst-case 更快的演算法解決 Maximum Clique 問題。

大部分的算法都是源自於 Tarjan and Trojanowski [1977] 找最大獨立集的演算法，加上繁複的 Case Analysis 得來的，我們將在下一節討論。

| 演算法 | 複雜度 | 備註 |
|-------|-------|------|
| Bron-Kerbosch [1973] | $O(1.4422^n)$ | 列出所有極大完全子圖 |
| Tarjan & Trojanowski [1977] | $o(2^{n/3}) \approx O(1.2599^n)$ |  |
| Jian [1986] | $O(1.2346^n)$ |  |
| Robson [1986] | $O(1.2108^n)$ |  |
| Robson [2001] | $O(1.1888^n)$ |  |

## 參考資料

* http://users.monash.edu.au/~davidwo/MoonMoser65.pdf
* https://www.sciencedirect.com/science/article/pii/S0304397506003586?via%3Dihub
* https://arxiv.org/pdf/1006.5440.pdf
* https://www.ics.uci.edu/~goodrich/teach/graph/notes/Strash.pdf
* [George Manoussakis, _An Output Sensitive Algorithm for Maximal Clique Enumeration in Sparse Graph_, 2018](http://drops.dagstuhl.de/opus/volltexte/2018/8552/pdf/LIPIcs-IPEC-2017-27.pdf)

## 習題

1. <span class='tag is-link'>演算法</span> 給你圖 $G$ 的補圖 $\overline{G}$。假設已知這個圖上有一個大小為 $2n/3$ 的 Clique，請你設計一個演算法找出任何一個大小為 $n/3$ 的 Clique。