// todo refactor this to AUTH behavior


// const { nodeRequest } = require("../modules/node_interaction/node_rpc_client");
const cfg = require('../config/config'),
    { color: c } = cfg;
const worker = require("cluster").worker,
    { id: wid } = worker; // access to cluster.worker.id

// handle msg from master
worker.on('message', (msg) => {
  console.log(`${c.green}WORKER[${wid}] got MSG\n${c.white}`, msg);
   worker.send({
      msg: { auth: 'ok' },
      worker: wid
    }); // send node_response to master process
  });
