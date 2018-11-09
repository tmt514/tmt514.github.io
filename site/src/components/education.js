import React, { Component } from 'react'


class Education extends Component {
    
    render() {
        const schoolList = this.props.schoolList.edges
        const schools = schoolList.map((e) => e.node).map((school, idx) => (
        <div className="level" style={{marginBottom: '5px'}} key={idx}>
            <p className="level-left">
            {school.degree}, {school.department}, {school.name}, {school.place}
            </p>
            <span className="level-right">
            {school.year}
            </span>
        </div>))

        console.log(this.props);
        return (
            <section className="section">
            <h2 className="title is-size-4">Education</h2>
            {schools}
            </section>
        )
    }
}

export default Education
