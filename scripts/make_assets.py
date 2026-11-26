from PIL import Image, ImageDraw, ImageFont
import qrcode

import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..") + "/"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"


def grad(w, h, a, b):
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x / w + y / h) / 2
            px[x, y] = tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
    return img


def icon(size):
    s = 4
    S = size * s
    img = grad(S, S, (6, 95, 70), (13, 148, 136))
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * .22), fill=255)
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    d = ImageDraw.Draw(out)
    u = S / 64
    w = int(5 * u)
    for x, y in ((12, 12), (37, 12), (12, 37)):
        d.rounded_rectangle([x * u, y * u, (x + 15) * u, (y + 15) * u], radius=3 * u, outline="white", width=w)
    for x, y, z in ((37, 37, 7), (46, 46, 6), (37, 47, 5), (47, 37, 5)):
        d.rounded_rectangle([x * u, y * u, (x + z) * u, (y + z) * u], radius=1.5 * u, fill="white")
    return out.resize((size, size), Image.LANCZOS)


for n, sz in (("favicon-32.png", 32), ("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)):
    im = icon(sz)
    if n == "apple-touch-icon.png":
        bg = Image.new("RGB", im.size, (6, 95, 70))
        bg.paste(im, (0, 0), im)
        im = bg
    im.save(OUT + n, optimize=True)

W, H = 1200, 630
og = grad(W, H, (8, 30, 24), (6, 78, 59))
d = ImageDraw.Draw(og)
d.rounded_rectangle([70, 70, 420, 112], radius=21, fill=(20, 60, 48))
d.text((92, 80), "FREE · PRIVATE · OPEN SOURCE", font=ImageFont.truetype(BOLD, 17), fill=(126, 224, 195))
d.text((70, 150), "Raast QR for", font=ImageFont.truetype(BOLD, 66), fill="white")
d.text((70, 228), "your shop", font=ImageFont.truetype(BOLD, 66), fill=(45, 212, 191))
f = ImageFont.truetype(REG, 28)
d.text((70, 330), "Turn any Pakistani IBAN into a printable", font=f, fill=(190, 214, 205))
d.text((70, 368), "payment QR in 10 seconds.", font=f, fill=(190, 214, 205))
x = 70
for b in ("HBL", "Meezan", "UBL", "JazzCash", "Easypaisa", "SadaPay"):
    bf = ImageFont.truetype(BOLD, 20)
    tw = d.textlength(b, font=bf)
    d.rounded_rectangle([x, 450, x + tw + 30, 490], radius=20, fill=(22, 66, 53), outline=(60, 110, 95), width=2)
    d.text((x + 15, 459), b, font=bf, fill="white")
    x += tw + 42
d.text((70, 540), "raast-qr.syedyawar.com", font=ImageFont.truetype(BOLD, 24), fill=(126, 224, 195))

cx, cy, cw, ch = 800, 60, 330, 510
card = grad(cw, ch, (6, 78, 59), (13, 148, 136))
cm = Image.new("L", (cw, ch), 0)
ImageDraw.Draw(cm).rounded_rectangle([0, 0, cw - 1, ch - 1], radius=28, fill=255)
og.paste(card, (cx, cy), cm)
d.text((cx + cw / 2, cy + 52), "Scan to Pay", font=ImageFont.truetype(BOLD, 36), fill="white", anchor="mm")
q = qrcode.QRCode(border=2, box_size=10, error_correction=qrcode.constants.ERROR_CORRECT_M)
q.add_data("https://raast-qr.syedyawar.com/")
qi = q.make_image(fill_color="black", back_color="white").convert("RGB").resize((250, 250), Image.NEAREST)
d.rounded_rectangle([cx + 25, cy + 95, cx + cw - 25, cy + 95 + 280], radius=22, fill="white")
og.paste(qi, (cx + 40, cy + 110))
d.text((cx + cw / 2, cy + 420), "Your Shop Name", font=ImageFont.truetype(BOLD, 28), fill="white", anchor="mm")
d.text((cx + cw / 2, cy + 462), "Any Pakistani bank app", font=ImageFont.truetype(REG, 18), fill=(210, 235, 226), anchor="mm")
og.save(OUT + "og-image.png", optimize=True)
print("ok")
