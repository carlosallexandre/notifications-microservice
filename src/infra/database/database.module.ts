import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@app/repositoires/notifications-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/PrismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
