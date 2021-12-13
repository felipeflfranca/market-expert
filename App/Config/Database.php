<?php
namespace App\Config;

use Exception;
use PDO;
use PDOStatement;

/** Database Configuration */
class Database
{
    /*
    |----------------------------------------------------------------------------------------------
    | Database Configuration
    |----------------------------------------------------------------------------------------------
    |
    | Values used in database access configuration
    */
    private string $dbName = 'marketexpert';    // @var string $dbName Database name
    private string $dbUser = 'postgres';        // @var string $dbUser Database access user
    private string $dbPassword = '100@cesso';   // @var string $dbPassword Database access password
    private string $dbHost = '127.0.0.1';       // @var string $dbHost Host address
    private int $dbPort = 5432;                 // @var int $dbPort Host address

    /** @var PDO Store the connection */
    private PDO $conn;

    /** The $conn variable is assigned the database connection when instantiating the class */
    public function __construct()
    {
        $this->conn = new PDO("pgsql:dbname=$this->dbName;host=$this->dbHost;port=$this->dbPort;user=$this->dbUser;password=$this->dbPassword;options='--client_encoding=UTF8'");
    }

    /**
     * This method takes an object with a 'prepared' query and assigns as keys to their respective values.
     * @param PDOStatement $stmt Contains the query already 'prepared'.
     * @param string $key It is the same key informed in the query.
     * @param string $value Value of a specified key.
     */
    private function setParameters(PDOStatement $stmt, string $key, string $value)
    {
        $stmt->bindParam($key, $value);
    }

    /**
     * The method's responsibility is just iterating the array with the parameters
     * getting the keys and values to supply such data to setParameters().
     * @param PDOStatement $stmt Contains the query already 'prepared'.
     * @param array $parameters Associative array containing key and values to provide the query
     */
    private function mountQuery(PDOStatement $stmt, array $parameters)
    {
        foreach( $parameters as $key => $value ) {
            $this->setParameters($stmt, $key, $value);
        }
    }

    /**
     * This method is responsible for receiving the query and the parameters, preparing the query
     * to receive the values of the informed parameters, call the mountQuery method,
     * execute a query and return to the methods to handle the result.
     * @param string $query SQL statement that will be executed on the database.
     * @param array $parameters Associative array containing the keys informed in the query and their respective values
     * @return PDOStatement
     * @throws Exception
     */
    public function executeQuery(string $query, array $parameters = []): PDOStatement
    {
        $stmt = $this->conn->prepare($query);
        $this->mountQuery($stmt, $parameters);
        $stmt->execute();

        return $stmt;
    }

    public function beginTransaction()
    {
        $this->conn->beginTransaction();
    }

    public function commit()
    {
        $this->conn->commit();
    }

    public function rollBack()
    {
        $this->conn->rollBack();
    }

    public function lastInsertId()
    {
        return $this->conn->lastInsertId();
    }
}