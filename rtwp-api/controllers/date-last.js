module.exports = (req, res) => {
  // There was only system testing data in August, try to get real results..past 10am
  const query = `
    SELECT
        HOUR(LAST_TS) AS "hour",
        COUNT(LAST_TS) AS "count"
    FROM
        VISIT
    WHERE
        LAST_TS >= TO_TIMESTAMP( '2020-09-01','YYYY-MM-DD' )
    GROUP BY
        HOUR(LAST_TS)
    ORDER BY COUNT(LAST_TS) DESC 
    LIMIT 1
  `;

  try {
    const result = req.db.exec(query)[0];

    res.status(200).json({
      result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `[SQL Execute error]: ${err.message}`
    });
  }
};
