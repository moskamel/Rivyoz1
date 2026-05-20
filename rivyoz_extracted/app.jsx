const App = () => (
  <div>
    <Nav />
    <Hero />
    <AIScanFeature />
    <PriceCompareFeature />
    <Categories />
    <Rewards />
    <Stores />
    <Reviews />
    <DownloadCTA />
    <Footer />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
