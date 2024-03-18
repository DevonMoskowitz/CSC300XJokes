GET /jokebook/categories
You use it by fetch(/jokebook/categories) and it returns the list

GET /jokebook/joke/:category: Returns jokes for the specified category. Optionally accepts a limit query parameter to limit the number of jokes returned.
You use it by fetch(/jokebook/joke/{whichever_category}) and it returns a JSON of a joke and the response.

POST /jokebook/joke/new: Adds a new joke to the specified category.
fetch(/jokebook/joke/new) using the method POST to send a joke into the express app.
