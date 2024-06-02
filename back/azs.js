//Получение списка всех заправок
exports.getAzsList = async (req, res) => {
  try {    
    let sql = 'SELECT *  FROM azs';
    const params = [];
    if (req.params?.base_id && parseInt(req.params.base_id) > 0) {
      sql += ' LEFT JOIN contracts ON (contracts.azs_id = azs.azs_id) WHERE contracts.base_id  =  $1 ';
      params.push(parseInt(req.params.base_id));
    }
    let r = await req.pool.query(sql, params);
    let azs = []
    if (r.rows?.length) azs = r.rows

    //Get AZS cars count
    if (azs.length) {
      r = await req.pool.query(`
        SELECT automobiles.auto_id, automobiles.fuel car_fuel, azs.azs_id, azs.fuel azs_fuel
        FROM automobiles
          INNER JOIN autobases ON (automobiles.base_id = autobases.base_id)
          INNER JOIN contracts ON (autobases.base_id = contracts.base_id)
          INNER JOIN azs ON (azs.azs_id = contracts.azs_id)
      `);

      if (r.rows?.length) {
        const cars_cnt = {};
        let max_cnt = 0
        for (const car of r.rows) {
          if (!cars_cnt[car.azs_id]) cars_cnt[car.azs_id] = 0;
          if (car.azs_fuel.trim().includes(car.car_fuel.trim())) {
            cars_cnt[car.azs_id]++;
            if (max_cnt < cars_cnt[car.azs_id]) max_cnt = cars_cnt[car.azs_id];
          }
        }
        azs = azs.map(item => {
          if (cars_cnt[item.azs_id]) {
            item.cars_cnt = cars_cnt[item.azs_id];
            if (item.cars_cnt === max_cnt) item.troffy = true;
            else item.troffy = false;
          } else {
            item.cars_cnt = 0;
            item.troffy = false;
          }
          return item;
        })
      }
    }
    res.json(azs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
