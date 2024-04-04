# Lay
Lay - Yet another Linq (functionality in JavaScript)
Say bye bye for long lines of code with for,foreach and if/eles only to get that desired grouped data.
### Usage
```javascript
const table = console.table;

let list = [
  {Id: 0, Nome: 'Jeff', Idade: 10, Sexo: 'M', Nota: 100.0},
  {Id: 1, Nome: 'Bruno', Idade: 5, Sexo: 'M', Nota: 52.5},
  {Id: 2, Nome: 'Luis', Idade: 19, Sexo: 'M', Nota: 35.0},
  {Id: 3, Nome: 'Alex', Idade: 12, Sexo: 'F', Nota: 9.5},
  {Id: 4, Nome: 'Dakota', Idade: 17, Sexo: 'F', Nota: 85.5},
];

// Usage as static method and unique function for grouping and selecting
table(
    Lay.group(
        list,
        g => ({Sexo: g.Sexo}),
        s => ({
             Sexo: s.key.Sexo,
            'Genero do Aluno': s.key.Sexo === 'M' ? 'Masculino' : 'Feminino',
            'Maior Idade': s.max(v => v.Idade),
            'Nota Media': s.avg(v => v.Nota)
        })
    )
)

// Usage with instance example
table(
    new Lay(list)
        .groupBy(g => ({Sexo: g.Sexo})) /* returns a Lay(listOfLay)*/
        .select(s => ({
            Sexo: s.key.Sexo,
            'Genero do Aluno': s.key.Sexo === 'M' ? 'Masculino' : 'Feminino',
            'Maior Idade': s.max(v => v.Idade),
            'Nota Media': s.avg(v => v.Nota)
        }))
)
```

## Supported functions
\* Supports predicated as param <br/>
* `max`
* `min`
* `avg`
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
