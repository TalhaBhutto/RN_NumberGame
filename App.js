import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import {useState} from 'react'
import GameOverScreen from './screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler=()=>{
    setGuessRounds(0);
    setUserNumber(null);
  }
  const gameOverHandler=numOfRounds=>{
    setGuessRounds(numOfRounds);
  }
  const startGameHandler=(selectedNumber)=>{
    setUserNumber(selectedNumber);
  }
  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNumber&& guessRounds<=0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }
  if(guessRounds>0){
    content=<GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }
  return (
    <View styles={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
      </View>
  );
}

const styles = StyleSheet.create({
 screen:{
   flex:1,
 }
});
