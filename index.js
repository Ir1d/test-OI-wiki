'use strict'


var unified = require('unified')
var parse = require('remark-parse')
var math = require('remark-math')
var latex = require('remark-latex')
var details = require('remark-details')

var processor = unified()
  .use(parse)
  .use(math)
  .use(details)
  .use(latex, {
    // options
  })

// process.stdin.pipe(createStream(processor)).pipe(process.stdout)
const fs = require("fs");
console.log(process.argv)
let filename = process.argv[2];
try {
  console.log("Starts rendering: ", filename);
  let input = fs.readFileSync(filename, "utf-8");
  processor.process(input, function(err, file) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFileSync(filename.replace('.md', '.tex'), String(file), "utf-8");
    }
  })
} catch (e) {
  console.log(e);
}
