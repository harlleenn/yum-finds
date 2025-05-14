import HeaderPage from './components/header';
import MealFinder from './components/meals';
import Footer from './components/footer';
import './styling/index.css'
import './styling/App.css';
import './styling/modal.css'
import './styling/Header.css';
import'./styling/Footer.css';



function App() {
  return (
    <div className="App">
       <HeaderPage/>
      <MealFinder/>
      <Footer/>
    
    </div>
  );
}

export default App;
