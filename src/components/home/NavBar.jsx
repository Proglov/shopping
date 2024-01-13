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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoggedIn = false;

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ width: "100%", height: "56px" }}></div>
      <AppBar
        sx={{ zIndex: "200", direction: "ltr", backgroundColor: "#3e5172" }}
      >
        <Toolbar>
          {/* سبد خرید */}
          <Typography
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
              <Badge badgeContent={2} color="error" sx={{ zIndex: "300" }}>
                <GiShoppingCart
                  className="text-2xl"
                  style={{ zIndex: "300" }}
                />
              </Badge>
            </IconButton>
            <Cart Close={handleClose} Open={open}/>
          </Typography>

          {/* ورود و خروج */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            {!isLoggedIn ? (
              <span className="text-white flex">
                <LiaSignInAltSolid />
                <span style={{ lineHeight: "24px" }}>ورود</span>
              </span>
            ) : (
              <span className="text-red-500 flex">
                <LiaSignOutAltSolid />
                <span style={{ lineHeight: "20px" }}>خروج</span>
              </span>
            )}
          </IconButton>

          {/* فاصله */}
          <Box sx={{ flexGrow: 1 }} />

          {/* جست و جو */}
          <Search
            dir="rtl"
            sx={{ flexGrow: 0, flexBasis: "auto", maxWidth: "200px" }}
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
          پروفایل من
        </MenuItem>
      </Menu>
    </Box>
  );
}
