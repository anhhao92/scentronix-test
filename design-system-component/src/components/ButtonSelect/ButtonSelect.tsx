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
  const [position, setPosition] = React.useState({ left: 0, top: 0 });
  const ref = React.useRef<HTMLButtonElement>(null);

  const handleClickOpen = () => {
    const pos = ref.current?.getBoundingClientRect();
    console.log(pos);

    if (pos) {
      setPosition({ left: pos.left, top: pos.top });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ActionButton
        sx={{ visibility: open ? "hidden" : "visible" }}
        ref={ref}
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        onClick={handleClickOpen}
      >
        {label}
      </ActionButton>

      <Backdrop open={open} onClick={handleClose} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Stack spacing={1}>
          {options.map((item) => (
            <SelectItem key={item.label} {...item} />
          ))}
        </Stack>
        <Fab size="small" sx={{ backgroundColor: "white", position: "absolute", ...position }}>
          <CloseIcon fontSize="small" />
        </Fab>
      </Backdrop>
    </>
  );
};

export default ButtonSelect;
