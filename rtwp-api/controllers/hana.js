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
        const data = req.db.exec(sql);
        res.status(200).json({
            data
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: `[SQL Execute error]: ${err.message}`
        });
    }
};
