import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotificaton = new SendNotification(notificationsRepository);

    const { notification } = await sendNotificaton.execute({
      category: 'social',
      recipientId: 'recipient-id',
      content: 'Você tem uma nova solicitação de amizade',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toBe(notification);
  });
});
