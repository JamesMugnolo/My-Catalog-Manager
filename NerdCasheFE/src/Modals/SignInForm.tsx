import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import TextFeild from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useForm from "react-hook-form";
import { CustomModal } from "./CustomModal";
import { Styles } from "./FormStyling";
import { VisibilityLabel } from "./VisibilityLabel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useUserAPI } from "../Hooks/useUserAPI";
import { useNavigate } from "react-router-dom";
interface IFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm: FunctionComponent<IFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const body = { username, password };
  const [submitionError, setSubmitionError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { results, putUser, getUser } = useUserAPI();
  const navigate = useNavigate();
  function closeModal() {
    setIsModalOpen(!isModalOpen);
  }
  async function HandleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    if (isSignInForm == true) {
      const token = await getUser(username, password);
      console.log(token);
      if (token !== null) {
        dispatch({
          type: "SET_USER_CREDENTIALS",
          user: username,
          token: token,
        });
        navigate("/About");
        closeModal();
      } else {
        setSubmitionError("Please enter a different username");
      }
    } else {
      if (password.length < 10) {
        setSubmitionError("The password must have at least 10 characters");
        return;
      }
      if (
        !/[A-Z]/.test(password) || //checks for capitals in the string
        !/[0-9]/.test(password) || //checks for digits in the string
        !/[-+_!@#$%^&*.,?]/.test(password) //checks for special characters int the string
      ) {
        setSubmitionError(
          "The password must contain at least 1 digit, capital, and special character"
        );
        return;
      }
      if (!password.match(passwordConfirm)) {
        setSubmitionError("The passwords you entered do not match");
        return;
      } else {
        const token = await putUser(username, password);
        if (token !== null) {
          dispatch({
            type: "SET_USER_CREDENTIALS",
            user: username,
            token: token,
          });
          navigate("/About");
          closeModal();
        } else {
          setSubmitionError("Please enter a valid username and password");
        }
      }
    }
  }
  useEffect(() => {
    if (isSignInForm == true && username && password) {
      setIsSubmitDisabled(false);
      return;
    }

    if (isSignInForm == false && username && password && passwordConfirm) {
      setIsSubmitDisabled(false);
      return;
    }
    setIsSubmitDisabled(true);
  }, [username, password, passwordConfirm, isSignInForm]);

  function handlePasswordConfirmChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setPasswordConfirm(event.target.value);
  }

  function handlePasswordChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setPassword(event.target.value);
  }

  function handleUsernameChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setUsername(event.target.value);
  }

  return (
    <CustomModal
      open={isModalOpen}
      handleClose={closeModal}
      title={isSignInForm ? "Sign In" : "Sign Up"}
      styles={{ maxWidth: "100vw", maxHeight: "100vh" }}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      >
        <form
          noValidate
          autoComplete="off"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            background: "rgba( 117, 101, 101, 0.5 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 20px )",
            borderRadius: "5px",
            padding: "1rem",
            width: "40%",
            height: "fit-content",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "2rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <TextFeild
            label="Username"
            helperText="please enter your username"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 20 }}
            sx={Styles.field}
            value={username}
            onChange={handleUsernameChange}
          />
          <TextFeild
            label="Password"
            helperText={
              <VisibilityLabel
                labelText="please enter your password"
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              ></VisibilityLabel>
            }
            fullWidth
            type={isVisible ? "text " : "password"}
            variant="standard"
            inputProps={{ maxLength: 20 }}
            sx={Styles.field}
            value={password}
            onChange={handlePasswordChange}
          />
          {!isSignInForm ? (
            <div
              style={{
                width: "100%",
                position: "relative",
                height: "fit-content",
              }}
            >
              <TextFeild
                label="Confirm Password"
                helperText={
                  <VisibilityLabel
                    labelText="please re-enter your password"
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  ></VisibilityLabel>
                }
                fullWidth
                type={isVisible ? "text " : "password"}
                variant="standard"
                inputProps={{ maxLength: 20 }}
                sx={Styles.field}
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              />
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: ".5rem",
            }}
          >
            <p style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}>
              {submitionError}
            </p>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="button"
              color="primary"
              variant="contained"
              sx={{ marginRight: "1rem" }}
              onClick={() => {
                setIsSignInForm(!isSignInForm);
              }}
            >
              {isSignInForm ? "Sign Up" : "Back"}
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitDisabled}
              onClick={HandleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
    </CustomModal>
  );
};
