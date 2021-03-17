# Netest

Netest is a Javascript library for testing internet speed in the browser.


## Installation

Use [npm](https://pip.pypa.io/en/stable/) to install Netest.

```bash
npm install netest
```


## Usage

```javascript

const netest = require("netest")

const netestOptions = {
   slowSpeedThreshold: 100, // Slow connection speed thresold in kb/s, any lower and user's connection is considered slow
   numOfChecks: 3, // Number of checks conducted and averaged
   failIfTooLong: true, // Fails the tests if a check takes too long 
   timeUntilLoadFailure: speedCheckInterval/3, // Default: speedCheckInterval/numOfChecks
   loadFailureCheckInterval: 2000, // Default: 2secs
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


## Options
| Field                    | Description                                                                                 | Required |
|--------------------------|---------------------------------------------------------------------------------------------|----------|
| slowSpeedThreshold       | Slow connection speed threshold in kb/s, any lower and user's connection is considered slow | Yes      |
| numOfChecks              | Number of checks conducted and averaged                                                     | Yes      |
| failIfTooLong            | Fails the tests if a check takes too long                                                   | Yes      |
| timeUntilLoadFailure     | Duration threshold of a single check for test failure in ms                                 | Yes      |
| loadFailureCheckInterval | How often should the failure threshold check be conducted in ms                             | Yes      |
| imageSource              | Source of the image to be downloaded for the speed checks                                   | Yes      |
| imageSize                | Size of the speed checks image in Kb                                                        | Yes      |


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)