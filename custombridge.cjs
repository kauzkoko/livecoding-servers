const OSC = require('osc-js')

const wss = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
const osc = new OSC({ plugin: new OSC.DatagramPlugin({ send: { port: 11245 } }) })

osc.on('open', () => {
  console.log('osc server open')
  osc.on("*", ({ address, args }) => {
    console.log("address", address, "args", args);
  });
  setInterval(() => {
     osc.send(new OSC.Message('/osc', Math.random()))
  }, 1000)
})

wss.on('open', () => {
  console.log('ws server open')
  wss.on("*", ({ address, args }) => {
    console.log("address", address, "args", args);
  });
  setInterval(() => {
     osc.send(new OSC.Message('/websocket', Math.random()))
  }, 1000)
})

wss.open()
osc.open()