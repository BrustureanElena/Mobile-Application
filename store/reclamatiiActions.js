import sqlDatabase, {addCrudToDatabase, addReclamatieToDatabase} from "./sqlDatabase";
import {server} from "../api/server";

//functia AddReclamatie returneaza async
//AddReclamatie(dispatch)(reclamatie)
//store apeleaza dispatch(rezultat actiune) care ajunge la reducer
export const AddReclamatie = (dispatch) => {
    return (
        (reclamatie) => {
            let reclamatieWithId = undefined
            const result = new Promise((resolve, reject) => {
                server.post(`/reclamaties`, {data: reclamatie})
                    .then((res) => {
                    reclamatieWithId = {...reclamatie, id: res.data.data.id}

            //DACA NU S-O POSTAT PE SERVER
                }).cath((err) => {
                    console.log(err.message)
                    const CRUD = {operatie: 'add', ...reclamatie}
                    const reclamatieRandomId = Math.floor(Math.random() * 10000000 + 1000)
                    reclamatieWithId = {...reclamatie, id: reclamatieRandomId}

                    addCrudToDatabase(CRUD).then(() => {
                        console.log('Operatie Adaugata pe stack', CRUD)
                    }).catch(()=> {
                        reject('Operatia nu a putut fi adaugata pe stack')
                    })
                }).finally(() => {
                    addReclamatieToDatabase(reclamatieWithId)
                        .then(() => {
                            //dispatch apeleaza reducerul cu actiunea si statetul
                            //adaugi in store
                            dispatch(
                                // O actiune
                                {
                                    type: "ADD_RECLAMATIE",
                                    payload: reclamatieWithId
                                })
                            resolve("Reclamatie adaugata")})
                        .catch((err) => {
                            dispatch(
                                // O actiune
                                //adaugi in store
                                {
                                    type: "ADD_RECLAMATIE",
                                    payload: reclamatieWithId
                                })
                            reject("Couldn't save the reclamatie on local storage:", err.message)
                        })
                })
            })
            return result
        }
    )
}

export const DeleteReclamatie = (dispatch) => async (idReclamatie) => {
    const result = await new Promise ((resolve, reject) => {
        server.delete(`/reclamaties/${idReclamatie}`)
            .then((res) => {
                console.log('delete was successful')
                sqlDatabase.transaction(tx => {
                    tx.executeSql("DELETE FROM reclamatii WHERE id = ?", [idReclamatie],
                        (transaction, resultSet) => {
                            console.log(resultSet)
                            resolve(resultSet)
                        },
                        (transaction, error) => {
                            console.log('Couldnt delete: ', error.message)
                            reject(error)
                        })
                })
            })
            .catch((err) => {
                console.log('error on server call')
                reject(err)
            })
    })
    if (result.rows) {
        dispatch({
            type: "DELETE_RECLAMATIE",
            payload: idReclamatie
        })
        return "Reclamatie stearsa"
    }
    return result.message;
}

export const UpdateReclamatie = (dispatch) => async (reclamatie) => {
    const result = await new Promise((resolve,reject) => {
        server.put(`/reclamaties/${reclamatie.id}`,{data:{
                nume: reclamatie.nume,
                cnp: reclamatie.cnp,
                telefon: reclamatie.telefon,
                email: reclamatie.email,
                descriere: reclamatie.descriere,
            }})
            .then((res) => {
                sqlDatabase.transaction(tx => {
                    tx.executeSql("UPDATE reclamatii SET nume = ?, cnp = ?, telefon = ?, email = ?, descriere = ? WHERE id = ?",
                        [
                            reclamatie.nume,
                            reclamatie.cnp,
                            reclamatie.telefon,
                            reclamatie.email,
                            reclamatie.descriere,
                            reclamatie.id],
                        (transaction, resultSet) => {
                            console.log(resultSet)
                            resolve(resultSet)
                        },
                        (transaction, error) => {
                            console.log(error.message)
                            reject(error)
                        })
                })
            })
            .catch((err) => {
                console.log('error on server call')
                reject(err)
            })
    })
    if (result.rows) {
        dispatch({
            type: "UPDATE_RECLAMATIE",
            payload: reclamatie
        })
        return "Reclamatie modificata"
    }
    return result.message
}