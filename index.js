/*! webfan (C) Till Wehowski, Webfan.de - All rights reserved.
*	          - frdl.ns.SFRDL (Frdl Standard Library)
*                http://locutus.io/php 
*/
/*! @ frdl.Frdlweb.js.Compiler.es6 : no */
/*! @ frdl.Frdlweb.js.Compiler.defaultPlugin : frdlcjs */
define('frdl', ['process', 'feature!es6Symbol', 'feature!Proxy', 'webfan/overload', 'EventEmitter', 'fs', 'webfan/ready-check'], function(process, es6Symbol, ProxyPolyfillDummy, overload, EventEmitter, fs, makeReadyCheck) {
	try {
		frdl = clone(overload).defaultProxy;
	} catch(e) {
		var frdl = clone(overload).defaultProxy;
	}
	var k, libraryContext = global.require.s.contexts._;
	for(k in libraryContext) {
		frdl[k] = libraryContext[k];
	}
	frdl.when = function() {
		var e = 'frdl.when is not maintained atm';
		console.log(e);
		throw e;
	};
	frdl.EventEmitter = EventEmitter;
	Object.defineProperty(frdl, 'state', {
		get: function() {
			return require.state;
		}
	});
	Object.defineProperty(global, 'frdl', {
		get: function() {
			return frdl;
		}
	});
	makeReadyCheck(frdl, 'ready', 'addReadyCheck', true);
	var mapLoader = function() {
		requirejs.config({
			map: {
				'webfan/bootcache': {
					'*': 'frdlcjs'
				}
			}
		});
	};
	var loadTinymce = function() {
		window.tinyMCEPreInit = {
			base: requirejs.s.contexts._.config.baseUrl + 'tinymce',
			baseURL: requirejs.s.contexts._.config.baseUrl + 'tinymce',
			document_base_url: requirejs.s.contexts._.config.baseUrl + 'tinymce',
		};
		require(['webfan/bootcache!tinymce/tinymce'], function(tinymceJS) {});
	};
	var success = false,
		__loaded = false,
		to = false;
	var loadFileSystemShims = function() {
		if(false !== success && 'undefined' !== typeof frdl.fs && 'undefined' !== typeof frdl.fs.readFile && 'function' === typeof frdl.fs.readFile) return;
		if(false === __loaded && false === success && 'undefined' === typeof frdl.fs) {
			__loaded = true;
			require(['webfan/bootcache!fs'], function(fs) {
				try {
					frdl.fs = fs;
					frdl.fs5 = fs;
					frdl.fs.polyfill.check(true);
					success = true;
				} catch(err) {
					success = false;
				}
			});
		}
		if(('undefined' === typeof frdl.MagicHelper || 'undefined' === typeof frdl.MagicHelper.emitter) && (false === success || 'undefined' === typeof frdl.fs)) {
			if(!!to) clearTimeout(to);
			to = setTimeout(loadFileSystemShims, 16);
			return;
		}
		frdl.MagicHelper.emitter.on('get fs', function(evData) {
			require(['webfan/bootcache!fs'], function(fs) {
				try {
					evData.result = fs;
					fs.polyfill.check(true);
					success = true;
				} catch(err) {}
			});
		});
		frdl.MagicHelper.emitter.on('get fs5', function(evData) {
			evData.result = frdl.fs;
		});
	};
	var URL = global.URL || global.webkitURL;
	var requestFileSystem = global.requestFileSystem || global.webkitRequestFileSystem;
	var resolveLocalFileSystemURL = global.resolveLocalFileSystemURL || global.webkitResolveLocalFileSystemURL;
	navigator.temporaryStorage = navigator.temporaryStorage || navigator.webkitTemporaryStorage;
	navigator.persistentStorage = navigator.persistentStorage || navigator.webkitPersistentStorage;
	var BlobBuilder = global.BlobBuilder || global.MozBlobBuilder || global.WebKitBlobBuilder;
	frdl.clone = clone;
	frdl.extend = extend;
	frdl.str_replace = str_replace;
	frdl.html_entity_decode = html_entity_decode;
	frdl.get_html_translation_table = get_html_translation_table;
	frdl.htmlentities = htmlentities;
	frdl.mt_rand = mt_rand;
	frdl.base64_encode = base64_encode;
	frdl.base64_decode = base64_decode;
	frdl.base64_detect = base64_detect;
	frdl.urlencode = urlencode;
	frdl.urldecode = urldecode;
	frdl.explode = explode;
	frdl.strip_tags = strip_tags;
	frdl.strpos = strpos;
	frdl.dashToCamel = dashToCamel;
	frdl.camelToDash = camelToDash;
	frdl.hexdec = hexdec;
	frdl.dechex = dechex;
	frdl.stripslashes = stripslashes;
	frdl.WebfanCreateCookie = WebfanCreateCookie;
	frdl.WebfanCreateCookieSeconds = WebfanCreateCookieSeconds;
	frdl.WebfanReadCookie = WebfanReadCookie;
	frdl.WebfanEraseCookie = WebfanEraseCookie;
	frdl.overload = function(o, fn) {
		var no = require('webfan/bootcache!webfan/overload').make(o);
		if('function' === typeof fn) {
			fn = [fn, fn];
		}
		if('undefined' !== typeof fn && 'undefined' !== typeof fn[0]) {
			no.__call = fn[0];
		}
		if('undefined' !== typeof fn && 'undefined' !== typeof fn[1]) {
			no.__get = fn[1];
		}
	};
	frdl.debug = {
		mode: function(m) {
			if('undefined' !== typeof m) {
				sessionStorage.setItem('frdl.debug.mode', m);
			}
			return(sessionStorage.getItem('frdl.debug.mode')) ? sessionStorage.getItem('frdl.debug.mode') : 0;
		}
	};
	require(['feature!browser', 'feature!worker'], function(browser, worker) {
		if('undefined' === typeof browser) browser = false;
		if('undefined' === typeof worker) worker = false;
		frdl.browser = browser;
		frdl.worker = worker;

		function getFrame() {
			return requestAnimationFrame || window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
				return setTimeout(callback, 0);
			};
		};

		function cancelFrame() {
			var f = cancelAnimationFrame || window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;
			return function(frame) {
				try {
					return f(frame);
				} catch(e) {
					if(!!console) console.log(e);
				}
			};
		};
		frdl.browser.getFrame = getFrame;
		frdl.browser.cancelFrame = cancelFrame;
		if(false !== frdl.browser && 'undefined' === typeof global.tinymce) {
			if('undefined' === typeof global.tinymce && null === document.querySelector('script[src*="tinymce"]')) {}
		}
	});
	try {
		frdl.fs = fs;
		frdl.fs5 = fs;
		frdl.fs.polyfill.check(true);
	} catch(err) {
		loadFileSystemShims();
	}
	frdl.isTraversable = function(thing) {
		return(('object' === typeof thing || 'array' === typeof thing) && null !== thing) ? true : false;
	};
	frdl.array_unique = function(array) {
		return("undefined" === typeof jQuery) ? array.filter(function(el, i, array) {
			return i === arr.indexOf(el);
		}) : $.grep(array, function(el, i) {
			return i === $.inArray(el, array);
		});
	};
	frdl.filterArray = function(arr, filter) {
		var o = [];
		for(var index = 0; index < arr.length; index++) {
			if(filter(arr[index], index) === true) {
				o.push(arr[index]);
			}
		}
		return o;
	};
	frdl.shuffleArray = function(a) {
		var j, x, i;
		for(i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
	};
	frdl.filterObject = function(arr, filter) {
		var o = {};
		for(var k in arr) {
			if(filter(arr[k], k) === true) {
				o[k] = arr[k];
			}
		}
		return o;
	};
	frdl.filter = function(arr, filter, recursive) {
		if(true === recursive && true === frdl.isTraversable(arr)) {
			arr = frdl.each(arr, function(i, v) {
				arr[i] = frdl.filter(v, filter, recursive);
			});
			return arr;
		}
		if('array' === typeof arr) {
			return frdl.filterArray(arr, filter);
		} else if('object' === typeof arr) {
			return frdl.filterObject(arr, filter);
		} else {
			return(true === filter(arr)) ? arr : undefined;
		}
	};
	frdl.each = function(object, callback, args) {
		var name, i = 0,
			length = ('undefined' !== typeof object.length) ? object.length : undefined,
			traversable = false;
		if(true !== frdl.isTraversable(object)) {
			traversable = false;
		} else {
			traversable = true;
		}
		if(args) {
			if(false === traversable) {
				callback.apply(object, args);
				return object;
			}
			if(length === undefined) {
				for(name in object)
					if(callback.apply(object[name], args) === false) break;
			} else
				for(; i < length;)
					if(callback.apply(object[i++], args) === false) break;
		} else {
			if(false === traversable) {
				callback.call(object, 0, object);
				return object;
			}
			if(length === undefined) {
				for(name in object)
					if(callback.call(object[name], name, object[name]) === false) break;
			} else var value;
			for(value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
		}
		return object;
	};
	frdl.angularBootstrapable = function(a, old) {
		if('undefined' === typeof a) {
			var a = require.state.$booting || !!(process.ready + 0) || ('undefined' !== typeof frdl.ready && 'undefined' !== typeof frdl.ready.uiReadyToLoadDependencies && frdl.ready.uiReadyToLoadDependencies.stateReady()) || !!(frdl.ready + 0);
		}
		if('undefined' === typeof old) {
			var old = (!!a && require.state.$booting) || (!!a && 'undefined' !== typeof frdl.ready && 'undefined' !== typeof frdl.ready.uiReadyToLoadDependencies && frdl.ready.uiReadyToLoadDependencies.stateReady()) || (!!a && !!(frdl.angularBootstrapable.ready + 0));
		}
		return true === (document.readyState === 'complete') && null !== frdl.$q('body', false) && 'object' === typeof frdl.$q('body', false) && null !== frdl.$q('html', false) && 'object' === typeof frdl.$q('html', false) && 'undefined' !== typeof frdl.a && 'undefined' !== typeof frdl.a.defined && 'undefined' !== typeof frdl.UI && 'undefined' !== typeof frdl.UI.o && true === frdl.a.defined('webfan.gui') && ((true === require.state.$booting && true === !require.state.$watching) || 'undefined' !== typeof frdl.Bootstrap.switchOn && true === frdl.Bootstrap.switchOn(true, false));
	};
	makeReadyCheck(frdl.angularBootstrapable, "ready", 'addReadyCheck', true);
	(function() {
		'use strict';
		var __TOK_DEFER__ = 'NG_DEFER_BOOTSTRAP!';
		var is_on = false;
		var $booting = function $booting() {
			is_on = (window.name !== frdl.str_replace(__TOK_DEFER__, '', window.name)) ? false : true;
			return is_on;
		};
		var $watching = function $watching() {
			return !(process.ready + 0) || !(frdl.ready + 0) || !require.state.$booting;
		};
		frdl.Bootstrap = {
			switchOn: function(a, old) {
				if(a !== is_on) {
					this.since = frdl.time();
					if(!!this.timerName) clearTimeout(this.timerName);
					this.timerName = setTimeout(this.check, 4);
				}
				if(true === a) {
					is_on = true;
				} else if(false === a) {
					is_on = false;
				}
				if(true === old) {
					if(true === a) {
						window.name = frdl.str_replace(__TOK_DEFER__, '', window.name);
						this.since = frdl.time();
					} else if(false === a) {
						window.name = __TOK_DEFER__ + frdl.str_replace(__TOK_DEFER__, '', window.name);
					}
					return $booting();
				}
				return $booting();
			},
			since: frdl.time(),
			timeout: 15000,
			check: function() {
				if(true === is_on) {
					if(!!this.timerName) clearTimeout(this.timerName);
				} else {
					if(frdl.time() - this.since >= this.timeout) {
						if(0 < frdl.debug.mode()) {
							console.log('Forcing angularBootstrapable(true) due to timeout while sleeping.' + "\n" + 'Please refactor the use of UI.Compile()');
						}
						this.switchOn(true);
					}
				}
			},
			timerName: null
		};
		Object.defineProperty(require.state, '$booting', {
			get: function() {
				return $booting();
			}
		});
		Object.defineProperty(require.state, '$defered', {
			get: function() {
				return !$booting();
			}
		});
		Object.defineProperty(require.state, '$watching', {
			get: function() {
				return $watching();
			}
		});
		frdl.angularBootstrapDefer = function() {
			frdl.Bootstrap.switchOn(false, true);
		};
		frdl.angularBootstrapLoad = function() {
			frdl.Bootstrap.switchOn(true, true);
		};
		$.fn.getAngularApp = function(el, isolateFrdlTag) {
			var at = 'ng-flows',
				n;
			if(el && 'boolean' !== typeof el) {
				n = el;
			} else {
				n = this;
			}
			if('boolean' !== typeof isolateFrdlTag && 'boolean' === typeof el) {
				var isolateFrdlTag = el;
			}
			if(true === isolateFrdlTag && 'FRDL' === $(n).prop("tagName")) {
				var _flows = $(n).getAngularApp(false);
				var _has = $(n).attr('ng-flows');
				if('string' !== typeof _has || '' === _has) {}
			}
			var flows = $(n).attr(at);
			if('string' === typeof flows && '' !== flows) {
				return {
					element: n,
					flows: flows
				};
			}
			if('HTML' === $(n).prop("tagName")) {
				return false;
			}
			return $(n).parent().getAngularApp(isolateFrdlTag);
		};
		frdl.angularBootstrapDefer();
	}());
	(function() {
		'use strict';
		const CONST = Symbol('Symbol.frdl.CONST');
		class Node {
			constructor(p) {
				this[CONST] = Symbol(p);
				this.valueOf = function valueOf() {
					return this[CONST];
				};
				this.toString = function() {
					return this[Symbol.toStringTag]('string');
				};
			}
			get() {
					return this.valueOf();
				}
				[Symbol.toPrimitive](hint) {
					if(hint == 'number') {
						return this.id;
					}
					if(hint == 'string') {
						return this.toString();
					}
					return this.valueOf();
				}
				[Symbol.toStringTag](hint) {
					return 'Symbol(' + this.keyPath + ' ' + this.id + ')';
				}
		}
		let FRDL_CONSTANTS = new Node('Symbol.frdl');
		FRDL_CONSTANTS.CONST = CONST;
		let _idc = -1;
		Object.defineProperty(Symbol, 'frdl', {
			'get': function() {
				return FRDL_CONSTANTS;
			},
			'set': function(val) {
				if('string' !== typeof val) {
					var s = false;
					try {
						val = JSON.stringify(val);
						s = true;
					} catch(err) {
						s = false;
					}
					if(false === s) {
						try {
							val = val.toString();
							s = true;
						} catch(err) {
							s = false;
						}
					}
					if(false === s) {
						val = '##@@##' + typeof val + (('undefined' !== typeof val.length) ? val.length : 'NaT') + '##@@##';
					}
				}
				var kp = explode('.', val);
				var parent = FRDL_CONSTANTS,
					current = FRDL_CONSTANTS;
				var path = 'Symbol.frdl';
				var Uri = '';
				frdl.each(kp, function(pos, KEY) {
					path += '.' + KEY;
					Uri += '/' + KEY;
					let p = path;
					let _uri = Uri;
					let __id = ++_idc;
					if(!parent.hasOwnProperty(KEY)) {
						var node = new Node(p);
						Object.defineProperty(node, 'id', {
							'get': function() {
								return __id;
							}
						});
						Object.defineProperty(node, 'uri', {
							'get': function() {
								return _uri;
							}
						});
						Object.defineProperty(node, 'keyPath', {
							'get': function() {
								return p;
							}
						});
						Object.defineProperty(parent, KEY, {
							'get': function() {
								return node;
							},
							'set': function(n) {
								var k;
								for(k in n) {
									parent[KEY][k] = n[k];
								}
							},
							enumerable: true,
							writeable: true,
							configurable: true
						});
						current = parent[KEY] = node;
					} else {
						current = parent[KEY];
					}
					parent = current;
				});
			}
		});
	}());
	Symbol.frdl = 'main.dependency.ready';
	Symbol.frdl = 'LOAD.fs.polyfill';
	Symbol.frdl = 'xhrWorker';
	Symbol.frdl = 'CONSTANTS';
	Symbol.frdl = 'Angular';
	Symbol.frdl = 'Plugin';
	Symbol.frdl = 'Widget';
	Symbol.frdl = 'WebApp';
	Symbol.frdl = 'Component';
	Symbol.frdl = 'Frdlweb';
	Symbol.frdl = 'Frdlweb.EMITTERS';
	Symbol.frdl = 'Frdlweb.FSM';
	Symbol.frdl = 'Frdlweb.ESR';
	Symbol.frdl = 'Node.NAME';
	Symbol.frdl = 'Node.$$$parent';
	Symbol.frdl = 'Node.PARENT';
	Symbol.frdl = 'fn.exec';
	Symbol.frdl = 'fn.__call';
	Symbol.frdl = 'customElement.class';
	Symbol.frdl = 'customElement.tag';
	Symbol.frdl = 'customElement.importUrl';
	(function() {
		'use strict';
		const CONSTANTS = Symbol.frdl.CONSTANTS.valueOf();
		const EMITTERS = Symbol.frdl.Frdlweb.EMITTERS.valueOf();
		const FSM = Symbol.frdl.Frdlweb.FSM.valueOf();
		const ESR = Symbol.frdl.Frdlweb.ESR.valueOf();

		function FrdlwebPrototype() {}
		FrdlwebPrototype.prototype.VERSION = '0.0.1';
		var Frdlweb = new FrdlwebPrototype;
		Frdlweb[CONSTANTS] = new Map();
		Frdlweb[FSM] = new WeakMap();
		Frdlweb[EMITTERS] = new Map();
		Frdlweb[ESR] = new Map();
		const privates = new WeakMap();
		frdl.MagicHelper = {};
		privates.set(frdl.MagicHelper, Frdlweb);
		frdl.MagicHelper.emitter = new frdl.EventEmitter;
		frdl.MagicHelper.emitter.on('get Slim', function(evData) {
			evData.result = new Promise(function(resolve, reject) {
				require(['webfan/bootcache!Slim'], function(Slim) {
					resolve(Slim);
				});
			}).then(function(r) {
				evData.result = r;
				return r;
			});
		});
		Frdlweb[EMITTERS].set(require, frdl.state);
		Frdlweb[EMITTERS].set(frdl, frdl.state);
		Frdlweb[EMITTERS].set(frdl.MagicHelper, frdl.MagicHelper.emitter);
		frdl.CONST = function(n, v, local) {
			if('undefined' !== typeof v && 'undefined' === typeof local) {
				local = true;
			}
			if('undefined' === typeof v) {
				if('undefined' !== typeof Frdlweb[CONSTANTS].get(n)) {
					return clone(Frdlweb[CONSTANTS].get(n));
				}
				var p = explode('.', n),
					symFound = false,
					cur = Symbol.frdl;
				if('Symbol' === p[0]) p.shift();
				if('frdl' === p[0]) p.shift();
				frdl.each(p, function(i, KEY) {
					if('undefined' !== typeof cur[KEY]) {
						symFound = cur[KEY];
					} else {
						symFound = false;
						return false;
					}
					cur = cur[KEY];
				});
				if(false !== symFound) {
					return symFound.valueOf();
				}
				throw n + ' is undefined in frdl.CONST';
			}
			if(Frdlweb[CONSTANTS].has(n)) {
				throw n + ' is already defined in frdl.CONST';
			}
			if('string' === typeof n && false !== strpos(n, '.')) {
				try {
					Symbol.frdl = n;
					n = 'Symbol.frdl.' + n;
					var symb = eval(n);
					n = ('Symbol' === typeof symb.valueOf()) ? symb.valueOf() : str_replace('.', '_', arguments[0]);
				} catch(err) {
					throw arguments[0] + ' could not be resolved in frdl.CONST';
				}
			}
			const VALUE = v;
			Frdlweb[CONSTANTS].set(n, VALUE);
			if(!local) {
				global[n] = VALUE;
			}
			return clone(Frdlweb[CONSTANTS].get(n));
		};
		frdl.CONST.defined = function(n) {
			return(true !== Frdlweb[CONSTANTS].has(n)) ? false : true;
		};
		Frdlweb[ESR].set(frdl.ready, frdl.ready.dependencies);
		Frdlweb[ESR].set(frdl.ready, frdl.ready.dependencies);
		frdl.MagicHelper.addMethodCallback = function(obj, originalMethodName, $returns, callBackMethod, context) {
			var fnOriginal = obj[originalMethodName],
				outcome;
			context = context || obj;
			if(!!$returns) {
				obj[originalMethodName] = function() {
					var outcome = fnOriginal.apply(this, arguments);
					outcome = extend(outcome, callBackMethod.apply(this, arguments) || {});
					return outcome;
				};
			} else {
				obj[originalMethodName] = function() {
					var outcome = fnOriginal.apply(this, arguments);
					callBackMethod.apply(this, arguments);
					return outcome;
				};
			}
		};
		frdl.CONST('__MAGIC_METHODS__', {
			'i': 0,
			'__call': function(n, a) {
				frdl.CONST('__MAGIC_METHODS__').i = ++(frdl.CONST('__MAGIC_METHODS__').i);
				var R = {
					name: n,
					args: a,
					result: undefined,
					c: 0
				};
				var gen = function*(r, emitter) {
					if(0 === r.c) {
						emitter.emit(r.name, r);
					}
					if(0 === r.c) {
						if('undefined' === typeof r.result) {
							emitter.emit('*', r);
						}
					}
					if(r.result instanceof Promise) {
						if(r.result instanceof Promise) {
							r.result = r.result.then(function(res) {
								r.result = res.result;
								return res;
							});
						}
					}
					r.c++;
					yield r;
				};
				var result = gen(R, frdl.MagicHelper.emitter).next().value;
				if(result.result) {
					result = result.result;
				}
				if(result instanceof Promise) {
					result = result.then(function(res) {
						result = res.result;
						return res;
					});
				}
				if(result.result) {
					result = result.result;
				}
				return result;
			},
			'__get': function(name) {
				frdl.CONST('__MAGIC_METHODS__').i = ++(frdl.CONST('__MAGIC_METHODS__').i);
				var r = {
					name: name,
					result: undefined
				};
				frdl.MagicHelper.emitter.emit('get ' + name, r);
				if('undefined' === typeof r.result || 'function' === typeof r.result) {
					frdl.MagicHelper.emitter.emit('get *', r);
				}
				return r.result;
			},
			'__invoke': function(name) {
				throw 'Not implemented __invoke';
			}
		}, true);
		var ___JsonRpcClient = false;
		require(['frdlcjs!JsonRpcClient'], function(JsonRpcClient) {
			if(false === ___JsonRpcClient) {
				___JsonRpcClient = JsonRpcClient;
			}
			frdl.MagicHelper.emitter.on('get rpc', function(evData) {
				evData.result = new ___JsonRpcClient(((Webfan.defined('Webfan.hps.scriptengine.server.ssl') && 1 == Webfan.hps.scriptengine.server.ssl) ? 'https:' : 'http:') + '//' + ((Webfan.defined('Webfan.hps.scriptengine.server.host')) ? Webfan.hps.scriptengine.server.host : location.host) + ((!Webfan.defined('Webfan.hps.rpc.server.url')) ? '/software-center/modules-api/rpc/0.0.1/' : Webfan.hps.rpc.server.url));
			});
		});
		frdl.MagicHelper.emitter.on('test', function(evData) {
			console.log('onTest', arguments);
			evData.result = 'Testresult from frdl.test(' + JSON.stringify(evData.args) + ')';
		});
		frdl.MagicHelper.emitter.on('time', function(evData) {
			evData.result = (new Date()).getTime();
		})
		frdl.MagicHelper.emitter.on('plug', function(evData) {
			evData.result = frdl.ns.plugin.apply(frdl.ns, evData.args);
		})
		frdl.MagicHelper.emitter.on('get *', function(evData) {
			if('undefined' !== typeof frdl.ns[evData.name]) {
				evData.result = frdl.ns[evData.name];
			}
		});
		frdl.MagicHelper.emitter.on('get Test', function(evData) {
			console.log('Test', arguments);
			evData.result = 'TESTPROPERTY';
		});
		frdl.MagicHelper.emitter.on('get guid', function(evData) {
			var t = explode('.', frdl.microtime().toString());
			var id = frdl.dechex(parseInt(t[0])) + '-' + frdl.dechex(parseInt(t[1])) + '-' + frdl.dechex(frdl.mt_rand()) + '-' + frdl.CONST('__MAGIC_METHODS__').i.toString();
			evData.result = frdl.str_replace('.', '-', id);
		});
		frdl.MagicHelper.emitter.on('transpile', function(evData) {
			evData.result = new Promise(function(resolve, reject) {
				require(['webfan/bootcache!webfan/compile'], function(compile) {
					resolve(compile(evData.args[0], evData.args[1]));
				});
			}).then(function(r) {
				evData.result = r;
				return r;
			});
		});
		(function() {
			'use strict';
			var p = new Promise(function(resolve, reject) {
				(function t() {
					try {
						if(require.defined('webfan/compile') && true === (3 === eval(frdl.compile(' 1 + 2')))) {
							resolve(true);
						} else {
							setTimeout(t, 16);
						}
					} catch(e) {
						reject(e);
					}
				}());
			});
			p.then(function(wahr) {
				frdl.MagicHelper.addMethodCallback(frdl, "compile", true, function(js) {
					String.prototype.eval = function(modis) {
						if(!modis) {
							return eval(this.toString());
						} else if('transpile' === modis) {
							return frdl.transpile(this.toString(), true);
						} else if('object' === typeof modis) {
							return frdl.transpile(this.toString(), modis);
						}
					};
					return "" + js;
				});
			});
			p.catch(function(err) {
				frdl.alert.error(err);
			});
		}());
	}());
	process.nextTick(function() {
		var uiDependenciesLoaded = false,
			UI = false,
			Alert = false,
			Hash = false,
			inX = false;
		require(['feature!uiDependencies'], function(dep) {
			frdl.ready.dependencies = require.state.required(dep, function(rD) {
				uiDependenciesLoaded = true;
				inX = frdl.inX;
				Hash = frdl.Hash;
				Alert = frdl.alert;
				UI = frdl.UI;
				frdl.angularBootstrapLoad();
			}, frdl.ready);
		});
		frdl.addReadyCheck(function() {
			return 'undefined' !== typeof angular && 'undefined' !== typeof frdl.a && frdl.a === angular;
		});
		frdl.addReadyCheck(function() {
			return 'undefined' !== typeof frdl.ready.uiReadyToLoadDependencies && frdl.ready.uiReadyToLoadDependencies.stateReady();
		});
		frdl.addReadyCheck(function() {
			return 'undefined' !== typeof frdl.UI && 'undefined' !== typeof frdl.UI.Compile && 'funtion' === typeof frdl.UI.Compile;
		});
		require(['feature!uiReadyToLoadDependencies'], function(dep) {
			frdl.ready.uiReadyToLoadDependencies = require.state.required(dep, function(rD) {
				inX = frdl.inX;
				Hash = frdl.Hash;
				Alert = frdl.alert;
				UI = frdl.UI;
				frdl.addReadyCheck(function() {
					return true === uiDependenciesLoaded;
				});
			}, frdl.ready);
		});
	});
	(function(obj, method) {
		require(['webfan/bootcache!util'], function(util) {
			Symbol.frdl = 'MONKEY.Patch.Promise.State';

			function getPromiseState(aPromise) {
				var promiseState = function* promiseState(p) {
					const t = {};
					var P = "unknown";
					P = Promise.race([p, t]).then(v => (v === t) ? "pending" : "fulfilled", () => "rejected");
					yield P.then(function(s) {
						P[Symbol.frdl.MONKEY.Patch.Promise.State.valueOf()] = s;
						return P;
					});
					yield P;
				};
				var Gen = promiseState(aPromise);
				var s = Gen.next();
				s = Gen.next();
				return s.value;
			}
			var fn = function(myPromise) {
				var test = getPromiseState(myPromise);
				var stat = test;
				return stat;
			};
			var fn2 = function(myPromise) {
				myPromise.isPending = function() {
					return true === this instanceof Promise && util.inspect(this).indexOf("<pending>") > -1;
				};
				myPromise.isRejected = function() {
					return util.inspect(this).indexOf("<rejected>") > -1;
				};
				myPromise.isResolved = function() {
					return false === this instanceof Promise || util.inspect(this).indexOf("<resolved>") > -1;
				};
				myPromise.value = function() {
					if(false === this instanceof Promise || util.inspect(this).indexOf("<resolved>") > -1) {
						this.valueOf();
					} else {
						return new Error('<pending>');
					}
				};
				return myPromise;
			};
			obj[method] = function(myPromise) {
				var myPromiseStat = fn2(myPromise);
				return myPromiseStat;
			};
		});
	}(frdl, 'getPromiseState'));
	(function() {
		var tick = 4;
		frdl.MagicHelper.emitter.on('when', function(evData) {
			if(1 === evData.args.length && !isNaN(evData.args[0])) {
				tick = evData.args[0];
				return;
			}
			var condition_or_function = evData.args[0];
			var onError = (evData.args.length >= 3 && 'undefined' !== typeof evData.args[2] && 'function' === typeof evData.args[2]) ? evData.args[2] : function(r) {
				frdl.alert.error(r);
			};
			var onSuccess = (evData.args.length > 1 && 'undefined' !== typeof evData.args[1] && 'function' === typeof evData.args[1]) ? evData.args[1] : function(r) {
				frdl.alert.success(r);
			};
			var args = (evData.args.length >= 4 && 'undefined' !== typeof evData.args[3] && evData.args[3] instanceof Array) ? evData.args[3] : [];
			var to = (evData.args.length >= 5 && 'undefined' !== typeof evData.args[4] && !isNaN(evData.args[4])) ? evData.args[4] : -1;
			if(to > 0) {
				var Timeout = setTimeout(function() {
					var test = frdl.getPromiseState(evData.result);
					if(true === test.isPending() || true === test.isRejected()) {
						reject('Timeout frdl.when');
					} else if(true === test.isResolved()) {}
				}, to);
			} else {
				var Timeout = false;
			}
			evData.result = new Promise(function(resolve, reject) {
				var t = function() {
					if(('function' === typeof condition_or_function && true === condition_or_function(args)) || ('function' !== typeof condition_or_function && true === (condition_or_function))) {
						if(!!Timeout) clearTimeout(Timeout);
						resolve(args);
					} else {
						setTimeout(t, tick);
					}
				};
				t();
			});
			evData.result.catch(function(e) {
				onError(e);
			});
			evData.result.then(function(res) {
				onSuccess(res);
			});
		});
	}());
	(function() {
		var _task = false;
		frdl.MagicHelper.emitter.on('task', function(evData) {
			function DoIt() {
				evData.result = _task.apply(frdl.plug('de.webfan.frdl.cdn.cdn.frdl.flow.components.webfan.queue'), evData.args);
			}
			if('undefined' === typeof _task || false === _task) {
				require(['webfan/bootcache!webfan/tasks-2', 'frdlcjs!webfan/TaskClass'], function(TaskQueue, SerialTask) {
					var _TaskQueueGroups = {};
					var _frdlTasks = Object.create({
						serial: SerialTask.SerialTask
					});
					Object.defineProperty(_frdlTasks, 'tasks', {
						get: function() {
							return _TaskQueueGroups;
						},
						set: function(val) {
							throw 'write to frdl.task().tasks from public scope';
						},
						configurable: false
					});
					var __isOnPruning = false;
					var pruneTasks = function() {
						__isOnPruning = true;
						(('undefined' !== typeof webfan && 'function' === typeof webfan.$Async) ? webfan.$Async : setTimeout)(function() {
							__isOnPruning = false;
							frdl.each(_TaskQueueGroups, function(groupName, queue) {
								if(!!_TaskQueueGroups[groupName] && 0 === queue.count()) {
									(('undefined' !== typeof webfan && 'function' === typeof webfan.$Async) ? webfan.$Async : setTimeout)(function() {
										if(!!_TaskQueueGroups[groupName] && 0 === queue.count()) {
											(('undefined' !== typeof webfan && 'function' === typeof webfan.$Async) ? webfan.$Async : setTimeout)(function() {
												if(!!_TaskQueueGroups[groupName] && 0 === _TaskQueueGroups[groupName].count()) {
													_TaskQueueGroups[groupName].clearAll();
													_TaskQueueGroups[groupName] = undefined;
												}
											}, 4000);
										}
									}, 4000);
								}
							});
						}, 4000);
					};
					_task = function() {
						if(false === !!__isOnPruning) {
							(('undefined' !== typeof webfan && 'function' === typeof webfan.$Async) ? webfan.$Async : setTimeout)(pruneTasks, 4000);
						}
						var args = Array.prototype.slice.call(arguments);
						var QueueGroup = (0 < args.length) ? args.shift() : false;
						var method = (0 < args.length) ? args.shift() : false;
						if(false === !!QueueGroup) {
							return _frdlTasks;
						}
						if('undefined' === typeof _TaskQueueGroups[QueueGroup]) {
							_TaskQueueGroups[QueueGroup] = new TaskQueue(QueueGroup);
						}
						if(false === !!method) {
							return _TaskQueueGroups[QueueGroup];
						}
						return _TaskQueueGroups[QueueGroup][method].apply(_TaskQueueGroups[QueueGroup], args);
					};
					DoIt();
				});
			} else {
				DoIt();
			}
		});
	}());
	frdl.microtime = function() {
		return(new Date() / 1000);
	};
	frdl.$q = function(q, all, context) {
		if('undefined' === typeof context) var context = document;
		var m = ((false === all) ? 'querySelector' : 'querySelectorAll');
		return context[m](q);
	};
	frdl.cbs = {};
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var ARGUMENT_NAMES = /(?:^|,)\s*([^\s,=]+)/g;
	var getFunctionParameters = frdl.getFunctionParameters = function(func, wrapStart, wrapEnd) {
		if('function' === typeof func) {
			func = func.toString();
		}
		if(typeof func != 'string') {
			return undefined;
		}
		var fnStr = func.replace(STRIP_COMMENTS, '');
		var argsList = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
		var result = argsList.match(ARGUMENT_NAMES);
		if(result === null) {
			return [];
		} else {
			var stripped = [];
			for(var i = 0; i < result.length; i++) {
				stripped.push((('string' === typeof wrapStart) ? wrapStart : '') + result[i].replace(/[\s,]/g, '') + (('string' === typeof wrapEnd) ? wrapEnd : ''));
			}
			return stripped;
		}
	};
	frdl.Reflector = {};
	frdl.Reflector.getFunctionParameters = getFunctionParameters;
	frdl.Reflector.getFunctionName = function getFunctionName(fn, inspectBody) {
		if('function' === typeof fn) {
			fn = fn.toString();
		}
		if(typeof fn !== 'string') {
			return undefined;
		}
		if(true !== !!inspectBody) {
			fn = frdl.str_replace(frdl.Reflector.getFunctionBody(fn), '\n', fn);
		}
		var result = fn.match(/function\s*(\S+)\s*\(|\(\)\=\>\s*(\S+)\s*\(/);
		if(!result) {
			return '';
		}
		return result[1];
	};
	frdl.Reflector.getFunctionBody = function getFunctionBody(fn) {
		function removeCommentsFromSource(str) {
			return str.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1');
		}
		if('function' === typeof fn) {
			fn = fn.toString();
		}
		if(typeof fn != 'string') {
			return undefined;
		}
		var s = removeCommentsFromSource(fn);
		return s.substring(s.indexOf('{') + 1, s.lastIndexOf('}'));
	};
	frdl.createJavascriptObjectURL = createJavascriptObjectURL;
	frdl.createHTMLObjectURL = createHTMLObjectURL;
	frdl.createCSSObjectURL = createCSSObjectURL;
	frdl.createImageObjectURL = createImageObjectURL;
	frdl.linkBLOB = __createObjectURL;
	frdl.getCSS = function(src, p, once) {
		if(false === frdl.browser) throw 'Cannot frdl.getCSS() in NO_BROWSER context!';
		frdl.ready(function() {
			if('undefined' === typeof once || true === once || true === p) {
				if(null !== frdl.$q('link[href="' + frdl.str_replace('/', '\/', src) + '"]', false)) {
					return;
				}
			}
			if('undefined' === typeof p || null === p || true === p) var p = frdl.$q('head', false);
			var style = document.createElement('link');
			style.setAttribute('type', 'text/css');
			style.setAttribute('rel', 'stylesheet');
			style.setAttribute('href', src);
			p.append(style)
		});
		return frdl;
	};
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}
		if(!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		if(!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
		var requestAnimationFrame = window.requestAnimationFrame;
		var cancelAnimationFrame = window.cancelAnimationFrame;
		frdl.requestAnimationFrame = function(callback) {
			return requestAnimationFrame.call(window, callback);
		};
		frdl.cancelAnimationFrame = function(id) {
			return cancelAnimationFrame.call(window, id);
		};
	}());
	frdl.getScript = function(url, callBack, doNotRemove, prepend, args) {
		var scripts = frdl.$q('script');
		if('undefined' === typeof doNotRemove || true === doNotRemove) {
			for(var i = 0; i < scripts.length; i++) {
				if(url === scripts[i].getAttribute('src')) {
					if(typeof callBack === "function" && scripts[i].readyState === "complete") {
						callBack.apply(this, args);
						return "undefined";
					}
				}
			}
		}
		var head = frdl.$q("head", false);
		var script = document.createElement("script");
		script.setAttribute('src', url);
		script.setAttribute('async', 'true');
		var done = false,
			persistent = ('undefined' === typeof doNotRemove || true === doNotRemove) ? true : false;
		script.setAttribute('type', 'text/javascript');
		script.onload = function() {
			done = true;
			if(true !== persistent) {
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
			if(typeof callBack === "function") {
				callBack.apply(this, args);
			}
		};
		if(true === prepend) {
			head.insertBefore(script, head.firstChild);
		} else {
			head.appendChild(script);
		}
		return "undefined";
	};
	require(['webfan/bootcache!mobile-detect/mobile-detect', 'feature!Modernizr'], function(mobileDetect, moderniZr) {
		frdl.Modernizr = moderniZr;
		frdl.Device = function() {
			var MobileDetect = mobileDetect;
			var Modernizr = moderniZr;
			var md = MobileDetect;
			var Device = {
				Modernizr: Modernizr,
				mq: frdl.Modernizr.mq,
				MobileDetect: md,
				isMobile: !!md.is('mobile'),
				isTablet: !!md.is('tablet'),
				isPhone: !!md.is('phone'),
				isDesktop: !md.is('mobile') && !md.is('tablet') && !md.is('phone'),
				os: navigator.platform,
				OS: navigator.platform
			};
			return Device;
		};
	});
	require(['webfan/bootcache!webfan/webfanURLParser'], function(webfanURLParser) {
		frdl.Url = webfanURLParser;
	});
	require(['webfan/bootcache!webfan/NamespacePlugin'], function(NamespacePlugin) {
		frdl.ns = NamespacePlugin;
		frdl.ns.plugin('webfan', function() {
			extend({
				$Async: frdl.requirejs.nextTick
			});
		});
	});
	(function() {
		String.prototype.ucfirst = function() {
			return ucfirst(this.toString());
		};
		var DomObject = function(selector) {
			return this.init(selector);
		};
		DomObject.prototype = {
			element: null,
			init: function(selector) {
				var $ = ('undefined' !== typeof jQuery) ? jQuery : document.querySelector;
				this.element = ('string' === typeof selector) ? $(selector) : selector;
				return this;
			},
			attrAdd: function(k, v, delimiter, el) {
				var del = delimiter;
				var El = (delimiter && !el) ? ((null !== delimiter) ? $(delimiter) : this.element) : (el) ? $(el) : this.element;
				if('string' !== typeof del) del = ' ';
				if('object' !== typeof El || null === El) El = this.element;
				var a = $(El).attr(k);
				$(El).attr(k, (('string' === typeof a && '' !== a) ? a + del : '') + v);
				return this;
			},
			attrHas: function(attr, value, el) {
				if('undefined' === typeof el) var el = this.element;
				if(!el.hasAttribute(attr)) return false;
				var a = el.getAttribute(attr).split(/\s+|,/);
				return(-1 === a.indexOf(value)) ? false : true;
			},
			after: function(newNode, prevNode) {
				if('undefined' === typeof prevNode) prevNode = this.element || this;
				prevNode.parentNode.insertBefore(newNode, prevNode.nextSibling);
			},
			getTagNames: function(tag, scope) {
				if(null === scope || 'object' !== typeof scope) scope = document;
				return scope.getElementsByTagName(tag);
			},
			getNames: function(name) {
				return document.getElementsByName(name);
			},
			getFormData: function(form) {
				if(typeof FormData !== "object") return this.getFormDataFallback(form);
				var f = new FormData(form);
				return f;
			},
			getFormDataFallback: function(form) {
				var formElements = this.g(form).elements;
				var postData = {};
				for(var i = 0; i < formElements.length; i++) {
					postData[formElements[i].name] = formElements[i].value;
				}
				return postData;
			},
			get: function(el) {
				if('object' === typeof el) {
					return el;
				} else if('object' === typeof document.getElementById(el)) {
					return document.getElementById(el);
				} else if('string' === typeof el) {
					return document.querySelector(el);
				} else {
					return el;
				}
			},
			g: function(el) {
				return frdl.Dom.get(el);
			},
			getByClass: function(className, parent) {
				parent || (parent = document);
				var descendants = parent.getElementsByTagName('*'),
					i = -1,
					e, result = [];
				while(e == descendants[++i]) {
					((' ' + (e['class'] || e.className) + ' ').indexOf(' ' + className + ' ') > -1) && result.push(e);
				}
				return result;
			},
			getStyle: function(CLASSname, raw) {
				if("undefined" === typeof raw) var raw = true;
				var styleSheets = document.styleSheets,
					cl = [];
				var styleSheetsLength = styleSheets.length;
				for(var i = 0; i < styleSheetsLength; i++) {
					if(styleSheets[i].rules) {
						var classes = styleSheets[i].rules;
					} else {
						try {
							if(!styleSheets[i].cssRules) {
								continue;
							}
						} catch(e) {
							if(e.name === "SecurityError") {
								console.log("SecurityError. Cant read: " + styleSheets[i].href);
								continue;
							}
						}
						var classes = styleSheets[i].cssRules;
					}
					if('undefined' === typeof CLASSname || null === CLASSname) {
						cl.push(classes);
						continue;
					}
					for(var x = 0; x < classes.length; x++) {
						if(classes[x].selectorText === CLASSname) {
							var ret = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
							if(ret.indexOf(classes[x].selectorText) === -1 && false === raw) {
								ret = classes[x].selectorText + "{" + ret + "}";
							}
							return ret;
						}
					}
				}
				if('undefined' === typeof CLASSname || null === CLASSname) {
					return cl;
				}
			},
			isVisible: function(sel) {
				var el = ('object' === typeof this.g(sel)) ? this.g(sel) : sel;
				if(el !== null && typeof el !== 'undefined' && $(el).css('visibility') !== 'hidden' && $(el).css('display') !== 'none') {
					return true;
				} else {
					return false;
				}
			},
			isFramed: function() {
				try {
					return frdl.Device().Modernizr.framed;
				} catch(err) {
					try {
						return window.self !== window.top;
					} catch(e) {
						return true;
					}
				}
			},
			addText: function(txt, dest) {
				var t = document.createTextNode(txt);
				dest = ('object' === typeof dest) ? dest : frdl.Dom.g(dest);
				dest.appendChild(t);
			},
			add: function(el, dest, prepend) {
				el = ('object' === typeof el && null !== el) ? el : frdl.Dom.g(el);
				dest = ('object' === typeof dest && null !== dest) ? dest : frdl.Dom.g(dest);
				if('undefined' !== typeof dest && null !== dest) {
					if('undefined' !== typeof prepend && true === prepend) {
						dest.insertBefore(el, dest.firstChild);
					} else if('function' === typeof dest.appendChild) {
						dest.appendChild(el);
					} else {
						$(dest).append(el);
					}
				} else {
					console.warn('ERR:');
					console.dir(arguments);
					console.dir(dest);
				}
			},
			remove: function(el) {
				el = frdl.Dom.g(el);
				if(null === el) return;
				el.parentNode.removeChild(el);
			},
			create: function(tag) {
				return document.createElement(tag);
			},
			createFragment: function() {
				return document.createDocumentFragment();
			},
			copy: function(element, cloneChildsBool) {
				if(cloneChildsBool != true && cloneChildsBool != false) {
					cloneChildsBool = true;
				}
				return element.cloneNode(cloneChildsBool);
			},
			insertAtCursor: function(myField, myValue, mod, afterValue) {
				var field = frdl.Dom.g(myField);
				if(typeof mod === "undefined") mod = "deleteSelected";
				if(document.selection) {
					field.focus();
					sel = document.selection.createRange();
					sel.text = myValue;
				} else if(field.selectionStart || field.selectionStart == '0') {
					var startPos = field.selectionStart;
					var endPos = field.selectionEnd;
					if(mod === "deleteSelected") {
						field.value = field.value.substring(0, startPos) + myValue + field.value.substring(endPos, field.value.length);
					} else if(mod === "render") {
						field.value = field.value.substring(0, startPos) + myValue + field.value.substring(startPos, endPos) + afterValue + field.value.substring(endPos, field.value.length);
					} else if(mod === "insert") {
						field.value = field.value.substring(0, startPos) + myValue + field.value.substring(startPos, endPos) + field.value.substring(endPos, field.value.length);
					} else {
						field.value = field.value.substring(0, startPos) + myValue + field.value.substring(endPos, field.value.length);
					}
				} else {
					field.value += myValue;
				}
			},
			createCSSClass: function(selector, style) {
				if(!document.styleSheets) {
					return;
				}
				if(document.getElementsByTagName("head").length === 0) {
					return;
				}
				var styleSheet, i;
				var mediaType;
				if(document.styleSheets.length > 0) {
					for(i = 0; i < document.styleSheets.length; i++) {
						if("undefined" === typeof document.styleSheets[i] || document.styleSheets[i].disabled) {
							continue;
						}
						var media = document.styleSheets[i].media;
						mediaType = typeof media;
						if(mediaType === "string") {
							if(media === "" || (media.indexOf("screen") !== -1)) {
								styleSheet = document.styleSheets[i];
							}
						} else if(mediaType === "object") {
							if(media.mediaText === "" || (media.mediaText.indexOf("screen") !== -1)) {
								styleSheet = document.styleSheets[i];
							}
						}
						if(typeof styleSheet !== "undefined") {
							break;
						}
					}
				}
				if(typeof styleSheet === "undefined") {
					var styleSheetElement = document.createElement("style");
					styleSheetElement.type = "text/css";
					document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
					for(i = 0; i < document.styleSheets.length; i++) {
						if("undefined" === typeof document.styleSheets[i] || document.styleSheets[i].disabled) {
							continue;
						}
						styleSheet = document.styleSheets[i];
					}
					var media = styleSheet.media;
					mediaType = typeof media;
				}
				if(mediaType === "string") {
					for(i = 0; i < styleSheet.rules.length; i++) {
						if(styleSheet.rules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
							styleSheet.rules[i].style.cssText = style;
							return;
						}
					}
					styleSheet.addRule(selector, style);
				} else if(mediaType === "object") {
					try {
						for(i = 0; i < styleSheet.cssRules.length; i++) {
							if(styleSheet.cssRules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
								styleSheet.cssRules[i].style.cssText = style;
								return;
							}
						}
					} catch(e) {
						return;
					}
					styleSheet.insertRule(selector + "{" + style + "}", 0);
				}
			},
			addStylesheetRules: function(rules, merge) {
				var styleEl = document.createElement('style'),
					styleSheet;
				document.head.appendChild(styleEl);
				styleSheet = styleEl.sheet;
				for(var i = 0, rl = rules.length; i < rl; i++) {
					var j = 1,
						rule = rules[i],
						selector = rules[i][0],
						propStr = '',
						k;
					if(Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
						rule = rule[1];
						j = 0;
					}
					for(var pl = rule.length; j < pl; j++) {
						var prop = rule[j];
						propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
						$(selector).css(prop[0], prop[1] + (prop[2] ? ' !important' : ''));
					}
					styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
				}
			},
			draggable: function(id, id2, save, load) {
				try {
					var wDrag = new DragObject(this.g(id), this.g(id2));
					wDrag.ondrop = function() {
						if(save === true) wDrag.saveToStore();
						return true;
					};
					if(load === true) wDrag.loadFromStore();
				} catch(err) {
					console.log(err);
					return;
				}
			},
			config: {
				regex: {
					jsonParse: /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|("[\w\-^\/]\/[\w\-^\/]")|("[A-Za-z\-.0-9\/^"<>=]+[^"<>=]")|("1.3.6.1.4.1[0-9\.^\/A-Za-z<>=]{0,}")|("[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+")/g,
					url: /("([A-Za-z]+)(:\/\/)([0-9.\-A-Za-z]+)?([0-9\-A-Za-z]+)([.]{1})([A-Za-z]+)(\/)?([^\\"]+)?")/g
				},
				renderJSON: {
					defaultRules: function(_) {
						var kFound = false,
							THIS = _,
							regex_package = {
								name: 'Package',
								regex: /((")?[\w\-^\/]+\/[\w\-^\/]+(")?)/,
								type: 'string',
								style: function(match) {
									var html = '',
										m = match;
									m = str_replace('"', '', m);
									m = str_replace(':', '', m);
									var p;
									if((p = explode('/', m)).length === 2) {
										html = '<a style="text-decoration:underline;color:blue;cursor:pointer;" title="Package: ' + htmlentities(p[0] + '/' + p[1]) + '" onclick="$(frdl.wd()).package(\'c\', \'' + p[0] + '\', \'' + p[1] + '\');">' + p[0] + '/' + p[1] + '</a>';
									} else {
										html = m;
									}
									return html;
								}
							},
							regex_any = {
								name: 'any',
								regex: /("[A-Za-z\-.0-9^"<>=]+[^"<>=]")/g,
								type: 'any non html',
								style: function(match) {
									var m = str_replace(':', '', str_replace('"', '', match.trim()));
									var p, html;
									if((p = explode('/', m)).length === 2) {
										var title = _T.pTitle(p[0], p[1]);
										html = '<a style="text-decoration:underline;color:blue;cursor:pointer;" title="Package: ' + htmlentities(title) + '" onclick="$(frdl.wd()).package(\'c\', \'' + p[0] + '\', \'' + p[1] + '\');">' + title + '</a>';
									} else {
										html = match;
									}
									return html;
								}
							};
						return {
							def: function(match) {
								return match;
							},
							defKey: function(match) {
								if('string' !== typeof match) {
									try {
										var match = match.toString();
									} catch(e) {
										var match = '';
									}
								}
								return '<span class="webfan-red" style="font-size:1.1em;">' + str_replace('"', '', match.substr(-1 * match.length - 2)).ucfirst() + '</span>';
							},
							types: [{
								name: 'True',
								regex: /true/,
								type: 'boolean',
								style: 'color:lightgreen;'
							}, {
								name: 'False',
								regex: /false/,
								type: 'boolean',
								style: 'color:lightred;'
							}, {
								name: 'Null',
								regex: /null/,
								type: 'nil',
								style: 'color:magenta;'
							}, {
								name: 'Number',
								regex: /-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/,
								type: 'number',
								style: 'color:darkorange;'
							}, {
								name: 'Unicode',
								regex: /"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?/,
								type: 'string',
								style: 'color:green;'
							}, {
								name: 'OID',
								regex: /1.3.6.1.4.1[0-9\.^\/A-Za-z<>=]{0,}/,
								type: 'string',
								style: function(match) {
									var OID = str_replace('"', '', match);
									return '<a href="http://look-up.webfan.de/' + OID + '">' + OID + '</a>';
								}
							}, {
								name: 'Email',
								regex: /[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+/,
								type: 'string',
								style: function(match) {
									var mail = str_replace('"', '', match);
									return '<a href="mailto:' + mail + '">' + mail + '</a>';
								}
							}, regex_package],
							keys: [{
								name: 'NumKey',
								regex: /((")?[0-9]{1,}(")?)/,
								type: 'key',
								style: function(match) {
									if(true === kFound) return str_replace('"', '', match);
									kFound = true;
									return ''
								}
							}],
							any: regex_any,
							punctuation: {
								name: 'Punctuation',
								regex: /(([\s])?([\.\[\{]{1})[^"])|([\]]{1}[^"])|([\}]{1}[^"]|[^"][\}]{1})|([\,]{1}[^"]|[^"][\,]{1}|[\,]{1}[\r\n]|[^"][\,]{1}[^"]|"[\,]{1}"|[\,]{1}[\[\{]|[\]\}][\,]{1}|[\r\n][\]]{1})/g,
								type: 'punctuation',
								style: function(match) {
									var comma = '</li><li>',
										m = str_replace('"', '', match.trim());
									var result = null;
									if(',' === m) result = comma;
									if('[' === m) result = '<ol style="list-style:list;"><li>';
									if(']' === m) result = '</li></ol>';
									if('{' === m) result = '<ul style="list-style:list;"><li>';
									if('}' === m) result = '</li></ul>';
									if('],' === m) result = '</li></ol>' + comma;
									if('string' === typeof result) return result;
									return match;
								}
							},
							spaces: {
								name: 'Spaces',
								regex: /([\r\n]{2,})/g,
								type: 'lnbr',
								style: function(match) {
									return "\r\n";
								}
							},
							url: {
								name: 'Url',
								regex: Dom.config.regex.url,
								type: 'string',
								style: function(match) {
									var om = match,
										u;
									om = str_replace('"', '', om);
									var url = (u = new frdl.Url(om)).urlMakeNew(),
										maxLength = 16,
										maxSub = 6;
									if('' === u.getHost() && '' === u.getPath()) return match;
									var linktext = u.getHost() + (('' !== u.getPath()) ? ('/' + u.getPath()) : '');
									linktext = (linktext.length > maxLength) ? (linktext.substr(0, maxLength) + '...' + linktext.substr((maxSub * -1))) : linktext;
									return '<a href="' + url + '">' + linktext + '</a>';
								}
							}
						};
					}
				}
			},
			renderJSON: function(json, rr, code, pre, REGEX) {
				if(typeof json !== 'string') {
					json = JSON.stringify(json, undefined, '\t');
				}
				var rules = this.config.renderJSON.defaultRules();
				if('undefined' !== typeof jQuery) {
					rules = Object.create(rules, ('object' === typeof rr) ? rr : {});
				} else {
					for(var k in rr) {
						rules[k] = rr[k];
					}
				}
				var str = json.replace((('undefined' !== typeof REGEX && null !== REGEX) ? REGEX : Dom.config.regex.jsonParse), function(match) {
					var i = 0,
						p;
					if(rules.punctuation.regex.test(match)) {
						if('string' === typeof rules.punctuation.style) {
							return '<span style="' + rules.punctuation.style + '">' + match + '</span>';
						} else if('function' === typeof rules.punctuation.style) {
							return rules.punctuation.style(match);
						} else {
							return match;
						}
					}
					if(/^"/.test(match)) {
						if(/:$/.test(match)) {
							for(i = 0; i < rules.keys.length; i++) {
								p = rules.keys[i];
								if(p.regex.test(match)) {
									if('string' === typeof p.style) {
										return '<span style="' + p.style + '">' + match + '</span>';
									} else if('function' === typeof p.style) {
										return p.style(match);
									} else {
										return match;
									}
								}
							}
							return('function' === typeof rules.defKey) ? rules.defKey(match) : '<span style="' + rules.defKey + '">' + match + '</span>';
						} else {
							return match;
						}
					} else {
						for(i = 0; i < rules.types.length; i++) {
							p = rules.types[i];
							if(p.regex.test(match)) {
								if('string' === typeof p.style) {
									return '<span style="' + p.style + '">' + match + '</span>';
								} else if('function' === typeof p.style) {
									return p.style(match);
								} else {
									return match;
								}
							}
						}
					}
				});
				str = str.replace(rules.punctuation.regex, function(match) {
					if('function' === typeof rules.punctuation.style) {
						return rules.punctuation.style(match);
					} else if('string' === typeof rules.punctuation.style) {
						return '<span style="' + rules.punctuation.style + '">' + match + '</span>';
					} else {
						return match;
					}
				});
				str = str.replace(rules.url.regex, function(match) {
					if('function' === typeof rules.url.style) {
						return rules.url.style(match);
					} else if('string' === typeof rules.url.style) {
						return '<span style="' + rules.url.style + '">' + match + '</span>';
					} else {
						return match;
					}
				});
				str = str.replace(rules.any.regex, function(match) {
					if('function' === typeof rules.any.style) {
						return rules.any.style(match);
					} else if('string' === typeof rules.any.style) {
						return '<span style="' + rules.any.style + '">' + match + '</span>';
					} else {
						return match;
					}
				});
				str = str.replace(rules.spaces.regex, function(match) {
					if('function' === typeof rules.spaces.style) {
						return rules.spaces.style(match);
					} else if('string' === typeof rules.spaces.style) {
						return '<span style="' + rules.spaces.style + '">' + match + '</span>';
					} else {
						return match;
					}
				});
				if(true === pre) str = '<pre>' + str + '</pre>';
				if(true === code) str = '<code>' + str + '</code>';
				return str;
			},
			bringToFront: function(selector, dSiblings) {
				if('undefined' === typeof selector) var selector = this.element;
				var zmax = 1,
					d = Dom.getTagNames('*'),
					i = 0,
					m = 1,
					_Siblings = (true === dSiblings) ? true : false;
				for(i = 0; i < d.length; i++) {
					var e = d[i];
					var cur = parseInt(e.style.zIndex);
					if(isNaN(cur)) continue;
					if(cur > 2 && cur >= zmax - 1) cur--;
					zmax = cur > zmax ? cur : zmax;
					e.style.zIndex = cur;
				}
				try {
					if('string' === typeof selector && ('#' === selector.substr(0, 1) || '.' === selector.substr(0, 1))) {} else if('string' === typeof selector.selector) {
						selector = selector.selector;
					} else if('string' === typeof selector) {
						selector = '#' + selector;
					}
					$(selector).css('zIndex', ++zmax);
					if(true === _Siblings) $(selector).siblings().css('zIndex', ++zmax);
				} catch(err) {
					console.warn(err + ' : ' + JSON.stringify(selector));
				}
			}
		};
		let Dom = frdl.Dom = new DomObject(window.document || global);
		frdl.$j = function(selector) {
			return new DomObject(selector);
		};
	}());
	var HOST_API = 'api.webfan.de';
	var HOST_CDN_PUBLIC_FRDL = location.host;
	var _h = HOST_CDN_PUBLIC_FRDL.split(/./);
	_h = _h.reverse();
	if('webfan' === _h[1]) {
		var h = location.host.split(/:/);
		HOST_CDN_PUBLIC_FRDL = h[0];
	} else {
		HOST_CDN_PUBLIC_FRDL = 'webfan.de';
	}
	var urlAliasMap = {
		HOST_CDN_PUBLIC_FRDL: HOST_CDN_PUBLIC_FRDL,
		HOST_API: HOST_API,
		CLI_CONFIG: function() {
			return location.protocol + '//' + frdl.route('HOST_CDN_PUBLIC_FRDL') + '/cdn/frdl/flow/components/webfan/cli/clisetup/clisetup';
		},
		DEMO_API_CLIENT_URL: false,
		DEMO_API_CLIENT_URL_ALT: false,
		API_URL: location.protocol + '//' + 'interface.' + HOST_API + '/v1/public/frdl/bounce/cli.jsonp',
		API_ENDPOINT: location.protocol + '//' + 'interface.' + HOST_API + '/v1/public/',
		'FRDL.URL.SERACHENGINE.PLUGIN': location.protocol + '//' + 'suche.webfan.de/searchplugin.xml',
		'FRDL.URL.MANIFEST.WEBAPP.WEBFAN.MY': location.protocol + '//' + 'webfan.de/manifest.webapp',
		'jQueryMobile.autoInitializePage': false,
		'jQueryMobile.ajaxEnabled': false,
		'jQueryMobile.linkBindingEnabled': false,
		'jQueryMobile.hashListeningEnabled': false,
		'jQueryMobile.pushStateEnabled': false
	};
	frdl.route = function(alias, params, path, options) {
		return('function' === typeof urlAliasMap[alias]) ? urlAliasMap[alias](alias, params, path, options) : urlAliasMap[alias];
	};
	frdl.Route = function(r, v) {
		var args = Array.prototype.slice.call(arguments);
		if(0 === args.length) return urlAliasMap;
		if('undefined' === typeof v && 'object' === typeof r) {
			frdl.each(r, function(i, R) {
				urlAliasMap[i] = R;
			});
		} else if('undefined' === typeof urlAliasMap[r] && ('function' === typeof v || 'string' === typeof v)) {
			urlAliasMap[r] = v;
		} else if('undefined' !== typeof urlAliasMap[r] && (null === v || typeof v === typeof urlAliasMap[r])) {
			urlAliasMap[r] = v;
		} else if('undefined' === typeof v && 'undefined' === typeof r) {
			return urlAliasMap;
		} else if('string' === typeof v && 'string' === typeof r) {
			urlAliasMap[r] = v;
		} else if('function' === typeof urlAliasMap[r] && ('undefined' !== v && 'function' !== typeof v)) {
			return urlAliasMap[r].apply(args.shift(), args);
		} else {
			frdl.Throw('framework', 'Invalid arguments: frdl.Route(' + JSON.stringify(r) + ', ' + JSON.stringify(v) + ');');
		}
		return urlAliasMap[r];
	};
	(function() {
		/*! https://github.com/mohayonao/inline-worker/blob/master/index.js */
		'use strict';

		function WORKER_ENABLED() {
			return !!(global === global.window && global.URL && global.Blob && global.Worker);
		}

		function InlineWorker(func, self) {
			var _this = this;
			var functionBody;
			self = self || {};
			if(WORKER_ENABLED()) {
				functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
				return new global.Worker(global.URL.createObjectURL(new global.Blob([functionBody], {
					type: "text/javascript"
				})));
			}

			function postMessage(data) {
				setTimeout(function() {
					_this.onmessage(JSON.stringify({
						data: data
					}));
				}, 0);
			}
			this.self = self;
			this.self.postMessage = postMessage;
			setTimeout(func.bind(self, self), 0);
		}
		InlineWorker.prototype.postMessage = function postMessage(data) {
			var _this = this;
			setTimeout(function() {
				_this.self.onmessage(JSON.stringify({
					data: data
				}));
			}, 0);
		};
		frdl.InlineWorker = InlineWorker;
	}());
	mapLoader();
	if(!global.isWorker) {
		require(['webfan/bootcache!Sha1', 'webfan/bootcache!webfan/navigator/dom-observer-new', 'angularjs', 'feature!vm'], function(Sha1, watchFor, angular, vm) {
			frdl.Sha1 = Sha1;
			frdl.watchFor = watchFor;
			console.log('angular', angular);
			Object.defineProperty(frdl, 'a', {
				get: function() {
					return angular;
				}
			});
			process.emit('before.angularBootstrap', frdl.a.modules);
			require(['frdlcjs!ng-sanitize'], function(messagesLoaded) {});
			require(['frdlcjs!angular-messages/angular-messages'], function(messagesLoaded) {});
			require(['frdlcjs!angular-xeditable/angular-xeditable'], function(messagesLoaded) {});
			loadTinymce();
			require(['webfan/bootcache!webfan/frdl-main-x8', 'webfan/bootcache!url', 'webfan/bootcache!buffer', 'webfan/bootcache!webfan/webfanURLParser'], function(mainModule, url, buffer, webfanURLParser) {
				frdl.Url = webfanURLParser;
				global.buffer = buffer;
				frdl.url = url;
				frdl.addReadyCheck(function() {
					return('undefined' !== typeof frdl.main && 'undefined' !== typeof frdl.main.ready && 'function' === typeof frdl.main.ready && true === frdl.main.ready()) ? true : false;
				});
				frdl.main = new mainModule(frdl, frdl.webfan);
			});
		});
	}

	function WebfanCreateCookie(name, value, days) {
		if(days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else var expires = "";
		var u = new frdl.Url('');
		var url = u.getLocation();
		var host = u.getHost();
		var h = host.split(".");
		document.cookie = name + "=" + value + expires + ";domain=." + h[h.length - 2] + "." + h[h.length - 1] + ";path=/";
		document.cookie = name + "=" + value + expires + ";domain=.webfan.de;path=/";
	}

	function WebfanCreateCookieSeconds(name, value, s) {
		if(s) {
			var date = new Date();
			date.setTime(date.getTime() + (s * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else var expires = "";
		var u = new frdl.Url('');
		var url = u.getLocation();
		var host = u.getHost();
		var h = host.split(".");
		document.cookie = name + "=" + value + expires + ";domain=." + h[h.length - 2] + "." + h[h.length - 1] + ";path=/";
	}

	function WebfanReadCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while(c.charAt(0) == ' ') c = c.substring(1, c.length);
			if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function WebfanEraseCookie(name) {
		WebfanCreateCookie(name, "", -1);
	}
	/*! frdl.ns.SFRDL (Frdl Standard Library) */
	/*! http://locutus.io/php */
	function extend(from, to) {
		if(from === null || typeof from !== 'object') return from;
		if(from.constructor !== Object && from.constructor !== Array) return from;
		if(from.constructor === Date || from.constructor === RegExp || from.constructor === Function || from.constructor === String || from.constructor === Number || from.constructor === Boolean) return new from.constructor(from);
		to = to || new from.constructor();
		var name;
		for(name in from) {
			to[name] = typeof to[name] === 'undefined' ? extend(from[name], null) : to[name];
		}
		return to;
	}

	function clone(obj) {
		var clone = extend(obj);
		return clone;
	}

	function str_replace(search, replace, subject) {
		if('string' !== typeof subject) return '';
		try {
			return subject.split(search).join(replace);
		} catch(err) {
			if(0 < frdl.debug.mode() && 'undefined' !== typeof console) console.warn(err);
			return '';
		}
	}

	function html_entity_decode(string, quote_style) {
		var hash_map = {},
			symbol = '',
			tmp_str = '',
			entity = '',
			tmp_str = string.toString();
		if(false === (hash_map = get_html_translation_table('HTML_ENTITIES', quote_style))) {
			return false;
		}
		delete(hash_map['&']);
		hash_map['&'] = '&amp;';
		for(symbol in hash_map) {
			entity = hash_map[symbol];
			tmp_str = tmp_str.split(entity).join(symbol);
		}
		tmp_str = tmp_str.split('&#039;').join("'");
		return tmp_str;
	}

	function get_html_translation_table(table, quote_style) {
		var entities = {},
			hash_map = {},
			decimal;
		var constMappingTable = {},
			constMappingQuoteStyle = {};
		var useTable = {},
			useQuoteStyle = {};
		constMappingTable[0] = 'HTML_SPECIALCHARS';
		constMappingTable[1] = 'HTML_ENTITIES';
		constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
		constMappingQuoteStyle[2] = 'ENT_COMPAT';
		constMappingQuoteStyle[3] = 'ENT_QUOTES';
		useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
		useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';
		if(useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
			return false;
		}
		entities['38'] = '&amp;';
		if(useTable === 'HTML_ENTITIES') {
			entities['160'] = '&nbsp;';
			entities['161'] = '&iexcl;';
			entities['162'] = '&cent;';
			entities['163'] = '&pound;';
			entities['164'] = '&curren;';
			entities['165'] = '&yen;';
			entities['166'] = '&brvbar;';
			entities['167'] = '&sect;';
			entities['168'] = '&uml;';
			entities['169'] = '&copy;';
			entities['170'] = '&ordf;';
			entities['171'] = '&laquo;';
			entities['172'] = '&not;';
			entities['173'] = '&shy;';
			entities['174'] = '&reg;';
			entities['175'] = '&macr;';
			entities['176'] = '&deg;';
			entities['177'] = '&plusmn;';
			entities['178'] = '&sup2;';
			entities['179'] = '&sup3;';
			entities['180'] = '&acute;';
			entities['181'] = '&micro;';
			entities['182'] = '&para;';
			entities['183'] = '&middot;';
			entities['184'] = '&cedil;';
			entities['185'] = '&sup1;';
			entities['186'] = '&ordm;';
			entities['187'] = '&raquo;';
			entities['188'] = '&frac14;';
			entities['189'] = '&frac12;';
			entities['190'] = '&frac34;';
			entities['191'] = '&iquest;';
			entities['192'] = '&Agrave;';
			entities['193'] = '&Aacute;';
			entities['194'] = '&Acirc;';
			entities['195'] = '&Atilde;';
			entities['196'] = '&Auml;';
			entities['197'] = '&Aring;';
			entities['198'] = '&AElig;';
			entities['199'] = '&Ccedil;';
			entities['200'] = '&Egrave;';
			entities['201'] = '&Eacute;';
			entities['202'] = '&Ecirc;';
			entities['203'] = '&Euml;';
			entities['204'] = '&Igrave;';
			entities['205'] = '&Iacute;';
			entities['206'] = '&Icirc;';
			entities['207'] = '&Iuml;';
			entities['208'] = '&ETH;';
			entities['209'] = '&Ntilde;';
			entities['210'] = '&Ograve;';
			entities['211'] = '&Oacute;';
			entities['212'] = '&Ocirc;';
			entities['213'] = '&Otilde;';
			entities['214'] = '&Ouml;';
			entities['215'] = '&times;';
			entities['216'] = '&Oslash;';
			entities['217'] = '&Ugrave;';
			entities['218'] = '&Uacute;';
			entities['219'] = '&Ucirc;';
			entities['220'] = '&Uuml;';
			entities['221'] = '&Yacute;';
			entities['222'] = '&THORN;';
			entities['223'] = '&szlig;';
			entities['224'] = '&agrave;';
			entities['225'] = '&aacute;';
			entities['226'] = '&acirc;';
			entities['227'] = '&atilde;';
			entities['228'] = '&auml;';
			entities['229'] = '&aring;';
			entities['230'] = '&aelig;';
			entities['231'] = '&ccedil;';
			entities['232'] = '&egrave;';
			entities['233'] = '&eacute;';
			entities['234'] = '&ecirc;';
			entities['235'] = '&euml;';
			entities['236'] = '&igrave;';
			entities['237'] = '&iacute;';
			entities['238'] = '&icirc;';
			entities['239'] = '&iuml;';
			entities['240'] = '&eth;';
			entities['241'] = '&ntilde;';
			entities['242'] = '&ograve;';
			entities['243'] = '&oacute;';
			entities['244'] = '&ocirc;';
			entities['245'] = '&otilde;';
			entities['246'] = '&ouml;';
			entities['247'] = '&divide;';
			entities['248'] = '&oslash;';
			entities['249'] = '&ugrave;';
			entities['250'] = '&uacute;';
			entities['251'] = '&ucirc;';
			entities['252'] = '&uuml;';
			entities['253'] = '&yacute;';
			entities['254'] = '&thorn;';
			entities['255'] = '&yuml;';
		}
		if(useQuoteStyle !== 'ENT_NOQUOTES') {
			entities['34'] = '&quot;';
		}
		if(useQuoteStyle === 'ENT_QUOTES') {
			entities['39'] = '&#39;';
		}
		entities['60'] = '&lt;';
		entities['62'] = '&gt;';
		for(decimal in entities) {
			if(entities.hasOwnProperty(decimal)) {
				hash_map[String.fromCharCode(decimal)] = entities[decimal];
			}
		}
		return hash_map;
	}

	function htmlentities(string, quote_style, charset, double_encode) {
		var hash_map = get_html_translation_table('HTML_ENTITIES', quote_style),
			symbol = '';
		string = string == null ? '' : string + '';
		if(!hash_map) {
			return false;
		}
		if(quote_style && quote_style === 'ENT_QUOTES') {
			hash_map["'"] = '&#039;';
		}
		if(!!double_encode || double_encode == null) {
			for(symbol in hash_map) {
				if(hash_map.hasOwnProperty(symbol)) {
					string = string.split(symbol).join(hash_map[symbol]);
				}
			}
		} else {
			string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function(ignore, text, entity) {
				for(symbol in hash_map) {
					if(hash_map.hasOwnProperty(symbol)) {
						text = text.split(symbol).join(hash_map[symbol]);
					}
				}
				return text + entity;
			});
		}
		return string;
	}

	function mt_rand(min, max) {
		var argc = arguments.length;
		if(argc === 0) {
			min = 0;
			max = 2147483647;
		} else if(argc === 1) {
			min = 0;
			max = min;
		} else if(min < max) {
			min = parseInt(min);
			max = parseInt(max);
		} else {
			min = 0;
			max = 2147483647;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function strpos(haystack, needle, offset) {
		var i = (haystack + '').indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	}

	function base64_encode(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = "",
			tmp_arr = [];
		if(!data) {
			return data;
		}
		do {
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);
			bits = o1 << 16 | o2 << 8 | o3;
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);
		enc = tmp_arr.join('');
		var r = data.length % 3;
		return(r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	}

	function base64_decode(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];
		if(!data) {
			return data;
		}
		data += '';
		do {
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));
			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;
			if(h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			} else if(h4 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
				tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);
		dec = tmp_arr.join('');
		return dec;
	}

	function base64_detect(str) {
		var base64Detect = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
		if(base64Detect.test(str)) {
			return true;
		} else {
			return false;
		}
	}

	function urlencode(str) {
		str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	}

	function urldecode(str) {
		return decodeURIComponent((str + '').replace(/\+/g, '%20'));
	}

	function explode(delimiter, string, limit) {
		if(arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
		if(delimiter === '' || delimiter === false || delimiter === null) return false;
		if(typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object') {
			return [0];
		}
		if(delimiter === true) delimiter = '1';
		delimiter += '';
		string += '';
		var s = string.split(delimiter);
		if(typeof limit === 'undefined') return s;
		if(limit === 0) limit = 1;
		if(limit > 0) {
			if(limit >= s.length) return s;
			return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
		}
		if(-limit >= s.length) return [];
		s.splice(s.length + limit);
		return s;
	}

	function strip_tags(str, allow) {
		var allow = (((allow || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
		var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return str.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
			return allow.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});
	}

	function createImageObjectURL(Image, type) {
		if(true !== Image instanceof Blob) {
			Image = new Blob([Image], {
				type: type
			});
		}
		return URL.createObjectURL(Image);
	}

	function createJavascriptObjectURL(func) {
		var functionBody = frdl.Reflector.getFunctionBody(func);
		return URL.createObjectURL(new Blob([functionBody], {
			type: "text/javascript"
		}));
	}

	function createHTMLObjectURL(HTML) {
		return URL.createObjectURL(new Blob([HTML], {
			type: "text/html"
		}));
	}

	function createCSSObjectURL(css) {
		return URL.createObjectURL(new Blob([css], {
			type: "text/css"
		}));
	}

	function __createObjectURL(type, content) {
		if(false !== frdl.strpos(type, 'script')) {
			return frdl.createJavascriptObjectURL(content);
		}
		return URL.createObjectURL(new Blob([content], {
			type: type
		}));
	}

	function dashToCamel(dash) {
		return dash.indexOf('-') < 0 ? dash : dash.replace(/-[a-z]/g, function(m) {
			return m[1].toUpperCase();
		});
	}

	function camelToDash(camel) {
		return camel.replace(/([A-Z])/g, '-$1').toLowerCase();
	}

	function dechex(number) {
		if(number < 0) {
			number = 0xFFFFFFFF + number + 1;
		}
		return parseInt(number, 10).toString(16);
	}

	function hexdec(hexString) {
		hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
		return parseInt(hexString, 16);
	}

	function stripslashes(str) {
		/*!       discuss at: http://locutus.io/php/stripslashes/ */
		return(str + '').replace(/\\(.?)/g, function(s, n1) {
			switch(n1) {
				case '\\':
					return '\\';
				case '0':
					return '\u0000';
				case '':
					return '';
				default:
					return n1;
			}
		});
	}

	function ucfirst(str) {
		str += '';
		var f = str.charAt(0).toUpperCase();
		return f + str.substr(1);
	}
	return frdl;
});
