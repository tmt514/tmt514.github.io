import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Education from '../components/education'
import Publication from '../components/publication'

import {remark} from 'remark'
import reactRenderer from 'remark-react'
import emailImage from '../images/email.png'

const markdown = remark()
  .use(reactRenderer,
    {
      createElement: React.createElement,
      remarkReactComponents: {
      },
    })


const Teaching = ({ contents }) => {
  const teachingList = contents.edges;
  var tlist = [];
  
  const teaching = teachingList.map((e) => e.node).map((e, idx) => {
    tlist.push((<div key={idx + "0"} className="column is-four-fifths">
      {markdown.processSync(e.content).result}
    </div>))
    tlist.push((<div key={idx + "1"} className="column">
      <span className="is-pulled-right">{e.year}</span>
    </div>))
  })
  console.log(tlist)
  return (
    <section className="section">
      <h2 className="title is-size-4">Teaching Experiences</h2>
      <div className="columns is-multiline is-gapless">
        {tlist}
      </div>
    </section>
  )
}

const photo_v0 = "https://lh3.googleusercontent.com/BLveovoIbvIWqDbrP9oP8z8xZzOB4tkr5rQxMhH44xz-kLQPXJhVIZiQgZKSSHn7ezcG6PQ_-iImZ6XDTkIna_TkFgcYL5mg75H53IngoPpDShzkbUcP-ol1NSOIOqzOZH7gbW4lvThiXTZYyjNK_3aWQi5X44yFexISzBp3TL9RTY0GxHLIzUuJMLtgBItiGfwCB7dFx6RB6jhNkWiiWgLsAjkFIp3EgUhVE4jbojHlyB7-QAs4LgHdfckbqWsYMDLYx6m0c9MfBYtfbAOvSlauebE1ebVahOsJfdqHtLAS6WIEIhZ5VKA6F0Wi0kbCS6amXlIsXRVwkCLC5pKQ4ifRpvbm2fNe24_mJCGv7MXgNj_AM4O2ZsCPTdYOJ-58KTrQ1JKCMh9r8_Im0UoCTKm519YfvlrA15YsaQonHxv-SJYCXs6Zh5_adcpjb6neV8E9bLKNFH9Fueg4M-PqebhLtoMm6_kUKycOF0DcyDBuMWeXodO42ftw8-mM6eQO0eQtLDgiyVmVLGdIxVZDYJzZnxJkb6H2qkpYqCklNRZsapJ6-tIc5lEIaeuSZxFd5N6SN-gGYINOtbhQ0U09JnlvAaukVqN8cOH5OH5jUYpDb77bMRslQQ-oD6thmVo6oUutpWTC_ptN_ockz1Ljq_kisqQKk9FZCVkJhfEOvIpuiTiWBJeSmzEa0A=w583-h438-no"
const photo_v1 = "https://lh3.googleusercontent.com/kXQvYPIhkltzDtMI7-Ke3bnuIg0hlBjso9joptGlPPX5z1z6B8nkIRwdHXMNx3np9cCUTnbuiBjsxxkF_zb76x6SYGXKzm4aim7RVzuwpi5U-wV1QPsKop8WWMHuS9-Anw0D0T8Ee1yvXzUZXFhp6V0q1dp0Jj3SvLke-zH8G7GL3-AHcq3-TmKumNa5bc-O4ksYxjkBEYGqTyLvtCgjf-Vtx21ogf9knLfh32T25n7bGI-n_eZ555neNHfqlZ_iUZdPN0ZDarpWy3Xq0EsAZX8UGbBEdvX4olsv1ZP8uXp4rDHLoYjwxAeUvw7WkzIRCORX4PqZY-fW_91AYZT6qQ9mzQqwHI8kOkU86q1UuPlo_OiodizwPV62Dvrj9L3O03BKUkXsQlLr8VChm2fjVko6L5AawXnbm49NGvNdGQZ8piHcJ61zUTAa7xxFuac61boKKuG2RjtXYZPtgFiGC8vUI5zMQQ5B81e9_GTJchg8HPb42UOGygYi-rFIy33j_H2_DFWS-0v8ni8MZGfSa092rB7BUeWQikHCPfK-xL_hvMRhJ0MebKKISGarINNVL3O4tpu9zCjTWgWRndIZBYHCDjFKvKjvWH781ka5uEh9cwt0Ns-t9z4df_5LXTcyjNuWw27DBjHiY7rppzwWm6Fl13EGAggIzz3t-EFN_LmhaUcTOmQFRJB2oOrG3n8Z2ycUqRXyfUZsJPGG7rILwCzSQQ=w1308-h981-no"
const photo_v2 = "https://lh3.googleusercontent.com/up25i4q66Sa-o4BFywUusNEZFd_tHLk6XNMB4Xa8gzZrOuwt0OxGLO_Sxfc8RRUEPCvi0r37nVjSULMlT2Vvr7DQwU9CcALQNSCQJryT-RhF7kfelFSDTgvUWhE7p4OHUzWsRiC7ai9_SGHrAErDBpEMdrwl0PPUMAwctdtWKECXHc3mN17nRa_kE_0INFIRT5vRECjZ4GSrd8JadAtWB-jARkXe78FNODCl7KKYVSvBA4aAeDsT4-qMkBRp9QwvpCb-lERjk8WqYemCDhsb-xYK7mXUHN_mPFkMVN9CaNXewkUCmcHu1Nu-EYqaeeLr-vM3ZwrIQ7hOSvjNjyJw4zcR7iIuFdQOtkJb4m_kGU316R_lvi2q2fKXBsmcO2eEARHjVQF1Z7wf0Bk_iEBof7PuKQ8B6lXQtytubnpS5vMzJkeq-oCSPr0ww2lg6K2iBV-SBWlEOGo2lHdEaRX425OCgh4k7PARxO_mms3SKuMThYrIun0bzAlZYYhwjGGv4AaugvA3yAlOlMNqPW7EJX3zejpG8mv1nkBH5qF99noB7SDLJbpGcJyjWBfqF3RsZQe5hPa2AtihUKjMx7q-80bBrKb7tYhV7p81LsuVjFb0XKu3eEW3OvmYBLXbx5FEWNvS8s5oMKUnW3marZUj2i9G4byj9FzMInD6ij8B2iCkUHDkJVvwb5P13BeF7QENG1QuP5F7QhCyhGSqGeUp_e3-ORpUaYzIk_Oh7mS0EqsXgojz_Kd8YsgGLpDluoqooPyod2cXrz5jIyaZS5a0U8AbKEKmIQHRZHpU-EWfUIig1Auu131v-g=w600-h800-no"
const photo_v3 = "https://lh3.googleusercontent.com/pw/AJFCJaXvpX5cO12x1YuR8rY6zFH_9xpOx7IMZPAHrVzImId9SCTichhPuz7Tbq6I_syIfcXJu-FH9YYO6cD5cHxzxpKMRwYowYjl5yKsN7AVLfdQHLhkd24k0OWRYXy5g_tRYg1lKZ04jH4dHCs2XDSDRNX4dA=w1500-h2000-s-no"
const photo_v4 = "https://lh3.googleusercontent.com/pw/AP1GczONaGyM1UjmoKfpT7MnHwpHKiZuocdJlV88KykqYujEiFkyyuCJHHE8Pw2tiz8-fEb2JFtcFYSuwx68r4hIhJxIqX-gzcb0wRLmcwrkriRd0ErrCdvdjNvzPzQomnFzAaQ0zveqjWWupGbDkEFRzn-RYQ=w1308-h1744-s-no-gm"

class IndexPage extends Component {
  

  render() {
    const data = this.props.data;
    return (
      <Layout>

        <section className="section">
          <div className="content">
            <div className="media">
              <div className="media-content">
                <div className="content">
                  <h1 className="title is-size-3">Shang-En Huang</h1>
                  <div className="subtitle">
                  📨 <img style={{ marginTop: '0.5em' }} src={emailImage} border="0" align="center" title="Email image created with www.generateit.net/email-to-image/" />
                  </div>
                  <div className="content">{
                    markdown.processSync(
                      data.allIntroYaml.edges[0].node.intro
                    ).result
                  }</div>
                </div>
              </div>
              <div className="media-right">
                <img src={photo_v4}
                  referrerPolicy="no-referrer"
                  style={{
                    maxWidth: '200px',
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>
          <Education schoolList={data.allEducationYaml} />
          <Publication contents={data.allPublicationsYaml} />
          <Teaching contents={data.allExperiencesYaml} />

        </section>
        <footer>Last update: Aug 2024</footer>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
    query ResumeQuery {
      allPublicationsYaml {
        edges {
          node {
            title
            author
            booktitle
            year
            url
            arxiv
            journal
            conference
          }
        }
      }
      allIntroYaml {
        edges {
          node {
            intro
          }
        }
      }
      allExperiencesYaml {
        edges {
          node {
            content
            year
          }
        }
      }
      allEducationYaml {
          edges {
            node {
              degree
              name
              year        
              department
              place
            }
          }
      }
  }
`