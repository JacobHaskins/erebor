# erebor

A repo for experimentation.

### Table of Contents
**[Introduction](#introduction)**<br>
**[Links](#links)**<br>
**[Screenshot](#screenshot)**<br>
**[Highlights](#highlights)**<br>
**[Functions](#functions)**<br>
**[Prerequisites](#prerequisites)**<br>
**[Scripts](#scripts)**<br>
**[Notes](#notes)**<br>
**[Challenges](#challenges)**<br>
**[Alternatives](#alternatives)**<br>
**[Ideas](#ideas)**<br>
**[License](#license)**<br>
**[Acknowledgements](#acknowledgements)**<br>

## Introduction

In Middle Earth, Erebor is the city under The Lonely Mountain that is filled with gold. The stock market has been a source of riches for many people.  Hopefully, this stock comparison tool is as useful as a shovel or pick-axe would be in Erebor.

## Links

- Github repo: https://github.com/JacobHaskins/erebor
- CI/CD build status: ![](https://github.com/JacobHaskins/erebor/workflows/erebor-CICD/badge.svg)
- Prod deploy on Heroku: https://erebor-experiment.herokuapp.com/

## Screenshot

<img src="https://raw.githubusercontent.com/JacobHaskins/erebor/main/screenshot.png" width="400">

## Highlights

- Built with Typescript + React on a scaffold generated with create-react-app
- Uses functional React components and Hooks + Context Provider
- Queries stock data using the Alpha Vantage API (https://www.alphavantage.co/documentation/) via the axios library
- Charts a stock's cash flow time series data using the d3 library
- Unit testing with React Testing Library, Jest, and AXE (for a11y tests)
- Integration testing with Cypress (to open Cypress locally: `npx cypress open`)
- CI/CD pipeline built for GitHub Actions that installs, builds, unit tests, integration tests, 
and deploys the project to Heroku (see /.github/workflows/main.yml)
- Mobile-first CSS structure using Flexbox and media queries
- Uses the Google Fonts API for styling the H1 "logo" text
- Uses CSS and the Glyphicon font for creating the stock price change up / down arrows
- Uses a custom-built aria listbox for displaying the stock symbol / name keyword search results and up/down arrowing through them
- Uses a custom-devised processing delay for querying the Alpha Vantage keyword search in order to attempt to keep the requests below the 5 request / minute throttling level
- Uses a project structure that segregates the UI component, business-logic services, and data model layers

## Functions

- Permits the user to search the Alpha Vantage API for a stock symbol / business name / keyword
- Pin up to 3 stocks from the search results as cards on the "stock board"
- Displays all 3 cards at once, arranged to fit the device screen appropriately
- Charts the stock's cash flow data on each card using d3 

## Prerequisites

This project was developed on a Windows machine with the following tools installed:
- git version 2.35.0.windows.1
- npm v8.1.2
- NodeJS v16.13.2
- Heroku CLI tools: heroku/7.53.0 win32-x86 node-v12.21.0

## Scripts

- `npm install` will install this project's dependencies
- `npm run build` creates a production build of the project
- `npm test` launches the interactive unit test runner
- `npm start` runs the app locally in development mode at [http://localhost:3000](http://localhost:3000)

## Notes

On my machine, I needed to lengthen the timeout for Cypress's verification step.  To do this, in node_modules\cypress\lib\tasks\verify.js, I modified VERIFY_TEST_RUNNER_TIMEOUT_M to have a default value of 300000.

## Challenges

This was my first "real" project using Typescript and the d3 charting library.  Thankfully, Typescript's interface and type concepts are very similar to those in other statically-typed languages I've used in the past, such as C#, Delphi, and Java.  The d3 library's documentation, however, is (AFAIK) all based on dynamically-typed Javascript examples.  My biggest difficulty was solving typing errors with using d3, and that ended up decreasing the amount of time I planned to spend writing unit and integration tests.

My second biggest challenge was Alpha Advantage's API throttling of free accounts.  Pinning a stock's card to the board takes, at minimum 4 API requests.  This caused me to design a way to limit the number of keyword searches the app was doing and to find a way to communicate throttling errors to the user.

## Alternatives

My Board data model is a simple Register data structure with slots for 3 stock cards.  I considered using a Linked List, but because the project did not need to support a dynamically varible number of pinned stocks, I opted for a simpler data structure.

## Ideas

There are a few ways this project could be improved.
- Purchase an Alpha Vantage API account.  This would enable the project to perform more frequent keyword searches
and gather even more stock data to chart and display.
- Improve the display of error messages.  Currently, they are just launched as alerts.
- Make a favicon instead of using the create-react-app provided one.
- More tests!  Because of time constraints, I did not practice Test-Driven Development with this project.
Consequently, it has woeful test coverage gaps.

## License

This project is licensed under the MIT License - https://mit-license.org/

## Acknowledgements

- ObservableHQ for their d3 documentation: https://observablehq.com/@d3/learn-d3-shapes?collection=@d3/learn-d3
- My wife and children for giving me the time to work on this project.  :-)
