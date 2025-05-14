import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Modal from 'react-bootstrap/Modal'
import '@splidejs/splide/dist/css/splide.min.css'; // Import Splide's CSS

const MealFinder = () => {
    const [meals, setMeals] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [selectedItem,setSelectedItem] = useState([]);
    const [result, setResult] = useState("");
    const [search,setSearch] = useState("");
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            const data = await response.json();
            console.log(data);
            setMeals(data.meals);
        } catch (error) {
            console.error("Oops, there is an error:", error);
        }
    };
    const handleMeals = (meal) =>{
    setSelectedItem(meal);
    setShow(true)
    console.log('meal has been clcicke');
}
    useEffect(() => {
         if(userInput && filterData.length === 0){
         console.log('result not found')
            setResult("No such recipe found :(")
        }   else{
            setResult("")
     }
    },[userInput,filterData]);

    
    useEffect(() => {
        fetchData();
    }, []);

    // Filter meals based on user input
    useEffect(() => {
        const filterMeal = meals.filter(meal =>
            meal.strMeal.toLowerCase().includes(userInput.toLowerCase())
        );
        setFilterData(filterMeal);
    }, [meals, userInput]);

useEffect(() =>{
    setSearch(userInput);
},[userInput])
    return (
        <div className='the-main-box'>
          <div className="section-heading">
                <p> Popular Food Recipes You May Like</p>
        </div>


                {!userInput&& (
                    <div className='the-main-box'>
                    <Splide
                        options={{
                            type: 'loop',
                            perPage: 3,
                            gap: '1rem',
                            pagination: false,
                            autoplay: true,
                            breakpoints: {
                                600: {
                                    perPage: 1,
                                },
                            },
                        }}
                    >
                        {meals.map(meal => (
                            <SplideSlide key={meal.idMeal}>
                                <div className='splide-images'>
                                    <img src={meal.strMealThumb} alt='food-photo' className='images' 
                                    onClick={() => handleMeals(meal)} />
                                    <div className='meal-name'>
                                    {meal.strMeal}
                                    </div>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>) }
               
                <div className='input'>
                <input
                    placeholder='Search for a meal'
                    type='text'
                    value={userInput}
                    className='input-value'
                    onChange={(e) => setUserInput(e.target.value) }
                />
            </div>
            {search && (
                <div>
                    Results for {search}
                </div>
            )}
    <div  className='filter-container'>
        { 
            filterData.map((data) => {
                return (
                    <div className='filter-items'>

                        <div key={data.idMeal} className='meals' >
                            <img src={data.strMealThumb} 
                            alt="food" width="300px"
                            onClick={() => handleMeals(data)}
                            className='food-images'/>
                        </div>
                        
                        <div className='dishes-nameArea'>
                            {data.strMeal}<br></br>
                            Area of cuisine : {data.strArea}
                        </div>

                    </div>
                )
            })
        }

                </div>

                    <Modal show={show} onHide={handleClose} scrollable={false}
                    className='modal-container'>
                        {selectedItem && (
                            <div className='modal-contents'>
                                <div className='meal-name'>
                                    {selectedItem.strMeal}
                                </div>

                            <div className='Area-dish'>
                                 Area of dish {selectedItem.strArea}
                            </div>
                           
                        <div className='dish-container
                        '>
    
                            <div className='dish-image'>  
                                <img src={selectedItem.strMealThumb} 
                                alt='food' width="300px" height="300px" className='food-images'/>
                           </div>

                           <div className='ingredients'>
                                Ingredients:<br></br>
                                
                                {selectedItem.strIngredient1}<br></br>
                                {selectedItem.strIngredient2}<br></br>
                                {selectedItem.strIngredient3}<br></br>
                                {selectedItem.strIngredient4}<br></br>
                                {selectedItem.strIngredient5}<br></br>
                                {selectedItem.strIngredient6}
                            </div>
                    </div>
                        
                           <div className='instructions'> 
                                <strong>  Instructions:</strong> {selectedItem.strInstructions}
                         </div>
                </div>
  )}
    </Modal>

   {
    result && (
         <div className='no-results'>
            {result}
        </div>
    )
   }
    </div>
    );
};

export default MealFinder;
