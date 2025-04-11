import HeaderPage from './components/header';
import MealFinder from './components/meals';
import './styling/index.css'
import './styling/App.css';
import './styling/modal.css'



function App() {
  return (
    <div className="App">
       <HeaderPage/>
      <MealFinder/>
    
    </div>
  );
}

export default App;
