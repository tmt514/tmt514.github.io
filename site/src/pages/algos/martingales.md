---
category: "algo"
path: "/algo/martingales"
date: "2019-04-30"
title: "Martingales 筆記"
---

## 定義

A random process $\{X_n: 0\le n\le \infty\}$ is a martingale with respect to the information filteration, $\mathcal{F}_n$, and probability distribution, $P$, if

1. $\mathbf{E}^P[|X_n|] < \infty$ for all $n\ge 0$.
2. $\mathbf{E}^P[X_{n+m} | \mathcal{F}_n] = X_n$ for all $n, m\ge 0$.

其中第一點只是技術性的條件，避免 $X_n$ 期望值不存在的情形。

## 範例 1: Random Walk

Let $S_n := \sum_{i=1}^n X_i$ be a random walk where $X_i$'s are IID with mean $\mu$.

Let $M_n := S_n - n\mu$. Then $M_n$ is a martingale.

## 範例 2: Martingale Betting Strategy

每一回合你可以選擇下注 $X$ 元，每一回合都有 1/2 機率贏或輸。若贏，則可以額外獲得你下注的金額 $X$ 元。若輸，則你會失去 $X$ 元。

一個 Doubling Strategy 表示：第 $i$ 回合下注 $2^{i-1}$ 元，直到你獲勝為止。

Let $W_n$ denote the total winnings after $n$ coin tosses assuming $W_0=0$. Then $W_n$ is a martingale.

It suffices to show that $\mathbf{E}[W_{n+1}|W_n] = W_n$.

* If $W_n=1$, then we stop playing the game. So $\mathbf{E}[W_{n+1}|W_n=1] = 1$.
* If $W_n=-2^n+1$: then we will bet $2^n$ on the $(n+1)^\mathrm{th}$ round so
$\begin{align*}
\mathbf{E}[W_{n+1}|W_n=-2^n+1] &= \frac{1}{2}\times 1 + \frac{1}{2}\times (-2^{n+1}+1) \\
&= -2^n+1
\end{align*}$

## 範例 3: Random Walk

If $Z_n=\sum_{i=1}^n X_i$ where $\mathbf{E}[X_i | X_{i-1}, \ldots, X_1] = 0$ for each $i\ge 1$, then $\{Z_n: n\ge 1\}$ is a martingale.

## 範例 4: More Random Walk

Let $X_i = U_iY_i$ where $\{U_i: i\ge 1\}$ are IID, equiprobable $\pm 1$. The $Y_i$ are independent of the $U_i$. Then $\{Z_n: n\ge 1\}$, where $Z_n = X_1 + \cdots + X_n$ is a martingale.
[MIT Opencourse Video](https://youtu.be/TOvSJkC1nRI?t=536)

* $Y_i$ 真的沒限制，只要 $U_iY_i$ 期望值是 0 就行了。

## 範例 5: Product Form Martingale

Let $\{X_i: i\ge 1\}$ be a sequence of IID unit-mean rv's. Then $\{Z_n: n\ge 1\}$, where $Z_n = X_1X_2\cdots X_n$, is a martingale.

## 參考資料

* Coursera https://www.coursera.org/lecture/financial-engineering-2/introduction-to-martingales-k18A8 
* MIT 6.262 Lecture 24 https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-262-discrete-stochastic-processes-spring-2011/video-lectures/lecture-24-martingales-stopping-and-converging/