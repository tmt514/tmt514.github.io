import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Education from '../components/education'
import Publication from '../components/publication'

import remark from 'remark'
import reactRenderer from 'remark-react'

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
      {markdown.processSync(e.content).contents}
    </div>))
    tlist.push((<div key={idx + "1"} className="column">
      <span className="is-pulled-right">{e.year}</span>
    </div>))
  })
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

class IndexPage extends Component {
  

  render() {
    const data = this.props.data;
    console.log(data)
    return (
      <Layout>

        <section className="section">
          <div className="content">
            <div className="media">
              <div className="media-content">
                <div className="content">
                  <h1 className="title is-size-3">Shang-En Huang</h1>
                  <div className="subtitle">
                    📨 <img style={{ marginTop: '0.5em' }} src="http://safemail.justlikeed.net/e/47a651e785a0fafe09f9eeb72fba2310.png" border="0" align="center" title="Email image created with safemail.justlikeed.net" />
                  </div>
                  <div className="content">{
                    markdown.processSync(
                      data.allIntroYaml.edges[0].node.intro
                    ).contents
                  }</div>
                </div>
              </div>
              <div className="media-right">
                <img src={photo_v1}
                  style={{
                    maxWidth: '300px',
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>
          <Education schoolList={data.allEducationYaml} />
          <Publication contents={data.publications.contents} />
          <Teaching contents={data.allExperiencesYaml} />

        </section>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
    query ResumeQuery {
      publications {
        contents
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