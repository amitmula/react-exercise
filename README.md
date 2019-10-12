# Credit card processing service 

## Running the node backend service

```sh
cd credit_card_service_no_db
$ npm install
$ npm run dev
```
the API endpoints should be up on http://localhost:8080

## Adding a new card :

	POST /card/add

Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			|String  | **required** <p>Card's Name</p>							|
| number			|String | **required** <p>Card Number</p>							|
| balance			|Numeric  | **optional** <p>Card's Balance, set to 0 initially if not present in request</p>							|
| limit			|Numeric  | **required** <p>Card's Limit</p>							|

Sample CURL :
```sh
curl -X POST \
  http://localhost:8080/card/add \
  -H 'content-type: application/json' \
  -d '{
        "name": "Test Card",
        "number": "4375510276155014",
        "limit": 4000
    }'
```

## Getting all the cards :

	GET /card/getall

Sample CURL :
```sh
curl -X GET http://localhost:8080/card/getAll 
```

## Running unit tests

```sh
npm test
```

* * *
## Running the react frontend app.

This has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To start the app :

```sh
cd credit_card_processing_react_app
$ npm install
$ npm start
```

it should be up and running on http://localhost:3000
