# Market Expert (REST API PHP and React with typescript + Material UI)
This is a demonstration of using React with typescript + Material UI and a REST API backend made in pure PHP with PostgreSQL database.

## Developer

Felipe França [@felipe-longo-franca](https://www.linkedin.com/in/felipe-longo-franca/)

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

## How to run the application
Open the terminal from within the project directory or navigate to it and run the following command:
```
php -S localhost:8080 -t ./public/
```
