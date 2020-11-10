function toXYZ(i) {
  const z = Math.floor(i / 16);
  const rem = i % 16;
  const y = Math.floor(rem / 4);
  const x = rem % 4;
  return { x: x, y: y, z: z };
}

function toI(x, y, z) {
  return 16 * z + 4 * y + x;
}

export default function calculateWinner(squares, last) {
  const { x, y, z } = toXYZ(last);

  // has anyone won in lines?
  let matching = 0;
  for (let j = 0; j < 4; j++) {
    if (squares[toI(j, y, z)] === squares[last]) {
      matching++;
    }
  }
  if (matching === 4) {
    return squares[last];
  }
  // has anyone won in columns?
  matching = 0;
  for (let j = 0; j < 4; j++) {
    if (squares[toI(x, j, z)] === squares[last]) {
      matching++;
    }
  }
  if (matching === 4) {
    return squares[last];
  }
  // has anyone won in layers?
  matching = 0;
  for (let j = 0; j < 4; j++) {
    if (squares[toI(x, y, j)] === squares[last]) {
      matching++;
    }
  }
  if (matching === 4) {
    return squares[last];
  }
  // has anyone won in xy diag?
  matching = 0;
  if (x === y) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, j, z)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // counter-diag...
  if (x === 3 - y) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, 3 - j, z)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // has anyone won in xz diag?
  matching = 0;
  if (x === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, y, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // counter-diag...
  if (x === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, y, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // has anyone won in yz diag?
  matching = 0;
  if (y === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(x, j, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // counter-diag...
  if (y === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(x, j, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  // FINALLY, x = y = z, x = y = -z, etc...
  matching = 0;
  if (x === y && x === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, j, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  if (x === y && x === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, j, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  if (x === 3 - y && x === z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, 3 - j, j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  if (x === 3 - y && x === 3 - z) {
    for (let j = 0; j < 4; j++) {
      if (squares[toI(j, 3 - j, 3 - j)] === squares[last]) {
        matching++;
      }
    }
    if (matching === 4) {
      return squares[last];
    }
  }
  return null;
}
