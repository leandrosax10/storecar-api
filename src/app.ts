import  express  from "express";
import cors from "cors";
import routes from "./routes";
import connection from "./config/database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

connection.then(() => {
    console.log("Banco de dados Conectado");
    app.listen(PORT, () => {
        console.log(`Aplicação online na porta: ${PORT}`);
    });
}).catch((err) => console.log(err));
