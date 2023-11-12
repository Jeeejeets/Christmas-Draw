import {useEffect, useState} from "react";
import Participant from "../dto/Participant.ts";

function fetchParticipants(url: string) { // it has to start with use or won't work
    let [data, setData] = useState<Array<Participant>>([])
    let [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('failed to fetch the list of participants')
                }
                return res.json()
            })
            .then((data: Array<Participant>) => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err.message)
            })
    }, []) // I could ad a var as a dep and the func will run everytime var changes

    return {data, loading}
}

export default fetchParticipants;