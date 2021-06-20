import React from 'react';
import Layout from "../components/Layout";

import Match from "../components/Match"

export default class Posts extends React.Component {
  constructor(){
    super()
    this.state = {
      loading:false,
      character: {},
    }
  }

  componentDidMount(){
    this.setState({
      loading: true
    })
    // fetch("https://swapi.dev/api/people/1")
    fetch("http://localhost:3000/v1/matches")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          character: data.data,
          loading: false
        })
      }
    )
  }

  render() {
    const displayText = this.state.loading ? "now loading...." : JSON.stringify(this.state.character)
    return (
      <Layout>
        <div>Posts Page!</div>
        <div>{displayText}</div>
        <Match />
      </Layout>
    );
  }
}