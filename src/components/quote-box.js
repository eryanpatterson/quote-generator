import React from 'react';

const quotes = [
    {
      quote: "Never, no, never did Nature say one thing and Wisdom say another.",
      author: "Edmund Burke"
    },
    {
      quote: "It is only shallow people who do not judge by appearances. The mystery of the world is the visible, not the invisible.",
      author: "Oscar Wilde"
    },
    {
      quote: "A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines. With consistency a great soul has simply nothing to do.",
      author: "Ralph Waldo Emerson"
    },
    {
      quote: "All paradises, all utopias are designed by who is not there, by the people who are not allowed in.",
      author: "Toni Morrison"
    },
    {
      quote: "The cry of the poor is not always just, but if you don't listen to it, you will never know what justice is.",
      author: "Howard Zinn"
    },
    {
      quote: "Humanity is won by continuing to play in the face of certain defeat.",
      author: "Ralph Ellison"
    },
    {
      quote: "All creatures are merely veils under which God hides Himself and deals with us.",
      author: "Martin Luther"
    },
    {
      quote: "Boredom is just the reverse side of fascination: both depend on being outside rather than inside a situation, and one leads to the other.",
      author: "Susan Sontag"
    },
    {
      quote: "All happy families resemble each other, each unhappy family is unhappy in its own way.",
      author: "Leo Tolstoy"
    },
    {
      quote: "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
      author: "Barack Obama"
    },
    {
      quote: "Science investigates; religion interprets. Science gives man knowledge which is power; religion gives man wisdom which is control. Science deals mainly with facts; religion deals mainly with values. The two are not rivals. They are complementary.",
      author: "Martin Luther King Jr."
    },
    {
      quote: "A bird doesn't sing because it has an answer, it sings because it has a song.",
      author: "Maya Angelou"
    },
    {
      quote: "It is not titles that honor men, but men that honor titles",
      author: "Niccolo Machiavelli"
    },
    {
      quote: "Admiration: Our polite recognition of another's resemblance to ourselves.",
      author: "Grenville Kleiser"
    },
    {
      quote: "No man, for any considerable period, can wear one face to himself and another to the multitude, without finally getting bewildered as to which may be the true.",
      author: "Nathaniel Hawthorne"
    },
    {
      quote: "A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.",
      author: "Bob Dylan"
    }
  ];

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
      quote: '',
      author: '',
      iterator: 1
    }
    
    this.newQuote=this.newQuote.bind(this);
    this.handleEnter=this.handleEnter.bind(this);
    this.shuffle=this.shuffle.bind(this);
  }
  
  componentDidMount() {
    this.shuffle(quotes);
    this.setState((state) => ({
      quote: quotes[0].quote,
      author: quotes[0].author
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
    //const randomizer = Math.floor(Math.random() * 13);
  
    this.setState((state) => ({
      quote: quotes[this.state.iterator].quote,
      author: quotes[this.state.iterator].author,
      iterator: state.iterator + 1
    }));
    
    if (this.state.iterator == quotes.length - 1) {
      this.shuffle(quotes);
      this.setState((state) => ({
        iterator: 0
      }));
    }
    
    if (quotes[this.state.iterator].quote === this.state.quote) {
      this.newQuote();
    }
  }
  
  handleEnter(e) {
    if (e.charcode == 13) {
      this.newQuote();
    }
  }
  
  render() {
    const twitter = "https://twitter.com/intent/tweet";
    return (
      <div className="wrapper" id="quote-box">
        <Text quote={this.state.quote}/>
        <Author auth={this.state.author} />
        <button class="btn btn-primary" id="new-quote" onClick={this.newQuote} onKeyPress = {this.handleEnter}>
          New Quote
        </button>
      
        <a class="twitter-share-button" id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">Tweet this!</a>
      </div>
      
    )
  }
}
  export default QuoteBox;