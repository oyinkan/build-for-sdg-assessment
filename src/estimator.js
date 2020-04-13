const covid19ImpactEstimator = (data) => {
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToLapse *= 30;
  }
  const { reportedCases, timeToElapse } = data;
  const impact = {
    currentlyInfected: reportedCases * 10,
    get infectionsByRequestedTime() {
      return this.currentlyInfected * 2 ** Math.trunc(timeToElapse / 3);
    }
  };
  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    get infectionsByRequestedTime() {
      return this.currentlyInfected * 512;
    }
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
