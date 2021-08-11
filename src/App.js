import './main.css';
import QuoteBox from './components/quote-box';

function App() {
  return (
    <div>
      <div className="row spacer"></div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <QuoteBox />
        </div>
      </div>
    </div>
  );
}

export default App;
