import {Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react'
import {
    Center,
    Fab,
    Icon,
    Pressable,
    ScrollView,
    View,
    VStack
} from 'native-base';
import {AntDesign} from "@expo/vector-icons"
import {connect} from "react-redux";
import { useHeaderHeight } from '@react-navigation/elements';
import CardReclamatie from "../components/CardReclamatie";
import ValidationAlert from "../components/Alert";



function MainScreen ({listaReclamatii, navigation, isOnline}) {
    const windowHeight = Dimensions.get('window').height;
    const headerHeight = useHeaderHeight();
    const [showOffline, setShowOffline] = useState(false)

    let styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            overflow: "scroll",
            height: windowHeight - headerHeight
        },
        item: {
            width:"100%",
            padding: 16
        },
        floatingButton: {
            width: 75,
            height: 75,
            backgroundColor: 'teal',
            borderRadius: 50,
            position:'absolute',
            right: 40,
            bottom: 40,
            padding: 20,
        }
    });


    useEffect ( () => {
        setShowOffline(!isOnline)
    }, [isOnline])

    return (
    <View style={styles.container}>
        <ValidationAlert message={{
            primary: "Conexiunea la server nu s-a putut realiza",
            secondary: "Delete si Update nu pot fi accesate offline"}}
                         show={showOffline}
                         setShow={setShowOffline}/>
        <ScrollView _contentContainerStyle={{
            px: "20px",
            mb: "4",
            minW: "72",
        }}>
            {

                // reactul o sa rerenderuiasca doar noile elemente modificate pt ca folosim state
               // pentru fiecare reclamatie creez un VStack
                //daca listaReclamatii nu e nulla
                listaReclamatii && listaReclamatii.map((reclamatie) => {
                    return(
                        <VStack style={styles.item} key={reclamatie.id}>
                            <Pressable onPress={() => navigation.navigate('Detalii',{idReclamatie:reclamatie.id})}>
                                <Center>
                                    <CardReclamatie reclamatie={reclamatie}/>
                                </Center>
                            </Pressable>
                        </VStack>
                    )
                })
            }


        </ScrollView>
        <Fab
            placement="bottom-right"
            size="sm"
            renderInPortal={false}
            onPress={() => navigation.navigate('Adauga')}
            icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        />
    </View>
    )
}

//This function should be passed as the first argument to connect,
// and will be called every time when the Redux store state changes
//It is called every time the store state changes.
// It receives the entire store state, and should return an object of data this component needs.
// Adauga in props la Main Screen obiectul returnat

const mapStateToProps = (state) => {
    return {
        listaReclamatii: state.reclamatii,
        isOnline: state.connectivity.isOnline
    }
}



// Adauga in props la Main Screen stateul si proprietatea de isOnline
//connect returneaza o functie care o sa aiba ca parametru MainScreen
export default connect(mapStateToProps)(MainScreen)


