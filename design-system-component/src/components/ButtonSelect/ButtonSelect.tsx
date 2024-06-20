import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export interface ButtonOption {
  label: string;
  price?: string;
  description?: string;
  tag?: string;
}

export interface ButtonSelectProps {
  /**
   * Button label
   */
  label: string;
  /**
   * Data source for the button select
   */
  options: ButtonOption[];
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: 200,
  cursor: "pointer",
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
}));

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const TitleWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.grey[500],
})) as typeof Typography;

const OptionalTag = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
}));

const ActionButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 400,
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: "black",
    boxShadow: "none",
  },
});

const SelectItem = ({ label, price, tag, description }: ButtonOption) => {
  return (
    <Item elevation={3}>
      <Header>
        <TitleWrapper>
          <AddShoppingCartIcon fontSize="small" />
          <Typography variant="subtitle2">{label}</Typography>
        </TitleWrapper>
        {price && <Typography variant="subtitle2">{price}</Typography>}
      </Header>
      {description && (
        <DescriptionText variant="body2" fontWeight={500}>
          {description}
        </DescriptionText>
      )}
      {tag && <OptionalTag label={tag} />}
    </Item>
  );
};

const ButtonSelect = ({ options, label }: ButtonSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const stackRef = React.useRef<HTMLDivElement>(null);

  const getStackPosition = () => {
    const btnPos = btnRef.current?.getBoundingClientRect();
    const stackPos = stackRef.current?.getBoundingClientRect();
    if (!btnPos || !stackPos) {
      return { left: 0, top: 0 };
    }
    const top = btnPos.top + stackPos.height < window.innerHeight ? btnPos.top : "auto";
    if (btnPos.left > window.innerWidth / 2) {
      return { left: btnPos.left - stackPos.width - 8, top };
    }
    return { left: btnPos.left + 48, top };
  };

  const getCloseButtonPosition = () => {
    const btnPos = btnRef.current?.getBoundingClientRect();
    if (btnPos) {
      return { left: btnPos.left, top: btnPos.top };
    }
    return { left: 0, top: 0 };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ActionButton
        sx={{ visibility: open ? "hidden" : "visible" }}
        ref={btnRef}
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        onClick={handleClickOpen}
      >
        {label}
      </ActionButton>

      <Backdrop open={open} onClick={handleClose} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Stack ref={stackRef} spacing={1} sx={{ position: "absolute", ...getStackPosition() }}>
          {options.map((item) => (
            <SelectItem key={item.label} {...item} />
          ))}
        </Stack>
        <Fab size="small" sx={{ backgroundColor: "white", position: "absolute", ...getCloseButtonPosition() }}>
          <CloseIcon fontSize="small" />
        </Fab>
      </Backdrop>
    </>
  );
};

export default ButtonSelect;
