# ObjectWatcher
Display object number-properties in realtime, multiple objects can be tracked. Fields updated by changing values, `watcher.intevral` is the number of update calls to skip if required.

![alt text](https://mevedia.com/img/ObjectWatcher.jpg)


Pseudo-code example:
`
const watcher = new ObjectWatcher;

watcher.add('THREE Memory', renderer.info.memory);

`
