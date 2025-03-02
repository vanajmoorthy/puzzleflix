//configuration variables

const port = 24100;
const environment = import.meta.env.VITE_ENVIRONMENT;

let hosturl;
let fullurl;

if (environment == "LOCAL") {
    hosturl = "https://puzzleflix.vanaj.io";
    fullurl = hosturl + ":" + port;
} else if (environment == "PRODUCTION") {
    hosturl = "https://puzzleflix.vanaj.io";
    fullurl = hosturl + "/api";
} else {
    console.log("Incorrect environment: Options are LOCAL and PRODUCTION");
}

console.log(hosturl);
console.log(fullurl);
// Uncomment these to run on the host servers

// Uncomment these to run locally

export { port, fullurl, hosturl };
