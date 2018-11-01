// # User Controller
// * import a number of helper fns (async bcrypt and validation fns)
// * create
//   * sets validation schema
//   * define success cb (query)
//     * get data and send back
//   * helper fn (check if db email unique constraint error)
//   * define error cb (query)
//     * send different responses based on error (constraint vs cannot connect)
//   * create params variable and assign to req body
//   * run params validation
//   * if validation fails send error
//     * else run query will will then call success or error cb

// # Sessions Controller
// * verifyLoginCredentials
//   * validate body
//   * define auth failure
