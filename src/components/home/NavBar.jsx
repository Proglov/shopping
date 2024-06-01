"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LiaSignInAltSolid, LiaSignOutAltSolid } from "react-icons/lia";
import { GiShoppingCart } from "react-icons/gi";
import Link from "next/link";
import Cart from "../Shopping card/Cart";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { GrUserAdmin } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "@/store/Hook";
import { SetLogin } from "@/features/Login/LoginSlice";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { fetchProducts } from "@/features/Products/Products";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const cartProducts = useAppSelector((state) => state.CartProducts);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [bga, setBga] = React.useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };
  const Close = () => {
    setOpenDialog(false);
  };

  let counter = cartProducts
    .reduce((accumulator, currentObject) => {
      return accumulator + currentObject.number;
    }, 0)
    .toString();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoggedIn = useAppSelector((state) => state.Login.login);
  const dispatch = useAppDispatch();

  // this is temporary and should be changed
  const isAdmin = false;

  // this is temporary and should be changed
  const isUserSeller = true;

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setOpenDialog(false);
    dispatch(SetLogin(false));
  };

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ width: "100%", height: "56px" }}></div>
      <AppBar
        sx={{
          zIndex: "200",
          direction: "ltr",
          backgroundColor: `rgba(62, 81, 114, ${bga ? ".9" : ".8"})`,
        }}
      >
        <Toolbar>
          {/* سبد خرید */}
          <Typography
            className="mr-1 z-50"
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              maxWidth: "48px",
              flexBasis: "48px",
              height: "50px",
              paddingTop: "10px",
            }}
          >
            <IconButton onClick={handleClickOpen}>
              <Badge
                badgeContent={convertToFarsiNumbers(counter)}
                color="error"
                sx={{ zIndex: "300" }}
              >
                <GiShoppingCart
                  className="text-2xl"
                  style={{ zIndex: "300" }}
                />
              </Badge>
            </IconButton>
            <Cart Close={handleClose} Open={open} />
          </Typography>

          {/* ورود و خروج */}

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className="mr-2"
          >
            {!isLoggedIn ? (
              <Link href="/users/login">
                <span className="text-white flex">
                  <LiaSignInAltSolid />
                  <span style={{ lineHeight: "24px" }}>ورود</span>
                </span>
              </Link>
            ) : (
              <span className="text-red-500 flex" onClick={handleOpen}>
                <LiaSignOutAltSolid />
                <span style={{ lineHeight: "20px" }}>خروج</span>
              </span>
            )}
          </IconButton>

          {/* ادمین */}

          {isAdmin ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <Link href="/ADMIN">
                  <span
                    className="text-red-500 flex"
                    style={{ lineHeight: "24px" }}
                  >
                    <GrUserAdmin />
                  </span>
                </Link>
              </IconButton>

              {/* فاصله */}
              <Box sx={{ flexGrow: 1 }} />
            </>
          ) : (
            <></>
          )}

          {/* فروشنده */}

          {isUserSeller ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <Link href="/Seller">
                  <span className="flex flex-col">
                    <StorefrontIcon className="mx-auto pt-2" />
                    <span className="text-sm">پنل مدیریت</span>
                  </span>
                </Link>
              </IconButton>

              {/* فاصله */}
              <Box sx={{ flexGrow: 1 }} />
            </>
          ) : (
            <></>
          )}

          {/* جست و جو */}
          <Search
            dir="rtl"
            sx={{
              flexGrow: 1,
              flexBasis: "auto",
              maxWidth: { xs: "200px", sm: "100px", md: "500px" },
            }}
            onClick={() => setBga(true)}
            className="sm:max-w-md"
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="جستجو ..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* پروفایل */}
          {isLoggedIn ? (
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>

      {/* منوی پروفایل */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ marginTop: "35px" }}
      >
        <MenuItem sx={{ padding: "10px" }} onClick={handleMenuClose}>
          <Link href="/users/profile"> پروفایل من</Link>
        </MenuItem>
      </Menu>

      <Dialog
        onClose={Close}
        open={openDialog}
        sx={{
          "& .MuiDialog-paper": {
            lg: { width: "50%", maxWidth: "none" },
            md: { width: "70%", maxWidth: "none" },
            sm: { width: "100%", maxWidth: "none" },
            xs: { width: "100%", maxWidth: "none" },
          },
        }}
      >
        <DialogContent dividers>
          <Box component="div" className="text-xl mt-3">
            آیا واقعا می خواهید خارج شوید؟
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
