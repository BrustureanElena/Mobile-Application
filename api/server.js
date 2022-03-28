import axios from "axios";
import io from 'socket.io-client'

export const server = axios.create({
    baseURL: 'http://192.168.0.104:1337/api',
    timeout: 1000
})
/*

export const socket = io.connect('http://192.168.1.6:1337/api', {
    query: {token:'dsadrras'}
})

socket.emit('subscribe', 'reclamatie');

socket.on("create", async (data) => {
    //do something
    console.log("CREATE");
    console.log(data);
});
socket.on("update", (data) => {
    // do something
    console.log("UPDATE");
    console.log(data);
});
socket.on("delete", (data) => {
    // do something
    console.log("DELETE");
    console.log(data);
});*/
