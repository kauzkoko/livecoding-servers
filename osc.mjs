import OSC from "osc-js";

async function main() {
  const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin() });
  osc.open();
  console.log("osc server open");

  osc.on("*", ({ address, args }) => {
    console.log("address", address, "args", args);
    // if (address === "/dirt/play") {
    //   osc.send(new OSC.Message("/fromstrudel", args[7]));
    // }
    // if (address === "/strudel") {
    //   osc.send(new OSC.Message("/fromstrudeltostrudel", 30));
    // }
  });
}

main();
