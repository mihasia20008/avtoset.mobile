export default date => {
  return date.substr(2).replace(/(\d{2})-(\d{2})-(\d{2})/, '$3.$2.$1');
};
