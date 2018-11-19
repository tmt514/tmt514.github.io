---
category: "algo"
path: "/algo/min-cost-max-flow"
date: "2018-11-16"
title: "最小費用流 Min-Cost Max-Flow"
---

這篇文章是線性規劃章節的延伸，但目前還沒有寫線性規劃相關文章。還請大家先行理解**線性規劃**與**對偶性質**XD

## 最小費用流問題

<div class="message is-info"><div class="message-body">
給定一個圖 $G=(V, E, cap: E\to \mathbb{R}_{\ge 0}, cost: E\to \mathbb{R})$，每一條邊都有一個流量上限 $cap$ 和單位流量花費 $cost$。試問，從 $s$ 到 $t$ 的所有最大流之中，最小的花費為何？
</div></div>

這個問題由於有 $s$ 和 $t$ 兩個特殊點，實際處理起來可能稍微麻煩些，所以我們先把它轉化成最小費用循環問題（Min-Cost Circulation）。轉化方法很簡單，其實只是加一條額外的邊 $t\to s$，容量為無窮大、單位流費用為一個負很大的數字 $-\mathit{big}$。

## 最小費用循環 Min-Cost Circulation

<div class="message is-info"><div class="message-body">
給定一個圖 $G=(V, E, cap: E\to \mathbb{R}_{\ge 0}, cost: E\to \mathbb{R})$，每一條邊都有一個流量上限 $cap$ 和單位流量花費 $cost$。找一個 Circulation（沒有起點和終點的網路流） 使得總花費最小。
</div></div>

如果所有的花費都是正的，顯然一個空的流（總花費是 0）是最佳解。如果我們把這個問題的條件寫成線性規劃的形式，令 $f(u, v)$ 表示該條邊上面的流量，那麼它會長得像這樣：

$$
\begin{align*}
\text{minimize}\ \ & \sum f(u, v) \cdot cost(u, v)\\
\text{subject to}\ \ & {\color{green}{\forall (u, v),\ \ f(u, v) \le cap(u, v)}} & {\color{green}{\text{ (容量限制)}}}\\
& {\color{brown}{\forall v\in V, \ \ \sum_u f(u, v) - \sum_u f(v, u) = 0}} & {\color{brown}{\text{ (流量守恆)}}}\\
\text{variables}\ \ & f(u, v) \ge 0
\end{align*}\\
$$

如果我們試圖找出他的對偶問題，那麼每一個條件會變成對偶問題的變數、而每一個變數也會對應到對偶問題的一個條件：對於每一個容量限制，我們用 $y(u, v)$ 作為容量限制條件的對應變數、令 $d(v)$ 作為流量守恆條件的對應變數。

$$
\begin{align*}
\text{maximize}\ \ & \sum {\color{green}{y(u, v)}} \cdot cap(u, v)\\
\text{subject to}\ \ & \forall (u, v), \ \ {\color{green}{y(u, v)}} - {\color{brown}{d(u)}} + {\color{brown}{d(v)}} \le cost(u, v)\\
\text{variables}\ \ & {\color{green}{y(u, v)}} \le 0
\end{align*}\\
$$

## 參考資料

1. [最小均值圈與最小費用流 Columbia講義](http://www.columbia.edu/~cs2035/courses/ieor6614.S12/mcf-sp.pdf)
