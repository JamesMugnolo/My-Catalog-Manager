import React, { FunctionComponent, useState } from "react";
import { SignInForm } from "../Modals/SignInForm";
import { About } from "./About";

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
        <About></About>
      )}
    </>
  );
};
