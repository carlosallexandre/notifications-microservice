import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { ListRecipientNotifications } from '@app/use-cases/list-recipient-notifications';
import { Controller, Get, Param } from '@nestjs/common';
import { HttpNotificationMapper } from '../mappers/HttpNotificationMapper';

@Controller('recipients')
export class RecipientsController {
  constructor(
    private readonly listRecipientNotifications: ListRecipientNotifications,
    private readonly countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Get(':recipientId/notifications')
  async listNotifications(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.listRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(HttpNotificationMapper.toHttp),
    };
  }

  @Get(':recipientId/notifications/count')
  async countNotifications(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }
}
