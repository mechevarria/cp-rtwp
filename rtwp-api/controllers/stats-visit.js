module.exports = (req, res) => {
  const sql = `
    SELECT 
        COUNT(*) AS "y",
        MONTHNAME(LAST_TS) AS "name"
    FROM VISIT
    GROUP BY MONTHNAME(LAST_TS)`;

  try {
    const results = req.db.exec(sql);

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
