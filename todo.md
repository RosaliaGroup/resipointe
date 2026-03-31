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
