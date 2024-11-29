import { useState } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void; // Reçoit une fonction de recherche
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		onSearch(value);
	};

	return (
		<div style={{ marginBottom: "20px", textAlign: "center" }}>
			<input
				type="text"
				placeholder="Rechercher un souhait..."
				value={query}
				onChange={handleInputChange}
				style={{
					padding: "8px",
					fontSize: "16px",
					borderRadius: "4px",
					width: "100%",
					maxWidth: "400px",
					margin: "0 auto",
					border: "1px solid #ccc",
				}}
			/>
		</div>
	);
};

export default SearchBar;
