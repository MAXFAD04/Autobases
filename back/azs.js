//Получение списка всех заправок
exports.getAZSList = async (req, res) => {
  try {    
    let sql = 'SELECT * FROM contracts'
    const params = []
    if (req.params?.base_id && parseInt(req.params.base_id) > 0) {
      sql += ` WHERE base_id = $1`;
      params.push(parseInt(req.params.base_id));
    }
    const result = await req.pool.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAzsListByAutobaseId = async (req, res) => {
  try {
    const { autobaseId } = req.params;
    let sql = 'SELECT * FROM contracts WHERE base_id = $1';
    const result = await req.pool.query(sql, [autobaseId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
  
  // Создание новой заправки
  exports.AddAZS= async (req, res) => {
    const { azs_name, number, address, base_id } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO azs (azs_name, number, address, base_id) VALUES ($1, $2, $3, $4) RETURNING *', [azs_name, number, address, base_id]);
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating gas station' });
    }
  };
  
  // Обновление информации о заправке по ID
  exports.updateAZS= async (req, res) => {
    const { azs_name, number, address, base_id } = req.body;
    const { azs_id } = req.params;
    try {
      const { rows } = await pool.query('UPDATE azs SET azs_name = $1, number = $2, address = $3, base_id = $4 WHERE azs_id = $5 RETURNING *', [azs_name, number, address, base_id, azs_id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Gas station not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating gas station' });
    }
  };
  
  // Удаление заправки по ID
  exports.deleteAZS= async (req, res) => {
    const { azs_id } = req.params;
    try {
      const { rows } = await pool.query('DELETE FROM azs WHERE azs_id = $1 RETURNING *', [azs_id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Gas station not found' });
      } else {
        res.json({ message: 'Gas station deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting gas station' });
    }
  };
