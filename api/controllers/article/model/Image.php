<?php

class Image implements \JsonSerializable
{
    private int $order;
    private ?string $path;
    private ?string $base64;
    private bool $rootImage;

    /**
     * @param int $order
     * @param string|null $path
     * @param string|null $base64
     * @param bool $rootImage
     */
    public function __construct(int $order, bool $rootImage, ?string $path, ?string $base64)
    {
        $this->order = $order;
        $this->path = $path;
        $this->base64 = $base64;
        $this->rootImage = $rootImage;
    }

    /**
     * @return int
     */
    public function getOrder(): int
    {
        return $this->order;
    }

    /**
     * @return string|null
     */
    public function getPath(): ?string
    {
        return $this->path;
    }

    /**
     * @return int
     */
    public function isRootImage(): int
    {
        return $this->rootImage ? 1 : 0;
    }

    /**
     * @return string|null
     */
    public function getBase64(): ?string
    {
        return $this->base64;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
}
