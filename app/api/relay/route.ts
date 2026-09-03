import { createIntent, createReceipt } from "@/lib/veil";

const allowed = new Set(["eth_chainId","eth_blockNumber","eth_getBalance"]);

export async function POST(req: Request){
  const body = await req.json().catch(()=>null) as null | {method?:string;params?:unknown[]};
  if(!body?.method || !allowed.has(body.method)) return Response.json({error:"Method not allowed in public demo"},{status:400});
  const intent = createIntent(body.method, Array.isArray(body.params)?body.params:[]);
  const relays = ["relay-a","relay-b","relay-c"];
  const rpc = process.env.ETHEREUM_RPC_URL;
  let result: unknown = body.method === "eth_chainId" ? "0xaa36a7" : body.method === "eth_blockNumber" ? "0xdemo" : "0x0";
  let upstream = "synthetic-demo";
  if(rpc){
    try{
      const r = await fetch(rpc,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:body.method,params:intent.params}),cache:"no-store"});
      const j = await r.json(); result = j.result ?? {error:j.error}; upstream = "configured-rpc";
    }catch{ upstream = "configured-rpc-unavailable"; }
  }
  return Response.json({result,upstream,trace:relays.map((id,index)=>({hop:index+1,id,retained:["request-id","next-hop"],discarded:["source-ip","application-session"]})),receipt:createReceipt(intent,relays)});
}
