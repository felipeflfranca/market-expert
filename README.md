# Market Expert
# REST API PHP and React + Material UI
This is a demonstration based on the concept of a market program with REST API backend made in PHP with PostgreSQL database and a React + Material UI.

## Prerequisites

Make sure you have [PHP 7.4](https://www.php.net/downloads.php) , [Composer](https://getcomposer.org/download/) and [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) installed and **pdo_pgsql** extension enabled into **php.ini** file.\
**Note**: In development, version 14.1 of PostgreSQL was used.

Make sure you have set your region's timezone correctly in the **php.ini** file.

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
composer install
```

```
php -S localhost:8080 -t ./public/
```

## Using the API

### Products

Insert a new product - HTTP /POST

- JavaScript - Fetch
```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("code", "8813268");
urlencoded.append("description", "Vinagre Balsâmico CASTELO 500ml");
urlencoded.append("value", "26.29");
urlencoded.append("type_id", "4");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=product' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=8813268' \
--data-urlencode 'description=Vinagre Balsâmico CASTELO 500ml' \
--data-urlencode 'value=26.29' \
--data-urlencode 'type_id=4'
```

Update product data - HTTP /PUT
```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("id", "16");
urlencoded.append("code", "8813268");
urlencoded.append("description", "Vinagre Balsâmico CASTELO 500ml");
urlencoded.append("value", "26.29");
urlencoded.append("type_id", "4");

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request PUT 'http://localhost:8080/services?api=product' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=16' \
--data-urlencode 'code=8813268' \
--data-urlencode 'description=Vinagre Balsâmico CASTELO 500ml' \
--data-urlencode 'value=26.29' \
--data-urlencode 'type_id=4'
```

Delete a product - HTTP /DELETE
```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("id", "16");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request DELETE 'http://localhost:8080/services?api=product' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=16'
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

Get product by id - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product&id=2", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=product&id=2'
```

Get the product by code, description or type - HTTP /GET

- JavaScript - Fetch
```
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=product&search=papel", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=product&search=papel'
```

---

### Product types

Insert a new product type - HTTP /POST
- JavaScript - Fetch
```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("name", "Papelaria 2");
urlencoded.append("taxes", "2,3");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=productType", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

- cURL
```
curl --location --request POST 'http://localhost:8080/services?api=productType' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=Papelaria 2' \
--data-urlencode 'taxes=2,3'
```

Update product type data - HTTP /PUT
- JavaScript - Fetch
```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("id", "14");
urlencoded.append("name", "Papelaria");
urlencoded.append("taxes", "2,3");

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=productType", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request PUT 'http://localhost:8080/services?api=productType' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=14' \
--data-urlencode 'name=Papelaria' \
--data-urlencode 'taxes=2,3'
```

Delete a product type - HTTP /DELETE (Note: It will only be deleted if it is not related to another table)
- JavaScript - Fetch
```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("id", "14");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=productType", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

- cURL
```
curl --location --request DELETE 'http://localhost:8080/services?api=productType' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=14'
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

Get product type by id - HTTP /GET

- JavaScript - Fetch
```
var urlencoded = new URLSearchParams();

var requestOptions = {
  method: 'GET',
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=productType&id=3", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=productType&id=3'
```

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
var urlencoded = new URLSearchParams();

var requestOptions = {
  method: 'GET',
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://localhost:8080/services?api=sales&id=2", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
```

- cURL
```
curl --location --request GET 'http://localhost:8080/services?api=sales&id=2'
```
