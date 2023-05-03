import { createEffect, createMemo, on, onMount } from "solid-js";
import "./App.scss";
import { createTheme, CssBaseline, ThemeProvider } from "@suid/material";
import Header from "./components/Header/Header";
import { Routes, Route, useBeforeLeave, useNavigate, useLocation, Outlet } from "@solidjs/router";
import userUserData from "./states/userData";
import { createTimer } from "@solid-primitives/timer";
import SnackbarHolder from "./components/SnackbarHolder/SnackbarHolder";
import pageManager from "./states/pageManager";
import Login from "./pages/Login/Login";
import FileList from "./pages/FileList/FileList";

function App() {
  const { data: userData, checkLoginToken } = userUserData;
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);
  const { pageList, selectPage } = pageManager;

  const navigatePage = (route: (typeof pageList)[number]["route"]) => {
    selectPage(route);
    navigate(route);
  }

  createTimer(
    () => checkLoginToken(),
    5 * 60 * 1000,
    setInterval
  );

  const checkLoginAndNavigate = async () => {
    await checkLoginToken();
    navigatePage(!userData.loggedIn && pathname() !== "/login" ? "/login" : "/");
  }

  onMount(checkLoginAndNavigate);
  createEffect(on(() => userData.loggedIn, checkLoginAndNavigate));

  useBeforeLeave(async event => {
    await checkLoginToken();

    if (!userData.loggedIn && typeof event.to === 'string' && event.to !== "/login") {
      event.preventDefault();
      navigatePage("/login");
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" component={FileList} />
        <Route path="/login" component={Login} />
      </Routes>
      <SnackbarHolder />
    </ThemeProvider>
  );
}

export default App;