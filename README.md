# ReFurnish

Second-hand furniture marketplace for Bangladesh, built from the ReFurnish design canvas.

## Run it
Open `index.html` in a browser, or serve the folder:

    cd refurnish && python3 -m http.server 8765
    # then visit http://127.0.0.1:8765

## Pages
| File | Screen |
|---|---|
| index.html | Home |
| shop.html | Shop / category listing (`?cat=Sofas`, `?q=teak`) |
| product.html | Product (`?id=linen-sofa`) |
| checkout.html | Checkout (`?id=...`) |
| sell.html | Sell, 3 steps (`?edit=<id>` to edit) |
| messages.html | Messages (`?listing=<id>` opens a chat) |
| saved.html | Saved |
| my-listings.html | My listings |
| profile.html | Seller profile (`?seller=nadia`, `?seller=me`) |
| signin.html / signup.html | Account |

## How it works today
- `js/data.js` holds demo listings, sellers and chats.
- `js/app.js` holds shared code: header, footer, product cards, icons, storage.
- Saved items, your listings, chats and sign-in live in the browser's localStorage.
  Clear site data to reset the demo.

## Not real yet
There is no server. Sign-in, OTP codes, payments (bKash, Nagad, card),
seller replies in chat and price suggestions are simulated in the browser.
A backend (database, auth, SMS, payment gateway, image storage) is the next step.
