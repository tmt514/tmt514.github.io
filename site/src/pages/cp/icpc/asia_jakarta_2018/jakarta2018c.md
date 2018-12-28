---
category: "prob"
code: "ICPC-JAKARTA-2018-C"
path: "/problem/icpc/asia_jakarta_2018/C"
title: "Smart Thief"
date: '2019-01-02'
difficulty: 7
description: |
    Ayu 想要打開一個使用密碼鎖加密的箱子。為了能夠找出正確密碼，Ayu 必須要很遺憾地嘗試所有長度為 $N$ 的密碼組合。
    
    有趣的是，Ayu 發現了這套密碼鎖系統其實相當古板：當你輸入 $N$ 個數字以後，系統會自動判斷你到底輸入正確與否。如果輸入了正確的密碼，那麼箱子的鎖便會打開。反之，如果輸入了錯誤的密碼，那麼系統會很聰明地把你先前輸入的第一個數字（最早的）丟掉，這麼一來，你只要再輸入一個數字就可以讓他變成長度 $N$ 了。
    
    舉例來說，如果 $N=4$，而且 Ayu 輸入了 `204320435`。
    
    
link: "https://codeforces.com/gym/102001/problem/C"
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

* [Codeforces Gym 102001 - C](https://codeforces.com/gym/102001/problem/C)


---

## 解法


### 參考程式碼



```cpp
#include <iostream>
#include <vector>
using namespace std;

string s;
int N, M, K;
int last[100005] = {-1};
int a[10];
vector<int> current;

string get_string() {
  string ret = "";
  for (int x: current) ret += ('0' + a[x]);
  return ret;
}

void generate_lyndon_words(int now = 0) {
  if (now && N % now == 0) {
    if (last[now-1] == -1) {
      s += get_string();
    }
  }

  if (s.size() >= K+N-1) return;
  if (now == N) return;

  for (int i = now? current[last[now-1]+1]: 0; i < M; i++) {
    current.push_back(i);
    if(now) last[now] = last[now-1]+1;
    while (last[now] > 0 && current[now] != current[last[now]]) {
      last[now] = last[last[now]-1]+1;
    }
    if (last[now]==0 && current[0] != current[now]) last[now] = -1;
    generate_lyndon_words(now + 1);
    current.pop_back();
    if (s.size() >= K+N-1) break;
  }
}

int main() {
  cin >> N >> M >> K;
  for (int i = 0; i < M; i++) cin >> a[i];
  generate_lyndon_words();
  while (s.size() < K+N-1)
    s += s;
  s = s.substr(0, K+N-1);
  cout << s << endl;
  return 0;
}
```

### 備註 1

Edit Distance 好像又被稱為 [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)，是一種衡量兩個字串是否有多接近的指標（metric，不是 pointer XD）。

### 備註 2

Edit Distance 滿足三角不等式：$edit(A, B)+edit(B, C) \ge edit(A, C)$，白話文解釋就是從 $A$ 換到 $C$ 的方法，至少有先從 $A$ 變成 $B$ 再從 $B$ 變成 $C$ 來得好。

<theorem title='演算法豆知識' c='is-primary'>
在[強指數時間假說](/algo/strong-exponential-time-hypothesis)為真的前提之下，計算兩個長度為 $n$ 字串的 Edit Distance (exact) 至少得花 $\Omega(n^{2-\epsilon})$ 的時間。但是就近似演算法 (Approximation Algorithms) 而言， 2018 年 FOCS 的一篇最佳論文 [_Approximating Edit Distance Within Constant Factor in Truly Sub-Quadratic Time_](https://arxiv.org/abs/1810.03664)，在 $\tilde{O}(n^{12/7})$ 時間內保證得到 $1680$-approxmation 的近似解，是為近期的一個重大突破。（作者們相信稍微用他們的方法再努力一下就可以做到 $(3+\epsilon)$-approximation）
</theorem>

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！