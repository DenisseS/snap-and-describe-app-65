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

    try {
      const result = await QueueClient.getInstance().enqueue('dropbox-sharing', list.id, {
        type: 'share_folder',
        folderPath
      });

      if (!result || !result.sharedFolderId) {
        throw new Error('Failed to get shared folder ID from share operation');
      }

      console.log('🔗 DropboxSharingService: Folder shared successfully, ID:', result.sharedFolderId);
      
      // Update the list with the shared folder ID
      await this.updateListWithSharedFolderId(list.id, result.sharedFolderId);
      
      return result.sharedFolderId;
    } catch (error) {
      console.error('🔗 DropboxSharingService: Error sharing folder:', error);
      throw error;
    }
  }

  async inviteUser(list: ShoppingList, folderPath: string, email: string): Promise<void> {
    console.log('🔗 DropboxSharingService: Inviting user:', email);

    // Ensure folder is shared first
    const sharedFolderId = await this.shareFolder(list, folderPath);

    try {
      const result = await QueueClient.getInstance().enqueue('dropbox-sharing', list.id, {
        type: 'invite',
        sharedFolderId,
        email
      });

      // Result should be truthy for success, error will be thrown by QueueClient
      console.log('🔗 DropboxSharingService: User invited successfully');
    } catch (error) {
      console.error('🔗 DropboxSharingService: Error inviting user:', error);
      throw error;
    }
  }

  async removeUser(list: ShoppingList, email: string): Promise<void> {
    console.log('🔗 DropboxSharingService: Removing user:', email);

    if (!list.sharedFolderId) {
      throw new Error('List is not shared');
    }

    try {
      const result = await QueueClient.getInstance().enqueue('dropbox-sharing', list.id, {
        type: 'remove',
        sharedFolderId: list.sharedFolderId,
        email
      });

      // Result should be truthy for success, error will be thrown by QueueClient
      console.log('🔗 DropboxSharingService: User removed successfully');
    } catch (error) {
      console.error('🔗 DropboxSharingService: Error removing user:', error);
      throw error;
    }
  }

  private async updateListWithSharedFolderId(listId: string, sharedFolderId: string): Promise<void> {
    console.log('🔗 DropboxSharingService: Updating list', listId, 'with sharedFolderId:', sharedFolderId);
    
    // Import ShoppingListService dynamically to avoid circular dependency
    const { default: ShoppingListService } = await import('./shopping-list/ShoppingListService');
    const service = ShoppingListService.getInstance();
    
    try {
      await service.updateShoppingList(listId, { sharedFolderId });
      console.log('🔗 DropboxSharingService: Successfully updated list with sharedFolderId');
    } catch (error) {
      console.error('🔗 DropboxSharingService: Failed to update list with sharedFolderId:', error);
      // Emit custom event as fallback for the UI to catch
      window.dispatchEvent(new CustomEvent('shoppingListSharedFolderUpdated', {
        detail: { listId, sharedFolderId }
      }));
    }
  }
}