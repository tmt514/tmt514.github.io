---
category: "research"
path: "/research-notes/byzantine-agreement-problem"
date: "2019-03-11"
title: "Byzantine Agreement Problems"
css_title_theme: "is-info research"
css_content_theme: "research"
backlink: "/research-notes"
math_font: "Gyre-Pagella"
---


## 1 Byzantine Agreement

There are $N$ processores.
Each processors $p$ has a private input bit $v_p\in\{0, 1\}$.
Throughout the protocol, every process can asynchronously pass messages to any other processors through a authenticated channel. 
That is, it is assumed to be able to correctly identify the sender and the receiver by looking at the message itself.
Eventually every processor _decides_ an output bit and then halts.
The protocol is required to have the following properties:

* **Agreement**: all _good_ processors output the same bit.
* **Validity**: the output bit must occur as some _good_ processors's input bit.
* **Termination**: all _good_ processors halts after some a priori known round number $r$.

### 1.1 Terminology

* **Resilience**: we say that a protocol is $t$-resilient if consensus can be made if at most $t$ processors becomes bad.
* **Failure**: there are two types of failure: the **Fail-Stop** type failure or the **Byzantine** type failure. We consider Byzantine type failure.

## 2 The FLP Impossibility Result

> 📑Fischer, Lynch and Paterson. [_Impossibility of Distributed Consensus with One Faulty Process_](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf), 1985.


## 3 Common Abstractions to the Asynchronous Model

### 3.1 Bracha's Reliable Broadcast

> 📑Gabriel Bracha. [_Asynchronous Byzantine Agreement Protocols_](https://core.ac.uk/download/pdf/82523202.pdf), 1987.

The first abstraction of this model is the _reliable broadcast_. Let $t$ be the number of bad processors. When $t < n/3$, they have the following properties:

* If a good processor sends a message $m$, then every good processor eventually _receives_ $m$.
* If a bad processor sends a message, then every good processor _receives_ the same message $m$ or they do not _receive_ any message at all.
* They terminated in $O(1)$ rounds.



1. Send $(initial, m)$ to all processors.
2. Upon receiving $(initial, m)$, send $(echo, m)$ to all processors.


### 3.2 King and Saia's Blackboard Model

> 📑Valerie King, Jared Saia. [_Byzantine Agreement in Expected Polynomial Time_](https://dl.acm.org/citation.cfm?id=2837019), JACM 2016.
>
> 📑Valerie King, Jared Saia. [_Correction to Byzantine Agreement in Expected Polynomial Time, JACM 2016_](https://arxiv.org/abs/1812.10169), ArXiv 2018.


## 4 Upper Bounds

| Algorithm | Resilience | communication time | local running time |
|---|---|---|---|
| Ben-Or 1983 | $t < n/5$ | Exponential |   |
| Bracha 1987 | $t < n/3$ | Exponential |   |
| King and Saia 2016 | $t < 1.15\times 10^{-9}n$ | $O(n^3)$ | Polynomial Time |
| King and Saia 2016 | $t < n/400$ | $O(n^{2.5}\sqrt{\log n})$ | Exponential Time |
| Li and Duan 2018 | $t = \Theta(n)$ | $O(n)$ | Exponential Time |

## 5 Lower Bounds

> 📑James Aspnes. [_Randomized Protocols for Asynchronous Consensus_](http://disi.unitn.it/~montreso/ds/syllabus/papers/randomized-consensus-survey.pdf), Distributed Computing 2003.
>
> 📑Hagit Attiya and Keren Censor. [_Lower bounds for randomized consensus under a weak adversary_](https://dspace.mit.edu/openaccess-disseminate/1721.1/64943), PODC 2008.

[Attiya and Censor 2008] The probability that a randomized consensus algorithm does not terminate after $k(n-t)$ **steps** is at least $1/c^k$ for some constant $c$, even for a weak adversary.


## Other Models and Assumptions

### Fail-Stop Failure

> 📑Marcos K. Arguilera and Sam Toueg. [The correctness proof of Ben-Or’s randomized consensus algorithm](https://link.springer.com/article/10.1007/s00446-012-0162-z), Distributed Computing 2012.

Gives the proof to Ben-Or's consensus protocol when $t < n/2$ assuming Fail-Stop type failure.