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

export async function GetLists(ownerId) {
  try {
    const userLists = await axios.get(`${apiUrl}/get-lists?ownerId=${ownerId}`);
    return userLists.data;
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
    const addResponse = await axios.post(`${apiUrl}/add-item`, body, headers);
    console.log(addResponse);
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

export async function UpdateItemBuyed(item) {
  let headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body = JSON.stringify(item);
  try {
    const addResponse = await axios.post(
      `${apiUrl}/update-item-buyed`,
      body,
      headers
    );
    console.log(addResponse);
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
      ...userData.data};
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
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
      message: error.response.data.message,
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
      message: error.response.data.message,
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

    return true;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
}
