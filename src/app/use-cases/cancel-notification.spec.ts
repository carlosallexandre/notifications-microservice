import { NotificationNotFound } from '@app/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();

  const cancelNotification: CancelNotification = new CancelNotification(
    notificationsRepository,
  );

  beforeEach(() => {
    notificationsRepository.notifications = [];
  });

  it('should be able cancel a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able cancel non existing notification', async () => {
    expect(
      cancelNotification.execute({ notificationId: 'fake-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
