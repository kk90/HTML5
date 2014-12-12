var database = (function() {

	var db; 
	var listId;
	var fileTypeIds;

	function clearFileContent() {
    	var filesList = document.getElementById(listId);
		filesList.innerHTML = "";
    }

	function onerror() {
		console.log('Error !');
	};

	function renderFile(row) {

		var filesList = document.getElementById(listId);
		var li = document.createElement("li");
		var a = document.createElement("a");
		var t = document.createTextNode("File: " + row.filename + ", Date: " + row.filedate + ", Type: " + row.filetype);

		a.addEventListener("click", function(e) {
			database.deleteFile(row.id);
		});

		a.textContent = "[Delete File]";
		a.style.cursor = "pointer";
		li.appendChild(t);
		li.appendChild(a);

		filesList.appendChild(li);
	}

	function getAllFiles() {

		clearFileContent();
		var trans = db.transaction(["files"], "readwrite");
		var store = trans.objectStore("files");
		var keyRange = IDBKeyRange.lowerBound(0);
		var cursorRequest = store.openCursor(keyRange);

		cursorRequest.onsuccess = function(e) {
			var result = e.target.result;

			if(!!result == false)
		  		return;

			renderFile(result.value);
			result.continue();
		};

		cursorRequest.onerror = onerror;			
	}

	function getTextFiles() {

		clearFileContent();
			
	}

	function getImageFiles() {

		clearFileContent();
			
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
		open: function() {

			var version = 1;
			var request = indexedDB.open("files", version);

			request.onupgradeneeded = function(e) {
				var dbUpgrade = e.target.result;

				e.target.transaction.onerror = onerror;

				if(dbUpgrade.objectStoreNames.contains("files")) {
			  		dbUpgrade.deleteObjectStore("files");
				}

				var store = dbUpgrade.createObjectStore("files", { keyPath: "id" });
			};

			request.onsuccess = function(e) {
				db = e.target.result;
				getAllFiles();
			};

			request.onerror = onerror;
		},

		addFile: function(file) {

			var trans = db.transaction(["files"], "readwrite");
			var store = trans.objectStore("files");

			file.id = guid();

			var request = store.put(file);

			trans.oncomplete = function(e) {
				renderFile(file);
			};

			request.onerror = function(e) {
				console.log(e.value);
			};					
		},

		deleteFile: function (id) {

			var trans = db.transaction(["files"], "readwrite");
			var store = trans.objectStore("files");
			var request = store.delete(id);

			trans.oncomplete = function(e) {
				getAllFiles(); 
			};

			request.onerror = function(e) {
				console.log(e);
			};
		},

		renderAllFiles: function() {
			getAllFiles();
		},

		renderTextFiles: function() {
			getTextFiles();
			alert("TODO: get text (" + fileTypeIds.text+ ")" );
		},

		renderImageFiles: function() {
			getImageFiles();
			alert("TODO: get image (" + fileTypeIds.image + ")" );
		},

		addListId: function(Id) {
			listId = Id;
		},

		setFileTypeIds: function(_fileTypeIds) {
			fileTypeIds = _fileTypeIds;
		}
	};
}());