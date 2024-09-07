// MARK: defualt config

const config = {};

// MARK: api config

config.api = {
  protocol: "https",
  apiDomain: "api.psykon.ca",
  version: 1
};

// api

config.api.hostname = config.api.protocol + "://" + config.api.apiDomain;
config.api.baseUrl = config.api.hostname + "/api/v" + config.api.version + "/";

// MARK: debug config

config.debug = {
  reduxLogger: false
};

// MARK: export config

export default config;
