var database = (function() {

	var db; 

	function onerror() {
		console.log('Error !');
	};

	function getAllFiles(onFile) {

		var trans = db.transaction(["files"], "readwrite");
		var store = trans.objectStore("files");
		var keyRange = IDBKeyRange.lowerBound(0);
		var cursorRequest = store.openCursor(keyRange);

		cursorRequest.onsuccess = function(e) {
			var result = e.target.result;

			if(!!result == false)
		  		return;

			onFile(result.value);
			result.continue();
		};

		cursorRequest.onerror = onerror;			
	}

	function getByFileTypeId(onFile, fileTypeId) {

		var trans = db.transaction(["files"], "readwrite");
		var store = trans.objectStore("files");
		var index = store.index('getByFileTypeIndex');
		var request = index.openCursor(IDBKeyRange.only([fileTypeId]));

		request.onsuccess = function(e) {
			var result = e.target.result;

			if(!!result == false)
		  		return;

			onFile(result.value);
			result.continue();
		};

		request.onerror = onerror;	
	}

	var guid = (function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return function() {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		};
	})();

	return {
		open: function(onFile) {

			var version = 1;
			var request = indexedDB.open("files", version);

			request.onupgradeneeded = function(e) {
				var dbUpgrade = e.target.result;

				e.target.transaction.onerror = onerror;

				if(dbUpgrade.objectStoreNames.contains("files")) {
			  		dbUpgrade.deleteObjectStore("files");
				}

				var store = dbUpgrade.createObjectStore("files", { keyPath: "id" });
				store.createIndex('getByFileTypeIndex', ['filetypeid'], { unique:false } );
			};

			request.onsuccess = function(e) {
				db = e.target.result;
				getAllFiles(onFile);
			};

			request.onerror = onerror;
		},

		addFile: function(file, callback) {

			var trans = db.transaction(["files"], "readwrite");
			var store = trans.objectStore("files");

			file.id = guid();

			var request = store.put(file);

			trans.oncomplete = function(e) {
				callback(file, null);
			};

			request.onerror = function(e) {
				callback(null, e.value);
			};					
		},

		deleteFile: function (id, callback) {

			var trans = db.transaction(["files"], "readwrite");
			var store = trans.objectStore("files");
			var request = store.delete(id);

			trans.oncomplete = function(e) {
				callback({status: "success"}, null); 
			};

			request.onerror = function(e) {
				callback(null, e.value); 
			};
		},

		getAllFiles: function(onFile) {
			getAllFiles(onFile);
		},

		getByFileTypeId: function(fileTypeId, onFile) {
			getByFileTypeId(onFile, fileTypeId);
		},
	};
}());