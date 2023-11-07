/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/ban-types */
/**
 * Await events and subscription library with EventEmitter focus
 * SusX extension for javascript
 * @author Michael Piper
 */

const isObject = (val: any) => {
  return val != null && typeof val === 'object' && !Array.isArray(val)
}

const isPromise = (obj: any) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

const TYPE_KEY_NAME =
  typeof Symbol === 'function' ? Symbol.for('--[[SusX]]--') : '--[[SusX]]--'

  const CHANGE_KEY_NAME =
  typeof Symbol === 'function' ? Symbol.for('--[[SusX-value-change]]--') : '--[[SusX-value-change]]--'
 
function assertType (type: any) {
  if (typeof type !== 'string' && typeof type !== 'number'  && typeof type !== 'symbol') {
    throw new TypeError('type is not type of string or symbol!')
  }
}

type SymbolKey = string | number | symbol
type Fn<ThisType extends SusX, T = any, R=T> = (this: ThisType, ...args: any[]) => PromiseLike<R> | R
type FnChange<ThisType extends SusX, T = any, R=T> = (this: ThisType, value: T) => PromiseLike<R> | R
function assertFn (fn: Fn<any>) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not type of Function!')
  }
}

function alwaysListener (fn: Fn<any>) {
  return {
    [TYPE_KEY_NAME]: 'always',
    fn
  }
}

function onceListener (fn: Fn<any>) {
  return {
    [TYPE_KEY_NAME]: 'once',
    fn
  }
}

function assertEvents (type: any, thisType: SusX) {
  thisType._events[type] = thisType._events[type] || []
}
function assertObj (obj: any) {
  if (!isObject(obj)) {
    throw TypeError('obj must be a type of Object!')
  }
}
function assertArray (arr: any) {
  if (!Array.isArray(arr)) {
    throw TypeError('arr must be a type of Array!')
  }
}
// eslint-disable-next-line @typescript-eslint/no-redeclare

export class SusX {
  _events: Record<SymbolKey, Array<{ fn: Fn<any> }>> = {}
  delay = (ms: number) => new Promise((resolve)=> setTimeout(resolve, ms))
  addListener (type: SymbolKey, fn: Fn<this>) {
    return this.on(type, fn)
  }

  async observe <R>(type: SymbolKey, fn: Fn<this, R>): Promise<R> {
    assertType(type)
    assertFn(fn)
    assertEvents(type, this)
    return await new Promise((resolve, reject) => {
      const completer = (...args: never[]) => {
        try {
          resolve(fn.apply(this, args))
        } catch (error) {
          reject(error)
        }
      }
      this._events[type].push(onceListener(completer))
    })
  }

  subscribe (type: SymbolKey): SusXObserver {
    const reader = new SusXObserver()
    // writer.pipe(reader)
    
    const callback = () => setTimeout(() => {
      if (!this.has(type, listener)) {
        reader.emit('end')
      } else {
        callback()
      }
    }, 10)
    const listener = (...args: unknown[]) => {
      reader.emit('data', ...args)
    }
    this.on(type, listener)
    callback()
    return reader
  }
 
  on (type: SymbolKey, fn: Fn<this>) {
    assertType(type)
    assertFn(fn)
    assertEvents(type, this)
    this._events[type].push(alwaysListener(fn))
    return this
  }

  prepend (type: SymbolKey, fn: Fn<this>) {
    return this.prependListener(type, fn)
  }

  prependListener (type: SymbolKey, fn: Fn<this>) {
    assertType(type)
    assertFn(fn)
    assertEvents(type, this)
    this._events[type].unshift(alwaysListener(fn))
    return this
  }

  prependOnce (type: SymbolKey, fn: Fn<this>) {
    return this.prependOnceListener(type, fn)
  }

  prependOnceListener (type: SymbolKey, fn: Fn<this>) {
    assertType(type)
    assertFn(fn)
    assertEvents(type, this)
    this._events[type].unshift(onceListener(fn))
    return this
  }

  listeners (type: SymbolKey) {
    return (this._events[type] || []).map((x) => x.fn)
  }

  once (type: SymbolKey, fn: Fn<this>) {
    assertType(type)
    assertFn(fn)
    assertEvents(type, this)
    this._events[type].push(onceListener(fn))
    return this
  }

  removeAllListeners () {
    this._events = {}
  }

  off (type: SymbolKey, nullOrFn?: Fn<this>) {
    return this.removeListener(type, nullOrFn)
  }

  has (type: SymbolKey, fn?: Fn<this>): boolean {
    assertType(type)
    assertEvents(type, this)
    const listeners = this.listeners(type)
    if(fn == null || fn === undefined){
      return listeners.length!==0
    }
    assertFn(fn!)
    if (listeners.includes(fn!)) {
      return true
    }
    return false
  }

  removeListener (type: SymbolKey, nullOrFn?: Fn<this>) {
    assertType(type)

    const listeners = this.listeners(type)
    if (typeof nullOrFn === 'function') {
      let index = -1
      let found = false

      while ((index = listeners.indexOf(nullOrFn)) >= 0) {
        listeners.splice(index, 1)
        this._events[type].splice(index, 1)
        found = true
      }
      return found
    } else {
      return delete this._events[type]
    }
  }

  async broadcast (type: SymbolKey, ...args: any[]) {
    assertType(type)
    const listeners = this.listeners(type)
    if (listeners && (listeners.length > 0)) {
      await Promise.all(listeners.map(async (event, i) => {
        const rlt = event.apply(this, args)
        if (isPromise(rlt)) {
          await rlt
        }
        if (this._events[type] && this._events[type][i] && (this._events[type] as any)[i][TYPE_KEY_NAME] === 'once') {
          this.removeListener(type, event)
        }
      }))
      return true
    }
    return false
  }

  async tap (type: SymbolKey, ...args: any[]) {
    assertType(type)
    const listeners = this.listeners(type)

    const onceListeners: Array<Fn<this>> = []
    if (listeners && (listeners.length > 0)) {
      for (let i = 0; i < listeners.length; i++) {
        const event = listeners[i]
        const rlt = event.apply(this, args)
        if (isPromise(rlt)) {
          await rlt
        }
        if (this._events[type] && this._events[type][i] && (this._events[type] as any)[i][TYPE_KEY_NAME] === 'once') {
          onceListeners.push(event)
        }
      }
      onceListeners.forEach((event) => this.removeListener(type, event))

      return true
    }
    return false
  }

  emit (type: SymbolKey, ...args: any[]) {
    assertType(type)
    const listeners = this.listeners(type)

    const onceListeners: Array<Fn<this>> = []
    if (listeners && (listeners.length > 0)) {
      listeners.forEach((event, i) => {
        event.apply(this, args)
        if (this._events[type] && this._events[type][i] && (this._events[type] as any)[i][TYPE_KEY_NAME] === 'once') {
          onceListeners.push(event)
        }
      })

      onceListeners.forEach((event) => this.removeListener(type, event))
      return true
    }
    return false
  }
}
export class SusXSubscription<T> extends SusX {
  constructor (value: T) {
    super()
    let _value = value
    Object.defineProperty(this, '$value', {
      get(){
       return _value
      },
      set(v) {
        _value = v
        this.emit(CHANGE_KEY_NAME, value)
      },
    })
  }

  get value (): T {
    return this.$value
  }

  set value (value:T){
    this.$value=value
  }

  protected $value!: T
   
  valueChange<R>(fn: FnChange<this, T, any>, on:boolean = true){
    const ctx = new SusXChangeObserver<this, R>(this, fn)
    if(on){
      ctx.on()
    }
    return ctx 
  }
  put (val: T | ((oldVal:T) => T)): this {
    const value = this.value
    if(typeof val === 'function'){
      this.value =( value + (val as Function)(value)) as T
      return this
    }
    
    this.value = value + (val as any)
    return this
  }

  get (): T {
    return this.value ?? null as any as T
  }

  set (val: T | ((oldVal:T) => T)): this {
    if(typeof val === 'function'){
      const value = this.value
      this.value = (val as Function)(value) as T
      return this
    }
    this.value = val
    return this
  }
}
export class SusXChangeObserver< ISusX extends SusXSubscription<any>, R = any> {
  constructor (protected _susX:ISusX, protected _listener:Fn<ISusX, ISusX['value'], R>) {
  }
  static ON: 1 = 1
  static OFF: 0 = 0
  static ONCE: 0.5 = 0.5
   ON = SusXChangeObserver.ON
   OFF =  SusXChangeObserver.OFF
   ONCE =   SusXChangeObserver.ONCE
  state: 1| 0| 0.5 = SusXChangeObserver.ONCE
  get value(): ISusX['value'] {
    return this._susX.value
  }
  on():this{
    if(this.state == this.ON) return this;
    if(this.state>0){
      this.off()
    }
    this.state =  this.ON
    this._susX.on(CHANGE_KEY_NAME, this._listener)
    return this
  }
  once():this{
    if(this.state == this.ONCE) return this;
    if(this.state>0){
      this.off()
    }
    this.state =  this.ONCE
    this._susX.once(CHANGE_KEY_NAME, this._listener)
    return this
  }

  off(): boolean{
    if(this.state == this.OFF)return false;
    this.state =  this.OFF
    return this._susX.off(CHANGE_KEY_NAME, this._listener)
  }
}
export class SusXObserver extends SusX{
  constructor () {
    super()
  }
}
export class SusXObject<T extends Record<any, any>> extends SusXSubscription<T> {
  constructor (obj?: T) {
    if (obj !== undefined) {
      assertObj(obj)
      super(obj)
    } else {
      super({} as unknown as T)
    }
  }

  put (obj: Partial<T> | ((oldObj:T) => Partial<T>)): this {
    if(typeof obj === 'function'){
      const value = this.value
      this.value = {...value, ...obj(value)}
      return this
    }
    assertObj(obj)
    this.value = {...this.value, ...obj}
    return this
  }

  get (): T {
    return this.value ?? {} as any as T
  }

  set (obj: T| ((oldObj:T) => T)): this {
    if(typeof obj === 'function'){
      const value = this.value
      this.value = obj(value)
      return this
    }
    assertObj(obj)
    this.value = obj
    return this
  }
}


export class SusXArray<T extends Array<any>> extends SusXSubscription<T> {
  constructor (arr?: T) {
    if (arr !== undefined) {
      assertArray(arr)
      super(arr)
    } else {
      super([] as unknown as T)
    }
  }

  put (arr: T | ((oldObj:T) => T)): this {
    if(typeof arr === 'function'){
      const value = this.value
      this.value = [...value, ...arr(value)] as T
      return this
    }
    assertArray(arr)
    this.value = [...this.value, ...arr] as T
    return this
  }

  get (): T {
    return this.value ?? [] as any as T
  }

  set (arr: T| ((oldArr:T) => T)): this {
    if(typeof arr === 'function'){
      const value = this.value
      this.value = arr(value)
      return this
    }
    assertArray(arr)
    this.value = arr
    return this
  }
}
