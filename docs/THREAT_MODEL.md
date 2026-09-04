# VEIL Threat Model — Testnet 0

VEIL is experimental privacy infrastructure. This document says what we are trying to protect, what we are not yet protecting, and what would falsify our assumptions.

## Assets

VEIL aims to reduce unnecessary disclosure of:

- source network metadata;
- Ethereum RPC query history;
- relationships between requests;
- application/session metadata;
- transaction origination metadata;
- private facts used to create a proof.

## Adversaries

### RPC provider

An RPC provider may log connections, methods, addresses, timing and request history. VEIL's goal is to reduce direct correlation between an end user and an RPC request.

### Single malicious relay

A relay may inspect everything available at its hop. The target architecture must prevent one relay from simultaneously learning the user's identity, complete plaintext intent and final destination.

### Colluding relays

Multiple relays may cooperate. Testnet 0 does not claim a formal anonymity guarantee against collusion. Future releases must document the exact compromise threshold before making such a claim.

### Global passive observer

An adversary able to observe traffic across the network may correlate timing and packet patterns. Testnet 0 does not protect against this adversary.

### Malicious application

An application may request excessive information, fingerprint users or misrepresent what is being disclosed. VEIL should expose requests clearly and minimize disclosure by default.

### Compromised device

If the user's operating environment is fully compromised, protocol cryptography cannot guarantee confidentiality of data available to that environment. Device revocation and recovery are separate controls.

### Supply-chain compromise

Dependencies, build tooling or releases may be compromised. CI, pinned dependencies, review, provenance and reproducible-build work belong in the release process.

## Non-goals for Testnet 0

Testnet 0 does not claim:

- perfect anonymity;
- global traffic-analysis resistance;
- production onion routing or mixnet protection;
- production ring signatures;
- audited zero-knowledge proving;
- protection for real funds;
- protection against a fully compromised endpoint.

## Invariants we want to reach

1. Sensitive operations are local-first where practical.
2. No relay receives more information than its role requires.
3. Privacy degradation is explicit; the SDK must not silently pretend protection succeeded.
4. Cryptographic providers are versioned and replaceable.
5. Sensitive identity material is never placed directly on-chain.
6. Testnet claims must be weaker than or equal to measured guarantees.

## How to help

Try to falsify these assumptions in environments you own or have permission to test. Open a GitHub issue with reproduction steps, affected version, expected behavior and observed behavior. Do not attack third-party infrastructure or attempt to deanonymize real people.
