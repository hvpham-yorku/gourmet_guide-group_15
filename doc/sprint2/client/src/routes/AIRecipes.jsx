import React, { useState } from 'react';
import axios from 'axios';
import "@/styles/AIRecipes.css";

const AIRecipes = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/AIRecipes/ask', { query });;
            setResponse(res.data.response);
        } catch (error) {
            console.error(error);
            setResponse('Error contacting the bot.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
		<div>
        <div className='hero'>
            <h1 className='title'>Gourmet Assistant</h1>
			<p className='description'> Let our AI create the perfect recipe just for you! </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Ask for a recipe..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows="5"
                    cols="50"
                />
                <br />
                <button className="submitbutton" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Enter'}
                </button>
            </form>
		</div>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default AIRecipes;
