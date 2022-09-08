import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export async function createList(list) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(list);

  try {
    const createdList = await axios.post(
      `${apiUrl}/create-list`,
      body,
      headers
    );
    console.log(createdList);
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
  console.log(apiUrl);
  try {
    const userDataResponse = await axios.post(
      `${apiUrl}/create-google-user`,
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

export async function shareList(listtoShare) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(listtoShare);

  try {
    await axios.post(`${apiUrl}/share-list`, body, headers);
  } catch (error) {
    console.log(error);
  }
}

export async function GetLists(ownerId, email) {
  try {
    const userLists = await axios.get(
      `${apiUrl}/get-lists?ownerId=${ownerId}&email=${email}`
    );
    return userLists.data;
  } catch (error) {
    console.log(error);
    return null
    
  }
}

export async function GetUserProfile({email, id}) {
  try {
    const userProfile = await axios.get(
      `${apiUrl}/get-user-profile?&email=${email}&id=${id}`
    );
    return userProfile.data;
  } catch (error) {
    console.log(error);
  }
}

export async function GetList(listId) {
  try {
    const list = await axios.get(`${apiUrl}/get-lists?listId=${listId}`);
    return list.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function RemoveList(listId) {
  try {
    await axios.get(`${apiUrl}/remove-list?listId=${listId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
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
    await axios.post(`${apiUrl}/add-item`, body, headers);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeItem(item) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(item);
  try {
    await axios.post(`${apiUrl}/remove-item`, body, headers);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeShare(share) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(share);
  try {
    await axios.post(`${apiUrl}/remove-share`, body, headers);
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
    await axios.post(`${apiUrl}/update-item-buyed`, body, headers);
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
    await axios.post(`${apiUrl}/set-item-quantity`, body, headers);
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
    const userData = await axios.post(`${apiUrl}/login`, body, headers);

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

export async function CreateUser(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    const userData = await axios.post(`${apiUrl}/create-user`, body, headers);

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

export async function sendResetPassword(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    await axios.post(`${apiUrl}/reset-password`, body, headers);
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

export async function sendChangePassword(credencials) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(credencials);
  try {
    await axios
      .post(`${apiUrl}/change-password`, body, headers)
      .then((res) => console.log(res.data?.message));

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
  if (search.length < 3) {
    return null;
  }

  try {
    const sugestions = await axios.get(
      `${apiUrl}/get-sugestions?search=${search}`
    );
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
    const sugestions = await axios.post(
      `${apiUrl}/create-sugestion`,
      body,
      headers
    );
    return sugestions.data;
  } catch (error) {
    console.log(error);
    return null;
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
      `${apiUrl}/send-email-confirmation`,
      body,
      headers
    );
    return {
      success: true,
      message: sentResponse.data.message || "E-mail enviado com sucesso. Pode levar alguns minutos até você recebe-lo",
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
    await axios.post(`${apiUrl}/email-confirmation`, body, headers);
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
