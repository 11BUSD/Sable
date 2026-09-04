# VEIL

**Private access to Ethereum, in one SDK.**

VEIL is an open-source privacy testnet for Ethereum. It is being built around three simple developer actions:

```ts
await veil.read(...)
await veil.write(...)
await veil.prove(...)
```

- `read()` — reduce metadata leaked while reading Ethereum.
- `write()` — reduce metadata leaked while originating Ethereum actions.
- `prove()` — prove a fact without revealing unnecessary underlying information.

> **Testnet software. Not audited. Do not use for production funds or assume anonymity.**

## Try it

```bash
git clone https://github.com/11BUSD/Sable.git
cd Sable
npm install
npm run dev
```

Then open `http://localhost:3000/playground` and press **Route through VEIL**.

No account. No wallet required. No real funds.

## What happens?

```text
You
 ↓
VEIL client
 ↓
Relay A
 ↓
Relay B
 ↓
Relay C
 ↓
Ethereum RPC
 ↓
Privacy receipt
```

The current testnet demonstrates the interface and metadata-minimization policy. The relay path is still a prototype; it is **not** a claim of production anonymity or protection against a global network observer.

## Build on VEIL

The goal is that an application should eventually need only:

```bash
npm install @veil/sdk
```

and:

```ts
import { veil } from "@veil/sdk";

const result = await veil.read({
  method: "eth_blockNumber"
});
```

`@veil/sdk` is the target public package API. Until it is published, use this repository/testnet directly. We will not pretend an unpublished package already exists.

## Help us break it

We are building VEIL in public.

1. Run the playground.
2. Try to understand what information each hop can see.
3. Try to break the assumptions in `docs/THREAT_MODEL.md`.
4. Build something using the interfaces.
5. Open an issue with anything confusing, broken, or privacy-sensitive.

Good security reports are welcome. Never test against systems you do not own or have permission to test.

## What VEIL does not claim

Today VEIL does **not** claim production ring signatures, a production mixnet, global traffic-analysis resistance, perfect anonymity, or audited transaction privacy.

We would rather publish a limitation than fake a guarantee.

## Testnet milestones

- [x] public playground
- [x] deterministic privacy receipts
- [x] safe read-only RPC demo
- [x] build gate + smoke test
- [ ] public `@veil/sdk`
- [ ] `veil.read()`
- [ ] `veil.write()`
- [ ] `veil.prove()`
- [ ] independent relay processes
- [ ] encrypted hop envelopes
- [ ] Sepolia end-to-end demo
- [ ] external relay operators
- [ ] external security review

## Repository map

```text
app/       website + playground
lib/       VEIL protocol logic
agents/    privacy and release review rules
docs/      threat model + protocol documentation
scripts/   smoke tests
```

## Why Ethereum?

Ethereum is the trust and settlement anchor. VEIL focuses on minimizing information that infrastructure does not need in order to carry a legitimate request.

The long-term goal is simple:

> **Ethereum should learn what consensus requires. Infrastructure should learn as little else as practical.**

## License

MIT — inspect it, fork it, build on it, and help improve it.
