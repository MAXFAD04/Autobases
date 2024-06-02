exports.getAutoList = async (req, res) => {
  try {    
    let sql = 'SELECT * FROM automobiles';
    const params = [];
    if (req.params?.base_id && parseInt(req.params.base_id) > 0) {
      sql += ` WHERE base_id  =  $1`;
      params.push(parseInt(req.params.base_id));
    }
    let result = await req.pool.query(sql, params);
    let cars = [];
    if (result.rows?.length) {
      cars = result.rows;
      result = await req.pool.query(`
        SELECT a.auto_id, a.fuel auto_fuel, c.azs_id, azs.fuel azs_fuel FROM automobiles a
        INNER JOIN contracts c on (a.base_id=c.base_id)
        INNER JOIN azs on (azs.azs_id=c.azs_id)
        WHERE a.auto_id in (${cars.map(car => car.auto_id).join(',')})
      `);
      if (result.rows?.length) {
        const car_azs = {};
        for (const car of result.rows) {
          if (!car_azs[car.auto_id]) car_azs[car.auto_id] = []
          if (car.azs_fuel.includes(car.auto_fuel)) car_azs[car.auto_id].push(car.azs_id)
        }
        cars = cars.map(car => {
          if (car_azs[car.auto_id]) car.azs = car_azs[car.auto_id]
          return car
        })
      }
    }

    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAutoById = async (req, res) => {
  const { car_id } = req.params;
  try {
    const result = await req.pool.query('SELECT * FROM automobiles WHERE id = $1', [auto_id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Car not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.AddAuto = async (req, res) => {
  const { auto_firma, auto_model, auto_type, state_number, status, fuil_id } = req.body;
  try {
    const result = await req.pool.query('INSERT INTO automobiles (auto_firma, auto_model, auto_type, state_number, status, fuil_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [auto_firma, auto_model, auto_type, state_number, status, fuil_id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.UpdateInfo =  async (req, res) => {
  const { car_id } = req.params;
  const { auto_firma, auto_model, auto_type, state_number, status, fuil_id } = req.body;
  try {
    const result = await req.pool.query('UPDATE automobiles SET auto_firma = $1, auto_model = $2, auto_type = $3, state_number = $4, status = $5, fuil_id = $6 WHERE id = $7 RETURNING *', [ auto_firma, auto_model, auto_type, state_number, status, fuil_id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.DeleteAuto = async (req, res) => {
  const car_id = req.params.car_id;
  try {
    await pool.query('DELETE FROM automobiles WHERE id = $1', [auto_id]);
    res.send('Car deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
