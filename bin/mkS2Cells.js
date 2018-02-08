const fs = require('fs');
const path = require('path');

const pathName = process.argv[2];

if (pathName) {
  processFile(pathName);
} else {
  var node = path.basename(process.argv[0]);
  var script = path.basename(process.argv[1]);

  console.log('Usage: ' + node + ' ' + script + '<s2CellFile.csv>');
}

function processFile(fileName) {
  let cells;

  try {
    let text = fs.readFileSync(fileName, 'utf8');

    cells = text.split('\n').map(point => point.split('\t'));
  } catch (e) {
    console.log('ERROR 1: file: ' + fileName + ' error: ' + e.message);

    return false;
  }

  cells = cells
    .filter(cell => cell[3])
    .map(([key, ...points]) => {
      points = points.reduce((acc, point, i) => {
        const index = Math.floor(i / 2);
        if (i % 2 == 0) {
          acc[index] = { lat: point };
        } else {
          acc[index].lng = point;
        }
        return acc;
      }, []);
      return { key: key, corners: points };
    });

  cells = JSON.stringify(cells);
  let gyms = `let s2Cells = ${cells}; export default s2Cells;`;

  fileName = fileName.replace(/\.csv/, '.js');
  try {
    let out = fs.createWriteStream(fileName, {
      encoding: 'utf8'
    });
    out.write(gyms);
    out.write('\n');
    out.end();
  } catch (e) {
    console.log("ERROR: Couldn't write content out to: " + fileName + '');
    console.log('ERROR: ' + e.message);
    return false;
  }
}
