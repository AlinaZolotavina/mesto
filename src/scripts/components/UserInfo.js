class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._job = document.querySelector(data.jobSelector);
    this._avatar = document.querySelector(data.avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}

export default UserInfo;
