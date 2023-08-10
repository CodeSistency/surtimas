import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <main className="App">
            <article style={{ padding: "100px" }}>
                <h1>Oops!</h1>
                <p>Page Not Found</p>
                <div className="flexGrow">
                    <Link to="/">Visit Our Homepage</Link>
                </div>
            </article>
        </main>
    )
}

export default Missing
