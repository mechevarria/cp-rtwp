const dateUtil = require('./date-util');

module.exports = (req, res) => {
    const defaults = dateUtil.getDefaults();

    const start = req.query.start || defaults.start;
    const end = req.query.end || defaults.end;

    const sql = `
    SELECT 
        count(*) AS "count",
        MIN(SEEN_TS) AS "min",
        MAX(SEEN_TS) AS "max"
    FROM badge_location
    WHERE SEEN_TS >= TO_TIMESTAMP( ?, 'YYYY-MM-DD' ) AND SEEN_TS <= TO_TIMESTAMP( ?, 'YYYY-MM-DD' )`;

    try {
        const results = req.db.exec(sql, [start, end]);

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
