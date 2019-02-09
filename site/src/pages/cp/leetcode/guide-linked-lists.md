---
category: "guide"
path: "/leetcode-guide/linked-lists"
date: "2018-12-21"
title: "鏈結串列 Linked Lists"
backlink: "/leetcode-guide"
---

Linked list 是一種資料結構，它利用了指標，讓在記憶體內距離很遠的資料也可以連結起來。根據每一個節點可以連結到的其他節點，大致可以分成以下兩種類型：

### Singly Linked List

<display linked-list
    data='["value: 1", "value: 2", "value: 3"]'>
</display>

```cpp
typedef struct Node {
    int value;
    Node* next;
};
```

### Doubly Linked List

<display linked-list double
    data='["node 1", "node 2", "node 3", "node 4", "node 5"]'>
</display>

```cpp
typedef struct Node {
    Node* prev;
    int value;
    Node* next;
};
```

每一個 `struct` 在記憶體中會是連續的一塊空間。一般來說，我們會額外儲存一個指標 `head` 指向這個鏈結串列的開頭（不然就沒辦法存取了）。進行大部分的操作都是從這個 `head` 開始。

## 常見的鏈結串列操作

### 就地插入 Insertion

給定目前節點所在指標 `node`，想要在該節點後方插入一個新的資料 `new_node`。

### 就地刪除 Deletion

給定目前節點所在指標 `node`，想要刪除該節點後方的資料（非 `node` 本身）。

### 搜尋 Search

給定開頭指標 `head` 以及目標資料 `target`，判斷資料是否出現在任何節點上面。

## 合法的鏈結串列

