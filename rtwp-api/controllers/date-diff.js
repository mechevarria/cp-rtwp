module.exports = (req, res) => {
  const query = `
    SELECT
        ID as "id",
        VISITOR_NAME as "visitorName",
        days_between(START_TS, LAST_TS) AS "numDays"
    FROM
        VISIT
    WHERE
        days_between(START_TS, LAST_TS) > 1`;

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
