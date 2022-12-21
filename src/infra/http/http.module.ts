import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { SendNotification } from '@app/use-cases/send-notification';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { ListRecipientNotifications } from '@app/use-cases/list-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { RecipientsController } from './controllers/recipients.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController, RecipientsController],
  providers: [
    SendNotification,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
    CountRecipientNotifications,
    ListRecipientNotifications,
  ],
})
export class HttpModule {}
