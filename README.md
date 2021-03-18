# Netest

Netest is a Javascript library for testing internet speed in the browser.
A speed check is conducted by downloading image(s), and using download time in order to get the average download speed,
multiple checks could be made with different parameters.

## Installation

Use [npm](https://www.npmjs.com/package/netest) to install Netest.

```bash
npm install netest
```


## Usage

Conduct a single check

```javascript

const netest = require("netest")

const netestOptions = {
   slowSpeedThreshold: 100,
   numOfChecks: 3,
   failIfTooLong: true,
   timeUntilLoadFailure: 60000,
   loadFailureCheckInterval: 2000,
   imageSource: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Pizigani_1367_Chart_1MB.jpg",
   imageSize: 1040
};

netest(netestOptions)
.then((result) => {
   if (!result.isSlow) console.log("Your internet is great!");
})
.catch((error) => {
   if (error.hasFailed) console.log("Too bad, your internet sucks...")
});

```


You can also use it to run regular speed checks

```javascript

let speedCheckInterval = 3*60*1000; // 1 check per 3 minutes

let checkInterval = new BehaviorSubject(speedCheckInterval);
let speedChecks = checkInterval.pipe(
   switchMap(i => interval(i)),
   tap(() => {
      netest(netestOptions)
      .then((result) => { if (!result.isSlow) console.log("Your internet is great!") })
      .catch((error) => { if (error.hasFailed) console.log("Too bad, your internet sucks...") })
      .finally(() => checkInterval.next(speedCheckInterval)); // Reset the timer at end
   })
).subscribe();

```


## Options
| Field                    | Description                                                                                 | Type       | Required   | 
|--------------------------|---------------------------------------------------------------------------------------------|------------|------------|
| slowSpeedThreshold       | Slow connection speed threshold in kb/s, any lower and user's connection is considered slow | Numeric    | Yes        |
| numOfChecks              | Number of checks conducted and averaged                                                     | Numeric    | Yes        |
| failIfTooLong            | Fails the tests if a check takes too long                                                   | Boolean    | Yes        |
| timeUntilLoadFailure     | Duration threshold of a single check for test failure in ms                                 | Numeric    | Yes        |
| loadFailureCheckInterval | How often should the failure threshold check be conducted in ms                             | Numeric    | Yes        |
| imageSource              | Source of the image to be downloaded for the speed checks                                   | String     | Yes        |
| imageSize                | Size of the speed checks image in Kb                                                        | Numeric    | Yes        |


## Check Completion Outputs
| Field                    | Description                                                                                 | Type       |
|--------------------------|---------------------------------------------------------------------------------------------|------------|
| isSlow                   | Indicates that the internet speed is slow, when the speed precedes slowSpeedThreshold       | Numeric    |
| kbPerSec                 | Average internet speed                                                                      | Numeric    |
| averageLoadTime          | Average completion time of all checks                                                       | Boolean    |
| totalLoadTime            | Total completion time of all checks                                                         | Numeric    |

## Check Failure Outputs
| Field                    | Description                                                                                 | Type       |
|--------------------------|---------------------------------------------------------------------------------------------|------------|
| hasFailed                | Indicates that a check has failed, when timeUntilLoadFailure threshold has passed           | Numeric    |


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
