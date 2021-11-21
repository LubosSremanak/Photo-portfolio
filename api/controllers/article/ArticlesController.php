<?php

require_once("../../database/DatabaseService.php");
require_once("../../helpers/ChromePhp.php");
require_once("./model/Article.php");
require_once("./model/Image.php");
require_once("./model/ArticleResponse.php");
require_once("../../helpers/cors.php");

class ArticlesController extends DatabaseService
{
    /**
     * @throws JsonException
     * @throws Exception
     */
    public function addArticle(): void
    {
        $this->createDirectory();
        $article = $this->getResponseArticle();
        $query = "INSERT INTO article (title, about, next_article1, next_article2,article_order) VALUES (:title, :about, :next_article1, :next_article2,:article_order)";
        $bindParameters = [
            ":title" => $article->getTitle(),
            ":about" => $article->getAbout(),
            ":next_article1" => $this->getArticleIdByTitle($article->getNextArticleTitle1()),
            ":next_article2" => $this->getArticleIdByTitle($article->getNextArticleTitle2()),
            ":article_order" => $article->getOrder(),
        ];
        try {
            $articleId = $this->addToDatabase($query, $bindParameters);
            $this->addImages($article->getImages(), $articleId);
        } catch (Exception $exception) {
            throw new Exception("unique-title");
        }
    }

    private function createDirectory(): void
    {
        $path = $_SERVER["DOCUMENT_ROOT"] . "/photos";
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
    }

    /**
     * @throws JsonException
     */
    private function getResponseArticle(): Article
    {
        $response = file_get_contents("php://input");
        $responseArticle = json_decode($response, false, 512, JSON_THROW_ON_ERROR);
        $article = new Article($responseArticle->title, $responseArticle->about, $responseArticle->order);
        $article->addNextArticles($responseArticle->nextArticleTitle1, $responseArticle->nextArticleTitle2);
        $article->addImages($responseArticle->images);
        $article->setTitleBeforeEdit($responseArticle->titleBeforeEdit);
        return $article;
    }

    /**
     * @throws Exception
     */
    private function addImages(?array $images, int $articleId): void
    {
        if (!$images) {
            return;
        }
        foreach ($images as $image) {
            $this->addImage($image, $articleId);

        }
    }

    /**
     * @throws Exception
     */
    private function addImage(Image $image, int $articleId): void
    {
        if (!$image->getBase64()) {
            return;
        }

        $query = "INSERT INTO image (image, article_order, article_id, root_image) VALUES (:image, :article_order, :article_id, :root_image)";
        $bindParameters = [
            ":image" => "",
            ":article_order" => $image->getOrder(),
            ":article_id" => $articleId,
            ":root_image" => $image->isRootImage(),
        ];
        $id = $this->addToDatabase($query, $bindParameters);
        $path = $this->uploadImage($image->getBase64(), $id);
        $this->updateImagePathById($id, $path);
    }

    /**
     * @throws Exception
     */
    private function updateImagePathById(int $id, string $path): void
    {
        $query = "UPDATE image SET image=:image WHERE id=:id";
        $bindParameters = [
            ":id" => $id,
            ":image" => $path,
        ];
        $this->addToDatabase($query, $bindParameters);
    }

    private function uploadImage($base64_string, $id): string
    {
        $path = '/photos/' . $id . '.jpg';
        $ifp = fopen($_SERVER["DOCUMENT_ROOT"] . $path, 'wb');
        $data = explode(',', $base64_string);
        fwrite($ifp, base64_decode($data[1]));
        fclose($ifp);
        return $path;
    }

    /**
     * @throws JsonException
     * @throws Exception
     */
    public function editArticle(): void
    {
        $article = $this->getResponseArticle();
        if ($article->isTitleChanged()) {
            $this->editArticleWithTitleChange($article);
        } else {
            $this->editArticleWithoutTitleChange($article);
        }

    }

    /**
     * @throws Exception
     */
    public function editArticleWithTitleChange($article): void
    {
        $query = "UPDATE article SET title=:title, about=:about, next_article1=:next_article1, next_article2=:next_article2 WHERE title=:titleBeforeEdit";
        $bindParameters = [
            ":title" => $article->getTitle(),
            ":about" => $article->getAbout(),
            ":next_article1" => $this->getArticleIdByTitle($article->getNextArticleTitle1()),
            ":next_article2" => $this->getArticleIdByTitle($article->getNextArticleTitle2()),
            ":titleBeforeEdit" => $article->getTitleBeforeEdit(),
        ];
        $this->addToDatabase($query, $bindParameters);
        $articleId = $this->getArticleIdByTitle($article->getTitle());
        $this->editImages($article->getImages(), $articleId);

    }

    /**
     * @throws Exception
     */
    public function editArticleWithoutTitleChange($article): void
    {
        $query = "UPDATE article SET about=:about, next_article1=:next_article1, next_article2=:next_article2 WHERE title=:title";
        $bindParameters = [
            ":title" => $article->getTitle(),
            ":about" => $article->getAbout(),
            ":next_article1" => $this->getArticleIdByTitle($article->getNextArticleTitle1()),
            ":next_article2" => $this->getArticleIdByTitle($article->getNextArticleTitle2()),
        ];
        $this->addToDatabase($query, $bindParameters);
        $articleId = $this->getArticleIdByTitle($article->getTitleBeforeEdit());
        $this->editImages($article->getImages(), $articleId);
    }


    /**
     * @throws Exception
     */
    public function getArticleIdByTitle(?string $title): ?int
    {
        if (!$title) {
            return null;
        }
        $query = "SELECT id FROM article WHERE title=:title";
        $bindParameters = [":title" => $title];
        $pdoArticle = $this->loadFromDatabase($query, $bindParameters)[0];
        return $pdoArticle['id'];
    }

    /**
     * @throws Exception
     */
    private function editImages(?array $images, int $articleId): void
    {
        $pdoImages = $this->getAllArticleImages($articleId);
        if ($pdoImages) {
            $this->removeDeletedImages($articleId, $pdoImages, $images);
        }
        $this->addImages($images, $articleId);

    }

    private function editImage($pdoImage, Image $image): void
    {
        $query = "UPDATE image SET article_order=:articleOrder,root_image=:root WHERE image=:path";
        $bindParameters = [
            ":path" => $pdoImage['image'],
            ":root" => $image->isRootImage(),
            ":articleOrder" => $image->getOrder()];
        $this->addToDatabase($query, $bindParameters);
    }

    private function findImage(?array $images, $searchImage): ?Image
    {
        foreach ($images as $image) {
            if ($searchImage['image'] === $image->getPath()) {
                return $image;
            }
        }
        return null;
    }

    /**
     * @throws JsonException
     */
    public function reorderArticles(): void
    {
        $order = $this->getResponseOrder();
        $key = 1;
        foreach ($order as $articleOrder) {
            $this->updateArticleOrder($articleOrder->title, $key);
            $key++;
        }

    }


    private function updateArticleOrder($title, $order): void
    {
        $query = "UPDATE article SET article_order=:articleOrder WHERE title=:title";
        $bindParameters = [
            ":articleOrder" => $order,
            ":title" => $title];
        $this->addToDatabase($query, $bindParameters);
    }

    /**
     * @throws JsonException
     */
    private function getResponseOrder(): array
    {
        $response = file_get_contents("php://input");
        return json_decode($response, false, 512, JSON_THROW_ON_ERROR);
    }

    private function getImageByPath(?array $images, $path): ?Image
    {
        foreach ($images as $image) {
            if ($path === $image->getPath()) {
                return $image;
            }
        }
        return null;
    }

    /**
     * @throws Exception
     */
    private function getAllArticleImages($articleId): array
    {
        $query = "SELECT * FROM image WHERE article_id=:articleId";
        $bindParameters = [":articleId" => $articleId];
        return $this->loadFromDatabase($query, $bindParameters);
    }

    /**
     * @throws JsonException
     * @throws Exception
     */
    public function getAllArticles(): string
    {
        $query = "SELECT * FROM article ORDER BY article_order";
        $pdoArticles = $this->loadFromDatabase($query, []);
        $articles = [];
        foreach ($pdoArticles as $pdoArticle) {
            $article = $this->createArticle($pdoArticle);
            $articles[] = $article;
        }
        return json_encode($articles, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);

    }

    private function createArticle($pdoArticle): ?Article
    {
        try {
            $article = new Article($pdoArticle['title'], $pdoArticle['about'], $pdoArticle['article_order']);
            $nextArticleTitle1 = $this->findArticleTitleById($pdoArticle['next_article1']);
            $nextArticleTitle2 = $this->findArticleTitleById($pdoArticle['next_article2']);
            $article->addNextArticles($nextArticleTitle1, $nextArticleTitle2);
            $article->addImages($this->findArticleImagesById($pdoArticle['id']));
            return $article;
        } catch (Error $error) {
            return null;
        }

    }


    private function findArticleTitleById(?int $id): ?string
    {
        if (!$id) {
            return null;
        }
        $query = "SELECT * FROM article WHERE id=:id";
        $bindParameters = [":id" => $id];
        $pdoArticle = $this->loadFromDatabase($query, $bindParameters)[0];
        return $pdoArticle['title'];
    }


    private function findArticleImagesById(int $id): array
    {
        $query = "SELECT * FROM image WHERE article_id=:id";
        $bindParameters = [":id" => $id];
        $pdoImages = $this->loadFromDatabase($query, $bindParameters);
        return $this->createImages($pdoImages);
    }

    private function createImages(?array $pdoImages): ?array
    {
        if (count($pdoImages) < 0) {
            return null;
        }
        $images = [];
        foreach ($pdoImages as $image) {
            $images[] = new Image($image['article_order'], $image ['root_image'], $image['image'], null);
        }
        return $images;
    }


    /**
     * @throws Exception
     */
    public function deleteArticle(): void
    {
        $title = $this->getResponseArticleTitle();
        $articleId = $this->getArticleIdByTitle($title);
        $images = $this->findArticleImagesById($articleId);
        $this->deleteAllPhotos($images);
        $query = "DELETE FROM article WHERE title=:title";
        $bindParameters = [":title" => $title];
        $this->addToDatabase($query, $bindParameters)[0];
    }

    /**
     * @throws Exception
     */
    public function deleteImage($articleId, $path): void
    {
        $this->deletePhoto($path);
        $query = "DELETE FROM image WHERE article_id=:articleId AND image=:image";
        $bindParameters = [":articleId" => $articleId, ":image" => $path];
        $pdoArticle = $this->addToDatabase($query, $bindParameters)[0];
    }

    /**
     * @throws Exception
     */
    public function removeDeletedImages($articleId, array $pdoImages, ?array $images): void
    {
        foreach ($pdoImages as $pdoImage) {
            $image = $this->findImage($images, $pdoImage);
            if ($image !== null) {
                $this->editImage($pdoImage, $image);
            } else {
                $this->deleteImage($articleId, $pdoImage['image']);
            }
        }
    }

    private function deletePhoto($path): void
    {
        if (file_exists($_SERVER["DOCUMENT_ROOT"] . $path)) {
            unlink($_SERVER["DOCUMENT_ROOT"] . $path);
        }
    }


    private function deleteAllPhotos(array $images): void
    {
        foreach ($images as $image) {
            $this->deletePhoto($image->getPath());
        }
    }

    public function getResponseImagePath(): string
    {
        return $_GET["path"];
    }

    public function getResponseArticleTitle(): string
    {
        return $_GET["title"];
    }

    /**
     * @throws JsonException
     * @throws Exception
     */
    public function getArticle(): string
    {
        $title = $this->getResponseArticleTitle();
        $query = "SELECT * FROM article WHERE title=:title";
        $bindParameters = [":title" => $title];
        $pdoArticle = $this->loadFromDatabase($query, $bindParameters)[0];
        $article = $this->createArticle($pdoArticle);
        if ($article) {
            return json_encode($article, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
        }
        return json_encode('Article doesnt exist', JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    }
}

cors();
$articlesController = new ArticlesController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $articlesController->addArticle();
        echo json_encode(new ArticleResponse("successfully", "add"), JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        echo json_encode(new ArticleResponse("unique-title", "add"), JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {

        if (isset($_GET["order"])) {
            $articlesController->reorderArticles();
        } else {
            $articlesController->editArticle();
        }
        echo json_encode(new ArticleResponse("successfully", "edit"), JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        echo json_encode("Edit article error", JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        if (isset($_GET["title"])) {
            echo $articlesController->getArticle();
        } else {
            echo $articlesController->getAllArticles();
        }

    } catch (Exception $e) {
        echo json_encode("All articles error", JSON_THROW_ON_ERROR);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        if (isset($_GET["title"], $_GET["path"])) {
            $title = $articlesController->getResponseArticleTitle();
            $path = $articlesController->getResponseImagePath();
            $articleId = $articlesController->getArticleIdByTitle($title);
            $articlesController->deleteImage($articleId, $path);
        } else if (isset($_GET["title"])) {
            $articlesController->deleteArticle();
        }
        echo json_encode(new ArticleResponse("successfully", "delete"), JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        echo json_encode("Delete article error", JSON_THROW_ON_ERROR);
    }
}
