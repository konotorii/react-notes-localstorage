import React, {useEffect, useState} from 'react';
import Note from "./components/Note";
import {NoteType} from './types/Note';

export default function App() {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [selection, setSelection] = useState<NoteType>();

    useEffect(() => {
        const find = localStorage.getItem('notes')

        if (find) {
            setNotes(JSON.parse(find))
        }
    }, []);

    const createNote = () => {
        let a = notes
        a.concat({str: "", title: "", key: notes.length + 1})
        setNotes(a)
        localStorage.setItem('notes', JSON.stringify(a))
    }

    const deleteNote = (note: NoteType) => {
        let a = notes
        const find = a.findIndex((aNote: NoteType) => aNote.key === note.key);
        if (find === -1) {
            alert(`Note couldn't be found!`)
        }
        a.splice(find, 1);
        localStorage.setItem('notes', JSON.stringify(a))
        setNotes(a)
    }

    return (
        <div className="App">
            {/*Select a note*/}
            <div className="buttons">
                {
                    notes.length > 0 && notes.map((note) => (
                        <div onClick={() => setSelection(note)} key={note.key} className={'note-button'}>
                            <div>
                                {note.title}
                                <button onClick={() => deleteNote(note)} className={'delete'}>
                                    x
                                </button>
                            </div>
                        </div>
                    ))
                }
                <button onClick={createNote} className={'note-button'}>
                    +
                </button>
            </div>
            {/*Display selected note*/}
            {
                selection && (
                    <Note note={selection} update={setNotes}/>
                )
            }
        </div>
    );
}