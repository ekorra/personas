# Stilguide for ikonbiblioteket

## Formål

Biblioteket skal gi konsekvente avatarer og piktogrammer for norske offentlige og administrative presentasjoner. Illustrasjonene skal være nøkterne, inkluderende og enkle å gjenkjenne i liten størrelse.

## Felles regler

- Lever som PNG med transparent bakgrunn og kvadratisk format.
- Bruk et lerret på 1254 × 1254 px for enkeltfigurer og symboler. Motivet sentreres horisontalt.
- Unngå tekst, vannmerker, logoer, flagg, offisielle segl og etterligning av andre ikonbibliotek.
- Bruk bare ett hovedmotiv per ikon.
- Unngå reelle pass, ID-kort og personopplysninger. Vis slike begreper med generiske dokumentformer.

## Symboler

Alle symboler i `symboler/` bruker den enkle paletten: mørk marineblå `#172638` og hvitt, med transparent bakgrunn. Dette gjelder også database- og autorisasjonssymboler.

Symboler skaleres slik at de fyller den samme visuelle flaten som en voksenavatar, uten å forvrenge proporsjonene.

## Visuell størrelse

Enkeltfigurene forankres langs samme nedre linje i lerretet, slik at de kan justeres rett inn mot hverandre i en presentasjon.

- Voksne, pensjonister, saksbehandler og systembruker: 950 px synlig høyde.
- Ungdom og ung voksen: 850 px synlig høyde.
- Barn: 760 px synlig høyde.
- Symboler: tilpasses innenfor en visuell flate på 950 × 950 px.

## Enkel stil

Brukes når ikonet skal være lite, inngå i prosessdiagrammer eller kombineres med andre små symboler.

- Farger: navy/svart `#172638` og hvitt.
- Flate, avrundede og geometriske former.
- Ingen fargegraderinger, skygger eller ansiktstrekk.
- Hvit brukes som negativt rom og til små, nødvendige rollemarkører.
- Må være tydelig ved omtrent 32 px.
- Avatarer viser hode og skuldre. Skill roller med én eller to markører, som briller, skjortekrage, slips, verneutstyr eller hette.
- Bruk suffikset `_enkel` i filnavnet.

Eksempler: `pensjonist_mann_1_enkel.png`, `cobot_enkel.png`, `digital_fullmakt.png`.

## Detaljert stil

Brukes når avataren eller symbolet får større plass i en presentasjon.

- Transparent bakgrunn og kvadratisk format.
- Nordisk, rolig og profesjonell illustrasjonsstil.
- Dempede blåtoner med nøkterne aksentfarger og naturlige hudtoner.
- Myke fylte former og begrenset detaljering.
- Avatarer vises som hode og skuldre. Alder og rolle skal være tydelig, men respektfullt fremstilt.

## Navngiving

Bruk norske beskrivelser med små bokstaver og understreker:

- Personer: `<rolle>_<kjonn>_<nummer>.png`
- Enkel variant: `<rolle>_<kjonn>_<nummer>_enkel.png`
- Symboler: `<begrep>_enkel.png` når de følger den enkle stilen.

Eksempler:

- `fabrikkarbeider_kvinne_1.png`
- `fabrikkarbeider_kvinne_1_enkel.png`
- `folkeregisteret.png`
- `kontorbygg_enkel.png`

## Eksisterende innhold

`avatarer/` inneholder pensjonister, privatpersoner, regnskapsførere, kontorpersoner, fabrikkarbeidere, barn, ungdommer, en ung voksen og systembruker, både i detaljert og enkel variant.

`symboler/` inneholder symboler for offentlig digital tjeneste, digital og analog fullmakt, legitimasjon, Folkeregisteret, Enhetsregisteret, hus, kontor, kontorbygg, fabrikk og cobot. `altinn_autorisasjon.png` er et brukerlevert offisielt symbol og skal ikke redigeres eller brukes som stilgrunnlag for nye generiske ikoner.
