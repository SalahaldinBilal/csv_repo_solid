import { Show, createMemo, onMount } from "solid-js";
import "./App.scss";
import TorrentList from "./pages/Login/Login";
import { createTheme, CssBaseline, ThemeProvider } from "@suid/material";
import Header from "./components/Header/Header";
import { Routes, Route, useBeforeLeave, useNavigate, useLocation, Outlet } from "@solidjs/router";
import useSocketConnection from "./states/socketConnection";
import userUserData from "./states/userData";
import { createTimer } from "@solid-primitives/timer";
import SnackbarHolder from "./components/SnackbarHolder/SnackbarHolder";
import pageManager from "./states/pageManager";
import settingsState from "./states/settingsState";
import Login from "./pages/Login/Login";

function App() {
  const { socketOn, startTorrentListStream } = useSocketConnection
  const { data: userData, checkLoginToken } = userUserData;
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);
  const loggedInRoutes = ["/", "/anime"];
  const { pageList, selectPage } = pageManager;
  const { appSettings } = settingsState;

  const navigatePage = (route: (typeof pageList)[number]["route"]) => {
    selectPage(route);
    navigate(route);
  }

  // createTimer(
  //   () => checkLoginToken(),
  //   5 * 60 * 1000,
  //   setInterval
  // );

  onMount(async () => {
    // await checkLoginToken();

    // const pageToNavigateTo = !userData.loggedIn && loggedInRoutes.includes(pathname()) ? "/nyaa" : appSettings.app.defaultPage;

    // navigatePage(pageToNavigateTo);

    // await invoke('close_splashscreen');
  })

  // useBeforeLeave(async event => {
  //   await checkLoginToken();

  //   if (!userData.loggedIn && typeof event.to === 'string' && loggedInRoutes.includes(event.to)) {
  //     event.preventDefault();
  //     navigate("/nyaa");
  //   }
  // });

  const Protected = () => {
    const navigateOutside = () => {
      navigatePage("/login");
      return 1;
    };

    return (
      <Show when={userData.loggedIn} fallback={navigateOutside()}>
        <Outlet />
      </Show>
    );
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    // <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" component={() => "hello"} />
        <Route path="/login" component={Login} />
        {/* <Route path="/downloading" component={DownloadingList} /> 
        <Route path="/nyaa" component={NyaaSearch} />
        <Route path="/anime" component={AnimeList} />
        <Route path="/settings" component={Settings} /> */}
      </Routes>
      <SnackbarHolder />
    </ThemeProvider>
    // </> 
  );
}

export default App;