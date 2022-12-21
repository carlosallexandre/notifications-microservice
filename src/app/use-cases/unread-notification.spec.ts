import { NotificationNotFound } from '@app/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const unreadNotification = new UnreadNotification(notificationsRepository);

  it('should be able unread a notification', async () => {
    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able unread a non existing notification', async () => {
    expect(
      unreadNotification.execute({ notificationId: 'non-existing-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
