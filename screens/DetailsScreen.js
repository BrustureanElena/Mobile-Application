import React, {useEffect, useState} from 'react'
import {AspectRatio, Button, Modal, Text, useToast, View} from "native-base";
import {DeleteReclamatie} from "../store/reclamatiiActions";
import {connect} from "react-redux";
import {Image} from "react-native";
import ValidationAlert from "../components/Alert";

function DetailsScreen (props) {
    const [showModal, setShowModal] = useState(false)
    const [showOffline, setShowOffline] = useState(false)
    const [reclamatie, setReclamatie] = useState({})
    if (props.route.params.idReclamatie === undefined) {
        return <Text> Nu a fost pasata o reclamatie </Text>
    }
    //iau reclamatia trimisa de la MainScreen
    useEffect (() => {
        setReclamatie(props.listaReclamatii.find((reclamatie)=> props.route.params.idReclamatie === reclamatie.id))
    }, [props.listaReclamatii])

    const toast = useToast()

    useEffect ( () => {
        setShowOffline(!props.isOnline)
    }, [props.isOnline])

    if (reclamatie)
    return (
        <View>
            <ValidationAlert message={{
                primary: "Conexiunea la server nu s-a putut realiza",
                secondary: "Delete si Update nu pot fi accesate offline"}}
                             show={showOffline}
                             setShow={setShowOffline}/>
            <AspectRatio ratio={16 / 9}>

                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: reclamatie.imagine}}
                    alt={"image"}
                />
            </AspectRatio>
            <Text>Nume reclamator:   {reclamatie.nume} </Text>
            <Text>Telefon:  {reclamatie.telefon}</Text>
            <Text>Descriere:  i{reclamatie.descriere}</Text>
            <Text>Categorie:  {reclamatie.categorie}</Text>
            <Text>Data postarii:  {reclamatie.date}</Text>
            <Text>Status:  {reclamatie.status}</Text>

            <Button size="lg"
                    onPress={()=>{setShowModal(true)}}
                    colorScheme="secondary"
                    isDisabled={!props.isOnline}>
                Delete

            </Button>

            <Button
                isDisabled={!props.isOnline}
                onPress={() => props.navigation.navigate('Update', {idReclamatie: reclamatie.id})}
                size="lg"
               // onPress={() => console.log('hello world')}
            >
                Update
            </Button>

            <Modal isOpen={showModal} onClose={()=>{setShowModal(false)}}>
                <Modal.Content>
                    <Modal.Header><Modal.CloseButton/></Modal.Header>
                    <Modal.Body>
                        <Text>Esti sigur ca vrei sa stergi aceasta postare?</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant={"ghost"}
                                colorScheme={"blueGray"}
                                onPress={()=> {setShowModal(false)}}
                                >Cancel</Button>
                            <Button
                                onPress={ async()=> {
                                 //await can be put in front of any async promise-based function to pause your code on that line
                                    // until the promise fulfills, then return the resulting value.
                                    const actionResult = await props.deleteReclamatie(reclamatie.id)
                                    toast.show({
                                        description: actionResult,
                                    })
                                    if(actionResult!=="Reclamatie stearsa"){
                                        return
                                    }
                                    props.navigation.goBack()
                                }}>
                               Da
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
    return (<View><Text>Loading</Text></View>)
}
//injecteaza actiunile in componenta
const mapDispatchToProps = (dispatch) => ({deleteReclamatie: DeleteReclamatie(dispatch)})

//It is called every time the store state changes
//injecteaza stateul in componeneta
const mapStateToProps = (state)=> ({listaReclamatii: state.reclamatii, isOnline: state.connectivity.isOnline})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)