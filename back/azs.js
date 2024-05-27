//Получение списка всех заправок
exports.getAZSList= async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM azs');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching gas stations' });
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