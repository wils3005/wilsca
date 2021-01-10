import { object, string } from "zod";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

const { PORT } = object({
  PORT: string(),
})
  .nonstrict()
  .parse(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

void bootstrap();
