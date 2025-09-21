"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Reusable "Navbar" component
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";


export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
const [showDiets, setShowDiets] = useState(false);
const [selectedDiets, setSelectedDiets] = useState([]);

  const handleSearchFocus = () => setShowResults(true);

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const sortedCategories = data.categories.sort((a, b) => {
          const categoryOrder = ['Dessert', 'Vegetarian', 'Pasta'];
          const aIndex = categoryOrder.findIndex(cat =>
            a.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          const bIndex = categoryOrder.findIndex(cat =>
            b.strCategory.toLowerCase().includes(cat.toLowerCase())
          );

          // If both categories are in our priority list
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          // If only a is in priority list
          if (aIndex !== -1) return -1;
          // If only b is in priority list
          if (bIndex !== -1) return 1;
          // If neither are in priority list
          return 0;
        });
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") || "light";
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    if (navbar && content) {
      content.style.marginTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  return (
    <>
      {/*Navbar - contributed by Devika Harshey*/}
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      {/* Content */}
      <div
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 ${!showResults ? "opacity-100" : "opacity-80 blur-sm"
          }`}
      >
        <section className="w-full h-screen bg-base-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                }`}>
                Start Your Flavor Journey
              </h1>
            </div>
            <p className={`text-xl md:text-2xl max-w-3xl leading-relaxed ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
              }`}>
              Unlock a world of flavors with AI-curated recipes, personalized
              suggestions, and exciting surprises. Explore new cuisines or craft
              the perfect meal with Flavor AI!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">

              {/* --- Button 1: AI Recipes --- */}
              <Link href="/ai" className="animate-fadeIn">
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  {/* Magic Wand Icon 🪄 */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0" /></svg>
                  Get AI-Generated Recipes
                </button>
              </Link>

              {/* --- Button 2: Random Recipe --- */}
              <Link href="/random" className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  {/* Shuffle Icon 🔀 */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" /></svg>
                  Discover a Random Recipe
                </button>
              </Link>

              {/* --- Button 3: Diet Planner --- */}
              <Link href="/diet-planner" className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  {/* Diet/Health Icon 🥗 */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  AI Diet Planner
                </button>
              </Link>

              {/* --- Button 4: Favorites --- */}
              <Link href="/favorite" className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30">
                  ❤️ Favorites
                </button>
              </Link>

              {/* --- Button 5: Show/Hide Categories --- */}
              <button
                className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2 animate-fadeIn"
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  if (!showCategories) {
                    setTimeout(() => {
                      document.querySelector('.categories-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                style={{ animationDelay: '500ms' }}
              >
                {showCategories ? "Hide Categories" : "Show Categories"}
                {!showCategories && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

            </div>
          </div>
        </section>

        <div className="divider mt-10"></div>

        {/* Categories section */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg shadow-lg">
            <h1 className={`text-xl md:text-3xl mb-10 font-semibold text-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
              }`}>
              A Taste for Every Mood and Moment
            </h1>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`btn btn-sm md:btn-md ${filter === type ? "btn-primary" : "btn-outline"} transition-all duration-200`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                <button onClick={() => setShowDiets(!showDiets)} className={`btn btn-sm md:btn-md ${showDiets ? "btn-primary" : "btn-outline"} transition-all duration-200`}> Diet Based
                </button>
            </div>
            {showDiets && (
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {["Vegan", "Keto", "100 Calories", "Low Carbs", "High Protein", "Gluten Free"].map((diet) => (
                        <button key={diet} onClick={() => {
                            setSelectedDiets((prev) =>
                            prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
                           );
                        }} className={`btn btn-sm md:btn-md ${selectedDiets.includes(diet) ? "btn-primary" : "btn-outline"} transition-all duration-200`}> {diet}
                        </button>
                    ))}
                </div>
            )}
            {/* Grid layout for categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {categories
                .filter((category) => {
                  const lowerName = category.strCategory.toLowerCase();
                  const vegetarianKeywords = ["vegetarian", "vegan", "dessert", "pasta", "starter"];
                  const dietKeywords = {
                    "Keto": ["keto", "ketogenic", "low carb"],
                    "Vegan": ["vegan", "plant-based"],
                    "100 Calories": ["100 calorie", "low calorie", "light meal"],
                    "Low Carbs": ["low carb", "keto", "diabetic friendly"],
                    "Gluten Free": ["gluten-free", "no gluten"],
                    "High Protein": ["high protein", "protein rich"]
                  };

                  if (filter === "All") return true;

                  if (filter === "Vegetarian") {
                    return vegetarianKeywords.some((keyword) => lowerName.includes(keyword));
                  }

                  if (filter === "Non-Vegetarian") {
                    return !vegetarianKeywords.some((keyword) => lowerName.includes(keyword));
                  }
                  if (selectedDiets.length > 0) {
                    return selectedDiets.every((diet) =>
                      dietKeywords[diet]?.some((keyword) => lowerName.includes(keyword))
                    );
                  }

                  return true;
                })
                .map((category) => (
                  <div key={category.idCategory} className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <figure className="relative">
                      <Image
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        width={384}
                        height={216}
                        className="w-full h-48 object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-lg md:text-xl  dark:bg-white-600 flex items-center gap-2">
                        <PlusIcon />
                        {category.strCategory}
                      </h2>
                      <p className="text-sm dark:bg-white-900 ">{category.strCategoryDescription.slice(0, 80)}...</p>
                      <div className="card-actions justify-end">
                        <Link href={`/category/${category.strCategory}`}>
                          <button className="btn btn-primary text-sm md:text-base">
                            Show Recipes 🍽️
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

            </div>
          </section>
        )}

        {/* Footer added */}
        <Footer />
      </div>
    </>
  );
}
