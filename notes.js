const fs = require('fs')

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json')
		return JSON.parse(notesString)
	} catch (e) {
		return []
	}
}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var addNote = (title, body) => {
	var notes = fetchNotes()
	var note = {
		title,
		body
	}
	var duplicateNotes = notes.filter((note) => note.title === title)

	if (duplicateNotes.length === 0) {
		notes.push(note)
		saveNotes(notes)
		return note
	}
}

var getAll = (title, body) => {
	return fetchNotes()
}

var getNote = (title) => {
	var notes = fetchNotes()
	var foundNotes = notes.filter((notes) => notes.title === title)
	return foundNotes[0]
}

var removeNote = (title) => {
	var notes = fetchNotes()
	var filteredNotes = notes.filter((notes) => notes.title !== title)
	saveNotes(filteredNotes)

	return notes.length !== filteredNotes.length
}

var logNote = (note) => {
	console.log('--')
	console.log(`Title: ${note.title}`)
	console.log(`Body: ${note.body}`)
}

module.exports = {
	// same as addNote: addNote, only if property is exact same
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
}