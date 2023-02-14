import axios from 'axios';
import {storeurl} from './storeurl';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_INFO,
} from '../actions/types';

export const authState = (rsl, rej) => {
  return dispatch => {
    auth().onAuthStateChanged(user => {
      if (user) {
        rsl(user);
        try {
          setTimeout(() => {
            auth().signOut();
          }, 60000);
        } catch {}
      }
    });
  };
};

export const signInWithPhone = phone => {
  return async dispatch => {
    const res = await auth().signInWithPhoneNumber(phone);
    return res;
  };
};

export const confirmOTP = (otp, confirmation, rsl, rej) => {
  console.log(otp, confirmation);
  return async dispatch => {
    const res = await confirmation.confirm(otp);

    return res;
  };
};

export const signup = (data, rsl, rej) => {
  console.log(data);
  return dispatch => {
    const res = axios(`${storeurl}api/signup`, {
      data,
      method: 'post',
    })
      .then(res => {
        if (res.data.status == true) {
          dispatch({
            type: LOGIN_USER,
            user: res.data.data[0],
            token: res.data.data[0].auth,
            isLoggedIn: true,
          });
          rsl();
        } else {
          rej(res.data.message);
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: false,
          });
        }

        // rsl(res);
      })
      .catch(err => {
        console.log('err', err);
        rej(err.message);
      });
  };
};

export const deleteacct = (data, rsl, rej) => {
  console.log(data);
  return dispatch => {
    const res = axios(`${storeurl}api/deleteaccount`, {
      data,
      method: 'post',
    })
      .then(res => {
        if (res.data.status == true) {
          // dispatch({
          //   type: LOGOUT_USER,
          // });

          rsl(true);
        } else {
          rej(res.data.message);
        }
      })
      .catch(err => {
        console.log('err', err);
        rej(err.message);
      });
  };
};

export const signupwithfb = (data, rsl, rej) => {
  console.log('Comming' + JSON.stringify(data));
  return async dispatch => {
    await axios
      .post(`${storeurl}api/loginwithfb`, data, {})
      // .post('https://ranaentp.net/nikkahnama/index.php', data)

      .then(res => {
        console.log(res);

        if (res.data.status == true) {
          dispatch({
            type: LOGIN_USER,
            user: res.data.data[0],
            token: res.data.data[0].auth,
            isLoggedIn: true,
          });
          rsl(res.data);
        } else {
          rej(res.data.message);
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: false,
          });
        }
      })

      .catch(err => {
        console.log(err);
        rej(err.message);
      });
  };
};

export const accessrequest = (data, auth) => {
  console.log('myresnew', data);

  return async dispatch => {
    try {
      const res = await axios.post(`${storeurl}api/accessrequest`, data, {
        headers: {
          auth: auth,
        },
      });

      return res;
    } catch (err) {
      console.log('err', err);
    }
  };
};
//////Login

export const signin = (data, rsl, rej) => {
  return async dispatch => {
    const res = await axios
      .post(`${storeurl}login_user`, data, {})

      .then(res => {
        console.log('my response', res);

        if (res.data.status == true) {
          dispatch({
            type: LOGIN_USER,
            user: res.data.data,
            isLoggedIn: true,
          });
          rsl();
        } else {
          rej(res.data.message);
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: false,
          });
        }
      })

      .catch(err => {
        console.log(err);
        rej(err.message);
      });
  };
};

//reset password
export const resetPassword = (data, rsl, rej) => {
  return async dispatch => {
    await axios(`${storeurl}api/resetpassword`, {
      data,
      method: 'post',
    })
      .then(res => {
        console.log(res);
        rsl(res.data.message);
      })

      .catch(err => {
        console.log(err);
        rej(err.message);
      });
  };
};
//////Get All Courses

export const getAllCourses = data => {
  return async dispatch => {
    const res = await axios.post(
      `${storeurl}courses_progress_completed_pending`,
      data,
      {},
    );

    return res;
  };
};
//////Get Notification

export const getNotification = (data, rsl, rej) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}notification`, data, {});

    return res;
  };
};
//////Get Notification

export const getNotiStatus = (data, rsl, rej) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}notificationstatus`, data, {});

    return res;
  };
};

//////Get Leader Board Ranking

export const getRanking = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}myleaderboard`, data, {});

    return res;
  };
};
//////Get All Progress

export const getAllProgress = data => {
  return async dispatch => {
    const res = await axios.get(`${storeurl}courses/${data}`);

    return res;
  };
};

//////Get Login Text

export const getLogintext = () => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}general_text`);

    return res;
  };
};

//////Get My Progress

export const getMyProgres = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}progress_of_course`, data, {});

    return res;
  };
};

//////Get Privacy Policy

export const getPrivacyPolicy = (data, rsl, rej) => {
  return async dispatch => {
    const res = await axios.get(`${storeurl}api/getPrivacyPolicy`, data, {});

    return res;
  };
};

//////Get Courses

export const getCourses = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}view_all_course`, data, {});

    return res;
  };
};

////Update Password
export const updatePassword = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}update_password`, data, {});

    return res;
  };
};

// ////submitAnswer answer
// export const submitAllAnswers = (data) => {
//   return async dispatch => {

//     const res = await axios.post(`${storeurl}courses`, data, {});
//     console.log("from api res",res)
//     return res;
//   };
// };

////Forget Password
export const forgetPassword = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}forgot_password`, data, {});

    return res;
  };
};

export const getcheckquestion = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}detailed_of_question`, data, {});

    return res;
  };
};
////get question

export const getquestion = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}courses_questions`, data, {});

    return res;
  };
};
export const Faqs = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}faqs`, data, {});

    return res;
  };
};

////Update Profile

export const updateProfile = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}update_profile`, data, {});

    // console.log("update profile",res.data.data);
    if (res.data.status == true) {
      dispatch({
        type: PROFILE_INFO,
        user: res.data.data,
        isLoggedIn: true,
      });
    }

    return res;
  };
};

export const updateAccount = (data, auth, phone, rsl, rej) => {
  return async dispatch => {
    await axios(`${storeurl}api/account_setting`, {
      data,
      method: 'post',
      headers: {
        auth: auth,
        phone_no: phone,
      },
    })
      .then(res => {
        console.log(res);
        if (res.data.status) {
          dispatch({
            type: PROFILE_INFO,
            user: res?.data?.data[0],
            token: res?.data?.data[0]?.auth,
            isLoggedIn: true,
          });
        }
        rsl(res.data.message);
      })

      .catch(err => {
        console.log(err);
        rej(err.message);
      });
  };
};
export const logoutSuccess = (rsl, rej) => {
  return dispatch => {
    try {
      dispatch({
        type: LOGOUT_USER,
      });
      rsl();
    } catch (err) {
      rej(err.message);
    }
  };
};
export const checkPhoneNo = data => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/check_phone_no`, data);
    return res;
    console.log(res);
  };
};

// Profile Info
export const updateProfileIno = (data, auth) => {
  console.log('my formdata1', data);
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/profile_information`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
      dispatch({
        type: PROFILE_INFO,
        user: res?.data?.data[0],
        token: res?.data?.data[0]?.auth,
        isLoggedIn: true,
      });
    }
    return res;
  };
};

export const updateuserinfo = data => {
  console.log('my formdata1', data);

  // return async dispatch => {

  //   dispatch({
  //     type: PROFILE_INFO,
  //     user: data,
  //     token: data.auth,
  //     isLoggedIn: true,
  //   });

  // };
};

export const updateProfileIno1 = (data, auth, rsl, rej) => {
  console.log(data);
  return dispatch => {
    const res = axios
      .post(`${storeurl}api/profile_information`, data, {
        headers: {
          auth: auth,
        },
      })
      .then(res => {
        if (res.data.status == true) {
          dispatch({
            type: PROFILE_INFO,
            user: res?.data?.data[0],
            token: res?.data?.data[0]?.auth,
            isLoggedIn: true,
          });
          rsl();
        } else {
          rej(res.data.message);
        }
      })
      .catch(err => {
        console.log('err', err);
        rej(err.message);
      });
  };
};

// Search userby filters
export const searchuserbyfilter = (data, auth) => {
  return async dispatch => {
    console.log('testingpakistan');
    const res = await axios.post(`${storeurl}api/searchuserbyfilters`, data, {
      headers: {
        auth: auth,
      },
    });
    console.log('helotest', res);
    return res;
  };
};

// Search userby filters
export const get_my_photo_requests = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/get_my_photo_requests`, data, {
      headers: {
        auth: auth,
      },
    });
    return res;
  };
};

export const acept_reject_photo_request = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(
      `http://nikahnama.ranaentp.net/api/acept_reject_photo_request`,
      data,
      {
        headers: {
          auth: auth,
        },
      },
    );
    return res;
  };
};

export const Blockuser = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/blockuser`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const getallBlockuser = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/get_blocked_user`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const likeunlikeuser = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/likeunlikeuser`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const getgeneraldata = (data, auth) => {
  return async dispatch => {
    const res = await axios.get(`${storeurl}api/get_general_Data`, data, {});
    if (res.data.status) {
    }
    return res;
  };
};

export const getallmyfilters = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/getallmyfilters`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const get_all_users = (data, auth) => {
  return async dispatch => {
    const res = await axios.post(`${storeurl}api/get_all_users`, data, {
      headers: {
        auth: auth,
      },
    });

    if (res.data.status) {
    }
    return res;
  };
};

export const get_county = (data, auth) => {
  return async dispatch => {
    const res = await axios.get(`${storeurl}api/get_county`, data, {});
    if (res.data.status) {
    }
    return res;
  };
};
export const getpdf = (data, rsl, rej) => {
  return async dispatch => {
    const res = await axios.post(
      'http://messagewebsite.book2say.com/wp-json/whatsapp_template/v1/latestpdfdesign_api',
      data,
      {},
    );
    // console.log('firstpdf', res);

    return res;
  };
};
