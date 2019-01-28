---
category: "prob"
code: "ICPC-2018-SEOUL-F"
path: "/problem/icpc/asia_seoul_2018/F"
title: "Parentheses"
date: '2019-01-28'
difficulty: 3
description: |
    給你一個用 26 個英文字母當作運算子、加減乘除當作運算元、可能會包含括弧的算式。請你判斷這是否為一個合法的算式，如果是的話，是否有使用標準括弧規範？（也就是每個括弧內恰好對應到唯一的運算子。）

link: "https://codeforces.com/gym/101987"
oj: "codeforces-gym"
backlink: "/icpcblog-weekly-2019"
tags:
    - "ICPC 2018 Asia Seoul Regional"
---

## 簡化後題目敘述

<showvariable varname="description"></showvariable>

## 輸入說明

輸入僅有一列，包含題目所述之算式。


## 輸出說明

輸出 `proper`, `improper` 或是 `error`。

### 範例輸入 1

```
a + a
```

### 範例輸出 1

```
proper
```

### 範例輸入 2

```
(b+( a+c )) + b
```

### 範例輸出 2

```
proper
```

### 範例輸入 3

```
c + ((b) + a)
```

### 範例輸出 3

```
improper
```

### 範例輸入 4

```
c+(a%/b)
```

### 範例輸出 4

```
error
```

### 範例輸入 5

```
x + ((y + z)
```

### 範例輸出 5

```
error
```


### 範例輸入 6

```
a b + (c + b)
```

### 範例輸出 6

```
error
```

### 範例輸入 7

```
x + y + z
```

### 範例輸出 7

```
improper
```

## OJ 連結

* [Codeforces Gym](https://codeforces.com/gym/101987)

**題目出處**：ICPC 2018 Asia Seoul Regional

---

## 解法

可以直接用堆疊模擬，把同一個括弧層看到的東西，用一個字串表示的話應該要是「運算元、運算子、運算元、運算子、...、運算元」交錯排列。如果是 `proper` 的話，有括弧的情形必須要恰好僅有一個運算子。最外層要特判一下這樣。

或許會有更短也不容易寫錯的寫法？

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

bool proper = true;
bool correct = true;

string S;

string RemoveSpace(string& S) {
  string T = "";
  for (auto x: S) if (x != ' ') T += x;
  return T;
}

// 合法的序列會是 x+x+x+...+x
void UpdateCorrectness(vector<char>& c) {
  if (c.size()%2==0) { correct = false; return; }
  for (size_t i = 1; i < c.size(); i++)
    if (c[i] == c[i-1]) {
      correct = false;
      return;
    }
  if (c[0] != 'x') { correct = false; return; }
}

int main() {
  getline(cin, S);
  S = RemoveSpace(S);
  vector<vector<char>> levels(1);
  for (size_t i = 0, now = 1; i < S.size(); i++) {
    if (S[i] == '(') {
      levels.back().push_back('x');
      ++now;
      levels.resize(now);
    } else if (S[i] == ')') {
      UpdateCorrectness(levels.back());
      if (levels.back().size() != 3) proper = false;
      levels.pop_back();
      --now;
      if (now <= 0) {
        correct = false;
        break;
      }
      levels.resize(now);
    } else if (S[i] >= 'a' && S[i] <= 'z') {
      levels.back().push_back('x');
    } else {
      levels.back().push_back('+');
    }
  }

  if (levels.size() != 1) {
    correct = false;
  } else {
    UpdateCorrectness(levels[0]);
    if (S[0] == '(' && levels[0].size() == 1) proper = false;
    if (levels[0].size() != 1 && levels[0].size() != 3) proper = false;
  }
 
  if (correct && proper) {
    cout << "proper" << endl;
  } else if (correct && !proper) {
    cout << "improper" << endl;
  } else if (!correct) {
    cout << "error" << endl;
  }
  return 0;
}
```

### 關於競程日記

🍅 如果您想到更多有趣漂亮簡單乾淨的解法話歡迎留言給競程日記小編群！

ℹ️ 這是一篇投稿給[競程日記](https://www.facebook.com/競程日記-1514973425463954/)的文章，歡迎大家投稿、交流與分享程式解題競賽的點點滴滴！