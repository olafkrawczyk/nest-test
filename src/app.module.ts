import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameController } from './name/name.controller';

@Module({
  imports: [],
  controllers: [AppController, NameController],
  providers: [AppService],
})
export class AppModule {}
