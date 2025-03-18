import "../App.css";


export function Contact() {

    /**
     * The contact page is a page that tells the user how to contact the developers of VibeTribe
     */

    return (
        <section className="sectionMargin flex text-center items-center fixed-top">

        <div className="text-center">
            <h1 className="pageTitle">Contact us</h1>
            <p className="textContainer"></p>
            <ul className="no-points">
                <li><span><b>Email:</b></span> hannamag@chalmers.se </li>
                <li><span><b>Email:</b></span> hildala@chalmers.se</li>
                <li><span><b>Email:</b></span> emiuw@chalmers.se</li>
                <li><span><b>Email:</b></span> leopoldw@chalmers.se</li>
                <li><span><b>Email:</b></span> senjak@chalmers.se</li>
            </ul>
        </div>
        </section>
    )
}