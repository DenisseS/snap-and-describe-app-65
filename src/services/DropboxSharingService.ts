import { QueueClient } from './sw/QueueClient';
import { ShoppingList } from '@/types/shoppingList';

export class DropboxSharingService {
  private static instance: DropboxSharingService;

  static getInstance(): DropboxSharingService {
    if (!DropboxSharingService.instance) {
      DropboxSharingService.instance = new DropboxSharingService();
    }
    return DropboxSharingService.instance;
  }

  async shareFolder(list: ShoppingList, folderPath: string): Promise<string> {
    console.log('🔗 DropboxSharingService: Sharing folder:', folderPath);
    
    if (list.sharedFolderId) {
      console.log('🔗 DropboxSharingService: Folder already shared, reusing ID:', list.sharedFolderId);
      return list.sharedFolderId;
    }

    const result = await QueueClient.getInstance().enqueue('dropbox-sharing', list.id, {
      type: 'share_folder',
      folderPath
    }) as any;

    if (!result || !result.sharedFolderId) {
      throw new Error('Failed to get shared folder ID');
    }

    console.log('🔗 DropboxSharingService: Folder shared successfully, ID:', result.sharedFolderId);
    
    // Update the list with the shared folder ID
    await this.updateListWithSharedFolderId(list.id, result.sharedFolderId);
    
    return result.sharedFolderId;
  }

  async inviteUser(list: ShoppingList, folderPath: string, email: string): Promise<void> {
    console.log('🔗 DropboxSharingService: Inviting user:', email);

    // Ensure folder is shared first
    const sharedFolderId = await this.shareFolder(list, folderPath);

    const result = await QueueClient.getInstance().enqueue('dropbox-sharing', list.id, {
      type: 'invite',
      sharedFolderId,
      email
    }) as any;

    if (!result || result.success === false) {
      throw new Error(result?.error || 'Failed to invite user');
    }

    console.log('🔗 DropboxSharingService: User invited successfully');
  }

  async removeUser(list: ShoppingList, email: string): Promise<void> {
    console.log('🔗 DropboxSharingService: Removing user:', email);

    if (!list.sharedFolderId) {
      throw new Error('List is not shared');
    }

    const result = await QueueClient.getInstance().enqueue('dropbox-sharing', list.id, {
      type: 'remove',
      sharedFolderId: list.sharedFolderId,
      email
    }) as any;

    if (!result || result.success === false) {
      throw new Error(result?.error || 'Failed to remove user');
    }

    console.log('🔗 DropboxSharingService: User removed successfully');
  }

  private async updateListWithSharedFolderId(listId: string, sharedFolderId: string): Promise<void> {
    // This should integrate with your shopping list service to update the list
    // For now, we'll emit an event that the UI can listen to
    console.log('🔗 DropboxSharingService: Should update list', listId, 'with sharedFolderId:', sharedFolderId);
    
    // Emit custom event for the UI to catch
    window.dispatchEvent(new CustomEvent('shoppingListSharedFolderUpdated', {
      detail: { listId, sharedFolderId }
    }));
  }
}