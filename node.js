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

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = node[i] || msg[i];
                }
            }
            if(node.params){
                node.options = {};
                node.options.params = node.params;
            }
            if(node.options){
                if(node.options.params){
                    node.options.params.access_key = node.access_key;
                }else{
                    node.options.params.access_key = node.access_key;
                }
            }else{
                node.options = {};
                node.options.params = {};
                node.options.params.access_key = node.access_key;
            }

            axios.get('https://api.exchangeratesapi.io/v1/' + node.url, node.options)
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
