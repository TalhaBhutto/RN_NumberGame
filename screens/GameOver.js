import React from 'react'
import {View,Text,StyleSheet,Button} from 'react-native';

function GameOver(props) {
    return (
        <View>
            <Text>The Game is Over</Text>
            <Text>The Computer took {props.roundsNumber} rounds to guess that the number was {props.userNumber}.</Text>
            <Button title="Play Again" onPress={props.onRestart} />
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default GameOver
