import * as SQLite from 'expo-sqlite'
import {resolve} from "react-native-svg/src/lib/resolve";

const sqlDatabase = SQLite.openDatabase('reclamatiiDB5')

export default sqlDatabase

export const deleteCrudFromLocalStorage = (crudId) => {
    const result = new Promise( (resolve, reject) => {
        sqlDatabase.transaction(tx => {                                     //lista de arg
            tx.executeSql("DELETE FROM crudReclamatii WHERE crudId=?", [crudId], () => {
                resolve(`Succesfully deleted CRUD ${crudId}`)
            }, (err) => {
                reject(err.message)
            })
        })
    })
    return result
}

export const getAllCrudFromDatabase = () => {
    const result = new Promise( (resolve, reject) => {
        sqlDatabase.transaction(tx => {
            tx.executeSql("SELECT * FROM crudReclamatii", [],
                (transaction, resultSet) => {
                resolve(resultSet.rows._array)
            }, error => {
                reject('Couldnt fetch crud ops')
            })
        })
    })
    return result
}


export const addCrudToDatabase = (CRUD) => {
    const result = new Promise((resolve, reject) => {
        sqlDatabase.transaction(tx => {
            tx.executeSql("INSERT INTO crudReclamatii VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                    Math.floor(Math.random()*99999 + 1),
                    CRUD.operatie,
                    CRUD.id ? CRUD.id : null,
                    CRUD.nume ? CRUD.nume : null,
                    CRUD.cnp ? CRUD.cnp : null,
                    CRUD.telefon ? CRUD.telefon : null,
                    CRUD.email ? CRUD.email : null,
                    CRUD.descriere ? CRUD.descriere : null,
                    CRUD.imagine ? CRUD.imagine : null,
                    CRUD.date ? CRUD.date : null,
                    CRUD.status ? CRUD.status : null,
                    CRUD.categorie ? CRUD.categorie : null],
                (transaction, resultSet) => {
                    console.log('added CRUD OP: ', resultSet)
                    //asta merge in result
                    resolve(resultSet)
                },
                (transaction, error) => {
                    console.log('Couldnt add CRUD OP, sorry: ', error.message)
                    reject(error)
                })
        })
    })
    return result
}

export const addReclamatieToDatabase = (reclamatie) => {
    const result = new Promise((resolve, reject) => {
        sqlDatabase.transaction(tx => {
            tx.executeSql("INSERT INTO reclamatii VALUES (?,?,?,?,?,?,?,?,?,?)",
                [reclamatie.id
                    , reclamatie.nume,
                    reclamatie.cnp,
                    reclamatie.telefon,
                    reclamatie.email,
                    reclamatie.descriere,
                    reclamatie.imagine,
                    reclamatie.date,
                    reclamatie.status,
                    reclamatie.categorie],
                (transaction, resultSet) => {
                    //asta merge in result
                    resolve(resultSet)
                },
                (transaction, error) => {
                    console.log('Couldnt add reclamatie, sorry: ', error.message)
                    reject(error)
                })
        })
    })
    return result
}
//ia o lista de reclamatii si repopouleaza cu ea baza de date
export const saveReclamatiiToLocalStorage = (listaReclamatii) => {
    const response = new Promise((resolve, reject) => {
        sqlDatabase.transaction(tx => {
            const command1 = 'DROP TABLE reclamatii'
            tx.executeSql(command1, [], () => {
                const command2 = 'CREATE TABLE IF NOT EXISTS reclamatii (id INTEGER PRIMARY KEY, nume TEXT, cnp TEXT, telefon TEXT'+
                    ', email TEXT, descriere TEXT, imagine TEXT, date TEXT, status TEXT, categorie TEXT)'

                console.log("Creating Table")
                tx.executeSql(command2, [], async () => {
                    console.log("Adding reclamatii")
                    listaReclamatii.forEach((reclamatie)=> {
                        addReclamatieToDatabase(reclamatie)
                    })
                    resolve("OK")
                },(tx, error) => {
                    reject(error)
                })
            },(tx, error) => {
                reject(error)
            })

        })
    })
    return response
}
