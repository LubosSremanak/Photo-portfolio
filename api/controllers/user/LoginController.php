<?php
require_once("../../database/DatabaseService.php");
require_once("./model/UserHash.php");
require_once("./model/User.php");
require_once("../../helpers/ChromePhp.php");
require_once("../../helpers/cors.php");

class LoginController extends DatabaseService
{

    /**
     * @throws JsonException
     */
    public function login(): void
    {
        $logger = $this->getLogger();
        $isPasswordCorrect = $this->checkPassword($logger);
        if ($isPasswordCorrect) {
            $_SESSION["logged"] = $logger->getName();
            echo $this->success($logger->getName());
        } else {
            echo $this->failure($logger->getName());
        }

    }

    /**
     * @throws JsonException
     */
    private function getLogger(): User
    {
        $logger = file_get_contents("php://input");
        $user = json_decode($logger, false, 512, JSON_THROW_ON_ERROR);
        return new User($user->name, $user->password);
    }

    /**
     * @throws JsonException
     */
    private function getChangePasswordRequest(): object
    {
        $logger = file_get_contents("php://input");
        $request = json_decode($logger, false, 512, JSON_THROW_ON_ERROR);
        $userRequest = $request->user;
        $user = new User($userRequest->name, $userRequest->password);
        $newPassword = $request->newPassword;
        return (object)["user" => $user, "newPassword" => $newPassword];
    }

    private function checkPassword(User $logger): bool
    {
        try {
            $user = $this->findUserByName($logger->getName());
            return password_verify($logger->getPassword(), $user->getPassword());
        } catch (Error $error) {
            return false;
        }

    }

    private function findUserByName($name): User
    {
        $query = "SELECT * FROM user WHERE name=:name";
        $bindParameters = [":name" => $name];
        $pdoUser = $this->loadFromDatabase($query, $bindParameters)[0];
        return new User($pdoUser["name"], $pdoUser["password"]);
    }

    /**
     * @throws JsonException
     */
    private function success($name): string
    {
        $response = array(
            "success" => true,
            "name" => $name
        );
        return json_encode($response, JSON_THROW_ON_ERROR);
    }

    /**
     * @throws JsonException
     */
    private function failure($name): string
    {
        $response = array(
            "success" => false,
            "name" => $name
        );
        return json_encode($response, JSON_THROW_ON_ERROR);
    }

    public function logout(): void
    {
        session_destroy();
    }

    /**
     * @throws JsonException
     */
    public function isLogged(): string
    {
        $response = array(
            "isLogged" => isset($_SESSION["logged"]),
            "name" => $_SESSION["logged"]);
        return json_encode($response, JSON_THROW_ON_ERROR);
    }

    /**
     * @throws JsonException
     */
    public function changePassword()
    {
        $passwordRequest = $this->getChangePasswordRequest();
        $isPasswordCorrect = $this->checkPassword($passwordRequest->user);
        $userName = $passwordRequest->user->getName();
        if ($isPasswordCorrect) {
            $user = new UserHash($userName, $passwordRequest->newPassword);
            $this->updateUserPassword($user);
            echo $this->success($userName);
        } else {
            echo $this->failure($passwordRequest->user->getName());
        }
    }

    private function updateUserPassword(UserHash $user): void
    {
        $query = "UPDATE user SET password=:password where name=:name;";
        $bindParameters = [
            ":name" => $user->getName(),
            ":password" => $user->getPassword()];
        $this->addToDatabase($query, $bindParameters);
    }

}

cors();
$loginController = new LoginController();
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $loginController->login();
    } catch (JsonException $e) {
        echo json_encode("Login error", JSON_THROW_ON_ERROR);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        $loginController->changePassword();
    } catch (JsonException $e) {
        echo json_encode("Change password error", JSON_THROW_ON_ERROR);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        echo $loginController->isLogged();
    } catch (JsonException $e) {
        echo json_encode("Session error", JSON_THROW_ON_ERROR);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $loginController->logout();
    } catch (JsonException $e) {
        echo json_encode("Logout error", JSON_THROW_ON_ERROR);
    }
}
