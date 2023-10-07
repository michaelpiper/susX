import test from 'node:test'
import assert from 'node:assert'
import { SusXObject, SusXObserver, SusXSubscription, SusX, SusXChangeObserver } from './susX'
test('SusX' , async (t)=>{
  const susX = new SusX(1)

  /// available command are
  /// 1) ctx.on() // will turn on the observer
  /// 2) ctx.off() // will turn off the observer
  /// 3) ctx.once() // will turn on the observer once and them remove it immediately after
  const ctx: SusXChangeObserver<typeof susX> = susX.valueChange((value)=>{
    console.log('value change', value)
    assert(susX.value === value, 'value should be '+ susX.value)
  }).on()
  susX.on('do not wait', async (value)=>{
    await susX.delay(20)
    console.log('do not wait first listener', value)
  })
  susX.on('do not wait', async (value)=>{
    await susX.delay(10)
    console.log('do not wait second listener', value)
  })
 
 
  await t.test("it would run the event in parallel and not wait for result", async function () {
    //(method) SusX<number>.emit(type: SymbolKey, ...args: any[]): boolean
    susX.emit('do not wait', 'emit')
  })

  await t.test("it would run the event parallel and await for each listener to finish before the next", async function () {
    //(method) SusX<number>.tap(type: SymbolKey, ...args: any[]): Promise<boolean>
    await susX.tap('do not wait', 'tap')
  })
  await t.test("it would run the event concurrently and await for all listener to finish",async  function () {
    //(method) SusX<number>.broadcast(type: SymbolKey, ...args: any[]): Promise<boolean>
    await susX.broadcast('do not wait', 'broadcast')
    console.log('"do not wait second" will print before "do not wait first" broadcast complete',)
  })
  await t.test("it would run the event with and  observer and return the listener result once", async function () {
    // SusX<number>.value: number
    const value = susX.value
    susX.value+=1
    assert(value+1 === susX.value, 'susX.value+=1 should be same as value+1')
  })
  await t.test("it would run the event with and  observer and return the listener result once", async function () {
    susX.delay(1000).then(()=>{
      susX.emit('new', 1)
    })
    const result = await susX.observe('new', function (data: number) {
      this.value = data
      return data
    })
    assert(susX.value === result && result === 1, 'result should be same as value and 1'+ ' result='+ result)
  })

  await t.test("it would prepend event listener at the top of the listener chain", async function () {
    //(method) SusX<number>.prepend(type: SymbolKey, fn: Fn<SusX<number>, any>): SusX<number>
    susX.prepend('change', (value)=>{
      console.log("this will echo first on value change")
    })
    susX.emit('change',1)
  })
  await t.test("it would prepend event with one time listener at the top of the listener chain", async function () {
    //(method) SusX<number>.prependOnce(type: SymbolKey, fn: Fn<SusX<number>, any>): SusX<number>
    susX.prependOnce('change', (value)=>{
      console.log("this will echo first on value change")
    })
    susX.emit('change', 2)
  })

  await t.test("it would prepend event with one time listener at the top of the listener chain", async function () {
    //(method) SusX<number>.prependOnce(type: SymbolKey, fn: Fn<SusX<number>, any>): SusX<number>
    susX.prependOnceListener('change', (value)=>{
      console.log("this will echo first on value change", value)
    })
    susX.emit('change', 2)
  })

  await t.test("it would remove all event listener with the SymbolKey", async function () {
    //(method) SusX<number>.off(type: SymbolKey, nullOrFn?: Fn<SusX<number>, any> | undefined): boolean
    susX.off('change')
  })
  


  /// all are   SusXObject, SusXObserver, SusXSubscription instanceof SusX
  await t.test('SusXSubscription', async (t) => {
    const test1 = new SusXSubscription()
    await test1.delay(200)
    const logText: SusXObserver = test1.subscribe('long-text')
    const text = ['hello this is a very', 'long way to subscribe to event but it cool' ]
    let currentText = -1
    logText.on('data', (data) => {
      currentText++
      console.log(data)
      assert(data === text[currentText], 'Text Chunk should be same as source value'+ " source="+text[currentText])
    })
    logText.on('end', () => {
      console.log('Long Text End')
    })
    for(let chunk of text){
      await test1.broadcast('long-text', chunk)
    }
    test1.off('long-text')
  });

  await t.test('SusXObject', async (t) => {
    const test1 = new SusXObject()
    setTimeout(async function () {
      console.log('waited for 2s to broadcast result hi')
      test1.setObject({ hi: 'hi' }).putObject({ hi2: 'you' })
      await test1.broadcast('hi', 'hi')
      test1.emit('hi2', test1.value.hi2)
      console.log('should be the last line result already returned')
    }, 2000)
    const result2 = await test1.observe('hi2', function (data: any) {
      console.log('this', this.getObject())
      return data
    })
    assert(result2 === 'you', 'result2 should be you'+ ' result2='+ result2)
  });
});
