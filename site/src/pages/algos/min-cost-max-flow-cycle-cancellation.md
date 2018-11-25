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

從計算最大網路流的演算法當中，當我們每次找出剩餘網路圖上最寬的增廣路徑時，這條增廣路徑至少可以推進 ${\mathbf{MaxFlow}}(G_f)/m$ 的流量。這麼一來，在所有容量限制都是整數的情況下，增廣的次數上界可以從原本 Ford-Fulkerson 演算法的 ${\mathbf{MaxFlow}}(G)$ 降低至 $O(m\log_2 {\mathbf{MaxFlow}}(G))$。這個值以輸入的資料量而言，就是多項式了。

### 最負圈 Most Negative Cycle

消圈算法是否也有同樣的特性呢？答案是有的，我們可以用一模一樣的方式證明，如果每一次我們找出那個「最負的負圈」，那麼總 cost 會向目標邁進至少 $O(1/m)$ 的比例。採用了這個方法的話，我們就可以讓消圈次數限制在 $O(m\log_2|{\mathbf{MinCost}}(G)|)$，是為多項式。

但是，找出「最負的負圈」對於輸入是任意圖的情形下，是 NP-Hard 的。目前我們仍不知道有沒有有效率的多項式演算法來找出它。於是 Goldberg 跟 Tarjan 於 1989 年發現，每一次不見得要找「最負的負圈」，只要「足夠負」就可以有一樣的效果！他們利用了 Karp 在 1978 年提出的「最小均值圈」演算法，每一次找出「平均花費最負的圈」進行增廣，就可以達到一樣的效果啦。



## 最小均值圈

<theorem title='最小均值圈 [Karp 1978]'>
設 $G$ 為有向有權圖。定義 $\hat{G}$ 為 $G$ 外加上一點 $s$ 並從 $s$ 到每一點分別加上一條權重為 0 的邊。令 $d_k(v)$ 為從 $s$ 出發經過恰好 $k$ 條邊抵達點 $v$ 的最小總權重和。則最小均值圈的平均值 $\lambda^*$ 滿足
$$
\lambda^* = \min_v \max_{1\le k \le n-1} \frac{d_n(v) - d_k(v)}{n-k}
$$
</theorem>

### Karp 的證明

首先我們先證明，如果 $\lambda^*=0$，那麼上面這個式子右半邊的值恰好會是 $0$：

如果 $\lambda^*=0$，那麼這個圖一定不存在負圈。既然不存在負圈，我們就可以定義最短路徑（可以參考 Edmonds-Karp）。定義 $\mathrm{dist}(s, v)$ 為 $s$ 到 $v$ 的最短路徑長度。顯然對於所有點 $v$ 和正整數 $k$，$d_n(v) \ge d_k(v)$。此外必定存在某個 $k$ 使得 $d_k(v) = \mathrm{dist}(s, v)$。因此，對所有 $v$ 來說，$\max_{1\le k \le n-1} \frac{d_n(v) - d_k(v)}{n-k} \ge 0$。

得知右半邊的式子永遠非負以後，剩下的任務就是要證明真的存在一組 $v, k$ 使得 $d_n(v) = d_k(v)$。令 $C$ 為總和是 $0$ 的圈，由於 $\lambda^*=0$，在這個圈上任何兩點之間的最短路徑，必定等於這個圈上從一點走到另一點的距離（如果更短的話就有負圈啦）。考慮 $s$ 到這個 $C$ 上面任一點 $x$ 的最短路徑，這條路徑必定用掉不超過 $n-1$ 條邊。然後我們從 $x$ 開始沿著這個圈 $C$ 走，直到補足 $n$ 條邊為止。假設最後停在 $y$ 這個點。那麼，我們要說的是 $d_n(y) = \mathrm{dist}(s, y)$，因為：

$$
\begin{align*}
\mathrm{dist}(s, y) & \le d_n(y) \\
& \le \mathrm{dist}(s, x) + \mathrm{dist}(x, y) \\
& \le \mathrm{dist}(s, y) + \mathrm{dist}(y, x) + \mathrm{dist}(x, y) \\
& \le \mathrm{dist}(s, y) + 0
\end{align*}
$$

所以，$y$ 這個點達到了最小值 $0$。於是當 $\lambda^*=0$ 時等式成立。
要怎利用這個證明推導出對所有的 $\lambda^*$ 都正確呢？注意到我們可以同時對所有的邊「平移」（同時加上一個常數 $c$）而這件事情會使得所有圈的平均值都一起「平移」$c$，同時也讓式子右邊「平移」了 $c$。因此對於任意 $\lambda^*$ 我們只要平移它到 $0$，再運用上述的證明，再平移回來，就行啦！證明完畢。

### 關於演算法

最直接的方法就是直接用 $O(mn)$ 動態規劃計算出所有 $d_k(v)$ 的值，其他演算法我們可以改天聊。

### 應用到消圈算法

<theorem title='最小均值消圈定理 [Goldberg-Tarjan 1989]'>
如果每次從剩餘網路中增廣最小均值圈，那麼保證消圈的迭代次數不超過 $O(\min\{mn\log(nC), m^2n\log n\})$ 次。
</theorem>

證明的步驟簡述如下。完整的證明可以在這份 Note [^7] 找到。

**概念1**: 如果 $G_f$ 上面有負圈，那麼對於 $G_f$ 上面的最小均值圈，其平均也是負的。

**概念2**: 我們定義 $\mu(f)$ 表示為將 $G_f$ 的最小均值圈變成非負的最小平移常數。（也就是說，最小均值圈的平均值為 $-\mu(f)$）

**概念3**: 對於任何勢能函數（或距離函數）$d$，我們定義等效邊權 $cost^d(u, v) = cost(u, v) + d(u) - d(v)$。不難發現，對於任何一個圖上的圈來說，其邊權的和總是等於等效邊權的和。也就是說，這樣的轉換並不會影響最小均值圈的數值。但可以藉此調整一些邊的權重。

**概念4**: 我們定義 $-\epsilon(f)$ 表示對於任意函數 $d$ 定義出的等效邊權中，最小權重最大者。

**概念5**: 注意到，如果這個圖的最小均值圈是 $-\mu(f)$ 的話，無論我們怎麼調整函數 $d$，調整後最小的那條邊一定小於平均。因此有 $-\epsilon(f) \le -\mu(f)$。

**概念6**: 相反地，若考慮平移後的圖 $G_f+\mu(f)$，我們可以在上面定義一個距離函數 $d$，使得對所有 $(u, v)\in G_f$ 我們都有 $d(u) + cost(u, v) \ge d(v)$。也就是等效邊權 $cost^d(u, v)\ge 0$。

**概念7**: 把上面這個做出來的 $d$ 再減去 $\mu(f)$，得到一個勢能函數（或距離函數），其等效邊權 $cost^{d-\mu(f)}(u, v) \ge -\mu(f)$。於是我們有 $-\epsilon(f) \ge -\mu(f)$。

**概念8**: 綜合概念 5 與 7 我們可以得到 $\mu(f)=\epsilon(f)$。

**概念9**: 現在固定一個 $f$，以及一個可以得出最佳等效距離的函數 $d$。假設在 $G_f$ 上面消完一個最小均值圈以後，得到的新的流是 $f'$。我們想要說兩件事情：
1. $\epsilon(f') \le \epsilon(f)$。
2. 如果消的圈上存在一條正的等效邊，那麼 $\epsilon(f') \le \left(1-\frac{1}{n}\right)\epsilon(f)$。
3. 假設我們增廣後仍暫時使用同樣的 $d$ 函數。那麼連續 $m$ 次增廣之內，一定會消到一個圈使得某條以 $d$ 為基準的等效邊是非負的，於是 2. 成立。

**概念10**: 因此，一開始 $\epsilon(f_{始})\le C$，經過 $mn\ln {nC}$ 次增廣以後 $\epsilon(f_{終}) < \left(1-\frac{1}{n}\right)^{n\ln {nC}} C \le \frac{1}{n}$。

**概念11**: 如果所有容量和花費都是整數，那麼當最小均值圈 $ > -\frac{1}{n}$ 的時候，就代表它 $\ge 0$。此時消圈算法就會停止。

除了 **概念9** 的 1. 和 2. 需要額外證明以外，上面的論述基本上就是全部的證明了。耶！搞定！

------

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
[^4]:
    [Colorado State University 最小均值圈講義](http://www.cs.colostate.edu/~rmm/minCycleMean.pdf)
[^5]:
    [Columbia University 最小均值圈投影片](http://www.columbia.edu/~cs2035/courses/ieor6614.S16/mmc.pdf)
[^6]:
    [Cornell University 的 Goldberg-Tarjan 演算法講義](https://people.orie.cornell.edu/dpw/orie633/LectureNotes/lecture12.pdf)
[^7]:
    [MIT開放課程講義：Goldberg-Tarjan 演算法分析](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-854j-advanced-algorithms-fall-2008/lecture-notes/lec4.pdf)