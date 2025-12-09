
import Meals from "./components/meals"
import './index.css'
import './App.css';
import Container from "./components/Container";
import NavBar from "./components/NavBar";




function App() {
  return (
    <div className="App">
      <NavBar/>
<Container>
  <Meals/>
</Container>
      
  
    
    </div>
  );
}

export default App;
