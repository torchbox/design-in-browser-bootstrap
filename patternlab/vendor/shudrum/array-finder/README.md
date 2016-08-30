[![Build Status](https://travis-ci.org/Shudrum/ArrayFinder.svg?branch=master)](https://travis-ci.org/Shudrum/ArrayFinder)

#ArrayFinder Component

The ArrayFinder component allow you to manage large nested arrays with ease.

Here is a simple example that shows how to easily get a value from an array:

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder([
    'level_1' => [
        'level_2' => [
            'level_3' => 'value',
        ],
    ],
]);

$myValue = $arrayFinder->get('level_1.level_2.level_3');
// OR
$myValue = $arrayFinder['level_1.level_2.level_3'];
```

To install this package, you can simply use composer:

```
composer require shudrum/array-finder
```

##Documentation

###Methods

####get($path)

You can get a value following a path separated by a '.'.

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder([
    'a' => [
        'b' => [
            'c' => 'value1',
        ],
        'value2',
    ],
    'value3',
]);

$myValue = $arrayFinder->get('a.b.c'); // value1
$myValue = $arrayFinder->get('a.0'); // value2
$myValue = $arrayFinder->get(0); // value3
```

If the path is `null`, all the content will be returned.

####set($path, $value)

You can add a value to a specific path separated by a '.'. If the nested arrays does not exists, it will be created.

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder();
$arrayFinder->set('a.b', 'value');

$arrayFinder->get(); // ['a' => ['b' => 'value]]
```

####changeSeparator($separator)

If the default separator (.) does not fit to your needs, you can call this method to change it.

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder([…]);

$myValue = $arrayFinder->changeSeparator('/');
$myValue = $arrayFinder->get('a/b/c');
```

###Implementations

The ArrayFinder component implements some usefull interfaces:

####ArrayAccess

You can use this object like an array:

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder([…]);

$value = $arrayFinder['a.b'];
$arrayFinder['a.b.c'] = 'value';
unset($arrayFinder['a.b']);
```

####Countable

You can use count on this object:

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder([…]);

count($arrayFinder);
count($arrayFinder['a.b']);
```

####Iterator

You can iterate on this object:

```php
use Shudrum\Component\ArrayFinder\ArrayFinder;

$arrayFinder = new ArrayFinder([…]);

foreach ($arrayFinder as $key => $value) {
    // …
}
```

####Serializable

You can easily serialize / unserialize this object.

##Resources

You can run the unit tests with the following command:

    $ cd path/to/Shudrum/Component/ArrayFinder/
    $ composer install
    $ phpunit
