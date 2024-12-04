import RecipeSearchResultView from "@/components/RecipeSearchResultView";

function Recipes() {
	return (
		<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh" }}>
			<RecipeSearchResultView query={" "} />;
		</div>
	);
}

export default Recipes;
