let url='';

const onMessage = async (client, e) => {
    try{
        let message = e.message[0].text;
        let m = message.split(' ');
        if(m[0]=='r/score') sendMessage(client,e.group_id,await fetch(`${url}/info/score`).then(res=>res.json()).then(json=>JSON.stringify(json)));
        if(m[0]=='r/create'&&m.length==2) sendMessage(client,e.group_id,await fetch(`${url}/create?ign=${m[1]}&qq=${e.sender.user_id}`).then(res=>res.json()).then(json=>JSON.stringify(json)));
        if(m[0]=='r/player'&&m.length==2) sendMessage(client,e.group_id,await fetch(`${url}/player?ign=${m[1]}`).then(res=>res.json()).then(json=>JSON.stringify(json)));
    }catch(err){
        console.log(err);
    }
}

const sendMessage = (client, group_id, text) => {
    client.sendGroupMsg(group_id, text).catch(err => console.log(err));
}

const onLoad = (c, client) => {
    if (c.url == null)
        throw new ReferenceError('未在main.json中找到url');
    url = c.url;
}

const config = {
    id: '111',
    name: '111',
    default_permission: false
};

module.exports = { config, onMessage, onLoad };