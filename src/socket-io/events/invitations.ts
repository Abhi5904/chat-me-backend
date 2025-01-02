import Invitation from '../../models/invitation.model';
import {
  GetReadCount,
  GetUnreadCount,
} from '../../services/invitations.service';
import { getSocket } from '../socket';
import EventNames from './eventName';

export const emitUnreadInvitation = async (id: string) => {
  const io = getSocket();
  if (!io) {
    console.log('Socket.IO is not initialized');
  }
  const unreadCount = await GetUnreadCount({ receiverId: id });
  io.emit(`${EventNames.UNREAD_INVITATION}-${id}`, {
    unreadCount,
  });
};

export const emitMarkedInvitation = async (id: string) => {
  const io = getSocket();
  if (!io) {
    console.log('Socket.IO is not initialized');
  }
  const unreadCount = await GetReadCount({ senderId: id });
  console.log(unreadCount, 'unreadCount');
  console.log('event', `${EventNames.READ_INVITATION}-${id}`);
  io.emit(`${EventNames.READ_INVITATION}-${id}`, {
    unreadCount,
  });
};
