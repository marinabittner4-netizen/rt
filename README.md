# Marina Pflegebox Konfigurator

**Offline nutzbar**: Einfach `index.html` im Browser öffnen.

## Anpassen
- Produkte/Preise: im Script-Block im Array `products`.
- Start-Budget: im Feld `value="42"` (oder zur Laufzeit im UI ändern).

## Export
- Klick auf **„Bestellung erstellen“** erzeugt JSON im Export-Feld.
- **„JSON kopieren“** kopiert den Export in die Zwischenablage.

Erstellt am: 2026-02-07


## Bestellung abschließen (E-Mail Versand)

Im Konfigurator gibt es den Button **„Bestellung abschließen“**.  
Beim Klick wird ein PDF-Paket (Bestellformular + Anlage 2 + optional Wechselerklärung) erzeugt und an **pflegebox@pb-marina.de** gesendet.

### Wichtig: SMTP für den Versand konfigurieren (z. B. Vercel / Node Hosting)

Lege folgende Environment-Variablen an:

- `SMTP_HOST` (z. B. smtp.strato.de / smtp.gmail.com)
- `SMTP_PORT` (meist 587)
- `SMTP_USER` (Absender-Mailadresse / SMTP-Login)
- `SMTP_PASS` (SMTP-Passwort)
- optional `SMTP_SECURE=true` (wenn Port 465 genutzt wird)

Der Versand läuft über `api/send-order.js` (Nodemailer).

> Hinweis: Bei rein statischem Hosting ohne Server/API funktioniert der E-Mail Versand nicht.
