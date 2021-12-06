<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8c5d88e659d9540daf74affddbde7fda
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/App',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8c5d88e659d9540daf74affddbde7fda::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8c5d88e659d9540daf74affddbde7fda::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit8c5d88e659d9540daf74affddbde7fda::$classMap;

        }, null, ClassLoader::class);
    }
}