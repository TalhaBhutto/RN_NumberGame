import React from 'react';
import {View,Text,StyleSheet, Button, TouchableWithoutFeedback, Keyboard,Alert} from 'react-native';
import Colors from '../constants/colors'
import Input from '../components/Input'
import {useState} from 'react';
import NumberContainer from '../components/NumberContainer'

const StartGameScreen=props=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState('')
    const numberInputHandler=inputText=>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };
    const resetInputHandler=()=>{
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler=()=>{
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber)||chosenNumber<=0||chosenNumber>99){
            Alert.alert('Invalid Number!','Input has to be a number between 1 and 99.',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])
            return;
        }
        else{
            setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        }
    }
    let confirmedOutput;
    if(confirmed){
        confirmedOutput=
        <View style={styles.displayContainer}>
            <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button onPress={()=>props.onStartGame(selectedNumber)} title="Start Game" />
        </View>
    }
    else{

    }
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game!</Text>
            <View style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input onChangeText={numberInputHandler} value={enteredValue} style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType='number-pad' maxLength={2} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button color={Colors.accent} title="Reset" onPress={resetInputHandler} /></View>
                    <View style={styles.button} ><Button color={Colors.primary} title="Confirm" onPress={confirmInputHandler} /></View>
                </View>
            </View>
            {confirmedOutput}
        </View>
        )
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },
    title:{
        fontSize:20,
        marginVertical:10,

    },
    inputContainer:{
        width:300,
        maxWidth:"80%",
        height:140,
        alignItems:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        backgroundColor:'white',
        elevation: 2,
        padding:20,
        borderRadius:10,
    },
    displayContainer:{
        width:200,
        maxWidth:"60%",
        height:160,
        alignItems:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        backgroundColor:'white',
        elevation: 10,
        padding:20,
        borderRadius:10,
        margin:10,
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    button:{
        width:100
    },
    input:{
        width:100,
        textAlign:'center'
    }
});

export default StartGameScreen;