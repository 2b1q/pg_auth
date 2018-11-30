# PaymentGateway AUTH service [PG_auth]

**PG_auth** is stateless async micro service with Redis RPC interaction

### Components ###
* node.js vertical cluster ([MASTER] fork [WORKER] processes by count of CPU cores) 
* [MASTER] Redis RPC channel event handler
* [WORKER] User Auth/management
    
### Master process behavior ###
    1. [MASTER] init Redis RPC channel connection (async interaction)
    2. [MASTER] handel Redis RPC channel events and register Callback()
    3. [MASTER] pass events to random [WORKER] process
    4. [WORKER] handle request from [MASTER] and do User management tasks
    5. [WORKER] pass result events to [MASTER]
    5. [MASTER] handle MSG from worker
    6. [MASTER] exec RPC callback done(err,data)

## architecture ##
