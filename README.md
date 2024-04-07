# Lay
Lay - Yet another Linq (functionality in JavaScript)

It provides data manipulation easier and similar to how C# Linq syntax is.

### Usage
```javascript
const list = [
  {Id: 0, Nome: 'Jeff', Idade: 10, Sexo: 'M', Nota: 100.0, AnoEscolar: 8},
  {Id: 1, Nome: 'Bruno', Idade: 5, Sexo: 'M', Nota: 52.5, AnoEscolar: 7},
  {Id: 2, Nome: 'Luis', Idade: 19, Sexo: 'M', Nota: 35.0, AnoEscolar: 7},
  {Id: 3, Nome: 'Alex', Idade: 12, Sexo: 'F', Nota: 9.5, AnoEscolar: 6},
  {Id: 4, Nome: 'Dakota', Idade: 17, Sexo: 'F', Nota: 85.5, AnoEscolar: 8},
];


new Lay(list)
    .where(f => f.Sexo === 'M')
    .groupBy(g => ({AnoEscolar: g.AnoEscolar})) // or ´g => g.AnoEscolar´
    .select(s => ({
        AnoEscolar: s.key.AnoEscolar, // if ´g => g.AnoEcolar´, it would be ´s.key´
        NotaMedia: s.average(v => v.Nota)
    }))
    .toList()
/*
* => (2) [{…}, {…}]
* =>  0: {AnoEscolar: 7, NotaMedia: 43.75}
* =>  1: {AnoEscolar: 8, NotaMedia: 100}
*/
// Simple usage
`Nota media ${new Lay(list).avg(v => v.Nota)}`
// => 'Nota media 56.5'
```

## Supported functions
\* Supports predicate as param <br/>
* `max`
* `min`
* `avg/average`
* `toList`
* `sum`
* `count`/`length` \*
* `filter`/`where`
* `first` \*
* `firstOrDefault` \*
* `last` \*
* `lastOrDefault` \*
* `groupBy`
* `select`
* `group`(static)
* `orderBy`
* `orderByDescending`
* `selectMany`
