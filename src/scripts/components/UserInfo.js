class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._job = document.querySelector(data.jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}

export default UserInfo;
