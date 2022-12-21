import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

export function makeNotification(override: Partial<NotificationProps> = {}) {
  return new Notification({
    category: 'category',
    content: new Content('Content'),
    recipientId: 'recipient-id',
    ...override,
  });
}
