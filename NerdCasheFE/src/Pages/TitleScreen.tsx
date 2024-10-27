import React, { FunctionComponent, useState } from "react";
import { SignInForm } from "../Modals/SignInForm";

export const TitleScreen: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <SignInForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></SignInForm>
      {isModalOpen ? (
        ""
      ) : (
        <div className="text-red-600">This Is The Home Screen</div>
      )}
    </>
  );
};
