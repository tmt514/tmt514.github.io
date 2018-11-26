---
category: "algo"
path: "/algo/min-cost-max-flow"
date: "2018-11-16"
title: "最小費用流 Min-Cost Max-Flow"
---

這篇文章是線性規劃章節的延伸，但目前還沒有寫線性規劃相關文章。還請大家先行理解**線性規劃**與**對偶性質**XD

## 最小費用流 Min-Cost Max-Flow

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

由於 ${\color{green}{y(u, v)}}$ 值永遠非正的，而每一個值又只會出現在恰好一個對偶條件裡面，外加上 $cap(u, v) \ge 0$。我們可以知道，當 ${\color{brown}{d(v)}}$ 的所有值固定以後，永遠可以找到一組 ${\color{green}{y(u, v)}}$ 滿足對偶條件：只要令
$$
{\color{green}{y(u, v)}} = \min\{0, {\color{brown}{d(u)}} + cost(u, v) - {\color{brown}{d(v)}}\}
$$
就可以了。

正確地寫下最小費用循環的線性規劃模型以後，我們就可以利用線性規劃的最佳解性質，幫助我們判斷找到的網路流是不是最佳解。

## 最佳解的性質

線性規劃的對偶觀念中，最重要的三件事情「弱對偶性」、「強對偶性」以及「[互補差餘](http://terms.naer.edu.tw/detail/559045/)」（這詞﹍）。假設我們今天已經找到了圖 $G$ 上面的網路流 $f$，我們要怎麼檢驗或確認這個 $f$ 是最佳解呢？

<div class="message is-warning">
<div class="message-header">
弱對偶性（Weak Duality）
</div>
<div class="message-body">
若 $f$ 是最小費用流線性規劃的一個可行解，且 $y, d$ 是滿足對偶條件的對偶問題可行解。那麼必定有
$$
\sum f(u, v)\cdot cost(u, v) \ge \sum y(u, v)\cdot cap(u, v)。
$$
</div></div>

弱對偶性（Weak Duality）告訴我們，如果存在一組對偶可行解 $y(u, v)$、$d(v)$ 滿足 $\sum f(u, v)\cdot cost(u, v) = \sum y(u, v)\cdot cap(u, v)$，那麼 $f, y, d$ 同時都是最佳解。如果我們的演算法可以正確地輸出 $f, y, d$，那麼從這個輸出就可以得知正確性。

------

## 最小費用流的演算法

基於以上論述，綜觀歷來的最小費用流解法們，可以大致分成兩個門派：

### 消圈演算法（Cycle-Cancellation Algorithms）

主要的概念是在每一次迭代的過程中，永遠保證 $f$ 是一個可行解（feasible solution，也就是一個合法的網路流），在對偶空間中試圖搜尋滿足條件的 $d$ 值。如果找不到滿足條件的 $d$ 值，代表剩餘網路 $G_f$ 上不存在距離函數（有負圈！），也因為有負圈，我們可以在這個負圈上推一個流，讓其中一條邊流滿。這個動作可以讓負圈消失、也因為找到這個負圈，推流後可以讓整體費用下降。

### 最短路徑增廣法（Successive-Shortest-Path Algorithms）

主要的概念是在每一次迭代的過程中，永遠保證 $d$ 是一組滿足對偶條件的距離函數，並且我們維護一個假想流 $f$（pseudo flow：只滿足<span style="color:green">容量限制</span>但可能無法<span style="color:brown">流量守恆</span>）。然後試圖更新這個假想流，一旦更新後滿足了流量守恆，我們就得到解了（因為隨時保證 $d$ 以及從 $d$ 推導出的 $y$ 永遠是合法的對偶問題可行解）。

我們會在未來的文章介紹這兩種演算法的細節與簡單版的實作。

------


## 習題

1. 我們用加了一條邊（$cap=\infty, cost=-big$）的方法把「Min-Cost Max-Flow」轉化成「Min-Cost Circulation」。如果我們今天不要求「最大流」，只要找一個流，讓總花費最小，應該要如何進行轉化呢？

