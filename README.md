# Raast QR

Free, private payment QR generator for any Pakistani bank account. Enter an IBAN, pick a style, and print a card customers can scan with any banking app (HBL, Meezan, UBL, MCB, JazzCash, Easypaisa, SadaPay and 40+ more).

**Live:** https://raast-qr.syedyawar.com

- **QR generator** (`/`): builds a standard static Raast P2P QR from an IBAN, with printable card styles, English/Urdu and night mode.
- **IBAN converter** (`/iban/`): account number to IBAN and back, with ISO 13616 checksum validation.

Everything runs in the browser. There is no backend, no analytics and no third-party script; the page's Content Security Policy blocks all outbound requests.

## How the QR works

```
000202 010211 020200 0424<IBAN> 1004<CRC-16/CCITT-FALSE>
```

Format version, static QR, scheme, the 24-character IBAN under tag `04`, and a CRC under tag `10`. The amount is left for the customer to enter.

## Run locally

```bash
python3 -m http.server 8765
```

## Test

Bank-specific account-number rules are checked against account/IBAN pairs that Pakistani charities publish on their donation pages:

```bash
node tests/iban-vectors.test.js
```

## Deploy

Static assets on Cloudflare Workers:

```bash
npx wrangler deploy
```

Deploy runs `scripts/build.mjs` first, which copies the site to `dist/` and adds a content hash to every JS/CSS link (`app.js?v=…`). Those files are served with a one-year `immutable` cache (see `_headers`); HTML is always revalidated, so a new deploy is picked up immediately.

## Notes

- A calculated IBAN can pass the checksum and still be wrong if a bank uses a non-standard account format. Always verify in your bank app before printing.
- Independent project, not affiliated with the State Bank of Pakistan, Raast, or any bank.

QR encoding by [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT). Made by [Yawar](https://syedyawar.com).

## License

MIT
