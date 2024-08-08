import React from 'react';
import Image from "next/image";
import { remark } from 'remark';
import html from 'remark-html';
import education from '../data/education.yaml';
import publications from '../data/publications.yaml';
import author_urls from '../data/authors.js';
import teachings from '../data/teaching.yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';  // Import KaTeX CSS for styling

// Custom component to replace <p> tags
const Fragment = ({ children }) => (<React.Fragment>{children}</React.Fragment>);
const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      p: Fragment,
      div: Fragment,
    },
  });

  const cleanReactTree = (element) => {
    if (React.isValidElement(element)) {
      if (element.type === 'div' || element.type === 'p') {
        return <>{React.Children.map(element.props.children, cleanReactTree)}</>;
      }
      return React.cloneElement(element, {}, React.Children.map(element.props.children, cleanReactTree));
    }
    return element;
  };
  
  const renderMixedContent = (content) => {
    const processedContent = processor.processSync(content).result;
    const result = cleanReactTree(processedContent);
    // console.log(result);
    return result;
  };

const photo_v4 = "https://lh3.googleusercontent.com/pw/AP1GczONaGyM1UjmoKfpT7MnHwpHKiZuocdJlV88KykqYujEiFkyyuCJHHE8Pw2tiz8-fEb2JFtcFYSuwx68r4hIhJxIqX-gzcb0wRLmcwrkriRd0ErrCdvdjNvzPzQomnFzAaQ0zveqjWWupGbDkEFRzn-RYQ=w1308-h1744-s-no-gm"

export default async function Home() {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html)
  .process(`I am currently an assitant professor in [CSIE, National Taiwan University](https://www.csie.ntu.edu.tw/).
Previously, I was a Postdoc in [Boston College](https://www.bc.edu/content/bc-web/schools/mcas/departments/computer-science.html) advised by [Hsin-Hao Su](https://sites.google.com/site/distributedhsinhao/).
I had the honor of being advised by [Seth Pettie](http://web.eecs.umich.edu/~pettie/) while pursuing my Ph.D. at the [University of Michigan](https://cse.umich.edu).
I am interested in any cool analysis techniques of an algorithm, as well as any cool stuff related to graphs.
I also love [competitive programming](https://cphof.org/profile/topcoder:tmt514).

**Research Interest [[CV]](https://drive.google.com/file/d/1cl1hOs15vXQZPaM1pCCZwpUdfk9158Jm/view)**:
Dynamic Graph Data Structures and Algorithms.
Asynchronous Distributed Algorithms.
Distributed Graph Algorithms.
Algorithms in Word RAM Model.
Lower bound graphs for sparse distance preservers.`);
  const introHtml = processedContent.toString();

  // Education
  const educationJsx = education.map((row, index) => (<div key={index} className="w-full">
    {row.degree}, {row.department}, {row.name}, {row.place}
    <span className="float-right">{row.year}</span>
  </div>))

  // Conference Papers
  const make_author_list = (arr) => {
    // var authors = arr.map(({ given, family, literal }) => [given, family, literal].filter(Boolean).join(' '))
    var authors = arr.map((name, idx) => {
      if (name in author_urls) {
        return (<a key={idx} href={author_urls[name]}>{name}</a>);
      } else {
        return name;
      }
    });
    if (authors.length <= 1) {
      return (authors[0])
    } else if (authors.length === 2) {
      return (<>{authors[0]} and {authors[1]}</>);
    } else {
      const n = authors.length;
      authors = authors.reduce((acc, current, index) => {
        acc.push(current);
        if (index === n - 2) {
          acc.push(", and ");
        } else if (index < n - 2) {
          acc.push(", ");
        }
        return acc;
      }, []);
      // authors = authors.slice(0, -1).join(", ") + ', and ' + authors.slice(-1)
    }
    return (authors)
  }
  
  const makepub = (pub, idx) => (<div key={idx} className="w-full publication-entry mb-3">
    <div className="papertitle"><b>{pub.url? (<a href={pub.url}>{renderMixedContent(pub.title)}</a>) : (<span>{renderMixedContent(pub.title)}</span>)}</b>{
        pub.arxiv && (<span> [<a href={pub.arxiv}>arXiv</a>]</span>)
    }</div>
    <div className="author text-gray-600">{make_author_list(pub.author)}</div>
    <div className="booktitle text-gray-600">{pub.booktitle}, {pub.year}</div>
  </div>);
  const conferenceJsx = publications.filter((val) => val.conference === true).map(makepub)

  // Journal Papers
  const journalJsx = publications.filter((val) => val.journal === true).map(makepub)

  // Teaching
  const teachingJsx = teachings.map((data, idx) => (<div key={idx}>
    {data.course_name} <span className="float-right">{data.year}</span>
  </div>))


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 lg:w-256 mx-auto">

      <div className="flex flex-row ">
      <div>
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Shang-En Huang</h1>
        <p><Image className="dark:invert" src="/email.png" alt="my email" width={388*3/4} height={30} priority/></p>
        <div dangerouslySetInnerHTML={{__html: introHtml}} />
      </div>
      <div className="pl-4 py-8"><Image src={photo_v4} width={640*1.5} height={853} alt="Shang-En Huang"  className="rounded-lg" /></div>
      </div>
      <div className="w-full">
        <h2 className="mb-4 text-left text-2xl md:text-3xl lg:text-4xl dark:text-white">Education</h2>
        {educationJsx}
      </div>
      <div className="w-full">
        <h2 className="my-4 text-2xl  md:text-3xl lg:text-4xl dark:text-white">Conference Papers</h2>
        {conferenceJsx}
      </div>
      <div className="w-full">
        <h2 className="my-4 text-2xl  md:text-3xl lg:text-4xl dark:text-white">Journal Papers</h2>
        {journalJsx}
      </div>
      <div className="w-full">
        <h2 className="my-4 text-2xl  md:text-3xl lg:text-4xl dark:text-white">Teaching</h2>
        {teachingJsx}
      </div>
      <div className="p-8"> </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-16 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span
            className="pointer-events-none flex place-items-center gap-2 p-2 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            This site is built using <a href="https://nextjs.org/"><Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180*12/37}
          height={12}
          priority
        /></a>
          </span>
        </div>
      </div>
    </main>
  );
}
