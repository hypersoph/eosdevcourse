import { Api, JsonRpc } from 'eosjs';
//DON'T DO THIS IN PRODUCTION EVER
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig'; // S: needed to add curly braces to work

//Main action call to the blockchain
async function takeAction(action, dataValue) {
    const privateKey = localStorage.getItem("cardgame_key");
    const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider,
        textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

        //make our blockchain call after setting our action
    try {
        const resultWithConfig = await api.transact({
            actions: [{
                account: process.env.REACT_APP_EOS_CONTRACT_NAME,
                name: action,
                authorization: [{
                    actor: localStorage.getItem("cardgame_account"),
                    permission: 'active',
                }],
                data: dataValue,
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
    } catch (err) {
        throw(err)
    }

}

class ApiService{

    static login({username, key}){
        return new Promise((resolve, reject) => {
            localStorage.setItem("cardgame_account", username);
            localStorage.setItem("cardgame_key", key);
            takeAction("login", { username: username })
            .then(() => {
                resolve(); // change state of promise to fulfilled
            })
            .catch(err => {
                localStorage.removeItem("cardgame_account");
                localStorage.removeItem("cardgame_key");
                reject(err); // change state of promise to rejected
            });
        });
    }
}

export default ApiService;