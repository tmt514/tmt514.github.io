---
category: "algo"
path: "/algo/enumeration-1"
date: "2018-12-05"
title: "枚舉法 1：試誤原則 Trial and Error"
---

今天來聊聊四種解題方法之一：枚舉法。每一道題目都有一個解，當我們沒辦法立刻說出答案的時候，最原始的方法就是利用試誤(trial-error)的原則，考慮所有可能的答案，並一個一個判斷是否它滿足我們的需求。有時候這方法挺好用的。

資訊與數學最大的不同是，我們可以利用有限的時間，讓電腦幫我們逐一檢驗可能的答案，進而省略一些繁雜的數學證明或更細緻的檢驗步驟。

換句話說，如果我們能用**簡單的數學證明**保證答案會出現在我們提出的許多數值之中，那麼就能夠證明演算法的正確性了。

<include-problem
    title-prefix='例題 1：'
    path='/problem/isprime'
    >
</include-problem>

顯然，要「否定」$n$ 是否為質數這個敘述，只需要找出一個「反例」。而顯然這個反例 $x$ 會介於 $[2, n-1]$ 之間。逐一檢查 $2, 3, \ldots, n-1$ 就可以知道答案是 Yes 還是 No 了。這個方法需要 $O(n)$ 次模運算。

透過簡單觀察，我們發現：若 $n$ 是合數，可以表示成 $n=a\times b$。那麼此時有 $\min(a, b)\le \sqrt{n}$。也就是說，若存在反例，最小的反例一定會出現在 $[2, \sqrt{n}]$ 之間。於是，我們就得到一個 $O(\sqrt{n})$ 時間的演算法了。

### 參考程式碼

```cpp
bool isprime(int n) {
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0)
            return false;
    }
    return true;
}
```

### 結論
<theorem c='is-success'>
本題透過枚舉「至少一個」 $n$ 可能的真因數，進而達到解題的目的。
</theorem>


-----

<include-problem
    title-prefix='例題 2：'
    path='/problem/leetcode/326'
    >

注意到 3 的次方其實數量不多，所以我們可以直接嘗試所有可能的次方數值，並且與 $x$ 進行比對。

### 參考程式碼

```cpp
bool isPowerOfThree(int n) {
    for (long long i = 1; i <= n; i *= 3)
        if (n == i)
            return true;
    return false;
}
```
    
### 結論
<theorem c='is-success'>
本題透過枚舉所有 3 的次方值，達到解題目的。
</theorem>


### 延伸思考
這題其實不使用諸如 `log()` 函式的浮點數計算也可以做得到 $O(1)$ 時間唷，你能想得到嗎？

-----

<include-problem
    title-prefix='例題 3：'
    path='/problem/cf/233/B'
    >
</include-problem>

對於一個一元二次方程我們可以利用已知的公式 $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$ 來求出方程的根，但是 $s(x)$ 是一個與 $x$ 有關的函數，所以無法直接從公式下手。枚舉 $x$ 的範圍可以粗估是 $1\le x\le \sqrt{n} \approx 10^9$，但一個一個檢查會花太多時間。

注意到 $s(x)$ 是 $x$ 的各位數字和，這個值的範圍相較於 $n$ 小了不少。可以估計的是當 $x\le 10^{9}$ 時，有 $1\le s(x)\le 81$。因此若我們先**逐一枚舉 $s(x)$ 的值**，就可以把題目當成一般的一元二次方程來解了！找到解以後，再驗證其各位數字和是否就是我們枚舉的值，就可以了。

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// 計算各位數字和。
int s(long long x) {
	int t=0;
	while(x>0) { t+=x%10; x/=10; }
	return t;
}

// 對於枚舉的 s(x) 值 t，找出合法的解，由於解會是一正一負，我們只回傳正的那個。
long long getsol(int t, long long n) {
	long long r = t*t+n*4, v = 0;
	v = sqrt(r);
	while(v*v<r) v++; while(v*v>r) v--;
	if(v*v!=r) return -1;
	v-=t; if(v%2 || v<0) return -1;
	v/=2;
	return v;
}

int main(void) {
	long long n, x, t, ans=-1;
	cin >> n;
	for (t = 1; t <= 81; t++) {
		x = getsol(t, n);
		if(x<0) continue;
		if(s(x)==t && ( ans==-1 || ans > x)) ans = x;
	}
	cout << ans << endl;
	return 0;
}
```

### 結論
<theorem c='is-success'>
本題透過觀察並枚舉 $s(x)$ 的值，來縮小可能的答案範圍。
</theorem>


-----


## 練習題

1. <include-problem path='/problem/ural/1854' inline></include-problem>
2. <include-problem path='/problem/cf/911/C' inline></include-problem>
3. <include-problem path='/problem/cf/241/C' inline></include-problem>
4. <include-problem path='/problem/icpc/ecna2018/B' inline></include-problem>