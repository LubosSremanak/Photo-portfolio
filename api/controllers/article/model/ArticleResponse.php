<?php

class ArticleResponse implements \JsonSerializable
{
    private string $result;
    private string $operation;

    /**
     * @param string $result
     * @param string $operation
     */
    public function __construct(string $result, string $operation)
    {
        $this->result = $result;
        $this->operation = $operation;
    }

    /**
     * @return string
     */
    public function getResult(): string
    {
        return $this->result;
    }

    /**
     * @return string
     */
    public function getOperation(): string
    {
        return $this->operation;
    }


    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
}