const cfg = require("../config/config"),
  { color: c } = cfg,
  worker = require("cluster").worker,
  { id: wid } = worker, // access to cluster.worker.id
  { checkAuth, newUser } = require("../modules/auth/v1/auth");

// current module
const _module_ = "auth controller worker";
// worker id pattern
const wid_ptrn = endpoint =>
  `${c.green}worker[${wid}]${c.red}[RPC]${c.yellow}[${API_VERSION}]${
    c.cyan
  }[${_module_}]${c.red} > ${c.green}[${endpoint}] ${c.white}`;

// handle msg from master
worker.on("message", msg => {
  console.log(`${c.green}WORKER[${wid}] got MSG\n${c.white}`, msg);
  let { user, pass } = msg;
  // response pattern
  let response = {
    error: null,
    msg: null,
    worker: wid
  };
  checkAuth(user, pass)
    .then(result => {
      console.log(wid_ptrn(`User ${user} authorized`));
      console.log(result);
      response.msg = result;
      worker.send(response); // send node_response to master process
    })
    .catch(err => {
      console.error("unauthorized", err);
      response.error = err;
      worker.send(response); // send node_response to master process
    });
});
