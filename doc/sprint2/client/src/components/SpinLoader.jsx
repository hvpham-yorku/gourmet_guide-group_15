import "@/styles/SpinLoader.css";

function SpinLoader() {
	return (
		<div className="loadingContainer">
			<div className="dot" />
			<div className="dot" />
			<div className="dot" />
		</div>
	);
}

export default SpinLoader;
