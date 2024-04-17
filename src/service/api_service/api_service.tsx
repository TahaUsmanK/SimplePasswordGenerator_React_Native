const APIService = async (textInput: String, SetData: any) => {
  const URL = `https://api.api-ninjas.com/v1/passwordgenerator?length=${textInput}`;
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'X-Api-Key': '9QH2ATe+3PchHaLFoKGEUQ==2IpeTOXd4Pj1jF4r',
    },
  });
  const jsonData = await response.json();
  SetData(jsonData);
};

export default APIService;
