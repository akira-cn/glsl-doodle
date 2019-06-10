(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Doodle"] = factory();
	else
		root["Doodle"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
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
/******/ 	var hotCurrentHash = "d12b9103c14ad9c633ed";
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
/******/ 	var hotUpdate, hotUpdateNewHash;
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
/******/ 				hotSetStatus("idle");
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
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
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
/******/ 			var queue = outdatedModules.slice().map(function(id) {
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
/******/ 				if (!module || module.hot._selfAccepted) continue;
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
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
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
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
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
/******/ 			hotCurrentParents = [moduleId];
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
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
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
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Doodle = __webpack_require__(1).default;

Doodle.autoLoad();
module.exports = Doodle;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Doodle; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
/* harmony import */ var _default_vert_glsl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var _default_vert_glsl__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_default_vert_glsl__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_default_frag_glsl__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(19);
/* harmony import */ var _default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(20);
/* harmony import */ var _lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(21);
/* harmony import */ var _lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22);
/* harmony import */ var _lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _lib_box_glsl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(23);
/* harmony import */ var _lib_box_glsl__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_lib_box_glsl__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(24);
/* harmony import */ var _lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(25);
/* harmony import */ var _lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _lib_color_glsl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(26);
/* harmony import */ var _lib_color_glsl__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_lib_color_glsl__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(27);
/* harmony import */ var _lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18__);



















var GLSL_LIBS = {
  stdlib: _lib_stdlib_glsl__WEBPACK_IMPORTED_MODULE_11___default.a,
  box: _lib_box_glsl__WEBPACK_IMPORTED_MODULE_14___default.a,
  transform: _lib_transform_glsl__WEBPACK_IMPORTED_MODULE_15___default.a,
  graphics: _lib_graph_glsl__WEBPACK_IMPORTED_MODULE_16___default.a,
  color: _lib_color_glsl__WEBPACK_IMPORTED_MODULE_17___default.a,
  pattern: _lib_pattern_glsl__WEBPACK_IMPORTED_MODULE_18___default.a,
  shapes: _lib_shapes_glsl__WEBPACK_IMPORTED_MODULE_12___default.a,
  shaper: _lib_shaper_glsl__WEBPACK_IMPORTED_MODULE_13___default.a
};

var _renderFeedback = Symbol('renderFeedback');

var _autoUpdate = Symbol('autoUpdate');

var _animationFrameID = Symbol('animationFrameID');

var _eventHandlers = Symbol('eventHandlers');

var _textures = Symbol('textures');

function fetchShader(_x) {
  return _fetchShader.apply(this, arguments);
}

function _fetchShader() {
  _fetchShader = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6(url) {
    var res, content;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return fetch(url);

          case 2:
            res = _context6.sent;

            if (!(res.status === 404)) {
              _context6.next = 7;
              break;
            }

            content = _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default.a;
            _context6.next = 10;
            break;

          case 7:
            _context6.next = 9;
            return res.text();

          case 9:
            content = _context6.sent;

          case 10:
            return _context6.abrupt("return", content);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _fetchShader.apply(this, arguments);
}

var Doodle =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Doodle, null, [{
    key: "autoLoad",
    value: function autoLoad() {
      window.addEventListener('DOMContentLoaded', function (e) {
        var doodleCanvas = document.querySelectorAll('canvas.glsl-doodle');
        doodleCanvas.forEach(
        /*#__PURE__*/
        function () {
          var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default()(
          /*#__PURE__*/
          _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(canvas) {
            var textures, doodle, fragmentEl, vertexEl, fragment, vertex, fragmentURL, vertexURL;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    textures = canvas.getAttribute('data-textures');
                    doodle = new Doodle(canvas);

                    if (!textures) {
                      _context.next = 6;
                      break;
                    }

                    textures = textures.split(/\s*,\s*/g);
                    _context.next = 6;
                    return doodle.loadTextures.apply(doodle, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(textures));

                  case 6:
                    fragmentEl = canvas.getAttribute('data-fragment-for');
                    vertexEl = canvas.getAttribute('data-vertex-for');
                    fragment = null;
                    vertex = null;

                    if (!fragmentEl) {
                      _context.next = 14;
                      break;
                    }

                    fragment = document.getElementById(fragmentEl).textContent;
                    _context.next = 18;
                    break;

                  case 14:
                    fragmentURL = canvas.getAttribute('data-fragment-url') || './index.glsl';
                    _context.next = 17;
                    return fetchShader(fragmentURL);

                  case 17:
                    fragment = _context.sent;

                  case 18:
                    if (!vertexEl) {
                      _context.next = 22;
                      break;
                    }

                    vertex = vertexEl.textContent;
                    _context.next = 27;
                    break;

                  case 22:
                    vertexURL = canvas.getAttribute('data-vert-url');

                    if (!vertexURL) {
                      _context.next = 27;
                      break;
                    }

                    _context.next = 26;
                    return fetchShader(vertexURL);

                  case 26:
                    vertex = _context.sent;

                  case 27:
                    _context.next = 29;
                    return doodle.compile(fragment, vertex);

                  case 29:
                    doodle.render();

                  case 30:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x2) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }
  }]);

  function Doodle(canvas) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Doodle);

    this.options = Object.assign(opts, Doodle.defaultOptions);
    this.canvas = canvas;
    this[_eventHandlers] = {};
    var gl = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["setupWebGL"])(canvas, this.options);
    this.gl = gl;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.verticesBuffer = gl.createBuffer();
    this.cellsBuffer = gl.createBuffer();
    this.vertices = [[-1.0, -1.0, 0.0], [1.0, -1.0, 0.0], [1.0, 1.0, 0.0], [-1.0, 1.0, 0.0]];
    this.cells = [[0, 1, 3], [3, 1, 2]];
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Doodle, [{
    key: "setFeebackContext",
    value: function setFeebackContext() {
      if (!this.options.preserveDrawingBuffer) {
        throw new Error('Must set preserveDrawingBuffer to true while using feedback mode.');
      }

      if (!this.feedbackContext) {
        var canvas;

        if (typeof OffscreenCanvas === 'function') {
          canvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
        } else {
          canvas = this.canvas.cloneNode();
        }

        this.feedbackContext = canvas.getContext('2d');
      }

      this[_renderFeedback] = true;
    }
  }, {
    key: "deleteProgram",
    value: function deleteProgram() {
      if (this.program) {
        this.gl.deleteProgram(this.program);
        this.program = null;
      }
    }
  }, {
    key: "clip",
    value: function clip(_ref2) {
      var vertices = _ref2.vertices,
          cells = _ref2.cells;
      var gl = this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["pointsToBuffer"])(vertices), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cellsBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["pointsToBuffer"])(cells, Uint8Array), gl.STATIC_DRAW);
      this.vertices = vertices;
      this.cells = cells;
    }
  }, {
    key: "setProgram",
    value: function setProgram(fragmentShader, vertexShader) {
      var _this = this;

      function getXY(canvas, e) {
        var _e$target$getBounding = e.target.getBoundingClientRect(),
            left = _e$target$getBounding.left,
            top = _e$target$getBounding.top;

        var _ref3 = e.changedTouches ? e.changedTouches[0] : e,
            clientX = _ref3.clientX,
            clientY = _ref3.clientY;

        var x = (clientX - left) * canvas.width / canvas.clientWidth;
        var y = (1.0 - (clientY - top) / canvas.clientHeight) * canvas.height;
        return [x, y];
      }

      if (this[_animationFrameID]) {
        window.cancelAnimationFrame(this[_animationFrameID]);
        delete this[_animationFrameID];
      }

      Object.entries(this[_eventHandlers]).forEach(function (_ref4) {
        var _ref5 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref4, 2),
            event = _ref5[0],
            handler = _ref5[1];

        if (handler) {
          if (event === 'keydown' || event === 'keyup') document.removeEventListener(event, handler);else _this.canvas.removeEventListener(event, handler);
        }
      });
      this.clearTextures();
      this.deleteProgram();
      this[_renderFeedback] = false;
      this[_autoUpdate] = false;
      var canvas = this.canvas;

      if (/^\s*uniform\s+sampler2D\s+dd_samplerFeedback/mg.test(fragmentShader)) {
        this.setFeebackContext();
      }

      if (/^\s*uniform\s+\w+\s+dd_click/mg.test(fragmentShader)) {
        this[_eventHandlers].click = function (e) {
          var _getXY = getXY(canvas, e),
              _getXY2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getXY, 2),
              x = _getXY2[0],
              y = _getXY2[1];

          _this.uniforms.dd_click = [x, y, -1.0];
        };

        this.canvas.addEventListener('click', this[_eventHandlers].click);
      }

      if (/^\s*uniform\s+\w+\s+dd_mouse/mg.test(fragmentShader)) {
        this[_eventHandlers].mousemove = function (e) {
          var _getXY3 = getXY(canvas, e),
              _getXY4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getXY3, 2),
              x = _getXY4[0],
              y = _getXY4[1];

          var _this$uniforms$dd_mou = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_this.uniforms.dd_mousePosition, 2),
              x0 = _this$uniforms$dd_mou[0],
              y0 = _this$uniforms$dd_mou[1];

          if (x0 >= 0 && y0 >= 0) {
            _this.uniforms.dd_mouseDelta = [x - x0, y - y0];
          }

          _this.uniforms.dd_mousePosition = [x, y];
        };

        this[_eventHandlers].mouseleave = function (e) {
          _this.uniforms.dd_mousePosition = [-1.0, -1.0];
          _this.uniforms.dd_mouseDelta = [-1.0, -1.0];
        };

        this[_eventHandlers].mousedown = function (e) {
          _this.uniforms.dd_mouseButtons = e.buttons;
          _this.uniforms.dd_mouseDown = [e.buttons, -1.0];
        };

        this[_eventHandlers].mouseup = function (e) {
          _this.uniforms.dd_mouseButtons = 0;

          if (e.button === 0) {
            _this.uniforms.dd_mouseUp = 1;
          } else if (e.button === 2) {
            _this.uniforms.dd_mouseUp = 2;
          } else if (e.button === 1) {
            _this.uniforms.dd_mouseUp = 4;
          }
        };

        this.canvas.addEventListener('mousemove', this[_eventHandlers].mousemove);
        this.canvas.addEventListener('mouseleave', this[_eventHandlers].mouseleave);
        this.canvas.addEventListener('mousedown', this[_eventHandlers].mousedown);
        this.canvas.addEventListener('mouseup', this[_eventHandlers].mouseup);
      }

      if (/^\s*uniform\s+\w+\s+dd_touch/mg.test(fragmentShader)) {
        // TODO: 实现多点触摸
        this[_eventHandlers].touchstart = function (e) {
          var _getXY5 = getXY(canvas, e),
              _getXY6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getXY5, 2),
              x = _getXY6[0],
              y = _getXY6[1];

          _this.uniforms.dd_touchPosition = [x, y];
          _this.uniforms.dd_touchStart = [x, y, -1.0];
        };

        this[_eventHandlers].touchend = function (e) {
          var _getXY7 = getXY(canvas, e),
              _getXY8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getXY7, 2),
              x = _getXY8[0],
              y = _getXY8[1];

          _this.uniforms.dd_touchPosition = [-1.0, -1.0];
          _this.uniforms.dd_touchEnd = [x, y, -1.0];
        };

        this[_eventHandlers].touchmove = function (e) {
          var _getXY9 = getXY(canvas, e),
              _getXY10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_getXY9, 2),
              x = _getXY10[0],
              y = _getXY10[1];

          _this.uniforms.dd_touchPosition = [x, y];
        };

        this.canvas.addEventListener('touchstart', this[_eventHandlers].touchstart);
        this.canvas.addEventListener('touchend', this[_eventHandlers].touchend);
        this.canvas.addEventListener('touchmove', this[_eventHandlers].touchmove);
      }

      if (/^\s*uniform\s+\w+\s+dd_key/mg.test(fragmentShader)) {
        this[_eventHandlers].keydown = function (e) {
          _this.uniforms.dd_keyCode = e.keyCode;
          _this.uniforms.dd_keyDown = [e.keyCode, -1.0];
        };

        this[_eventHandlers].keyup = function (e) {
          _this.uniforms.dd_keyUp = [e.keyCode, -1.0];
          _this.uniforms.dd_keyCode = -1;
        };

        document.addEventListener('keydown', this[_eventHandlers].keydown);
        document.addEventListener('keyup', this[_eventHandlers].keyup);
        this[_autoUpdate] = true;
      }

      if (/^\s*uniform\s+\w+\s+dd_(time|randseed(?!0)|frameIndex|mouse|touch|click|key)/mg.test(fragmentShader)) {
        this[_autoUpdate] = true;
      }

      var hasTexture = this[_renderFeedback] || this.textures && this.textures.length;
      if (fragmentShader == null) fragmentShader = _default_frag_glsl__WEBPACK_IMPORTED_MODULE_9___default.a;
      if (vertexShader == null) vertexShader = hasTexture ? _default_feeback_vert_glsl__WEBPACK_IMPORTED_MODULE_10___default.a : _default_vert_glsl__WEBPACK_IMPORTED_MODULE_8___default.a;
      this.fragmentShader = fragmentShader;
      this.vertexShader = vertexShader;
      var gl = this.gl;
      var program = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["createProgram"])(gl, vertexShader, fragmentShader);
      gl.useProgram(program);
      this.program = program;
      this.clip({
        vertices: this.vertices,
        cells: this.cells
      });
      this.uniforms = {};
      this.declareUniforms({
        dd_time: '1f',
        dd_randseed0: '2f',
        dd_randseed: '2f',
        dd_resolution: '2f',
        dd_frameIndex: '1i',
        dd_samplerFeedback: '1i',
        dd_mousePosition: '2f',
        // 当前鼠标位置，如果鼠标不在画布上，值为 [-1.0, -1.0]
        dd_mouseDelta: '2f',
        // 当前鼠标位置变化量，与上次位置进行比较
        dd_mouseButtons: '1i',
        // 当前鼠标按键情况 1 - 左键，2 - 右键，4 - 中键
        dd_mouseDown: '2f',
        // 当鼠标按下时，鼠标按键值与事件发生的时间
        dd_mouseUp: '2f',
        // 当鼠标松开时，鼠标按键值与事件发生时间
        dd_keyCode: '1i',
        // 当键盘按下未松开时，获取键值
        dd_keyDown: '2f',
        // 当键盘按下时，键值与事件发生时间
        dd_keyUp: '2f',
        // 当键盘松开时，键值与事件发生时间
        dd_click: '3f',
        // 得到点击的x、y坐标和点击发生的时间
        dd_touchPosition: '2f',
        // 得到当前触屏位置的坐标
        dd_touchStart: '3f',
        // 当触屏按下时，触碰坐标与发生时间
        dd_touchEnd: '3f' // 当触屏松开时，触碰坐标与发生时间

      });
      this.uniforms.dd_time = 0.0;
      this.uniforms.dd_randseed0 = [Math.random(), Math.random()];
      this.uniforms.dd_randseed = this.uniforms.dd_randseed0;
      this.uniforms.dd_frameIndex = 0;
      this.uniforms.dd_resolution = [gl.canvas.width, gl.canvas.height];
      this.uniforms.dd_samplerFeedback = 0;
      this.uniforms.dd_mousePosition = [-1.0, -1.0];
      this.uniforms.dd_mouseButtons = 0;
      this.uniforms.dd_mouseDown = [0.0, -1.0];
      this.uniforms.dd_mouseUp = [0.0, -1.0];
      this.uniforms.dd_keyCode = 0;
      this.uniforms.dd_keyDown = [0.0, -1.0];
      this.uniforms.dd_keyUp = [0.0, -1.0];
      this.uniforms.dd_click = [-1.0, -1.0, -1.0];
      this.uniforms.dd_touchPosition = [-1.0, -1.0];
      this.uniforms.dd_touchStart = [-1.0, -1.0, -1.0];
      this.uniforms.dd_touchEnd = [-1.0, -1.0, -1.0];

      for (var i = 0; i < 32; i++) {
        var sampler = "dd_sampler".concat(i);
        this.declareUniforms(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()({}, sampler, '1i')); // this.uniforms[sampler] = i;
      }

      var vPosition = gl.getAttribLocation(program, 'a_position');
      gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      this.program = program;
      var textures = this.textures || [];

      if (this[_renderFeedback]) {
        textures = [this.feedbackContext.canvas].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(textures));
      }

      if (textures.length) {
        this[_textures] = this.bindTextures(textures);
        this.setTextureCoordinate();
      }

      return program;
    }
  }, {
    key: "compile",
    value: function () {
      var _compile2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(frag, vert) {
        var loaded, _compile, _compile3, matches, imgs, fragmentShader, vertexShader, program;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _compile3 = function _ref7() {
                  _compile3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default()(
                  /*#__PURE__*/
                  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(content) {
                    var includes, matched, i, m, _matched, type, name, c, _c;

                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            content = content.replace(/^\s*/mg, '');
                            includes = [];
                            matched = content.match(/^#pragma\s+include\s+.*/mg);

                            if (!matched) {
                              _context2.next = 36;
                              break;
                            }

                            i = 0;

                          case 5:
                            if (!(i < matched.length)) {
                              _context2.next = 35;
                              break;
                            }

                            m = matched[i];
                            _matched = m.match(/(?:<|")(.*)(?:>|")/);

                            if (!_matched) {
                              _context2.next = 32;
                              break;
                            }

                            type = _matched[0].indexOf('<') === 0 ? 'lib' : 'link';
                            name = _matched[1];
                            if (name === 'graph') name = 'graphics';

                            if (loaded[name]) {
                              _context2.next = 31;
                              break;
                            }

                            loaded[name] = true; // TODO: 这里可以优化成异步加载

                            if (!(type === 'lib')) {
                              _context2.next = 21;
                              break;
                            }

                            _context2.next = 17;
                            return _compile(GLSL_LIBS[name]);

                          case 17:
                            c = _context2.sent;
                            // eslint-disable-line no-await-in-loop
                            includes.push(c);
                            _context2.next = 29;
                            break;

                          case 21:
                            if (!(type === 'link')) {
                              _context2.next = 29;
                              break;
                            }

                            _context2.next = 24;
                            return fetchShader(name);

                          case 24:
                            _c = _context2.sent;
                            _context2.next = 27;
                            return _compile(_c);

                          case 27:
                            _c = _context2.sent;
                            // eslint-disable-line no-await-in-loop
                            includes.push(_c);

                          case 29:
                            _context2.next = 32;
                            break;

                          case 31:
                            includes.push("/* included ".concat(name, " */"));

                          case 32:
                            i++;
                            _context2.next = 5;
                            break;

                          case 35:
                            includes.forEach(function (inc) {
                              content = content.replace(/^#pragma\s+include\s+.*/m, inc);
                            });

                          case 36:
                            return _context2.abrupt("return", content);

                          case 37:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return _compile3.apply(this, arguments);
                };

                _compile = function _ref6(_x5) {
                  return _compile3.apply(this, arguments);
                };

                loaded = {};
                matches = frag.match(/^#pragma\s+texture\s+.*/mg);

                if (!matches) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 7;
                return Promise.all(matches.map(function (m) {
                  var p = m.match(/^#pragma\s+texture\s+(.*)/);
                  return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["loadImage"])(p[1]);
                }));

              case 7:
                imgs = _context3.sent;
                this.textures = this.textures ? [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(this.textures), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(imgs)) : imgs;

              case 9:
                _context3.next = 11;
                return _compile(frag);

              case 11:
                fragmentShader = _context3.sent;

                if (!vert) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 15;
                return _compile(vert);

              case 15:
                _context3.t0 = _context3.sent;
                _context3.next = 19;
                break;

              case 18:
                _context3.t0 = null;

              case 19:
                vertexShader = _context3.t0;
                program = this.setProgram(fragmentShader, vertexShader);
                return _context3.abrupt("return", program);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function compile(_x3, _x4) {
        return _compile2.apply(this, arguments);
      }

      return compile;
    }()
  }, {
    key: "load",
    value: function () {
      var _load = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(frag) {
        var vert,
            _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                vert = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
                _context4.next = 3;
                return fetchShader(frag);

              case 3:
                frag = _context4.sent;

                if (!vert) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 7;
                return fetchShader(vert);

              case 7:
                vert = _context4.sent;

              case 8:
                return _context4.abrupt("return", this.compile(frag, vert));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function load(_x6) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "clearTextures",
    value: function clearTextures() {
      var gl = this.gl;

      if (this[_textures]) {
        this[_textures].forEach(function (texture) {
          gl.deleteTexture(texture);
        });

        this[_textures] = null;
      }
    }
  }, {
    key: "bindTextures",
    value: function bindTextures(sources) {
      var _this2 = this;

      return sources.map(function (source, i) {
        var gl = _this2.gl;
        gl.activeTexture(gl.TEXTURE0 + i);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source); // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // Prevents s-coordinate wrapping (repeating).

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // Prevents t-coordinate wrapping (repeating).

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        if (_this2.renderFeedback) {
          if (i > 0) _this2.uniforms["dd_sampler".concat(i - 1)] = i;
        } else {
          _this2.uniforms["dd_sampler".concat(i)] = i;
        }

        return texture;
      });
    }
  }, {
    key: "setTextureCoordinate",
    value: function setTextureCoordinate() {
      var gl = this.gl;
      var texVertexData = this.vertices.map(function (v) {
        return [0.5 * (v[0] + 1), 0.5 * (v[1] + 1)];
      }); // texture coordinate data

      var trianglesTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["pointsToBuffer"])(texVertexData), gl.STATIC_DRAW); // set texture coordinate attribute

      var vertexTexCoordAttribute = gl.getAttribLocation(this.program, 'a_vertexTextureCoord');
      gl.enableVertexAttribArray(vertexTexCoordAttribute);
      gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    }
  }, {
    key: "loadTextures",
    value: function () {
      var _loadTextures = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5() {
        var _len,
            sources,
            _key,
            promises,
            _args5 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                for (_len = _args5.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
                  sources[_key] = _args5[_key];
                }

                promises = sources.map(_helpers__WEBPACK_IMPORTED_MODULE_7__["loadImage"]);
                _context5.next = 4;
                return Promise.all(promises);

              case 4:
                this.textures = _context5.sent;

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadTextures() {
        return _loadTextures.apply(this, arguments);
      }

      return loadTextures;
    }() // WebGLRenderingContext.uniform[1234][fi][v]()
    // WebGLRenderingContext.uniformMatrix[234]fv()

  }, {
    key: "declareUniform",
    value: function declareUniform(name) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1f';
      var gl = this.gl;
      var uniform = gl.getUniformLocation(this.program, name);
      var value;
      type = type.replace(/^m/, 'Matrix');
      var isTypeV = /v$/.test(type);
      Object.defineProperty(this.uniforms, name, {
        get: function get() {
          return value;
        },
        set: function set(v) {
          value = v;

          if (!Array.isArray(v)) {
            v = [v];
          }

          if (isTypeV) gl["uniform".concat(type)](uniform, v);else gl["uniform".concat(type)].apply(gl, [uniform].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(v)));
        },
        configurable: false,
        enumerable: true
      });
    }
  }, {
    key: "declareUniforms",
    value: function declareUniforms(uniforms) {
      var _this3 = this;

      Object.entries(uniforms).forEach(function (_ref8) {
        var _ref9 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref8, 2),
            name = _ref9[0],
            type = _ref9[1];

        _this3.declareUniform(name, type);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var gl = this.gl;
      if (!this.program) this.setProgram();

      if (this[_renderFeedback]) {
        var context = this.feedbackContext;
        context.canvas.width = gl.canvas.width;
        context.canvas.height = gl.canvas.height; // context.clearRect(0, 0, gl.canvas.width, gl.canvas.height);

        context.drawImage(gl.canvas, 0, 0);
        this.bindTextures([this.feedbackContext.canvas]);
      }

      if (!this.startTime) this.startTime = Date.now();
      var time = (Date.now() - this.startTime) / 1000;
      this.uniforms.dd_randseed = [Math.random(), Math.random()];

      var _this$uniforms$dd_cli = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_click, 3),
          x = _this$uniforms$dd_cli[0],
          y = _this$uniforms$dd_cli[1],
          t = _this$uniforms$dd_cli[2];

      if (x >= 0 && t < 0) {
        this.uniforms.dd_click = [x, y, time];
      }

      var _this$uniforms$dd_mou2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_mouseDown, 2);

      x = _this$uniforms$dd_mou2[0];
      t = _this$uniforms$dd_mou2[1];

      if (x > 0 && t < 0) {
        this.uniforms.dd_mouseDown = [x, time];
      }

      var _this$uniforms$dd_mou3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_mouseUp, 2);

      x = _this$uniforms$dd_mou3[0];
      t = _this$uniforms$dd_mou3[1];

      if (x > 0 && t < 0) {
        this.uniforms.dd_mouseUp = [x, time];
      }

      var _this$uniforms$dd_key = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_keyDown, 2);

      x = _this$uniforms$dd_key[0];
      t = _this$uniforms$dd_key[1];

      if (x > 0 && t < 0) {
        this.uniforms.dd_keyDown = [x, time];
      }

      var _this$uniforms$dd_key2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_keyUp, 2);

      x = _this$uniforms$dd_key2[0];
      t = _this$uniforms$dd_key2[1];

      if (x > 0 && t < 0) {
        this.uniforms.dd_keyUp = [x, time];
      }

      var _this$uniforms$dd_tou = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_touchStart, 3);

      x = _this$uniforms$dd_tou[0];
      y = _this$uniforms$dd_tou[1];
      t = _this$uniforms$dd_tou[2];

      if (x > 0 && t < 0) {
        this.uniforms.dd_touchStart = [x, y, time];
      }

      var _this$uniforms$dd_tou2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(this.uniforms.dd_touchEnd, 3);

      x = _this$uniforms$dd_tou2[0];
      y = _this$uniforms$dd_tou2[1];
      t = _this$uniforms$dd_tou2[2];

      if (x > 0 && t < 0) {
        this.uniforms.dd_touchEnd = [x, y, time];
      }

      this.uniforms.dd_time = time;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, this.cells.length * 3, gl.UNSIGNED_BYTE, 0);
      this.uniforms.dd_frameIndex++;

      if (this[_autoUpdate]) {
        this[_animationFrameID] = window.requestAnimationFrame(this.render.bind(this));
      }
    }
  }, {
    key: "renderFeedback",
    get: function get() {
      return this[_renderFeedback];
    }
  }, {
    key: "autoUpdate",
    get: function get() {
      return this[_autoUpdate];
    }
  }]);

  return Doodle;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(Doodle, "uniformTypes", {
  '1f': '1f',
  '2f': '2f',
  '3f': '3f',
  '4f': '4f',
  '1i': '1i',
  '2i': '2i',
  '3i': '3i',
  '4i': '4i',
  '1fv': '1fv',
  '2fv': '2fv',
  '3fv': '3fv',
  '4fv': '4fv',
  '1iv': '1iv',
  '2iv': '2iv',
  '3iv': '3iv',
  '4iv': '4iv',
  m2fv: 'Matrix2fv',
  m3fv: 'Matrix3fv',
  m4fv: 'Matrix4fv'
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(Doodle, "defaultOptions", {
  preserveDrawingBuffer: true
});



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(3);

var iterableToArrayLimit = __webpack_require__(4);

var nonIterableRest = __webpack_require__(5);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(9);

var iterableToArray = __webpack_require__(10);

var nonIterableSpread = __webpack_require__(11);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupWebGL", function() { return setupWebGL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointsToBuffer", function() { return pointsToBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
function create3DContext(canvas, opt_attribs) {
  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  var context = null;

  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs);
    } catch (e) {// no-empty
    }

    if (context) {
      break;
    }
  }

  return context;
}

function makeFailHTML(msg) {
  return "<table style=\"background-color: #8CE; width: 100%; height: 100%;\"><tr>\n    <td align=\"center\">\n    <div style=\"display: table-cell; vertical-align: middle;\">\n    <div>".concat(msg, "</div>\n    </div>\n    </td></tr></table>");
}

var GET_A_WEBGL_BROWSER = "This page requires a browser that supports WebGL.<br/>\n<a href=\"http://get.webgl.org\">Click here to upgrade your browser.</a>";
var OTHER_PROBLEM = "It doesn't appear your computer can support WebGL.<br/>\n<a href=\"http://get.webgl.org/troubleshooting/\">Click here for more information.</a>";
function setupWebGL(canvas, opt_attribs) {
  function showLink(str) {
    var container = canvas.parentNode;

    if (container) {
      container.innerHTML = makeFailHTML(str);
    }
  }

  if (!window.WebGLRenderingContext) {
    showLink(GET_A_WEBGL_BROWSER);
    return null;
  }

  var context = create3DContext(canvas, opt_attribs);

  if (!context) {
    showLink(OTHER_PROBLEM);
  }

  return context;
}
function createProgram(gl, vertex, fragment) {
  var vertShdr = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShdr, vertex);
  gl.compileShader(vertShdr);

  if (!gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS)) {
    var msg = "Vertex shader failed to compile.  The error log is:".concat(gl.getShaderInfoLog(vertShdr));
    console.error(msg);
    return -1;
  }

  var fragShdr = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShdr, fragment);
  gl.compileShader(fragShdr);

  if (!gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS)) {
    var _msg = "Fragment shader failed to compile.  The error log is:".concat(gl.getShaderInfoLog(fragShdr));

    console.error(_msg);
    return -1;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertShdr);
  gl.attachShader(program, fragShdr);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var _msg2 = "Shader program failed to link.  The error log is:".concat(gl.getProgramInfoLog(program));

    console.error(_msg2);
    return -1;
  }

  return program;
}
function pointsToBuffer(points) {
  var Type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Float32Array;
  var deminsion = points[0].length;
  var len = points.length;
  var buffer = new Type(deminsion * len);
  var idx = 0;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < deminsion; j++) {
      buffer[idx++] = points[i][j];
    }
  }

  return buffer;
}
function loadImage(src) {
  var img = new Image();
  img.crossOrigin = 'anonymous';
  return new Promise(function (resolve) {
    img.onload = function () {
      resolve(img);
    };

    img.src = src;
  });
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "attribute vec4 a_position;\nvoid main() {\n\tgl_PointSize = 1.0;\n\tgl_Position = a_position;\n}\n"

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "#ifdef GL_ES\nprecision mediump float;\n#endif\nvoid main() {\n\tgl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\n}\n"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec4 a_position;\nattribute vec2 a_vertexTextureCoord;\nvarying vec2 vTextureCoord;\nvoid main() {\n\tgl_PointSize = 1.0;\n\tgl_Position = a_position;\n\tvTextureCoord = a_vertexTextureCoord;\n}\n"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "#ifndef M_STDLIB\n#define M_STDLIB\n#ifndef PI\n#define PI 3.141592653589793\n#endif\n#ifndef FLT_EPSILON\n#define FLT_EPSILON 0.000001\n#endif\nfloat atan2(float dy, float dx) {\n\tfloat ax = abs(dx);\n\tfloat ay = abs(dy);\n\tfloat a = min(ax, ay) / (max(ax, ay) + FLT_EPSILON);\n\tfloat s = a * a;\n\tfloat r = ((((((-0.0464964749 * s) + 0.15931422) * s) - 0.327622764) * s) * a) + a;\n\tif (ay > ax)\n\t\tr = 1.57079637 - r;\n\tif (dx < 0.0)\n\t\tr = PI - r;\n\tif (dy < 0.0)\n\t\tr = -r;\n\treturn r;\n}\nfloat atan2(vec2 v) {\n\treturn atan2(v.y, v.x);\n}\nfloat angle(vec2 v1, vec2 v2) {\n\tfloat ang = atan2(v1) - atan2(v2);\n\tif (ang < 0.0)\n\t\tang += (2.0 * PI);\n\treturn ang;\n}\nfloat angle(vec2 v) {\n\treturn angle(v, vec2(1.0, 0.0));\n}\nvec2 center(vec2 v) {\n\treturn v * 0.5;\n}\nvec2 center(vec2 v1, vec2 v2) {\n\treturn (v1 + v2) * 0.5;\n}\nhighp float random(vec2 co) {\n\thighp float a = 12.9898;\n\thighp float b = 78.233;\n\thighp float c = 43758.5453;\n\thighp float dt = dot(co.xy, vec2(a, b));\n\thighp float sn = mod(dt, 3.14);\n\treturn fract(sin(sn) * c);\n}\nhighp float random(vec2 st, float a, float b) {\n\thighp float p = random(st);\n\treturn mix(a, b, p);\n}\nhighp vec2 random2(vec2 st) {\n\thighp vec2 v = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));\n\treturn -1.0 + (2.0 * fract(sin(v) * 43758.5453123));\n}\nhighp vec3 random3(vec2 st) {\n\thighp vec3 v = vec3(random2(st), random(st));\n\treturn v;\n}\nhighp float noise(vec2 st) {\n\tvec2 i = floor(st);\n\tvec2 f = fract(st);\n\tvec2 u = (f * f) * (3.0 - (2.0 * f));\n\treturn mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x), mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);\n}\nvec2 polar(vec2 st, vec2 c) {\n\tvec2 p = c - st;\n\tfloat r = length(p) * 2.0;\n\tfloat a = atan(p.y, p.x);\n\treturn vec2(r, a);\n}\nvec2 polar(vec2 st) {\n\treturn polar(st, vec2(0.5));\n}\n#endif\n"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "#ifndef MOD_SHAPES\n#define MOD_SHAPES\nUDF shape_blade(vec2 st, vec2 center, float num) {\n\tvec2 pt = polar(st, vec2(center));\n\tfloat x = pt.x;\n\tfloat y = cos(pt.y * num);\n\treturn smoothstep(x - 0.01, x + 0.01, y);\n}\nUDF shape_blade3(vec2 st, vec2 center) {\n\treturn shape_blade(st, center, 3.0);\n}\nUDF shape_blade3(vec2 st) {\n\treturn shape_blade(st, vec2(0.5), 3.0);\n}\nUDF shape_blade4(vec2 st, vec2 center) {\n\treturn shape_blade(st, center, 4.0);\n}\nUDF shape_blade4(vec2 st) {\n\treturn shape_blade(st, vec2(0.5), 4.0);\n}\nUDF shape_blade5(vec2 st, vec2 center) {\n\treturn shape_blade(st, center, 5.0);\n}\nUDF shape_blade5(vec2 st) {\n\treturn shape_blade(st, vec2(0.5), 5.0);\n}\nUDF shape_infinity(vec2 st, vec2 center) {\n\treturn shape_blade(st, center, 2.0);\n}\nUDF shape_infinity(vec2 st) {\n\treturn shape_blade(st, vec2(0.5), 2.0);\n}\nUDF shape_clover(vec2 st, vec2 center, float num) {\n\tvec2 pt = polar(st, vec2(center));\n\tfloat x = pt.x;\n\tfloat y = abs(cos((pt.y * num) * 0.5));\n\treturn smoothstep(x - 0.01, x + 0.01, y);\n}\nUDF shape_bean(vec2 st, vec2 center) {\n\treturn shape_clover(st, center, 1.0);\n}\nUDF shape_bean(vec2 st) {\n\treturn shape_clover(st, vec2(0.5), 1.0);\n}\nUDF shape_apple(vec2 st, vec2 center) {\n\treturn shape_clover(vec2(st.y - 0.2, st.x), center, 1.3);\n}\nUDF shape_apple(vec2 st) {\n\treturn shape_clover(vec2(st.y - 0.2, st.x), vec2(0.5), 1.3);\n}\nUDF shape_clover3(vec2 st, vec2 center) {\n\treturn shape_clover(st, center, 3.0);\n}\nUDF shape_clover3(vec2 st) {\n\treturn shape_clover(st, vec2(0.5), 3.0);\n}\nUDF shape_clover4(vec2 st, vec2 center) {\n\treturn shape_clover(st, center, 4.0);\n}\nUDF shape_clover4(vec2 st) {\n\treturn shape_clover(st, vec2(0.5), 4.0);\n}\nUDF shape_clover5(vec2 st, vec2 center) {\n\treturn shape_clover(st, center, 5.0);\n}\nUDF shape_clover5(vec2 st) {\n\treturn shape_clover(st, vec2(0.5), 5.0);\n}\nUDF shape_flower(vec2 st, vec2 center, float num) {\n\tvec2 pt = polar(st, vec2(center));\n\tfloat x = pt.x;\n\tfloat y = (abs(cos((pt.y * num) * 0.5)) * 0.5) + 0.3;\n\treturn smoothstep(x - 0.01, x + 0.01, y);\n}\nUDF shape_gourd(vec2 st, vec2 center) {\n\treturn shape_flower(vec2(st.y, st.x), center, 1.7);\n}\nUDF shape_gourd(vec2 st) {\n\treturn shape_flower(vec2(st.y, st.x), vec2(0.5), 1.7);\n}\nUDF shape_flower3(vec2 st, vec2 center) {\n\treturn shape_flower(st, center, 3.0);\n}\nUDF shape_flower3(vec2 st) {\n\treturn shape_flower(st, vec2(0.5), 3.0);\n}\nUDF shape_flower4(vec2 st, vec2 center) {\n\treturn shape_flower(st, center, 4.0);\n}\nUDF shape_flower4(vec2 st) {\n\treturn shape_flower(st, vec2(0.5), 4.0);\n}\nUDF shape_flower5(vec2 st, vec2 center) {\n\treturn shape_flower(st, center, 5.0);\n}\nUDF shape_flower5(vec2 st) {\n\treturn shape_flower(st, vec2(0.5), 5.0);\n}\nUDF shape_bud(vec2 st, vec2 center, float num) {\n\tvec2 pt = polar(st, vec2(center));\n\tfloat x = pt.x;\n\tfloat y = (smoothstep(-0.5, 1.0, cos(pt.y * num)) * 0.2) + 0.5;\n\treturn smoothstep(x - 0.01, x + 0.01, y);\n}\nUDF shape_bud5(vec2 st, vec2 center) {\n\treturn shape_bud(st, center, 5.0);\n}\nUDF shape_bud5(vec2 st) {\n\treturn shape_bud(st, vec2(0.5), 5.0);\n}\nUDF shape_bud8(vec2 st, vec2 center) {\n\treturn shape_bud(st, center, 8.0);\n}\nUDF shape_bud8(vec2 st) {\n\treturn shape_bud(st, vec2(0.5), 8.0);\n}\nUDF shape_bud10(vec2 st, vec2 center) {\n\treturn shape_bud(st, center, 10.0);\n}\nUDF shape_bud10(vec2 st) {\n\treturn shape_bud(st, vec2(0.5), 10.0);\n}\nUDF shape_bud12(vec2 st, vec2 center) {\n\treturn shape_bud(st, center, 12.0);\n}\nUDF shape_bud12(vec2 st) {\n\treturn shape_bud(st, vec2(0.5), 12.0);\n}\nUDF shape_star(vec2 st, vec2 center) {\n\tfloat r = 0.45;\n\tfloat d = regular_polygon(st, center, r, 5);\n\tfloat a = (-2.0 * PI) / 5.0;\n\td = fill(d, 0.01);\n\tvec2 v0 = vec2(0, r);\n\tfor (int i = 0; i < 5; i++) {\n\t\tvec2 v1 = rotate(v0, float(i) * a);\n\t\tvec2 v2 = rotate(v0, float(i + 1) * a);\n\t\tfloat l = length(v2 - v1);\n\t\tfloat c = 0.5 / cos(PI / 5.0);\n\t\tvec2 p = rotate(v2, v1, -PI / 5.0);\n\t\tp += ((1.0 - c) * (v1 - p));\n\t\tfloat d2 = sdf_triangle(st - center, v1, v2, p);\n\t\td2 = fill(d2, 0.01);\n\t\td = udf_complement(d, d2);\n\t}\n\treturn d;\n}\nUDF shape_regular_polygon(vec2 st, vec2 center, const int edges) {\n\tfloat d = regular_polygon(st, center, 0.45, edges);\n\treturn fill(d, 0.01);\n}\nUDF shape_star(vec2 st) {\n\treturn shape_star(st, vec2(0.5));\n}\nUDF shape_triangle(vec2 st, vec2 center) {\n\treturn shape_regular_polygon(st, center, 3);\n}\nUDF shape_triangle(vec2 st) {\n\treturn shape_regular_polygon(st, vec2(0.5), 3);\n}\nUDF shape_rhombus(vec2 st, vec2 center) {\n\treturn shape_regular_polygon(st, center, 4);\n}\nUDF shape_rhombus(vec2 st) {\n\treturn shape_regular_polygon(st, vec2(0.5), 4);\n}\nUDF shape_pentagon(vec2 st, vec2 center) {\n\treturn shape_regular_polygon(st, center, 5);\n}\nUDF shape_pentagon(vec2 st) {\n\treturn shape_regular_polygon(st, vec2(0.5), 5);\n}\nUDF shape_hexagon(vec2 st, vec2 center) {\n\treturn shape_regular_polygon(st, center, 6);\n}\nUDF shape_hexagon(vec2 st) {\n\treturn shape_regular_polygon(st, vec2(0.5), 6);\n}\nUDF shape_heptagon(vec2 st, vec2 center) {\n\treturn shape_regular_polygon(st, center, 7);\n}\nUDF shape_heptagon(vec2 st) {\n\treturn shape_regular_polygon(st, vec2(0.5), 7);\n}\nUDF shape_octagon(vec2 st, vec2 center) {\n\treturn shape_regular_polygon(st, center, 8);\n}\nUDF shape_octagon(vec2 st) {\n\treturn shape_regular_polygon(st, vec2(0.5), 8);\n}\nUDF shape_hypocycloid(vec2 st, vec2 center, const int edges) {\n\tfloat d = regular_polygon(st, center, 0.45, edges, true);\n\treturn fill(d, 0.01);\n}\nUDF shape_hypocycloid(vec2 st, const int edges) {\n\treturn shape_hypocycloid(st, vec2(0.5), edges);\n}\nUDF shape_cross(vec2 st, vec2 center, float w, float h) {\n\tvec2 p1 = center - (0.5 * vec2(w, h));\n\tvec2 p2 = center - (0.5 * vec2(h, w));\n\tfloat d1 = sdf_rect(st, p1, w, h);\n\tfloat d2 = sdf_rect(st, p2, h, w);\n\treturn fill(udf_union(d1, d2), 0.01);\n}\nUDF shape_cross(vec2 st, vec2 center) {\n\treturn shape_cross(st, center, 0.8, 0.2);\n}\nUDF shape_cross(vec2 st, float w, float h) {\n\treturn shape_cross(st, vec2(0.5), w, h);\n}\nUDF shape_cross(vec2 st) {\n\treturn shape_cross(st, vec2(0.5), 0.8, 0.2);\n}\n#endif\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "#ifndef M_SHAPER\n#define M_SHAPER\nfloat quadratic_bezier(float x, float a, float b) {\n\tfloat epsilon = 0.00001;\n\ta = max(0.0, min(1.0, a));\n\tb = max(0.0, min(1.0, b));\n\tif (a == 0.5) {\n\t\ta += epsilon;\n\t}\n\tfloat om2a = 1.0 - (2.0 * a);\n\tfloat t = (sqrt((a * a) + (om2a * x)) - a) / om2a;\n\tfloat y = ((1.0 - (2.0 * b)) * (t * t)) + ((2.0 * b) * t);\n\treturn y;\n}\nfloat slope_from_t(float t, float A, float B, float C) {\n\tfloat dtdx = 1.0 / (((((3.0 * A) * t) * t) + ((2.0 * B) * t)) + C);\n\treturn dtdx;\n}\nfloat x_from_t(float t, float A, float B, float C, float D) {\n\tfloat x = (((A * ((t * t) * t)) + (B * (t * t))) + (C * t)) + D;\n\treturn x;\n}\nfloat y_from_t(float t, float E, float F, float G, float H) {\n\tfloat y = (((E * ((t * t) * t)) + (F * (t * t))) + (G * t)) + H;\n\treturn y;\n}\nfloat cubic_bezier(float x, float a, float b, float c, float d) {\n\tfloat y0a = 0.00;\n\tfloat x0a = 0.00;\n\tfloat y1a = b;\n\tfloat x1a = a;\n\tfloat y2a = d;\n\tfloat x2a = c;\n\tfloat y3a = 1.00;\n\tfloat x3a = 1.00;\n\tfloat A = ((x3a - (3.0 * x2a)) + (3.0 * x1a)) - x0a;\n\tfloat B = ((3.0 * x2a) - (6.0 * x1a)) + (3.0 * x0a);\n\tfloat C = (3.0 * x1a) - (3.0 * x0a);\n\tfloat D = x0a;\n\tfloat E = ((y3a - (3.0 * y2a)) + (3.0 * y1a)) - y0a;\n\tfloat F = ((3.0 * y2a) - (6.0 * y1a)) + (3.0 * y0a);\n\tfloat G = (3.0 * y1a) - (3.0 * y0a);\n\tfloat H = y0a;\n\tfloat currentt = x;\n\tconst int nRefinementIterations = 5;\n\tfor (int i = 0; i < nRefinementIterations; i++) {\n\t\tfloat currentx = x_from_t(currentt, A, B, C, D);\n\t\tfloat currentslope = slope_from_t(currentt, A, B, C);\n\t\tcurrentt -= ((currentx - x) * currentslope);\n\t\tcurrentt = clamp(currentt, 0.0, 1.0);\n\t}\n\tfloat y = y_from_t(currentt, E, F, G, H);\n\treturn y;\n}\n#endif\n"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "#ifndef MOD_BOX\n#define MOD_BOX\nstruct box2 {\n\tvec2 a;\n\tvec2 b;\n\tvec2 c;\n\tvec2 d;\n};\nvec2 center(box2 box) {\n\treturn (box.a + box.c) * 0.5;\n}\nbox2 create_box(vec2 point, float w, float h, vec2 anchor) {\n\tvec2 size = vec2(w, h);\n\tvec2 a = point + (size * (vec2(0.0) - anchor));\n\tvec2 b = point + (size * (vec2(1.0, 0.0) - anchor));\n\tvec2 c = point + (size * (vec2(1.0) - anchor));\n\tvec2 d = point + (size * (vec2(0.0, 1.0) - anchor));\n\treturn box2(a, b, c, d);\n}\nbox2 create_box(vec2 point, float w, float h) {\n\treturn create_box(point, w, h, vec2(0.0));\n}\nbox2 create_box(vec2 point, float wh) {\n\treturn create_box(point, wh, wh, vec2(0.0));\n}\nbox2 create_box(float w, float h) {\n\treturn create_box(vec2(0.0), w, h, vec2(0.0));\n}\nbox2 create_box(float wh) {\n\treturn create_box(vec2(0.0), wh, wh, vec2(0.0));\n}\nbox2 create_box() {\n\treturn create_box(vec2(0.0), 1.0, 1.0, vec2(0.0));\n}\nvec2 box_quad(vec2 p, box2 box) {\n\tvec2 a = box.a;\n\tvec2 b = box.b;\n\tvec2 c = box.c;\n\tvec2 d = box.d;\n\tfloat d1 = sdf_line(p, a, b);\n\tfloat d2 = sdf_line(p, b, c);\n\tfloat d3 = sdf_line(p, c, d);\n\tfloat d4 = sdf_line(p, d, a);\n\tif (((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) && (d4 >= 0.0)) || ((((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0)) && (d4 <= 0.0))) {\n\t\tvec2 v1 = b - a;\n\t\tvec2 v2 = d - a;\n\t\tvec2 vp = p - a;\n\t\tfloat l1 = length(v1);\n\t\tfloat l2 = length(v2);\n\t\tfloat p1 = dot(vp, v1) / l1;\n\t\tfloat p2 = dot(vp, v2) / l2;\n\t\tfloat ang = angle(v2, v1);\n\t\tfloat x = p1 - (abs(d1) / tan(ang));\n\t\tfloat y = p2 - (abs(d4) / tan(ang));\n\t\tx /= l1;\n\t\ty /= l2;\n\t\treturn vec2(x, y);\n\t}\n\treturn vec2(-1.0);\n}\nbox2 transform(box2 box, mat3 matrix) {\n\treturn box2(transform(box.a, matrix), transform(box.b, matrix), transform(box.c, matrix), transform(box.d, matrix));\n}\nbox2 translate(box2 box, vec2 xy) {\n\treturn box2(translate(box.a, xy), translate(box.b, xy), translate(box.c, xy), translate(box.d, xy));\n}\nbox2 scale(box2 box, vec2 origin, vec2 scaleXY) {\n\treturn box2(scale(box.a, origin, scaleXY), scale(box.b, origin, scaleXY), scale(box.c, origin, scaleXY), scale(box.d, origin, scaleXY));\n}\nbox2 scale(box2 box, vec2 scaleXY) {\n\treturn box2(scale(box.a, scaleXY), scale(box.b, scaleXY), scale(box.c, scaleXY), scale(box.d, scaleXY));\n}\nbox2 rotate(box2 box, vec2 origin, float ang) {\n\treturn box2(rotate(box.a, origin, ang), rotate(box.b, origin, ang), rotate(box.c, origin, ang), rotate(box.d, origin, ang));\n}\nbox2 rotate(box2 box, float ang) {\n\treturn box2(rotate(box.a, ang), rotate(box.b, ang), rotate(box.c, ang), rotate(box.d, ang));\n}\nbox2 skew(box2 box, vec2 origin, vec2 skewXY) {\n\treturn box2(skew(box.a, origin, skewXY), skew(box.b, origin, skewXY), skew(box.c, origin, skewXY), skew(box.d, origin, skewXY));\n}\nbox2 skew(box2 box, vec2 skewXY) {\n\treturn box2(skew(box.a, skewXY), skew(box.b, skewXY), skew(box.c, skewXY), skew(box.d, skewXY));\n}\n#endif\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "#ifndef MOD_TRANSFORM\n#define MOD_TRANSFORM\nvec2 transform(vec2 v0, mat3 matrix) {\n\treturn vec2(matrix * vec3(v0, 1.0));\n}\nvec2 translate(vec2 v0, vec2 xy) {\n\tmat3 m = mat3(1, 0, 0, 0, 1, 0, xy.x, xy.y, 1);\n\treturn transform(v0, m);\n}\nvec2 scale(vec2 v0, vec2 origin, vec2 scale) {\n\tmat3 m = mat3(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);\n\treturn transform(v0 - origin, m) + origin;\n}\nvec2 scale(vec2 v0, vec2 scaleXY) {\n\treturn scale(v0, vec2(0.0), scaleXY);\n}\nvec2 rotate(vec2 v0, vec2 origin, float ang) {\n\tfloat sinA = sin(ang);\n\tfloat cosA = cos(ang);\n\tmat3 m = mat3(cosA, -sinA, 0, sinA, cosA, 0, 0, 0, 1);\n\treturn transform(v0 - origin, m) + origin;\n}\nvec2 rotate(vec2 v0, float ang) {\n\treturn rotate(v0, vec2(0.0), ang);\n}\nvec2 skew(vec2 v0, vec2 origin, vec2 skew) {\n\tmat3 m = mat3(1, tan(skew.y), 0, tan(skew.x), 1, 0, 0, 0, 1);\n\treturn transform(v0 - origin, m) + origin;\n}\nvec2 skew(vec2 v0, vec2 skewXY) {\n\treturn skew(v0, vec2(0.0), skewXY);\n}\n#endif\n"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "#ifndef M_GRAPH\n#define M_GRAPH\n#pragma include <stdlib>\n#pragma include <shaper>\n#pragma include <transform>\n#ifndef SDF\n#define SDF float\n#endif\n#ifndef UDF\n#define UDF float\n#endif\n#ifndef PLOT\n#define PLOT(f, st, step) sdf_plot(st, vec2(st.x - step, f(st.x - step)), vec2(st.x, f(st.x)), vec2(st.x + step, f(st.x + step)))\n#endif\n#ifndef SPRITE\n#define SPRITE(quad, f) if(quad.x >= 0.0 && quad.x <= 1.0) f(quad);\n#endif\nSDF sdf_line(vec2 p, vec2 v1, vec2 v2) {\n\tvec2 pd = p - v1;\n\tvec2 pd2 = p - v2;\n\tvec2 seg = v2 - v1;\n\treturn ((pd.x * seg.y) - (pd.y * seg.x)) / length(seg);\n}\nSDF sdf_line(vec2 p, vec2 v) {\n\treturn sdf_line(p, vec2(0), v);\n}\nSDF sdf_seg(vec2 p, vec2 v1, vec2 v2) {\n\tvec2 pd = p - v1;\n\tvec2 pd2 = p - v2;\n\tvec2 seg = v2 - v1;\n\tfloat l = length(seg);\n\tfloat d = abs((pd.x * seg.y) - (pd.y * seg.x)) / l;\n\tfloat proj = ((pd.x * seg.x) + (pd.y * seg.y)) / l;\n\tif ((proj >= 0.0) && (proj <= l))\n\t\treturn d;\n\treturn min(length(pd), length(pd2));\n}\nSDF sdf_seg(vec2 p, vec2 v) {\n\treturn sdf_seg(p, vec2(0), v);\n}\nSDF sdf_plot(vec2 p, vec2 v1, vec2 v2, vec2 v3) {\n\tfloat d1 = sdf_seg(p, v1, v2);\n\tfloat d2 = sdf_seg(p, v2, v3);\n\treturn min(d1, d2);\n}\nUDF stroke(SDF d, float d0, float w, float smth) {\n\tfloat th = 0.5 * w;\n\tsmth = smth * w;\n\tfloat start = d0 - th;\n\tfloat end = d0 + th;\n\treturn smoothstep(start, start + smth, d) - smoothstep(end - smth, end, d);\n}\nUDF stroke(SDF d, float w, float smth) {\n\treturn stroke(d, 0.0, w, smth);\n}\nUDF stroke(SDF d, float w) {\n\treturn stroke(d, 0.0, w, 0.0);\n}\nSDF sdf_triangle(vec2 st, vec2 a, vec2 b, vec2 c) {\n\tvec2 va = a - b;\n\tvec2 vb = b - c;\n\tvec2 vc = c - a;\n\tfloat d1 = sdf_line(st, a, b);\n\tfloat d2 = sdf_line(st, b, c);\n\tfloat d3 = sdf_line(st, c, a);\n\tfloat l = abs((va.x * vb.y) - (va.y * vb.x)) / ((length(va) + length(vb)) + length(vc));\n\tif ((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) || (((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0))) {\n\t\treturn min(abs(d1), min(abs(d2), abs(d3))) / l;\n\t}\n\td1 = sdf_seg(st, a, b);\n\td2 = sdf_seg(st, b, c);\n\td3 = sdf_seg(st, c, a);\n\treturn -min(abs(d1), min(abs(d2), abs(d3))) / l;\n}\nSDF sdf_rect(vec2 st, vec2 p, float w, float h) {\n\tvec2 a = p;\n\tvec2 b = p + vec2(w, 0.0);\n\tvec2 c = p + vec2(w, h);\n\tvec2 d = p + vec2(0.0, h);\n\tfloat d1 = sdf_line(st, a, b);\n\tfloat d2 = sdf_line(st, b, c);\n\tfloat d3 = sdf_line(st, c, d);\n\tfloat d4 = sdf_line(st, d, a);\n\tfloat l = min(w, h) * 0.5;\n\tif (((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) && (d4 >= 0.0)) || ((((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0)) && (d4 <= 0.0))) {\n\t\treturn min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\n\t}\n\td1 = sdf_seg(st, a, b);\n\td2 = sdf_seg(st, b, c);\n\td3 = sdf_seg(st, c, d);\n\td4 = sdf_seg(st, d, a);\n\treturn -min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\n}\nSDF sdf_circle(vec2 st, vec2 c, float r) {\n\treturn 1.0 - (length(st - c) / r);\n}\nSDF sdf_ellipse(vec2 st, vec2 c, float a, float b) {\n\tvec2 p = st - c;\n\treturn 1.0 - sqrt(pow(p.x / a, 2.0) + pow(p.y / b, 2.0));\n}\nSDF sdf_ellipse(vec2 st, vec2 c, float a, float b, float sAng, float eAng) {\n\tvec2 ua = vec2(cos(sAng), sin(sAng));\n\tvec2 ub = vec2(cos(eAng), sin(eAng));\n\tfloat d1 = sdf_line(st, c, ua + c);\n\tfloat d2 = sdf_line(st, c, ub + c);\n\tfloat d3 = sdf_ellipse(st, c, a, b);\n\tfloat r = min(a, b);\n\tvec2 v = st - c;\n\tfloat ang = angle(v, vec2(1.0, 0));\n\tif ((eAng - sAng) > (2.0 * PI)) {\n\t\treturn d3;\n\t}\n\tif ((ang >= sAng) && (ang <= eAng)) {\n\t\tfloat m = max(a, b);\n\t\tfloat d11 = sdf_seg(st, c, (ua * m) + c);\n\t\tfloat d12 = sdf_seg(st, c, (ub * m) + c);\n\t\tif (d3 >= 0.0) {\n\t\t\treturn min(abs(d11 / r), min(abs(d12 / r), d3));\n\t\t}\n\t\treturn d3;\n\t}\n\tfloat pa = dot(ua, v);\n\tfloat pb = dot(ub, v);\n\tif ((pa < 0.0) && (pb < 0.0)) {\n\t\treturn -length(st - c) / r;\n\t}\n\tif ((d1 > 0.0) && (pa >= 0.0)) {\n\t\tvec2 va = pa * ua;\n\t\tfloat da = pow(va.x / a, 2.0) + pow(va.y / b, 2.0);\n\t\tif ((d3 > 0.0) || (da <= pow(1.0 + abs(d1 / r), 2.0))) {\n\t\t\treturn -abs(d1 / r);\n\t\t}\n\t\telse {\n\t\t\treturn d3;\n\t\t}\n\t}\n\tif ((d2 < 0.0) && (pb >= 0.0)) {\n\t\tvec2 vb = pb * ub;\n\t\tfloat db = pow(vb.x / a, 2.0) + pow(vb.y / b, 2.0);\n\t\tif ((d3 >= 0.0) || (db <= pow(1.0 + abs(d2 / r), 2.0))) {\n\t\t\treturn -abs(d2 / r);\n\t\t}\n\t\telse {\n\t\t\treturn d3;\n\t\t}\n\t}\n}\nSDF sdf_arc(vec2 st, vec2 c, float r, float sAng, float eAng) {\n\treturn sdf_ellipse(st, c, r, r, sAng, eAng);\n}\nSDF sdf_rhombus(vec2 st, vec2 cr, float w, float h) {\n\tvec2 a = cr - vec2(0.5 * w, 0);\n\tvec2 b = cr - vec2(0, 0.5 * h);\n\tvec2 c = cr + vec2(0.5 * w, 0);\n\tvec2 d = cr + vec2(0, 0.5 * h);\n\tvec2 va = a - b;\n\tvec2 vb = b - c;\n\tvec2 vc = c - d;\n\tvec2 vd = d - a;\n\tfloat d1 = sdf_line(st, a, b);\n\tfloat d2 = sdf_line(st, b, c);\n\tfloat d3 = sdf_line(st, c, d);\n\tfloat d4 = sdf_line(st, d, a);\n\tfloat l = min(w, h) * 0.5;\n\tif (((((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0)) && (d4 >= 0.0)) || ((((d1 <= 0.0) && (d2 <= 0.0)) && (d3 <= 0.0)) && (d4 <= 0.0))) {\n\t\treturn min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\n\t}\n\td1 = sdf_seg(st, a, b);\n\td2 = sdf_seg(st, b, c);\n\td3 = sdf_seg(st, c, d);\n\td4 = sdf_seg(st, d, a);\n\treturn -min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;\n}\nSDF regular_polygon(vec2 st, vec2 center, float r, float rotation, const int edges, bool hypocycloid) {\n\tvec2 p = st - center;\n\tvec2 v0 = vec2(0, r);\n\tv0 = rotate(v0, -rotation);\n\tfloat a = (2.0 * PI) / float(edges);\n\tfloat ang = angle(v0, p);\n\tang = floor(ang / a);\n\tvec2 v1 = rotate(v0, a * ang);\n\tvec2 v2 = rotate(v0, a * (ang + 1.0));\n\tfloat c_a = cos(0.5 * a);\n\tfloat l = r * c_a;\n\tfloat d = sdf_line(p, v1, v2);\n\tif (hypocycloid && (d >= 0.0)) {\n\t\tvec2 c = (v1 + v2) / 2.0;\n\t\tfloat r2 = r * tan(0.5 * a);\n\t\tvec2 ce = c / (c_a * c_a);\n\t\td = (distance(p, ce) - r2) / (length(ce) - r2);\n\t\treturn d;\n\t}\n\treturn d / l;\n}\nSDF regular_polygon(vec2 st, vec2 center, float r, float rotation, const int edges) {\n\treturn regular_polygon(st, center, r, rotation, edges, false);\n}\nSDF regular_polygon(vec2 st, vec2 center, float r, const int edges, bool hypocycloid) {\n\treturn regular_polygon(st, center, r, 0.0, edges, true);\n}\nSDF regular_polygon(vec2 st, vec2 center, float r, const int edges) {\n\treturn regular_polygon(st, center, r, 0.0, edges, false);\n}\nUDF fill(SDF d, float start, float end, float smth_start, float smth_end) {\n\tsmth_start = (end - start) * smth_start;\n\tsmth_end = (end - start) * smth_end;\n\treturn smoothstep(start, start + smth_start, d) - smoothstep(end - smth_end, end, d);\n}\nUDF fill(SDF d, float start, float end, float smth) {\n\treturn fill(d, start, end, smth, smth);\n}\nUDF fill(SDF d, float start, float smth) {\n\treturn fill(d, start, 1.0, smth, 0.0);\n}\nUDF fill(SDF d, float smth) {\n\treturn fill(d, 0.0, 1.0, smth, 0.0);\n}\nUDF fill(SDF d) {\n\treturn fill(d, 0.0, 1.0, 0.0, 0.0);\n}\nUDF udf_intersect(UDF d1, UDF d2) {\n\tif ((d1 > 0.0) && (d2 > 0.0)) {\n\t\treturn min(d1, d2);\n\t}\n\treturn 0.0;\n}\nUDF udf_union(UDF d1, UDF d2) {\n\tif ((d1 > 0.0) || (d2 > 0.0)) {\n\t\treturn max(d1, d2);\n\t}\n\treturn 0.0;\n}\nUDF udf_complement(UDF d1, UDF d2) {\n\tif (((d1 > 0.0) && (d2 == 0.0)) || ((d1 == 0.0) && (d2 > 0.0)))\n\t\treturn 1.0;\n\treturn 0.0;\n}\n#pragma include <box>\n#pragma include <shapes>\n#endif\n"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "#ifndef M_COLOR\n#define M_COLOR\n#ifndef UDF\n#define UDF float\n#endif\nvec3 rgb2hsb(vec3 c) {\n\tvec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\tvec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n\tvec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\tfloat d = q.x - min(q.w, q.y);\n\tfloat e = 1.0e-10;\n\treturn vec3(abs(q.z + ((q.w - q.y) / ((6.0 * d) + e))), d / (q.x + e), q.x);\n}\nvec3 hsb2rgb(vec3 c) {\n\tvec3 rgb = clamp(abs(mod((c.x * 6.0) + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\n\trgb = (rgb * rgb) * (3.0 - (2.0 * rgb));\n\treturn c.z * mix(vec3(1.0), rgb, c.y);\n}\nvec4 rgba_color(int r, int g, int b, float a) {\n\treturn vec4(float(r / 255), float(g / 255), float(b / 255), a);\n}\nvec4 rgba_color(float r, float g, float b, float a) {\n\treturn vec4(r, g, b, a);\n}\nvec4 rgba_color(vec4 v) {\n\treturn v;\n}\nvec4 rgba_color(vec3 v, float a) {\n\treturn vec4(v, a);\n}\nvec4 rgb_color(int r, int g, int b) {\n\treturn rgba_color(r, g, b, 1.0);\n}\nvec4 rgb_color(float r, float g, float b) {\n\treturn rgba_color(r, g, b, 1.0);\n}\nvec4 rgb_color(vec3 v) {\n\treturn vec4(v, 1.0);\n}\nvec4 hsba_color(float h, float s, float b, float a) {\n\treturn vec4(hsb2rgb(vec3(h, s, b)), a);\n}\nvec4 hsba_color(vec4 v) {\n\treturn vec4(hsb2rgb(v.xyz), v.w);\n}\nvec4 hsba_color(vec3 v, float a) {\n\treturn vec4(hsb2rgb(v), a);\n}\nvec4 hsb_color(float h, float s, float b) {\n\treturn hsba_color(h, s, b, 1.0);\n}\nvec4 hsb_color(vec3 v) {\n\treturn hsba_color(v, 1.0);\n}\n#ifndef RGB\n#define RGB rgb_color\n#endif\n#ifndef RGBA\n#define RGBA rgba_color\n#endif\n#ifndef HSB\n#define HSB hsb_color\n#endif\n#ifndef HSBA\n#define HSBA hsba_color\n#endif\nvoid color(UDF d, vec4 c1, vec4 c2) {\n\tgl_FragColor = mix(c2, c1, d);\n}\nvoid color(UDF d, vec4 c1, vec3 c2) {\n\tcolor(d, c1, vec4(c2, 1.0));\n}\nvoid color(UDF d, vec3 c1, vec4 c2) {\n\tcolor(d, vec4(c1, 1.0), c2);\n}\nvoid color(UDF d, vec3 c1, vec3 c2) {\n\tcolor(d, vec4(c1, 1.0), vec4(c2, 1.0));\n}\nvoid color(UDF d, vec4 c) {\n\tcolor(d, c, gl_FragColor);\n}\nvoid color(UDF d, vec3 c) {\n\tcolor(d, vec4(c, 1.0), gl_FragColor);\n}\n#endif\n"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "#ifndef M_PATTERN\n#define M_PATTERN\nvec2 grid_xy(vec2 st, vec2 grid) {\n\treturn fract(st * grid);\n}\nvoid grid_overlap(vec2 st, vec2 grid, inout vec2 overlap[4]) {\n\tvec2 v = fract(st * grid);\n\toverlap[0] = v;\n\toverlap[1] = v - vec2(1.0, 0.0);\n\toverlap[2] = v - vec2(0.0, 1.0);\n\toverlap[3] = v - vec2(1.0, 1.0);\n}\nvec2 grid_index(vec2 st, vec2 grid) {\n\treturn floor(st * grid);\n}\nbool grid_odd_row(vec2 idx, vec2 grid) {\n\treturn mod(idx.y, 2.0) != 0.0;\n}\nbool grid_even_row(vec2 idx, vec2 grid) {\n\treturn mod(idx.y, 2.0) == 0.0;\n}\nbool grid_odd_col(vec2 idx, vec2 grid) {\n\treturn mod(idx.x, 2.0) != 0.0;\n}\nbool grid_even_col(vec2 idx, vec2 grid) {\n\treturn mod(idx.x, 2.0) == 0.0;\n}\nbool grid_odd(vec2 idx, vec2 grid) {\n\treturn ((mod(idx.x, 2.0) != 0.0) && (mod(idx.y, 2.0) == 0.0)) || ((mod(idx.x, 2.0) == 0.0) && (mod(idx.y, 2.0) != 0.0));\n}\nbool grid_even(vec2 idx, vec2 grid) {\n\treturn !grid_odd(idx, grid);\n}\n#ifndef OCTAVES\n#define OCTAVES 6\n#endif\nfloat mist(vec2 st) {\n\tfloat value = 0.0;\n\tfloat amplitude = 0.5;\n\tfloat frequency = 0.0;\n\tfor (int i = 0; i < OCTAVES; i++) {\n\t\tvalue += (amplitude * noise(st));\n\t\tst *= 2.0;\n\t\tamplitude *= 0.5;\n\t}\n\treturn value;\n}\nfloat juila_set(vec2 st, vec2 center, float dist, vec2 c, float scale) {\n\tconst int max_iterations = 255;\n\tvec2 uv = 2.5 * (st - center);\n\tint count = max_iterations;\n\tfor (int i = 0; i < max_iterations; i++) {\n\t\tuv = c + vec2((uv.x * uv.x) - (uv.y * uv.y), (uv.x * uv.y) * 2.0);\n\t\tif (dot(uv, uv) > 4.0) {\n\t\t\tcount = i;\n\t\t\tbreak;\n\t\t}\n\t}\n\treturn float(count) * scale;\n}\n#endif\n"

/***/ })
/******/ ]);
});