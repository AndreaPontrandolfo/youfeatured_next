const db = require("../db/connection");
const logger = require("../devUtils/logger");

logger.info("Initializing ladder...");

/* const ladderQuery = async function() {
  const result = await db.query({
    rowMode: "array",
    text: "SELECT 1 as one, 2 as two;"
  });

  console.log(result.fields[0].name); // one
  console.log(result.fields[1].name); // two
  console.log(result.rows); // [1, 2]
}; */

/* const ladderQuery = db
  .query(
    "SELECT images.title, users.username, images.category FROM images JOIN users ON images.user_id = users.id"
  )
  .then(res => {
    return res;
  })
  .catch(err => {
    console.log(err);
  });
console.log(ladderQuery);
console.log(Array.isArray(ladderQuery)); */

/* const ladderQuery = (async () => {
  const res = await db.query({
    rowMode: "array",
    text:
      "SELECT images.title, users.username, images.category FROM images JOIN users ON images.user_id = users.id"
  });
  console.log(res);
  console.log(Array.isArray(res));
  return res;
})(); */

const ladderQuery = () => {
  const queryingLadder = db.query(
    "SELECT COUNT(*) AS likes_total, images.title, users.username, images.category FROM images JOIN likes ON images.id = likes.image_id JOIN users ON images.user_id = users.id GROUP BY images.title, users.username, images.category ORDER BY likes_total DESC"
  );
  return queryingLadder;
};

/* const ladderQuery = () => {
  const queryingLadder = db.query(
    "SELECT images.title, users.username, images.category FROM images JOIN users ON images.user_id = users.id"
  );
  return queryingLadder;
};
 */
/*   .then(res => {
    const ladderDataMapped = _.mapKeys(res, "title");
    console.log(ladderDataMapped);
    return ladderDataMapped;
  })
  .catch(err => {
    console.log(err);
  });
console.log(ladderQuery);
console.log(typeof ladderQuery); */

/* const mockObject = { a: "primoArg", b: "secondoArg", c: "terzoArg" };

let mockObjectValue = "";
Object.entries(mockObject).forEach(([key, value]) => {
  mockObjectValue += value + ",";
});

const mockObjectValueSliced = mockObjectValue.slice(0, -1);
const mockObjectValueSlicedSplitted = mockObjectValueSliced.split(",");

console.log(mockObjectValueSlicedSplitted);
console.log(Array.isArray(mockObjectValueSlicedSplitted)); */

/* const ladderQuery = db
  .query(
    "SELECT images.title, users.username, images.category FROM images JOIN users ON images.user_id = users.id"
  )
  .then(res => {
    console.log(res);
    console.log(typeof res);
    const resArray = postgresArray.parse("res");
    console.log(resArray);
    console.log(typeof resArray);
    return resArray;
  })
  .catch(e => logger.error(e.stack)); */

/* const query = {
  text:
    "SELECT $1::text as image_title, SELECT $2::text as user_name, SELECT $3::text as image_category",
  values: ["Brian", "Carlson"],
  rowMode: "array"
};

const ladderQuery = db
  .query(query)
  .then(res => {
    logger.debug(res.fields.map(f => f.name)); // ['first_name', 'last_name']
    logger.debug(res.rows[0]); // ['Brian', 'Carlson']
  })
  .catch(e => logger.error(e.stack)); */

module.exports = { ladderQuery };
