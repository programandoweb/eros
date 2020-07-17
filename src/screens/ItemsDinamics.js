import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state   =  {
      items:{},
      input:""
    };
  }

  componentDidMount() {
    this.sincronizarConProps()
  }

  sincronizarConProps=()=>{
    this.setState({items:this.props.itemsDefault})
  }

  setBtn=(item)=>{
    let setItems  = {}
    Object.entries(this.state.items).map((v,k)=>{
      if (item[0]===v[0]) {
        setItems[v[0]]  = (item[1])?false:true;
      }else {
        setItems[v[0]]  = v[1];
      }
    })
    this.setState({items:setItems})
    this.setItemsExterno(setItems)
  }

  onChange=(e)=>{
    this.setState({input:e.target.value})
  }

  handleAddItem=()=>{
    let setItems                    = this.state.items;
        setItems[this.state.input]  = true;
        this.setState({items:setItems,input:""})
        this.setItemsExterno(setItems)
  }

  setItemsExterno=(setItems)=>{
    let _inputs =   this.props.inputs;
    _inputs[this.props.name]  = setItems;
    this.props.setInputs(_inputs)
  }

  render() {
    return (<>
                {(this.props.boolTitle===undefined || this.props.boolTitle===true)?<div className="row justify-content-md-center mt-0">
                  <div className="col-12 col-sm-4">
                    <div className="App-Question--x2 text-left">¿Tienes cirugías estéticas?</div>
                  </div>
                </div>:''}
                <div className="row justify-content-md-center mt-0">
                  <div className="col-12 col-sm-4">
                    <div className="input-group mb-3">
                      {Object.entries(this.state.items).map((_v,k)=>{
                        let v = _v[0]
                        return  <div  key={k}
                                      className={(_v[1])?"btn btn-primary mr-1 mt-1":"btn btn-secondary mr-1 mt-1"}
                                      onClick={()=>this.setBtn(_v)}
                                >
                                  {v}
                                </div>
                      })}
                    </div>
                  </div>
                </div>
                {(this.props.boolNew===undefined || this.props.boolNew===true)?<div className="row justify-content-center mt-0">
                  <div className="col-12 col-sm-4 text-center">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend" onClick={this.handleAddItem}>
                        <span className="input-group-text">
                          <i className="fas fa-plus"></i>
                        </span>
                      </div>
                      <input  onChange={this.onChange}
                              type="text"
                              name="edad"
                              className="form-control"
                              placeholder={this.props.title}
                              value={this.state.input}
                      />
                    </div>
                  </div>
                </div>:''}

            </>)
  }
}

export default App;
