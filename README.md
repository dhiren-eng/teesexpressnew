This is a MERN stack project . The react app folder is website_client .

In website_client, the Global Store with Context and Hooks is configured in Context > Store.js .

features folder is the folder which holds the main code of the React app. The whole React app is divided into modules and all these modules are stored as folders in the main features folder. The 2 features implemented in this POC are : products and search .

In both products and search modules/folders , we have the ducks folder which hold the reducers, action creators for the respective modules. The reducers of these 2 modules are imported and then combined in Context > Store.js . This design pattern of having separate modules/folders and ducks folder for every module enables scalability in the application i.e. we can add as many new modules we want and then we can combine the respective reducers of the modules in global store Context > Store.js . In this POC we just have 2 modules combined using context and hooks . In master branch we can see multiple modules combined using the same design pattern but using redux.

Flow of app :

1. When user opens app. Homepage is opened and products are fetched from database and stored in global store configured in Context > Store.js using context api and useReducer hook . These products are then taken from global store by the component products > CategoryListContainer using useContext and displayed in Homepage (CategoryListContainer is imported in component home > Homepage.js and displayed there)

2. In products module/folder, components are divided into presentational components (holding only layout of the component) and container components (where the data fetch call and data access from global store is done). eg. CategoryListContainer.js is container component & CategoryListComponent.js is presentational component

3. On clicking any product image or any option of the dropdown "Shop" in navigation bar user will be directed to a page where user can specify the requirements for bulk order. As the requirements are mentioned, the total price and total quantity gets updated simultaneously using useState in products > CategoryDetailsComponent.js . Placing the order is not enabled in this POC, only requirements mentioning is enabled

4. If we are in any of the product requirements page and if we click on any product option of dropdown Shop in navigation bar, the component CategoryDetailsContainer gets updated and therefore, re-renders . This update code is written in products > CategoryDetailsContainer.js using useEffect . Previously it was written in componentDidUpdate when it was a class based component

5. Images are fetched from aws S3 bucket using Storage.get function of aws amplify in useEffect of the components

6. In search module , the search term is sent to the express/mongo backend and the fetched results are stored into global store using context and useReducer hook . Then these results are taken from the store by the component search > SearchResult.js using useContext

7. Like in componentDidUpdate we used to compare prevProps and current props , the same is done in SearchResults using useRef .

Total code is written by me from scratch :D

Dependancies need to be installed using npm in 2 folders as mentioned below :

1. Clone the project
2. In terminal in teesexpressnew > npm install
3. In terminal in teesexpressnew/website_client > npm install

For starting the project :

1. In terminal in teesexpressnew > npm run start-dev
2. Then in a new terminal in teesexpressnew/website_client > npm start

Screenshots :

![Imgur](https://i.imgur.com/M0tjky6.png)

![Imgur](https://i.imgur.com/PwmgHl9.png)

![Imgur](https://i.imgur.com/z2OfiW8.png)
