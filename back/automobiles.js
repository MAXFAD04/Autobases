exports.getAutoList = async (req, res) => {
  try {    
    let sql = 'SELECT * FROM automobiles';
    const params = [];
    if (req.params?.base_id && parseInt(req.params.base_id) > 0) {
      sql += ` WHERE base_id  =  $1`;
      params.push(parseInt(req.params.base_id));
    }
    let result = await req.pool.query(sql + ' order by auto_firma, auto_model, auto_type', params);
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
  const { auto_firma, auto_model, auto_type, state_number, fuel, base_id } = req.body;
  try {
    let auto = await req.pool.query('INSERT INTO automobiles (auto_firma, auto_model, auto_type, state_number, fuel, base_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [auto_firma, auto_model, auto_type, state_number, fuel, base_id]);    
    let id_row = await req.pool.query('select max(auto_id) auto_id from automobiles');
    res.json({ id: id_row.rows[0], ...auto.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.UpdateInfo =  async (req, res) => {
  const { auto_id, auto_firma, auto_model, auto_type, state_number, fuel, base_id } = req.body;
  try {
    const result = await req.pool.query('UPDATE automobiles SET auto_firma = $1, auto_model = $2, auto_type = $3, state_number = $4, fuel = $5, base_id=$6 WHERE auto_id = $7 RETURNING *', [ auto_firma, auto_model, auto_type, state_number, fuel, base_id, auto_id ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err)
  }
};

exports.getAutoTypes = async (req, res) => {
  try {    
    let sql = 'SELECT DISTINCT auto_type FROM automobiles ORDER BY auto_type';
    let r = await req.pool.query(sql);
    const types = r.rows.map(v => v.auto_type)
    sql = 'SELECT DISTINCT auto_firma FROM automobiles ORDER BY auto_firma';
    r = await req.pool.query(sql);
    const brends = r.rows.map(v => v.auto_firma)
    res.json({ brends: brends || [], types: types || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


exports.getAutoModels= async (req, res) => {
  try {
    if (req.query?.brend) {
      const sql = 'SELECT DISTINCT auto_model FROM automobiles WHERE auto_firma=$1 ORDER BY auto_model';
      const r = await req.pool.query(sql, [req.query.brend]);
      const models = r.rows.map(v => v.auto_model)
      res.json({ models });
    } else {
      res.json({ models: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.delAuto = async (req, res) => {
  try {
    if (req.params?.autoid) {
      const sql = 'DELETE FROM automobiles WHERE auto_id=$1';
      await req.pool.query(sql, [req.params.autoid]);      
      res.json({ status: 'ok' });
    } else {
      res.status(403).send('No autoid provided');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};