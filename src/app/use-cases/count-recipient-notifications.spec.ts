import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();

  const countNotificationsByRecipient = new CountRecipientNotifications(
    notificationsRepository,
  );

  const recipientOneId = 'fake-recipient-one-id';
  const recipientTwoId = 'fake-recipient-two-id';

  beforeAll(async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: recipientOneId }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientOneId }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientTwoId }),
    );
  });

  it('should be able count recipient notifications', async () => {
    const countRecipientOne = await countNotificationsByRecipient.execute({
      recipientId: recipientOneId,
    });
    const countRecipientTwo = await countNotificationsByRecipient.execute({
      recipientId: recipientTwoId,
    });
    const countRecipientThird = await countNotificationsByRecipient.execute({
      recipientId: '',
    });

    expect(countRecipientOne.count).toBe(2);
    expect(countRecipientTwo.count).toBe(1);
    expect(countRecipientThird.count).toBe(0);
  });
});
