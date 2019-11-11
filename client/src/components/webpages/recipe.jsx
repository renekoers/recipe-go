import React, { Component } from 'react';
class  extends Component {
    constructor(props) {
        super(props);
        this.state = { recipe = {} }
    }

    componentDidMount(){
        fetch('api/recipes/retrieve/byid', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
    }
    render() { 
        return (  );
    }
}
 
export default ;