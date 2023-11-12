import participant from "../dto/Participant.ts";

interface input {
    participants: Array<participant>
}

function List(props: input) {
    if (props.participants === null) {
        return <></>
    }
    return (
        <div className="participants">
            <h3>Losują:</h3>
            <ul>
                {props.participants.map((participant) => (
                    <li className={`${participant.chose ? "chose" : ""}`} key={participant.name}>
                        <span>{participant.name}</span>
                        {participant.chose && " - już ma kogoś wylosowane!"}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List