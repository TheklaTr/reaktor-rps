# Rock-Paper-Scissors Web App

This is a pre-assignment project for Developer Summer Trainee from Reaktor.

Link exercise: [Reaktor](https://www.reaktor.com/assignment-2022-developers/)

## Deployment

Netlify: [link](https://hopeful-lichterman-e1be74.netlify.app/)

Heroku: [link](https://reaktor-rps-01.herokuapp.com/)

## Installation

To install this project:

```bash
  npm install
```

## Deployment

To run this project:

```bash
  npm start
```

or

```bash
  yarn start
```

To test this project run

```bash
  npm run test
```

or

```bash
  yarn test
```

## Languages and Tools:

<p align="left"> 
    <a href="https://reactjs.org/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/react-native.png"/> </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> 
    <a href="https://getbootstrap.com" target="_blank"> <img src="https://img.icons8.com/color/48/000000/bootstrap.png"/> </a> 
    <a style="padding-right:8px;" href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a> 
    <a href="https://jestjs.io/" target="_blank"> <img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/000000/external-jest-can-collect-code-coverage-information-from-entire-projects-logo-shadow-tal-revivo.png"/> </a> 
</p>

## Insights

I tried many solutions to fix the CORS policy to deploy the app. I tried [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) to configure proxy middleware.

I also tried writing the backend server to enable CORS based on [this](https://github.com/15Dkatz/beat-cors-server) but it did not working.

The last solution is writing the custom backend to store all the data. However, using MongoDB to store data will slow down fetching entries from external API. Because of my lack of knowledge in backend as well as data structure to handle such large data, I could not deploy the application successfully.

## Authors

-  [@TrHien](https://www.github.com/TrHien)

## License

[MIT](https://choosealicense.com/licenses/mit/)
