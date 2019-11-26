## Recipe & Go

A website to make shopping for products to make a recipe, more convenient.

### How to install the web application

First of all, run `npm install` inside of the `/recipe-go/` folder and 
the `/recipe-go/client` server. 
Afterwards, a RavenDB database needs to be setup on the following URL: 
`http://localhost:1337/` and it needs the name of: `RecipeGo`

### Running the web application

All that then needs to be done is running `npm run dev` in `/recipe-go/` to let 
make npm run the backend server, and frontend react servers.

### There is a catch

Currently all available suppliers are to be added to the database manually. This 
is due there being no worked out implementation avaiable thus far on the website itself