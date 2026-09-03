import { createHash, randomBytes } from "node:crypto";

export type VeilIntent = {
  method: string;
  params: unknown[];
  network: string;
  nonce: string;
  createdAt: string;
};

export type VeilReceipt = {
  version: "veil-receipt/0.1";
  intentHash: string;
  policyHash: string;
  routeCommitment: string;
  relayCount: number;
  network: string;
  createdAt: string;
  security: "prototype-not-audited";
};

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export function createIntent(method: string, params: unknown[], network = "sepolia"): VeilIntent {
  return { method, params, network, nonce: randomBytes(16).toString("hex"), createdAt: new Date().toISOString() };
}

export function createReceipt(intent: VeilIntent, relayIds: string[]): VeilReceipt {
  const policy = "veil-minimize/0.1:no-persistent-ip:no-app-session:3-hop-demo";
  return {
    version: "veil-receipt/0.1",
    intentHash: sha256(JSON.stringify(intent)),
    policyHash: sha256(policy),
    routeCommitment: sha256(relayIds.join("|") + "|" + intent.nonce),
    relayCount: relayIds.length,
    network: intent.network,
    createdAt: new Date().toISOString(),
    security: "prototype-not-audited",
  };
}
