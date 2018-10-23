import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Education from '../components/education'
import Publication from '../components/publication'

const IndexPage = ({ data }) => (
  <Layout>
    
    <section className="section">
      <div className="level">
        <div className="level-left">
          <div>
          <h1 className="title is-size-2">Shang-En Huang</h1>
          <div className="subtitle">
          📨 <img style={{marginTop: '0.5em'}} src="http://safemail.justlikeed.net/e/47a651e785a0fafe09f9eeb72fba2310.png" border="0" align="center" title="Email image created with safemail.justlikeed.net" />
          </div>
          <p>{data.allIntroYaml.edges[0].node.intro}</p>
          </div>
        </div>
        <div className="level-right">
          <img src="https://lh3.googleusercontent.com/BLveovoIbvIWqDbrP9oP8z8xZzOB4tkr5rQxMhH44xz-kLQPXJhVIZiQgZKSSHn7ezcG6PQ_-iImZ6XDTkIna_TkFgcYL5mg75H53IngoPpDShzkbUcP-ol1NSOIOqzOZH7gbW4lvThiXTZYyjNK_3aWQi5X44yFexISzBp3TL9RTY0GxHLIzUuJMLtgBItiGfwCB7dFx6RB6jhNkWiiWgLsAjkFIp3EgUhVE4jbojHlyB7-QAs4LgHdfckbqWsYMDLYx6m0c9MfBYtfbAOvSlauebE1ebVahOsJfdqHtLAS6WIEIhZ5VKA6F0Wi0kbCS6amXlIsXRVwkCLC5pKQ4ifRpvbm2fNe24_mJCGv7MXgNj_AM4O2ZsCPTdYOJ-58KTrQ1JKCMh9r8_Im0UoCTKm519YfvlrA15YsaQonHxv-SJYCXs6Zh5_adcpjb6neV8E9bLKNFH9Fueg4M-PqebhLtoMm6_kUKycOF0DcyDBuMWeXodO42ftw8-mM6eQO0eQtLDgiyVmVLGdIxVZDYJzZnxJkb6H2qkpYqCklNRZsapJ6-tIc5lEIaeuSZxFd5N6SN-gGYINOtbhQ0U09JnlvAaukVqN8cOH5OH5jUYpDb77bMRslQQ-oD6thmVo6oUutpWTC_ptN_ockz1Ljq_kisqQKk9FZCVkJhfEOvIpuiTiWBJeSmzEa0A=w583-h438-no"
            style={{
              maxWidth: '300px'
            }}
            />
        </div>
      </div>
    <Education schoolList={data.allEducationYaml} />
    <Publication contents={data.publications.contents} />
    
    </section>
  </Layout>
)

/*<Publication schoolList={data.allEducationYaml} />*/
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