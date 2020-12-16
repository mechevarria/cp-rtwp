module.exports = (req, res) => {
  const order = req.query.order || 'last';
  const direction = req.query.direction || 'DESC';
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  const visitQuery = `
    SELECT
        ID as "id",
        VISITOR_NAME as "visitorName",
        MOBILE AS "mobile",
        START_TS AS "start",
        LAST_TS AS "last"
    FROM
        VISIT
    ORDER BY "${order}" ${direction}
    LIMIT ?
    OFFSET ?
    `;

  const countQuery = `
      SELECT RECORD_COUNT as "recordCount"
      FROM   M_TABLES
      WHERE  TABLE_NAME = 'VISIT';
      `;

  try {
    const count = req.db.exec(countQuery)[0];
    const results = req.db.exec(visitQuery, [limit, offset]);

    res.status(200).json({
      results,
      count: count.recordCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `[visitor-all]: ${err.message}` });
  }
};
