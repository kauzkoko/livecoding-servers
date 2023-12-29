import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

let url = process.env.SUPABASE_URL;
let key = process.env.SUPABASE_KEY;
let masterArray = [false, false, false, false, false, false, false, false];
async function main() {
  let ws = new WebSocket('ws://localhost:8081');
  const supabase = createClient(url, key);
  let event = "qr-data";
  const channel = supabase.channel("qr-sequencer");
  console.log("supabase open");

  channel
    .on("broadcast", { event}, ({ payload }) => {
      console.log("new payload", payload);
      let qrData = payload.qrData;
      if (qrData.length === 1) {
        let index = parseInt(qrData);
        masterArray[index-1] = !masterArray[index-1];
        // let string = masterArray.toString();
        // console.log("string", string);
        // masterArray.forEach((element, index) => {
        //   let string = ""; 
        //   if (index < masterArray.length - 1) {
        //     string += element ? "1" : "0"  + " ";
        //   } else {
        //     string += element ? "1" : "0";
        //   }
        // })
        console.log(masterArray)
        ws.send(JSON.stringify({ from: "qr", qrData: masterArray}))
      }
    })
    .subscribe();

  setInterval(() => {
    ws.send(JSON.stringify({ from: "qr", qrData: masterArray}))
  }, 200)
}

main();
