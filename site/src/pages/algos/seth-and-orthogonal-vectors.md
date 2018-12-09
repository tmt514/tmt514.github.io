---
category: "algo complexity"
path: "/algo/strong-exponential-time-hypothesis"
date: "2018-12-04"
title: "強指數時間假說 Strong Exponential Time Hypothesis [草稿]"
---

關於 P vs NP 這個計算機學界最重要的問題之一，至今仍是懸而未解。1990年代，大量 NP-Complete 的證明興起，也讓研究計算理論領域的人們對於 NP-完備的概念有著比較深刻的理解。對於一個問題，究竟是多項式時間可解、或是它比任何一個 NP-Complete 的問題還要難，往往也有跡可循。

許多演算法的分支：近似演算法（Approximation Algorithms）、指數時間演算法（Exponential Time Algorithms）等，利用搜索與剪枝、貪婪法、模擬退火等各種技巧，無所不用其極，都是因應傳統演算法所需要耗費的時間或空間嚴重不足而產生的。而 NP-Complete 是一個很好的 "hint"：在這個大多數的人們相信著 P $\neq$ NP 的世界裡，要找出又快又最好的解往往是不可能的事情。一旦我們能夠證明一個問題是 NP-Hard 的，那麼在現實生活中，如果要有效率的解決這個問題，恐怕只能仰賴搜索或近似解了。

## $k$-CNF-SAT

先跟大家介紹一個 NP-Complete 當中的指標性問題：

<theorem title='k-CNF-SAT 問題' c='is-info'>
給定 $n$ 個變數 $x_1, x_2, \ldots, x_n$ 以及一個 k-CNF $\Phi$。其中 $\Phi = C_1\land C_2\land \cdots \land C_m$，$m=O(n)$。每一個 clause 可以被許多 literals 描述 $C_i = (\ell_{i1}\lor \ell_{i2}\lor \cdots \lor \ell_{ik})$，其中每一個 literal 就是任何一個變數 $x$ 或其 negation $\lnot x$。
</theorem>

目前世界上最快的精確演算法（Exact Algorithm），在最壞情形下得跑 $2^{(1-o(1/k))n}$ 時間。也就是說，當 $k$ 真的超大的時候，這些演算法在最壞情形下都得花到扎扎實實 $2^n$ 的時間。於是乎，大家逐漸提出了以下的想法：

<theorem title='強指數時間假說 Strong Exponential Time Hypothesis (SETH)'>
對於任意的常數 $\epsilon > 0$，任何精確演算法皆無法在 $2^{(1-\epsilon)n}$ 時間內解決 CNF-SAT 問題。
</theorem>

這個想法看起來很直覺，但是目前也還沒有人能夠證明或否定它。有趣的事情是，這樣一個假說提供了厲害的基礎，可以讓我們一窺多項式時間裡面，

## 證明 NP-完備性的一貫方法

如果要證明一個題目 $X$ 是完備的，那麼我們需要從一個 NP-完備問題 $Y$ 出發，然後試圖將它的輸入在多項式時間內轉化成 $X$。然後斷定結論說「如果我們能在多項式時間內解決 $X$，那麼我們就可以在多項式時間內解決 $Y$。但是因為 $Y$ 是 NP-完備的，可以在多項式時間內解決 $Y$ 就代表可以在多項式時間內解決所有 NP 裡面的問題，於是 NP $=$ P。」

## P 的細分

很久很久以前大家就知道洋蔥定理 [Time Hierarchy Theorem](https://en.wikipedia.org/wiki/Time_hierarchy_theorem) 了（我一直很喜歡隨機客老師稱呼這個定理的說法）。簡而言之，洋蔥定理描述的事情是：在所有 P 裡面的問題，不存在常數 $c$ 使得所有的問題都能在 $n^c$ 的時間被解掉。

但這些定理所描述的一些 hardness problems 或反例與現實世界中的問題相距甚遠。

2001 年的 Impagliazzo, Paturi & Zane 提出了重要的引理。然後在 2005 年由 William 

## 參考資料

* [維基百科: Exponential Time Hypothesis](https://en.wikipedia.org/wiki/Exponential_time_hypothesis)