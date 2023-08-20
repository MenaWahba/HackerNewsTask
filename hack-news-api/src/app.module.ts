import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { LoggerMiddleware } from './middleware/logger.middleware'
import { AutoTagerModule } from './auto-tager/auto-tager.module';


@Module({
  imports: [ AutoTagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   // consumer.apply(LoggerMiddleware).forRoutes('cats')
  }

}
