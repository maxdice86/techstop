// import Quotes from "../components/Quotes/Quotes";
// import Search from "../components/Search/Search";
import Calendar from "./components/Calendar/Calendar";
// import FillingsAndTranscripts from "../components/FillingsAndTranscripts/FillingsAndTranscripts";
// import NewsAndEvents from "../components/NewsAndEvents/NewsAndEvents";

export default function AppCal() {
  return (
    <div className="App">
      <div className="search-container">
        {/* <Search /> */}
      </div>
      <div className="columns-container">
        <div className="left-column">
        <Calendar />
          {/* <Quotes /> */}
          {/* <FillingsAndTranscripts /> */}
        </div>
        <div className="right-column">
          <Calendar />
          {/* <NewsAndEvents /> */}
        </div>
      </div>
    </div>
  );
}