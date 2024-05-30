//Получение списка всех заправок
exports.getAzsList = async (req, res) => {
  try {    
    let sql = 'SELECT * FROM azs'
    const params = []
    if (req.params?.base_id && parseInt(req.params.base_id) > 0) {
      sql += `
        INNER JOIN contracts ON (contracts.azs_id = azs.azs_id)
        WHERE contracts.base_id  =  $1
      `;
      params.push(parseInt(req.params.base_id))
    }
    const result = await req.pool.query(sql, params);    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
