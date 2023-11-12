import './index.scss'
import ResultComponent from "./components/Result.tsx";
import {useState} from "react";
import Result from "./dto/Result.ts"
import List from "./components/List.tsx";
import Form from "./components/Form.tsx";
import fetchParticipants from "./api/Fetch.ts";

function App() {
    let [result, setResult] = useState<Result|null>(null)
    const {data: participants, loading} = fetchParticipants(`/api/participants`)

    let body
    if (result === null) {
        body =
            <>
                {loading && "Czekam na odpowiedź na list do Mikołaja... "}
                {participants && <List participants={participants}/>}
                {participants && <Form
                    participants={participants.filter((participant) => !participant.chose).map(p => p.name)}
                    resultHandle={setResult}
                />}
            </>
    } else {
        body = <ResultComponent name={result.name} wishlist={result.wishlist}/>
    }
    return (
        <>
            {body}
        </>
    )
}

export default App
