---
category: "algo"
path: "/algo/algorithmic-graph-theory/simple-grpahs"
date: "2019-02-21"
title: "圖論演算法 6 - 簡單圖 Simple Graphs"
---

簡單圖大概是所有定義裡頭最簡單的了。所謂的簡單圖，就是沒有包含重邊（multi-edge）和自環（self-loop）的圖。利用前一節我們介紹的度序列，我們可以透過給定一個合法的度序列來生成簡單圖。

## §6.1 合法的簡單圖

Havel 以及 Hakimi 分別在 1955、1962 年發表了藉由給定度序列構造簡單圖的演算法。我們說一個序列 $(d_1, d_2, \ldots, d_n)$ 是 **可製圖的（graphical）** 若且唯若這個序列是某個簡單圖的度序列。

<theorem title='Havel-Hakimi 定理 [1955, 1962]'>
一個非負整數序列 $(d_1, d_2, \ldots, d_n)$ 滿足 $d_2\ge \cdots \ge d_n$ 是可製圖的，若且唯若少了第一個點的序列 $(\underbrace{d_2-1, d_3-1, \ldots, d_{d_1+1}-1}_{\text{總共} d_1 \text{個}}, d_{d_1+2}, \ldots, d_n)$ 也是可製圖的。
</theorem>

#### 證明

"$\Leftarrow$" 這個方向是簡單的，如果少了一個點的序列是可製圖的，那麼把這個點補回去就會得到一個滿足度數要求的簡單圖。

"$\Rightarrow$" 令滿足度序列的圖 $G$ 所成的集合為 $\mathcal{G}$。假設存在至少一個簡單圖使得對於任意點 $v_i\in V$ 其度數恰好是 $d_i$。我們的目標是要證明：存在 $G\in\mathcal{G}$ 使得 $v_1$ 的鄰居 $N(v_1) = \set{v_2, \ldots, v_{d_1+1}}$。對於所有圖 $G\in\mathcal{G}$，我們定義 $i_G$ 為最小的編號使得 $v_1$ 與 $v_2, \ldots, v_{i_G}$ 相連，但是不與 $v_{i_G+1}$ 相連。顯然我們想證明存在一個滿足度序列的圖 $G$ 使得 $i_G = d_1+1$。

我們利用反證法證明之：**若不然**，$\forall G\in\mathcal{G},\ i_G \le d_1$。令 $G$ 是所有 $\mathcal{G}$ 裡面的圖中 $i_G$ 最大者。由於 $i_G \le d_1$，此時必存在 $j > i_G+1$ 使得 $(v_1, v_j)\in E$。注意到 $d_{i_G+1} \ge d_j$，但是在該圖上 $(v_1, v_{i_G+1})\notin E$、卻同時有 $(v_1, v_j)\in E$。因此我們可以推得：存在另一個 $v_k\in V$ 使得 $(v_{i_G+1}, v_k)\in E$ 但是 $(v_j, v_k)\notin E$。

現在讓我們把圖 $G$ 稍微修改一下：令 $G' = G -\set{(v_{i_G+1}, v_k), (v_1, v_j)} \cup \set{(v_1, v_{i_G+1}), (v_j, v_k)}$。此時 $G'$ 滿足所有度序列條件，因此 $G'\in \mathcal{G}$。但是 $i_{G'} > i_G$，與 $i_G$ 最大之假設矛盾，得證。

<note>
這類型的證明方法被歸類為**無窮遞降法**，其實也是另一種數學歸納法的表現。這類方法在證明各種 Greedy 演算法的最佳性質的時候非常有幫助！
</note>

-----

從 Havel-Hakimi 定理的敘述和證明我們不難得出具體的構造演算法。但真的得透過構造來證明指定度序列的簡單圖存在性嗎？答案是不一定需要。在 1960 年 Erdős 與 Gallai 發表了非構造性的數學論述：

<theorem title='Erdős-Gallai 定理 [1960]'>
一個非遞增非負整數序列 $d_1\ge d_2\ge \cdots \ge d_n$ 是可製圖的，若且唯若以下兩條件成立：
* $d_1+\cdots + d_n$ 是偶數。
* 對於所有 $1\le k\le n$，皆有：$$ \sum_{i=1}^k d_i \le k(k-1) + \sum_{i=k+1}^n \min(d_i, k).$$
</theorem>

Erdős-Gallai 定理的證明其實有點困難。最早的 1960 年的論文相當地繁雜。在 1970 年左右，法國數學家 Berge 利用網路流的概念證明了 E-G 定理。1986 年印度數學家 Choudum 提出了一個相對簡潔一點的數學歸納法證明。在這個證明裡頭，我們可以隱約看到剛才 Havel-Hakimi 定理的證明的影子。

#### 證明

"$\Rightarrow$" 這個部分相當直觀：首先，對於任意簡單圖來說，由握手定理可以推得度數和必須是偶數。若我們取任意 $k$ 個點的集合 $S\subset V$，這個圖會被拆成兩部分：$G[S]$ 以及 $G[V\setminus S]$。對於一個簡單圖來說，$G[S]$ 至多只能有 $k(k-1)/2$ 條邊，因此這些邊貢獻的度數和至多為 $k(k-1)$。另外對於每一個 $V\setminus S$ 裡面的點 $v_i$，其連入 $S$ 至多只有 $\min(d_i, k)$ 條邊。於是，取 $S$ 為度數最大的 $k$ 個點，其度數和至多只能是 $k(k-1) + \sum_{i=k+1}^n \min(d_i, k)$。

"$\Leftarrow$" 我們可以對總點數加度數 $n+\sum d_i$ 進行歸納。
1. (Base Case) 如果圖只有一個點 $n=1$，那麼 $d_1=0$ 是唯一可製圖的例子。
2. (Inductive Step, Case 1) 如果 $d_n=0$，我們可以把這個點拿掉而不改變所有條件，根據歸納假設，此時存在一個簡單圖滿足要求。
3. (Inductive Step, Case 2) 如果 $d_n>0$，此時顯然有 $d_n \le n-1$。我們選取 $t$ 使得 $d_1=d_2=\cdots = d_t > d_{t+1}$（如果 $t$ 不存在的話就讓 $t=n-1$）。接下來我們考慮修改後的度序列 $(d_1, d_2, \ldots, d_t -1, \ldots, d_{n-1}, d_n-1)$。選取的 $t$ 會保證新的序列也是非遞增的。接下來我們要作兩件事：首先證明新的度序列是可製圖的、然後利用做出來的圖，實現一個能對應原本度序列的圖。

證明新的度序列是可製圖的，可以透過分析以下幾個情形證明之：
1. ($k\ge t$)：比較舊序列與新序列的不等式，發現左邊的值必定 $-1$、右邊的值可能少 $1$ 或不變。因此新序列在此情形的不等式保證成立。
2. ($k < t$)：此時不等式左邊永遠是 $kd_1$。接下來分成四種情形討論：
    * $k > d_1$：此時 $kd_1 \le k(k-1)$，新的不等式保證成立。
    * $k = d_1$：除非 $k=t-1$、$t=n-1$ 而且 $d_n=1$ 不然保證成立，但是此情形發生時，$d_1+\cdots+d_n=t(t-1)+1$ 是個奇數，與總度數為偶數之假設矛盾。
    * $d_n\le k < d_1$：<span class="has-text-success">[定理 1.16，很巧妙的一步]</span> 根據舊的不等式，把變數 $k$ 用 $k+1$ 重新寫過會得到
    $$
    \begin{align*}
    && (k+1)d_1 \le & \  (k+1)(t-1) + \sum_{j=t+1}^{n-1} \min(k+1, d_j) + d_n \\
    \Longleftrightarrow && kd_1 \le & \  k (t-1) + \sum_{j=t+1}^{n-1} \frac{k}{k+1}\min(k+1, d_j) + \frac{k}{k+1} d_n \\
    && \le &\ 
    k (t-1) + \sum_{j=t+1}^{n-1} \min(k, d_j) + (d_n-1)
    \end{align*}
    $$
    * $k < d_n$：不等式不會發生變化，所以保證成立。

證明新的度序列是可製圖的以後，根據歸納假設，存在一個圖 $G'$ 滿足新的度序列。如果此時 $(v_t, v_n)\notin E$，那我們把這條邊加上便能實現原本的度序列。如果此時 $(v_t, v_n)\in E$，那麼我們要找另外一條邊來交換：首先因為 $d_t-1 \le n-2$，存在一個 $v_i\neq v_n\in V$ 使得 $(v_t, v_i)\notin E$。接著，由於 $d_i \ge d_n$，存在一個 $d_j$ 使得 $(d_i, d_j)\in E$ 但 $(d_n, d_j)\notin E$。於是我們就可以把這個圖 $G'$ 換一下，扣掉原本的兩條邊、加回後兩條邊，得到一個 $(v_t, v_n)\notin E$ 但保有相同度序列的圖，此時再把 $(v_t, v_n)$ 加上去就構造完畢囉。

<note>
這個定理的證明也可以在張鎮華老師的《演算法觀點的圖論》定理 1.16 找到。
</note>

-----

## §6.2 樹的度序列

我們知道 $n$ 個點的樹是一個恰好有 $n-1$ 條邊的連通圖。如果 $d_1, \cdots, d_n$ 是這顆樹的度序列，顯然必須有 $d_1+\cdots + d_n = 2(n-1)$。不意外地，這也幾乎是從度序列建構一棵樹的充分條件。

<theorem title='樹的度序列'>
給定一個非遞增正整數序列 $d_1\ge d_2\ge \cdots \ge d_n$。存在一棵滿足該度序列的樹，若且唯若以下兩條件成立：
* $d_1+\cdots + d_n = 2(n-1)$。
* $n=1$ 或 $d_n = 1$。
</theorem>

這個證明只要用數學歸納法即可，不難。有趣的是，這個條件恰好也正是要讓一個連通圖存在的邊界條件。

## §6.3 簡單連通圖

<theorem title='連通圖的度序列'>
一個序列 $(d_1, d_2, \ldots, d_n)$ 可以實現一個簡單連通圖，若且唯若該序列是可製圖的、滿足 "$n=1$ 或 $d_n\ge 1$"、並且 $\sum d_i \ge 2(n-1)$。
</theorem>

這個證明，可以直接透過 Havel-Hakimi 定理加上樹的度序列定理的證明方法證得：每一次挑選度數最小的點，將這個點連到度數最大的那些點並移除，得到總邊數較少的可製圖序列。不難驗證此時總度數仍滿足敘述條件。根據歸納假設我們得到一個連通圖，然後加回這個點時自然也是連通圖了。

## 習題

1. <span class='tag is-dark'>證明題</span> 我們說一個兩個序列 $(a_1, a_2, \ldots, a_n)$ 和 $(b_1, b_2, \ldots, b_n)$ 是個二分圖序列（bigraphic），如果存在一個兩邊各自有 $n$ 個點的二分圖使得兩邊度數分別是 $a_1, \ldots, a_n, b_1, \ldots, b_n$。Gale-Ryser 定理 [1957] 證明了，若 $a_1\ge \cdots \ge a_n$，則兩序列是 bigraphic 若且唯若
    * $\sum_{i=1}^n a_i = \sum_{i=1}^n b_i$，而且
    * 對所有的 $1\le k\le n$：$\sum_{i=1}^k a_i \le \sum_{i=1}^n \min(b_i, k)$。  
2. <span class='tag is-link'>演算法</span> 設計一個 $O(n)$ 時間的演算法，判斷一個長度為 $n$ 的非負整數序列是否為某個簡單圖的度序列。
3. <span class='tag is-danger'>程設題</span> 幼稚園吃午餐問題？

### 參考資料

* http://szhorvat.net/pelican/hh-connected-graphs.html
* http://kanari.logdown.com/posts/2014/03/09/erdos-gallai-theorem-conditions-for-a-sequence-to-be-graphical
* https://arxiv.org/abs/1212.5443