import React, { FunctionComponent, useState } from "react";
import { SignInForm } from "../Modals/SignInForm";
import { About } from "./About";
import { useNavigate } from "react-router-dom";

export const TitleScreen: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <SignInForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></SignInForm>
    </>
  );
};
