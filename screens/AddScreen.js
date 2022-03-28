import {Dimensions, StyleSheet, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {AspectRatio, Button, ScrollView, Text, TextArea, TextField, useToast} from "native-base";
import {connect} from "react-redux";
import {AddReclamatie} from "../store/reclamatiiActions";
import {Image} from 'react-native';
import {
    Select,
    VStack,
    CheckIcon,
    Center,
    NativeBaseProvider,
} from "native-base"
import ValidationAlert from "../components/Alert";

function AddScreen (props) {
    const [nume, setNume] = useState("")
    const [cnp, setCnp] = useState("")
    const [telefon, setTelefon] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [descriere, setDescriere] = useState("")
    const [categorie, setCategorie] = useState("")
    const [imagine, setImagine] = useState("")
    const [showValidation, setShowValidation] = useState(false)
    const [showImage, setShowImage] = useState(false)

    useEffect( () => {
        if (imagine.startsWith("http://") || imagine.startsWith("https://"))
            {
                setShowImage(true)
        }
    }, [imagine])

    const renderImage = () => {
        if (showImage) return (
            <AspectRatio ratio={16 / 9}>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: imagine}}
                    alt={"image"}
                />
            </AspectRatio>)
        return <View></View>
    }

    const toast = useToast()
    const adaugaReclamatie = async () => {
        const reclamatieNoua = {
            nume,
            cnp,
            telefon,
            date,
            email,
            imagine,
            descriere,
            categorie,
            status:"Postat"
        }
        if(nume==="" || cnp==="" || telefon==="" || date==="" || email==="" ||  descriere==="" || categorie==="" || imagine==="") {
            setShowValidation(true)
            return
        }
        const actionResult = await props.addReclamatie(reclamatieNoua)
        toast.show({
            description: actionResult,
        })
        if (actionResult !== 'Reclamatie adaugata'){
            return
        }
        props.navigation.goBack()
    }

    return (
        <ScrollView style={styles.addScreen}>
            <ValidationAlert message={{
                primary: "Reclamatia nu a fost adaugata!",
                secondary: "Va rugam sa completati toate campurile de mai jos!"}}
                             show={showValidation}
                             setShow={setShowValidation}/>
            <Text>Nume</Text>
            <TextArea value={nume} onChangeText={(e)=>{setNume(e)}} h={10} />
            <Text>CNP</Text>
            <TextField value={cnp} onChangeText={(e)=>{setCnp(e)}} h={10}/>
            <Text>Telefon</Text>
            <TextField value={telefon} onChangeText={(e)=>{setTelefon(e)}} h={10} />
            <Text>Email</Text>
            <TextField value={email} onChangeText={(e)=>{setEmail(e)}} h={10} />
            <Text>Descriere</Text>
            <TextField value={descriere} onChangeText={(e)=>{setDescriere(e)}} h={10} />
            <Text>Imagine</Text>
            <TextField value={imagine} onChangeText={(e)=>{setImagine(e)}} h={10} />
            <Text>Data</Text>
            <TextField value={date} onChangeText={(e)=>{setDate(e)}} h={10} />
            <Text>Categorie</Text>
            <Select
                selectedValue={categorie}
                minWidth="200"
                accessibilityLabel="Alege categorie"
                placeholder="Alege categorie"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setCategorie(itemValue)}
            >
                <Select.Item label="Parcari" value="Parcari" />
                <Select.Item label="Iluminat" value="Iluminat" />
                <Select.Item label="Deseuri" value="Deseuri" />

            </Select>

            <Button onPress={adaugaReclamatie}>Adauga</Button>

        </ScrollView>

    )
}
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    addScreen: {
        height: windowHeight/2,
        overflow: "scroll",
        paddingBottom: 20,
    }
})

// Injecteaza in componenta state-ul aplicatiei
const mapStateToProps = (state) => {
    return {
        listaReclamatii: state.reclamatii
    }
}

// Injecteaza in componenta actiunile, AddReclamatie e o actiune
const mapDispatchToProps = (dispatch) => {
    return {addReclamatie:AddReclamatie(dispatch)}
}

//The only way to update the state is to call store.dispatch() and pass in an action object.

//un fel de CA SA ACCESAM REPOSITORYUL FOLOSIM CONNECT
//pentru Redux, componentele nu le pot accesa in store direct, de asta avem nevoie de connect
//dispatch is a function of the Redux store. You call store. dispatch to dispatch an action.
// This is the only way to trigger a state change. With React Redux, your components never access
// the store directly - connect does it for you.
export default connect(mapStateToProps,mapDispatchToProps)
    (AddScreen)