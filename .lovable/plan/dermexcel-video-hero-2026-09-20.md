# Dermexcel Video Hero

## Scope
Build a single-page experience containing only the requested opening section: the Dermexcel navigation, “Small team, big results” headline, and the floating media below it. No team, framework, stats, or footer sections.

## Experience
- Create a mobile-first editorial layout in the supplied warm ivory, charcoal, and orange visual direction using DM Sans.
- Place all eight uploaded portrait videos in a layered, cinematic strip beneath and partly across the oversized headline.
- Autoplay every preview muted, inline, and continuously looping.
- Add smooth entrance, floating, and touch-friendly motion while respecting reduced-motion settings.
- Make the arrangement deliberately composed for narrow phones, then expand into the wider scattered-card composition on desktop.

## Fullscreen video player
- Open the tapped video in an immersive fullscreen overlay with sound enabled.
- Provide clear play/pause, mute/unmute, close, seek/progress, elapsed time, and fullscreen controls.
- Pause the background previews while the player is open and support Escape/backdrop close.
- Handle mobile autoplay restrictions gracefully if sound must begin after the tap.

## Technical details
- Store the uploaded videos through the project asset delivery flow rather than committing large media files.
- Build the page with React and the existing TanStack Start structure.
- Define all color, shadow, typography, and motion values as semantic design tokens in the global stylesheet.
- Add page-specific title, description, Open Graph, and Twitter metadata.
- Validate the final result in phone and desktop viewports, including interaction, overflow, and runtime errors.
