const PIKACHU = [
  ['pi', 'pii'],
  ['pi', 'ka', 'chu'],
  ['pii', 'pi-i', 'ka', 'kaa', 'chu'],
  ['pika', 'piii', 'pipi', 'kachu', 'kaaa', 'chuu'],
  ['pikaa', 'pikapi', 'kachu', 'piika', 'chuuu'],
  ['piikaa', 'pikachu', 'chuuuu', 'pika-pi', 'kaa-piikaa-pi'],
  ['pika-chu', 'pika-pika', 'piikachu', 'pikachu'],
  ['pika-pika', 'piikachu', 'pi-kaaa-chu', 'pi-pikachu'],
];

const cache = {};

// [min, max)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isUpperFirst(character) {
  return /[A-Z]/.test(character.charAt(0));
}

function upperFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function pika (word) {
  if (cache[word]) return cache[word];

  let new_word;
  const len = word.length;
  if (len < 8) {
    const arr = PIKACHU[getRandom(0, PIKACHU.length)];
    new_word = arr[getRandom(0, arr.length)];
  } else {
    const split = getRandom(1, len);
    new_word = `${pika(word.substr(0, split))}-${pika(word.substr(split))}`;
  }

  cache[word] = new_word;
  return new_word;
}

function pikachize (contents) {
  let prev_word_end_index = 0;
  let res = '';
  const matches = contents.matchAll(/\b\w+\b/g);
  for (const match of matches) {
    const word = match[0];
    const word_start_index = match.index;
    const spacer = contents.substring(prev_word_end_index, word_start_index);
    prev_word_end_index = word_start_index + word.length;

    const new_word = pika(word);
    res += `${spacer}${isUpperFirst(word) ? upperFirst(new_word) : new_word}`;
  }
  res += contents.substring(prev_word_end_index);
  return res;
}

const pikachizer = {
  translate: pikachize,
}

module.exports = pikachizer;
