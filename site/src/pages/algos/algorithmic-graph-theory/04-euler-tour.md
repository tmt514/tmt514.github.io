---
category: "algo"
path: "/algo/algorithmic-graph-theory/euler-tour"
date: "2019-02-25"
title: "圖論演算法 4 - 一筆畫問題 Euler Tour"
---

## Königsberg 七橋問題

該提到的還是會提到哈哈。大家想必對於圖論起源的七橋問題非常熟稔了，這邊就簡單地提及。

< 待補 >

## 一筆畫問題

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
