<?php
namespace App\Helpers\Database;

class BuiltModel
{
    private string $query;
    private array $parameters;

    function __construct(string $query, array $parameters) {
        $this->query = $query;
        $this->parameters = $parameters;
    }

    public function query()
    {
        return $this->query;
    }

    public function parameters()
    {
        return $this->parameters;
    }
}