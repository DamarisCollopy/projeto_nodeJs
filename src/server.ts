import {http} from "./http";
import "./websocket/client";
import "./websocket/admin";

http.listen(3333, () => console.log("Server is running on port 3333"));

//const express = require('./http')
//const os = require('os')

//const app = express()
//app.get('/', (req, res) => {
        //res.send(`websocket/ ${os.hostname()}!`)
//})

//const port = 3333
//app.listen(port, () => console.log(`listening on port ${port}`))