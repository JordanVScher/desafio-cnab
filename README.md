# Resultado do Desafio:

Obs: presume-se que o arquivo passado sempre estará com a formatação correta como no arquivo de exemplo.

* poder passar na CLI o local do arquivo.

A URL do arquivo pode ser passada através do arg -F ou --file.
Exemplo: 
```bash
node cnabRows.js -F "file:///home/$USER/cnabBuilder/cnabExample.rem" -f 21 -t 34 -s p
```

O path também é aceitável.
```bash
node cnabRows.js -F "./cnabExample.rem" -f 21 -t 34 -s p
```

* pesquisar por nome da empresa, e mostrar em que posição que ela foi achada e qual o tipo de segmento ela pertence.

O nome do arquivo pode ser passado através do arg opcional -n ou --name. Ele filtrará o resultado das posições e segmento conforme forem encontradas empresas cujo nome batem com o nome pesquisado, ou seja, o resultado em si será o mesmo mas com o filtro conforme o que for encontrado nos segmentos Q de cada entrada. 
Exemplo: 
```bash
node cnabRows.js -F "file:///home/$USER/cnabBuilder/cnabExample.rem" -f 21 -t 34 -s p -n Rede
```

* **Bonus**, ler o cnab e escrever um novo arquivo em formato JSON, contendo nome e endereço da empresa.

O JSON será criado se passado o arg opcional -j ou --json. Essa funcionalidade pode funcionar em conjunto com a busca por nome ou com todos os resultados. Os arquivos json ficam salvos na pasta 'results'.
```bash
node cnabRows.js -F "file:///home/$USER/cnabBuilder/cnabExample.rem" -f 21 -t 34 -s p -n Rede -j
```

Presume-se que o arquivo lido não será grande o bastante para estourar a memória da aplicação, dessa forma, nem a leitura do arquivo nem a criação do json ocorrem através de streams.

