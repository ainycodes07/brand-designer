# Portfolio — Iqra Brand Designer

## Setup

### Font
Place your downloaded font file in a `fonts/` folder next to the HTML file:

```
portfolio/
├── index.html
├── style.css
├── script.js
├── fonts/
│   └── Pilowlava-Regular.otf   ← put your font here
├── logo.png                     ← your logo image
├── banner.jpg                   ← full-width banner image
├── project1.jpg                 ← project images
├── project2.jpg
├── project3.jpg
├── project4.jpg
├── project5.jpg
└── project6.jpg
```

If your font file has a different name, update the path in `style.css`:
```css
@font-face {
  src: url('fonts/YOUR-FONT-FILENAME.otf') format('opentype');
}
```

### Images

| File         | Used for                          | Notes                        |
|--------------|-----------------------------------|------------------------------|
| `logo.png`   | Header & footer logo              | Transparent PNG recommended  |
| `banner.jpg` | Full-width section between projects and contact | Uses natural height |
| `project1–6.jpg` | Project grid cards            | Aspect ratio ~4:5 works best |

If a logo image isn't found, the site falls back to the text "iqra." in Pilowlava.

### Colors
All colors are CSS variables in `style.css` — easy to adjust:
```css
:root {
  --red:    #C8302A;   /* main brand red */
  --black:  #111111;
  --white:  #FFFFFF;
  --cream:  #F5F0EB;   /* about-detail section bg */
}
```
