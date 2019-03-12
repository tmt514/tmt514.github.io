---
category: "research"
path: "/research-notes/byzantine-agreement-problem"
date: "2019-03-11"
title: "Byzantine Agreement Problems"
css_title_theme: "is-info research"
css_content_theme: "research"
backlink: "/research-notes"
---


> 📑Valerie King, Jared Saia. [_Byzantine Agreement in Expected Polynomial Time_](https://dl.acm.org/citation.cfm?id=2837019), JACM 2016.
>
> 📑Valerie King, Jared Saia. [_Correction to Byzantine Agreement in Expected Polynomial Time, JACM 2016_](https://arxiv.org/abs/1812.10169), ArXiv 2018.

## Bracha's Reliable Broadcast

1. Send $(initial, m)$ to all processors.
2. Upon receiving $(initial, m)$, send $(echo, m)$ to all processors.