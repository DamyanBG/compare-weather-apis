import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import "./App.scss"
import Weather from './components/Weather';


function App() {
  return (
    <div className="App">
      <Header />
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
