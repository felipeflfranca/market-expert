<?php
namespace App\Interfaces;

interface HttpRequestService {
    public function get(?array $data): array;
    public function post(): string;
    public function put(): string;
    public function delete(): string;
}