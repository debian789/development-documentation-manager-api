export const SERVER = {
  GRAPHQL_PORT: process.env.GRAPHQL_PORT || 8081,
  WS_PORT: process.env.WS_PORT || 8091,
  HOST: process.env.HOST || 'localhost'
}

export const DATA_BASE = {
  HOST_DB: process.env.HOST_DB || 'localhost',
  NAME_DB: process.env.NAME_DB || 'graphql',
  USER_DB: process.env.USER_DB || '',
  PASS_DB: process.env.PASS_DB || ''
}
