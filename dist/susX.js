!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var n = e();
    for (var r in n) ("object" == typeof exports ? exports : t)[r] = n[r];
  }
})(self, function () {
  return (function () {
    "use strict";
    var t = {
        607: function (t, e, n) {
          var r =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, n, r) {
                    void 0 === r && (r = n);
                    var o = Object.getOwnPropertyDescriptor(e, n);
                    (o &&
                      !("get" in o
                        ? !e.__esModule
                        : o.writable || o.configurable)) ||
                      (o = {
                        enumerable: !0,
                        get: function () {
                          return e[n];
                        },
                      }),
                      Object.defineProperty(t, r, o);
                  }
                : function (t, e, n, r) {
                    void 0 === r && (r = n), (t[r] = e[n]);
                  }),
            o =
              (this && this.__exportStar) ||
              function (t, e) {
                for (var n in t)
                  "default" === n ||
                    Object.prototype.hasOwnProperty.call(e, n) ||
                    r(e, t, n);
              };
          Object.defineProperty(e, "__esModule", { value: !0 }), o(n(329), e);
        },
        329: function (t, e) {
          var n,
            r =
              (this && this.__extends) ||
              ((n = function (t, e) {
                return (
                  (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) &&
                          (t[n] = e[n]);
                    }),
                  n(t, e)
                );
              }),
              function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Class extends value " +
                      String(e) +
                      " is not a constructor or null",
                  );
                function r() {
                  this.constructor = t;
                }
                n(t, e),
                  (t.prototype =
                    null === e
                      ? Object.create(e)
                      : ((r.prototype = e.prototype), new r()));
              }),
            o =
              (this && this.__assign) ||
              function () {
                return (
                  (o =
                    Object.assign ||
                    function (t) {
                      for (var e, n = 1, r = arguments.length; n < r; n++)
                        for (var o in (e = arguments[n]))
                          Object.prototype.hasOwnProperty.call(e, o) &&
                            (t[o] = e[o]);
                      return t;
                    }),
                  o.apply(this, arguments)
                );
              },
            i =
              (this && this.__awaiter) ||
              function (t, e, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                  function s(t) {
                    try {
                      c(r.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function u(t) {
                    try {
                      c(r.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function c(t) {
                    var e;
                    t.done
                      ? o(t.value)
                      : ((e = t.value),
                        e instanceof n
                          ? e
                          : new n(function (t) {
                              t(e);
                            })).then(s, u);
                  }
                  c((r = r.apply(t, e || [])).next());
                });
              },
            s =
              (this && this.__generator) ||
              function (t, e) {
                var n,
                  r,
                  o,
                  i,
                  s = {
                    label: 0,
                    sent: function () {
                      if (1 & o[0]) throw o[1];
                      return o[1];
                    },
                    trys: [],
                    ops: [],
                  };
                return (
                  (i = { next: u(0), throw: u(1), return: u(2) }),
                  "function" == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function u(u) {
                  return function (c) {
                    return (function (u) {
                      if (n)
                        throw new TypeError("Generator is already executing.");
                      for (; i && ((i = 0), u[0] && (s = 0)), s; )
                        try {
                          if (
                            ((n = 1),
                            r &&
                              (o =
                                2 & u[0]
                                  ? r.return
                                  : u[0]
                                  ? r.throw || ((o = r.return) && o.call(r), 0)
                                  : r.next) &&
                              !(o = o.call(r, u[1])).done)
                          )
                            return o;
                          switch (
                            ((r = 0), o && (u = [2 & u[0], o.value]), u[0])
                          ) {
                            case 0:
                            case 1:
                              o = u;
                              break;
                            case 4:
                              return s.label++, { value: u[1], done: !1 };
                            case 5:
                              s.label++, (r = u[1]), (u = [0]);
                              continue;
                            case 7:
                              (u = s.ops.pop()), s.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (o =
                                    (o = s.trys).length > 0 &&
                                    o[o.length - 1]) ||
                                  (6 !== u[0] && 2 !== u[0])
                                )
                              ) {
                                s = 0;
                                continue;
                              }
                              if (
                                3 === u[0] &&
                                (!o || (u[1] > o[0] && u[1] < o[3]))
                              ) {
                                s.label = u[1];
                                break;
                              }
                              if (6 === u[0] && s.label < o[1]) {
                                (s.label = o[1]), (o = u);
                                break;
                              }
                              if (o && s.label < o[2]) {
                                (s.label = o[2]), s.ops.push(u);
                                break;
                              }
                              o[2] && s.ops.pop(), s.trys.pop();
                              continue;
                          }
                          u = e.call(t, s);
                        } catch (t) {
                          (u = [6, t]), (r = 0);
                        } finally {
                          n = o = 0;
                        }
                      if (5 & u[0]) throw u[1];
                      return { value: u[0] ? u[1] : void 0, done: !0 };
                    })([u, c]);
                  };
                }
              },
            u =
              (this && this.__spreadArray) ||
              function (t, e, n) {
                if (n || 2 === arguments.length)
                  for (var r, o = 0, i = e.length; o < i; o++)
                    (!r && o in e) ||
                      (r || (r = Array.prototype.slice.call(e, 0, o)),
                      (r[o] = e[o]));
                return t.concat(r || Array.prototype.slice.call(e));
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.SusXObject =
              e.SusXObserver =
              e.SusXChangeObserver =
              e.SusXSubscription =
              e.SusX =
                void 0);
          var c = function (t) {
              return (
                !!t &&
                ("object" == typeof t || "function" == typeof t) &&
                "function" == typeof t.then
              );
            },
            f =
              "function" == typeof Symbol
                ? Symbol.for("--[[SusX]]--")
                : "--[[SusX]]--",
            a =
              "function" == typeof Symbol
                ? Symbol.for("--[[SusX-value-change]]--")
                : "--[[SusX-value-change]]--";
          function p(t) {
            if (
              "string" != typeof t &&
              "number" != typeof t &&
              "symbol" != typeof t
            )
              throw new TypeError("type is not type of string or symbol!");
          }
          function l(t) {
            if ("function" != typeof t)
              throw new TypeError("fn is not type of Function!");
          }
          function h(t) {
            var e;
            return ((e = {})[f] = "always"), (e.fn = t), e;
          }
          function v(t) {
            var e;
            return ((e = {})[f] = "once"), (e.fn = t), e;
          }
          function y(t, e) {
            e._events[t] = e._events[t] || [];
          }
          function b(t) {
            if (null == (e = t) || "object" != typeof e || Array.isArray(e))
              throw TypeError("obj must be a type of Object!");
            var e;
          }
          var _ = (function () {
            function t(t) {
              (this._events = {}),
                (this.delay = function (t) {
                  return new Promise(function (e) {
                    return setTimeout(e, t);
                  });
                });
              var e = t;
              Object.defineProperty(this, "$value", {
                get: function () {
                  return e;
                },
                set: function (n) {
                  (e = n), this.emit(a, t);
                },
              });
            }
            return (
              Object.defineProperty(t.prototype, "value", {
                get: function () {
                  return this.$value;
                },
                set: function (t) {
                  this.$value = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.addListener = function (t, e) {
                return this.on(t, e);
              }),
              (t.prototype.observe = function (t, e) {
                return i(this, void 0, void 0, function () {
                  var n = this;
                  return s(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return (
                          p(t),
                          l(e),
                          y(t, this),
                          [
                            4,
                            new Promise(function (r, o) {
                              n._events[t].push(
                                v(function () {
                                  for (
                                    var t = [], i = 0;
                                    i < arguments.length;
                                    i++
                                  )
                                    t[i] = arguments[i];
                                  try {
                                    r(e.apply(n, t));
                                  } catch (t) {
                                    o(t);
                                  }
                                }),
                              );
                            }),
                          ]
                        );
                      case 1:
                        return [2, r.sent()];
                    }
                  });
                });
              }),
              (t.prototype.subscribe = function (t) {
                var e = this,
                  n = new m(),
                  r = function () {
                    return setTimeout(function () {
                      e.has(t, o) ? r() : n.emit("end");
                    }, 10);
                  },
                  o = function () {
                    for (var t = [], e = 0; e < arguments.length; e++)
                      t[e] = arguments[e];
                    n.emit.apply(n, u(["data"], t, !1));
                  };
                return this.on(t, o), r(), n;
              }),
              (t.prototype.valueChange = function (t) {
                return new g(this, t);
              }),
              (t.prototype.on = function (t, e) {
                return p(t), l(e), y(t, this), this._events[t].push(h(e)), this;
              }),
              (t.prototype.prepend = function (t, e) {
                return this.prependListener(t, e);
              }),
              (t.prototype.prependListener = function (t, e) {
                return (
                  p(t), l(e), y(t, this), this._events[t].unshift(h(e)), this
                );
              }),
              (t.prototype.prependOnce = function (t, e) {
                return this.prependOnceListener(t, e);
              }),
              (t.prototype.prependOnceListener = function (t, e) {
                return (
                  p(t), l(e), y(t, this), this._events[t].unshift(v(e)), this
                );
              }),
              (t.prototype.listeners = function (t) {
                return (this._events[t] || []).map(function (t) {
                  return t.fn;
                });
              }),
              (t.prototype.once = function (t, e) {
                return p(t), l(e), y(t, this), this._events[t].push(v(e)), this;
              }),
              (t.prototype.removeAllListeners = function () {
                this._events = {};
              }),
              (t.prototype.off = function (t, e) {
                return this.removeListener(t, e);
              }),
              (t.prototype.has = function (t, e) {
                return p(t), l(e), y(t, this), !!this.listeners(t).includes(e);
              }),
              (t.prototype.removeListener = function (t, e) {
                p(t);
                var n = this.listeners(t);
                if ("function" == typeof e) {
                  for (var r = -1, o = !1; (r = n.indexOf(e)) >= 0; )
                    n.splice(r, 1), this._events[t].splice(r, 1), (o = !0);
                  return o;
                }
                return delete this._events[t];
              }),
              (t.prototype.broadcast = function (t) {
                for (var e = [], n = 1; n < arguments.length; n++)
                  e[n - 1] = arguments[n];
                return i(this, void 0, void 0, function () {
                  var n,
                    r = this;
                  return s(this, function (o) {
                    switch (o.label) {
                      case 0:
                        return (
                          p(t),
                          (n = this.listeners(t)) && n.length > 0
                            ? [
                                4,
                                Promise.all(
                                  n.map(function (n, o) {
                                    return i(r, void 0, void 0, function () {
                                      var r;
                                      return s(this, function (i) {
                                        switch (i.label) {
                                          case 0:
                                            return (
                                              (r = n.apply(this, e)),
                                              c(r) ? [4, r] : [3, 2]
                                            );
                                          case 1:
                                            i.sent(), (i.label = 2);
                                          case 2:
                                            return (
                                              this._events[t] &&
                                                this._events[t][o] &&
                                                "once" ===
                                                  this._events[t][o][f] &&
                                                this.removeListener(t, n),
                                              [2]
                                            );
                                        }
                                      });
                                    });
                                  }),
                                ),
                              ]
                            : [3, 2]
                        );
                      case 1:
                        return o.sent(), [2, !0];
                      case 2:
                        return [2, !1];
                    }
                  });
                });
              }),
              (t.prototype.tap = function (t) {
                for (var e = [], n = 1; n < arguments.length; n++)
                  e[n - 1] = arguments[n];
                return i(this, void 0, void 0, function () {
                  var n,
                    r,
                    o,
                    i,
                    u,
                    a = this;
                  return s(this, function (s) {
                    switch (s.label) {
                      case 0:
                        if (
                          (p(t),
                          (n = this.listeners(t)),
                          (r = []),
                          !(n && n.length > 0))
                        )
                          return [3, 6];
                        (o = 0), (s.label = 1);
                      case 1:
                        return o < n.length
                          ? ((i = n[o]),
                            (u = i.apply(this, e)),
                            c(u) ? [4, u] : [3, 3])
                          : [3, 5];
                      case 2:
                        s.sent(), (s.label = 3);
                      case 3:
                        this._events[t] &&
                          this._events[t][o] &&
                          "once" === this._events[t][o][f] &&
                          r.push(i),
                          (s.label = 4);
                      case 4:
                        return o++, [3, 1];
                      case 5:
                        return (
                          r.forEach(function (e) {
                            return a.removeListener(t, e);
                          }),
                          [2, !0]
                        );
                      case 6:
                        return [2, !1];
                    }
                  });
                });
              }),
              (t.prototype.emit = function (t) {
                for (var e = this, n = [], r = 1; r < arguments.length; r++)
                  n[r - 1] = arguments[r];
                p(t);
                var o = this.listeners(t),
                  i = [];
                return (
                  !!(o && o.length > 0) &&
                  (o.forEach(function (r, o) {
                    r.apply(e, n),
                      e._events[t] &&
                        e._events[t][o] &&
                        "once" === e._events[t][o][f] &&
                        i.push(r);
                  }),
                  i.forEach(function (n) {
                    return e.removeListener(t, n);
                  }),
                  !0)
                );
              }),
              t
            );
          })();
          e.SusX = _;
          var d = (function (t) {
            function e() {
              return t.call(this, null) || this;
            }
            return r(e, t), e;
          })(_);
          e.SusXSubscription = d;
          var g = (function () {
            function t(t, e) {
              (this._susX = t), (this._listener = e);
            }
            return (
              Object.defineProperty(t.prototype, "value", {
                get: function () {
                  return this._susX.value;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.on = function () {
                return this._susX.on(a, this._listener), this;
              }),
              (t.prototype.once = function () {
                return this._susX.once(a, this._listener), this;
              }),
              (t.prototype.off = function () {
                return this._susX.off(a, this._listener);
              }),
              t
            );
          })();
          e.SusXChangeObserver = g;
          var m = (function (t) {
            function e() {
              return t.call(this, null) || this;
            }
            return r(e, t), e;
          })(_);
          e.SusXObserver = m;
          var w = (function (t) {
            function e(e) {
              var n = this;
              return (
                void 0 !== e
                  ? (b(e), (n = t.call(this, e) || this))
                  : (n = t.call(this, {}) || this),
                n
              );
            }
            return (
              r(e, t),
              (e.prototype.putObject = function (t) {
                if ("function" == typeof t) {
                  var e = this.value;
                  return (this.value = o(o({}, e), t(e))), this;
                }
                return b(t), (this.value = o(o({}, this.value), t)), this;
              }),
              (e.prototype.getObject = function () {
                var t;
                return null !== (t = this.value) && void 0 !== t ? t : {};
              }),
              (e.prototype.setObject = function (t) {
                if ("function" == typeof t) {
                  var e = this.value;
                  return (this.value = t(e)), this;
                }
                return b(t), (this.value = t), this;
              }),
              e
            );
          })(_);
          e.SusXObject = w;
        },
      },
      e = {};
    return (function n(r) {
      var o = e[r];
      if (void 0 !== o) return o.exports;
      var i = (e[r] = { exports: {} });
      return t[r].call(i.exports, i, i.exports, n), i.exports;
    })(607);
  })();
});
