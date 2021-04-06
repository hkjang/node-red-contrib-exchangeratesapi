node-red-contrib-exchangeratesapi
================

Node-RED node for exchangeratesapi



## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-exchangeratesapi, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-exchangeratesapi

## Wrapper exchangeratesapi.com API  
- https://exchangeratesapi.io/
- need to Access Key

## Sample parameters
```js
msg.params = {};
// msg.params.base = 'EUR'; // error on other base currency, just work on EUR 
msg.params.symbols = 'KRW';
return msg;

```

## Sample flows
```json
[{"id":"3ab86060.4ea31","type":"exchangeratesapi","z":"2422d0a1.5c053","name":"","url":"latest","base":"","symbols":"KRW","creds":"3a4aeaa5.e720d6","x":600,"y":120,"wires":[["e947f495.e22668"]]},{"id":"bc95624b.1f5fe","type":"inject","z":"2422d0a1.5c053","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":200,"y":120,"wires":[["a2c60656.85d268"]]},{"id":"e947f495.e22668","type":"debug","z":"2422d0a1.5c053","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":830,"y":120,"wires":[]},{"id":"a2c60656.85d268","type":"function","z":"2422d0a1.5c053","name":"","func":"msg.params = {};\n// msg.params.base = 'USD'\nmsg.params.symbols = 'KRW'\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":380,"y":120,"wires":[["3ab86060.4ea31"]]},{"id":"3a4aeaa5.e720d6","type":"exchangerates-key","name":""}]
```
