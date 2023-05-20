// define book constructor
// allow it to take arguments from the console
// format page to allow rows of books
// connect the constructor to a form on the page
    // could also maybe use regular text input and innerHTML
// add attribute that changes based on read or not read

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.info = function() {
		return (
		`$[title], $[author], $[pages], $[read]`
        );
	}
}
