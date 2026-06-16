type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmationText: string;
  cancellationText: string;
  onConfirm: () => void;
  onCancel: () => void;
};
function ConfirmDeleteDialog({
  open,
  title,
  description,
  confirmationText,
  cancellationText,
  onCancel,
  onConfirm,
}: Props) {
  return open ? (
    <div className="h-dvh w-dvw fixed backdrop-blur flex flex-col items-center justify-center">
      <div className="bg-zinc-50 border border-1 border-zinc-800 p-8">
        <h1 className="text-xl">{title}</h1>
        <p className="text-base">{description}</p>
        <div className="flex flex-row gap-1">
          <button
            className="border border-box border-solid text-zinc-800 bg-zinc-50 hover:text-indigo-500 stroke-zinc-800 hover:stroke-indigo-500 py-2 px-2"
            onClick={() => onCancel()}
          >
            {cancellationText}
          </button>
          <button
            className="border border-box border-solid text-zinc-800 bg-zinc-50 hover:text-indigo-500 stroke-zinc-800 hover:stroke-indigo-500 py-2 px-2"
            onClick={() => onConfirm()}
          >
            {confirmationText}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ConfirmDeleteDialog;
