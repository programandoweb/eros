import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state      =  {};
  }

  handlerSelect=(value)=>{
    let oldValue                          = this.state.inputs;
    oldValue[this.props.name].selection   = value;
    this.setState(oldValue)
    this.props.setImputs(oldValue)
  }

  componentDidMount() {
    this.setState(this.props);
  }

  componentWillUnmount() {
    this.setState({});
  }

  render(){
    return  <div className="input-group mb-3">
              {(this.state.inputs!==undefined && this.state.inputs[this.props.name].items!==undefined)?this.state.inputs[this.props.name].items.map((v,k)=>{
                return <div className="col-12 mb-1" key={k}>
                          <div className="row cursor tamano-texto-interno">
                            <div  className={(this.state.inputs[this.props.name].selection===v)?"col-10 text-success":"col-10"} onClick={()=>this.handlerSelect(v)}>{v}</div>
                            <div className="col-1 text-left">
                              <i className={(this.state.inputs[this.props.name].selection===v)?"fas fa-check text-success":"fas fa-check text-success d-none"}></i>
                            </div>
                          </div>
                        </div>
              }):<div></div>}


            </div>
  }

}

export default App;
