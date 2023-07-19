const server = require('ws').Server
let s = new server({port: 5000})

s.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log('Received: ' + data)

        s.clients.forEach((client) => { 
            // if(!client == ws) 
            // {client.send(JSON.stringify(message))}

            client.send(data)
         })
    })

    ws.on('close', () => {
        console.log('lost client')
    })
})