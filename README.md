# ObjectWatcher
Display object number-properties in realtime, multiple objects can be tracked. Fields updated by changing values, `watcher.interval` is the number of update calls to skip if required.

![alt text](https://mevedia.com/img/ObjectWatcher.jpg?v1)


Pseudo-code example:
```
const watcher = new ObjectWatcher;

watcher.add('THREE Memory', renderer.info.memory);
```
In your render frame call:

```
watcher.update();
```

Place it in desired corner of the screen with:

```
watcher.place('bottomLeft'); // topLeft, topRight, bottomLeft, bottomRight
```
