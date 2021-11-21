<?php
require_once("config.php");

abstract class DatabaseService
{

    protected PDO $connection;

    public function __construct()
    {
        $this->connection = new PDO("mysql:host=" . DB_HOST . "; port=" . DB_PORT . "; dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    protected function loadFromDatabase($query, $bindParameters): array
    {
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute($bindParameters);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            return $statement->fetchAll();
        } catch (Exception $exception) {
            throw new Exception($exception);
        }
    }

    protected function addToDatabase($query, $bindParameters): string
    {
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute($bindParameters);
            return $this->connection->lastInsertId();
        } catch (Exception $exception) {
            throw new Exception($exception);
        }

    }

}

/*
 * Addons
 * extends DatabaseConnector
    public function __construct()
    {
        parent::__construct();
    }
 * */
