---
category: "algo"
path: "/algo/algorithmic-graph-theory/euler-tour"
date: "2019-02-25"
title: "圖論演算法 5 - 一筆畫問題 Euler Tour"
---

## §4.1 Königsberg 七橋問題

該提到的還是會提到哈哈。大家想必對於圖論起源的七橋問題非常熟稔了，這邊就簡單地提及。

< 待補 >

## §4.2 一筆畫問題

<theorem c='is-link'>
給定一個無向圖 $G$，是否存在一個行跡（trail）使得恰好經過所有邊各一次？
</theorem>

<display graph>
    <node id='1'></node>
    <node id='2'></node>
    <node id='3'></node>
    <node id='4'></node>
    <edge data='[1, 2]' bendleft></edge>
    <edge data='[1, 2]' bendright></edge>
    <edge data='[2, 3]' bendleft></edge>
    <edge data='[2, 3]' bendright></edge>
    <edge data='[1, 4]'></edge>
    <edge data='[2, 4]'></edge>
    <edge data='[3, 4]'></edge>
</display>

對於這個問題 Euler 給出了非常厲害的觀察：

<theorem title='一筆畫性質'>
一個連通圖 $G$ 可以被一筆畫完成，若且唯若圖 $G$ 上面恰好有 0 個或 2 個奇數度數的點。此外，如果圖 $G$ 上面恰好有兩個奇度數的點，那麼存在起點與終點分別在這兩個點的一筆畫行跡。
</theorem>

#### 證明

"$\Rightarrow$" 這個方向比較簡單。考慮圖 $G$ 上面一筆畫的行跡，除了起點與終點以外，對於每一個點的「進入次數」與「離開次數」都是相等的，也就是說這些非起點與終點的度數都必須是偶數。此外，根據握手定理，奇度數的點的個數必須是偶數，因此得證。

"$\Leftarrow$" 我們可以對邊數 $m$ 進行歸納。$m=0$ 的時候，連通圖只有一個點，顯然所有邊可以被一筆畫完成。現在考慮 $m>0$。

如果 $G$ 度數都是偶數，我們隨便選一條邊 $e\in E$，然後考慮 $G'=G-e$。如果我們能證明出 $G'$ 是連通圖，那根據數學歸納法可以直接得出

## §4.3 歐拉路徑的演算法

## §4.4 最小字典序