module.exports = (req, res) => {
    const sql = `
    SELECT 
        loc as "loc",
        count(*) AS "locCount",
        geo_loc.ST_AsGeoJSON() as "geoLoc"
    FROM badge_location
    GROUP BY 
        loc,
        geo_loc
    ORDER BY count(*) DESC
    LIMIT 10`;

    try {
        const results = req.db.exec(sql);

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
