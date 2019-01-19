---
category: "prob"
code: "ICPC-SINGAPORE-I"
path: "/problem/icpc/asia_singapore_2018/I"
title: "Prolonged Password"
date: '2019-01-19'
difficulty: 6
description: |
    給你一個初始字串 $S$，然後根據函數 $f$ 構造密碼 $P=f^K(S)$。函數 $f$ 的操作如下：對於 $S$ 的所有字元，把該字元同時換成對應的字串。同一個字元對應到的替換字串是固定的，如果看到 `a` 就換成 $T_a$、看到 `b` 就換成 $T_b$、依此類推。

    給你 $M$ 個詢問。每一個詢問都會讀取一個整數 $m_i$，並且要你回答出密碼 $P$ 的第 $m_i$ 個字元為何。

link: "https://open.kattis.com/problems/prolongedpassword"
oj: "kattis"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Singapore Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

第一列包含一個字串 $S$, ($1\le |S|\le 1000000$)。

第二列包含 13 個字串 $T_a, T_b, \ldots, T_m$。($2\le |T_a|, |T_b|, \ldots, |T_m| \le 50$)

第三列包含 13 個字串 $T_n, T_o, \ldots, T_z$。($2\le |T_n|, |T_o|, \ldots, |T_z| \le 50$)

第四列包含一個整數 $K$ ($1\le K\le 10^{15}$)。

第五列包含一個整數 $M$ ($1\le M\le 1000$)。

第六列包含 $M$ 個整數，第 $i$ 個整數為 $m_i$，其中 $1\le m_i\le \min(|f^K(S)|, 10^{15})$。

## 輸出說明

對於每一個詢問，單獨輸出所求字元於一列。

### 範例輸入 1

```
abca
bc cd da dd ee ff gg hh ii jj kk ll mm
nn oo pp qq rr ss tt uu vv ww xx yy zz
1
2
1 8
```

### 範例輸出 1

```
b
c
```

### 範例輸入 2

```
ab
ba ab cc dd ee ff gg hh ii jj kk ll mm
nn oo pp qq rr ss tt uu vv ww xx yy zz
2
2
1 8
```

### 範例輸出 2

```
a
b
```

## OJ 連結

* [Open Kattis - Prolonged Password](https://open.kattis.com/problems/prolongedpassword)

**題目出處**：ICPC 2018 Asia Singapore Regional

---

## 解法

我們可以把函數 $f$ 迭代的過程展開成樹狀圖。而依照順序遍歷葉節點的時候，就相當於把最終的密碼 $P$ 印出來。如果要取得第 $m_i$ 個字元，那麼我們要找的便是由左至右數來第 $m_i$ 個葉子。下圖是第一筆範例以字母 `a` 開頭展開三層的樣子。

<display
    binary-tree
    complete
    depth='4'
    uihelper-content-map='{
        "a": {font: "24pt monospace", fontColor: "red"},
        "b": {font: "24pt monospace", fontColor: "blue"},
        "c": {font: "24pt monospace", fontColor: "green"},
        "d": {font: "24pt monospace", fontColor: "gold"},
        }'
    data='{
        value: ["a", "b", "c", "c", "d", "d", "a", "d", "a", "d", "d", "d", "d", "b", "c"]
    }'></display>

如果我們從根節點（某個字元 $\alpha$）開始，事先知道每一個子樹的大小，就可以在 $|T_\alpha|$ 的時間內直接前往帶有第 $m_i$ 個葉子的子樹。因此，預處理以後我們可以在 $O(50\times K)$ 的時間內走到我們想要的葉節點。可惜的是，$K$ 太大了，而且整棵樹的大小不見得存得下。

好消息是，會詢問的數字頂多只有 $10^{15}$，我們可以把超過的部份完全忽略掉：也就是說，對於超過 $10^{15}$ 大小的子樹，我們不需要精確計算其大小，只要標記成「唉呀太大了」就可以了。

此外，還有另一個方便實作的好消息：題目的條件保證了每一個 $T_\alpha$ 長度至少有 2。這代表什麼呢？我們只要關心最靠近底層的 $\log_2(10^{15})\approx 50$ 層就行啦！如果整棵樹太高，一開始我們只要想辦法從樹根，每次挑選第一個子節點往下走，快速抵達最底下的 50 層就行了～

注意到字串僅包含小寫英文字母，從上面往下走得過程，至多 26 步就會產生一個循環。我們可以快速跳過若干循環節，到第 $50+O(1)$ 層停下來。然後從那個地方開始進行前述的「搜索」過程，而且一開始也只需要紀錄 50 層左右的子樹的大小。

### 參考程式碼

為了方便起見，我直接紀錄到 63 層，往下找循環的時候，也是直接跳到 100 層左右，然後再一個一個走下去。

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long LL;
string S;
string T[26];
LL K;

LL len[26][64];
const LL LIMIT = (LL)1e15;

void add(LL &x, LL v) {
  // -1 代表超過長度。
  if (x == -1 || v == -1) {
    x = -1;
  } else {
    x += v;
    if (x >= LIMIT)
      x = -1;
  }
}

void pre() {
  for (int i = 0; i < 26; i++) {
    len[i][0] = 1;
    len[i][1] = T[i].size();
  }
  for (int t = 2; t < 64; t++)
    for (int i = 0; i < 26; i++)
      for (auto x : T[i])
        add(len[i][t], len[x - 'a'][t - 1]);
}

char ans;

// 如果還不夠的話就回傳 false，如果找到了就回傳 true.
bool ask(LL &m, char root, LL k) {
  if (k == 0) {
    --m;
    ans = root;
    return (m == 0);
  }
  if (k < 64 && len[root - 'a'][k] != -1 && len[root - 'a'][k] < m) {
    m -= len[root - 'a'][k];
    return false;
  }
  if (k <= 100) {
    for (auto child : T[root - 'a']) {
      if (ask(m, child, k - 1)) {
        return true;
      }
    }
  } else {
    // 找出 cycle, 然後飛到第一個小於100層的地方。
    int pos[26] = {};
    int now = root - 'a';
    int cnt = 1;
    while (pos[now] == 0) {
      pos[now] = cnt;
      now = T[now][0] - 'a';
      cnt++;
    }
    int cycle = cnt - pos[now];
    k -= (cnt - 1);
    k -= (k - 100) / cycle * cycle;
    k -= cycle;
    return ask(m, now + 'a', k);
  }
  return false;
}

void solve() {
  LL m;
  cin >> m;
  for (size_t i = 0; i < S.size(); i++) {
    if (ask(m, S[i], K))
      break;
  }
  cout << ans << '\n';
}

int main() {
  cin >> S;
  for (int i = 0; i < 26; i++)
    cin >> T[i];
  cin >> K;
  // 預處理，計算不超過 64 層，以某字元為樹根的子樹大小。
  pre();

  int M;
  cin >> M;
  while (M--)
    solve();
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！