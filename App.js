
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "./screens/MainScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DetailsScreen from "./screens/DetailsScreen";
import reclamatii from "./assets/reclamatii";
import ForgotPassword from './screens/ForgotPassword'
import AddScreen from "./screens/AddScreen";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import UpdateScreen from "./screens/UpdateScreen";
import {extendTheme, useToast} from "native-base";
import sqlDatabase, {
    deleteCrudFromLocalStorage,
    getAllCrudFromDatabase,
    saveReclamatiiToLocalStorage
} from "./store/sqlDatabase";
import {rootReducer} from "./store";
import {server} from "./api/server";
import {ToggleOnline} from "./store/connectivityActions";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
const Stack = createNativeStackNavigator()


export default function App() {

    const theme = extendTheme({
        components: {
//proprietati care sa se puna peste tot unde e text in aplicatie
            Text: {
                baseStyle: {},
                defaultProps: {size:'md'},
                variants: {},
                sizes: {
                    md: { fontSize: '18px' },
                },
            }
        }
    });

    //store ii repositoroyul
    //state- urmareste starea repositoryurilui
    //useState creaza un state pentru store
    //stateul lui store e undefined
    //useState returneaza valorile pentru store, setStore
    const [store,setStore] = useState(undefined)
    const toast = useToast()
    //a Promise represents a value which may be available now, or in the future, or never

    //am folosit Promise pt ca avem readTransaction si executeSql care sunt asincrone(adica dureaza) si ca sa nu blocam executia
    const loadStore = () => {
        return new Promise ((resolve, reject) => {
            sqlDatabase.readTransaction((tx) => {
                tx.executeSql('SELECT * FROM reclamatii', [],
                    (tx, res) => {
                                //obiectul nostru de store are cheia reclamatii
                                const preloadedStateFromDb = {reclamatii: res.rows._array}
                                const storeFromDb = createStore(rootReducer, preloadedStateFromDb, applyMiddleware(thunk))
                                    //rezolva promise cu storeul in el

                        //rezolva Promise si returneaza storefROMDB
                        //cand apelez resolve sau reject se schimba stateul Promiseului in completed
                    resolve(storeFromDb)
                },(tx, error) => {
                        console.log(error.message)
                        toast.show({
                            description: error.message,
                        })
                        //daca esueaza tranzactia o sa avem un store gol
                        const storeFromDb = createStore(rootReducer, applyMiddleware(thunk))
                        //returneaza storeul fara preloaded state
                        reject(storeFromDb)
                    })
            })
        })
    }

    const restoreFromLocalStorage = () => {

        sqlDatabase.transaction(tx => {
            const command2 = 'CREATE TABLE IF NOT EXISTS reclamatii (id INTEGER PRIMARY KEY, nume TEXT, cnp TEXT, telefon TEXT'+
                ', email TEXT, descriere TEXT, imagine TEXT, date TEXT, status TEXT, categorie TEXT)'
            tx.executeSql(command2, [], async () => {
                //se blocheaza aici pana se termina Promise si vin datele din Promise
                const loadedStore = await loadStore()
                setStore(loadedStore)
            },(tx, error) => {
                console.log(error.message)
                toast.show({
                    description: error.message,
                })
            })

        })

    }

    const pingServer = (callback) => {
        server.get('/ping').then((res) => {
            console.log('ping result', res)
            if (res.data.data.attributes.status === 'available'){

                callback()
                return
            }

            console.log("Server refused connection")
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const getAllReclamatiiFromServer = () => {
        server.get('/reclamaties').then((res) => {
            const preloadedStateFromServer = {
                reclamatii: res.data.data.map((reclamatie) => {return {...reclamatie.attributes, id: reclamatie.id}})
            }
            saveReclamatiiToLocalStorage(preloadedStateFromServer.reclamatii)
                .then(r => console.log("Restored Database form server"))
                .catch(err => toast.show({
                    description: err.message
                }))
            const storeFromServer = createStore(rootReducer, preloadedStateFromServer, applyMiddleware(thunk))
            //modifici stateul serverului la true
            ToggleOnline(storeFromServer.dispatch)(true)
            setStore(storeFromServer)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const sendAllCrudToServer = async () => {
        await sqlDatabase.transaction(tx => {
            const command1 = 'CREATE TABLE IF NOT EXISTS crudReclamatii (crudId INTEGER PRIMARY KEY AUTOINCREMENT' +
                ', operatie TEXT,id INTEGER, nume TEXT, cnp TEXT, telefon TEXT' +
                ', email TEXT, descriere TEXT, imagine TEXT, date TEXT, status TEXT, categorie TEXT)'
            tx.executeSql(command1, [], () => {
            }, (tx, error) => {
                console.log(error.message)
            })
        })
        const CRUDS = await getAllCrudFromDatabase()
        for (let i = 0; i < CRUDS.length; i++) {
            if(CRUDS[i].operatie === 'add'){
                const response = await server.post('/reclamaties', {data: {
                        nume: CRUDS[i].nume,
                        cnp: CRUDS[i].cnp,
                        telefon: CRUDS[i].telefon,
                        email: CRUDS[i].email,
                        descriere: CRUDS[i].descriere,
                        imagine: CRUDS[i].imagine,
                        date: CRUDS[i].date,
                        status: CRUDS[i].status,
                        categorie: CRUDS[i].categorie
                    }})
                if (response.status === 200) {
                    deleteCrudFromLocalStorage(CRUDS[i].crudId).then((res,err) => {
                        if(err){
                            console.log("Error:", err)
                        }
                        console.log(res)
                    })
                }
            }
        }
    }

    ///hook=functie predefinita de react care te lasa sa setezi un callback
    //se face inainte sa se renderuiasca primul screen
    useEffect(()=>{

        //daca merge serverul
       pingServer(async ()=> {
           await sendAllCrudToServer()
           getAllReclamatiiFromServer()
       })
        //daca nu merge serverul
       restoreFromLocalStorage()
    }, [])



//daca store nu e undefined
    if(store) {
        return (
            // In Redux, the provider passes the global state/store to the rest of the application.
            //trimite si la copiii lui

    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
            <Stack.Navigator>
                {/* Aici se trimite ca props navigatorul,route si altele + lista de reclamatii.js ca default, daca nu am nimic in state */}
                {/*ce e dupa return e JSx   MainScreen are atributul listaReclamatii care are valoarea reclamatii (jsx value)*/}
                <Stack.Screen name="Login">{(props) => <Login {...props}/>}</Stack.Screen>
                <Stack.Screen name="Signup">{(props) => <Signup {...props}/>}</Stack.Screen>
                <Stack.Screen name="ForgotPassword">{(props) => <ForgotPassword {...props}/>}</Stack.Screen>
                <Stack.Screen name="Home">{(props) => <Home {...props}/>}</Stack.Screen>
                <Stack.Screen name="Reclamatii">{(props) => <MainScreen {...props} listaReclamatii={reclamatii}/>}</Stack.Screen>
                <Stack.Screen name="Detalii" >{(props) => <DetailsScreen {...props}/>}</Stack.Screen>
                <Stack.Screen name="Adauga" >{(props) => <AddScreen {...props}/>}</Stack.Screen>
                <Stack.Screen name="Update" >{(props) => <UpdateScreen {...props}/>}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
        )
    }
    return <View><Text>Loading</Text></View>
}
