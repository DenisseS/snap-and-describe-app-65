// Dropbox-specific processor(s) for the Service Worker queue
// Registers processors on global NSQueue

(function(){
  if (!self.NSQueue) {
    console.error('NSQueue not found. Ensure queue.js is imported before dropbox.js');
    return;
  }

  // Processor for shopping lists → uploads to Dropbox overwrite (new folder structure)
  const APP_FOLDER_PATH = '/NutriInfo';
  self.NSQueue.registerProcessor('shopping-lists', async (item, ctx) => {
    const token = ctx && ctx.token;
    if (!token) { console.warn('SW Dropbox: missing token'); return false; }
    try {
      // Use custom path if provided, otherwise use new folder structure
      const path = item.payload.path || `${APP_FOLDER_PATH}/lists/${item.resourceKey}/shopping-list.json`;
      const body = JSON.stringify(item.payload, null, 2);
      console.log('SW Dropbox: uploading', { path, bytes: body.length });
      const resp = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Dropbox-API-Arg': JSON.stringify({ path, mode: 'overwrite', autorename: false }),
          'Content-Type': 'application/octet-stream',
        },
        body,
      });
      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        console.error('SW Dropbox: upload failed', resp.status, text);
        return false;
      }
      console.log('SW Dropbox: upload ok');
      return true;
    } catch (e) {
      console.error('SW Queue: Dropbox upload error', e);
      return false;
    }
  });

  // Processor for folder sharing operations
  self.NSQueue.registerProcessor('dropbox-sharing', async (item, ctx) => {
    const token = ctx && ctx.token;
    if (!token) { console.warn('SW Dropbox Sharing: missing token'); return false; }
    
    const { type, folderPath, email, sharedFolderId } = item.payload;
    
    try {
      let url, body, result;
      
      switch (type) {
        case 'share_folder':
          url = 'https://api.dropboxapi.com/2/sharing/share_folder';
          body = JSON.stringify({
            path: folderPath,
            access_level: { '.tag': 'editor' }
          });
          console.log('SW Dropbox Sharing: share_folder', { folderPath });
          break;
          
        case 'invite':
          if (!sharedFolderId) {
            console.error('SW Dropbox Sharing: missing sharedFolderId for invite');
            return { success: false, error: 'Missing shared folder ID' };
          }
          url = 'https://api.dropboxapi.com/2/sharing/add_folder_member';
          body = JSON.stringify({
            shared_folder_id: sharedFolderId,
            members: [{
              member: { '.tag': 'email', email },
              access_level: { '.tag': 'editor' }
            }]
          });
          console.log('SW Dropbox Sharing: invite', { sharedFolderId, email });
          break;
          
        case 'remove':
          if (!sharedFolderId) {
            console.error('SW Dropbox Sharing: missing sharedFolderId for remove');
            return { success: false, error: 'Missing shared folder ID' };
          }
          url = 'https://api.dropboxapi.com/2/sharing/remove_folder_member';
          body = JSON.stringify({
            shared_folder_id: sharedFolderId,
            member: { '.tag': 'email', email },
            leave_a_copy: false
          });
          console.log('SW Dropbox Sharing: remove', { sharedFolderId, email });
          break;
          
        default:
          console.error('SW Dropbox Sharing: unknown type', type);
          return { success: false, error: 'Unknown operation type' };
      }
      
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body,
      });
      
      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        console.error('SW Dropbox Sharing: operation failed', resp.status, text);
        return { success: false, error: text, status: resp.status };
      }
      
      result = await resp.json();
      console.log('SW Dropbox Sharing: operation successful', type, result);
      
      // Return the shared_folder_id for share_folder operations
      if (type === 'share_folder' && result.shared_folder_id) {
        return { success: true, sharedFolderId: result.shared_folder_id };
      }
      
      return { success: true };
    } catch (e) {
      console.error('SW Dropbox Sharing: error', e);
      return { success: false, error: e.message };
    }
  });
})();
