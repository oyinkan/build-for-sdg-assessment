const covid19ImpactEstimator = (data) => {
  const hospitalBeds = data.totalHospitalBeds * 0.35;
  if (data.periodType === 'days') {
    data.timeToElapse *= 1;
  } else if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const { reportedCases, timeToElapse } = data;
  const impact = {
    currentlyInfected: reportedCases * 10,
    get infectionsByRequestedTime() {
      return this.currentlyInfected * 2 ** Math.trunc(timeToElapse / 3);
    },
    get severeCasesByRequestedTime() {
      return this.infectionsByRequestedTime * 0.15;
    },
    get hospitalBedsByRequestedTime() {
      return Math.ceil(hospitalBeds - this.severeCasesByRequestedTime);
    },
    get casesForICUByRequestedTime() {
      return this.infectionsByRequestedTime * 0.05;
    },
    get casesForVentilatorsByRequestedTime() {
      return this.infectionsByRequestedTime * 0.02;
    },
    get dollarsInFlight() {
      const dollarLost = this.infectionsByRequestedTime * data.population;
      return (dollarLost * data.region.avgDailyIncomeInUSD) / timeToElapse;
    }
  };
  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    get infectionsByRequestedTime() {
      return this.currentlyInfected * 2 ** Math.trunc(timeToElapse / 3);
    },
    get severeCasesByRequestedTime() {
      return this.infectionsByRequestedTime * 0.15;
    },
    get hospitalBedsByRequestedTime() {
      return Math.ceil(hospitalBeds - this.severeCasesByRequestedTime);
    },
    get casesForICUByRequestedTime() {
      return this.infectionsByRequestedTime * 0.05;
    },
    get casesForVentilatorsByRequestedTime() {
      return this.infectionsByRequestedTime * 0.02;
    },
    get dollarsInFlight() {
      const dollarLost = this.infectionsByRequestedTime * data.population;
      return (dollarLost * data.region.avgDailyIncomeInUSD) / timeToElapse;
    }
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
