import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Redirect, Route, Switch, useHistory } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Registration from "./Registration";
import InfoTooltip from "./InfoTooltip";
import { auth } from "../utils/auth";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isUserEmail, setIsUserEmail] = React.useState("");
  const [isInfoTooltip, setIsInfoTooltip] = React.useState({
    isOpen: false,
    error: false,
  });

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getUserToken(jwt)
        .then((res) => {
          setIsUserEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data.reverse());
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInfoUser()
        .then((res) => {
          setCurrentUser(res);
          console.log(res);
        })
        .catch((err) => { 
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    console.log(card);
    const isLiked = card.likes.some((i)=> i === currentUser._id);
    console.log(`Лайкнута ли карточка ранее ${isLiked}`);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltip({ isOpen: false, error: false });
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleUpdateUser = (data) => {
    api
      .setInfoUser(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .generateNewCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegistration = (email, password) => {
    auth
      .registrUser(email, password)
      .then((data) => {
        setIsInfoTooltip({ isOpen: true, error: false });
        if (data) {
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltip({ isOpen: true, error: true });
        if (err.status === 400) {
          return console.log("400 - некорректно заполнено одно из полей ");
        }
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .loginUser(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setIsUserEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          return console.log("400 - не передано одно из полей ");
        }
        if (err.status === 401) {
          return console.log("401 - пользователь с email не найден");
        }
        console.log(err);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setIsUserEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={isUserEmail} onLogOut={handleLogOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            component={Main}
            loggedIn={loggedIn}
          />
          <Route path="/sign-in">
            <Login onSubmit={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Registration onSubmit={handleRegistration} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isInfoTooltip={isInfoTooltip} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
