import knex from "knex";
import config from "../../knexfile.js";

const knex = knex(config.development);

export default knex;
