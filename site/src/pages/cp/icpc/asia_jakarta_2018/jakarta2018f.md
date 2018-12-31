---
category: "prob"
code: "ICPC-JAKARTA-2018-F"
path: "/problem/icpc/asia_jakarta_2018/F"
title: "Popping Balloons"
date: '2019-01-03'
difficulty: 6
description: |
    Ayu 和 Budi 正在一場類似 ICPC 的比賽上面決鬥。這樣的比賽題目總共有 $N$ 題，然而，參賽者比須按照指定順序依序解題。

    Ayu 熟知她自己與 Budi 解每一題的能力，因此，Ayu 能夠事先得知兩個陣列 A_{1, \ldots, N} 以及 $B_{1, \ldots, N}，其中 $A_i$ 與 $B_i$ 分別表示 Ayu 和 Budi 解出第 $i$ 題所需要的時間。

    故事是這樣的，Ayu 知道 Budi 對突然的巨大聲響相當敏感，比方說當氣球爆炸的時刻。一旦 Budi 受到驚嚇，他手邊的工作就會立即停擺，而且當下解的題目必須**重頭開始**解。如果在恰好要解出一題的當下被嚇到，Budi 也得從頭開始才行。

    Ayu 想利用這點勝過 Budi，她唯一能夠利用的，就是自己解出題目的當下所獲得的氣球。你可以假設 Ayu 一旦解出題目就可以立即獲得氣球，也可以立即戳破氣球（如果 Budi 同時即將解完，可憐的 Budi 就得重頭開始）。請問 Ayu 是否有戳氣球的策略使得在時間 $M$ 結束的當下，Ayu 解出的題數**嚴格大於** Budi 的呢？
    
link: "https://codeforces.com/gym/102001/problem/F"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
---

## 題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入的第一列包含兩個正整數 $N, M$ （$1\le N\le 100000; 1\le M\le 10^9$）依序代表題目的數量與比賽的時間長度。第二列包含 $N$ 個整數 $A_i$（$1\le A_i\le 10^9$），第三列包含 $N$ 個整數 $B_i$（$1\le B_i\le 10^9$）。

## 輸出說明

如果不存在任何方法使得 Ayu 最終題數嚴格大於 Budi 的題數，輸出 `-1`。否則的話輸出一個整數 $K$，然後在第二列輸出 $K$ 個嚴格遞增的數字：Ayu 只要在這些時間點戳破氣球，就可以贏過 Budi。

### 範例輸入 1

```
4 30
9 10 10 10
4 10 5 10
```

### 範例輸出 1

```
2
12 19
```

### 範例輸入 2

```
5 50
10 10 10 10 10
15 12 19 17 20
```

### 範例輸出 2

```
0

```

### 範例輸入 3

```
5 10
15 10 5 5 5
9 10 10 10 10
```

### 範例輸出 3

```
-1
```

## OJ 連結

* [Codeforces Gym 102001 - F](https://codeforces.com/gym/102001/problem/F)


---

## 解法

俗話說得好：<s>氣球恆久遠，一顆永流傳。</s>如果 Ayu 在 Budi 解題目解到一半的時候戳破氣球嚇嚇他，倒不如多等一下，在 Budi 即將解出來的那剎那<s>說時遲那時快</s>再把氣球戳破，讓 Budi 重來感覺豈不是更好嗎！

假設我們有個答案，那我們可以把 Budi 的解題心路歷程記錄下來，比方說（紅色的字代表被嚇到所以沒有解出該題）：

$$
B_1, B_2, \red{B_3}, \red{B_3}, B_3, \red{B_4}, B_4, B_5, ...
$$

如果今天 $B_3 < B_4$，那麼 Ayu 總是可以再多等一下，讓 Budi 重做 $B_4$ 總是比重做 $B_3$ 賺更多！

以上的觀察引導我們使用「堆疊」的解法，去模擬 Ayu 的選擇，把得到的氣球花在 Budi 的哪些題目上頭。我們維護一個堆疊，從堆疊底部到頂部，永遠是「任務編號遞增、所花費時間嚴格遞減」並且紀錄有多少顆氣球花在這題上面。


<algorithm>
    <generator><pre>
        function*(input, ui) {
            var B = input.B;
            var C = input.C;
            var n = B.length;
            var s = [];
            var show = function(stack) {
                return stack.map((x) => `B[${x[0]}] = ${B[x[0]]}\n重做=${x[1]}`);
            };
            var i, j;
            for (i = 0; i < n; i++) {
                s.push([i, C[i]]);
                for (j = 0; j < s.length-1; j++) {
                        ui.setStyleOnce('arr', `${j}`, {fill: 'lightyellow'});
                        ui.setStyleOnce('B', `${s[j][0]}`, {fill: 'lightyellow'});
                    }
                ui.setStyleOnce('B', `${i}`, {fill: 'cyan'});
                ui.setStyleOnce('arr', `${s.length-1}`, {fill: 'cyan'});
                yield ({B: B, arr: show(s)});
                while (s.length >= 2 &&
                    B[s[s.length-1][0]] >=
                    B[s[s.length-2][0]]) {
                        s[s.length-2][1] += s[s.length-1][1];
                        s[s.length-2][0] = s[s.length-1][0];
                        s.pop();
                    for (j = 0; j < s.length-1; j++) {
                        ui.setStyleOnce('arr', `${j}`, {fill: 'lightyellow'});
                        ui.setStyleOnce('B', `${s[j][0]}`, {fill: 'lightyellow'});
                    }
                    ui.setStyleOnce('B', `${i}`, {fill: 'cyan'});
                    ui.setStyleOnce('arr', `${s.length-1}`, {fill: 'cyan'});
                    yield ({B: B, arr: show(s)});
                }
            }
            for (j = 0; j < s.length; j++) {
                        ui.setStyleOnce('arr', `${j}`, {fill: 'lightyellow'});
                        ui.setStyleOnce('B', `${s[j][0]}`, {fill: 'lightyellow'});
                    }
            return {B: B, arr: show(s)};
        }
        </pre>
    </generator>
    <inputdata
        data='{"B": [8, 10, 5, 3, 1, 9, 6, 7, 4, 2],
               "C": [1, 1, 2, 1, 0, 1, 0, 0, 1, 2]}'
    ></inputdata>
    <indirectdisplay
        array
        fixedwidth
        minwidth='30'
        highlightdiff
        varname='B'
    ></indirectdisplay>
    <indirectdisplay
        array
        fixedwidth
        n='5'
        minwidth='30'
        highlightdiff
        varname='arr'
    ></indirectdisplay>
</algorithm>

### 參考程式碼

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int N, M;
  cin.sync_with_stdio(false);
  cin >> N >> M;
  vector<long long> A(N), B(N);

  for (int i = 0; i < N; i++) cin >> A[i];
  for (int i = 0; i < N; i++) cin >> B[i];

  // 先算出 Ayu 拿到每顆氣球的時間點，並算出 Ayu 可以解幾題。
  int nsolved = 0;
  for (int i = 1; i < N; i++) A[i] += A[i - 1];
  for (int i = 0; i < N; i++) nsolved += (A[i] <= M);

  // 我們目標就是要讓 Budi 解出第 nsolved 的時間嚴格大於 M。
  long long t = 0;
  vector<pair<int, int>> stack;
  for (int i = 0, j = 0; i < nsolved; i++) {
    int balloons = 0;
    while (!stack.empty() && B[stack.back().first] <= B[i]) {
      balloons += stack.back().second;
      t -= stack.back().second * B[stack.back().first];
      stack.pop_back();
    }
    t += B[i] * (balloons + 1);
    while (j < nsolved && A[j] <= t) {
      ++j;
      ++balloons;
      t += B[i];
    }
    stack.push_back(make_pair(i, balloons));
  }

  // 如果還是在 M 分鐘內解出來了，就輸出 -1。
  if (t <= M) {
    cout << "-1" << endl;
    return 0;
  }

  // 計算每顆氣球被戳破的時間。
  t = 0;
  int j = 0;
  vector<long long> ans;
  for (auto [i, b] : stack) {
    while (j < i) t += B[j++];
    for (int l = 0; l < b; l++)
      ans.push_back(t += B[i]);
  }

  // 輸出答案。
  while (!ans.empty() && ans.back() > M) ans.pop_back();
  cout << ans.size() << endl;
  for (auto x : ans) cout << x << " ";
  cout << endl;
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！