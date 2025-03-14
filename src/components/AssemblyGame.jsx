import { languages } from "../libs/languages";
import { getFarewellText } from "../libs/utils";
import { useState } from 'react';
import { clsx } from "clsx"

export default function AssemblyEndgame() {

    //State Variables
    const [currentWord, setCurrentWord] = useState("refactor");
    const [guessedLetters, setCurrentGuesses] = useState([]);

    function addGuessedLetter(letter) {
        setCurrentGuesses(prevGuesses => 
            prevGuesses.includes(letter) ?
            prevGuesses :
            [...prevGuesses, letter]
        );
    }

    //Derived values
    const wrongGuessCount = guessedLetters
        .filter(letter => !currentWord
        .includes(letter))
        .length;
    
    const lostLanguage = wrongGuessCount > 0 ? languages.at(wrongGuessCount-1).name : "";
    
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
    const numberOfGuessesLeft = (languages.length - 1) - wrongGuessCount;
    
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameWon = currentWord
        .split("")
        .every(letter => guessedLetters.includes(letter));
    const isGameOver = isGameWon || isGameLost;

    //Static Values
    function renderGameStatus() {
        if(wrongGuessCount > 0 && !isGameOver) {
            return(
                <span>{getFarewellText(lostLanguage)}</span>
            );
        } else if(isGameWon) {
            return(
                <>
                    <h2>You Win!</h2>
                    <p>Well done! 🎉</p>
                </>
            );
        } else if(isGameLost) {
            return(
                <>
                    <h2>Game Over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            );    
        } else {
            return null;
        }
    }
   
    const gameStatusClass = clsx("game-status", {
        'in-progress': !isGameOver,
        won: isGameWon,
        lost: isGameLost,
        'lost-language': lostLanguage.length > 0 && !isGameOver,
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
        
        const isLostLanguage = index < wrongGuessCount;
        const className = clsx("language-chip", {
            lost: isLostLanguage,
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
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`letter ${letter}`}
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
            
            <section 
                aria-live="polite" 
                role="status" 
                className={gameStatusClass}
            >
                {renderGameStatus()}
            </section>
            
            <section className="language-box">
                {languageElements}
            </section>
            
            <section className="guess-container">
                {currentWordElements}    
            </section>
            
            <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Correct! The letter ${lastGuessedLetter} is in the word.` :
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    {`You have ${numberOfGuessesLeft} attempts left.`}
                </p>
                <p>Current word: {currentWord.split("").map(letter =>
                    guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}
                </p>
            </section>

            <section className="keyboard">
              {keyboardElement}
            </section>
            
            {isGameOver ? <button className="new-game">New Game</button> : ""}

        </main>
        </>
    );
}
