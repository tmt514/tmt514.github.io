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

每一個 `struct` 在記憶體中會是連續的一塊空間。一般來說，我們會額外儲存一個指標 `head` 指向這個鍊結串列的開頭（不然就沒辦法存取了）。進行大部分的操作都是從這個 `head` 開始。
