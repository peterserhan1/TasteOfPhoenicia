# Taste of Phoenicia

A modern, elegant website for Taste of Phoenicia—a Lebanese-owned specialty food import business based in Chicago, Illinois.

## Overview

Taste of Phoenicia imports authentic Lebanese products from North Lebanon and distributes them throughout the United States. This is a **non-e-commerce** website; customers contact the business to place orders.

## Project Structure

```
TasteOfPhoenicia/
├── index.html      # Home page
├── about.html      # About Us
├── products.html   # Product catalog
├── contact.html    # Contact form
├── favicon.svg     # Site favicon (olive branch)
├── css/
│   └── styles.css  # Main stylesheet
├── js/
│   └── main.js     # Navigation & interactivity
└── README.md
```

## Setup

### 1. Contact Form (Formspree)

The contact form uses [Formspree](https://formspree.io/) to send submissions via email. To enable it:

1. Go to [formspree.io](https://formspree.io/) and create a free account
2. Create a new form and copy your form ID
3. In `contact.html`, replace `YOUR_FORM_ID` in the form action:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Example: `action="https://formspree.io/f/xjkljklj"`

### 2. Update Contact Information

Edit `contact.html` to add your actual business details:

- **Phone:** Replace `(123) 456-7890` with your real phone number
- **Email:** Replace `info@tasteofphoenicia.com` with your email
- **Social links:** Update the `href="#"` in the footer on all pages with your Facebook, Instagram, and LinkedIn URLs

### 3. Favicon

The site includes a custom SVG favicon (`favicon.svg`) featuring an olive branch design in the brand colors (olive green and gold). It is linked in the `<head>` of all pages and displays in browser tabs and bookmarks.

### 4. Product Photography

The site uses placeholder images from Unsplash. For production, replace these with high-quality photos of your actual products. Update the `src` attributes in the HTML files.

## Running Locally

Open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8000`

## Features

- **Responsive design** — Works on mobile, tablet, and desktop
- **SEO-friendly** — Semantic HTML, meta descriptions, proper headings
- **Mediterranean aesthetic** — Olive green, cream, gold color palette
- **Simple navigation** — Clean header with mobile menu
- **Contact form** — Name, business, email, phone, location, product interest, message
- **Custom favicon** — Olive branch SVG icon in brand colors

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties and modern JavaScript.

## License

© 2025 Taste of Phoenicia. All rights reserved.
