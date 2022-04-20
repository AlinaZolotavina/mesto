class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._job = document.querySelector(data.jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}

export default UserInfo;
