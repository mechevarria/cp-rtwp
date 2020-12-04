const dateUtil = require('./date-util');

module.exports = (req, res) => {
    const defaults = dateUtil.getDefaults();

    const start = req.query.start || defaults.start;
    const end = req.query.end || defaults.end;

    const sql = `
    SELECT 
        loc as "loc",
        count(*) AS "locCount",
        geo_loc.ST_AsGeoJSON() as "geoLoc"
    FROM badge_location
    WHERE
        SEEN_TS >= TO_TIMESTAMP(?, 'YYYY-MM-DD') and SEEN_TS <= TO_TIMESTAMP(?, 'YYYY-MM-DD')
    GROUP BY 
        loc,
        geo_loc
    ORDER BY count(*) DESC
    LIMIT 50`;

    // eslint-disable-next-line no-console
    console.log(start);
    // eslint-disable-next-line no-console
    console.log(end);
    try {
        const results = req.db.exec(sql, [start, end]);

        results.forEach((result) => {
            // eslint-disable-next-line no-param-reassign
            result.geoLoc = JSON.parse(result.geoLoc);
        });

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
