---
category: "prob"
code: "ICPC-JAKARTA-2018-A"
path: "/problem/icpc/asia_jakarta_2018/A"
title: "Edit Distance"
date: '2019-01-01'
difficulty: 3
description: |
    對於兩個給定的字串 $S$ 和 $T$，我們定義 $edit(S, T)$ 為從 $S$ 經過若干插入字元、修改字元、刪除字元等操作後得到 $T$ 所需要的最少步數。
    
    Ayu 有一個二元字串 $S$（$1\le |S|\le 2000$），她想要找到另一個字串 $T_{max}$ 使得 $edit(S, T_{max})$ 最大。即對於所有與 $S$ 等長的 $T$，$edit(S, T_{max})\ge edit(S, T)$。不過呢，為了讓事情變得簡單些，她希望你能夠幫她的忙，找到任何一個與 $S$ 長度相同的字串 $T$，只要 $edit(S, T) > |S|/2$ 即可。
    
    當然，你也可以選擇輸出 $T_{max}$，事實上我們可以證明 $edit(S, T_{max}) > |S|/2$。這也保證了對於任意輸入一定有解。
link: "https://codeforces.com/gym/102001/problem/A"
oj: "codeforces-gym"
---

## 題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入僅有一行包含二元字串 $S$（$1\le |S|\le 2000$）。

## 輸出說明

輸出一個與 $S$ 長度相等的二元字串 $T$，滿足 $edit(S, T) > |S|/2$。

### 範例輸入 1

```
0011
```

### 範例輸出 1

```
1100
```

### 範例輸入 2

```
1100101
```

### 範例輸出 2

```
0011010
```


## OJ 連結

* [Codeforces Gym 102001 - A](https://codeforces.com/gym/102001/problem/A)


---

## 解法

如果單純把所有數字都反過來，可能不太行。比方說以下的反例：`01010101`，反過來就變成 `10101010`，顯然我們只要刪掉第一個字元並且補到後面去就行了。


## 備註

Edit Distance 好像又被稱為 Levenshtein Distance，是一種衡量兩個字串是否有多接近的指標（metric，不是 pointer，在這個 context 底下稱呼度量好怪XD）。