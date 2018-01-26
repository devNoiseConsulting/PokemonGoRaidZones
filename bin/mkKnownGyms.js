const fs = require('fs');
const path = require('path');

const pathName = process.argv[2];

if (pathName) {
  formatFile(pathName);
} else {
  var node = path.basename(process.argv[0]);
  var script = path.basename(process.argv[1]);

  console.log('Usage: ' + node + ' ' + script + ' <filename> <gymsFile.csv>');
}

function formatFile(fileName) {
  let poi;

  try {
    let text = fs.readFileSync(fileName, 'utf8');

    poi = text.split('\n').map(point => point.split('\t'));
  } catch (e) {
    console.log('ERROR 1: file: ' + fileName + ' error: ' + e.message);

    return false;
  }

  poi = poi
    .filter(point => point[3] === 'Gym')
    .map(point => {
      point[0] = point[0].replace(/^["']/, '').replace(/["']$/, '');
      return `{ name: "${point[0]}", lat: ${point[1]}, lng: ${point[2]} }`;
    })
    .join(',');

  let gyms = `let knownGyms = [${poi}]; export default knownGyms;`;

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
