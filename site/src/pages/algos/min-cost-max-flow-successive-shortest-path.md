---
category: "algo"
path: "/algo/min-cost-max-flow-successive-shortest-path"
date: "2018-11-21"
title: "最小費用流的最短路徑增廣法 [草稿]"
---

讓我們首先[回顧](/algo/min-cost-max-flow)一下最小費用循環的線性規劃主模型（Primal Problem）、以及其對偶模型（Dual Problem）。令 $f(u, v)$ 為線性規劃模型的變數、$y(u, v)$ 以及 $d(v)$ 為其對偶模型的變數名。我們定義以下三種條件：

* P 條件：$f$ 滿足線性規劃模型的條件，即 $f$ 是一個合法的網路流。
* D 條件：$y, d$ 滿足對偶模型的條件，即 $y(u, v)-d(u)+d(v) \le cost(u, v)$。
* CS 條件：$f, y, d$ 滿足[互補差餘](http://terms.naer.edu.tw/detail/559045/)條件，即
$$
\begin{cases}
f(u, v) > 0 & \implies y(u, v) = d(u) + cost(u, v) - d(v)\\
f(u, v) < cap(u, v) & \implies y(u, v) = 0
\end{cases}
$$

由線性規劃的各種性質我們可以知道，只要 $f, y, d$ 這三組變數同時滿足 P條件、D條件以及 CS條件的話，保證 $f, y, d$ 分別是主模型和對偶模型的最佳解。

<theorem title='最佳條件'>設 $f$ 是一個圖 $G$ 上面的網路流。若存在剩餘網路 $G_f$ 上面的距離函數 $d^*$ （即，滿足 $\forall (u, v)\in G_f, \ d^*(u) + cost(u, v) \ge d^*(v)$），那麼 $f$ 是主模型的最佳解。
</theorem>