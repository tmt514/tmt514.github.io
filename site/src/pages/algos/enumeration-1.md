---
category: "algo"
path: "/algo/enumeration-1"
date: "2018-12-05"
title: "枚舉法 1：試誤原則 Trial Error"
---

今天來聊聊四種解題方法之一：枚舉法。每一道題目都有一個解，當我們沒辦法立刻說出答案的時候，最原始的方法就是利用試誤(trial-error)的原則，考慮所有可能的答案，並一個一個判斷是否它滿足我們的需求。有時候這方法挺好用的。

資訊與數學最大的不同是，我們可以利用有限的時間，讓電腦幫我們逐一檢驗可能的答案，進而省略一些繁雜的數學證明或更細緻的檢驗步驟。

換句話說，如果我們能用**簡單的數學證明**保證答案會出現在我們提出的許多數值之中，那麼就能夠證明演算法的正確性了。

<include-problem
    path='/problem/isprime'
    >
</include-problem>

顯然，要「否定」$n$ 是否為質數這個敘述，只需要找出一個「反例」。而顯然這個反例 $x$ 會介於 $[2, n-1]$ 之間。逐一檢查 $2, 3, \ldots, n-1$ 就可以知道答案是 Yes 還是 No 了。這個方法需要 $O(n)$ 次模運算。

透過簡單觀察，我們發現：若 $n$ 是合數，可以表示成 $n=a\times b$。那麼此時有 $\min(a, b)\le \sqrt{n}$。也就是說，若存在反例，最小的反例一定會出現在 $[2, \sqrt{n}]$ 之間。於是，我們就得到一個 $O(\sqrt{n})$ 時間的演算法了。

### 參考程式碼

### 結論
<theorem c='is-success'>
本題透過枚舉「至少一個」 $n$ 可能的真因數，進而達到解題的目的。
</theorem>

-----

<include-problem
    path='/problem/cf/233/B'
    >
</include-problem>

對於一個一元二次方程我們可以利用已知的公式 $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$ 來求出方程的根，但是 $s(x)$ 是一個與 $x$ 有關的函數，所以無法直接從公式下手。枚舉 $x$ 的範圍可以粗估是 $1\le x\le \sqrt{n} \approx 10^9$，但一個一個檢查會花太多時間。

注意到 $s(x)$ 是 $x$ 的各位數字和，這個值的範圍相較於 $n$ 小了不少。可以估計的是當 $x\le 10^9$ 時，有 $1\le s(x)\le 81$。因此若我們先**逐一枚舉 $s(x)$ 的值**，就可以把題目當成一般的一元二次方程來解了！

-----

<include-problem
    path='/problem/leetcode/326'
    >

## 練習題

1. <include-problem path='/problem/ural/1854' inline></include-problem>