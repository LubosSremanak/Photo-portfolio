<?php

class Article implements \JsonSerializable
{
    private ?string $titleBeforeEdit;
    private string $title;
    private string $about;
    private ?string $nextArticleTitle1;
    private ?string $nextArticleTitle2;
    private ?array $images;
    private ?int $order;


    /**
     * @param string $title
     * @param string $about
     * @param int|null $order
     */
    public function __construct(string $title, string $about, ?int $order)
    {
        $this->title = $title;
        $this->about = $about;
        $this->order = $order;
        $this->images = null;
        $this->setTitleBeforeEdit(null);
    }

    /**
     * @return int|null
     */
    public function getOrder(): ?int
    {
        return $this->order;
    }

    /**
     * @return string
     */
    public function getTitleBeforeEdit(): string
    {
        return $this->titleBeforeEdit;
    }

    /**
     * @param string|null $titleBeforeEdit
     */
    public function setTitleBeforeEdit(?string $titleBeforeEdit): void
    {
        $this->titleBeforeEdit = $titleBeforeEdit;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getAbout(): string
    {
        return $this->about;
    }

    /**
     * @return string|null
     */
    public function getNextArticleTitle1(): ?string
    {
        return $this->nextArticleTitle1;
    }

    /**
     * @return string|null
     */
    public function getNextArticleTitle2(): ?string
    {
        return $this->nextArticleTitle2;
    }

    public function addImages(array $images): void
    {

        if (!$images) {
            return;
        }
        foreach ($images as $image) {
            if ($image instanceof Image) {
                $this->addImage($image);
            } else {
                $this->addImage(new Image($image->order, $image->rootImage, $image->path ?? null, $image->base64));
            }

        }
    }

    public function addImage(Image $image): void
    {
        $this->images[] = $image;
    }

    /**
     * @return array
     */
    public function getImages(): ?array
    {
        return $this->images;
    }

    public function addNextArticles(?string $nextArticleTitle1, ?string $nextArticleTitle2): void
    {
        $this->nextArticleTitle1 = $nextArticleTitle1;
        $this->nextArticleTitle2 = $nextArticleTitle2;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    public function isTitleChanged(): bool
    {
        return !($this->title === $this->titleBeforeEdit);
    }
}
