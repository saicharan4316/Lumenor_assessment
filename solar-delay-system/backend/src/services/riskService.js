const calculateRisk = (milestone) => {
  let riskScore = 0;

  const currentDate = new Date();

  const deadline = new Date(
    milestone.deadline
  );

  if (
    currentDate > deadline &&
    milestone.status !== 'completed'
  ) {
    riskScore += 50;
  }

  if (milestone.status === 'pending') {
    riskScore += 20;
  }

  if (milestone.status === 'in-progress') {
    riskScore += 10;
  }

  return riskScore;
};

module.exports = calculateRisk;