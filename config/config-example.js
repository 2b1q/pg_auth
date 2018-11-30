/*
 * Create and exports configuration variables
 *
 * */

// Config container
const config = {};

/** Common config for all ENV */
const api_version = "v. 2.0",
  project = "BANKEX Payment-gateway-AUTH service";

// DB collections
const cols = {
  // common base cols
  base: {},
  // user collections
  user: {
    tokens: "user_tokens", // store user tokens
    users: "users" // store user data
  }
};

// colorize console
const color = {
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  black: "\x1b[30m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  white: "\x1b[37m"
};

/** Staging (default) environment */
config.staging = {
  api_version: api_version,
  project: project,
  user_pass_hash_secret: "sup4_Dup4#sEcreD", // user pass hash secret
  /** ============= NEED TO BE SPECIFIED ============= */
  store: {
    redis: {
      host: 'localhost', // redis server hostname
      port: 6379,        // redis server port
      scope: 'staging'      // use scope to prevent sharing messages between "node redis rpc"
    },
    channel: {
      jrpc: wid => typeof wid === 'undefined' ? 'pg_jrpc:' : 'pg_jrpc:' + wid,
      auth: wid => typeof wid === 'undefined' ? 'pg_auth:' : 'pg_auth:' + wid,
      nm: wid => typeof wid === 'undefined' ? 'pg_nm:' : 'pg_nm:' + wid,
    }
  },
  mongo: {
    uri: "localhost:27017", // hardcoded
    dbname: process.env.dbname || "pgw",
    dbuser: process.env.dbuser || "pgwUser",
    dbpass: process.env.dbpass || "pgwPass",
    options: {
      // autoIndex: false,
      useNewUrlParser: true
      // poolSize: 10 // количество подключений в пуле
    }
  },
  user: cols.user,
  color: color
};
/** END OF Staging (default) environment */

/** Production environment */
config.production = {};
/** END OF Production environment */

/** Dev environment */
config.dev = {
  user_pass_hash_secret: "sup4_Dup4#sEcreD", // user pass hash secret
  api_version: api_version,
  project: project,
  /** ============= NEED TO BE SPECIFIED ============= */
  store: {
    redis: {
      host: 'redis', // redis server hostname
      port: 6379,        // redis server port
      scope: 'dev'      // use scope to prevent sharing messages between "node redis rpc"
    },
    channel: {
      jrpc: wid => typeof wid === 'undefined' ? 'pg_jrpc:' : 'pg_jrpc:' + wid,
      auth: wid => typeof wid === 'undefined' ? 'pg_auth:' : 'pg_auth:' + wid,
      nm: wid => typeof wid === 'undefined' ? 'pg_nm:' : 'pg_nm:' + wid,
    },
    mongo: {
      uri: process.env.dburi || "mongo:27017",
      dbname: process.env.dbname || "pgw_dev",
      dbuser: process.env.dbuser || "pgwUser",
      dbpass: process.env.dbpass || "pgwPass",
      options: {
        // autoIndex: false,
        useNewUrlParser: true
        // poolSize: 10 // количество подключений в пуле
      }
    },
    user: cols.user
  },
  color: color
};
/** END OF Dev environment */

  // Determine passed ENV
const currentEnv = typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV.toLowerCase() : "";

// Check ENV to export (if ENV not passed => default ENV is 'staging')
const envToExport = typeof config[currentEnv] == "object" ? config[currentEnv] : config.staging;

// Exports config module
module.exports = envToExport;
