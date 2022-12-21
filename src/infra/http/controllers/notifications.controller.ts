import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { HttpNotificationMapper } from '../mappers/HttpNotificationMapper';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CancelNotification } from '@app/use-cases/cancel-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly readNofitication: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly cancelNotification: CancelNotification,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute(body);
    return { notification: HttpNotificationMapper.toHttp(notification) };
  }

  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNofitication.execute({ notificationId });
  }

  @Patch(':notificationId/unread')
  async unread(@Param('notificationId') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }
}
