import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ListRecipientNotifications } from './list-recipient-notifications';

describe('List recipient notifications', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const listRecipientNotifications = new ListRecipientNotifications(
    notificationsRepository,
  );

  const recipientOneId = 'recipient-one-id';
  const recipientTwoId = 'recipient-two-id';
  const recipientThirdId = 'recipient-third-id';

  beforeAll(async () => {
    await Promise.all([
      notificationsRepository.create(
        makeNotification({ recipientId: recipientOneId }),
      ),
      notificationsRepository.create(
        makeNotification({ recipientId: recipientOneId }),
      ),
      notificationsRepository.create(
        makeNotification({ recipientId: recipientTwoId }),
      ),
    ]);
  });

  it('should be able list recipient notifications', async () => {
    const recipientOneNotifications = await listRecipientNotifications.execute({
      recipientId: recipientOneId,
    });
    const recipientTwoNotifications = await listRecipientNotifications.execute({
      recipientId: recipientTwoId,
    });
    const recipientThirdNotifications =
      await listRecipientNotifications.execute({
        recipientId: recipientThirdId,
      });

    expect(recipientOneNotifications.notifications).toHaveLength(2);
    expect(recipientOneNotifications.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientOneId }),
        expect.objectContaining({ recipientId: recipientOneId }),
      ]),
    );

    expect(recipientTwoNotifications.notifications).toHaveLength(1);
    expect(recipientTwoNotifications.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientTwoId }),
      ]),
    );

    expect(recipientThirdNotifications.notifications).toHaveLength(0);
    expect(recipientThirdNotifications.notifications).toEqual(
      expect.arrayContaining([]),
    );
  });
});
