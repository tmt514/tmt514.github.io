---
category: "algo"
path: "/algo/martingales"
date: "2019-04-30"
title: "Martingales 筆記"
---

<note>
學習歷程:

1. 理解 Martingale (鞅) 的定義
2. 理解 Stopping Time 的定義
3. 理解 Optional Stopping Theorem
4. 應用：Gambling Problem

</note>

## 1 定義 (Martingale)

A random process $\{X_n: 0\le n\le \infty\}$ is a martingale with respect to the information filteration, $\mathcal{F}_n$, and probability distribution, $P$, if

1. $\mathbf{E}^P[|X_n|] < \infty$ for all $n\ge 0$.
2. $\mathbf{E}^P[X_{n+m} | \mathcal{F}_n] = X_n$ for all $n, m\ge 0$.

其中第一點只是技術性的條件，避免 $X_n$ 期望值不存在的情形。

### 範例 1: Random Walk

Let $S_n := \sum_{i=1}^n X_i$ be a random walk where $X_i$'s are IID with mean $\mu$.

Let $M_n := S_n - n\mu$. Then $M_n$ is a martingale.

### 範例 2: Martingale Betting Strategy

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

### 範例 3: Random Walk

If $Z_n=\sum_{i=1}^n X_i$ where $\mathbf{E}[X_i | X_{i-1}, \ldots, X_1] = 0$ for each $i\ge 1$, then $\{Z_n: n\ge 1\}$ is a martingale.

### 範例 4: More Random Walk

Let $X_i = U_iY_i$ where $\{U_i: i\ge 1\}$ are IID, equiprobable $\pm 1$. The $Y_i$ are independent of the $U_i$. Then $\{Z_n: n\ge 1\}$, where $Z_n = X_1 + \cdots + X_n$ is a martingale.
[MIT Opencourse Video](https://youtu.be/TOvSJkC1nRI?t=536)

* $Y_i$ 真的沒限制，只要 $U_iY_i$ 期望值是 0 就行了。

### 範例 5: Product Form Martingale

Let $\{X_i: i\ge 1\}$ be a sequence of IID unit-mean rv's. Then $\{Z_n: n\ge 1\}$, where $Z_n = X_1X_2\cdots X_n$, is a martingale.

## 2 定義 (Stopping Time)

Let $(\mathcal{F}_i)$ be a filter. A random variable $\tau\in \{0,1,2,\ldots, \}\cup\{\infty\}$ is a stopping time for the filter $(\mathcal{F}_i)$ if the event $\{\tau=i\}$ is $\mathcal{F}_i$-measurable.

這句話的意思大概是說 $\tau$ 是一個 random variable, 而且決定 $\tau=i$ 這件事情只由時間 $i$ 以前看到的事實決定。

<theorem title='Optimal Stopping Time Theorem'>

Let $(X_i)$ be a martingale and $\tau$ be a stopping time with respect to a filter $(\mathcal{F}_i)$. Then $\mathbf{E}[X_\tau] = \mathbf{E}[X_0]$ 
holds whenever **all** following conditions hold:

1. $\Pr[\tau < \infty] = 1$.
2. $\mathbf{E}[|X_\tau|] < \infty$.
3. $\mathbf{E}[X_i\mathbb{I}{\set{\tau >i}}] \to 0$ as $i\to \infty$, where $\mathbb{I}{\set{\tau > i}}$ is the indicator of the event $\set{\tau >i}$.

Alternatively (and more pratically), the theorem holds if **at least** one of the following holds:

1. $T$ is bounded, that is, $\Pr[\tau\le k] = 1$ for some $k\in\mathbb{N}$.
2. $|X_k|$ is bounded for all $k\in\mathbb{N}$.
3. $\mathbf{E}[\tau] < \infty$ and $\mathbf{E}[|X_i-X_{i-1}|\ |\ \mathcal{F}_i] \le c$ for all $i$ and some constant $c$.

</theorem>

### 引理：Stopped Martingale

Let $\{X_n: n\ge 0\}$ be a Martingale, and $\tau$ is a stopping time w.r.t. $\{X_n\}$. Then the _stopped process_ $\set{\overline{X}_n: n\ge 0}$ is a Martingale too, where 

$$
\begin{align*}
\overline{X}_n &= \begin{cases}
X_n & \text{if } \tau > n,\\
X_{\tau} & \text{if } \tau \le n.
\end{cases} \\
&= X_{n\land \tau}
\end{align*}
$$

$n\land \tau$ is defined to be $\min(n, \tau)$.

如果我們有 $\Pr[\tau < \infty] = 1$，那麼就會保證 with probability 1,
$$ \lim_{n\to\infty} \overline{X}_n = X_\tau. $$


## 應用

### 醉漢走路問題：公正硬幣

<theorem c='is-success'>
每一次丟一枚公正硬幣，移動位置 $+1$ 或 $-1$。
給定兩個結束位置 $a < 0 < b$，踩到 $a$ (停損) 或 $b$ (獲利) 就停止。
</theorem>

#### 目標 1: 計算獲勝機率

#### 目標 2: 計算停止期望步數

Let $Y_i = S_i^2 - i$, then $\{Y_i\}$ is martingale.

### 不公正的硬幣

<theorem c='is-success'>
移動位置 $\Pr(\xi_i=+1) = p$, $\Pr(\xi_i = -1) = 1-p = q$。
給定兩個結束位置 $a < 0 < b$，踩到 $a$ (停損) 或 $b$ (獲利) 就停止。
</theorem>

定義 $S_n = \xi_1+\cdots+\xi_n$、以及 $\phi(x) = \left(\frac{1-p}{p}\right)^x$。則 $\phi(S_n)$ 是一個 martingale。

### Doob's 萬用 martingale 構造法

Let $F$ be any finite random variable, and $\{X_i\}$ is a random process. Then $Z_i = \mathbf{E}[F\ |\ X_0, X_1, \ldots, X_i]$ is a martingale.


## 參考資料

* Coursera https://www.coursera.org/lecture/financial-engineering-2/introduction-to-martingales-k18A8 
* MIT 6.262 Lecture 24 https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-262-discrete-stochastic-processes-spring-2011/video-lectures/lecture-24-martingales-stopping-and-converging/
* Berkeley CS271 Lecture 23 https://people.eecs.berkeley.edu/~sinclair/cs271/n23.pdf
* The Martingale Stopping Theorem https://www.math.dartmouth.edu/~pw/math100w13/lalonde.pdf
* ASU APM504: Lecture 28 https://math.la.asu.edu/~jtaylor/teaching/Spring2011/APM504/lectures/lecture28/lecture28.pdf 