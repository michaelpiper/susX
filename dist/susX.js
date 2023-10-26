!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var s = e();
    for (var n in s) ("object" == typeof exports ? exports : t)[n] = s[n];
  }
})(self, function () {
  return (function () {
    "use strict";
    var t = {
        607: function (t, e, s) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, s, n) {
                    void 0 === n && (n = s);
                    var i = Object.getOwnPropertyDescriptor(e, s);
                    (i &&
                      !("get" in i
                        ? !e.__esModule
                        : i.writable || i.configurable)) ||
                      (i = {
                        enumerable: !0,
                        get: function () {
                          return e[s];
                        },
                      }),
                      Object.defineProperty(t, n, i);
                  }
                : function (t, e, s, n) {
                    void 0 === n && (n = s), (t[n] = e[s]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (t, e) {
                for (var s in t)
                  "default" === s ||
                    Object.prototype.hasOwnProperty.call(e, s) ||
                    n(e, t, s);
              };
          Object.defineProperty(e, "__esModule", { value: !0 }), i(s(329), e);
        },
        329: function (t, e) {
          var s =
            (this && this.__awaiter) ||
            function (t, e, s, n) {
              return new (s || (s = Promise))(function (i, r) {
                function o(t) {
                  try {
                    h(n.next(t));
                  } catch (t) {
                    r(t);
                  }
                }
                function u(t) {
                  try {
                    h(n.throw(t));
                  } catch (t) {
                    r(t);
                  }
                }
                function h(t) {
                  var e;
                  t.done
                    ? i(t.value)
                    : ((e = t.value),
                      e instanceof s
                        ? e
                        : new s(function (t) {
                            t(e);
                          })).then(o, u);
                }
                h((n = n.apply(t, e || [])).next());
              });
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.SusXObject =
              e.SusXObserver =
              e.SusXChangeObserver =
              e.SusXSubscription =
              e.SusX =
                void 0);
          const n = (t) =>
              !!t &&
              ("object" == typeof t || "function" == typeof t) &&
              "function" == typeof t.then,
            i =
              "function" == typeof Symbol
                ? Symbol.for("--[[SusX]]--")
                : "--[[SusX]]--",
            r =
              "function" == typeof Symbol
                ? Symbol.for("--[[SusX-value-change]]--")
                : "--[[SusX-value-change]]--";
          function o(t) {
            if (
              "string" != typeof t &&
              "number" != typeof t &&
              "symbol" != typeof t
            )
              throw new TypeError("type is not type of string or symbol!");
          }
          function u(t) {
            if ("function" != typeof t)
              throw new TypeError("fn is not type of Function!");
          }
          function h(t) {
            return { [i]: "always", fn: t };
          }
          function c(t) {
            return { [i]: "once", fn: t };
          }
          function f(t, e) {
            e._events[t] = e._events[t] || [];
          }
          function a(t) {
            if (null == (e = t) || "object" != typeof e || Array.isArray(e))
              throw TypeError("obj must be a type of Object!");
            var e;
          }
          class l {
            constructor(t) {
              (this._events = {}),
                (this.delay = (t) => new Promise((e) => setTimeout(e, t)));
              let e = t;
              Object.defineProperty(this, "$value", {
                get() {
                  return e;
                },
                set(s) {
                  (e = s), this.emit(r, t);
                },
              });
            }
            get value() {
              return this.$value;
            }
            set value(t) {
              this.$value = t;
            }
            addListener(t, e) {
              return this.on(t, e);
            }
            observe(t, e) {
              return s(this, void 0, void 0, function* () {
                return (
                  o(t),
                  u(e),
                  f(t, this),
                  yield new Promise((s, n) => {
                    this._events[t].push(
                      c((...t) => {
                        try {
                          s(e.apply(this, t));
                        } catch (t) {
                          n(t);
                        }
                      }),
                    );
                  })
                );
              });
            }
            subscribe(t) {
              const e = new v(),
                s = () =>
                  setTimeout(() => {
                    this.has(t, n) ? s() : e.emit("end");
                  }, 10),
                n = (...t) => {
                  e.emit("data", ...t);
                };
              return this.on(t, n), s(), e;
            }
            valueChange(t) {
              return new p(this, t);
            }
            on(t, e) {
              return o(t), u(e), f(t, this), this._events[t].push(h(e)), this;
            }
            prepend(t, e) {
              return this.prependListener(t, e);
            }
            prependListener(t, e) {
              return (
                o(t), u(e), f(t, this), this._events[t].unshift(h(e)), this
              );
            }
            prependOnce(t, e) {
              return this.prependOnceListener(t, e);
            }
            prependOnceListener(t, e) {
              return (
                o(t), u(e), f(t, this), this._events[t].unshift(c(e)), this
              );
            }
            listeners(t) {
              return (this._events[t] || []).map((t) => t.fn);
            }
            once(t, e) {
              return o(t), u(e), f(t, this), this._events[t].push(c(e)), this;
            }
            removeAllListeners() {
              this._events = {};
            }
            off(t, e) {
              return this.removeListener(t, e);
            }
            has(t, e) {
              o(t), f(t, this);
              const s = this.listeners(t);
              return null == e || void 0 === e
                ? 0 !== s.length
                : (u(e), !!s.includes(e));
            }
            removeListener(t, e) {
              o(t);
              const s = this.listeners(t);
              if ("function" == typeof e) {
                let n = -1,
                  i = !1;
                for (; (n = s.indexOf(e)) >= 0; )
                  s.splice(n, 1), this._events[t].splice(n, 1), (i = !0);
                return i;
              }
              return delete this._events[t];
            }
            broadcast(t, ...e) {
              return s(this, void 0, void 0, function* () {
                o(t);
                const r = this.listeners(t);
                return (
                  !!(r && r.length > 0) &&
                  (yield Promise.all(
                    r.map((r, o) =>
                      s(this, void 0, void 0, function* () {
                        const s = r.apply(this, e);
                        n(s) && (yield s),
                          this._events[t] &&
                            this._events[t][o] &&
                            "once" === this._events[t][o][i] &&
                            this.removeListener(t, r);
                      }),
                    ),
                  ),
                  !0)
                );
              });
            }
            tap(t, ...e) {
              return s(this, void 0, void 0, function* () {
                o(t);
                const s = this.listeners(t),
                  r = [];
                if (s && s.length > 0) {
                  for (let o = 0; o < s.length; o++) {
                    const u = s[o],
                      h = u.apply(this, e);
                    n(h) && (yield h),
                      this._events[t] &&
                        this._events[t][o] &&
                        "once" === this._events[t][o][i] &&
                        r.push(u);
                  }
                  return r.forEach((e) => this.removeListener(t, e)), !0;
                }
                return !1;
              });
            }
            emit(t, ...e) {
              o(t);
              const s = this.listeners(t),
                n = [];
              return (
                !!(s && s.length > 0) &&
                (s.forEach((s, r) => {
                  s.apply(this, e),
                    this._events[t] &&
                      this._events[t][r] &&
                      "once" === this._events[t][r][i] &&
                      n.push(s);
                }),
                n.forEach((e) => this.removeListener(t, e)),
                !0)
              );
            }
          }
          (e.SusX = l),
            (e.SusXSubscription = class extends l {
              constructor() {
                super(null);
              }
            });
          class p {
            constructor(t, e) {
              (this._susX = t),
                (this._listener = e),
                (this.ON = p.ON),
                (this.OFF = p.OFF),
                (this.ONCE = p.ONCE),
                (this.state = p.ONCE);
            }
            get value() {
              return this._susX.value;
            }
            on() {
              return (
                this.state == this.ON ||
                  (this.state > 0 && this.off(),
                  (this.state = this.ON),
                  this._susX.on(r, this._listener)),
                this
              );
            }
            once() {
              return (
                this.state == this.ONCE ||
                  (this.state > 0 && this.off(),
                  (this.state = this.ONCE),
                  this._susX.once(r, this._listener)),
                this
              );
            }
            off() {
              return (
                this.state != this.OFF &&
                ((this.state = this.OFF), this._susX.off(r, this._listener))
              );
            }
          }
          (e.SusXChangeObserver = p), (p.ON = 1), (p.OFF = 0), (p.ONCE = 0.5);
          class v extends l {
            constructor() {
              super(null);
            }
          }
          (e.SusXObserver = v),
            (e.SusXObject = class extends l {
              constructor(t) {
                void 0 !== t ? (a(t), super(t)) : super({});
              }
              putObject(t) {
                if ("function" == typeof t) {
                  const e = this.value;
                  return (
                    (this.value = Object.assign(Object.assign({}, e), t(e))),
                    this
                  );
                }
                return (
                  a(t),
                  (this.value = Object.assign(
                    Object.assign({}, this.value),
                    t,
                  )),
                  this
                );
              }
              getObject() {
                var t;
                return null !== (t = this.value) && void 0 !== t ? t : {};
              }
              setObject(t) {
                if ("function" == typeof t) {
                  const e = this.value;
                  return (this.value = t(e)), this;
                }
                return a(t), (this.value = t), this;
              }
            });
        },
      },
      e = {};
    return (function s(n) {
      var i = e[n];
      if (void 0 !== i) return i.exports;
      var r = (e[n] = { exports: {} });
      return t[n].call(r.exports, r, r.exports, s), r.exports;
    })(607);
  })();
});
