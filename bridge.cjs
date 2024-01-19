const OSC = require('osc-js')

const osc = new OSC({ plugin: new OSC.BridgePlugin() })
osc.open()

osc.on('open', () => {
    console.log('osc server open')
    osc.on("*", ({ address, args }) => {
      console.log("address", address, "args", args);
    });
    // setInterval(() => {
    //     osc.send(new OSC.Message('/frombridge', Math.random()))
    //     osc.send(new OSC.Message('/udp'), { receiver: 'udp' })
    //     osc.send(new OSC.Message('/ws'), { receiver: 'ws' })
    // }, 1000)
})
