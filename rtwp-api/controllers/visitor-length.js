module.exports = (req, res) => {
  const query = `
    SELECT
        HOUR(LAST_TS) - HOUR(START_TS) AS "length",
        COUNT(*) AS "count"
    FROM
        VISIT
    WHERE
        days_between(START_TS,LAST_TS) < 1
        AND HOUR (LAST_TS) - HOUR(START_TS) > 0
    GROUP BY
        HOUR (LAST_TS) - HOUR(START_TS)
    `;

  try {
    const results = req.db.exec(query);

    res.status(200).json({
      results
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `[SQL Execute error]: ${err.message}`
    });
  }
};
