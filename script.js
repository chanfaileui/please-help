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

        function displayFilteredData(filteredData) {
            resultContainer.innerHTML = ""; // Clear previous results
        
            if (filteredData.length > 0) {
                for (const item of filteredData) {
                    const userContainer = document.createElement("div");
                    userContainer.classList.add("user-box"); // Add a class for styling
                    const userInfo = document.createElement("div");
                    userInfo.textContent = `Name: ${item.name}, Specialty: ${item.specialty}`;
                    userContainer.appendChild(userInfo);
                    resultContainer.appendChild(userContainer);
                }
            } else {
                resultContainer.textContent = "No matching professionals found.";
            }
        }
    });
});
