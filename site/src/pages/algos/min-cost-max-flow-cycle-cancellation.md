---
category: "algo"
path: "/algo/min-cost-max-flow-cycle-cancellation"
date: "2018-11-20"
title: "最小費用流的消圈演算法"
---


讓我們首先[回顧](/algo/min-cost-max-flow)一下最小費用流的線性規劃主模型（Primal Problem）、以及其對偶模型（Dual Problem）。令 $f(u, v)$ 為線性規劃模型的變數、$y(u, v)$ 以及 $d(v)$ 為其對偶模型的變數名。我們定義以下三種條件：

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

## 剩餘網路 Residual Networks

要討論網路流，就必須要討論剩餘網路（residual networks）。如果我們在圖 $G$ 上面有一個流 $f$，那

## 基於剩餘網路上的最佳解特性

我們來證明以下定理

## 消圈演算法 Cycle Cancellation Algorithms

```
while 剩餘網路 G_f 上面存在負圈:
    令 C := 任何一個負圈
    令 e* := C 這個負圈上的瓶頸
    更新 f(e) 
```

## 時間複雜度

## 更快的消圈算法

## 最小均值圈

## 結論

表格

## 參考資料

1. Sokkalingam, Ahuja, Orlin, _New Polynomial-Time Cycle-Cancelling Algorithms for Minimum Cost Flows_, 1997. [PDF](https://pdfs.semanticscholar.org/f799/350ee4b93f02e672157d54ee06849edb7355.pdf)