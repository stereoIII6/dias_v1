//////////////////////////////////////////
//                                                              //
//          D.I.A.S Decentral interactive Asset                 //
//          III6 LifeAnd.Eth                                    //
//          stereoIII6                                          //
//          stereodocbush@gmail.com                             //
//                                                              //
//////////////////////////////////////////

import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import "../public/app.scss";
import {sha256} from 'crypto-hash';
const client = require('ipfs-http-client');
// console.log(client);
const ipfs = client.create({host: "ipfs.infura.io",
port: "5001",
protocol: "https"});
 
let diasState = {
    "id": 1,
    "title": "moon token",
    "author": "stereoIII6",
    "mintdate": 109808079809,
    "oneof": 10000,
    "layers":[
      {
        "id": 0,
        "name": "background",
        "group": null,
        "file": { "type": "image",
          "hash": "QmVfr5XNGFEWkK6Vk5ZBxSFtqgvVN8XCd6TJ4p9FG4Mf9n",
          "path": "https://ipfs.io/ipfs/QmVfr5XNGFEWkK6Vk5ZBxSFtqgvVN8XCd6TJ4p9FG4Mf9n",
          "auth":{ "public":true,"access":null}
        },
        "feed": {
          "name": null,
          "type": null,
          "initial": null
        },
        "keys":[
          {
            "id": 0,
            "feedval": null,
            "name": "bottom",
            "x": 0,
            "y": 0,
            "w": 200,
            "h": 100,
            "r": 0,
            "o": 100,
            "trigger": null
          }
        ]
      },
      {
        "id": 1,
        "name": "moon",
        "group": null,
        "file": { "type": "image",
          "hash": "Qmf3aPqZRP1VjyUqMfSD1b3qtWHaAf3szUHmofNrqFgSiA",
          "path": "https://ipfs.io/ipfs/Qmf3aPqZRP1VjyUqMfSD1b3qtWHaAf3szUHmofNrqFgSiA",
          "auth":{ "public":true,"access":null}
        },
        "feed": {
          "name": null,
          "type": null,
          "initial": null
        },
        "keys":[
          {
            "id": 0,
            "feedval": null,
            "name": "bottom",
            "x": 80,
            "y": 5,
            "w": 15,
            "h": 15,
            "r": 0,
            "o": 100,
            "trigger": null
          }
        ]
      },
      {
        "id": 2,
        "name": "earth",
        "group": null,
        "file": { "type": "image",
          "hash": "QmbmfuC4YDZ3DbPSPKKRR3erjjBovWaSJNMZoXqMaw1XQf",
          "path": "https://ipfs.io/ipfs/QmbmfuC4YDZ3DbPSPKKRR3erjjBovWaSJNMZoXqMaw1XQf",
          "auth":{ "public":true,"access":null}
        },
        "feed": {
          "name": null,
          "type": null,
          "initial": null
        },
        "keys":[
          {
            "id": 0,
            "feedval": null,
            "name": "bottom",
            "x": 20,
            "y": 75,
            "w": 20,
            "h": 20,
            "r": 0,
            "o": 100,
            "trigger": null
          }
        ]
      },
      {
        "id": 3,
        "name": "rocket",
        "group": null,
        "file": { "type": "image",
          "hash": "QmXjDgJEaLsAQbT2YK9mrKcQa6n2MUSZMw8Zup2qtzcoAJ",
          "path": "https://ipfs.io/ipfs/QmXjDgJEaLsAQbT2YK9mrKcQa6n2MUSZMw8Zup2qtzcoAJ",
          "auth":{ "public":true,"access":null}
        },
        "feed": {
          "name": "ETH/USD Price Feed",
          "type": "numeric",
          "initial": 3271
        },
        "keys":[
          {
            "id": 0,
            "feedval": 3271,
            "name": "bottom",
            "x": 25,
            "y": 60,
            "w": 11,
            "h": 17,
            "r": 0,
            "o": 100,
            "trigger": null
          },
          {
            "id": 1,
            "feedval": 5000,
            "name": "to",
            "x": 80,
            "y": 13,
            "w": 3,
            "h": 5,
            "r": 90,
            "o": 100,
            "trigger": null
          }
        ]
      }
    ]
    
    
  }; 
let iHash = "QmXNS7cb69j51mzfwZ4LvTt3EDa2cYeUWNQUAnFND3vJDw";
let urli = "https://ipfs.io/ipfs/"+iHash;


const infoTitle = document.getElementById("inftitle");
const infoAuthor = document.getElementById("infauthor");
const infoMintDate = document.getElementById("infmintdate");
const token = document.getElementById("tbox");
const inputDias = document.getElementById("inputDias");
const loadDias = document.getElementById("loadDias");

const pushDias = () => {
  let newState = JSON.parse(inputDias.value);
  inputDias.value = "";
  diasState = newState;
  values = [];
  draw();
}

loadDias.addEventListener("click",pushDias);


let layerKeystate;
let slides = [];
let labels = [];
let values = [];

const draw = () => {
  
  let tokenIn = "";
  toolbox.innerHTML = "";
  
  
diasState.layers.map(layer => {
  if(layer.feed.type === "numeric" && values[layer.id] === undefined) values[layer.id] = layer.feed.initial;
  infoTitle.innerHTML = diasState.title;
  infoAuthor.innerHTML = diasState.author;
  infoMintDate.innerHTML = diasState.mintdate;
  // canvas
  
  if(layer.file.auth.public){ // If public 
      if(layer.file.type === "image"){ // If image 
        console.log("Image Layer "+layer.id+" "+layer.file.path);
        
        if(layer.feed.type === null){ // If public 
            layerKeystate = 'left:'+layer.keys[0].x+'%;top:'+layer.keys[0].y+'%;width:'+layer.keys[0].w+'%;height:'+layer.keys[0].h+'%;opacity:'+layer.keys[0].o / 100;
    }
        else {
            
            const diffX = (layer.keys[1].x - layer.keys[0].x);
            const diffY = (layer.keys[1].y - layer.keys[0].y);
            const diffW = (layer.keys[1].w - layer.keys[0].w);
            const diffH = (layer.keys[1].h - layer.keys[0].h);
            const diffR = (layer.keys[1].r - layer.keys[0].r);
            const diffO = (layer.keys[1].o - layer.keys[0].o);
            console.log(diffR,diffY,layer.keys[1].feedval , values[layer.id]);
            let dX = (diffX / layer.keys[1].feedval*values[layer.id]) + layer.keys[0].x;
            let dY = (diffY / layer.keys[1].feedval*values[layer.id]) + layer.keys[0].y;
            let dW = (diffW / layer.keys[1].feedval*values[layer.id]) + layer.keys[0].w;
            let dH = (diffH / layer.keys[1].feedval*values[layer.id]) + layer.keys[0].h;
            let dR = (diffR / layer.keys[1].feedval*values[layer.id]) + layer.keys[0].r;
            let dO = (diffO / layer.keys[1].feedval*values[layer.id]) + layer.keys[0].o;
            console.log(dX,dY);
            layerKeystate = 'left:'+(dX)+'%;top:'+(dY) +'%;width:'+ dW +'%;height:'+ dH +'%;opacity:'+ (dO / 100) +'transform:rotate('+dR+'deg);';
        }
        tokenIn += "<div class='imglyr' id='"+layer.id+"' style='"+layerKeystate+"'><img src='"+layer.file.path+"' class='lyrimg' id='img"+layer.id+"'/></div>";
      }
      if(layer.file.type === "graphic"){ // If public 
        console.log("Graphic Layer "+layer.id+" "+layer.file.path);
        tokenIn += "<div class='grflyr' id='"+layer.id+"'></div>";
      }
      if(layer.file.type === "audio"){ // If public 
        console.log("Audio Layer "+layer.id+" "+layer.keys[0].feedval);
        tokenIn += "<div class='audlyr' id='"+layer.id+"'><audio controls autoplay><source src="+layer.file.path+" type='audio/mpeg' /></audio></div>";
      }
      if(layer.file.type === "video"){ // If public 
        console.log("Video Layer "+layer.id+" "+layer.keys[0].feedval);
        tokenIn += "<div class='vidlyr' id='"+layer.id+"'></div>";
      }
      if(layer.file.type === "font"){ // If public 
        console.log("Font Layer "+layer.id+" "+layer.keys[0].feedval);
        tokenIn += "<div class='fntlyr' id="+layer.id+" style='color:orange;left:"+layer.keys[0].x+"%;top:"+layer.keys[0].y+"%;font-size:"+layer.file.path+";font-family:"+layer.file.hash+";'+ >"+(values[layer.id])+"%</div>";
      }
  }
  token.innerHTML = tokenIn;
  // tools
  
  if(layer.feed.type === "numeric"){
     console.log("Layer "+layer.id+" "+layer.name+" "+layer.feed.name,layer.feed.initial);
    if(values[layer.id] === undefined || values[layer.id] === null) values[layer.id] = layer.feed.initial;
     
    console.log("Layer ID : "+ layer.id + " values of layer " + values[layer.id]);
    toolbox.innerHTML += "<label id='label"+layer.id+"'for="+layer.id+" class='slidelabel'>Layer "+layer.id+" - "+layer.feed.name+" - "+values[layer.id]+"</label>";
   toolbox.innerHTML += "<input id='range"+layer.id+"' name="+layer.id+"  type='range' class='slider' min="+(0)+" max="+(layer.keys[1].feedval)+" value="+values[layer.id]+" />";
   slides[layer.id] = document.getElementById('range'+layer.id);
   labels[layer.id] = document.getElementById('label'+layer.id);

   const slideToValue = (e) => {
     values[Number(e.target.name)] = Number(e.target.value);
     labels[Number(e.target.name)].innerHTML = "Layer "+e.target.name+" - "+layer.feed.name+" - "+values[e.target.name];
     console.log(values[e.target.name],Number(e.target.name));
     draw();
   }
   slides[layer.id].addEventListener("change",slideToValue); 
  }
});
};
draw();