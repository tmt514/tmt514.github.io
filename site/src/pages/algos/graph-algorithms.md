---
category: "notes"
path: "/algo/graph-algorithms"
date: "2018-02-08"
title: "圖論演算法列舉"
---

## 平面圖 Planar Graphs

* **[定義]** Graph Minor: 刪除點或邊、收縮邊。  
  [https://en.wikipedia.org/wiki/Graph_minor](https://en.wikipedia.org/wiki/Graph_minor)
* **[Kuratowski, Wagner 定理]** 平面圖若且唯若不含 $K_{3,3}$ 或 $K_5$ 為 homeomorphic subgraph/minor。
* **[Boyer-Myrvold 演算法]** $O(n)$ 平面圖判定。  
  [John M. Boyer, Wendy J. Myrvold. *On the Cutting Edge: Simplified $O(n)$ Planarity by Edge Addition*, 2004.](http://jgaa.info/accepted/2004/BoyerMyrvold2004.8.3.pdf)
* **[de Fraysseix, de Mendez and Rosenstiehl 演算法]** LR-partition $O(n)$ 平面圖判定。  
  [Ulrik Brandes, *The Left-Right Planarity Test*, 2009.](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.217.9208&rep=rep1&type=pdf)

## 完美圖 Perfect Grpahs

* **[資源]** Algorithmic Graph Theory Part III. Perfect Graph.  
  [Slides](http://profs.sci.univr.it/~liptak/MilanicCourse/AGT_Part_3_Perfect_Graphs.pdf)  
  [Martin Milanic "Algorithmic Graph Theory" Course](http://profs.sci.univr.it/~liptak/MilanicCourse/)
  