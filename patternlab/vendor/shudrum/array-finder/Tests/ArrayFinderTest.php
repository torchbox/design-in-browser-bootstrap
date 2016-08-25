<?php

namespace Shudrum\Component\ArrayFinder\Tests;

use Shudrum\Component\ArrayFinder\ArrayFinder;

class ArrayFinderTest extends \PHPUnit_Framework_TestCase
{
    /** @var ArrayFinder */
    private $arrayFinder;

    /**
     * @before
     */
    public function setupComplexArrayFinder()
    {
        $this->arrayFinder = new ArrayFinder([
            'hello',
            'world',
            'a' => [
                'b' => [
                    'c' => 'end',
                ],
                'value_without_key',
                [
                    'value_without_key_bis',
                ]
            ],
            'here' => 'is_a_key',
        ]);
    }

    public function testArrayAccessReading()
    {
        $this->assertEquals('hello', $this->arrayFinder[0]);
    }

    public function testArrayAccessInsertValueWithoutKey()
    {
        $this->arrayFinder[] = '!';
        $this->assertEquals('!', $this->arrayFinder[2]);
    }

    public function testArrayAccessInsertValueWithKey()
    {
        $this->arrayFinder['last'] = '!';
        $this->assertEquals('!', $this->arrayFinder['last']);
    }

    public function testArrayAccessUnset()
    {
        unset($this->arrayFinder[1]);
        $this->assertNull($this->arrayFinder[1]);
    }

    public function testArrayAccessIsset()
    {
        $this->assertEquals(true, isset($this->arrayFinder['here']));
    }

    public function testArrayAccessIssetRecursive()
    {
        $this->assertEquals(true, isset($this->arrayFinder['a.b']));
        $this->assertEquals(true, isset($this->arrayFinder['a.b.c']));
    }

    public function testArrayAccessIssetRecursiveOnNonExistingPath()
    {
        $this->assertEquals(false, isset($this->arrayFinder['a.b.c.d.e']));
    }

    public function testSimpleGet()
    {
        $this->assertEquals('hello', $this->arrayFinder->get('0'));
        $this->assertEquals('hello', $this->arrayFinder->get(0));
    }

    public function testGetWithStringPath()
    {
        $this->assertEquals('end', $this->arrayFinder->get('a.b.c'));
    }

    public function testGetWithIndexPath()
    {
        $this->assertEquals('value_without_key', $this->arrayFinder->get('a.0'));
        $this->assertEquals('value_without_key_bis', $this->arrayFinder->get('a.1.0'));
    }

    public function testArrayAccessReadingWithPath()
    {
        $this->assertEquals('end', $this->arrayFinder['a.b.c']);
    }

    public function testGetReturnNullIfDoesNotExist()
    {
        $this->assertNull($this->arrayFinder->get('a.b.d'));
    }

    public function testSetCorrectlyAddValueToRoot()
    {
        $this->arrayFinder->set('new', 'yeah');
        $this->assertEquals('yeah', $this->arrayFinder['new']);
    }

    public function testSetCorrectlyAddValueIfPathExist()
    {
        $this->arrayFinder->set('a.b.c', 'c_replaced');
        $this->assertEquals('c_replaced', $this->arrayFinder['a.b.c']);
    }

    public function testSetCorrectlyReturnTheInstance()
    {
        $this->assertInstanceOf('\Shudrum\Component\ArrayFinder\ArrayFinder', $this->arrayFinder->set('a', 'b'));
    }

    public function testSetCorrecltyAddValueIfPathDoesNotExist()
    {
        $this->arrayFinder->set('d.e.f', 'f_setted');
        $this->assertEquals('f_setted', $this->arrayFinder['d.e.f']);
    }

    public function testSetCorrectlyAddAnArray()
    {
        $this->arrayFinder->set('b', ['it' => ['works' => ['cool']]]);
        $this->assertEquals('cool', $this->arrayFinder['b.it.works.0']);
    }

    public function testSetCorrectlyReplaceArray()
    {
        $this->arrayFinder->set('a', 'value');
        $this->assertEquals('value', $this->arrayFinder['a']);
    }

    public function testSetEmptyValue()
    {
        $this->arrayFinder->set('a', null);
        $this->assertNull($this->arrayFinder['a']);
    }

    public function testSetEmptyArray()
    {
        $this->arrayFinder->set('this.is.empty', []);
        $this->assertEmpty($this->arrayFinder['this.is.empty']);
    }

    public function testCount()
    {
        $this->assertEquals(4, count($this->arrayFinder));
    }

    public function testArrayAccessReference()
    {
        $this->arrayFinder['access'] = 'work';
        $this->assertEquals('work', $this->arrayFinder->get('access'));
    }

    public function testIteratorImplementation()
    {
        $id = 0;
        foreach ($this->arrayFinder as $key => $value) {
            switch ($id) {
                case 0:
                    $this->assertEquals(0, $key);
                    $this->assertEquals('hello', $value);
                    break;
                case 2:
                    $this->assertEquals('a', $key);
                    $this->assertCount(3, $value);
                    break;
            }
            $id++;
        }
    }

    public function testSerializableImplementation()
    {
        $serialized = serialize($this->arrayFinder);

        /** @var ArrayFinder $newArrayFinder */
        $newArrayFinder = unserialize($serialized);

        $this->assertEquals('end', $newArrayFinder['a.b.c']);
    }

    public function testArrayAccessUnsetWithPath()
    {
        unset($this->arrayFinder['a.b']);
        $this->assertNull($this->arrayFinder['a.b']);
    }

    public function testArrayAccessUnsetWithInt()
    {
        unset($this->arrayFinder['a.1']);
        $this->assertNull($this->arrayFinder['a.1']);
    }

    public function testCountOnFirstAccess()
    {
        $this->assertCount(1, $this->arrayFinder['a.b']);
    }

    public function testChangeSeparator()
    {
        $this->arrayFinder->changeSeparator('/');
        $this->assertEquals('value_without_key_bis', $this->arrayFinder->get('a/1/0'));
        $this->assertEquals('value_without_key_bis', $this->arrayFinder['a/1/0']);
    }

    public function testChangeSeparatorReturnTheInstance()
    {
        $this->assertInstanceOf(
            '\Shudrum\Component\ArrayFinder\ArrayFinder',
            $this->arrayFinder->changeSeparator('/')
        );
    }

    public function testArrayAccessAddValueToRoot()
    {
        $arrayFinder = new ArrayFinder();
        $arrayFinder[] = 'added';

        $this->assertCount(1, $arrayFinder);
        $this->assertEquals('added', $arrayFinder[0]);
    }

    public function testGetWithoutParamWillReturnAllTheArray()
    {
        $content = $this->arrayFinder->get();

        $this->assertEquals('end', $content['a']['b']['c']);
    }

    public function testGetAcceptsADefaultArgument()
    {
        // ensure the default value is not returned when
        // the array does have the key
        $this->assertEquals(
            "is defined",
            (new ArrayFinder(["some" => ["key" => "is defined"]]))->get("some.key", "default value")
        );

        // ensure that when the key is not defined, the default
        // value is used
        $this->assertEquals(
            "default value",
            (new ArrayFinder([]))->get("some.key", "default value")
        );
    }
}
