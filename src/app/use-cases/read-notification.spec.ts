import { NotificationNotFound } from '@app/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const readNotification = new ReadNotification(notificationsRepository);

  it('should be able read a notification', async () => {
    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able read a non existing notification', async () => {
    expect(() =>
      readNotification.execute({ notificationId: 'non-existing-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
