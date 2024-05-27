// Получение списка всех автобаз
exports.getBaseList= async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM autobases');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching autobases' });
    }
  };
  
  // Создание новой автобазы
  exports.addBase= async (req, res) => {
    const { number, address } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO autobases (number, address) VALUES ($1, $2) RETURNING *', [number, address]);
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating autobase' });
    }
  };
  
  // Обновление информации об автобазе по ID
  exports.updateBase= async (req, res) => {
    const { number, address } = req.body;
    const { base_id } = req.params;
    try {
      const { rows } = await pool.query('UPDATE autobases SET number = $1, address = $2 WHERE base_id = $3 RETURNING *', [number, address, base_id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Autobase not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating autobase' });
    }
  };
  
  // Удаление автобазы по ID
  exports.deleteBase =  async (req, res) => {
    const { base_id } = req.params;
    try {
      const { rows } = await pool.query('DELETE FROM autobases WHERE base_id = $1 RETURNING *', [base_id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Autobase not found' });
      } else {
        res.json({ message: 'Autobase deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting autobase' });
    }
  };
  
  