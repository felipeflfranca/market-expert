# Market Expert
# REST API PHP and React + Material UI
This is a demonstration based on the concept of a market program with REST API backend made in PHP with PostgreSQL database and a React + Material UI.

## Prerequisites

Make sure you have [PHP 7.4](https://www.php.net/downloads.php) , [Composer](https://getcomposer.org/download/) and [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) installed and **pdo_pgsql** extension enabled into **php.ini** file.\
**Note**: In development, version 14.1 of PostgreSQL was used.

## Test database copy

Create the database:
```
CREATE DATABASE marketexpert
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

Download the [dump](https://github.com/felipeflfranca/market-expert/raw/main/resources/marketexpert.dump) (database backup)


Restore from dump (backup) using the following command:\
**Note:** Replace "{file_path}" with the path to the file on your computer
```
.\pg_restore -U postgres -W -d marketexpert {file_path}marketexpert.dump;
```

## Database connection

Open the **Database.php** file in the **APP/Config** folder and change the connection values according to your need:
```
    private string $dbName = 'marketexpert';
    private string $dbUser = 'postgres';
    private string $dbPassword = 'you_password';
    private string $dbHost = 'host_address';
    private int $dbPort = 5432;
```

## How to run the application

Open the terminal from within the project directory or navigate to it and run the following command:
```
php -S localhost:8080 -t ./public/
```

## Using the API

### Products

Insert a new product - HTTP /POST
```

```

Update product data - HTTP /PUT
```

```

Delete a product - HTTP /DELETE
```

```

Get all products - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=product'
```

Get product by code - HTTP /GET
```

```

Get the product by code, description or type - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product&search=palmito", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=product&search=palmito'
```

---

### Product types

Insert a new product type - HTTP /POST
```

```

Update product type data - HTTP /PUT
```

```

Delete a product type - HTTP /DELETE
```

```

Get all product types - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=productType", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=productType'
```

Get product by id - HTTP /GET
```

```

Get the product for any data - HTTP /GET
```

```

---

### Sales

Insert a new sales - HTTP /POST
```

```


Get all sales - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=sales", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=sales'
```

Get sales by id - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=sales&id={id}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=sales&id={id}'
```

Retrieve sales data by date - HTTP /GET
```

```
