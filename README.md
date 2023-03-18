# This repository is to ...

- Save block data on ethereum chain
- Provide API endpoint about block, transaction-receipt, log (API docs with Swagger)
- Send slack message about block, transaction-receipt, log data in DB and send error alert for certain cases

  <br/>
  <br/>

# How to run this

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

  <br/>
  <br/>

# Others

slack token and channel id are in slack-bot.service.ts. You can look for /** REPLACE HERE **/ tag for specific location.
