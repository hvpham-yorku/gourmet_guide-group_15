import { useState } from "react";
import "./styles/SearchInterface.css";

// Dynamically load Material Symbols
const MaterialSymbolsLink = document.createElement("link");
MaterialSymbolsLink.href =
	"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
MaterialSymbolsLink.rel = "stylesheet";
document.head.appendChild(MaterialSymbolsLink);

const SearchInterface = () => {
	const results = [
		{ name: "Pizza", category: "Fast Food" },
		{ name: "Sushi", category: "Japanese" },
		{ name: "Ice Cream", category: "Dessert" },
	];

	const [searchTerm, setSearchTerm] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isSearchActive, setIsSearchActive] = useState(false);

	const initiateSearch = () => {
		if (searchTerm.trim() !== "") {
			setIsSearchActive(true);
		} else {
			setIsSearchActive(false);
		}
	};

	const slideResult = (direction) => {
		let newIndex = currentIndex + direction;
		if (newIndex >= results.length) {
			newIndex = 0;
		} else if (newIndex < 0) {
			newIndex = results.length - 1;
		}
		setCurrentIndex(newIndex);
	};

	return (
		<div className="search-interface-wrapper">
			<div className="search-interface">
				<div className="search-interface-input-group">
					<input
						type="text"
						className="search-interface-bar"
						placeholder="Search for food..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button
						className="search-interface-button"
						onClick={initiateSearch}
					>
						<span className="material-symbols-outlined">
							search
						</span>
					</button>
				</div>

				{isSearchActive && (
					<>
						<div className="search-interface-results-container">
							<div className="search-interface-result-item">
								<div className="search-interface-food-name">
									{results[currentIndex].name}
								</div>
								<div className="search-interface-food-category">
									Category: {results[currentIndex].category}
								</div>
							</div>
						</div>
						<div className="search-interface-result-info">
							Result {currentIndex + 1} of {results.length}
						</div>
						<div className="search-interface-navigation">
							<button
								className="search-interface-nav-button"
								onClick={() => slideResult(-1)}
							>
								&#10094;
							</button>
							<button
								className="search-interface-nav-button"
								onClick={() => slideResult(1)}
							>
								&#10095;
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SearchInterface;
