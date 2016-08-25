<?php

namespace Shudrum\Component\ArrayFinder;

class ArrayFinder implements
    \ArrayAccess,
    \Countable,
    \Iterator,
    \Serializable
{
    private $content = [];
    private $position = 0;
    private $pathSeparator = '.';

    /**
     * ArrayFinder constructor.
     *
     * @param array $content Content of the array
     */
    public function __construct(array $content = [])
    {
        $this->content = $content;
    }

    /**
     * {@inheritdoc}
     */
    public function offsetExists($offset)
    {
        if (strpos($offset, $this->pathSeparator) !== false) {

            $explodedPath = explode($this->pathSeparator, $offset);
            $lastOffset = array_pop($explodedPath);

            $offsetExists = false;
            $containerPath = implode($this->pathSeparator, $explodedPath);

            $this->callAtPath($containerPath, function($container) use ($lastOffset, &$offsetExists) {
                $offsetExists = isset($container[$lastOffset]);
            });

            return $offsetExists;

        } else {
            return isset($this->content[$offset]);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function offsetGet($offset)
    {
        return $this->get($offset);
    }

    /**
     * {@inheritdoc}
     */
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->content[] = $value;
        } else {
            $this->content[$offset] = $value;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function offsetUnset($offset)
    {
        $path = explode($this->pathSeparator, $offset);
        $pathToUnset = array_pop($path);

        $this->callAtPath(implode($this->pathSeparator, $path), function(&$offset) use (&$pathToUnset) {
            unset($offset[$pathToUnset]);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function count()
    {
        return count($this->content);
    }

    /**
     * {@inheritdoc}
     */
    public function current()
    {
        $keys = array_keys($this->content);
        return $this->content[$keys[$this->position]];
    }

    /**
     * {@inheritdoc}
     */
    public function next()
    {
        ++$this->position;
    }

    /**
     * {@inheritdoc}
     */
    public function key()
    {
        $keys = array_keys($this->content);
        return $keys[$this->position];
    }

    /**
     * {@inheritdoc}
     */
    public function valid()
    {
        $keys = array_keys($this->content);
        return isset($keys[$this->position]);
    }

    /**
     * {@inheritdoc}
     */
    public function rewind()
    {
        $this->position = 0;
    }

    /**
     * {@inheritdoc}
     */
    public function serialize() {
        return serialize($this->content);
    }

    /**
     * {@inheritdoc}
     */
    public function unserialize($content) {
        $this->content = unserialize($content);
    }

    /**
     * Change the path separator of the array wrapper.
     *
     * By default, the separator is: .
     *
     * @param string $separator Separator to set.
     *
     * @return ArrayFinder Current instance.
     */
    public function changeSeparator($separator)
    {
        $this->pathSeparator = $separator;
        return $this;
    }

    /**
     * Return a value from the array corresponding to the path.
     * If the path is not set in the array, then $default is returned.
     *
     * ex:
     * $a = ['a' => ['b' => 'yeah']];
     * echo $this->get('a.b'); // yeah
     * echo $this->get('a.b.c', 'nope'); // nope
     *
     * @param string|int|null $path Path to the value. If null, return all the content.
     * @param mixed $default Default value to return when path is not contained in the array.
     *
     * @return mixed|null Value on the array corresponding to the path, null if the key does not exist.
     */
    public function get($path = null, $default = null)
    {
        if ($path === null) {
            return $this->content;
        }

        $value = $default;
        $this->callAtPath($path, function(&$offset) use (&$value) {
            $value = $offset;
        });

        return $value;
    }

    /**
     * Insert a value to the array at the specified path.
     *
     * ex:
     * $this->set('a.b', 'yeah); // ['a' => ['b' => 'yeah']]
     *
     * @param string $path Path where the values will be insered.
     * @param mixed $value Value ti insert.
     *
     * @return ArrayFinder Current instance.
     */
    public function set($path, $value)
    {
        $this->callAtPath($path, function(&$offset) use ($value) {
            $offset = $value;
        }, true);

        return $this;
    }

    private function callAtPath($path, callable $callback, $createPath = false, &$currentOffset = null)
    {
        if ($currentOffset === null) {
            $currentOffset = &$this->content;

            if (is_string($path) && $path == '') {
                $callback($currentOffset);
                return;
            }
        }

        $explodedPath = explode($this->pathSeparator, $path);
        $nextPath = array_shift($explodedPath);

        if (!isset($currentOffset[$nextPath])) {
            if ($createPath) {
                $currentOffset[$nextPath] = [];
            } else {
                return;
            }
        }

        if (count($explodedPath) > 0) {
            $this->callAtPath(
                implode($this->pathSeparator, $explodedPath),
                $callback,
                $createPath,
                $currentOffset[$nextPath]
            );
        } else {
            $callback($currentOffset[$nextPath]);
        }
    }
}
