const covid19ImpactEstimator = (data) => {
  const impact = {
    currentlyInfected: data.reportedCases * 10,
    get infectionsByRequestedTime() {
      return this.currentlyInfected * 512;
    }
  }
  const severeImpact = {
    currentlyInfected: data.reportedCases * 50,
    get infectionsByRequestedTime() {
      return this.currentlyInfected * 512;
    }
  }
};

export default covid19ImpactEstimator;
