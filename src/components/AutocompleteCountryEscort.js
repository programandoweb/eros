import React from 'react';
import plainTextCountries from "../assets/json/Nacionality";
import '../App.css';
import store from "../helpers/store";

const countries=plainTextCountries
//let p = store.get("escort")

export default class AutoCompletedText extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            text:'',
            textCity:'',
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = countries.sort().filter(v => regex.test(v))
        }
        this.setState(() => ({
            suggestions,
            text: value
        }))

        let p = this.props.inputs
            p.country = value;
            //this.props.setInputs(p);
    }

    selectedText(value) {
      let p = store.get("escort")
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))

      let __inputs              =   this.props.inputs
          __inputs.nationality  =   value;
          this.props.setInputs(__inputs);
          p.nationality = value;
          store.set("escort",p)
    }

    objectToPlain(object){
      this.setState({cities:object})
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul className="app-autocomplete-pgrw position-absolute">
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }

    componentDidMount() {
      setTimeout(() => {
        let p = store.get("escort")
        this.setState({text:p.nationality})
      }, 800);
    }

    render() {
        //console.log(this.state);
        //const { text, textCity, suggestions } = this.state;
        return(
          <div className="col-12 col-sm-4 text-center">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-address-card"></i>
                </span>
              </div>
              <div className="p-0 m-0 position-relative">
                  <input  autoComplete="off"
                          name="nationality"
                          className="form-control"
                          placeholder="Nacionalidad"
                          id="query"
                          type="text"
                          onChange={this.onTextChange}
                          value={this.state.text}/>
                  {this.renderSuggestions()}
              </div>
            </div>
          </div>
        );
    }

}
