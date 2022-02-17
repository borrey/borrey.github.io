
/*
https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore
*/
export class BorreyOracle{

    constructor(){
        const request = db = indexedDB.open("borrey");

        request.onupgradeneeded = ()=>{ this.upgrade( request ); };
        request.onsuccess = e=>{};//db = e.target.result
        request.onerror = e=>{};//db = e.target.result
    }
//createObjectStore(<table_name>, { keyPath : <object_id>})
// tx = db.transaction(<table_name>,'readwrite')
// tx.onerror = e=>{ e.target.error}
// store = tx.objectStore(<table_name>)
// store.put(<object>)

//tx = db.transaction(<table_name>,'readonly')
//store = tx.objectStore(<table_name>)
//qrequest = store.openCursor()
//qrequest.onsuccess = e=>{ cursor = e.target.result }
//... if(cursor){ //do something // cursor.continue() }

    upgrade( request ){
        //var db = request.result;
        //var store = db.createObjectStore("books", {keyPath: "isbn"});
        //var titleIndex = store.createIndex("by_title", "title", {unique: true});
        //var authorIndex = store.createIndex("by_author", "author");
        // Populate with initial data.
  //store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
  //store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
  //store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
    }

    /*
    var tx = db.transaction("books", "readwrite");
var store = tx.objectStore("books");

store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

tx.oncomplete = function() {
  // All requests have succeeded and the transaction has committed.
};
*/



}

/*
The following example looks up a single book in the database by title using an index.

var tx = db.transaction("books", "readonly");
var store = tx.objectStore("books");
var index = store.index("by_title");

var request = index.get("Bedrock Nights");
request.onsuccess = function() {
  var matching = request.result;
  if (matching !== undefined) {
    // A match was found.
    report(matching.isbn, matching.title, matching.author);
  } else {
    // No match was found.
    report(null);
  }
};
The following example looks up all books in the database by author using an index and a cursor.

var tx = db.transaction("books", "readonly");
var store = tx.objectStore("books");
var index = store.index("by_author");

var request = index.openCursor(IDBKeyRange.only("Fred"));
request.onsuccess = function() {
  var cursor = request.result;
  if (cursor) {
    // Called for each matching record.
    report(cursor.value.isbn, cursor.value.title, cursor.value.author);
    cursor.continue();
  } else {
    // No more matching records.
    report(null);
  }
};
*/

/*
The following example shows how errors could be handled when a request fails.

var tx = db.transaction("books", "readwrite");
var store = tx.objectStore("books");
var request = store.put({title: "Water Buffaloes", author: "Slate", isbn: 987654});
request.onerror = function(event) {
  // The uniqueness constraint of the "by_title" index failed.
  report(request.error);
  // Could call event.preventDefault() to prevent the transaction from aborting.
};
tx.onabort = function() {
  // Otherwise the transaction will automatically abort due the failed request.
  report(tx.error);
};
The database connection can be closed when it is no longer needed.

db.close();

*/
