import React from 'react';
import plainTextCountries from "../assets/json/Countries";
import Cities from "../assets/json/countries.json";
import '../App.css';

const countries=plainTextCountries

export default class AutoCompletedText extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            suggestionsCities:[],
            text:'',
            textCity:'',
            cities:"",
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
            this.props.setInputs(p);
    }

    onTextChangeCities = (e) => {
        const value = e.target.value;
        let suggestionsCities = [];
        let itemsCities = this.state.cities;
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestionsCities = itemsCities.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestionsCities,
            textCity: value
        }))

        let p = this.props.inputs
            p.city = value;
            this.props.setInputs(p);
    }

    selectedText(value) {
        this.objectToPlain(Cities[value])
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
        let p = this.props.inputs
            p.country = value;
            this.props.setInputs(p);
    }

    selectedTextCities(value) {
        this.setState(() => ({
            textCity: value,
            suggestionsCities: [],
        }))
        let p = this.props.inputs
            p.city = value;
            this.props.setInputs(p);
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

    renderSuggestionsCities = () => {
        let { suggestionsCities } = this.state;
        if(suggestionsCities.length === 0){
            return null;
        }
        return (
            <ul className="app-autocomplete-pgrw position-absolute">
                {
                    suggestionsCities.map((item, index) => (<li key={index} onClick={() => this.selectedTextCities(item)}>{item}</li>))
                }
            </ul>
        );
    }

    componentDidMount() {
      setTimeout(() => {
        this.objectToPlain(Cities[this.props.inputs.country])
        this.setState({text:this.props.inputs.country,textCity:this.props.inputs.city})

      }, 800);
    }

    render() {
        //const { text, textCity, suggestions } = this.state;
        return(
          <div className="col-12 col-sm-4 text-center">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-globe-americas"></i>
                </span>
              </div>
              <div className="p-0 m-0 position-relative">
                  <input  autoComplete="off"
                          name="country"
                          className="form-control"
                          placeholder="País"
                          id="query"
                          type="text"
                          onChange={this.onTextChange}
                          value={this.state.text}/>
                  {this.renderSuggestions()}
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-building"></i>
                </span>
              </div>
              <div className="p-0 m-0 position-relative">
                  <input autoComplete="off" name="city" className="form-control" placeholder="Ciudad" id="query2" type="text" onChange={this.onTextChangeCities} value={this.state.textCity}/>
                  {this.renderSuggestionsCities()}
              </div>
            </div>
          </div>
        );
    }

}
