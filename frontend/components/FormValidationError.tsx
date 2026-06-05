import React from "react";

type Props = {
  message: string;
};

function FormValidationError({ message }: Props) {
  return (
    <div>
      <p className="text-xs px-1 py-1 text-red-500">{message}</p>
    </div>
  );
}

export default FormValidationError;
