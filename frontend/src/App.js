import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Heading from "./components/heading/Heading";
import About from "./routes/About";
import Awards from "./routes/Awards";
import ClubInner from "./routes/ClubInner";
import Clubs from "./routes/Clubs";
import ClubSTwo from "./routes/ClubSTwo";
import Contact from "./routes/Contact";
import Fixtures from "./routes/Fixtures";
import Gallery from "./routes/Gallery";
import GalleryInner from "./routes/GalleryInner";
import Home from "./routes/Home";
import News from "./routes/News";
import NewsInner from "./routes/NewsInner";
import Sponsers from "./routes/Sponsers";
import Standings from "./routes/Standings";
import TournamentStaz from "./routes/TournamentStaz";
import Video from "./routes/Video";
import VolleyBall from "./routes/VolleyBall";
import "./style/main.scss";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
          <Heading />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsInner />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryInner />} />
            <Route path="/videos" element={<Video />} />
            <Route path="/clubs/:seasonName" element={<Clubs />} />
            <Route path="/clubs/s2" element={<ClubSTwo />} />
            <Route path="/club/:clubName" element={<ClubInner />} />
            <Route path="/fixtureandresult/:id" element={<Fixtures />} />
            <Route path="/tournamentstatz/:id" element={<TournamentStaz />} />
            <Route path="/awards/:seasonName" element={<Awards />} />
            <Route path="volleyball" element={<VolleyBall />} />
            <Route path="/standings/:seasonName" element={<Standings />} />
            <Route path="/Sponsors/:seasonName" element={<Sponsers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;