import React from 'react';
import store from "../helpers/store";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state      =  {
                          check_number_account_bank:false,
                          number_account_bank:"",
                        };
  }

  componentDidMount() {
    this.setState(this.props);
    this.setState(store.get("motel"));
    this.setState({check_number_account_bank:(store.get("motel")[this.props.name]!==undefined && store.get("motel")[this.props.name]!=="")?true:false});
  }

  componentWillUnmount() {
    this.setState({});
  }

  handleChange=(e)=>{
    this.setState({check_number_account_bank: this.state.check_number_account_bank?false:true  })
  }

  KeyUp=(e)=>{
    this.setState({[e.target.name]:e.target.value})
    let get                 =   store.get(this.props.store)
        get[e.target.name]  =   e.target.value;
        //console.log(this.props.store,get);
        store.set(this.props.store,get);
        this.props.setState(e)
  }

  InputAccount=()=>{
    return <div className="row justify-content-center">
              <div className="col-12 col-sm-12 text-left mt-3">
                <div className="input-group mb-3">
                  <div className="col-12 label label-group" >{this.props.htmlLabel}</div>
                  <input  autoComplete="off"
                          defaultValue={this.state[this.props.name]}
                          onChange={this.KeyUp}
                          type="text"
                          name={this.props.name}
                          className="form-control"
                          placeholder={this.props.placeholder}
                          />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-chevron-right"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
  }

  render(){
    return  <div>
              <div className="row">
                {(this.props.icon!==undefined)?<div className="col-3"><img className="img-fluid rounded" src={this.props.icon}/></div>:''}
                <div className="col pl-0">
                  <div className="App-Question--x2 text-left pt-3 ">{this.props.label}</div>
                </div>
                <div className="col-2 pt-4 ">
                  <div className="custom-control custom-checkbox">
                    <input onChange={this.handleChange} type="checkbox" className="custom-control-input box-1x1" id={"defaultChecked"+this.props.label} />
                    <label className="custom-control-label" htmlFor={"defaultChecked"+this.props.label}></label>
                  </div>
                </div>
              </div>
              {(this.state.check_number_account_bank)?this.InputAccount():''}
            </div>
  }

}

export default App;
