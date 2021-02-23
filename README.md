## Expectations

* It should be production-ready code - the code will show us how you ship things to production and be a mirror of your
  craft.
* Take whatever time you need - we won't look at start/end dates, you have a life besides this and we respect that!

### What are you building

This is a basic CRUD (without the delete) of people. You'll implement an app with 3 pages:

- **People list** - Display a list of people and their attributes. It allows searching by employee name.
- **Create member** - A form to create a new team member;
- **Edit team member** - A form to edit an existing team member;

For further details, follow the design specs in the Figma file.

### What we will look at

- How you work with HTML, CSS, and JavaScript in a React app;
- How you reproduce the provided design;
- How you structure your codebase and how well it reads;
- How well it works;
- How you write tests. Tests take time, so you just need to test:
    - Button component: Some tests are already done, you will need to complete them.
    - People list page: Write the needed tests.
    - Edit or Create member: Pick one of the flows. You are free to choose between Testing Library, Cypress or any other
      testing tool/approach.

---

# The project

### Project stack

- React (Create React App)
- CSS with Styled-Components
- Tests with React Testing Library

## Available endpoints

- `GET http://localhost:4000/people`: get the full list of people
- `GET http://localhost:4000/people/{id}`: get the person with id `{id}`
- `GET http://localhost:4000/people?name_like={substring}`: search for people where the name includes `{substring}`
- `POST http://localhost:4000/people`: create a new person
- `PATCH http://localhost:4000/people/{id}`: update the person with id `{id}`


## My notes

- The API request to `/people` endpoint returns a full set of data about every user, so technically, requests
   to `people/userID` endpoints are redundant. Assuming that this is only because of the simplified implementation of
   the test API and not an intentional behavior, I requested `people/userID` every time I needed the full user data.

- On the people list page, if the user hovers the mouse cursor over the table cell with the Edit link or focuses it
   using a keyboard, API runs data prefetching for this row's member in the background. If the user clicks the link, the
   next page seems to load faster.

