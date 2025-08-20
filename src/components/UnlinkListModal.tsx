import React from 'react';
import { useTranslation } from 'react-i18next';
import { Unlink, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UnlinkListModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  onConfirm: () => void;
  isUnlinking?: boolean;
}

const UnlinkListModal: React.FC<UnlinkListModalProps> = ({
  isOpen,
  onClose,
  listName,
  onConfirm,
  isUnlinking = false
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Unlink className="h-5 w-5" />
            {t('unlinkList', 'Desvincular Lista')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {t('unlinkListConfirmation', '¿Estás seguro de que quieres desvincular "{listName}" de tu perfil?', { listName })}
          </p>

          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              {t('unlinkListWarning', 'Esta acción no elimina la lista original, solo quita la visibilidad en tu perfil. Tendrás que solicitar un nuevo enlace si quieres verla nuevamente.')}
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isUnlinking}>
            {t('cancel', 'Cancelar')}
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isUnlinking}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {isUnlinking ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {t('unlinking', 'Desvinculando...')}
              </div>
            ) : (
              <>
                <Unlink className="h-4 w-4 mr-2" />
                {t('unlinkConfirm', 'Sí, Desvincular')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkListModal;