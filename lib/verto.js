
    /*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
    !function(a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
            if (!a.document)
                throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function(a, b) {
        var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty, k = {}, l = a.document, m = "2.1.1", n = function(a, b) {
            return new n.fn.init(a, b)
        }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function(a, b) {
            return b.toUpperCase()
        };
        n.fn = n.prototype = {jquery: m,constructor: n,selector: "",length: 0,toArray: function() {
            return d.call(this)
        },get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },each: function(a, b) {
            return n.each(this, a, b)
        },map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },first: function() {
            return this.eq(0)
        },last: function() {
            return this.eq(-1)
        },eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },end: function() {
            return this.prevObject || this.constructor(null)
        },push: f,sort: c.sort,splice: c.splice}, n.extend = n.fn.extend = function() {
            var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
                if (null != (a = arguments[h]))
                    for (b in a)
                        c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
            return g
        }, n.extend({expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),isReady: !0,error: function(a) {
            throw new Error(a)
        },noop: function() {
        },isFunction: function(a) {
            return "function" === n.type(a)
        },isArray: Array.isArray,isWindow: function(a) {
            return null != a && a === a.window
        },isNumeric: function(a) {
            return !n.isArray(a) && a - parseFloat(a) >= 0
        },isPlainObject: function(a) {
            return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },globalEval: function(a) {
            var b, c = eval;
            a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r)
        },nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },each: function(a, b, c) {
            var d, e = 0, f = a.length, g = s(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1)
                            break
                } else
                    for (e in a)
                        if (d = b.apply(a[e], c), d === !1)
                            break
            } else if (g) {
                for (; f > e; e++)
                    if (d = b.call(a[e], e, a[e]), d === !1)
                        break
            } else
                for (e in a)
                    if (d = b.call(a[e], e, a[e]), d === !1)
                        break;
            return a
        },trim: function(a) {
            return null == a ? "" : (a + "").replace(o, "")
        },makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },inArray: function(a, b, c) {
            return null == b ? -1 : g.call(b, a, c)
        },merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++)
                a[e++] = b[d];
            return a.length = e, a
        },grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },map: function(a, b, c) {
            var d, f = 0, g = a.length, h = s(a), i = [];
            if (h)
                for (; g > f; f++)
                    d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a)
                    d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },guid: 1,proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function() {
                return a.apply(b || this, e.concat(d.call(arguments)))
            }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
        },now: Date.now,support: k}), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
            h["[object " + b + "]"] = b.toLowerCase()
        });
        function s(a) {
            var b = a.length, c = n.type(a);
            return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
        }
        var t = function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date, v = a.document, w = 0, x = 0, y = gb(), z = gb(), A = gb(), B = function(a, b) {
                return a === b && (l = !0), 0
            }, C = "undefined", D = 1 << 31, E = {}.hasOwnProperty, F = [], G = F.pop, H = F.push, I = F.push, J = F.slice, K = F.indexOf || function(a) {
                    for (var b = 0, c = this.length; c > b; b++)
                        if (this[b] === a)
                            return b;
                    return -1
                }, L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = N.replace("w", "w#"), P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]", Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)", R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), S = new RegExp("^" + M + "*," + M + "*"), T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"), V = new RegExp(Q), W = new RegExp("^" + O + "$"), X = {ID: new RegExp("^#(" + N + ")"),CLASS: new RegExp("^\\.(" + N + ")"),TAG: new RegExp("^(" + N.replace("w", "w*") + ")"),ATTR: new RegExp("^" + P),PSEUDO: new RegExp("^" + Q),CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),bool: new RegExp("^(?:" + L + ")$", "i"),needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")}, Y = /^(?:input|select|textarea|button)$/i, Z = /^h\d$/i, $ = /^[^{]+\{\s*\[native \w/, _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ab = /[+~]/, bb = /'|\\/g, cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"), db = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
            try {
                I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType
            } catch (eb) {
                I = {apply: F.length ? function(a, b) {
                    H.apply(a, J.call(b))
                } : function(a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++])
                        ;
                    a.length = c - 1
                }}
            }
            function fb(a, b, d, e) {
                var f, h, j, k, l, o, r, s, w, x;
                if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a)
                    return d;
                if (1 !== (k = b.nodeType) && 9 !== k)
                    return [];
                if (p && !e) {
                    if (f = _.exec(a))
                        if (j = f[1]) {
                            if (9 === k) {
                                if (h = b.getElementById(j), !h || !h.parentNode)
                                    return d;
                                if (h.id === j)
                                    return d.push(h), d
                            } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j)
                                return d.push(h), d
                        } else {
                            if (f[2])
                                return I.apply(d, b.getElementsByTagName(a)), d;
                            if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName)
                                return I.apply(d, b.getElementsByClassName(j)), d
                        }
                    if (c.qsa && (!q || !q.test(a))) {
                        if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                            while (l--)
                                o[l] = s + qb(o[l]);
                            w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",")
                        }
                        if (x)
                            try {
                                return I.apply(d, w.querySelectorAll(x)), d
                            } catch (y) {
                            }finally {
                                r || b.removeAttribute("id")
                            }
                    }
                }
                return i(a.replace(R, "$1"), b, d, e)
            }
            function gb() {
                var a = [];
                function b(c, e) {
                    return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
                }
                return b
            }
            function hb(a) {
                return a[u] = !0, a
            }
            function ib(a) {
                var b = n.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                }finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }
            function jb(a, b) {
                var c = a.split("|"), e = a.length;
                while (e--)
                    d.attrHandle[c[e]] = b
            }
            function kb(a, b) {
                var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D);
                if (d)
                    return d;
                if (c)
                    while (c = c.nextSibling)
                        if (c === b)
                            return -1;
                return a ? 1 : -1
            }
            function lb(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }
            function mb(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }
            function nb(a) {
                return hb(function(b) {
                    return b = +b, hb(function(c, d) {
                        var e, f = a([], c.length, b), g = f.length;
                        while (g--)
                            c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }
            function ob(a) {
                return a && typeof a.getElementsByTagName !== C && a
            }
            c = fb.support = {}, f = fb.isXML = function(a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, m = fb.setDocument = function(a) {
                var b, e = a ? a.ownerDocument || a : v, g = e.defaultView;
                return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function() {
                    m()
                }, !1) : g.attachEvent && g.attachEvent("onunload", function() {
                    m()
                })), c.attributes = ib(function(a) {
                    return a.className = "i", !a.getAttribute("className")
                }), c.getElementsByTagName = ib(function(a) {
                    return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
                }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function(a) {
                        return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                    }), c.getById = ib(function(a) {
                    return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length
                }), c.getById ? (d.find.ID = function(a, b) {
                    if (typeof b.getElementById !== C && p) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, d.filter.ID = function(a) {
                    var b = a.replace(cb, db);
                    return function(a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete d.find.ID, d.filter.ID = function(a) {
                    var b = a.replace(cb, db);
                    return function(a) {
                        var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                    return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
                } : function(a, b) {
                    var c, d = [], e = 0, f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        while (c = f[e++])
                            1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                        return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0
                    }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function(a) {
                    a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked")
                }), ib(function(a) {
                    var b = e.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
                })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function(a) {
                    c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q)
                }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function(a, b) {
                    if (b)
                        while (b = b.parentNode)
                            if (b === a)
                                return !0;
                    return !1
                }, B = b ? function(a, b) {
                    if (a === b)
                        return l = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1)
                } : function(a, b) {
                    if (a === b)
                        return l = !0, 0;
                    var c, d = 0, f = a.parentNode, g = b.parentNode, h = [a], i = [b];
                    if (!f || !g)
                        return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0;
                    if (f === g)
                        return kb(a, b);
                    c = a;
                    while (c = c.parentNode)
                        h.unshift(c);
                    c = b;
                    while (c = c.parentNode)
                        i.unshift(c);
                    while (h[d] === i[d])
                        d++;
                    return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
                }, e) : n
            }, fb.matches = function(a, b) {
                return fb(a, null, null, b)
            }, fb.matchesSelector = function(a, b) {
                if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))
                    try {
                        var d = s.call(a, b);
                        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                            return d
                    } catch (e) {
                    }
                return fb(b, n, null, [a]).length > 0
            }, fb.contains = function(a, b) {
                return (a.ownerDocument || a) !== n && m(a), t(a, b)
            }, fb.attr = function(a, b) {
                (a.ownerDocument || a) !== n && m(a);
                var e = d.attrHandle[b.toLowerCase()], f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
                return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
            }, fb.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, fb.uniqueSort = function(a) {
                var b, d = [], e = 0, f = 0;
                if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                    while (b = a[f++])
                        b === a[f] && (e = d.push(f));
                    while (e--)
                        a.splice(d[e], 1)
                }
                return k = null, a
            }, e = fb.getText = function(a) {
                var b, c = "", d = 0, f = a.nodeType;
                if (f) {
                    if (1 === f || 9 === f || 11 === f) {
                        if ("string" == typeof a.textContent)
                            return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling)
                            c += e(a)
                    } else if (3 === f || 4 === f)
                        return a.nodeValue
                } else
                    while (b = a[d++])
                        c += e(b);
                return c
            }, d = fb.selectors = {cacheLength: 50,createPseudo: hb,match: X,attrHandle: {},find: {},relative: {">": {dir: "parentNode",first: !0}," ": {dir: "parentNode"},"+": {dir: "previousSibling",first: !0},"~": {dir: "previousSibling"}},preFilter: {ATTR: function(a) {
                return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
            },CHILD: function(a) {
                return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a
            },PSEUDO: function(a) {
                var b, c = !a[6] && a[2];
                return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
            }},filter: {TAG: function(a) {
                var b = a.replace(cb, db).toLowerCase();
                return "*" === a ? function() {
                    return !0
                } : function(a) {
                    return a.nodeName && a.nodeName.toLowerCase() === b
                }
            },CLASS: function(a) {
                var b = y[a + " "];
                return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                    })
            },ATTR: function(a, b, c) {
                return function(d) {
                    var e = fb.attr(d, a);
                    return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                }
            },CHILD: function(a, b, c, d, e) {
                var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                return 1 === d && 0 === e ? function(a) {
                    return !!a.parentNode
                } : function(b, c, i) {
                    var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                    if (q) {
                        if (f) {
                            while (p) {
                                l = b;
                                while (l = l[p])
                                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                        return !1;
                                o = p = "only" === a && !o && "nextSibling"
                            }
                            return !0
                        }
                        if (o = [g ? q.firstChild : q.lastChild], g && s) {
                            k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                            while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [w, n, m];
                                    break
                                }
                        } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)
                            m = j[1];
                        else
                            while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b))
                                    break;
                        return m -= e, m === d || m % d === 0 && m / d >= 0
                    }
                }
            },PSEUDO: function(a, b) {
                var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
                return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function(a, c) {
                    var d, f = e(a, b), g = f.length;
                    while (g--)
                        d = K.call(a, f[g]), a[d] = !(c[d] = f[g])
                }) : function(a) {
                    return e(a, 0, c)
                }) : e
            }},pseudos: {not: hb(function(a) {
                var b = [], c = [], d = h(a.replace(R, "$1"));
                return d[u] ? hb(function(a, b, c, e) {
                    var f, g = d(a, null, e, []), h = a.length;
                    while (h--)
                        (f = g[h]) && (a[h] = !(b[h] = f))
                }) : function(a, e, f) {
                    return b[0] = a, d(b, null, f, c), !c.pop()
                }
            }),has: hb(function(a) {
                return function(b) {
                    return fb(a, b).length > 0
                }
            }),contains: hb(function(a) {
                return function(b) {
                    return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                }
            }),lang: hb(function(a) {
                return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(), function(b) {
                    var c;
                    do
                        if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                            return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                    while ((b = b.parentNode) && 1 === b.nodeType);
                    return !1
                }
            }),target: function(b) {
                var c = a.location && a.location.hash;
                return c && c.slice(1) === b.id
            },root: function(a) {
                return a === o
            },focus: function(a) {
                return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
            },enabled: function(a) {
                return a.disabled === !1
            },disabled: function(a) {
                return a.disabled === !0
            },checked: function(a) {
                var b = a.nodeName.toLowerCase();
                return "input" === b && !!a.checked || "option" === b && !!a.selected
            },selected: function(a) {
                return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
            },empty: function(a) {
                for (a = a.firstChild; a; a = a.nextSibling)
                    if (a.nodeType < 6)
                        return !1;
                return !0
            },parent: function(a) {
                return !d.pseudos.empty(a)
            },header: function(a) {
                return Z.test(a.nodeName)
            },input: function(a) {
                return Y.test(a.nodeName)
            },button: function(a) {
                var b = a.nodeName.toLowerCase();
                return "input" === b && "button" === a.type || "button" === b
            },text: function(a) {
                var b;
                return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
            },first: nb(function() {
                return [0]
            }),last: nb(function(a, b) {
                return [b - 1]
            }),eq: nb(function(a, b, c) {
                return [0 > c ? c + b : c]
            }),even: nb(function(a, b) {
                for (var c = 0; b > c; c += 2)
                    a.push(c);
                return a
            }),odd: nb(function(a, b) {
                for (var c = 1; b > c; c += 2)
                    a.push(c);
                return a
            }),lt: nb(function(a, b, c) {
                for (var d = 0 > c ? c + b : c; --d >= 0; )
                    a.push(d);
                return a
            }),gt: nb(function(a, b, c) {
                for (var d = 0 > c ? c + b : c; ++d < b; )
                    a.push(d);
                return a
            })}}, d.pseudos.nth = d.pseudos.eq;
            for (b in {radio: !0,checkbox: !0,file: !0,password: !0,image: !0})
                d.pseudos[b] = lb(b);
            for (b in {submit: !0,reset: !0})
                d.pseudos[b] = mb(b);
            function pb() {
            }
            pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function(a, b) {
                var c, e, f, g, h, i, j, k = z[a + " "];
                if (k)
                    return b ? 0 : k.slice(0);
                h = a, i = [], j = d.preFilter;
                while (h) {
                    (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({value: c,type: e[0].replace(R, " ")}), h = h.slice(c.length));
                    for (g in d.filter)
                        !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({value: c,type: g,matches: e}), h = h.slice(c.length));
                    if (!c)
                        break
                }
                return b ? h.length : h ? fb.error(a) : z(a, i).slice(0)
            };
            function qb(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++)
                    d += a[b].value;
                return d
            }
            function rb(a, b, c) {
                var d = b.dir, e = c && "parentNode" === d, f = x++;
                return b.first ? function(b, c, f) {
                    while (b = b[d])
                        if (1 === b.nodeType || e)
                            return a(b, c, f)
                } : function(b, c, g) {
                    var h, i, j = [w, f];
                    if (g) {
                        while (b = b[d])
                            if ((1 === b.nodeType || e) && a(b, c, g))
                                return !0
                    } else
                        while (b = b[d])
                            if (1 === b.nodeType || e) {
                                if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)
                                    return j[2] = h[2];
                                if (i[d] = j, j[2] = a(b, c, g))
                                    return !0
                            }
                }
            }
            function sb(a) {
                return a.length > 1 ? function(b, c, d) {
                    var e = a.length;
                    while (e--)
                        if (!a[e](b, c, d))
                            return !1;
                    return !0
                } : a[0]
            }
            function tb(a, b, c) {
                for (var d = 0, e = b.length; e > d; d++)
                    fb(a, b[d], c);
                return c
            }
            function ub(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                    (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                return g
            }
            function vb(a, b, c, d, e, f) {
                return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function(f, g, h, i) {
                    var j, k, l, m = [], n = [], o = g.length, p = f || tb(b || "*", h.nodeType ? [h] : h, []), q = !a || !f && b ? p : ub(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                    if (c && c(q, r, h, i), d) {
                        j = ub(r, n), d(j, [], h, i), k = j.length;
                        while (k--)
                            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                    }
                    if (f) {
                        if (e || a) {
                            if (e) {
                                j = [], k = r.length;
                                while (k--)
                                    (l = r[k]) && j.push(q[k] = l);
                                e(null, r = [], j, i)
                            }
                            k = r.length;
                            while (k--)
                                (l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                        }
                    } else
                        r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r)
                })
            }
            function wb(a) {
                for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function(a) {
                    return a === b
                }, h, !0), l = rb(function(a) {
                    return K.call(b, a) > -1
                }, h, !0), m = [function(a, c, d) {
                    return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
                }]; f > i; i++)
                    if (c = d.relative[a[i].type])
                        m = [rb(sb(m), c)];
                    else {
                        if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                            for (e = ++i; f > e; e++)
                                if (d.relative[a[e].type])
                                    break;
                            return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a))
                        }
                        m.push(c)
                    }
                return sb(m)
            }
            function xb(a, b) {
                var c = b.length > 0, e = a.length > 0, f = function(f, g, h, i, k) {
                    var l, m, o, p = 0, q = "0", r = f && [], s = [], t = j, u = f || e && d.find.TAG("*", k), v = w += null == t ? 1 : Math.random() || .1, x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])
                                if (o(l, g, h)) {
                                    i.push(l);
                                    break
                                }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++])
                            o(r, s, g, h);
                        if (f) {
                            if (p > 0)
                                while (q--)
                                    r[q] || s[q] || (s[q] = G.call(i));
                            s = ub(s)
                        }
                        I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
                return c ? hb(f) : f
            }
            return h = fb.compile = function(a, b) {
                var c, d = [], e = [], f = A[a + " "];
                if (!f) {
                    b || (b = g(a)), c = b.length;
                    while (c--)
                        f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
                    f = A(a, xb(e, d)), f.selector = a
                }
                return f
            }, i = fb.select = function(a, b, e, f) {
                var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
                if (e = e || [], 1 === o.length) {
                    if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                        if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b)
                            return e;
                        n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                    }
                    i = X.needsContext.test(a) ? 0 : j.length;
                    while (i--) {
                        if (k = j[i], d.relative[l = k.type])
                            break;
                        if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
                            if (j.splice(i, 1), a = f.length && qb(j), !a)
                                return I.apply(e, f), e;
                            break
                        }
                    }
                }
                return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e
            }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function(a) {
                return 1 & a.compareDocumentPosition(n.createElement("div"))
            }), ib(function(a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || jb("type|href|height|width", function(a, b, c) {
                return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), c.attributes && ib(function(a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || jb("value", function(a, b, c) {
                return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
            }), ib(function(a) {
                return null == a.getAttribute("disabled")
            }) || jb(L, function(a, b, c) {
                var d;
                return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), fb
        }(a);
        n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
        var u = n.expr.match.needsContext, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^.[^:#\[\.,]*$/;
        function x(a, b, c) {
            if (n.isFunction(b))
                return n.grep(a, function(a, d) {
                    return !!b.call(a, d, a) !== c
                });
            if (b.nodeType)
                return n.grep(a, function(a) {
                    return a === b !== c
                });
            if ("string" == typeof b) {
                if (w.test(b))
                    return n.filter(b, a, c);
                b = n.filter(b, a)
            }
            return n.grep(a, function(a) {
                return g.call(b, a) >= 0 !== c
            })
        }
        n.filter = function(a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        }, n.fn.extend({find: function(a) {
            var b, c = this.length, d = [], e = this;
            if ("string" != typeof a)
                return this.pushStack(n(a).filter(function() {
                    for (b = 0; c > b; b++)
                        if (n.contains(e[b], this))
                            return !0
                }));
            for (b = 0; c > b; b++)
                n.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },filter: function(a) {
            return this.pushStack(x(this, a || [], !1))
        },not: function(a) {
            return this.pushStack(x(this, a || [], !0))
        },is: function(a) {
            return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length
        }});
        var y, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, A = n.fn.init = function(a, b) {
            var c, d;
            if (!a)
                return this;
            if ("string" == typeof a) {
                if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)
                    return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))
                        for (c in b)
                            n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
        };
        A.prototype = n.fn, y = n(l);
        var B = /^(?:parents|prev(?:Until|All))/, C = {children: !0,contents: !0,next: !0,prev: !0};
        n.extend({dir: function(a, b, c) {
            var d = [], e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c))
                        break;
                    d.push(a)
                }
            return d
        },sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c
        }}), n.fn.extend({has: function(a) {
            var b = n(a, this), c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++)
                    if (n.contains(this, b[a]))
                        return !0
            })
        },closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? n.unique(f) : f)
        },index: function(a) {
            return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },add: function(a, b) {
            return this.pushStack(n.unique(n.merge(this.get(), n(a, b))))
        },addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }});
        function D(a, b) {
            while ((a = a[b]) && 1 !== a.nodeType)
                ;
            return a
        }
        n.each({parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },parents: function(a) {
            return n.dir(a, "parentNode")
        },parentsUntil: function(a, b, c) {
            return n.dir(a, "parentNode", c)
        },next: function(a) {
            return D(a, "nextSibling")
        },prev: function(a) {
            return D(a, "previousSibling")
        },nextAll: function(a) {
            return n.dir(a, "nextSibling")
        },prevAll: function(a) {
            return n.dir(a, "previousSibling")
        },nextUntil: function(a, b, c) {
            return n.dir(a, "nextSibling", c)
        },prevUntil: function(a, b, c) {
            return n.dir(a, "previousSibling", c)
        },siblings: function(a) {
            return n.sibling((a.parentNode || {}).firstChild, a)
        },children: function(a) {
            return n.sibling(a.firstChild)
        },contents: function(a) {
            return a.contentDocument || n.merge([], a.childNodes)
        }}, function(a, b) {
            n.fn[a] = function(c, d) {
                var e = n.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e)
            }
        });
        var E = /\S+/g, F = {};
        function G(a) {
            var b = F[a] = {};
            return n.each(a.match(E) || [], function(a, c) {
                b[c] = !0
            }), b
        }
        n.Callbacks = function(a) {
            a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);
            var b, c, d, e, f, g, h = [], i = !a.once && [], j = function(l) {
                for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++)
                    if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable())
            }, k = {add: function() {
                if (h) {
                    var c = h.length;
                    !function g(b) {
                        n.each(b, function(b, c) {
                            var d = n.type(c);
                            "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c)
                        })
                    }(arguments), d ? f = h.length : b && (e = c, j(b))
                }
                return this
            },remove: function() {
                return h && n.each(arguments, function(a, b) {
                    var c;
                    while ((c = n.inArray(b, h, c)) > -1)
                        h.splice(c, 1), d && (f >= c && f--, g >= c && g--)
                }), this
            },has: function(a) {
                return a ? n.inArray(a, h) > -1 : !(!h || !h.length)
            },empty: function() {
                return h = [], f = 0, this
            },disable: function() {
                return h = i = b = void 0, this
            },disabled: function() {
                return !h
            },lock: function() {
                return i = void 0, b || k.disable(), this
            },locked: function() {
                return !i
            },fireWith: function(a, b) {
                return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this
            },fire: function() {
                return k.fireWith(this, arguments), this
            },fired: function() {
                return !!c
            }};
            return k
        }, n.extend({Deferred: function(a) {
            var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]], c = "pending", d = {state: function() {
                return c
            },always: function() {
                return e.done(arguments).fail(arguments), this
            },then: function() {
                var a = arguments;
                return n.Deferred(function(c) {
                    n.each(b, function(b, f) {
                        var g = n.isFunction(a[b]) && a[b];
                        e[f[1]](function() {
                            var a = g && g.apply(this, arguments);
                            a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                        })
                    }), a = null
                }).promise()
            },promise: function(a) {
                return null != a ? n.extend(a, d) : d
            }}, e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },when: function(a) {
            var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && n.isFunction(a.promise) ? e : 0, g = 1 === f ? a : n.Deferred(), h = function(a, b, c) {
                return function(e) {
                    b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                }
            }, i, j, k;
            if (e > 1)
                for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
                    c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }});
        var H;
        n.fn.ready = function(a) {
            return n.ready.promise().done(a), this
        }, n.extend({isReady: !1,readyWait: 1,holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0)
        },ready: function(a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))))
        }});
        function I() {
            l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready()
        }
        n.ready.promise = function(b) {
            return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b)
        }, n.ready.promise();
        var J = n.access = function(a, b, c, d, e, f, g) {
            var h = 0, i = a.length, j = null == c;
            if ("object" === n.type(c)) {
                e = !0;
                for (h in c)
                    n.access(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                    return j.call(n(a), c)
                })), b))
                for (; i > h; h++)
                    b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        };
        n.acceptData = function(a) {
            return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
        };
        function K() {
            Object.defineProperty(this.cache = {}, 0, {get: function() {
                return {}
            }}), this.expando = n.expando + Math.random()
        }
        K.uid = 1, K.accepts = n.acceptData, K.prototype = {key: function(a) {
            if (!K.accepts(a))
                return 0;
            var b = {}, c = a[this.expando];
            if (!c) {
                c = K.uid++;
                try {
                    b[this.expando] = {value: c}, Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c, n.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },set: function(a, b, c) {
            var d, e = this.key(a), f = this.cache[e];
            if ("string" == typeof b)
                f[b] = c;
            else if (n.isEmptyObject(f))
                n.extend(this.cache[e], b);
            else
                for (d in b)
                    f[d] = b[d];
            return f
        },get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },remove: function(a, b) {
            var c, d, e, f = this.key(a), g = this.cache[f];
            if (void 0 === b)
                this.cache[f] = {};
            else {
                n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;
                while (c--)
                    delete g[d[c]]
            }
        },hasData: function(a) {
            return !n.isEmptyObject(this.cache[a[this.expando]] || {})
        },discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }};
        var L = new K, M = new K, N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;
        function P(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType)
                if (d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                    try {
                        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                    } catch (e) {
                    }
                    M.set(a, b, c)
                } else
                    c = void 0;
            return c
        }
        n.extend({hasData: function(a) {
            return M.hasData(a) || L.hasData(a)
        },data: function(a, b, c) {
            return M.access(a, b, c)
        },removeData: function(a, b) {
            M.remove(a, b)
        },_data: function(a, b, c) {
            return L.access(a, b, c)
        },_removeData: function(a, b) {
            L.remove(a, b)
        }}), n.fn.extend({data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--)
                        g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
                    L.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                M.set(this, a)
            }) : J(this, function(b) {
                var c, d = n.camelCase(a);
                if (f && void 0 === b) {
                    if (c = M.get(f, a), void 0 !== c)
                        return c;
                    if (c = M.get(f, d), void 0 !== c)
                        return c;
                    if (c = P(f, d, void 0), void 0 !== c)
                        return c
                } else
                    this.each(function() {
                        var c = M.get(this, d);
                        M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b)
                    })
            }, null, b, arguments.length > 1, null, !0)
        },removeData: function(a) {
            return this.each(function() {
                M.remove(this, a)
            })
        }}), n.extend({queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
        },dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function() {
                n.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },_queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return L.get(a, c) || L.access(a, c, {empty: n.Callbacks("once memory").add(function() {
                    L.remove(a, [b + "queue", c])
                })})
        }}), n.fn.extend({queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        },dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a)
            })
        },clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },promise: function(a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [f])
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--)
                c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }});
        var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, R = ["Top", "Right", "Bottom", "Left"], S = function(a, b) {
            return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
        }, T = /^(?:checkbox|radio)$/i;
        !function() {
            var a = l.createDocumentFragment(), b = a.appendChild(l.createElement("div")), c = l.createElement("input");
            c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
        }();
        var U = "undefined";
        k.focusinBubbles = "onfocusin" in a;
        var V = /^key/, W = /^(?:mouse|pointer|contextmenu)|click/, X = /^(?:focusinfocus|focusoutblur)$/, Y = /^([^.]*)(?:\.(.+)|)$/;
        function Z() {
            return !0
        }
        function $() {
            return !1
        }
        function _() {
            try {
                return l.activeElement
            } catch (a) {
            }
        }
        n.event = {global: {},add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.get(a);
            if (r) {
                c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
                    return typeof n !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({type: o,origType: q,data: d,handler: c,guid: c.guid,selector: e,needsContext: e && n.expr.match.needsContext.test(e),namespace: p.join(".")}, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
            }
        },remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.hasData(a) && L.get(a);
            if (r && (i = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    if (h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                        while (f--)
                            k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
                    } else
                        for (o in i)
                            n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"))
            }
        },trigger: function(b, c, d, e) {
            var f, g, h, i, k, m, o, p = [d || l], q = j.call(b, "type") ? b.type : b, r = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
                if (!e && !o.noBubble && !n.isWindow(d)) {
                    for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode)
                        p.push(g), h = g;
                    h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a)
                }
                f = 0;
                while ((g = p[f++]) && !b.isPropagationStopped())
                    b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result
            }
        },dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, e, f, g, h = [], i = d.call(arguments), j = (L.get(this, "events") || {})[a.type] || [], k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
                        (!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [], c = 0; h > c; c++)
                            f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({elem: i,handlers: d})
                    }
            return h < b.length && g.push({elem: this,handlers: b.slice(h)}), g
        },props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks: {},keyHooks: {props: "char charCode key keyCode".split(" "),filter: function(a, b) {
            return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
        }},mouseHooks: {props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter: function(a, b) {
            var c, d, e, f = b.button;
            return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
        }},fix: function(a) {
            if (a[n.expando])
                return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
            while (b--)
                c = d[b], a[c] = f[c];
            return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },special: {load: {noBubble: !0},focus: {trigger: function() {
            return this !== _() && this.focus ? (this.focus(), !1) : void 0
        },delegateType: "focusin"},blur: {trigger: function() {
            return this === _() && this.blur ? (this.blur(), !1) : void 0
        },delegateType: "focusout"},click: {trigger: function() {
            return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
        },_default: function(a) {
            return n.nodeName(a.target, "a")
        }},beforeunload: {postDispatch: function(a) {
            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }}},simulate: function(a, b, c, d) {
            var e = n.extend(new n.Event, c, {type: a,isSimulated: !0,originalEvent: {}});
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }}, n.removeEvent = function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        }, n.Event = function(a, b) {
            return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b)
        }, n.Event.prototype = {isDefaultPrevented: $,isPropagationStopped: $,isImmediatePropagationStopped: $,preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault()
        },stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation()
        },stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }}, n.each({mouseenter: "mouseover",mouseleave: "mouseout",pointerenter: "pointerover",pointerleave: "pointerout"}, function(a, b) {
            n.event.special[a] = {delegateType: b,bindType: b,handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }}
        }), k.focusinBubbles || n.each({focus: "focusin",blur: "focusout"}, function(a, b) {
            var c = function(a) {
                n.event.simulate(b, a.target, n.event.fix(a), !0)
            };
            n.event.special[b] = {setup: function() {
                var d = this.ownerDocument || this, e = L.access(d, b);
                e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1)
            },teardown: function() {
                var d = this.ownerDocument || this, e = L.access(d, b) - 1;
                e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b))
            }}
        }), n.fn.extend({on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a)
                    this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
                d = $;
            else if (!d)
                return this;
            return 1 === e && (f = d, d = function(a) {
                return n().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
                n.event.add(this, a, d, c, b)
            })
        },one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj)
                return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a)
                    this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function() {
                n.event.remove(this, a, c, b)
            })
        },trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this)
            })
        },triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }});
        var ab = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bb = /<([\w:]+)/, cb = /<|&?\w+;/, db = /<(?:script|style|link)/i, eb = /checked\s*(?:[^=]|=\s*.checked.)/i, fb = /^$|\/(?:java|ecma)script/i, gb = /^true\/(.*)/, hb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, ib = {option: [1, "<select multiple='multiple'>", "</select>"],thead: [1, "<table>", "</table>"],col: [2, "<table><colgroup>", "</colgroup></table>"],tr: [2, "<table><tbody>", "</tbody></table>"],td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],_default: [0, "", ""]};
        ib.optgroup = ib.option, ib.tbody = ib.tfoot = ib.colgroup = ib.caption = ib.thead, ib.th = ib.td;
        function jb(a, b) {
            return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }
        function kb(a) {
            return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
        }
        function lb(a) {
            var b = gb.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }
        function mb(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"))
        }
        function nb(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
                    delete g.handle, g.events = {};
                    for (e in j)
                        for (c = 0, d = j[e].length; d > c; c++)
                            n.event.add(b, e, j[e][c])
                }
                M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i))
            }
        }
        function ob(a, b) {
            var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
            return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
        }
        function pb(a, b) {
            var c = b.nodeName.toLowerCase();
            "input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
        n.extend({clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = n.contains(a.ownerDocument, a);
            if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
                for (g = ob(h), f = ob(a), d = 0, e = f.length; e > d; d++)
                    pb(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || ob(a), g = g || ob(h), d = 0, e = f.length; e > d; d++)
                        nb(f[d], g[d]);
                else
                    nb(a, h);
            return g = ob(h, "script"), g.length > 0 && mb(g, !i && ob(a, "script")), h
        },buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++)
                if (e = a[m], e || 0 === e)
                    if ("object" === n.type(e))
                        n.merge(l, e.nodeType ? [e] : e);
                    else if (cb.test(e)) {
                        f = f || k.appendChild(b.createElement("div")), g = (bb.exec(e) || ["", ""])[1].toLowerCase(), h = ib[g] || ib._default, f.innerHTML = h[1] + e.replace(ab, "<$1></$2>") + h[2], j = h[0];
                        while (j--)
                            f = f.lastChild;
                        n.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
                    } else
                        l.push(b.createTextNode(e));
            k.textContent = "", m = 0;
            while (e = l[m++])
                if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = ob(k.appendChild(e), "script"), i && mb(f), c)) {
                    j = 0;
                    while (e = f[j++])
                        fb.test(e.type || "") && c.push(e)
                }
            return k
        },cleanData: function(a) {
            for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
                    if (b.events)
                        for (d in b.events)
                            f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
                    L.cache[e] && delete L.cache[e]
                }
                delete M.cache[c[M.expando]]
            }
        }}), n.fn.extend({text: function(a) {
            return J(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = jb(this, a);
                    b.appendChild(a)
                }
            })
        },prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = jb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },remove: function(a, b) {
            for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
                b || 1 !== c.nodeType || n.cleanData(ob(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && mb(ob(c, "script")), c.parentNode.removeChild(c));
            return this
        },empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++)
                1 === a.nodeType && (n.cleanData(ob(a, !1)), a.textContent = "");
            return this
        },clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return n.clone(this, a, b)
            })
        },html: function(a) {
            return J(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType)
                    return b.innerHTML;
                if ("string" == typeof a && !db.test(a) && !ib[(bb.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(ab, "<$1></$2>");
                    try {
                        for (; d > c; c++)
                            b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ob(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, n.cleanData(ob(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },detach: function(a) {
            return this.remove(a, !0)
        },domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0, l = this.length, m = this, o = l - 1, p = a[0], q = n.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && eb.test(p))
                return this.each(function(c) {
                    var d = m.eq(c);
                    q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
                });
            if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (f = n.map(ob(c, "script"), kb), g = f.length; l > j; j++)
                    h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, ob(h, "script"))), b.call(this[j], h, j);
                if (g)
                    for (i = f[f.length - 1].ownerDocument, n.map(f, lb), j = 0; g > j; j++)
                        h = f[j], fb.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(hb, "")))
            }
            return this
        }}), n.each({appendTo: "append",prependTo: "prepend",insertBefore: "before",insertAfter: "after",replaceAll: "replaceWith"}, function(a, b) {
            n.fn[a] = function(a) {
                for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++)
                    c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
                return this.pushStack(d)
            }
        });
        var qb, rb = {};
        function sb(b, c) {
            var d, e = n(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");
            return e.detach(), f
        }
        function tb(a) {
            var b = l, c = rb[a];
            return c || (c = sb(a, b), "none" !== c && c || (qb = (qb || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qb[0].contentDocument, b.write(), b.close(), c = sb(a, b), qb.detach()), rb[a] = c), c
        }
        var ub = /^margin/, vb = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"), wb = function(a) {
            return a.ownerDocument.defaultView.getComputedStyle(a, null)
        };
        function xb(a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || wb(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), vb.test(g) && ub.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
        }
        function yb(a, b) {
            return {get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }}
        }
        !function() {
            var b, c, d = l.documentElement, e = l.createElement("div"), f = l.createElement("div");
            if (f.style) {
                f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);
                function g() {
                    f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);
                    var g = a.getComputedStyle(f, null);
                    b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e)
                }
                a.getComputedStyle && n.extend(k, {pixelPosition: function() {
                    return g(), b
                },boxSizingReliable: function() {
                    return null == c && g(), c
                },reliableMarginRight: function() {
                    var b, c = f.appendChild(l.createElement("div"));
                    return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), b
                }})
            }
        }(), n.swap = function(a, b, c, d) {
            var e, f, g = {};
            for (f in b)
                g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b)
                a.style[f] = g[f];
            return e
        };
        var zb = /^(none|table(?!-c[ea]).+)/, Ab = new RegExp("^(" + Q + ")(.*)$", "i"), Bb = new RegExp("^([+-])=(" + Q + ")", "i"), Cb = {position: "absolute",visibility: "hidden",display: "block"}, Db = {letterSpacing: "0",fontWeight: "400"}, Eb = ["Webkit", "O", "Moz", "ms"];
        function Fb(a, b) {
            if (b in a)
                return b;
            var c = b[0].toUpperCase() + b.slice(1), d = b, e = Eb.length;
            while (e--)
                if (b = Eb[e] + c, b in a)
                    return b;
            return d
        }
        function Gb(a, b, c) {
            var d = Ab.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }
        function Hb(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
                "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
            return g
        }
        function Ib(a, b, c) {
            var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = wb(a), g = "border-box" === n.css(a, "boxSizing", !1, f);
            if (0 >= e || null == e) {
                if (e = xb(a, b, f), (0 > e || null == e) && (e = a.style[b]), vb.test(e))
                    return e;
                d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + Hb(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }
        function Jb(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
                d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", tb(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
            for (g = 0; h > g; g++)
                d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
            return a
        }
        n.extend({cssHooks: {opacity: {get: function(a, b) {
            if (b) {
                var c = xb(a, "opacity");
                return "" === c ? "1" : c
            }
        }}},cssNumber: {columnCount: !0,fillOpacity: !0,flexGrow: !0,flexShrink: !0,fontWeight: !0,lineHeight: !0,opacity: !0,order: !0,orphans: !0,widows: !0,zIndex: !0,zoom: !0},cssProps: {"float": "cssFloat"},style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                return b = n.cssProps[h] || (n.cssProps[h] = Fb(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Bb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Fb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xb(a, b, d)), "normal" === e && b in Db && (e = Db[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e
        }}), n.each(["height", "width"], function(a, b) {
            n.cssHooks[b] = {get: function(a, c, d) {
                return c ? zb.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Cb, function() {
                    return Ib(a, b, d)
                }) : Ib(a, b, d) : void 0
            },set: function(a, c, d) {
                var e = d && wb(a);
                return Gb(a, c, d ? Hb(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
            }}
        }), n.cssHooks.marginRight = yb(k.reliableMarginRight, function(a, b) {
            return b ? n.swap(a, {display: "inline-block"}, xb, [a, "marginRight"]) : void 0
        }), n.each({margin: "",padding: "",border: "Width"}, function(a, b) {
            n.cssHooks[a + b] = {expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                    e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }}, ub.test(a) || (n.cssHooks[a + b].set = Gb)
        }), n.fn.extend({css: function(a, b) {
            return J(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = wb(a), e = b.length; e > g; g++)
                        f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        },show: function() {
            return Jb(this, !0)
        },hide: function() {
            return Jb(this)
        },toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                S(this) ? n(this).show() : n(this).hide()
            })
        }});
        function Kb(a, b, c, d, e) {
            return new Kb.prototype.init(a, b, c, d, e)
        }
        n.Tween = Kb, Kb.prototype = {constructor: Kb,init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
        },cur: function() {
            var a = Kb.propHooks[this.prop];
            return a && a.get ? a.get(this) : Kb.propHooks._default.get(this)
        },run: function(a) {
            var b, c = Kb.propHooks[this.prop];
            return this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Kb.propHooks._default.set(this), this
        }}, Kb.prototype.init.prototype = Kb.prototype, Kb.propHooks = {_default: {get: function(a) {
            var b;
            return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
        },set: function(a) {
            n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
        }}}, Kb.propHooks.scrollTop = Kb.propHooks.scrollLeft = {set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }}, n.easing = {linear: function(a) {
            return a
        },swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }}, n.fx = Kb.prototype.init, n.fx.step = {};
        var Lb, Mb, Nb = /^(?:toggle|show|hide)$/, Ob = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"), Pb = /queueHooks$/, Qb = [Vb], Rb = {"*": [function(a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = Ob.exec(b), f = e && e[3] || (n.cssNumber[a] ? "" : "px"), g = (n.cssNumber[a] || "px" !== f && +d) && Ob.exec(n.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do
                    h = h || ".5", g /= h, n.style(c.elem, a, g + f);
                while (h !== (h = c.cur() / d) && 1 !== h && --i)
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
        }]};
        function Sb() {
            return setTimeout(function() {
                Lb = void 0
            }), Lb = n.now()
        }
        function Tb(a, b) {
            var c, d = 0, e = {height: a};
            for (b = b ? 1 : 0; 4 > d; d += 2 - b)
                c = R[d], e["margin" + c] = e["padding" + c] = a;
            return b && (e.opacity = e.width = a), e
        }
        function Ub(a, b, c) {
            for (var d, e = (Rb[b] || []).concat(Rb["*"]), f = 0, g = e.length; g > f; f++)
                if (d = e[f].call(c, b, a))
                    return d
        }
        function Vb(a, b, c) {
            var d, e, f, g, h, i, j, k, l = this, m = {}, o = a.style, p = a.nodeType && S(a), q = L.get(a, "fxshow");
            c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
                h.unqueued || i()
            }), h.unqueued++, l.always(function() {
                l.always(function() {
                    h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
                })
            })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || tb(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
                o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
            }));
            for (d in b)
                if (e = b[d], Nb.exec(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                        if ("show" !== e || !q || void 0 === q[d])
                            continue;
                        p = !0
                    }
                    m[d] = q && q[d] || n.style(a, d)
                } else
                    j = void 0;
            if (n.isEmptyObject(m))
                "inline" === ("none" === j ? tb(a.nodeName) : j) && (o.display = j);
            else {
                q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
                    n(a).hide()
                }), l.done(function() {
                    var b;
                    L.remove(a, "fxshow");
                    for (b in m)
                        n.style(a, b, m[b])
                });
                for (d in m)
                    g = Ub(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
            }
        }
        function Wb(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f)
                        c in a || (a[c] = f[c], b[c] = e)
                } else
                    b[d] = e
        }
        function Xb(a, b, c) {
            var d, e, f = 0, g = Qb.length, h = n.Deferred().always(function() {
                delete i.elem
            }), i = function() {
                if (e)
                    return !1;
                for (var b = Lb || Sb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                    j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            }, j = h.promise({elem: a,props: n.extend({}, b),opts: n.extend(!0, {specialEasing: {}}, c),originalProperties: b,originalOptions: c,startTime: Lb || Sb(),duration: c.duration,tweens: [],createTween: function(b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e)
                    return this;
                for (e = !0; d > c; c++)
                    j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
            }}), k = j.props;
            for (Wb(k, j.opts.specialEasing); g > f; f++)
                if (d = Qb[f].call(j, a, k, j.opts))
                    return d;
            return n.map(k, Ub, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {elem: a,anim: j,queue: j.opts.queue})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }
        n.Animation = n.extend(Xb, {tweener: function(a, b) {
            n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++)
                c = a[d], Rb[c] = Rb[c] || [], Rb[c].unshift(b)
        },prefilter: function(a, b) {
            b ? Qb.unshift(a) : Qb.push(a)
        }}), n.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? n.extend({}, a) : {complete: c || !c && b || n.isFunction(a) && a,duration: a,easing: c && b || b && !n.isFunction(b) && b};
            return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
            }, d
        }, n.fn.extend({fadeTo: function(a, b, c, d) {
            return this.filter(S).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        },animate: function(a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function() {
                var b = Xb(this, n.extend({}, a), f);
                (e || L.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = n.timers, g = L.get(this);
                if (e)
                    g[e] && g[e].stop && d(g[e]);
                else
                    for (e in g)
                        g[e] && g[e].stop && Pb.test(e) && d(g[e]);
                for (e = f.length; e--; )
                    f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                (b || !c) && n.dequeue(this, a)
            })
        },finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = L.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers, g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--; )
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++)
                    d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }}), n.each(["toggle", "show", "hide"], function(a, b) {
            var c = n.fn[b];
            n.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Tb(b, !0), a, d, e)
            }
        }), n.each({slideDown: Tb("show"),slideUp: Tb("hide"),slideToggle: Tb("toggle"),fadeIn: {opacity: "show"},fadeOut: {opacity: "hide"},fadeToggle: {opacity: "toggle"}}, function(a, b) {
            n.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), n.timers = [], n.fx.tick = function() {
            var a, b = 0, c = n.timers;
            for (Lb = n.now(); b < c.length; b++)
                a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || n.fx.stop(), Lb = void 0
        }, n.fx.timer = function(a) {
            n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
        }, n.fx.interval = 13, n.fx.start = function() {
            Mb || (Mb = setInterval(n.fx.tick, n.fx.interval))
        }, n.fx.stop = function() {
            clearInterval(Mb), Mb = null
        }, n.fx.speeds = {slow: 600,fast: 200,_default: 400}, n.fn.delay = function(a, b) {
            return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        }, function() {
            var a = l.createElement("input"), b = l.createElement("select"), c = b.appendChild(l.createElement("option"));
            a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value
        }();
        var Yb, Zb, $b = n.expr.attrHandle;
        n.fn.extend({attr: function(a, b) {
            return J(this, n.attr, a, b, arguments.length > 1)
        },removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a)
            })
        }}), n.extend({attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f)
                return typeof a.getAttribute === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Zb : Yb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b))
        },removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(E);
            if (f && 1 === a.nodeType)
                while (c = f[e++])
                    d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },attrHooks: {type: {set: function(a, b) {
            if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
                var c = a.value;
                return a.setAttribute("type", b), c && (a.value = c), b
            }
        }}}}), Zb = {set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
        }}, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
            var c = $b[b] || n.find.attr;
            $b[b] = function(a, b, d) {
                var e, f;
                return d || (f = $b[b], $b[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $b[b] = f), e
            }
        });
        var _b = /^(?:input|select|textarea|button)$/i;
        n.fn.extend({prop: function(a, b) {
            return J(this, n.prop, a, b, arguments.length > 1)
        },removeProp: function(a) {
            return this.each(function() {
                delete this[n.propFix[a] || a]
            })
        }}), n.extend({propFix: {"for": "htmlFor","class": "className"},prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g)
                return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },propHooks: {tabIndex: {get: function(a) {
            return a.hasAttribute("tabindex") || _b.test(a.nodeName) || a.href ? a.tabIndex : -1
        }}}}), k.optSelected || (n.propHooks.selected = {get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }}), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            n.propFix[this.toLowerCase()] = this
        });
        var ac = /[\t\r\n\f]/g;
        n.fn.extend({addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a, i = 0, j = this.length;
            if (n.isFunction(a))
                return this.each(function(b) {
                    n(this).addClass(a.call(this, b, this.className))
                });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ac, " ") : " ")) {
                        f = 0;
                        while (e = b[f++])
                            d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = n.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a, i = 0, j = this.length;
            if (n.isFunction(a))
                return this.each(function(b) {
                    n(this).removeClass(a.call(this, b, this.className))
                });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ac, " ") : "")) {
                        f = 0;
                        while (e = b[f++])
                            while (d.indexOf(" " + e + " ") >= 0)
                                d = d.replace(" " + e + " ", " ");
                        g = a ? n.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0, e = n(this), f = a.match(E) || [];
                    while (b = f[d++])
                        e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else
                    (c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "")
            })
        },hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ac, " ").indexOf(b) >= 0)
                    return !0;
            return !1
        }});
        var bc = /\r/g;
        n.fn.extend({val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length)
                    return d = n.isFunction(a), this.each(function(c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                            return null == a ? "" : a + ""
                        })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                if (e)
                    return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bc, "") : null == c ? "" : c)
            }
        }}), n.extend({valHooks: {option: {get: function(a) {
            var b = n.find.attr(a, "value");
            return null != b ? b : n.trim(n.text(a))
        }},select: {get: function(a) {
            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
                    if (b = n(c).val(), f)
                        return b;
                    g.push(b)
                }
            return g
        },set: function(a, b) {
            var c, d, e = a.options, f = n.makeArray(b), g = e.length;
            while (g--)
                d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
            return c || (a.selectedIndex = -1), f
        }}}}), n.each(["radio", "checkbox"], function() {
            n.valHooks[this] = {set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0
            }}, k.checkOn || (n.valHooks[this].get = function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
            n.fn[b] = function(a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), n.fn.extend({hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },unbind: function(a, b) {
            return this.off(a, null, b)
        },delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }});
        var cc = n.now(), dc = /\?/;
        n.parseJSON = function(a) {
            return JSON.parse(a + "")
        }, n.parseXML = function(a) {
            var b, c;
            if (!a || "string" != typeof a)
                return null;
            try {
                c = new DOMParser, b = c.parseFromString(a, "text/xml")
            } catch (d) {
                b = void 0
            }
            return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b
        };
        var ec, fc, gc = /#.*$/, hc = /([?&])_=[^&]*/, ic = /^(.*?):[ \t]*([^\r\n]*)$/gm, jc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, kc = /^(?:GET|HEAD)$/, lc = /^\/\//, mc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, nc = {}, oc = {}, pc = "*/".concat("*");
        try {
            fc = location.href
        } catch (qc) {
            fc = l.createElement("a"), fc.href = "", fc = fc.href
        }
        ec = mc.exec(fc.toLowerCase()) || [];
        function rc(a) {
            return function(b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0, f = b.toLowerCase().match(E) || [];
                if (n.isFunction(c))
                    while (d = f[e++])
                        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }
        function sc(a, b, c, d) {
            var e = {}, f = a === oc;
            function g(h) {
                var i;
                return e[h] = !0, n.each(a[h] || [], function(a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
                }), i
            }
            return g(b.dataTypes[0]) || !e["*"] && g("*")
        }
        function tc(a, b) {
            var c, d, e = n.ajaxSettings.flatOptions || {};
            for (c in b)
                void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
            return d && n.extend(!0, a, d), a
        }
        function uc(a, b, c) {
            var d, e, f, g, h = a.contents, i = a.dataTypes;
            while ("*" === i[0])
                i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d)
                for (e in h)
                    if (h[e] && h[e].test(d)) {
                        i.unshift(e);
                        break
                    }
            if (i[0] in c)
                f = i[0];
            else {
                for (e in c) {
                    if (!i[0] || a.converters[e + " " + i[0]]) {
                        f = e;
                        break
                    }
                    g || (g = e)
                }
                f = f || g
            }
            return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
        }
        function vc(a, b, c, d) {
            var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
            if (k[1])
                for (g in a.converters)
                    j[g.toLowerCase()] = a.converters[g];
            f = k.shift();
            while (f)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f)
                        f = i;
                    else if ("*" !== i && i !== f) {
                        if (g = j[i + " " + f] || j["* " + f], !g)
                            for (e in j)
                                if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                    break
                                }
                        if (g !== !0)
                            if (g && a["throws"])
                                b = g(b);
                            else
                                try {
                                    b = g(b)
                                } catch (l) {
                                    return {state: "parsererror",error: g ? l : "No conversion from " + i + " to " + f}
                                }
                    }
            return {state: "success",data: b}
        }
        n.extend({active: 0,lastModified: {},etag: {},ajaxSettings: {url: fc,type: "GET",isLocal: jc.test(ec[1]),global: !0,processData: !0,async: !0,contentType: "application/x-www-form-urlencoded; charset=UTF-8",accepts: {"*": pc,text: "text/plain",html: "text/html",xml: "application/xml, text/xml",json: "application/json, text/javascript"},contents: {xml: /xml/,html: /html/,json: /json/},responseFields: {xml: "responseXML",text: "responseText",json: "responseJSON"},converters: {"* text": String,"text html": !0,"text json": n.parseJSON,"text xml": n.parseXML},flatOptions: {url: !0,context: !0}},ajaxSetup: function(a, b) {
            return b ? tc(tc(a, n.ajaxSettings), b) : tc(n.ajaxSettings, a)
        },ajaxPrefilter: rc(nc),ajaxTransport: rc(oc),ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b), l = k.context || k, m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event, o = n.Deferred(), p = n.Callbacks("once memory"), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {readyState: 0,getResponseHeader: function(a) {
                var b;
                if (2 === t) {
                    if (!f) {
                        f = {};
                        while (b = ic.exec(e))
                            f[b[1].toLowerCase()] = b[2]
                    }
                    b = f[a.toLowerCase()]
                }
                return null == b ? null : b
            },getAllResponseHeaders: function() {
                return 2 === t ? e : null
            },setRequestHeader: function(a, b) {
                var c = a.toLowerCase();
                return t || (a = s[c] = s[c] || a, r[a] = b), this
            },overrideMimeType: function(a) {
                return t || (k.mimeType = a), this
            },statusCode: function(a) {
                var b;
                if (a)
                    if (2 > t)
                        for (b in a)
                            q[b] = [q[b], a[b]];
                    else
                        v.always(a[v.status]);
                return this
            },abort: function(a) {
                var b = a || u;
                return c && c.abort(b), x(0, b), this
            }};
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || fc) + "").replace(gc, "").replace(lc, ec[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = mc.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === ec[1] && h[2] === ec[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (ec[3] || ("http:" === ec[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), sc(nc, k, b, v), 2 === t)
                return v;
            i = k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !kc.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (dc.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = hc.test(d) ? d.replace(hc, "$1_=" + cc++) : d + (dc.test(d) ? "&" : "?") + "_=" + cc++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + pc + "; q=0.01" : "") : k.accepts["*"]);
            for (j in k.headers)
                v.setRequestHeader(j, k.headers[j]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
                return v.abort();
            u = "abort";
            for (j in {success: 1,error: 1,complete: 1})
                v[j](k[j]);
            if (c = sc(oc, k, b, v)) {
                v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, c.send(r, x)
                } catch (w) {
                    if (!(2 > t))
                        throw w;
                    x(-1, w)
                }
            } else
                x(-1, "No Transport");
            function x(a, b, f, h) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = uc(k, v, f)), u = vc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")))
            }
            return v
        },getJSON: function(a, b, c) {
            return n.get(a, b, c, "json")
        },getScript: function(a, b) {
            return n.get(a, void 0, b, "script")
        }}), n.each(["get", "post"], function(a, b) {
            n[b] = function(a, c, d, e) {
                return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({url: a,type: b,dataType: e,data: c,success: d})
            }
        }), n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
            n.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), n._evalUrl = function(a) {
            return n.ajax({url: a,type: "GET",dataType: "script",async: !1,global: !1,"throws": !0})
        }, n.fn.extend({wrapAll: function(a) {
            var b;
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                var a = this;
                while (a.firstElementChild)
                    a = a.firstElementChild;
                return a
            }).append(this)), this)
        },wrapInner: function(a) {
            return this.each(n.isFunction(a) ? function(b) {
                n(this).wrapInner(a.call(this, b))
            } : function() {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        },unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }}), n.expr.filters.hidden = function(a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0
        }, n.expr.filters.visible = function(a) {
            return !n.expr.filters.hidden(a)
        };
        var wc = /%20/g, xc = /\[\]$/, yc = /\r?\n/g, zc = /^(?:submit|button|image|reset|file)$/i, Ac = /^(?:input|select|textarea|keygen)/i;
        function Bc(a, b, c, d) {
            var e;
            if (n.isArray(b))
                n.each(b, function(b, e) {
                    c || xc.test(a) ? d(a, e) : Bc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                });
            else if (c || "object" !== n.type(b))
                d(a, b);
            else
                for (e in b)
                    Bc(a + "[" + e + "]", b[e], c, d)
        }
        n.param = function(a, b) {
            var c, d = [], e = function(a, b) {
                b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))
                n.each(a, function() {
                    e(this.name, this.value)
                });
            else
                for (c in a)
                    Bc(c, a[c], b, e);
            return d.join("&").replace(wc, "+")
        }, n.fn.extend({serialize: function() {
            return n.param(this.serializeArray())
        },serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && Ac.test(this.nodeName) && !zc.test(a) && (this.checked || !T.test(a))
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {name: b.name,value: a.replace(yc, "\r\n")}
                }) : {name: b.name,value: c.replace(yc, "\r\n")}
            }).get()
        }}), n.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (a) {
            }
        };
        var Cc = 0, Dc = {}, Ec = {0: 200,1223: 204}, Fc = n.ajaxSettings.xhr();
        a.ActiveXObject && n(a).on("unload", function() {
            for (var a in Dc)
                Dc[a]()
        }), k.cors = !!Fc && "withCredentials" in Fc, k.ajax = Fc = !!Fc, n.ajaxTransport(function(a) {
            var b;
            return k.cors || Fc && !a.crossDomain ? {send: function(c, d) {
                var e, f = a.xhr(), g = ++Cc;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields)
                        f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c)
                    f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Dc[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Ec[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {text: f.responseText} : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Dc[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (h) {
                    if (b)
                        throw h
                }
            },abort: function() {
                b && b()
            }} : void 0
        }), n.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents: {script: /(?:java|ecma)script/},converters: {"text script": function(a) {
            return n.globalEval(a), a
        }}}), n.ajaxPrefilter("script", function(a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
        }), n.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var b, c;
                return {send: function(d, e) {
                    b = n("<script>").prop({async: !0,charset: a.scriptCharset,src: a.url}).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), l.head.appendChild(b[0])
                },abort: function() {
                    c && c()
                }}
            }
        });
        var Gc = [], Hc = /(=)\?(?=&|$)|\?\?/;
        n.ajaxSetup({jsonp: "callback",jsonpCallback: function() {
            var a = Gc.pop() || n.expando + "_" + cc++;
            return this[a] = !0, a
        }}), n.ajaxPrefilter("json jsonp", function(b, c, d) {
            var e, f, g, h = b.jsonp !== !1 && (Hc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hc.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Hc, "$1" + e) : b.jsonp !== !1 && (b.url += (dc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
                return g || n.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
                g = arguments
            }, d.always(function() {
                a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
            }), "script") : void 0
        }), n.parseHTML = function(a, b, c) {
            if (!a || "string" != typeof a)
                return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || l;
            var d = v.exec(a), e = !c && [];
            return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes))
        };
        var Ic = n.fn.load;
        n.fn.load = function(a, b, c) {
            if ("string" != typeof a && Ic)
                return Ic.apply(this, arguments);
            var d, e, f, g = this, h = a.indexOf(" ");
            return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({url: a,type: e,dataType: "html",data: b}).done(function(a) {
                f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
            }).complete(c && function(a, b) {
                    g.each(c, f || [a.responseText, b, a])
                }), this
        }, n.expr.filters.animated = function(a) {
            return n.grep(n.timers, function(b) {
                return a === b.elem
            }).length
        };
        var Jc = a.document.documentElement;
        function Kc(a) {
            return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
        }
        n.offset = {setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }}, n.fn.extend({offset: function(a) {
            if (arguments.length)
                return void 0 === a ? this : this.each(function(b) {
                    n.offset.setOffset(this, a, b)
                });
            var b, c, d = this[0], e = {top: 0,left: 0}, f = d && d.ownerDocument;
            if (f)
                return b = f.documentElement, n.contains(b, d) ? (typeof d.getBoundingClientRect !== U && (e = d.getBoundingClientRect()), c = Kc(f), {top: e.top + c.pageYOffset - b.clientTop,left: e.left + c.pageXOffset - b.clientLeft}) : e
        },position: function() {
            if (this[0]) {
                var a, b, c = this[0], d = {top: 0,left: 0};
                return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {top: b.top - d.top - n.css(c, "marginTop", !0),left: b.left - d.left - n.css(c, "marginLeft", !0)}
            }
        },offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || Jc;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position"))
                    a = a.offsetParent;
                return a || Jc
            })
        }}), n.each({scrollLeft: "pageXOffset",scrollTop: "pageYOffset"}, function(b, c) {
            var d = "pageYOffset" === c;
            n.fn[b] = function(e) {
                return J(this, function(b, e, f) {
                    var g = Kc(b);
                    return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
                }, b, e, arguments.length, null)
            }
        }), n.each(["top", "left"], function(a, b) {
            n.cssHooks[b] = yb(k.pixelPosition, function(a, c) {
                return c ? (c = xb(a, b), vb.test(c) ? n(a).position()[b] + "px" : c) : void 0
            })
        }), n.each({Height: "height",Width: "width"}, function(a, b) {
            n.each({padding: "inner" + a,content: b,"": "outer" + a}, function(c, d) {
                n.fn[d] = function(d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return J(this, function(b, c, d) {
                        var e;
                        return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                    }, b, f ? d : void 0, f, null)
                }
            })
        }), n.fn.size = function() {
            return this.length
        }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return n
        });
        var Lc = a.jQuery, Mc = a.$;
        return n.noConflict = function(b) {
            return a.$ === n && (a.$ = Mc), b && a.jQuery === n && (a.jQuery = Lc), n
        }, typeof b === U && (a.jQuery = a.$ = n), n
    });

    /*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
    (function($) {
        'use strict';
        var escape = /["\\\x00-\x1f\x7f-\x9f]/g, meta = {'\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"': '\\"','\\': '\\\\'}, hasOwn = Object.prototype.hasOwnProperty;
        $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function(o) {
            if (o === null) {
                return 'null';
            }
            var pairs, k, name, val, type = $.type(o);
            if (type === 'undefined') {
                return undefined;
            }
            if (type === 'number' || type === 'boolean') {
                return String(o);
            }
            if (type === 'string') {
                return $.quoteString(o);
            }
            if (typeof o.toJSON === 'function') {
                return $.toJSON(o.toJSON());
            }
            if (type === 'date') {
                var month = o.getUTCMonth() + 1, day = o.getUTCDate(), year = o.getUTCFullYear(), hours = o.getUTCHours(), minutes = o.getUTCMinutes(), seconds = o.getUTCSeconds(), milli = o.getUTCMilliseconds();
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
            }
            pairs = [];
            if ($.isArray(o)) {
                for (k = 0; k < o.length; k++) {
                    pairs.push($.toJSON(o[k]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }
            if (typeof o === 'object') {
                for (k in o) {
                    if (hasOwn.call(o, k)) {
                        type = typeof k;
                        if (type === 'number') {
                            name = '"' + k + '"';
                        } else if (type === 'string') {
                            name = $.quoteString(k);
                        } else {
                            continue;
                        }
                        type = typeof o[k];
                        if (type !== 'function' && type !== 'undefined') {
                            val = $.toJSON(o[k]);
                            pairs.push(name + ':' + val);
                        }
                    }
                }
                return '{' + pairs.join(',') + '}';
            }
        };
        $.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
            return eval('(' + str + ')');
        };
        $.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
            var filtered = str.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
            if (/^[\],:{}\s]*$/.test(filtered)) {
                return eval('(' + str + ')');
            }
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        };
        $.quoteString = function(str) {
            if (str.match(escape)) {
                return '"' + str.replace(escape, function(a) {
                        var c = meta[a];
                        if (typeof c === 'string') {
                            return c;
                        }
                        c = a.charCodeAt();
                        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                    }) + '"';
            }
            return '"' + str + '"';
        };
    }(jQuery));

    /*!
     * jQuery Cookie Plugin v1.3.1
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2013 Klaus Hartl
     * Released under the MIT license
     */
    (function($, document, undefined) {

        var pluses = /\+/g;

        function raw(s) {
            return s;
        }

        function decoded(s) {
            return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
        }

        function unRfc2068(value) {
            if (value.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape
                value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            return value;
        }

        function fromJSON(value) {
            return config.json ? JSON.parse(value) : value;
        }

        var config = $.cookie = function(key, value, options) {

            // write
            if (value !== undefined) {
                options = $.extend({}, config.defaults, options);

                if (value === null) {
                    options.expires = -1;
                }

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }

                value = config.json ? JSON.stringify(value) : String(value);

                return (document.cookie = [
                    encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',  // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }

            // read
            var decode = config.raw ? raw : decoded;
            var cookies = document.cookie.split('; ');
            var result = key ? null : {};
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = decode(parts.join('='));

                if (key && key === name) {
                    result = fromJSON(cookie);
                    break;
                }

                if (!key) {
                    result[name] = fromJSON(cookie);
                }
            }

            return result;
        };

        config.defaults = {};

        $.removeCookie = function(key, options) {
            if ($.cookie(key) !== null) {
                $.cookie(key, null, options);
                return true;
            }
            return false;
        };

    })(jQuery, document);

    // region FSRTC

    /*
     * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
     * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
     *
     * Version: MPL 1.1
     *
     * The contents of this file are subject to the Mozilla Public License Version
     * 1.1 (the "License"); you may not use this file except in compliance with
     * the License. You may obtain a copy of the License at
     * http://www.mozilla.org/MPL/
     *
     * Software distributed under the License is distributed on an "AS IS" basis,
     * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
     * for the specific language governing rights and limitations under the
     * License.
     *
     * The Original Code is Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
     *
     * The Initial Developer of the Original Code is
     * Anthony Minessale II <anthm@freeswitch.org>
     * Portions created by the Initial Developer are Copyright (C)
     * the Initial Developer. All Rights Reserved.
     *
     * Contributor(s):
     *
     * Anthony Minessale II <anthm@freeswitch.org>
     *
     * jquery.FSRTC.js - WebRTC Glue code
     *
     */

    (function($) {

        // Find the line in sdpLines that starts with |prefix|, and, if specified,
        // contains |substr| (case-insensitive search).
        function findLine(sdpLines, prefix, substr) {
            return findLineInRange(sdpLines, 0, -1, prefix, substr);
        }

        // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
        // and, if specified, contains |substr| (case-insensitive search).
        function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
            var realEndLine = (endLine != -1) ? endLine : sdpLines.length;
            for (var i = startLine; i < realEndLine; ++i) {
                if (sdpLines[i].indexOf(prefix) === 0) {
                    if (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
                        return i;
                    }
                }
            }
            return null;
        }

        // Gets the codec payload type from an a=rtpmap:X line.
        function getCodecPayloadType(sdpLine) {
            var pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
            var result = sdpLine.match(pattern);
            return (result && result.length == 2) ? result[1] : null;
        }

        // Returns a new m= line with the specified codec as the first one.
        function setDefaultCodec(mLine, payload) {
            var elements = mLine.split(' ');
            var newLine = [];
            var index = 0;
            for (var i = 0; i < elements.length; i++) {
                if (index === 3) { // Format of media starts from the fourth.
                    newLine[index++] = payload; // Put target payload to the first.
                }
                if (elements[i] !== payload) newLine[index++] = elements[i];
            }
            return newLine.join(' ');
        }

        $.FSRTC = function(options) {
            this.options = $.extend({
                useVideo: null,
                useStereo: false,
                userData: null,
                localVideo: null,
                screenShare: false,
                useCamera: "any",
                iceServers: false,
                videoParams: {},
                audioParams: {},
                callbacks: {
                    onICEComplete: function() {},
                    onICE: function() {},
                    onOfferSDP: function() {}
                },
            }, options);

            this.enabled = true;


            this.mediaData = {
                SDP: null,
                profile: {},
                candidateList: []
            };


            if (moz) {
                this.constraints = {
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: this.options.useVideo ? true : false,
                };
            } else {
                this.constraints = {
                    optional: [{
                        'DtlsSrtpKeyAgreement': 'true'
                    }],mandatory: {
                        OfferToReceiveAudio: true,
                        OfferToReceiveVideo: this.options.useVideo ? true : false,
                    }
                };
            }

            if (self.options.useVideo) {
                self.options.useVideo.style.display = 'none';
            }

            setCompat();
            checkCompat();
        };

        $.FSRTC.validRes = [];

        $.FSRTC.prototype.useVideo = function(obj, local) {
            var self = this;

            if (obj) {
                self.options.useVideo = obj;
                self.options.localVideo = local;
                if (moz) {
                    self.constraints.offerToReceiveVideo = true;
                } else {
                    self.constraints.mandatory.OfferToReceiveVideo = true;
                }
            } else {
                self.options.useVideo = null;
                self.options.localVideo = null;
                if (moz) {
                    self.constraints.offerToReceiveVideo = false;
                } else {
                    self.constraints.mandatory.OfferToReceiveVideo = false;
                }
            }

            if (self.options.useVideo) {
                self.options.useVideo.style.display = 'none';
            }
        };

        $.FSRTC.prototype.useStereo = function(on) {
            var self = this;
            self.options.useStereo = on;
        };

        // Sets Opus in stereo if stereo is enabled, by adding the stereo=1 fmtp param.
        $.FSRTC.prototype.stereoHack = function(sdp) {
            var self = this;

            if (!self.options.useStereo) {
                return sdp;
            }

            var sdpLines = sdp.split('\r\n');

            // Find opus payload.
            var opusIndex = findLine(sdpLines, 'a=rtpmap', 'opus/48000'), opusPayload;

            if (!opusIndex) {
                return sdp;
            } else {
                opusPayload = getCodecPayloadType(sdpLines[opusIndex]);
            }

            // Find the payload in fmtp line.
            var fmtpLineIndex = findLine(sdpLines, 'a=fmtp:' + opusPayload.toString());

            if (fmtpLineIndex === null) {
                // create an fmtp line
                sdpLines[opusIndex] = sdpLines[opusIndex] + '\r\na=fmtp:' + opusPayload.toString() + " stereo=1; sprop-stereo=1"
            } else {
                // Append stereo=1 to fmtp line.
                sdpLines[fmtpLineIndex] = sdpLines[fmtpLineIndex].concat('; stereo=1; sprop-stereo=1');
            }

            sdp = sdpLines.join('\r\n');
            return sdp;
        };

        function setCompat() {
            $.FSRTC.moz = !!navigator.mozGetUserMedia;
            //navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
            if (!navigator.getUserMedia) {
                navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
            }
        }

        function checkCompat() {
            if (!navigator.getUserMedia) {
                alert('This application cannot function in this browser.');
                return false;
            }
            return true;
        }

        function onStreamError(self, e) {
            console.log('There has been a problem retrieving the streams - did you allow access? Check Device Resolution', e);
            doCallback(self, "onError", e);
        }

        function onStreamSuccess(self, stream) {
            console.log("Stream Success");
            doCallback(self, "onStream", stream);
        }

        function onICE(self, candidate) {
            self.mediaData.candidate = candidate;
            self.mediaData.candidateList.push(self.mediaData.candidate);

            doCallback(self, "onICE");
        }

        function doCallback(self, func, arg) {
            if (func in self.options.callbacks) {
                self.options.callbacks[func](self, arg);
            }
        }

        function onICEComplete(self, candidate) {
            console.log("ICE Complete");
            doCallback(self, "onICEComplete");
        }

        function onChannelError(self, e) {
            console.error("Channel Error", e);
            doCallback(self, "onError", e);
        }

        function onICESDP(self, sdp) {
            self.mediaData.SDP = self.stereoHack(sdp.sdp);
            console.log("ICE SDP");
            doCallback(self, "onICESDP");
        }

        function onAnswerSDP(self, sdp) {
            self.answer.SDP = self.stereoHack(sdp.sdp);
            console.log("ICE ANSWER SDP");
            doCallback(self, "onAnswerSDP", self.answer.SDP);
        }

        function onMessage(self, msg) {
            console.log("Message");
            doCallback(self, "onICESDP", msg);
        }

        function onRemoteStream(self, stream) {
            if (self.options.useVideo) {
                self.options.useVideo.style.display = 'block';
            }

            var element = self.options.useAudio;
            console.log("REMOTE STREAM", stream, element);

            if (typeof element.srcObject !== 'undefined') {
                element.srcObject = stream;
            } else if (typeof element.mozSrcObject !== 'undefined') {
                element.mozSrcObject = stream;
            } else if (typeof element.src !== 'undefined') {
                element.src = URL.createObjectURL(stream);
            } else {
                console.error('Error attaching stream to element.');
            }

            self.options.useAudio.play();
            self.remoteStream = stream;
            if (self.options.callbacks.onRemoteStream) {
                self.options.callbacks.onRemoteStream(stream);
            }
        }

        function onOfferSDP(self, sdp) {
            self.mediaData.SDP = self.stereoHack(sdp.sdp);
            console.log("Offer SDP");
            doCallback(self, "onOfferSDP");
        }

        $.FSRTC.prototype.answer = function(sdp, onSuccess, onError) {
            this.peer.addAnswerSDP({
                    type: "answer",
                    sdp: sdp
                },
                onSuccess, onError);
        };

        $.FSRTC.prototype.stopPeer = function() {
            if (self.peer) {
                console.log("stopping peer");
                self.peer.stop();
            }
        }

        $.FSRTC.prototype.stop = function() {
            var self = this;

            if (self.options.useVideo) {
                self.options.useVideo.style.display = 'none';
                if (moz) {
                    self.options.useVideo['mozSrcObject'] = null;
                } else {
                    self.options.useVideo['src'] = '';
                }
            }

            if (self.localStream) {
                if(typeof self.localStream.stop == 'function') {
                    self.localStream.stop();
                } else {
                    if (self.localStream.active){
                        var tracks = self.localStream.getTracks();
                        console.error(tracks);
                        tracks.forEach(function(track, index){
                            console.log(track);
                            track.stop();
                        })
                    }
                }
                self.localStream = null;
            }

            if (self.options.localVideo) {
                self.options.localVideo.style.display = 'none';
                if (moz) {
                    self.options.localVideo['mozSrcObject'] = null;
                } else {
                    self.options.localVideo['src'] = '';
                }
            }

            if (self.options.localVideoStream) {
                if(typeof self.options.localVideoStream.stop == 'function') {
                    self.options.localVideoStream.stop();
                } else {
                    if (self.localVideoStream.active){
                        var tracks = self.localVideoStream.getTracks();
                        console.error(tracks);
                        tracks.forEach(function(track, index){
                            console.log(track);
                            track.stop();
                        })
                    }
                }
            }

            if (self.peer) {
                console.log("stopping peer");
                self.peer.stop();
            }
        };

        $.FSRTC.prototype.getMute = function() {
            var self = this;
            return self.enabled;
        }

        $.FSRTC.prototype.setMute = function(what) {
            var self = this;
            var audioTracks = self.localStream.getAudioTracks();

            for (var i = 0, len = audioTracks.length; i < len; i++ ) {
                switch(what) {
                    case "on":
                        audioTracks[i].enabled = true;
                        break;
                    case "off":
                        audioTracks[i].enabled = false;
                        break;
                    case "toggle":
                        audioTracks[i].enabled = !audioTracks[i].enabled;
                    default:
                        break;
                }

                self.enabled = audioTracks[i].enabled;
            }

            return !self.enabled;
        }

        $.FSRTC.prototype.setMuteVideo = function(what, user) {
            var self = this;
            var videoTracks = self.localStream.getVideoTracks();
            if (self.remoteStream) {
                videoTracks = videoTracks.concat(self.remoteStream.getVideoTracks());
            };
            for (var i = 0, len = videoTracks.length; i < len; i++) {
                switch (what) {
                    case "on":
                        if (self.userVideoEnabled && !user)
                            break;
                        videoTracks[i].enabled = true;
                        break;
                    case "off":
                        videoTracks[i].enabled = false;
                        break;
                    case "toggle":
                        videoTracks[i].enabled = !videoTracks[i].enabled;
                    default:
                        break;
                }
                self.videoEnabled = videoTracks[i].enabled;
            };
            if (user) {
                self.userVideoEnabled = !self.videoEnabled;
            };

            return !self.videoEnabled;
        };


        $.FSRTC.prototype.createAnswer = function(params) {
            var self = this;
            self.type = "answer";
            self.remoteSDP = params.sdp;
            console.debug("inbound sdp: ", params.sdp);

            function onSuccess(stream) {
                self.localStream = stream;

                self.peer = RTCPeerConnection({
                    type: self.type,
                    attachStream: self.localStream,
                    onICE: function(candidate) {
                        return onICE(self, candidate);
                    },
                    onICEComplete: function() {
                        return onICEComplete(self);
                    },
                    onRemoteStream: function(stream) {
                        return onRemoteStream(self, stream);
                    },
                    onICESDP: function(sdp) {
                        return onICESDP(self, sdp);
                    },
                    onChannelError: function(e) {
                        return onChannelError(self, e);
                    },
                    constraints: self.constraints,
                    iceServers: self.options.iceServers,
                    offerSDP: {
                        type: "offer",
                        sdp: self.remoteSDP
                    }
                });

                onStreamSuccess(self);
            }

            function onError(e) {
                onStreamError(self, e);
            }

            var mediaParams = getMediaParams(self);

            console.log("Audio constraints", mediaParams.audio);
            console.log("Video constraints", mediaParams.video);

            if (self.options.useVideo && self.options.localVideo) {
                getUserMedia({
                    constraints: {
                        audio: false,
                        video: {
                            mandatory: self.options.videoParams,
                            optional: []
                        },
                    },
                    localVideo: self.options.localVideo,
                    onsuccess: function(e) {self.options.localVideoStream = e; console.log("local video ready");},
                    onerror: function(e) {console.error("local video error!");}
                });
            }

            getUserMedia({
                constraints: {
                    audio: mediaParams.audio,
                    video: mediaParams.video
                },
                video: mediaParams.useVideo,
                onsuccess: onSuccess,
                onerror: onError
            });



        };

        function getMediaParams(obj) {

            var audio;

            if (obj.options.useMic && obj.options.useMic === "none") {
                console.log("Microphone Disabled");
                audio = false;
            } else if (obj.options.videoParams && obj.options.screenShare) {//obj.options.videoParams.chromeMediaSource == 'desktop') {

                //obj.options.videoParams = {
                //	chromeMediaSource: 'screen',
                //	maxWidth:screen.width,
                //	maxHeight:screen.height
                //	chromeMediaSourceId = sourceId;
                //  };

                console.error("SCREEN SHARE");
                audio = false;
            } else {
                audio = {
                    mandatory: obj.options.audioParams,
                    optional: []
                };

                if (obj.options.useMic !== "any") {
                    audio.optional = [{sourceId: obj.options.useMic}]
                }

            }

            if (obj.options.useVideo && obj.options.localVideo) {
                getUserMedia({
                    constraints: {
                        audio: false,
                        video: {
                            mandatory: obj.options.videoParams,
                            optional: []
                        },
                    },
                    localVideo: obj.options.localVideo,
                    onsuccess: function(e) {self.options.localVideoStream = e; console.log("local video ready");},
                    onerror: function(e) {console.error("local video error!");}
                });
            }

            var video = {};
            var bestFrameRate = obj.options.videoParams.vertoBestFrameRate;
            delete obj.options.videoParams.vertoBestFrameRate;

            if (window.moz) {
                video = obj.options.videoParams;
                if (!video.width) video.width = video.minWidth;
                if (!video.height) video.height = video.minHeight;
                if (!video.frameRate) video.frameRate = video.minFrameRate;
            } else {
                video = {
                    mandatory: obj.options.videoParams,
                    optional: []
                }
            }

            var useVideo = obj.options.useVideo;

            if (useVideo && obj.options.useCamera && obj.options.useCamera !== "none") {
                if (!video.optional) {
                    video.optional = [];
                }

                if (obj.options.useCamera !== "any") {
                    video.optional.push({sourceId: obj.options.useCamera});
                }

                if (bestFrameRate && !window.moz) {
                    video.optional.push({minFrameRate: bestFrameRate});
                }

            } else {
                console.log("Camera Disabled");
                video = false;
                useVideo = false;
            }

            return {audio: audio, video: video, useVideo: useVideo};
        }

        $.FSRTC.prototype.call = function(profile) {
            checkCompat();

            var self = this;
            var screen = false;

            self.type = "offer";

            if (self.options.videoParams && self.options.screenShare) { //self.options.videoParams.chromeMediaSource == 'desktop') {
                screen = true;
            }

            function onSuccess(stream) {
                self.localStream = stream;

                if (screen) {
                    if (moz) {
                        self.constraints.OfferToReceiveVideo = false;
                    } else {
                        self.constraints.mandatory.OfferToReceiveVideo = false;
                    }
                }

                self.peer = RTCPeerConnection({
                    type: self.type,
                    attachStream: self.localStream,
                    onICE: function(candidate) {
                        return onICE(self, candidate);
                    },
                    onICEComplete: function() {
                        return onICEComplete(self);
                    },
                    onRemoteStream: screen ? function(stream) {} : function(stream) {
                        return onRemoteStream(self, stream);
                    },
                    onOfferSDP: function(sdp) {
                        return onOfferSDP(self, sdp);
                    },
                    onICESDP: function(sdp) {
                        return onICESDP(self, sdp);
                    },
                    onChannelError: function(e) {
                        return onChannelError(self, e);
                    },
                    constraints: self.constraints,
                    iceServers: self.options.iceServers,
                });

                onStreamSuccess(self, stream);
            }

            function onError(e) {
                onStreamError(self, e);
            }

            var mediaParams = getMediaParams(self);

            console.log("Audio constraints", mediaParams.audio);
            console.log("Video constraints", mediaParams.video);

            if (mediaParams.audio || mediaParams.video) {

                getUserMedia({
                    constraints: {
                        audio: mediaParams.audio,
                        video: mediaParams.video
                    },
                    video: mediaParams.useVideo,
                    onsuccess: onSuccess,
                    onerror: onError
                });
            } else {
                onSuccess(null);
            }



            /*
             navigator.getUserMedia({
             video: self.options.useVideo,
             audio: true
             }, onSuccess, onError);
             */

        };

        // DERIVED from RTCPeerConnection-v1.5
        // 2013, @muazkh - github.com/muaz-khan
        // MIT License - https://www.webrtc-experiment.com/licence/
        // Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCPeerConnection
        window.moz = !!navigator.mozGetUserMedia;

        function RTCPeerConnection(options) {
            var gathering = false, done = false;

            var w = window,
                PeerConnection = w.mozRTCPeerConnection || w.webkitRTCPeerConnection,
                SessionDescription = w.mozRTCSessionDescription || w.RTCSessionDescription,
                IceCandidate = w.mozRTCIceCandidate || w.RTCIceCandidate;

            var STUN = {
                url: !moz ? 'stun:stun.l.google.com:19302' : 'stun:23.21.150.121'
            };

            var iceServers = null;

            if (options.iceServers) {
                var tmp = options.iceServers;

                if (typeof(tmp) === "boolean") {
                    tmp = null;
                }

                if (tmp && !(typeof(tmp) == "object" && tmp.constructor === Array)) {
                    console.warn("iceServers must be an array, reverting to default ice servers");
                    tmp = null;
                }

                iceServers = {
                    iceServers: tmp || [STUN]
                };

                if (!moz && !tmp) {
                    iceServers.iceServers = [STUN];
                }
            }

            var optional = {
                optional: []
            };

            if (!moz) {
                optional.optional = [{
                    DtlsSrtpKeyAgreement: true
                },
                    {
                        RtpDataChannels: options.onChannelMessage ? true : false
                    }];
            }

            var peer = new PeerConnection(iceServers, optional);

            openOffererChannel();
            var x = 0;

            function ice_handler() {

                done = true;
                gathering = null;

                if (options.onICEComplete) {
                    options.onICEComplete();
                }

                if (options.type == "offer") {
                    if ((!moz || (!options.sentICESDP && peer.localDescription.sdp.match(/a=candidate/)) && !x && options.onICESDP)) {
                        options.onICESDP(peer.localDescription);
                        //x = 1;
                        /*
                         x = 1;
                         peer.createOffer(function(sessionDescription) {
                         sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                         peer.setLocalDescription(sessionDescription);
                         if (options.onICESDP) {
                         options.onICESDP(sessionDescription);
                         }
                         }, onSdpError, constraints);
                         */
                    }
                } else {
                    if (!x && options.onICESDP) {
                        options.onICESDP(peer.localDescription);
                        //x = 1;
                        /*
                         x = 1;
                         peer.createAnswer(function(sessionDescription) {
                         sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                         peer.setLocalDescription(sessionDescription);
                         if (options.onICESDP) {
                         options.onICESDP(sessionDescription);
                         }
                         }, onSdpError, constraints);
                         */
                    }
                }
            }

            peer.onicecandidate = function(event) {

                if (done) {
                    return;
                }

                if (!gathering) {
                    gathering = setTimeout(ice_handler, 1000);
                }

                if (event) {
                    if (event.candidate) {
                        options.onICE(event.candidate);
                    }
                } else {
                    done = true;

                    if (gathering) {
                        clearTimeout(gathering);
                        gathering = null;
                    }

                    ice_handler();
                }
            };

            // attachStream = MediaStream;
            if (options.attachStream) peer.addStream(options.attachStream);

            // attachStreams[0] = audio-stream;
            // attachStreams[1] = video-stream;
            // attachStreams[2] = screen-capturing-stream;
            if (options.attachStreams && options.attachStream.length) {
                var streams = options.attachStreams;
                for (var i = 0; i < streams.length; i++) {
                    peer.addStream(streams[i]);
                }
            }

            peer.onaddstream = function(event) {
                var remoteMediaStream = event.stream;

                // onRemoteStreamEnded(MediaStream)
                remoteMediaStream.onended = function() {
                    if (options.onRemoteStreamEnded) options.onRemoteStreamEnded(remoteMediaStream);
                };

                // onRemoteStream(MediaStream)
                if (options.onRemoteStream) options.onRemoteStream(remoteMediaStream);

                //console.debug('on:add:stream', remoteMediaStream);
            };

            var constraints = options.constraints || {
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                };

            // onOfferSDP(RTCSessionDescription)
            function createOffer() {
                if (!options.onOfferSDP) return;

                peer.createOffer(function(sessionDescription) {
                        sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                        peer.setLocalDescription(sessionDescription);
                        options.onOfferSDP(sessionDescription);
                        /* old mozilla behaviour the SDP was already great right away */
                        if (moz && options.onICESDP && sessionDescription.sdp.match(/a=candidate/)) {
                            options.onICESDP(sessionDescription);
                            options.sentICESDP = 1;
                        }
                    },
                    onSdpError, constraints);
            }

            // onAnswerSDP(RTCSessionDescription)
            function createAnswer() {
                if (options.type != "answer") return;

                //options.offerSDP.sdp = addStereo(options.offerSDP.sdp);
                peer.setRemoteDescription(new SessionDescription(options.offerSDP), onSdpSuccess, onSdpError);
                peer.createAnswer(function(sessionDescription) {
                        sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                        peer.setLocalDescription(sessionDescription);
                        if (options.onAnswerSDP) {
                            options.onAnswerSDP(sessionDescription);
                        }
                    },
                    onSdpError, constraints);
            }

            // if Mozilla Firefox & DataChannel; offer/answer will be created later
            if ((options.onChannelMessage && !moz) || !options.onChannelMessage) {
                createOffer();
                createAnswer();
            }

            // DataChannel Bandwidth
            function setBandwidth(sdp) {
                // remove existing bandwidth lines
                sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
                sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:1638400\r\n');

                return sdp;
            }

            // old: FF<>Chrome interoperability management
            function getInteropSDP(sdp) {
                var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
                    extractedChars = '';

                function getChars() {
                    extractedChars += chars[parseInt(Math.random() * 40)] || '';
                    if (extractedChars.length < 40) getChars();

                    return extractedChars;
                }

                // usually audio-only streaming failure occurs out of audio-specific crypto line
                // a=crypto:1 AES_CM_128_HMAC_SHA1_32 --------- kAttributeCryptoVoice
                if (options.onAnswerSDP) sdp = sdp.replace(/(a=crypto:0 AES_CM_128_HMAC_SHA1_32)(.*?)(\r\n)/g, '');

                // video-specific crypto line i.e. SHA1_80
                // a=crypto:1 AES_CM_128_HMAC_SHA1_80 --------- kAttributeCryptoVideo
                var inline = getChars() + '\r\n' + (extractedChars = '');
                sdp = sdp.indexOf('a=crypto') == -1 ? sdp.replace(/c=IN/g, 'a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:' + inline + 'c=IN') : sdp;

                return sdp;
            }

            function serializeSdp(sdp) {
                //if (!moz) sdp = setBandwidth(sdp);
                //sdp = getInteropSDP(sdp);
                //console.debug(sdp);
                return sdp;
            }

            // DataChannel management
            var channel;

            function openOffererChannel() {
                if (!options.onChannelMessage || (moz && !options.onOfferSDP)) return;

                _openOffererChannel();

                if (!moz) return;
                navigator.mozGetUserMedia({
                        audio: true,
                        fake: true
                    },
                    function(stream) {
                        peer.addStream(stream);
                        createOffer();
                    },
                    useless);
            }

            function _openOffererChannel() {
                channel = peer.createDataChannel(options.channel || 'RTCDataChannel', moz ? {} : {
                    reliable: false
                });

                if (moz) channel.binaryType = 'blob';

                setChannelEvents();
            }

            function setChannelEvents() {
                channel.onmessage = function(event) {
                    if (options.onChannelMessage) options.onChannelMessage(event);
                };

                channel.onopen = function() {
                    if (options.onChannelOpened) options.onChannelOpened(channel);
                };
                channel.onclose = function(event) {
                    if (options.onChannelClosed) options.onChannelClosed(event);

                    console.warn('WebRTC DataChannel closed', event);
                };
                channel.onerror = function(event) {
                    if (options.onChannelError) options.onChannelError(event);

                    console.error('WebRTC DataChannel error', event);
                };
            }

            if (options.onAnswerSDP && moz && options.onChannelMessage) openAnswererChannel();

            function openAnswererChannel() {
                peer.ondatachannel = function(event) {
                    channel = event.channel;
                    channel.binaryType = 'blob';
                    setChannelEvents();
                };

                if (!moz) return;
                navigator.mozGetUserMedia({
                        audio: true,
                        fake: true
                    },
                    function(stream) {
                        peer.addStream(stream);
                        createAnswer();
                    },
                    useless);
            }

            // fake:true is also available on chrome under a flag!
            function useless() {
                log('Error in fake:true');
            }

            function onSdpSuccess() {}

            function onSdpError(e) {
                if (options.onChannelError) {
                    options.onChannelError(e);
                }
                console.error('sdp error:', e);
            }

            return {
                addAnswerSDP: function(sdp, cbSuccess, cbError) {

                    peer.setRemoteDescription(new SessionDescription(sdp), cbSuccess ? cbSuccess : onSdpSuccess, cbError ? cbError : onSdpError);
                },
                addICE: function(candidate) {
                    peer.addIceCandidate(new IceCandidate({
                        sdpMLineIndex: candidate.sdpMLineIndex,
                        candidate: candidate.candidate
                    }));
                },

                peer: peer,
                channel: channel,
                sendData: function(message) {
                    if (channel) {
                        channel.send(message);
                    }
                },

                stop: function() {
                    peer.close();
                    if (options.attachStream) {
                        if(typeof options.attachStream.stop == 'function') {
                            options.attachStream.stop();
                        } else {
                            options.attachStream.active = false;
                        }
                    }
                }

            };
        }

        // getUserMedia
        var video_constraints = {
            mandatory: {},
            optional: []
        };

        function getUserMedia(options) {
            var n = navigator,
                media;
            n.getMedia = n.webkitGetUserMedia || n.mozGetUserMedia;
            n.getMedia(options.constraints || {
                    audio: true,
                    video: video_constraints
                },
                streaming, options.onerror ||
                function(e) {
                    console.error(e);
                });

            function streaming(stream) {
                //var video = options.video;
                //var localVideo = options.localVideo;
                //if (video) {
                //  video[moz ? 'mozSrcObject' : 'src'] = moz ? stream : window.webkitURL.createObjectURL(stream);
                //video.play();
                //}

                if (options.localVideo) {
                    options.localVideo[moz ? 'mozSrcObject' : 'src'] = moz ? stream : window.webkitURL.createObjectURL(stream);
                    options.localVideo.style.display = 'block';
                }

                if (options.onsuccess) {
                    options.onsuccess(stream);
                }

                media = stream;
            }

            return media;
        }

        $.FSRTC.resSupported = function(w, h) {
            for (var i in $.FSRTC.validRes) {
                if ($.FSRTC.validRes[i][0] == w && $.FSRTC.validRes[i][1] == h) {
                    return true;
                }
            }

            return false;
        }

        $.FSRTC.bestResSupported = function() {
            var w = 0, h = 0;

            for (var i in $.FSRTC.validRes) {
                if ($.FSRTC.validRes[i][0] > w && $.FSRTC.validRes[i][1] > h) {
                    w = $.FSRTC.validRes[i][0];
                    h = $.FSRTC.validRes[i][1];
                }
            }

            return [w, h];
        }

        var resList = [[320, 180], [320, 240], [640, 360], [640, 480], [1280, 720], [1920, 1080]];
        var resI = 0;
        var ttl = 0;

        var checkRes = function (cam, func) {

            if (resI >= resList.length) {
                var res = {
                    'validRes': $.FSRTC.validRes,
                    'bestResSupported': $.FSRTC.bestResSupported()
                };

                localStorage.setItem("res_" + cam, $.toJSON(res));

                if (func) return func(res);
                return;
            }

            var video = {
                mandatory: {},
                optional: []
            }

            if (cam) {
                video.optional = [{sourceId: cam}];
            }

            w = resList[resI][0];
            h = resList[resI][1];
            resI++;

            video.mandatory = {
                "minWidth": w,
                "minHeight": h,
                "maxWidth": w,
                "maxHeight": h
            };

            if (window.moz) {
                video = video.mandatory;
                if (!video.width) video.width = video.minWidth;
                if (!video.height) video.height = video.minHeight;
                if (!video.frameRate) video.frameRate = video.minFrameRate;
            }

            getUserMedia({
                constraints: {
                    audio: ttl++ == 0,
                    video: video
                },
                onsuccess: function(e) {
                    e.getTracks().forEach(function(track) {track.stop();});
                    console.info(w + "x" + h + " supported."); $.FSRTC.validRes.push([w, h]); checkRes(cam, func);},
                onerror: function(e) {console.error( w + "x" + h + " not supported."); checkRes(cam, func);}
            });
        }


        $.FSRTC.getValidRes = function (cam, func) {
            var used = [];
            var cached = localStorage.getItem("res_" + cam);

            if (cached) {
                var cache = $.parseJSON(cached);

                if (cache) {
                    $.FSRTC.validRes = cache.validRes;
                    console.log("CACHED RES FOR CAM " + cam, cache);
                } else {
                    console.error("INVALID CACHE");
                }
                return func ? func(cache) : null;
            }


            $.FSRTC.validRes = [];
            resI = 0;

            checkRes(cam, func);
        }

        $.FSRTC.checkPerms = function (runtime, check_audio, check_video) {
            getUserMedia({
                constraints: {
                    audio: check_audio,
                    video: check_video,
                },
                onsuccess: function(e) {
                    e.getTracks().forEach(function(track) {track.stop();});

                    console.info("media perm init complete");
                    if (runtime) {
                        setTimeout(runtime, 100, true);
                    }
                },
                onerror: function(e) {
                    if (check_video && check_audio) {
                        console.error("error, retesting with audio params only");
                        return $.FSRTC.checkPerms(runtime, check_audio, false);
                    }

                    console.error("media perm init error");

                    if (runtime) {
                        runtime(false)
                    }
                }
            });
        }

    })(jQuery);


// region JsonRpcClient

    /*
     * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
     * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
     *
     * Version: MPL 1.1
     *
     * The contents of this file are subject to the Mozilla Public License Version
     * 1.1 (the "License"); you may not use this file except in compliance with
     * the License. You may obtain a copy of the License at
     * http://www.mozilla.org/MPL/
     *
     * Software distributed under the License is distributed on an "AS IS" basis,
     * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
     * for the specific language governing rights and limitations under the
     * License.
     *
     * The Original Code is jquery.jsonrpclient.js modified for Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
     *
     * The Initial Developer of the Original Code is
     * Textalk AB http://textalk.se/
     * Portions created by the Initial Developer are Copyright (C)
     * the Initial Developer. All Rights Reserved.
     *
     * Contributor(s):
     *
     * Anthony Minessale II <anthm@freeswitch.org>
     *
     * jquery.jsonrpclient.js - JSON RPC client code
     *
     */
    /**
     * This plugin requires jquery.json.js to be available, or at least the methods $.toJSON and
     * $.parseJSON.
     *
     * The plan is to make use of websockets if they are available, but work just as well with only
     * http if not.
     *
     * Usage example:
     *
     *   var foo = new $.JsonRpcClient({ ajaxUrl: '/backend/jsonrpc' });
     *   foo.call(
     *     'bar', [ 'A parameter', 'B parameter' ],
     *     function(result) { alert('Foo bar answered: ' + result.my_answer); },
     *     function(error)  { console.log('There was an error', error); }
     *   );
     *
     * More examples are available in README.md
     */
    (function($) {
        /**
         * @fn new
         * @memberof $.JsonRpcClient
         *
         * @param options An object stating the backends:
         *                ajaxUrl    A url (relative or absolute) to a http(s) backend.
         *                socketUrl  A url (relative of absolute) to a ws(s) backend.
         *                onmessage  A socket message handler for other messages (non-responses).
         *                getSocket  A function returning a WebSocket or null.
         *                           It must take an onmessage_cb and bind it to the onmessage event
         *                           (or chain it before/after some other onmessage handler).
         *                           Or, it could return null if no socket is available.
         *                           The returned instance must have readyState <= 1, and if less than 1,
         *                           react to onopen binding.
         */
        $.JsonRpcClient = function(options) {
            var self = this;
            this.options = $.extend({
                ajaxUrl       : null,
                socketUrl     : null, ///< The ws-url for default getSocket.
                onmessage     : null, ///< Other onmessage-handler.
                login         : null, /// auth login
                passwd        : null, /// auth passwd
                sessid        : null,
                loginParams   : null,
                userVariables : null,
                getSocket     : function(onmessage_cb) { return self._getSocket(onmessage_cb); }
            }, options);

            self.ws_cnt = 0;

            // Declare an instance version of the onmessage callback to wrap 'this'.
            this.wsOnMessage = function(event) { self._wsOnMessage(event); };
        };

        /// Holding the WebSocket on default getsocket.
        $.JsonRpcClient.prototype._ws_socket = null;

        /// Object <id>: { success_cb: cb, error_cb: cb }
        $.JsonRpcClient.prototype._ws_callbacks = {};

        /// The next JSON-RPC request id.
        $.JsonRpcClient.prototype._current_id = 1;

        /**
         * @fn call
         * @memberof $.JsonRpcClient
         *
         * @param method     The method to run on JSON-RPC server.
         * @param params     The params; an array or object.
         * @param success_cb A callback for successful request.
         * @param error_cb   A callback for error.
         */
        $.JsonRpcClient.prototype.call = function(method, params, success_cb, error_cb) {
            // Construct the JSON-RPC 2.0 request.

            if (!params) {
                params = {};
            }

            if (this.options.sessid) {
                params.sessid = this.options.sessid;
            }

            var request = {
                jsonrpc : '2.0',
                method  : method,
                params  : params,
                id      : this._current_id++  // Increase the id counter to match request/response
            };

            if (!success_cb) {
                success_cb = function(e){console.log("Success: ", e);};
            }

            if (!error_cb) {
                error_cb = function(e){console.log("Error: ", e);};
            }

            // Try making a WebSocket call.
            var socket = this.options.getSocket(this.wsOnMessage);
            if (socket !== null) {
                this._wsCall(socket, request, success_cb, error_cb);
                return;
            }

            // No WebSocket, and no HTTP backend?  This won't work.
            if (this.options.ajaxUrl === null) {
                throw "$.JsonRpcClient.call used with no websocket and no http endpoint.";
            }

            $.ajax({
                type     : 'POST',
                url      : this.options.ajaxUrl,
                data     : $.toJSON(request),
                dataType : 'json',
                cache    : false,

                success  : function(data) {
                    if ('error' in data) error_cb(data.error, this);
                    success_cb(data.result, this);
                },

                // JSON-RPC Server could return non-200 on error
                error    : function(jqXHR, textStatus, errorThrown) {
                    try {
                        var response = $.parseJSON(jqXHR.responseText);

                        if ('console' in window) console.log(response);

                        error_cb(response.error, this);
                    } catch (err) {
                        // Perhaps the responseText wasn't really a jsonrpc-error.
                        error_cb({ error: jqXHR.responseText }, this);
                    }
                }
            });
        };

        /**
         * Notify sends a command to the server that won't need a response.  In http, there is probably
         * an empty response - that will be dropped, but in ws there should be no response at all.
         *
         * This is very similar to call, but has no id and no handling of callbacks.
         *
         * @fn notify
         * @memberof $.JsonRpcClient
         *
         * @param method     The method to run on JSON-RPC server.
         * @param params     The params; an array or object.
         */
        $.JsonRpcClient.prototype.notify = function(method, params) {
            // Construct the JSON-RPC 2.0 request.

            if (this.options.sessid) {
                params.sessid = this.options.sessid;
            }

            var request = {
                jsonrpc: '2.0',
                method:  method,
                params:  params
            };

            // Try making a WebSocket call.
            var socket = this.options.getSocket(this.wsOnMessage);
            if (socket !== null) {
                this._wsCall(socket, request);
                return;
            }

            // No WebSocket, and no HTTP backend?  This won't work.
            if (this.options.ajaxUrl === null) {
                throw "$.JsonRpcClient.notify used with no websocket and no http endpoint.";
            }

            $.ajax({
                type     : 'POST',
                url      : this.options.ajaxUrl,
                data     : $.toJSON(request),
                dataType : 'json',
                cache    : false
            });
        };

        /**
         * Make a batch-call by using a callback.
         *
         * The callback will get an object "batch" as only argument.  On batch, you can call the methods
         * "call" and "notify" just as if it was a normal $.JsonRpcClient object, and all calls will be
         * sent as a batch call then the callback is done.
         *
         * @fn batch
         * @memberof $.JsonRpcClient
         *
         * @param callback    The main function which will get a batch handler to run call and notify on.
         * @param all_done_cb A callback function to call after all results have been handled.
         * @param error_cb    A callback function to call if there is an error from the server.
         *                    Note, that batch calls should always get an overall success, and the
         *                    only error
         */
        $.JsonRpcClient.prototype.batch = function(callback, all_done_cb, error_cb) {
            var batch = new $.JsonRpcClient._batchObject(this, all_done_cb, error_cb);
            callback(batch);
            batch._execute();
        };

        /**
         * The default getSocket handler.
         *
         * @param onmessage_cb The callback to be bound to onmessage events on the socket.
         *
         * @fn _getSocket
         * @memberof $.JsonRpcClient
         */

        $.JsonRpcClient.prototype.socketReady = function() {
            if (this._ws_socket === null || this._ws_socket.readyState > 1) {
                return false;
            }

            return true;
        };

        $.JsonRpcClient.prototype.closeSocket = function() {
            var self = this;
            if (self.socketReady()) {
                self._ws_socket.onclose = function (w) {console.log("Closing Socket");};
                self._ws_socket.close();
            }
        };

        $.JsonRpcClient.prototype.loginData = function(params) {
            var self = this;
            self.options.login = params.login;
            self.options.passwd = params.passwd;
            self.options.loginParams = params.loginParams;
            self.options.userVariables = params.userVariables;
        };

        $.JsonRpcClient.prototype.connectSocket = function(onmessage_cb) {
            var self = this;

            if (self.to) {
                clearTimeout(self.to);
            }

            if (!self.socketReady()) {
                self.authing = false;

                if (self._ws_socket) {
                    delete self._ws_socket;
                }

                // No socket, or dying socket, let's get a new one.
                self._ws_socket = new WebSocket(self.options.socketUrl);

                if (self._ws_socket) {
                    // Set up onmessage handler.
                    self._ws_socket.onmessage = onmessage_cb;
                    self._ws_socket.onclose = function (w) {
                        if (!self.ws_sleep) {
                            self.ws_sleep = 1000;
                        }

                        if (self.options.onWSClose) {
                            self.options.onWSClose(self);
                        }

                        console.error("Websocket Lost " + self.ws_cnt + " sleep: " + self.ws_sleep + "msec");

                        self.to = setTimeout(function() {
                            console.log("Attempting Reconnection....");
                            self.connectSocket(onmessage_cb);
                        }, self.ws_sleep);

                        self.ws_cnt++;

                        if (self.ws_sleep < 3000 && (self.ws_cnt % 10) === 0) {
                            self.ws_sleep += 1000;
                        }
                    };

                    // Set up sending of message for when the socket is open.
                    self._ws_socket.onopen = function() {
                        if (self.to) {
                            clearTimeout(self.to);
                        }
                        self.ws_sleep = 1000;
                        self.ws_cnt = 0;
                        if (self.options.onWSConnect) {
                            self.options.onWSConnect(self);
                        }

                        var req;
                        // Send the requests.
                        while ((req = $.JsonRpcClient.q.pop())) {
                            self._ws_socket.send(req);
                        }
                    };
                }
            }

            return self._ws_socket ? true : false;
        };

        $.JsonRpcClient.prototype._getSocket = function(onmessage_cb) {
            // If there is no ws url set, we don't have a socket.
            // Likewise, if there is no window.WebSocket.
            if (this.options.socketUrl === null || !("WebSocket" in window)) return null;

            this.connectSocket(onmessage_cb);

            return this._ws_socket;
        };

        /**
         * Queue to save messages delivered when websocket is not ready
         */
        $.JsonRpcClient.q = [];

        /**
         * Internal handler to dispatch a JRON-RPC request through a websocket.
         *
         * @fn _wsCall
         * @memberof $.JsonRpcClient
         */
        $.JsonRpcClient.prototype._wsCall = function(socket, request, success_cb, error_cb) {
            var request_json = $.toJSON(request);

            if (socket.readyState < 1) {
                // The websocket is not open yet; we have to set sending of the message in onopen.
                self = this; // In closure below, this is set to the WebSocket.  Use self instead.
                $.JsonRpcClient.q.push(request_json);
            } else {
                // We have a socket and it should be ready to send on.
                socket.send(request_json);
            }

            // Setup callbacks.  If there is an id, this is a call and not a notify.
            if ('id' in request && typeof success_cb !== 'undefined') {
                this._ws_callbacks[request.id] = { request: request_json, request_obj: request, success_cb: success_cb, error_cb: error_cb };
            }
        };

        /**
         * Internal handler for the websocket messages.  It determines if the message is a JSON-RPC
         * response, and if so, tries to couple it with a given callback.  Otherwise, it falls back to
         * given external onmessage-handler, if any.
         *
         * @param event The websocket onmessage-event.
         */
        $.JsonRpcClient.prototype._wsOnMessage = function(event) {
            // Check if this could be a JSON RPC message.
            var response;
            try {
                response = $.parseJSON(event.data);

                /// @todo Make using the jsonrcp 2.0 check optional, to use this on JSON-RPC 1 backends.

                if (typeof response === 'object' &&
                    'jsonrpc' in response &&
                    response.jsonrpc === '2.0') {

                    /// @todo Handle bad response (without id).

                    // If this is an object with result, it is a response.
                    if ('result' in response && this._ws_callbacks[response.id]) {
                        // Get the success callback.
                        var success_cb = this._ws_callbacks[response.id].success_cb;

                        /*
                         // set the sessid if present
                         if ('sessid' in response.result && !this.options.sessid || (this.options.sessid != response.result.sessid)) {
                         this.options.sessid = response.result.sessid;
                         if (this.options.sessid) {
                         console.log("setting session UUID to: " + this.options.sessid);
                         }
                         }
                         */
                        // Delete the callback from the storage.
                        delete this._ws_callbacks[response.id];

                        // Run callback with result as parameter.
                        success_cb(response.result, this);
                        return;
                    } else if ('error' in response && this._ws_callbacks[response.id]) {
                        // If this is an object with error, it is an error response.

                        // Get the error callback.
                        var error_cb = this._ws_callbacks[response.id].error_cb;
                        var orig_req = this._ws_callbacks[response.id].request;

                        // if this is an auth request, send the credentials and resend the failed request
                        if (!self.authing && response.error.code == -32000 && self.options.login && self.options.passwd) {
                            self.authing = true;

                            this.call("login", { login: self.options.login, passwd: self.options.passwd, loginParams: self.options.loginParams,
                                    userVariables: self.options.userVariables},
                                this._ws_callbacks[response.id].request_obj.method == "login" ?
                                    function(e) {
                                        self.authing = false;
                                        console.log("logged in");
                                        delete self._ws_callbacks[response.id];

                                        if (self.options.onWSLogin) {
                                            self.options.onWSLogin(true, self);
                                        }
                                    }

                                    :

                                    function(e) {
                                        self.authing = false;
                                        console.log("logged in, resending request id: " + response.id);
                                        var socket = self.options.getSocket(self.wsOnMessage);
                                        if (socket !== null) {
                                            socket.send(orig_req);
                                        }
                                        if (self.options.onWSLogin) {
                                            self.options.onWSLogin(true, self);
                                        }
                                    },

                                function(e) {
                                    console.log("error logging in, request id:", response.id);
                                    delete self._ws_callbacks[response.id];
                                    error_cb(response.error, this);
                                    if (self.options.onWSLogin) {
                                        self.options.onWSLogin(false, self);
                                    }
                                });
                            return;
                        }

                        // Delete the callback from the storage.
                        delete this._ws_callbacks[response.id];

                        // Run callback with the error object as parameter.
                        error_cb(response.error, this);
                        return;
                    }
                }
            } catch (err) {
                // Probably an error while parsing a non json-string as json.  All real JSON-RPC cases are
                // handled above, and the fallback method is called below.
                console.log("ERROR: "+ err);
                return;
            }

            // This is not a JSON-RPC response.  Call the fallback message handler, if given.
            if (typeof this.options.onmessage === 'function') {
                event.eventData = response;
                if (!event.eventData) {
                    event.eventData = {};
                }

                var reply = this.options.onmessage(event);

                if (reply && typeof reply === "object" && event.eventData.id) {
                    var msg = {
                        jsonrpc: "2.0",
                        id: event.eventData.id,
                        result: reply
                    };

                    var socket = self.options.getSocket(self.wsOnMessage);
                    if (socket !== null) {
                        socket.send($.toJSON(msg));
                    }
                }
            }
        };


        /************************************************************************************************
         * Batch object with methods
         ************************************************************************************************/

        /**
         * Handling object for batch calls.
         */
        $.JsonRpcClient._batchObject = function(jsonrpcclient, all_done_cb, error_cb) {
            // Array of objects to hold the call and notify requests.  Each objects will have the request
            // object, and unless it is a notify, success_cb and error_cb.
            this._requests   = [];

            this.jsonrpcclient = jsonrpcclient;
            this.all_done_cb = all_done_cb;
            this.error_cb    = typeof error_cb === 'function' ? error_cb : function() {};

        };

        /**
         * @sa $.JsonRpcClient.prototype.call
         */
        $.JsonRpcClient._batchObject.prototype.call = function(method, params, success_cb, error_cb) {

            if (!params) {
                params = {};
            }

            if (this.options.sessid) {
                params.sessid = this.options.sessid;
            }

            if (!success_cb) {
                success_cb = function(e){console.log("Success: ", e);};
            }

            if (!error_cb) {
                error_cb = function(e){console.log("Error: ", e);};
            }

            this._requests.push({
                request    : {
                    jsonrpc : '2.0',
                    method  : method,
                    params  : params,
                    id      : this.jsonrpcclient._current_id++  // Use the client's id series.
                },
                success_cb : success_cb,
                error_cb   : error_cb
            });
        };

        /**
         * @sa $.JsonRpcClient.prototype.notify
         */
        $.JsonRpcClient._batchObject.prototype.notify = function(method, params) {
            if (this.options.sessid) {
                params.sessid = this.options.sessid;
            }

            this._requests.push({
                request    : {
                    jsonrpc : '2.0',
                    method  : method,
                    params  : params
                }
            });
        };

        /**
         * Executes the batched up calls.
         */
        $.JsonRpcClient._batchObject.prototype._execute = function() {
            var self = this;

            if (this._requests.length === 0) return; // All done :P

            // Collect all request data and sort handlers by request id.
            var batch_request = [];
            var handlers = {};
            var i = 0;
            var call;
            var success_cb;
            var error_cb;

            // If we have a WebSocket, just send the requests individually like normal calls.
            var socket = self.jsonrpcclient.options.getSocket(self.jsonrpcclient.wsOnMessage);
            if (socket !== null) {
                for (i = 0; i < this._requests.length; i++) {
                    call = this._requests[i];
                    success_cb = ('success_cb' in call) ? call.success_cb : undefined;
                    error_cb   = ('error_cb'   in call) ? call.error_cb   : undefined;
                    self.jsonrpcclient._wsCall(socket, call.request, success_cb, error_cb);
                }

                if (typeof all_done_cb === 'function') all_done_cb(result);
                return;
            }

            for (i = 0; i < this._requests.length; i++) {
                call = this._requests[i];
                batch_request.push(call.request);

                // If the request has an id, it should handle returns (otherwise it's a notify).
                if ('id' in call.request) {
                    handlers[call.request.id] = {
                        success_cb : call.success_cb,
                        error_cb   : call.error_cb
                    };
                }
            }

            success_cb = function(data) { self._batchCb(data, handlers, self.all_done_cb); };

            // No WebSocket, and no HTTP backend?  This won't work.
            if (self.jsonrpcclient.options.ajaxUrl === null) {
                throw "$.JsonRpcClient.batch used with no websocket and no http endpoint.";
            }

            // Send request
            $.ajax({
                url      : self.jsonrpcclient.options.ajaxUrl,
                data     : $.toJSON(batch_request),
                dataType : 'json',
                cache    : false,
                type     : 'POST',

                // Batch-requests should always return 200
                error    : function(jqXHR, textStatus, errorThrown) {
                    self.error_cb(jqXHR, textStatus, errorThrown);
                },
                success  : success_cb
            });
        };

        /**
         * Internal helper to match the result array from a batch call to their respective callbacks.
         *
         * @fn _batchCb
         * @memberof $.JsonRpcClient
         */
        $.JsonRpcClient._batchObject.prototype._batchCb = function(result, handlers, all_done_cb) {
            for (var i = 0; i < result.length; i++) {
                var response = result[i];

                // Handle error
                if ('error' in response) {
                    if (response.id === null || !(response.id in handlers)) {
                        // An error on a notify?  Just log it to the console.
                        if ('console' in window) console.log(response);
                    } else {
                        handlers[response.id].error_cb(response.error, this);
                    }
                } else {
                    // Here we should always have a correct id and no error.
                    if (!(response.id in handlers) && 'console' in window) {
                        console.log(response);
                    } else {
                        handlers[response.id].success_cb(response.result, this);
                    }
                }
            }

            if (typeof all_done_cb === 'function') all_done_cb(result);
        };

    })(jQuery);


// region verto
    /*
     * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
     * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
     *
     * Version: MPL 1.1
     *
     * The contents of this file are subject to the Mozilla Public License Version
     * 1.1 (the "License"); you may not use this file except in compliance with
     * the License. You may obtain a copy of the License at
     * http://www.mozilla.org/MPL/
     *
     * Software distributed under the License is distributed on an "AS IS" basis,
     * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
     * for the specific language governing rights and limitations under the
     * License.
     *
     * The Original Code is Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
     *
     * The Initial Developer of the Original Code is
     * Anthony Minessale II <anthm@freeswitch.org>
     * Portions created by the Initial Developer are Copyright (C)
     * the Initial Developer. All Rights Reserved.
     *
     * Contributor(s):
     *
     * Anthony Minessale II <anthm@freeswitch.org>
     *
     * jquery.verto.js - Main interface
     *
     */

    (function($) {
        var sources = [];

        var generateGUID = (typeof(window.crypto) !== 'undefined' && typeof(window.crypto.getRandomValues) !== 'undefined') ?
            function() {
                // If we have a cryptographically secure PRNG, use that
                // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
                var buf = new Uint16Array(8);
                window.crypto.getRandomValues(buf);
                var S4 = function(num) {
                    var ret = num.toString(16);
                    while (ret.length < 4) {
                        ret = "0" + ret;
                    }
                    return ret;
                };
                return (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]));
            }

            :

            function() {
                // Otherwise, just use Math.random
                // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

        /// MASTER OBJ
        $.verto = function(options, callbacks) {
            var verto = this;

            $.verto.saved.push(verto);

            verto.options = $.extend({
                login: null,
                passwd: null,
                socketUrl: null,
                tag: null,
                localTag: null,
                videoParams: {},
                audioParams: {},
                loginParams: {},
                deviceParams: {onResCheck: null},
                userVariables: {},
                iceServers: false,
                ringSleep: 6000,
                sessid: null,
                attachAutoAnswer: true
            }, options);


            if (verto.options.deviceParams.useCamera) {
                $.FSRTC.getValidRes(verto.options.deviceParams.useCamera, verto.options.deviceParams.onResCheck);
            }

            if (!verto.options.deviceParams.useMic) {
                verto.options.deviceParams.useMic = "any";
            }

            if (!verto.options.deviceParams.useSpeak) {
                verto.options.deviceParams.useSpeak = "any";
            }


            if (verto.options.sessid) {
                verto.sessid = verto.options.sessid;
            } else {
                verto.sessid = /*localStorage.getItem("verto_session_uuid") || */ generateGUID();
                //localStorage.setItem("verto_session_uuid", verto.sessid);
            }

            verto.dialogs = {};
            verto.callbacks = callbacks || {};
            verto.eventSUBS = {};

            verto.rpcClient = new $.JsonRpcClient({
                login: verto.options.login,
                passwd: verto.options.passwd,
                socketUrl: verto.options.socketUrl,
                loginParams: verto.options.loginParams,
                userVariables: verto.options.userVariables,
                sessid: verto.sessid,
                onmessage: function(e) {
                    return verto.handleMessage(e.eventData);
                },
                onWSConnect: function(o) {
                    o.call('login', {});
                },
                onWSLogin: function(success) {
                    if (verto.callbacks.onWSLogin) {
                        verto.callbacks.onWSLogin(verto, success);
                    }
                },
                onWSClose: function(success) {
                    if (verto.callbacks.onWSClose) {
                        verto.callbacks.onWSClose(verto, success);
                    }
                    verto.purge();
                }
            });

            if (verto.options.ringFile) {
                verto.ringer = $('<video>', {id: "verto_ringer"}).css('display', 'none');
            };

            verto.rpcClient.call('login', {});

        };

        $.verto.prototype.deviceParams = function(obj) {
            var verto = this;

            for (var i in obj) {
                verto.options.deviceParams[i] = obj[i];
            }

            if (obj.useCamera) {
                $.FSRTC.getValidRes(verto.options.deviceParams.useCamera, obj ? obj.onResCheck : undefined);
            }
        };

        $.verto.prototype.videoParams = function(obj) {
            var verto = this;

            for (var i in obj) {
                verto.options.videoParams[i] = obj[i];
            }
        };

        $.verto.prototype.iceServers = function(obj) {
            var verto = this;
            verto.options.iceServers = obj;
        };


        $.verto.prototype.loginData = function(params) {
            var verto = this;
            verto.options.login = params.login;
            verto.options.passwd = params.passwd;
            verto.rpcClient.loginData(params);
        };

        $.verto.prototype.logout = function(msg) {
            var verto = this;
            verto.rpcClient.closeSocket();
            if (verto.callbacks.onWSClose) {
                verto.callbacks.onWSClose(verto, false);
            }
            verto.purge();
        };

        $.verto.prototype.login = function(msg) {
            var verto = this;
            //verto.logout();
            verto.rpcClient.call('login', {});
        };

        $.verto.prototype.message = function(msg) {
            var verto = this;
            var err = 0;

            if (!msg.to) {
                console.error("Missing To");
                err++;
            }

            if (!msg.body) {
                console.error("Missing Body");
                err++;
            }

            if (err) {
                return false;
            }

            verto.sendMethod("verto.info", {
                msg: msg
            });

            return true;
        };

        $.verto.prototype.processReply = function(method, success, e) {
            var verto = this;
            var i;

            //console.log("Response: " + method, success, e);

            switch (method) {
                case "verto.subscribe":
                    for (i in e.unauthorizedChannels) {
                        drop_bad(verto, e.unauthorizedChannels[i]);
                    }
                    for (i in e.subscribedChannels) {
                        mark_ready(verto, e.subscribedChannels[i]);
                    }

                    break;
                case "verto.unsubscribe":
                    //console.error(e);
                    break;
            }
        };

        $.verto.prototype.sendMethod = function(method, params) {
            var verto = this;

            verto.rpcClient.call(method, params,

                function(e) {
                    /* Success */
                    verto.processReply(method, true, e);
                },

                function(e) {
                    /* Error */
                    verto.processReply(method, false, e);
                });
        };

        function do_sub(verto, channel, obj) {

        }

        function drop_bad(verto, channel) {
            console.error("drop unauthorized channel: " + channel);
            delete verto.eventSUBS[channel];
        }

        function mark_ready(verto, channel) {
            for (var j in verto.eventSUBS[channel]) {
                verto.eventSUBS[channel][j].ready = true;
                console.log("subscribed to channel: " + channel);
                if (verto.eventSUBS[channel][j].readyHandler) {
                    verto.eventSUBS[channel][j].readyHandler(verto, channel);
                }
            }
        }

        var SERNO = 1;

        function do_subscribe(verto, channel, subChannels, sparams) {
            var params = sparams || {};

            var local = params.local;

            var obj = {
                eventChannel: channel,
                userData: params.userData,
                handler: params.handler,
                ready: false,
                readyHandler: params.readyHandler,
                serno: SERNO++
            };

            var isnew = false;

            if (!verto.eventSUBS[channel]) {
                verto.eventSUBS[channel] = [];
                subChannels.push(channel);
                isnew = true;
            }

            verto.eventSUBS[channel].push(obj);

            if (local) {
                obj.ready = true;
                obj.local = true;
            }

            if (!isnew && verto.eventSUBS[channel][0].ready) {
                obj.ready = true;
                if (obj.readyHandler) {
                    obj.readyHandler(verto, channel);
                }
            }

            return {
                serno: obj.serno,
                eventChannel: channel
            };

        }

        $.verto.prototype.subscribe = function(channel, sparams) {
            var verto = this;
            var r = [];
            var subChannels = [];
            var params = sparams || {};

            if (typeof(channel) === "string") {
                r.push(do_subscribe(verto, channel, subChannels, params));
            } else {
                for (var i in channel) {
                    r.push(do_subscribe(verto, channel, subChannels, params));
                }
            }

            if (subChannels.length) {
                verto.sendMethod("verto.subscribe", {
                    eventChannel: subChannels.length == 1 ? subChannels[0] : subChannels,
                    subParams: params.subParams
                });
            }

            return r;
        };

        $.verto.prototype.unsubscribe = function(handle) {
            var verto = this;
            var i;

            if (!handle) {
                for (i in verto.eventSUBS) {
                    if (verto.eventSUBS[i]) {
                        verto.unsubscribe(verto.eventSUBS[i]);
                    }
                }
            } else {
                var unsubChannels = {};
                var sendChannels = [];
                var channel;

                if (typeof(handle) == "string") {
                    delete verto.eventSUBS[handle];
                    unsubChannels[handle]++;
                } else {
                    for (i in handle) {
                        if (typeof(handle[i]) == "string") {
                            channel = handle[i];
                            delete verto.eventSUBS[channel];
                            unsubChannels[channel]++;
                        } else {
                            var repl = [];
                            channel = handle[i].eventChannel;

                            for (var j in verto.eventSUBS[channel]) {
                                if (verto.eventSUBS[channel][j].serno == handle[i].serno) {} else {
                                    repl.push(verto.eventSUBS[channel][j]);
                                }
                            }

                            verto.eventSUBS[channel] = repl;

                            if (verto.eventSUBS[channel].length === 0) {
                                delete verto.eventSUBS[channel];
                                unsubChannels[channel]++;
                            }
                        }
                    }
                }

                for (var u in unsubChannels) {
                    console.log("Sending Unsubscribe for: ", u);
                    sendChannels.push(u);
                }

                if (sendChannels.length) {
                    verto.sendMethod("verto.unsubscribe", {
                        eventChannel: sendChannels.length == 1 ? sendChannels[0] : sendChannels
                    });
                }
            }
        };

        $.verto.prototype.broadcast = function(channel, params) {
            var verto = this;
            var msg = {
                eventChannel: channel,
                data: {}
            };
            for (var i in params) {
                msg.data[i] = params[i];
            }
            verto.sendMethod("verto.broadcast", msg);
        };

        $.verto.prototype.purge = function(callID) {
            var verto = this;
            var x = 0;
            var i;

            for (i in verto.dialogs) {
                if (!x) {
                    console.log("purging dialogs");
                }
                x++;
                verto.dialogs[i].setState($.verto.enum.state.purge);
            }

            for (i in verto.eventSUBS) {
                if (verto.eventSUBS[i]) {
                    console.log("purging subscription: " + i);
                    delete verto.eventSUBS[i];
                }
            }
        };

        $.verto.prototype.hangup = function(callID) {
            var verto = this;
            if (callID) {
                var dialog = verto.dialogs[callID];

                if (dialog) {
                    dialog.hangup();
                }
            } else {
                for (var i in verto.dialogs) {
                    verto.dialogs[i].hangup();
                }
            }
        };

        $.verto.prototype.newCall = function(args, callbacks) {
            var verto = this;

            if (!verto.rpcClient.socketReady()) {
                console.error("Not Connected...");
                return;
            }

            var dialog = new $.verto.dialog($.verto.enum.direction.outbound, this, args);

            dialog.invite();

            if (callbacks) {
                dialog.callbacks = callbacks;
            }

            return dialog;
        };

        $.verto.prototype.handleMessage = function(data) {
            var verto = this;

            if (!(data && data.method)) {
                console.error("Invalid Data", data);
                return;
            }

            if (data.params.callID) {
                var dialog = verto.dialogs[data.params.callID];

                if (data.method === "verto.attach" && dialog) {
                    delete dialog.verto.dialogs[dialog.callID];
                    dialog.rtc.stop();
                    dialog = null;
                }

                if (dialog) {

                    switch (data.method) {
                        case 'verto.bye':
                            dialog.hangup(data.params);
                            break;
                        case 'verto.answer':
                            dialog.handleAnswer(data.params);
                            break;
                        case 'verto.media':
                            dialog.handleMedia(data.params);
                            break;
                        case 'verto.display':
                            dialog.handleDisplay(data.params);
                            break;
                        case 'verto.info':
                            dialog.handleInfo(data.params);
                            break;
                        default:
                            console.debug("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED", dialog, data.method);
                            break;
                    }
                } else {

                    switch (data.method) {
                        case 'verto.attach':
                            data.params.attach = true;

                            if (data.params.sdp && data.params.sdp.indexOf("m=video") > 0) {
                                data.params.useVideo = true;
                            }

                            if (data.params.sdp && data.params.sdp.indexOf("stereo=1") > 0) {
                                data.params.useStereo = true;
                            }

                            dialog = new $.verto.dialog($.verto.enum.direction.inbound, verto, data.params);
                            dialog.setState($.verto.enum.state.recovering);

                            break;
                        case 'verto.invite':

                            if (data.params.sdp && data.params.sdp.indexOf("m=video") > 0) {
                                data.params.wantVideo = true;
                            }

                            if (data.params.sdp && data.params.sdp.indexOf("stereo=1") > 0) {
                                data.params.useStereo = true;
                            }

                            dialog = new $.verto.dialog($.verto.enum.direction.inbound, verto, data.params);
                            break;
                        default:
                            console.debug("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED");
                            break;
                    }
                }

                return {
                    method: data.method
                };
            } else {
                switch (data.method) {
                    case 'verto.punt':
                        verto.purge();
                        verto.logout();
                        break;
                    case 'verto.event':
                        var list = null;
                        var key = null;

                        if (data.params) {
                            key = data.params.eventChannel;
                        }

                        if (key) {
                            list = verto.eventSUBS[key];

                            if (!list) {
                                list = verto.eventSUBS[key.split(".")[0]];
                            }
                        }

                        if (!list && key && key === verto.sessid) {
                            if (verto.callbacks.onMessage) {
                                verto.callbacks.onMessage(verto, null, $.verto.enum.message.pvtEvent, data.params);
                            }
                        } else if (!list && key && verto.dialogs[key]) {
                            verto.dialogs[key].sendMessage($.verto.enum.message.pvtEvent, data.params);
                        } else if (!list) {
                            if (!key) {
                                key = "UNDEFINED";
                            }
                            console.error("UNSUBBED or invalid EVENT " + key + " IGNORED");
                        } else {
                            for (var i in list) {
                                var sub = list[i];

                                if (!sub || !sub.ready) {
                                    console.error("invalid EVENT for " + key + " IGNORED");
                                } else if (sub.handler) {
                                    sub.handler(verto, data.params, sub.userData);
                                } else if (verto.callbacks.onEvent) {
                                    verto.callbacks.onEvent(verto, data.params, sub.userData);
                                } else {
                                    console.log("EVENT:", data.params);
                                }
                            }
                        }

                        break;

                    case "verto.info":
                        if (verto.callbacks.onMessage) {
                            verto.callbacks.onMessage(verto, null, $.verto.enum.message.info, data.params.msg);
                        }
                        //console.error(data);
                        console.debug("MESSAGE from: " + data.params.msg.from, data.params.msg.body);

                        break;

                    default:
                        console.error("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED", data.method);
                        break;
                }
            }
        };

        var del_array = function(array, name) {
            var r = [];
            var len = array.length;

            for (var i = 0; i < len; i++) {
                if (array[i] != name) {
                    r.push(array[i]);
                }
            }

            return r;
        };

        var hashArray = function() {
            var vha = this;

            var hash = {};
            var array = [];

            vha.reorder = function(a) {
                array = a;
                var h = hash;
                hash = {};

                var len = array.length;

                for (var i = 0; i < len; i++) {
                    var key = array[i];
                    if (h[key]) {
                        hash[key] = h[key];
                        delete h[key];
                    }
                }
                h = undefined;
            };

            vha.clear = function() {
                hash = undefined;
                array = undefined;
                hash = {};
                array = [];
            };

            vha.add = function(name, val, insertAt) {
                var redraw = false;

                if (!hash[name]) {
                    if (insertAt === undefined || insertAt < 0 || insertAt >= array.length) {
                        array.push(name);
                    } else {
                        var x = 0;
                        var n = [];
                        var len = array.length;

                        for (var i = 0; i < len; i++) {
                            if (x++==insertAt) {
                                n.push(name);
                            }
                            n.push(array[i]);
                        }

                        array = undefined;
                        array = n;
                        n = undefined;
                        redraw = true;
                    }
                }

                hash[name] = val;

                return redraw;
            };

            vha.del = function(name) {
                var r = false;

                if (hash[name]) {
                    array = del_array(array, name);
                    delete hash[name];
                    r = true;
                } else {
                    console.error("can't del nonexistant key " + name);
                }

                return r;
            };

            vha.get = function(name) {
                return hash[name];
            };

            vha.order = function() {
                return array;
            };

            vha.hash = function() {
                return hash;
            };

            vha.indexOf = function(name) {
                var len = array.length;

                for (var i = 0; i < len; i++) {
                    if (array[i] == name) {
                        return i;
                    }
                }
            };

            vha.arrayLen = function() {
                return array.length;
            };

            vha.asArray = function() {
                var r = [];

                var len = array.length;

                for (var i = 0; i < len; i++) {
                    var key = array[i];
                    r.push(hash[key]);
                }

                return r;
            };

            vha.each = function(cb) {
                var len = array.length;

                for (var i = 0; i < len; i++) {
                    cb(array[i], hash[array[i]]);
                }
            };

            vha.dump = function(html) {
                var str = "";

                vha.each(function(name, val) {
                    str += "name: " + name + " val: " + JSON.stringify(val) + (html ? "<br>" : "\n");
                });

                return str;
            };

        };

        $.verto.liveArray = function(verto, context, name, config) {
            var la = this;
            var lastSerno = 0;
            var binding = null;
            var user_obj = config.userObj;
            var local = false;

            // Inherit methods of hashArray
            hashArray.call(la);

            // Save the hashArray add, del, reorder, clear methods so we can make our own.
            la._add = la.add;
            la._del = la.del;
            la._reorder = la.reorder;
            la._clear = la.clear;

            la.context = context;
            la.name = name;
            la.user_obj = user_obj;

            la.verto = verto;
            la.broadcast = function(channel, obj) {
                verto.broadcast(channel, obj);
            };
            la.errs = 0;

            la.clear = function() {
                la._clear();
                lastSerno = 0;

                if (la.onChange) {
                    la.onChange(la, {
                        action: "clear"
                    });
                }
            };

            la.checkSerno = function(serno) {
                if (serno < 0) {
                    return true;
                }

                if (lastSerno > 0 && serno != (lastSerno + 1)) {
                    if (la.onErr) {
                        la.onErr(la, {
                            lastSerno: lastSerno,
                            serno: serno
                        });
                    }
                    la.errs++;
                    console.debug(la.errs);
                    if (la.errs < 3) {
                        la.bootstrap(la.user_obj);
                    }
                    return false;
                } else {
                    lastSerno = serno;
                    return true;
                }
            };

            la.reorder = function(serno, a) {
                if (la.checkSerno(serno)) {
                    la._reorder(a);
                    if (la.onChange) {
                        la.onChange(la, {
                            serno: serno,
                            action: "reorder"
                        });
                    }
                }
            };

            la.init = function(serno, val, key, index) {
                if (key === null || key === undefined) {
                    key = serno;
                }
                if (la.checkSerno(serno)) {
                    if (la.onChange) {
                        la.onChange(la, {
                            serno: serno,
                            action: "init",
                            index: index,
                            key: key,
                            data: val
                        });
                    }
                }
            };

            la.bootObj = function(serno, val) {
                if (la.checkSerno(serno)) {

                    //la.clear();
                    for (var i in val) {
                        la._add(val[i][0], val[i][1]);
                    }

                    if (la.onChange) {
                        la.onChange(la, {
                            serno: serno,
                            action: "bootObj",
                            data: val,
                            redraw: true
                        });
                    }
                }
            };

            // @param serno  La is the serial number for la particular request.
            // @param key    If looking at it as a hash table, la represents the key in the hashArray object where you want to store the val object.
            // @param index  If looking at it as an array, la represents the position in the array where you want to store the val object.
            // @param val    La is the object you want to store at the key or index location in the hash table / array.
            la.add = function(serno, val, key, index) {
                if (key === null || key === undefined) {
                    key = serno;
                }
                if (la.checkSerno(serno)) {
                    var redraw = la._add(key, val, index);
                    if (la.onChange) {
                        la.onChange(la, {
                            serno: serno,
                            action: "add",
                            index: index,
                            key: key,
                            data: val,
                            redraw: redraw
                        });
                    }
                }
            };

            la.modify = function(serno, val, key, index) {
                if (key === null || key === undefined) {
                    key = serno;
                }
                if (la.checkSerno(serno)) {
                    la._add(key, val, index);
                    if (la.onChange) {
                        la.onChange(la, {
                            serno: serno,
                            action: "modify",
                            key: key,
                            data: val,
                            index: index
                        });
                    }
                }
            };

            la.del = function(serno, key, index) {
                if (key === null || key === undefined) {
                    key = serno;
                }
                if (la.checkSerno(serno)) {
                    if (index === null || index < 0 || index === undefined) {
                        index = la.indexOf(key);
                    }
                    var ok = la._del(key);

                    if (ok && la.onChange) {
                        la.onChange(la, {
                            serno: serno,
                            action: "del",
                            key: key,
                            index: index
                        });
                    }
                }
            };

            var eventHandler = function(v, e, la) {
                var packet = e.data;

                //console.error("READ:", packet);

                if (packet.name != la.name) {
                    return;
                }

                switch (packet.action) {

                    case "init":
                        la.init(packet.wireSerno, packet.data, packet.hashKey, packet.arrIndex);
                        break;

                    case "bootObj":
                        la.bootObj(packet.wireSerno, packet.data);
                        break;
                    case "add":
                        la.add(packet.wireSerno, packet.data, packet.hashKey, packet.arrIndex);
                        break;

                    case "modify":
                        if (! (packet.arrIndex || packet.hashKey)) {
                            console.error("Invalid Packet", packet);
                        } else {
                            la.modify(packet.wireSerno, packet.data, packet.hashKey, packet.arrIndex);
                        }
                        break;
                    case "del":
                        if (! (packet.arrIndex || packet.hashKey)) {
                            console.error("Invalid Packet", packet);
                        } else {
                            la.del(packet.wireSerno, packet.hashKey, packet.arrIndex);
                        }
                        break;

                    case "clear":
                        la.clear();
                        break;

                    case "reorder":
                        la.reorder(packet.wireSerno, packet.order);
                        break;

                    default:
                        if (la.checkSerno(packet.wireSerno)) {
                            if (la.onChange) {
                                la.onChange(la, {
                                    serno: packet.wireSerno,
                                    action: packet.action,
                                    data: packet.data
                                });
                            }
                        }
                        break;
                }
            };

            if (la.context) {
                binding = la.verto.subscribe(la.context, {
                    handler: eventHandler,
                    userData: la,
                    subParams: config.subParams
                });
            }

            la.destroy = function() {
                la._clear();
                la.verto.unsubscribe(binding);
            };

            la.sendCommand = function(cmd, obj) {
                var self = la;
                self.broadcast(self.context, {
                    liveArray: {
                        command: cmd,
                        context: self.context,
                        name: self.name,
                        obj: obj
                    }
                });
            };

            la.bootstrap = function(obj) {
                var self = la;
                la.sendCommand("bootstrap", obj);
                //self.heartbeat();
            };

            la.changepage = function(obj) {
                var self = la;
                self.clear();
                self.broadcast(self.context, {
                    liveArray: {
                        command: "changepage",
                        context: la.context,
                        name: la.name,
                        obj: obj
                    }
                });
            };

            la.heartbeat = function(obj) {
                var self = la;

                var callback = function() {
                    self.heartbeat.call(self, obj);
                };
                self.broadcast(self.context, {
                    liveArray: {
                        command: "heartbeat",
                        context: self.context,
                        name: self.name,
                        obj: obj
                    }
                });
                self.hb_pid = setTimeout(callback, 30000);
            };

            la.bootstrap(la.user_obj);
        };

        $.verto.liveTable = function(verto, context, name, jq, config) {
            var dt;
            var la = new $.verto.liveArray(verto, context, name, {
                subParams: config.subParams
            });
            var lt = this;

            lt.liveArray = la;
            lt.dataTable = dt;
            lt.verto = verto;

            lt.destroy = function() {
                if (dt) {
                    dt.fnDestroy();
                }
                if (la) {
                    la.destroy();
                }

                dt = null;
                la = null;
            };

            la.onErr = function(obj, args) {
                console.error("Error: ", obj, args);
            };

            la.onChange = function(obj, args) {
                var index = 0;
                var iserr = 0;

                if (!dt) {
                    if (!config.aoColumns) {
                        if (args.action != "init") {
                            return;
                        }

                        config.aoColumns = [];

                        for (var i in args.data) {
                            config.aoColumns.push({
                                "sTitle": args.data[i]
                            });
                        }
                    }

                    dt = jq.dataTable(config);
                }

                if (dt && (args.action == "del" || args.action == "modify")) {
                    index = args.index;

                    if (index === undefined && args.key) {
                        index = la.indexOf(args.key);
                    }

                    if (index === undefined) {
                        console.error("INVALID PACKET Missing INDEX\n", args);
                        return;
                    }
                }

                if (config.onChange) {
                    config.onChange(obj, args);
                }

                try {
                    switch (args.action) {
                        case "bootObj":
                            if (!args.data) {
                                console.error("missing data");
                                return;
                            }
                            dt.fnClearTable();
                            dt.fnAddData(obj.asArray());
                            dt.fnAdjustColumnSizing();
                            break;
                        case "add":
                            if (!args.data) {
                                console.error("missing data");
                                return;
                            }
                            if (args.redraw > -1) {
                                // specific position, more costly
                                dt.fnClearTable();
                                dt.fnAddData(obj.asArray());
                            } else {
                                dt.fnAddData(args.data);
                            }
                            dt.fnAdjustColumnSizing();
                            break;
                        case "modify":
                            if (!args.data) {
                                return;
                            }
                            //console.debug(args, index);
                            dt.fnUpdate(args.data, index);
                            dt.fnAdjustColumnSizing();
                            break;
                        case "del":
                            dt.fnDeleteRow(index);
                            dt.fnAdjustColumnSizing();
                            break;
                        case "clear":
                            dt.fnClearTable();
                            break;
                        case "reorder":
                            // specific position, more costly
                            dt.fnClearTable();
                            dt.fnAddData(obj.asArray());
                            break;
                        case "hide":
                            jq.hide();
                            break;

                        case "show":
                            jq.show();
                            break;

                    }
                } catch(err) {
                    console.error("ERROR: " + err);
                    iserr++;
                }

                if (iserr) {
                    obj.errs++;
                    if (obj.errs < 3) {
                        obj.bootstrap(obj.user_obj);
                    }
                } else {
                    obj.errs = 0;
                }

            };

            la.onChange(la, {
                action: "init"
            });

        };

        var CONFMAN_SERNO = 1;

        $.verto.modfuncs = {};

        $.verto.confMan = function(verto, params) {
            var confMan = this;

            confMan.params = $.extend({
                tableID: null,
                statusID: null,
                mainModID: null,
                dialog: null,
                hasVid: false,
                laData: null,
                onBroadcast: null,
                onLaChange: null,
                onLaRow: null
            }, params);

            confMan.verto = verto;
            confMan.serno = CONFMAN_SERNO++;
            confMan.canvasCount = confMan.params.laData.canvasCount;

            function genMainMod(jq) {
                var play_id = "play_" + confMan.serno;
                var stop_id = "stop_" + confMan.serno;
                var recording_id = "recording_" + confMan.serno;
                var snapshot_id = "snapshot_" + confMan.serno;
                var rec_stop_id = "recording_stop" + confMan.serno;
                var div_id = "confman_" + confMan.serno;

                var html =  "<div id='" + div_id + "'><br>" +
                    "<button class='ctlbtn' id='" + play_id + "'>Play</button>" +
                    "<button class='ctlbtn' id='" + stop_id + "'>Stop</button>" +
                    "<button class='ctlbtn' id='" + recording_id + "'>Record</button>" +
                    "<button class='ctlbtn' id='" + rec_stop_id + "'>Record Stop</button>" +
                    (confMan.params.hasVid ? "<button class='ctlbtn' id='" + snapshot_id + "'>PNG Snapshot</button>" : "") +
                    "<br><br></div>";

                jq.html(html);

                $.verto.modfuncs.change_video_layout = function(id, canvas_id) {
                    var val = $("#" + id + " option:selected").text();
                    if (val !== "none") {
                        confMan.modCommand("vid-layout", null, [val, canvas_id]);
                    }
                };

                if (confMan.params.hasVid) {
                    for (var j = 0; j < confMan.canvasCount; j++) {
                        var vlayout_id = "confman_vid_layout_" + j + "_" + confMan.serno;
                        var vlselect_id = "confman_vl_select_" + j + "_" + confMan.serno;


                        var vlhtml =  "<div id='" + vlayout_id + "'><br>" +
                            "<b>Video Layout Canvas " + (j+1) +
                            "</b> <select onChange='$.verto.modfuncs.change_video_layout(\"" + vlayout_id + "\", \"" + j + "\")' id='" + vlselect_id + "'></select> " +
                            "<br><br></div>";
                        jq.append(vlhtml);
                    }

                    $("#" + snapshot_id).click(function() {
                        var file = prompt("Please enter file name", "");
                        if (file) {
                            confMan.modCommand("vid-write-png", null, file);
                        }
                    });
                }

                $("#" + play_id).click(function() {
                    var file = prompt("Please enter file name", "");
                    if (file) {
                        confMan.modCommand("play", null, file);
                    }
                });

                $("#" + stop_id).click(function() {
                    confMan.modCommand("stop", null, "all");
                });

                $("#" + recording_id).click(function() {
                    var file = prompt("Please enter file name", "");
                    if (file) {
                        confMan.modCommand("recording", null, ["start", file]);
                    }
                });

                $("#" + rec_stop_id).click(function() {
                    confMan.modCommand("recording", null, ["stop", "all"]);
                });

            }

            function genControls(jq, rowid) {
                var x = parseInt(rowid);
                var kick_id = "kick_" + x;
                var canvas_in_next_id = "canvas_in_next_" + x;
                var canvas_in_prev_id = "canvas_in_prev_" + x;
                var canvas_out_next_id = "canvas_out_next_" + x;
                var canvas_out_prev_id = "canvas_out_prev_" + x;

                var canvas_in_set_id = "canvas_in_set_" + x;
                var canvas_out_set_id = "canvas_out_set_" + x;

                var layer_set_id = "layer_set_" + x;
                var layer_next_id = "layer_next_" + x;
                var layer_prev_id = "layer_prev_" + x;

                var tmute_id = "tmute_" + x;
                var tvmute_id = "tvmute_" + x;
                var vbanner_id = "vbanner_" + x;
                var tvpresenter_id = "tvpresenter_" + x;
                var tvfloor_id = "tvfloor_" + x;
                var box_id = "box_" + x;
                var volup_id = "volume_in_up" + x;
                var voldn_id = "volume_in_dn" + x;
                var transfer_id = "transfer" + x;


                var html = "<div id='" + box_id + "'>";

                html += "<b>General Controls</b><hr noshade>";

                html += "<button class='ctlbtn' id='" + kick_id + "'>Kick</button>" +
                    "<button class='ctlbtn' id='" + tmute_id + "'>Mute</button>" +
                    "<button class='ctlbtn' id='" + voldn_id + "'>Vol -</button>" +
                    "<button class='ctlbtn' id='" + volup_id + "'>Vol +</button>" +
                    "<button class='ctlbtn' id='" + transfer_id + "'>Transfer</button>";

                if (confMan.params.hasVid) {
                    html += "<br><br><b>Video Controls</b><hr noshade>";


                    html += "<button class='ctlbtn' id='" + tvmute_id + "'>VMute</button>" +
                        "<button class='ctlbtn' id='" + tvpresenter_id + "'>Presenter</button>" +
                        "<button class='ctlbtn' id='" + tvfloor_id + "'>Vid Floor</button>" +
                        "<button class='ctlbtn' id='" + vbanner_id + "'>Banner</button>";

                    if (confMan.canvasCount > 1) {
                        html += "<br><br><b>Canvas Controls</b><hr noshade>" +
                            "<button class='ctlbtn' id='" + canvas_in_set_id + "'>Set Input Canvas</button>" +
                            "<button class='ctlbtn' id='" + canvas_in_prev_id + "'>Prev Input Canvas</button>" +
                            "<button class='ctlbtn' id='" + canvas_in_next_id + "'>Next Input Canvas</button>" +

                            "<br>" +

                            "<button class='ctlbtn' id='" + canvas_out_set_id + "'>Set Watching Canvas</button>" +
                            "<button class='ctlbtn' id='" + canvas_out_prev_id + "'>Prev Watching Canvas</button>" +
                            "<button class='ctlbtn' id='" + canvas_out_next_id + "'>Next Watching Canvas</button>";
                    }

                    html += "<br>" +

                        "<button class='ctlbtn' id='" + layer_set_id + "'>Set Layer</button>" +
                        "<button class='ctlbtn' id='" + layer_prev_id + "'>Prev Layer</button>" +
                        "<button class='ctlbtn' id='" + layer_next_id + "'>Next Layer</button>" +



                        "</div>";
                }

                jq.html(html);


                if (!jq.data("mouse")) {
                    $("#" + box_id).hide();
                }

                jq.mouseover(function(e) {
                    jq.data({"mouse": true});
                    $("#" + box_id).show();
                });

                jq.mouseout(function(e) {
                    jq.data({"mouse": false});
                    $("#" + box_id).hide();
                });

                $("#" + transfer_id).click(function() {
                    var xten = prompt("Enter Extension");
                    if (xten) {
                        confMan.modCommand("transfer", x, xten);
                    }
                });

                $("#" + kick_id).click(function() {
                    confMan.modCommand("kick", x);
                });


                $("#" + layer_set_id).click(function() {
                    var cid = prompt("Please enter layer ID", "");
                    if (cid) {
                        confMan.modCommand("vid-layer", x, cid);
                    }
                });

                $("#" + layer_next_id).click(function() {
                    confMan.modCommand("vid-layer", x, "next");
                });
                $("#" + layer_prev_id).click(function() {
                    confMan.modCommand("vid-layer", x, "prev");
                });

                $("#" + canvas_in_set_id).click(function() {
                    var cid = prompt("Please enter canvas ID", "");
                    if (cid) {
                        confMan.modCommand("vid-canvas", x, cid);
                    }
                });

                $("#" + canvas_out_set_id).click(function() {
                    var cid = prompt("Please enter canvas ID", "");
                    if (cid) {
                        confMan.modCommand("vid-watching-canvas", x, cid);
                    }
                });

                $("#" + canvas_in_next_id).click(function() {
                    confMan.modCommand("vid-canvas", x, "next");
                });
                $("#" + canvas_in_prev_id).click(function() {
                    confMan.modCommand("vid-canvas", x, "prev");
                });


                $("#" + canvas_out_next_id).click(function() {
                    confMan.modCommand("vid-watching-canvas", x, "next");
                });
                $("#" + canvas_out_prev_id).click(function() {
                    confMan.modCommand("vid-watching-canvas", x, "prev");
                });

                $("#" + tmute_id).click(function() {
                    confMan.modCommand("tmute", x);
                });

                if (confMan.params.hasVid) {
                    $("#" + tvmute_id).click(function() {
                        confMan.modCommand("tvmute", x);
                    });
                    $("#" + tvpresenter_id).click(function() {
                        confMan.modCommand("vid-res-id", x, "presenter");
                    });
                    $("#" + tvfloor_id).click(function() {
                        confMan.modCommand("vid-floor", x, "force");
                    });
                    $("#" + vbanner_id).click(function() {
                        var text = prompt("Please enter text", "");
                        if (text) {
                            confMan.modCommand("vid-banner", x, escape(text));
                        }
                    });
                }

                $("#" + volup_id).click(function() {
                    confMan.modCommand("volume_in", x, "up");
                });

                $("#" + voldn_id).click(function() {
                    confMan.modCommand("volume_in", x, "down");
                });

                return html;
            }

            var atitle = "";
            var awidth = 0;

            //$(".jsDataTable").width(confMan.params.hasVid ? "900px" : "800px");

            verto.subscribe(confMan.params.laData.chatChannel, {
                handler: function(v, e) {
                    if (typeof(confMan.params.chatCallback) === "function") {
                        confMan.params.chatCallback(v,e);
                    }
                }
            });

            if (confMan.params.laData.role === "moderator") {
                atitle = "Action";
                awidth = 600;

                if (confMan.params.mainModID) {
                    genMainMod($(confMan.params.mainModID));
                    $(confMan.params.displayID).html("Moderator Controls Ready<br><br>");
                } else {
                    $(confMan.params.mainModID).html("");
                }

                verto.subscribe(confMan.params.laData.modChannel, {
                    handler: function(v, e) {
                        //console.error("MODDATA:", e.data);
                        if (confMan.params.onBroadcast) {
                            confMan.params.onBroadcast(verto, confMan, e.data);
                        }

                        if (e.data["conf-command"] === "list-videoLayouts") {
                            for (var j = 0; j < confMan.canvasCount; j++) {
                                var vlselect_id = "#confman_vl_select_" + j + "_" + confMan.serno;
                                var vlayout_id = "#confman_vid_layout_" + j + "_" + confMan.serno;

                                var x = 0;
                                var options;

                                $(vlselect_id).selectmenu({});
                                $(vlselect_id).selectmenu("enable");
                                $(vlselect_id).empty();

                                $(vlselect_id).append(new Option("Choose a Layout", "none"));

                                if (e.data.responseData) {
                                    options = e.data.responseData.sort();

                                    for (var i in options) {
                                        $(vlselect_id).append(new Option(options[i], options[i]));
                                        x++;
                                    }
                                }

                                if (x) {
                                    $(vlselect_id).selectmenu('refresh', true);
                                } else {
                                    $(vlayout_id).hide();
                                }
                            }
                        } else {

                            if (!confMan.destroyed && confMan.params.displayID) {
                                $(confMan.params.displayID).html(e.data.response + "<br><br>");
                                if (confMan.lastTimeout) {
                                    clearTimeout(confMan.lastTimeout);
                                    confMan.lastTimeout = 0;
                                }
                                confMan.lastTimeout = setTimeout(function() { $(confMan.params.displayID).html(confMan.destroyed ? "" : "Moderator Controls Ready<br><br>");}, 4000);
                            }
                        }
                    }
                });


                if (confMan.params.hasVid) {
                    confMan.modCommand("list-videoLayouts", null, null);
                }
            }

            var row_callback = null;

            if (confMan.params.laData.role === "moderator") {
                row_callback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (!aData[5]) {
                        var $row = $('td:eq(5)', nRow);
                        genControls($row, aData);

                        if (confMan.params.onLaRow) {
                            confMan.params.onLaRow(verto, confMan, $row, aData);
                        }
                    }
                };
            }

            confMan.lt = new $.verto.liveTable(verto, confMan.params.laData.laChannel, confMan.params.laData.laName, $(confMan.params.tableID), {
                subParams: {
                    callID: confMan.params.dialog ? confMan.params.dialog.callID : null
                },

                "onChange": function(obj, args) {
                    $(confMan.params.statusID).text("Conference Members: " + " (" + obj.arrayLen() + " Total)");
                    if (confMan.params.onLaChange) {
                        confMan.params.onLaChange(verto, confMan, $.verto.enum.confEvent.laChange, obj, args);
                    }
                },

                "aaData": [],
                "aoColumns": [
                    {
                        "sTitle": "ID",
                        "sWidth": "50"
                    },
                    {
                        "sTitle": "Number",
                        "sWidth": "250"
                    },
                    {
                        "sTitle": "Name",
                        "sWidth": "250"
                    },
                    {
                        "sTitle": "Codec",
                        "sWidth": "100"
                    },
                    {
                        "sTitle": "Status",
                        "sWidth": confMan.params.hasVid ? "200px" : "150px"
                    },
                    {
                        "sTitle": atitle,
                        "sWidth": awidth,
                    }
                ],
                "bAutoWidth": true,
                "bDestroy": true,
                "bSort": false,
                "bInfo": false,
                "bFilter": false,
                "bLengthChange": false,
                "bPaginate": false,
                "iDisplayLength": 1400,

                "oLanguage": {
                    "sEmptyTable": "The Conference is Empty....."
                },

                "fnRowCallback": row_callback

            });
        };

        $.verto.confMan.prototype.modCommand = function(cmd, id, value) {
            var confMan = this;

            confMan.verto.rpcClient.call("verto.broadcast", {
                "eventChannel": confMan.params.laData.modChannel,
                "data": {
                    "application": "conf-control",
                    "command": cmd,
                    "id": id,
                    "value": value
                }
            });
        };

        $.verto.confMan.prototype.sendChat = function(message, type) {
            var confMan = this;
            confMan.verto.rpcClient.call("verto.broadcast", {
                "eventChannel": confMan.params.laData.chatChannel,
                "data": {
                    "action": "send",
                    "message": message,
                    "type": type
                }
            });
        };


        $.verto.confMan.prototype.destroy = function() {
            var confMan = this;

            confMan.destroyed = true;

            if (confMan.lt) {
                confMan.lt.destroy();
            }

            if (confMan.params.laData.chatChannel) {
                confMan.verto.unsubscribe(confMan.params.laData.chatChannel);
            }

            if (confMan.params.laData.modChannel) {
                confMan.verto.unsubscribe(confMan.params.laData.modChannel);
            }

            if (confMan.params.mainModID) {
                $(confMan.params.mainModID).html("");
            }
        };

        $.verto.dialog = function(direction, verto, params) {
            var dialog = this;

            dialog.params = $.extend({
                useVideo: verto.options.useVideo,
                useStereo: verto.options.useStereo,
                screenShare: false,
                useCamera: verto.options.deviceParams.useCamera,
                useMic: verto.options.deviceParams.useMic,
                useSpeak: verto.options.deviceParams.useSpeak,

                tag: verto.options.tag,
                localTag: verto.options.localTag,
                login: verto.options.login,
                videoParams: verto.options.videoParams
            }, params);

            dialog.verto = verto;
            dialog.direction = direction;
            dialog.lastState = null;
            dialog.state = dialog.lastState = $.verto.enum.state.new;
            dialog.callbacks = verto.callbacks;
            dialog.answered = false;
            dialog.attach = params.attach || false;
            dialog.screenShare = params.screenShare || false;
            dialog.useCamera = dialog.params.useCamera;
            dialog.useMic = dialog.params.useMic;
            dialog.useSpeak = dialog.params.useSpeak;


            if (dialog.params.callID) {
                dialog.callID = dialog.params.callID;
            } else {
                dialog.callID = dialog.params.callID = generateGUID();
            }

            if (dialog.params.tag) {
                dialog.audioStream = document.getElementById(dialog.params.tag);

                if (dialog.params.useVideo) {
                    dialog.videoStream = dialog.audioStream;
                }
            } else if (verto.callbacks.onGetVideoContainer) {
                verto.callbacks.onGetVideoContainer(this);
                dialog.audioStream = document.getElementById(dialog.params.tag);
                if (dialog.params.useVideo) {
                    dialog.videoStream = dialog.audioStream;
                }
            };

            if (dialog.params.localTag) {
                dialog.localVideo = document.getElementById(dialog.params.localTag);
            }

            dialog.verto.dialogs[dialog.callID] = dialog;

            var RTCcallbacks = {};

            if (dialog.direction == $.verto.enum.direction.inbound) {
                if (dialog.params.display_direction === "outbound") {
                    dialog.params.remote_caller_id_name = dialog.params.caller_id_name;
                    dialog.params.remote_caller_id_number = dialog.params.caller_id_number;
                } else {
                    dialog.params.remote_caller_id_name = dialog.params.callee_id_name;
                    dialog.params.remote_caller_id_number = dialog.params.callee_id_number;
                }

                if (!dialog.params.remote_caller_id_name) {
                    dialog.params.remote_caller_id_name = "Nobody";
                }

                if (!dialog.params.remote_caller_id_number) {
                    dialog.params.remote_caller_id_number = "UNKNOWN";
                }

                RTCcallbacks.onMessage = function(rtc, msg) {
                    console.debug(msg);
                };

                RTCcallbacks.onAnswerSDP = function(rtc, sdp) {
                    console.error("answer sdp", sdp);
                };
            } else {
                dialog.params.remote_caller_id_name = "Outbound Call";
                dialog.params.remote_caller_id_number = dialog.params.destination_number;
            }

            RTCcallbacks.onICESDP = function(rtc) {
                console.log("RECV " + rtc.type + " SDP", rtc.mediaData.SDP);

                if (dialog.state == $.verto.enum.state.requesting || dialog.state == $.verto.enum.state.answering || dialog.state == $.verto.enum.state.active) {
                    //location.reload();
                    return;
                }

                if (rtc.type == "offer") {
                    if (dialog.state == $.verto.enum.state.active) {

                        dialog.setState($.verto.enum.state.requesting);
                        dialog.sendMethod("verto.attach", {

                            sdp: rtc.mediaData.SDP
                        });
                    } else {
                        dialog.setState($.verto.enum.state.requesting);

                        dialog.sendMethod("verto.invite", {
                            sdp: rtc.mediaData.SDP
                        });
                    }
                } else { //answer
                    dialog.setState($.verto.enum.state.answering);

                    dialog.sendMethod(dialog.attach ? "verto.attach" : "verto.answer", {
                        sdp: dialog.rtc.mediaData.SDP
                    });
                }

            };

            RTCcallbacks.onICE = function(rtc) {
                //console.log("cand", rtc.mediaData.candidate);
                if (rtc.type == "offer") {
                    console.log("offer", rtc.mediaData.candidate);
                    return;
                }
            };

            RTCcallbacks.onStream = function(rtc, stream) {
                console.log("stream started");
            };

            RTCcallbacks.onError = function(e) {
                console.error("ERROR:", e);
                dialog.hangup({cause: "Device or Permission Error"});
            };

            RTCcallbacks.onRemoteStream = function (stream) {
                if (dialog.callbacks.onRemoteStream)
                    dialog.callbacks.onRemoteStream(dialog, stream);
            };

            dialog.rtc = new $.FSRTC({
                callbacks: RTCcallbacks,
                localVideo: dialog.screenShare ? null : dialog.localVideo,
                useVideo: dialog.params.useVideo ? dialog.videoStream : null,
                useAudio: dialog.audioStream,
                useStereo: dialog.params.useStereo,
                videoParams: dialog.params.videoParams,
                audioParams: verto.options.audioParams,
                iceServers: verto.options.iceServers,
                screenShare: dialog.screenShare,
                useCamera: dialog.useCamera,
                useMic: dialog.useMic,
                useSpeak: dialog.useSpeak
            });

            dialog.rtc.verto = dialog.verto;

            if (dialog.direction == $.verto.enum.direction.inbound) {
                if (dialog.attach) {
                    if (dialog.verto.options.attachAutoAnswer)
                        dialog.answer();
                } else {
                    dialog.ring();
                }
            }
        };
        // new ficha!!!
        $.verto.dialog.prototype._autoAnsverDialogs = [];
        $.verto.dialog.prototype.getAutoAnswerDialog = function (id) {
            var dialogId = ~this._autoAnsverDialogs.indexOf(id);
            if (dialogId) {
                this._autoAnsverDialogs.slice(dialogId, 1);
                return true;
            }

            return false;
        };
        $.verto.dialog.prototype.setAutoAnswerDialog = function (id) {
            // TODO && no answer call
            if (~this._autoAnsverDialogs.indexOf(id)) {
                return false;
            }

            return this._autoAnsverDialogs.push(id);
        };


        $.verto.dialog.prototype.invite = function() {
            var dialog = this;
            dialog.rtc.call();
        };

        $.verto.dialog.prototype.sendMethod = function(method, obj) {
            var dialog = this;
            obj.dialogParams = {};

            for (var i in dialog.params) {
                if (i == "sdp" && method != "verto.invite" && method != "verto.attach") {
                    continue;
                }

                obj.dialogParams[i] = dialog.params[i];
            }

            dialog.verto.rpcClient.call(method, obj,

                function(e) {
                    /* Success */
                    dialog.processReply(method, true, e);
                },

                function(e) {
                    /* Error */
                    dialog.processReply(method, false, e);
                });
        };

        function checkStateChange(oldS, newS) {

            if (newS == $.verto.enum.state.purge || $.verto.enum.states[oldS.name][newS.name]) {
                return true;
            }

            return false;
        }

        $.verto.dialog.prototype.setState = function(state) {
            var dialog = this;

            if (dialog.state == $.verto.enum.state.ringing) {
                dialog.stopRinging();
            }

            if (dialog.state == state || !checkStateChange(dialog.state, state)) {
                console.error("Dialog " + dialog.callID + ": INVALID state change from " + dialog.state.name + " to " + state.name);
                dialog.hangup();
                return false;
            }

            console.info("Dialog " + dialog.callID + ": state change from " + dialog.state.name + " to " + state.name);

            dialog.lastState = dialog.state;
            dialog.state = state;

            if (!dialog.causeCode) {
                dialog.causeCode = 16;
            }

            if (!dialog.cause) {
                dialog.cause = "NORMAL CLEARING";
            }

            if (dialog.callbacks.onDialogState) {
                dialog.callbacks.onDialogState(this);
            }

            switch (dialog.state) {

                case $.verto.enum.state.early:
                case $.verto.enum.state.active:

                    var speaker = dialog.useSpeak;
                    console.info("Using Speaker: ", speaker);

                    if (speaker && speaker !== "any") {
                        var videoElement = dialog.audioStream;

                        setTimeout(function() {
                            console.info("Setting speaker:", videoElement, speaker);
                            attachSinkId(videoElement, speaker);}, 500);
                    }

                    break;

                case $.verto.enum.state.trying:
                    setTimeout(function() {
                        if (dialog.state == $.verto.enum.state.trying) {
                            dialog.setState($.verto.enum.state.hangup);
                        }
                    }, 30000);
                    break;
                case $.verto.enum.state.purge:
                    dialog.setState($.verto.enum.state.destroy);
                    break;
                case $.verto.enum.state.hangup:

                    if (dialog.lastState.val > $.verto.enum.state.requesting.val && dialog.lastState.val < $.verto.enum.state.hangup.val) {
                        dialog.sendMethod("verto.bye", {});
                    }

                    dialog.setState($.verto.enum.state.destroy);
                    break;
                case $.verto.enum.state.destroy:
                    delete dialog.verto.dialogs[dialog.callID];
                    if (dialog.params.screenShare) {
                        dialog.rtc.stopPeer();
                    } else {
                        dialog.rtc.stop();
                    }
                    break;
            }

            return true;
        };

        $.verto.dialog.prototype.processReply = function(method, success, e) {
            var dialog = this;

            //console.log("Response: " + method + " State:" + dialog.state.name, success, e);

            switch (method) {

                case "verto.answer":
                case "verto.attach":
                    if (success) {
                        dialog.setState($.verto.enum.state.active);
                    } else {
                        dialog.hangup();
                    }
                    break;
                case "verto.invite":
                    if (success) {
                        dialog.setState($.verto.enum.state.trying);
                    } else {
                        dialog.setState($.verto.enum.state.destroy);
                    }
                    break;

                case "verto.bye":
                    dialog.hangup();
                    break;

                case "verto.modify":
                    if (e.holdState) {
                        if (e.holdState == "held") {
                            if (dialog.state != $.verto.enum.state.held) {
                                dialog.setState($.verto.enum.state.held);
                                dialog.setMuteVideo("off", false);
                            }
                        } else if (e.holdState == "active") {
                            if (dialog.state != $.verto.enum.state.active) {
                                dialog.setState($.verto.enum.state.active);
                                dialog.setMuteVideo("on", false);
                                if (dialog.callbacks.onUnheld) {
                                    dialog.callbacks.onUnheld(dialog);
                                };
                            }
                        }
                    }

                    if (success) {}

                    break;

                default:
                    break;
            }

        };

        $.verto.dialog.prototype.hangup = function(params) {
            var dialog = this;

            if (params) {
                if (params.causeCode) {
                    dialog.causeCode = params.causeCode;
                }

                if (params.cause) {
                    dialog.cause = params.cause;
                }
            }

            if (dialog.state.val >= $.verto.enum.state.new.val && dialog.state.val < $.verto.enum.state.hangup.val) {
                dialog.setState($.verto.enum.state.hangup);
            } else if (dialog.state.val < $.verto.enum.state.destroy) {
                dialog.setState($.verto.enum.state.destroy);
            }
        };

        $.verto.dialog.prototype.stopRinging = function() {
            var dialog = this;
            if (dialog.verto.ringer) {
                dialog.verto.ringer[0].pause();
                dialog.verto.ringer.currentTime = 0;
                //dialog.verto.ringer.stop();
            }
        };

        $.verto.dialog.prototype.indicateRing = function() {
            var dialog = this;

            if (dialog.verto.ringer) {
                dialog.verto.ringer.attr("src", dialog.verto.options.ringFile)[0].play();

                setTimeout(function() {
                        dialog.stopRinging();
                        if (dialog.state == $.verto.enum.state.ringing) {
                            dialog.indicateRing();
                        }
                    },
                    dialog.verto.options.ringSleep);
            }
        };

        $.verto.dialog.prototype.ring = function() {
            var dialog = this;

            dialog.setState($.verto.enum.state.ringing);
            dialog.indicateRing();
        };

        $.verto.dialog.prototype.useVideo = function(on) {
            var dialog = this;

            dialog.params.useVideo = on;

            if (on) {
                dialog.videoStream = dialog.audioStream;
            } else {
                dialog.videoStream = null;
            }

            dialog.rtc.useVideo(dialog.videoStream, dialog.localVideo);

        };

        $.verto.dialog.prototype.setMute = function(what) {
            var dialog = this;
            return dialog.rtc.setMute(what);
        };

        $.verto.dialog.prototype.setMuteVideo = function(what, user) {
            var dialog = this;
            var muted = dialog.rtc.setMuteVideo(what, user);

            if (this.callbacks['onVideoEnabledChange']) {
                this.callbacks.onVideoEnabledChange(dialog)
            };

            return muted;
        };

        $.verto.dialog.prototype.getMute = function(what) {
            var dialog = this;
            return dialog.rtc.getMute(what);
        };

        $.verto.dialog.prototype.useStereo = function(on) {
            var dialog = this;

            dialog.params.useStereo = on;
            dialog.rtc.useStereo(on);
        };

        $.verto.dialog.prototype.dtmf = function(digits) {
            var dialog = this;
            if (digits) {
                dialog.sendMethod("verto.info", {
                    dtmf: digits
                });
            }
        };

        $.verto.dialog.prototype.transfer = function(dest, params) {
            var dialog = this;
            if (dest) {
                dialog.sendMethod("verto.modify", {
                    action: "transfer",
                    destination: dest,
                    params: params
                });
            }
        };

        $.verto.dialog.prototype.hold = function(params) {
            var dialog = this;

            dialog.sendMethod("verto.modify", {
                action: "hold",
                params: params
            });
        };

        $.verto.dialog.prototype.unhold = function(params) {
            var dialog = this;

            dialog.sendMethod("verto.modify", {
                action: "unhold",
                params: params
            });
        };

        $.verto.dialog.prototype.toggleHold = function(params) {
            var dialog = this;

            dialog.sendMethod("verto.modify", {
                action: "toggleHold",
                params: params
            });
        };

        $.verto.dialog.prototype.message = function(msg) {
            var dialog = this;
            var err = 0;

            msg.from = dialog.params.login;

            if (!msg.to) {
                console.error("Missing To");
                err++;
            }

            if (!msg.body) {
                console.error("Missing Body");
                err++;
            }

            if (err) {
                return false;
            }

            dialog.sendMethod("verto.info", {
                msg: msg
            });

            return true;
        };

        $.verto.dialog.prototype.answer = function(params) {
            var dialog = this;

            if (!dialog.answered) {
                if (!params) {
                    params = {};
                }
                params.sdp = dialog.params.sdp;

                if (params) {
                    if (params.useVideo) {
                        dialog.useVideo(true);
                    }
                    dialog.params.callee_id_name = params.callee_id_name;
                    dialog.params.callee_id_number = params.callee_id_number;

                    if (params.useCamera) {
                        dialog.useCamera = params.useCamera;
                    }

                    if (params.useMic) {
                        dialog.useMic = params.useMic;
                    }

                    if (params.useSpeak) {
                        dialog.useSpeak = params.useSpeak;
                    }
                }

                dialog.rtc.createAnswer(params);
                dialog.answered = true;
            }

        };

        $.verto.dialog.prototype.handleAnswer = function(params) {
            var dialog = this;

            dialog.gotAnswer = true;

            if (dialog.state.val >= $.verto.enum.state.active.val) {
                return;
            }

            if (dialog.state.val >= $.verto.enum.state.early.val) {
                dialog.setState($.verto.enum.state.active);
            } else {
                if (dialog.gotEarly) {
                    console.log("Dialog " + dialog.callID + " Got answer while still establishing early media, delaying...");
                } else {
                    console.log("Dialog " + dialog.callID + " Answering Channel");
                    dialog.rtc.answer(params.sdp, function() {
                        dialog.setState($.verto.enum.state.active);
                    }, function(e) {
                        console.error(e);
                        dialog.hangup();
                        if (dialog.callbacks.onError) {
                            dialog.callbacks.onError.apply(dialog.rtc, [dialog.rtc, new Error(e)]);
                        };
                    });
                    console.log("Dialog " + dialog.callID + "ANSWER SDP", params.sdp);
                }
            }


        };

        $.verto.dialog.prototype.cidString = function(enc) {
            var dialog = this;
            var party = dialog.params.remote_caller_id_name + (enc ? " &lt;" : " <") + dialog.params.remote_caller_id_number + (enc ? "&gt;" : ">");
            return party;
        };

        $.verto.dialog.prototype.sendMessage = function(msg, params) {
            var dialog = this;

            if (dialog.callbacks.onMessage) {
                dialog.callbacks.onMessage(dialog.verto, dialog, msg, params);
            }
        };

        $.verto.dialog.prototype.handleInfo = function(params) {
            var dialog = this;

            dialog.sendMessage($.verto.enum.message.info, params.msg);
        };

        $.verto.dialog.prototype.handleDisplay = function(params) {
            var dialog = this;

            if (params.display_name) {
                dialog.params.remote_caller_id_name = params.display_name;
            }
            if (params.display_number) {
                dialog.params.remote_caller_id_number = params.display_number;
            }

            dialog.sendMessage($.verto.enum.message.display, {});
        };

        $.verto.dialog.prototype.handleMedia = function(params) {
            var dialog = this;

            if (dialog.state.val >= $.verto.enum.state.early.val) {
                return;
            }

            dialog.gotEarly = true;

            dialog.rtc.answer(params.sdp, function() {
                console.log("Dialog " + dialog.callID + "Establishing early media");
                dialog.setState($.verto.enum.state.early);

                if (dialog.gotAnswer) {
                    console.log("Dialog " + dialog.callID + "Answering Channel");
                    dialog.setState($.verto.enum.state.active);
                }
            }, function(e) {
                console.error(e);
                dialog.hangup();
            });
            console.log("Dialog " + dialog.callID + "EARLY SDP", params.sdp);
        };

        $.verto.ENUM = function(s) {
            var i = 0,
                o = {};
            s.split(" ").map(function(x) {
                o[x] = {
                    name: x,
                    val: i++
                };
            });
            return Object.freeze(o);
        };

        $.verto.enum = {};

        $.verto.enum.states = Object.freeze({
            new: {
                requesting: 1,
                recovering: 1,
                ringing: 1,
                destroy: 1,
                answering: 1,
                hangup: 1
            },
            requesting: {
                trying: 1,
                hangup: 1,
                active: 1
            },
            recovering: {
                answering: 1,
                hangup: 1
            },
            trying: {
                active: 1,
                early: 1,
                hangup: 1
            },
            ringing: {
                answering: 1,
                hangup: 1
            },
            answering: {
                active: 1,
                hangup: 1
            },
            active: {
                answering: 1,
                requesting: 1,
                hangup: 1,
                held: 1
            },
            held: {
                hangup: 1,
                active: 1
            },
            early: {
                hangup: 1,
                active: 1
            },
            hangup: {
                destroy: 1
            },
            destroy: {},
            purge: {
                destroy: 1
            }
        });

        $.verto.enum.state = $.verto.ENUM("new requesting trying recovering ringing answering early active held hangup destroy purge");
        $.verto.enum.direction = $.verto.ENUM("inbound outbound");
        $.verto.enum.message = $.verto.ENUM("display info pvtEvent");

        $.verto.enum = Object.freeze($.verto.enum);

        $.verto.saved = [];

        $.verto.unloadJobs = [];

        $(window).bind('beforeunload', function() {
            for (var f in $.verto.unloadJobs) {
                $.verto.unloadJobs[f]();
            }

            /* for (var i in $.verto.saved) {
             var verto = $.verto.saved[i];
             if (verto) {

             verto.purge();
             verto.logout();
             }
             } */

            return $.verto.warnOnUnload;
        });

        $.verto.videoDevices = [];
        $.verto.audioInDevices = [];
        $.verto.audioOutDevices = [];

        var checkDevices = function(runtime) {
            console.info("enumerating devices");
            var aud_in = [], aud_out = [], vid = [];

            if ((!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) && MediaStreamTrack.getSources) {
                MediaStreamTrack.getSources(function (media_sources) {
                    for (var i = 0; i < media_sources.length; i++) {

                        if (media_sources[i].kind == 'video') {
                            vid.push(media_sources[i]);
                        } else {
                            aud_in.push(media_sources[i]);
                        }
                    }

                    $.verto.videoDevices = vid;
                    $.verto.audioInDevices = aud_in;

                    console.info("Audio Devices", $.verto.audioInDevices);
                    console.info("Video Devices", $.verto.videoDevices);
                    runtime(true);
                });
            } else {
                /* of course it's a totally different API CALL with different element names for the same exact thing */

                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    console.log("enumerateDevices() not supported.");
                    return;
                }

                // List cameras and microphones.

                navigator.mediaDevices.enumerateDevices()
                    .then(function(devices) {
                        devices.forEach(function(device) {
                            console.log(device);

                            console.log(device.kind + ": " + device.label +
                                " id = " + device.deviceId);

                            if (device.kind === "videoinput") {
                                vid.push({id: device.deviceId, kind: "video", label: device.label});
                            } else if (device.kind === "audioinput") {
                                aud_in.push({id: device.deviceId, kind: "audio_in", label: device.label});
                            } else if (device.kind === "audiooutput") {
                                aud_out.push({id: device.deviceId, kind: "audio_out", label: device.label});
                            }
                        });


                        $.verto.videoDevices = vid;
                        $.verto.audioInDevices = aud_in;
                        $.verto.audioOutDevices = aud_out;

                        console.info("Audio IN Devices", $.verto.audioInDevices);
                        console.info("Audio Out Devices", $.verto.audioOutDevices);
                        console.info("Video Devices", $.verto.videoDevices);
                        runtime(true);

                    })
                    .catch(function(err) {
                        console.log(" Device Enumeration ERROR: " + err.name + ": " + err.message);
                        runtime(false);
                    });
            }

        };

        $.verto.refreshDevices = function(runtime) {
            checkDevices(runtime);
        }


        $.verto.init = function(obj, runtime) {
            if (!obj) {
                obj = {};
            }

            if (!obj.skipPermCheck && !obj.skipDeviceCheck) {
                $.FSRTC.checkPerms(function(status) {
                    checkDevices(runtime);
                }, true, true);
            } else if (obj.skipPermCheck && !obj.skipDeviceCheck) {
                checkDevices(runtime);
            } else if (!obj.skipPermCheck && obj.skipDeviceCheck) {
                $.FSRTC.checkPerms(function(status) {
                    runtime(status);
                }, true, true);
            } else {
                runtime(null);
            }

        }

        $.verto.genUUID = function () {
            return generateGUID();
        }

        $.verto.findDevices = function(runtime) {
            var aud = [], vid = [];

            $.FSRTC.getValidRes(null, function(validRes) {
                if (MediaStreamTrack.getSources === undefined) {
                    if (runtime)
                        runtime([{}], [{}], validRes);
                    return;
                }
                MediaStreamTrack.getSources(function (media_sources) {
                    for (var i = 0; i < media_sources.length; i++) {

                        if (media_sources[i].kind == 'video') {
                            vid.push(media_sources[i]);
                        } else {
                            aud.push(media_sources[i]);
                        }
                    }

                    $.verto.videoDevices = vid;
                    $.verto.audioDevices = aud;
                    console.info("Audio Devices", $.verto.audioDevices);

                    console.info("Video Devices", $.verto.videoDevices);
                    if (runtime)
                        runtime(aud, vid, validRes);
                });
            });
        }


    })(jQuery);
