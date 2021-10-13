import React from 'react';

const API_KEY = process.env.API_KEY;

const Text = (props) => {
     
      return <div id="text">
        <p>{props.quote}</p>
      </div>
    
}

const Author = (props) => {
    return <div id="author">-- {props.auth}</div>
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quotes: '',
      quote: '',
      author: '',
      iterator: 1
    }
    
    this.newQuote=this.newQuote.bind(this);
    this.handleEnter=this.handleEnter.bind(this);
    this.shuffle=this.shuffle.bind(this);
  }

  async componentDidMount() {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/12ftN_g4eoRJ_H_nIZ__tlCMiyGreDfFgbc7480gVqrA/values/Sheet1!A2:B17?key=${API_KEY}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({
            quotes: data.values
          });
        });
    
    console.log(this.state.quotes)
    this.shuffle(this.state.quotes);
    this.setState((state) => ({
      quote: this.state.quotes[0][0],
      author: this.state.quotes[0][1]
    }));
  }
  
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let holder = array[i];
      array[i] = array[j];
      array[j] = holder;
    }
  }
 
  newQuote() {
    console.log(this.state.quotes);  
    this.setState((state) => ({
      quote: this.state.quotes[this.state.iterator][0],
      author: this.state.quotes[this.state.iterator][1],
      iterator: state.iterator + 1
    }));
    
    if (this.state.iterator === this.state.quotes.length - 1) {
      this.shuffle(this.state.quotes);
      this.setState((state) => ({
        iterator: 0
      }));
    }
    
    if (this.state.quotes[this.state.iterator][0] === this.state.quote) {
      this.newQuote();
    }
  }
  
  handleEnter(e) {
    if (e.charcode === 13) {
      this.newQuote();
    }
  }
  
  render() {
    return (
      <div className="wrapper" id="quote-box">
        <Text quote={this.state.quote}/>
        <Author auth={this.state.author} />
        <button className="btn btn-primary" id="new-quote" onClick={this.newQuote} onKeyPress = {this.handleEnter}>
          New Quote
        </button>
      
        <a className="twitter-share-button" id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">Tweet this!</a>
      </div>
      
    )
  }
}
  export default QuoteBox;