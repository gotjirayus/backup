import pg from '../../postgres-connect'

const faces = async (req, res, next) => {
    try {
      const { eventId, lastUpdate = '2000-01-01 00:00:00' } = req.query
      const { rows } = await pg.query(
        'SELECT label, descriptor FROM faces WHERE event_id = $1::text AND created_date >= $2::timestamp;',
        [eventId, lastUpdate]
      )
      const group = rows.reduce((prev, cur) => {
        const descriptor = Array.from(new Float32Array(cur.descriptor.replace(/\(|\)|\s/ig, '').split(',')))
        if (prev[cur.label]) {
          return {
            ...prev,
            [cur.label]: [...prev[cur.label], descriptor],
          }
        }
        return {
          ...prev,
          [cur.label]: [descriptor],
        }
      }, {})
      const faces = Object.keys(group).map(label => ({ label, descriptors: group[label] }))
      res.json(faces)
    } catch (err) {
      next(err)
    }
  }
  
const recog = async (req, res, next) => {
    try {
      const { eventId, descriptors, distance = 0.3 } = req.body
      const queries = descriptors.map(descriptor => pg.query(
        'SELECT label FROM (SELECT id AS "faceId", label, meta, descriptor <-> CUBE($2::FLOAT8[]) as distance FROM faces WHERE event_id = $1::text ORDER BY distance LIMIT 10) AS sub WHERE distance <= $3::float GROUP BY label;',
        [eventId, descriptor, distance]
      ))
      const recognitions = await Promise.all(queries)
      const faces = recognitions.map(({ rows: [face] }) => face).filter(face => !!face)
      res.json(faces)
    } catch (err) {
      next(err)
    }
  }


module.exports = {
    faces,
    recog
}