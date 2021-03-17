function netest(opts) {

   let loadTimes = [];

   for (let i = 1; i <= opts.numOfChecks; i++) {

      let img;
      let imageSrc = `${opts.imageSource}?t=${(new Date()).getTime()}`;
      let loadingInterval = undefined;
      let tStart = new Date().getTime();

      await new Promise((resolve, reject) => {

         // Load image
         img = new Image();
         img.onload = resolve;
         img.src = imageSrc;

         if (opts.failIfTooLong) {

            // Calculate speed every t time and fail if speed went below threshold
            loadingInterval = setInterval(() => {

               let tCurrent = new Date().getTime();
               let duration = Math.round(((tCurrent - tStart)));

               if (duration > opts.timeUntilLoadFailure) reject({ hasFailed: true });

            }, opts.loadFailureCheckInterval);

         }

      })
      .then(() => {
         let tEnd = new Date().getTime();
         let tDuration = tEnd - tStart;
         loadTimes.push(tDuration);
      })
      .catch((err) => new Promise((resolve, reject) => reject({ hasFailed: true })))
      .finally(() => clearInterval(loadingInterval));

   }

   let loadTime = loadTimes.reduce((a, b) => { return a + b; });
   let averageLoadTime = Math.round((loadTime / loadTimes.length));
   let averageSpeed = Math.round((opts.imageSize/averageLoadTime)*1000);

   if (averageSpeed < opts.slowSpeedThreshold) return new Promise((res, rej) => res({ isSlow: true, kbPerSec: averageSpeed, averageLoadTime: averageLoadTime, totalLoadTime: loadTime }));
   else return new Promise((res, rej) => res({ isSlow: false, kbPerSec: averageSpeed, averageLoadTime: averageLoadTime, totalLoadTime: loadTime }));

}

module.exports = netest
