module.exports = (req, res) => {
    const sql = 'select schema_name, table_name, table_oid from tables';

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
