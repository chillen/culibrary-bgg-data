# culibrary-bgg-data


This is a [Tampermonkey](https://tampermonkey.net/) user script which adds a useful button to 
the Carleton University library catalogue website which attempts to pull information from
the [Board Game Geek](https://boardgamegeek.com/) API when it detects a catalogue item as
being a board game.

## Known Issues

There is a lot of inconsistency in the naming conventions and especially in the publication 
year which makes finding the individual board game quite difficult. Additionally, BGG
does not always return the most obvious order of games.

* Some games (7 Wonders) returning incorrect editions of the game
* Some games which likely should be found are not (Alhombra 1, 2, 3 etc.)
* Some games have frivolous subtitles which make finding the actual game quite difficult (catan, agircola)

It may be possible to use the root element and then search for publication year, but the publication year
can be very inconsistently written and would need to be scraped a bit more intensely. 
