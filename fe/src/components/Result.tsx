interface input {
    name: string
    wishlist: string
}

function Result(props: input) {
    return (
        <div className="result">
            <h2>Prezent od Ciebie dostanie... <span className="colored">{props.name}</span>! 🥳</h2>
            <b>Uwaga! Wynik zniknie kiedy zamkniesz lub odświeżysz stronę! Zapisz lub zapamiętaj swój los!
                To po to żeby nikt nie podglądał kto ma kogo wylosowane 👀</b>
        </div>
    )
}

export default Result