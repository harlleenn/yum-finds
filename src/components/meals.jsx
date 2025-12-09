import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Search } from "lucide-react";
import { motion } from "motion/react";

import "@splidejs/splide/dist/css/splide.min.css";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [result, setResult] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await response.json();
      setMeals(data.meals);
    } catch (error) {
      console.error("Oops, there is an error:", error);
    }
  };

  const handleMeals = (meal) => {
    setSelectedItem(meal);
    setShow(true);
  };

  useEffect(() => {
    fetchData();
    console.log(meals)
  }, []);

  useEffect(() => {
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilterData(filtered);
  }, [meals, userInput]);

  const ingredients = [];
  if (selectedItem) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = selectedItem[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(ingredient);
      }
    }
  }

  useEffect(() => {
    if (userInput && filterData.length === 0) {
      setResult("No such recipe found :(");
    } else {
      setResult("");
    }
  }, [userInput, filterData]);

  useEffect(() => {
    setSearch(userInput);
  }, [userInput]);

  return (
    <div className="bg-[#FFF7ED]">
      {meals && (
        <div className="sticky">
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              gap: "1rem",
              pagination: false,
              autoplay: true,
              breakpoints: {
                600: { perPage: 1 },
              },
            }}
          >
            {meals.map((meal) => (
              <SplideSlide key={meal.idMeal}>
                <div className="bg-white relative p-4 rounded-lg shadow-md hover:scale-[0.98] transition cursor-pointer">
                  <img
                    src={meal.strMealThumb}
                    alt="food"
                    className="rounded-lg shadow hover:scale-[0.95] transition"
                    onClick={() => handleMeals(meal)}
                  />
                  <div className="text-lg flex justify-center p-4 font-bold text-[#1F2937]">
                    {meal.strMeal}
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}

      <div className="p-10 flex justify-center">
        <input
          placeholder="Search for a meal"
          type="text"
          value={userInput}
          className="px-7 py-3 rounded-lg bg-white border border-gray-300 text-[#1F2937]"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="relative">
          <button className="flex absolute gap-2 py-2 left-5 top-3 rounded-full px-3 bg-[#6B8E73] text-white">
            Search <Search />
          </button>
        </div>
      </div>

      {search && (
        <div className="text-2xl flex justify-center text-[#1F2937]">
          Results for {search}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
        {filterData.map((data) => (
          <div
            key={data.idMeal}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
          >
            <img
              src={data.strMealThumb}
              alt="food"
              onClick={() => handleMeals(data)}
              className="rounded-lg w-full h-52 object-cover"
            />

            <div className="mt-4 flex flex-col">
              <h2 className="text-lg font-semibold text-[#1F2937]">
                {data.strMeal}
              </h2>
             
              <div className="flex gap-2 mt-2">
                <button className="bg-[#E6EFE9] text-[#1F2937] rounded-xl px-4">
                  {data.strCategory}
                </button>
                <button className="bg-[#EDE9FE] text-[#1F2937] rounded-xl px-4">
                  {data.strArea}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div   onClick={() => {
          setSelectedItem(null)
        }}>
           <motion.div
     
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-xl h-screen max-w-2xl p-10 relative overflow-scroll">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-xl text-[#1F2937]"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#1F2937]">
              {selectedItem.strMeal}
            </h2>
            <p className="text-md text-[#6B7280] mb-4">
              Area: {selectedItem.strArea}
            </p>

            <div className="flex gap-10">
              <img
                src={selectedItem.strMealThumb}
                alt="food"
                className="rounded-lg w-80"
              />

              <div>
                <h3 className="font-semibold text-[#1F2937]">
                  Ingredients
                </h3>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="text-[#374151]">
                    • {ingredient}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-[#374151] mt-4">
              <strong>Instructions:</strong>{" "}
              {selectedItem.strInstructions}
            </p>
          </div>
        </motion.div>
        </div>
       
      )}

      {result && (
        <div className="flex text-4xl font-extrabold justify-center text-[#1F2937]">
          {result}
        </div>
      )}
    </div>
  );
}
