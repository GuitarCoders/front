import AlertDialogComponent from "@components/alert-dialog";
import { useEffect, useState } from "react";

interface UseAlertDialogProps {
  title: string;
  description: string;
  error?: boolean;
  buttonFn?: () => void;
  buttonText?: string;
}
interface UseAlertDialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}
type UseAlertDialogResult = [() => JSX.Element, UseAlertDialogState];

export default function useAlertDialog({
  title,
  description,
  error,
  buttonFn,
  buttonText,
}: UseAlertDialogProps): UseAlertDialogResult {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    if (error) {
      openDialog();
    }
  }, [error]);

  const Component = () => (
    <AlertDialogComponent
      title={title}
      description={description}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );

  return [Component, { isOpen, openDialog, closeDialog }];
}
