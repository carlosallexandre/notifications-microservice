import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const content = new Notification({
      content: new Content('Nova solicitação de amizade!'),
      category: 'category',
      recipientId: 'recipient-id',
    });

    expect(content).toBeTruthy();
  });
});
