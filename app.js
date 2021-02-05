const { validateXMLWithXSD } = require("validate-with-xmllint");

const logName = () => {
  console.log("Han");
};
const NS_PER_MILISEC = 1e6;

const xsdStart = process.hrtime.bigint();

setTimeout(logName, 0);

console.log(
  "Point 1: " + Number(process.hrtime.bigint() - xsdStart) / NS_PER_MILISEC
);

console.log("Hi there");

console.log(
  "Point 2: " + Number(process.hrtime.bigint() - xsdStart) / NS_PER_MILISEC
);
