// Import required modules
const express = require('express');
const cors = require("cors");
let corsOptions = {
    origin: "http://localhost:63343"
}
// Initialize Express app
const app = express();
app.use(cors(corsOptions))

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json());

// Define joke categories and jokes
let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    },
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    },
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];
let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    {
        'joke': 'What would the Terminator be called in his retirement?',
        'response': 'The Exterminator'
    }
];

// Endpoint to get joke categories
app.get('/jokebook/categories', (req, res) => {
    res.json(categories);
});

// Endpoint to get jokes from a category
app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit;

    if (!categories.includes(category)) {
        return res.status(400).json({ 'error': `no category listed for ${category}` });
    }

    let jokes;
    if (category === 'funnyJoke') {
        jokes = funnyJoke;
    } else {
        jokes = lameJoke;
    }

    if (limit) {
        jokes = jokes.slice(0, limit);
    }

    res.json(jokes);
});

// Endpoint to add a new joke
app.post('/jokebook/joke/new', (req, res) => {
    const { category, joke, response } = req.body;

    if (!category || !joke || !response || !categories.includes(category)) {
        return res.status(400).json({ 'error': 'invalid or insufficient user input' });
    }

    const newJoke = { joke, response };
    if (category === 'funnyJoke') {
        funnyJoke.push(newJoke);
    } else {
        lameJoke.push(newJoke);
    }

    res.json({ 'message': 'Joke added successfully', 'jokes': category === 'funnyJoke' ? funnyJoke : lameJoke });
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});