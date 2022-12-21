import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositoires/notifications-repository';

interface ListRecipientNotificationRequest {
  recipientId: string;
}

interface ListRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class ListRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ListRecipientNotificationRequest,
  ): Promise<ListRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
