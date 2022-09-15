import {app} from "./app";
import { categoryRouter } from "./routes/categoryRouter";
import { productRouter } from "./routes/productRouter";

app.use("/categoria", categoryRouter);
app.use("/produtos", productRouter);