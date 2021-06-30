module.exports = (req, res) => {
  const device = req.query.device || '';
  const start = req.query.start || '';
  const end = req.query.end || '';

  const sql = `
    SELECT
        DISTINCT LOC as "location",
        SEEN_TS AS "seen"
    FROM
        CV_BADGE_LOCATION
    WHERE
        DEVICE_ID=? AND
        SEEN_TS >= TO_TIMESTAMP( ?, 'YYYY-MM-DD HH24:MI:SS' ) AND 
        SEEN_TS <= TO_TIMESTAMP( ?, 'YYYY-MM-DD HH24:MI:SS' )
    ORDER BY SEEN_TS ASC
    LIMIT 10000`;

  try {
    const results = req.db.exec(sql, [device, start, end]);

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
