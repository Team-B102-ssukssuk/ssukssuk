// actions.js
export const SAVE_POT_ID = "SAVE_POT_ID";
export const SAVE_GARDEN_ID = "SAVE_GARDEN_ID";
export const NOTIFICATION_TOKEN = "NOTIFICATION_TOKEN";
export const TOGGLE_BACKGROUND_MUSIC = "TOGGLE_BACKGROUND_MUSIC"; // 새로운 액션 타입 추가

export const storePotID = (potID) => ({
  type: SAVE_POT_ID,
  potID,
});

export const setGardenID = (gardenID) => ({
  type: SAVE_GARDEN_ID,
  gardenID,
});

export const setNotificationToken = (notificationToken) => ({
  type: NOTIFICATION_TOKEN,
  notificationToken,
});

export const toggleBackgroundMusic = () => ({
  type: TOGGLE_BACKGROUND_MUSIC,
});
