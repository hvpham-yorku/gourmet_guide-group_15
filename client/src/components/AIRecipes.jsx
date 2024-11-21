import React from 'react';
import './AIRecipes.css';

const AIRecipes = () => {
    return (
        <>
            <main>
                <section className="hero">
                    <h1>Welcome to AI Chef</h1>
                    <p>Let our AI create the perfect recipe just for you!</p>
                    <input 
                        type="text" 
                        placeholder="Enter ingredients or cuisine..." 
                        className="recipe-input" 
                    />
                    <button className="generate-button">Generate Recipe</button>
                </section>
            </main>
        </>
    );
};

export default AIRecipes;
