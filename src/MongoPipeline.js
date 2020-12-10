const pipeline = {
  healthyStates: [
    {
      $project: {
        _id: false,
        state: "$state",
        mortality: {
          $round: [
            {
              $divide: ["$death", "$infected"],
            },
            5,
          ],
        },
      },
    },
    {
      $match: {
        mortality: { $lt: 0.005 },
      },
    },
  ],
  hotspotStates: [
    {
      $project: {
        _id: false,
        state: "$state",
        rate: {
          $round: [
            {
              $divide: [
                { $subtract: ["$infected", "$recovered"] },
                "$infected",
              ],
            },
            5,
          ],
        },
      },
    },
    {
      $match: {
        rate: { $gt: 0.1 },
      },
    },
  ],
  totalRecovered: [
    {
      $group: {
        _id: "total",
        recovered: { $sum: "$recovered" },
      },
    },
  ],
  totalActive: [
    {
      $group: {
        _id: "total",
        active: { $sum: { $subtract: ["$infected", "$recovered"] } },
      },
    },
  ],
  totalDeath: [
    {
      $group: {
        _id: "total",
        death: { $sum: "$death" },
      },
    },
  ],
};

exports.pipeline = pipeline;