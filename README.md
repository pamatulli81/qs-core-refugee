# Migration and Refugees Qlik Core Webapp

This repository contains the source code for the Demo App related to the Migration and Refugees situation.

## Developing the UI

* Start the Qlik Associative Engine in a Docker container.
  Note that before you deploy, you need to set the `ACCEPT_EULA` environment variable,
  otherwise the Qlik Associative Engine won't start.
 
  ```bash
  ACCEPT_EULA=yes docker-compose up -d
  ```

* Install dependencies:
  ```bash
  npm install
  ```
* Run the application:
  ```bash
  npm run start
  ```
* Open a browser and navigate to [http://localhost:3000](http://localhost:3000) to view the UI.

## The data

The data used in the UI is from [Uhncr](https://unhcr.org/)..
Migration and Refugees Indicators: Total Population, Refugees, Asylum Country, Origin Cuntry, Migration Ratio vs. Total Population, Worldwide Country Rank List and so on. Time series covered from 1951-2017.
