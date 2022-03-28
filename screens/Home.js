import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {AspectRatio, Box, Button, Icon, Image, Input} from "native-base";
import {FontAwesome5} from "@expo/vector-icons"
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";


function Home(props){

  //  const [email, setEmail]=useState('')
    useEffect(() => {
       // console.log(props)
       // setEmail(props.route.params.email)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Bine ai venit pe platforma de donare!</Text>
                {/*<Text value={email} > {email}</Text>*/}
                <Button  onPress={()=>props.navigation.navigate('Reclamatii') }>Haine</Button>
                <Button  onPress={()=>props.navigation.navigate('Food') }>Mancare</Button>
                <Button  onPress={()=>props.navigation.navigate('Furniture') }>Mobilier</Button>
            </View>
        </View>
    )
}

export default (props)=>{
    return (
        <NativeBaseProvider>
            <Home {...props}/>
        </NativeBaseProvider>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    LoginText:{
        marginTop:100,
        fontSize:30,
        fontWeight:'bold',
    },
    Middle:{
        alignItems:'center',
        justifyContent:'center',
    },
    text2:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:5
    },
    SignupText:{
        fontWeight:'bold',
        fontSize:15,
        justifyContent:'flex-start',

    },
    emailInput:{
        marginTop:10,
        marginRight:5,
    },
    buttonStyle:{
        marginTop:30,
        marginLeft:15,
        marginRight:15
    },
    buttonStyleX:{
        marginTop:12,
        marginLeft:15,
        marginRight:15
    },
    buttonDesign:{
        backgroundColor:'#026efd'
    },
    lineStyle:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        alignItems:'center',
    },
    boxStyle:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        justifyContent:'space-around'
    }
})