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

<thm data-ref="[JY] Theorem 2.10"><p>
若 $(G, E, D)$ 是一個完美加密的系統，其明文空間 $\mathcal{M}$ 以及密鑰空間 $\mathcal{K}$，那麼保證有 $|\mathcal{K}| \ge |\mathcal{M}|$。</p>
</thm>
