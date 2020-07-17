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
            text: ''
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            //console.log(countries);
            suggestions = countries.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul class="app-autocomplete-pgrw position-absolute">
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }

    render() {
        const { text, suggestions } = this.state;
        return(
            <div className="p-0 m-0 position-relative">
                <input name="country" className="form-control" placeholder="País" id="query" type="text" onChange={this.onTextChange} value={text}/>
                {this.renderSuggestions()}
            </div>
        );
    }

}
