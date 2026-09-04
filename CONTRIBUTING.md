# Contributing to VEIL

The fastest way to help is to run the testnet, break an assumption, or build one small integration.

## Five-minute start

```bash
git clone https://github.com/11BUSD/Sable.git
cd Sable
npm install
npm run dev
```

Open `http://localhost:3000/playground`.

## Pick one job

- **Tester:** run a request and report confusing privacy claims or broken UX.
- **Builder:** create a tiny application using the current protocol interfaces.
- **Relay builder:** help separate the prototype relay path into independently runnable processes.
- **Security reviewer:** review `docs/THREAT_MODEL.md` and try to falsify an assumption in an authorized environment.
- **Documentation:** make the first five minutes easier for the next developer.

## Definition of done

A contribution should be small, testable, documented, and should not make stronger privacy claims than the implementation supports.

Before opening a PR:

```bash
npm run build
npm run smoke
```

If your change affects privacy boundaries, explain what each party can observe before and after the change.

## Security

Do not test against infrastructure you do not own or lack permission to test. Do not publish secrets, personal data, deanonymization of real users, or live exploit details that would put users at immediate risk. Use a minimal synthetic reproduction whenever possible.
