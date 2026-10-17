# Premium Wedding Invitation Website
### Sharik Zafar Siddiqui &amp; Zainab Parween

A luxurious, floral digital wedding invitation website built with high-end typography, mobile-first responsive layout, live countdown, WhatsApp RSVP integration, photo gallery lightbox, and local photo preview capability.

---

## 💍 Wedding Details
- **Groom:** Sharik Zafar Siddiqui
- **Bride:** Zainab Parween
- **Event:** Baraat Ceremony
- **Date:** 12 November 2026
- **Day:** Thursday
- **Time:** 8:00 PM Indian Standard Time (IST, UTC+05:30)
- **Venue:** Mohalla Khalifa Tola, Near Madarsa Darul Uloom Faridia, Roh, Nawada, Bihar, India.
- **RSVP WhatsApp:** `+91 7061203970` (`917061203970`)
- **Special Creator Credit:**
  > Created with love by **MOHAMMAD ALAMIN HUSSAIN**  
  > *The Bride's Cousin Brother*

---

## 📂 Project Structure
```
wedding-design/
├── index.html                  # Main semantic HTML5 markup
├── style.css                   # Custom luxury floral CSS design system
├── script.js                   # Countdown, WhatsApp RSVP, music player & gallery logic
├── server.js                   # Zero-dependency local web server with media range streaming
├── README.md                   # Complete documentation & deployment guide
├── music/
│   └── song.mp4                # Wedding background music file
└── assets/
    └── images/
        ├── hero-floral-bg.jpg  # Generated luxury floral stationery background
        ├── bismillah.svg       # Arabic calligraphy in metallic gold
        ├── floral-corner.svg   # Luxury botanical corner ornaments
        ├── floral-divider.svg  # Delicate gold floral filigree divider
        ├── gallery-1.svg       # "The Sacred Rings" placeholder
        ├── gallery-2.svg       # "The Ceremonial Arch" placeholder
        ├── gallery-3.svg       # "The Royal Invitation" placeholder
        ├── gallery-4.svg       # "Feast & Hospitality" placeholder
        ├── gallery-5.svg       # "Bridal Blossoms" placeholder
        └── gallery-6.svg       # "Festive Illumination" placeholder
```

---

## 🚀 How to Preview Locally

### Option 1: Direct File Preview
Simply double-click `index.html` in your file explorer, or right-click `index.html` and choose **Open With > Google Chrome** (or Edge, Safari, Firefox).

### Option 2: Using a Lightweight Local Web Server
You can start a local development server with Python or Node:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

**Using Node.js / npx:**
```bash
npx serve .
```

---

## 📸 How to Personalize Gallery Photographs
1. Save your wedding pictures inside `assets/images/` as `photo-1.jpg`, `photo-2.jpg`, etc.
2. In `index.html`, find the `<div class="gallery-grid" id="weddingGalleryGrid">` section.
3. Update the `data-src` and `<img src="...">` attributes to point to your new photos.

---

## 🌐 How to Publish Online for Free

### Option A: Free Hosting on Netlify (Drag & Drop — Fastest, 1 Minute)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this whole `wedding design` folder into the drop area.
3. Your wedding invitation website will instantly receive a live public HTTPS URL that you can share with all your family and guests on WhatsApp!

### Option B: Free Hosting on GitHub Pages
1. Create a repository on GitHub (e.g. `sharik-zainab-wedding`).
2. Push or upload all project files directly to the `main` branch.
3. In GitHub repo settings, go to **Pages** > Select `Deploy from a branch` > Choose `main` branch and `/ (root)` folder > Click **Save**.
4. Your website is published at `https://<your-username>.github.io/sharik-zainab-wedding/`.

### Option C: Free Hosting on Vercel
1. Install Vercel CLI (`npm i -g vercel`) or sign in at [vercel.com](https://vercel.com).
2. Import the folder or run `vercel` in your terminal.

---

## ✨ Features Checklist
- [x] **Interactive 3D Digital Invitation Opening Experience:** Luxury Indian wedding card & envelope suite with embossed golden "SZ" wax seal, 3D flap unfolding, animated letter emergence, and golden stardust sparkles.
- [x] **Explicit Tap-to-Open Interaction:** Tapping the envelope or wax seal opens the invitation and seamlessly starts background music (`music/song.mp4`) as an authentic user gesture.
- [x] **Replay Opening Capability:** Floating "✉️ Open Envelope" button allows guests to re-experience opening the royal card at any time.
- [x] Luxury floral wedding stationery theme with ivory, blush pink, and gold foil accents.
- [x] Exact spelling for Sharik Zafar Siddiqui & Zainab Parween.
- [x] Baraat Ceremony, Thursday, 12 November 2026 at 8:00 PM IST.
- [x] Dynamic live countdown targeting Asia/Kolkata timezone with zero-padding and celebration state.
- [x] Direct Google Maps venue search integration (`Khalifa Tola Roh Nawada near Madarsa Darul Uloom Faridia`).
- [x] One-click venue address copy button with toast notification.
- [x] "Add to Google Calendar" button for guests.
- [x] WhatsApp RSVP form with "Will Attend" & "Unable to Attend" options, 1 to 52 guest selection, and formatted confirmation sent to `917061203970`.
- [x] Reminder modal explaining that guests must press "Send" in WhatsApp.
- [x] Wedding Moments photo gallery with interactive image lightbox modal.
- [x] "Preview Your Photos" local device preview allowing up to 8 images with remove and clear buttons.
- [x] Prominent creator credit: **MOHAMMAD ALAMIN HUSSAIN**, *The Bride's Cousin Brother*.
- [x] Subtle footer: "Sharik & Zainab | 12 November 2026".
- [x] Background music player with `music/song.mp4` integration.
- [x] Gentle canvas-based falling rose petals animation.
- [x] 100% mobile-first responsive layout tested across device screen sizes.
