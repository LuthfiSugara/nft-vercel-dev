// import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = [process.env.RPC_NODE_1, process.env.RPC_NODE_2, process.env.RPC_NODE_3]

const getRpcUrl = () => {
  return process.env.RPC_NODE_1
}

export default getRpcUrl
