# Mina zkApp: Acurast Mina zkOracle

The «zkOracles Acurast Frontend» provides and overview of deployed zkOracle contracts for `MINA/USD`, `ETH/USD` & `BTC/USD` prices. The frontend is also an entrypoint to deploy zkOracles for e.g., price feeds sourced by external data from e.g., price aggregators, exchanges, other sources. Prices are fetched from off-chain workers where the user can choose between “local” and “Acurast”, the result is pushed on-chain to the zkOracle contract.

[Acurast](https://docs.acurast.com/) is a decentralized and trustless compute execution layer, leveraging Trust Execution Environments opening up the capability to have Acurast’s Processors (off-chain workers) fetch, sign and submit data on-chain completely trustless and confidential.

In the current Proof of Concept state, users have the capability to deploy a zkOracle and feed it with data fetched locally, with the upcoming Acurast integration for Mina, users will then be able to utilize this frontend to leverage Acurast’s compute layer.

## Architecture

The «zkOracles Acurast Frontend» in its current PoC stage has the following components:

- **Frontend:**
  1. displaying the values of the pre-deployed zkOracle.
  2. giving users the ability to deploy a new zkOracle with a local off-chain worker.
- **zkOracle** e.g. the following pre-deployed zkOracles: MINA/USD, ETH/USD, BTC/USD
- **Off-chain workers**, the local off-chain worker is capable of fetching data and pushing it to the zkOracle pre-deploed or deployed by the user.

This translates in the following flow, where the Frontend itself uses a "local" off-chain worker that requests the data from a third party API and signs and submits it on-chain to the zkOracle.

![image](/docs/assets/zkOracles-Frontend.svg)

### Finalized Architecture With Acurast:

- Frontend, displaying pre-deployed zkOracle and a helper to deploy new ones.
- zkOracle that can be consumed by other zkApps.
- Off-chain workers, Acurast Processors with Trusted Execution Environments and direct interaction to the zkOracle.

The flow in a finalized architecture where Acurast Processors are used for the off-chain task to confidentialy and trustlessly execute requests within their Trusted Execution Evnironment, sign the proof with a private key stored within the TEE and submits it then directly on-chain.

![image](/docs/assets/zkOracles-Acurast.svg)

The created and “notarized” proof can be directly injected to the Mina protocol, by the Acurast Processor in a signed transaction. For Transport Layer Security (TLS) secured endpoints it is possible for the trusted execution environment to observe the handshake and certificate pin the received response to a specific server (e.g., Binance), this allows the developer to proof that the data was really observed at the specified source and has not been tampered with.

#### On-Demand Access

An extension of this flow can be to utilize a direct connection to the Acurast Processor through a websocket communication channel and sent back to the user that requested this notarization.

![image](/docs/assets/zkOracles-Acurast.svg)

Giving zkApp developers the ability to leverage sub-second communication times for real time observation, this can enable e.g., DeFi application to lower the risk and automation of their protocol better. And off-loading the transaction fees to the user that otherwise have to come from Acurast Processors.

### Acurast Architecture

More details on the [Acurast architecture](https://docs.acurast.com/acurast-protocol/architecture/architecture) and how [Acurast’s off-chain execution layer](https://docs.acurast.com/acurast-protocol/architecture/end-to-end) is structured can be found in the [Acurast Docs](https://docs.acurast.com).

## Deployment

The frontend is deployed on GitHub Pages through GitHub actions.

The worker to update the oracles is deployed on Google Cloud and is scheduled to run every 15 minutes via cronjob.

## Credits

- [zkOracle-OCW](https://github.com/ubinix-warun/zkOracle-OCW/tree/main) - provided a great reference implementation on zkOracles and off-chain workers
