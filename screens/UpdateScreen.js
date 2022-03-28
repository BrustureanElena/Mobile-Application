import {View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Button, ScrollView, Text, TextArea, useToast} from "native-base";
import {connect} from "react-redux";
import {UpdateReclamatie} from "../store/reclamatiiActions";

function UpdateScreen (props) {
    console.log(props)

    //creeaza o reclamatie pe care o urmareste
    const [reclamatie, setReclamatie] = useState(undefined)
    const [nume, setNume] = useState("")
    const [cnp, setCnp] = useState("")
    const [telefon, setTelefon] = useState("")
    const [email, setEmail] = useState("")
    const [descriere, setDescriere] = useState("")
    const toast = useToast()

    //cauta reclamatia cu id-ul reclamatiei trimise ca parametru
    useEffect (() => {
        setReclamatie(props.listaReclamatii.find((reclamatie)=> props.route.params.idReclamatie === reclamatie.id))
    }, [props.listaReclamatii])

    useEffect( () => {
        if(reclamatie) {
            setNume(reclamatie.nume)
            setCnp(reclamatie.cnp)
            setTelefon(reclamatie.telefon)
            setEmail(reclamatie.email)
            setDescriere(reclamatie.descriere)
        }
    }, [reclamatie])

    const updateReclamatie = async() => {
        const reclamatieNoua = {
            id:props.route.params.idReclamatie,
            nume,
            cnp,
            telefon,
            email,
            descriere
        }
        const actionResult =  await props.updateReclamatie(reclamatieNoua)
        toast.show({
            description: actionResult,
        })
        if(actionResult!== "Reclamatie modificata"){
            return
        }

        props.navigation.goBack()
    }

    if(reclamatie)
    return (
        <ScrollView>
            <Text>Nume</Text>
            <TextArea style={{backgroundColor:'white'}} value={nume} onChangeText={(e)=>{setNume(e)}} h={10} />
            <Text>CNP</Text>
            <TextArea style={{backgroundColor:'white'}} value={cnp} onChangeText={(e)=>{setCnp(e)}} h={10}/>
            <Text>Telefon</Text>
            <TextArea style={{backgroundColor:'white'}} value={telefon} onChangeText={(e)=>{setTelefon(e)}} h={10} />
            <Text>Email</Text>
            <TextArea style={{backgroundColor:'white'}} value={email} onChangeText={(e)=>{setEmail(e)}} h={10} />
            <Text>Descriere</Text>
            <TextArea style={{backgroundColor:'white'}} value={descriere} onChangeText={(e)=>{setDescriere(e)}} h={10} />
            <Button onPress={updateReclamatie}> Update </Button>
        </ScrollView>
    )
    return (<View><Text>Loading</Text></View>)
}
/*
adauga la props si ce ii mai dau de ex listarECLAM
connect = (props) => {
    <UpdateScreen {...props} {listaReclamatii:state.reclamatii}></UpdateScreen>
}
*/
//un fel de CA SA ACCESAM REPOSITORYUL FOLOSIM CONNECT
//pentru Redux, componentele nu le pot accesa in store direct, de asta avem nevoie de connect
//dispatch is a function of the Redux store. You call store. dispatch to dispatch an action.
// This is the only way to trigger a state change. With React Redux, your components never access
// the store directly - connect does it for you.
export default connect((state)=>({listaReclamatii:state.reclamatii}),
    (dispatch)=>({updateReclamatie:UpdateReclamatie(dispatch)}))(UpdateScreen)