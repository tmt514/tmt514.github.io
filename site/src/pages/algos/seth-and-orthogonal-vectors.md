---
category: "algo complexity"
path: "/algo/strong-exponential-time-hypothesis"
date: "2018-12-04"
title: "強指數時間假說 Strong Exponential Time Hypothesis"
---

關於 P vs NP 這個計算機學界最重要的問題之一，至今仍是懸而未解。1990年代，大量 NP-Complete 的證明興起，也讓研究計算理論領域的人們對於 NP-完備的概念有著比較深刻的理解。對於一個問題，究竟是多項式時間可解、或是它比任何一個 NP-Complete 的問題還要難，往往也有跡可循。

許多演算法的分支：近似演算法（Approximation Algorithms）、指數時間演算法（Exponential Time Algorithms）等，利用搜索與剪枝、貪婪法、模擬退火等各種技巧，無所不用其極，都是因應傳統演算法所需要耗費的時間或空間嚴重不足而產生的。而 NP-Complete 是一個很好的 "hint"：在這個大多數的人們相信著 P $\neq$ NP 的世界裡，要找出又快又最好的解往往是不可能的事情。一旦我們能夠證明一個問題是 NP-Hard 的，那麼在現實生活中，如果要有效率的解決這個問題，恐怕只能仰賴搜索或近似解了。

## $k$-CNF-SAT

先跟大家介紹一個 NP-Complete 當中的指標性問題：

<theorem title='$k$-CNF-SAT 問題' c='is-info'>
**輸入**：給定 $n$ 個變數 $x_1, x_2, \ldots, x_n$ 以及一個 k-CNF $\Phi$。其中 $\Phi = C_1\land C_2\land \cdots \land C_m$，$m=O(n)$。每一個 clause 可以被許多 literals 描述 $C_i = (\ell_{i1}\lor \ell_{i2}\lor \cdots \lor \ell_{ik})$，其中每一個 literal 就是任何一個變數 $x$ 或其 negation $\lnot x$。
  
**問題**：是否存在一個合法的賦值方式，使得 $\Phi$ 為真？
</theorem>

目前世界上最快的精確演算法（Exact Algorithm），在最壞情形下得跑 $2^{(1-o(1/k))n}$ 時間。也就是說，當 $k$ 真的超大的時候，這些演算法在最壞情形下都得花到扎扎實實 $2^n$ 的時間。於是乎，大家逐漸提出了以下的想法：

<theorem title='強指數時間假說 Strong Exponential Time Hypothesis (SETH)'>
對於任意的常數 $\epsilon > 0$，任何精確演算法皆無法在 $2^{(1-\epsilon)n}$ 時間內同時對任意 $k$ 解決 $k$-CNF-SAT 問題。
</theorem>

這個想法看起來很直覺，但是目前也還沒有人能夠真的證明或否定它。有趣的事情是，這個假說提供了厲害的基礎，如果這個假說是對的，那麼有很多演算法就會變成了「理論上最優」的演算法了！

## 證明 NP-完備性的一貫方法

如果要證明一個題目 $X$ 是 NP-完備（NP-Complete）的，那麼我們需要從一個 NP-完備問題 $Y$ 出發，然後試圖將它的輸入在多項式時間內轉化成 $X$。然後斷定結論說「如果我們能在多項式時間內解決 $X$，那麼我們就可以在多項式時間內解決 $Y$。但是因為 $Y$ 是 NP-完備的，可以在多項式時間內解決 $Y$ 就代表可以在多項式時間內解決所有 NP 裡面的問題，於是 NP $=$ P。」

## P 的細分

很久很久以前大家就知道洋蔥定理 [Time Hierarchy Theorem](https://en.wikipedia.org/wiki/Time_hierarchy_theorem) 了（我一直很喜歡隨機客老師稱呼這個定理的說法）。簡而言之，洋蔥定理描述的事情是：在所有 P 裡面的問題，不存在常數 $c$ 使得所有的問題都能在 $n^c$ 的時間被解掉。

但這些定理所描述的一些 hardness problems 或反例與現實世界中的問題相距甚遠。2005 年由 Ryan Williams 提出了以下的「正交向量問題」，建立了指數時間演算法與多項式時間演算法之間的關聯。有趣的是，這個正交向量問題能夠轉化(reduce)成更多大家熟知的題目，包含最長共同部分子序列(LCS)等問題。也就是說，這一連串的轉化得到以下結論：如果存在更有效率的某某多項式演算法，就能夠推翻強指數時間假說。

<!--
2001 年的 Impagliazzo, Paturi & Zane 提出了重要的引理。然後在 
-->

我們先來看看正交向量問題吧：

<theorem title='正交向量問題 Orthogonal Vector Problem (OV)' c='is-info'>
**輸入**: 給定 $d$ 維布林空間中的兩個向量集合 $A, B\subset \{0, 1\}^d$，而集合大小 $|A|=|B|=N$。我們不妨假設 $d=\Theta(\log N)$。
  
**問題**: 是否存在 $a\in A, b\in B$ 使得 $\langle a, b\rangle = 0$？
</theorem>

看起來樸實無華的問題，如果要跟時下最夯的 Document Similarity 扯上邊好像也是可以齁（我就不多言了。）重點是，我們可以把 CNF-SAT 問題轉化成 Orthogonal Vector 問題，進而得到以下定理：

<theorem title='定理：$\textsf{CNF-SAT}\le_p \textsf{OV}$'>
若存在一個常數 $\epsilon>0$ 以及一個演算法能在 $N^{2-\epsilon}$ 時間內解決正交向量問題，那麼就存在一個常數 $\epsilon' > 0$，以及一個演算法能在 $2^{(1-\epsilon')n}$ 時間內解出 CNF-SAT 問題。
</theorem>

### 證明

不妨假設在 CNF-SAT 問題裡面的 $n$ 是偶數。我們把變數分成兩群：
$S_1=\set{x_1, x_2, \ldots, x_{n/2}}$ 以及 $S_2 = \set{x_{n/2+1}, \ldots, x_{n-1}, x_n}$。枚舉這兩群變數所有可能的賦值情形，分別有 $2^{n/2}$ 種。（這個概念有點像是拆兩半的枚舉。）

讓我們來考慮 $S_1$：對於第 $i$ 種賦值情形，我們可以拿它來對照所有的 $m$ 個 clause，然後用這個資訊構造出一個長度為 $m$ 的 0-1 字串 $a_1a_2\cdots a_m\in\set{0,1}^m$：考慮第 $j$ 個子句 $C_j$，如果目前對於 $x_1, \ldots, x_{n/2}$ 的賦值能保證 $C_j$ 為真，我們就令 $a_j=0$，否則令 $a_j=1$。

同理而言，我們也能夠針對後半段 $S_2$ 所有可能的變數賦值，構造出集合 $B$：若 $C_j$ 能被後半段的賦值給滿足，那麼就讓 $b_j=0$，否則令 $b_j=1$。

行文至此，我們可以想像一下，如果我們拿構造出來的 $a_1a_2\cdots a_m$ 與 $b_1b_2\cdots b_m$ 計算其內積，得到的值代表什麼意思？如果內積的值為 $0$，則代表對於所有 $j$，要嘛 $a_j=0$ 要嘛 $b_j=0$，這代表我們找出來的 $S_1$ 賦值與 $S_2$ 賦值剛好可以滿足所有的子句！也就是說存在一個 $\Phi=\mathsf{true}$ 的一個解，若且唯若存在一組 $a\in A, b\in B$ 使得 $\langle a, b\rangle = 0$。

現在讓我們來檢視集合大小，也就是 $n, m, N, d$ 之間的關係。集合 $A$ 與 $B$ 分別對應到 $S_1$ 與 $S_2$ 的賦值方式，所以 $N=|A|=|B|=2^{n/2}$。每一個構造出來的字串長度為 $m=O(n)$，因此 $d=m=n=\Theta(\log N)$ 滿足題目要求。所以囉，如果有一個 $N^{2-\epsilon}$ 時間複雜度的方法可以解 OV，那麼就有一個 $\left(2^{n/2}\right)^{2-\epsilon} = 2^{(1-\epsilon/2)n}$ 時間複雜度的方法可以解 CNF-SAT 問題，與強指數時間假說(SETH)矛盾。

## 參考資料

* [維基百科: Exponential Time Hypothesis](https://en.wikipedia.org/wiki/Exponential_time_hypothesis)
* [Ryan Williams, A new algorithm for optimal constraint satisfaction and its implications, 2005.](https://people.csail.mit.edu/rrw/2-csp-final.pdf)