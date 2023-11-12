import {ChangeEvent, useState} from "react";
import Result from '../dto/Result.ts'

interface input {
    participants: Array<string>
    resultHandle: (r: Result) => void
}

function Form({participants, resultHandle}: input) {
    const [name, setName] = useState('')
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`/api/draw`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(`cos sie zjebalo`)
                }
                return res.json()
            })
            .then((data: Result) => {
                resultHandle(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Wylosuj komu zrobisz prezent!</h2>
                <div className="select-group">
                    <label htmlFor="name">Moje imię:</label>
                    <select id="name" onChange={e => setName(e.target.value)} value={name}>
                        <option value="">Nazywam się...</option>
                        {participants.map((name) => (
                            <option value={name} key={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="button-group">
                    <input type="submit" className="submit" value="Wylosuj!"/>
                </div>
            </form>
        </div>
    )
}

export default Form