import { DataSource } from "typeorm";
import { dataSourceOptions } from "./connection-config.js";

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
