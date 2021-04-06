const axios = require("axios")
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.access_key = RED.nodes.getNode(n.creds).credentials.access_key;
        } else {
            this.access_key = "";
        }
        var node = this;
        this.name = n.name;
        node.options = {};
        node.options.params = {};
        for (var key in n) {
            if (key !== 'x' && key !== 'y' && key !== 'z' && key !== 'creds' && key !== 'id'&& key !== 'type' && key !== 'wires' && key !== 'name'
                && n[key] !== ''&& typeof n[key] !== 'undefined') {
                node.options.params[key] = n[key] || "";
                node[key] = n[key] || "";
            }
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = node[i] || msg[i];
                }
            }
            if(node.params){
                node.options.params = node.params;
            }
            if(node.options.params){
                node.options.params.access_key = node.access_key;
            }else{
                node.options.params.access_key = node.access_key;
            }

            axios.get('http://api.exchangeratesapi.io/v1/' + node.url, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                    msg.payload = err;
                    node.send(msg);
                });
        });
    }

    RED.nodes.registerType("exchangeratesapi", FunctionNode, {
        credentials: {
            access_key: {type:"text"}
        }
    });

    function exchangerateskey(n){
        RED.nodes.createNode(this, n);
        this.access_key = n.access_key;
    }

    RED.nodes.registerType("exchangerates-key", exchangerateskey,{
        credentials: {
            access_key: {type:"text"}
        }
    });
};
