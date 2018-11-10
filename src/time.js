function sleep(t) {
  return new Promise(resolve => setTimeout(resolve, t));
}

export default sleep;

export { sleep };
