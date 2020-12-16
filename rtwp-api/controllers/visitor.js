module.exports = (req, res) => {
  const id = req.query.id || '';

  const visitorQuery = `
    SELECT
        ID as "id",
        VISITOR_NAME as "visitorName",
        VISIT_ID as "visitId",
        EMAIL as "email",
        MOBILE AS "mobile",
        VISITOR_TYPE as "visitorType",
        IMAGE_URL as "imageUrl",
        COMPANY_NAME as "companyName",
        ADDRESS as "address",
        STATUS as "status",
        DEVICE_ID as "deviceId",
        READABLE_DEVICE_ID as "readableDeviceId",
        UUID as "uuid",
        START_TS AS "start",
        LAST_TS AS "last",
        LAST_MODIFICATION_TS as "lastModification"
    FROM
        VISIT
    WHERE ID=?
    `;

  try {
    const result = req.db.exec(visitorQuery, [id])[0];

    res.status(200).json({
      result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `[visitor]: ${err.message}` });
  }
};
