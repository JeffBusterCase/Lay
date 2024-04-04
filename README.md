# Lay
Lay - Yet another Linq (functionality in JavaScript)


```javascript

// Usage below
const print = console.log;
const table = console.table;
const clear = console.clear;

clear()

let list = [
  {Id: 0, Nome: 'Jeff', Idade: 10, Sexo: 'M', Nota: 100.0},
  {Id: 1, Nome: 'Bruno', Idade: 5, Sexo: 'M', Nota: 52.5},
  {Id: 2, Nome: 'Luis', Idade: 19, Sexo: 'M', Nota: 35.0},
  {Id: 3, Nome: 'Alex', Idade: 12, Sexo: 'F', Nota: 9.5},
  {Id: 4, Nome: 'Dakota', Idade: 17, Sexo: 'F', Nota: 85.5},
];

table(
    Lay.group(
        list,
        g => ({Sexo: g.Sexo}),
        s => ({
            MaiorIdade: s.max(v => v.Idade),
            NotaMedia: s.avg(v => v.Nota)
        })
    )
)


table(
    new Lay(list)
        .group(g => ({Sexo: g.Sexo}),
            s => ({
                'Genero do Aluno': s.key.Sexo === 'M' ? 'Masculino' : 'Feminino',
                'Maior Idade': s.max(v => v.Idade),
                'Nota Media': s.avg(v => v.Nota)
            })
        )
)
```
