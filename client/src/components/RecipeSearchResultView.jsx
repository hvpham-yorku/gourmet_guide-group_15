function RecipeSearchResultView({ data }) {
	return (
		<div>
			<ul>
				{data.split("").map((char, i) => {
					console.log(`${char} re-render?`);
					return <li key={i}>{char}</li>;
				})}
			</ul>
		</div>
	);
}

export default RecipeSearchResultView;
