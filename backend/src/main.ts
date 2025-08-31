import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // usuwa pola spoza DTO
        forbidNonWhitelisted: true, // rzuca błąd jeśli są pola spoza DTO
        transform: true, // automatycznie konwertuje typy
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
