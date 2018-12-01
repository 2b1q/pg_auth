// todo refactor this to AUTH behavior


// const { nodeRequest } = require("../modules/node_interaction/node_rpc_client");
const cfg = require('../config/config'),
    { color: c } = cfg;
const worker = require("cluster").worker,
    { id: wid } = worker; // access to cluster.worker.id

// handle msg from master
worker.on('message', (msg) => {
  console.log(`${c.green}WORKER[${wid}] got MSG\n${c.white}`, msg);
  let { user, pass } = msg;
  let response = {
    error: null,
    msg: { auth: false },
    worker: wid
  };
  // debug auth checker
  if(user !== 'bbq') {
    console.error(`User "${user}" unauthorized`);
    return worker.send(response);
  }
  response.msg.auth = true;
   worker.send(response); // send node_response to master process
  });
