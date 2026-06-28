# Eiropas Ģimeņu festivāls – Home & Heart

Statiskā mājaslapas versija latviešu valodā festivāla publicēšanai Vercel vai citā hostinga platformā.

## Faili

- `index.html` – lapas saturs
- `styles.css` – vizuālais noformējums
- `script.js` – mobilā izvēlne un laika atskaite
- `package.json` – statiskam Vercel izvietojumam
- `vercel.json` – norāda, ka projekts nav Next.js lietotne

## Reģistrācijas sadaļa

Lapas sadaļā “Reģistrācija” šobrīd ir vietturis “Reģistrācijas forma drīzumā”. Kad Google Forms vai cita pieteikšanās forma ir gatava, `index.html` failā jāatrod šī poga un `href="#"` vietā jāievieto īstā formas saite.

Ieteicamais reģistrācijas princips:

1. Ģimene iepriekš aizpilda īsu formu.
2. Formā norāda ģimenes nosaukumu un aptuveno dalībnieku skaitu.
3. Organizatori no pieteikumiem sagatavo aktivitāšu kartes vai uzlīmes ar ģimenes nosaukumu.
4. Festivāla dienā ģimene reģistrācijā saņem savu karti, apmeklē aktivitātes un krāj zīmogus.
5. Par 10, 20 vai visām pieejamajām aktivitātēm ģimene saņem atbilstošu balvu.

## Vercel izvietošana

Repozitorija saknē jāatrodas šiem failiem:

```text
index.html
styles.css
script.js
package.json
vercel.json
README.md
```

Nevajag saglabāt vecos Next.js failus, piemēram, `app/`, `pages/`, `src/`, `next.config.js` vai vecu `package.json` ar `next build`.

## Attēli

Logo un ES līdzfinansējuma attēls šobrīd tiek ielādēts no `familyactivityhub.com`. Ja vēlāk vēlaties lapu padarīt pilnībā neatkarīgu, attēlus var lejupielādēt un ievietot lokālā `visuals/` mapē.


## Provizoriskie laiki

- Ierašanās un reģistrācija: no 10.30
- Aktivitātes: 11.00–17.00
- Noslēgums: 17.30
