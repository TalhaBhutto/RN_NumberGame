import React from 'react'
import {View,Button,Text,StyleSheet,Alert} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween=(min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNum=Math.floor(Math.random()*(max-min))+min;
    if(rndNum===exclude){
        return generateRandomBetween(min,max,exclude);
    }
    else{
        return rndNum;
    }
}

function GameScreen(props) {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100,props.userChoice));
    const currentLow=useRef(1);
    const [rounds, setRounds] = useState(0)
    const {userChoice,onGameOver}=props;
    useEffect(()=>{
        if(currentGuess===userChoice){
            onGameOver(rounds);
        }
    },[currentGuess,userChoice,onGameOver])
    const currentHigh=useRef(100);
    const nextGuessHandler=direction=>{
        if((direction==='lower' && currentGuess<props.userChoice)||(direction==='greater' && currentGuess>props.userChoice)){
            Alert.alert('Don\'t lie!','You pressed the Wrong Button!!',[{text:'Sorry!',style:'cancel'}]);
            return
        }
        else{
            if(direction==='lower'){
                currentHigh.current=currentGuess;
            }
            else{
                currentLow.current=currentGuess;
            }
            const nextNumber =generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
            setCurrentGuess(nextNumber);
            setRounds(curRounds=>curRounds+1);
        }
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this,'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')}/>
            </View>
        </View>
    )

}
const styles=StyleSheet.create({
screen:{
    flex:1,
    padding:10,
    alignItems:'center',

},
buttonContainer:{
    flex:1,
    minHeight:'70%',
    shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        backgroundColor:'white',
        elevation: 5,
        padding:20,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
}
});

export default GameScreen
