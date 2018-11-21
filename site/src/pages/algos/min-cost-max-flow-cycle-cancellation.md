---
category: "algo"
path: "/algo/min-cost-max-flow-cycle-cancellation"
date: "2018-11-20"
title: "最小費用流的消圈演算法"
---

## 剩餘網路 Residual Networks

要討論網路流，就必須要討論剩餘網路（residual networks）。如果我們在圖 $G$ 上面有一個流 $f$，那我們可以定義一個剩餘網路 $G_f$，代表有哪些地方還有空間推進更多的網路流。

最小費用流在剩餘網路上會長什麼樣子呢？很幸運地，Klein 在 1967 年為我們證明了以下定理：

<theorem title='負圈定理'>
$f$ 是最佳解若且唯若 $G_f$ 上面定義 cost 為權重時，不存在一個負圈。
</theorem>

### 證明

"$\Rightarrow$":  
如果 $G_f$ 上面存在一個負圈，那麼沿著這個負圈增廣，會得到總花費更小的解，與 $f$ 最佳解的假設矛盾。

"$\Leftarrow$":  
如果 $f$ 不是最佳解，那我們考慮真正的最佳解 $f^\star$。考慮兩個解的差異 $f'=f^\star - f$，不難推敲得知 $f'$ 的所有邊都會出現在 $G_f$ 上面。由於 $f'$ 是一個可行流，我們可以將 $f'$ 拆成許多圈的疊加。但是因為 $cost(f')$ 帶來的總花費是負的（因為 $cost(f') = cost(f^\star) - cost(f) < 0$），所以至少有一個圈帶來的花費也是負的。得證。


## 消圈演算法 Cycle Cancellation Algorithms

這個演算法是由 Klein [1967] 從 Ford-Fulkerson 網路流演算法得來的想法，以迭代的方式不斷地更新當前找到的解，直到滿足最佳解條件為止。[^2]

```
f = 空的網路流
while 剩餘網路 G_f 上面存在負圈:
    令 C 為任何一個負圈
    令 Δ 為這個負圈上能推的最大流量
    更新 f = f + CΔ
```

### 時間複雜度

如同 Ford-Fulkerson 演算法一般，在所有 cost 和 capacity 都是整數的時候，每一次消圈，只能夠保證總花費至少降低了 1 單位。顯然最小的總花費值比 $-mCU$ 來得大，所以我們可以得知迭代消圈的次數至多為 $O(mCU)$。

而找負圈的演算法則可以使用 Bellman-Ford 演算法，所需時間為 $O(nm)$。

因此整體的時間複雜度是 $O(nm^2CU)$，由於 $C$ 和 $U$ 僅是數值，相對於輸入規模而言是指數級別的，在數值較大時效率不甚理想。

## 更快的消圈算法



## 最小均值圈

## 結論

| 演算法 | 消圈的次數 | 每一次消圈的時間 | Weakly-Polynomial Worst-Case Complexity | Strongly-Polynomial Worst-Case Complexity |
|-----|---|---|----|---|
| <nobr>Goldberg and Tarjan [1989]</nobr><br/>每次消最小均值圈 | $O(nm \log (nC))$ | $O(nm)$ | $O(n^2m^2\log (nC))$ | $O(n^2m^3)$ |
| <nobr>Goldberg and Tarjan [1989]</nobr><br/>每次找所有簡化邊權重為負的圈 | $O(nm \log (nC))$ | $O(\log n)$ | $O(nm\log n\log (nC))$ | $O(nm^2\log^2n)$ |
| <nobr>Barahona and Tardos [1989]</nobr><br/>每次找一票點不重複的負圈然後增廣 | $O(m \log (nCU))$ | $O(nm+n^2\log n)$ | $O((nm^2+mn^2\log n)\log(nCU)$ | N/A |
| <nobr>Rock [1991]</nobr><br/>每次找剩餘流量足夠大的負圈 | $O(m \log U)$ | $O(nm)$ 或 $O(m+n\log n)$ | $O(nm^2\log U)$ | N/A |
| <nobr>Wallacher [1991]</nobr><br/>每次找最負比重負圈 | $O(m \log (nCU))$ | $O(n^3\log^2 n)$ | $O(n^3m\log^2 n\log(nCU))$ | N/A |
| <nobr>Shigeno, Iwata and McCormick [1996]</nobr><br/>最負圈鬆弛演算法 | $O(nm \log (nC))$ | $O(nm+n^2\log n)$ | $O(n^2m^2\log (nC)$ $+$ $n^3m\log n\log (nC))$ | $O(n^2m^3\log n$ $+$ $n^3m^2\log n)$ |
| <nobr>Shigeno, Iwata and McCormick[^3] [1996]</nobr><br/>最負圈縮放代價演算法 | $O(nm \log C)$ | $O(\log n)$ | $O(nm\log C \log n)$ | N/A |
| <nobr>Sokkalingam, Ahuja and Orlin [1997]</nobr><br/>每次找剩餘流量足夠大的負圈 | $O(m \log C)$ | $O(m+n\log n)$ | $O(m^2\log C$ $+$ $nm\log C\log n)$ | $O(m^3\log n$ $+$ $nm^2\log^2 n)$ |

<small>資料來源： Sokkalingam, Ahuja, Orlin, _New Polynomial-Time Cycle-Cancelling Algorithms for Minimum Cost Flows_, 1997. [^1]</small>

## 參考資料

[^1]:
    [Sokkalingam, Ahuja, Orlin, _New Polynomial-Time Cycle-Cancelling Algorithms for Minimum Cost Flows_, 1997.](https://pdfs.semanticscholar.org/f799/350ee4b93f02e672157d54ee06849edb7355.pdf)
[^2]:
    [Duke University COMPSCI532 Fall 2015 Scribe Notes](https://www2.cs.duke.edu/courses/fall15/cps232/scribe_notes/lec05.pdf)
[^3]:
    [Shigeno, Iwata and McCormick, _Relaxed Most Negative Cycle and Most Positive Cut Canceling Algorithms for Minimum Cost Flow_, Mathematics of Operations Research 2000](https://www.jstor.org/stable/3690424?seq=1)