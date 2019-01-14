---
category: "prob"
code: "ICPC-HANOI-2018-F"
path: "/problem/icpc/asia_hanoi_2018/F"
title: "Fun with Fibonacci"
date: '2019-01-13'
difficulty: 8
description: |
    費氏數列的遞迴定義如下：

    $$ F_n = F_{n-1} + F_{n-2} $$

    初始條件為 $F_0=0, F_1=1$。這個數列的首幾項為 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

    我們現在定義誇張版的費氏數列

    * 定義 $G(1, n)$ 為第 $n$ 個費氏數列。
    * 定義 $G(2, n) = G(1, G(1, n))$。
    * 對於任意正整數 $i$，定義 $G(i, n) = G(1, G(i-1, n))$。

    給定 $n, k, p$，請你計算 $G(k, n)\bmod p$ 之值。
    

link: "https://open.kattis.com/problems/funwithfibonacci"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Hanoi Regional"
    - "number theory"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入的第一列包含一個正整數 $T$ ($1\le T\le 10^5$) 代表測試資料組數。

接下來有 $T$ 列，每一列為一組測試資料，包含三個正整數 $n, k, p$（$1\le n, k\le 10^{18}, 1\le p\le 10^6$）。

## OJ 連結

* [Open Kattis - Fun with Fibonacci](https://open.kattis.com/problems/funwithfibonacci)

**題目出處**：ICPC 2018 Asia Hanoi Regional

---

## 解法

今天是數論小教室。看到這題範圍這麼大，其中必定有詐。

這題真的很難。而且第一步就是你真的要對費氏數列有所認識的那種難。看到計算費氏數列除以 $p$ 的餘數（注意這裡 $p$ 不是質數唷），就**應該**要想到費氏數列模 $p$ 的循環節長度是 $O(p)$ 的！是不是很 OP！

而事實上，我們可以利用以下定理刻劃出費氏數列模 $p$ 的循環節長度：

<theorem title='費氏數列的循環節'>
設 $p$ 為質數。則：
* 當 $p=5$ 的時候 $F_{20} \equiv 0, F_{21}\equiv 1 \pmod 5$。
    * 這保證了循環節長度整除 $20$。
* 當 $p\equiv \pm 1 \pmod 5$ 的時候 $F_{p-1} \equiv 0, F_{p}\equiv 1 \pmod 5$。
    * 這保證了循環節長度整除 $p-1$。
* 當 $p\equiv \pm 2 \pmod 5$ 的時候 $F_{2p+2}\equiv 0, F_{2p+3}\equiv 1 \pmod 5$。
    * 這保證了循環節長度整除 $2p+2$。
</theorem>

然後經過努力推敲一下，可以推得對任意正整數 $r$，模 $p^r$ 的時候，循環節長度整除： $p^{r-1} \times (\text{模 $p$ 的循環節長度})$。再根據中國剩餘定理用力觀察一下，就可以知道把一個正整數拆成許多質因數的次方積，每一個部份的循環節長度之最小公倍數（LCM）就是我們要的答案。

上面這個定理的證明可以在[這裡](https://www.math.arizona.edu/~ura-reports/071/Campbell.Charles/Final.pdf)找到唷（我不太喜歡他的證明，有些地方定義不是很清楚的感覺。之後找到更好的再換掉。）

有了這個以後，就可以真真正正地開始 **Fun With Fibonacci** 了。

### 把循環節往下丟

對於任意正整數 $p$，我們令函數 $f(p)$ 表示循環節大小。首先我們可以做出以下觀察：
$G(i, n) \bmod p = F_{G(i-1, n)} \bmod p = F_{G(i-1, n)\bmod f(p)} \bmod p$。

我們可以把這個寫成遞迴關係，透過解決 $G(i-1, n)$ 回頭解 $G(i, n)$。這個遞迴最終得跑過 $k$ 次，基本上是個 $k=1000000000000000000$ 次的概念。

經過了今天大量 TLE 的洗禮，我觀察到了以下幾個很酷炫的點：

* $p, f(p), f(f(p)), f(f(f(p))), \ldots$ 這個序列非常快就進入循環了。而且，只要 3~4 步以後就會跑到**不動點**！
* 大部分的不動點 $p$（i.e. $f(p)=p$），都是 $2^4\times 3\times 5^8$ 的因數。

### 處理不動點

好的，現在問題變成了處理 $F_{F_{F_{F_n}}} \bmod p$...，而好消息是我們總可以把 $\bmod p$ 往註標裡面丟。壞消息是我們要這樣做幾乎 $k$ 次啊！

注意到每次答案都是一個介於 $[0, p-1]$ 之間的整數，若我們定義一個有 $p$ 個點的圖，其中每個點 $x\mapsto (F_x\bmod p)$。那麼，這樣的圖一定長得很水母森林（Jellyfish-es）。迭代 $k$ 次就相當於從 $n$ 出發，連續走 $k$ 步，看看到底停留在什麼地方，而這個地方就是答案。

（我猜這邊需要另一個定理幫助我們快速找出答案。但我試著用各種鴉常數的方法硬迭代找循環節拿到 AC 了就是......）

### 我最後的大絕招

計算 $F_x\bmod p$ 是很吃重而且很難算的。根據亂跑得結果，上述循環節大小很可能高達 $156250$ 這麼大。因為 $T\le 10^5$，我們必須要非常非常快速的算出 $F_x\bmod p$ 才有辦法在時限內跑完最壞測資。

一個想法是，如果我們找到了一些巨大 cycle，那麼可以把他們存下來，因為下一次再碰到同一個 cycle 的機會是高的。但是，如果今天換了一個 $p$ 值，整個圖都會不一樣，這個存下來的東西就不能用了。

好消息是，假若有許多不動點都整除 $18750000=2^4\times 3\times 5^8$，那一開始我可以偷偷用一個很大的陣列 `special[18750000]` 存下費氏數列每一項 $\bmod 18750000$ 的值。萬一今天遇到 $p=10000$，我們想計算 $F_{123}\bmod 10000$，這個值就會恰恰等於 `special[123] % 10000`（因為 10000 整除 18750000）。


### 參考程式碼

今天的程式碼真的非常非常傷眼，真的很對不起。我以後有空再把它淨化一下（淚）

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long LL;
const int N = 2000005;
vector<bool> sieve(N);
vector<int> primes;

const int VS = 18750000;
int special[18750000];

struct Matrix {
  LL a[2][2];
  Matrix(LL A = 1, LL B = 0, LL C = 0, LL D = 1) {
    a[0][0] = A;
    a[0][1] = B;
    a[1][0] = C;
    a[1][1] = D;
  }
  Matrix operator % (const LL mod) const {
    LL P = a[0][0]%mod;
    LL Q = a[0][1]%mod;
    LL R = Q;
    LL S = a[1][1]%mod;
    return Matrix(P, Q, R, S);
  }
  Matrix operator *(const Matrix m) const {
    LL P = a[0][0] * m.a[0][0] + a[0][1] * m.a[1][0];
    LL Q = a[0][0] * m.a[0][1] + a[0][1] * m.a[1][1];
    LL R = Q;
    LL S = a[1][0] * m.a[0][1] + a[1][1] * m.a[1][1];
    return Matrix(P, Q, R, S);
  }
};

Matrix MatrixPowerMod(Matrix A, LL n, LL mod) {
  if (n == 0) return Matrix() % mod;
  if (n == 1) return A % mod;
  Matrix B = Matrix();
  while (n > 0) {
    if (n%2) B = B * A % mod;
    A = A * A % mod;
    n/=2;
  }
  return B;
}

LL Fib(LL n, LL mod) {
  if (VS % mod == 0) return special[n] % mod;

  Matrix A(1, 1, 1, 0);
  A = MatrixPowerMod(A, n, mod);
  return A.a[0][1];
}

LL GCD(LL x, LL y) {
  while ((x%=y) && (y%=x));
  return x+y;
}

LL LCM(LL x, LL y) {
  return x / GCD(x, y) * y;
}

LL GetPrimePeriod(LL p, int k) {
  LL result = 0;

  if (p == 5) {
    LL t = 20;
    LL w = t; while(--k) w *= p;
    return (result = w);
  } else if (p%5 == 1 || p%5 == 4) {
    LL N = 1; for(int _=0;_<k;_++) N*=p;
    LL w = p-1; while(--k) w *= p;
    return (result = w);
  } else {
    LL N = 1; for(int _=0;_<k;_++) N*=p;
    LL w = 2*p+2; while(--k) w *= p;
    return (result = w);
  }
}

LL GetPeriod(LL m) {
  LL t = 1;
  LL copy = m;
  for (int j = 0; primes[j] * primes[j] <= copy; j++) {
    LL p = primes[j];
    if (copy % p == 0) {
      int power = 0;
      do {
        copy /= p;
        ++power;
      } while (copy % p == 0);
      
      t = LCM(t, GetPrimePeriod(p, power));
    }
  }
  if (copy > 1) {
   t = LCM(t, GetPrimePeriod(copy, 1));
  }
  return t;
}

void PreCompute() {
  for (int i = 2; i <= 20000; i++) {
    if (!sieve[i]) {
      for (int j = i*i; j < N; j+=i)
        sieve[j] = true;
    }
  }
  for (int i = 2; i < N; i++)
    if (!sieve[i])
      primes.push_back(i);
}

LL pp;
unordered_map<LL, int> pindex;
unordered_map<LL, pair<int, int>> cycindex[128];
vector<vector<LL>> bigcycles[128];
int u[9375000];
int idx[9375000] = {}, ucnt;

LL getans(LL n, LL k, LL p) {
  if (k == 1) {
    return Fib(n, p);
  }
  LL next_period = GetPeriod(p);
  if (p == next_period) {

    if (pindex.find(p) == pindex.end()) {
      int newidx = pindex.size();
      pindex[p] = newidx;
    }
    int pidx = pindex[p];

    vector<LL> g;
    
    ++ucnt;

    n %= p;
    g.push_back(n);
    idx[n] = 0;
    u[n] = ucnt;

    for (LL i = 1; i <= k; i++) {
      n = Fib(n, p);
      if (cycindex[pidx].find(n) != cycindex[pidx].end()) {
        auto [cidx, at] = cycindex[pidx][n];
        vector<LL> &cycle = bigcycles[pidx][cidx];
        int length = cycle.size();
        i += (k-i)/length*length;
        return cycle[ (k-i+at) % length ];
      }
      
      //if (idx.find(n) != idx.end()) {
      if (u[n] == ucnt) {
        // found! from idx[n] to i-1.
        int length = i - idx[n];

        if (i>=10000 || length >=10000)
        cerr << "(pp=" << pp << ") Found a cycle of length " << length  << " at index " << i << endl;
        if (length >= 1000) {
          // Memorize it.
          int cidx = bigcycles[pidx].size();
          vector<LL> cycle;
          for (int j = idx[n]; j < i; j++) {
            cycle.push_back(g[j]);
            cycindex[pidx][g[j]] = {cidx, j-idx[n]};
          }
          bigcycles[pidx].push_back(cycle);
        }

        i += (k-i)/length*length;
        return g[idx[n] + k-i];
      } else {
        g.push_back(n);
        idx[n] = i;
        u[n] = ucnt;
      }
    }
    return n;
  }
  LL t = getans(n, k-1, next_period);
  return Fib(t, p);
}

void solve() {
  LL n, k, p;
  cin >> n >> k >> p;
  LL t = getans(n, k, p);
  cout << t << '\n';
}

void PreTest() {
  for(LL p = 2; p <= 1000000; p++) {
    pp = p;
    getans(576460752303423487LL, 576460752303423487LL, p);
  }
}

void PreTwo() {
  LL mod = VS;
  special[0] = 0;
  special[1] = 1;
  for(int i=2;i<mod;i++) {
    special[i] = (special[i-1]+special[i-2]);
    if(special[i] >= mod) special[i] -= mod;
  }
}

int main() {
  PreCompute();
  PreTwo();
  // PreTest();
  int T;
  cin >> T;
  while(T--) solve();
  return 0;
}
```

### 夢月說

這題應該要 150 行以內寫完才高竿啊。

### Shik說

BubbleCup 2013 曾經出過一道類似題，但是此題的 $T\le 10^3$，而且 $p \le 10^{18}$ 超大。要因數分解還得用 pollar-rho。
* 有興趣的朋友們可以參考 [SPOJ - FRSKH Fibonacci recursive sequences (hard)](https://www.spoj.com/problems/FRSKH)。
* [題解手冊](http://www.bubblecup.org/Content/Media/Booklet2013.pdf)
* [zimpha 的 FRSKH 題解](https://github.com/zimpha/competitive-programming/blob/master/spoj/FRSKH.cc)

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！