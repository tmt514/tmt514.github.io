---
layout: post
title: Perfect Secrecy
tags: 密碼學
---

通常我們在討論完美加密(Perfect Secrecy)性質的時候都必須要先給予一些嚴謹的定義：

<def name="(加密系統 Encryption Scheme)" data-ref="[JY] Chapter 2.1">
<p>一套加密系統是由三個演算法 $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ 來組成，其中牽涉到三個物件空間：將所有明文(訊息、Message)組成的空間 $\mathcal{M}$、所有密文組成的空間 $\mathcal{C}$ 以及所有密鑰組成的空間 $\mathcal{K}$。其中 $\mathsf{Gen}$ 是生成密鑰的演算法， $\mathsf{Enc}$ 是加密的演算法、$\mathsf{Dec}$ 是解密的演算法。</p>

<p>一個<em>正確</em>的加密系統必須滿足：$m = \mathsf{Dec}_k(\mathsf{Enc}_k(m))$，對所有 $k\in\mathcal{K}, m\in\mathcal{M}$ 成立。</p>
</def>

除此之外，我們還必須假設明文、密文和密鑰都有一定的機率分布 $(\Omega, \mathbb{P})$ 存在。於是我們就可以定義所謂的加密模型。

<def name="(加密模型 Model)" data-ref="[JY] Chapter 2.1">
<p>一個加密模型包含了三個隨機變數 $(M, K, C)$。這三個隨機變數是遵照機率分布 $(\Omega, \mathbb{P})$ 作用在加密系統 $S=(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ 上的。在這樣的定義下唯一的假設就是密鑰的生成與明文的分布是獨立的，即 $M$ 與 $K$ 獨立。</p>
</def>

接下來我們就可以討論什麼樣的加密方法是安全的了：

<def name="(完美加密 Perfect Secrecy)" data-ref="[JY] Definition 2.3"><p>
我們說一套加密系統 $S=(G,E,D)$ 和明文空間 $\mathcal{M}$ 是 perfect secret，若且唯若對於任意定義在明文空間的機率分布 $\mathbb{P}$，對於其中任何可能出現的明文 $m\in\mathcal{M}$ 以及密文 $c\in\mathcal{C}$ (使得 $\mathbb{P}\{C=c\}>0$) 都有：
$$ \mathbb{P}\{ M = m | C = c \} = \mathbb{P}\{M = m\}$$
</p>
</def>

直接翻譯的意思是說：$M$ 和 $C$ 這兩個隨機變數必須是獨立的。現在我們嘗試用另一個角度來看這件事情：如果我們今天得到一個密文 $c$，那麼我們<em>不應該獲得任何有關明文的資訊</em>。以機率形式表達出來則是

<lemma>
<p>一套加密系統 $S$ 是 perfect secret，若且唯若
$$ \mathbb{P}\{\mathsf{Enc}_k(m) = c\} = \mathbb{P}\{\mathsf{Enc}_k(m') = c\}$$
對所有的 $m, m'\in\mathcal{M}$ 成立。</p>
</lemma>

#### 證明

<div><p>
注意到由 $C$ 的定義 $C=\mathsf{Enc}_K(M)$ ，我們有 $$\mathbb{P}\{C=c\vert M=m\} = \mathbb{P}\{\mathsf{Enc}_K(M)=c \vert M=m\} = \mathbb{P}\{\mathsf{Enc}_K(m) = c\}$$</p>
<p>
剩下的部份 「$\Rightarrow$」 的證明：對於所有 $m, m'$，由於 M, C 彼此獨立，因此 $\mathbb{P}\{C=c|M=m'\} = \mathbb{P}\{C = c\} = \mathbb{P}\{C = c|M=m\}$ 得證。
</p><p>
「$\Leftarrow$」的證明：考慮事件 $C=c$ 的 total probability，我們有 
$$ \mathbb{P}\{C=c\} = \sum_{\substack{m\in\mathcal{M}\\ \mathbb{P}\{M=m\}>0}} \mathbb{P}\{C=c|M=m\}\cdot \mathbb{P}\{M=m\}$$
但是等號右邊所有的 $\mathbb{P}\{C=c|M=m\}$ 皆相等。於是對於任何一個 $m\in\mathcal{M}$，我們有
$$ \mathbb{P}\{C=c\} = \mathbb{P}\{C=c|M=m\} \left(\sum_{\substack{m\in\mathcal{M}\\ \mathbb{P}\{M=m\}>0}} \mathbb{P}\{M=m\}\right) = \mathbb{P}\{C=c|M=m\}$$
這證明了 $C$ 與 $M$ 獨立。
<EOP></EOP></p>
</div>

接下來透過 distinguishing game (或者課本稱為experiments) 的觀念來得到另一個等價的定義，簡單來說，就是有個假想的邪惡對手，他給你兩個明文，而你挑選其中一個並且告訴他加密後的結果。若這個邪惡的對手可以準確猜出你挑選的明文，那麼這個加密系統便是為不安全的。

<div class="definition" markdown="1" name="(辨別試驗 Adversarial Indistinguishability Experiment)">

對於一個加密系統 $(G,E,D)$ 的一個加密模型，考慮一個對手 Adversary $\mathcal{A}$ 我們進行以下操作：

* $\mathcal{A}$ 挑選了兩個明文 $m_0, m_1\in\mathcal{M}$ 
* 生成一把密鑰 $k\leftarrow \mathsf{Gen}$，並且擲一枚公正硬幣 $b\in\\{0, 1\\}$
* 把隨機挑選的加密訊息 $c\leftarrow E_k(m_b)$ 交給 $\mathcal{A}$
* 對手會輸出一個 bit $b'$
* 若 $b=b'$ 則對手勝，否則對手敗。

</div>

在這邊有一個特別重要的事情：我們並沒有對 $\mathcal{A}$ 進行任何限制、甚至是任何說明。基本上我們只要將 $\mathcal{A}$ 假想為一個隨機函數 $\mathcal{C}\to\\{0, 1\\}$ (probabilistic function)，或者你也可以把隨機性質加入定義域裡頭：$\mathcal{A}: (c, r)\mapsto \\{0, 1\\}$。

於是我們可以利用這個辨別試驗，來得到一個等價於完美加密的定義：

<thm data-ref="[JY] Lemma 2.6">
<p> $(G,E,D)$ 有完美加密性質若且唯若對於任意 $\mathcal{A}$，他參與辨別試驗的獲勝機率<em>恰好</em>是 $1/2$。</p>
<p>(註：其實原本是希望 $\le 1/2$，但事實上，若有個 $\mathcal{A}$ 獲勝機率嚴格小於 $1/2$，我們可以將它的輸出反過來而得到另一個機率嚴格大於 $1/2$ 的新對手 $\mathcal{A}'$。</p>
</thm>

有時候我們會將 $\mathcal{A}$ 稱呼為分別者(distinguisher)。根據這樣更貼近現實的操作型定義，我們可以對一些經典的加密模型進行分析：

<example name="(維吉尼亞加密 Vigenére Cipher)" data-ref="[JY] Example 2.7">
<p>維吉尼亞加密是一種把輸入的字串切段之後每一段根據密鑰 $k$ 的值進行疊加。在下面的敘述裡頭我們假設密鑰長度是 $1$ 或是 $2$ 的機率分別都是 $50\%$。</p>
<p>事實上我們可以證明 Vigenére Cipher 並不是完美加密的。</p>
</example>

<p>
我們可以建立一個 adversary $\mathcal{A}$: 一開始生出 $m_0 = {\mathtt{aa}}, m_1 = {\mathtt{ab}}$ 這兩個字串，然後檢查加密的密文 $c = c_0c_1$ 當中若 $c_0\neq c_1$ 則輸出 $b'=1$，否則輸出 $b'=0$。<EOP></EOP></p>

那麼有沒有任何加密方法能夠做到完美加密呢？事實上是有的。Shannon 在提出這套理論的時候就順便證明了 1917 年的 Vernam Cipher (現在被我們稱呼為 One-time Pad，一次性密碼本)

<example name="(一次性密碼本 One-Time Pad)" data-ref="[JY] Theorem 2.9">
<p>One-Time Pad 的作法是假設密鑰、密文和明文的長度都是 $\ell$ 個 0/1 位元，每一次 $\mathsf{Gen}$ 都會隨機生成一個長度為 $\ell$ 的二元字串 $k$，然後把它跟明文進行 XOR 運算從而得到密文 $c = k\oplus m$。</p>
<p>證明一次性密碼本(或稱 Vernam Cipher)是完美加密的。</p>
</example>

<p>事實上我們只需要先證 $\mathbb{P}\{C = c | M = m\} = \mathbb{P}\{K = c\oplus m\} =  1/2^\ell$，然後再利用 total probability 證明 $\mathbb{P}\{C = c\} = 1/2^\ell$ 就可以說明 $C$ 和 $M$ 是彼此獨立的。<EOP></EOP></p>

但是仔細想想，其實每一次都要做 One-Time Pad 相當不切實際，如果有安全的管道可以傳送密鑰，那麼乾脆把明文也一起傳過去了不是更方便？而事實上我們可以證明某種程度上若要達到完美加密，密鑰的數量至少要有明文數量這麼多才行。

根據明文機率模型的分佈，我們可以考慮以下兩種常見的模型均勻模型(Uniform Model)以及二元模型(Binary Model)：

<def name="(均勻模型 Uniform Model)" data-ref="[EECS575W15] hw2">
<p>對於一個加密模型來說，當中的 Uniform Model 就是所有明文出現的機率均等，即
$$ \mathbb{P}\{M = m\} = \frac{1}{|\mathcal{M}|} $$</p>
</def>

<def name="(二元模型 Binary Model)" data-ref="[EECS575W15] hw2">
<p>對於一個加密模型來說，對於某兩個元素 $m_0, m_1\in\mathcal{M}$ 而言，它們兩者出現機會均為 $1/2$，但是對於其他的 $m'\neq m_0, m_1$，都有 $\mathbb{P}\{M=m\}=0$。</p>
</def>

<thm data-ref="[JY] Theorem 2.10"><p>
若 $(G, E, D)$ 是一個完美加密的系統，其明文空間 $\mathcal{M}$ 以及密鑰空間 $\mathcal{K}$，那麼保證有 $|\mathcal{K}| \ge |\mathcal{M}|$。</p>
</thm>

#### 證明

<p>令 $S$ 為一個完美加密系統，我們考慮均勻模型。對於任何一個 $c\in\mathcal{C}$ 使得 $\mathbb{P}_C(c) > 0$。我們可以寫 $\mathsf{Dec}_k(c) = \mathsf{Dec}(k,c) = \mathsf{Dec}^c(k)$。而我們宣稱 $\mathsf{Dec}^c: \mathcal{K}\to\mathcal{M}$ 是個 onto function：假設不然，存在某個 $m\in\mathcal{M}$ 使得不存在 $k\in\mathcal{K}$ 使得 $\mathsf{Dec}^c(k) = m$。此時有
$$ \mathbb{P}\{ M = m | C = c \} = 0 $$
但是根據均勻模型的假設，$\mathbb{P}\{M = m\}\neq 0$，因此得知 $M$ 與 $C$ 不獨立，與 $S$ 完美加密性質矛盾。</p>
<p>因此 $\mathsf{Dec}^c$ 是一個 (deterministic) onto function，因此 $|\mathcal{K}| \ge |\mathcal{M}|$，得證。<EOP></EOP></p>

<exercise data-ref="[EECS575W15] hw2"><p>
<ol style="list-style-type: upper-alpha">
<li>一個加密系統 $S$ 是完美加密的，若且唯若其任何一個二元模型當中 $M$ 與 $C$ 兩隨機變數獨立。</li>
<li>一個加密系統 $S$ 是完美加密的，若且唯若其均勻模型當中 $M$ 與 $C$ 兩隨機變數獨立。</li>
</ol></p>
</exercise>

<p>Shannon 厲害的地方不僅於此，當我們考慮某種概念下的「最小情形」，也就是 $|\mathcal{M}| = |\mathcal{K}| = |\mathcal{C}|$ 的時候，事實上他找出了所有滿足這個條件的所有完美加密系統。</p>

<thm name="(Shannon 定理)" data-ref="[JY] Theorem 2.11"><p>
考慮 $|\mathcal{M}| = |\mathcal{K}|= |\mathcal{C}|$ 底下的加密系統 $(\mathsf{G}, \mathsf{E}, \mathsf{C})$ ，其為完美加密若且唯若：
<ol style="list-style-type: lower-roman">
<li> $\mathsf{G}(k) = 1/|\mathcal{K}|, \forall k\in\mathcal{K}$</li>
<li> 對於任意的 $m\in\mathcal{M}, c\in\mathcal{C}$，存在一個唯一的密鑰 $k\in\mathcal{K}$ 使得 $\mathsf{E}_k(m) = c$。</li>
</ol>
</p>
</thm>

#### 證明

<p>先證明比較簡單的 $\Leftarrow$ 方向。假若 i. ii. 成立，我們令 $k_{m, c}$ 表示那個唯一的密鑰使得 $\mathsf{E}_k(m) = c$。於是
$$\mathbb{P}\{C = c|M = m\} = \mathbb{P}\{\mathsf{E}_K(M) = c| M = m\} = \mathbb{P}\{\mathsf{E}_K(m) = c\} = \mathbb{P}\{K = k_{m, c}\} = \frac{1}{|\mathcal{K}|}$$
再由 total probability，我們有
$$\mathbb{P}\{C = c\} = \sum_{\substack{m\in\mathcal{M}\\ \mathbb{P}_M(m)>0}} \mathbb{P}\{C = c|M=m\}\cdot\mathbb{P}\{M = m\} = \frac{1}{|\mathcal{K}|}$$
於是可知 $C$, $M$ 相互獨立。</p>

<p>另一個方向，假設完美加密性質為真，我們從均勻模型下手。首先我們挑選一個 $c$ 使得 $\mathbb{P}\{C=c\}\neq 0$，這個 $c$ 是存在的，因為至少有一個密鑰 $k$ 使得 $\mathbb{P}_K(k)>0$，我們隨意選擇任何一個明文 $m\in\mathcal{M}$，接著令 $c = \mathsf{E}_k(m)$ 之後就有 $\mathbb{P}\{C = c\} \ge \mathbb{P}\{K=k\}\mathbb{P}\{M=m\} > 0$ (因為 $K$, $M$ 互相獨立)。接下來，由於完美加密的性質 $\mathbb{P}\{\mathsf{E}_K(m')=c\} = \mathbb{P}\{\mathsf{E}_K(m)=c\} > 0$，對所有的 $m'\in\mathcal{M}$ 都要成立。此時我們可以知道對於所有的 $m'$，都存在一個 $k\in\mathcal{K}$ 使得 $\mathsf{D}^c(k) = m'$。因此 $D^c:\mathcal{K}\to\mathcal{M}$ 是 onto function。但是由於 $|\mathcal{K}| = |\mathcal{M}|$，因此 $D^c$ 也是 one-to-one 的。因此，對於每一個 $m$，都有恰好一個 $k$ 使得 $D^c(k) = m$。這證明了 ii.。</p>

<p>由於對於每個 $m$，僅有唯一的 $k$ 使得 $\mathsf{D}^c(k) = m$；因此也僅有唯一的 $k$ 使得 $\mathsf{E}_k(m) = c$。此時
$$ \mathbb{P}\{K = k_i\} = \mathbb{P}\{\mathsf{E}_k(m_i) = c\} = \mathbb{P}\{\mathsf{E}_k(m_j) = c\} = \mathbb{P}\{K = k_j\}$$
於是所有密鑰出現的機率均等，這證明了 i.。 <EOP></EOP></p>

在 Shannon 定理的證明之後，我們便可以對明文空間、密鑰空間相等時，其實加解密只是一個置換而已。

<exercise name="(拉丁方陣 Latin Squares)" data-ref="[EECS575W15] HW2"><p>
定義拉丁方陣為以下陣列
$$\begin{bmatrix}
a_{1,1} & a_{1,2} & \cdots & a_{1, n}\\
a_{2,1} & a_{2,2} & \cdots & a_{2, n}\\
\vdots & \vdots & \ddots & \vdots \\
a_{n,1} & a_{n,2} & \cdots & a_{n,n}
\end{bmatrix}$$
其中每一行、每一列都是一個 $1, 2, \cdots, n$ 的排列(permutation)。假設我們給定這個方陣，以及 $\mathcal{K}=\mathcal{M}=\mathcal{C}=\{1,2,\cdots, n\}$，定義 $\mathsf{Enc}(i, j) = \mathsf{Enc}_i(j) = a_{i, j}$。
<ol style='list-style-type: lower-alpha'>
<li> 證明存在一個解密的函數 $\mathsf{Dec}(i, j) = \mathsf{Dec}_i(j)$ 使得 $\mathsf{Dec}_i(\mathsf{Enc}_i(j)) = j$。</li>
<li> 證明若 $\mathsf{Gen}$ 可以在 $\mathcal{K}$ 生成均勻分布，那麼 $(\mathsf{Gen}, \mathsf{Enc}, \mathsf{Dec})$ 是一個完美加密系統。</li>
</ol>
</p></exercise>

<exercise data-ref="[JY] Ex 2.7"><p>
當我們使用 One-time pad 的時候，如果密鑰 $k=0^\ell$，那麼顯然加密跟沒有加密效果是一樣的。若我們想要考量一個更「安全」的 One-time pad：讓生成密鑰的演算法 $\mathsf{Gen}$，可以均勻地生成所有 $k\neq 0^\ell$、長度為 $\ell$ 的密鑰，那麼再以它對明文進行 $\oplus$ 運算。請問這個方法是否仍是完美加密的？為什麼？
</p></exercise>

<p>提示：考慮前面的定理。</p>

<exercise data-ref="[JY] Ex 2.1"><p>
試證明：重新定義密鑰空間後，我們可以得到一個所有密鑰的生成都是均勻分布的 $\mathsf{Gen}$，但是並不會改變每一個明文、密文配對的出現比例，即 $\mathbb{P}\{C = c|M=m\}$ 不變。
</p></exercise>

<p>提示：對原本的密鑰生成演算法 $G$，我們考慮它所有利用到的 random bits $r$ (也就是說，我們可以視 $G(r)$ 是一個 deterministic 演算法，其中原本拿來生成隨機二元亂數的地方以輸入的 0-1 字串 $r$ 來代替。接著我們令新的 $\mathsf{Gen}$ 生成 $\{0,1\}^{|r|}$ 之中任意一個字串。把剩下的工作塞進 $\mathsf{Enc}_r(\cdot)$ 和 $\mathsf{Dec}_r(\cdot)$ 裡面。</p>
