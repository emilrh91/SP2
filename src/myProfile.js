import { initializeNavbar } from "./js/listeners/initializeNavbar.js";
import { getFromLocalStorage } from "./js/storage/storageHandler.js";
import { displayUserName } from "./js/components/profile/displayUserName.js";
import { logoutListener } from "./js/listeners/logoutListener.js";
import { updateAvatarListener } from "./js/listeners/updateAvatarListener.js";
import { fetchAvatar } from "./js/api/profile/fetchAvatar.js";
import { setupFetchBidsListener } from "./js/listeners/setupFetchBidsListener.js";
import { setupFetchListingsListener } from "./js/listeners/setupFetchListingsListener.js"; 

const userName = getFromLocalStorage("userName");

initializeNavbar().then(() => {
  logoutListener();
  displayUserName(userName);
  setupFetchBidsListener(userName);
  setupFetchListingsListener(userName);
  fetchAvatar(userName).then((avatarUrl) => {
    document.getElementById("avatar").src = avatarUrl;
    updateAvatarListener(userName);
  });
});
