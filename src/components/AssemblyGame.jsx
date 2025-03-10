import { languages } from "../libs/languages";

export default function AssemblyEndgame() {
    
    const progLangs = languages
        .map(lang => 
            <p 
                style={{
                    backgroundColor: lang.backgroundColor,
                    color: lang.color
                }}>
                {lang.name}
            </p>
        );

    return(
        <>
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You Win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <div className="langugages-container">
                {progLangs}
            </div>
        </main>
        </>
    );
}