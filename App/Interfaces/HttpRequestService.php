<?php
namespace App\Interfaces;

interface HttpRequestService {
    public function get(?array $data): array;
    public function post(): array;
    public function put(): array;
    public function delete(): array;
}