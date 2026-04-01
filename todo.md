# Resipointe Platform TODO

## Core Infrastructure
- [x] Database schema (bookings, surveys, social posts, leads)
- [x] tRPC routers (chatbot, booking, survey, social gen)
- [x] Design system + global CSS (dark luxury theme)
- [x] App routing (all pages)

## Pages & Features
- [x] Homepage: hero, property portfolio grid, stats bar
- [x] Property gallery with lightbox (exterior/interior/amenities/neighborhood)
- [x] Interactive cost calculator (vs NYC, parking, pet, 2-months-free)
- [x] Floor plan browser (filter by beds/sqft/availability)
- [x] Campaign: NYC Commuters (/campaigns/commuters)
- [x] Campaign: No NY Tax (/campaigns/no-ny-tax)
- [x] Campaign: Flight Attendants & Pilots (/campaigns/aviators)
- [x] Campaign: Gen Z (/campaigns/genz)
- [x] Campaign: Modern Finishes (/campaigns/modern-finishes)
- [x] Campaign: Amenities (/campaigns/amenities)
- [x] AI Chatbot (LLM-powered, property Q&A, unit comparison, tour booking)
- [x] Appointment booking system (calendar, lead capture, confirmation)
- [x] Tenant/Developer collaboration hub (surveys, voting, feedback)
- [x] Social media content generator (AI captions, hashtags, preview, export)

## SEO
- [x] JSON-LD structured data (RealEstateListing per property)
- [x] Open Graph + Twitter Card meta per page/campaign
- [x] Dynamic meta descriptions per campaign
- [x] XML sitemap (/sitemap.xml)
- [x] robots.txt
- [x] Semantic HTML throughout

## Tests
- [x] Vitest: auth, booking, survey, chat, social generation (12 tests passing)

## GitHub
- [x] Push final build to RosaliaGroup/resipointe

## Developer Story & Collaboration Page
- [x] Developer history timeline (founding, milestones, portfolio growth)
- [x] Pipeline projects showcase (upcoming buildings with renderings/details)
- [x] Interactive "Build Your Dream Home" feature wishlist (categories: kitchen, bathroom, tech, amenities, community, outdoor)
- [x] Feature voting system (upvote/downvote with live counts)
- [x] Free-text "dream feature" submission form
- [x] Collaboration manifesto section (Resipointe philosophy)
- [x] Add "Our Story" nav link to Navbar
- [x] Backend: save votes and submissions to DB, notify owner
- [x] Tests for new routes
- [x] Push to GitHub

## Our Story as Main Page
- [x] Make Our Story the root "/" route (move current Home to "/properties")
- [x] Fix pipeline project images — remove dark overlays, make images light and clearly visible
- [x] Update navbar links to reflect new routing

## Our Story Redesign v2
- [x] Merge gallery section into Our Story page
- [x] New distinct color palette (deep navy/slate + warm gold accents, away from dark brown)
- [x] Condense timeline to compact horizontal scrollable strip (not tall alternating layout)
- [x] Feature voting list visible above the fold after hero

## Color Palette Fix
- [x] Replace navy/blue palette with warm sand/cream/taupe on Our Story page

## Lighter Color Palette
- [x] Make Our Story page much lighter — bright sand/linen/warm-white backgrounds, dark text

## Desert Resort Redesign
- [ ] Redesign Our Story page with luxury desert resort aesthetic (terracotta, dusty rose, burnt sienna, ivory, canyon earth tones)
- [ ] Generate hero background image with desert resort luxury feel
- [ ] Apply resort-quality typography and visual hierarchy

## Coastal Resort Palette Redesign
- [x] Generate luxury coastal hero image (ocean blues, turquoise, white architecture)
- [x] Rewrite OurStory.tsx with blues/turquoise/white/beige palette
- [x] Update global CSS tokens to coastal palette
- [x] Update Navbar to match coastal palette

## Text Readability & Copy Revision
- [x] Darken all body text, labels, and muted text for readability
- [x] Add dark text shadow on hero text over the photo
- [x] Rewrite all copy with "We Build Homes Like Resorts" brand messaging

## Campaign Pages — Brand Integration
- [x] Apply coastal palette + resort messaging to all 6 campaign pages
- [x] NYC Commuters campaign: resort living 20 min from Manhattan
- [x] No-NY-Tax campaign: resort lifestyle, NJ savings
- [x] Pilots & Flight Attendants campaign: resort home base 5 min from EWR
- [x] Gen Z campaign: resort community, modern lifestyle
- [x] Modern Finishes campaign: resort-quality interiors
- [x] Amenities campaign: resort amenities at home
- [x] Add "Shape Our Next Building" collaboration CTA to each campaign page
- [x] Ensure each campaign has unique hero color accent while sharing coastal base
