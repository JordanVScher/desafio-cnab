export default (from, to) => {
  if (from > to) {
    console.error(`Error: "from" value (${from}) cannot be bigger than "to" value (${to})`);
    process.exit(1);
  }
};
