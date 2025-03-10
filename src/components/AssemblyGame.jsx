import { languages } from "../libs/languages";
import { useState } from 'react';

export default function AssemblyEndgame() {

    const [currentWord, setCurrentWord] = useState("react");
    
    const currentWordElements = currentWord.split("").map((letter, index) => (
        <span 
            key={index}    
            className="letter-showcase"
        >
            {letter.toLocaleUpperCase()}
        </span>
    ));
    
    const languageElements = languages.map((lang) => (
        <span
            key={lang.name}
            className="language-chip"
            style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
            }}
        >
            {lang.name}
        </span>
    ));

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    const keyboard = alphabet.split("").map((key, index) =>
        <button
            key={index + key}
            className="letter-key"
        >
            {key.toUpperCase()}
        </button>
    )

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
            <section className="language-box">
                {languageElements}
            </section>
            <section className="guess-container">
                {currentWordElements}    
            </section>
            <section className="keyboard">
              {keyboard}
            </section>
            <button className="new-game">New Game</button>
        </main>
        </>
    );
}