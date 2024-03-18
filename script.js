

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch joke categories
    function fetchCategories() {
        fetch('http://localhost:8000/jokebook/categories')
            .then(response => response.json())
            .then(categories => {
                // Display categories on the webpage
                const categoryList = document.getElementById('categoryList');
                const categoryy = document.getElementById('category');
                categoryList.innerHTML = '';
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryList.appendChild(option);
                });
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categoryy.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    // Function to fetch jokes by category
    function fetchJokes(category) {
        fetch(`http://localhost:8000/jokebook/joke/${category}`)
            .then(response => response.json())
            .then(jokes => {
                // Display jokes on the webpage
                const jokesContainer = document.getElementById('jokesContainer');
                jokesContainer.innerHTML = '';
                jokes.forEach(joke => {
                    const jokeItem = document.createElement('div');
                    jokeItem.classList.add('joke-item');
                    jokeItem.innerHTML = `<strong>Joke:</strong> ${joke.joke}<br><strong>Response:</strong> ${joke.response}`;
                    jokesContainer.appendChild(jokeItem);
                });
            })
            .catch(error => console.error(`Error fetching jokes for category ${category}:`, error));
    }

    // Function to handle form submission to add a new joke
    function addJoke(event) {
        event.preventDefault();
        const category = document.getElementById('category').value;
        const joke = document.getElementById('joke').value;
        const response = document.getElementById('response').value;

        // Send POST request to add the joke
        fetch('http://localhost:8000/jokebook/joke/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, joke, response })
        })
            .then(response => response.json())
            .then(data => {
                // Display added jokes
                fetchJokes(category);
                // Clear form fields
                document.getElementById('jokeForm').reset();
            })
            .catch(error => console.error('Error adding joke:', error));
    }

    // Event listener for form submission
    document.getElementById('jokeForm').addEventListener('submit', addJoke);

    // Fetch joke categories on page load
    fetchCategories();

    // Display jokes from the selected category
    document.getElementById('categoryList').addEventListener('change', function () {
        const selectedCategory = this.value;
        fetchJokes(selectedCategory);
    });
});