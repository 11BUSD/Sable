# VEIL

**Metadata-private transport for Ethereum.**

VEIL is an open-source prototype that explores how wallets and agents can interact with Ethereum while revealing less unnecessary metadata to the infrastructure carrying their requests.

> Status: public testnet prototype. Not audited. Not production anonymity software. Do not use for high-value transactions.

## Why this exists

An Ethereum request can disclose more than consensus needs: source network identity, app session, request timing, RPC query history, operator workflow and relationships between actions. VEIL treats that surrounding metadata as something to minimize by default.

## MVP in one minute

1. Open `/playground`.
2. Choose `eth_chainId`, `eth_blockNumber`, or `eth_getBalance`.
3. Click **Route through VEIL**.
4. Inspect three simulated policy-enforcing relay hops.
5. Export a deterministic privacy receipt.

The demo is deliberately limited to safe, read-only RPC calls. If `ETHEREUM_RPC_URL` is configured, the final hop calls that endpoint. Otherwise it returns a deterministic synthetic demo response.

## Architecture

```text
wallet / agent
    |
    | local intent
    v
VEIL client
    |
    | minimized request envelope
    v
relay A -> relay B -> relay C -> Ethereum RPC
    |
    `-> privacy receipt
```

The production architecture reserves an **anonymous-set authorization provider** for reviewed ring-signature constructions. The public MVP does not ship a home-grown cryptographic implementation and does not claim that a three-hop web demo defeats global traffic analysis.

## Stack

- Next.js 15 / React 19 / TypeScript
- Node `crypto` for deterministic SHA-256 commitments
- Vercel-ready deployment
- zero account requirement for testers
- no analytics by default
- GitHub Actions build gate

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

Optional live Sepolia-compatible RPC:

```bash
ETHEREUM_RPC_URL=https://your-rpc.example npm run dev
```

## Test

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
npm run smoke
```

## Vercel

Import the repository into Vercel or run a Vercel deployment from the project root. `ETHEREUM_RPC_URL` is optional. The application works in synthetic tester mode without it.

## Public tester script

Ask testers to complete these tasks without explanation:

1. Tell us what VEIL protects in one sentence.
2. Run one request in the playground.
3. Explain what each relay is supposed to forget.
4. Export the receipt.
5. Report any sentence that feels like an anonymity guarantee.

Success target: 80% of first-time testers complete the flow in under 90 seconds.

## Software factory

`agents/privacy-auditor.md` reviews metadata collection and product claims. `agents/release-gate.md` defines release criteria. CI builds every push and PR. `scripts/smoke-test.mjs` verifies the health + relay path.

Recommended iteration loop:

```text
issue -> implementation -> privacy auditor -> CI -> preview deployment -> human tester -> release gate -> production
```

## Security boundaries

This repository is a prototype and educational public-good implementation. It does not currently provide a production ring signature, onion routing, Sybil resistance, cover traffic, mixnet-level timing protection, or protection against a global passive adversary. Those belong on the audited roadmap, not in marketing claims.

## Roadmap

- v0.1 — public metadata-minimization playground + receipt
- v0.2 — independent relay processes and encrypted hop envelopes
- v0.3 — reviewed anonymous-set authorization provider
- v0.4 — wallet/agent SDK and benchmark harness
- v0.5 — independent operator testnet and external security review

## License

MIT. Privacy infrastructure should be inspectable, forkable and independently runnable.
