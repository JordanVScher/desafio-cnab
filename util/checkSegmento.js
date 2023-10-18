export default (segmento) => {
  const optionsArray = ['P', 'Q', 'R'];
  if (!optionsArray.includes(segmento.toUpperCase())) {
    console.error(`Error: Segmento must be one of three options: ${optionsArray.join(' - ')}`);
    process.exit(1);
  }
};
