<?php
require_once("../../database/DatabaseService.php");
require_once("./model/UserHash.php");
require_once("../../helpers/ChromePhp.php");

class RegisterController extends DatabaseService
{
    public function register(UserHash $user): void
    {
        $query = "INSERT INTO user (name, password) VALUES (:name, :password)";
        $bindParameters = [":name" => $user->getName(), ":password" => $user->getPassword()];
        $this->addToDatabase($query, $bindParameters);
    }
}

$registerController = new RegisterController();
$userHash = new UserHash("natalia", "password");
$registerController->register($userHash);