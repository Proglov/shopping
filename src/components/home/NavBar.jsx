"use client";
import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LiaSignInAltSolid, LiaSignOutAltSolid } from "react-icons/lia";
import { GiShoppingCart } from "react-icons/gi";
import Link from "next/link";
import Cart from "../Shopping card/Cart";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { SetCart } from "@/store/CartProductsSlice";
import { getCounterProductsWithoutLS, loadCartState } from "@/store/Storage/Storage";
import { useDispatch, useSelector } from "react-redux";
import { checkAndSetLoginStatus, checkIfCheckLoginIsRequired, CheckLogin, SetLogin } from "@/store/login";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.CartProducts);
  const login = useSelector((state) => state.Login);

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [bga, setBga] = useState(false);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setCounter(getCounterProductsWithoutLS(products))
  }, [products])

  useEffect(() => {
    const bool = checkIfCheckLoginIsRequired()
    if (bool) dispatch(checkAndSetLoginStatus())
    else dispatch(CheckLogin())
    const state = loadCartState();
    dispatch(SetCart(state));
  }, [login]);


  const handleOpen = () => {
    setOpenDialog(true);
  };
  const Close = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    setOpenDialog(false);
    dispatch(SetLogin({ status: '', token: null }))
    router.refresh();
  };


  const shoppingCardComponent = (
    <Typography
      className="mr-4 z-50 w-16 pt-[10px] pr-[22px]"
      variant="h6"
      noWrap
      component="div"
    >
      <IconButton onClick={handleClickOpen}>
        <Badge
          badgeContent={convertToFarsiNumbers(counter)}
          color="error"
          sx={{ zIndex: "300", "& .MuiBadge-badge": { fontSize: { xs: '9px', sm: '15px' }, height: { xs: '15px', sm: '22px' }, width: { xs: '15px', sm: '22px' } } }}
        >
          <GiShoppingCart
            className="sm:text-2xl text-[18px]"
            style={{ zIndex: "300" }}
          />
        </Badge>
      </IconButton>
      <Cart Close={handleClose} Open={open} />
    </Typography>
  )

  const signInAndSignOutComponent = (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      className="mr-2"
    >
      {!(login === 'user' || login === 'seller') ? (
        <Link href="/users/login">
          <span className="text-white flex">
            <LiaSignInAltSolid className="sm:text-[25px] text-[22px] " />
            <span style={{ lineHeight: "24px" }} className="sm:text-2xl text-[16px]">ورود</span>
          </span>
        </Link>
      ) : (
        <span className="text-red-500 flex" onClick={handleOpen}>
          <LiaSignOutAltSolid />
          <span style={{ lineHeight: "20px" }}>خروج</span>
        </span>
      )}
    </IconButton>
  )

  const spaceComponent = (
    <Box className='lg:flex-1 xl:hidden' />
  )

  const searchComponent = (
    <Search
      dir="rtl"
      onClick={() => setBga(true)}
      onDoubleClick={() => router.push('/ADMIN')}
    >
      <SearchIconWrapper>
        <SearchIcon className="sm:text-lg text-xs" />
      </SearchIconWrapper>
      <StyledInputBase
        className="sm:text-lg text-[10px]"
        placeholder="جستجو ..."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  )

  const profileComponent = (
    <Box>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <span className="text-white text-[16px] flex">
          <Link href="/users/profile" className="mr-1"> پروفایل</Link>
          <AccountCircle />
        </span>
      </IconButton>
    </Box>
  )

  return (
    <Box>
      <div style={{ width: "100%", height: "56px" }}></div>
      <AppBar
        sx={{
          zIndex: "200",
          direction: "ltr",
          backgroundColor: `rgba(62, 81, 114, ${bga ? ".9" : ".8"})`,
        }}
      >
        <Toolbar className="sm:max-w-[2000px] lg:max-w-full lg:w-[1200px] mx-auto flex justify-center">
          {
            login === 'user' &&
            <>
              {shoppingCardComponent}
              {signInAndSignOutComponent}
              {spaceComponent}
              {searchComponent}
              {profileComponent}
            </>
          }
          {
            login === 'seller' &&
            <>
              {signInAndSignOutComponent}
              {spaceComponent}
              {searchComponent}
            </>
          }
          {
            login === '' &&
            <>
              {shoppingCardComponent}
              {signInAndSignOutComponent}
              {spaceComponent}
              {searchComponent}
            </>
          }
        </Toolbar>
      </AppBar>

      <Dialog
        onClose={Close}
        open={openDialog}
        sx={{
          "& .MuiDialog-paper": {
            xs: { width: "100%", maxWidth: "none" },
            md: { width: "70%" },
            lg: { width: "50%" },
          },
        }}
      >
        <DialogContent dividers>
          <Box component="div" className="text-xl mt-3">
            آیا می خواهید خارج شوید؟
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-red-500 hover:bg-red-600 text-xl rounded-lg w-1/6"
            onClick={logOut}
          >
            خروج
          </Button>
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-1/6 mr-4"
            onClick={Close}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
