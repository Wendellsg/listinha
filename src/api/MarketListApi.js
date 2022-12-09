import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export async function createList(list, token) {
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(list);

  try {
    await axios.post(`${apiUrl}/lists`, body, headers);
  } catch (error) {
    console.log(error);
  }
}

export async function GetLists(token) {
  if (!token) return;
  try {
    const userLists = await axios.get(`${apiUrl}/lists`, {
      headers: {
        Authorization: token,
      },
    });
    return {
      notAutorized: false,
      lists: userLists.data,
    };
  } catch (error) {
    if (error.response.status === 401) {
      return {
        notAutorized: true,
      };
    } else {
      return null;
    }
  }
}

export async function GetList(listId) {
  const token = localStorage.getItem("@ListinhaToken");
  try {
    const list = await axios.get(`${apiUrl}/lists?listId=${listId}`, {
      headers: {
        Authorization: token,
      },
    });
    return {
      notAutorized: false,
      items: list.data,
    };
  } catch (error) {
    if (error.response.status === 401) {
      return {
        notAutorized: true,
      };
    }

    if (error.response.status === 404) {
      return {
        notNotFound: true,
      };
    }
  }
}

export async function RemoveList(listId) {
  const token = localStorage.getItem("@ListinhaToken");
  try {
    await axios.delete(`${apiUrl}/lists?listId=${listId}`, {
      headers: {
        Authorization: token,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function shareList(listtoShare) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(listtoShare);

  try {
    await axios.post(`${apiUrl}/lists/share`, body, headers);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function removeShare(share) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
    data: share,
  };

  try {
    await axios.delete(`${apiUrl}/lists/share`, headers);
    return true;
  } catch (error) {
    return null;
  }
}

export async function CreateUser(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    const userData = await axios.post(`${apiUrl}/users`, body, headers);

    if (!userData?.data) return null;
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema na requisição, tente novamente mais tarde",
    };
  }
}

export async function GetUserData(token) {
  try {
    const userData = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: token,
      },
    });
    return userData.data;
  } catch (error) {
    return null;
  }
}

export async function GetUserProfile({ email, id }) {
  try {
    const userProfile = await axios.get(
      `${apiUrl}/users/profile?&email=${email}&id=${id}`
    );
    return userProfile.data;
  } catch (error) {
    console.log(error);
  }
}

export async function CreateGoogleUser(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    const userDataResponse = await axios.post(
      `${apiUrl}/users/google`,
      body,
      headers
    );
    if (!userDataResponse?.data) return null;
    return {
      success: true,
      ...userDataResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema na requisição, tente novamente mais tarde",
    };
  }
}

export async function AddNewItem(item) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(item);
  try {
    await axios.post(`${apiUrl}/lists/items`, body, headers);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeItem(item) {
  let body = item;
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  try {
    await axios.delete(`${apiUrl}/lists/items`, headers);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function UpdateItemBuyed(item) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(item);
  try {
    await axios.put(`${apiUrl}/lists/items/buyed`, body, headers);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setItemQuantity(item) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(item);

  try {
    await axios.put(`${apiUrl}/lists/items/quantity`, body, headers);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function Login(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    const userData = await axios.post(`${apiUrl}/auth/login`, body, headers);

    if (!userData?.data.token)
      return {
        success: false,
        message: "Falha no login",
      };

    return {
      success: true,
      ...userData.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema na requisição, tente novamente mais tarde",
    };
  }
}

export async function sendChangePassword(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    await axios.put(`${apiUrl}/auth/change-password`, body, headers);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema na requisição, tente novamente mais tarde",
    };
  }
}

export async function sendResetPassword(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    await axios.post(`${apiUrl}/auth/reset-password`, body, headers);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema na requisição, tente novamente mais tarde",
    };
  }
}

export async function sendEmailConfirmation(email) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(email);

  try {
    const sentResponse = await axios.post(
      `${apiUrl}/auth/send-email-confirmation`,
      body,
      headers
    );
    return {
      success: true,
      message:
        sentResponse.data.message ||
        "E-mail enviado com sucesso. Pode levar alguns minutos até você recebe-lo",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema no envio do e-mail, tente novamente mais tarde",
    };
  }
}

export async function emailConfirmation(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    await axios.post(`${apiUrl}/auth/email-confirmation`, body, headers);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Problema na requisição, tente novamente mais tarde",
    };
  }
}

export async function getSugestions(search) {
  try {
    const sugestions = await axios.get(`${apiUrl}/sugestions?search=${search}`);
    return sugestions.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createSugestion(sugestion) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(sugestion);

  try {
    const sugestions = await axios.post(`${apiUrl}/sugestions`, body, headers);
    return sugestions.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
