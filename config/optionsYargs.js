import yargs from 'yargs';

export default yargs(process.argv.slice(2))
  .usage('Uso: $0 [options]')
  .option('name', {
    alias: 'n', describe: 'nome da empresa a ser buscado', type: 'string', demandOption: false,
  })
  .option('file', {
    alias: 'F', describe: 'URL do arquivo Cnab a ser lido', type: 'string', demandOption: true,
  })
  .option('f', {
    alias: 'from', describe: 'posição inicial de pesquisa da linha do Cnab', type: 'number', demandOption: true,
  })
  .option('t', {
    alias: 'to', describe: 'posição final de pesquisa da linha do Cnab', type: 'number', demandOption: true,
  })
  .option('s', {
    alias: 'segmento', describe: 'tipo de segmento', type: 'string', demandOption: true,
  })
  .example('$0 -F "./cnabExample.rem" -f 21 -t 34 -s p', 'lista a linha e campo que from e to do cnab passado via -F')
  .argv;
