const base=process.env.BASE_URL||"http://localhost:3000";
const h=await fetch(base+"/api/health"); if(!h.ok) throw new Error("health failed");
const r=await fetch(base+"/api/relay",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:"eth_chainId",params:[]})});
const j=await r.json(); if(!r.ok||!j.receipt||j.trace?.length!==3) throw new Error("relay smoke failed");
console.log("VEIL smoke test passed", {upstream:j.upstream, relayCount:j.trace.length});
