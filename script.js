document.addEventListener("DOMContentLoaded", function () {
    const data = [
        "English",
        "Chinese",
        "Japanese",
        "Italian",
        "Arabic",
        "Punjabi",
        "Spanish",
        "Vietnamese",
        "Mandarin",
        "Indonesian",
        "Cantonese"
    ];

    const searchInput = document.querySelector(".search-input");
    const autocompleteResults = document.getElementById("autocompleteResults");
    const selectedSuggestion = document.getElementById("selectedSuggestion");
    const resultContainer = document.getElementById("resultContainer"); // Element to display results

    // Function to load JSON data from a file
    function loadJSON(callback) {
        fetch("docData.json")
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error("Error loading JSON:", error));
    }

    loadJSON(function (jsonData) {
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();
            const matches = [];

            for (const option of data) {
                if (!option) {
                    continue;
                }
                if (option.toLowerCase().includes(searchTerm)) {
                    matches.push(option);
                }
            }

            displayAutocompleteResults(matches);
        });

        function displayAutocompleteResults(matches) {
            if (matches.length > 0) {
                const resultsHTML = matches.map(match => `<div>${match}</div>`).join("");
                autocompleteResults.innerHTML = resultsHTML;
                autocompleteResults.style.display = "block";
            } else {
                autocompleteResults.innerHTML = "";
                autocompleteResults.style.display = "none";
            }
        }

        autocompleteResults.addEventListener("click", function (event) {
            if (event.target.tagName === "DIV") {
                const selectedValue = event.target.textContent;
                searchInput.value = selectedValue;
                autocompleteResults.style.display = "none";

                // Filter JSON data based on selectedValue (language)
                const filteredData = jsonData.filter(item => item.language === selectedValue);

                // Display the filtered data on the page
                displayFilteredData(filteredData);
            }
        });

        // Function to display filtered data on the page
        function displayFilteredData(filteredData) {
            resultContainer.innerHTML = ""; // Clear previous results

            if (filteredData.length > 0) {
                for (const item of filteredData) {
                    const resultElement = document.createElement("div");
                    resultElement.textContent = `Name: ${item.name}, Specialty: ${item.specialty}`;
                    resultContainer.appendChild(resultElement);
                }
            } else {
                resultContainer.textContent = "No matching professionals found.";
            }
        }
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Sample data for autocomplete
//     const data = [
//         "English",
//         "Arabic",
//         "Punjabi",
//         "Spanish",
//         "Vietnamese",
//         "Mandarin",
//         "Indonesian",
//         "Cantonese"
//     ];

    
//     const searchInput = document.getElementById("searchInput");
//     const autocompleteResults = document.getElementById("autocompleteResults");

//     searchInput.addEventListener("input", function () {
//         const searchTerm = searchInput.value.toLowerCase();
//         const matches = [];

//         for (const option of data) {
//             if (! option) {
//                 continue;
//             }
//             if (option.toLowerCase().includes(searchTerm)) {
//                 matches.push(option);
//             }
//         }

//         displayAutocompleteResults(matches);
//     });

//     function displayAutocompleteResults(matches) {
//         if (matches.length > 0) {
//             const resultsHTML = matches.map(match => `<div>${match}</div>`).join("");
//             autocompleteResults.innerHTML = resultsHTML;
//             autocompleteResults.style.display = "block";
//         } else {
//             autocompleteResults.innerHTML = "";
//             autocompleteResults.style.display = "none";
//         }
//     }

//     autocompleteResults.addEventListener("click", function (event) {
//         if (event.target.tagName === "DIV") {
//             searchInput.value = event.target.textContent;
//             autocompleteResults.style.display = "none";
//         }
//     });
// });
