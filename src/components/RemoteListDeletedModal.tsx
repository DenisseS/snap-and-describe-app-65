import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Unlink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RemoteListDeletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  onConfirm: () => void;
}

const RemoteListDeletedModal: React.FC<RemoteListDeletedModalProps> = ({
  isOpen,
  onClose,
  listName,
  onConfirm
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            {t('listDeleted', 'Lista Eliminada')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {t('remoteListDeletedMessage', 'La lista compartida "{listName}" ha sido eliminada por el propietario y ya no está disponible.', { listName })}
            </AlertDescription>
          </Alert>

          <p className="text-sm text-gray-600">
            {t('remoteListDeletedDescription', 'Esta acción removerá la lista de tu perfil. Si necesitas acceso nuevamente, tendrás que solicitar un nuevo enlace de invitación.')}
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            {t('cancel', 'Cancelar')}
          </Button>
          <Button onClick={onConfirm} className="bg-amber-600 hover:bg-amber-700">
            <Unlink className="h-4 w-4 mr-2" />
            {t('removeFromProfile', 'Remover de mi Perfil')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoteListDeletedModal;