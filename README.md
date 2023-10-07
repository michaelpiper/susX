# SusX Library

## Author
Michael Piper

This library provides classes for managing subscriptions, objects, and event-driven behavior. It includes the following components:

- `SusXObject`
- `SusXObserver`
- `SusXSubscription`
- `SusX`
- `SusXChangeObserver`

## Usage

```javascript
import {
  SusXObject,
  SusXObserver,
  SusXSubscription,
  SusX,
  SusXChangeObserver
} from 'susx';

// ... (code continues)
```

## SusX

### Example Usage:

```javascript
const susX = new SusX(1);
/// available command are
/// 1) ctx.on() // will turn on the observer
/// 2) ctx.off() // will turn off the observer
/// 3) ctx.once() // will turn on the observer once and them remove it immediately after
const ctx: SusXChangeObserver<typeof susX> = susX.valueChange((value)=>{
  console.log('value change', value);
  assert(susX.value === value, 'value should be ' + susX.value);
}).on();

susX.on('do not wait', async (value)=>{
  await susX.delay(20);
  console.log('do not wait first listener', value);
});

susX.on('do not wait', async (value)=>{
  await susX.delay(10);
  console.log('do not wait second listener', value);
});

await t.test("it would run the event in parallel and not wait for result", async function () {
  susX.emit('do not wait', 'emit');
});

await t.test("it would run the event parallel and await for each listener to finish before the next", async function () {
  await susX.tap('do not wait', 'tap');
});

await t.test("it would run the event concurrently and await for all listener to finish",async  function () {
  await susX.broadcast('do not wait', 'broadcast');
  console.log('"do not wait second" will print before "do not wait first" broadcast complete',);
});

// More code...
```

## SusXSubscription

### Example Usage:

```javascript
const test1 = new SusXSubscription();

await test1.delay(200);

const logText: SusXObserver = test1.subscribe('long-text');

logText.on('data', (data) => {
  console.log(data);
  assert(data === text[currentText], 'Text Chunk should be same as source value' + " source=" + text[currentText]);
});

logText.on('end', () => {
  console.log('Long Text End');
});

for(let chunk of text){
  await test1.broadcast('long-text', chunk);
}

test1.off('long-text');

// More code...
```

## SusXObject

### Example Usage:

```javascript
const test1 = new SusXObject();

setTimeout(async function () {
  console.log('waited for 2s to broadcast result hi');
  test1.setObject({ hi: 'hi' }).putObject({ hi2: 'you' });
  await test1.broadcast('hi', 'hi');
  test1.emit('hi2', test1.value.hi2);
  console.log('should be the last line result already returned');
}, 2000);

const result2 = await test1.observe('hi2', function (data: any) {
  console.log('this', this.getObject());
  return data;
});

assert(result2 === 'you', 'result2 should be you' + ' result2=' + result2);

// More code...
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Issues

If you encounter any problems or have suggestions, please [open an issue](https://github.com/michaelpiper/SusX/issues).

## Changelog

For details, see [CHANGELOG.md](CHANGELOG.md).

---

Feel free to customize and expand upon this template according to your specific project needs.