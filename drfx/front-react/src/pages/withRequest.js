import React, { Component } from 'react';

const withRequest = (url) => (WrappedComponent) => {
  return class extends Component {

    state = {
      data: null
    }

    async initialize() {
      try{
        await fetch(url)
        .then(
          res => res.json()
        )
        .then(json => {
          this.setState({
            data: json
          })
        })
      } catch (e) {
        console.log(e)
      }
    }

    componentDidMount(){
      this.initialize();
    }
    render() {
      const {data} = this.state;
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }
}

export default withRequest;