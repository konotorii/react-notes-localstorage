import {NoteType} from "../types/Note";

export default function Note({note, update}: { note: NoteType, update: Function }) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const notes = JSON.parse(localStorage.getItem('notes') || "[{}]") as NoteType[]

        const find = notes.findIndex((aNote: NoteType) => aNote.key === note.key);

        if (find === -1) {
            alert(`Note couldn't be found in localstorage!`)
        }

        if (e.target.name === "note") {
            notes[find].str = e.target.value;
        } else if (e.target.name === "title") {
            notes[find].title = e.target.value;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        update(notes)
    }

    return (
        <div className={'note'}>
            <input defaultValue={note.title} onChange={onChange} name={"title"} className={'title'}/>
            <textarea defaultValue={note.str} onChange={onChange} name={'note'} className={'note'} rows={40}/>
        </div>
    )
}