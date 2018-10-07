---
layout: post
title: Max-flow 與 Min-cut 對偶模型之機率證明
tags: 組合最佳化 機率
draft: true
---

# 最大流的線性規劃模型

在一個有向圖 $G = (V, E)$ 上面我們給予每一條邊一個容量 $c: E\to \mathbb{R}^{\ge 0}$。一個網路流 (flow) 便是一個函數
$f: E\to \mathbb{R}^{\ge 0}$。除了源點 (source) $s\in V$ 以及匯點 (sink) $t\in V$ 以外；一個合法的流必須要滿足

1. $f(e) \le c(e) \ \forall e\in E$.
2. $f(\delta\_{in}(v)) = f(\delta\_{out}(v))\ \forall v\neq s, v\neq t, v\in V$.

因此，我們令解為 $\lambda$，根據以上條件我們可以得到最大流的線性規劃模型：

$$
\begin{array}{lll}
\mbox{maximize} & \lambda\\
\mbox{subject to} & f(\delta_{in}(v)) - f(\delta_{out}(v)) = 0 & \forall v\neq s, v\neq t\\
& f(\delta_{out}(s)) - \lambda = 0 & \\
& \lambda - f(\delta_{in}(t)) = 0 & \\
& f(e) \le c(e) & \forall e\in E\\
& f(e) \ge 0 & \forall e\in E
\end{array}
$$

根據對偶性質，每一個不等式都會有個對應的對偶變數。我們令 $d: V\to \mathbb{R}$ 以及 $u: E\to\mathbb{R}^{\ge 0}$ 表示對應之變數，那麼其對偶線性規劃模型為：

$$
\begin{array}{lll}
\mbox{minimize} & \sum_{e\in E} c(e)u(e) & \\
\mbox{subject to} & d(t) - d(s) = 1 & \\
& u(e) \ge d(x) - d(y) & \forall e=(x, y)\in E \\
& u(e) \ge 0 & \forall e \in E
\end{array}
$$