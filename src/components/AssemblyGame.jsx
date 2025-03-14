import { languages } from "../libs/languages";
import { useState } from 'react';
import { clsx } from "clsx"

export default function AssemblyEndgame() {

    //State Variables
    const [currentWord, setCurrentWord] = useState("react");
    const [guessedLetters, setCurrentGuesses] = useState([]);
    
    //Derived values
    const wrongGuessCount = guessedLetters
        .filter(letter => !currentWord
        .includes(letter))
        .length;
    
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameWon = currentWord
        .split("")
        .every(letter => guessedLetters.includes(letter));
    const isGameOver = isGameWon || isGameLost;

    function addGuessedLetter(letter) {
        setCurrentGuesses(prevGuesses => 
            prevGuesses.includes(letter) ?
            prevGuesses :
            [...prevGuesses, letter]
        );
    }

    //Static Values
    const gameWinStatus = 
        <>
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
        </>;
    
    const gameLostStatus = 
    <>
        <h2>Game Over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
    </>;

    const gameStatusClass = clsx("game-status", {
        'in-progress': !isGameOver,
        won: isGameWon,
        lost: isGameLost,
    })

    const currentWordElements = currentWord.split("").map((letter, index) => {
        return(
            <span 
                key={index}    
                className={`letter-showcase`}
            >
                {guessedLetters.includes(letter) ? letter.toLocaleUpperCase() : ""}
            </span>
        );
    });
    
    const languageElements = languages.map((lang, index) => {
        const className = clsx("language-chip", {
            lost: index < wrongGuessCount
        });
        return(
            <span
            key={lang.name}
            className={className}
            style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
            }}
        >
            {lang.name}
        </span>
        );
   });

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    const keyboardElement = alphabet.split("").map((letter, index) => {
        
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        
        return (
            <button
                key={index + letter}
                className={className}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        );
       
    })

    return(
        <>
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            
            <section className={gameStatusClass}>
                {isGameLost && gameLostStatus}
                {isGameWon && gameWinStatus}
            </section>
            <section className="language-box">
                {languageElements}
            </section>
            <section className="guess-container">
                {currentWordElements}    
            </section>
            <section className="keyboard">
              {keyboardElement}
            </section>
            {isGameOver ? <button className="new-game">New Game</button> : ""}
        </main>
        </>
    );
}
