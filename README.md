# Pedani-Migration-Services
Pedani Migration Services
is a migration company and they asked me to make their website for them
 the website structure:
 HOME
 ├── Introduction
 ├── Services
 ├── Destinations
 ├── Why Choose Us
 └── CTA

ABOUT
 ├── Who We Are
 ├── Mission
 └── Why PEDANI

SERVICES
 ├── Study Abroad
 ├── Visa Assistance
 ├── Migration Services
 └── Travel Assistance

DESTINATIONS
 ├── Canada
 ├── UK
 ├── Australia
 └── Other destinations

CONTACT
 ├── Contact Form
 ├── Phone
 ├── Email
 └── WhatsApp

 scale it so it fits well as a favicon
Edit
Edit
Edit

Yes. Think of the palette as having jobs, not just colors. For your PEDANI site, I'd use it like this:

:root {
  --primary: #063B8C;
  --primary-dark: #032B68;
  --accent: #2F80ED;


  --background: #F8FAFC;
  --surface: #FFFFFF;


  --text: #172033;
  --text-muted: #64748B;


  --border: #E2E8F0;


  --success: #16A34A;
  --error: #DC2626;
}
1. --background → main page background

Use it on the overall page.

body {
  background: var(--background);
  color: var(--text);
}

This keeps the website slightly softer than pure white.

2. --surface → things sitting on the background

Use white for:

Cards
Navbar
Forms
Dropdowns
Modals
.card {
  background: var(--surface);
}
3. --text → important text

Use for:

H1
H2
H3
Navigation
Important paragraphs
h1,
h2,
h3 {
  color: var(--text);
}
4. --text-muted → secondary text

Use for:

Descriptions
Small text
Supporting information
Form hints
.card p {
  color: var(--text-muted);
}

Don't use this for your main headings.

5. --primary → your main brand color

This is your most important blue.

Use it for:

Main CTA buttons
Important links
Active navigation
Icons
Brand elements
.btn-primary {
  background: var(--primary);
  color: white;
}
6. --primary-dark → hover/darker states

Don't use this everywhere. Mainly use it to create hierarchy.

.btn-primary:hover {
  background: var(--primary-dark);
}

You can also use it for very strong headings or dark sections.

7. --accent → small highlights

Your lighter blue should be used sparingly.

Good for:

Icons
Small highlights
Badges
Decorative elements
Secondary buttons
.icon {
  color: var(--accent);
}

Don't make every button --accent.

8. --border → subtle separation

Use it for:

Card borders
Input borders
Dividers
Navbar borders
input {
  border: 1px solid var(--border);
}
9. --success / --error

Only use these when the meaning requires it.

.success {
  color: var(--success);
}


.error {
  color: var(--error);
}

For example:

Success: Application submitted ✓
Error: Please enter a valid email.

A typical PEDANI page

I'd structure the colors roughly like:

BODY
  ↓
#F8FAFC  ← background


NAVBAR
  ↓
#FFFFFF  ← surface


HERO
  ↓
#F8FAFC
  ↓
Dark text
  ↓
Blue CTA (#063B8C)


SERVICES
  ↓
White cards (#FFFFFF)
  ↓
Dark headings (#172033)
  ↓
Muted descriptions (#64748B)
  ↓
Blue icons (#2F80ED)


CTA SECTION
  ↓
Deep blue (#063B8C)
  ↓
White text
  ↓
White button
The main rule

Don't try to use every variable in every section.

Your dominant combination should be:

Off-white background + white surfaces + dark text + deep blue CTAs + muted gray secondary text.

That will give PEDANI the clean, professional look you're going for.

 note for the background e.g navbar, hero

Ahh, you mean you want notes beside each color explaining where to use it, especially backgrounds. Like this:

:root {
  /* BRAND */
  --primary: #063B8C;       /* Main buttons, links, active states */
  --primary-dark: #032B68;  /* Button hover, dark sections */
  --accent: #2F80ED;        /* Icons, highlights, small accents */


  /* BACKGROUNDS */
  --background: #F8FAFC;    /* Main page, hero, alternating sections */
  --surface: #FFFFFF;       /* Navbar, cards, forms, footer content */


  /* TEXT */
  --text: #172033;          /* Headings, main body text, navigation */
  --text-muted: #64748B;    /* Descriptions, subtitles, secondary text */


  /* BORDERS */
  --border: #E2E8F0;        /* Inputs, cards, dividers */


  /* STATUS */
  --success: #16A34A;       /* Success messages, confirmations */
  --error: #DC2626;         /* Errors, validation messages */
}
Background specifically
--background → Hero, main page, light sections
--surface    → Navbar, cards, forms, white sections
--primary    → Dark CTA sections / important brand sections

So for example:

body {
  background: var(--background);
}


.navbar {
  background: var(--surface);
}


.hero {
  background: var(--background);
}


.services {
  background: var(--surface);
}


.cta {
  background: var(--primary);
}

That gives you a nice rhythm of light → white → light → blue throughout the page.

pls change the color palette to be clean and modern and maybe reduce the white a little bit and when ur done give me code in root element and collor guide

Yeah — I'd move away from pure white + strong blue everywhere and use a slightly warmer/cooler neutral system. That will make PEDANI feel more modern, premium, and trustworthy while still matching the blue in the logo.

Root palette
:root {
  /* BRAND */
  --primary: #164E8C;        /* Main brand blue, buttons, links */
  --primary-dark: #0D355F;   /* Hover states, dark sections */
  --accent: #3B82C4;         /* Icons, highlights, secondary accents */


  /* BACKGROUNDS */
  --background: #F1F5F9;     /* Main page background, hero, light sections */
  --surface: #E8EEF5;        /* Navbar, cards, forms, secondary sections */
  --surface-light: #F8FAFC; /* Small/light areas where you need more contrast */


  /* TEXT */
  --text: #172B3A;           /* Headings, main text, navigation */
  --text-muted: #64748B;     /* Descriptions, subtitles, secondary text */
  --text-light: #F8FAFC;     /* Text on dark/blue backgrounds */


  /* BORDERS */
  --border: #D5DEE8;         /* Cards, inputs, dividers */


  /* STATUS */
  --success: #16805C;        /* Success messages */
  --error: #C43D3D;           /* Errors and validation */
}
🎨 Color guide
Variable	Use it for
--primary	Main buttons, important links, active navigation
--primary-dark	Button hover, footer, strong CTA sections
--accent	Icons, small highlights, secondary buttons
--background	Main page background, hero, light sections
--surface	Navbar, cards, forms, secondary sections
--surface-light	Small areas that need to stand out slightly
--text	Headings, navigation, important text
--text-muted	Paragraphs, descriptions, subtitles
--text-light	Text placed over blue/dark backgrounds
--border	Card borders, input borders, dividers
--success	Successful actions/messages
--error	Errors/validation
##Typography

I'd use Poppins 600–700 for headings and 400–500 for body text.

size guide:
20px  → 1.25rem
10px  → 0.625rem
500px → 31.25rem
100px → 6.25rem
50px  → 3.125rem
25px  → 1.5625rem
250px → 15.625rem
350px → 21.875rem

##flags:

🇬🇧 GB — United Kingdom
🇨🇦 CA — Canada
🇪🇸 ES — Spain
🇮🇹 IT — Italy
🇩🇪 DE — Germany
🇶🇦 QA — Qatar
🇰🇼 KW — Kuwait
🇦🇺 AU — Australia
🇨🇭 CH — Switzerland
🇸🇪 SE — Sweden