import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { clearAlert } from "../../features/alert/alertSlice";

const DynamicAlert = () => {
  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state.alert);

  useEffect(() => {
    if (type && message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000); // Close the alert after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [type, message, dispatch]);

  if (!type || !message) {
    return null;
  }

  return (
    <Stack
      sx={{
        position: "absolute",
        top: 80,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
      spacing={2}
    >
      <Alert severity={type} onClose={() => dispatch(clearAlert())}>
        {message}
      </Alert>
    </Stack>
  );
};

export default DynamicAlert;
