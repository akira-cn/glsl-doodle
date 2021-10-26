(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Doodle"] = factory();
	else
		root["Doodle"] = factory();
})(globalThis, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = globalThis["webpackHotUpdate"];
/******/ 	globalThis["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "90a7839de016bbedbe5b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n\n  for (var i = 0, arr2 = new Array(len); i < len; i++) {\n    arr2[i] = arr[i];\n  }\n\n  return arr2;\n}\n\nmodule.exports = _arrayLikeToArray;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/arrayLikeToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nmodule.exports = _arrayWithHoles;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/arrayWithHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ \"./node_modules/@babel/runtime/helpers/arrayLikeToArray.js\");\n\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return arrayLikeToArray(arr);\n}\n\nmodule.exports = _arrayWithoutHoles;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\n\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n        args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n\n      _next(undefined);\n    });\n  };\n}\n\nmodule.exports = _asyncToGenerator;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/asyncToGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var superPropBase = __webpack_require__(/*! ./superPropBase.js */ \"./node_modules/@babel/runtime/helpers/superPropBase.js\");\n\nfunction _get(target, property, receiver) {\n  if (typeof Reflect !== \"undefined\" && Reflect.get) {\n    module.exports = _get = Reflect.get;\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  } else {\n    module.exports = _get = function _get(target, property, receiver) {\n      var base = superPropBase(target, property);\n      if (!base) return;\n      var desc = Object.getOwnPropertyDescriptor(base, property);\n\n      if (desc.get) {\n        return desc.get.call(receiver);\n      }\n\n      return desc.value;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  }\n\n  return _get(target, property, receiver || target);\n}\n\nmodule.exports = _get;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/get.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArray(iter) {\n  if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\n\nmodule.exports = _iterableToArray;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/iterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArrayLimit(arr, i) {\n  var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"];\n\n  if (_i == null) return;\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n\n  var _s, _e;\n\n  try {\n    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nmodule.exports = _iterableToArrayLimit;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nmodule.exports = _nonIterableRest;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/nonIterableRest.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nmodule.exports = _nonIterableSpread;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/nonIterableSpread.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\")[\"default\"];\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  } else if (call !== void 0) {\n    throw new TypeError(\"Derived constructors may only return object or undefined\");\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ \"./node_modules/@babel/runtime/helpers/arrayWithHoles.js\");\n\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ \"./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js\");\n\nvar unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ \"./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js\");\n\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ \"./node_modules/@babel/runtime/helpers/nonIterableRest.js\");\n\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();\n}\n\nmodule.exports = _slicedToArray;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/slicedToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nfunction _superPropBase(object, property) {\n  while (!Object.prototype.hasOwnProperty.call(object, property)) {\n    object = getPrototypeOf(object);\n    if (object === null) break;\n  }\n\n  return object;\n}\n\nmodule.exports = _superPropBase;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/superPropBase.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ \"./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js\");\n\nvar iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ \"./node_modules/@babel/runtime/helpers/iterableToArray.js\");\n\nvar unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ \"./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js\");\n\nvar nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ \"./node_modules/@babel/runtime/helpers/nonIterableSpread.js\");\n\nfunction _toConsumableArray(arr) {\n  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();\n}\n\nmodule.exports = _toConsumableArray;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/toConsumableArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ \"./node_modules/@babel/runtime/helpers/arrayLikeToArray.js\");\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);\n}\n\nmodule.exports = _unsupportedIterableToArray;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! regenerator-runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n\n\n//# sourceURL=webpack://Doodle/./node_modules/@babel/runtime/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/gl-renderer/src/default_feeback_vert.glsl":
/*!****************************************************************!*\
  !*** ./node_modules/gl-renderer/src/default_feeback_vert.glsl ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"attribute vec4 a_vertexPosition;\\nattribute vec2 a_vertexTextureCoord;\\nvarying vec2 vTextureCoord;\\nvoid main() {\\n\\tgl_PointSize = 1.0;\\n\\tgl_Position = a_vertexPosition;\\n\\tvTextureCoord = a_vertexTextureCoord;\\n}\\n\"\n\n//# sourceURL=webpack://Doodle/./node_modules/gl-renderer/src/default_feeback_vert.glsl?");

/***/ }),

/***/ "./node_modules/gl-renderer/src/default_frag.glsl":
/*!********************************************************!*\
  !*** ./node_modules/gl-renderer/src/default_frag.glsl ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifdef GL_ES\\nprecision mediump float;\\n#endif\\nvoid main() {\\n\\tgl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\\n}\\n\"\n\n//# sourceURL=webpack://Doodle/./node_modules/gl-renderer/src/default_frag.glsl?");

/***/ }),

/***/ "./node_modules/gl-renderer/src/default_vert.glsl":
/*!********************************************************!*\
  !*** ./node_modules/gl-renderer/src/default_vert.glsl ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"attribute vec3 a_vertexPosition;\\nvoid main() {\\n\\tgl_PointSize = 1.0;\\n\\tgl_Position = vec4(a_vertexPosition, 1);\\n}\\n\"\n\n//# sourceURL=webpack://Doodle/./node_modules/gl-renderer/src/default_vert.glsl?");

/***/ }),

/***/ "./node_modules/gl-renderer/src/helpers.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-renderer/src/helpers.js ***!
  \*************************************************/
/*! exports provided: setupWebGL, createProgram, pointsToBuffer, loadImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupWebGL\", function() { return setupWebGL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createProgram\", function() { return createProgram; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointsToBuffer\", function() { return pointsToBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImage\", function() { return loadImage; });\nfunction create3DContext(canvas, opt_attribs) {\n  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];\n  var context = null;\n\n  for (var ii = 0; ii < names.length; ++ii) {\n    try {\n      context = canvas.getContext(names[ii], opt_attribs);\n    } catch (e) {// no-empty\n    }\n\n    if (context) {\n      break;\n    }\n  }\n\n  return context;\n}\n\nfunction setupWebGL(canvas, opt_attribs) {\n  var context = create3DContext(canvas, opt_attribs);\n\n  if (!context) {\n    throw new Error('Sorry, your browser doesn\\'t support WebGL.');\n  }\n\n  return context;\n}\nfunction createProgram(gl, vertex, fragment) {\n  var vertShdr = gl.createShader(gl.VERTEX_SHADER);\n  gl.shaderSource(vertShdr, vertex);\n  gl.compileShader(vertShdr);\n\n  if (!gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS)) {\n    var msg = \"Vertex shader failed to compile.  The error log is:\".concat(gl.getShaderInfoLog(vertShdr));\n    console.error(msg);\n    return -1;\n  }\n\n  var fragShdr = gl.createShader(gl.FRAGMENT_SHADER);\n  gl.shaderSource(fragShdr, fragment);\n  gl.compileShader(fragShdr);\n\n  if (!gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS)) {\n    var _msg = \"Fragment shader failed to compile.  The error log is:\".concat(gl.getShaderInfoLog(fragShdr));\n\n    console.error(_msg);\n    return -1;\n  }\n\n  var program = gl.createProgram();\n  gl.attachShader(program, vertShdr);\n  gl.attachShader(program, fragShdr);\n  gl.linkProgram(program);\n\n  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\n    var _msg2 = \"Shader program failed to link.  The error log is:\".concat(gl.getProgramInfoLog(program));\n\n    console.error(_msg2);\n    return -1;\n  }\n\n  gl.deleteShader(vertShdr);\n  gl.deleteShader(fragShdr);\n  return program;\n}\nfunction pointsToBuffer(points) {\n  var Type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Float32Array;\n  var buffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  if (buffer && !(buffer instanceof Type)) throw new TypeError('Wrong buffer type.');\n  if (points == null) return points;\n  if (points instanceof Type) return points;\n\n  if (points[0] == null || points[0].length == null) {\n    if (buffer) {\n      buffer.set(points, 0);\n      return buffer;\n    }\n\n    return new Type(points);\n  }\n\n  var deminsion = points[0].length;\n  var len = points.length;\n\n  if (!buffer) {\n    buffer = new Type(deminsion * len);\n  }\n\n  var idx = 0;\n\n  for (var i = 0; i < len; i++) {\n    for (var j = 0; j < deminsion; j++) {\n      buffer[idx++] = points[i][j];\n    }\n  }\n\n  return buffer;\n}\nvar imageCache = {};\nfunction loadImage(src) {\n  var useImageBitmap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n\n  if (!imageCache[src]) {\n    if (typeof Image === 'function') {\n      var img = new Image();\n      img.crossOrigin = 'anonymous';\n      imageCache[src] = new Promise(function (resolve) {\n        img.onload = function () {\n          if (useImageBitmap && typeof createImageBitmap === 'function') {\n            createImageBitmap(img, {\n              imageOrientation: 'flipY'\n            }).then(function (bitmap) {\n              imageCache[src] = bitmap;\n              resolve(bitmap);\n            });\n          } else {\n            imageCache[src] = img;\n            resolve(img);\n          }\n        };\n\n        img.src = src;\n      });\n    } else {\n      // run in worker\n      return fetch(src, {\n        method: 'GET',\n        mode: 'cors',\n        cache: 'default'\n      }).then(function (response) {\n        return response.blob();\n      }).then(function (blob) {\n        return createImageBitmap(blob, {\n          imageOrientation: 'flipY'\n        }).then(function (bitmap) {\n          imageCache[src] = bitmap;\n          return bitmap;\n        });\n      });\n    }\n  }\n\n  return Promise.resolve(imageCache[src]);\n}\n\n//# sourceURL=webpack://Doodle/./node_modules/gl-renderer/src/helpers.js?");

/***/ }),

/***/ "./node_modules/gl-renderer/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-renderer/src/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./node_modules/gl-renderer/src/renderer.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_renderer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://Doodle/./node_modules/gl-renderer/src/index.js?");

/***/ }),

/***/ "./node_modules/gl-renderer/src/renderer.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-renderer/src/renderer.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Renderer; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers */ \"./node_modules/gl-renderer/src/helpers.js\");\n/* harmony import */ var _default_vert_glsl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./default_vert.glsl */ \"./node_modules/gl-renderer/src/default_vert.glsl\");\n/* harmony import */ var _default_vert_glsl__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_default_vert_glsl__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./default_frag.glsl */ \"./node_modules/gl-renderer/src/default_frag.glsl\");\n/* harmony import */ var _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_default_frag_glsl__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./default_feeback_vert.glsl */ \"./node_modules/gl-renderer/src/default_feeback_vert.glsl\");\n/* harmony import */ var _default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10__);\n\n\n\n\n\n\n\n\n\n\n\nvar GLSL_LIBS = {};\n\nvar _renderFrameID = Symbol('renderFrameID');\n\nvar shaderCache = {};\n\nfunction fetchShader(_x) {\n  return _fetchShader.apply(this, arguments);\n}\n\nfunction _fetchShader() {\n  _fetchShader = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee5(url) {\n    var res, content;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            if (!shaderCache[url]) {\n              _context5.next = 2;\n              break;\n            }\n\n            return _context5.abrupt(\"return\", shaderCache[url]);\n\n          case 2:\n            _context5.next = 4;\n            return fetch(url);\n\n          case 4:\n            res = _context5.sent;\n\n            if (!(res.status >= 200 && res.status < 300)) {\n              _context5.next = 11;\n              break;\n            }\n\n            _context5.next = 8;\n            return res.text();\n\n          case 8:\n            content = _context5.sent;\n            shaderCache[url] = content;\n            return _context5.abrupt(\"return\", content);\n\n          case 11:\n            return _context5.abrupt(\"return\", null);\n\n          case 12:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5);\n  }));\n  return _fetchShader.apply(this, arguments);\n}\n\nfunction mapTextureCoordinate(positions) {\n  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;\n  var texVertexData = [];\n  var len = positions.length;\n\n  for (var i = 0; i < len; i++) {\n    if (i % size < 2) texVertexData.push(0.5 * (positions[i] + 1));\n  }\n\n  return texVertexData;\n}\n\nfunction clearBuffers(gl, program) {\n  var buffers = program._buffers;\n  Object.values(buffers).forEach(function (buffer) {\n    gl.deleteBuffer(buffer);\n  });\n  program._buffers = {};\n}\n\nfunction bindTexture(gl, texture, i) {\n  gl.activeTexture(gl.TEXTURE0 + i);\n  gl.bindTexture(gl.TEXTURE_2D, texture);\n  return texture;\n}\n\nvar uniformTypeMap = {\n  int: '1i',\n  ivec2: '2i',\n  ivec3: '3i',\n  ivec4: '4i',\n  float: '1f',\n  vec2: '2f',\n  vec3: '3f',\n  vec4: '4f',\n  mat2: 'Matrix2fv',\n  mat3: 'Matrix3fv',\n  mat4: 'Matrix4fv',\n  sampler2D: 'sampler2D'\n};\n\nvar Renderer = /*#__PURE__*/function () {\n  function Renderer(canvas) {\n    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Renderer);\n\n    this.options = Object.assign({}, Renderer.defaultOptions, opts);\n    this.canvas = canvas;\n    var gl;\n\n    if (this.options.webgl2) {\n      gl = canvas.getContext('webgl2', this.options);\n    } else {\n      gl = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"setupWebGL\"])(canvas, this.options);\n      this.aia_ext = gl.getExtension('ANGLE_instanced_arrays');\n    }\n\n    this.gl = gl;\n    gl.viewport(0, 0, canvas.width, canvas.height); // gl.clearColor(1.0, 1.0, 1.0, 1.0);\n    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\n\n    gl.clearColor(0.0, 0.0, 0.0, 0.0);\n    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\n    this.programs = [];\n    this._events = {};\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Renderer, [{\n    key: \"program\",\n    get: function get() {\n      var gl = this.gl;\n      return gl.getParameter(gl.CURRENT_PROGRAM);\n    } // WebGLRenderingContext.uniform[1234][fi][v]()\n    // WebGLRenderingContext.uniformMatrix[234]fv()\n\n  }, {\n    key: \"_declareUniform\",\n    value: function _declareUniform(program, name) {\n      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1f';\n      var gl = this.gl;\n      var uniform = gl.getUniformLocation(program, name);\n      var value;\n      var that = this;\n\n      if (type === 'sampler2D') {\n        var samplerMap = program._samplerMap;\n        var textures = program._bindTextures;\n        Object.defineProperty(program.uniforms, name, {\n          get: function get() {\n            return value;\n          },\n          set: function set(v) {\n            value = v;\n            var idx = samplerMap[name] != null ? samplerMap[name] : textures.length;\n            textures[idx] = v;\n            bindTexture(gl, v, idx);\n\n            if (!samplerMap[name]) {\n              samplerMap[name] = idx;\n              gl.uniform1i(uniform, idx);\n            }\n\n            if (that.options.autoUpdate) that.update();\n          },\n          configurable: false,\n          enumerable: true\n        });\n      } else {\n        var isMatrix = type.indexOf('Matrix') === 0;\n        var isTypeV = !isMatrix && /v$/.test(type);\n        var setUniform = gl[\"uniform\".concat(type)].bind(gl);\n        Object.defineProperty(program.uniforms, name, {\n          get: function get() {\n            return value;\n          },\n          set: function set(v) {\n            value = v;\n\n            if (typeof v === 'number') {\n              v = [v];\n            }\n\n            if (isMatrix) setUniform(uniform, false, v);else if (isTypeV) setUniform(uniform, v);else setUniform.apply(void 0, [uniform].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(v)));\n            if (that.options.autoUpdate) that.update();\n          },\n          configurable: false,\n          enumerable: true\n        });\n      }\n    }\n  }, {\n    key: \"_draw\",\n    value: function _draw() {\n      var _this = this;\n\n      var program = this.program;\n      program.meshData.forEach(function (meshData, meshIndex) {\n        var positions = meshData.positions,\n            cells = meshData.cells,\n            instanceCount = meshData.instanceCount,\n            cellsCount = meshData.cellsCount,\n            attributes = meshData.attributes,\n            uniforms = meshData.uniforms,\n            textureCoord = meshData.textureCoord,\n            enableBlend = meshData.enableBlend;\n        var gl = _this.gl;\n        if (enableBlend) gl.enable(gl.BLEND);else gl.disable(gl.BLEND);\n        gl.bindBuffer(gl.ARRAY_BUFFER, program._buffers.verticesBuffer);\n        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program._buffers.cellsBuffer);\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);\n\n        if (attributes) {\n          Object.values(attributes).forEach(function (_ref) {\n            var name = _ref.name,\n                data = _ref.data,\n                divisor = _ref.divisor;\n            gl.bindBuffer(gl.ARRAY_BUFFER, program._buffers[name]);\n            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);\n\n            if (divisor != null) {\n              var location = gl.getAttribLocation(program, name);\n              gl.enableVertexAttribArray(location);\n\n              if (gl.vertexAttribDivisor) {\n                gl.vertexAttribDivisor(location, divisor);\n              } else if (_this.aia_ext) {\n                _this.aia_ext.vertexAttribDivisorANGLE(location, divisor);\n              }\n            }\n          });\n        }\n\n        if (uniforms) {\n          Object.entries(uniforms).forEach(function (_ref2) {\n            var _ref3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, 2),\n                key = _ref3[0],\n                value = _ref3[1];\n\n            _this.uniforms[key] = value;\n          });\n        }\n\n        if (program._enableTextures && program._buffers.texCoordBuffer) {\n          var texVertexData = textureCoord || mapTextureCoordinate(positions, program._dimension);\n          gl.bindBuffer(gl.ARRAY_BUFFER, program._buffers.texCoordBuffer);\n          gl.bufferData(gl.ARRAY_BUFFER, Renderer.FLOAT(texVertexData), gl.STATIC_DRAW);\n        }\n\n        if (instanceCount != null) {\n          if (gl.drawElementsInstanced) {\n            gl.drawElementsInstanced(gl.TRIANGLES, cellsCount, gl.UNSIGNED_SHORT, 0, instanceCount);\n          } else if (_this.aia_ext) {\n            _this.aia_ext.drawElementsInstancedANGLE(gl.TRIANGLES, cellsCount, gl.UNSIGNED_SHORT, 0, instanceCount);\n          }\n        } else {\n          gl.drawElements(gl.TRIANGLES, cellsCount, gl.UNSIGNED_SHORT, 0);\n        }\n      });\n    }\n  }, {\n    key: \"isWebGL2\",\n    get: function get() {\n      return typeof WebGL2RenderingContext !== 'undefined' && this.gl instanceof WebGL2RenderingContext;\n    }\n  }, {\n    key: \"enableTextures\",\n    get: function get() {\n      return this.program && this.program._enableTextures;\n    }\n  }, {\n    key: \"uniforms\",\n    get: function get() {\n      var program = this.program;\n\n      if (!program || !program.uniforms) {\n        throw Error('No avaliable program.');\n      }\n\n      return program.uniforms;\n    }\n  }, {\n    key: \"deleteProgram\",\n    value: function deleteProgram(program) {\n      var gl = this.gl;\n\n      if (this.program === program) {\n        this.startRender = false;\n\n        if (this[_renderFrameID]) {\n          cancelAnimationFrame(this[_renderFrameID]);\n          delete this[_renderFrameID];\n        }\n\n        gl.useProgram(null);\n      }\n\n      var idx = this.programs.indexOf(program);\n\n      if (idx >= 0) {\n        this.programs.splice(idx, 1);\n      }\n\n      clearBuffers(gl, program);\n      gl.deleteProgram(program);\n    }\n    /**\n      [{\n        positions: ...\n        cells: ...\n        textureCoord: ...\n        attributes: {name: {data:..., normalize: true}},\n        uniforms: ...\n      }]\n     */\n\n  }, {\n    key: \"setMeshData\",\n    value: function setMeshData(data) {\n      var _this2 = this;\n\n      if (!Array.isArray(data)) {\n        data = [data];\n      }\n\n      var program = this.program;\n      program.meshData = data.map(function (_ref4) {\n        var positions = _ref4.positions,\n            instanceCount = _ref4.instanceCount,\n            cells = _ref4.cells,\n            cellsCount = _ref4.cellsCount,\n            attributes = _ref4.attributes,\n            uniforms = _ref4.uniforms,\n            textureCoord = _ref4.textureCoord,\n            enableBlend = _ref4.enableBlend;\n        var meshData = {\n          positions: Renderer.FLOAT(positions),\n          cells: Renderer.USHORT(cells),\n          uniforms: uniforms,\n          enableBlend: !!enableBlend,\n          textureCoord: Renderer.FLOAT(textureCoord)\n        };\n        meshData.cellsCount = cellsCount || meshData.cells.length;\n\n        if (instanceCount != null) {\n          if (!_this2.isWebGL2 && !_this2.aia_ext) throw new Error('Cannot use instanceCount in this rendering context, use webgl2 context instead.');else meshData.instanceCount = instanceCount;\n        }\n\n        if (attributes) {\n          var copied = {};\n          Object.entries(attributes).forEach(function (_ref5) {\n            var _ref6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref5, 2),\n                key = _ref6[0],\n                value = _ref6[1];\n\n            if (!program._attribute[key]) {\n              // throw new Error(`Invalid attribute ${key}.`);\n              if (__DEV__) console.warn(\"Ignored attribute \".concat(key, \".\"));\n              program._attribute[key] = 'ignored';\n            } else if (program._attribute[key] !== 'ignored') {\n              var _program$_attribute$k = program._attribute[key],\n                  name = _program$_attribute$k.name,\n                  type = _program$_attribute$k.type;\n              var buffer = value.data || value;\n\n              if (Array.isArray(buffer)) {\n                buffer = Renderer[type](buffer);\n              }\n\n              copied[key] = {\n                name: name,\n                data: buffer\n              };\n\n              if (value.divisor != null) {\n                if (!_this2.isWebGL2 && !_this2.aia_ext) throw new Error('Cannot use divisor in this rendering context, use webgl2 context instead.');else copied[key].divisor = value.divisor;\n              }\n            }\n          });\n          meshData.attributes = copied;\n        }\n\n        return meshData;\n      });\n      if (this.options.autoUpdate) this.update();\n    }\n  }, {\n    key: \"createProgram\",\n    value: function createProgram(fragmentShader, vertexShader) {\n      var _this3 = this;\n\n      // this.deleteProgram();\n      // this._events = {};\n      var enableTextures = /^\\s*uniform\\s+sampler2D/mg.test(fragmentShader);\n      if (fragmentShader == null) fragmentShader = _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default.a;\n      if (vertexShader == null) vertexShader = enableTextures ? _default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10___default.a : _default_vert_glsl__WEBPACK_IMPORTED_MODULE_8___default.a;\n      var gl = this.gl;\n\n      var program = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"createProgram\"])(gl, vertexShader, fragmentShader);\n\n      program.shaderText = {\n        vertexShader: vertexShader,\n        fragmentShader: fragmentShader\n      };\n      program._buffers = {};\n      program._attribute = {};\n      program.uniforms = {};\n      program._samplerMap = {};\n      program._bindTextures = [];\n      program._enableTextures = enableTextures; // console.log(vertexShader);\n\n      var pattern = new RegExp(\"attribute vec(\\\\d) \".concat(this.options.vertexPosition), 'im');\n      var matched = vertexShader.match(pattern);\n\n      if (matched) {\n        program._dimension = Number(matched[1]);\n      }\n\n      var attributePattern = /^\\s*attribute (\\w+?)(\\d*) (\\w+)/gim;\n      matched = vertexShader.match(attributePattern);\n\n      if (matched) {\n        for (var i = 0; i < matched.length; i++) {\n          var patt = /^\\s*attribute (\\w+?)(\\d*) (\\w+)/im;\n\n          var _matched = matched[i].match(patt);\n\n          if (_matched && _matched[3] !== this.options.vertexPosition && _matched[3] !== this.options.vertexTextureCoord) {\n            var _matched2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_matched, 4),\n                type = _matched2[1],\n                size = _matched2[2],\n                name = _matched2[3];\n\n            if (type === 'mat') size = Math.pow(size, 2);\n            program._buffers[name] = gl.createBuffer();\n            program._attribute[name] = {\n              name: name,\n              type: type,\n              size: Number(size) || 1\n            };\n          }\n        }\n      }\n\n      var uniformPattern = /^\\s*uniform\\s+(\\w+)\\s+(\\w+)(\\[\\d+\\])?/mg;\n      matched = vertexShader.match(uniformPattern) || [];\n      matched = matched.concat(fragmentShader.match(uniformPattern) || []);\n      matched.forEach(function (m) {\n        var _matched = m.match(/^\\s*uniform\\s+(\\w+)\\s+(\\w+)(\\[\\d+\\])?/);\n\n        var _matched$slice = _matched.slice(1),\n            _matched$slice2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_matched$slice, 3),\n            type = _matched$slice2[0],\n            name = _matched$slice2[1],\n            isTypeV = _matched$slice2[2];\n\n        type = uniformTypeMap[type];\n        isTypeV = !!isTypeV;\n\n        if (type.indexOf('Matrix') !== 0 && isTypeV) {\n          type += 'v';\n        }\n\n        _this3._declareUniform(program, name, type);\n      });\n      program._buffers.verticesBuffer = gl.createBuffer();\n      program._buffers.cellsBuffer = gl.createBuffer();\n\n      if (program._enableTextures) {\n        program._buffers.texCoordBuffer = gl.createBuffer();\n      }\n\n      this.programs.push(program);\n      return program;\n    }\n  }, {\n    key: \"useProgram\",\n    value: function useProgram(program) {\n      var attrOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      this.startRender = false;\n\n      if (this[_renderFrameID]) {\n        cancelAnimationFrame(this[_renderFrameID]);\n        delete this[_renderFrameID];\n      }\n\n      var gl = this.gl;\n      gl.useProgram(program); // this.program = program;\n\n      var dimension = program._dimension;\n      gl.bindBuffer(gl.ARRAY_BUFFER, program._buffers.verticesBuffer);\n      var vPosition = gl.getAttribLocation(program, this.options.vertexPosition);\n      gl.vertexAttribPointer(vPosition, dimension, gl.FLOAT, false, 0, 0);\n      gl.enableVertexAttribArray(vPosition);\n\n      if (program._enableTextures) {\n        gl.bindBuffer(gl.ARRAY_BUFFER, program._buffers.texCoordBuffer);\n        var vTexCoord = gl.getAttribLocation(program, this.options.vertexTextureCoord);\n        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);\n        gl.enableVertexAttribArray(vTexCoord);\n      }\n\n      Object.entries(program._attribute).forEach(function (_ref7) {\n        var _ref8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref7, 2),\n            name = _ref8[0],\n            item = _ref8[1];\n\n        if (item !== 'ignored') {\n          var size = item.size;\n          var options = attrOptions[name] || {};\n          var normalize = !!options.normalize;\n          var bufferType = options.type || 'FLOAT';\n          var key = options.key || name;\n          if (bufferType === 'UBYTE') bufferType = 'UNSIGNED_BYTE';\n          if (bufferType === 'USHORT') bufferType = 'UNSIGNED_SHORT';\n          item.type = bufferType;\n\n          if (key && key !== name) {\n            program._attribute[key] = item;\n          }\n\n          gl.bindBuffer(gl.ARRAY_BUFFER, program._buffers[name]);\n          var attrib = gl.getAttribLocation(program, name); // console.log(size, gl[bufferType]);\n\n          gl.vertexAttribPointer(attrib, size, gl[bufferType], normalize, 0, 0);\n          gl.enableVertexAttribArray(attrib);\n        }\n      });\n\n      if (!program.meshData) {\n        var positions = [[-1, -1, 0, 1].slice(0, dimension), [1, -1, 0, 1].slice(0, dimension), [1, 1, 0, 1].slice(0, dimension), [-1, 1, 0, 1].slice(0, dimension)];\n        var cells = [[0, 1, 3], [3, 1, 2]];\n        this.setMeshData({\n          positions: positions,\n          cells: cells\n        });\n      }\n\n      return program;\n    }\n  }, {\n    key: \"compileSync\",\n    value: function compileSync(frag, vert) {\n      frag = frag || _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default.a;\n      var loaded = {};\n\n      function _compile(content) {\n        content = content.replace(/^\\s*/mg, '');\n        var includes = [];\n        var matched = content.match(/^#pragma\\s+include\\s+.*/mg);\n\n        if (matched) {\n          // console.log(matched, url);\n          for (var i = 0; i < matched.length; i++) {\n            var m = matched[i];\n\n            var _matched = m.match(/(?:<|\")(.*)(?:>|\")/);\n\n            if (_matched) {\n              var type = _matched[0].indexOf('<') === 0 ? 'lib' : 'link';\n              var name = _matched[1];\n              if (name === 'graph') name = 'graphics';\n\n              if (!loaded[name]) {\n                loaded[name] = true;\n\n                if (type === 'lib') {\n                  var c = _compile(GLSL_LIBS[name]); // eslint-disable-line no-await-in-loop\n\n\n                  includes.push(c);\n                } else if (type === 'link') {\n                  throw new Error('Cannot load external links synchronously. Use compile instead of compileSync.');\n                }\n              } else {\n                includes.push(\"/* included \".concat(name, \" */\"));\n              }\n            }\n          }\n\n          includes.forEach(function (inc) {\n            content = content.replace(/^#pragma\\s+include\\s+.*/m, inc);\n          });\n        }\n\n        return content;\n      }\n\n      var fragmentShader = _compile(frag);\n\n      var vertexShader = vert ? _compile(vert) : null;\n      var program = this.createProgram(fragmentShader, vertexShader);\n      return program;\n    }\n  }, {\n    key: \"compile\",\n    value: function () {\n      var _compile2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee2(frag, vert) {\n        var loaded, _compile, _compile3, fragmentShader, vertexShader, program;\n\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _compile3 = function _compile5() {\n                  _compile3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee(content) {\n                    var includes, matched, i, m, _matched, type, name, c, _c;\n\n                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee$(_context) {\n                      while (1) {\n                        switch (_context.prev = _context.next) {\n                          case 0:\n                            content = content.replace(/^\\s*/mg, '');\n                            includes = [];\n                            matched = content.match(/^#pragma\\s+include\\s+.*/mg);\n\n                            if (!matched) {\n                              _context.next = 36;\n                              break;\n                            }\n\n                            i = 0;\n\n                          case 5:\n                            if (!(i < matched.length)) {\n                              _context.next = 35;\n                              break;\n                            }\n\n                            m = matched[i];\n                            _matched = m.match(/(?:<|\")(.*)(?:>|\")/);\n\n                            if (!_matched) {\n                              _context.next = 32;\n                              break;\n                            }\n\n                            type = _matched[0].indexOf('<') === 0 ? 'lib' : 'link';\n                            name = _matched[1];\n                            if (name === 'graph') name = 'graphics';\n\n                            if (loaded[name]) {\n                              _context.next = 31;\n                              break;\n                            }\n\n                            loaded[name] = true; // TODO: 这里可以优化成异步加载\n\n                            if (!(type === 'lib')) {\n                              _context.next = 21;\n                              break;\n                            }\n\n                            _context.next = 17;\n                            return _compile(GLSL_LIBS[name]);\n\n                          case 17:\n                            c = _context.sent;\n                            // eslint-disable-line no-await-in-loop\n                            includes.push(c);\n                            _context.next = 29;\n                            break;\n\n                          case 21:\n                            if (!(type === 'link')) {\n                              _context.next = 29;\n                              break;\n                            }\n\n                            _context.next = 24;\n                            return fetchShader(name);\n\n                          case 24:\n                            _c = _context.sent;\n                            _context.next = 27;\n                            return _compile(_c);\n\n                          case 27:\n                            _c = _context.sent;\n                            // eslint-disable-line no-await-in-loop\n                            includes.push(_c);\n\n                          case 29:\n                            _context.next = 32;\n                            break;\n\n                          case 31:\n                            includes.push(\"/* included \".concat(name, \" */\"));\n\n                          case 32:\n                            i++;\n                            _context.next = 5;\n                            break;\n\n                          case 35:\n                            includes.forEach(function (inc) {\n                              content = content.replace(/^#pragma\\s+include\\s+.*/m, inc);\n                            });\n\n                          case 36:\n                            return _context.abrupt(\"return\", content);\n\n                          case 37:\n                          case \"end\":\n                            return _context.stop();\n                        }\n                      }\n                    }, _callee);\n                  }));\n                  return _compile3.apply(this, arguments);\n                };\n\n                _compile = function _compile4(_x4) {\n                  return _compile3.apply(this, arguments);\n                };\n\n                frag = frag || _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default.a;\n                loaded = {};\n                _context2.next = 6;\n                return _compile(frag);\n\n              case 6:\n                fragmentShader = _context2.sent;\n\n                if (!vert) {\n                  _context2.next = 13;\n                  break;\n                }\n\n                _context2.next = 10;\n                return _compile(vert);\n\n              case 10:\n                _context2.t0 = _context2.sent;\n                _context2.next = 14;\n                break;\n\n              case 13:\n                _context2.t0 = null;\n\n              case 14:\n                vertexShader = _context2.t0;\n                program = this.createProgram(fragmentShader, vertexShader);\n                return _context2.abrupt(\"return\", program);\n\n              case 17:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function compile(_x2, _x3) {\n        return _compile2.apply(this, arguments);\n      }\n\n      return compile;\n    }()\n  }, {\n    key: \"load\",\n    value: function () {\n      var _load = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee3(frag) {\n        var vert,\n            _args3 = arguments;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                vert = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;\n                _context3.next = 3;\n                return fetchShader(frag);\n\n              case 3:\n                frag = _context3.sent;\n\n                if (!vert) {\n                  _context3.next = 8;\n                  break;\n                }\n\n                _context3.next = 7;\n                return fetchShader(vert);\n\n              case 7:\n                vert = _context3.sent;\n\n              case 8:\n                return _context3.abrupt(\"return\", this.compile(frag, vert));\n\n              case 9:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3, this);\n      }));\n\n      function load(_x5) {\n        return _load.apply(this, arguments);\n      }\n\n      return load;\n    }()\n  }, {\n    key: \"createTexture\",\n    value: function createTexture(img) {\n      var _this4 = this;\n\n      var gl = this.gl;\n      gl.activeTexture(gl.TEXTURE15);\n      var texture = gl.createTexture();\n      gl.bindTexture(gl.TEXTURE_2D, texture);\n      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);\n      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.\n\n      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\n      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // Prevents s-coordinate wrapping (repeating).\n\n      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // Prevents t-coordinate wrapping (repeating).\n\n      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n      texture._img = img;\n\n      texture.delete = function () {\n        _this4.deleteTexture(texture);\n      };\n\n      return texture;\n    }\n  }, {\n    key: \"deleteTexture\",\n    value: function deleteTexture(texture) {\n      var image = texture._img;\n      this.gl.deleteTexture(texture);\n\n      if (typeof image.close === 'function') {\n        // release ImageBitmap\n        image.close();\n      }\n    }\n  }, {\n    key: \"loadTexture\",\n    value: function () {\n      var _loadTexture = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.mark(function _callee4(source) {\n        var _ref9,\n            _ref9$useImageBitmap,\n            useImageBitmap,\n            img,\n            _args4 = arguments;\n\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.wrap(function _callee4$(_context4) {\n          while (1) {\n            switch (_context4.prev = _context4.next) {\n              case 0:\n                _ref9 = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {}, _ref9$useImageBitmap = _ref9.useImageBitmap, useImageBitmap = _ref9$useImageBitmap === void 0 ? true : _ref9$useImageBitmap;\n                _context4.next = 3;\n                return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"loadImage\"])(source, useImageBitmap);\n\n              case 3:\n                img = _context4.sent;\n                return _context4.abrupt(\"return\", this.createTexture(img));\n\n              case 5:\n              case \"end\":\n                return _context4.stop();\n            }\n          }\n        }, _callee4, this);\n      }));\n\n      function loadTexture(_x6) {\n        return _loadTexture.apply(this, arguments);\n      }\n\n      return loadTexture;\n    }()\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n          _ref10$clearBuffer = _ref10.clearBuffer,\n          clearBuffer = _ref10$clearBuffer === void 0 ? true : _ref10$clearBuffer;\n\n      this.startRender = true;\n      var gl = this.gl;\n      var program = this.program;\n\n      if (!program) {\n        program = this.createProgram();\n        this.useProgram(program);\n      }\n\n      if (clearBuffer) gl.clear(gl.COLOR_BUFFER_BIT);\n      var lastFrameID = this[_renderFrameID];\n\n      this._draw();\n\n      if (this[_renderFrameID] === lastFrameID) {\n        this[_renderFrameID] = null;\n      }\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      if (!this.startRender) return;\n\n      if (this[_renderFrameID] == null) {\n        this[_renderFrameID] = requestAnimationFrame(this.render.bind(this));\n      }\n    }\n  }], [{\n    key: \"addLibs\",\n    value: function addLibs() {\n      var libs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      Object.assign(GLSL_LIBS, libs);\n    }\n  }, {\n    key: \"FLOAT\",\n    value: function FLOAT(points, buffer) {\n      return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"pointsToBuffer\"])(points, Float32Array, buffer);\n    }\n  }, {\n    key: \"UNSIGNED_BYTE\",\n    value: function UNSIGNED_BYTE(points, buffer) {\n      return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"pointsToBuffer\"])(points, Uint8Array, buffer);\n    }\n  }, {\n    key: \"UNSIGNED_SHORT\",\n    value: function UNSIGNED_SHORT(points, buffer) {\n      return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"pointsToBuffer\"])(points, Uint16Array, buffer);\n    }\n  }, {\n    key: \"BYTE\",\n    value: function BYTE(points, buffer) {\n      return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"pointsToBuffer\"])(points, Int8Array, buffer);\n    }\n  }, {\n    key: \"SHORT\",\n    value: function SHORT(points, buffer) {\n      return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"pointsToBuffer\"])(points, Int16Array, buffer);\n    }\n  }, {\n    key: \"loadImage\",\n    value: function loadImage(source, useImageBitmap) {\n      return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__[\"loadImage\"])(source, useImageBitmap);\n    }\n  }]);\n\n  return Renderer;\n}();\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(Renderer, \"defaultOptions\", {\n  preserveDrawingBuffer: true,\n  autoUpdate: true,\n  vertexPosition: 'a_vertexPosition',\n  vertexTextureCoord: 'a_vertexTextureCoord',\n  webgl2: false\n});\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(Renderer, \"UBYTE\", Renderer.UNSIGNED_BYTE);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(Renderer, \"USHORT\", Renderer.UNSIGNED_SHORT);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(Renderer, \"fetchShader\", fetchShader);\n\n\n\n//# sourceURL=webpack://Doodle/./node_modules/gl-renderer/src/renderer.js?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nvar runtime = (function (exports) {\n  \"use strict\";\n\n  var Op = Object.prototype;\n  var hasOwn = Op.hasOwnProperty;\n  var undefined; // More compressible than void 0.\n  var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n  var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n  var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n\n  function define(obj, key, value) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n    return obj[key];\n  }\n  try {\n    // IE 8 has a broken Object.defineProperty that only works on DOM objects.\n    define({}, \"\");\n  } catch (err) {\n    define = function(obj, key, value) {\n      return obj[key] = value;\n    };\n  }\n\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n    var context = new Context(tryLocsList || []);\n\n    // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n    generator._invoke = makeInvokeMethod(innerFn, self, context);\n\n    return generator;\n  }\n  exports.wrap = wrap;\n\n  // Try/catch helper to minimize deoptimizations. Returns a completion\n  // record like context.tryEntries[i].completion. This interface could\n  // have been (and was previously) designed to take a closure to be\n  // invoked without arguments, but in all the cases we care about we\n  // already have an existing method we want to call, so there's no need\n  // to create a new function object. We can even get away with assuming\n  // the method takes exactly one argument, since that happens to be true\n  // in every case, so we don't have to touch the arguments object. The\n  // only additional allocation required is the completion record, which\n  // has a stable shape and so hopefully should be cheap to allocate.\n  function tryCatch(fn, obj, arg) {\n    try {\n      return { type: \"normal\", arg: fn.call(obj, arg) };\n    } catch (err) {\n      return { type: \"throw\", arg: err };\n    }\n  }\n\n  var GenStateSuspendedStart = \"suspendedStart\";\n  var GenStateSuspendedYield = \"suspendedYield\";\n  var GenStateExecuting = \"executing\";\n  var GenStateCompleted = \"completed\";\n\n  // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n  var ContinueSentinel = {};\n\n  // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n\n  // This is a polyfill for %IteratorPrototype% for environments that\n  // don't natively support it.\n  var IteratorPrototype = {};\n  define(IteratorPrototype, iteratorSymbol, function () {\n    return this;\n  });\n\n  var getProto = Object.getPrototypeOf;\n  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n  if (NativeIteratorPrototype &&\n      NativeIteratorPrototype !== Op &&\n      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n    // This environment has a native %IteratorPrototype%; use it instead\n    // of the polyfill.\n    IteratorPrototype = NativeIteratorPrototype;\n  }\n\n  var Gp = GeneratorFunctionPrototype.prototype =\n    Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = GeneratorFunctionPrototype;\n  define(Gp, \"constructor\", GeneratorFunctionPrototype);\n  define(GeneratorFunctionPrototype, \"constructor\", GeneratorFunction);\n  GeneratorFunction.displayName = define(\n    GeneratorFunctionPrototype,\n    toStringTagSymbol,\n    \"GeneratorFunction\"\n  );\n\n  // Helper for defining the .next, .throw, and .return methods of the\n  // Iterator interface in terms of a single ._invoke method.\n  function defineIteratorMethods(prototype) {\n    [\"next\", \"throw\", \"return\"].forEach(function(method) {\n      define(prototype, method, function(arg) {\n        return this._invoke(method, arg);\n      });\n    });\n  }\n\n  exports.isGeneratorFunction = function(genFun) {\n    var ctor = typeof genFun === \"function\" && genFun.constructor;\n    return ctor\n      ? ctor === GeneratorFunction ||\n        // For the native GeneratorFunction constructor, the best we can\n        // do is to check its .name property.\n        (ctor.displayName || ctor.name) === \"GeneratorFunction\"\n      : false;\n  };\n\n  exports.mark = function(genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      genFun.__proto__ = GeneratorFunctionPrototype;\n      define(genFun, toStringTagSymbol, \"GeneratorFunction\");\n    }\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  };\n\n  // Within the body of any async function, `await x` is transformed to\n  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n  // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n  // meant to be awaited.\n  exports.awrap = function(arg) {\n    return { __await: arg };\n  };\n\n  function AsyncIterator(generator, PromiseImpl) {\n    function invoke(method, arg, resolve, reject) {\n      var record = tryCatch(generator[method], generator, arg);\n      if (record.type === \"throw\") {\n        reject(record.arg);\n      } else {\n        var result = record.arg;\n        var value = result.value;\n        if (value &&\n            typeof value === \"object\" &&\n            hasOwn.call(value, \"__await\")) {\n          return PromiseImpl.resolve(value.__await).then(function(value) {\n            invoke(\"next\", value, resolve, reject);\n          }, function(err) {\n            invoke(\"throw\", err, resolve, reject);\n          });\n        }\n\n        return PromiseImpl.resolve(value).then(function(unwrapped) {\n          // When a yielded Promise is resolved, its final value becomes\n          // the .value of the Promise<{value,done}> result for the\n          // current iteration.\n          result.value = unwrapped;\n          resolve(result);\n        }, function(error) {\n          // If a rejected Promise was yielded, throw the rejection back\n          // into the async generator function so it can be handled there.\n          return invoke(\"throw\", error, resolve, reject);\n        });\n      }\n    }\n\n    var previousPromise;\n\n    function enqueue(method, arg) {\n      function callInvokeWithMethodAndArg() {\n        return new PromiseImpl(function(resolve, reject) {\n          invoke(method, arg, resolve, reject);\n        });\n      }\n\n      return previousPromise =\n        // If enqueue has been called before, then we want to wait until\n        // all previous Promises have been resolved before calling invoke,\n        // so that results are always delivered in the correct order. If\n        // enqueue has not been called before, then it is important to\n        // call invoke immediately, without waiting on a callback to fire,\n        // so that the async generator function has the opportunity to do\n        // any necessary setup in a predictable way. This predictability\n        // is why the Promise constructor synchronously invokes its\n        // executor callback, and why async functions synchronously\n        // execute code before the first await. Since we implement simple\n        // async functions in terms of async generators, it is especially\n        // important to get this right, even though it requires care.\n        previousPromise ? previousPromise.then(\n          callInvokeWithMethodAndArg,\n          // Avoid propagating failures to Promises returned by later\n          // invocations of the iterator.\n          callInvokeWithMethodAndArg\n        ) : callInvokeWithMethodAndArg();\n    }\n\n    // Define the unified helper method that is used to implement .next,\n    // .throw, and .return (see defineIteratorMethods).\n    this._invoke = enqueue;\n  }\n\n  defineIteratorMethods(AsyncIterator.prototype);\n  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {\n    return this;\n  });\n  exports.AsyncIterator = AsyncIterator;\n\n  // Note that simple async functions are implemented on top of\n  // AsyncIterator objects; they just return a Promise for the value of\n  // the final result produced by the iterator.\n  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {\n    if (PromiseImpl === void 0) PromiseImpl = Promise;\n\n    var iter = new AsyncIterator(\n      wrap(innerFn, outerFn, self, tryLocsList),\n      PromiseImpl\n    );\n\n    return exports.isGeneratorFunction(outerFn)\n      ? iter // If outerFn is a generator, return the full iterator.\n      : iter.next().then(function(result) {\n          return result.done ? result.value : iter.next();\n        });\n  };\n\n  function makeInvokeMethod(innerFn, self, context) {\n    var state = GenStateSuspendedStart;\n\n    return function invoke(method, arg) {\n      if (state === GenStateExecuting) {\n        throw new Error(\"Generator is already running\");\n      }\n\n      if (state === GenStateCompleted) {\n        if (method === \"throw\") {\n          throw arg;\n        }\n\n        // Be forgiving, per 25.3.3.3.3 of the spec:\n        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n        return doneResult();\n      }\n\n      context.method = method;\n      context.arg = arg;\n\n      while (true) {\n        var delegate = context.delegate;\n        if (delegate) {\n          var delegateResult = maybeInvokeDelegate(delegate, context);\n          if (delegateResult) {\n            if (delegateResult === ContinueSentinel) continue;\n            return delegateResult;\n          }\n        }\n\n        if (context.method === \"next\") {\n          // Setting context._sent for legacy support of Babel's\n          // function.sent implementation.\n          context.sent = context._sent = context.arg;\n\n        } else if (context.method === \"throw\") {\n          if (state === GenStateSuspendedStart) {\n            state = GenStateCompleted;\n            throw context.arg;\n          }\n\n          context.dispatchException(context.arg);\n\n        } else if (context.method === \"return\") {\n          context.abrupt(\"return\", context.arg);\n        }\n\n        state = GenStateExecuting;\n\n        var record = tryCatch(innerFn, self, context);\n        if (record.type === \"normal\") {\n          // If an exception is thrown from innerFn, we leave state ===\n          // GenStateExecuting and loop back for another invocation.\n          state = context.done\n            ? GenStateCompleted\n            : GenStateSuspendedYield;\n\n          if (record.arg === ContinueSentinel) {\n            continue;\n          }\n\n          return {\n            value: record.arg,\n            done: context.done\n          };\n\n        } else if (record.type === \"throw\") {\n          state = GenStateCompleted;\n          // Dispatch the exception by looping back around to the\n          // context.dispatchException(context.arg) call above.\n          context.method = \"throw\";\n          context.arg = record.arg;\n        }\n      }\n    };\n  }\n\n  // Call delegate.iterator[context.method](context.arg) and handle the\n  // result, either by returning a { value, done } result from the\n  // delegate iterator, or by modifying context.method and context.arg,\n  // setting context.delegate to null, and returning the ContinueSentinel.\n  function maybeInvokeDelegate(delegate, context) {\n    var method = delegate.iterator[context.method];\n    if (method === undefined) {\n      // A .throw or .return when the delegate iterator has no .throw\n      // method always terminates the yield* loop.\n      context.delegate = null;\n\n      if (context.method === \"throw\") {\n        // Note: [\"return\"] must be used for ES3 parsing compatibility.\n        if (delegate.iterator[\"return\"]) {\n          // If the delegate iterator has a return method, give it a\n          // chance to clean up.\n          context.method = \"return\";\n          context.arg = undefined;\n          maybeInvokeDelegate(delegate, context);\n\n          if (context.method === \"throw\") {\n            // If maybeInvokeDelegate(context) changed context.method from\n            // \"return\" to \"throw\", let that override the TypeError below.\n            return ContinueSentinel;\n          }\n        }\n\n        context.method = \"throw\";\n        context.arg = new TypeError(\n          \"The iterator does not provide a 'throw' method\");\n      }\n\n      return ContinueSentinel;\n    }\n\n    var record = tryCatch(method, delegate.iterator, context.arg);\n\n    if (record.type === \"throw\") {\n      context.method = \"throw\";\n      context.arg = record.arg;\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    var info = record.arg;\n\n    if (! info) {\n      context.method = \"throw\";\n      context.arg = new TypeError(\"iterator result is not an object\");\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    if (info.done) {\n      // Assign the result of the finished delegate to the temporary\n      // variable specified by delegate.resultName (see delegateYield).\n      context[delegate.resultName] = info.value;\n\n      // Resume execution at the desired location (see delegateYield).\n      context.next = delegate.nextLoc;\n\n      // If context.method was \"throw\" but the delegate handled the\n      // exception, let the outer generator proceed normally. If\n      // context.method was \"next\", forget context.arg since it has been\n      // \"consumed\" by the delegate iterator. If context.method was\n      // \"return\", allow the original .return call to continue in the\n      // outer generator.\n      if (context.method !== \"return\") {\n        context.method = \"next\";\n        context.arg = undefined;\n      }\n\n    } else {\n      // Re-yield the result returned by the delegate method.\n      return info;\n    }\n\n    // The delegate iterator is finished, so forget it and continue with\n    // the outer generator.\n    context.delegate = null;\n    return ContinueSentinel;\n  }\n\n  // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n  defineIteratorMethods(Gp);\n\n  define(Gp, toStringTagSymbol, \"Generator\");\n\n  // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn't happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n  define(Gp, iteratorSymbol, function() {\n    return this;\n  });\n\n  define(Gp, \"toString\", function() {\n    return \"[object Generator]\";\n  });\n\n  function pushTryEntry(locs) {\n    var entry = { tryLoc: locs[0] };\n\n    if (1 in locs) {\n      entry.catchLoc = locs[1];\n    }\n\n    if (2 in locs) {\n      entry.finallyLoc = locs[2];\n      entry.afterLoc = locs[3];\n    }\n\n    this.tryEntries.push(entry);\n  }\n\n  function resetTryEntry(entry) {\n    var record = entry.completion || {};\n    record.type = \"normal\";\n    delete record.arg;\n    entry.completion = record;\n  }\n\n  function Context(tryLocsList) {\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    this.tryEntries = [{ tryLoc: \"root\" }];\n    tryLocsList.forEach(pushTryEntry, this);\n    this.reset(true);\n  }\n\n  exports.keys = function(object) {\n    var keys = [];\n    for (var key in object) {\n      keys.push(key);\n    }\n    keys.reverse();\n\n    // Rather than returning an object with a next method, we keep\n    // things simple and return the next function itself.\n    return function next() {\n      while (keys.length) {\n        var key = keys.pop();\n        if (key in object) {\n          next.value = key;\n          next.done = false;\n          return next;\n        }\n      }\n\n      // To avoid creating an additional object, we just hang the .value\n      // and .done properties off the next function object itself. This\n      // also ensures that the minifier will not anonymize the function.\n      next.done = true;\n      return next;\n    };\n  };\n\n  function values(iterable) {\n    if (iterable) {\n      var iteratorMethod = iterable[iteratorSymbol];\n      if (iteratorMethod) {\n        return iteratorMethod.call(iterable);\n      }\n\n      if (typeof iterable.next === \"function\") {\n        return iterable;\n      }\n\n      if (!isNaN(iterable.length)) {\n        var i = -1, next = function next() {\n          while (++i < iterable.length) {\n            if (hasOwn.call(iterable, i)) {\n              next.value = iterable[i];\n              next.done = false;\n              return next;\n            }\n          }\n\n          next.value = undefined;\n          next.done = true;\n\n          return next;\n        };\n\n        return next.next = next;\n      }\n    }\n\n    // Return an iterator with no values.\n    return { next: doneResult };\n  }\n  exports.values = values;\n\n  function doneResult() {\n    return { value: undefined, done: true };\n  }\n\n  Context.prototype = {\n    constructor: Context,\n\n    reset: function(skipTempReset) {\n      this.prev = 0;\n      this.next = 0;\n      // Resetting context._sent for legacy support of Babel's\n      // function.sent implementation.\n      this.sent = this._sent = undefined;\n      this.done = false;\n      this.delegate = null;\n\n      this.method = \"next\";\n      this.arg = undefined;\n\n      this.tryEntries.forEach(resetTryEntry);\n\n      if (!skipTempReset) {\n        for (var name in this) {\n          // Not sure about the optimal order of these conditions:\n          if (name.charAt(0) === \"t\" &&\n              hasOwn.call(this, name) &&\n              !isNaN(+name.slice(1))) {\n            this[name] = undefined;\n          }\n        }\n      }\n    },\n\n    stop: function() {\n      this.done = true;\n\n      var rootEntry = this.tryEntries[0];\n      var rootRecord = rootEntry.completion;\n      if (rootRecord.type === \"throw\") {\n        throw rootRecord.arg;\n      }\n\n      return this.rval;\n    },\n\n    dispatchException: function(exception) {\n      if (this.done) {\n        throw exception;\n      }\n\n      var context = this;\n      function handle(loc, caught) {\n        record.type = \"throw\";\n        record.arg = exception;\n        context.next = loc;\n\n        if (caught) {\n          // If the dispatched exception was caught by a catch block,\n          // then let that catch block handle the exception normally.\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n\n        return !! caught;\n      }\n\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        var record = entry.completion;\n\n        if (entry.tryLoc === \"root\") {\n          // Exception thrown outside of any try block that could handle\n          // it, so set the completion value of the entire function to\n          // throw the exception.\n          return handle(\"end\");\n        }\n\n        if (entry.tryLoc <= this.prev) {\n          var hasCatch = hasOwn.call(entry, \"catchLoc\");\n          var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n          if (hasCatch && hasFinally) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            } else if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else if (hasCatch) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            }\n\n          } else if (hasFinally) {\n            if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else {\n            throw new Error(\"try statement without catch or finally\");\n          }\n        }\n      }\n    },\n\n    abrupt: function(type, arg) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc <= this.prev &&\n            hasOwn.call(entry, \"finallyLoc\") &&\n            this.prev < entry.finallyLoc) {\n          var finallyEntry = entry;\n          break;\n        }\n      }\n\n      if (finallyEntry &&\n          (type === \"break\" ||\n           type === \"continue\") &&\n          finallyEntry.tryLoc <= arg &&\n          arg <= finallyEntry.finallyLoc) {\n        // Ignore the finally entry if control is not jumping to a\n        // location outside the try/catch block.\n        finallyEntry = null;\n      }\n\n      var record = finallyEntry ? finallyEntry.completion : {};\n      record.type = type;\n      record.arg = arg;\n\n      if (finallyEntry) {\n        this.method = \"next\";\n        this.next = finallyEntry.finallyLoc;\n        return ContinueSentinel;\n      }\n\n      return this.complete(record);\n    },\n\n    complete: function(record, afterLoc) {\n      if (record.type === \"throw\") {\n        throw record.arg;\n      }\n\n      if (record.type === \"break\" ||\n          record.type === \"continue\") {\n        this.next = record.arg;\n      } else if (record.type === \"return\") {\n        this.rval = this.arg = record.arg;\n        this.method = \"return\";\n        this.next = \"end\";\n      } else if (record.type === \"normal\" && afterLoc) {\n        this.next = afterLoc;\n      }\n\n      return ContinueSentinel;\n    },\n\n    finish: function(finallyLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.finallyLoc === finallyLoc) {\n          this.complete(entry.completion, entry.afterLoc);\n          resetTryEntry(entry);\n          return ContinueSentinel;\n        }\n      }\n    },\n\n    \"catch\": function(tryLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc === tryLoc) {\n          var record = entry.completion;\n          if (record.type === \"throw\") {\n            var thrown = record.arg;\n            resetTryEntry(entry);\n          }\n          return thrown;\n        }\n      }\n\n      // The context.catch method must only be called with a location\n      // argument that corresponds to a known catch block.\n      throw new Error(\"illegal catch attempt\");\n    },\n\n    delegateYield: function(iterable, resultName, nextLoc) {\n      this.delegate = {\n        iterator: values(iterable),\n        resultName: resultName,\n        nextLoc: nextLoc\n      };\n\n      if (this.method === \"next\") {\n        // Deliberately forget the last sent value so that we don't\n        // accidentally pass it on to the delegate.\n        this.arg = undefined;\n      }\n\n      return ContinueSentinel;\n    }\n  };\n\n  // Regardless of whether this script is executing as a CommonJS module\n  // or not, return the runtime object so that we can declare the variable\n  // regeneratorRuntime in the outer scope, which allows this module to be\n  // injected easily by `bin/regenerator --include-runtime script.js`.\n  return exports;\n\n}(\n  // If this script is executing as a CommonJS module, use module.exports\n  // as the regeneratorRuntime namespace. Otherwise create a new empty\n  // object. Either way, the resulting object will be used to initialize\n  // the regeneratorRuntime variable at the top of this file.\n   true ? module.exports : undefined\n));\n\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  // This module should not be running in strict mode, so the above\n  // assignment should always work unless something is misconfigured. Just\n  // in case runtime.js accidentally runs in strict mode, in modern engines\n  // we can explicitly access globalThis. In older engines we can escape\n  // strict mode using a global Function call. This could conceivably fail\n  // if a Content Security Policy forbids using Function, but in that case\n  // the proper solution is to fix the accidental strict mode problem. If\n  // you've misconfigured your bundler to force strict mode and applied a\n  // CSP to forbid Function, and you're not willing to fix either of those\n  // problems, please detail your unique predicament in a GitHub issue.\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://Doodle/./node_modules/regenerator-runtime/runtime.js?");

/***/ }),

/***/ "./src/doodle.js":
/*!***********************!*\
  !*** ./src/doodle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Doodle; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var gl_renderer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gl-renderer */ \"./node_modules/gl-renderer/src/index.js\");\n/* harmony import */ var _lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/stdlib.glsl */ \"./src/lib/stdlib.glsl\");\n/* harmony import */ var _lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/shapes.glsl */ \"./src/lib/shapes.glsl\");\n/* harmony import */ var _lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/shaper.glsl */ \"./src/lib/shaper.glsl\");\n/* harmony import */ var _lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _lib_box_glsl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/box.glsl */ \"./src/lib/box.glsl\");\n/* harmony import */ var _lib_box_glsl__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_lib_box_glsl__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/transform.glsl */ \"./src/lib/transform.glsl\");\n/* harmony import */ var _lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lib/graph.glsl */ \"./src/lib/graph.glsl\");\n/* harmony import */ var _lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _lib_color_glsl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lib/color.glsl */ \"./src/lib/color.glsl\");\n/* harmony import */ var _lib_color_glsl__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_lib_color_glsl__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./lib/pattern.glsl */ \"./src/lib/pattern.glsl\");\n/* harmony import */ var _lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18__);\n\n\n\n\n\n\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\n\n\n\n\n\n\ngl_renderer__WEBPACK_IMPORTED_MODULE_10__[\"default\"].addLibs({\n  stdlib: _lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11___default.a,\n  box: _lib_box_glsl__WEBPACK_IMPORTED_MODULE_14___default.a,\n  transform: _lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15___default.a,\n  graphics: _lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16___default.a,\n  color: _lib_color_glsl__WEBPACK_IMPORTED_MODULE_17___default.a,\n  pattern: _lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18___default.a,\n  shapes: _lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12___default.a,\n  shaper: _lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13___default.a\n});\n\nvar _eventHandlers = Symbol('eventHandlers');\n\nfunction getPointerXY(canvas, e) {\n  var _e$target$getBounding = e.target.getBoundingClientRect(),\n      left = _e$target$getBounding.left,\n      top = _e$target$getBounding.top;\n\n  var _ref = e.changedTouches ? e.changedTouches[0] : e,\n      clientX = _ref.clientX,\n      clientY = _ref.clientY;\n\n  var x = (clientX - left) / canvas.clientWidth;\n  var y = 1.0 - (clientY - top) / canvas.clientHeight;\n  return [x, y];\n}\n\nvar Doodle = /*#__PURE__*/function (_GlRender) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Doodle, _GlRender);\n\n  var _super = _createSuper(Doodle);\n\n  function Doodle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Doodle);\n\n    return _super.apply(this, arguments);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Doodle, [{\n    key: \"compile\",\n    value: function () {\n      var _compile = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee(frag, vert) {\n        var _this = this;\n\n        var program, fragmentShader, matches;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Doodle.prototype), \"compile\", this).call(this, frag, vert);\n\n              case 2:\n                program = _context.sent;\n                fragmentShader = program.shaderText.fragmentShader;\n                matches = fragmentShader.match(/^#pragma\\s+texture\\s+.*/mg);\n\n                if (!matches) {\n                  _context.next = 9;\n                  break;\n                }\n\n                _context.next = 8;\n                return Promise.all(matches.map(function (m) {\n                  var p = m.match(/^#pragma\\s+texture\\s+(.*)/);\n                  return _this.loadTexture(p[1]);\n                }));\n\n              case 8:\n                this._preloadedTextures = _context.sent;\n\n              case 9:\n                return _context.abrupt(\"return\", program);\n\n              case 10:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function compile(_x, _x2) {\n        return _compile.apply(this, arguments);\n      }\n\n      return compile;\n    }()\n  }, {\n    key: \"setFeebackContext\",\n    value: function setFeebackContext() {\n      if (!this.options.preserveDrawingBuffer) {\n        throw new Error('Must set preserveDrawingBuffer to true while using feedback mode.');\n      }\n\n      if (!this.feedbackContext) {\n        var canvas;\n\n        if (typeof OffscreenCanvas === 'function') {\n          canvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);\n        } else {\n          canvas = this.canvas.cloneNode();\n        }\n\n        this.feedbackContext = canvas.getContext('2d');\n      }\n    }\n  }, {\n    key: \"useProgram\",\n    value: function useProgram(program, attrOptions) {\n      var _this2 = this;\n\n      var gl = this.gl;\n      var canvas = gl.canvas;\n\n      if (this[_eventHandlers]) {\n        this[_eventHandlers].forEach(function (_ref2) {\n          var event = _ref2.event,\n              handler = _ref2.handler;\n          if (event === 'keydown' || event === 'keyup') document.removeEventListener(event, handler);else canvas.removeEventListener(event, handler);\n        });\n      }\n\n      delete this.startRenderTime;\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Doodle.prototype), \"useProgram\", this).call(this, program, attrOptions);\n\n      this[_eventHandlers] = [];\n\n      if (this._preloadedTextures) {\n        this._preloadedTextures.forEach(function (texture, i) {\n          var samplerID = \"dd_sampler\".concat(i);\n\n          if (samplerID in program.uniforms) {\n            program.uniforms[samplerID] = texture;\n          }\n        });\n\n        delete this._preloadedTextures;\n      }\n\n      var uniforms = this.uniforms;\n\n      if ('dd_frameIndex' in uniforms) {\n        this.uniforms.dd_frameIndex = 0;\n      }\n\n      if ('dd_randseed0' in uniforms) {\n        this.uniforms.dd_randseed0 = [Math.random(), Math.random()];\n      }\n\n      if ('dd_randseed' in uniforms) {\n        this.uniforms.dd_randseed = this.uniforms.dd_randseed0 || [Math.random(), Math.random()];\n      }\n\n      if ('dd_resolution' in uniforms) {\n        this.uniforms.dd_resolution = [canvas.width, canvas.height];\n      }\n\n      if ('dd_mouseEvent' in uniforms) {\n        // 0 - none, 1 - mousedown 2 - mouseup 3 - mousewheel\n        this.uniforms.dd_mouseEvent = 0;\n\n        var mousedown = function mousedown() {\n          _this2.uniforms.dd_mouseEvent = 1;\n        };\n\n        var mouseup = function mouseup() {\n          _this2.uniforms.dd_mouseEvent = 2;\n        };\n\n        var mousewheel = function mousewheel() {\n          _this2.uniforms.dd_mouseEvent = 3;\n        };\n\n        canvas.addEventListener('mousedown', mousedown);\n        canvas.addEventListener('mouseup', mouseup);\n        canvas.addEventListener('mousewheel', mousewheel);\n\n        this[_eventHandlers].push({\n          event: 'mousedown',\n          mousedown: mousedown\n        }, {\n          event: 'mouseup',\n          mouseup: mouseup\n        }, {\n          event: 'mousewheel',\n          mousewheel: mousewheel\n        });\n      }\n\n      if ('dd_mousePosition' in uniforms) {\n        this.uniforms.dd_mousePosition = [-1.0, -1.0];\n\n        var mousemove = function mousemove(e) {\n          var _getPointerXY = getPointerXY(canvas, e),\n              _getPointerXY2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getPointerXY, 2),\n              x = _getPointerXY2[0],\n              y = _getPointerXY2[1];\n\n          _this2.uniforms.dd_mousePosition = [x, y];\n        };\n\n        var mouseleave = function mouseleave(e) {\n          _this2.uniforms.dd_mousePosition = [-1.0, -1.0];\n        };\n\n        canvas.addEventListener('mousemove', mousemove);\n        canvas.addEventListener('mouseleave', mouseleave);\n\n        this[_eventHandlers].push({\n          event: 'mousemove',\n          mousemove: mousemove\n        }, {\n          event: 'mouseleave',\n          mouseleave: mouseleave\n        });\n      }\n\n      if ('dd_mouseButtons' in uniforms) {\n        this.uniforms.dd_mouseButtons = 0;\n\n        var mouseenter = function mouseenter(e) {\n          _this2.uniforms.dd_mouseButtons = e.buttons;\n        };\n\n        var _mousedown = function _mousedown(e) {\n          _this2.uniforms.dd_mouseButtons = e.buttons;\n        };\n\n        var _mouseup = function _mouseup(e) {\n          _this2.uniforms.dd_mouseButtons = e.buttons;\n        };\n\n        var _mouseleave = function _mouseleave(e) {\n          _this2.uniforms.dd_mouseButtons = 0;\n        };\n\n        canvas.addEventListener('mouseenter', mouseenter);\n        canvas.addEventListener('mousedown', _mousedown);\n        canvas.addEventListener('mouseup', _mouseup);\n        canvas.addEventListener('mouseleave', _mouseleave);\n\n        this[_eventHandlers].push({\n          event: 'mouseenter',\n          mouseenter: mouseenter\n        }, {\n          event: 'mousedown',\n          mousedown: _mousedown\n        }, {\n          event: 'mouseup',\n          mouseup: _mouseup\n        }, {\n          event: 'mouseleave',\n          mouseleave: _mouseleave\n        });\n      }\n\n      if ('dd_keyEvent' in uniforms) {\n        // 0 - none, 1 - keydown, 2 - keyup\n        this.uniforms.dd_keyEvent = 0;\n\n        var keydown = function keydown(e) {\n          _this2.uniforms.dd_keyEvent = 1;\n        };\n\n        var keyup = function keyup(e) {\n          _this2.uniforms.dd_keyEvent = 2;\n        };\n\n        document.addEventListener('keydown', keydown);\n        document.addEventListener('keyup', keyup);\n\n        this[_eventHandlers].push({\n          event: 'keydown',\n          keydown: keydown\n        }, {\n          event: 'keyup',\n          keyup: keyup\n        });\n      }\n\n      if ('dd_keyCode' in uniforms) {\n        this.uniforms.dd_keyCode = 0;\n\n        var _keydown = function _keydown(e) {\n          _this2.uniforms.dd_keyCode = e.keyCode;\n        };\n\n        var _keyup = function _keyup(e) {\n          _this2.uniforms.dd_keyCode = 0;\n        };\n\n        document.addEventListener('keydown', _keydown);\n        document.addEventListener('keyup', _keyup);\n\n        this[_eventHandlers].push({\n          event: 'keydown',\n          keydown: _keydown\n        }, {\n          event: 'keyup',\n          keyup: _keyup\n        });\n      } // TODO: support multi-touches\n\n\n      if ('dd_touchPosition' in uniforms) {\n        this.uniforms.dd_touchPosition = [-1.0, -1.0];\n\n        var touchstart = function touchstart(e) {\n          var _getPointerXY3 = getPointerXY(canvas, e),\n              _getPointerXY4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getPointerXY3, 2),\n              x = _getPointerXY4[0],\n              y = _getPointerXY4[1];\n\n          _this2.uniforms.dd_touchPosition = [x, y];\n        };\n\n        var touchmove = function touchmove(e) {\n          var _getPointerXY5 = getPointerXY(canvas, e),\n              _getPointerXY6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getPointerXY5, 2),\n              x = _getPointerXY6[0],\n              y = _getPointerXY6[1];\n\n          _this2.uniforms.dd_touchPosition = [x, y];\n        };\n\n        var touchend = function touchend(e) {\n          _this2.uniforms.dd_touchPosition = [-1.0, -1.0];\n        };\n\n        canvas.addEventListener('touchstart', touchstart);\n        canvas.addEventListener('touchmove', touchmove);\n        canvas.addEventListener('touchend', touchend);\n\n        this[_eventHandlers].push({\n          event: 'touchstart',\n          touchstart: touchstart\n        }, {\n          event: 'touchmove',\n          touchmove: touchmove\n        }, {\n          event: 'touchend',\n          touchend: touchend\n        });\n      }\n\n      if ('dd_touchEvent' in uniforms) {\n        // 0 - none, 1 - touchstart, 2 - touchend, 3 - touchmove\n        var _touchstart = function _touchstart(e) {\n          _this2.uniforms.dd_touchEvent = 1;\n        };\n\n        var _touchmove = function _touchmove(e) {\n          _this2.uniforms.dd_touchEvent = 3;\n        };\n\n        var _touchend = function _touchend(e) {\n          _this2.uniforms.dd_touchEvent = 2;\n        };\n\n        canvas.addEventListener('touchstart', _touchstart);\n        canvas.addEventListener('touchmove', _touchmove);\n        canvas.addEventListener('touchend', _touchend);\n\n        this[_eventHandlers].push({\n          event: 'touchstart',\n          touchstart: _touchstart\n        }, {\n          event: 'touchmove',\n          touchmove: _touchmove\n        }, {\n          event: 'touchend',\n          touchend: _touchend\n        });\n      }\n\n      if ('dd_samplerFeedback' in uniforms) {\n        this.setFeebackContext();\n      }\n\n      return program;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      if (!this.startRenderTime) this.startRenderTime = Date.now();\n      var time = (Date.now() - this.startRenderTime) / 1000;\n      var uniforms = this.uniforms;\n      var gl = this.gl;\n\n      if ('dd_time' in uniforms) {\n        this.uniforms.dd_time = time;\n      }\n\n      var feedbackTexture;\n\n      if ('dd_samplerFeedback' in uniforms) {\n        var context = this.feedbackContext;\n        context.canvas.width = gl.canvas.width;\n        context.canvas.height = gl.canvas.height;\n        context.drawImage(gl.canvas, 0, 0);\n        feedbackTexture = this.createTexture(context.canvas);\n        uniforms.dd_samplerFeedback = feedbackTexture;\n      }\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Doodle.prototype), \"render\", this).call(this);\n\n      if (feedbackTexture) {\n        gl.deleteTexture(feedbackTexture);\n      }\n\n      if ('dd_time' in uniforms) {\n        this.update();\n      }\n\n      if ('dd_frameIndex' in uniforms) {\n        this.uniforms.dd_frameIndex++;\n      }\n\n      if ('dd_randseed' in uniforms) {\n        this.uniforms.dd_randseed = [Math.random(), Math.random()];\n      }\n\n      if ('dd_mouseEvent' in uniforms) {\n        this.uniforms.dd_mouseEvent = 0;\n      }\n\n      if ('dd_keyEvent' in uniforms) {\n        this.uniforms.dd_keyEvent = 0;\n      }\n\n      if ('dd_touchEvent' in uniforms) {\n        this.uniforms.dd_touchEvent = 0;\n      }\n    }\n  }], [{\n    key: \"autoLoad\",\n    value: function autoLoad() {\n      function load() {\n        var doodleElement = document.querySelectorAll('glsl-doodle');\n        doodleElement.forEach( /*#__PURE__*/function () {\n          var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.mark(function _callee2(el) {\n            var root, canvas, doodle, fragmentEl, vertexEl, fragment, vertex, fragmentURL, process, vertexURL, program;\n            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_9___default.a.wrap(function _callee2$(_context2) {\n              while (1) {\n                switch (_context2.prev = _context2.next) {\n                  case 0:\n                    if (!el.getAttribute('loaded')) {\n                      _context2.next = 2;\n                      break;\n                    }\n\n                    return _context2.abrupt(\"return\");\n\n                  case 2:\n                    root = el;\n\n                    if (el.attachShadow) {\n                      root = el.attachShadow({\n                        mode: 'open'\n                      });\n                    } else if (el.createShadowRoot) {\n                      root = el.createShadowRoot();\n                    }\n\n                    canvas = document.createElement('canvas');\n                    canvas.width = el.getAttribute('width') || 512;\n                    canvas.height = el.getAttribute('height') || 512;\n                    root.appendChild(canvas);\n                    el.setAttribute('loaded', 'loaded');\n                    doodle = new Doodle(canvas);\n                    fragmentEl = el.getAttribute('fragment-for') || el.getAttribute('for');\n                    vertexEl = el.getAttribute('vertex-for');\n                    fragment = null;\n                    vertex = null;\n\n                    if (!fragmentEl) {\n                      _context2.next = 18;\n                      break;\n                    }\n\n                    fragment = document.getElementById(fragmentEl).textContent;\n                    _context2.next = 23;\n                    break;\n\n                  case 18:\n                    fragmentURL = el.getAttribute('fragment-src') || el.getAttribute('src') || './index.glsl';\n                    _context2.next = 21;\n                    return gl_renderer__WEBPACK_IMPORTED_MODULE_10__[\"default\"].fetchShader(fragmentURL);\n\n                  case 21:\n                    fragment = _context2.sent;\n\n                    if (/\\.js$/.test(fragmentURL)) {\n                      // eslint-disable-next-line no-new-func\n                      process = new Function('shader', fragment);\n                      process(function (strings) {\n                        fragment = strings.join('');\n                      });\n                    }\n\n                  case 23:\n                    if (!vertexEl) {\n                      _context2.next = 27;\n                      break;\n                    }\n\n                    vertex = vertexEl.textContent;\n                    _context2.next = 32;\n                    break;\n\n                  case 27:\n                    vertexURL = el.getAttribute('vert-src');\n\n                    if (!vertexURL) {\n                      _context2.next = 32;\n                      break;\n                    }\n\n                    _context2.next = 31;\n                    return gl_renderer__WEBPACK_IMPORTED_MODULE_10__[\"default\"].fetchShader(vertexURL);\n\n                  case 31:\n                    vertex = _context2.sent;\n\n                  case 32:\n                    _context2.next = 34;\n                    return doodle.compile(fragment, vertex);\n\n                  case 34:\n                    program = _context2.sent;\n                    doodle.useProgram(program);\n                    doodle.render();\n\n                  case 37:\n                  case \"end\":\n                    return _context2.stop();\n                }\n              }\n            }, _callee2);\n          }));\n\n          return function (_x3) {\n            return _ref3.apply(this, arguments);\n          };\n        }());\n      }\n\n      load();\n      window.addEventListener('DOMContentLoaded', load);\n    }\n  }]);\n\n  return Doodle;\n}(gl_renderer__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\n\n_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(Doodle, \"defaultOptions\", {\n  preserveDrawingBuffer: true\n});\n\n\n\n//# sourceURL=webpack://Doodle/./src/doodle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Doodle = __webpack_require__(/*! ./doodle */ \"./src/doodle.js\").default;\n\nDoodle.autoLoad();\n/* harmony default export */ __webpack_exports__[\"default\"] = (Doodle);\n\n//# sourceURL=webpack://Doodle/./src/index.js?");

/***/ }),

/***/ "./src/lib/box.glsl":
/*!**************************!*\
  !*** ./src/lib/box.glsl ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef MOD_BOX\\n#define MOD_BOX\\nstruct box2 {\\n\\tvec2 a;\\n\\tvec2 b;\\n\\tvec2 c;\\n\\tvec2 d;\\n};\\nvec2 center(box2 box) {\\n\\treturn (box.a + box.c) * 0.5;\\n}\\nbox2 create_box(vec2 point, float w, float h, vec2 anchor) {\\n\\tvec2 size = vec2(w, h);\\n\\tvec2 a = point + (size * (vec2(0.0) - anchor));\\n\\tvec2 b = point + (size * (vec2(1.0, 0.0) - anchor));\\n\\tvec2 c = point + (size * (vec2(1.0) - anchor));\\n\\tvec2 d = point + (size * (vec2(0.0, 1.0) - anchor));\\n\\treturn box2(a, b, c, d);\\n}\\nbox2 create_box(vec2 point, float w, float h) {\\n\\treturn create_box(point, w, h, vec2(0.0));\\n}\\nbox2 create_box(vec2 point, float wh) {\\n\\treturn create_box(point, wh, wh, vec2(0.0));\\n}\\nbox2 create_box(float w, float h) {\\n\\treturn create_box(vec2(0.0), w, h, vec2(0.0));\\n}\\nbox2 create_box(float wh) {\\n\\treturn create_box(vec2(0.0), wh, wh, vec2(0.0));\\n}\\nbox2 create_box() {\\n\\treturn create_box(vec2(0.0), 1.0, 1.0, vec2(0.0));\\n}\\nvec2 box_quad(vec2 p, box2 box) {\\n\\tvec2 a = box.a;\\n\\tvec2 b = box.b;\\n\\tvec2 c = box.c;\\n\\tvec2 d = box.d;\\n\\tfloat d1 = sdf_line(p, a, b);\\n\\tfloat d2 = sdf_line(p, b, c);\\n\\tfloat d3 = sdf_line(p, c, d);\\n\\tfloat d4 = sdf_line(p, d, a);\\n\\tif (((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) && (d4 >= 0.0)) || ((((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0)) && (d4 <= 0.0))) {\\n\\t\\tvec2 v1 = b - a;\\n\\t\\tvec2 v2 = d - a;\\n\\t\\tvec2 vp = p - a;\\n\\t\\tfloat l1 = length(v1);\\n\\t\\tfloat l2 = length(v2);\\n\\t\\tfloat p1 = dot(vp, v1) / l1;\\n\\t\\tfloat p2 = dot(vp, v2) / l2;\\n\\t\\tfloat ang = angle(v2, v1);\\n\\t\\tfloat x = p1 - (abs(d1) / tan(ang));\\n\\t\\tfloat y = p2 - (abs(d4) / tan(ang));\\n\\t\\tx /= l1;\\n\\t\\ty /= l2;\\n\\t\\treturn vec2(x, y);\\n\\t}\\n\\treturn vec2(-1.0);\\n}\\nbox2 transform(box2 box, mat3 matrix) {\\n\\treturn box2(transform(box.a, matrix), transform(box.b, matrix), transform(box.c, matrix), transform(box.d, matrix));\\n}\\nbox2 translate(box2 box, vec2 xy) {\\n\\treturn box2(translate(box.a, xy), translate(box.b, xy), translate(box.c, xy), translate(box.d, xy));\\n}\\nbox2 scale(box2 box, vec2 origin, vec2 scaleXY) {\\n\\treturn box2(scale(box.a, origin, scaleXY), scale(box.b, origin, scaleXY), scale(box.c, origin, scaleXY), scale(box.d, origin, scaleXY));\\n}\\nbox2 scale(box2 box, vec2 scaleXY) {\\n\\treturn box2(scale(box.a, scaleXY), scale(box.b, scaleXY), scale(box.c, scaleXY), scale(box.d, scaleXY));\\n}\\nbox2 rotate(box2 box, vec2 origin, float ang) {\\n\\treturn box2(rotate(box.a, origin, ang), rotate(box.b, origin, ang), rotate(box.c, origin, ang), rotate(box.d, origin, ang));\\n}\\nbox2 rotate(box2 box, float ang) {\\n\\treturn box2(rotate(box.a, ang), rotate(box.b, ang), rotate(box.c, ang), rotate(box.d, ang));\\n}\\nbox2 skew(box2 box, vec2 origin, vec2 skewXY) {\\n\\treturn box2(skew(box.a, origin, skewXY), skew(box.b, origin, skewXY), skew(box.c, origin, skewXY), skew(box.d, origin, skewXY));\\n}\\nbox2 skew(box2 box, vec2 skewXY) {\\n\\treturn box2(skew(box.a, skewXY), skew(box.b, skewXY), skew(box.c, skewXY), skew(box.d, skewXY));\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/box.glsl?");

/***/ }),

/***/ "./src/lib/color.glsl":
/*!****************************!*\
  !*** ./src/lib/color.glsl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef M_COLOR\\n#define M_COLOR\\n#ifndef UDF\\n#define UDF float\\n#endif\\nvec3 rgb2hsb(vec3 c) {\\n\\tvec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\\n\\tvec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\\n\\tvec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\\n\\tfloat d = q.x - min(q.w, q.y);\\n\\tfloat e = 1.0e-10;\\n\\treturn vec3(abs(q.z + ((q.w - q.y) / ((6.0 * d) + e))), d / (q.x + e), q.x);\\n}\\nvec3 hsb2rgb(vec3 c) {\\n\\tvec3 rgb = clamp(abs(mod((c.x * 6.0) + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\\n\\trgb = (rgb * rgb) * (3.0 - (2.0 * rgb));\\n\\treturn c.z * mix(vec3(1.0), rgb, c.y);\\n}\\nvec4 rgba_color(int r, int g, int b, float a) {\\n\\treturn vec4(float(r / 255), float(g / 255), float(b / 255), a);\\n}\\nvec4 rgba_color(float r, float g, float b, float a) {\\n\\treturn vec4(r, g, b, a);\\n}\\nvec4 rgba_color(vec4 v) {\\n\\treturn v;\\n}\\nvec4 rgba_color(vec3 v, float a) {\\n\\treturn vec4(v, a);\\n}\\nvec3 rgb_color(int r, int g, int b) {\\n\\treturn rgba_color(r, g, b, 1.0).rgb;\\n}\\nvec3 rgb_color(float r, float g, float b) {\\n\\treturn rgba_color(r, g, b, 1.0).rgb;\\n}\\nvec3 rgb_color(vec3 v) {\\n\\treturn vec4(v, 1.0).rgb;\\n}\\nvec4 hsba_color(float h, float s, float b, float a) {\\n\\treturn vec4(hsb2rgb(vec3(h, s, b)), a);\\n}\\nvec4 hsba_color(vec4 v) {\\n\\treturn vec4(hsb2rgb(v.xyz), v.w);\\n}\\nvec4 hsba_color(vec3 v, float a) {\\n\\treturn vec4(hsb2rgb(v), a);\\n}\\nvec3 hsb_color(float h, float s, float b) {\\n\\treturn hsba_color(h, s, b, 1.0).rgb;\\n}\\nvec3 hsb_color(vec3 v) {\\n\\treturn hsba_color(v, 1.0).rgb;\\n}\\n#ifndef RGB\\n#define RGB rgb_color\\n#endif\\n#ifndef RGBA\\n#define RGBA rgba_color\\n#endif\\n#ifndef HSB\\n#define HSB hsb_color\\n#endif\\n#ifndef HSBA\\n#define HSBA hsba_color\\n#endif\\nvoid color(UDF d, vec4 c1, vec4 c2) {\\n\\tgl_FragColor = mix(c2, c1, d);\\n}\\nvoid color(UDF d, vec4 c1, vec3 c2) {\\n\\tcolor(d, c1, vec4(c2, 1.0));\\n}\\nvoid color(UDF d, vec3 c1, vec4 c2) {\\n\\tcolor(d, vec4(c1, 1.0), c2);\\n}\\nvoid color(UDF d, vec3 c1, vec3 c2) {\\n\\tcolor(d, vec4(c1, 1.0), vec4(c2, 1.0));\\n}\\nvoid color(UDF d, vec4 c) {\\n\\tcolor(d, c, gl_FragColor);\\n}\\nvoid color(UDF d, vec3 c) {\\n\\tcolor(d, vec4(c, 1.0), gl_FragColor);\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/color.glsl?");

/***/ }),

/***/ "./src/lib/graph.glsl":
/*!****************************!*\
  !*** ./src/lib/graph.glsl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef M_GRAPH\\n#define M_GRAPH\\n#pragma include <stdlib>\\n#pragma include <shaper>\\n#pragma include <transform>\\n#ifndef SDF\\n#define SDF float\\n#endif\\n#ifndef UDF\\n#define UDF float\\n#endif\\n#ifndef PLOT\\n#define PLOT(f, st, step) sdf_plot(st, vec2(st.x - step, f(st.x - step)), vec2(st.x, f(st.x)), vec2(st.x + step, f(st.x + step)))\\n#endif\\n#ifndef SPRITE\\n#define SPRITE(quad, f) if(quad.x >= 0.0 && quad.x <= 1.0) f(quad);\\n#endif\\nSDF sdf_line(vec2 p, vec2 v1, vec2 v2) {\\n\\tvec2 pd = p - v1;\\n\\tvec2 pd2 = p - v2;\\n\\tvec2 seg = v2 - v1;\\n\\treturn ((pd.x * seg.y) - (pd.y * seg.x)) / length(seg);\\n}\\nSDF sdf_line(vec2 p, vec2 v) {\\n\\treturn sdf_line(p, vec2(0), v);\\n}\\nSDF sdf_seg(vec2 p, vec2 v1, vec2 v2) {\\n\\tvec2 pd = p - v1;\\n\\tvec2 pd2 = p - v2;\\n\\tvec2 seg = v2 - v1;\\n\\tfloat l = length(seg);\\n\\tfloat d = abs((pd.x * seg.y) - (pd.y * seg.x)) / l;\\n\\tfloat proj = ((pd.x * seg.x) + (pd.y * seg.y)) / l;\\n\\tif ((proj >= 0.0) && (proj <= l))\\n\\t\\treturn d;\\n\\treturn min(length(pd), length(pd2));\\n}\\nSDF sdf_seg(vec2 p, vec2 v) {\\n\\treturn sdf_seg(p, vec2(0), v);\\n}\\nSDF sdf_plot(vec2 p, vec2 v1, vec2 v2, vec2 v3) {\\n\\tfloat d1 = sdf_seg(p, v1, v2);\\n\\tfloat d2 = sdf_seg(p, v2, v3);\\n\\treturn min(d1, d2);\\n}\\nUDF stroke(SDF d, float d0, float w, float smth) {\\n\\tfloat th = 0.5 * w;\\n\\tsmth = smth * w;\\n\\tfloat start = d0 - th;\\n\\tfloat end = d0 + th;\\n\\treturn smoothstep(start, start + smth, d) - smoothstep(end - smth, end, d);\\n}\\nUDF stroke(SDF d, float w, float smth) {\\n\\treturn stroke(d, 0.0, w, smth);\\n}\\nUDF stroke(SDF d, float w) {\\n\\treturn stroke(d, 0.0, w, 0.0);\\n}\\nSDF sdf_triangle(vec2 st, vec2 a, vec2 b, vec2 c) {\\n\\tvec2 va = a - b;\\n\\tvec2 vb = b - c;\\n\\tvec2 vc = c - a;\\n\\tfloat d1 = sdf_line(st, a, b);\\n\\tfloat d2 = sdf_line(st, b, c);\\n\\tfloat d3 = sdf_line(st, c, a);\\n\\tfloat l = abs((va.x * vb.y) - (va.y * vb.x)) / ((length(va) + length(vb)) + length(vc));\\n\\tif ((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) || (((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0))) {\\n\\t\\treturn min(abs(d1), min(abs(d2), abs(d3))) / l;\\n\\t}\\n\\td1 = sdf_seg(st, a, b);\\n\\td2 = sdf_seg(st, b, c);\\n\\td3 = sdf_seg(st, c, a);\\n\\treturn -min(abs(d1), min(abs(d2), abs(d3))) / l;\\n}\\nSDF sdf_rect(vec2 st, vec2 p, float w, float h) {\\n\\tvec2 a = p;\\n\\tvec2 b = p + vec2(w, 0.0);\\n\\tvec2 c = p + vec2(w, h);\\n\\tvec2 d = p + vec2(0.0, h);\\n\\tfloat d1 = sdf_line(st, a, b);\\n\\tfloat d2 = sdf_line(st, b, c);\\n\\tfloat d3 = sdf_line(st, c, d);\\n\\tfloat d4 = sdf_line(st, d, a);\\n\\tfloat l = min(w, h) * 0.5;\\n\\tif (((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) && (d4 >= 0.0)) || ((((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0)) && (d4 <= 0.0))) {\\n\\t\\treturn min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\\n\\t}\\n\\td1 = sdf_seg(st, a, b);\\n\\td2 = sdf_seg(st, b, c);\\n\\td3 = sdf_seg(st, c, d);\\n\\td4 = sdf_seg(st, d, a);\\n\\treturn -min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\\n}\\nSDF sdf_circle(vec2 st, vec2 c, float r) {\\n\\treturn 1.0 - (length(st - c) / r);\\n}\\nSDF sdf_ellipse(vec2 st, vec2 c, float a, float b) {\\n\\tvec2 p = st - c;\\n\\treturn 1.0 - sqrt(pow(p.x / a, 2.0) + pow(p.y / b, 2.0));\\n}\\nSDF sdf_ellipse(vec2 st, vec2 c, float a, float b, float sAng, float eAng) {\\n\\tvec2 ua = vec2(cos(sAng), sin(sAng));\\n\\tvec2 ub = vec2(cos(eAng), sin(eAng));\\n\\tfloat d1 = sdf_line(st, c, ua + c);\\n\\tfloat d2 = sdf_line(st, c, ub + c);\\n\\tfloat d3 = sdf_ellipse(st, c, a, b);\\n\\tfloat r = min(a, b);\\n\\tvec2 v = st - c;\\n\\tfloat ang = angle(v, vec2(1.0, 0));\\n\\tif ((eAng - sAng) > (2.0 * PI)) {\\n\\t\\treturn d3;\\n\\t}\\n\\tif ((ang >= sAng) && (ang <= eAng)) {\\n\\t\\tfloat m = max(a, b);\\n\\t\\tfloat d11 = sdf_seg(st, c, (ua * m) + c);\\n\\t\\tfloat d12 = sdf_seg(st, c, (ub * m) + c);\\n\\t\\tif (d3 >= 0.0) {\\n\\t\\t\\treturn min(abs(d11 / r), min(abs(d12 / r), d3));\\n\\t\\t}\\n\\t\\treturn d3;\\n\\t}\\n\\tfloat pa = dot(ua, v);\\n\\tfloat pb = dot(ub, v);\\n\\tif ((pa < 0.0) && (pb < 0.0)) {\\n\\t\\treturn -length(st - c) / r;\\n\\t}\\n\\tif ((d1 > 0.0) && (pa >= 0.0)) {\\n\\t\\tvec2 va = pa * ua;\\n\\t\\tfloat da = pow(va.x / a, 2.0) + pow(va.y / b, 2.0);\\n\\t\\tif ((d3 > 0.0) || (da <= pow(1.0 + abs(d1 / r), 2.0))) {\\n\\t\\t\\treturn -abs(d1 / r);\\n\\t\\t}\\n\\t\\telse {\\n\\t\\t\\treturn d3;\\n\\t\\t}\\n\\t}\\n\\tif ((d2 < 0.0) && (pb >= 0.0)) {\\n\\t\\tvec2 vb = pb * ub;\\n\\t\\tfloat db = pow(vb.x / a, 2.0) + pow(vb.y / b, 2.0);\\n\\t\\tif ((d3 >= 0.0) || (db <= pow(1.0 + abs(d2 / r), 2.0))) {\\n\\t\\t\\treturn -abs(d2 / r);\\n\\t\\t}\\n\\t\\telse {\\n\\t\\t\\treturn d3;\\n\\t\\t}\\n\\t}\\n}\\nSDF sdf_arc(vec2 st, vec2 c, float r, float sAng, float eAng) {\\n\\treturn sdf_ellipse(st, c, r, r, sAng, eAng);\\n}\\nSDF sdf_rhombus(vec2 st, vec2 cr, float w, float h) {\\n\\tvec2 a = cr - vec2(0.5 * w, 0);\\n\\tvec2 b = cr - vec2(0, 0.5 * h);\\n\\tvec2 c = cr + vec2(0.5 * w, 0);\\n\\tvec2 d = cr + vec2(0, 0.5 * h);\\n\\tvec2 va = a - b;\\n\\tvec2 vb = b - c;\\n\\tvec2 vc = c - d;\\n\\tvec2 vd = d - a;\\n\\tfloat d1 = sdf_line(st, a, b);\\n\\tfloat d2 = sdf_line(st, b, c);\\n\\tfloat d3 = sdf_line(st, c, d);\\n\\tfloat d4 = sdf_line(st, d, a);\\n\\tfloat l = min(w, h) * 0.5;\\n\\tif (((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) && (d4 >= 0.0)) || ((((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0)) && (d4 <= 0.0))) {\\n\\t\\treturn min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\\n\\t}\\n\\td1 = sdf_seg(st, a, b);\\n\\td2 = sdf_seg(st, b, c);\\n\\td3 = sdf_seg(st, c, d);\\n\\td4 = sdf_seg(st, d, a);\\n\\treturn -min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\\n}\\nSDF regular_polygon(vec2 st, vec2 center, float r, float rotation, const int edges, bool hypocycloid) {\\n\\tvec2 p = st - center;\\n\\tvec2 v0 = vec2(0, r);\\n\\tv0 = rotate(v0, -rotation);\\n\\tfloat a = (2.0 * PI) / float(edges);\\n\\tfloat ang = angle(v0, p);\\n\\tang = floor(ang / a);\\n\\tvec2 v1 = rotate(v0, a * ang);\\n\\tvec2 v2 = rotate(v0, a * (ang + 1.0));\\n\\tfloat c_a = cos(0.5 * a);\\n\\tfloat l = r * c_a;\\n\\tfloat d = sdf_line(p, v1, v2);\\n\\tif (hypocycloid && (d >= 0.0)) {\\n\\t\\tvec2 c = (v1 + v2) / 2.0;\\n\\t\\tfloat r2 = r * tan(0.5 * a);\\n\\t\\tvec2 ce = c / (c_a * c_a);\\n\\t\\td = (distance(p, ce) - r2) / (length(ce) - r2);\\n\\t\\treturn d;\\n\\t}\\n\\treturn d / l;\\n}\\nSDF regular_polygon(vec2 st, vec2 center, float r, float rotation, const int edges) {\\n\\treturn regular_polygon(st, center, r, rotation, edges, false);\\n}\\nSDF regular_polygon(vec2 st, vec2 center, float r, const int edges, bool hypocycloid) {\\n\\treturn regular_polygon(st, center, r, 0.0, edges, true);\\n}\\nSDF regular_polygon(vec2 st, vec2 center, float r, const int edges) {\\n\\treturn regular_polygon(st, center, r, 0.0, edges, false);\\n}\\nUDF fill(SDF d, float start, float end, float smth_start, float smth_end) {\\n\\tsmth_start = (end - start) * smth_start;\\n\\tsmth_end = (end - start) * smth_end;\\n\\treturn smoothstep(start, start + smth_start, d) - smoothstep(end - smth_end, end, d);\\n}\\nUDF fill(SDF d, float start, float end, float smth) {\\n\\treturn fill(d, start, end, smth, smth);\\n}\\nUDF fill(SDF d, float start, float smth) {\\n\\treturn fill(d, start, 1.0, smth, 0.0);\\n}\\nUDF fill(SDF d, float smth) {\\n\\treturn fill(d, 0.0, 1.0, smth, 0.0);\\n}\\nUDF fill(SDF d) {\\n\\treturn fill(d, 0.0, 1.0, 0.0, 0.0);\\n}\\nUDF udf_intersect(UDF d1, UDF d2) {\\n\\tif ((d1 > 0.0) && (d2 > 0.0)) {\\n\\t\\treturn min(d1, d2);\\n\\t}\\n\\treturn 0.0;\\n}\\nUDF udf_union(UDF d1, UDF d2) {\\n\\tif ((d1 > 0.0) || (d2 > 0.0)) {\\n\\t\\treturn max(d1, d2);\\n\\t}\\n\\treturn 0.0;\\n}\\nUDF udf_complement(UDF d1, UDF d2) {\\n\\tif (((d1 > 0.0) && (d2 == 0.0)) || ((d1 == 0.0) && (d2 > 0.0)))\\n\\t\\treturn 1.0;\\n\\treturn 0.0;\\n}\\n#pragma include <box>\\n#pragma include <shapes>\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/graph.glsl?");

/***/ }),

/***/ "./src/lib/pattern.glsl":
/*!******************************!*\
  !*** ./src/lib/pattern.glsl ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef M_PATTERN\\n#define M_PATTERN\\nvec2 grid_xy(vec2 st, vec2 grid) {\\n\\treturn fract(st * grid);\\n}\\nvoid grid_overlap(vec2 st, vec2 grid, inout vec2 overlap[4]) {\\n\\tvec2 v = fract(st * grid);\\n\\toverlap[0] = v;\\n\\toverlap[1] = v - vec2(1.0, 0.0);\\n\\toverlap[2] = v - vec2(0.0, 1.0);\\n\\toverlap[3] = v - vec2(1.0, 1.0);\\n}\\nvec2 grid_index(vec2 st, vec2 grid) {\\n\\treturn floor(st * grid);\\n}\\nbool grid_odd_row(vec2 idx, vec2 grid) {\\n\\treturn mod(idx.y, 2.0) != 0.0;\\n}\\nbool grid_even_row(vec2 idx, vec2 grid) {\\n\\treturn mod(idx.y, 2.0) == 0.0;\\n}\\nbool grid_odd_col(vec2 idx, vec2 grid) {\\n\\treturn mod(idx.x, 2.0) != 0.0;\\n}\\nbool grid_even_col(vec2 idx, vec2 grid) {\\n\\treturn mod(idx.x, 2.0) == 0.0;\\n}\\nbool grid_odd(vec2 idx, vec2 grid) {\\n\\treturn ((mod(idx.x, 2.0) != 0.0) && (mod(idx.y, 2.0) == 0.0)) || ((mod(idx.x, 2.0) == 0.0) && (mod(idx.y, 2.0) != 0.0));\\n}\\nbool grid_even(vec2 idx, vec2 grid) {\\n\\treturn !grid_odd(idx, grid);\\n}\\n#ifndef OCTAVES\\n#define OCTAVES 6\\n#endif\\nfloat mist(vec2 st) {\\n\\tfloat value = 0.0;\\n\\tfloat amplitude = 0.5;\\n\\tfloat frequency = 0.0;\\n\\tfor (int i = 0; i < OCTAVES; i++) {\\n\\t\\tvalue += (amplitude * noise(st));\\n\\t\\tst *= 2.0;\\n\\t\\tamplitude *= 0.5;\\n\\t}\\n\\treturn value;\\n}\\nfloat juila_set(vec2 st, vec2 center, float dist, vec2 c, float scale) {\\n\\tconst int max_iterations = 255;\\n\\tvec2 uv = 2.5 * (st - center);\\n\\tint count = max_iterations;\\n\\tfor (int i = 0; i < max_iterations; i++) {\\n\\t\\tuv = c + vec2((uv.x * uv.x) - (uv.y * uv.y), (uv.x * uv.y) * 2.0);\\n\\t\\tif (dot(uv, uv) > 4.0) {\\n\\t\\t\\tcount = i;\\n\\t\\t\\tbreak;\\n\\t\\t}\\n\\t}\\n\\treturn float(count) * scale;\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/pattern.glsl?");

/***/ }),

/***/ "./src/lib/shaper.glsl":
/*!*****************************!*\
  !*** ./src/lib/shaper.glsl ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef M_SHAPER\\n#define M_SHAPER\\nfloat quadratic_bezier(float x, float a, float b) {\\n\\tfloat epsilon = 0.00001;\\n\\ta = max(0.0, min(1.0, a));\\n\\tb = max(0.0, min(1.0, b));\\n\\tif (a == 0.5) {\\n\\t\\ta += epsilon;\\n\\t}\\n\\tfloat om2a = 1.0 - (2.0 * a);\\n\\tfloat t = (sqrt((a * a) + (om2a * x)) - a) / om2a;\\n\\tfloat y = ((1.0 - (2.0 * b)) * (t * t)) + ((2.0 * b) * t);\\n\\treturn y;\\n}\\nfloat slope_from_t(float t, float A, float B, float C) {\\n\\tfloat dtdx = 1.0 / (((((3.0 * A) * t) * t) + ((2.0 * B) * t)) + C);\\n\\treturn dtdx;\\n}\\nfloat x_from_t(float t, float A, float B, float C, float D) {\\n\\tfloat x = (((A * ((t * t) * t)) + (B * (t * t))) + (C * t)) + D;\\n\\treturn x;\\n}\\nfloat y_from_t(float t, float E, float F, float G, float H) {\\n\\tfloat y = (((E * ((t * t) * t)) + (F * (t * t))) + (G * t)) + H;\\n\\treturn y;\\n}\\nfloat cubic_bezier(float x, float a, float b, float c, float d) {\\n\\tfloat y0a = 0.00;\\n\\tfloat x0a = 0.00;\\n\\tfloat y1a = b;\\n\\tfloat x1a = a;\\n\\tfloat y2a = d;\\n\\tfloat x2a = c;\\n\\tfloat y3a = 1.00;\\n\\tfloat x3a = 1.00;\\n\\tfloat A = ((x3a - (3.0 * x2a)) + (3.0 * x1a)) - x0a;\\n\\tfloat B = ((3.0 * x2a) - (6.0 * x1a)) + (3.0 * x0a);\\n\\tfloat C = (3.0 * x1a) - (3.0 * x0a);\\n\\tfloat D = x0a;\\n\\tfloat E = ((y3a - (3.0 * y2a)) + (3.0 * y1a)) - y0a;\\n\\tfloat F = ((3.0 * y2a) - (6.0 * y1a)) + (3.0 * y0a);\\n\\tfloat G = (3.0 * y1a) - (3.0 * y0a);\\n\\tfloat H = y0a;\\n\\tfloat currentt = x;\\n\\tconst int nRefinementIterations = 5;\\n\\tfor (int i = 0; i < nRefinementIterations; i++) {\\n\\t\\tfloat currentx = x_from_t(currentt, A, B, C, D);\\n\\t\\tfloat currentslope = slope_from_t(currentt, A, B, C);\\n\\t\\tcurrentt -= ((currentx - x) * currentslope);\\n\\t\\tcurrentt = clamp(currentt, 0.0, 1.0);\\n\\t}\\n\\tfloat y = y_from_t(currentt, E, F, G, H);\\n\\treturn y;\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/shaper.glsl?");

/***/ }),

/***/ "./src/lib/shapes.glsl":
/*!*****************************!*\
  !*** ./src/lib/shapes.glsl ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef MOD_SHAPES\\n#define MOD_SHAPES\\nUDF shape_blade(vec2 st, vec2 center, float num) {\\n\\tvec2 pt = polar(st, vec2(center));\\n\\tfloat x = pt.x;\\n\\tfloat y = cos(pt.y * num);\\n\\treturn smoothstep(x - 0.01, x + 0.01, y);\\n}\\nUDF shape_blade3(vec2 st, vec2 center) {\\n\\treturn shape_blade(st, center, 3.0);\\n}\\nUDF shape_blade3(vec2 st) {\\n\\treturn shape_blade(st, vec2(0.5), 3.0);\\n}\\nUDF shape_blade4(vec2 st, vec2 center) {\\n\\treturn shape_blade(st, center, 4.0);\\n}\\nUDF shape_blade4(vec2 st) {\\n\\treturn shape_blade(st, vec2(0.5), 4.0);\\n}\\nUDF shape_blade5(vec2 st, vec2 center) {\\n\\treturn shape_blade(st, center, 5.0);\\n}\\nUDF shape_blade5(vec2 st) {\\n\\treturn shape_blade(st, vec2(0.5), 5.0);\\n}\\nUDF shape_infinity(vec2 st, vec2 center) {\\n\\treturn shape_blade(st, center, 2.0);\\n}\\nUDF shape_infinity(vec2 st) {\\n\\treturn shape_blade(st, vec2(0.5), 2.0);\\n}\\nUDF shape_clover(vec2 st, vec2 center, float num) {\\n\\tvec2 pt = polar(st, vec2(center));\\n\\tfloat x = pt.x;\\n\\tfloat y = abs(cos((pt.y * num) * 0.5));\\n\\treturn smoothstep(x - 0.01, x + 0.01, y);\\n}\\nUDF shape_bean(vec2 st, vec2 center) {\\n\\treturn shape_clover(st, center, 1.0);\\n}\\nUDF shape_bean(vec2 st) {\\n\\treturn shape_clover(st, vec2(0.5), 1.0);\\n}\\nUDF shape_apple(vec2 st, vec2 center) {\\n\\treturn shape_clover(vec2(st.y - 0.2, st.x), center, 1.3);\\n}\\nUDF shape_apple(vec2 st) {\\n\\treturn shape_clover(vec2(st.y - 0.2, st.x), vec2(0.5), 1.3);\\n}\\nUDF shape_clover3(vec2 st, vec2 center) {\\n\\treturn shape_clover(st, center, 3.0);\\n}\\nUDF shape_clover3(vec2 st) {\\n\\treturn shape_clover(st, vec2(0.5), 3.0);\\n}\\nUDF shape_clover4(vec2 st, vec2 center) {\\n\\treturn shape_clover(st, center, 4.0);\\n}\\nUDF shape_clover4(vec2 st) {\\n\\treturn shape_clover(st, vec2(0.5), 4.0);\\n}\\nUDF shape_clover5(vec2 st, vec2 center) {\\n\\treturn shape_clover(st, center, 5.0);\\n}\\nUDF shape_clover5(vec2 st) {\\n\\treturn shape_clover(st, vec2(0.5), 5.0);\\n}\\nUDF shape_flower(vec2 st, vec2 center, float num) {\\n\\tvec2 pt = polar(st, vec2(center));\\n\\tfloat x = pt.x;\\n\\tfloat y = (abs(cos((pt.y * num) * 0.5)) * 0.5) + 0.3;\\n\\treturn smoothstep(x - 0.01, x + 0.01, y);\\n}\\nUDF shape_gourd(vec2 st, vec2 center) {\\n\\treturn shape_flower(vec2(st.y, st.x), center, 1.7);\\n}\\nUDF shape_gourd(vec2 st) {\\n\\treturn shape_flower(vec2(st.y, st.x), vec2(0.5), 1.7);\\n}\\nUDF shape_flower3(vec2 st, vec2 center) {\\n\\treturn shape_flower(st, center, 3.0);\\n}\\nUDF shape_flower3(vec2 st) {\\n\\treturn shape_flower(st, vec2(0.5), 3.0);\\n}\\nUDF shape_flower4(vec2 st, vec2 center) {\\n\\treturn shape_flower(st, center, 4.0);\\n}\\nUDF shape_flower4(vec2 st) {\\n\\treturn shape_flower(st, vec2(0.5), 4.0);\\n}\\nUDF shape_flower5(vec2 st, vec2 center) {\\n\\treturn shape_flower(st, center, 5.0);\\n}\\nUDF shape_flower5(vec2 st) {\\n\\treturn shape_flower(st, vec2(0.5), 5.0);\\n}\\nUDF shape_bud(vec2 st, vec2 center, float num) {\\n\\tvec2 pt = polar(st, vec2(center));\\n\\tfloat x = pt.x;\\n\\tfloat y = (smoothstep(-0.5, 1.0, cos(pt.y * num)) * 0.2) + 0.5;\\n\\treturn smoothstep(x - 0.01, x + 0.01, y);\\n}\\nUDF shape_bud5(vec2 st, vec2 center) {\\n\\treturn shape_bud(st, center, 5.0);\\n}\\nUDF shape_bud5(vec2 st) {\\n\\treturn shape_bud(st, vec2(0.5), 5.0);\\n}\\nUDF shape_bud8(vec2 st, vec2 center) {\\n\\treturn shape_bud(st, center, 8.0);\\n}\\nUDF shape_bud8(vec2 st) {\\n\\treturn shape_bud(st, vec2(0.5), 8.0);\\n}\\nUDF shape_bud10(vec2 st, vec2 center) {\\n\\treturn shape_bud(st, center, 10.0);\\n}\\nUDF shape_bud10(vec2 st) {\\n\\treturn shape_bud(st, vec2(0.5), 10.0);\\n}\\nUDF shape_bud12(vec2 st, vec2 center) {\\n\\treturn shape_bud(st, center, 12.0);\\n}\\nUDF shape_bud12(vec2 st) {\\n\\treturn shape_bud(st, vec2(0.5), 12.0);\\n}\\nUDF shape_star(vec2 st, vec2 center) {\\n\\tfloat r = 0.45;\\n\\tfloat d = regular_polygon(st, center, r, 5);\\n\\tfloat a = (-2.0 * PI) / 5.0;\\n\\td = fill(d, 0.01);\\n\\tvec2 v0 = vec2(0, r);\\n\\tfor (int i = 0; i < 5; i++) {\\n\\t\\tvec2 v1 = rotate(v0, float(i) * a);\\n\\t\\tvec2 v2 = rotate(v0, float(i + 1) * a);\\n\\t\\tfloat l = length(v2 - v1);\\n\\t\\tfloat c = 0.5 / cos(PI / 5.0);\\n\\t\\tvec2 p = rotate(v2, v1, -PI / 5.0);\\n\\t\\tp += ((1.0 - c) * (v1 - p));\\n\\t\\tfloat d2 = sdf_triangle(st - center, v1, v2, p);\\n\\t\\td2 = fill(d2, 0.01);\\n\\t\\td = udf_complement(d, d2);\\n\\t}\\n\\treturn d;\\n}\\nUDF shape_regular_polygon(vec2 st, vec2 center, const int edges) {\\n\\tfloat d = regular_polygon(st, center, 0.45, edges);\\n\\treturn fill(d, 0.01);\\n}\\nUDF shape_star(vec2 st) {\\n\\treturn shape_star(st, vec2(0.5));\\n}\\nUDF shape_triangle(vec2 st, vec2 center) {\\n\\treturn shape_regular_polygon(st, center, 3);\\n}\\nUDF shape_triangle(vec2 st) {\\n\\treturn shape_regular_polygon(st, vec2(0.5), 3);\\n}\\nUDF shape_rhombus(vec2 st, vec2 center) {\\n\\treturn shape_regular_polygon(st, center, 4);\\n}\\nUDF shape_rhombus(vec2 st) {\\n\\treturn shape_regular_polygon(st, vec2(0.5), 4);\\n}\\nUDF shape_pentagon(vec2 st, vec2 center) {\\n\\treturn shape_regular_polygon(st, center, 5);\\n}\\nUDF shape_pentagon(vec2 st) {\\n\\treturn shape_regular_polygon(st, vec2(0.5), 5);\\n}\\nUDF shape_hexagon(vec2 st, vec2 center) {\\n\\treturn shape_regular_polygon(st, center, 6);\\n}\\nUDF shape_hexagon(vec2 st) {\\n\\treturn shape_regular_polygon(st, vec2(0.5), 6);\\n}\\nUDF shape_heptagon(vec2 st, vec2 center) {\\n\\treturn shape_regular_polygon(st, center, 7);\\n}\\nUDF shape_heptagon(vec2 st) {\\n\\treturn shape_regular_polygon(st, vec2(0.5), 7);\\n}\\nUDF shape_octagon(vec2 st, vec2 center) {\\n\\treturn shape_regular_polygon(st, center, 8);\\n}\\nUDF shape_octagon(vec2 st) {\\n\\treturn shape_regular_polygon(st, vec2(0.5), 8);\\n}\\nUDF shape_hypocycloid(vec2 st, vec2 center, const int edges) {\\n\\tfloat d = regular_polygon(st, center, 0.45, edges, true);\\n\\treturn fill(d, 0.01);\\n}\\nUDF shape_hypocycloid(vec2 st, const int edges) {\\n\\treturn shape_hypocycloid(st, vec2(0.5), edges);\\n}\\nUDF shape_cross(vec2 st, vec2 center, float w, float h) {\\n\\tvec2 p1 = center - (0.5 * vec2(w, h));\\n\\tvec2 p2 = center - (0.5 * vec2(h, w));\\n\\tfloat d1 = sdf_rect(st, p1, w, h);\\n\\tfloat d2 = sdf_rect(st, p2, h, w);\\n\\treturn fill(udf_union(d1, d2), 0.01);\\n}\\nUDF shape_cross(vec2 st, vec2 center) {\\n\\treturn shape_cross(st, center, 0.8, 0.2);\\n}\\nUDF shape_cross(vec2 st, float w, float h) {\\n\\treturn shape_cross(st, vec2(0.5), w, h);\\n}\\nUDF shape_cross(vec2 st) {\\n\\treturn shape_cross(st, vec2(0.5), 0.8, 0.2);\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/shapes.glsl?");

/***/ }),

/***/ "./src/lib/stdlib.glsl":
/*!*****************************!*\
  !*** ./src/lib/stdlib.glsl ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef M_STDLIB\\n#define M_STDLIB\\n#ifndef PI\\n#define PI 3.141592653589793\\n#endif\\n#ifndef FLT_EPSILON\\n#define FLT_EPSILON 0.000001\\n#endif\\nfloat atan2(float dy, float dx) {\\n\\tfloat ax = abs(dx);\\n\\tfloat ay = abs(dy);\\n\\tfloat a = min(ax, ay) / (max(ax, ay) + FLT_EPSILON);\\n\\tfloat s = a * a;\\n\\tfloat r = ((((((-0.0464964749 * s) + 0.15931422) * s) - 0.327622764) * s) * a) + a;\\n\\tif (ay > ax)\\n\\t\\tr = 1.57079637 - r;\\n\\tif (dx < 0.0)\\n\\t\\tr = PI - r;\\n\\tif (dy < 0.0)\\n\\t\\tr = -r;\\n\\treturn r;\\n}\\nfloat atan2(vec2 v) {\\n\\treturn atan2(v.y, v.x);\\n}\\nfloat angle(vec2 v1, vec2 v2) {\\n\\tfloat ang = atan2(v1) - atan2(v2);\\n\\tif (ang < 0.0)\\n\\t\\tang += (2.0 * PI);\\n\\treturn ang;\\n}\\nfloat angle(vec2 v) {\\n\\treturn angle(v, vec2(1.0, 0.0));\\n}\\nvec2 center(vec2 v) {\\n\\treturn v * 0.5;\\n}\\nvec2 center(vec2 v1, vec2 v2) {\\n\\treturn (v1 + v2) * 0.5;\\n}\\nhighp float random(vec2 co) {\\n\\thighp float a = 12.9898;\\n\\thighp float b = 78.233;\\n\\thighp float c = 43758.5453;\\n\\thighp float dt = dot(co.xy, vec2(a, b));\\n\\thighp float sn = mod(dt, 3.14);\\n\\treturn fract(sin(sn) * c);\\n}\\nhighp float random(vec2 st, float a, float b) {\\n\\thighp float p = random(st);\\n\\treturn mix(a, b, p);\\n}\\nhighp vec2 random2(vec2 st) {\\n\\thighp vec2 v = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));\\n\\treturn -1.0 + (2.0 * fract(sin(v) * 43758.5453123));\\n}\\nhighp vec3 random3(vec2 st) {\\n\\thighp vec3 v = vec3(random2(st), random(st));\\n\\treturn v;\\n}\\nhighp float noise(vec2 st) {\\n\\tvec2 i = floor(st);\\n\\tvec2 f = fract(st);\\n\\tvec2 u = (f * f) * (3.0 - (2.0 * f));\\n\\treturn mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x), mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);\\n}\\nhighp float noise(vec3 p) {\\n\\tvec3 i = floor(p);\\n\\tvec4 a = dot(i, vec3(1.0, 57.0, 21.0)) + vec4(0.0, 57.0, 21.0, 78.0);\\n\\tvec3 f = (cos((p - i) * acos(-1.0)) * -0.5) + 0.5;\\n\\ta = mix(sin(cos(a) * a), sin(cos(1.0 + a) * (1.0 + a)), f.x);\\n\\ta.xy = mix(a.xz, a.yw, f.y);\\n\\treturn mix(a.x, a.y, f.z);\\n}\\nvec2 polar(vec2 st, vec2 c) {\\n\\tvec2 p = c - st;\\n\\tfloat r = length(p) * 2.0;\\n\\tfloat a = atan(p.y, p.x);\\n\\treturn vec2(r, a);\\n}\\nvec2 polar(vec2 st) {\\n\\treturn polar(st, vec2(0.5));\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/stdlib.glsl?");

/***/ }),

/***/ "./src/lib/transform.glsl":
/*!********************************!*\
  !*** ./src/lib/transform.glsl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#ifndef MOD_TRANSFORM\\n#define MOD_TRANSFORM\\nvec2 transform(vec2 v0, mat3 matrix) {\\n\\treturn vec2(matrix * vec3(v0, 1.0));\\n}\\nvec2 translate(vec2 v0, vec2 xy) {\\n\\tmat3 m = mat3(1, 0, 0, 0, 1, 0, xy.x, xy.y, 1);\\n\\treturn transform(v0, m);\\n}\\nvec2 scale(vec2 v0, vec2 origin, vec2 scale) {\\n\\tmat3 m = mat3(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);\\n\\treturn transform(v0 - origin, m) + origin;\\n}\\nvec2 scale(vec2 v0, vec2 scaleXY) {\\n\\treturn scale(v0, vec2(0.0), scaleXY);\\n}\\nvec2 rotate(vec2 v0, vec2 origin, float ang) {\\n\\tfloat sinA = sin(ang);\\n\\tfloat cosA = cos(ang);\\n\\tmat3 m = mat3(cosA, -sinA, 0, sinA, cosA, 0, 0, 0, 1);\\n\\treturn transform(v0 - origin, m) + origin;\\n}\\nvec2 rotate(vec2 v0, float ang) {\\n\\treturn rotate(v0, vec2(0.0), ang);\\n}\\nvec2 skew(vec2 v0, vec2 origin, vec2 skew) {\\n\\tmat3 m = mat3(1, tan(skew.y), 0, tan(skew.x), 1, 0, 0, 0, 1);\\n\\treturn transform(v0 - origin, m) + origin;\\n}\\nvec2 skew(vec2 v0, vec2 skewXY) {\\n\\treturn skew(v0, vec2(0.0), skewXY);\\n}\\n#endif\\n\"\n\n//# sourceURL=webpack://Doodle/./src/lib/transform.glsl?");

/***/ })

/******/ })["default"];
});